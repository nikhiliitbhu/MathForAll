/**
 * Regenerates src/data/ncertMaths.js from ncert.nic.in.
 *
 *   npm i -D pdfjs-dist@3.11.174
 *   node scripts/build-ncert-data.mjs
 *
 * Three steps, all against the live site:
 *   1. Read textbook.php. Its class/subject/book dropdowns are hard-coded inside
 *      the page's change1() function, one entry per book, carrying the book code
 *      and its chapter range — that is the catalogue.
 *   2. Pull each English book's prelims PDF ("<code>ps.pdf") and read the chapter
 *      titles off its contents page.
 *   3. Pair each English book with its Hindi edition (the codes differ only in
 *      the language letter: jemh1 ↔ jhmh1) and write the data file.
 *
 * Hindi chapter titles are deliberately not extracted: NCERT's Hindi PDFs use
 * non-Unicode font encodings and the text comes out mangled.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "src", "data", "ncertMaths.js");

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36";
const HEADERS = { "User-Agent": UA, Referer: "https://ncert.nic.in/textbook.php" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// NCERT's server drops connections fairly often; every fetch gets a few goes.
async function grab(url, tries = 6) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (e) {
      if (i >= tries) throw e;
      await sleep(1500 * i);
    }
  }
}

/* ── 1. Catalogue ─────────────────────────────────────────────────────────── */
async function fetchCatalogue() {
  const html = await (await grab("https://ncert.nic.in/textbook.php")).text();
  const body = html.slice(html.indexOf("function change1(sind)"));

  const reCond = /tclass\.value==(\d+)\)\s*&&\s*\(document\.test\.tsubject\.options\[sind\]\.text==\s*"([^"]*)"/;
  const reText = /tbook\.options\[(\d+)\]\.text\s*=\s*"([^"]*)"/;
  const reVal = /tbook\.options\[(\d+)\]\.value\s*=\s*"textbook\.php\?([a-z0-9]+)=(\d+)-(\d+)"/;

  const pending = {};
  const books = [];
  let cls = null;
  let subject = null;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("//")) continue; // withdrawn books are left commented out

    const c = line.match(reCond);
    if (c) { cls = +c[1]; subject = c[2]; continue; }

    const t = line.match(reText);
    if (t) { pending[t[1]] = t[2]; continue; }

    const v = line.match(reVal);
    if (v && cls) {
      const label = pending[v[1]];
      if (label && !label.startsWith("..Select")) {
        books.push({ cls, subject, title: label, code: v[2], chapters: +v[4] });
      }
    }
  }
  return books;
}

/* ── 2. Chapter titles ────────────────────────────────────────────────────── */
const tidy = (s) => s.replace(/\s+/g, " ").replace(/\s+([,:;.])/g, "$1").trim();
const HEADING = /c\s*o\s*n\s*t\s*e\s*n\s*t\s*s?\b/i; // NCERT sets headings in spaced small-caps

function entriesOn(page) {
  const found = {};
  // "Chapter 7 Fractions 151"
  for (const m of page.matchAll(/Chapter\s+(\d{1,2})\s+(.+?)\s+\d{1,3}(?=\s|$)/g)) found[+m[1]] ??= tidy(m[2]);
  // "7. Coordinate Geometry 99" — the lookahead skips the "7.1 ..." sub-entries
  for (const m of page.matchAll(/(?:^|\s)(\d{1,2})\.\s+([A-Z][^0-9]{2,60}?)\s+\d{1,3}(?=\s+\1\.\d|\s|$)/g)) found[+m[1]] ??= tidy(m[2]);
  return found;
}

function longestRun(found) {
  const keys = Object.keys(found).map(Number).sort((a, z) => a - z);
  let best = [], cur = [];
  for (const k of keys) {
    cur = cur.length && k === cur.at(-1) + 1 ? [...cur, k] : [k];
    if (cur.length > best.length) best = cur;
  }
  return best;
}

async function chapterTitles(code, chapters) {
  const buf = await (await grab(`https://ncert.nic.in/textbook/pdf/${code}ps.pdf`)).arrayBuffer();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), useSystemFonts: true }).promise;

  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const tc = await (await doc.getPage(p)).getTextContent();
    pages.push(tc.items.map((i) => i.str).join(" ").replace(/\s+/g, " ").trim());
  }

  // A Part-II book reprints Part-I's contents next to its own, and the
  // "Rationalisation of Content..." notice also matches the heading — so try every
  // candidate and keep the block whose numbering runs exactly as long as the book.
  const starts = pages.map((_, i) => i).filter((i) => HEADING.test(pages[i]) && Object.keys(entriesOn(pages[i])).length >= 2);

  let best = null;
  for (const s of starts) {
    const found = {};
    for (const page of pages.slice(s, s + 3)) for (const [k, v] of Object.entries(entriesOn(page))) found[k] ??= v;
    const run = longestRun(found);
    const cand = { found, run, exact: run.length === chapters };
    if (!best || (cand.exact && !best.exact)) best = cand;
  }
  if (!best) throw new Error(`no contents page in ${code}ps.pdf`);

  // Part-II books keep the parent's numbering: their chapter 7 is file 01.
  const offset = best.run[0] > 1 ? best.run[0] - 1 : 0;
  const titles = Array.from({ length: chapters }, (_, i) => best.found[i + 1 + offset] ?? null);
  const missing = titles.filter((t) => !t).length;
  if (missing) console.warn(`  ! ${code}: ${missing} chapter title(s) not found`);
  return { offset, titles };
}

/* ── 3. Write the data file ───────────────────────────────────────────────── */
const EN_TITLE = {
  fegp1: "Ganita Prakash", gegp1: "Ganita Prakash Part-I", gegp2: "Ganita Prakash Part-II",
  hegp1: "Ganita Prakash Part-I", hegp2: "Ganita Prakash Part-II", hemh1: "Mathematics",
  iemh1: "Ganita Manjari", jemh1: "Mathematics", kemh1: "Mathematics",
  lemh1: "Mathematics Part-I", lemh2: "Mathematics Part-II",
};
const HI_TITLE = {
  fegp1: "गणित प्रकाश", gegp1: "गणित प्रकाश भाग-1", gegp2: "गणित प्रकाश भाग-2",
  hegp1: "गणित प्रकाश भाग-1", hegp2: "गणित प्रकाश भाग-2", hemh1: "गणित",
  iemh1: "गणित मंजरी", jemh1: "गणित", kemh1: "गणित", lemh1: "गणित भाग-1", lemh2: "गणित भाग-2",
};

const BANNER = `/**
 * NCERT Mathematics textbooks, Class 6-12, English and Hindi medium.
 *
 * AUTO-GENERATED — do not hand-edit. Regenerate with:  node scripts/build-ncert-data.mjs
 *
 * Chapter PDF URL:  https://ncert.nic.in/textbook/pdf/{code}{file}.pdf
 *   {code} — the per-medium book code, e.g. "jemh1" English / "jhmh1" Hindi
 *   {file} — "ps" for the prelims, else the file number padded to two digits
 *
 * \`code.hi\` is absent where NCERT publishes no Hindi edition (the Class 7 and
 * Class 8 Part-II books). \`number\` is what the book calls the chapter and
 * \`file\` is what the PDF is named — they differ for Part-II books, whose
 * chapter 7 is file 01.
 *
 * Hindi chapter titles are not included: NCERT's Hindi PDFs use non-Unicode font
 * encodings, so text extracted from them is mangled and cannot be trusted. The
 * UI shows "अध्याय N" with the English title alongside instead.
 */
`;

async function main() {
  console.log("Reading NCERT catalogue…");
  const all = await fetchCatalogue();
  const maths = all.filter((b) => b.cls >= 6 && b.cls <= 12 && b.subject === "Mathematics" && "eh".includes(b.code[1]));
  const byCode = Object.fromEntries(maths.map((b) => [b.code, b]));
  const english = maths.filter((b) => b.code[1] === "e");
  console.log(`  ${english.length} English maths books, Class 6-12`);

  const classes = {};
  for (const en of english) {
    console.log(`Reading contents of ${en.code} (${en.chapters} chapters)…`);
    const { offset, titles } = await chapterTitles(en.code, en.chapters);
    const hi = byCode[en.code[0] + "h" + en.code.slice(2)] ?? null;
    if (hi && hi.chapters !== en.chapters) {
      console.warn(`  ! chapter-count mismatch: ${en.code}=${en.chapters} ${hi.code}=${hi.chapters}`);
    }

    const cid = `class-${en.cls}`;
    (classes[cid] ??= { id: cid, title: `Class ${en.cls}`, titleHi: `कक्षा ${en.cls}`, books: [] }).books.push({
      id: en.code,
      title: { en: EN_TITLE[en.code] ?? en.title, hi: HI_TITLE[en.code] ?? en.title },
      code: { en: en.code, ...(hi ? { hi: hi.code } : {}) },
      numberOffset: offset,
      chapters: titles.map((t, i) => ({ file: i + 1, number: i + 1 + offset, title: t })),
    });
  }

  const ordered = {};
  for (const k of Object.keys(classes).sort((a, z) => +a.split("-")[1] - +z.split("-")[1])) ordered[k] = classes[k];
  fs.writeFileSync(OUT, BANNER + "\nexport const ncertMaths = " + JSON.stringify(ordered, null, 2) + ";\n");
  console.log(`\nWrote ${path.relative(process.cwd(), OUT)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  BookOpen,
  Globe,
  Languages,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ncertMaths } from "@/data/ncertMaths";

/* ─────────────────────────────────────────────────────────────────────────────
 * PDF.js is loaded from a CDN (no npm package needed) and the PDFs are streamed
 * straight from NCERT — nothing is bundled or committed.
 *
 * The Vite dev server proxies  /ncert-pdf/textbook/pdf/XX.pdf
 *                           →  https://ncert.nic.in/textbook/pdf/XX.pdf
 * (see vite.config.js). NCERT sends no CORS headers, so the proxy is what makes
 * PDF.js able to read the bytes. A production deploy needs the same hop from
 * its own backend — see the PROXY_BASE note below.
 * ───────────────────────────────────────────────────────────────────────── */
const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const CMAP_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/";

// Pages drawn before the book is shown: the opening spread and the one after it.
// Enough to open instantly and still be ahead of the first turn.
const EAGER_PAGES = 4;

const NCERT = "https://ncert.nic.in/textbook/pdf";
// In dev this is handled by vite.config.js. In prod, point it at your own proxy route.
const PROXY_BASE = "/ncert-pdf";

const ncertUrl = (code, file) => `${NCERT}/${code}${file}.pdf`;
const proxyUrl = (url) => url.replace("https://ncert.nic.in", PROXY_BASE);
// "ps" is NCERT's prelims file (cover, foreword, contents); chapters are zero-padded.
const fileToken = (file) => (file === "ps" ? "ps" : String(file).padStart(2, "0"));

function waitForPdfJs(ms = 10_000) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const check = () => {
      if (window.pdfjsLib) return resolve();
      if (Date.now() - t0 > ms) return reject(new Error("PDF.js load timeout"));
      setTimeout(check, 100);
    };
    check();
  });
}

/* Draws one page onto its own canvas. The scale it was drawn at travels with it,
 * so a cached page can still be shown at a different zoom by scaling it. */
async function renderPageBitmap(doc, pageNum, scale) {
  try {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    return { canvas, scale };
  } catch {
    return null;
  }
}

/* Puts a cached page on screen in a single synchronous call. When the reader has
 * zoomed since it was drawn it is scaled to fit — momentarily soft, but instant,
 * and the crisp re-render replaces it a beat later. */
function paint(target, entry, atScale) {
  const ratio = atScale / entry.scale;
  const width = Math.max(1, Math.round(entry.canvas.width * ratio));
  const height = Math.max(1, Math.round(entry.canvas.height * ratio));
  target.width = width;
  target.height = height;
  const ctx = target.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(entry.canvas, 0, 0, width, height);
}

/* Cached pages are uncompressed canvases, so their cost scales with the zoom: a
 * page on a phone is under a megabyte, the same page on a 4K board is around 17.
 * This is roughly how many are worth keeping in memory at a given zoom. */
const CACHE_BUDGET_BYTES = 220 * 1024 * 1024;

function pageBudget(scale) {
  const bytesPerPage = 595 * 842 * 4 * scale * scale; // A4 at this zoom, RGBA
  return Math.max(EAGER_PAGES, Math.min(120, Math.floor(CACHE_BUDGET_BYTES / bytesPerPage)));
}

/* Drops the pages furthest from the reader once the budget is exceeded. */
function evictFar(cache, around, budget) {
  if (cache.size <= budget) return;
  const order = [...cache.keys()].sort((a, b) => Math.abs(b - around) - Math.abs(a - around));
  for (const key of order) {
    if (cache.size <= budget) break;
    if (Math.abs(key - around) <= 3) continue; // never drop what is on screen or next
    cache.delete(key);
  }
}

/* A spread is two pages side by side, which only works if there is room for it.
 * Below this the book shows one page at a time — on a phone, two pages would each
 * be a couple of hundred pixels wide and unreadable. */
const TWO_PAGE_MIN_WIDTH = 760;

/* The zoom at which the book fills the width it has been given, whether that is a
 * phone or a smart board. Clamped so a huge display cannot blow a page up past
 * what the PDF can render sharply. */
function fitScale(pageWidth, containerWidth, twoUp) {
  if (!pageWidth || !containerWidth) return 1.4;
  const padding = 32; // the spread's own p-4, both sides
  const spine = twoUp ? 12 : 0;
  const columns = twoUp ? 2 : 1;
  const available = Math.max(240, containerWidth - padding - spine);
  return Math.min(3, Math.max(0.35, available / (columns * pageWidth)));
}

/* The app's own chapter list is not NCERT's, so when a chapter is opened we look
 * for the NCERT chapter that covers the same ground and start there. No decent
 * match means we simply open the book at chapter 1 rather than guess. */
const keywords = (s) =>
  (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w.length > 3);

function matchChapter(appTitle, chapters) {
  const want = keywords(appTitle);
  if (!want.length) return null;
  const wantSet = new Set(want);
  let best = null;
  let bestScore = 0;
  for (const ch of chapters) {
    const words = keywords(ch.title);
    if (!words.length) continue;
    // Score both directions. Counting only the NCERT side would let a short title
    // swallow a longer one — "Circles" scores a perfect 1.0 against "Areas Related
    // to Circles" — so the overlap is weighed against both lengths.
    const overlap = words.filter((w) => wantSet.has(w)).length;
    const score = (2 * overlap) / (words.length + want.length);
    if (score > bestScore) {
      bestScore = score;
      best = ch;
    }
  }
  return bestScore >= 0.5 ? best : null;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export function BookView({ classId, chapterTitle, lang }) {
  const classData = ncertMaths[classId];
  const books = classData?.books ?? [];

  const [bookId, setBookId] = useState(books[0]?.id);
  const book = books.find((b) => b.id === bookId) ?? books[0];

  const mediums = useMemo(() => Object.keys(book?.code ?? {}), [book]);
  const [medium, setMedium] = useState(lang === "hi" ? "hi" : "en");
  // Class 7 and 8 Part-II have no Hindi edition — fall back rather than 404.
  const activeMedium = mediums.includes(medium) ? medium : mediums[0];
  const code = book?.code[activeMedium];

  const [file, setFile] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.4);
  const scaleRef = useRef(1.4);
  scaleRef.current = scale;
  const [docLoading, setDocLoading] = useState(true);
  const [pageRendering, setPageRendering] = useState(false);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [inputPage, setInputPage] = useState("1");
  const [useGoogleDocsFallback, setUseGoogleDocsFallback] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100 while the PDF downloads
  const [rendered, setRendered] = useState({ done: 0, total: 0 }); // pages drawn before opening

  // The leaf being turned: its two faces are snapshots of the page you are
  // leaving and the page landing in its place. null when no turn is in flight.
  const [flip, setFlip] = useState(null);

  const pdfDocRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const spreadRef = useRef(null);
  const loadIdRef = useRef(0); // detect stale loads
  // Every page of the open chapter, drawn once before the book is shown. Held as
  // canvases rather than images so a page goes up in one synchronous blit — an
  // <img> would have to decode first, and that gap is what read as a blank page.
  const pageCacheRef = useRef(new Map());
  const pageSizeRef = useRef(null); // page dimensions at zoom 1, for fitting
  const [viewportWidth, setViewportWidth] = useState(0);
  const twoUp = viewportWidth >= TWO_PAGE_MIN_WIDTH;
  const twoUpRef = useRef(twoUp);
  twoUpRef.current = twoUp;
  const step = twoUp ? 2 : 1;
  // A manual zoom is respected; without one the book refits itself to the screen.
  const [userZoomed, setUserZoomed] = useState(false);
  const userZoomedRef = useRef(false);
  userZoomedRef.current = userZoomed;

  const directUrl = code ? ncertUrl(code, fileToken(file)) : null;
  const proxiedUrl = directUrl ? proxyUrl(directUrl) : null;

  const chapter = book?.chapters.find((c) => c.file === file) ?? null;
  const chapterLabel = (ch) =>
    lang === "hi" ? `अध्याय ${ch.number}: ${ch.title}` : `Chapter ${ch.number}: ${ch.title}`;

  /* ── Follow the app language, and the chapter the user opened ─────────── */
  useEffect(() => setMedium(lang === "hi" ? "hi" : "en"), [lang]);

  useEffect(() => {
    setBookId(books[0]?.id);
  }, [classId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!book) return;
    setFile(matchChapter(chapterTitle, book.chapters)?.file ?? 1);
  }, [book, chapterTitle]);

  /* ── Track how much room the book has ────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Refit whenever the room changes — a rotated phone, a resized window, a board
  // driven at a different resolution — unless the reader has set a zoom of their own.
  useEffect(() => {
    if (userZoomed || !pageSizeRef.current || !viewportWidth) return;
    const next = fitScale(pageSizeRef.current.width, viewportWidth, twoUp);
    setScale((current) => (Math.abs(current - next) < 0.02 ? current : next));
  }, [viewportWidth, twoUp, userZoomed]);

  /* ── Load PDF.js script once ─────────────────────────────────────────── */
  useEffect(() => {
    if (window.pdfjsLib) return;
    const s = document.createElement("script");
    s.src = PDFJS_CDN;
    s.async = true;
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    };
    document.head.appendChild(s);
  }, []);

  /* ── Load the PDF whenever the book, medium or chapter changes ───────── */
  useEffect(() => {
    if (!proxiedUrl) return;
    const loadId = ++loadIdRef.current;

    pdfDocRef.current = null;
    setDocLoading(true);
    setError(null);
    setTotalPages(0);
    setCurrentPage(1);
    setInputPage("1");
    setUseGoogleDocsFallback(false);
    setProgress(0);
    setRendered({ done: 0, total: 0 });
    setUserZoomed(false);

    (async () => {
      try {
        await waitForPdfJs();
        if (loadIdRef.current !== loadId) return; // stale

        // NCERT's server drops a request now and then, so a first failure means
        // very little — give it a couple more goes before showing an error.
        let doc = null;
        let lastErr = null;
        for (let attempt = 1; attempt <= 3 && !doc; attempt++) {
          try {
            const task = window.pdfjsLib.getDocument({
              url: proxiedUrl,
              cMapUrl: CMAP_URL,
              cMapPacked: true,
              withCredentials: false,
            });
            task.onProgress = ({ loaded, total }) => {
              if (loadIdRef.current === loadId && total) {
                setProgress(Math.min(100, Math.round((loaded / total) * 100)));
              }
            };
            doc = await task.promise;
          } catch (e) {
            lastErr = e;
            if (loadIdRef.current !== loadId) return;
            if (attempt < 3) await new Promise((r) => setTimeout(r, 700 * attempt));
          }
        }
        if (loadIdRef.current !== loadId) return;
        if (!doc) throw lastErr;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);

        // Drawing a page costs a few hundred milliseconds on a slow machine, so
        // waiting for the whole chapter before opening it made the book crawl.
        // Only the first spread and the one behind it are drawn here; the book
        // opens on those and the rest fill in behind, staying comfortably ahead
        // of the reader so a turn still never has to stop and render.
        // Size the book to the screen before drawing, so the pages are rendered
        // at the zoom they will actually be shown at.
        const unit = (await doc.getPage(1)).getViewport({ scale: 1 });
        pageSizeRef.current = { width: unit.width, height: unit.height };
        if (!userZoomedRef.current) {
          const fit = fitScale(unit.width, containerRef.current?.clientWidth ?? 0, twoUpRef.current);
          scaleRef.current = fit;
          setScale(fit);
        }

        pageCacheRef.current.clear();
        setRendered({ done: 0, total: doc.numPages });

        const draw = async (n) => {
          const page = await renderPageBitmap(doc, n, scaleRef.current);
          if (loadIdRef.current !== loadId) return false;
          if (page) pageCacheRef.current.set(n, page);
          setRendered({ done: n, total: doc.numPages });
          return true;
        };

        const upfront = Math.min(EAGER_PAGES, doc.numPages);
        for (let n = 1; n <= upfront; n++) {
          if (!(await draw(n))) return;
        }

        setDocLoading(false);

        // How many pages are worth holding depends on how big they are. On a
        // phone a page is a few hundred KB and the whole chapter fits; on a 4K
        // board a page is ~17 MB, so only a window around the reader is kept.
        const budget = pageBudget(scaleRef.current);
        for (let n = upfront + 1; n <= Math.min(doc.numPages, budget); n++) {
          // Hand the browser back to the reader between pages, so the background
          // work never competes with scrolling or a page turn.
          await new Promise((r) => setTimeout(r, 0));
          if (loadIdRef.current !== loadId) return;
          if (!(await draw(n))) return;
        }
        if (budget < doc.numPages) setRendered({ done: budget, total: budget });
      } catch (err) {
        if (loadIdRef.current !== loadId) return;
        console.error("[BookView] load error:", err);
        setError(err.message || "Failed to load PDF");
        setDocLoading(false);
        setUseGoogleDocsFallback(true);
      }
    })();
  }, [proxiedUrl, reloadKey]);

  /* ── Keep the cached window centred on the reader ────────────────────── */
  useEffect(() => {
    if (docLoading || !pdfDocRef.current) return;
    const budget = pageBudget(scale);
    evictFar(pageCacheRef.current, currentPage, budget);

    // Anything inside the window that was evicted earlier gets drawn again.
    let cancelled = false;
    const doc = pdfDocRef.current;
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));
    const handle = idle(async () => {
      for (let d = 1; d <= Math.floor(budget / 2); d++) {
        for (const n of [currentPage + d, currentPage - d]) {
          if (cancelled) return;
          if (n < 1 || n > totalPages || pageCacheRef.current.has(n)) continue;
          const entry = await renderPageBitmap(doc, n, scale);
          if (cancelled) return;
          if (entry) pageCacheRef.current.set(n, entry);
          evictFar(pageCacheRef.current, currentPage, budget);
        }
      }
    });
    return () => {
      cancelled = true;
      window.cancelIdleCallback?.(handle);
    };
  }, [currentPage, totalPages, docLoading, scale]);

  /* ── Redraw at the new zoom, after a zoom ────────────────────────────
   * Every page was drawn at the zoom in force when the chapter opened, and a
   * cached page can be shown at any other zoom by scaling it — soft, but with no
   * pause. This quietly redraws them properly afterwards, nearest page first, so
   * the softness lasts a moment rather than for the rest of the chapter. */
  useEffect(() => {
    if (docLoading || error || !pdfDocRef.current) return;
    const stale = [...pageCacheRef.current.entries()].filter(([, e]) => e.scale !== scale);
    if (!stale.length) return;

    let cancelled = false;
    const doc = pdfDocRef.current;
    const order = stale
      .map(([n]) => n)
      .sort((a, b) => Math.abs(a - currentPage) - Math.abs(b - currentPage));

    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));
    const handle = idle(async () => {
      for (const n of order) {
        if (cancelled) return;
        const entry = await renderPageBitmap(doc, n, scale);
        if (cancelled) return;
        if (!entry) continue;
        pageCacheRef.current.set(n, entry);
        // Repaint if this page is the one on screen.
        if (n === currentPage && leftCanvasRef.current) paint(leftCanvasRef.current, entry, scale);
        if (n === currentPage + 1 && rightCanvasRef.current) paint(rightCanvasRef.current, entry, scale);
      }
    });

    return () => {
      cancelled = true;
      window.cancelIdleCallback?.(handle);
    };
  }, [scale, docLoading, error, currentPage]);

  /* ── Warm the neighbours ──────────────────────────────────────────────
   * All 170 books together are ~560 MB, so pulling everything up front would
   * make the app slower, not faster. What actually costs the user time is the
   * wait when they move on, so once the current chapter is up we quietly fetch
   * the ones they are most likely to reach next — the chapter either side, and
   * this same chapter in the other medium. The browser's HTTP cache serves them
   * instantly when asked for. Roughly 8 MB, and it never blocks the page. */
  const prefetchedRef = useRef(new Set());
  const [warmed, setWarmed] = useState({ done: 0, total: 0 });

  useEffect(() => {
    if (docLoading || error || !book) return;
    let cancelled = false;

    // The chapters nearest the one being read come first, so moving a chapter
    // either way is instant long before the whole book has arrived.
    const order = [...book.chapters]
      .sort((a, b) => Math.abs(a.file - (file || 1)) - Math.abs(b.file - (file || 1)))
      .map((c) => ncertUrl(code, fileToken(c.file)));

    const otherMedium = mediums.find((m) => m !== activeMedium);
    if (otherMedium) order.push(ncertUrl(book.code[otherMedium], fileToken(file)));

    const todo = order.filter((u) => !prefetchedRef.current.has(u));
    setWarmed({ done: order.length - todo.length, total: order.length });

    // Two at a time: enough to get ahead of the reader, gentle enough that it
    // never competes with the chapter they are actually waiting on.
    const queue = [...todo];
    const worker = async () => {
      while (queue.length && !cancelled) {
        const url = queue.shift();
        prefetchedRef.current.add(url);
        try {
          await fetch(proxyUrl(url), { priority: "low" });
        } catch {
          prefetchedRef.current.delete(url); // let a later pass retry it
        }
        if (!cancelled) setWarmed((w) => ({ ...w, done: w.done + 1 }));
      }
    };

    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 600));
    const handle = idle(() => {
      worker();
      worker();
    });

    return () => {
      cancelled = true;
      window.cancelIdleCallback?.(handle);
    };
  }, [docLoading, error, book, code, activeMedium, mediums]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Put a page on a canvas ──────────────────────────────────────────
   * Every page of the chapter was drawn before the book opened, so this is
   * normally a single synchronous blit. The render path is only a safety net for
   * a page that failed to draw during loading. */
  const renderPage = useCallback(
    async (pageNum, canvasRef) => {
      if (!pdfDocRef.current || !canvasRef.current) return;

      const cached = pageCacheRef.current.get(pageNum);
      if (cached) {
        paint(canvasRef.current, cached, scale);
        return;
      }

      const entry = await renderPageBitmap(pdfDocRef.current, pageNum, scale);
      if (!entry || !canvasRef.current) return;
      pageCacheRef.current.set(pageNum, entry);
      paint(canvasRef.current, entry, scale);
    },
    [scale]
  );

  useEffect(() => {
    if (!docLoading && !error && pdfDocRef.current) {
      setPageRendering(true);
      (async () => {
        const leftPromise = renderPage(currentPage, leftCanvasRef);

        let rightPromise = Promise.resolve();
        if (twoUp && currentPage + 1 <= totalPages) {
          rightPromise = renderPage(currentPage + 1, rightCanvasRef);
        } else {
          const canvas = rightCanvasRef.current;
          if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }

        await Promise.all([leftPromise, rightPromise]);
        setPageRendering(false);
      })();
    }
  }, [currentPage, scale, docLoading, error, totalPages, renderPage]);

  /* ── Turning a page ──────────────────────────────────────────────────
   * A real leaf has a page printed on each side: the one you are looking at,
   * and the one that lands when it falls. So the turning element is given two
   * faces — a snapshot of the page being left, and the incoming page rendered
   * off-screen — and is swung around the spine. Only single-spread steps are
   * animated; jumping across the book just cuts. */
  const FLIP_MS = 620;

  const snapshot = (canvas) => {
    try {
      return canvas?.toDataURL("image/jpeg", 0.86) ?? null;
    } catch {
      return null; // tainted canvas — fall back to an un-animated jump
    }
  };


  const settle = (p) => {
    setCurrentPage(p);
    setInputPage(String(p));
  };

  const goTo = async (n) => {
    if (flip) return; // one leaf at a time
    let p = Math.min(Math.max(1, n), totalPages);
    // A spread always starts on an odd page; one page at a time has no such rule.
    if (twoUp && p % 2 === 0) p = Math.max(1, p - 1);
    if (p === currentPage) return;

    const dir = p > currentPage ? "next" : "prev";
    const oneSpread = Math.abs(p - currentPage) === step;
    const source =
      twoUp && dir === "next" ? rightCanvasRef.current : leftCanvasRef.current;

    if (!oneSpread || !source || !spreadRef.current) return settle(p);

    // Turning forward lifts the right-hand page and its back becomes the new
    // left-hand page; turning back is the mirror of that. The back face has to be
    // ready already — waiting for it here is what made the turn feel like a hang,
    // so an unprepared page just cuts across instead of animating.
    // Forward, the leaf's back is the page that lands where it was; back, it is
    // the page that returns to the right of the spine.
    const landing = pageCacheRef.current.get(twoUp && dir === "prev" ? p + 1 : p);
    if (!landing) return settle(p);
    const front = snapshot(source);
    const back = snapshot(landing.canvas);
    if (!front || !back) return settle(p);

    const spread = spreadRef.current.getBoundingClientRect();
    const box = source.getBoundingClientRect();
    setFlip({
      dir,
      front,
      back,
      to: p,
      rect: {
        left: box.left - spread.left,
        top: box.top - spread.top,
        width: box.width,
        height: box.height,
      },
    });
  };

  /* ── Fullscreen ──────────────────────────────────────────────────────── */
  const toggleFs = () =>
    document.fullscreenElement ? document.exitFullscreen() : containerRef.current?.requestFullscreen();
  useEffect(() => {
    const h = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  const retry = () => setReloadKey((k) => k + 1);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-64 gap-2 text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <span>{lang === "hi" ? "इस कक्षा की पुस्तक उपलब्ध नहीं।" : "No book for this class."}</span>
      </div>
    );
  }

  /* ════════════════════════ RENDER ════════════════════════ */
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.22 }}
      className="space-y-4"
    >
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Medium toggle */}
        <div className="flex items-center gap-1 bg-secondary/60 rounded-2xl p-1">
          {[
            { key: "en", full: "English Medium", short: "EN" },
            { key: "hi", full: "Hindi Medium", short: "हिंदी" },
          ].map(({ key, full, short }) => {
            const available = mediums.includes(key);
            return (
              <button
                key={key}
                onClick={() => available && setMedium(key)}
                disabled={!available}
                title={
                  available
                    ? full
                    : lang === "hi"
                    ? "इस पुस्तक का हिंदी संस्करण NCERT पर उपलब्ध नहीं है"
                    : "NCERT does not publish this book in Hindi"
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  !available
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : activeMedium === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{full}</span>
                <span className="sm:hidden">{short}</span>
              </button>
            );
          })}
        </div>

        {/* Book selector — only classes whose maths syllabus spans several books */}
        {books.length > 1 && (
          <div className="flex items-center gap-1 bg-secondary/60 rounded-2xl p-1">
            <select
              value={book.id}
              onChange={(e) => setBookId(e.target.value)}
              className="bg-transparent text-sm font-medium px-3 py-1.5 rounded-xl text-foreground focus:outline-none cursor-pointer border-0"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id} className="bg-background text-foreground">
                  {b.title[lang === "hi" ? "hi" : "en"]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Chapter selector */}
        <div className="flex items-center gap-1 bg-secondary/60 rounded-2xl p-1">
          <select
            value={file}
            onChange={(e) => setFile(e.target.value === "ps" ? "ps" : Number(e.target.value))}
            className="bg-transparent text-sm font-medium px-3 py-1.5 rounded-xl text-foreground focus:outline-none cursor-pointer border-0 max-w-[220px] sm:max-w-xs md:max-w-sm"
          >
            <option value="ps" className="bg-background text-foreground">
              {lang === "hi" ? "आरंभिक पृष्ठ (विषय-सूची)" : "Front matter (contents)"}
            </option>
            {book.chapters.map((ch) => (
              <option key={ch.file} value={ch.file} className="bg-background text-foreground">
                {chapterLabel(ch)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Book title + direct link */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm min-w-0">
          <BookOpen className="h-4 w-4 text-primary shrink-0" />
          <span className="font-medium text-foreground truncate">
            {book.title[lang === "hi" ? "hi" : "en"]}
            {chapter
              ? ` — ${chapterLabel(chapter)}`
              : ` — ${lang === "hi" ? "आरंभिक पृष्ठ" : "Front matter"}`}
          </span>
        </div>
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
        >
          <ExternalLink className="h-3 w-3" />
          {lang === "hi" ? "NCERT पर खोलें" : "Open on NCERT"}
        </a>
      </div>

      {/* Hindi requested but unavailable for this particular book */}
      {medium === "hi" && activeMedium !== "hi" && (
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3">
          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            {lang === "hi"
              ? "NCERT ने इस पुस्तक का हिंदी संस्करण प्रकाशित नहीं किया है — अंग्रेज़ी संस्करण दिखाया जा रहा है।"
              : "NCERT does not publish a Hindi edition of this book — showing the English one."}
          </p>
        </div>
      )}

      {/* ── Canvas container ────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative border border-border rounded-2xl overflow-auto bg-zinc-100 dark:bg-zinc-900 flex justify-center"
        style={{ minHeight: 560, maxHeight: fullscreen ? "100vh" : "75vh" }}
      >
        {useGoogleDocsFallback ? (
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(directUrl)}&embedded=true`}
            className="w-full border-0 rounded-2xl"
            style={{ minHeight: 560, height: fullscreen ? "100vh" : "75vh" }}
            title="NCERT Textbook Fallback Viewer"
          />
        ) : (
          <>
            <AnimatePresence mode="wait">
              {docLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <Loader2 className="h-7 w-7 text-primary animate-spin absolute -bottom-1 -right-1" />
                  </div>
                  <div className="text-center w-64">
                    <p className="font-semibold text-foreground">
                      {lang === "hi" ? "पुस्तक लोड हो रही है…" : "Loading book…"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">
                      {chapter
                        ? lang === "hi"
                          ? `अध्याय ${chapter.number} · ${activeMedium === "hi" ? "हिंदी" : "अंग्रेज़ी"} माध्यम`
                          : `Chapter ${chapter.number} · ${activeMedium === "hi" ? "Hindi" : "English"} medium`
                        : lang === "hi"
                        ? "आरंभिक पृष्ठ"
                        : "Front matter"}
                    </p>
                    {/* Two phases: fetch the chapter, then draw every one of its
                        pages so that reading it never has to stop and render. */}
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: rendered.total
                            ? `${Math.round(
                                (rendered.done / Math.min(rendered.total, EAGER_PAGES)) * 100
                              )}%`
                            : `${progress}%`,
                        }}
                        transition={{ ease: "easeOut", duration: 0.25 }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2 tabular-nums">
                      {rendered.total
                        ? lang === "hi"
                          ? "पहले पन्ने तैयार हो रहे हैं…"
                          : "Preparing the opening pages…"
                        : progress > 0
                        ? lang === "hi"
                          ? `डाउनलोड ${progress}%`
                          : `Downloading ${progress}%`
                        : lang === "hi"
                        ? "NCERT से जुड़ रहे हैं…"
                        : "Connecting to NCERT…"}
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/95 z-20 px-8 text-center"
                >
                  <div className="h-20 w-20 rounded-3xl bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-10 w-10 text-destructive" />
                  </div>
                  <div className="max-w-sm">
                    <p className="font-semibold text-foreground text-lg mb-1">
                      {lang === "hi" ? "PDF लोड नहीं हो सकी" : "Could not load PDF"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1 font-mono bg-muted rounded px-2 py-1 break-all">
                      {error}
                    </p>
                    <p className="text-sm text-muted-foreground mb-5">
                      {lang === "hi"
                        ? "NCERT का सर्वर कभी-कभी जवाब नहीं देता — फिर कोशिश करें, या सीधे NCERT पर पढ़ें।"
                        : "NCERT's server drops requests now and then — retry, or read it directly on NCERT."}
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Button variant="outline" onClick={retry} className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        {lang === "hi" ? "फिर कोशिश करें" : "Retry"}
                      </Button>
                      <a href={directUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          {lang === "hi" ? "NCERT पर खोलें" : "Open on NCERT"}
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {pageRendering && !docLoading && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-background/90 backdrop-blur rounded-full p-1.5 shadow-sm">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
              </div>
            )}

            {!docLoading && !error && (
              <div
                ref={spreadRef}
                className="flex justify-center items-stretch gap-0 bg-zinc-200 dark:bg-zinc-800 p-2 sm:p-4 rounded-xl shadow-inner relative max-w-full overflow-x-auto select-none"
                style={{ perspective: 2400, perspectiveOrigin: "center center" }}
              >
                <div className={`relative bg-white shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] overflow-hidden ${
                    twoUp ? "rounded-l-lg border-r border-zinc-300 dark:border-zinc-700" : "rounded-lg"
                  }`}>
                  {/* The page under a turning leaf is hidden so the leaf's own
                      back face is what you see land. */}
                  <canvas
                    ref={leftCanvasRef}
                    className="block max-w-full h-auto"
                    style={{ visibility: flip?.dir === "prev" ? "hidden" : "visible" }}
                  />
                  {twoUp && (
                    <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Spine and facing page only exist when there is room for a spread. */}
                {twoUp && (
                  <div className="w-[12px] bg-gradient-to-r from-black/10 via-black/30 to-black/10 z-10 shrink-0 pointer-events-none self-stretch shadow-inner" />
                )}

                {!twoUp ? null : currentPage + 1 <= totalPages ? (
                  <div className="relative bg-white shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] rounded-r-lg overflow-hidden">
                    <canvas
                      ref={rightCanvasRef}
                      className="block max-w-full h-auto"
                      style={{ visibility: flip?.dir === "next" ? "hidden" : "visible" }}
                    />
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="bg-zinc-100 dark:bg-zinc-900 rounded-r-lg w-[300px] shrink-0 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-muted-foreground text-xs font-medium">
                    {lang === "hi" ? "अंतिम पृष्ठ" : "End of chapter"}
                  </div>
                )}

                {/* ── The turning leaf ── */}
                {flip && (
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: flip.dir === "next" ? -180 : 180 }}
                    transition={{ duration: FLIP_MS / 1000, ease: [0.36, 0, 0.22, 1] }}
                    onAnimationComplete={() => {
                      settle(flip.to);
                      setFlip(null);
                    }}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: flip.rect.left,
                      top: flip.rect.top,
                      width: flip.rect.width,
                      height: flip.rect.height,
                      transformStyle: "preserve-3d",
                      transformOrigin: flip.dir === "next" ? "left center" : "right center",
                    }}
                  >
                    {[
                      { src: flip.front, spin: 0 },
                      { src: flip.back, spin: 180 },
                    ].map(({ src, spin }) => (
                      <div
                        key={spin}
                        className="absolute inset-0 bg-white overflow-hidden shadow-[rgba(0,0,0,0.28)_0px_8px_26px_0px]"
                        style={{ backfaceVisibility: "hidden", transform: `rotateY(${spin}deg)` }}
                      >
                        <img src={src} alt="" className="block w-full h-full" draggable={false} />
                        {/* Paper curves away from the light as it swings. */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              flip.dir === "next"
                                ? "linear-gradient(to left, rgba(0,0,0,0.16), rgba(0,0,0,0) 42%)"
                                : "linear-gradient(to right, rgba(0,0,0,0.16), rgba(0,0,0,0) 42%)",
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* A shadow sweeps across the spread beneath the leaf. */}
                {flip && (
                  <motion.div
                    initial={{ opacity: 0.32 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: FLIP_MS / 1000, ease: "easeOut" }}
                    className="absolute z-10 pointer-events-none rounded-lg"
                    style={{
                      left: flip.rect.left,
                      top: flip.rect.top,
                      width: flip.rect.width,
                      height: flip.rect.height,
                      background:
                        flip.dir === "next"
                          ? "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))"
                          : "linear-gradient(to left, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                    }}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Bottom controls ───────────────────────────────────────────── */}
      {!docLoading && !error && !useGoogleDocsFallback && totalPages > 0 && (
        <div className="flex justify-center mt-6">
          <div className="flex flex-wrap items-center gap-6 bg-background/90 backdrop-blur border border-border shadow-xl px-6 py-3 rounded-2xl md:rounded-full">
            <div className="flex items-center gap-1 border-r border-border pr-6">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => goTo(1)} disabled={currentPage === 1 || !!flip}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => goTo(currentPage - step)} disabled={currentPage === 1 || !!flip}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2 px-2">
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={inputPage}
                  onChange={(e) => setInputPage(e.target.value)}
                  onBlur={() => {
                    const n = parseInt(inputPage);
                    if (!isNaN(n)) goTo(n);
                    else setInputPage(String(currentPage));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const n = parseInt(inputPage);
                      if (!isNaN(n)) goTo(n);
                    }
                  }}
                  className="w-12 h-8 text-center text-sm font-medium border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground font-medium">/ {totalPages}</span>
              </div>

              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => goTo(currentPage + step)} disabled={currentPage + step > totalPages || !!flip}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => goTo(totalPages)} disabled={currentPage + step > totalPages || !!flip}>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 border-r border-border pr-6">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">Zoom</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => { setUserZoomed(true); setScale((s) => Math.max(0.35, +(s - 0.2).toFixed(2))); }} disabled={scale <= 0.35}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs font-semibold text-foreground w-12 text-center">{Math.round(scale * 100)}%</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => { setUserZoomed(true); setScale((s) => Math.min(3.0, +(s + 0.2).toFixed(2))); }} disabled={scale >= 3.0}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={toggleFs}>
                {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Info strip ────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 bg-blue-500/8 border border-blue-500/20 rounded-2xl p-4">
        <Languages className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          <span className="font-semibold text-foreground">
            {lang === "hi" ? "NCERT की आधिकारिक पुस्तक" : "Official NCERT textbook"}
          </span>{" "}
          —{" "}
          {useGoogleDocsFallback
            ? lang === "hi"
              ? "सीधे लोड नहीं हो पाई, इसलिए Google Docs Viewer से दिखाई जा रही है।"
              : "Could not be read directly, so it is being shown through the Google Docs viewer."
            : lang === "hi"
            ? "NCERT से सीधे stream होकर browser में ही render हो रही है — कुछ download करने की ज़रूरत नहीं।"
            : "Streamed straight from NCERT and rendered in the browser — nothing to download."}
          {rendered.total > 0 && rendered.done < rendered.total && (
            <span className="block mt-1 text-xs text-muted-foreground tabular-nums">
              {lang === "hi"
                ? `बाकी पन्ने पीछे तैयार हो रहे हैं… ${rendered.done}/${rendered.total}`
                : `Drawing the remaining pages in the background… ${rendered.done}/${rendered.total}`}
            </span>
          )}
          {warmed.total > 0 && (
            <span className="block mt-1 text-xs text-muted-foreground">
              {warmed.done >= warmed.total
                ? lang === "hi"
                  ? `पूरी पुस्तक तैयार है — सभी ${warmed.total} अध्याय तुरंत खुलेंगे।`
                  : `Whole book ready — all ${warmed.total} chapters will open instantly.`
                : lang === "hi"
                ? `बाकी अध्याय पीछे-पीछे तैयार हो रहे हैं… ${warmed.done}/${warmed.total}`
                : `Getting the rest of the book ready in the background… ${warmed.done}/${warmed.total}`}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}

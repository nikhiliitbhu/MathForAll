import { useState, useEffect, useRef, useCallback } from "react";
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
import { ncertBooks } from "@/data/ncertBooks";

/* ─────────────────────────────────────────────────────────────────────────────
 * PDF.js loaded from CDN (no npm package needed).
 * Vite dev proxy forwards  /ncert-pdf/textbook/pdf/XX.pdf
 *                       → https://ncert.nic.in/textbook/pdf/XX.pdf
 * For production, replace PROXY_BASE with your server-side proxy endpoint.
 * ───────────────────────────────────────────────────────────────────────── */
const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const CMAP_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/";

// In dev:  /ncert-pdf  is proxied to https://ncert.nic.in by vite.config.js
// In prod: replace with your own backend proxy route
const PROXY_BASE = "/ncert-pdf";

function proxyUrl(ncertPdfUrl) {
  // e.g. https://ncert.nic.in/textbook/pdf/femh1.pdf
  //   →  /ncert-pdf/textbook/pdf/femh1.pdf
  return ncertPdfUrl.replace("https://ncert.nic.in", PROXY_BASE);
}

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

const BOOK_CHAPTERS = {
  "class-6": [
    { num: 1, title: "Chapter 1: Patterns in Mathematics" },
    { num: 2, title: "Chapter 2: Lines and Angles" },
    { num: 3, title: "Chapter 3: Number Play" },
    { num: 4, title: "Chapter 4: Data Handling and Presentation" },
    { num: 5, title: "Chapter 5: Prime Time" },
    { num: 6, title: "Chapter 6: Perimeter and Area" },
    { num: 7, title: "Chapter 7: Fractions" },
    { num: 8, title: "Chapter 8: Playing with Constructions" },
    { num: 9, title: "Chapter 9: Symmetry" },
    { num: 10, title: "Chapter 10: The Other Side of Zero" }
  ],
  "class-7": [
    { num: 1, title: "Chapter 1: Large Numbers Around Us" },
    { num: 2, title: "Chapter 2: Arithmetic Expressions" },
    { num: 3, title: "Chapter 3: A Peek Beyond the Point" },
    { num: 4, title: "Chapter 4: Expressions Using Letter-Numbers" },
    { num: 5, title: "Chapter 5: Parallel and Intersecting Lines" },
    { num: 6, title: "Chapter 6: Number Play" },
    { num: 7, title: "Chapter 7: A Tale of Three Intersecting Lines" },
    { num: 8, title: "Chapter 8: Working with Fractions" },
    { num: 9, title: "Chapter 9: Operations on Integers" },
    { num: 10, title: "Chapter 10: Fractions and Proportional Reasoning" },
    { num: 11, title: "Chapter 11: Finding the Unknown" },
    { num: 12, title: "Chapter 12: Congruent Figures" },
    { num: 13, title: "Chapter 13: Visualising Solid Shapes" },
    { num: 14, title: "Chapter 14: Comparing Quantities" },
    { num: 15, title: "Chapter 15: Data Handling" }
  ],
  "class-8": [
    { num: 1, title: "Chapter 1: A Square and A Cube" },
    { num: 2, title: "Chapter 2: Power Play" },
    { num: 3, title: "Chapter 3: A Story of Numbers" },
    { num: 4, title: "Chapter 4: Quadrilaterals" },
    { num: 5, title: "Chapter 5: Number Play" },
    { num: 6, title: "Chapter 6: We Distribute, Yet Things Multiply" },
    { num: 7, title: "Chapter 7: Proportional Reasoning-1" },
    { num: 8, title: "Chapter 8: Fractions in Disguise" },
    { num: 9, title: "Chapter 9: The Baudhāyana-Pythagoras Theorem" },
    { num: 10, title: "Chapter 10: Proportional Reasoning - 2" },
    { num: 11, title: "Chapter 11: Exploring Some Geometric Themes" },
    { num: 12, title: "Chapter 12: Tales by Dots and Lines" },
    { num: 13, title: "Chapter 13: Algebra Play" },
    { num: 14, title: "Chapter 14: Area" }
  ],
  "class-9": [
    { num: 1, title: "Chapter 1: Number Systems" },
    { num: 2, title: "Chapter 2: Polynomials" },
    { num: 3, title: "Chapter 3: Coordinate Geometry" },
    { num: 4, title: "Chapter 4: Linear Equations in Two Variables" },
    { num: 5, title: "Chapter 5: Introduction to Euclid's Geometry" },
    { num: 6, title: "Chapter 6: Lines and Angles" },
    { num: 7, title: "Chapter 7: Triangles" },
    { num: 8, title: "Chapter 8: Quadrilaterals" },
    { num: 9, title: "Chapter 9: Circles" },
    { num: 10, title: "Chapter 10: Heron's Formula" },
    { num: 11, title: "Chapter 11: Surface Areas and Volumes" },
    { num: 12, title: "Chapter 12: Statistics" }
  ],
  "class-10": [
    { num: 1, title: "Chapter 1: Real Numbers" },
    { num: 2, title: "Chapter 2: Polynomials" },
    { num: 3, title: "Chapter 3: Pair of Linear Equations in Two Variables" },
    { num: 4, title: "Chapter 4: Quadratic Equations" },
    { num: 5, title: "Chapter 5: Arithmetic Progressions" },
    { num: 6, title: "Chapter 6: Triangles" },
    { num: 7, title: "Chapter 7: Coordinate Geometry" },
    { num: 8, title: "Chapter 8: Introduction to Trigonometry" },
    { num: 9, title: "Chapter 9: Some Applications of Trigonometry" },
    { num: 10, title: "Chapter 10: Circles" },
    { num: 11, title: "Chapter 11: Areas Related to Circles" },
    { num: 12, title: "Chapter 12: Surface Areas and Volumes" },
    { num: 13, title: "Chapter 13: Statistics" },
    { num: 14, title: "Chapter 14: Probability" }
  ],
  "class-11": [
    { num: 1, title: "Chapter 1: Sets" },
    { num: 2, title: "Chapter 2: Relations and Functions" },
    { num: 3, title: "Chapter 3: Trigonometric Functions" },
    { num: 4, title: "Chapter 4: Complex Numbers and Quadratic Equations" },
    { num: 5, title: "Chapter 5: Linear Inequalities" },
    { num: 6, title: "Chapter 6: Permutations and Combinations" },
    { num: 7, title: "Chapter 7: Binomial Theorem" },
    { num: 8, title: "Chapter 8: Sequences and Series" },
    { num: 9, title: "Chapter 9: Straight Lines" },
    { num: 10, title: "Chapter 10: Conic Sections" },
    { num: 11, title: "Chapter 11: Introduction to Three Dimensional Geometry" },
    { num: 12, title: "Chapter 12: Limits and Derivatives" },
    { num: 13, title: "Chapter 13: Statistics" },
    { num: 14, title: "Chapter 14: Probability" }
  ],
  "class-12": [
    { num: 1, title: "Chapter 1: Relations and Functions" },
    { num: 2, title: "Chapter 2: Inverse Trigonometric Functions" },
    { num: 3, title: "Chapter 3: Matrices" },
    { num: 4, title: "Chapter 4: Determinants" },
    { num: 5, title: "Chapter 5: Continuity and Differentiability" },
    { num: 6, title: "Chapter 6: Application of Derivatives" },
    { num: 7, title: "Chapter 7: Integrals" },
    { num: 8, title: "Chapter 8: Application of Integrals" },
    { num: 9, title: "Chapter 9: Differential Equations" },
    { num: 10, title: "Chapter 10: Vector Algebra" },
    { num: 11, title: "Chapter 11: Three Dimensional Geometry" },
    { num: 12, title: "Chapter 12: Linear Programming" },
    { num: 13, title: "Chapter 13: Probability" }
  ]
};

const CHAPTER_MAPPING = {
  "c6-1": 3,
  "c6-2": 3,
  "c6-3": 10,
  "c6-4": 4,
  "c6-5": 5,
  "c6-6": 5,
  "c6-7": 2,
  "c6-8": 2,
  "c6-9": 2,
  "c6-10": 8,
  "c6-11": 9,
  "c6-12": 6,
  "c6-13": 7,
  "c6-14": 4,
  "c7-1": 7,
  "c7-3": 2,
  "c8-1": 1,
  "c8-4": 14,
  "c9-2": 2,
  "c9-5": 9,
  "c10-1": 1,
  "c10-2": 2,
  "c10-3": 3,
  "c10-4": 4,
  "c10-5": 5,
  "c10-6": 6,
  "c10-8": 8,
  "c11-4": 10,
  "c11-7": 12,
  "c12-2": 3,
  "c12-4": 7,
};

function getNcertChapterNumber(classId, chapterId) {
  if (CHAPTER_MAPPING[chapterId] !== undefined) {
    return CHAPTER_MAPPING[chapterId];
  }
  const match = chapterId?.match(/-(\d+)/);
  return match ? parseInt(match[1]) : 1;
}

const NCERT = "https://ncert.nic.in/textbook/pdf";

/* ═══════════════════════════════════════════════════════════════════════════ */
export function BookView({ classId, chapterId, lang }) {
  const [medium, setMedium] = useState(lang === "hi" ? "hi" : "en");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.4);
  const [docLoading, setDocLoading] = useState(true);
  const [pageRendering, setPageRendering] = useState(false);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [inputPage, setInputPage] = useState("1");

  const defaultChapterNum = getNcertChapterNumber(classId, chapterId);
  const [selectedChapterNum, setSelectedChapterNum] = useState(defaultChapterNum);
  const [useGoogleDocsFallback, setUseGoogleDocsFallback] = useState(false);

  const pdfDocRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const renderTaskLeftRef = useRef(null);
  const renderTaskRightRef = useRef(null);
  const containerRef = useRef(null);
  const loadIdRef = useRef(0);   // detect stale loads

  const bookData = ncertBooks[classId];
  const currentBook = bookData?.[medium];

  const getChapterPdfUrl = (chapterNum) => {
    if (!currentBook) return null;
    const baseUrl = currentBook.ncertUrl || currentBook.url;
    const urlParts = baseUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    let prefix = fileName.replace("ps.pdf", "");
    let padNum = String(chapterNum).padStart(2, "0");

    if (classId === "class-12" && chapterNum >= 7) {
      prefix = medium === "hi" ? "lhmh2" : "lemh2";
      padNum = String(chapterNum - 6).padStart(2, "0");
    }

    const directNcertUrl = `${NCERT}/${prefix}${padNum}.pdf`;
    return {
      directUrl: directNcertUrl,
      proxiedUrl: proxyUrl(directNcertUrl)
    };
  };

  const pdfUrls = getChapterPdfUrl(selectedChapterNum);
  const proxiedUrl = pdfUrls?.proxiedUrl;
  const directUrl = pdfUrls?.directUrl;

  // Sync medium with app language
  useEffect(() => setMedium(lang === "hi" ? "hi" : "en"), [lang]);

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

  /* ── Load PDF document whenever classId, medium or selectedChapterNum changes ── */
  useEffect(() => {
    if (!currentBook || !proxiedUrl) return;
    const loadId = ++loadIdRef.current;

    pdfDocRef.current = null;
    setDocLoading(true);
    setError(null);
    setTotalPages(0);
    setCurrentPage(1);
    setInputPage("1");
    setUseGoogleDocsFallback(false);

    (async () => {
      try {
        await waitForPdfJs();
        if (loadIdRef.current !== loadId) return; // stale

        const task = window.pdfjsLib.getDocument({
          url: proxiedUrl,
          cMapUrl: CMAP_URL,
          cMapPacked: true,
          withCredentials: false,
        });

        const doc = await task.promise;
        if (loadIdRef.current !== loadId) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        setDocLoading(false);
      } catch (err) {
        if (loadIdRef.current !== loadId) return;
        console.error("[BookView] load error:", err);
        setError(err.message || "Failed to load PDF");
        setDocLoading(false);
        setUseGoogleDocsFallback(true);
      }
    })();
  }, [classId, medium, selectedChapterNum, proxiedUrl, currentBook]);

  /* ── Render a single page onto a specific canvas ─────────────────────── */
  const renderPage = useCallback(async (pageNum, canvasRef, taskRef) => {
    if (!pdfDocRef.current || !canvasRef.current) return;

    // Cancel in-flight render
    if (taskRef.current) {
      try { taskRef.current.cancel(); } catch (_) { }
      taskRef.current = null;
    }

    try {
      const page = await pdfDocRef.current.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const ctx = canvas.getContext("2d");
      const task = page.render({ canvasContext: ctx, viewport });
      taskRef.current = task;
      await task.promise;
    } catch (e) {
      if (e?.name !== "RenderingCancelledException") {
        console.error(`[BookView] render error for page ${pageNum}:`, e);
      }
    }
  }, [scale]);

  useEffect(() => {
    if (!docLoading && !error && pdfDocRef.current) {
      setPageRendering(true);
      (async () => {
        // Render left page
        const leftPromise = renderPage(currentPage, leftCanvasRef, renderTaskLeftRef);

        // Render right page if it exists
        let rightPromise = Promise.resolve();
        if (currentPage + 1 <= totalPages) {
          rightPromise = renderPage(currentPage + 1, rightCanvasRef, renderTaskRightRef);
        } else {
          // Clear right canvas
          const canvas = rightCanvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }

        await Promise.all([leftPromise, rightPromise]);
        setPageRendering(false);
      })();
    }
  }, [currentPage, scale, docLoading, error, totalPages, renderPage]);

  /* ── Navigation ─────────────────────────────────────────────────────── */
  const goTo = (n) => {
    let p = Math.min(Math.max(1, n), totalPages);
    if (p % 2 === 0) {
      p = Math.max(1, p - 1);
    }
    setCurrentPage(p);
    setInputPage(String(p));
  };

  /* ── Fullscreen ──────────────────────────────────────────────────────── */
  const toggleFs = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : containerRef.current?.requestFullscreen();
  useEffect(() => {
    const h = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  /* ── Retry ───────────────────────────────────────────────────────────── */
  const retry = () => {
    setError(null);
    setDocLoading(true);
    // Force re-run of load effect by bumping loadId externally via medium trick
    const cur = medium;
    setMedium("__");
    setTimeout(() => setMedium(cur), 30);
  };

  if (!bookData) {
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Medium toggle */}
          <div className="flex items-center gap-1 bg-secondary/60 rounded-2xl p-1">
            {[
              { key: "en", full: "English Medium", short: "EN" },
              { key: "hi", full: "Hindi Medium", short: "हिंदी" },
            ].map(({ key, full, short }) => (
              <button
                key={key}
                onClick={() => setMedium(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${medium === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{full}</span>
                <span className="sm:hidden">{short}</span>
              </button>
            ))}
          </div>

          {/* Chapter selector dropdown */}
          {BOOK_CHAPTERS[classId] && (
            <div className="flex items-center gap-1 bg-secondary/60 rounded-2xl p-1">
              <select
                value={selectedChapterNum}
                onChange={(e) => setSelectedChapterNum(parseInt(e.target.value))}
                className="bg-transparent text-sm font-medium px-3 py-1.5 rounded-xl text-foreground focus:outline-none cursor-pointer border-0 max-w-[200px] sm:max-w-xs md:max-w-sm"
              >
                {BOOK_CHAPTERS[classId].map((ch) => (
                  <option key={ch.num} value={ch.num} className="bg-background text-foreground">
                    {lang === "hi"
                      ? `अध्याय ${ch.num}: ${ch.title.split(": ")[1] || ch.title}`
                      : ch.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Book title + download link */}
      {currentBook && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">
              {currentBook.title}
              {BOOK_CHAPTERS[classId] && ` — ${BOOK_CHAPTERS[classId].find(ch => ch.num === selectedChapterNum)?.title || `Chapter ${selectedChapterNum}`
                }`}
            </span>
          </div>
          <a
            href={directUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            {lang === "hi" ? "NCERT पर खोलें" : "Open on NCERT"}
          </a>
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
              {/* Loading */}
              {docLoading && (
                <motion.div key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <Loader2 className="h-7 w-7 text-primary animate-spin absolute -bottom-1 -right-1" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">
                      {lang === "hi" ? "पुस्तक लोड हो रही है…" : "Loading book…"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lang === "hi" ? "NCERT PDF प्रोसेस हो रही है" : "Processing NCERT PDF"}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div key="error"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                        ? "Vite proxy चेक करें या NCERT पर सीधे पढ़ें।"
                        : "Check that the Vite proxy is set up in vite.config.js. Or read directly on NCERT:"}
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Button variant="outline" onClick={retry} className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        {lang === "hi" ? "फिर कोशिश करें" : "Retry"}
                      </Button>
                      {currentBook && (
                        <a href={currentBook.ncertUrl || currentBook.url} target="_blank" rel="noopener noreferrer">
                          <Button className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            {lang === "hi" ? "NCERT पर खोलें" : "Open on NCERT"}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Page rendering spinner */}
            {pageRendering && !docLoading && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-background/90 backdrop-blur rounded-full p-1.5 shadow-sm">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
              </div>
            )}

            {/* Side-by-side Book Layout */}
            {!docLoading && !error && (
              <div className="flex justify-center items-stretch gap-0 bg-zinc-200 dark:bg-zinc-800 p-4 rounded-xl shadow-inner relative max-w-full overflow-x-auto select-none">
                {/* Left Page */}
                <div className="relative bg-white shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] rounded-l-lg overflow-hidden border-r border-zinc-300 dark:border-zinc-700">
                  <canvas
                    ref={leftCanvasRef}
                    className="block max-w-full h-auto"
                  />
                  {/* Crease inner shading */}
                  <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                </div>

                {/* Central Spine/Crease Divider */}
                <div className="w-[12px] bg-gradient-to-r from-black/10 via-black/30 to-black/10 z-10 shrink-0 pointer-events-none self-stretch shadow-inner" />

                {/* Right Page */}
                {currentPage + 1 <= totalPages ? (
                  <div className="relative bg-white shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] rounded-r-lg overflow-hidden">
                    <canvas
                      ref={rightCanvasRef}
                      className="block max-w-full h-auto"
                    />
                    {/* Crease inner shading */}
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="bg-zinc-100 dark:bg-zinc-900 rounded-r-lg w-[300px] shrink-0 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-muted-foreground text-xs font-medium">
                    {lang === "hi" ? "अंतिम पृष्ठ" : "End of Book"}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Premium Bottom Controls Bar ───────────────────────────────── */}
      {!docLoading && !error && !useGoogleDocsFallback && totalPages > 0 && (
        <div className="flex justify-center mt-6">
          <div className="flex flex-wrap items-center gap-6 bg-background/90 backdrop-blur border border-border shadow-xl px-6 py-3 rounded-2xl md:rounded-full">
            {/* Pagination Controls */}
            <div className="flex items-center gap-1 border-r border-border pr-6">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => goTo(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => goTo(currentPage - 2)}
                disabled={currentPage === 1}
              >
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

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => goTo(currentPage + 2)}
                disabled={currentPage + 1 >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => goTo(totalPages)}
                disabled={currentPage + 1 >= totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 border-r border-border pr-6">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                Zoom
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setScale((s) => Math.max(0.6, +(s - 0.2).toFixed(1)))}
                disabled={scale <= 0.6}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs font-semibold text-foreground w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setScale((s) => Math.min(3.0, +(s + 0.2).toFixed(1)))}
                disabled={scale >= 3.0}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Fullscreen Control */}
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={toggleFs}
              >
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
          {lang === "hi" ? (
            <>
              <span className="font-semibold text-foreground">NCERT की आधिकारिक पुस्तक</span> —{" "}
              {useGoogleDocsFallback ? (
                <>कनेक्शन/CORS प्रतिबंधों के कारण Google Docs Viewer द्वारा दिखाई जा रही है।</>
              ) : (
                <>PDF.js द्वारा सीधे browser में render हो रही है। कोई download नहीं चाहिए।</>
              )}
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">Official NCERT Textbook</span> —{" "}
              {useGoogleDocsFallback ? (
                <>Rendered via Google Docs Viewer fallback due to CORS/proxy restrictions.</>
              ) : (
                <>Rendered via PDF.js through Vite proxy.</>
              )}{" "}
              If issues,{" "}
              {currentBook && (
                <a href={directUrl} target="_blank" rel="noopener noreferrer"
                  className="text-primary underline">open on NCERT</a>
              )}.
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}
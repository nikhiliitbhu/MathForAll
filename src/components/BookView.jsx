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
const PDFJS_CDN    = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const CMAP_URL     = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/";

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

/* ═══════════════════════════════════════════════════════════════════════════ */
export function BookView({ classId, lang }) {
  const [medium, setMedium]           = useState(lang === "hi" ? "hi" : "en");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(0);
  const [scale, setScale]             = useState(1.4);
  const [docLoading, setDocLoading]   = useState(true);
  const [pageRendering, setPageRendering] = useState(false);
  const [error, setError]             = useState(null);
  const [fullscreen, setFullscreen]   = useState(false);
  const [inputPage, setInputPage]     = useState("1");

  const pdfDocRef      = useRef(null);
  const canvasRef      = useRef(null);
  const renderTaskRef  = useRef(null);
  const containerRef   = useRef(null);
  const loadIdRef      = useRef(0);   // detect stale loads

  const bookData    = ncertBooks[classId];
  const currentBook = bookData?.[medium];

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

  /* ── Load PDF document whenever classId or medium changes ────────────── */
  useEffect(() => {
    if (!currentBook) return;
    const loadId = ++loadIdRef.current;

    pdfDocRef.current = null;
    setDocLoading(true);
    setError(null);
    setTotalPages(0);
    setCurrentPage(1);
    setInputPage("1");

    (async () => {
      try {
        await waitForPdfJs();
        if (loadIdRef.current !== loadId) return; // stale

        const url = proxyUrl(currentBook.url);
        const task = window.pdfjsLib.getDocument({
          url,
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
      }
    })();
  }, [classId, medium, currentBook?.url]);

  /* ── Render a single page onto the canvas ────────────────────────────── */
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfDocRef.current || !canvasRef.current) return;

    // Cancel in-flight render
    if (renderTaskRef.current) {
      try { renderTaskRef.current.cancel(); } catch (_) {}
      renderTaskRef.current = null;
    }

    setPageRendering(true);
    try {
      const page     = await pdfDocRef.current.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas   = canvasRef.current;
      if (!canvas) return;

      canvas.width  = viewport.width;
      canvas.height = viewport.height;

      const ctx  = canvas.getContext("2d");
      const task = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;
      await task.promise;
    } catch (e) {
      if (e?.name !== "RenderingCancelledException") console.error("[BookView] render:", e);
    } finally {
      setPageRendering(false);
    }
  }, [scale]);

  useEffect(() => {
    if (!docLoading && !error && pdfDocRef.current) {
      renderPage(currentPage);
    }
  }, [currentPage, scale, docLoading, error, renderPage]);

  /* ── Navigation ─────────────────────────────────────────────────────── */
  const goTo = (n) => {
    const p = Math.min(Math.max(1, n), totalPages);
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
        {/* Medium toggle */}
        <div className="flex items-center gap-1 bg-secondary/60 rounded-2xl p-1">
          {[
            { key: "en", full: "English Medium", short: "EN" },
            { key: "hi", full: "Hindi Medium",   short: "हिंदी" },
          ].map(({ key, full, short }) => (
            <button
              key={key}
              onClick={() => setMedium(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                medium === key
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

        {/* Zoom + fullscreen */}
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0"
            onClick={() => setScale(s => Math.max(0.6, +(s - 0.2).toFixed(1)))}
            disabled={scale <= 0.6}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0"
            onClick={() => setScale(s => Math.min(3.0, +(s + 0.2).toFixed(1)))}
            disabled={scale >= 3.0}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 ml-1" onClick={toggleFs}>
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Book title + download link */}
      {currentBook && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">{currentBook.title}</span>
          </div>
          <a
            href={currentBook.ncertUrl || currentBook.url} target="_blank" rel="noopener noreferrer"
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

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="shadow-2xl"
          style={{
            display: docLoading || error ? "none" : "block",
            margin: "16px auto",
            borderRadius: "8px",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* ── Pagination ──────────────────────────────────────────────────── */}
      {!docLoading && !error && totalPages > 0 && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0"
              onClick={() => goTo(1)} disabled={currentPage === 1}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 px-3"
              onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{lang === "hi" ? "पिछला" : "Prev"}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground text-xs hidden sm:inline">
              {lang === "hi" ? "पृष्ठ" : "Page"}
            </span>
            <input
              type="number" min={1} max={totalPages}
              value={inputPage}
              onChange={e => setInputPage(e.target.value)}
              onBlur={() => { const n = parseInt(inputPage); if (!isNaN(n)) goTo(n); else setInputPage(String(currentPage)); }}
              onKeyDown={e => { if (e.key === "Enter") { const n = parseInt(inputPage); if (!isNaN(n)) goTo(n); } }}
              className="w-14 h-8 text-center text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-muted-foreground">/ {totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 gap-1 px-3"
              onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages}>
              <span className="hidden sm:inline text-xs">{lang === "hi" ? "अगला" : "Next"}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0"
              onClick={() => goTo(totalPages)} disabled={currentPage === totalPages}>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Info strip ────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 bg-blue-500/8 border border-blue-500/20 rounded-2xl p-4">
        <Languages className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          {lang === "hi" ? (
            <>
              <span className="font-semibold text-foreground">NCERT की आधिकारिक पुस्तक</span> —
              PDF.js द्वारा सीधे browser में render हो रही है। कोई download नहीं चाहिए।
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">Official NCERT Textbook</span> —
              Rendered via PDF.js through Vite proxy. If issues,{" "}
              {currentBook && (
                <a href={currentBook.ncertUrl || currentBook.url} target="_blank" rel="noopener noreferrer"
                  className="text-primary underline">open on NCERT</a>
              )}.
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}
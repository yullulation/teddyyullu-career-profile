"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setScrollLocked } from "./SmoothScroll";

/**
 * Shows a PDF inside the page rather than sending the visitor to a new tab.
 * A download link stays available for anyone who wants the file itself.
 */
export default function DocumentModal({
  open,
  onClose,
  src,
  title,
  subtitle,
  accent = "var(--gold)",
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  /* onClose is typically an inline arrow, so it must not be an effect dependency
     — re-running the effect each render would release the scroll lock. */
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-md sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-black/5 bg-[#faf7f1] shadow-[0_40px_90px_rgba(15,55,38,0.3)]"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-black/5 px-7 py-5">
              <div>
                <p
                  className="text-[10px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: accent }}
                >
                  Supporting Evidence
                </p>
                <h3 className="mt-1.5 font-sans text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="mt-0.5 text-xs text-foreground/50">{subtitle}</p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <a
                  href={src}
                  download
                  className="rounded-full border border-black/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:border-black/25 hover:text-foreground"
                >
                  Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground shadow-[0_4px_14px_rgba(15,55,38,0.18)] transition-colors hover:bg-white/80"
                >
                  ✕
                </button>
              </div>
            </div>

            <object
              data={`${src}#view=FitH`}
              type="application/pdf"
              className="min-h-0 flex-1 bg-[#efece6]"
              aria-label={title}
            >
              {/* Shown when the browser cannot render a PDF inline */}
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="text-sm text-foreground/60">
                  Your browser can&apos;t display this document inline.
                </p>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                  style={{ backgroundColor: accent }}
                >
                  Open the document
                </a>
              </div>
            </object>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

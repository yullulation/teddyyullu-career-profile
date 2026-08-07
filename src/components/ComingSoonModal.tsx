"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setScrollLocked } from "./SmoothScroll";

/**
 * Shown in place of a download while the combined portfolio document is still
 * being compiled. Keeps the visitor on the page rather than handing them a
 * broken file.
 */
export default function ComingSoonModal({
  open,
  onClose,
  title = "Coming Soon",
  message,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}) {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-black/5 bg-[#f7fbf9] p-8 text-center shadow-[0_36px_80px_rgba(15,55,38,0.3)] sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-gold"
            >
              Close ✕
            </button>

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M12 7v5.4l3.2 1.9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
              Portfolio Document
            </p>
            <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">
              {message ??
                "The combined portfolio document is being finalised. In the meantime, the full career profile is available right here on this site."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

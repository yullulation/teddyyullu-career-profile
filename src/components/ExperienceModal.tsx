"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import EvidenceIcon from "./EvidenceIcon";
import { setScrollLocked } from "./SmoothScroll";
import type { Experience, ExperienceEvidence } from "@/data/experience";

/** Shared section head so every chapter reads the same way. */
function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
      {children}
    </span>
  );
}

export default function ExperienceModal({
  experience,
  onClose,
}: {
  experience: Experience | null;
  onClose: () => void;
}) {
  const [evidence, setEvidence] = useState<ExperienceEvidence | null>(null);

  const close = useCallback(() => {
    setEvidence(null);
    onClose();
  }, [onClose]);

  /* Callers pass inline arrows for onClose, so `close` gets a new identity on
     every render. Keeping the handler in a ref means the lock effect below can
     depend only on whether the modal is open — otherwise it tore itself down
     and back up each render, releasing the scroll lock and dropping Escape. */
  const handlersRef = useRef({ close, evidence });
  useEffect(() => {
    handlersRef.current = { close, evidence };
  }, [close, evidence]);

  const isOpen = Boolean(experience);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const { close: latestClose, evidence: openEvidence } = handlersRef.current;
      if (openEvidence) setEvidence(null);
      else latestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-md sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: experience.theme.bg }}
            className="relative flex max-h-[calc(100svh-4rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-black/5 shadow-[0_40px_90px_rgba(15,55,38,0.3)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_4px_14px_rgba(15,55,38,0.2)] transition-colors hover:bg-white"
            >
              ✕
            </button>

            {/* The card itself scrolls; the page behind it stays put. */}
            {/* flex-1 + min-h-0 are both required: a flex child defaults to
                min-height:auto, which stops it shrinking below its content and
                means overflow-y-auto never actually engages. */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.organization}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56rem"
                  className="object-cover"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
                  style={{
                    backgroundImage: `linear-gradient(to top,
                      ${experience.theme.bg} 0%, ${experience.theme.bg} 14%,
                      ${experience.theme.bg}f2 30%, ${experience.theme.bg}d9 44%,
                      ${experience.theme.bg}b3 57%, ${experience.theme.bg}80 69%,
                      ${experience.theme.bg}4d 80%, ${experience.theme.bg}26 91%,
                      ${experience.theme.bg}00 100%)`,
                  }}
                />
              </div>

              <div className="px-7 pb-12 pt-1 sm:px-10">
                {experience.logo ? (
                  <span className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_4px_14px_rgba(15,55,38,0.14)] ring-1 ring-black/5">
                    <Image
                      src={experience.logo}
                      alt={`${experience.organization} emblem`}
                      width={56}
                      height={56}
                      className="h-11 w-11 object-contain"
                    />
                  </span>
                ) : null}

                <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {experience.organization}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/60">
                    {experience.position}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-foreground/25" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
                    {experience.period}
                  </span>
                </div>
                {experience.unit ? (
                  <p className="mt-2 text-xs text-foreground/50">{experience.unit}</p>
                ) : null}

                {/* 1 — Role Overview */}
                <div className="mt-8">
                  <SectionHead>Role Overview</SectionHead>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
                    {experience.roleOverview}
                  </p>
                </div>

                {/* 2 — Professional Exposure */}
                <div className="mt-9 border-t border-black/5 pt-7">
                  <SectionHead>Professional Exposure</SectionHead>
                  <ul className="mt-5 space-y-3">
                    {experience.exposure.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/70"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 — Career Highlights */}
                <div className="mt-9 border-t border-black/5 pt-7">
                  <SectionHead>Career Highlights</SectionHead>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {experience.highlights.map((h) => (
                      <div
                        key={h.title}
                        className="rounded-xl border border-black/5 bg-white/70 p-5"
                      >
                        <h3 className="font-sans text-sm font-semibold text-foreground">
                          {h.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                          {h.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 — Skills Developed */}
                <div className="mt-9 border-t border-black/5 pt-7">
                  <SectionHead>Skills Developed</SectionHead>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.skillsDeveloped.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-black/5 bg-white/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5 — Professional Growth */}
                <div className="relative mt-9 border-t border-black/5 pt-8">
                  <SectionHead>Professional Growth</SectionHead>
                  <p className="mt-4 max-w-2xl font-display text-lg italic leading-snug text-foreground/85 sm:text-xl">
                    {experience.growth}
                  </p>
                </div>

                {/* 6 — Supporting Evidence, only where it genuinely exists */}
                {experience.evidence?.length ? (
                  <div className="mt-9 border-t border-black/5 pt-7">
                    <SectionHead>Supporting Evidence</SectionHead>
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {experience.evidence.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setEvidence(item)}
                          className="group/ev overflow-hidden rounded-xl border border-black/5 bg-white/70 text-left transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(15,55,38,0.14)]"
                        >
                          {item.image ? (
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.label}
                                fill
                                sizes="220px"
                                className="object-cover transition-transform duration-500 group-hover/ev:scale-[1.05]"
                              />
                            </div>
                          ) : (
                            <div className="flex aspect-[4/3] w-full items-center justify-center">
                              <EvidenceIcon
                                type={item.type}
                                className="h-7 w-7 text-foreground/45"
                              />
                            </div>
                          )}
                          <div className="p-3">
                            <span className="block text-[9px] font-medium uppercase tracking-[0.15em] text-foreground/40">
                              {item.type}
                            </span>
                            <span className="mt-1 block text-[11px] font-medium leading-snug text-foreground/80">
                              {item.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Evidence viewer */}
          <AnimatePresence>
            {evidence && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setEvidence(null);
                }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-6 py-10 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex max-h-full w-full max-w-2xl flex-col items-center"
                >
                  <button
                    type="button"
                    onClick={() => setEvidence(null)}
                    className="absolute -top-8 right-0 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
                  >
                    Close ✕
                  </button>
                  {evidence.image ? (
                    <Image
                      src={evidence.image}
                      alt={evidence.label}
                      width={1500}
                      height={1500}
                      className="max-h-[74vh] w-auto rounded-xl object-contain"
                    />
                  ) : (
                    <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-white/90">
                      <EvidenceIcon type={evidence.type} className="h-12 w-12 text-gold" />
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
                      {evidence.type}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">{evidence.label}</p>
                    <p className="mt-1 text-xs text-white/60">{evidence.note}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

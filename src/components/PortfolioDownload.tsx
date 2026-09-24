"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ComingSoonModal from "./ComingSoonModal";

const CONTENTS = [
  "Curriculum Vitae",
  "Academic Certificates",
  "Professional Certifications",
  "Recommendation Letters",
];

/**
 * The one download that matters, given its own dark panel so it reads as a
 * destination rather than another row of body copy.
 */
export default function PortfolioDownload() {
  const [soon, setSoon] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-16 overflow-hidden rounded-[26px] px-6 py-9 shadow-[0_28px_60px_-20px_rgba(15,55,38,0.5)] sm:px-12 sm:py-12"
        style={{ backgroundColor: "#12312a" }}
      >
        {/* soft light from the top-right, so the panel is not a flat block */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(143,224,183,0.16) 0%, rgba(143,224,183,0) 70%)",
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8fe0b7]">
              One Document
            </span>
            <h3 className="mt-4 max-w-md font-sans text-2xl font-semibold leading-tight tracking-tight text-[#f2f8f4] sm:text-3xl">
              Everything that backs up this profile, in a single file.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f2f8f4]/60">
              No hunting through pages. Every credential referenced across this site,
              compiled and ready to review offline.
            </p>

            <button
              type="button"
              onClick={() => setSoon(true)}
              className="group/dl mt-8 inline-flex max-w-full items-center gap-3 rounded-full bg-[#f2f8f4] py-3 pl-5 pr-3 text-left text-[10px] font-medium uppercase leading-snug tracking-[0.1em] text-[#12312a] transition-colors duration-300 hover:bg-white sm:pl-7 sm:text-xs sm:tracking-[0.2em]"
            >
              <span className="min-w-0 sm:whitespace-nowrap">Download Professional Portfolio</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#12312a] text-[#f2f8f4] transition-transform duration-300 group-hover/dl:translate-x-0.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* What is inside, as a checklist rather than a sentence */}
          <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10">
            {CONTENTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 bg-[#12312a] px-5 py-3.5 text-sm text-[#f2f8f4]/85"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-[#8fe0b7]">
                  <path
                    d="m5 12.5 4.2 4.2L19 7"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <ComingSoonModal open={soon} onClose={() => setSoon(false)} />
    </>
  );
}

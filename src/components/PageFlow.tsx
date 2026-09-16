"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Step = { href: string; label: string; caption: string };

function Arrow({ back }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
        back
          ? "group-hover/flow:-translate-x-1"
          : "group-hover/flow:translate-x-1"
      }`}
      aria-hidden
    >
      <path
        d={back ? "M19 12H5M5 12l6-6M5 12l6 6" : "M5 12h14M14 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The end-of-page signpost. Every page closes by naming what comes before and
 * after it, so nobody has to hunt the menu to keep moving through the profile.
 */
export default function PageFlow({ back, next }: { back?: Step; next?: Step }) {
  return (
    <section className="ink-panel relative overflow-hidden border-t border-[#eaf4ee]/10 px-6 py-14 sm:px-10 sm:py-16">
      <div
        className={`relative z-10 mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-stretch ${
          back && next ? "sm:gap-5" : ""
        }`}
      >
        {back && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <Link
              href={back.href}
              className="group/flow plate-ink flex h-full items-center gap-4 px-6 py-6 transition-colors duration-300 hover:border-lux/40 sm:px-8"
              style={{ borderRadius: 24 }}
            >
              <span className="text-[#cfe3d7]/70 transition-colors duration-300 group-hover/flow:text-lux">
                <Arrow back />
              </span>
              <span className="min-w-0">
                <span className="block text-[9.5px] font-medium uppercase tracking-[0.22em] text-[#cfe3d7]/45">
                  {back.caption}
                </span>
                <span className="mt-1.5 block truncate font-sans text-base font-semibold tracking-tight text-[#f2faf5] transition-colors duration-300 group-hover/flow:text-lux sm:text-lg">
                  {back.label}
                </span>
              </span>
            </Link>
          </motion.div>
        )}

        {next && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <Link
              href={next.href}
              className="group/flow flex h-full items-center justify-between gap-4 bg-lux px-6 py-6 transition-shadow duration-300 hover:shadow-[0_18px_44px_-10px_rgba(217,189,131,0.55)] sm:px-8"
              style={{ borderRadius: 24 }}
            >
              <span className="min-w-0">
                <span className="block text-[9.5px] font-medium uppercase tracking-[0.22em] text-[#14261d]/55">
                  {next.caption}
                </span>
                <span className="mt-1.5 block truncate font-sans text-base font-semibold tracking-tight text-[#14261d] sm:text-lg">
                  {next.label}
                </span>
              </span>
              <span className="text-[#14261d]">
                <Arrow />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The opening chapter for an inner page — the same dark field as the home
 * hero, so moving between pages feels like turning a page rather than
 * arriving somewhere else.
 */
export default function PageHero({
  eyebrow,
  title,
  ghost,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Set enormous and nearly dissolved behind the heading. */
  ghost: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="ink-panel relative overflow-hidden px-6 pb-24 pt-36 sm:px-10 sm:pb-28 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[38%] z-0 flex justify-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
          className="ghost-word ghost-word-dark text-[22vw] lg:text-[15vw]"
        >
          {ghost}
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-lux">
          {eyebrow}
        </span>
        <h1 className="display-xl mt-6 text-[2.7rem] text-[#f2faf5] sm:text-[4.2rem]">
          {title}
        </h1>
        <div className="lux-rule mx-auto mt-8 max-w-[200px]" />
        {children && (
          <p className="mt-8 text-[15px] leading-relaxed text-[#cfe3d7]/75">{children}</p>
        )}
      </motion.div>
    </section>
  );
}

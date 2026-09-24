"use client";

import { motion } from "framer-motion";

const ROLES = ["Urban & Regional Planner", "Urban Designer", "Graphic Designer"];

export default function Studio() {
  return (
    <section id="who-i-am" className="relative bg-background px-6 py-28 sm:px-10 lg:py-40">
      {/* The portrait lives in the hero; repeating it here weakened both, so this
          chapter is text alone, centred. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Who I Am
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <p className="display-xl mt-7 text-[2.4rem] text-foreground sm:text-[3.4rem]">
          Hi, I&apos;m{" "}
          <span className="font-display font-normal italic text-gold-soft">Teddy Yullu</span>.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {ROLES.map((role) => (
            <span
              key={role}
              className="glass rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/70 sm:text-[11px]"
            >
              {role}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-foreground/60">
          Professionally, I help shape better towns, neighborhoods, and communities through
          planning. Creatively, I help businesses and individuals communicate through
          thoughtful, purposeful design.
        </p>

        <div className="lux-rule mt-10 w-full max-w-[160px] opacity-60" />

        <div className="relative mt-10 max-w-2xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-display text-7xl leading-none text-gold/20"
          >
            &ldquo;
          </span>
          <p className="relative font-display text-lg italic leading-snug text-foreground/85 sm:text-2xl">
            While these disciplines may seem different, they are driven by the same purpose:
            solving problems through design. Whether I&apos;m preparing a development plan or
            creating a brand identity, I believe great design should be clear, functional, and
            meaningful—leaving a lasting impact on the people who experience it.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

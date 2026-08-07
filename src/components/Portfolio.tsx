"use client";

import { motion } from "framer-motion";
import WorkCarousel from "./WorkCarousel";

export default function Portfolio() {
  return (
    <section id="work" className="relative overflow-hidden bg-background py-28 sm:py-32 lg:py-40">
      <div className="mb-16 px-6 sm:mb-20 sm:px-10 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-4"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Selected Projects
          </span>
          <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A record of work delivered.
          </h2>
        </motion.div>
      </div>

      <WorkCarousel />
    </section>
  );
}

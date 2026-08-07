"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EvidenceIcon from "./EvidenceIcon";
import type { ExperienceEvidence } from "@/data/experience";

export default function EvidenceGrid({ evidence }: { evidence: ExperienceEvidence[] }) {
  const [active, setActive] = useState<ExperienceEvidence | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {evidence.map((item, i) => (
          <motion.button
            key={item.label}
            type="button"
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="glass group flex flex-col items-center gap-3 rounded-xl px-4 py-6 text-center shadow-[0_12px_30px_rgba(15,55,38,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,55,38,0.15)]"
          >
            <EvidenceIcon
              type={item.type}
              className="h-7 w-7 text-foreground/50 transition-colors group-hover:text-gold"
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/40">
              {item.type}
            </span>
            <span className="text-xs font-medium leading-snug text-foreground/75">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative flex max-w-sm flex-col items-center rounded-2xl p-8 text-center"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-gold"
              >
                Close ✕
              </button>
              <EvidenceIcon type={active.type} className="h-10 w-10 text-gold" />
              <span className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
                {active.type}
              </span>
              <h3 className="mt-2 font-sans text-lg font-semibold text-foreground">{active.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">{active.note}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion } from "framer-motion";

const CONCEPTS = [
  {
    title: "Site & Context Analysis",
    caption: "Reading a site before drawing on it — topography, movement, and context.",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <rect width="200" height="140" fill="#e8f4ed" />
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M -10 ${20 + i * 18} C 50 ${5 + i * 18}, 120 ${45 + i * 14}, 210 ${15 + i * 17}`}
            stroke="#2f8f63"
            strokeOpacity={0.25 + i * 0.06}
            strokeWidth="1"
            fill="none"
          />
        ))}
        <circle cx="130" cy="60" r="3" fill="#2f8f63" />
      </svg>
    ),
  },
  {
    title: "Neighborhood Master Plan",
    caption: "Zoning, density, and circulation resolved into one coherent block plan.",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <rect width="200" height="140" fill="#e8f4ed" />
        {[
          [10, 15, 40, 30], [60, 15, 30, 45], [100, 15, 55, 20],
          [10, 55, 60, 25], [80, 45, 35, 40], [125, 45, 30, 25],
          [10, 90, 45, 30], [65, 90, 40, 30], [115, 80, 40, 40],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            fill="none"
            stroke="#2f8f63"
            strokeOpacity={0.5}
            strokeWidth="1"
          />
        ))}
      </svg>
    ),
  },
  {
    title: "Public Space Concept",
    caption: "Where people gather — plazas, greens, and pedestrian-first corridors.",
    art: (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <rect width="200" height="140" fill="#e8f4ed" />
        <circle cx="100" cy="70" r="38" fill="none" stroke="#2f8f63" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="100" cy="70" r="24" fill="none" stroke="#2f8f63" strokeOpacity="0.4" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * 38;
          const y1 = 70 + Math.sin(angle) * 38;
          const x2 = 100 + Math.cos(angle) * 62;
          const y2 = 70 + Math.sin(angle) * 62;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2f8f63" strokeOpacity="0.3" strokeWidth="1" />
          );
        })}
      </svg>
    ),
  },
];

export default function UrbanPlanningMock() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {CONCEPTS.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass group overflow-hidden rounded-md transition-colors duration-300 hover:border-gold/40"
        >
          <div className="relative aspect-[10/7] w-full overflow-hidden">
            {c.art}
            <span className="glass absolute right-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-foreground/70">
              Concept
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-sans text-base font-medium text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/55">{c.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

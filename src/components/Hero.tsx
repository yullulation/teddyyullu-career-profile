"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { PillAction, PillButton } from "./AnimatedLink";
import ComingSoonModal from "./ComingSoonModal";
import HeroCards from "./HeroCards";

const ROLES = ["Urban & Regional Planner", "Graphic Designer"];

/** Stated as plain facts, not dashboard tiles. */
const METRICS = [
  { value: "4", label: "Professional Roles" },
  { value: "35+", label: "Projects Delivered" },
  { value: "2", label: "Active Collaborations" },
  { value: "2024", label: "BSc Awarded" },
];

export default function Hero() {
  const [soon, setSoon] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-background pb-16 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-0 lg:pt-0">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:min-h-[100svh] lg:grid-cols-[0.42fr_0.58fr] lg:gap-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            {ROLES.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/60">
                  {role}
                </span>
                {i < ROLES.length - 1 && <span className="h-1 w-1 rounded-full bg-gold/70" />}
              </span>
            ))}
          </div>

          <h1 className="font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Teddy Yullu
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/65 sm:text-base">
            A professional career profile presenting my qualifications, professional
            experience, projects, and supporting evidence in one place.
          </p>

          {/* Facts sit on their own quiet panel, divided rather than floating */}
          {/* Equal columns so the four labels sit on a common baseline at every width */}
          <dl className="mt-9 grid max-w-lg grid-cols-2 overflow-hidden rounded-2xl bg-white/55 ring-1 ring-black/[0.055] backdrop-blur-sm sm:grid-cols-4">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`flex flex-col justify-start px-5 py-5 ${
                  i % 2 === 1 ? "border-l border-black/[0.055]" : ""
                } ${i > 1 ? "border-t border-black/[0.055]" : ""} sm:border-t-0 ${
                  i > 0 ? "sm:border-l sm:border-black/[0.055]" : "sm:border-l-0"
                }`}
              >
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-sans text-[26px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
                  {m.value}
                </dd>
                <p className="mt-2.5 text-[9.5px] font-medium uppercase leading-[1.35] tracking-[0.13em] text-foreground/45">
                  {m.label}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PillAction onClick={() => setSoon(true)} variant="solid">
              Download Portfolio
            </PillAction>
            <PillButton href="/experience">Explore Career Profile</PillButton>
          </div>
        </motion.div>

        <div className="relative">
          <HeroCards />
        </div>
      </div>

      <ComingSoonModal open={soon} onClose={() => setSoon(false)} />
    </section>
  );
}

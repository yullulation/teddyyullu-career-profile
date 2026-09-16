"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PillAction, PillButton } from "./AnimatedLink";
import ComingSoonModal from "./ComingSoonModal";

const ROLES = ["Urban & Regional Planner", "Graphic Designer"];

const METRICS = [
  { value: "4", label: "Professional Roles" },
  { value: "35+", label: "Projects Delivered" },
  { value: "2", label: "Active Collaborations" },
  { value: "2024", label: "BSc Awarded" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [soon, setSoon] = useState(false);

  return (
    <section className="ink-panel relative w-full overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-0 lg:pt-0">
      {/* The name set enormous and almost dissolved, sitting behind everything. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[16%] z-0 flex justify-center lg:top-[12%]"
      >
        <motion.span
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="ghost-word ghost-word-dark text-[24vw] lg:text-[17vw]"
        >
          YULLU
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:min-h-[100svh] lg:grid-cols-[0.52fr_0.48fr] lg:gap-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="order-2 lg:order-1"
        >
          <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
            {ROLES.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-lux/90 sm:text-[11px]">
                  {role}
                </span>
                {i < ROLES.length - 1 && (
                  <span className="h-[3px] w-[3px] rounded-full bg-lux/60" />
                )}
              </span>
            ))}
          </div>

          <h1 className="display-xl text-[15vw] text-[#f2faf5] sm:text-[11vw] lg:text-[5.6rem]">
            Teddy
            <span className="block text-lux">Yullu</span>
          </h1>

          <div className="lux-rule mt-8 max-w-[220px]" />

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#cfe3d7]/80">
            A professional career profile presenting my qualifications, professional
            experience, projects, and supporting evidence in one place.
          </p>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.09, ease: EASE }}
                className="plate-ink px-4 py-4"
                style={{ borderRadius: 18 }}
              >
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-sans text-[25px] font-semibold leading-none tracking-tight text-[#f2faf5] tabular-nums">
                  {m.value}
                </dd>
                <p className="mt-2 text-[8.5px] font-medium uppercase leading-[1.4] tracking-[0.14em] text-[#cfe3d7]/55">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PillAction onClick={() => setSoon(true)} variant="lux">
              Download Portfolio
            </PillAction>
            <PillButton href="/experience" variant="ghost">
              Explore Career Profile
            </PillButton>
          </div>
        </motion.div>

        {/* Portrait on a bright plate — the Apple object, lit against the dark field. */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            {/* Bloom behind the plate so it reads as lit, not pasted on. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(47,143,99,0.5), transparent 62%)",
              }}
            />
            <div className="plate relative overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/hero/portrait.jpg"
                  alt="Teddy Yullu"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover object-top"
                />
              </div>

              {/* The Impreza name bar, restated as a quiet caption strip. */}
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-foreground/45">
                    Nairobi, Kenya
                  </p>
                  <p className="mt-1.5 font-sans text-sm font-semibold tracking-tight text-foreground">
                    Available for opportunities
                  </p>
                </div>
                <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-gold/40" />
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ComingSoonModal open={soon} onClose={() => setSoon(false)} />
    </section>
  );
}

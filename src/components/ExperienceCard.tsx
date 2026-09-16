"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PillAction } from "./AnimatedLink";
import type { Experience } from "@/data/experience";

export default function ExperienceCard({
  experience,
  index,
  onOpen,
}: {
  experience: Experience;
  index: number;
  onOpen: () => void;
}) {
  const chips = experience.skillsDeveloped.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      style={{ backgroundColor: experience.theme.bg }}
      className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-black/5 shadow-[0_20px_45px_rgba(15,55,38,0.1)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(15,55,38,0.18)]"
    >
      {/* Header image, fading into the card colour */}
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.organization}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* chips */}
        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-medium text-white/95 backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Fade confined to the lower third so the photograph reads clearly.
            It is fully solid by the bottom edge — just above the logo — and the
            multiple stops approximate an ease curve, since a plain two-stop
            gradient bands and reads as a hard edge. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
          style={{
            backgroundImage: `linear-gradient(to top,
              ${experience.theme.bg} 0%,
              ${experience.theme.bg} 14%,
              ${experience.theme.bg}f2 30%,
              ${experience.theme.bg}d9 44%,
              ${experience.theme.bg}b3 57%,
              ${experience.theme.bg}80 69%,
              ${experience.theme.bg}4d 80%,
              ${experience.theme.bg}26 91%,
              ${experience.theme.bg}00 100%)`,
          }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-7 pb-7 pt-1">
        {experience.logo ? (
          <span className="mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_4px_14px_rgba(15,55,38,0.14)] ring-1 ring-black/5">
            <Image
              src={experience.logo}
              alt={`${experience.organization} emblem`}
              width={48}
              height={48}
              className="h-9 w-9 object-contain"
            />
          </span>
        ) : null}

        <h3 className="font-sans text-xl font-semibold leading-tight tracking-tight text-foreground">
          {experience.organization}
        </h3>

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
          <p className="mt-3 text-[11px] leading-snug text-foreground/50">{experience.unit}</p>
        ) : null}

        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/70">
          {experience.summary}
        </p>

        <div className="mt-6">
          <PillAction onClick={onOpen}>Explore Experience</PillAction>
        </div>
      </div>
    </motion.div>
  );
}

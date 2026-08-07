"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { setQuietStart } from "@/lib/video";
import type { Client, ClientWork, Project } from "@/data/clients";

const rise = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
} as const;

function Tile({
  work,
  onSelect,
  className,
  sizes = "(max-width: 768px) 45vw, 22vw",
  ratio = true,
}: {
  work: ClientWork;
  onSelect: (w: ClientWork) => void;
  className?: string;
  sizes?: string;
  ratio?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(work)}
      className={`group relative block overflow-hidden rounded-xl ${className ?? ""}`}
      style={ratio ? { aspectRatio: `${work.width} / ${work.height}` } : undefined}
    >
      <Image
        src={work.src}
        alt={work.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-left text-[11px] font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {work.title}
        <span className="mt-0.5 block text-[9px] uppercase tracking-[0.15em] text-white/70">
          {work.category}
        </span>
      </span>
    </button>
  );
}

function ProjectVideo({ src, label, accent }: { src: string; label: string; accent: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/85">
      {play ? (
        <video
          src={src}
          controls
          autoPlay
          playsInline
          preload="none"
          onLoadedMetadata={(e) => setQuietStart(e.currentTarget)}
          className="h-full w-full object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
            style={{ borderColor: accent, color: accent }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
            {label}
          </span>
        </button>
      )}
    </div>
  );
}

/* ─────────────  LIFE-POOL: hero-led, alternating left/right  ───────────── */

function LightProject({
  project,
  index,
  theme,
  onSelect,
}: {
  project: Project;
  index: number;
  theme: Client["theme"];
  onSelect: (w: ClientWork) => void;
}) {
  const flip = index % 2 === 1;

  return (
    <motion.article {...rise} className="mt-20 first:mt-14">
      <div
        className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="lg:col-span-7">
          {project.video ? (
            <ProjectVideo src={project.video.src} label={project.video.label} accent={theme.accent} />
          ) : (
            <Tile
              work={project.cover}
              onSelect={onSelect}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="w-full shadow-[0_26px_60px_rgba(15,55,38,0.18)]"
            />
          )}
        </div>

        <div className={`lg:col-span-5 ${flip ? "lg:text-right" : ""}`}>
          <div className={`flex items-center gap-3 ${flip ? "lg:justify-end" : ""}`}>
            <span
              className="font-display text-4xl italic leading-none"
              style={{ color: `${theme.accent}59` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="text-[10px] font-medium uppercase tracking-[0.24em]"
              style={{ color: theme.accent }}
            >
              {project.kicker}
            </span>
          </div>

          <h3
            className="mt-3 font-sans text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: theme.ink }}
          >
            {project.title}
          </h3>
          <p
            className={`mt-4 max-w-md text-sm leading-relaxed ${flip ? "lg:ml-auto" : ""}`}
            style={{ color: theme.muted }}
          >
            {project.description}
          </p>

          {project.gallery.length > 0 && (
            <p
              className="mt-5 text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{ color: `${theme.ink}59` }}
            >
              {project.gallery.length + 1} pieces delivered
            </p>
          )}
        </div>
      </div>

      {project.gallery.length > 0 && (
        <div
          data-lenis-prevent
          className="mt-7 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]"
        >
          {project.gallery.map((w) => (
            <Tile
              key={w.src}
              work={w}
              onSelect={onSelect}
              sizes="320px"
              className="h-[150px] w-auto shrink-0 shadow-[0_12px_28px_rgba(15,55,38,0.12)] sm:h-[180px]"
            />
          ))}
        </div>
      )}
    </motion.article>
  );
}

/* ─────────  VOWEBI: no hero piece. Every work sits in one gold mosaic  ───────── */

function GoldProject({
  project,
  index,
  theme,
  onSelect,
}: {
  project: Project;
  index: number;
  theme: Client["theme"];
  onSelect: (w: ClientWork) => void;
}) {
  const all = [project.cover, ...project.gallery];

  return (
    <motion.article {...rise} className="mt-24 first:mt-16">
      {/* Header hugs the right — the mirror of Life-Pool's left-led blocks */}
      <div className="flex flex-col items-end border-b pb-6 text-right" style={{ borderColor: `${theme.accent}33` }}>
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.26em]"
            style={{ color: theme.accent }}
          >
            {project.kicker}
          </span>
          <span className="h-px w-10" style={{ backgroundColor: `${theme.accent}66` }} />
          <span
            className="font-sans text-xs font-semibold tabular-nums"
            style={{ color: `${theme.ink}80` }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="mt-3 font-sans text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ color: theme.ink }}
        >
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: theme.muted }}>
          {project.description}
        </p>
        <span
          className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{ color: `${theme.ink}59` }}
        >
          {all.length} {all.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {/* Masonry — nothing is promoted above anything else */}
      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {all.map((w) => (
          <div key={w.src} className="break-inside-avoid">
            <Tile
              work={w}
              onSelect={onSelect}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="w-full shadow-[0_14px_32px_rgba(120,90,20,0.16)]"
            />
          </div>
        ))}
      </div>
    </motion.article>
  );
}

/* ────────────────────────────────  Section  ──────────────────────────────── */

export default function ClientSection({
  client,
  onSelect,
}: {
  client: Client;
  onSelect: (work: ClientWork) => void;
}) {
  const gold = client.mode === "gold";
  const t = client.theme;

  return (
    <section
      id={client.slug}
      className="scroll-mt-24 px-6 py-24 sm:px-10 lg:py-32"
      style={{ backgroundColor: t.bg }}
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Masthead: Life-Pool puts the mark first, VOWEBI puts the words first ── */}
        {gold ? (
          <motion.div {...rise} className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2
                className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ color: t.ink }}
              >
                {client.name}
              </h2>
              <p
                className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: t.accent }}
              >
                {client.fullName}
              </p>
              <p className="mt-5 text-sm leading-relaxed sm:text-base" style={{ color: t.muted }}>
                {client.intro}
              </p>
            </div>
            {/* The mark keeps its gold-on-black lockup, held on a plate */}
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="relative h-28 w-full max-w-[260px] overflow-hidden rounded-2xl bg-[#0d0b07] p-5 shadow-[0_18px_40px_rgba(120,90,20,0.24)]">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div {...rise} className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="relative h-28 w-full max-w-[240px]">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2
                className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ color: t.ink }}
              >
                {client.name}
              </h2>
              <p className="mt-5 text-sm leading-relaxed sm:text-base" style={{ color: t.muted }}>
                {client.intro}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Overview: the two clients mirror each other's column order ── */}
        <motion.div {...rise} className="mt-14 grid gap-8 lg:grid-cols-12">
          {gold ? (
            <>
              <dl className="lg:col-span-7">
                {client.overview.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-6 border-b py-3.5 last:border-b-0"
                    style={{ borderColor: `${t.accent}2e` }}
                  >
                    <dt
                      className="text-[10px] font-medium uppercase tracking-[0.2em]"
                      style={{ color: `${t.ink}73` }}
                    >
                      {f.label}
                    </dt>
                    <dd className="font-sans text-sm font-semibold" style={{ color: t.ink }}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="lg:col-span-5 lg:pl-10 lg:text-right">
                <p
                  className="text-[10px] font-medium uppercase tracking-[0.24em]"
                  style={{ color: t.accent }}
                >
                  Primary Services
                </p>
                <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">
                  {client.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                      style={{
                        backgroundColor: t.panel,
                        color: t.muted,
                        border: `1px solid ${t.accent}2e`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-5">
                <p
                  className="text-[10px] font-medium uppercase tracking-[0.24em]"
                  style={{ color: t.accent }}
                >
                  Primary Services
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {client.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-black/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                      style={{ backgroundColor: t.panel, color: t.muted }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <dl className="lg:col-span-7 lg:pl-10">
                {client.overview.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-6 border-b py-3.5 last:border-b-0"
                    style={{ borderColor: "rgba(22,38,31,0.09)" }}
                  >
                    <dt
                      className="text-[10px] font-medium uppercase tracking-[0.2em]"
                      style={{ color: `${t.ink}73` }}
                    >
                      {f.label}
                    </dt>
                    <dd className="font-sans text-sm font-semibold" style={{ color: t.ink }}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </motion.div>

        {/* ── Work ── */}
        <div className="mt-6">
          {client.projects.map((p, i) =>
            gold ? (
              <GoldProject key={p.title} project={p} index={i} theme={t} onSelect={onSelect} />
            ) : (
              <LightProject key={p.title} project={p} index={i} theme={t} onSelect={onSelect} />
            )
          )}
        </div>

        {/* ── Reflection + Impact, mirrored between the two clients ── */}
        <motion.div {...rise} className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div
            className={`lg:col-span-5 lg:pt-10 ${gold ? "lg:order-1" : "lg:order-2"}`}
          >
            <p
              className="text-[10px] font-medium uppercase tracking-[0.24em]"
              style={{ color: t.accent }}
            >
              Collaboration Impact
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: t.muted }}>
              {client.impact}
            </p>
          </div>

          <figure
            className={`relative rounded-2xl p-8 sm:p-10 lg:col-span-7 ${
              gold ? "lg:order-2" : "lg:order-1"
            }`}
            style={{
              backgroundColor: t.panel,
              border: gold ? `1px solid ${t.accent}2e` : "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <span
              className="absolute -top-3 left-7 select-none font-display text-6xl leading-none"
              style={{ color: `${t.accent}4d` }}
            >
              &ldquo;
            </span>
            {client.reflection.placeholder ? (
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em]"
                style={{ backgroundColor: "rgba(0,0,0,0.04)", color: t.muted }}
              >
                Placeholder — awaiting their words
              </span>
            ) : null}
            <blockquote
              className="font-display text-lg italic leading-snug sm:text-xl"
              style={{ color: t.ink }}
            >
              {client.reflection.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm font-medium" style={{ color: t.ink }}>
              {client.reflection.author}
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

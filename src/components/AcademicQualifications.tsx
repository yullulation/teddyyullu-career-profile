"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PillAction, PillButton } from "./AnimatedLink";
import { PORTFOLIO_PDF } from "@/data/site";

/** Solid tint so the campus photo can fade into the card, as on the experience cards. */
const CARD_BG = "#eef6f1";

const FACTS = [
  { label: "Institution", value: "Maasai Mara University" },
  { label: "Years", value: "2020 — 2024" },
  { label: "Academic Status", value: "Degree Awarded" },
];

const DETAILS = [
  {
    label: "Final Year Research",
    value:
      "Independent research project examining land use patterns and their influence on the growth of peri-urban settlements.",
  },
  {
    label: "Core Coursework",
    value:
      "Physical planning, land economics, GIS and spatial analysis, development control, environmental planning, and urban design.",
  },
  {
    label: "Verification",
    value:
      "Academic certificates and transcripts are included in the downloadable professional portfolio.",
  },
];

export default function AcademicQualifications() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="qualifications"
      className="scroll-mt-24 border-t border-black/5 px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-xl"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Academic Qualifications
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The formal grounding.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          style={{ backgroundColor: CARD_BG }}
          className="relative overflow-hidden rounded-2xl border border-black/5 p-8 shadow-[0_20px_45px_rgba(15,55,38,0.1)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(15,55,38,0.18)] sm:p-10"
        >
          {/* Campus photo blended into the right edge — masked so it dissolves into the
              card. The card keeps its original size; the photo sits behind the content. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
            <Image
              src="/images/experience/maasai-mara-university.jpg"
              alt=""
              aria-hidden
              fill
              sizes="40vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right,
                  ${CARD_BG} 0%, ${CARD_BG} 14%, ${CARD_BG}f2 28%,
                  ${CARD_BG}d9 42%, ${CARD_BG}b3 56%, ${CARD_BG}8c 70%,
                  ${CARD_BG}66 84%, ${CARD_BG}4d 100%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to bottom,
                  ${CARD_BG} 0%, ${CARD_BG}00 20%, ${CARD_BG}00 80%, ${CARD_BG} 100%)`,
              }}
            />
          </div>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-lg">
              <span className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_4px_14px_rgba(15,55,38,0.14)] ring-1 ring-black/5">
                <Image
                  src="/images/logos/maasai-mara-university.png"
                  alt="Maasai Mara University crest"
                  width={56}
                  height={56}
                  className="h-11 w-11 object-contain"
                />
              </span>

              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                Degree
              </span>
              <h3 className="mt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                Bachelor of Urban and Regional Planning
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                Preceded by secondary education at Makueni High School, 2016 — 2019.
              </p>
            </div>

            <dl className="grid shrink-0 grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-8">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground/85">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* expandable academic detail */}
          <div
            className="relative grid transition-all duration-500 ease-out"
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              opacity: open ? 1 : 0,
              marginTop: open ? 32 : 0,
            }}
          >
            <div className="overflow-hidden">
              <div className="grid gap-6 border-t border-black/5 pt-8 sm:grid-cols-3">
                {DETAILS.map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-9 flex flex-wrap items-center gap-4">
            <PillAction onClick={() => setOpen((v) => !v)} expanded={open}>
              {open ? "Hide Academic Details" : "View Academic Details"}
            </PillAction>
            <PillButton href={PORTFOLIO_PDF} external>
              Download Professional Portfolio
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PillAction } from "./AnimatedLink";
import DocumentModal from "./DocumentModal";

export const AJIRA_LETTER = "/documents/ajira-recommendation-letter.pdf";
const AJIRA = { accent: "#e0741f", tint: "#fdf3e9" };

const FACTS = [
  { label: "Organisation", value: "Ajira Digital Office — Makindu" },
  { label: "Engagement", value: "Volunteer Service" },
  { label: "Year", value: "2026" },
];

const CONTRIBUTIONS = [
  "Delivered practical graphic design training",
  "Introduced branding and visual communication principles",
  "Mentored learners through hands-on design projects",
  "Supported youth digital skills development",
];

export default function ProfessionalContribution() {
  const [open, setOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section
      id="contribution"
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
            Professional Contribution
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Giving back to the community.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/60">
            Professional growth extends beyond personal achievement. It also involves
            investing in others through mentorship, teaching, and community service.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/60">
            Alongside my work as a Physical Planner and Graphic Designer, I have volunteered
            as a Graphic Design Instructor, helping young creatives develop practical design
            skills and confidence using modern digital tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          className="rounded-2xl border border-black/5 p-8 shadow-[0_20px_45px_rgba(15,55,38,0.1)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(15,55,38,0.18)] sm:p-10"
          style={{ backgroundColor: AJIRA.tint }}
        >
          {/* Ajira lockup — the programme's own mark, not the site green */}
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-black/5 pb-7">
            <span className="relative block h-12 w-[150px] shrink-0 sm:h-14 sm:w-[176px]">
              <Image
                src="/images/logos/ajira-digital.png"
                alt="Ajira Digital Programme"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </span>
            <span className="h-8 w-px bg-black/10" aria-hidden />
            <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/45">
              Makindu Office · Youth Digital Skills
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-lg">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: AJIRA.accent }}
              >
                Role
              </span>
              <h3 className="mt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                Volunteer Graphic Design Instructor
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                Delivered practical training in graphic design, branding, visual
                communication, and creative problem-solving. The programme focused on
                equipping young people with employable digital skills through hands-on
                learning.
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

          {/* Expandable contributions — same mechanic as the qualifications card */}
          <div
            className="grid transition-all duration-500 ease-out"
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              opacity: open ? 1 : 0,
              marginTop: open ? 32 : 0,
            }}
          >
            <div className="overflow-hidden">
              <div className="border-t border-black/5 pt-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                  Key Contributions
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {CONTRIBUTIONS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/65"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p
                  className="mt-8 text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: AJIRA.accent }}
                >
                  Supporting Evidence
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                  The signed recommendation letter from the Ajira Digital Office is
                  available below and included in the downloadable portfolio.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PillAction onClick={() => setOpen((v) => !v)} expanded={open}>
              {open ? "Hide Contribution Details" : "View Contribution Details"}
            </PillAction>
            <PillAction onClick={() => setLetterOpen(true)}>View Recommendation</PillAction>
          </div>
        </motion.div>
      </div>

      <DocumentModal
        open={letterOpen}
        onClose={() => setLetterOpen(false)}
        src={AJIRA_LETTER}
        title="Recommendation Letter"
        subtitle="Ajira Digital Office — Makindu"
        accent={AJIRA.accent}
      />
    </section>
  );
}

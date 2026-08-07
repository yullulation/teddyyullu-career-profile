"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PillAction, PillButton } from "./AnimatedLink";
import { setScrollLocked } from "./SmoothScroll";
import { PORTFOLIO_PDF } from "@/data/site";

type Reference = {
  name: string;
  position: string;
  organisation: string;
  relationship: string;
  initials: string;
};

/** Referee phone numbers and emails are deliberately absent from this file: a blur
 *  can be lifted in dev tools, so the values never reach the browser at all. */
const REFERENCES: Reference[] = [
  {
    name: "James Muuo",
    position: "Physical Planner",
    organisation: "County Government of Makueni",
    relationship: "Supervisor",
    initials: "JM",
  },
  {
    name: "Dr. Charity Konana",
    position: "Lecturer",
    organisation: "Maasai Mara University",
    relationship: "Academic Referee",
    initials: "CK",
  },
];

export default function ProfessionalReferences() {
  const [active, setActive] = useState<Reference | null>(null);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="references"
      className="scroll-mt-24 border-t border-black/5 px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-xl"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Professional References
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Verified by the people I worked with.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/60">
            Professional references are available to verify my experience, work ethic, and
            professional contributions.
          </p>
        </motion.div>

        <div className="grid max-w-4xl auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2">
          {REFERENCES.map((ref, i) => (
            <motion.div
              key={ref.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass flex h-full flex-col rounded-2xl p-7 shadow-[0_20px_45px_rgba(15,55,38,0.1)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(15,55,38,0.18)]"
            >
              <div className="flex items-start gap-4">
                <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-wide text-gold">
                  {ref.initials}
                </span>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                    {ref.relationship}
                  </p>
                  <h3 className="mt-1 font-sans text-base font-semibold leading-snug text-foreground">
                    {ref.name}
                  </h3>
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/70">
                {ref.position}
                <span className="mt-0.5 block text-foreground/55">{ref.organisation}</span>
              </p>

              <div className="mt-6">
                <PillAction onClick={() => setActive(ref)}>View Reference</PillAction>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col items-start gap-4 border-t border-black/5 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-sm leading-relaxed text-foreground/55">
            One document containing the CV, academic certificates, professional
            certifications, and recommendation letters.
          </p>
          <PillButton href={PORTFOLIO_PDF} external>
            Download Professional Portfolio
          </PillButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-black/5 bg-[#f7fbf9] p-8 shadow-[0_36px_80px_rgba(15,55,38,0.3)]"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-gold"
              >
                Close ✕
              </button>

              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                {active.initials}
              </span>

              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                {active.relationship}
              </p>
              <h3 className="mt-1.5 font-sans text-2xl font-semibold tracking-tight text-foreground">
                {active.name}
              </h3>
              <p className="mt-1 text-sm text-foreground/65">{active.position}</p>
              <p className="text-sm text-foreground/55">{active.organisation}</p>

              {/* Referee contact details stay obscured — the card shows that a
                  verifiable referee exists without exposing their number publicly. */}
              <dl className="mt-7 space-y-4 border-t border-black/5 pt-6">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Phone
                  </dt>
                  <dd className="mt-1 select-none text-sm font-medium text-foreground blur-[5px]" aria-hidden>
                    +254 7•• ••• •••
                  </dd>
                  <span className="sr-only">Withheld — available on request</span>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Email
                  </dt>
                  <dd className="mt-1 select-none text-sm font-medium text-foreground blur-[5px]" aria-hidden>
                    ••••••••••@•••••.com
                  </dd>
                  <span className="sr-only">Withheld — available on request</span>
                </div>
              </dl>

              <p className="mt-6 text-[11px] leading-relaxed text-foreground/45">
                Contact details are withheld to protect my referees. They are shared
                directly on request, in connection with a genuine professional enquiry.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

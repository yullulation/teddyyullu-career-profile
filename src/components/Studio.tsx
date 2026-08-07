"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ROLES = ["Urban & Regional Planner", "Urban Designer", "Graphic Designer"];

export default function Studio() {
  return (
    <section id="who-i-am" className="relative bg-background px-6 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Who I Am
            </span>
            <span className="h-px flex-1 max-w-16 bg-gradient-to-r from-gold/50 to-transparent" />
          </div>

          <p className="mt-6 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="italic font-display font-normal text-gold-soft">
              Teddy Yullu
            </span>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <span
                key={role}
                className="glass rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/70"
              >
                {role}
              </span>
            ))}
          </div>

          <div className="relative mt-9 pl-6">
            <span className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
            <p className="max-w-md text-sm leading-relaxed text-foreground/60">
              Professionally, I help shape better towns, neighborhoods, and communities
              through planning. Creatively, I help businesses and individuals communicate
              through thoughtful, purposeful design.
            </p>
          </div>

          <div className="relative mt-8 max-w-lg pl-6">
            <span className="absolute -left-1 -top-3 select-none font-display text-6xl leading-none text-gold/25">
              &ldquo;
            </span>
            <p className="relative font-display text-xl italic leading-snug text-foreground/85 sm:text-2xl">
              While these disciplines may seem different, they are driven by the same
              purpose: solving problems through design. Whether I&apos;m preparing a
              development plan or creating a brand identity, I believe great design should
              be clear, functional, and meaningful—leaving a lasting impact on the people
              who experience it.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-md lg:mx-0"
          style={{ aspectRatio: "1122 / 1402" }}
        >
          <Image
            src="/images/hero/portrait.jpg"
            alt="Portrait — founder of YULLULATION"
            fill
            sizes="(max-width: 1024px) 80vw, 30vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
        </motion.div>
      </div>
    </section>
  );
}

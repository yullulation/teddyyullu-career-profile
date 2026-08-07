"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ClientSection from "@/components/ClientSection";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import Footer from "@/components/Footer";
import { CLIENTS, type ClientWork } from "@/data/clients";

export default function PortfolioPage() {
  const [active, setActive] = useState<LightboxItem | null>(null);

  const open = (work: ClientWork) =>
    setActive({
      src: work.src,
      title: work.title,
      category: work.category,
      width: work.width,
      height: work.height,
    });

  return (
    <main className="relative bg-background">
      <section className="px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Career Profile
          </span>
          <h1 className="mt-6 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Professional Collaborations
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/60 sm:text-base">
            Every professional relationship tells a story. The organisations below represent collaborations built on trust, consistency, and meaningful delivery. Explore each partnership to understand the work completed, the responsibilities entrusted to me, and the impact created together.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {CLIENTS.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="glass rounded-full px-5 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-gold"
            >
              {c.name}
            </a>
          ))}
        </div>
      </section>

      {CLIENTS.map((client) => (
        <ClientSection key={client.slug} client={client} onSelect={open} />
      ))}

      <Lightbox item={active} onClose={() => setActive(null)} />
      <Footer />
    </main>
  );
}

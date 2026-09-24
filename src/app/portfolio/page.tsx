"use client";

import { useState } from "react";
import ClientSection from "@/components/ClientSection";
import Lightbox, { type LightboxItem } from "@/components/Lightbox";
import PageHero from "@/components/PageHero";
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
      <PageHero eyebrow="Career Profile" title="Professional Collaborations" ghost="WORK">
        Every professional relationship tells a story. The organisations below represent
        collaborations built on trust, consistency, and meaningful delivery.
      </PageHero>

      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 px-6 pt-14">
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


      {CLIENTS.map((client) => (
        <ClientSection key={client.slug} client={client} onSelect={open} />
      ))}

      <Lightbox item={active} onClose={() => setActive(null)} />
      <Footer
        onDark
        back={{ href: "/experience", label: "Experience" }}
        next={{ href: "/contact", label: "Let's Connect" }}
      />
    </main>
  );
}

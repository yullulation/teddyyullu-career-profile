"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  /** Small meta pills, mirroring the spec-chip row on a product card. */
  chips: string[];
  /** Two-tone headline: strong line, then a muted continuation. */
  titleTop: string;
  titleSub: string;
  body: string;
  image: string;
  /** Logos need breathing room; photographs should fill the plate. */
  fit: "contain" | "cover";
};

type Pillar = {
  key: string;
  label: string;
  href: string;
  cta: string;
  slides: Slide[];
};

const PILLARS: Pillar[] = [
  {
    key: "experience",
    label: "Experience",
    href: "/experience",
    cta: "View Experience",
    slides: [
      {
        chips: ["2026", "Intern"],
        titleTop: "State Department",
        titleSub: "Housing & Urban Dev.",
        body: "National land use review and development control.",
        image: "/images/logos/state-department-housing.png",
        fit: "contain",
      },
      {
        chips: ["2026 – Now", "Volunteer"],
        titleTop: "Makueni County",
        titleSub: "Kibwezi West",
        body: "Sub county physical planning office.",
        image: "/images/logos/makueni-county.png",
        fit: "contain",
      },
      {
        chips: ["2023", "Attaché"],
        titleTop: "Makueni County",
        titleSub: "Physical Planning",
        body: "Development control and planning documentation.",
        image: "/images/logos/makueni-county.png",
        fit: "contain",
      },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    href: "/experience",
    cta: "View Project",
    slides: [
      {
        chips: ["Site review", "Planning"],
        titleTop: "Makindu KMTC",
        titleSub: "Planning Project",
        body: "Site layout reviewed against the approved plan.",
        image: "/images/mock/site-visit.jpg",
        fit: "cover",
      },
      {
        chips: ["National", "Housing"],
        titleTop: "Affordable Housing",
        titleSub: "Programme",
        body: "Land use review supporting housing delivery.",
        image: "/images/evidence/housing/20260410-093658.webp",
        fit: "cover",
      },
      {
        chips: ["Zoning", "GIS"],
        titleTop: "Land Use Study",
        titleSub: "Boundary & Zoning",
        body: "Base mapping for area planning studies.",
        image: "/images/evidence/housing/20260410-121533.webp",
        fit: "cover",
      },
    ],
  },
  {
    key: "collaborations",
    label: "Collaborations",
    href: "/portfolio",
    cta: "Explore",
    slides: [
      {
        chips: ["2025 – Now", "22+"],
        titleTop: "VOWEBI",
        titleSub: "Design Partner",
        body: "Brand identity, campaigns and member engagement.",
        image: "/images/clients/logos/vowebi.webp",
        fit: "cover",
      },
      {
        chips: ["2025 – Now", "3 events"],
        titleTop: "Life-Pool Chapel",
        titleSub: "Design Partner",
        body: "Jesus Fest, Malkias Summit and Q Fest branding.",
        image: "/images/clients/logos/lifepool.png",
        fit: "contain",
      },
    ],
  },
  {
    key: "qualifications",
    label: "Qualifications",
    href: "/#qualifications",
    cta: "View Credentials",
    slides: [
      {
        chips: ["2020 – 2024", "Awarded"],
        titleTop: "BSc Urban &",
        titleSub: "Regional Planning",
        body: "Maasai Mara University. Certificates in the portfolio.",
        image: "/images/logos/maasai-mara-university.png",
        fit: "contain",
      },
      {
        chips: ["2026", "Volunteer"],
        titleTop: "Design Instructor",
        titleSub: "Ajira Digital",
        body: "Practical training in design and visual communication.",
        image: "/images/logos/maasai-mara-university.png",
        fit: "contain",
      },
    ],
  },
];

/** Deliberately uneven so the four cards never turn over in lockstep. */
const INTERVALS = [2400, 2800, 2600, 3000];

function PillarCard({ pillar, interval }: { pillar: Pillar; interval: number }) {
  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    if (pillar.slides.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setI((n) => (n + 1) % pillar.slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, pillar.slides.length]);

  const slide = pillar.slides[i];

  return (
    <Link
      href={pillar.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/card relative flex aspect-[3/4] flex-col overflow-hidden rounded-[22px] bg-white p-2.5 ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-400"
      style={{
        boxShadow: hovered
          ? "0 30px 60px -18px rgba(15,55,38,0.30), 0 6px 16px rgba(15,55,38,0.08)"
          : "0 18px 40px -20px rgba(15,55,38,0.22), 0 3px 10px rgba(15,55,38,0.05)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Media plate — the product-shot area from the reference */}
      <div className="relative h-[42%] w-full shrink-0 overflow-hidden rounded-[15px] bg-[#f1f4f2]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image + slide.titleTop}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="220px"
              className={
                slide.fit === "contain"
                  ? "object-contain p-3 transition-transform duration-700 group-hover/card:scale-[1.06]"
                  : "object-cover transition-transform duration-700 group-hover/card:scale-[1.06]"
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Pillar tag, top-left of the plate */}
        <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-[3px] text-[7px] font-semibold uppercase tracking-[0.14em] text-foreground/70 backdrop-blur-sm">
          {pillar.label}
        </span>
      </div>

      {/* Text block */}
      <div className="relative flex flex-1 flex-col px-1.5 pb-0.5 pt-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.titleTop + slide.titleSub}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col"
          >
            {/* Spec chips */}
            <div className="flex flex-wrap gap-1">
              {slide.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-black/[0.045] px-2 py-[2.5px] text-[7px] lg:text-[8px] font-medium tracking-wide text-foreground/60"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Two-tone headline, as on the reference card */}
            <h3 className="mt-1.5 font-sans text-[12px] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[13px] lg:text-[14.5px]">
              {slide.titleTop}
            </h3>
            <p className="font-sans text-[12px] font-semibold leading-[1.15] tracking-tight text-foreground/32 sm:text-[13px] lg:text-[14.5px]">
              {slide.titleSub}
            </p>

            <p className="mt-1.5 text-[8.5px] leading-[1.45] text-foreground/45 lg:text-[9.5px]">{slide.body}</p>
          </motion.div>
        </AnimatePresence>

        <span className="mt-auto flex items-center gap-1 pt-1.5 text-[7.5px] font-semibold uppercase tracking-[0.14em] text-gold">
          {pillar.cta}
          <span className="transition-transform duration-300 group-hover/card:translate-x-0.5">→</span>
        </span>
      </div>

      {/* Rotation position */}
      {pillar.slides.length > 1 && (
        <span className="absolute bottom-2.5 right-2.5 flex gap-[3px]">
          {pillar.slides.map((s, n) => (
            <span
              key={s.titleTop + n}
              className="h-[3px] rounded-full transition-all duration-300"
              style={{
                width: n === i ? 9 : 3,
                backgroundColor: n === i ? "var(--gold)" : "rgba(22,38,31,0.16)",
              }}
            />
          ))}
        </span>
      )}
    </Link>
  );
}

export default function HeroCards() {
  return (
    <div className="mx-auto grid w-[300px] grid-cols-2 gap-3.5 sm:w-[340px] sm:gap-4 lg:w-[500px] lg:gap-5">
      {PILLARS.map((p, i) => (
        <PillarCard key={p.key} pillar={p} interval={INTERVALS[i]} />
      ))}
    </div>
  );
}

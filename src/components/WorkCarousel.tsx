"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Lightbox from "./Lightbox";
import { PillButton } from "./AnimatedLink";

type Project = {
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
};

const ROW_A: Project[] = [
  { src: "/images/work/babus-delicacies.webp", title: "Babus Delicacies", category: "Brand Identity", width: 1080, height: 1920 },
  { src: "/images/work/urban-drift.webp", title: "Urban Drift", category: "Campaign Design", width: 1152, height: 2048 },
  { src: "/images/work/eat-to-be-exceptional.webp", title: "Eat to Be Exceptional", category: "Editorial / Print", width: 1080, height: 1080 },
  { src: "/images/work/malkias-summit.webp", title: "Malkias Summit", category: "Event Branding", width: 1600, height: 900 },
  { src: "/images/work/graphiskool.webp", title: "Graphiskool", category: "Logo & Identity", width: 1400, height: 1400 },
  { src: "/images/work/annatoria.webp", title: "Annatoria", category: "Typographic Campaign", width: 1600, height: 800 },
];

const ROW_B: Project[] = [
  { src: "/images/work/gt3rs.webp", title: "GT3RS", category: "Poster Design", width: 1080, height: 1350 },
  { src: "/images/work/power-secret-place.webp", title: "Power in the Secret Place", category: "Event Poster", width: 1080, height: 1080 },
  { src: "/images/work/bbq-corner.webp", title: "BBQ Corner", category: "Brand Identity", width: 1080, height: 1920 },
  { src: "/images/work/nywele-na-notes.webp", title: "Nywele na Notes", category: "Event Branding", width: 1600, height: 1422 },
  { src: "/images/work/yullulation-web-concept.webp", title: "Yullulation — Web Concept", category: "Web & UI Design", width: 1800, height: 900 },
  { src: "/images/work/bird-brand-concept.webp", title: "Bird", category: "Brand Concept", width: 1080, height: 1080 },
];

const BREAKPOINTS = {
  base: { cardW: 190, cardH: 260, gap: 20 },
  sm: { cardW: 230, cardH: 310, gap: 24 },
  lg: { cardW: 280, cardH: 370, gap: 32 },
};

function useSize() {
  const [size, setSize] = useState<keyof typeof BREAKPOINTS>("base");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setSize(w >= 1024 ? "lg" : w >= 640 ? "sm" : "base");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return BREAKPOINTS[size];
}

function ArcCard({
  project,
  index,
  unit,
  cardW,
  cardH,
  x,
  containerWidthRef,
  onSelect,
}: {
  project: Project;
  index: number;
  unit: number;
  cardW: number;
  cardH: number;
  x: ReturnType<typeof useMotionValue<number>>;
  containerWidthRef: React.RefObject<number>;
  onSelect: (p: Project) => void;
}) {
  const transform = useTransform(x, (v) => {
    const containerW = containerWidthRef.current || 1200;
    const cardCenter = index * unit + cardW / 2 + v;
    const t = (cardCenter - containerW / 2) / (containerW / 2);
    const tc = Math.max(-1.5, Math.min(1.5, t));
    const dip = tc * tc * 34;
    const rotate = tc * 7;
    const scale = 1 - Math.min(0.22, Math.abs(tc) * 0.16);
    return `translateY(${dip}px) rotate(${rotate}deg) scale(${scale})`;
  });

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project)}
      style={{
        position: "absolute",
        left: index * unit,
        width: cardW,
        height: cardH,
        transform,
      }}
      className="group overflow-hidden rounded-md shadow-[0_10px_18px_-6px_rgba(15,55,38,0.35)]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Image
          src={project.src}
          alt={project.title}
          fill
          draggable={false}
          sizes="320px"
          className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 transition-all duration-300 group-hover:ring-gold/50" />
        <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-left text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {project.title}
        </span>
      </div>
    </motion.button>
  );
}

function CarouselRow({
  items,
  speed,
  onSelect,
}: {
  items: Project[];
  speed: number;
  onSelect: (p: Project) => void;
}) {
  const { cardW, cardH, gap } = useSize();
  const unit = cardW + gap;
  const totalWidth = unit * items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(1200);
  const x = useMotionValue(-totalWidth);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      containerWidthRef.current = entries[0].contentRect.width;
    });
    ro.observe(el);
    containerWidthRef.current = el.offsetWidth;
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    x.set(-totalWidth);
  }, [totalWidth, x]);

  useEffect(() => {
    function tick(ts: number) {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!draggingRef.current) {
        let next = x.get() - speed * dt;
        if (next < -totalWidth * 2) next += totalWidth;
        if (next > 0) next -= totalWidth;
        x.set(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [speed, totalWidth, x]);

  const displayItems = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-x-hidden overflow-y-visible"
      style={{ height: cardH + 40 }}
    >
      <motion.div
        drag="x"
        dragElastic={0.08}
        dragMomentum={true}
        dragTransition={{ power: 0.3, timeConstant: 260 }}
        onDragStart={() => {
          draggingRef.current = true;
        }}
        onDragEnd={() => {
          window.setTimeout(() => {
            draggingRef.current = false;
          }, 50);
          let v = x.get();
          if (v < -totalWidth * 2) v += totalWidth;
          if (v > 0) v -= totalWidth;
          animate(x, v, { type: "spring", stiffness: 200, damping: 30 });
        }}
        style={{ x, touchAction: "pan-y" }}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        {displayItems.map((project, i) => (
          <ArcCard
            key={`${project.title}-${i}`}
            project={project}
            index={i}
            unit={unit}
            cardW={cardW}
            cardH={cardH}
            x={x}
            containerWidthRef={containerWidthRef}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function WorkCarousel() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="relative">
      <div
        className="[mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)]"
      >
        <CarouselRow items={ROW_A} speed={38} onSelect={setActive} />
        <div className="mt-16 lg:mt-24">
          <CarouselRow items={ROW_B} speed={30} onSelect={setActive} />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-foreground/35">
          Drag to explore
        </p>
        <PillButton href="/portfolio">View Full Portfolio</PillButton>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LightboxItem } from "./Lightbox";

export default function PortfolioSection({
  index,
  title,
  description,
  items,
  reverse,
  cols = 2,
  onSelect,
}: {
  index: string;
  title: string;
  description: string;
  items: LightboxItem[];
  reverse?: boolean;
  cols?: 2 | 3;
  onSelect: (item: LightboxItem) => void;
}) {
  return (
    <section className="border-t border-black/5 px-6 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={reverse ? "lg:order-2" : undefined}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            {index}
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
            {description}
          </p>
        </motion.div>

        <div
          className={`grid grid-cols-2 gap-4 sm:gap-5 ${cols === 3 ? "lg:grid-cols-3" : ""} ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          {items.map((item, i) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => onSelect(item)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-md"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 45vw, 22vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 transition-all duration-300 group-hover:ring-gold/50" />
              <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-left text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

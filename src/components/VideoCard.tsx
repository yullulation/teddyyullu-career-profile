"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { setQuietStart } from "@/lib/video";

export default function VideoCard({
  src,
  title,
  category,
  index,
}: {
  src: string;
  title: string;
  category: string;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="glass group relative aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-md transition-all duration-300 hover:border-gold/40"
    >
      {playing ? (
        <video
          onLoadedMetadata={(e) => setQuietStart(e.currentTarget)}
          src={src}
          controls
          autoPlay
          playsInline
          preload="none"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black/10 via-black/30 to-black/70"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 group-hover:border-gold-soft group-hover:text-gold-soft">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-5 w-5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left">
            <span className="block text-xs font-medium text-white">{title}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/60">
              {category}
            </span>
          </span>
        </button>
      )}
    </motion.div>
  );
}

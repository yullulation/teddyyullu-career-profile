"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PillButton } from "./AnimatedLink";
import { setQuietStart } from "@/lib/video";

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path d="M16 8l5 8M21 8l-5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <path
        d="M15.5 9a3.5 3.5 0 0 1 0 6M18 7a6.5 6.5 0 0 1 0 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    /* Autoplay is only permitted while the element is genuinely muted, so set
       the property directly rather than relying on the React prop having been
       committed. A low threshold means it starts as soon as the card appears. */
    const tryPlay = () => {
      video.muted = true;
      // Set the opening level here too: with autoPlay, loadedmetadata can fire
      // before React attaches its handler, leaving volume at 1 for the unmute.
      setQuietStart(video);
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => {
          // Blocked by policy or still buffering — retry once it can play.
          video.addEventListener("canplay", () => video.play().catch(() => {}), {
            once: true,
          });
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative border-t border-black/5 bg-background px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
          Introduction
        </span>
        <h2 className="mt-4 max-w-xl font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          A brief, personal introduction.
        </h2>

        <div
          ref={cardRef}
          className="relative mt-10 aspect-[9/16] w-[240px] overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(15,55,38,0.18)] ring-1 ring-black/5 sm:w-[280px]"
        >
          <video
            ref={videoRef}
            src="/videos/introduction.mp4"
            muted={muted}
            autoPlay
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => setQuietStart(e.currentTarget)}
            className="h-full w-full object-cover"
          >
            <track kind="captions" srcLang="en" label="English" />
          </video>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="glass absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-foreground"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton href="/#who-i-am">View Experience</PillButton>
          <PillButton href="/#work">View Projects</PillButton>
        </motion.div>
      </div>
    </section>
  );
}

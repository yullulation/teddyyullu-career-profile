"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisSingleton: Lenis | null = null;

export function scrollToTarget(target: string | HTMLElement, offset = -96) {
  if (lenisSingleton) {
    lenisSingleton.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}

/** Lenis drives scrolling on its own rAF loop, so `body { overflow: hidden }` alone
 *  does not stop the page moving behind a modal. Pause the instance instead. */
export function setScrollLocked(locked: boolean) {
  if (!lenisSingleton) return;
  if (locked) lenisSingleton.stop();
  else lenisSingleton.start();
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenisSingleton = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisSingleton = null;
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}

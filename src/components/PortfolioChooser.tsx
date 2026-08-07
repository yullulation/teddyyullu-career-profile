"use client";

import { scrollToTarget } from "./SmoothScroll";
import HighlightCircle from "./HighlightCircle";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChooserButton({ label, target }: { label: string; target: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(target)}
      className="glass hover-fill group/pick relative inline-flex items-center gap-4 rounded-full py-4 pl-8 pr-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground"
    >
      <span className="relative block h-5 overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover/pick:-translate-y-full">
          {label}
        </span>
        <span className="absolute inset-0 block translate-y-full text-white transition-transform duration-300 ease-out group-hover/pick:translate-y-0">
          {label}
        </span>
      </span>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-background transition-colors duration-300 group-hover/pick:bg-white group-hover/pick:text-foreground">
        <ArrowIcon className="absolute h-4 w-4 rotate-[135deg] transition-transform duration-300 ease-out group-hover/pick:translate-y-[150%]" />
        <ArrowIcon className="absolute h-4 w-4 -translate-y-[150%] rotate-[135deg] transition-transform duration-300 ease-out group-hover/pick:translate-y-0" />
      </span>
    </button>
  );
}

export default function PortfolioChooser() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-6 pb-20 pt-32 text-center sm:px-10 sm:pt-40">
      <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
        Portfolio
      </span>
      <h1 className="mt-6 max-w-2xl font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
        What are you looking <HighlightCircle>for?</HighlightCircle>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/55">
        Two disciplines, one practice. Pick a direction to see the work.
      </p>
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <ChooserButton label="Urban Planning" target="#urban-planning" />
        <ChooserButton label="Graphic Design" target="#graphic-design" />
      </div>
    </section>
  );
}

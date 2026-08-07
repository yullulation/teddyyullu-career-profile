"use client";

import Link from "next/link";

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

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group/nav relative inline-block h-4 overflow-hidden">
      <span className="block text-foreground/80 transition-transform duration-300 ease-out group-hover/nav:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 block translate-y-full text-gold transition-transform duration-300 ease-out group-hover/nav:translate-y-0">
        {children}
      </span>
    </Link>
  );
}

/** Shared inner markup so the <button> variant is visually identical to the link. */
function PillInner({ children, solid }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <>
      <span className="relative block h-4 overflow-hidden whitespace-nowrap">
        <span className="block whitespace-nowrap transition-transform duration-300 ease-out group-hover/pill:-translate-y-full">
          {children}
        </span>
        <span
          className={`absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover/pill:translate-y-0 ${
            solid ? "text-white" : "text-[#eaf6ef]"
          }`}
        >
          {children}
        </span>
      </span>
      <span
        className={`relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${
          solid
            ? "bg-[#f4f9f6] text-foreground"
            : "bg-foreground text-background group-hover/pill:bg-white group-hover/pill:text-foreground"
        }`}
      >
        <ArrowIcon className="absolute h-3 w-3 transition-transform duration-300 ease-out group-hover/pill:translate-x-[150%] group-hover/pill:-translate-y-[150%]" />
        <ArrowIcon className="absolute h-3 w-3 -translate-x-[150%] translate-y-[150%] transition-transform duration-300 ease-out group-hover/pill:translate-x-0 group-hover/pill:translate-y-0" />
      </span>
    </>
  );
}

const PILL_CLASS =
  "glass hover-fill group/pill relative inline-flex items-center gap-3 rounded-full py-2.5 pl-6 pr-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground";

/** Filled counterpart for the one primary action per view. */
const PILL_SOLID_CLASS =
  "group/pill relative inline-flex items-center gap-3 rounded-full bg-foreground py-2.5 pl-6 pr-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#f4f9f6] shadow-[0_10px_26px_-8px_rgba(15,55,38,0.55)] transition-shadow duration-300 hover:shadow-[0_16px_34px_-8px_rgba(15,55,38,0.65)]";

/** Same pill, but performs an in-page action instead of navigating. */
export function PillAction({
  children,
  onClick,
  expanded,
  variant = "glass",
}: {
  children: React.ReactNode;
  onClick: () => void;
  expanded?: boolean;
  variant?: "glass" | "solid";
}) {
  const solid = variant === "solid";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={solid ? PILL_SOLID_CLASS : PILL_CLASS}
    >
      <PillInner solid={solid}>{children}</PillInner>
    </button>
  );
}

export function PillButton({
  href,
  children,
  external,
  variant = "glass",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "glass" | "solid";
}) {
  const solid = variant === "solid";
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={solid ? PILL_SOLID_CLASS : PILL_CLASS}
    >
      <PillInner solid={solid}>{children}</PillInner>
    </Link>
  );
}

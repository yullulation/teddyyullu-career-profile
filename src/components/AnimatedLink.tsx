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
  inverted,
}: {
  href: string;
  children: React.ReactNode;
  /** Over a dark chapter the resting state is light and the swap is champagne. */
  inverted?: boolean;
}) {
  return (
    <Link href={href} className="group/nav relative inline-block h-4 overflow-hidden">
      <span
        className={`block transition-transform duration-300 ease-out group-hover/nav:-translate-y-full ${
          inverted ? "text-[#eaf4ee]/85" : "text-foreground/80"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover/nav:translate-y-0 ${
          inverted ? "text-lux" : "text-gold"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

/** Shared inner markup so the <button> variant is visually identical to the link. */
function PillInner({ children, variant }: { children: React.ReactNode; variant: Variant }) {
  const onDark = variant === "lux" || variant === "ghost";
  const swapText =
    variant === "solid" ? "text-white" : variant === "lux" ? "text-[#14261d]" : "text-[#eaf6ef]";
  return (
    <>
      {/* The rolling swap needs one fixed-height line, which clips long labels on
          a narrow screen. Below `sm` the label simply wraps and the swap copy is
          dropped; from `sm` up the animation behaves as before. */}
      <span className="relative block min-w-0 text-left sm:h-4 sm:overflow-hidden sm:whitespace-nowrap">
        <span className="block sm:whitespace-nowrap sm:transition-transform sm:duration-300 sm:ease-out sm:group-hover/pill:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className={`hidden sm:absolute sm:inset-0 sm:block sm:translate-y-full sm:transition-transform sm:duration-300 sm:ease-out sm:group-hover/pill:translate-y-0 ${swapText}`}
        >
          {children}
        </span>
      </span>
      <span
        className={`relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${
          variant === "solid"
            ? "bg-[#f4f9f6] text-foreground"
            : variant === "lux"
              ? "bg-[#14261d] text-lux"
              : onDark
                ? "bg-[#eaf4ee] text-[#14261d]"
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
  "glass hover-fill group/pill relative inline-flex max-w-full items-center gap-3 rounded-full py-2.5 pl-5 pr-2.5 text-[10px] font-medium uppercase tracking-[0.12em] sm:pl-6 sm:text-xs sm:tracking-[0.2em] text-foreground";

/** Filled counterpart for the one primary action per view. */
const PILL_SOLID_CLASS =
  "group/pill relative inline-flex max-w-full items-center gap-3 rounded-full bg-foreground py-2.5 pl-5 pr-2.5 text-[10px] font-medium uppercase tracking-[0.12em] sm:pl-6 sm:text-xs sm:tracking-[0.2em] text-[#f4f9f6] shadow-[0_10px_26px_-8px_rgba(15,55,38,0.55)] transition-shadow duration-300 hover:shadow-[0_16px_34px_-8px_rgba(15,55,38,0.65)]";

/** Champagne fill — the single primary action inside a dark chapter. */
const PILL_LUX_CLASS =
  "group/pill relative inline-flex max-w-full items-center gap-3 rounded-full bg-lux py-2.5 pl-5 pr-2.5 text-[10px] font-medium uppercase tracking-[0.12em] sm:pl-6 sm:text-xs sm:tracking-[0.2em] text-[#14261d] shadow-[0_10px_30px_-8px_rgba(217,189,131,0.5)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-8px_rgba(217,189,131,0.62)]";

/** Outlined counterpart for secondary actions on a dark field. */
const PILL_GHOST_CLASS =
  "group/pill relative inline-flex max-w-full items-center gap-3 rounded-full border border-[#eaf4ee]/25 bg-[#eaf4ee]/[0.06] py-2.5 pl-5 pr-2.5 text-[10px] font-medium uppercase tracking-[0.12em] sm:pl-6 sm:text-xs sm:tracking-[0.2em] text-[#eaf4ee] backdrop-blur-sm transition-colors duration-300 hover:border-[#eaf4ee]/40 hover:bg-[#eaf4ee]/[0.12]";

type Variant = "glass" | "solid" | "lux" | "ghost";

function pillClass(variant: Variant) {
  if (variant === "solid") return PILL_SOLID_CLASS;
  if (variant === "lux") return PILL_LUX_CLASS;
  if (variant === "ghost") return PILL_GHOST_CLASS;
  return PILL_CLASS;
}

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
  variant?: Variant;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={pillClass(variant)}
    >
      <PillInner variant={variant}>{children}</PillInner>
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
  variant?: Variant;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={pillClass(variant)}
    >
      <PillInner variant={variant}>{children}</PillInner>
    </Link>
  );
}

import Link from "next/link";
import { PillButton } from "./AnimatedLink";

type Step = { href: string; label: string };

function Arrow({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <path
        d={back ? "M19 12H5M5 12l6-6M5 12l6 6" : "M5 12h14M14 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The footer carries the page-to-page steps alongside the contact action, so the
 * way onward sits with the credit line rather than in a band of its own.
 *
 * `onDark` is for pages that end inside a dark chapter.
 */
export default function Footer({
  onDark,
  back,
  next,
}: {
  onDark?: boolean;
  back?: Step;
  next?: Step;
}) {
  const stepBase =
    "group/step inline-flex max-w-full items-center gap-2.5 rounded-full px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[11px] sm:tracking-[0.16em]";

  return (
    <footer
      className={`relative px-6 py-12 sm:px-10 ${
        onDark
          ? "ink-panel border-t border-[#eaf4ee]/10"
          : "border-t border-black/10 bg-background"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {(back || next) && (
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {back ? (
              <Link
                href={back.href}
                className={`${stepBase} ${
                  onDark
                    ? "border border-[#eaf4ee]/20 text-[#cfe3d7]/80 hover:border-lux/45 hover:text-lux"
                    : "border border-black/10 text-foreground/70 hover:border-gold/45 hover:text-gold"
                }`}
              >
                <span className="transition-transform duration-300 group-hover/step:-translate-x-0.5">
                  <Arrow back />
                </span>
                {back.label}
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}

            {next && (
              <Link
                href={next.href}
                className={`${stepBase} ${
                  onDark
                    ? "bg-lux text-[#14261d] hover:shadow-[0_14px_34px_-10px_rgba(217,189,131,0.6)]"
                    : "bg-foreground text-[#f4f9f6] hover:shadow-[0_14px_34px_-10px_rgba(15,55,38,0.55)]"
                }`}
              >
                {next.label}
                <span className="transition-transform duration-300 group-hover/step:translate-x-0.5">
                  <Arrow />
                </span>
              </Link>
            )}
          </div>
        )}

        <div
          className={`flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center ${
            back || next
              ? onDark
                ? "border-t border-[#eaf4ee]/10 pt-8"
                : "border-t border-black/[0.07] pt-8"
              : ""
          }`}
        >
          <span className={`text-xs ${onDark ? "text-[#cfe3d7]/50" : "text-foreground/45"}`}>
            Designed and organized by{" "}
            <span className={onDark ? "font-medium text-lux" : "font-medium text-foreground/70"}>
              TEDDY YULLU
            </span>
          </span>
          <PillButton href="/contact" variant={onDark ? "ghost" : "glass"}>
            Get in touch
          </PillButton>
        </div>
      </div>
    </footer>
  );
}

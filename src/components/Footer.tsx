import { PillButton } from "./AnimatedLink";

/**
 * `onDark` is for pages that end inside a dark chapter — the contact page keeps
 * the light treatment it was specified with.
 */
export default function Footer({ onDark }: { onDark?: boolean }) {
  return (
    <footer
      className={`relative px-6 py-12 sm:px-10 ${
        onDark
          ? "ink-panel border-t border-[#eaf4ee]/10"
          : "border-t border-black/10 bg-background"
      }`}
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
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
    </footer>
  );
}

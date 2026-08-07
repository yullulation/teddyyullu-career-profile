import { PillButton } from "./AnimatedLink";

export default function Footer() {
  return (
    <footer className="relative border-t border-black/10 bg-background px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <span className="text-xs text-foreground/40">
          YULLULATION — Urban Planning × Design · © {new Date().getFullYear()}
        </span>
        <PillButton href="/contact">Get in touch</PillButton>
      </div>
    </footer>
  );
}

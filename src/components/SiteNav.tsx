"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "./AnimatedLink";
import { setScrollLocked } from "./SmoothScroll";

const LINKS = [
  { href: "/", label: "FRONT" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/contact", label: "CONTACT" },
];

/** The top-left slot names the page you are on, rather than repeating the brand. */
function currentPageLabel(pathname: string) {
  const match = LINKS.find(
    (l) => l.href !== "/" && (pathname === l.href || pathname.startsWith(`${l.href}/`))
  );
  return match ? match.label : "FRONT";
}

export default function SiteNav() {
  // Each link closes the sheet in its own onClick, so no route-change effect
  // is needed here.
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pageLabel = currentPageLabel(pathname ?? "/");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="glass fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          aria-label="Home"
          className="font-sans text-sm font-semibold tracking-[0.28em] text-foreground"
        >
          {pageLabel}
        </Link>

        {/* Desktop */}
        <div className="hidden gap-8 text-xs font-medium tracking-[0.2em] sm:flex">
          {LINKS.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className="block h-[1.5px] w-5 rounded-full bg-foreground transition-transform duration-300"
            style={{ transform: open ? "translateY(3.25px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-[1.5px] w-5 rounded-full bg-foreground transition-transform duration-300"
            style={{ transform: open ? "translateY(-3.25px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-md sm:hidden"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass absolute inset-x-0 top-0 px-6 pb-8 pt-24"
            >
              <ul className="flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.06 + i * 0.05 }}
                    className="border-b border-black/5 last:border-b-0"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-sm font-medium tracking-[0.2em] text-foreground transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

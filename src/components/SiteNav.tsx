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

/** Routes that open on a dark chapter, so the bar starts inverted. */
const DARK_HERO_ROUTES = new Set(["/", "/experience", "/portfolio", "/contact"]);

/** Routes that are dark the whole way down, where the bar never reverts. */
const FULLY_DARK_ROUTES = new Set(["/contact"]);

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const pageLabel = currentPageLabel(pathname ?? "/");

  /* Over a dark hero the bar carries no fill and light type; once the page
     moves under it, it returns to the usual glass. */
  const route = pathname ?? "/";
  const inverted =
    !open &&
    (FULLY_DARK_ROUTES.has(route) || (DARK_HERO_ROUTES.has(route) && !scrolled));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <nav
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-colors duration-500 sm:px-10 ${
          inverted ? "bg-transparent" : "glass"
        }`}
      >
        <Link
          href="/"
          aria-label="Home"
          className={`font-sans text-sm font-semibold tracking-[0.28em] transition-colors duration-500 ${
            inverted ? "text-[#eaf4ee]" : "text-foreground"
          }`}
        >
          {pageLabel}
        </Link>

        {/* Desktop */}
        <div className="hidden gap-8 text-xs font-medium tracking-[0.2em] sm:flex">
          {LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} inverted={inverted}>
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
            className="block h-[1.5px] w-5 rounded-full transition-all duration-300"
            style={{
              transform: open ? "translateY(3.25px) rotate(45deg)" : "none",
              backgroundColor: inverted ? "#eaf4ee" : "var(--foreground)",
            }}
          />
          <span
            className="block h-[1.5px] w-5 rounded-full transition-all duration-300"
            style={{
              transform: open ? "translateY(-3.25px) rotate(-45deg)" : "none",
              backgroundColor: inverted ? "#eaf4ee" : "var(--foreground)",
            }}
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

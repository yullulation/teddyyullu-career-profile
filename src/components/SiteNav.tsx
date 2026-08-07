"use client";

import Link from "next/link";
import { NavLink } from "./AnimatedLink";

export default function SiteNav() {
  return (
    <nav className="glass fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link
        href="/"
        className="font-sans text-sm font-semibold tracking-[0.28em] text-foreground"
      >
        YULLULATION
      </Link>
      <div className="hidden gap-8 text-xs font-medium tracking-[0.2em] sm:flex">
        <NavLink href="/">FRONT</NavLink>
        <NavLink href="/experience">EXPERIENCE</NavLink>
        <NavLink href="/portfolio">PORTFOLIO</NavLink>
        <NavLink href="/contact">CONTACT</NavLink>
      </div>
    </nav>
  );
}

import type { Metadata } from "next";
import ExperienceGallery from "@/components/ExperienceGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Professional Experience — Teddy Yullu",
  description: "Explore Teddy Yullu's professional journey, organization by organization.",
};

export default function ExperiencePage() {
  return (
    <main className="relative bg-background">
      <div className="px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Career Profile
          </span>
          <h1 className="mt-6 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Professional Experience
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/60 sm:text-base">
            Explore my professional journey through the organizations I&apos;ve served.
            Each experience includes my responsibilities, projects, skills applied, and
            supporting evidence.
          </p>
        </div>
      </div>

      <ExperienceGallery />

      <Footer />
    </main>
  );
}

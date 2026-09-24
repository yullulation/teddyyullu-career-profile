import type { Metadata } from "next";
import ExperienceGallery from "@/components/ExperienceGallery";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Professional Experience — Teddy Yullu",
  description: "Explore Teddy Yullu's professional journey, organization by organization.",
};

export default function ExperiencePage() {
  return (
    <main className="relative bg-background">
      <PageHero eyebrow="Career Profile" title="Professional Experience" ghost="JOURNEY">
        Explore my professional journey through the organizations I&apos;ve served. Each
        experience includes my responsibilities, projects, skills applied, and supporting
        evidence.
      </PageHero>

      <ExperienceGallery />
      <Footer
        onDark
        back={{ href: "/", label: "Front" }}
        next={{ href: "/portfolio", label: "Collaborations" }}
      />
    </main>
  );
}

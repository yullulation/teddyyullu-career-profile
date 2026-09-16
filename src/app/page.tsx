import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import Portfolio from "@/components/Portfolio";
import AcademicQualifications from "@/components/AcademicQualifications";
import ProfessionalReferences from "@/components/ProfessionalReferences";
import ProfessionalContribution from "@/components/ProfessionalContribution";
import Footer from "@/components/Footer";

// The introduction video section is parked for now — the source file is 106MB
// and made the page lag. src/components/IntroVideo.tsx is kept intact so it can
// be dropped back in once the video is compressed and hosted externally.

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Studio />
      <AcademicQualifications />
      <ProfessionalReferences />
      <ProfessionalContribution />
      <Portfolio />
      <Footer onDark />
    </main>
  );
}

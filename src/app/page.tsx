import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import AcademicQualifications from "@/components/AcademicQualifications";
import ProfessionalReferences from "@/components/ProfessionalReferences";
import ProfessionalContribution from "@/components/ProfessionalContribution";
import Footer from "@/components/Footer";

// The introduction video section is parked for now — see IntroVideo.tsx, which
// is kept intact so it can be dropped back in.
// Selected Projects was removed at the client's request; the page is meant to
// close on the community contribution.

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Studio />
      <AcademicQualifications />
      <ProfessionalReferences />
      <ProfessionalContribution />
      <Footer onDark next={{ href: "/experience", label: "Professional Experience" }} />
    </main>
  );
}

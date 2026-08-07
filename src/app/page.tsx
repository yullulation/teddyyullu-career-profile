import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import Studio from "@/components/Studio";
import Portfolio from "@/components/Portfolio";
import AcademicQualifications from "@/components/AcademicQualifications";
import ProfessionalReferences from "@/components/ProfessionalReferences";
import ProfessionalContribution from "@/components/ProfessionalContribution";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <IntroVideo />
      <Studio />
      <AcademicQualifications />
      <ProfessionalReferences />
      <ProfessionalContribution />
      <Portfolio />
      <Footer />
    </main>
  );
}

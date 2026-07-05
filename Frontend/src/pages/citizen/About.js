import AboutHeroSection from "../../components/citizen/about/AboutHeroSection";
import ProblemSection from "../../components/citizen/about/ProblemSection";
import VisionSection from "../../components/citizen/about/VisionSection";
import AudienceSection from "../../components/citizen/about/AudienceSection";
import GoalsSection from "../../components/citizen/about/GoalsSection";

export default function About() {
  return (
    <div dir="rtl" className="bg-ui-card min-h-screen text-right">
      {/* HERO */}
      <AboutHeroSection />

      {/* CONTENT */}
      <div className="space-y-0">
        {/* Problem */}
        <ProblemSection />

        {/* Vision */}
        <VisionSection />

        {/* Audience */}
        <AudienceSection />

        {/* Goals */}
        <GoalsSection />
      </div>
    </div>
  );
}

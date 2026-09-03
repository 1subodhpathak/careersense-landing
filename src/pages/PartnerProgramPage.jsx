import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PartnerHeroSection from "../components/partnerProgram/PartnerHeroSection";
import PartnerMetricsBar from "../components/partnerProgram/PartnerMetricsBar";
import WhyJoinSection from "../components/partnerProgram/WhyJoinSection";
import WeekJourneySection from "../components/partnerProgram/WeekJourneySection";
import RealAssignmentsSection from "../components/partnerProgram/RealAssignmentsSection";
import WhatsIncludedSection from "../components/partnerProgram/WhatsIncludedSection";
import CompletionEarnSection from "../components/partnerProgram/CompletionEarnSection";
import PartnerFaqSection from "../components/partnerProgram/PartnerFaqSection";
import PartnerCtaSection from "../components/partnerProgram/PartnerCtaSection";
import useHeroTheme from "../hooks/useHeroTheme";

export default function PartnerProgramPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const isDark = heroTheme === "dark";

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-[#0EA8B9] selection:text-white transition-colors duration-300 ${
      isDark ? "bg-[#041024] text-white" : "bg-white text-slate-800"
    }`}>
      <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />
      <main>
        <PartnerHeroSection isDark={isDark} />
        <PartnerMetricsBar isDark={isDark} />
        <WhyJoinSection isDark={isDark} />
        <WeekJourneySection />
        <RealAssignmentsSection isDark={isDark} />
        <WhatsIncludedSection isDark={isDark} />
        <CompletionEarnSection isDark={isDark} />
        <PartnerFaqSection isDark={isDark} />
        <PartnerCtaSection isDark={isDark} />
      </main>
      <Footer heroTheme={heroTheme} />
    </div>
  );
}

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import StatsStrip from "../components/home/StatsStrip";
import ProblemSection from "../components/home/ProblemSection";
import PlatformFeatures from "../components/home/PlatformFeatures";
import ToolsSection from "../components/home/ToolsSection";
import CareerReadinessSection from "../components/home/CareerReadinessSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import AudienceSection from "../components/home/AudienceSection";
import ComparisonSection from "../components/home/ComparisonSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CollegesSection from "../components/home/CollegesSection";
import FAQSection from "../components/home/FAQSection";
import FinalCTASection from "../components/home/FinalCTASection";
import LogoSection from "../components/home/LogoSection";
import FeedbackLaptopShowcase from "../components/home/FeedbackLaptopShowcase";
import CertificateAnatomy from "../components/home/CertificateAnatomySection";
import YouTubePannel from "../components/home/YouTubePannel";
import DemoVideoSection from "../components/home/DemoVideoSection";
import GovernmentRecognitionSection from "../components/home/GovernmentRecognitionSection";
import PartnerProgramSection from "../components/home/PartnerProgramSection";
import useHeroTheme from "../hooks/useHeroTheme";

function GradientSeparator({ direction = "right" }) {
  const slopeClass = direction === "left" ? "-skew-y-1 origin-right" : direction === "center" ? "" : "skew-y-1 origin-left";

  const widthClass = direction === "center" ? "mx-auto w-full" : "-mx-[2%] w-[104%]";

  return (
    // The wrapper height (h-16) gives it room, and -my-4 pulls the sections together slightly
    <div className="relative z-20 flex items-center justify-center w-full h-4 overflow-hidden -my-3 leading-none">
      <div
        className={`
          absolute 
          h-2 /* Thickened to 24px to match the screenshot's proportions */
          bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 
          opacity-100 
          ${widthClass} 
          ${slopeClass}
        `}
      />
    </div>
  );
}

export default function HomePage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#edf6ff_20%,#f4fbff_46%,#eaf7fb_72%,#f6fbff_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_50%_62%,rgba(13,148,136,0.11),transparent_30%),radial-gradient(circle_at_28%_88%,rgba(125,211,252,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.30),rgba(255,255,255,0.06))]" />
        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "linear-gradient(rgba(14,116,144,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px)", backgroundSize: "88px 88px" }} />
        <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(rgba(13,148,136,0.15) 0.75px, transparent 0.75px), radial-gradient(rgba(59,130,246,0.10) 0.65px, transparent 0.65px)", backgroundSize: "28px 28px, 46px 46px", backgroundPosition: "0 0, 12px 14px" }} />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(135deg, rgba(14,116,144,0.16) 0%, transparent 22%, transparent 78%, rgba(96,165,250,0.12) 100%)" }} />
        <div className="absolute left-[-16rem] top-[16rem] h-[30rem] w-[30rem] rounded-full bg-cyan-200/24 blur-3xl" />
        <div className="absolute right-[-11rem] top-[50rem] h-[26rem] w-[26rem] rounded-full bg-blue-300/18 blur-3xl" />
        <div className="absolute left-[30%] top-[88rem] h-[24rem] w-[24rem] rounded-full bg-teal-200/18 blur-3xl" />
        <div className="absolute right-[12%] top-[112rem] h-[18rem] w-[18rem] rounded-full bg-sky-200/14 blur-3xl" />
      </div>
      <section
        className={`relative overflow-hidden transition-colors duration-300 ${
          heroTheme === "light" ? "bg-[#eef6ff]" : "bg-[#06152f]"
        }`}
      >
        <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />
        <HeroSection heroTheme={heroTheme} />
      </section>
      <div className="relative z-10">
        
        <StatsStrip />
        <GovernmentRecognitionSection />
        <DemoVideoSection />
        <ProblemSection />

        <GradientSeparator direction="center" />
        <HowItWorksSection heroTheme={heroTheme} />
        
        <GradientSeparator direction="center" />
        <LogoSection />
          <ComparisonSection />
        
        <ToolsSection />

        

        <CareerReadinessSection />
         <GradientSeparator direction="center" />
        <FeedbackLaptopShowcase />
         <GradientSeparator direction="center" />
        <CertificateAnatomy />
        
        <AudienceSection />
       

        <GradientSeparator direction="center" />
        <TestimonialsSection heroTheme={heroTheme} />
        <GradientSeparator direction="center" />
        
        <CollegesSection />
        <PartnerProgramSection />
        <FAQSection />
        <YouTubePannel />
        
        <FinalCTASection />
        <GradientSeparator direction="center" />
        <Footer heroTheme={heroTheme} />
        
      </div>
    </main>
  );
}

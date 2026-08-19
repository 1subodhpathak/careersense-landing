import React from "react";
import heroImg from "../../Assets/partnerProgram/hero_section.png";
import heroDarkImg from "../../Assets/partnerProgram/hero-dark.png";
import { CheckCircle2, ArrowRight, PlayCircle } from "lucide-react";

const DEFAULT_APPLY_LINK = "mailto:support.careersense@gmail.com?subject=CareerSense%20Partner%20Program%20Application&body=Hello%20CareerSense%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20CareerSense%20Partner%20Program.%0A%0AName%3A%0ACollege%20%2F%20Company%3A%0ALocation%3A%0AArea%20of%20Interest%3A%0ALinkedIn%3A%0A";

export default function PartnerHeroSection({ applyLink = DEFAULT_APPLY_LINK, isDark = false }) {
  const highlights = [
    "Real startup experience",
    "Mentorship from founders",
    "Flexible & remote",
    "Certificate & rewards",
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeHeroImg = isDark ? heroDarkImg : heroImg;

  return (
    <section className={`relative overflow-hidden pt-8 pb-12 sm:pb-16 lg:py-24 min-h-[460px] lg:min-h-[540px] flex items-center transition-colors duration-300 ${isDark ? "bg-[#041024] text-white" : "bg-white text-slate-900"}`}>
      {/* Full-bleed borderless right hero background image - Hidden on mobile (< lg) */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-full lg:w-3/5 pointer-events-none z-0">
        <img
          src={activeHeroImg}
          alt="CareerSense Partner Program Collaborators"
          className="h-full w-full object-cover object-right"
        />
        {/* Gradient transition to background on the left */}
        <div className={`absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r ${isDark ? "from-[#041024] via-[#041024]/90 to-transparent" : "from-white via-white/90 to-transparent"}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0EA8B9]/30 bg-[#0EA8B9]/10 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#0993A3]">
            <span className="h-2 w-2 rounded-full bg-[#0EA8B9] animate-pulse" />
            CareerSense Partner Program
          </div>

          <h1 className={`mt-4 sm:mt-5 text-3xl font-black tracking-tight sm:text-5xl lg:text-[56px] leading-[1.15] lg:leading-[1.12] ${isDark ? "text-white" : "text-slate-900"}`}>
            Build. Learn. Lead. <br className="hidden sm:inline" />
            Make a <span className="bg-gradient-to-r from-[#0EA8B9] via-[#06B6D4] to-[#2563EB] bg-clip-text text-transparent">Real Impact.</span>
          </h1>

          <p className={`mt-4 sm:mt-5 text-sm sm:text-base font-medium leading-relaxed sm:text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Join the CareerSense Partner Program and work inside one of India’s fastest-growing career platforms.
          </p>

          {/* Checkmark Highlights Grid */}
          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-3.5 grid-cols-1 sm:grid-cols-2 max-w-lg">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 text-[#0EA8B9]" />
                <span className={`text-xs sm:text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{item}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons - Full-width on mobile */}
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href={applyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0EA8B9]/25 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 text-center"
            >
              <span>Apply Now & Become a Partner</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>

            <button
              type="button"
              onClick={() => scrollToSection("journey")}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-bold shadow-xs transition ${
                isDark
                  ? "border-slate-700 bg-[#0A2647] text-white hover:bg-[#0E355E] hover:border-slate-600"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <PlayCircle className="h-4.5 w-4.5 text-[#0EA8B9] shrink-0" />
              <span>Explore Program</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

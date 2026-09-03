import React from "react";
import heroImg from "../../Assets/partnerProgram/hero_section.png";
import heroDarkImg from "../../Assets/partnerProgram/hero-dark.png";
import { CheckCircle2, ArrowRight, PlayCircle } from "lucide-react";

const DEFAULT_APPLY_LINK = "mailto:support.careersense@gmail.com?subject=CareerSense%20Partner%20Program%20Application&body=Hello%20CareerSense%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20CareerSense%20Partner%20Program.%0A%0AName%3A%0ACollege%20%2F%20Company%3A%0ALocation%3A%0AArea%20of%20Interest%3A%0ALinkedIn%3A%0A";

const passBenefits = [
  "500,000 Credits / Month",
  "Partner Workspace Access",
  "20 Real-World Business Projects",
  "Leadership & Founder Exposure",
  "Certificate & Completion Letter",
];

function PartnerPassCard({ isDark }) {
  return (
    <div className={`rounded-[22px] border p-4 shadow-[0_24px_60px_rgba(7,26,56,0.22)] backdrop-blur-md sm:p-5 ${
      isDark
        ? "border-cyan-500/50 bg-[#071A38]/95 text-white"
        : "border-cyan-200/80 bg-white/95 text-[#071536]"
    }`}>
      <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
        <div className={`sm:border-r-2 sm:pr-5 ${isDark ? "sm:border-white/20" : "sm:border-slate-300"}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#0EA8B9]">
            CareerSense Partner Pass
          </p>
          <p className="mt-3 text-[13px] font-black uppercase tracking-[0.02em] text-[#0EA8B9]">
            3 Months · 12 Weeks
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <strong className="text-[34px] font-black leading-none tracking-[-0.04em]">$24.99</strong>
            <span className="rounded-md bg-[#DDF7F5] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.08em] text-[#087F8A]">
              Founding Price
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          {passBenefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2.5 text-[10px] font-bold sm:text-[11px]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0EA8B9]" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <section className={`relative flex min-h-[460px] items-center overflow-hidden pb-10 pt-6 transition-colors duration-300 sm:pb-12 lg:min-h-[540px] lg:py-12 ${isDark ? "bg-[#041024] text-white" : "bg-white text-slate-900"}`}>
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

      <div
        className="pointer-events-none absolute z-30 hidden lg:block"
        style={{ bottom: "4.5rem", left: 0, right: 0, top: "auto" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ml-auto" style={{ width: "50%" }}>
            <PartnerPassCard isDark={isDark} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-[560px] xl:max-w-[610px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0EA8B9]/30 bg-[#0EA8B9]/10 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#0993A3]">
            <span className="h-2 w-2 rounded-full bg-[#0EA8B9] animate-pulse" />
            CareerSense Partner Program
          </div>

          <h1 className={`mt-4 text-[32px] font-black leading-[1.1] tracking-tight sm:mt-5 sm:text-[42px] lg:text-[48px] xl:text-[52px] ${isDark ? "text-white" : "text-slate-900"}`}>
            <span className="block">Learn how startups</span>
            <span className="block">work by working</span>
            <span className="block bg-gradient-to-r from-[#0EA8B9] via-[#06B6D4] to-[#2563EB] bg-clip-text text-transparent">inside one.</span>
          </h1>

          <p className={`mt-4 text-[13px] font-medium leading-6 sm:mt-5 sm:text-[15px] sm:leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            A 12-week hands-on program where you contribute to real projects, learn from the leadership team and build professional experience that sets you apart.
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

          <div className="mt-10 lg:hidden">
            <PartnerPassCard isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}

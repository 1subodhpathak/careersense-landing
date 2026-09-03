import React from "react";
import journeyLine from "../../Assets/partnerProgram/journey-line.svg";
import ctaDarkBg from "../../Assets/partnerProgram/cta-dark-background.svg";
import { Search, Code2, BarChart3, Megaphone, Rocket } from "lucide-react";

export default function WeekJourneySection() {
  const steps = [
    {
      step: 1,
      title: "Discover",
      icon: Search,
      description: "Explore the CareerSense ecosystem, understand products, users and opportunities.",
    },
    {
      step: 2,
      title: "Build",
      icon: Code2,
      description: "Work on real assignments across product, technology, design, AI and data to create impact.",
    },
    {
      step: 3,
      title: "Analyse",
      icon: BarChart3,
      description: "Convert data and feedback into insights that guide better product and growth decisions.",
    },
    {
      step: 4,
      title: "Grow",
      icon: Megaphone,
      description: "Drive growth through marketing, outreach, SEO, community and partnerships.",
    },
    {
      step: 5,
      title: "Lead",
      icon: Rocket,
      description: "Think like a founder, plan strategy and present how you will scale CareerSense.",
    },
  ];

  return (
    <section id="journey" className="relative overflow-hidden bg-[#041024] py-10 sm:py-12 text-white select-none">
      {/* Background SVG */}
      <img
        src={ctaDarkBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-90 pointer-events-none z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            Your <span className="text-[#19C8C0]">12-Week Journey</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-14">
          {/* Journey Line SVG replacing default line */}
          <div className="hidden lg:block absolute top-[20px] left-[6%] right-[6%] pointer-events-none z-0">
            <img src={journeyLine} alt="" className="w-full h-auto" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((s) => {
              const IconComp = s.icon;
              return (
                <div key={s.title} className="flex flex-col items-center text-center group">
                  {/* Circle Container - Outer glow & cyan ring */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/30 bg-[#0A2647]/90 p-3 shadow-[0_0_25px_rgba(24,183,187,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300 group-hover:shadow-[0_0_35px_rgba(24,183,187,0.4)]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0E355E] border border-cyan-500/20 text-white">
                      {/* Icon is WHITE ONLY */}
                      <IconComp className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Step Number Badge below the circle */}
                  <div className="mt-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#19C8C0] text-[11px] font-black text-[#041024] shadow-md shadow-cyan-500/30">
                    {s.step}
                  </div>

                  {/* Step Title */}
                  <h3 className="mt-3 text-base font-extrabold text-white group-hover:text-[#19C8C0] transition-colors">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[11.5px] font-medium leading-relaxed text-slate-300 max-w-[210px]">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

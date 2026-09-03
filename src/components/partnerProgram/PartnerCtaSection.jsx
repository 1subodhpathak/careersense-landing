import React from "react";
import teamPhoto from "../../Assets/partnerProgram/team_photo.png";
import { ArrowRight, Rocket } from "lucide-react";

const DEFAULT_APPLY_LINK = "mailto:support.careersense@gmail.com?subject=CareerSense%20Partner%20Program%20Application&body=Hello%20CareerSense%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20CareerSense%20Partner%20Program.%0A%0AName%3A%0ACollege%20%2F%20Company%3A%0ALocation%3A%0AArea%20of%20Interest%3A%0ALinkedIn%3A%0A";

export default function PartnerCtaSection({ applyLink = DEFAULT_APPLY_LINK, isDark = false }) {
  return (
    <section className={`py-6 sm:py-8 transition-colors duration-300 ${isDark ? "bg-[#041024]" : "bg-white"}`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#0F1C3F] to-[#091024] p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-white/10">
          {/* Background Decorative Rocket */}
          <div className="pointer-events-none absolute -right-12 -top-12 text-cyan-400/10 hidden sm:block">
            <Rocket className="h-80 w-80" />
          </div>

          <div className="relative z-10 grid items-center gap-6 sm:gap-8 lg:grid-cols-12">
            {/* Left Thumbnail Image */}
            <div className="lg:col-span-3 overflow-hidden rounded-xl border border-white/10 shadow-lg">
              <img
                src={teamPhoto}
                alt="Partner Program Collaboration"
                className="h-36 sm:h-40 w-full object-cover"
              />
            </div>

            {/* Middle Content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#19C8C0]">
                Ready to build, learn and lead?
              </div>
              <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl lg:text-3xl text-white">
                Build work you can actually talk about.
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs font-medium leading-relaxed text-slate-300">
                Join the CareerSense Partner Program and spend three months learning how products, technology, data, AI, growth and leadership come together inside a startup.
              </p>
            </div>

            {/* Right CTA Button */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <a
                href={applyLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] px-6 py-3.5 text-xs font-black text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 text-center"
              >
                <span>Apply for the Partner Program</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

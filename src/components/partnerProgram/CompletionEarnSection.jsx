import React from "react";
import teamImg from "../../Assets/partnerProgram/team.png";
import { CheckCircle2, Monitor, FileText, Award, Star } from "lucide-react";

export default function CompletionEarnSection({ isDark = false }) {
  const criteria = [
    "Complete at least 12 core assignments",
    "Achieve at least 70% overall Partner Score",
    "Complete one major build / growth / analysis project",
    "Participate in required leadership / community sessions",
    "Complete the final Boardroom Challenge",
    "Maintain professional conduct and follow CareerSense data & brand policies",
  ];

  const earnItems = [
    {
      title: "Partner Program Certificate",
      icon: Monitor,
    },
    {
      title: "Completion Letter",
      icon: FileText,
    },
    {
      title: "Contribution Documentation",
      icon: Award,
    },
    {
      title: "Recognition on CareerSense Platform",
      icon: Star,
    },
  ];

  return (
    <section className={`py-12 sm:py-16 transition-colors duration-300 border-t border-b ${
      isDark
        ? "bg-[#071731] border-slate-800 text-white"
        : "bg-slate-50 border-slate-200/60 text-slate-800"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Left Column: Completion & Recognition */}
          <div className="lg:col-span-4">
            <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Completion & Recognition
            </h3>
            <div className="mt-4 sm:mt-5 space-y-3">
              {criteria.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#0EA8B9] mt-0.5" />
                  <span className={`text-xs font-semibold leading-snug ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Team photo (team.png) */}
          <div className="lg:col-span-4">
            <div className={`overflow-hidden rounded-2xl border p-2 shadow-md ${
              isDark ? "border-slate-800 bg-[#0A2647]" : "border-slate-200/80 bg-white"
            }`}>
              <img
                src={teamImg}
                alt="CareerSense Partners Team"
                className="h-48 sm:h-56 lg:h-auto w-full rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Right Column: What You Earn */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isDark ? "text-[#0EA8B9]" : "text-slate-900"}`}>
                What You Earn
              </h3>

              {/* 4 Items: One line each with transparent icon boxes */}
              <div className="mt-4 sm:mt-5 space-y-3.5">
                {earnItems.map((item) => {
                  const EarnIcon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0EA8B9]/15 text-[#0EA8B9] border border-cyan-500/20">
                        <EarnIcon className="h-5 w-5" />
                      </div>
                      <span className={`text-xs font-extrabold leading-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note Box */}
            <div className={`mt-6 rounded-xl border p-3 text-[11px] font-medium leading-relaxed ${
              isDark
                ? "border-slate-800 bg-[#0A2647] text-slate-300"
                : "border-slate-200/80 bg-white text-slate-500"
            }`}>
              <span className={`font-bold ${isDark ? "text-white" : "text-slate-700"}`}>Note:</span> This is an experiential learning program. Completion, letters and recognition are granted based on verified participation and meeting the requirements.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

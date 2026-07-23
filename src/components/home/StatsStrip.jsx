import { stats } from "../../data/homePageData";

import atsIcon from "../../Assets/Icons/ats.svg";
import interviewIcon from "../../Assets/Icons/interview.svg";
import skillsIcon from "../../Assets/Icons/skills.svg";
import resumeIcon from "../../Assets/Icons/resume.svg";
import scoreIcon from "../../Assets/Icons/score.svg";

const statIcons = [
  atsIcon,
  interviewIcon,
  skillsIcon,
  resumeIcon,
  scoreIcon,
];

const iconStyles = [
  {
    wrapper: "bg-blue-50 ring-blue-100",
    glow: "bg-blue-300/20",
  },
  {
    wrapper: "bg-indigo-50 ring-indigo-100",
    glow: "bg-indigo-300/20",
  },
  {
    wrapper: "bg-emerald-50 ring-emerald-100",
    glow: "bg-emerald-300/20",
  },
  {
    wrapper: "bg-orange-50 ring-orange-100",
    glow: "bg-orange-300/20",
  },
  {
    wrapper: "bg-amber-50 ring-amber-100",
    glow: "bg-amber-300/20",
  },
];

export default function StatsStrip() {
  return (
    <section className="relative z-20 -mt-8 px-5 sm:px-6">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,247,255,0.94))] px-4 py-5 shadow-[0_24px_55px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {stats.map(({ value, label }, index) => {
            const icon = statIcons[index];

            return (
              <div
                key={label}
                className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-white/60 lg:px-6 ${
                  index !== stats.length - 1
                    ? "lg:border-r lg:border-slate-200/70"
                    : ""
                }`}
              >
                {/* Soft Glow */}
                <div
                  className={`pointer-events-none absolute -left-6 top-0 h-24 w-24 rounded-full opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-100 ${
                    iconStyles[index].glow
                  }`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-8 transition-all duration-300 group-hover:scale-105 ${
                    iconStyles[index].wrapper
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                    <img
                      src={icon}
                      alt={label}
                      className="h-7 w-7 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="text-[17px] font-extrabold leading-none text-slate-950 md:text-[18px]">
                    {value}
                  </div>

                  <p className="mt-2 text-[13px] font-medium leading-6 text-slate-600 md:text-[14px]">
                    {label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
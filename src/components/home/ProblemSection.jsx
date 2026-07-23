import { problems } from "../../data/homePageData";

import atsRejectionIcon from "../../Assets/Icons/ats-rejection.svg";
import genericResumeIcon from "../../Assets/Icons/generic-resume.svg";
import interviewIcon from "../../Assets/Icons/interview.svg";
import hiddenSkillsIcon from "../../Assets/Icons/hidden-skills.svg";
import scoreIcon from "../../Assets/Icons/score.svg";

const problemIcons = [
  atsRejectionIcon,
  genericResumeIcon,
  interviewIcon,
  hiddenSkillsIcon,
  scoreIcon,
];

const problemDetails = [
  {
    subtitle: "Even strong resumes can fail before a recruiter sees them.",
    badge: "bg-rose-50 ring-rose-100",
    line: "bg-rose-500",
    glow: "from-rose-100/60",
    scan: "bg-gradient-to-r from-transparent via-rose-400/50 to-transparent",
  },
  {
    subtitle: "Templates and generic wording fail to create impact.",
    badge: "bg-orange-50 ring-orange-100",
    line: "bg-orange-500",
    glow: "from-orange-100/60",
    scan:
      "bg-gradient-to-r from-transparent via-orange-400/50 to-transparent",
  },
  {
    subtitle: "Practice often does not reflect real interview scenarios.",
    badge: "bg-violet-50 ring-violet-100",
    line: "bg-violet-500",
    glow: "from-violet-100/60",
    scan:
      "bg-gradient-to-r from-transparent via-violet-400/50 to-transparent",
  },
  {
    subtitle: "You know the skills, but cannot showcase them clearly.",
    badge: "bg-blue-50 ring-blue-100",
    line: "bg-blue-500",
    glow: "from-blue-100/60",
    scan: "bg-gradient-to-r from-transparent via-blue-400/50 to-transparent",
  },
  {
    subtitle: "You lack visibility into where you truly stand today.",
    badge: "bg-emerald-50 ring-emerald-100",
    line: "bg-emerald-500",
    glow: "from-emerald-100/60",
    scan:
      "bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative px-5 py-10 sm:px-6">
      <div className="mx-auto max-w-[1320px] text-center">
        <div className="mx-auto inline-flex animate-[problemFadeDown_0.55s_ease-out_both] items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-blue-500 shadow-[0_10px_24px_rgba(37,99,235,0.07)] backdrop-blur-md">
          <span className="flex h-5 w-5 animate-[problemPulse_1.8s_ease-in-out_infinite] items-center justify-center rounded-full bg-blue-50 text-[11px] ring-1 ring-blue-100">
            !
          </span>
          The Problem
        </div>

        <h2 className="mx-auto mt-5 max-w-5xl animate-[problemFadeUp_0.65s_ease-out_0.08s_both] text-[34px] font-black leading-tight tracking-[-0.035em] text-slate-950 md:text-[30px] lg:text-[38px]">
          Why Getting Hired Feels{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
            Harder than It Should
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-1xl animate-[problemFadeUp_0.65s_ease-out_0.16s_both] text-[14px] font-medium leading-7 text-slate-600">
          Most candidates do not fail because they lack potential. They struggle
          because resume quality, ATS readiness, interview practice, and skill
          proof are disconnected.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map(({ title }, index) => {
            const style = problemDetails[index] || problemDetails[0];
            const icon = problemIcons[index] || problemIcons[0];

            return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-[20px] border border-white/75 bg-white/75 p-5 shadow-[0_18px_38px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_rgba(15,23,42,0.1)]"
                style={{
                  animationName: "problemCardIn, problemCardFloat",
                  animationDuration: "560ms, 6s",
                  animationTimingFunction:
                    "cubic-bezier(0.22, 1, 0.36, 1), ease-in-out",
                  animationFillMode: "both, none",
                  animationIterationCount: "1, infinite",
                  animationDelay: `${220 + index * 90}ms, ${
                    900 + index * 260
                  }ms`,
                }}
              >
                <div
                  className={`pointer-events-none absolute left-0 top-0 h-[2px] w-1/2 ${style.scan} opacity-0 group-hover:opacity-100 animate-[problemScan_2.2s_ease-in-out_infinite]`}
                />

                <div
                  className={`pointer-events-none absolute inset-x-8 -top-16 h-28 rounded-full bg-gradient-to-b ${style.glow} to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div
                  className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full ${style.badge} ring-1 transition-transform duration-300 group-hover:scale-105`}
                >
                  <span className="absolute inset-0 rounded-full opacity-0 ring-2 ring-current/20 group-hover:animate-[problemRing_1.2s_ease-out_infinite] group-hover:opacity-100" />

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="h-8 w-8 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className="mx-auto mt-4 max-w-[15ch] text-[14px] font-extrabold leading-5 tracking-[-0.01em] text-slate-950">
                  {title}
                </h3>

                <p className="mx-auto mt-3 max-w-[22ch] text-[12px] font-medium leading-5 text-slate-500">
                  {style.subtitle}
                </p>

                <div
                  className={`mx-auto mt-5 h-[3px] w-10 rounded-full ${style.line} transition-all duration-300 group-hover:w-14`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes problemFadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes problemFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes problemCardIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes problemCardFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes problemPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.18);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }

        @keyframes problemRing {
          0% {
            transform: scale(0.9);
            opacity: 0.45;
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        @keyframes problemScan {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(260%);
          }
        }

        @keyframes problemGlow {
          0%, 100% {
            opacity: 0.55;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translateY(8px) scale(1.04);
          }
        }

        @keyframes problemArcLeft {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(14px) translateY(8px);
          }
        }

        @keyframes problemArcRight {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-14px) translateY(8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

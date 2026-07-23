import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Link2Off,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
} from "lucide-react";

import compareBackground from "../../Assets/compare.png";
import compareBackgroundLeft from "../../Assets/compare2.png";
import careerSenseLogo from "../../Assets/CSlogo.png";

const comparisonRows = [
  {
    tools: "Different profile in every tool",
    careersense: "One connected career profile",
    toolIcon: UserRound,
    careerSenseIcon: UserRound,
  },
  {
    tools: "Generic recommendations",
    careersense: "Target-role recommendations",
    toolIcon: Sparkles,
    careerSenseIcon: Target,
  },
  {
    tools: "Scores without next steps",
    careersense: "Personalized action plan",
    toolIcon: FileText,
    careerSenseIcon: ClipboardCheck,
  },
  {
    tools: "Individual student view only",
    careersense: "Student and university dashboards",
    toolIcon: UserRound,
    careerSenseIcon: UsersRound,
  },
  {
    tools: "No progress tracking",
    careersense: "Continuous readiness tracking",
    toolIcon: BarChart3,
    careerSenseIcon: TrendingUp,
  },
  {
    tools: "Disconnected assessments",
    careersense: "Unified readiness report",
    toolIcon: Link2Off,
    careerSenseIcon: FileText,
  },
];

export default function ComparisonSection() {
  return (
    <section className="relative overflow-hidden px-5 py-7 sm:px-6 lg:py-8">
      {/* Section background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#eef8ff_0%,#f7fbff_48%,#edf8ff_100%)]" />
      <div className="pointer-events-none absolute left-[-120px] top-[-100px] h-[280px] w-[280px] rounded-full bg-cyan-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-110px] right-[-100px] h-[320px] w-[320px] rounded-full bg-blue-200/30 blur-[110px]" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[28px] font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-[34px] lg:text-[38px]">
            Why{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-500 bg-clip-text text-transparent">
              CareerSense Wins
            </span>
          </h2>

          <div className="mx-auto mt-2.5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-blue-400" />
            <Sparkles className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-blue-400" />
          </div>

          <p className="mx-auto mt-2.5 max-w-2xl text-[13px] font-medium leading-6 text-slate-600 sm:text-[15px]">
            One profile, one score, one connected journey.
          </p>
        </div>

        {/* Comparison card */}
        <div className="relative mt-7 overflow-hidden rounded-[24px] border border-white/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <div className="relative">
            {/* One single background image for entire Separate Tools side */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 md:block">
              <div
                className="absolute inset-0 bg-no-repeat opacity-90"
                style={{
                  backgroundImage: `url(${compareBackgroundLeft})`,
                  backgroundPosition: "left center",
                  backgroundSize: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,250,0.14)_0%,rgba(255,245,243,0.20)_48%,rgba(255,244,242,0.34)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.18),transparent_30%)]" />
            </div>

            {/* One single background image for entire CareerSense side */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
              <div
                className="absolute inset-0 bg-no-repeat opacity-90"
                style={{
                  backgroundImage: `url(${compareBackground})`,
                  backgroundPosition: "right center",
                  backgroundSize: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,252,255,0.28)_0%,rgba(239,252,255,0.12)_52%,rgba(239,252,255,0.04)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.22),transparent_34%)]" />
            </div>

            {/* Center VS badge */}
            

            {/* Header */}
            <div className="grid md:grid-cols-2">
              {/* Left header */}
              <div className="relative border-b border-slate-200 bg-[linear-gradient(135deg,rgba(255,250,250,0.46),rgba(255,243,241,0.34))] px-5 py-4 md:border-b-0 md:border-r md:px-6">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-rose-200 bg-white/75 text-rose-500 shadow-[0_6px_20px_rgba(244,63,94,0.08)]">
                    <Link2Off className="h-6 w-6" />
                  </span>

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-600">
                      Separate Career Tools
                    </p>
                    <h3 className="mt-1 text-[18px] font-black tracking-[-0.025em] text-rose-950 sm:text-[22px]">
                      Fragmented journey
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right header */}
              <div className="relative border-b border-slate-200 bg-[linear-gradient(135deg,rgba(239,252,255,0.38),rgba(239,253,250,0.28),rgba(239,246,255,0.34))] px-5 py-4 md:border-b-0 md:px-6">
                <div className="relative flex items-center justify-between gap-3.5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-700">
                      CareerSense
                    </p>
                    <h3 className="mt-1 text-[18px] font-black tracking-[-0.025em] text-slate-950 sm:text-[22px]">
                      One connected system
                    </h3>
                  </div>

                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-cyan-200 bg-white/85 shadow-[0_6px_20px_rgba(14,165,233,0.12)]">
                    <img
                      src={careerSenseLogo}
                      alt="CareerSense"
                      className="h-8 w-8 object-contain"
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div>
              {comparisonRows.map((row, index) => {
                const ToolIcon = row.toolIcon;
                const CareerSenseIcon = row.careerSenseIcon;
                const isLast = index === comparisonRows.length - 1;

                return (
                  <div
                    key={row.tools}
                    className={`relative grid md:grid-cols-2 ${
                      !isLast ? "border-b border-slate-200" : ""
                    }`}
                  >
                    {/* Center arrow */}
                    <div className="absolute left-1/2 top-1/2 z-20 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-[0_5px_14px_rgba(15,23,42,0.08)] md:flex">
                      <span className="translate-x-[1px] text-[15px] font-black leading-none">
                        »
                      </span>
                    </div>

                    {/* Left row */}
                    <div className="bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,248,247,0.12),rgba(255,244,242,0.20))] px-5 py-3 md:border-r md:border-slate-200 md:px-6">
                      <div className="flex items-center gap-3.5">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-rose-200 bg-rose-50/70 text-rose-500">
                          <ToolIcon className="h-4.5 w-4.5" />
                        </span>

                        <p className="text-[12px] font-semibold leading-5 text-slate-600 sm:text-[13px]">
                          {row.tools}
                        </p>
                      </div>
                    </div>

                    {/* Right row */}
                    <div className="relative bg-[linear-gradient(90deg,rgba(240,253,255,0.16),rgba(239,253,250,0.12),rgba(239,246,255,0.18))] px-5 py-3 md:px-6">
                      <div className="relative flex items-center gap-3.5">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-cyan-200 bg-cyan-50/90 text-cyan-700 shadow-[0_4px_10px_rgba(14,165,233,0.06)]">
                          <CareerSenseIcon className="h-4.5 w-4.5" />
                        </span>

                        <p className="text-[12px] font-bold leading-5 text-slate-950 sm:text-[13px]">
                          {row.careersense}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom banner */}
          <div className="relative overflow-hidden bg-[linear-gradient(90deg,#3546d6_0%,#0a7fd2_42%,#0fb7bf_70%,#1fd3b6_100%)] px-5 py-3.5 text-white md:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(255,255,255,0.14),transparent_26%)]" />

            <div className="relative flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4.5 w-4.5 fill-amber-200 text-amber-200" />
                <p className="text-[13px] font-bold sm:text-[14px]">
                  CareerSense connects every step of your career journey.
                </p>
              </div>

              <span className="rounded-xl border border-white/70 bg-white/95 px-4 py-2 text-[11px] font-black text-slate-900 shadow-lg sm:text-[12px]">
                All in one. Designed for you.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

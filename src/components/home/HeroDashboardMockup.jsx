import {
  Award,
  Bell,
  BookOpen,
  CheckCircle2,
  FileText,
  Home,
  Search,
  SearchCheck,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: FileText, label: "Resume Builder" },
  { icon: SearchCheck, label: "ATS Checker" },
  { icon: FileText, label: "Cover Letters" },
  { icon: BookOpen, label: "Interview Practice" },
  { icon: Award, label: "Skill Certification" },
  { icon: Users, label: "Community" },
];

function ScoreRing({ value = 78, label = "Good", color = "#2764f1" }) {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center xl:h-24 xl:w-24">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#EEF2F7"
          strokeWidth="12"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${value * 2.83} 283`}
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-[22px] font-black tracking-tight text-slate-950 xl:text-[26px]">
          {value}%
        </div>
        <div className="text-[9px] font-bold text-slate-500 xl:text-[10px]">
          {label}
        </div>
      </div>
    </div>
  );
}

function MiniCard({ icon: Icon, title, value, subtitle, color = "blue" }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-emerald-600 bg-emerald-50",
    orange: "text-orange-600 bg-orange-50",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_10px_22px_rgba(15,23,42,0.045)]">
      <div
        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
          colorMap[color] || colorMap.blue
        }`}
      >
        <Icon size={15} />
      </div>

      <h4 className="text-[10px] font-black leading-4 text-slate-950 xl:text-[11px]">
        {title}
      </h4>

      <div className="mt-1 text-[20px] font-black tracking-tight text-blue-600 xl:text-[22px]">
        {value}
      </div>

      <p className="mt-0.5 text-[9px] font-medium leading-4 text-slate-500 xl:text-[10px]">
        {subtitle}
      </p>
    </div>
  );
}

export default function HeroDashboardMockup() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[24px] border border-white/15 bg-[#0b1630] shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
      <div className="grid min-h-[405px] bg-[#0b1630] md:grid-cols-[68px_minmax(0,1fr)] xl:min-h-[430px] xl:grid-cols-[82px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="relative hidden border-r border-white/10 bg-[#081225] px-3 py-4 text-white md:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,212,191,0.14),transparent_40%)]" />

          <div className="relative z-10 flex h-full flex-col items-center">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 xl:h-11 xl:w-11">
              <div className="h-5 w-5 rounded-full border-[4px] border-cyan-300 border-r-transparent" />
            </div>

            <nav className="flex w-full flex-col gap-1.5 xl:gap-2">
              {sidebarItems.map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  title={label}
                  className={`flex h-9 w-full items-center justify-center rounded-xl transition xl:h-10 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Dashboard */}
        <div className="min-w-0 overflow-hidden p-3 xl:p-3.5">
          <div className="h-full overflow-hidden rounded-[20px] border border-white/10 bg-[#f8fafc]">
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3.5 xl:px-5 xl:py-4">
              <div>
                <h3 className="max-w-[330px] text-[22px] font-black leading-tight tracking-[-0.045em] text-slate-950 xl:text-[26px]">
                  Welcome back, Arjun! 👋
                </h3>
                <p className="mt-1 max-w-[330px] text-[11px] font-medium leading-5 text-slate-500 xl:text-[12px]">
                  Keep learning, keep building, keep growing.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2.5 text-slate-400 xl:gap-3">
                <Search size={17} />
                <Bell size={17} />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500 shadow-inner xl:h-9 xl:w-9">
                  <UserRound size={16} />
                </div>
              </div>
            </div>

            {/* Main Cards */}
            <div className="grid min-w-0 gap-3 p-3.5 xl:p-4 lg:grid-cols-[1fr_1fr_0.95fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_10px_22px_rgba(15,23,42,0.045)] xl:p-4">
                <h4 className="text-[11px] font-black text-slate-500 xl:text-[12px]">
                  Career Readiness
                </h4>

                <div className="mt-2.5 xl:mt-3">
                  <ScoreRing value={78} label="Good" color="#2764f1" />
                </div>

                <p className="mt-2.5 text-center text-[9px] font-extrabold text-emerald-500 xl:mt-3 xl:text-[10px]">
                  ↑ 12% from last week
                </p>

                <button className="mt-2.5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-[11px] font-black text-white shadow-lg shadow-blue-600/20 xl:mt-3 xl:text-[12px]">
                  Continue
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_10px_22px_rgba(15,23,42,0.045)] xl:p-4">
                <h4 className="text-[11px] font-black text-slate-500 xl:text-[12px]">
                  ATS Score
                </h4>

                <div className="mt-2.5 xl:mt-3">
                  <ScoreRing value={82} label="Great" color="#10b981" />
                </div>

                <p className="mt-2.5 text-center text-[9px] font-extrabold text-emerald-500 xl:mt-3 xl:text-[10px]">
                  ↑ 8% from last week
                </p>

                <button className="mt-2.5 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-[11px] font-black text-white shadow-lg shadow-emerald-600/20 xl:mt-3 xl:text-[12px]">
                  View Score
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_10px_22px_rgba(15,23,42,0.045)] xl:p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 xl:h-10 xl:w-10">
                  <CheckCircle2 size={19} />
                </div>

                <h4 className="mt-3 text-[11px] font-black text-slate-950 xl:mt-4 xl:text-[12px]">
                  Resume Review
                </h4>

                <p className="mt-1.5 text-[18px] font-black tracking-tight text-emerald-600 xl:mt-2 xl:text-[20px]">
                  Completed
                </p>

                <p className="mt-0.5 text-[9px] font-medium text-slate-500 xl:text-[10px]">
                  2 issues fixed
                </p>

                <button className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-bold text-blue-600 xl:mt-4 xl:px-4 xl:text-[11px]">
                  View Report
                </button>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid gap-3 px-3.5 pb-3.5 sm:grid-cols-3 xl:px-4 xl:pb-4">
              <MiniCard
                icon={BookOpen}
                title="Interview Practice"
                value="3/5"
                subtitle="sessions completed"
              />

              <MiniCard
                icon={ShieldCheck}
                title="Skill Certification"
                value="4"
                subtitle="certificates earned"
                color="green"
              />

              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_10px_22px_rgba(15,23,42,0.045)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <Trophy size={16} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-[10px] font-black leading-4 text-slate-950 xl:text-[11px]">
                      Recommended Step
                    </h4>

                    <p className="mt-1.5 text-[16px] font-black leading-tight tracking-tight text-slate-950 xl:mt-2 xl:text-[18px]">
                      Improve ATS
                      <br />
                      keywords
                    </p>

                    <button className="mt-2.5 rounded-lg bg-blue-600 px-3 py-2 text-[9px] font-bold text-white xl:mt-3 xl:px-3.5 xl:text-[10px]">
                      Get Suggestions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer strip */}
            <div className="mx-3.5 mb-3.5 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2.5 xl:mx-4 xl:mb-4 xl:px-4 xl:py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white xl:h-8 xl:w-8">
                  <ShieldCheck size={14} />
                </div>
                <p className="line-clamp-2 text-[10px] font-bold leading-4 text-blue-900 xl:text-[11px] xl:leading-5">
                  Your profile is improving. Complete one certification and
                  practice two interviews to boost readiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
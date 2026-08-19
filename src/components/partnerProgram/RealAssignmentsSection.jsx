import React from "react";
import { Search, Code2, BarChart3, Megaphone, Rocket, ArrowRight } from "lucide-react";

export default function RealAssignmentsSection({ isDark = false }) {
  const phases = [
    {
      phaseNum: 1,
      name: "Discover",
      icon: Search,
      boxBg: "bg-[#0284C7]",
      titleColor: "text-[#0284C7]",
      darkCardBg: "bg-gradient-to-b from-[#0F2B48]/90 via-[#0B213A]/90 to-[#07172B]/95 border-[#0284C7]/40 shadow-[0_8px_30px_rgba(2,132,199,0.18)]",
      darkNumBadge: "bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/30",
      assignments: [
        { id: "01", title: "CareerSense 360°" },
        { id: "02", title: "Decode the Machine" },
        { id: "03", title: "Inside the Founder's Room" },
        { id: "04", title: "Voice of the User" },
      ],
    },
    {
      phaseNum: 2,
      name: "Build",
      icon: Code2,
      boxBg: "bg-[#0EA8B9]",
      titleColor: "text-[#0EA8B9]",
      darkCardBg: "bg-gradient-to-b from-[#07363E]/90 via-[#052930]/90 to-[#031C22]/95 border-[#0EA8B9]/40 shadow-[0_8px_30px_rgba(14,168,185,0.18)]",
      darkNumBadge: "bg-[#0EA8B9]/20 text-[#2DD4BF] border border-[#0EA8B9]/30",
      assignments: [
        { id: "05", title: "₹50,000 Build Challenge" },
        { id: "06", title: "UX Rescue Mission" },
        { id: "07", title: "Make CareerSense Faster" },
        { id: "08", title: "Connect Everything" },
        { id: "09", title: "Ship a Real Feature" },
        { id: "10", title: "AI Inside CareerSense" },
      ],
    },
    {
      phaseNum: 3,
      name: "Analyse",
      icon: BarChart3,
      boxBg: "bg-[#8B5CF6]",
      titleColor: "text-[#8B5CF6]",
      darkCardBg: "bg-gradient-to-b from-[#231745]/90 via-[#190F35]/90 to-[#100926]/95 border-[#8B5CF6]/40 shadow-[0_8px_30px_rgba(139,92,246,0.18)]",
      darkNumBadge: "bg-[#8B5CF6]/20 text-[#C084FC] border border-[#8B5CF6]/30",
      assignments: [
        { id: "11", title: "CareerSense Data Detective" },
        { id: "12", title: "Predict the Future" },
        { id: "13", title: "Growth Experiment Lab" },
      ],
    },
    {
      phaseNum: 4,
      name: "Grow",
      icon: Megaphone,
      boxBg: "bg-[#F59E0B]",
      titleColor: "text-[#F59E0B]",
      darkCardBg: "bg-gradient-to-b from-[#382210]/90 via-[#2B180A]/90 to-[#1F1005]/95 border-[#F59E0B]/40 shadow-[0_8px_30px_rgba(245,158,11,0.18)]",
      darkNumBadge: "bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/30",
      assignments: [
        { id: "14", title: "Google Me" },
        { id: "15", title: "Make CareerSense Viral" },
        { id: "16", title: "Campus Catalyst" },
        { id: "17", title: "Enterprise Bridge" },
        { id: "18", title: "Build the Community" },
      ],
    },
    {
      phaseNum: 5,
      name: "Lead",
      icon: Rocket,
      boxBg: "bg-[#F43F5E]",
      titleColor: "text-[#F43F5E]",
      darkCardBg: "bg-gradient-to-b from-[#391223]/90 via-[#2B0A18]/90 to-[#1F0510]/95 border-[#F43F5E]/40 shadow-[0_8px_30px_rgba(244,63,94,0.18)]",
      darkNumBadge: "bg-[#F43F5E]/20 text-[#FB7185] border border-[#F43F5E]/30",
      assignments: [
        { id: "19", title: "CEO for a Week" },
        { id: "20", title: "The Boardroom Challenge" },
      ],
    },
  ];

  return (
    <section id="assignments" className={`py-14 sm:py-16 transition-colors duration-300 ${isDark ? "bg-[#041024] text-white" : "bg-slate-50 text-slate-800"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Main Heading with Top-Right Button */}
        <div className="relative flex flex-col items-center">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-center ${isDark ? "text-white" : "text-slate-900"}`}>
            20 <span className="text-[#0EA8B9]">Real-World Assignments</span>
          </h2>

          <div className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-0">
            <a
              href="/dashboard?tab=Partner%20Journey"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold shadow-xs transition ${
                isDark
                  ? "border-slate-700 bg-[#0A2647] text-white hover:border-[#0EA8B9] hover:text-[#0EA8B9]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#0EA8B9] hover:text-[#0EA8B9]"
              }`}
            >
              <span>View All Assignments</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 5 Phase Columns Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {phases.map((p) => {
            const PhaseIcon = p.icon;
            return (
              <div
                key={p.name}
                className={`flex flex-col justify-between rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isDark
                    ? p.darkCardBg
                    : "border border-slate-200/80 bg-white shadow-xs"
                }`}
              >
                <div>
                  {/* Phase Header */}
                  <div className={`flex items-center gap-3 pb-4 border-b ${isDark ? "border-white/10" : "border-slate-100"}`}>
                    {/* Icon Box with Solid Phase Accent Color and WHITE Icon */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${p.boxBg} text-white shadow-xs`}>
                      <PhaseIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-400"}`}>
                        Phase {p.phaseNum}
                      </div>
                      {/* Phase Name */}
                      <div className={`text-sm font-extrabold ${isDark ? "text-white" : p.titleColor}`}>
                        {p.name}
                      </div>
                    </div>
                  </div>

                  {/* Assignments List */}
                  <div className="mt-4 space-y-3">
                    {p.assignments.map((item) => (
                      <div key={item.id} className="flex items-start gap-2.5 text-xs">
                        <span className={`font-mono font-bold shrink-0 ${
                          isDark
                            ? `px-1 py-0.2 rounded text-[11px] ${p.darkNumBadge}`
                            : p.titleColor
                        }`}>
                          {item.id}
                        </span>
                        <span className={`font-semibold leading-snug ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Count Badge */}
                <div className={`mt-6 border-t pt-3 text-center ${isDark ? "border-white/10" : "border-slate-100"}`}>
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${p.titleColor}`}>
                    {p.assignments.length} Assignments
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

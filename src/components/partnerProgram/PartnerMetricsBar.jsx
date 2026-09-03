import React from "react";
import { Users, FolderCheck, Globe, Star } from "lucide-react";

export default function PartnerMetricsBar({ isDark = false }) {
  const metrics = [
    {
      icon: Users,
      value: "1000+",
      label: "PARTNERS ONBOARDED",
      bg: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: FolderCheck,
      value: "500+",
      label: "PROJECTS DELIVERED",
      bg: "bg-emerald-500/10 text-emerald-600",
    },
    {
      icon: Globe,
      value: "50+",
      label: "DOMAINS TO EXPLORE",
      bg: "bg-indigo-500/10 text-indigo-600",
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "PARTNER SATISFACTION",
      bg: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <section className="relative z-40 pb-4 pt-0 transition-colors duration-300 lg:-mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-4 rounded-[22px] border-2 p-4 shadow-[0_20px_50px_rgba(7,26,56,0.16)] sm:grid-cols-2 lg:grid-cols-4 transition-colors ${
          isDark
            ? "border-cyan-500/45 bg-[#0A2647]/95 text-white"
            : "border-cyan-200 bg-white text-slate-800"
        }`}>
          {metrics.map((m) => {
            const IconComp = m.icon;
            return (
              <div key={m.label} className="flex items-center gap-4 p-3">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${m.bg}`}>
                  <IconComp className="h-6 w-6" />
                </div>
                <div>
                  <div className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>{m.value}</div>
                  <div className={`text-[10.5px] font-extrabold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {m.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

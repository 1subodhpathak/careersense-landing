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
    <section className={`py-6 transition-colors duration-300 ${isDark ? "bg-[#041024]" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-4 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-4 shadow-sm transition-colors ${
          isDark
            ? "border-slate-800 bg-[#0A2647]/90 text-white"
            : "border-slate-200/80 bg-white text-slate-800"
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

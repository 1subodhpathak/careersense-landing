import React from "react";

export default function CategoryScoreCard({
  heroTheme,
  label,
  score,
  description,
}) {
  const isLightTheme = heroTheme === "light";

  return (
    <div
      className={`rounded-lg border p-5 ${
        isLightTheme
          ? "border-slate-200 bg-white shadow-sm"
          : "border-slate-700 bg-slate-800"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3
          className={`text-base font-bold ${
            isLightTheme ? "text-slate-900" : "text-white"
          }`}
        >
          {label}
        </h3>
        <span
          className={`text-lg font-bold ${
            isLightTheme ? "text-cyan-700" : "text-cyan-400"
          }`}
        >
          {score}%
        </span>
      </div>

      <div
        className={`mt-4 h-2 w-full overflow-hidden rounded-full ${
          isLightTheme ? "bg-slate-200" : "bg-slate-700"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-in-out ${
            isLightTheme ? "bg-cyan-600" : "bg-cyan-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p
        className={`mt-3 text-sm leading-relaxed ${
          isLightTheme ? "text-slate-600" : "text-slate-400"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
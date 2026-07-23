import React from "react";

export default function AssessmentProgress({
  current,
  total,
  category,
  heroTheme,
}) {
  const progress = Math.round(((current + 1) / total) * 100);
  const isLightTheme = heroTheme === "light";

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span
          className={`text-sm font-semibold ${
            isLightTheme ? "text-slate-900" : "text-white"
          }`}
        >
          {category}
        </span>
        <span
          className={`text-sm font-medium ${
            isLightTheme ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Question {current + 1} of {total}
        </span>
      </div>

      <div
        className={`h-2 w-full overflow-hidden rounded-full ${
          isLightTheme ? "bg-slate-200" : "bg-slate-700"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-in-out ${
            isLightTheme ? "bg-cyan-600" : "bg-cyan-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
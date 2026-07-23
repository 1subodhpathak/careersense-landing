import React from "react";

export default function ScoreRing({ heroTheme, score }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const isLightTheme = heroTheme === "light";

  return (
    <div className="relative h-48 w-48">
      <svg className="-rotate-90" width="192" height="192" viewBox="0 0 192 192">
        {/* Background Track */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          className={isLightTheme ? "text-slate-200" : "text-slate-700"}
        />
        {/* Progress Ring */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${
            isLightTheme ? "text-cyan-600" : "text-cyan-500"
          } transition-all duration-1000 ease-in-out`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-5xl font-bold ${
            isLightTheme ? "text-slate-900" : "text-white"
          }`}
        >
          {score}
        </span>
        <span
          className={`mt-1 text-xs font-bold uppercase tracking-widest ${
            isLightTheme ? "text-slate-500" : "text-slate-400"
          }`}
        >
          out of 100
        </span>
      </div>
    </div>
  );
}
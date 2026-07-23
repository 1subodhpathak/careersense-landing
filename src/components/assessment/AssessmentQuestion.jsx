import React from "react";
import AssessmentProgress from "./AssessmentProgress";

export default function AssessmentQuestion({
  heroTheme,
  question,
  index,
  total,
  categoryLabel,
  selectedScore,
  onSelect,
  onNext,
  onPrevious,
}) {
  const hasAnswer = selectedScore !== undefined;
  const isLightTheme = heroTheme === "light";

  // ENTERPRISE STYLING: Solid backgrounds, standard borders, no blur
  const panelClass = isLightTheme
    ? "border-slate-200 bg-white shadow-sm"
    : "border-slate-700 bg-slate-900 shadow-md";

  return (
    <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-3xl items-center px-6 py-12">
      <div className={`w-full rounded-xl border p-6 sm:p-8 ${panelClass}`}>
        
        <AssessmentProgress
          heroTheme={heroTheme}
          current={index}
          total={total}
          category={categoryLabel}
        />

        <div className="mt-8">
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              isLightTheme ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Select the best match
          </p>
          <h2
            className={`mt-2 text-2xl font-bold leading-snug sm:text-3xl ${
              isLightTheme ? "text-slate-900" : "text-white"
            }`}
          >
            {question.question}
          </h2>
        </div>

        <div className="mt-8 grid gap-3">
          {question.options.map((option) => {
            const isSelected = selectedScore === option.score;

            // Corporate radio card styling
            const optionClass = isSelected
              ? isLightTheme
                ? "border-cyan-600 bg-cyan-50 ring-1 ring-cyan-600"
                : "border-cyan-500 bg-cyan-900/20 ring-1 ring-cyan-500"
              : isLightTheme
                ? "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                : "border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-700/50";

            return (
              <button
                type="button"
                key={option.label}
                onClick={() => onSelect(option.score)}
                className={`group flex min-h-[3.5rem] items-center gap-4 rounded-lg border p-4 text-left transition-all ${optionClass}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isSelected
                      ? isLightTheme
                        ? "border-cyan-600 bg-cyan-600"
                        : "border-cyan-500 bg-cyan-500"
                      : isLightTheme
                        ? "border-slate-300 bg-transparent"
                        : "border-slate-500 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isLightTheme ? "text-slate-900" : "text-slate-100"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6 border-current opacity-90 text-slate-500">
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className={`flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
              isLightTheme
                ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                : "border-slate-600 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasAnswer}
            className={`flex h-10 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isLightTheme 
                ? "bg-cyan-600 hover:bg-cyan-700" 
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {index === total - 1 ? "View Results" : "Next Question"}
            {index !== total - 1 && (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
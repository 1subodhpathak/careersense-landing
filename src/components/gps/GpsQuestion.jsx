import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gpsCategories } from "../../data/careerGpsData";

function CategoryPill({ category, isLight }) {
  const cat = gpsCategories[category];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isLight ? "bg-slate-100 text-slate-600" : "bg-slate-800 text-slate-400"}`}>
      <span>{cat.icon}</span>
      {cat.label}
    </span>
  );
}

function getShuffledOptions(options, questionId) {
  if (!options || !Array.isArray(options)) return [];
  const copy = [...options];
  let seed = 0;
  for (let i = 0; i < questionId.length; i++) {
    seed = (seed << 5) - seed + questionId.charCodeAt(i);
    seed |= 0;
  }
  for (let i = copy.length - 1; i > 0; i--) {
    const pseudoRandom = Math.abs(Math.sin(seed + i)) * 10000;
    const j = Math.floor((pseudoRandom - Math.floor(pseudoRandom)) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GpsQuestion({
  heroTheme,
  question,
  index,
  total,
  selectedScore,
  onSelect,
  onNext,
  onPrevious,
  archetype,
}) {
  const isLight = heroTheme === "light";
  const hasAnswer = selectedScore !== undefined;
  const progress = ((index + 1) / total) * 100;

  const shuffledOptions = useMemo(
    () => getShuffledOptions(question.options, question.id),
    [question.options, question.id]
  );

  return (
    <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-2xl flex-col justify-center px-6 py-10">
      {/* Top bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {archetype && (
              <span className={`text-base`}>{archetype.icon}</span>
            )}
            <span className={`text-xs font-semibold uppercase tracking-widest ${isLight ? "text-slate-400" : "text-slate-500"}`}>
              Question {index + 1} of {total}
            </span>
          </div>
          <span className={`text-xs font-semibold tabular-nums ${isLight ? "text-cyan-600" : "text-cyan-400"}`}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className={`h-1 w-full rounded-full overflow-hidden ${isLight ? "bg-slate-200" : "bg-slate-700"}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className={`w-full rounded-2xl border p-7 sm:p-9 ${
          isLight
            ? "border-slate-200 bg-white shadow-lg shadow-slate-200/60"
            : "border-slate-700/80 bg-slate-900 shadow-xl shadow-black/40"
        }`}
      >
        <CategoryPill category={question.category} isLight={isLight} />

        <h2 className={`mt-4 text-xl font-bold leading-snug sm:text-2xl ${isLight ? "text-slate-900" : "text-white"}`}>
          {question.question}
        </h2>

        <div className="mt-6 grid gap-3">
          {shuffledOptions.map((option, i) => {
            const isSelected = selectedScore === option.score;
            const letters = ["A", "B", "C", "D"];
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelect(option.score)}
                className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                  isSelected
                    ? isLight
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/20 shadow-md shadow-cyan-100"
                      : "border-cyan-500 bg-cyan-900/20 ring-2 ring-cyan-500/20"
                    : isLight
                    ? "border-slate-200 bg-white hover:border-cyan-200 hover:bg-slate-50"
                    : "border-slate-700 bg-slate-800/60 hover:border-slate-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-cyan-500 text-white"
                      : isLight
                      ? "bg-slate-100 text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-600"
                      : "bg-slate-700 text-slate-400 group-hover:bg-slate-600"
                  }`}
                >
                  {letters[i]}
                </span>
                <span className={`text-sm font-medium leading-relaxed ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                  {option.label}
                </span>
                {isSelected && (
                  <span className="ml-auto text-cyan-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-30 ${
              isLight
                ? "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
            }`}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasAnswer}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              hasAnswer
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 hover:brightness-105"
                : isLight
                ? "bg-slate-300"
                : "bg-slate-700"
            }`}
          >
            {index === total - 1 ? "See My Career GPS" : "Next"}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

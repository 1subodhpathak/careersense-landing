import { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function GpsArchetypeStep({ heroTheme, questions, onComplete }) {
  const isLight = heroTheme === "light";
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [customRole, setCustomRole] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const question = questions[currentIdx];
  const selected = answers[question.id];
  const isLast = currentIdx === questions.length - 1;
  const progress = (currentIdx / questions.length) * 100;

  function handleSelect(optionId) {
    if (question.id === "work-domain" && optionId === "other") {
      setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
      setShowCustomInput(true);
      return;
    }

    setShowCustomInput(false);
    const updated = { ...answers, [question.id]: optionId };
    setAnswers(updated);

    if (isLast) {
      setTimeout(() => onComplete(updated), 280);
    } else {
      setTimeout(() => setCurrentIdx((i) => i + 1), 280);
    }
  }

  function handleCustomSubmit(e) {
    if (e) e.preventDefault();
    const finalRole = customRole.trim() || "Target Professional";
    const updated = { ...answers, "work-domain": "other", "custom-role": finalRole };
    setAnswers(updated);
    onComplete(updated);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-2xl flex-col items-center justify-center px-6 py-12">
      {/* Progress Bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          <span className={`text-xs font-semibold uppercase tracking-widest ${isLight ? "text-slate-400" : "text-slate-500"}`}>
            Personalizing your GPS · {currentIdx + 1} of {questions.length}
          </span>
          <span className={`text-xs font-semibold ${isLight ? "text-cyan-600" : "text-cyan-400"}`}>
            {Math.round(((currentIdx + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? "bg-slate-200" : "bg-slate-700"}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress + (100 / questions.length)}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div
        className={`w-full rounded-2xl border p-8 transition-all ${
          isLight
            ? "border-slate-200 bg-white shadow-lg shadow-slate-200/60"
            : "border-slate-700/80 bg-slate-900 shadow-xl shadow-black/40"
        }`}
      >
        {/* GPS badge */}
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 ${isLight ? "bg-cyan-50 text-cyan-700 border border-cyan-200" : "bg-cyan-900/40 text-cyan-400 border border-cyan-800/40"}`}>
          Career GPS — Calibrating
        </span>

        <h2 className={`text-xl font-bold leading-snug sm:text-2xl ${isLight ? "text-slate-900" : "text-white"}`}>
          {question.question}
        </h2>
        <p className={`mt-1.5 text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
          {question.subtitle}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {question.options.map((option, idx) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  isSelected
                    ? isLight
                      ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/30 shadow-md shadow-cyan-100"
                      : "border-cyan-500 bg-cyan-900/20 ring-2 ring-cyan-500/30"
                    : isLight
                    ? "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/50 hover:shadow-md"
                    : "border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-700/60"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${isSelected ? "bg-cyan-500 text-white" : isLight ? "bg-slate-100 text-slate-500" : "bg-slate-700 text-slate-300"}`}>
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                    {option.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {option.sub}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className={`ml-auto shrink-0 transition-all ${
                    isSelected
                      ? "text-cyan-500 translate-x-0.5"
                      : isLight
                      ? "text-slate-300 group-hover:text-cyan-400"
                      : "text-slate-600 group-hover:text-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Custom Role Input Box when 'Other' is selected */}
        {showCustomInput && (
          <form onSubmit={handleCustomSubmit} className="mt-6 rounded-xl border p-5 bg-slate-50 dark:bg-slate-800/80 border-cyan-300 dark:border-cyan-700/60 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block">
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-cyan-800" : "text-cyan-300"}`}>
                Specify your target role / domain:
              </span>
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="e.g. Healthcare Operations, Legal Analyst, Education..."
                className={`mt-2 h-11 w-full rounded-xl border px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  isLight ? "border-slate-300 bg-white text-slate-900" : "border-slate-700 bg-slate-900 text-white"
                }`}
                autoFocus
                required
              />
            </label>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-105 transition"
              >
                Continue <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation dots */}
      <div className="mt-6 flex gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < currentIdx
                ? "w-6 bg-cyan-500"
                : i === currentIdx
                ? "w-6 bg-cyan-400"
                : isLight
                ? "w-2 bg-slate-200"
                : "w-2 bg-slate-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

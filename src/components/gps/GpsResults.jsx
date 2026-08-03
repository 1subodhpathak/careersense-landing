import { useEffect, useMemo, useState } from "react";
import { ExternalLink, X, ArrowRight, RotateCcw, Share2, Download, Calendar, Sparkles, CheckCircle, AlertTriangle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  gpsCategories,
  pipelinePhases,
  archetypeActionPlans,
} from "../../data/careerGpsData";

// ─── Countdown helpers ───────────────────────────────────────
function getTimeLeft(targetDate, now) {
  const ms = Math.max(targetDate.getTime() - now.getTime(), 0);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
const pad = (v) => String(v).padStart(2, "0");

// ─── Coming-Soon Modal ───────────────────────────────────────
function ComingSoonModal({ phase, onClose }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    document.body.style.overflow = "hidden";
    return () => { clearInterval(id); document.body.style.overflow = ""; };
  }, []);

  const launchTargetDate = useMemo(() => {
    const d = new Date(phase.launchAt);
    if (!isNaN(d.getTime()) && d > now) return d;
    const fallback = new Date();
    fallback.setUTCHours(0, 0, 0, 0);
    fallback.setUTCDate(fallback.getUTCDate() + 28);
    return fallback;
  }, [phase?.launchAt]);

  const t = getTimeLeft(launchTargetDate, now);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/80" />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-cyan-100 dark:bg-cyan-950 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">Coming Soon</span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{phase.tool}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Launching {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(launchTargetDate)}</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {[{ l: "Days", v: t.days }, { l: "Hours", v: t.hours }, { l: "Min", v: t.minutes }, { l: "Sec", v: t.seconds }].map(({ l, v }) => (
            <div key={l} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 py-4 text-center">
              <div className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{pad(v)}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Score Ring ──────────────────────────────────────────────
function ScoreRing({ score, readinessLevel, isLight }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const colors = { red: "#ef4444", amber: "#f59e0b", yellow: "#eab308", emerald: "#10b981", cyan: "#06b6d4" };
  const stroke = colors[readinessLevel.color] || "#06b6d4";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke={isLight ? "#cbd5e1" : "#334155"} strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke={stroke} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className={`text-3xl font-extrabold tabular-nums ${isLight ? "text-slate-900" : "text-white"}`}>{score}</div>
        <div className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? "text-slate-600" : "text-slate-400"}`}>/ 100</div>
      </div>
    </div>
  );
}

// ─── Pipeline Phases Visual ──────────────────────────────────
function PipelinePhases({ categoryScores, archetype, completedPhases, onOpenComingSoon, isLight }) {
  const colorMap = {
    violet: {
      strong: isLight ? "border-emerald-400 bg-white text-slate-900 shadow-sm" : "border-emerald-500/40 bg-emerald-950/30 text-emerald-200",
      warn: isLight ? "border-amber-400 bg-white text-slate-900 shadow-sm" : "border-amber-500/40 bg-amber-950/30 text-amber-200",
      weak: isLight ? "border-red-400 bg-white text-slate-900 shadow-sm" : "border-red-500/40 bg-red-950/30 text-red-200"
    },
    cyan: {
      strong: isLight ? "border-emerald-400 bg-white text-slate-900 shadow-sm" : "border-emerald-500/40 bg-emerald-950/30 text-emerald-200",
      warn: isLight ? "border-amber-400 bg-white text-slate-900 shadow-sm" : "border-amber-500/40 bg-amber-950/30 text-amber-200",
      weak: isLight ? "border-red-400 bg-white text-slate-900 shadow-sm" : "border-red-500/40 bg-red-950/30 text-red-200"
    },
    emerald: {
      strong: isLight ? "border-emerald-400 bg-white text-slate-900 shadow-sm" : "border-emerald-500/40 bg-emerald-950/30 text-emerald-200",
      warn: isLight ? "border-amber-400 bg-white text-slate-900 shadow-sm" : "border-amber-500/40 bg-amber-950/30 text-amber-200",
      weak: isLight ? "border-red-400 bg-white text-slate-900 shadow-sm" : "border-red-500/40 bg-red-950/30 text-red-200"
    },
    blue: {
      strong: isLight ? "border-emerald-400 bg-white text-slate-900 shadow-sm" : "border-emerald-500/40 bg-emerald-950/30 text-emerald-200",
      warn: isLight ? "border-amber-400 bg-white text-slate-900 shadow-sm" : "border-amber-500/40 bg-amber-950/30 text-amber-200",
      weak: isLight ? "border-red-400 bg-white text-slate-900 shadow-sm" : "border-red-500/40 bg-red-950/30 text-red-200"
    },
    orange: {
      strong: isLight ? "border-emerald-400 bg-white text-slate-900 shadow-sm" : "border-emerald-500/40 bg-emerald-950/30 text-emerald-200",
      warn: isLight ? "border-amber-400 bg-white text-slate-900 shadow-sm" : "border-amber-500/40 bg-amber-950/30 text-amber-200",
      weak: isLight ? "border-red-400 bg-white text-slate-900 shadow-sm" : "border-red-500/40 bg-red-950/30 text-red-200"
    },
  };

  return (
    <div className="mt-4">
      {/* Desktop horizontal pipeline */}
      <div className="hidden lg:flex items-start gap-0">
        {pipelinePhases.map((phase, i) => {
          const rawScore = categoryScores[phase.id] ?? 0;
          const isDone = Boolean(completedPhases?.[phase.id]) || rawScore >= 90;
          const score = isDone ? 100 : rawScore;
          const status = isDone ? "strong" : (score >= 75 ? "strong" : score >= 50 ? "warn" : "weak");
          const statusLabel = isDone ? "✓ COMPLETED" : (status === "strong" ? "STRONG" : status === "warn" ? "FAIR" : "CRITICAL");
          const c = colorMap[phase.color];
          const isLast = i === pipelinePhases.length - 1;

          function handleClick() {
            if (phase.status === "coming-soon") { onOpenComingSoon(phase); return; }
            if (phase.href) window.open(phase.href, "_blank");
          }

          return (
            <div key={phase.id} className="flex items-center flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <button
                  type="button"
                  onClick={handleClick}
                  className={`group w-full rounded-xl border-2 p-4 text-left transition-all hover:shadow-md hover:scale-[1.02] ${c[status]}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[11px] font-extrabold uppercase tracking-widest ${isLight ? "text-slate-600" : "text-slate-400"}`}>Phase {phase.phase}</span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${isDone ? "bg-emerald-600 text-white" : status === "strong" ? "bg-emerald-600 text-white" : status === "warn" ? "bg-amber-600 text-white" : "bg-red-600 text-white"}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{phase.label}</p>
                    <p className={`text-2xl font-extrabold tabular-nums mt-1 ${isDone ? "text-emerald-600 dark:text-emerald-400" : isLight ? "text-slate-900" : "text-cyan-400"}`}>{score}%</p>
                  </div>
                  {phase.status === "live" && (
                    <div className={`mt-2 flex items-center gap-1 text-[11px] font-bold ${isDone ? "text-emerald-700 dark:text-emerald-400" : isLight ? "text-cyan-700 hover:text-cyan-800" : "text-cyan-400"}`}>
                      {isDone ? "View Activity ✓" : "Open"} <ExternalLink size={10} />
                    </div>
                  )}
                  {phase.status === "coming-soon" && (
                    <div className={`mt-2 text-[11px] font-bold ${isLight ? "text-slate-500" : "text-slate-400"}`}>Coming Soon →</div>
                  )}
                </button>
              </div>
              {!isLast && (
                <div className="flex-shrink-0 mx-1">
                  <ArrowRight size={16} className={isLight ? "text-slate-400" : "text-slate-600"} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile vertical list */}
      <div className="lg:hidden grid gap-3">
        {pipelinePhases.map((phase) => {
          const rawScore = categoryScores[phase.id] ?? 0;
          const isDone = Boolean(completedPhases?.[phase.id]) || rawScore >= 90;
          const score = isDone ? 100 : rawScore;
          const status = isDone ? "strong" : (score >= 75 ? "strong" : score >= 50 ? "warn" : "weak");
          const statusLabel = isDone ? "✓ COMPLETED" : (status === "strong" ? "STRONG" : status === "warn" ? "FAIR" : "CRITICAL");
          const c = colorMap[phase.color];
          function handleClick() {
            if (phase.status === "coming-soon") { onOpenComingSoon(phase); return; }
            if (phase.href) window.open(phase.href, "_blank");
          }
          return (
            <button
              key={phase.id}
              type="button"
              onClick={handleClick}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${c[status]}`}
            >
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold uppercase tracking-widest ${isLight ? "text-slate-600" : "text-slate-400"}`}>Phase {phase.phase}</p>
                <p className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{phase.label}</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-extrabold tabular-nums ${isLight ? "text-slate-900" : "text-white"}`}>{score}%</p>
                <p className={`text-[10px] font-bold mt-0.5 ${isDone ? "text-emerald-600" : status === "strong" ? "text-emerald-600" : status === "warn" ? "text-amber-600" : "text-red-600"}`}>
                  {statusLabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Day-Wise AI Execution Sprint Section ────────────────────
function SprintSection({ sprintPlan, completedPhases, onOpenComingSoon, isLight }) {
  if (!sprintPlan || !Array.isArray(sprintPlan.days)) return null;

  const toolPhaseMap = {
    "ATS Checker": "ats",
    "Certifi": "skills",
    "Cover Letter Builder": "coverletter",
    "Interview Practice": "interview",
    "Resume Builder": "resume",
  };

  return (
    <div className={`mt-8 rounded-2xl border p-7 shadow-sm ${isLight ? "border-slate-200 bg-white text-slate-900" : "border-slate-800 bg-slate-900 text-white"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${isLight ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-amber-950/40 text-amber-400 border border-amber-800/40"}`}>
            <Calendar size={13} /> {sprintPlan.title || "7-Day Execution Sprint"}
          </span>
          <h3 className={`mt-2 text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
            Day-by-Day Execution Strategy
          </h3>
          <p className={`mt-1 text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            {sprintPlan.goal || "Follow this sequenced timeline to maximize your callback rate."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sprintPlan.days.map((item, idx) => {
          const phaseId = toolPhaseMap[item.tool] || "ats";
          const phase = pipelinePhases.find((p) => p.id === phaseId);
          const isDone = Boolean(completedPhases?.[phaseId]);

          function handleCta() {
            if (!phase) return;
            if (phase.status === "coming-soon") { onOpenComingSoon(phase); return; }
            if (phase.href) window.open(phase.href, "_blank");
          }

          return (
            <div key={idx} className={`flex flex-col justify-between rounded-xl border p-5 ${isDone ? (isLight ? "border-emerald-300 bg-emerald-50/40 text-slate-900" : "border-emerald-800/60 bg-emerald-950/20 text-white") : (isLight ? "border-slate-200 bg-slate-50 text-slate-900" : "border-slate-800 bg-slate-800/50 text-white")}`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block rounded-full bg-slate-900 dark:bg-slate-700 px-3 py-1 text-[11px] font-extrabold text-white tracking-wide">
                    {item.range}
                  </span>
                  {isDone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider">
                      <CheckCircle size={10} /> Done
                    </span>
                  )}
                </div>
                <h4 className={`text-base font-bold leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>
                  {item.title}
                </h4>
                <p className={`mt-2 text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                  {item.description}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t ${isLight ? "border-slate-200" : "border-slate-700/60"}`}>
                <button
                  type="button"
                  onClick={handleCta}
                  className={`flex items-center justify-between w-full text-xs font-bold ${isDone ? "text-emerald-700 dark:text-emerald-400" : isLight ? "text-cyan-700 hover:text-cyan-800" : "text-cyan-400"}`}
                >
                  <span>{isDone ? `View ${item.tool} ✓` : `Use ${item.tool}`}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Roadmap Timeline ────────────────────────────────────────
function RoadmapTimeline({ archetype, categoryScores, onOpenComingSoon, aiDiagnosis, isLight }) {
  if (!archetype) return null;
  const actions = (aiDiagnosis?.customActionPlan && Array.isArray(aiDiagnosis.customActionPlan) && aiDiagnosis.customActionPlan.length > 0)
    ? aiDiagnosis.customActionPlan
    : (archetypeActionPlans[archetype.id]?.actions || []);
  const timeLabels = ["Days 1–2", "Days 3–5", "Days 6–7"];

  return (
    <div className="mt-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((action, i) => {
          const phase = pipelinePhases.find((p) => p.id === action.phaseId);
          const score = categoryScores[action.phaseId] ?? 0;

          function handleCta() {
            if (!phase) return;
            if (phase.status === "coming-soon") { onOpenComingSoon(phase); return; }
            if (phase.href) window.open(phase.href, "_blank");
          }

          return (
            <div key={i} className={`relative rounded-2xl border p-6 shadow-sm ${isLight ? "border-slate-200 bg-white text-slate-900" : "border-slate-800 bg-slate-900 text-white"}`}>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${i === 0 ? "bg-red-100 text-red-800" : i === 1 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>
                  {i === 0 ? "Top Priority" : i === 1 ? "Priority 2" : "Priority 3"}
                </span>
                <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>{timeLabels[i]}</span>
              </div>

              <div className="mb-3">
                <span className={`text-xs font-semibold uppercase tracking-widest ${isLight ? "text-slate-500" : "text-slate-400"}`}>{phase?.tool}</span>
              </div>

              <h4 className={`text-base font-bold leading-snug ${isLight ? "text-slate-900" : "text-white"}`}>{action.title}</h4>
              <p className={`mt-2 text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>{action.body}</p>

              <div className="mt-3 flex items-center gap-2">
                <span className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>Current Readiness:</span>
                <span className={`text-xs font-bold ${score >= 75 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-red-500"}`}>{score}%</span>
              </div>

              <button
                type="button"
                onClick={handleCta}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:brightness-105 hover:shadow-lg"
              >
                {action.cta} →
              </button>

              {i < actions.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 -right-2 z-10">
                  <ArrowRight size={16} className={isLight ? "text-slate-400" : "text-slate-600"} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Score Breakdown ─────────────────────────────────────────
function ScoreBreakdown({ categoryScores, onOpenComingSoon, isLight }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Object.entries(gpsCategories).map(([key, cat]) => {
        const score = categoryScores[key] ?? 0;
        const phase = pipelinePhases.find((p) => p.id === key);
        const status = score >= 75 ? "strong" : score >= 50 ? "warn" : "weak";
        const barColor = status === "strong" ? "bg-emerald-500" : status === "warn" ? "bg-amber-500" : "bg-red-500";
        const diagnosis = score >= 75
          ? `Your ${cat.shortLabel.toLowerCase()} is a genuine strength. Keep it polished.`
          : score >= 50
            ? `Solid start on ${cat.shortLabel.toLowerCase()}, but room to push higher.`
            : `${cat.shortLabel} is your primary gap. Addressing this unlocks immediate progress.`;

        function handleTool() {
          if (!phase) return;
          if (phase.status === "coming-soon") { onOpenComingSoon(phase); return; }
          if (phase.href) window.open(phase.href, "_blank");
        }

        return (
          <div key={key} className={`rounded-xl border p-5 shadow-sm ${isLight ? "border-slate-200 bg-white text-slate-900" : "border-slate-800 bg-slate-900 text-white"}`}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-slate-500" : "text-slate-400"}`}>Phase {cat.phaseIndex + 1}</span>
              <span className={`text-xs font-bold ${status === "strong" ? "text-emerald-600" : status === "warn" ? "text-amber-600" : "text-red-500"}`}>
                {score}%
              </span>
            </div>
            <p className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{cat.label}</p>
            <div className={`mt-2 h-1.5 w-full rounded-full overflow-hidden ${isLight ? "bg-slate-200" : "bg-slate-800"}`}>
              <div
                className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className={`mt-2 text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{diagnosis}</p>
            {phase && (
              <button
                type="button"
                onClick={handleTool}
                className={`mt-3 flex items-center gap-1 text-xs font-semibold ${isLight ? "text-cyan-700 hover:text-cyan-800" : "text-cyan-400"}`}
              >
                Fix with {phase.tool} {phase.status === "live" ? <ExternalLink size={11} /> : <ArrowRight size={11} />}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Share Card ──────────────────────────────────────────────
function ShareSection({ profile, overallScore, readinessLevel, archetype }) {
  const [copied, setCopied] = useState(false);
  const text = `I just got my Career GPS Report on CareerSense!\n\nCareer Readiness: ${overallScore}/100 — ${readinessLevel.label}\nArchetype: ${archetype?.label || "Career Professional"}\n\nCheck your career readiness → https://careersenseai.com/career-gps`;

  function handleShare() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://careersenseai.com/career-gps")}&summary=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "width=600,height=600");
  }

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-7 text-white shadow-xl dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Share Your Score</p>
          <h3 className="text-xl font-bold">
            {overallScore}/100 — {readinessLevel.label}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            {archetype?.label} · {archetype?.tagline}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-xl bg-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0958a8] transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg> Share on LinkedIn
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/20 transition"
          >
            <Share2 size={15} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PDF Report HTML Template matching CareerSense_Readiness_Check.html ───
function PdfReportPages({ profile, overallScore, categoryScores, readinessLevel, archetype, aiDiagnosis }) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const tierColor = overallScore >= 75 ? '#166534' : (overallScore >= 50 ? '#1C4E9C' : '#9A4B00');
  const tierBg = overallScore >= 75 ? '#DFF5E6' : (overallScore >= 50 ? '#E4EEFC' : '#FFEEDB');
  const tierLabel = overallScore >= 75 ? 'Great' : (overallScore >= 50 ? 'Good' : 'Just Starting');

  const bigC = 2 * Math.PI * 67;
  const bigOff = bigC - (bigC * (overallScore / 100));

  const dims = [
    { label: 'Resume Quality', score: categoryScores?.resume ?? 50 },
    { label: 'ATS Compatibility', score: categoryScores?.ats ?? 50 },
    { label: 'Skills Strength', score: categoryScores?.skills ?? 50 },
    { label: 'Cover Letter', score: categoryScores?.coverletter ?? 50 },
    { label: 'Interview Readiness', score: categoryScores?.interview ?? 50 },
    { label: 'Target Alignment', score: Math.round(((categoryScores?.resume || 50) + (categoryScores?.ats || 50)) / 2) }
  ];

  const sprintDays = aiDiagnosis?.sprintPlan?.days || [
    { range: "Days 1–2", title: "ATS Keyword & Resume Foundation", description: `Audit resume formatting and optimize core keywords for ${profile.targetRole || "target role"}.` },
    { range: "Days 3–4", title: "Skill Credentialing & Proof Layer", description: "Earn verified badges for core domain competencies." },
    { range: "Days 5–6", title: "Personalized Outreach & Narrative", description: "Generate tailored cover letters connecting experience to company needs." },
    { range: "Day 7", title: "Interview Simulation & Practice", description: "Practice high-frequency behavioral questions out loud until natural." }
  ];

  const sortedDims = [...dims].sort((a, b) => a.score - b.score);

  return (
    <div id="pdfRootHtml" className="pdf-page-container">
      {/* PAGE 1: COVER PAGE */}
      <div className="pdf-page pdf-cover">
        <div className="brand-lockup">
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #14B8A6, #1C64D1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#ffffff', fontSize: '18px' }}>CS</div>
          <div>
            <div className="name">CareerSense</div>
            <div className="tag">AI Career Copilot</div>
          </div>
        </div>
        <div className="cover-mid">
          <div className="eyebrow">Career Readiness Report</div>
          <h1>Your personalized path to becoming job-ready.</h1>
          <div className="prepared">Prepared {today} for {profile.name || "Candidate"} based on your answers about your target role ({profile.targetRole || "Target Role"}), resume, skills, and interview readiness.</div>
          <div className="cover-chips">
            <div className="cover-chip">{archetype?.label || "Career Candidate"}</div>
            <div className="cover-chip">Target: {profile.targetRole || "Target Professional"}</div>
          </div>
          <div className="cover-score">
            <b>{overallScore}%</b>
            <span>Career Readiness Score · {readinessLevel.label}</span>
          </div>
        </div>
        <div className="cover-footer">
          <span>careersenseai.com</span>
          <span>Confidential — prepared for individual use</span>
        </div>
      </div>

      {/* PAGE 2: READINESS OVERVIEW */}
      <div className="pdf-page pdf-content">
        <div className="pdf-topbar">
          <div className="brand-lockup">
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #14B8A6, #1C64D1)', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 800, color: '#ffffff', fontSize: '12px' }}>CS</div>
            <div className="name">CareerSense</div>
          </div>
          <div className="page-label">Readiness Overview</div>
        </div>
        <div className="pdf-h2">Where you stand today</div>
        <div className="pdf-sub">Your readiness score combines resume quality, ATS compatibility, skills strength, cover letter, and interview readiness.</div>

        <div className="pdf-score-row">
          <div className="pdf-score-ring">
            <svg viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="67" fill="none" stroke="#EEF3FB" strokeWidth="12" />
              <circle cx="75" cy="75" r="67" fill="none" stroke="url(#pdfGrad)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={bigC} strokeDashoffset={bigOff} transform="rotate(-90 75 75)" />
              <defs>
                <linearGradient id="pdfGrad" x1="0" y1="0" x2="150" y2="150">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#1C64D1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="num"><b>{overallScore}%</b><small>Readiness</small></div>
          </div>
          <div>
            <div className="pdf-tier" style={{ color: tierColor, background: tierBg }}>{tierLabel}</div>
            <div className="pdf-headline">Target Role Alignment: {profile.targetRole || "Target Professional"}</div>
            <div className="pdf-headline-sub">{aiDiagnosis?.executiveSummary || readinessLevel.summary}</div>
          </div>
        </div>

        <div className="pdf-chip-row">
          <div className="pdf-chip">{archetype?.label || "Candidate"}</div>
          <div className="pdf-chip">Target: {profile.targetRole || "Target Professional"}</div>
        </div>

        <div className="pdf-ring-grid">
          {dims.map(dm => {
            const size = 58;
            const r = (size / 2) - 5;
            const c = 2 * Math.PI * r;
            const pct = Math.round(dm.score);
            const color = pct >= 75 ? '#16A34A' : (pct >= 50 ? '#1C64D1' : '#F5821F');
            const off = c - (c * (pct / 100));
            return (
              <div key={dm.label} className="pdf-mini">
                <div className="wrap" style={{ width: `${size}px`, height: `${size}px` }}>
                  <svg viewBox={`0 0 ${size} ${size}`} style={{ width: `${size}px`, height: `${size}px` }}>
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E4EBF5" strokeWidth="6" />
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={c} strokeDashoffset={off} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
                  </svg>
                  <div className="num">{pct}%</div>
                </div>
                <div className="label">{dm.label}</div>
              </div>
            );
          })}
        </div>

        {aiDiagnosis?.targetRoleBenchmark && (
          <div className="pdf-blocker">
            <h5>Target Role Industry Benchmark · {profile.targetRole || "Target Role"}</h5>
            <p>{aiDiagnosis.targetRoleBenchmark}</p>
          </div>
        )}

        <div className="pdf-footer"><span>CareerSense Career Readiness Report</span><span>Page 2</span></div>
      </div>

      {/* PAGE 3: PRIORITY ROADMAP */}
      <div className="pdf-page pdf-content">
        <div className="pdf-topbar">
          <div className="brand-lockup">
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #14B8A6, #1C64D1)', display: 'flex', items: 'center', justify: 'center', fontWeight: 800, color: '#ffffff', fontSize: '12px' }}>CS</div>
            <div className="name">CareerSense</div>
          </div>
          <div className="page-label">Priority Roadmap</div>
        </div>

        <div className="pdf-h2">What to fix first</div>
        <div className="pdf-sub">Ordered from weakest to strongest — each step moves your overall score up.</div>

        <div className="pdf-steps">
          {sortedDims.map((dm, i) => {
            const numColors = ['#F5821F', '#1C64D1', '#7C6FEE', '#14B8A6', '#16A34A', '#F5821F'];
            return (
              <div key={dm.label} className="pdf-step">
                <div className="n" style={{ background: numColors[i % numColors.length] }}>{i + 1}</div>
                <div>
                  <h4>Optimize {dm.label} ({dm.score}%)</h4>
                  <p>Focused effort on {dm.label.toLowerCase()} will significantly boost callback rate for {profile.targetRole || "your target role"}.</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pdf-footer"><span>CareerSense Career Readiness Report</span><span>Page 3</span></div>
      </div>

      {/* PAGE 4: EXECUTION PLAN */}
      <div className="pdf-page pdf-content">
        <div className="pdf-topbar">
          <div className="brand-lockup">
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #14B8A6, #1C64D1)', display: 'flex', items: 'center', justify: 'center', fontWeight: 800, color: '#ffffff', fontSize: '12px' }}>CS</div>
            <div className="name">CareerSense</div>
          </div>
          <div className="page-label">Execution Plan</div>
        </div>

        <div className="pdf-h2">Your day-by-day plan</div>
        <div className="pdf-sub">7-day execution plan — built around your priority areas.</div>

        <div className="pdf-plan-badge">🎯 Your plan: 7-day sprint for {profile.targetRole || "Target Role"}</div>

        {sprintDays.map(p => (
          <div key={p.range} className="pdf-phase">
            <span className="range" style={{ background: '#1C64D1' }}>{p.range}</span>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
          </div>
        ))}

        <div className="pdf-footer"><span>CareerSense Career Readiness Report</span><span>Page 4</span></div>
      </div>
    </div>
  );
}

// ─── Main Results Component ──────────────────────────────────
export default function GpsResults({
  heroTheme,
  profile,
  overallScore,
  categoryScores,
  readinessLevel,
  archetype,
  aiDiagnosis,
  onSyncProgress,
  onRestart,
}) {
  const [comingSoonPhase, setComingSoonPhase] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const isLight = heroTheme === "light";

  async function handleSync() {
    if (onSyncProgress) {
      setIsSyncing(true);
      await onSyncProgress();
      setTimeout(() => setIsSyncing(false), 800);
    }
  }

  async function handleDownloadPdf() {
    setIsGeneratingPdf(true);
    try {
      const pdfRoot = document.getElementById("pdfRootHtml");
      if (!pdfRoot) return;

      const pages = pdfRoot.querySelectorAll(".pdf-page");
      const doc = new jsPDF({ unit: "px", format: [794, 1123], hotfixes: ["px_scaling"] });

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) doc.addPage([794, 1123]);
        doc.addImage(imgData, "JPEG", 0, 0, 794, 1123);
      }

      doc.save(`${(profile.name || "CareerSense").replace(/\s+/g, "_")}_Career_Readiness_Report.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${isLight ? "bg-cyan-50 text-cyan-800 border border-cyan-300" : "bg-cyan-900/40 text-cyan-400 border border-cyan-800/40"}`}>
                Your Career GPS Report
              </span>
              {aiDiagnosis?.isAiGenerated && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                  <Sparkles size={12} /> AI Verified Diagnosis
                </span>
              )}
            </div>
            <h1 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${isLight ? "text-slate-900" : "text-white"}`}>
              {profile.name ? `${profile.name}'s` : "Your"} Career Map
            </h1>
            <p className={`mt-2 text-base ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {archetype && <span className="font-semibold">{archetype.label} · </span>}
              {profile.targetRole && <span>Targeting: <strong className={isLight ? "text-slate-900" : "text-slate-200"}>{profile.targetRole}</strong></span>}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSync}
              disabled={isSyncing}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all border ${isLight ? "border-cyan-300 bg-cyan-50 text-cyan-800 hover:bg-cyan-100" : "border-cyan-700 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900"
                }`}
            >
              <RotateCcw size={14} className={isSyncing ? "animate-spin" : ""} /> {isSyncing ? "Syncing..." : "Sync Live Activity 🔄"}
            </button>
            <button
              type="button"
              id="pdfBtn"
              disabled={isGeneratingPdf}
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 hover:brightness-105 transition-all disabled:opacity-50"
            >
              <Download size={15} /> {isGeneratingPdf ? "Generating PDF..." : "Download PDF Report"}
            </button>
            <button
              type="button"
              onClick={onRestart}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${isLight ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50" : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"}`}
            >
              <RotateCcw size={14} /> Retake
            </button>
          </div>
        </div>
      </div>

      {/* AI Diagnosis Insights Panel */}
      {aiDiagnosis && (
        <div className={`mb-8 rounded-2xl border p-7 sm:p-8 shadow-xl transition-all ${isLight ? "border-cyan-300 bg-white text-slate-900" : "border-cyan-500/30 bg-slate-900 text-white"}`}>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-500" />
              <h3 className="text-base font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">AI Executive Career Diagnosis</h3>
            </div>
            {aiDiagnosis.isAiGenerated && (
              <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest ${isLight ? "bg-cyan-100 text-cyan-800 border border-cyan-300" : "bg-cyan-900/50 text-cyan-300 border border-cyan-700/50"}`}>
                AI Live Diagnosis
              </span>
            )}
          </div>

          <p className={`text-base leading-relaxed font-medium ${isLight ? "text-slate-800" : "text-slate-200"}`}>
            {aiDiagnosis.executiveSummary}
          </p>

          {aiDiagnosis.targetRoleBenchmark && (
            <div className={`mt-4 rounded-xl border p-4 ${isLight ? "border-cyan-200 bg-cyan-50/60 text-slate-800" : "border-slate-700/80 bg-slate-800/60 text-slate-300"}`}>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isLight ? "text-cyan-800" : "text-cyan-400"}`}>
                Target Role Industry Benchmark · {profile.targetRole || "Target Role"}
              </p>
              <p className="text-sm leading-relaxed">{aiDiagnosis.targetRoleBenchmark}</p>
            </div>
          )}

          {aiDiagnosis.roleGaps && Array.isArray(aiDiagnosis.roleGaps) && aiDiagnosis.roleGaps.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-widest mr-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>AI Identified Core Gaps:</span>
              {aiDiagnosis.roleGaps.map((gap, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isLight ? "bg-red-50 text-red-800 border border-red-200" : "bg-red-950/50 text-red-300 border border-red-800/50"}`}>
                  <AlertTriangle size={12} /> {gap}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Overall Score + Archetype intro */}
      <div className={`mb-8 grid gap-6 lg:grid-cols-[auto_1fr] items-center rounded-2xl border p-7 sm:p-9 ${isLight ? "border-slate-200 bg-white shadow-md text-slate-900" : "border-slate-700/80 bg-slate-900 text-white"}`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <ScoreRing score={overallScore} readinessLevel={readinessLevel} isLight={isLight} />
          <div>
            <p className={`text-sm font-bold ${isLight ? "text-slate-600" : "text-slate-400"}`}>Overall Readiness</p>
            <p className="text-lg font-extrabold mt-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {readinessLevel.label}
            </p>
          </div>
        </div>
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? "text-cyan-700" : "text-cyan-400"}`}>
            {archetype?.label} · Your GPS Insight
          </p>
          <p className={`text-base leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            {archetype?.actionIntro || readinessLevel.summary}
          </p>
          <div className={`mt-4 p-3.5 rounded-xl text-sm leading-relaxed ${isLight ? "bg-slate-50 border border-slate-200 text-slate-700" : "bg-slate-800 text-slate-400"}`}>
            {readinessLevel.summary}
          </div>
        </div>
      </div>

      {/* Section 1: Pipeline Phases */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Your Career Pipeline</h2>
          <p className={`text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>5 phases, scored. Click any phase to open the tool.</p>
        </div>
        <PipelinePhases categoryScores={categoryScores} archetype={archetype} completedPhases={aiDiagnosis?.completedPhases} onOpenComingSoon={setComingSoonPhase} isLight={isLight} />
      </div>

      {/* Section 2: AI Day-Wise Execution Strategy */}
      <div className="mb-8">
        <SprintSection sprintPlan={aiDiagnosis?.sprintPlan} completedPhases={aiDiagnosis?.completedPhases} onOpenComingSoon={setComingSoonPhase} isLight={isLight} />
      </div>

      {/* Section 3: Personalized Action Plan */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Your 3-Step Action Plan</h2>
          <p className={`text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            {aiDiagnosis?.isAiGenerated ? `AI-Tailored for your target role (${profile.targetRole || 'Target Role'})` : `Tailored for ${archetype?.label || "your profile"}`} — do these in order for the fastest progress.
          </p>
        </div>
        <RoadmapTimeline archetype={archetype} categoryScores={categoryScores} onOpenComingSoon={setComingSoonPhase} aiDiagnosis={aiDiagnosis} isLight={isLight} />
      </div>

      {/* Section 4: Score Breakdown */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Full Score Breakdown</h2>
          <p className={`text-sm mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>Diagnosis and direct tool links for each area.</p>
        </div>
        <ScoreBreakdown categoryScores={categoryScores} onOpenComingSoon={setComingSoonPhase} isLight={isLight} />
      </div>

      {/* Section 5: Share & Download Footer */}
      <div className="mb-10 flex flex-col gap-6">
        <ShareSection profile={profile} overallScore={overallScore} readinessLevel={readinessLevel} archetype={archetype} />

        <div className="flex justify-center">
          <button
            type="button"
            disabled={isGeneratingPdf}
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-teal-500/25 hover:brightness-105 transition-all disabled:opacity-50"
          >
            <Download size={16} /> {isGeneratingPdf ? "Generating PDF Report..." : "Download Full PDF Report"}
          </button>
        </div>
      </div>

      {comingSoonPhase && <ComingSoonModal phase={comingSoonPhase} onClose={() => setComingSoonPhase(null)} />}

      {/* HTML PDF Report Pages container rendered for html2canvas */}
      <PdfReportPages
        profile={profile}
        overallScore={overallScore}
        categoryScores={categoryScores}
        readinessLevel={readinessLevel}
        archetype={archetype}
        aiDiagnosis={aiDiagnosis}
      />
    </section>
  );
}

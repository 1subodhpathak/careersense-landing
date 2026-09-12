import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";
import ScoreRing from "./ScoreRing";
import CategoryScoreCard from "./CategoryScoreCard";
import {
  assessmentCategories,
  toolRecommendations,
} from "../../data/careerAssessmentData";

function formatLaunchDate(launchAt) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(new Date(launchAt));
}

function getTimeLeftParts(targetDate, now) {
  const totalMs = Math.max(targetDate.getTime() - now.getTime(), 0);
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function formatCountdownUnit(value) {
  return String(value).padStart(2, "0");
}

function RecommendationAction({ recommendation, className, onOpenComingSoon }) {
  const Icon = recommendation.status === "live" ? ExternalLink : ArrowRight;

  if (recommendation.status === "coming-soon") {
    return (
      <button
        type="button"
        onClick={() => onOpenComingSoon(recommendation)}
        className={className}
      >
        {recommendation.cta}
        <Icon size={16} />
      </button>
    );
  }

  if (recommendation.status === "live") {
    return (
      <a
        href={recommendation.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {recommendation.cta}
        <Icon size={16} />
      </a>
    );
  }

  return (
    <Link to={recommendation.href} className={className}>
      {recommendation.cta}
      <Icon size={16} />
    </Link>
  );
}

function ComingSoonModal({ tool, onClose }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const launchTargetDate = useMemo(() => {
    const d = new Date(tool?.launchAt);
    if (!isNaN(d.getTime()) && d > now) return d;
    return new Date(2026, 8, 25, 0, 0, 0);
  }, [tool?.launchAt, now]);

  const countdown = useMemo(
    () => getTimeLeftParts(launchTargetDate, now),
    [launchTargetDate, now]
  );

  const countdownBlocks = [
    { label: "Days", value: formatCountdownUnit(countdown.days) },
    { label: "Hours", value: formatCountdownUnit(countdown.hours) },
    { label: "Minutes", value: formatCountdownUnit(countdown.minutes) },
    { label: "Seconds", value: formatCountdownUnit(countdown.seconds) },
  ];

  const resolutionDateFormatted = "September 25, 2026";
  const maintenanceMessage = "We are enhancing our AI Interview Simulator with advanced feedback models.";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assessment-launch-title"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-[760px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[580px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300/80 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-amber-900 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                Under Maintenance
              </span>
              <h3
                id="assessment-launch-title"
                className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl tracking-tight"
              >
                {tool.title} Under Maintenance
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {maintenanceMessage}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Expected Resolution Date: <span className="font-bold text-slate-900">{resolutionDateFormatted}</span>. Expected resolution in:
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-amber-300 hover:text-slate-900"
              aria-label="Close maintenance dialog"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {countdownBlocks.map((block) => (
              <div
                key={block.label}
                className="rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/70 to-white px-4 py-5 text-center shadow-xs"
              >
                <div className="text-[34px] font-black leading-none text-slate-900 sm:text-[40px] tabular-nums">
                  {block.value}
                </div>
                <div className="mt-2.5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentResults({
  heroTheme,
  profile,
  overallScore,
  categoryScores,
  readinessLevel,
  weakestCategories,
  onRestart,
}) {
  const [comingSoonTool, setComingSoonTool] = useState(null);
  const isLightTheme = heroTheme === "light";

  // ENTERPRISE STYLING: Solid structural panel variables
  const panelClass = isLightTheme
    ? "border-slate-200 bg-white shadow-sm"
    : "border-slate-700 bg-slate-900 shadow-md";
    
  const sectionBorderClass = isLightTheme
    ? "border-slate-200"
    : "border-slate-700";

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className={`overflow-hidden rounded-xl border ${panelClass}`}>
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:p-12">
          
          {/* Left Column: Overall Score Card */}
          <div
            className={`flex flex-col items-center justify-center rounded-lg border p-8 text-center ${
              isLightTheme
                ? "border-slate-200 bg-slate-50"
                : "border-slate-700 bg-slate-800"
            }`}
          >
            <ScoreRing heroTheme={heroTheme} score={overallScore} />

            <p
              className={`mt-6 text-xs font-bold uppercase tracking-widest ${
                isLightTheme ? "text-cyan-700" : "text-cyan-400"
              }`}
            >
              {readinessLevel.label}
            </p>
            <h1
              className={`mt-2 text-2xl font-bold ${
                isLightTheme ? "text-slate-900" : "text-white"
              }`}
            >
              {profile.name}, here is your score.
            </h1>
            <p
              className={`mt-3 max-w-md text-sm leading-relaxed ${
                isLightTheme ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {readinessLevel.summary}
            </p>
          </div>

          {/* Right Column: Breakdown */}
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-widest ${
                isLightTheme ? "text-cyan-700" : "text-cyan-400"
              }`}
            >
              Readiness Breakdown
            </p>
            <h2
              className={`mt-2 text-2xl font-bold ${
                isLightTheme ? "text-slate-900" : "text-white"
              }`}
            >
              See where you are strong and where to focus next.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Object.entries(categoryScores).map(([category, score]) => (
                <CategoryScoreCard
                  heroTheme={heroTheme}
                  key={category}
                  label={assessmentCategories[category].label}
                  score={score}
                  description={assessmentCategories[category].description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Recommendations */}
        <div className={`border-t p-6 sm:p-10 lg:p-12 ${sectionBorderClass}`}>
          <div className="max-w-3xl">
            <p
              className={`text-xs font-bold uppercase tracking-widest ${
                isLightTheme ? "text-cyan-700" : "text-cyan-400"
              }`}
            >
              Recommended next steps
            </p>
            <h2
              className={`mt-2 text-2xl font-bold ${
                isLightTheme ? "text-slate-900" : "text-white"
              }`}
            >
              Focus on these areas first.
            </h2>
            <p
              className={`mt-3 text-base leading-relaxed ${
                isLightTheme ? "text-slate-600" : "text-slate-400"
              }`}
            >
              These recommendations are based on your lowest readiness scores and
              your target role:{" "}
              <span className={`font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>
                {profile.targetRole}
              </span>
              .
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {weakestCategories.map((category, index) => {
              const recommendation = toolRecommendations[category];
              
              // Flat styling for enterprise badges
              const badgeClass =
                recommendation.status === "live"
                  ? isLightTheme
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-emerald-900/50 text-emerald-300"
                  : recommendation.status === "coming-soon"
                    ? isLightTheme
                      ? "bg-cyan-100 text-cyan-800"
                      : "bg-cyan-900/50 text-cyan-300"
                    : isLightTheme
                      ? "bg-slate-100 text-slate-700"
                      : "bg-slate-800 text-slate-300";

              return (
                <article
                  key={category}
                  className={`flex flex-col rounded-lg border p-6 ${
                    isLightTheme
                      ? "border-slate-200 bg-white shadow-sm"
                      : "border-slate-700 bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`text-sm font-semibold ${
                        isLightTheme ? "text-slate-900" : "text-slate-200"
                      }`}
                    >
                      Priority {index + 1}
                    </span>
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeClass}`}
                    >
                      {recommendation.status === "live"
                        ? "Live"
                        : recommendation.status === "coming-soon"
                          ? "Coming Soon"
                          : "Inside Platform"}
                    </span>
                  </div>
                  <h3
                    className={`mt-4 text-lg font-bold ${
                      isLightTheme ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {recommendation.title}
                  </h3>
                  <p
                    className={`mt-2 flex-1 text-sm leading-relaxed ${
                      isLightTheme ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {recommendation.description}
                  </p>
                  
                  {/* Replaced gradients with standard flat buttons */}
                  <RecommendationAction
                    recommendation={recommendation}
                    onOpenComingSoon={setComingSoonTool}
                    className={`mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-white transition-colors ${
                      isLightTheme 
                        ? "bg-cyan-600 hover:bg-cyan-700" 
                        : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                  />
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className={`flex h-10 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors ${
                isLightTheme
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-200"
              }`}
            >
              Save My Report
            </button>
            <button
              type="button"
              onClick={onRestart}
              className={`flex h-10 items-center justify-center rounded-md border px-5 text-sm font-semibold transition-colors ${
                isLightTheme
                  ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                  : "border-slate-600 text-slate-300 hover:bg-slate-800"
              }`}
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>

      {comingSoonTool ? (
        <ComingSoonModal
          tool={comingSoonTool}
          onClose={() => setComingSoonTool(null)}
        />
      ) : null}
    </section>
  );
}
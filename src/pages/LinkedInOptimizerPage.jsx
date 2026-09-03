import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BriefcaseBusiness, BriefcaseBusiness as Linkedin, Check, CheckCircle2,
  Copy, Gauge, Layers3, Lightbulb, LoaderCircle, RefreshCw,
  SearchCheck, Sparkles, Target, WandSparkles,
} from "lucide-react";
import CareerSenseNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LinkedinHero from "../Assets/Linkedin.png";
import useHeroTheme from "../hooks/useHeroTheme";
import {
  generatePostIdeas, generateServices, generateSkills, localAnalyze,
  optimizerSections, scoreTier, scoreWeights, sectionConfig,
} from "../data/linkedinOptimizerData";

const STORAGE_KEY = "careersense-linkedin-optimizer-v1";
const initialValues = { targetRole: "", industry: "", headline: "", about: "", experience: "", projects: "" };
const coreIds = ["headline", "about", "experience", "projects"];


function ScoreRing({ score, size = "lg" }) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const tier = scoreTier(score);

  const stroke =
    tier.color === "emerald"
      ? "#10b981"
      : tier.color === "blue"
        ? "#2563eb"
        : tier.color === "amber"
          ? "#f59e0b"
          : "#f43f5e";

  return (
    <div
      className={`relative shrink-0 ${
        size === "sm" ? "h-[82px] w-[82px]" : "h-[112px] w-[112px]"
      }`}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#DFE7F1"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
          className="transition-all duration-700"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#071536]">
        <strong className={size === "sm" ? "text-[23px]" : "text-[31px]"}>
          {score}
        </strong>
        <span className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
          of 100
        </span>
      </div>
    </div>
  );
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="
        inline-flex h-[36px] items-center gap-2
        rounded-[10px] border border-blue-200 bg-white
        px-3.5 text-[10px] font-extrabold text-blue-700
        transition hover:bg-blue-50
      "
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy result"}
    </button>
  );
}

function Feedback({ result }) {
  const tier = scoreTier(result.score);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ScoreRing score={result.score} size="sm" />

        <div>
          <p
            className={`text-[10px] font-extrabold uppercase tracking-[0.15em] ${
              tier.color === "emerald"
                ? "text-emerald-600"
                : tier.color === "blue"
                  ? "text-blue-600"
                  : tier.color === "amber"
                    ? "text-amber-600"
                    : "text-rose-600"
            }`}
          >
            {tier.label}
          </p>

          <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-[#071536]">
            Section diagnostic score
          </h3>

          <p className="mt-1.5 max-w-2xl text-[11px] leading-[18px] text-[#65748C]">
            {result.summary}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {(result.feedback || []).map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="rounded-[14px] border border-[#E0E7F0] bg-white p-3"
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                item.tone === "strong"
                  ? "bg-emerald-50 text-emerald-600"
                  : item.tone === "fix"
                    ? "bg-orange-50 text-orange-500"
                    : "bg-amber-50 text-amber-600"
              }`}
            >
              {item.tone === "strong" ? (
                <CheckCircle2 size={14} />
              ) : (
                <Lightbulb size={14} />
              )}
            </div>

            <h4 className="mt-2 text-[10px] font-extrabold leading-4 text-[#071536]">
              {item.title}
            </h4>

            <p className="mt-1 text-[9px] leading-[14px] text-[#6C7A91]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[16px] border border-blue-100 bg-[#F6F9FF] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-blue-700">
            <Sparkles size={12} />
            Suggested professional rewrite
          </p>

          <CopyButton value={result.rewrite} />
        </div>

        <div className="mt-2 whitespace-pre-wrap text-[10px] leading-[17px] text-[#34445F]">
          {result.rewrite}
        </div>
      </div>
    </div>
  );
}

function ContextBar({ values, setValues }) {
  return (
    <div className="grid gap-3 rounded-[15px] border border-[#D8E7FA] bg-[#F4F9FF] p-3.5 sm:grid-cols-2">
      <label className="grid gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#60718C]">
        Target role
        <input
          value={values.targetRole}
          onChange={(e) =>
            setValues((v) => ({
              ...v,
              targetRole: e.target.value,
            }))
          }
          placeholder="e.g. Senior Product Manager"
          className="
            h-[44px] rounded-[11px] border border-[#D9E2EE]
            bg-white px-3.5 text-[11px] font-semibold
            normal-case tracking-normal text-[#071536]
            outline-none transition placeholder:text-[#98A5B8]
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
          "
        />
      </label>

      <label className="grid gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#60718C]">
        Industry or specialty
        <input
          value={values.industry}
          onChange={(e) =>
            setValues((v) => ({
              ...v,
              industry: e.target.value,
            }))
          }
          placeholder="e.g. B2B SaaS, Analytics"
          className="
            h-[44px] rounded-[11px] border border-[#D9E2EE]
            bg-white px-3.5 text-[11px] font-semibold
            normal-case tracking-normal text-[#071536]
            outline-none transition placeholder:text-[#98A5B8]
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
          "
        />
      </label>
    </div>
  );
}

function HeroFeature({ icon, title, description, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-500",
    violet: "bg-violet-50 text-violet-500",
    orange: "bg-orange-50 text-orange-500",
  };

  return (
    <div className="flex items-start gap-3 py-3">
      <div
        className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] ${
          tones[tone]
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-extrabold text-[#071536]">{title}</p>
        <p className="mt-1 text-[9px] leading-[14px] text-[#5E6F89]">
          {description}
        </p>
      </div>
    </div>
  );
}
export default function LinkedInOptimizerPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const isLight = heroTheme === "light";
  const [active, setActive] = useState("headline");
  const [values, setValues] = useState(() => {
    try { return { ...initialValues, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")?.values }; } catch { return initialValues; }
  });
  const [results, setResults] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")?.results || {}; } catch { return {}; }
  });
  const [generated, setGenerated] = useState(() => {
    try { return { skills: [], services: [], posts: [], ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")?.generated }; } catch { return { skills: [], services: [], posts: [] }; }
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [setupError, setSetupError] = useState("");

  useEffect(() => {
    document.documentElement.dataset.linkedinOptimizerTheme = heroTheme;
    return () => delete document.documentElement.dataset.linkedinOptimizerTheme;
  }, [heroTheme]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, results, generated })); }, [values, results, generated]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [active]);

  const completed = useMemo(() => new Set([...Object.keys(results), ...Object.entries(generated).filter(([, list]) => list.length).map(([key]) => key)]), [results, generated]);

  async function runAnalysis(section) {
    const config = sectionConfig[section];
    const text = values[section].trim();
    setError("");
    if (text.length < config.min) { setError(`Please add at least ${config.min} characters so the diagnosis has enough context.`); return; }
    setLoading(true);
    const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
    try {
      let response = await fetch(`${apiBase}/careersense/linkedin/optimize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, text, targetRole: values.targetRole, industry: values.industry })
      });
      if (!response.ok) {
        response = await fetch("/api/linkedin-optimizer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section, text, targetRole: values.targetRole, industry: values.industry })
        });
      }
      if (!response.ok) throw new Error("fallback");
      const data = await response.json();
      setResults((current) => ({ ...current, [section]: data }));
    } catch {
      setResults((current) => ({ ...current, [section]: localAnalyze(section, values) }));
    } finally { setLoading(false); }
  }

  function runGenerator(section) {
    setError("");
    if (section !== "posts" && values.experience.trim().length < 60) { setError("Add and analyze your Experience first so recommendations are supported by real career evidence."); return; }
    const list = section === "skills" ? generateSkills(values) : section === "services" ? generateServices(values) : generatePostIdeas(values);
    setGenerated((current) => ({ ...current, [section]: list }));
  }

  const overall = useMemo(() => {
    const entries = Object.entries(scoreWeights).filter(([id]) => results[id] || generated[id]?.length);
    if (!entries.length) return 0;
    const numerator = entries.reduce((sum, [id, weight]) => sum + (results[id]?.score || (generated[id]?.length ? 78 : 0)) * weight, 0);
    const denominator = entries.reduce((sum, [, weight]) => sum + weight, 0);
    return Math.round(numerator / denominator);
  }, [results, generated]);

  function renderAnalyzer() {
    const config = sectionConfig[active];
    const result = results[active];

    return (
      <div className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[16px] border border-[#E1E8F1] bg-white p-4">
          <ContextBar values={values} setValues={setValues} />

          <label className="mt-4 block">
            <span className="mb-1.5 flex items-center justify-between gap-3 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#60718C]">
              <span>{config.label}</span>
              <span>
                {values[active].length} / {config.max}
              </span>
            </span>

            <textarea
              value={values[active]}
              maxLength={config.max}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  [active]: e.target.value,
                }))
              }
              placeholder={config.placeholder}
              rows={active === "headline" ? 3 : 6}
              className="
                w-full resize-y rounded-[14px] border border-[#DCE5F1]
                bg-[#FBFCFE] p-3.5 text-[11px] leading-[18px]
                text-[#071536] outline-none transition
                placeholder:text-[#91A0B7]
                focus:border-blue-500 focus:bg-white
                focus:ring-4 focus:ring-blue-500/10
              "
            />
          </label>

          {error && (
            <p
              role="alert"
              className="mt-2 rounded-[11px] bg-rose-50 px-3 py-2 text-[10px] font-semibold text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={() => runAnalysis(active)}
            disabled={loading}
            className="
              mt-3 inline-flex h-[39px] items-center justify-center gap-2
              rounded-[10px] bg-gradient-to-r
              from-[#0757E6] via-[#0876EE] to-[#119FEC]
              px-4 text-[10px] font-extrabold text-white
              shadow-[0_8px_18px_rgba(37,99,235,0.20)]
              transition hover:brightness-105
              disabled:cursor-wait disabled:opacity-70
            "
          >
            {loading ? (
              <LoaderCircle size={14} className="animate-spin" />
            ) : result ? (
              <RefreshCw size={14} />
            ) : (
              <SearchCheck size={14} />
            )}

            {loading
              ? "Analyzing profile…"
              : result
                ? "Run again"
                : "Run diagnostic"}
          </button>
        </div>

        <div className="rounded-[16px] border border-[#E1E8F1] bg-[#FBFCFE] p-4">
          {result ? (
            <Feedback result={result} />
          ) : (
            <div className="flex min-h-[245px] items-center justify-center text-center">
              <div className="max-w-[320px]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-blue-50 text-blue-600">
                  <Gauge size={21} />
                </div>

                <h3 className="mt-3 text-[14px] font-extrabold text-[#071536]">
                  Your diagnostic will appear here
                </h3>

                <p className="mt-1.5 text-[10px] leading-4 text-[#6B7B93]">
                  Run the diagnostic to get your score, detailed feedback and a
                  recruiter-ready rewrite.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderGenerator() {
    const isSkills = active === "skills";
    const isServices = active === "services";
    const list = generated[active];

    const title = isSkills
      ? "Generate your evidence-backed skill set"
      : isServices
        ? "Turn expertise into clear services"
        : "Build a month of credible post angles";

    const description = isSkills
      ? "We use your Experience, target role and industry to recommend at least 10 searchable LinkedIn skills."
      : isServices
        ? "We translate demonstrated strengths into 10 service offers—without claiming expertise your experience cannot support."
        : "Ideas are shaped from your career context, projects and audience—not generic motivational filler.";

    return (
      <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[16px] border border-[#E1E8F1] bg-white p-4">
          <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#071536]">
            {title}
          </h2>

          <p className="mt-1.5 text-[10px] leading-4 text-[#66758D]">
            {description}
          </p>

          <div className="mt-3">
            <ContextBar values={values} setValues={setValues} />
          </div>

          <div className="mt-3 rounded-[14px] border border-[#E3EAF3] bg-[#FBFCFE] p-3">
            <div className="flex items-start gap-2.5">
              <BriefcaseBusiness className="mt-0.5 text-blue-600" size={16} />

              <div>
                <p className="text-[10px] font-extrabold text-[#071536]">
                  Experience is the evidence layer
                </p>

                <p className="mt-1 text-[9px] leading-4 text-[#6C7A91]">
                  {values.experience
                    ? `${values.experience.length} characters currently available for matching.`
                    : "Add your role details in the Experience tab for personalised recommendations."}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-2 rounded-[11px] bg-rose-50 px-3 py-2 text-[10px] font-semibold text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={() => runGenerator(active)}
            className="
              mt-3 inline-flex h-[39px] items-center justify-center gap-2
              rounded-[10px] bg-gradient-to-r
              from-[#0757E6] via-[#0876EE] to-[#119FEC]
              px-4 text-[10px] font-extrabold text-white
              shadow-[0_8px_18px_rgba(37,99,235,0.20)]
            "
          >
            <WandSparkles size={14} />

            {list.length
              ? "Regenerate recommendations"
              : isSkills
                ? "Generate top skills"
                : isServices
                  ? "Generate services"
                  : "Generate post ideas"}
          </button>
        </div>

        <div className="rounded-[16px] border border-[#E1E8F1] bg-[#FBFCFE] p-3">
          {list.length > 0 ? (
            <div className="grid gap-2.5 sm:grid-cols-2">
              {list.map((item, index) => (
                <article
                  key={`${item.name || item.title}-${index}`}
                  className="rounded-[13px] border border-[#E3EAF3] bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                      {item.relevance ||
                        item.type ||
                        `Service ${String(index + 1).padStart(2, "0")}`}
                    </span>

                    <span className="text-[9px] font-extrabold text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-2 text-[11px] font-extrabold leading-4 text-[#071536]">
                    {item.name || item.title}
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-[#6C7A91]">
                    {item.reason || item.description || item.prompt}
                  </p>

                  {item.audience && (
                    <p className="mt-2 text-[9px] font-bold text-teal-700">
                      For: {item.audience}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center text-center">
              <div>
                <WandSparkles size={22} className="mx-auto text-blue-500" />
                <p className="mt-2 text-[11px] font-extrabold text-[#071536]">
                  Recommendations appear here
                </p>
                <p className="mt-1 text-[9px] text-[#738198]">
                  Generate this section to see personalised suggestions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderOverall() {
    const scored = optimizerSections.filter(
      (section) => section.id !== "overall" && completed.has(section.id)
    );

    const missing = optimizerSections.filter(
      (section) =>
        !["overall", "posts"].includes(section.id) &&
        !completed.has(section.id)
    );

    return (
      <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-[16px] border border-[#E1E8F1] bg-white p-4">
          <div className="flex items-center gap-4">
            <ScoreRing score={overall} />

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-blue-600">
                {scored.length
                  ? scoreTier(overall).label
                  : "Waiting for diagnostics"}
              </p>

              <h2 className="mt-1 text-[17px] font-extrabold text-[#071536]">
                Composite LinkedIn profile score
              </h2>

              <p className="mt-1 text-[9px] leading-4 text-[#66758D]">
                {scored.length
                  ? `Based on ${scored.length} completed section${
                      scored.length === 1 ? "" : "s"
                    }. Analyze the remaining areas to make this score more complete.`
                  : "Run at least one section diagnostic to start building your score."}
              </p>
            </div>
          </div>

          {missing.length > 0 && (
            <div className="mt-3 rounded-[13px] border border-amber-200 bg-amber-50 p-3">
              <p className="text-[10px] font-extrabold text-amber-900">
                Your highest-value next step
              </p>

              <p className="mt-1 text-[9px] leading-4 text-amber-800">
                Complete {missing[0].label} next to strengthen the profile-wide diagnosis.
              </p>

              <button
                type="button"
                onClick={() => setActive(missing[0].id)}
                className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-extrabold text-blue-700"
              >
                Open {missing[0].label}
                <ArrowRight size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {optimizerSections
            .filter((section) => !["overall", "posts"].includes(section.id))
            .map((section) => {
              const score =
                results[section.id]?.score ||
                (generated[section.id]?.length ? 78 : null);

              return (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => setActive(section.id)}
                  className="
                    rounded-[13px] border border-[#E3EAF3]
                    bg-[#FBFCFE] p-3 text-left
                    transition hover:border-blue-300 hover:bg-blue-50/40
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-extrabold uppercase tracking-[0.11em] text-[#6A7890]">
                      {section.label}
                    </span>

                    <span
                      className={`text-[10px] font-extrabold ${
                        score ? "text-blue-700" : "text-slate-300"
                      }`}
                    >
                      {score ?? "—"}/100
                    </span>
                  </div>

                  <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-[#E8EDF5]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700"
                      style={{ width: `${score || 0}%` }}
                    />
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    );
  }

  const current = optimizerSections.find((section) => section.id === active);
  const activeIndex = optimizerSections.findIndex((section) => section.id === active);

  function openWorkspace() {
    if (!values.targetRole.trim() || !values.industry.trim()) {
      setSetupError("Enter your target role and industry to continue.");
      return;
    }

    setSetupError("");
    setHasStarted(true);
    setActive("headline");
    window.setTimeout(() => {
      document
        .getElementById("linkedin-optimizer-workspace")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <main
      className={`linkedin-optimizer-page relative min-h-screen transition-colors duration-300 ${
        isLight ? "bg-[#F8FAFE] text-slate-900" : "bg-slate-950 text-white"
      }`}
    >
      <CareerSenseNavbar
        heroTheme={heroTheme}
        onToggleHeroTheme={toggleHeroTheme}
      />

      {/* =====================================================
          HERO / REFERENCE-MATCHING INTRO
      ===================================================== */}
      <section
        className={`
          relative overflow-hidden
          ${
            isLight
              ? "bg-[#F8FAFE]"
              : "bg-slate-950"
          }
        `}
      >
        <div
          className={`
            pointer-events-none absolute inset-0
            ${
              isLight
                ? "bg-[radial-gradient(circle_at_22%_17%,rgba(59,130,246,0.065),transparent_27%),radial-gradient(circle_at_81%_20%,rgba(34,197,237,0.055),transparent_24%)]"
                : "bg-[radial-gradient(circle_at_22%_17%,rgba(37,99,235,0.13),transparent_27%),radial-gradient(circle_at_81%_20%,rgba(34,197,237,0.08),transparent_24%)]"
            }
          `}
        />

        <div
          className={`
            pointer-events-none absolute right-0 top-0
            hidden h-full w-[29%] bg-[size:18px_18px] lg:block
            ${
              isLight
                ? "bg-[linear-gradient(to_right,rgba(69,125,219,0.042)_1px,transparent_1px),linear-gradient(to_bottom,rgba(69,125,219,0.042)_1px,transparent_1px)]"
                : "bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)]"
            }
          `}
        />

        <div className="relative z-10 mx-auto max-w-[1460px] px-6 pb-7 pt-7 lg:px-10 xl:px-14">
          <div className="grid items-start gap-8 lg:grid-cols-[1.16fr_0.84fr] xl:gap-11">
            {/* LEFT */}
            <div className="min-w-0">
              <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_245px] xl:grid-cols-[minmax(0,1fr)_275px]">
                <div>
                  <span
                    className={`
                      inline-flex items-center gap-2 rounded-full border
                      px-3.5 py-1.5 text-[9px] font-extrabold
                      uppercase tracking-[0.17em]
                      ${
                        isLight
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-cyan-800 bg-cyan-950/30 text-cyan-300"
                      }
                    `}
                  >
                    <Linkedin size={12} />
                    LinkedIn Optimizer
                  </span>

                  <h1
                    className={`
                      mt-4 max-w-[670px] text-[40px] font-extrabold
                      leading-[1.04] tracking-[-0.045em]
                      sm:text-[45px] xl:text-[50px]
                      ${
                        isLight
                          ? "text-[#071536]"
                          : "text-white"
                      }
                    `}
                  >
                    Build a LinkedIn profile that{" "}
                    <span className="bg-gradient-to-r from-[#2563EB] via-[#169CF2] to-[#24C6DC] bg-clip-text text-transparent">
                      gets noticed.
                    </span>
                  </h1>

                  <p
                    className={`
                      mt-4 max-w-[610px] text-[12px] leading-[20px]
                      ${
                        isLight
                          ? "text-[#52627C]"
                          : "text-slate-300"
                      }
                    `}
                  >
                    Diagnose every section, strengthen your professional positioning
                    and turn your real experience into recruiter-ready profile copy.
                  </p>
                </div>

                <div className="relative hidden justify-end lg:flex">
                  <div className="absolute inset-x-6 bottom-2 h-16 rounded-full bg-blue-300/20 blur-3xl" />

                  <img
                    src={LinkedinHero}
                    alt="LinkedIn profile optimization"
                    className="relative w-full max-w-[265px] object-contain drop-shadow-[0_20px_30px_rgba(37,99,235,0.15)]"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-center lg:hidden">
                <img
                  src={LinkedinHero}
                  alt="LinkedIn profile optimization"
                  className="w-full max-w-[280px] object-contain"
                />
              </div>

              {/* Features card */}
              <div
                className={`
                  mt-5 rounded-[22px] border px-5 pb-2 pt-4
                  ${
                    isLight
                      ? "border-[#DCE5F1] bg-white/95 shadow-[0_16px_44px_rgba(22,52,103,0.045)]"
                      : "border-slate-800 bg-slate-900/90"
                  }
                `}
              >
                <h2
                  className={`text-[15px] font-extrabold ${
                    isLight ? "text-[#071536]" : "text-white"
                  }`}
                >
                  What this optimizer gives you
                </h2>

                <div className="mt-2 grid gap-x-6 sm:grid-cols-2">
                  <HeroFeature
                    icon={<SearchCheck size={20} />}
                    title="Section-by-section diagnostics"
                    description="Get clarity on what's working and what to improve."
                    tone="blue"
                  />

                  <HeroFeature
                    icon={<WandSparkles size={20} />}
                    title="Professional rewrite suggestions"
                    description="AI-crafted content that sounds like you — just stronger."
                    tone="emerald"
                  />

                  <HeroFeature
                    icon={<Target size={20} />}
                    title="Recruiter-focused positioning"
                    description="Highlight impact, outcomes and top skills recruiters look for."
                    tone="violet"
                  />

                  <HeroFeature
                    icon={<Lightbulb size={20} />}
                    title="Skills, services & post ideas"
                    description="Stand out with the right skills, services and content ideas."
                    tone="orange"
                  />
                </div>
              </div>

              
            </div>

            {/* RIGHT SETUP CARD — uses the same values state; no optimizer logic changed */}
            <div
              className={`
                rounded-[28px] border px-8 pb-7 pt-7
                ${
                  isLight
                    ? "border-white bg-white shadow-[0_28px_70px_rgba(34,96,191,0.115)]"
                    : "border-slate-700 bg-slate-900 shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
                }
              `}
            >
              <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-gradient-to-br from-[#2765EC] via-[#1599EE] to-[#27C8D8] shadow-[0_14px_32px_rgba(37,99,235,0.22)]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white text-[#2169EA]">
                  <Gauge size={18} />
                </div>
              </div>

              <div className="mt-4 text-center">
                <h2
                  className={`text-[22px] font-extrabold tracking-[-0.025em] ${
                    isLight ? "text-[#071536]" : "text-white"
                  }`}
                >
                  Optimize your profile
                </h2>

                <p
                  className={`mt-1.5 text-[11px] ${
                    isLight ? "text-[#667792]" : "text-slate-400"
                  }`}
                >
                  Takes 5 minutes. Completely free.
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span
                    className={`mb-1.5 block text-[10px] font-bold ${
                      isLight ? "text-[#25334F]" : "text-slate-200"
                    }`}
                  >
                    Target Role <span className="text-red-500">*</span>
                  </span>

                  <input
                    value={values.targetRole}
                    onChange={(e) =>
                      setValues((current) => ({
                        ...current,
                        targetRole: e.target.value,
                      }))
                    }
                    placeholder="e.g. Product Manager"
                    className="
                      h-[47px] w-full rounded-[12px] border
                      border-[#D8E1EF] bg-white px-4
                      text-[11px] font-semibold text-[#071536]
                      outline-none placeholder:text-[#8A99B2]
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    "
                  />
                </label>

                <label className="block">
                  <span
                    className={`mb-1.5 block text-[10px] font-bold ${
                      isLight ? "text-[#25334F]" : "text-slate-200"
                    }`}
                  >
                    Industry <span className="text-red-500">*</span>
                  </span>

                  <input
                    value={values.industry}
                    onChange={(e) =>
                      setValues((current) => ({
                        ...current,
                        industry: e.target.value,
                      }))
                    }
                    placeholder="e.g. SaaS, Fintech, Healthcare"
                    className="
                      h-[47px] w-full rounded-[12px] border
                      border-[#D8E1EF] bg-white px-4
                      text-[11px] font-semibold text-[#071536]
                      outline-none placeholder:text-[#8A99B2]
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    "
                  />
                </label>

                <label className="block">
                  <span
                    className={`mb-1.5 block text-[10px] font-bold ${
                      isLight ? "text-[#25334F]" : "text-slate-200"
                    }`}
                  >
                    Profile Goal
                  </span>

                  <input
                    value={values.profileGoal || ""}
                    onChange={(e) =>
                      setValues((current) => ({
                        ...current,
                        profileGoal: e.target.value,
                      }))
                    }
                    placeholder="e.g. Get more recruiter views"
                    className="
                      h-[47px] w-full rounded-[12px] border
                      border-[#D8E1EF] bg-white px-4
                      text-[11px] font-semibold text-[#071536]
                      outline-none placeholder:text-[#8A99B2]
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    "
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={openWorkspace}
                aria-controls="linkedin-optimizer-workspace"
                aria-expanded={hasStarted}
                className="
                  mt-5 flex h-[50px] w-full items-center justify-center gap-3
                  rounded-[12px] bg-gradient-to-r
                  from-[#0757E6] via-[#0876EE] to-[#119FEC]
                  text-[12px] font-extrabold text-white
                  shadow-[0_12px_26px_rgba(14,116,241,0.22)]
                  transition hover:brightness-105
                "
              >
                Start LinkedIn Optimization
                <ArrowRight size={15} />
              </button>

              {setupError && (
                <p role="alert" className="mt-2 text-center text-[10px] font-semibold text-rose-600">
                  {setupError}
                </p>
              )}

              <p className="mt-3 text-center text-[9px] text-[#8190A8]">
                Your data is secure and will never be shared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OPTIMIZER WORKSPACE
      ===================================================== */}
      {hasStarted && (
        <section
          id="linkedin-optimizer-workspace"
          className="relative mx-auto max-w-[1460px] scroll-mt-24 px-6 pb-12 pt-3 lg:px-10 xl:px-14"
        >
        {/* Tabs */}
        <div
          className={`
            overflow-x-auto rounded-[18px] border p-1.5
            ${
              isLight
                ? "border-[#DCE5F1] bg-white shadow-[0_10px_28px_rgba(28,77,145,0.035)]"
                : "border-slate-800 bg-slate-900"
            }
          `}
        >
          <div className="grid min-w-[980px] grid-cols-8 gap-1.5">
            {optimizerSections.map((section, index) => (
              <button
                type="button"
                key={section.id}
                onClick={() => {
                  setActive(section.id);
                  setError("");
                }}
                className={`
                  inline-flex h-[40px] items-center justify-center gap-2
                  rounded-[10px] border px-3 text-[10px] font-bold transition
                  ${
                    active === section.id
                      ? "border-transparent bg-gradient-to-r from-[#08B8CC] via-[#078CDD] to-[#2666EE] text-white shadow-[0_7px_16px_rgba(37,99,235,0.18)]"
                      : isLight
                        ? "border-[#E0E7F0] bg-white text-[#43536C] hover:border-blue-300"
                        : "border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-700"
                  }
                `}
              >
                <span
                  className={active === section.id ? "text-white" : "text-cyan-600"}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {section.short}

                {completed.has(section.id) && (
                  <CheckCircle2
                    size={11}
                    className={
                      active === section.id
                        ? "text-emerald-200"
                        : "text-emerald-500"
                    }
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main diagnostic card */}
        <div
          className={`
            mt-3 overflow-hidden rounded-[22px] border
            ${
              isLight
                ? "border-[#DCE5F1] bg-white shadow-[0_16px_45px_rgba(28,77,145,0.055)]"
                : "border-slate-800 bg-slate-900"
            }
          `}
        >
          <div
            className={`border-b px-5 py-4 sm:px-6 ${
              isLight ? "border-[#E8EDF4]" : "border-slate-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`
                  hidden h-10 w-10 shrink-0 items-center justify-center rounded-[13px] sm:flex
                  ${
                    isLight
                      ? "bg-cyan-50 text-cyan-700"
                      : "bg-cyan-900/30 text-cyan-400"
                  }
                `}
              >
                {active === "overall" ? (
                  <Gauge size={19} />
                ) : active === "posts" ? (
                  <Lightbulb size={19} />
                ) : active === "skills" ? (
                  <Layers3 size={19} />
                ) : active === "services" ? (
                  <BriefcaseBusiness size={19} />
                ) : (
                  <Target size={19} />
                )}
              </div>

              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                  Section {String(activeIndex + 1).padStart(2, "0")}
                </p>

                <h2
                  className={`mt-1 text-[19px] font-extrabold tracking-[-0.025em] ${
                    isLight ? "text-[#071536]" : "text-white"
                  }`}
                >
                  {sectionConfig[active]?.title || current.label}
                </h2>

                {sectionConfig[active]?.description && (
                  <p
                    className={`mt-1 max-w-4xl text-[10px] leading-4 ${
                      isLight ? "text-[#5B6B84]" : "text-slate-300"
                    }`}
                  >
                    {sectionConfig[active].description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {coreIds.includes(active)
              ? renderAnalyzer()
              : ["skills", "services", "posts"].includes(active)
                ? renderGenerator()
                : renderOverall()}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={activeIndex === 0}
            onClick={() =>
              setActive(optimizerSections[activeIndex - 1].id)
            }
            className={`
              inline-flex h-9 items-center gap-2 rounded-lg px-3
              text-[10px] font-bold transition disabled:invisible
              ${
                isLight
                  ? "text-slate-500 hover:bg-white"
                  : "text-slate-300 hover:bg-slate-900"
              }
            `}
          >
            <ArrowLeft size={13} />
            Previous
          </button>

          <div className="flex items-center gap-2 text-[9px] font-semibold text-slate-400">
            <Sparkles size={11} />
            Your content is used only to generate your diagnostic and is not displayed publicly.
          </div>

          {activeIndex < optimizerSections.length - 1 ? (
            <button
              type="button"
              onClick={() =>
                setActive(optimizerSections[activeIndex + 1].id)
              }
              className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[10px] font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Next section
              <ArrowRight size={13} />
            </button>
          ) : (
            <div className="w-[90px]" />
          )}
        </div>
        </section>
      )}

      <Footer heroTheme={heroTheme} />
    </main>
  );
}

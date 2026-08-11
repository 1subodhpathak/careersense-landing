import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BriefcaseBusiness, BriefcaseBusiness as Linkedin, Check, CheckCircle2,
  Copy, Gauge, Layers3, Lightbulb, LoaderCircle, RefreshCw,
  SearchCheck, Sparkles, Target, WandSparkles,
} from "lucide-react";
import CareerSenseNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
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
  const stroke = tier.color === "emerald" ? "#10b981" : tier.color === "blue" ? "#2563eb" : tier.color === "amber" ? "#f59e0b" : "#f43f5e";
  return (
    <div className={`relative shrink-0 ${size === "sm" ? "h-20 w-20" : "h-28 w-28"}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#dbe7f4" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={stroke} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)} className="transition-all duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#07172f]">
        <strong className={size === "sm" ? "text-xl" : "text-3xl"}>{score}</strong>
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">of 100</span>
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
  return <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy result"}</button>;
}

function Feedback({ result }) {
  const tier = scoreTier(result.score);
  return (
    <div className="mt-10 border-t border-slate-200 pt-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <ScoreRing score={result.score} />
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.16em] ${tier.color === "emerald" ? "text-emerald-600" : tier.color === "blue" ? "text-blue-600" : tier.color === "amber" ? "text-amber-600" : "text-rose-600"}`}>{tier.label}</p>
          <h3 className="mt-1 text-2xl font-black tracking-tight text-[#07172f]">Section diagnostic score</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{result.summary}</p>
        </div>
      </div>
      <div className="mt-7 grid gap-3">
        {result.feedback.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f9fcff] p-4 sm:p-5">
            <span className={`mt-0.5 inline-flex h-7 min-w-12 items-center justify-center rounded-full px-2 text-[9px] font-black uppercase tracking-wider ${item.tone === "strong" ? "bg-emerald-100 text-emerald-700" : item.tone === "fix" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{item.tone}</span>
            <div><h4 className="text-sm font-extrabold text-[#07172f]">{item.title}</h4><p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[0.15em] text-blue-700">Suggested professional rewrite</p><CopyButton value={result.rewrite} /></div>
        <div className="whitespace-pre-wrap rounded-2xl border border-blue-200 bg-blue-50/45 p-5 text-sm leading-7 text-slate-800 sm:p-6">{result.rewrite}</div>
        <p className="mt-3 text-xs text-slate-400">Ready to paste into LinkedIn. Review once to confirm every detail reflects your experience.</p>
      </div>
    </div>
  );
}

function ContextBar({ values, setValues }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:grid-cols-2 sm:p-5">
      <label className="grid gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">Target role
        <input value={values.targetRole} onChange={(e) => setValues((v) => ({ ...v, targetRole: e.target.value }))} placeholder="e.g. Senior Product Manager" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold normal-case tracking-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
      </label>
      <label className="grid gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">Industry or specialty
        <input value={values.industry} onChange={(e) => setValues((v) => ({ ...v, industry: e.target.value }))} placeholder="e.g. B2B SaaS, Analytics" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold normal-case tracking-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
      </label>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    return <>
      <ContextBar values={values} setValues={setValues} />
      <label className="mt-7 block">
        <span className="mb-2 flex items-center justify-between gap-3 text-xs font-extrabold uppercase tracking-wider text-slate-500"><span>{config.label}</span><span>{values[active].length} / {config.max}</span></span>
        <textarea value={values[active]} maxLength={config.max} onChange={(e) => setValues((v) => ({ ...v, [active]: e.target.value }))} placeholder={config.placeholder} rows={active === "headline" ? 4 : 8} className="w-full resize-y rounded-2xl border border-slate-200 bg-[#fbfdff] p-4 text-[15px] leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
      </label>
      {error && <p role="alert" className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
      <button type="button" onClick={() => runAnalysis(active)} disabled={loading} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70">{loading ? <LoaderCircle size={18} className="animate-spin" /> : result ? <RefreshCw size={18} /> : <SearchCheck size={18} />}{loading ? "Analyzing profile…" : result ? "Run again" : "Run diagnostic"}</button>
      {result && <Feedback result={result} />}
    </>;
  }

  function renderGenerator() {
    const isSkills = active === "skills";
    const isServices = active === "services";
    const list = generated[active];
    const title = isSkills ? "Generate your evidence-backed skill set" : isServices ? "Turn expertise into clear services" : "Build a month of credible post angles";
    const description = isSkills ? "We use your Experience, target role and industry to recommend at least 10 searchable LinkedIn skills." : isServices ? "We translate demonstrated strengths into 10 service offers—without claiming expertise your experience cannot support." : "Ideas are shaped from your career context, projects and audience—not generic motivational filler.";
    return <>
      <h2 className="text-2xl font-black tracking-tight text-[#07172f]">{title}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-6"><ContextBar values={values} setValues={setValues} /></div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f9fcff] p-5"><div className="flex items-start gap-3"><BriefcaseBusiness className="mt-0.5 text-blue-600" size={20} /><div><p className="text-sm font-extrabold text-[#07172f]">Experience is the evidence layer</p><p className="mt-1 text-xs leading-5 text-slate-500">{values.experience ? `${values.experience.length} characters currently available for matching.` : "Add your role details in the Experience tab for personalised recommendations."}</p></div></div></div>
      {error && <p role="alert" className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
      <button type="button" onClick={() => runGenerator(active)} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)] transition hover:bg-blue-700"><WandSparkles size={18} />{list.length ? "Regenerate recommendations" : isSkills ? "Generate top skills" : isServices ? "Generate services" : "Generate post ideas"}</button>
      {list.length > 0 && <div className="mt-9 grid gap-4 md:grid-cols-2">{list.map((item, index) => <article key={`${item.name || item.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"><div className="flex items-start justify-between gap-4"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">{item.relevance || item.type || `Service ${String(index + 1).padStart(2, "0")}`}</span><span className="text-xs font-black text-slate-300">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-3 text-base font-black leading-6 text-[#07172f]">{item.name || item.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{item.reason || item.description || item.prompt}</p>{item.audience && <p className="mt-3 text-xs font-bold text-teal-700">For: {item.audience}</p>}</article>)}</div>}
    </>;
  }

  function renderOverall() {
    const scored = optimizerSections.filter((section) => section.id !== "overall" && completed.has(section.id));
    const missing = optimizerSections.filter((section) => !["overall", "posts"].includes(section.id) && !completed.has(section.id));
    return <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center"><ScoreRing score={overall} /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">{scored.length ? scoreTier(overall).label : "Waiting for diagnostics"}</p><h2 className="mt-1 text-2xl font-black text-[#07172f]">Composite LinkedIn profile score</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{scored.length ? `Based on ${scored.length} completed section${scored.length === 1 ? "" : "s"}. Analyze the remaining areas to make this score more complete.` : "Run at least one section diagnostic to start building your score."}</p></div></div>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{optimizerSections.filter((s) => !["overall", "posts"].includes(s.id)).map((section) => { const score = results[section.id]?.score || (generated[section.id]?.length ? 78 : null); return <button type="button" key={section.id} onClick={() => setActive(section.id)} className="rounded-2xl border border-slate-200 bg-[#f9fcff] p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/40"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-slate-500">{section.label}</span><span className={`text-sm font-black ${score ? "text-blue-700" : "text-slate-300"}`}>{score ?? "—"}/100</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all duration-700" style={{ width: `${score || 0}%` }} /></div></button>; })}</div>
      {missing.length > 0 && <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm font-extrabold text-amber-900">Your highest-value next step</p><p className="mt-1 text-sm text-amber-800">Complete {missing[0].label} next to strengthen the profile-wide diagnosis.</p><button type="button" onClick={() => setActive(missing[0].id)} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">Open {missing[0].label}<ArrowRight size={16} /></button></div>}
    </>;
  }

  const current = optimizerSections.find((section) => section.id === active);
  const activeIndex = optimizerSections.findIndex((section) => section.id === active);
  return (
    <main className={`linkedin-optimizer-page relative min-h-screen transition-colors duration-300 ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"}`}>
      <CareerSenseNavbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-10 lg:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${isLight ? "border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700" : "border-cyan-800/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-400"}`}>
              <Linkedin size={14} /> LinkedIn Optimizer
            </span>
            <h1 className={`mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${isLight ? "text-slate-900" : "text-white"}`}>
              Build a LinkedIn profile that gets{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">noticed.</span>
            </h1>
            <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Diagnose every section, strengthen your professional positioning and turn your real experience into recruiter-ready profile copy.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-6 rounded-2xl border p-6 ${isLight ? "border-slate-200 bg-white shadow-xl shadow-slate-200/60" : "border-slate-700/80 bg-slate-900 shadow-xl shadow-black/40"}`}>
            <div><p className={`text-2xl font-extrabold ${isLight ? "text-slate-900" : "text-white"}`}>{completed.size}<span className="text-sm text-slate-400">/7</span></p><p className="mt-1 text-xs text-slate-500">Sections completed</p></div>
            <div><p className="text-2xl font-extrabold text-cyan-500">{overall || "—"}</p><p className="mt-1 text-xs text-slate-500">Current score</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-10">
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {optimizerSections.map((section, index) => (
              <button type="button" key={section.id} onClick={() => { setActive(section.id); setError(""); }} className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-xs font-bold transition ${active === section.id ? "border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20" : isLight ? "border-slate-200 bg-white text-slate-600 hover:border-cyan-300" : "border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-700"}`}>
                <span className={active === section.id ? "text-white" : "text-cyan-500"}>{String(index + 1).padStart(2, "0")}</span>{section.short}{completed.has(section.id) && <CheckCircle2 size={14} className="text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-5 overflow-hidden rounded-2xl border ${isLight ? "border-slate-200 bg-white shadow-xl shadow-slate-200/60" : "border-slate-700/80 bg-slate-900 shadow-xl shadow-black/40"}`}>
          <div className={`border-b px-5 py-7 sm:px-8 lg:px-10 ${isLight ? "border-slate-200" : "border-slate-700"}`}>
            <div className="flex items-start gap-4">
              <div className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:flex ${isLight ? "bg-cyan-50 text-cyan-700" : "bg-cyan-900/30 text-cyan-400"}`}>
                {active === "overall" ? <Gauge size={21} /> : active === "posts" ? <Lightbulb size={21} /> : active === "skills" ? <Layers3 size={21} /> : active === "services" ? <BriefcaseBusiness size={21} /> : <Target size={21} />}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-600">Section {String(activeIndex + 1).padStart(2, "0")}</p>
                <h2 className={`mt-1 text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>{sectionConfig[active]?.title || current.label}</h2>
                {sectionConfig[active]?.description && <p className={`mt-2 max-w-3xl text-sm leading-6 ${isLight ? "text-slate-600" : "text-slate-300"}`}>{sectionConfig[active].description}</p>}
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-8 lg:p-10">{coreIds.includes(active) ? renderAnalyzer() : ["skills", "services", "posts"].includes(active) ? renderGenerator() : renderOverall()}</div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" disabled={activeIndex === 0} onClick={() => setActive(optimizerSections[activeIndex - 1].id)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition disabled:invisible ${isLight ? "text-slate-600 hover:bg-white" : "text-slate-300 hover:bg-slate-900"}`}><ArrowLeft size={16} />Previous</button>
          {activeIndex < optimizerSections.length - 1 && <button type="button" onClick={() => setActive(optimizerSections[activeIndex + 1].id)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-cyan-600 transition hover:text-blue-600">Next section<ArrowRight size={16} /></button>}
        </div>
        <div className="mt-10 flex items-center justify-center gap-2 text-center text-xs font-bold text-slate-400"><Sparkles size={14} />Your content is used only to generate your diagnostic and is not displayed publicly.</div>
      </section>

      <Footer heroTheme={heroTheme} />
    </main>
  );
}

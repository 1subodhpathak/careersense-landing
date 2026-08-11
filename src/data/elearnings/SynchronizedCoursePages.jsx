import { ArrowLeft, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock3, Code2, Copy, Lightbulb, Menu, Search, ShieldAlert, Target, X } from "lucide-react";
import { useMemo, useState } from "react";
import { chapters as chatChapters, topicContent as chatContent } from "./ChatGPTForEveryonePage";
import { chapters as deepChapters, topicContent as deepContent } from "./DeepLearningHandbookPage";
import { chapters as llmChapters, topicContent as llmContent } from "./LLMProjectGuidePage";
import { chapters as mlopsChapters, topicContent as mlopsContent } from "./MLOpsBestPracticesPage";
import { chapters as machineChapters, topicContent as machineContent } from "./MachineLearningPage";
import { chapters as pythonChapters, topicContent as pythonContent } from "./PythonForDataSciencePage";
import { pythonLessonLabs } from "./pythonLessonLabs";

const courseConfigs = {
  chatgpt: { title: "ChatGPT for Everyone", level: "Beginner", chapters: chatChapters, content: chatContent, accent: "blue", project: "Build a reusable, evaluated ChatGPT workflow for a real professional task." },
  python: { title: "Python for Data Science", level: "Beginner", chapters: pythonChapters, content: pythonContent, labs: pythonLessonLabs, accent: "cyan", project: "Complete a reproducible data analysis and communicate one decision-ready finding." },
  machine: { title: "Machine Learning", level: "Intermediate", chapters: machineChapters, content: machineContent, accent: "blue", project: "Frame, train and evaluate a credible machine-learning baseline." },
  deep: { title: "Deep Learning Handbook", level: "Intermediate", chapters: deepChapters, content: deepContent, accent: "cyan", project: "Design and evaluate a neural-network experiment with documented trade-offs." },
  llm: { title: "LLM Project Guide", level: "Advanced", chapters: llmChapters, content: llmContent, accent: "blue", project: "Produce a portfolio-ready LLM system proposal with evaluation and safeguards." },
  mlops: { title: "MLOps Best Practices", level: "Advanced", chapters: mlopsChapters, content: mlopsContent, accent: "teal", project: "Design a traceable ML delivery pipeline with monitoring and rollback controls." },
};

function getTheme(theme) {
  const light = ["light", "day", "white"].includes(String(theme).toLowerCase());
  return { light, page: light ? "bg-[#f7f9fc]" : "bg-[#050b16]", panel: light ? "border-slate-200 bg-white" : "border-white/10 bg-[#0b1626]", text: light ? "text-[#0b1f3a]" : "text-white", muted: light ? "text-slate-600" : "text-slate-300", soft: light ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.04]" };
}

function normalizePrompt(item, index) {
  if (Array.isArray(item)) return { title: item[0] || `Practice prompt ${index + 1}`, prompt: item[1] || "" };
  return item || { title: `Practice prompt ${index + 1}`, prompt: "" };
}

function SynchronizedCoursePage({ theme = "light", courseKey }) {
  const config = courseConfigs[courseKey];
  const styles = getTheme(theme);
  const allLessons = useMemo(() => config.chapters.flatMap((module, moduleIndex) => module.topics.map((topic) => ({ ...topic, module, moduleIndex }))), [config]);
  const [activeId, setActiveId] = useState(allLessons[0].id);
  const [openModules, setOpenModules] = useState([config.chapters[0].id]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const index = allLessons.findIndex((item) => item.id === activeId);
  const topic = allLessons[index] || allLessons[0];
  const content = config.content[topic.id] || config.content[allLessons[0].id];
  const lab = config.labs?.[topic.id];
  const concepts = content.concepts || [];
  const workflow = content.workflow || [];
  const mistakes = content.mistakes || [];
  const prompts = (content.prompts || []).map(normalizePrompt);
  const filteredModules = useMemo(() => { const q = search.trim().toLowerCase(); if (!q) return config.chapters; return config.chapters.map((module) => ({ ...module, topics: module.topics.filter((item) => item.title.toLowerCase().includes(q)) })).filter((module) => module.topics.length); }, [config, search]);
  const choose = (id) => { setActiveId(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const move = (offset) => { const next = allLessons[index + offset]; if (next) choose(next.id); };
  async function copyText(value, id) { try { await navigator.clipboard.writeText(value); setCopied(id); window.setTimeout(() => setCopied(""), 1500); } catch { setCopied(""); } }

  return <main className={`min-h-screen ${styles.page}`}>
    {mobileOpen && <button aria-label="Close course navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" />}
    <div className="lg:grid lg:grid-cols-[330px_minmax(0,1fr)]">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(330px,100vw)] flex-col border-r transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${styles.panel} ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-start justify-between gap-3 border-b border-slate-200/70 p-5 dark:border-white/10"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-cyan-700">CareerSense Learning</p><h2 className={`mt-1 text-base font-black leading-5 ${styles.text}`}>{config.title}</h2><p className={`mt-1 text-xs ${styles.muted}`}>{config.chapters.length} modules · {allLessons.length} lessons</p></div><button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl lg:hidden ${styles.soft}`}><X className="h-4 w-4" /></button></div>
        <label className="relative m-3 mb-1"><span className="sr-only">Search lessons</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search lessons" className={`h-10 w-full rounded-xl border pl-9 pr-3 text-xs outline-none focus:border-cyan-500 ${styles.soft} ${styles.text}`} /></label>
        <nav className="flex-1 overflow-y-auto p-3">{filteredModules.map((module, moduleIndex) => { const open = openModules.includes(module.id); return <section key={module.id} className="mb-2"><button onClick={() => setOpenModules((items) => open ? items.filter((id) => id !== module.id) : [...items, module.id])} className={`flex w-full items-start justify-between gap-3 rounded-xl px-3 py-3 text-left ${styles.muted}`}><span><span className="block text-[10px] font-black uppercase tracking-wider text-cyan-700">Module {moduleIndex + 1}</span><span className={`mt-1 block text-sm font-black ${styles.text}`}>{module.title.replace(/^\d+\.\s*/, "")}</span><span className="mt-1 block text-[10px]">{module.topics.length} lessons</span></span><ChevronDown className={`mt-1 h-4 w-4 transition ${open ? "rotate-180" : ""}`} /></button>{open && <div className="mt-1 space-y-1 pl-2">{module.topics.map((item) => <button key={item.id} onClick={() => choose(item.id)} className={`w-full rounded-lg px-3 py-2.5 text-left text-xs font-semibold leading-5 ${activeId === item.id ? "bg-cyan-50 text-cyan-900" : styles.muted}`}>{item.title}</button>)}</div>}</section>; })}</nav>
      </aside>
      <div className="min-w-0"><header className={`sticky top-0 z-30 flex min-h-16 items-center justify-between border-b px-4 py-2 backdrop-blur-xl sm:px-7 ${styles.panel}`}><div className="flex items-center gap-3"><button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${styles.soft}`}><Menu className="h-5 w-5" /></button><a href="/" className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 text-sm font-extrabold ${styles.soft} ${styles.text}`}><ArrowLeft className="h-4 w-4" /><span>Learning materials</span></a></div><span className={`text-xs font-bold ${styles.muted}`}>{index + 1} of {allLessons.length}</span></header>
        <div className="mx-auto max-w-[1040px] px-5 py-9 sm:px-8 lg:py-12">
          <div className="mb-7"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-800">Module {topic.moduleIndex + 1} · {topic.module.title.replace(/^\d+\.\s*/, "")}</span><span className={`text-xs font-bold ${styles.muted}`}>{topic.readTime}</span></div><h1 className={`mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-.045em] sm:text-5xl ${styles.text}`}>{content.title || topic.title}</h1><p className={`mt-4 max-w-3xl text-lg leading-8 ${styles.muted}`}>{content.summary}</p></div>
          <section className={`rounded-2xl border p-6 sm:p-8 ${styles.panel}`}><div className="flex items-center gap-2 text-cyan-700"><Target className="h-5 w-5" /><h2 className="text-xl font-black">What you will understand</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{concepts.map((item) => <div key={item} className={`flex items-start gap-3 rounded-xl border p-4 ${styles.soft}`}><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" /><p className={`text-sm leading-6 ${styles.muted}`}>{item}</p></div>)}</div></section>
          <section className={`mt-6 rounded-2xl border p-6 sm:p-8 ${styles.panel}`}><div className="grid gap-7 md:grid-cols-2"><div><div className="flex items-center gap-2 text-blue-700"><Lightbulb className="h-5 w-5" /><h2 className="font-black">Recommended workflow</h2></div><ol className="mt-4 space-y-3">{workflow.map((item, i) => <li key={item} className={`flex gap-3 text-sm leading-6 ${styles.muted}`}><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-50 text-[10px] font-black text-blue-700">{i + 1}</span>{item}</li>)}</ol></div><div><div className="flex items-center gap-2 text-rose-600"><ShieldAlert className="h-5 w-5" /><h2 className="font-black">Mistakes to avoid</h2></div><ul className="mt-4 space-y-3">{mistakes.map((item) => <li key={item} className={`flex gap-3 text-sm leading-6 ${styles.muted}`}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />{item}</li>)}</ul></div></div></section>
          {content.cheat?.length > 0 && <section className={`mt-6 rounded-2xl border p-6 sm:p-8 ${styles.panel}`}><div className="flex items-center gap-2 text-cyan-700"><Code2 className="h-5 w-5" /><h2 className="font-black">Practical reference</h2></div><pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl bg-[#07172f] p-5 font-mono text-xs leading-6 text-slate-100">{content.cheat.join("\n")}</pre></section>}
          {lab && <section className={`mt-6 rounded-2xl border p-6 sm:p-8 ${styles.panel}`}><p className="text-[10px] font-black uppercase tracking-wider text-cyan-700">Guided code lab</p><h2 className={`mt-2 text-xl font-black ${styles.text}`}>{lab.objective}</h2><p className={`mt-3 text-sm leading-6 ${styles.muted}`}>{lab.scenario}</p><pre className="mt-5 overflow-x-auto rounded-xl bg-[#07172f] p-5 font-mono text-xs leading-6 text-slate-100">{lab.code}</pre><div className={`mt-4 rounded-xl border p-4 ${styles.soft}`}><p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Practice challenge</p><p className={`mt-2 text-sm font-bold ${styles.text}`}>{lab.challenge}</p></div></section>}
          {prompts.length > 0 && <section className={`mt-6 rounded-2xl border p-6 sm:p-8 ${styles.panel}`}><p className="text-[10px] font-black uppercase tracking-wider text-blue-700">Professional practice</p><h2 className={`mt-2 text-xl font-black ${styles.text}`}>Apply and extend the lesson</h2><div className="mt-5 space-y-3">{prompts.map((item, i) => <article key={`${item.title}-${i}`} className={`rounded-xl border p-4 ${styles.soft}`}><div className="flex items-center justify-between gap-3"><h3 className={`text-sm font-black ${styles.text}`}>{item.title}</h3><button onClick={() => copyText(item.prompt, `${topic.id}-${i}`)} className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-[10px] font-black ${styles.panel}`}><Copy className="h-3 w-3" />{copied === `${topic.id}-${i}` ? "Copied" : "Copy"}</button></div><p className={`mt-3 whitespace-pre-wrap text-xs leading-6 ${styles.muted}`}>{item.prompt}</p></article>)}</div></section>}
          <section className={`mt-6 rounded-2xl border p-6 ${styles.soft}`}><p className="text-[10px] font-black uppercase tracking-wider text-cyan-700">Module project</p><p className={`mt-2 text-sm font-bold ${styles.text}`}>{config.project}</p></section>
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><button disabled={index === 0} onClick={() => move(-1)} className={`flex min-h-16 items-center gap-3 rounded-xl border px-4 text-left disabled:opacity-40 ${styles.panel}`}><ChevronLeft className="h-5 w-5" /><span><span className={`block text-[10px] font-bold ${styles.muted}`}>Previous lesson</span><span className={`mt-1 block text-sm font-black ${styles.text}`}>{allLessons[index - 1]?.title || "Start"}</span></span></button><button disabled={index === allLessons.length - 1} onClick={() => move(1)} className={`flex min-h-16 items-center justify-between gap-3 rounded-xl border px-4 text-left disabled:opacity-40 ${styles.panel}`}><span><span className={`block text-[10px] font-bold ${styles.muted}`}>Next lesson</span><span className={`mt-1 block text-sm font-black ${styles.text}`}>{allLessons[index + 1]?.title || "Course complete"}</span></span><ChevronRight className="h-5 w-5" /></button></div>
        </div>
      </div>
    </div>
  </main>;
}

export const ChatGPTCoursePage = (props) => <SynchronizedCoursePage {...props} courseKey="chatgpt" />;
export const PythonCoursePage = (props) => <SynchronizedCoursePage {...props} courseKey="python" />;
export const MachineLearningCoursePage = (props) => <SynchronizedCoursePage {...props} courseKey="machine" />;
export const DeepLearningCoursePage = (props) => <SynchronizedCoursePage {...props} courseKey="deep" />;
export const LLMCoursePage = (props) => <SynchronizedCoursePage {...props} courseKey="llm" />;
export const MLOpsCoursePage = (props) => <SynchronizedCoursePage {...props} courseKey="mlops" />;

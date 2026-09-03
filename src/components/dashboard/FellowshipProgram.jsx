import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  CalendarCheck2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Clock3,
  Code2,
  Coins,
  Download,
  Eye,
  File,
  FileCheck2,
  FileText,
  Fingerprint,
  Flag,
  Folder,
  GraduationCap,
  LayoutTemplate,
  Link2,
  ListChecks,
  Lock,
  LockKeyhole,
  PanelsTopLeft,
  ReceiptIndianRupee,
  Rocket,
  Search,
  Save,
  Send,
  SkipForward,
  Smartphone,
  Sparkles,
  Upload,
  UploadCloud,
  UserRoundCheck,
  X,
} from "lucide-react";
import {
  assignmentsFor,
  fellowshipAttendanceMinimum,
  fellowshipDurationDays,
  fellowshipFee,
  fellowshipJoiningDelayDays,
  fellowshipPassScore,
  fellowshipPrograms,
  phasesFor,
} from "../../data/fellowshipPrograms";

const iconMap = {
  "data-analyst": BarChart3,
  "data-science": PanelsTopLeft,
  "artificial-intelligence": Bot,
  "ui-ux-design": LayoutTemplate,
  "app-development": Smartphone,
  "full-stack-development": Code2,
};

const defaultFellowshipPhases = [
  { id: 1, range: "Weeks 1-4", title: "Understand the Foundations", assignmentIds: [1, 2, 3, 4], color: "#1F8FFF", soft: "#EFF7FF", line: "#C9E4FF", icon: Search },
  { id: 2, range: "Weeks 5-8", title: "Build Real Projects", assignmentIds: [5, 6, 7, 8], color: "#20C9B0", soft: "#ECFBF8", line: "#C5F1E8", icon: Code2 },
  { id: 3, range: "Weeks 9-12", title: "Deliver Your Capstone", assignmentIds: [9, 10, 11, 12], color: "#7B61E8", soft: "#F4F1FF", line: "#D9D0FF", icon: Rocket },
];

const todayKey = () => new Date().toISOString().slice(0, 10);
const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};
const prettyDate = (value) => new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
const daysUntil = (value) => Math.max(0, Math.ceil((new Date(value).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000));

function getApiBase() {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return import.meta.env.VITE_API_URL || "http://localhost:4000";
  }
  return import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
}

function ProgramIcon({ program, size = 20 }) {
  const Icon = iconMap[program.id] || GraduationCap;
  return <Icon size={size} aria-hidden="true" />;
}

function StatusPill({ children, tone = "blue" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${tones[tone]}`}>{children}</span>;
}

function ProgramChooser({ onChoose }) {
  const [openId, setOpenId] = useState(fellowshipPrograms[0].id);
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] bg-[#081b33] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-11">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-cyan-300/15" />
        <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full border border-cyan-300/20" />
        <div className="relative max-w-3xl">
          <StatusPill tone="green">Admissions open year-round</StatusPill>
          <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">Choose one discipline. Build proof that you can do the work.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Three focused months of weekly project work, mentor evaluation and professional credentials. Open to students, freshers, job seekers and working professionals.</p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-slate-200">
            <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-cyan-300" /> 3 months</span>
            <span className="inline-flex items-center gap-2"><ReceiptIndianRupee size={16} className="text-cyan-300" /> ₹2,000 once</span>
            <span className="inline-flex items-center gap-2"><CalendarCheck2 size={16} className="text-cyan-300" /> Weekly projects</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="choose-fellowship-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Six professional tracks</p>
            <h2 id="choose-fellowship-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950">Find your fellowship</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">You can join one fellowship at a time. Your remaining options stay available after completion.</p>
        </div>

        <div className="mt-6 grid overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,45,85,0.07)] md:grid-cols-2">
          {fellowshipPrograms.map((program) => {
            const expanded = openId === program.id;
            return (
              <article key={program.id} className="flex flex-col border-b border-slate-100 p-5 transition hover:bg-[#f8fbff] md:[&:nth-child(odd)]:border-r">
                <button type="button" onClick={() => setOpenId(expanded ? "" : program.id)} aria-expanded={expanded} className="flex min-h-14 w-full items-start gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: program.soft, color: program.accent }}><ProgramIcon program={program} size={23} /></div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black tracking-tight text-slate-900">{program.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">{program.short}</p>
                  </div>
                  <ChevronDown size={16} className={`ml-auto mt-2 shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pl-16 pt-4 text-sm leading-6 text-slate-600">{program.outcome}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{program.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{skill}</span>)}</div>
                    <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500"><strong className="text-slate-700">Capstone:</strong> {program.capstone}</p>
                  </div>
                </div>
                {expanded && <button type="button" onClick={() => onChoose(program.id)} className="ml-16 mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0b376f] px-5 text-xs font-black text-white transition hover:bg-[#124d91] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Choose this fellowship <ArrowRight size={15} /></button>}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ApplicationForm({ program, profile, user, onBack, onComplete }) {
  const [form, setForm] = useState({
    fullName: profile?.fullName || user?.fullName || "",
    email: profile?.email || user?.primaryEmailAddress?.emailAddress || "",
    phone: profile?.phone || "",
    applicantType: "Student",
    qualification: "",
    motivation: "",
    documentsConfirmed: false,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const complete = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter an email address such as name@example.com.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!form.qualification.trim()) nextErrors.qualification = "Please enter your current or highest qualification.";
    if (form.motivation.trim().length < 40) nextErrors.motivation = "Tell us a little more—use at least 40 characters.";
    if (!form.documentsConfirmed) nextErrors.documentsConfirmed = "Confirm that your supporting documents are lawful and accurate.";
    if (!form.termsAccepted) nextErrors.termsAccepted = "Accept the fellowship terms to continue.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setProcessing(true);
    const paidAt = new Date();
    const joiningDate = addDays(paidAt, fellowshipJoiningDelayDays);
    const newEnrollment = {
      id: `CSF-${Date.now().toString().slice(-8)}`,
      programId: program.id,
      status: "joining_soon",
      applicant: form,
      paidAt: paidAt.toISOString(),
      joiningDate: joiningDate.toISOString(),
      expectedCompletionDate: addDays(joiningDate, fellowshipDurationDays).toISOString(),
      mentor: Number(paidAt.getTime().toString().slice(-1)) % 2 ? "Mentor A" : "Mentor B",
      attendance: {},
      assignments: {},
      sandbox: true,
    };

    // Async backend sync
    try {
      const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
      fetch(`${apiBase}/api/careersense/fellowship/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: user?.id,
          programId: program.id,
          userName: form.fullName,
          userEmail: form.email,
        })
      }).catch(() => {});
    } catch (_) {}

    window.setTimeout(() => {
      onComplete(newEnrollment);
    }, 650);
  };
  const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15";
  return (
    <div className="mx-auto max-w-5xl">
      <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-600 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"><ArrowLeft size={17} /> Back to fellowships</button>
      <div className="mt-4 grid overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="bg-[#091f39] p-6 text-white sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: program.soft, color: program.accent }}><ProgramIcon program={program} size={24} /></div>
          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">Your selected track</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">{program.name}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{program.outcome}</p>
          <dl className="mt-8 grid gap-5 border-t border-white/10 pt-6 text-sm">
            <div><dt className="text-xs font-bold text-slate-400">Participation fee</dt><dd className="mt-1 text-xl font-black">₹{fellowshipFee.toLocaleString("en-IN")}</dd></div>
            <div><dt className="text-xs font-bold text-slate-400">Program length</dt><dd className="mt-1 font-black">3 months · 12 weeks</dd></div>
            <div><dt className="text-xs font-bold text-slate-400">Joining</dt><dd className="mt-1 font-black">7 days after payment</dd></div>
          </dl>
        </aside>

        <section className="p-5 sm:p-8">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-blue-600">Application and enrollment</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Tell us who is joining</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Applications are accepted after payment and valid document checks. Illegal, forged or unverifiable documents will be rejected.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {[["fullName", "Full name", "Your legal name"], ["email", "Email address", "name@example.com"], ["phone", "Phone number", "+91 98765 43210"], ["qualification", "Current or highest qualification", "B.Tech, BBA, working professional…"]].map(([key, label, placeholder]) => <label key={key} className="text-xs font-black text-slate-700">{label}<input value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} className={`${inputClass} ${errors[key] ? "border-rose-500" : ""}`} aria-invalid={Boolean(errors[key])} />{errors[key] && <span className="mt-1.5 block text-xs font-semibold text-rose-600">{errors[key]}</span>}</label>)}
            <label className="text-xs font-black text-slate-700">You are applying as<select value={form.applicantType} onChange={(event) => update("applicantType", event.target.value)} className={inputClass}><option>Student</option><option>Fresher</option><option>Job seeker</option><option>Working professional</option></select></label>
            <label className="text-xs font-black text-slate-700 sm:col-span-2">Why is this fellowship right for you?<textarea value={form.motivation} onChange={(event) => update("motivation", event.target.value)} rows={4} placeholder="Share the skill you want to build and what you hope to create…" className={`${inputClass} min-h-28 py-3 ${errors.motivation ? "border-rose-500" : ""}`} />{errors.motivation && <span className="mt-1.5 block text-xs font-semibold text-rose-600">{errors.motivation}</span>}</label>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex items-center gap-3"><Upload size={18} className="text-blue-600" /><div><h3 className="text-sm font-black text-slate-900">Supporting documents</h3><p className="mt-0.5 text-xs text-slate-500">File upload connects here when secure document storage is configured.</p></div></div>
          </div>

          <div className="mt-6 space-y-3">
            {[{ key: "documentsConfirmed", text: "I confirm that my identity and supporting documents are lawful, accurate and verifiable." }, { key: "termsAccepted", text: "I understand the ₹2,000 fee, 75% attendance and assessment requirements, and that employment or placement is not guaranteed." }].map((item) => <div key={item.key}><label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" checked={form[item.key]} onChange={(event) => update(item.key, event.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" /><span>{item.text}</span></label>{errors[item.key] && <p className="ml-7 mt-1 text-xs font-semibold text-rose-600">{errors[item.key]}</p>}</div>)}
          </div>

          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><strong>Sandbox payment:</strong> no money is charged in this build. The button below creates a test enrollment and marks the payment boundary for the future payment provider.</div>
          <button type="button" onClick={complete} disabled={processing} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-black text-white transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><ReceiptIndianRupee size={18} />{processing ? "Creating sandbox enrollment…" : `Confirm application · ₹${fellowshipFee.toLocaleString("en-IN")}`}</button>
        </section>
      </div>
    </div>
  );
}

function JoiningSoon({ enrollment, program, onPreviewActive }) {
  const remaining = daysUntil(enrollment.joiningDate);
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 sm:p-9">
            <StatusPill tone="green"><Check size={12} className="mr-1" /> Enrollment confirmed</StatusPill>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: program.accent }}>{program.name}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Your fellowship begins in {remaining} {remaining === 1 ? "day" : "days"}.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">Use this week to complete your profile and prepare your workspace. Your first weekly project and daily attendance check-in open on {prettyDate(enrollment.joiningDate)}.</p>
            <div className="mt-7 flex flex-wrap gap-3"><button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0b2a4a] px-4 text-sm font-black text-white hover:bg-[#123b63]"><FileText size={16} /> View offer letter</button><button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700 hover:bg-slate-50"><Fingerprint size={16} /> View digital ID</button></div>
          </div>
          <div className="flex min-h-64 items-center justify-center bg-[#091f39] p-8 text-center text-white">
            <div><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/30 bg-white/5 text-4xl font-black text-cyan-300">{remaining}</div><p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Days until joining</p><p className="mt-2 font-black">{prettyDate(enrollment.joiningDate)}</p></div>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[[FileCheck2, "Application", "Accepted", "Your details and sandbox payment are recorded."], [UserRoundCheck, "Mentor", enrollment.mentor, "Automatically assigned for this enrollment."], [Rocket, "First project", "Unlocks on joining day", "A new project will follow each week."]].map(([Icon, label, value, copy]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><Icon size={20} className="text-blue-600" /><p className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p><h3 className="mt-1 text-base font-black text-slate-900">{value}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p></article>)}
      </section>
      {enrollment.sandbox && <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-4 text-sm text-blue-900"><strong>Development preview:</strong> use this only to inspect the active fellowship experience. <button type="button" onClick={onPreviewActive} className="ml-1 font-black underline underline-offset-4">Open active dashboard</button></div>}
    </div>
  );
}

export function FellowshipAssignmentWorkspace({
  project,
  program,
  record,
  onPatch,
  onExit,
  itemLabel = "Project",
  programDescriptor = `${program.name} Fellowship`,
  codePrefix = `PROJ-${program.id.toUpperCase()}`,
  passScore = fellowshipPassScore,
}) {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [evidenceError, setEvidenceError] = useState("");
  const [isDraggingEvidence, setIsDraggingEvidence] = useState(false);
  const evidenceRules = project.evidence || { maxLinks: 4, allowMultipleFiles: true, acceptedTypes: ["PDF", "DOCX", "PNG", "JPG"] };
  const maxLinks = evidenceRules.maxLinks || 4;
  const links = Array.from({ length: maxLinks }, (_, index) => record.links?.[index] || "");
  const files = record.files || [];
  const completions = record.activityCompletions || {};
  const isSubmitted = ["under_review", "passed", "skipped"].includes(record.status);
  const completedTasks = Object.keys(completions).length;
  const activityProgress = project.tasks.length ? Math.round((completedTasks / project.tasks.length) * 100) : 0;
  const evidenceCount = links.filter(Boolean).length + files.length;
  const noteText = record.notes || "";
  const noteWordCount = noteText.trim() ? noteText.trim().split(/\s+/).length : 0;
  const planningPrompts = [
    [Search, "Research", "Record useful sources, examples and observations."],
    [Flag, "Decisions", "Explain what you chose, what you rejected and why."],
    [CheckCircle2, "Progress", "Track completed work, blockers and your next action."],
  ];
  const stages = [
    [1, "Understand", Fingerprint],
    [2, "Plan & notes", FileText],
    [3, "Evidence", UploadCloud],
    [4, "Review", Flag],
  ];

  const save = () => {
    onPatch({ status: record.status === "available" ? "in_progress" : record.status });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };
  const toggleTask = (index) => {
    if (isSubmitted) return;
    const next = { ...completions };
    if (next[index]) delete next[index];
    else next[index] = new Date().toISOString();
    onPatch({ activityCompletions: next, status: "in_progress" });
  };
  const updateLink = (index, value) => {
    const next = [...links];
    next[index] = value;
    onPatch({ links: next, status: "in_progress" });
  };
  const linkSource = (value) => {
    if (!value) return "Empty";
    try {
      const host = new URL(value).hostname.replace(/^www\./, "");
      if (host.includes("github.com")) return "GitHub";
      if (host.includes("figma.com")) return "Figma";
      if (host.includes("drive.google.com") || host.includes("docs.google.com")) return "Google Drive";
      return host;
    } catch { return "Invalid URL"; }
  };
  const hasInvalidLinks = links.some((link) => link && linkSource(link) === "Invalid URL");
  const readinessChecks = [
    { label: `All ${itemLabel.toLowerCase()} activities completed`, detail: `${completedTasks} of ${project.tasks.length} complete`, ready: completedTasks === project.tasks.length, step: 1 },
    { label: "Planning notes added", detail: noteText.trim() ? `${noteWordCount} words recorded` : "Add your approach and decisions", ready: Boolean(noteText.trim()), step: 2 },
    { label: "Evidence prepared", detail: hasInvalidLinks ? "Correct invalid supporting links" : evidenceCount ? `${evidenceCount} evidence item${evidenceCount === 1 ? "" : "s"} added` : "Add at least one link or file", ready: evidenceCount > 0 && !hasInvalidLinks, step: 3 },
  ];
  const readyToSubmit = readinessChecks.every((check) => check.ready);
  const processFiles = (fileList) => {
    if (isSubmitted) return;
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;
    const accepted = evidenceRules.acceptedTypes.map((type) => type.toLowerCase().replace(/^\./, ""));
    const chosen = evidenceRules.allowMultipleFiles ? incoming : incoming.slice(0, 1);
    const invalidType = chosen.find((file) => !accepted.includes(file.name.split(".").pop()?.toLowerCase()));
    const oversized = chosen.find((file) => file.size > 10 * 1024 * 1024);
    if (invalidType) {
      setEvidenceError(`${invalidType.name} is not an accepted file type.`);
      return;
    }
    if (oversized) {
      setEvidenceError(`${oversized.name} is larger than the 10 MB limit.`);
      return;
    }
    const existingNames = new Set(files.map((file) => `${file.name}-${file.size}`));
    const added = chosen.filter((file) => !existingNames.has(`${file.name}-${file.size}`)).map((file) => ({ name: file.name, size: file.size, type: file.type }));
    if (!added.length) {
      setEvidenceError("This file has already been added.");
      return;
    }
    setEvidenceError("");
    onPatch({ files: evidenceRules.allowMultipleFiles ? [...files, ...added] : added, status: "in_progress" });
  };
  const addFiles = (event) => { processFiles(event.target.files); event.target.value = ""; };
  const submit = () => {
    if (!readyToSubmit || isSubmitted) return;
    onPatch({ status: "under_review", submittedAt: new Date().toISOString() });
    setStep(4);
  };

  return (
    <div className="pb-10">
      <div className="mb-6 flex items-start gap-3 sm:gap-4">
        <button type="button" onClick={onExit} aria-label={`Back to ${itemLabel.toLowerCase()}s`} className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white hover:text-[#092f62] hover:shadow-sm"><ArrowLeft size={22} /></button>
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-[-0.035em] text-[#092f62] sm:text-3xl">{project.title}</h1>
          <p className="mt-1 text-sm font-bold text-slate-500"><span className="font-black text-[#092f62]">{codePrefix}-{String(project.id).padStart(2, "0")}</span><span className="mx-2 text-slate-300">•</span>{programDescriptor}</p>
        </div>
      </div>

      <section className="overflow-hidden rounded-[24px] border border-[#dce7f0] bg-white shadow-[0_16px_46px_rgba(15,45,85,0.07)]">
        <header className="px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: program.soft, color: program.accent }}><ProgramIcon program={program} size={20} /></span><div><p className="text-[9px] font-black uppercase tracking-[0.16em]" style={{ color: program.accent }}>{program.name}</p><h2 className="mt-0.5 text-lg font-black text-[#092f62]">{itemLabel} brief</h2></div></div>
            <StatusPill tone={record.status === "passed" ? "green" : record.status === "under_review" ? "amber" : "blue"}>{record.status.replace("_", " ")}</StatusPill>
          </div>
          <div className="mt-5 rounded-2xl bg-[#f6f9fc] px-5 py-4 sm:px-6"><p className="text-sm font-semibold leading-7 text-slate-600">{project.summary}</p></div>
          <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[[Clock3, "Timeline", project.timeline || `Week ${project.week}`], [Sparkles, "Reward", `${project.points.toLocaleString("en-IN")} points`], [ListChecks, "Activities", `${completedTasks} of ${project.tasks.length}`], [BarChart3, "Progress", `${activityProgress}%`]].map(([Icon, label, value]) => <div key={label} className="rounded-xl bg-[#f8fafc] px-4 py-3.5"><dt className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400"><Icon size={14} className="text-cyan-700" />{label}</dt><dd className="mt-2 text-sm font-black text-[#092f62]">{value}</dd>{label === "Progress" && <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-cyan-500" style={{ width: `${activityProgress}%` }} /></div>}</div>)}
          </dl>
        </header>

        <nav aria-label="Project steps" className="grid grid-cols-2 border-y border-slate-200 bg-slate-50/70 lg:grid-cols-4">
          {stages.map(([number, label, Icon]) => <button key={number} type="button" onClick={() => setStep(number)} className={`flex min-h-16 items-center justify-center gap-2 border-b border-slate-200 px-3 text-xs font-black transition lg:border-b-0 lg:border-r ${step === number ? "bg-white text-cyan-700 shadow-[inset_0_-3px_0_#06b6d4]" : "text-slate-400 hover:bg-white hover:text-slate-700"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${step === number ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-200 bg-white"}`}>{number}</span><Icon size={15} /> {label}</button>)}
        </nav>

        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-8">
          {step === 1 && <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h3 className="text-lg font-black text-[#092f62]">Complete these activities</h3><p className="mt-1 text-xs text-slate-500">Mark each activity as you finish it. Completion dates are saved automatically.</p></div><div className="min-w-40"><div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-slate-400"><span>Progress</span><span className="text-cyan-700">{activityProgress}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${activityProgress}%` }} /></div></div></div>
            <div className="mt-4 grid gap-2.5 lg:grid-cols-2">{project.tasks.map((task, index) => { const done = Boolean(completions[index]); return <button key={task} type="button" disabled={isSubmitted} onClick={() => toggleTask(index)} className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition ${done ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:bg-cyan-50/20"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black ${done ? "bg-emerald-600 text-white" : "bg-[#092f62] text-cyan-300"}`}>{done ? <Check size={15} /> : index + 1}</span><span className="pt-0.5 text-xs font-semibold leading-5">{task}{done && <span className="mt-1 block text-[9px] font-black text-emerald-700"><CalendarDays size={11} className="mr-1 inline" /> Completed {prettyDate(completions[index])}</span>}</span></button>; })}</div>
          </div>}

          {step === 2 && <div><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-700">Working notes</p><h3 className="mt-1 text-xl font-black text-[#092f62]">Plan your work</h3><p className="mt-1 text-xs text-slate-500">Organize your thinking before you prepare the final evidence.</p></div><div className="flex items-center gap-2 text-[10px] font-black text-slate-400"><span className="rounded-lg bg-slate-100 px-2.5 py-1.5">{noteWordCount} words</span><span className="rounded-lg bg-slate-100 px-2.5 py-1.5">{noteText.length.toLocaleString("en-IN")} characters</span></div></div><div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#f8fafc] px-4 py-3"><div className="flex items-center gap-2 text-xs font-black text-[#092f62]"><FileText size={15} className="text-cyan-700" /> Project notebook</div><div className="flex items-center gap-2"><span className={`text-[10px] font-black ${saved ? "text-emerald-600" : "text-slate-400"}`}>{saved ? "Saved" : noteText ? "Unsaved changes" : "Ready to write"}</span>{!noteText && !isSubmitted && <button type="button" onClick={() => onPatch({ notes: "OBJECTIVE\nWhat outcome must this project achieve?\n\nRESEARCH & REFERENCES\nAdd useful sources, examples and observations.\n\nAPPROACH & DECISIONS\nExplain your planned process and important decisions.\n\nPROGRESS & BLOCKERS\nTrack completed work, open questions and blockers.\n\nNEXT ACTION\nWrite the next concrete action you will take.", status: "in_progress" })} className="rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1.5 text-[10px] font-black text-cyan-700 hover:bg-cyan-100">Use template</button>}</div></div><textarea disabled={isSubmitted} value={noteText} onChange={(event) => { setSaved(false); onPatch({ notes: event.target.value, status: "in_progress" }); }} rows={15} placeholder="Write your objective, research, approach, decisions, blockers and next actions…" className="w-full resize-y border-0 bg-white p-5 text-sm font-medium leading-7 text-slate-700 outline-none placeholder:text-slate-400 disabled:bg-slate-50 disabled:opacity-70" /><div className="flex items-center justify-between border-t border-slate-100 px-4 py-3"><p className="text-[10px] font-medium text-slate-400">Your notes remain editable until submission.</p><button type="button" onClick={save} disabled={isSubmitted} className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#092f62] px-3.5 text-[11px] font-black text-white hover:bg-[#124d91] disabled:opacity-50"><Save size={14} /> {saved ? "Saved" : "Save notes"}</button></div></div><aside className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4"><p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">A strong plan includes</p><div className="mt-3 space-y-2">{planningPrompts.map(([Icon, title, description]) => <div key={title} className="rounded-xl border border-slate-200 bg-white p-3"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700"><Icon size={14} /></span><p className="text-xs font-black text-[#092f62]">{title}</p></div><p className="mt-2 text-[11px] font-medium leading-5 text-slate-500">{description}</p></div>)}</div><div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3"><p className="text-[10px] font-black text-amber-800">Before moving ahead</p><p className="mt-1 text-[10px] leading-4 text-amber-700">Make sure your plan explains your reasoning—not only the final result.</p></div></aside></div></div>}

          {step === 3 && <div><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-700">Submission material</p><h3 className="mt-1 text-xl font-black text-[#092f62]">Add links and evidence</h3><p className="mt-1 text-xs text-slate-500">Submit clear, accessible proof of your completed work.</p></div><div className="flex gap-2"><span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-black text-slate-500">{links.filter(Boolean).length} links</span><span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-black text-slate-500">{files.length} files</span></div></div><div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><Link2 size={16} className="text-cyan-700" /><h4 className="text-sm font-black text-[#092f62]">Supporting links</h4></div><p className="mt-1 text-[11px] text-slate-500">Repositories, prototypes, shared documents or live projects.</p></div><span className="shrink-0 text-[10px] font-black text-cyan-700">{links.filter(Boolean).length}/{maxLinks}</span></div><div className="mt-4 space-y-3">{links.map((link, index) => { const source = linkSource(link); const invalid = source === "Invalid URL"; return <label key={index} className="block"><span className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.11em] text-slate-400"><span>Link {index + 1}</span>{link && <span className={invalid ? "text-rose-600" : "normal-case tracking-normal text-emerald-600"}>{source}</span>}</span><span className={`mt-1.5 flex min-h-11 items-center gap-3 rounded-xl border bg-[#f8fafc] px-3.5 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500/10 ${invalid ? "border-rose-300" : "border-slate-200 focus-within:border-cyan-500"}`}><Link2 size={15} className={invalid ? "text-rose-500" : "text-slate-400"} /><input disabled={isSubmitted} type="url" value={link} onChange={(event) => updateLink(index, event.target.value)} placeholder="https://…" aria-invalid={invalid} className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-400" /></span></label>; })}</div></section><aside className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4"><p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Evidence requirements</p><div className="mt-3 space-y-2 text-[11px] font-semibold text-slate-600"><p className="flex items-start gap-2 rounded-xl bg-white p-3"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />Up to {maxLinks} supporting links</p><p className="flex items-start gap-2 rounded-xl bg-white p-3"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />{evidenceRules.allowMultipleFiles ? "Multiple evidence files allowed" : "One evidence file allowed"}</p><p className="flex items-start gap-2 rounded-xl bg-white p-3"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />Maximum 10 MB per file</p></div><p className="mt-3 text-[10px] leading-4 text-slate-500">Accepted: {evidenceRules.acceptedTypes.join(", ")}</p></aside></div><label onDragEnter={(event) => { event.preventDefault(); setIsDraggingEvidence(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { event.preventDefault(); setIsDraggingEvidence(false); }} onDrop={(event) => { event.preventDefault(); setIsDraggingEvidence(false); processFiles(event.dataTransfer.files); }} className={`mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition ${isSubmitted ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70" : isDraggingEvidence ? "border-cyan-500 bg-cyan-50 ring-4 ring-cyan-500/10" : "border-slate-300 bg-[#fbfdff] hover:border-cyan-400 hover:bg-cyan-50/40"}`}><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-cyan-600 shadow-sm"><UploadCloud size={21} /></span><span className="mt-2.5 text-sm font-black text-[#092f62]">{isDraggingEvidence ? "Drop files to add them" : "Drag files here or browse"}</span><span className="mt-1 text-[10px] text-slate-500">Accepted files only · 10 MB maximum per file</span><input disabled={isSubmitted} type="file" accept={evidenceRules.acceptedTypes.map((type) => `.${type.toLowerCase()}`).join(",")} multiple={evidenceRules.allowMultipleFiles} className="sr-only" onChange={addFiles} /></label>{evidenceError && <div role="alert" className="mt-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700"><AlertCircle size={16} className="mt-0.5 shrink-0" /><span className="flex-1">{evidenceError}</span><button type="button" onClick={() => setEvidenceError("")} aria-label="Dismiss error" className="rounded p-0.5 hover:bg-rose-100"><X size={14} /></button></div>}{files.length > 0 ? <div className="mt-5"><div className="flex items-center justify-between"><h4 className="text-xs font-black text-[#092f62]">Uploaded files</h4><span className="text-[10px] font-black text-slate-400">{files.length} added</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{files.map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700"><File size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-black text-slate-700">{file.name}</span><span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">{file.size ? `${(file.size / 1024 / 1024).toFixed(file.size > 1048576 ? 1 : 2)} MB` : "File"}</span></span>{!isSubmitted && <button type="button" aria-label={`Remove ${file.name}`} onClick={() => { setEvidenceError(""); onPatch({ files: files.filter((_, itemIndex) => itemIndex !== index) }); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><X size={15} /></button>}</div>)}</div></div> : <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-[11px] font-semibold text-slate-400">No files added yet. Links may be sufficient if they cover every deliverable.</div>}</div>}

          {step === 4 && <div><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-700">Final check</p><h3 className="mt-1 text-xl font-black text-[#092f62]">Review your submission</h3><p className="mt-1 text-xs text-slate-500">Confirm that your {itemLabel.toLowerCase()} is complete and ready for mentor evaluation.</p></div><span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] ${isSubmitted || readyToSubmit ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{isSubmitted ? <CheckCircle2 size={14} /> : readyToSubmit ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}{isSubmitted ? "Submitted" : readyToSubmit ? "Ready to submit" : "Action required"}</span></div>{isSubmitted && record.submittedAt && <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"><Check size={17} /></span><div><p className="text-sm font-black text-emerald-900">{itemLabel} submitted for mentor review</p><p className="mt-1 text-xs font-medium text-emerald-700">Submitted on {prettyDate(record.submittedAt)}. Your work is locked while it is being reviewed.</p></div></div>}<div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-5"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h4 className="text-sm font-black text-[#092f62]">Submission readiness</h4><p className="mt-1 text-[11px] text-slate-500">Complete each requirement before submitting.</p></div><span className="text-xs font-black text-cyan-700">{readinessChecks.filter((check) => check.ready).length}/{readinessChecks.length}</span></div><div className="mt-4 space-y-2">{readinessChecks.map((check) => <button key={check.label} type="button" disabled={isSubmitted || check.ready} onClick={() => setStep(check.step)} className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left ${check.ready ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50 hover:bg-amber-100/70"}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${check.ready ? "bg-emerald-600 text-white" : "bg-white text-amber-600"}`}>{check.ready ? <Check size={15} /> : <AlertCircle size={15} />}</span><span className="min-w-0 flex-1"><span className={`block text-xs font-black ${check.ready ? "text-emerald-900" : "text-amber-900"}`}>{check.label}</span><span className={`mt-0.5 block text-[10px] font-medium ${check.ready ? "text-emerald-700" : "text-amber-700"}`}>{check.detail}</span></span>{!check.ready && <ChevronRight size={15} className="shrink-0 text-amber-600" />}</button>)}</div></section><section className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5"><div className="flex items-center justify-between gap-3"><h4 className="text-sm font-black text-[#092f62]">Required deliverables</h4><span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">{project.deliverables.length} items</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{project.deliverables.map((item, index) => <div key={item} className="flex items-start gap-2 rounded-xl bg-white px-3 py-2.5"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-[9px] font-black text-cyan-700">{index + 1}</span><p className="text-[11px] font-semibold leading-5 text-slate-600">{item}</p></div>)}</div></section></div><aside className="space-y-4"><section className="overflow-hidden rounded-2xl bg-[#092f62] text-white"><div className="p-5"><p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">Mentor evaluation</p><h4 className="mt-1 text-base font-black">How your work is scored</h4><p className="mt-1 text-[11px] leading-5 text-slate-300">You need an overall score of at least {passScore}% to pass.</p></div><div className="border-t border-white/10 px-5 py-4"><div className="space-y-3">{(project.evaluation || []).map((item) => <div key={item.criterion}><div className="flex items-center justify-between text-[10px] font-bold"><span className="text-slate-200">{item.criterion}</span><span className="text-cyan-300">{item.weight}%</span></div><div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${item.weight}%` }} /></div></div>)}</div></div></section><section className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-black text-[#092f62]">After submission</p><ul className="mt-3 space-y-2 text-[10px] font-medium leading-4 text-slate-500"><li className="flex gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-cyan-600" />Your {itemLabel.toLowerCase()} is sent to an assigned mentor.</li><li className="flex gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-cyan-600" />The mentor provides a score and written feedback.</li><li className="flex gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-cyan-600" />You may revise and resubmit if improvements are required.</li></ul></section></aside></div></div>}
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <button type="button" disabled={isSubmitted} onClick={() => { onPatch({ status: "skipped", skippedAt: new Date().toISOString() }); onExit(); }} className="inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm font-black text-amber-700 disabled:opacity-40"><SkipForward size={16} /> Skip {itemLabel.toLowerCase()}</button>
          <div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={save} disabled={isSubmitted} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"><Save size={17} /> {saved ? "Work saved" : "Save work"}</button>{step < 4 ? <button type="button" onClick={() => setStep(step + 1)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-black text-white hover:bg-blue-700">Next step <ChevronRight size={17} /></button> : <button type="button" onClick={submit} disabled={isSubmitted || !readyToSubmit} title={!readyToSubmit ? "Complete all submission requirements first" : undefined} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-black transition ${isSubmitted ? "bg-emerald-100 text-emerald-800" : readyToSubmit ? "bg-[#0b376f] text-white hover:bg-[#124d91]" : "cursor-not-allowed bg-slate-200 text-slate-500"}`}><Send size={17} /> {isSubmitted ? "Submitted for review" : readyToSubmit ? "Submit to mentor" : "Complete requirements"}</button>}</div>
        </footer>
      </section>
    </div>
  );
}

export function FellowshipAssignmentDetails({ project, program, record, onBack, onBegin, itemLabel = "Project", programDescriptor = `${program.name} Fellowship`, passScore = fellowshipPassScore }) {
  const status = record?.status || "available";
  const skills = Array.isArray(project.skills) ? project.skills : String(project.skills || "").split(",").map((skill) => skill.trim()).filter(Boolean);
  const evidence = project.evidence || { maxLinks: 4, allowMultipleFiles: true, acceptedTypes: ["PDF", "DOCX", "PNG", "JPG"] };
  const evaluation = project.evaluation || [];
  return (
    <div className="pb-10">
      <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50"><ArrowLeft size={17} /> Back to {itemLabel.toLowerCase()}s</button>
      <section className="mt-5 overflow-hidden rounded-[26px] border border-[#dce7f0] bg-white shadow-[0_16px_46px_rgba(15,45,85,0.07)]">
        <header className="px-5 py-7 sm:px-9 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex flex-wrap gap-2"><StatusPill tone="blue">{itemLabel} {project.id}</StatusPill><StatusPill tone="slate">{project.timeline || `Week ${project.week}, Day 1–7`}</StatusPill></div><StatusPill tone={status === "passed" ? "green" : status === "under_review" ? "amber" : "blue"}>{status.replace("_", " ")}</StatusPill></div>
          <div className="mt-5 flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: program.soft, color: program.accent }}><ProgramIcon program={program} size={22} /></span><div><p className="text-[9px] font-black uppercase tracking-[0.16em]" style={{ color: program.accent }}>{programDescriptor}</p><h2 className="mt-1 max-w-4xl text-2xl font-black tracking-[-0.03em] text-[#092f62] sm:text-3xl">{project.title}</h2></div></div>
          <div className="mt-6 rounded-2xl bg-[#f6f9fc] p-5"><p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-700">{itemLabel} mission</p><p className="mt-2 max-w-5xl text-sm font-semibold leading-7 text-slate-600">{project.mission || project.summary}</p></div>
        </header>

        <dl className="grid grid-cols-2 border-y border-[#e7eff5] bg-[#fbfdff] lg:grid-cols-4">
          {[[Clock3, "Timeline", project.timeline || `Week ${project.week}`], [Coins, "Reward", `${project.points.toLocaleString("en-IN")} points`], [Link2, "Evidence links", `Up to ${evidence.maxLinks}`], [BarChart3, "Mentor score", record?.score != null ? `${record.score}/100` : "Pending review"]].map(([Icon, label, value], index) => <div key={label} className={`flex min-h-[86px] items-center gap-3 px-5 py-4 ${index % 2 === 0 ? "border-r" : ""} ${index < 2 ? "border-b lg:border-b-0" : ""} border-[#e7eff5] lg:border-r lg:last:border-r-0`}><Icon size={17} className="shrink-0 text-cyan-700" /><div><dt className="text-[8px] font-black uppercase tracking-[0.13em] text-slate-400">{label}</dt><dd className="mt-1 text-xs font-black text-[#092f62]">{value}</dd></div></div>)}
        </dl>

        <div className="grid gap-8 p-5 sm:p-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <section><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><Fingerprint size={20} className="text-cyan-600" /><h3 className="text-lg font-black text-[#092f62]">What you will do</h3></div><span className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">{project.tasks.length} activities</span></div><ol className="mt-5 overflow-hidden rounded-2xl border border-slate-200">{project.tasks.map((task, index) => <li key={`${index}-${task}`} className="flex items-start gap-4 border-b border-slate-100 p-4 last:border-b-0"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#092f62] text-[10px] font-black text-cyan-300">{index + 1}</span><span className="text-xs font-semibold leading-6 text-slate-600 sm:text-sm">{task}</span></li>)}</ol></section>

          <div className="space-y-7">
            <section><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><FileCheck2 size={20} className="text-cyan-700" /><h3 className="text-lg font-black text-[#092f62]">Required deliverables</h3></div><span className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">{project.deliverables.length} required</span></div><ul className="mt-5 space-y-2">{project.deliverables.map((item, index) => <li key={`${index}-${item}`} className="flex items-start gap-3 rounded-xl bg-cyan-50/60 px-4 py-3"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-700" /><span className="text-xs font-semibold leading-5 text-slate-600">{item}</span></li>)}</ul></section>

            <section className="border-t border-slate-200 pt-6"><h3 className="text-sm font-black text-[#092f62]">Skills you will demonstrate</h3><div className="mt-3 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-600">{skill}</span>)}</div></section>

            <section className="border-t border-slate-200 pt-6"><h3 className="text-sm font-black text-[#092f62]">Submission evidence</h3><div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"><div className="rounded-xl bg-slate-50 p-4"><Link2 size={16} className="text-cyan-700" /><p className="mt-2 text-xs font-black text-slate-700">Up to {evidence.maxLinks} links</p><p className="mt-1 text-[10px] leading-4 text-slate-500">Repository, prototype, live project or supporting documents.</p></div><div className="rounded-xl bg-slate-50 p-4"><UploadCloud size={16} className="text-cyan-700" /><p className="mt-2 text-xs font-black text-slate-700">{evidence.allowMultipleFiles ? "Multiple files allowed" : "Single file allowed"}</p><p className="mt-1 text-[10px] leading-4 text-slate-500">{evidence.acceptedTypes.join(", ")}</p></div></div></section>
          </div>
        </div>

        <section className="border-t border-[#e7eff5] bg-[#fbfdff] px-5 py-6 sm:px-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-700">Mentor evaluation</p><h3 className="mt-1 text-lg font-black text-[#092f62]">How this {itemLabel.toLowerCase()} will be scored</h3><p className="mt-1 text-xs font-medium text-slate-500">A minimum overall score of {passScore}% is required to pass.</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">{evaluation.map((item) => <div key={item.criterion} className="min-w-28 rounded-xl border border-slate-200 bg-white px-3 py-2"><p className="text-lg font-black" style={{ color: program.accent }}>{item.weight}%</p><p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-slate-400">{item.criterion}</p></div>)}</div></div></section>

        {project.specialNote && <div className="border-t border-amber-200 bg-amber-50 px-5 py-4 sm:px-8"><div className="flex items-start gap-3"><AlertCircle size={17} className="mt-0.5 shrink-0 text-amber-700" /><div><p className="text-[9px] font-black uppercase tracking-[0.13em] text-amber-700">Important project note</p><p className="mt-1 text-xs font-semibold leading-5 text-amber-900">{project.specialNote}</p></div></div></div>}

        <footer className="flex flex-col gap-3 border-t border-slate-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="text-xs font-bold text-slate-500">Complete every required deliverable before submitting for mentor review.</p><button type="button" onClick={onBegin} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-black text-white transition hover:bg-blue-700"><Rocket size={17} /> {status === "available" ? `Begin ${itemLabel.toLowerCase()}` : status === "passed" ? `Review completed ${itemLabel.toLowerCase()}` : `Continue ${itemLabel.toLowerCase()}`}</button></footer>
      </section>
    </div>
  );
}

function ActiveFellowship({ enrollment, program, onChange, user }) {
  const assignments = assignmentsFor(program);
  const phaseThemes = [
    { color: "#1F8FFF", soft: "#EFF7FF", line: "#C9E4FF", icon: Search },
    { color: "#20C9B0", soft: "#ECFBF8", line: "#C5F1E8", icon: Code2 },
    { color: "#7B61E8", soft: "#F4F1FF", line: "#D9D0FF", icon: BarChart3 },
    { color: "#F08A3C", soft: "#FFF6EF", line: "#FFDCC1", icon: Flag },
    { color: "#F05B86", soft: "#FFF1F5", line: "#FFD0DE", icon: Rocket },
  ];
  const fellowshipPhases = (phasesFor(program) || defaultFellowshipPhases).map((phase, index) => ({ ...phase, ...phaseThemes[index % phaseThemes.length] }));
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedDetailsId, setSelectedDetailsId] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);
  const attendance = enrollment.attendance || {};
  const today = todayKey();
  const hasCheckedIn = Boolean(attendance[today]);
  const attendanceEntries = Object.values(attendance);
  const presentCount = attendanceEntries.filter((value) => value === "present" || value === "late").length;
  const attendanceRate = attendanceEntries.length ? Math.round((presentCount / attendanceEntries.length) * 100) : 100;
  const assignmentRecords = enrollment.assignments || {};
  const passed = Object.values(assignmentRecords).filter((item) => item.status === "passed").length;
  const markAttendance = () => {
    const currentEnrollment = enrollment || {};
    const updated = {
      ...currentEnrollment,
      programId: program.id,
      status: "active",
      attendance: { ...(currentEnrollment.attendance || {}), [today]: "present" }
    };
    onChange(updated);
    if (user?.id) {
      const apiBase = getApiBase();
      fetch(`${apiBase}/api/careersense/fellowship/mark-attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: user.id,
          date: today,
          status: "present",
          programId: program.id,
          userName: enrollment.applicant?.fullName || user?.fullName || "",
          userEmail: enrollment.applicant?.email || user?.primaryEmailAddress?.emailAddress || ""
        }),
      }).catch((err) => console.error("Mark attendance error:", err));
    }
  };
  const submitAssignment = (id) => {
    const currentEnrollment = enrollment || {};
    const currentAssignments = currentEnrollment.assignments || {};
    const updatedRecord = { ...(currentAssignments[id] || {}), status: "under_review", submittedAt: new Date().toISOString() };
    const updated = {
      ...currentEnrollment,
      programId: program.id,
      status: "active",
      assignments: { ...currentAssignments, [id]: updatedRecord }
    };
    onChange(updated);
    if (user?.id) {
      const apiBase = getApiBase();
      fetch(`${apiBase}/api/careersense/fellowship/submit-assignment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: user.id,
          enrollmentId: currentEnrollment._id || currentEnrollment.id,
          programId: program.id,
          assignmentId: id,
          phaseId: 1,
          title: `Project ${id}`,
          status: "submitted",
        }),
      }).catch((err) => console.error("Submit assignment error:", err));
    }
  };
  const assigned = assignments.length;
  const underReview = Object.values(assignmentRecords).filter((item) => item.status === "under_review").length;
  const inProgress = Object.values(assignmentRecords).filter((item) => item.status === "in_progress").length;
  const completionRate = assigned ? Math.round((passed / assigned) * 100) : 0;
  const fullName = enrollment.applicant?.fullName || "Fellow";
  const firstName = fullName.trim().split(/\s+/)[0];

  if (selectedDetailsId) {
    const project = assignments.find((item) => item.id === selectedDetailsId);
    return <FellowshipAssignmentDetails project={project} program={program} record={assignmentRecords[selectedDetailsId]} onBack={() => setSelectedDetailsId(null)} onBegin={() => { setSelectedDetailsId(null); setSelectedProjectId(project.id); }} />;
  }

  if (selectedProjectId) {
    const project = assignments.find((item) => item.id === selectedProjectId);
    const record = { status: "in_progress", notes: "", links: ["", "", "", ""], files: [], activityCompletions: {}, score: null, ...(assignmentRecords[selectedProjectId] || {}) };
    const patchAssignment = (patch) => {
      const currentEnrollment = enrollment || {};
      const currentAssignments = currentEnrollment.assignments || {};
      const updatedRecord = { ...record, ...patch, updatedAt: new Date().toISOString() };
      const updated = {
        ...currentEnrollment,
        programId: program.id,
        status: "active",
        assignments: { ...currentAssignments, [selectedProjectId]: updatedRecord }
      };
      onChange(updated);

      if (user?.id) {
        const apiBase = getApiBase();
        fetch(`${apiBase}/api/careersense/fellowship/submit-assignment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkUserId: user.id,
            enrollmentId: currentEnrollment._id || currentEnrollment.id,
            programId: program.id,
            assignmentId: selectedProjectId,
            phaseId: project.phaseId || 1,
            title: project.title,
            githubUrl: updatedRecord.links?.[0] || "",
            liveDemoUrl: updatedRecord.links?.[1] || "",
            fileUrls: (updatedRecord.files || []).map((f) => (typeof f === "string" ? f : f.url || f.name)),
            files: updatedRecord.files || [],
            links: updatedRecord.links || [],
            notes: updatedRecord.notes || "",
            activityCompletions: updatedRecord.activityCompletions || {},
            status: updatedRecord.status === "under_review" ? "submitted" : updatedRecord.status,
          }),
        }).catch((err) => console.error("Patch assignment error:", err));
      }
    };
    return <FellowshipAssignmentWorkspace project={project} program={program} record={record} onPatch={patchAssignment} onExit={() => setSelectedProjectId(null)} />;
    /* Legacy detail view retained temporarily below while the richer workspace is validated. */
    const status = record?.status || "in_progress";
    const progress = status === "passed" ? 100 : status === "under_review" ? 80 : 10;
    return (
      <div className="space-y-7">
        <header>
          <button type="button" onClick={() => setSelectedProjectId(null)} className="inline-flex min-h-11 items-center gap-2 text-sm font-black text-slate-500 transition hover:text-[#0b376f]"><ArrowLeft size={18} /> Back to fellowship dashboard</button>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#092f62] sm:text-4xl">{project.title}</h2>
              <p className="mt-2 text-sm font-bold text-slate-500"><span className="font-black text-[#0b376f]">PROJ-{program.id.slice(0, 4).toUpperCase()}-{String(project.id).padStart(2, "0")}</span> · {program.name}</p>
            </div>
            <StatusPill tone={status === "passed" ? "green" : status === "under_review" ? "amber" : "blue"}>{status.replace("_", " ")}</StatusPill>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,45,85,0.05)] sm:p-7">
              <div className="flex items-center justify-between gap-4"><h3 className="text-lg font-black text-[#092f62]">Project details</h3><StatusPill>{status.replace("_", " ")}</StatusPill></div>
              <p className="mt-6 rounded-2xl bg-[#f5f8fc] p-5 text-sm font-semibold leading-7 text-slate-600">{project.summary} Complete this work as a professional portfolio artifact, explaining your decisions, evidence and final outcome.</p>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[["Priority", "Standard"], ["Assigned on", prettyDate(enrollment.joiningDate)], ["Course ends", prettyDate(enrollment.expectedCompletionDate)], ["Progress", `${progress}%`]].map(([label, value]) => <div key={label} className="rounded-xl bg-[#f7f9fc] p-4"><dt className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{label}</dt><dd className="mt-2 text-sm font-black text-slate-900">{value}</dd>{label === "Progress" && <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} /></div>}</div>)}
              </dl>
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700">Project instructions</p><p className="mt-2 text-sm font-semibold leading-6 text-amber-950">Create the required artifact for this week, include every listed deliverable, document the tools and process you used, and explain how you validated the result.</p></div>
              <button type="button" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-[#0b376f] hover:bg-slate-50"><Download size={16} /> Download project brief</button>
            </section>

            <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,45,85,0.05)] sm:p-7">
              <h3 className="text-lg font-black text-[#092f62]">My submission history</h3>
              {record ? <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4"><div><p className="text-sm font-black text-slate-800">Project submitted</p><p className="mt-1 text-xs text-slate-500">{prettyDate(record.submittedAt)}</p></div><StatusPill tone="amber">Mentor review</StatusPill></div> : <div className="py-14 text-center"><Upload size={30} className="mx-auto text-slate-300" /><p className="mt-4 text-sm font-black text-slate-500">You have not uploaded any work yet.</p></div>}
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,45,85,0.05)]"><h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#092f62]">Your progress</h3><div className="mt-6 space-y-0">{[["Available", true], ["In progress", true], ["Submitted", Boolean(record)], ["Completed", status === "passed"]].map(([label, done], index) => <div key={label} className="flex gap-3"><div className="flex flex-col items-center"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${done ? index === 1 && !record ? "bg-[#0b376f] text-white" : "bg-emerald-500 text-white" : "bg-slate-200 text-white"}`}>{done ? <Check size={16} /> : <span className="h-2 w-2 rounded-full bg-white" />}</span>{index < 3 && <span className={`h-8 w-px ${done ? "bg-emerald-300" : "bg-slate-200"}`} />}</div><span className={`pt-2 text-sm font-black ${done ? "text-[#0b376f]" : "text-slate-300"}`}>{label}</span></div>)}</div></section>
            <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,45,85,0.05)]"><h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#092f62]">Actions</h3><button type="button" onClick={() => submitAssignment(project.id)} disabled={status === "under_review" || status === "passed"} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0b376f] px-4 text-sm font-black text-white hover:bg-[#124d91] disabled:bg-emerald-100 disabled:text-emerald-800"><Upload size={17} />{status === "under_review" ? "Submitted for review" : status === "passed" ? "Project completed" : "Upload project & submit"}</button><button type="button" onClick={() => setSelectedProjectId(null)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50"><ArrowLeft size={16} /> Back to dashboard</button></section>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="overflow-hidden rounded-[24px] border border-[#dce7f0] bg-white shadow-[0_10px_30px_rgba(22,63,98,0.06)]">
        <div className="grid gap-5 px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: program.soft, color: program.accent }}><ProgramIcon program={program} size={22} /></div>
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-x-3 gap-y-1"><h2 className="text-2xl font-black tracking-[-0.025em] text-[#092f62]">Welcome, {firstName}</h2><span aria-hidden="true" className="text-xl">👋</span><span className="rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em]" style={{ borderColor: `${program.accent}30`, background: program.soft, color: program.accent }}>Active fellowship</span></div><p className="mt-1 truncate text-sm font-semibold text-slate-500">{program.name} · {assigned} projects · Mentor: {enrollment.mentor || "To be assigned"}</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-[#f6f9fc] px-4 py-3"><div><p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Overall progress</p><p className="mt-0.5 text-xl font-black text-[#092f62]">{completionRate}%</p></div><div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-emerald-500 transition-[width]" style={{ width: `${completionRate}%` }} /></div></div>
        </div>
        <div className="grid grid-cols-2 border-t border-[#e7eff5] bg-[#fbfdff] lg:grid-cols-4">
          {[[Folder, "Assigned", assigned, "#1F8FFF", "#EFF7FF"], [Rocket, "In progress", inProgress, "#1496B8", "#EAFBFD"], [Clock3, "Pending review", underReview, "#D97706", "#FFF8E7"], [CheckCircle2, "Completed", passed, "#059669", "#ECFDF5"]].map(([Icon, label, value, color, soft], index) => <article key={label} className={`flex min-h-[82px] items-center gap-3 px-5 py-4 sm:px-6 ${index % 2 === 0 ? "border-r" : ""} ${index < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0 border-[#e7eff5]`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ color, background: soft }}><Icon size={17} /></span><div><p className="text-xl font-black leading-none text-[#07182f]">{value}</p><p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">{label}</p></div></article>)}
        </div>
      </section>

      <section className="overflow-hidden rounded-[24px] border border-[#dce7f0] bg-white shadow-[0_10px_30px_rgba(22,63,98,0.05)]">
        <div className="flex flex-col gap-3 border-b border-[#e7eff5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div><div className="text-[9px] font-black uppercase tracking-[0.16em] text-emerald-600">Daily accountability</div><h3 className="mt-1 text-xl font-black text-[#092f62]">Attendance</h3></div>
          <button type="button" onClick={() => setShowAttendance((value) => !value)} aria-expanded={showAttendance} className="inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-[#0b376f] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">{showAttendance ? "Hide history" : "View attendance history"}<ChevronDown size={15} className={`transition-transform ${showAttendance ? "rotate-180" : ""}`} /></button>
        </div>
        <div className="grid lg:grid-cols-[minmax(300px,0.9fr)_1.6fr]">
          <div className={`flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6 lg:border-r lg:border-[#e7eff5] ${hasCheckedIn ? "bg-emerald-50/60" : "bg-[#f8fbfe]"}`}>
            <div className="flex items-center gap-4"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${hasCheckedIn ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-[#0b376f]"}`}><Fingerprint size={23} /></span><div><p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">Today · {prettyDate(new Date())}</p><p className={`mt-1 text-base font-black ${hasCheckedIn ? "text-emerald-800" : "text-[#092f62]"}`}>{hasCheckedIn ? "Attendance recorded" : "Check-in pending"}</p><p className="mt-1 text-xs font-medium text-slate-500">Daily dashboard check-in is required.</p></div></div>
            <button type="button" onClick={markAttendance} disabled={hasCheckedIn} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0b376f] px-5 text-xs font-black text-white transition hover:bg-[#124d91] disabled:bg-emerald-600 disabled:text-white"><CheckCircle2 size={16} />{hasCheckedIn ? "Present" : "Mark present"}</button>
          </div>
          <div className="grid grid-cols-3 bg-[#fbfdff]">
            {[[CalendarCheck2, attendanceEntries.length, "Recorded days", "#0B376F", "#EFF5FB"], [CheckCircle2, presentCount, "Days present", "#059669", "#ECFDF5"], [BarChart3, `${attendanceRate}%`, "Attendance rate", attendanceRate >= fellowshipAttendanceMinimum ? "#059669" : "#D97706", attendanceRate >= fellowshipAttendanceMinimum ? "#ECFDF5" : "#FFF8E7"]].map(([Icon, value, label, color, soft], index) => <article key={label} className={`flex min-h-[126px] flex-col justify-center px-4 py-5 sm:flex-row sm:items-center sm:gap-3 sm:px-6 ${index < 2 ? "border-r border-[#e7eff5]" : ""}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ color, background: soft }}><Icon size={17} /></span><div className="mt-3 sm:mt-0"><p className="text-xl font-black leading-none text-[#07182f] sm:text-2xl">{value}</p><p className="mt-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-slate-400 sm:text-[9px]">{label}</p></div></article>)}
          </div>
        </div>
        <div className={`grid transition-[grid-template-rows] duration-300 ${showAttendance ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><div className="border-t border-[#e7eff5] px-5 py-5 sm:px-7">{attendanceEntries.length ? <div className="overflow-hidden rounded-xl border border-slate-200"><div className="grid grid-cols-[1fr_auto] bg-slate-50 px-4 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400"><span>Date</span><span>Status</span></div>{Object.entries(attendance).sort(([a], [b]) => b.localeCompare(a)).map(([date, status]) => <div key={date} className="grid grid-cols-[1fr_auto] items-center border-t border-slate-100 px-4 py-3"><span className="text-xs font-bold text-slate-700">{prettyDate(`${date}T12:00:00`)}</span><StatusPill tone="green">{status}</StatusPill></div>)}</div> : <div className="py-5 text-center"><CalendarCheck2 size={22} className="mx-auto text-slate-300" /><p className="mt-2 text-xs font-bold text-slate-400">Your attendance history will appear here after the first check-in.</p></div>}</div></div></div>
      </section>

      <section className="overflow-hidden rounded-[26px] border border-[#dceaf4] bg-white shadow-[0_12px_34px_rgba(22,63,98,0.06)]">
        <div className="flex flex-col gap-3 border-b border-[#e7eff5] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
          <div><div className="text-[9px] font-black uppercase tracking-[0.16em] text-[#18a8c7]">Real work experience</div><h2 className="mt-1 text-2xl font-black tracking-tight text-[#07182f]">My Projects</h2><p className="mt-1 text-xs font-medium text-slate-500">All your internship projects in one place.</p></div>
          <span className="w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-amber-600">Sequential 7-Day Unlocking Active</span>
        </div>
        <div className="space-y-8 bg-[#fbfdff] p-4 sm:p-6 lg:p-7">
          {fellowshipPhases.map((phase) => { const Icon = phase.icon; return <div key={phase.id}>
            <div className="mb-4 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(24,183,204,0.10)]" style={{ background: phase.soft, color: phase.color, border: `1px solid ${phase.line}` }}><Icon size={18} /></div><div><div className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: phase.color }}>Phase {phase.id} · {phase.range}</div><div className="text-base font-black text-[#07182f]">{phase.title}</div></div></div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {phase.assignmentIds.map((id, assignmentIndex) => {
                const assignment = assignments[id - 1];
                const record = assignmentRecords[id] || {};
                const status = record.status || "available";
                const submitted = status === "under_review" || status === "passed";
                const hasNext = assignmentIndex < phase.assignmentIds.length - 1;
                const label = status === "in_progress" ? "IN PROGRESS" : status === "under_review" ? "IN REVIEW" : status === "passed" ? "COMPLETED" : "OPEN";
                const unlockStatus = getAssignmentUnlockStatus(id, assignmentRecords);

                return (
                  <div key={id} className="relative">
                    {hasNext && <><div className={`pointer-events-none absolute left-[calc(100%-1px)] top-1/2 z-0 hidden h-[3px] w-5 -translate-y-1/2 rounded-full xl:block ${submitted ? "bg-blue-500" : "bg-slate-200"}`} /><div className={`pointer-events-none absolute left-1/2 top-full z-0 hidden h-5 w-[3px] -translate-x-1/2 rounded-full md:block xl:hidden ${submitted ? "bg-blue-500" : "bg-slate-200"}`} /><div className={`pointer-events-none absolute left-1/2 top-full z-0 h-5 w-[3px] -translate-x-1/2 rounded-full md:hidden ${submitted ? "bg-blue-500" : "bg-slate-200"}`} /></>}
                    <article className={`group relative z-10 flex min-h-[220px] flex-col rounded-[20px] border bg-white p-4 transition duration-300 sm:p-5 ${!unlockStatus.isUnlocked ? "filter blur-[1.5px] opacity-60 pointer-events-none select-none" : submitted ? "shadow-[0_8px_24px_rgba(23,185,216,0.12),0_0_20px_rgba(23,185,216,0.08)] hover:-translate-y-0.5" : "shadow-[0_8px_22px_rgba(22,63,98,0.05)] hover:shadow-[0_14px_28px_rgba(22,63,98,0.09)] hover:-translate-y-0.5"}`} style={{ borderColor: submitted ? "#73dce9" : phase.line }}>
                      <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-black" style={{ background: phase.soft, color: phase.color }}>{String(id).padStart(2, "0")}</span><div><div className="text-[8px] font-black uppercase tracking-[0.14em]" style={{ color: phase.color }}>Project {id}</div><div className="mt-0.5 flex items-center gap-1 text-[9px] font-bold text-slate-400"><Clock3 size={10} /> Week {assignment.week}, Day 1 - Week {assignment.week}, Day 7</div></div></div><span className={`rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${submitted ? "border-cyan-200 bg-cyan-50 text-cyan-700" : status === "in_progress" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-500"}`}>{label}</span></div>
                      <h3 className="mt-4 text-[15px] font-black leading-snug text-[#07182f]">{assignment.title}</h3><p className="mt-2 line-clamp-3 text-[11px] font-medium leading-[1.65] text-slate-500">{assignment.summary}</p>
                      <div className="mt-auto pt-4"><div className="flex items-center justify-between border-t border-[#edf2f6] pt-3 text-[9px] font-bold"><span className="inline-flex items-center gap-1 text-amber-700"><Coins size={11} /> {assignment.points.toLocaleString("en-IN")} points</span><span className="text-slate-400">Score {record.score ?? "--"}/100</span></div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => unlockStatus.isUnlocked && setSelectedDetailsId(id)} disabled={!unlockStatus.isUnlocked} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[#dbe7ef] bg-white text-[10px] font-black text-[#30455c] transition hover:bg-[#f6fbfe] disabled:opacity-50"><Eye size={13} /> Details</button><button type="button" onClick={() => unlockStatus.isUnlocked && setSelectedProjectId(id)} disabled={!unlockStatus.isUnlocked} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl text-[10px] font-black text-white shadow-sm transition hover:brightness-105 disabled:opacity-50" style={{ backgroundColor: phase.color, boxShadow: `0 8px 18px ${phase.color}2e` }}><Rocket size={13} /> {status === "in_progress" ? "Continue" : submitted ? "Review" : "Begin"}</button></div></div>
                    </article>

                    {!unlockStatus.isUnlocked && (
                      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[20px] bg-slate-950/75 backdrop-blur-[3px] p-5 text-center text-white shadow-xl">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 shadow-md">
                          <Lock size={22} />
                        </div>
                        <span className="mt-2.5 text-[10px] font-black uppercase tracking-widest text-amber-300">
                          Project {id} Locked
                        </span>
                        <p className="mt-1 max-w-[200px] text-[11px] font-bold leading-relaxed text-slate-200">
                          {unlockStatus.lockReason}
                        </p>
                      </div>
                    )}

                    <div className={`pointer-events-none absolute -right-2 top-1/2 z-20 hidden h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-white xl:block ${submitted ? "bg-blue-500" : "bg-slate-300"}`} />
                  </div>
                );
              })}
            </div>
          </div>; })}
        </div>
      </section>

      <section className="border-t border-slate-200 pt-9"><div className="flex items-center gap-3"><span className="h-7 w-1.5 rounded-full bg-teal-500" /><div><h3 className="text-xl font-black text-[#092f62]">Final evaluation</h3><p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Certificate unlocks after every completion requirement is met</p></div></div><div className="mt-5 grid gap-5 rounded-[22px] border border-slate-200 bg-white p-6 md:grid-cols-[1fr_auto]"><div><h4 className="text-lg font-black text-[#092f62]">{program.name} completion</h4><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Maintain {fellowshipAttendanceMinimum}% attendance, pass all weekly projects with at least {fellowshipPassScore}%, complete your capstone and follow program policies.</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-500" style={{ width: `${assignments.length ? Math.round((passed / assignments.length) * 100) : 0}%` }} /></div></div><div className="flex flex-col justify-center gap-2 md:text-right"><p className="text-3xl font-black text-[#092f62]">{passed}/{assignments.length}</p><p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">Projects passed</p><StatusPill tone={passed === assignments.length ? "green" : "slate"}>{passed === assignments.length ? "Eligible" : "Locked"}</StatusPill></div></div></section>
    </div>
  );
}

export default function FellowshipProgram({ profile, user, initialProgramId }) {
  const [enrollment, setEnrollment] = useState(null);
  const [selectedId, setSelectedId] = useState(initialProgramId || null);
  const requestedProgramId = initialProgramId || selectedId || enrollment?.programId;
  const selectedProgram = useMemo(() => fellowshipPrograms.find((item) => item.id === requestedProgramId), [requestedProgramId]);
  const updateEnrollment = (value) => setEnrollment(value);

  useEffect(() => {
    if (initialProgramId) setSelectedId(initialProgramId);
  }, [initialProgramId]);

  useEffect(() => {
    if (!user?.id) return;
    const apiBase = getApiBase();
    fetch(`${apiBase}/api/careersense/fellowship/my-enrollment?clerkUserId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          const assignmentsMap = {};
          if (Array.isArray(data.submissions)) {
            data.submissions.forEach((sub) => {
              assignmentsMap[sub.assignmentId] = {
                status: sub.status === "submitted" ? "under_review" : sub.status,
                submittedAt: sub.createdAt || sub.updatedAt || new Date().toISOString(),
                notes: sub.notes || "",
                links: sub.links && sub.links.length ? sub.links : [sub.githubUrl || "", sub.liveDemoUrl || "", ...(sub.fileUrls || [])],
                files: sub.files || (sub.fileUrls || []).map((url) => ({ name: typeof url === "string" ? url.split("/").pop() : "File", url })),
                activityCompletions: sub.activityCompletions || {},
                score: sub.score ?? null,
              };
            });
          }

          const attendanceMap = {};
          if (Array.isArray(data.enrollment?.attendanceRecords)) {
            data.enrollment.attendanceRecords.forEach((att) => {
              attendanceMap[att.date] = att.status;
            });
          }

          setEnrollment((prev) => {
            const baseEnrollment = data.enrollment || prev || {};
            return {
              ...baseEnrollment,
              programId: baseEnrollment.programId || selectedId || "data-analyst",
              status: "active",
              attendance: { ...(baseEnrollment.attendance || {}), ...(prev?.attendance || {}), ...attendanceMap },
              assignments: { ...(baseEnrollment.assignments || {}), ...(prev?.assignments || {}), ...assignmentsMap },
            };
          });
        }
      })
      .catch((err) => console.error("Error fetching fellowship enrollment:", err));
  }, [user?.id, selectedId]);

  if (!selectedProgram) return <ProgramChooser onChoose={setSelectedId} />;

  const journeyEnrollment = {
    id: enrollment?._id || enrollment?.id || `CSF-${selectedProgram.id}`,
    programId: selectedProgram.id,
    status: "active",
    applicant: enrollment?.applicant || {
      fullName: profile?.fullName || user?.fullName || "CareerSense Fellow",
      email: profile?.email || user?.primaryEmailAddress?.emailAddress || "",
      phone: profile?.phone || "",
    },
    joiningDate: enrollment?.joiningDate || new Date().toISOString(),
    expectedCompletionDate: enrollment?.expectedCompletionDate || addDays(new Date(), fellowshipDurationDays).toISOString(),
    mentor: enrollment?.mentor || "To be assigned",
    attendance: enrollment?.attendance || {},
    assignments: enrollment?.assignments || {},
  };

  return <ActiveFellowship enrollment={journeyEnrollment} program={selectedProgram} onChange={updateEnrollment} user={user} />;
}

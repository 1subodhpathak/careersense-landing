import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Coins,
  ExternalLink,
  Eye,
  File,
  Flag,
  Link2,
  ListChecks,
  Map,
  Megaphone,
  Rocket,
  Save,
  Search,
  Send,
  SkipForward,
  Sparkles,
  Target,
  Trophy,
  UploadCloud,
  X,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { partnerAssignments, partnerPhases } from "../../data/partnerAssignments";

const API_BASE = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
const STORAGE_KEY = "careersense-partner-assignments-v1";

const emptyRecord = {
  status: "open",
  notes: "",
  links: [],
  files: [],
  score: null,
  submittedAt: null,
};

const phaseThemes = [
  {
    color: "#1F8FFF",
    soft: "#EFF7FF",
    line: "#C9E4FF",
    label: "Discover",
    icon: Search,
  },
  {
    color: "#20C9B0",
    soft: "#ECFBF8",
    line: "#C5F1E8",
    label: "Build",
    icon: Code2,
  },
  {
    color: "#7B61E8",
    soft: "#F4F1FF",
    line: "#D9D0FF",
    label: "Analyse",
    icon: BarChart3,
  },
  {
    color: "#F08A3C",
    soft: "#FFF6EF",
    line: "#FFDCC1",
    label: "Grow",
    icon: Megaphone,
  },
  {
    color: "#F05B86",
    soft: "#FFF1F5",
    line: "#FFD0DE",
    label: "Lead",
    icon: Rocket,
  },
];

function statusLabel(status) {
  return status === "in_progress"
    ? "In progress"
    : status.charAt(0).toUpperCase() + status.slice(1);
}

function StatusPill({ status }) {
  const cls =
    status === "submitted"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "skipped"
      ? "bg-amber-50 text-amber-700 ring-amber-100"
      : status === "in_progress"
      ? "bg-sky-50 text-sky-700 ring-sky-100"
      : "bg-slate-50 text-slate-500 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] ring-1 ring-inset ${cls}`}
    >
      {statusLabel(status)}
    </span>
  );
}

export default function PartnerAssignments({ onViewIdCard, totalUserPoints = 87459, onPointsChange }) {
  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  const [view, setView] = useState("roadmap");
  const [selectedId, setSelectedId] = useState(1);
  const [step, setStep] = useState(1);
  const [linkDraft, setLinkDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const selected = partnerAssignments.find((item) => item.id === selectedId);
  const record = { ...emptyRecord, ...(records[selectedId] || {}) };
  const selectedPhaseIndex = partnerPhases.findIndex((phase) =>
    phase.assignmentIds.includes(selectedId)
  );
  const selectedTheme = phaseThemes[Math.max(0, selectedPhaseIndex)];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedId]);

  const completed = Object.values(records).filter(
    (r) => r.status === "submitted"
  ).length;
  const skipped = Object.values(records).filter(
    (r) => r.status === "skipped"
  ).length;
  const netPartnerDelta = completed * 5000 - skipped * 1000;
  const points = Math.max(0, (totalUserPoints || 87459));

  useEffect(() => {
    if (onPointsChange) {
      onPointsChange(netPartnerDelta);
    }
  }, [completed, skipped, onPointsChange]);

  const progress = Math.round(
    (completed / partnerAssignments.length) * 100
  );

  const scored = Object.values(records).filter((r) =>
    Number.isFinite(r.score)
  );

  const averageScore = scored.length
    ? Math.round(
        scored.reduce((sum, r) => sum + r.score, 0) / scored.length
      )
    : null;

  const level = useMemo(
    () =>
      averageScore === null
        ? "Explorer"
        : averageScore >= 93
        ? "Elite Partner"
        : averageScore >= 85
        ? "Growth Leader"
        : averageScore >= 70
        ? "Operator"
        : "Builder",
    [averageScore]
  );

  const patchRecord = (patch) =>
    setRecords((current) => ({
      ...current,
      [selectedId]: {
        ...emptyRecord,
        ...(current[selectedId] || {}),
        ...patch,
      },
    }));

  const showDetails = (id) => {
    setSelectedId(id);
    setView("details");
  };

  const begin = (id = selectedId) => {
    setSelectedId(id);

    setRecords((current) => ({
      ...current,
      [id]: {
        ...emptyRecord,
        ...(current[id] || {}),
        status: ["submitted", "skipped"].includes(
          current[id]?.status
        )
          ? current[id].status
          : "in_progress",
      },
    }));

    setStep(1);
    setView("workspace");
  };

  const { getToken, isSignedIn } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function fetchRemoteAssignments() {
      if (!isSignedIn) return;
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE}/careersense/partner/assignments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.records) {
          // Replace records with backend single source of truth
          setRecords(data.records);
        }
      } catch (err) {
        console.warn("[PartnerAssignments] Offline or fetch error", err);
      }
    }
    fetchRemoteAssignments();
  }, [isSignedIn, getToken]);

  const addLink = () => {
    if (!linkDraft.trim()) return;

    const newLinks = [...record.links, linkDraft.trim()];
    patchRecord({
      links: newLinks,
      status: "in_progress",
    });

    setLinkDraft("");

    if (isSignedIn) {
      getToken().then((token) => {
        fetch(`${API_BASE}/careersense/partner/assignments/${selectedId}/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            notes: record.notes,
            links: newLinks
          })
        }).catch((err) => console.warn("[addLink sync error]", err));
      });
    }
  };

  const addFiles = async (event) => {
    const filesList = [...event.target.files];
    if (!filesList.length) return;

    const incomingLocal = filesList.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    patchRecord({
      files: [...record.files, ...incomingLocal],
      status: "in_progress",
    });

    event.target.value = "";

    if (isSignedIn) {
      try {
        setIsUploading(true);
        const token = await getToken();
        const formData = new FormData();
        filesList.forEach((file) => formData.append("files", file));

        const res = await fetch(`${API_BASE}/careersense/partner/assignments/${selectedId}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });

        const data = await res.json();
        if (data.success && data.record) {
          patchRecord(data.record);
        }
      } catch (err) {
        console.error("[upload files error]", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const saveWork = async () => {
    patchRecord({ status: "in_progress" });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);

    if (isSignedIn) {
      try {
        const token = await getToken();
        await fetch(`${API_BASE}/careersense/partner/assignments/${selectedId}/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            notes: record.notes,
            links: record.links
          })
        });
      } catch (err) {
        console.warn("[saveWork sync error]", err);
      }
    }
  };

  const submit = async () => {
    if (
      record.notes.trim() ||
      record.links.length ||
      record.files.length
    ) {
      patchRecord({
        status: "submitted",
        submittedAt: new Date().toISOString(),
      });

      if (isSignedIn) {
        try {
          const token = await getToken();
          await fetch(`${API_BASE}/careersense/partner/assignments/${selectedId}/submit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              notes: record.notes,
              links: record.links
            })
          });
        } catch (err) {
          console.error("[submit sync error]", err);
        }
      }
    }
  };

  const handleConfirmSkip = async () => {
    patchRecord({ status: "skipped" });
    setShowSkipModal(false);

    if (isSignedIn) {
      try {
        const token = await getToken();
        await fetch(`${API_BASE}/careersense/partner/assignments/${selectedId}/skip`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("[skip assignment sync error]", err);
      }
    }
  };

  const HeaderStats = () => (
    <section className="relative overflow-hidden rounded-[28px] border border-[#dce9f2] bg-white shadow-[0_18px_48px_rgba(21,55,82,0.07)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_72%_42%,rgba(59,130,246,0.06),transparent_24%)]" />

      <div className="relative grid gap-7 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center lg:px-9 lg:py-7">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9bdbea] bg-white/85 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#176b87] shadow-[0_3px_10px_rgba(19,111,142,0.05)] backdrop-blur">
            <Map size={12} />
            CareerSense Partner Program
          </div>

          <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-[#07182f] via-[#149fbe] to-[#2f6df6] bg-clip-text text-[28px] font-black leading-[1.04] tracking-[-0.04em] text-transparent sm:text-[34px] lg:text-[38px]">
                Your 20-Week Partner Journey
              </h1>

              <p className="mt-3 max-w-3xl text-[13px] font-medium leading-6 text-[#64778d] sm:text-sm">
                Complete real-world assignments, build proof of work, earn Career Points,
                and progress from <span className="font-bold text-[#0c8cab]">Discover</span> to{" "}
                <span className="font-bold text-[#0c8cab]">Lead</span>.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#effbfe] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-[#1185a4] ring-1 ring-[#ccecf4]">
              <Target size={11} />
              20 real-world assignments
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f9fb] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-[#66788d] ring-1 ring-[#e1e8ee]">
              <Map size={11} />
              5 guided phases
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f9fb] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-[#66788d] ring-1 ring-[#e1e8ee]">
              <Coins size={11} className="text-amber-500" />
              5,000 points each
            </span>
          </div>
        </div>

        <div className="w-full lg:w-[340px]">
          <div className="rounded-[22px] border border-[#d9e8f1] bg-white/80 p-4 shadow-[0_10px_28px_rgba(26,67,97,0.06)] backdrop-blur sm:p-5">
            <div className="flex items-center gap-4">
              <div
                className="relative flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#17b9d8 ${progress * 3.6}deg, #e7eff4 0)`,
                }}
              >
                <div className="flex h-[61px] w-[61px] flex-col items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(220,232,240,0.9)]">
                  <span className="text-[20px] font-black leading-none text-[#07182f]">
                    {progress}%
                  </span>
                  <span className="mt-1 text-[7px] font-black uppercase tracking-[0.15em] text-slate-400">
                    complete
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-[#92a3b7]">
                  Overall progress
                </div>

                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[24px] font-black tracking-tight text-[#07182f]">
                    {completed}
                  </span>
                  <span className="text-[12px] font-bold text-[#718399]">
                    of {partnerAssignments.length}
                  </span>
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-[#7a8ca0]">
                  assignments completed
                </div>

                <button
                  onClick={onViewIdCard}
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-black text-[#0b91b4] transition hover:text-[#086e8a]"
                >
                  <Award size={13} />
                  View Partner ID
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e8f0f4]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#17b9d8] via-[#20c7bf] to-[#2f6df6] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid border-t border-[#e7eef3] bg-[#fbfdff] sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 px-5 py-4 lg:border-r lg:border-[#e7eef3]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef8ff] text-[#168fce]">
            <CheckCircle2 size={16} />
          </span>
          <div className="min-w-0">
            <div className="text-[8px] font-black uppercase tracking-[0.15em] text-[#96a6b8]">
              Completed
            </div>
            <div className="mt-0.5 text-[18px] font-black leading-none text-[#07182f]">
              {completed}
              <span className="ml-1 text-[10px] font-bold text-[#9aa9b9]">
                / {partnerAssignments.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#e7eef3] px-5 py-4 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-r">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff8e8] text-[#eda700]">
            <Coins size={16} />
          </span>
          <div className="min-w-0">
            <div className="text-[8px] font-black uppercase tracking-[0.15em] text-[#96a6b8]">
              Career Points
            </div>
            <div className="mt-0.5 text-[18px] font-black leading-none text-[#07182f]">
              {points.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#e7eef3] px-5 py-4 sm:border-t lg:border-r lg:border-t-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f4f0ff] text-[#7c4de8]">
            <Trophy size={16} />
          </span>
          <div className="min-w-0">
            <div className="text-[8px] font-black uppercase tracking-[0.15em] text-[#96a6b8]">
              Current Rank
            </div>
            <div className="mt-0.5 truncate text-[18px] font-black leading-none text-[#07182f]">
              {level}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#e7eef3] px-5 py-4 sm:border-l lg:border-l-0 lg:border-t-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ebfbf4] text-[#11a66f]">
            <Award size={16} />
          </span>
          <div className="min-w-0">
            <div className="text-[8px] font-black uppercase tracking-[0.15em] text-[#96a6b8]">
              Mentor Score
            </div>
            <div className="mt-0.5 text-[18px] font-black leading-none text-[#07182f]">
              {averageScore === null ? "--" : `${averageScore}/100`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  if (view === "roadmap") {
    return (
      <div className="space-y-6">
        <HeaderStats />

        <section className="relative overflow-hidden rounded-[26px] bg-[#06192e] px-5 py-7 text-white shadow-[0_15px_36px_rgba(3,25,47,0.16)] sm:px-7 lg:px-9 lg:py-9">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full border border-cyan-400/10" />
          <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full border border-cyan-400/10" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-32 w-60 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative">
            <div className="text-center">
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                Your progression
              </div>
              
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                The 5-Phase Partner Journey
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-xs font-medium leading-5 text-slate-400">
                The same journey you saw on the Partner Program page, now
                connected directly to your assignments.
              </p>
            </div>

            <div className="relative mt-8 grid gap-7 sm:grid-cols-5 sm:gap-3">
              <div className="absolute left-[10%] right-[10%] top-[31px] hidden border-t border-dashed border-cyan-400/30 sm:block" />

              {partnerPhases.map((phase, index) => {
                const theme = phaseThemes[index];
                const Icon = theme.icon;
                const phaseCompleted = phase.assignmentIds.filter(
                  (id) => records[id]?.status === "submitted"
                ).length;

                return (
                  <div
                    key={phase.id}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#0b2743] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                      style={{ color: theme.color }}
                    >
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    <div className="mt-3 text-[8px] font-black uppercase tracking-widest text-cyan-300/80">
                      Phase {phase.id}
                    </div>
                    <div className="mt-1 text-sm font-black">
                      {theme.label}
                    </div>
                    <div className="mt-1 text-[10px] font-medium text-slate-400">
                      {phaseCompleted}/{phase.assignmentIds.length} completed
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[26px] border border-[#dceaf4] bg-white shadow-[0_12px_34px_rgba(22,63,98,0.06)]">
          <div className="flex flex-col gap-3 border-b border-[#e7eff5] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.16em] text-[#18a8c7]">
                Real work experience
              </div>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#07182f]">
                20 Real-World Assignments
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Build projects and outcomes you can actually talk about.
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#ccebf4] bg-[#f2fbfe] px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#1589aa]">
              All assignments unlocked
            </span>
          </div>

          <div className="space-y-8 bg-[#fbfdff] p-4 sm:p-6 lg:p-7">
            {partnerPhases.map((phase, phaseIndex) => {
              const theme = phaseThemes[phaseIndex];
              const Icon = theme.icon;

              return (
                <div key={phase.id}>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(24,183,204,0.10)]"
                      style={{
                        background: theme.soft,
                        color: theme.color,
                        border: `1px solid ${theme.line}`,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <div
                        className="text-[9px] font-black uppercase tracking-[0.15em]"
                        style={{ color: theme.color }}
                      >
                        Phase {phase.id} · {phase.range}
                      </div>
                      <div className="text-base font-black text-[#07182f]">
                        {phase.title}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {phase.assignmentIds.map((id) => {
                      const item = partnerAssignments[id - 1];
                      const itemRecord = {
                        ...emptyRecord,
                        ...(records[id] || {}),
                      };

                      const assignmentIndex = phase.assignmentIds.indexOf(id);
                      const hasNext = assignmentIndex < phase.assignmentIds.length - 1;
                      const completedNode = itemRecord.status === "submitted";

                      return (
                        <div key={id} className="relative">
                          {/* Desktop roadmap connector: actual card to actual next card */}
                          {hasNext && (
                            <>
                              {/* horizontal connector to the next column */}
                              <div
                                className={`pointer-events-none absolute left-[calc(100%-1px)] top-1/2 z-0 hidden h-[3px] w-5 -translate-y-1/2 rounded-full xl:block ${
                                  completedNode
                                    ? "bg-gradient-to-r from-[#18b7cc] to-[#2f6df6] shadow-[0_0_8px_rgba(36,216,232,0.85),0_0_18px_rgba(47,109,246,0.35)]"
                                    : "bg-slate-200"
                                }`}
                              />

                              {/* tablet connector */}
                              <div
                                className={`pointer-events-none absolute left-1/2 top-full z-0 hidden h-5 w-[3px] -translate-x-1/2 rounded-full md:block xl:hidden ${
                                  completedNode
                                    ? "bg-gradient-to-r from-[#18b7cc] to-[#2f6df6] shadow-[0_0_8px_rgba(36,216,232,0.85),0_0_18px_rgba(47,109,246,0.35)]"
                                    : "bg-slate-200"
                                }`}
                              />

                              {/* mobile connector */}
                              <div
                                className={`pointer-events-none absolute left-1/2 top-full z-0 h-5 w-[3px] -translate-x-1/2 rounded-full md:hidden ${
                                  completedNode
                                    ? "bg-gradient-to-r from-[#18b7cc] to-[#2f6df6] shadow-[0_0_8px_rgba(36,216,232,0.85),0_0_18px_rgba(47,109,246,0.35)]"
                                    : "bg-slate-200"
                                }`}
                              />
                            </>
                          )}

                          <article
                            className={`group relative z-10 flex min-h-[220px] flex-col rounded-[20px] border bg-white p-4 transition duration-300 hover:-translate-y-0.5 sm:p-5 ${
                              itemRecord.status === "submitted"
                                ? "shadow-[0_8px_24px_rgba(23,185,216,0.12),0_0_20px_rgba(23,185,216,0.08)]"
                                : "shadow-[0_8px_22px_rgba(22,63,98,0.05)] hover:shadow-[0_14px_28px_rgba(22,63,98,0.09)]"
                            }`}
                            style={{
                              borderColor:
                                itemRecord.status === "submitted"
                                  ? "#73dce9"
                                  : theme.line,
                            }}
                          >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-black"
                                style={{
                                  background: theme.soft,
                                  color: theme.color,
                                }}
                              >
                                {String(id).padStart(2, "0")}
                              </span>

                              <div>
                                <div
                                  className="text-[8px] font-black uppercase tracking-[0.14em]"
                                  style={{ color: theme.color }}
                                >
                                  Assignment {id}
                                </div>
                                <div className="mt-0.5 flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                  <Clock3 size={10} />
                                  {item.timeline}
                                </div>
                              </div>
                            </div>

                            <StatusPill status={itemRecord.status} />
                          </div>

                          <h3 className="mt-4 text-[15px] font-black leading-snug text-[#07182f]">
                            {item.title}
                          </h3>

                          <p className="mt-2 line-clamp-3 text-[11px] font-medium leading-[1.65] text-slate-500">
                            {item.mission}
                          </p>

                          <div className="mt-auto pt-4">
                            <div className="flex items-center justify-between border-t border-[#edf2f6] pt-3 text-[9px] font-bold">
                              <span className="inline-flex items-center gap-1 text-amber-700">
                                <Coins size={11} />
                                1,000 points
                              </span>
                              <span className="text-slate-400">
                                Score {itemRecord.score ?? "--"}/100
                              </span>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <button
                                onClick={() => showDetails(id)}
                                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[#dbe7ef] bg-white text-[10px] font-black text-[#30455c] transition hover:bg-[#f6fbfe]"
                              >
                                <Eye size={13} />
                                Details
                              </button>

                              <button
                                onClick={() => begin(id)}
                                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl text-[10px] font-black text-white shadow-sm transition hover:brightness-105"
                                style={{
                                  backgroundColor: theme.color,
                                  boxShadow: `0 8px 18px ${theme.color}2e`,
                                }}
                              >
                                <Rocket size={13} />
                                {itemRecord.status === "in_progress"
                                  ? "Continue"
                                  : itemRecord.status === "submitted"
                                  ? "Review"
                                  : "Begin"}
                              </button>
                            </div>
                          </div>
                          </article>

                          {/* Roadmap node attached directly to the card edge */}
                          <div
                            className={`pointer-events-none absolute -right-2 top-1/2 z-20 hidden h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-white xl:block ${
                              completedNode
                                ? "bg-gradient-to-r from-[#18b7cc] to-[#2f6df6] shadow-[0_0_8px_rgba(23,185,216,0.8),0_0_18px_rgba(47,109,246,0.35)]"
                                : "bg-slate-300"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  if (view === "details") {
    const phaseIndex = partnerPhases.findIndex((phase) =>
      phase.assignmentIds.includes(selected.id)
    );
    const theme = phaseThemes[Math.max(0, phaseIndex)];

    return (
      <div className="space-y-5">
        <button
          onClick={() => setView("roadmap")}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#dbe7ef] bg-white px-4 text-[10px] font-black text-[#30455c] shadow-sm hover:bg-[#f7fbfd]"
        >
          <ArrowLeft size={15} />
          Back to assignments
        </button>

        <section className="overflow-hidden rounded-[24px] border border-[#dce7ef] bg-white shadow-[0_10px_28px_rgba(28,65,95,0.06)]">
          <div className="relative border-b border-[#e8eff4] bg-white px-5 py-5 sm:px-7 sm:py-6">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#18b7cc] to-[#1f8fff]" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 max-w-4xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#eafcff] to-[#eef3ff] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#168aa7] ring-1 ring-[#d2edf4]">
                    Assignment {selected.id} of {partnerAssignments.length}
                  </span>

                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em]"
                    style={{
                      background: theme.soft,
                      color: theme.color,
                      border: `1px solid ${theme.line}`,
                    }}
                  >
                    {theme.label}
                  </span>
                </div>

                <h2 className="mt-3 bg-gradient-to-r from-[#07182f] via-[#149fbe] to-[#2f6df6] bg-clip-text text-[20px] font-black leading-[1.14] tracking-[-0.02em] text-transparent sm:text-[24px]">
                  {selected.title}
                </h2>

                <p className="mt-2.5 max-w-3xl text-[13px] font-medium leading-6 text-[#65788d]">
                  {selected.mission}
                </p>
              </div>

              <div className="shrink-0">
                <StatusPill status={record.status} />
              </div>
            </div>
          </div>

          <div className="grid border-b border-[#edf2f6] sm:grid-cols-3">
            <div className="p-5 sm:p-6">
              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Timeline
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm font-black text-[#07182f]">
                <Clock3 size={16} className="text-[#1b97c6]" />
                {selected.timeline}
              </div>
            </div>

            <div className="border-t border-[#edf2f6] p-5 sm:border-l sm:border-t-0 sm:p-6">
              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Reward
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm font-black text-[#07182f]">
                <Coins size={16} className="text-amber-500" />
                1,000 Career Points
              </div>
            </div>

            <div className="border-t border-[#edf2f6] p-5 sm:border-l sm:border-t-0 sm:p-6">
              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Mentor score
              </div>
              <div className="mt-2 text-sm font-black text-[#07182f]">
                {record.score ?? "Pending review"}
                {record.score != null && "/100"}
              </div>
            </div>
          </div>

          <div className="grid gap-5 bg-[#fbfdff] p-5 sm:p-7 lg:grid-cols-2">
            <div className="rounded-[20px] border border-[#dfeaf1] bg-white p-5">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#07182f]">
                <Target size={16} className="text-[#17a6be]" />
                What you will do
              </h3>

              <div className="mt-4 space-y-3">
                {selected.tasks.map((task, index) => (
                  <div key={task} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#071b31] text-[9px] font-black text-cyan-300">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-xs font-medium leading-5 text-slate-600">
                      {task}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[#d9edf4] bg-[#f4fbfe] p-5">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#07182f]">
                <ListChecks size={16} className="text-[#138db0]" />
                Required deliverables
              </h3>

              <div className="mt-4 space-y-3">
                {selected.deliverables.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#16a5bd]"
                    />
                    <p className="text-xs font-medium leading-5 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[#dfeaf1] bg-white p-5 lg:col-span-2">
              <div className="text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">
                Skills you will develop
              </div>
              <p className="mt-2 text-sm font-bold leading-6 text-[#34485e]">
                {selected.skills}
              </p>

              {selected.bonus && (
                <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3.5 text-xs font-semibold leading-5 text-amber-800 ring-1 ring-amber-100">
                  <Sparkles size={14} className="mt-0.5 shrink-0" />
                  {selected.bonus}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f6] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => patchRecord({ status: "skipped" })}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-[10px] font-bold text-amber-700 hover:bg-amber-50"
            >
              <SkipForward size={14} />
              Skip assignment (-1,000)
            </button>

            <button
              onClick={() => begin()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 text-[10px] font-black text-white transition hover:brightness-105"
              style={{ backgroundColor: selectedTheme.color, boxShadow: `0 10px 24px ${selectedTheme.color}2e` }}
            >
              <Rocket size={14} />
              Begin assignment
            </button>
          </div>
        </section>
      </div>
    );
  }

  const steps = [
    { id: 1, label: "Understand", icon: Target },
    { id: 2, label: "Plan & notes", icon: ListChecks },
    { id: 3, label: "Evidence", icon: UploadCloud },
    { id: 4, label: "Review", icon: Flag },
  ];

  const readOnly = ["submitted", "skipped"].includes(record.status);

  return (
    <div className="space-y-5">
      {/* Skip Confirmation Modal */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-amber-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Coins size={24} />
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900">
              Skip Assignment {selected.id}?
            </h3>

            <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">
              Skipping an assignment deducts <span className="font-bold text-amber-700">1,000 Career Points</span> from your total points balance. Are you sure you want to skip?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowSkipModal(false)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSkip}
                className="rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-600/20 hover:bg-amber-700 transition"
              >
                Confirm & Skip (-1,000 Points)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setView("roadmap")}
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-[#dbe7ef] bg-white px-4 text-[10px] font-black text-[#30455c] shadow-sm hover:bg-[#f7fbfd]"
        >
          <ArrowLeft size={15} />
          Exit workspace
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            Assignment {selected.id}
          </span>
          <StatusPill status={record.status} />
        </div>
      </div>

      <section className="overflow-hidden rounded-[24px] border border-[#dce7ef] bg-white shadow-[0_10px_28px_rgba(28,65,95,0.06)]">
        <div className="relative border-b border-[#e8eff4] bg-white px-5 py-5 sm:px-7 sm:py-6">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#18b7cc] to-[#1f8fff]" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 max-w-4xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#eafcff] to-[#eef3ff] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#168aa7] ring-1 ring-[#d2edf4]">
                Assignment workspace
              </div>

              <h2 className="mt-3 bg-gradient-to-r from-[#07182f] via-[#149fbe] to-[#2f6df6] bg-clip-text text-[20px] font-black leading-[1.14] tracking-[-0.02em] text-transparent sm:text-[24px]">
                {selected.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2.5 text-[11px] font-semibold text-[#6b7d90]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f7fafc] px-3 py-1.5 ring-1 ring-[#e4ebf1]">
                  <Clock3 size={12} />
                  {selected.timeline}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff8ea] px-3 py-1.5 text-[#8b6a16] ring-1 ring-[#f7e4b0]">
                  <Coins size={12} className="text-amber-500" />
                  1,000 points
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <StatusPill status={record.status} />
            </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 border-b border-[#e4edf3] bg-[#fbfdff] sm:grid-cols-4">
          {steps.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setStep(id)}
              className={`relative flex min-h-[62px] items-center justify-center gap-2 px-3 text-[10px] font-black transition ${
                step === id
                  ? "bg-white text-[#0d8dab]"
                  : "text-slate-400 hover:bg-white hover:text-slate-600"
              }`}
            >
              {step === id && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#18b7cc] to-[#2f6df6]" />
              )}

              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] ${
                  step === id
                    ? "bg-gradient-to-r from-[#18b7cc] to-[#2f6df6] text-white shadow-[0_8px_18px_rgba(24,183,204,0.18)]"
                    : "bg-white text-slate-400 ring-1 ring-slate-200"
                }`}
              >
                {id}
              </span>

              <Icon size={13} />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </nav>

        <div className="min-h-[450px] bg-white p-5 sm:p-8">
          {step === 1 && (
            <div className="mx-auto max-w-4xl space-y-7">
              <div className="rounded-[18px] border border-[#caeaf2] bg-[#f4fbfd] p-5">
                <div className="text-[9px] font-black uppercase tracking-[0.14em] text-[#1590ad]">
                  Your mission
                </div>
                <p className="mt-2 text-sm font-bold leading-6 text-[#253b51]">
                  {selected.mission}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-black text-[#07182f]">
                  Complete these activities
                </h3>

                <div className="mt-3 grid gap-3">
                  {selected.tasks.map((task, index) => (
                    <div
                      key={task}
                      className="flex gap-3 rounded-[18px] border border-[#e0eaf0] bg-[#fbfdff] p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#071b31] text-[10px] font-black text-cyan-300">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-xs font-medium leading-5 text-slate-600">
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-4">
                <h3 className="text-lg font-black text-[#07182f]">
                  Plan your work
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Capture research, decisions, drafts, questions, and progress notes.
                </p>
              </div>

              <textarea
                value={record.notes}
                onChange={(e) =>
                  patchRecord({
                    notes: e.target.value,
                    status: "in_progress",
                  })
                }
                disabled={readOnly}
                rows={15}
                placeholder="Start writing your assignment notes here..."
                className="w-full resize-y rounded-[18px] border border-[#dce7ee] bg-[#fbfdff] p-5 text-sm leading-7 text-slate-800 outline-none transition focus:border-[#4ec6da] focus:bg-white focus:ring-4 focus:ring-[#eaf9fc] disabled:opacity-60"
              />
            </div>
          )}

          {step === 3 && (
            <div className="mx-auto max-w-4xl space-y-7">
              <div>
                <h3 className="text-lg font-black text-[#07182f]">
                  Add links and evidence
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Attach the work your mentor needs to review.
                </p>
              </div>

              <div className="rounded-[18px] border border-[#e0eaf0] bg-[#fbfdff] p-5">
                <label className="mb-2 block text-[10px] font-black text-[#253b51]">
                  Supporting links
                </label>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Link2
                      size={14}
                      className="absolute left-3.5 top-3.5 text-slate-400"
                    />
                    <input
                      value={linkDraft}
                      onChange={(e) => setLinkDraft(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && addLink()
                      }
                      disabled={readOnly}
                      placeholder="Paste a Figma, GitHub, Drive, or live URL"
                      className="h-11 w-full rounded-xl border border-[#dce7ee] bg-white pl-10 pr-3 text-xs outline-none transition focus:border-[#4ec6da] focus:ring-4 focus:ring-[#eaf9fc]"
                    />
                  </div>

                  <button
                    onClick={addLink}
                    disabled={!linkDraft.trim() || readOnly}
                    className="min-h-11 rounded-xl bg-[#071b31] px-5 text-[10px] font-black text-white transition hover:bg-[#0d2947] disabled:opacity-40"
                  >
                    Add link
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {record.links.map((link, index) => (
                    <div
                      key={`${link}-${index}`}
                      className="flex items-center gap-2 rounded-xl border border-[#e2ebf1] bg-white px-3 py-2.5"
                    >
                      <ExternalLink
                        size={13}
                        className="text-[#12a2bc]"
                      />

                      <a
                        href={
                          link.startsWith("http")
                            ? link
                            : `https://${link}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="min-w-0 flex-1 truncate text-[10px] font-bold text-[#1684bd]"
                      >
                        {link}
                      </a>

                      {!readOnly && (
                        <button
                          onClick={() =>
                            patchRecord({
                              links: record.links.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                        >
                          <X size={13} className="text-slate-400" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-[#cfdce5] bg-[#fbfdff] p-5 text-center transition hover:border-[#55c8dc] hover:bg-[#f3fbfd] ${
                    readOnly ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#159cb8] shadow-sm ring-1 ring-[#dde9ef]">
                    <UploadCloud size={22} />
                  </span>

                  <span className="mt-3 text-sm font-black text-[#07182f]">
                    Upload your evidence
                  </span>

                  <span className="mt-1 text-[10px] text-slate-400">
                    Word, PDF, PNG, JPG or multiple files
                  </span>

                  <input
                    type="file"
                    multiple
                    accept=".doc,.docx,.pdf,image/*"
                    onChange={addFiles}
                    className="hidden"
                  />
                </label>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {record.files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-[#dfe8ef] bg-white p-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef8ff]">
                        <File
                          size={15}
                          className="text-[#168ec5]"
                        />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[10px] font-bold text-[#30455c]">
                          {file.name}
                        </div>
                        <div className="mt-0.5 text-[8px] text-slate-400">
                          {Math.max(
                            1,
                            Math.round(file.size / 1024)
                          )}{" "}
                          KB
                        </div>
                      </div>

                      {!readOnly && (
                        <button
                          onClick={() =>
                            patchRecord({
                              files: record.files.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                        >
                          <X size={13} className="text-slate-400" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="mx-auto max-w-4xl space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#07182f]">
                  Review your submission
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Make sure your evidence covers every required deliverable.
                </p>
              </div>

              <div className="space-y-2.5">
                {selected.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-[#e0eaf0] bg-[#fbfdff] p-4"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#16a6bf]"
                    />
                    <span className="text-xs font-medium text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-[#dfe8ef] bg-white p-4">
                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Notes
                  </div>
                  <div className="mt-2 text-xl font-black text-[#07182f]">
                    {record.notes.trim()
                      ? record.notes.trim().split(/\s+/).length
                      : 0}
                    <span className="ml-1 text-[9px] text-slate-400">
                      words
                    </span>
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#dfe8ef] bg-white p-4">
                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Links
                  </div>
                  <div className="mt-2 text-xl font-black text-[#07182f]">
                    {record.links.length}
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#dfe8ef] bg-white p-4">
                  <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Files
                  </div>
                  <div className="mt-2 text-xl font-black text-[#07182f]">
                    {record.files.length}
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-[#d8edf3] bg-[#f4fbfd] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-black text-[#07182f]">
                      Mentor evaluation
                    </div>
                    <div className="mt-1 text-[9px] font-semibold leading-4 text-slate-500">
                      Quality 30 · Depth 20 · Execution 20 · Originality 10 · Documentation 10 · Communication 10
                    </div>
                  </div>

                  <div className="shrink-0 text-2xl font-black text-[#07182f]">
                    {record.score ?? "--"}
                    <span className="text-[10px] text-slate-400">
                      /100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f6] bg-[#fbfdff] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <button
            onClick={() => setShowSkipModal(true)}
            disabled={readOnly}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-[10px] font-bold text-amber-700 hover:bg-amber-50 disabled:opacity-40"
          >
            <SkipForward size={14} />
            Skip assignment
          </button>

          <div className="flex gap-2">
            <button
              onClick={saveWork}
              disabled={readOnly}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#dbe7ef] bg-white px-4 text-[10px] font-black text-[#30455c] shadow-sm hover:bg-[#f7fbfd] disabled:opacity-40 sm:flex-none"
            >
              {saved ? (
                <Check size={14} className="text-emerald-600" />
              ) : (
                <Save size={14} />
              )}
              {saved ? "Saved" : "Save work"}
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-[10px] font-black text-white transition hover:brightness-105 sm:flex-none"
                style={{ backgroundColor: selectedTheme.color, boxShadow: `0 10px 24px ${selectedTheme.color}2e` }}
              >
                Next step
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={
                  readOnly ||
                  (!record.notes.trim() &&
                    !record.links.length &&
                    !record.files.length)
                }
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-[10px] font-black text-white transition hover:brightness-105 disabled:opacity-40 sm:flex-none"
                style={{ backgroundColor: selectedTheme.color, boxShadow: `0 10px 24px ${selectedTheme.color}2e` }}
              >
                <Send size={13} />
                Submit assignment
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}

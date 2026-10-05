import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Briefcase,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Code2,
  Globe,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  ChevronDown,
  Download,
  Copy,
  Check,
  Star,
  Sliders,
  X,
  MessageSquare,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  Layers,
  File,
  Paperclip,
  CheckCircle
} from "lucide-react";

import SubmissionEvidenceDrawer from "./SubmissionEvidenceDrawer";

const PHASES = [
  { id: "all", label: "All Phases (Weeks 1-20)" },
  { id: "1", label: "Phase 1: Understand the Startup (W1-4)", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "2", label: "Phase 2: Build & Product (W5-10)", color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: "3", label: "Phase 3: Business Engine (W11-13)", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "4", label: "Phase 4: Growth Engine (W14-18)", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "5", label: "Phase 5: Lead Like a Founder (W19-20)", color: "bg-rose-50 text-rose-700 border-rose-200" }
];

export default function PartnerSubmissionsHub({ adminEmail }) {
  const [submissions, setSubmissions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalSubmissions: 0,
    pendingReview: 0,
    reviewedCount: 0,
    inProgressCount: 0,
    activePartnersCount: 0,
    phaseBreakdown: {}
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [evaluatingSub, setEvaluatingSub] = useState(null);
  const [selectedDossierSub, setSelectedDossierSub] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(null);

  // Evaluation Form State
  const [evalStatus, setEvalStatus] = useState("reviewed");
  const [evalScore, setEvalScore] = useState(90);
  const [evalFeedback, setEvalFeedback] = useState("");
  const [savingEvaluation, setSavingEvaluation] = useState(false);

  const fetchPartnerSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const apiBase =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "https://server.datasenseai.com";

      const res = await fetch(`${apiBase}/careersense/admin/partner/submissions`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("Failed to load partner submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [adminEmail]);

  useEffect(() => {
    fetchPartnerSubmissions();
  }, [fetchPartnerSubmissions]);

  // Open Evaluation Modal
  const handleOpenEvaluation = (sub) => {
    setEvaluatingSub(sub);
    setEvalStatus(sub.status === "submitted" ? "reviewed" : sub.status || "reviewed");
    setEvalScore(sub.score || 90);
    setEvalFeedback(sub.feedback || "");
  };

  // Save Evaluation
  const handleSaveEvaluation = async (e) => {
    e.preventDefault();
    if (!evaluatingSub) return;
    setSavingEvaluation(true);

    try {
      const apiBase =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "https://server.datasenseai.com";

      const res = await fetch(
        `${apiBase}/careersense/admin/partner/submissions/${evaluatingSub._id}/evaluate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-email": adminEmail
          },
          body: JSON.stringify({
            status: evalStatus,
            score: evalScore,
            feedback: evalFeedback
          })
        }
      );

      const data = await res.json();
      if (data.success) {
        setEvaluatingSub(null);
        fetchPartnerSubmissions();
      } else {
        alert(data.message || "Failed to save partner evaluation.");
      }
    } catch (err) {
      console.error("Save evaluation error:", err);
      alert("An error occurred while saving evaluation.");
    } finally {
      setSavingEvaluation(false);
    }
  };

  const handleApplyTemplate = (text) => {
    setEvalFeedback((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleCopyPhone = (phone, e) => {
    e.stopPropagation();
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // Filtered
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      if (selectedPhase !== "all" && String(sub.phaseId) !== String(selectedPhase)) return false;
      if (selectedStatus !== "all" && sub.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = sub.candidateName?.toLowerCase().includes(q);
        const matchEmail = sub.candidateEmail?.toLowerCase().includes(q);
        const matchPhone = sub.candidatePhone?.toLowerCase().includes(q);
        const matchTitle = sub.title?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchTitle) return false;
      }
      return true;
    });
  }, [submissions, selectedPhase, selectedStatus, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredSubmissions.length) return;
    const headers = [
      "Candidate Name",
      "Email",
      "Phone",
      "Assignment ID",
      "Title",
      "Phase",
      "Status",
      "Score",
      "Notes",
      "Submitted At"
    ];

    const rows = filteredSubmissions.map((s) => [
      `"${s.candidateName || ""}"`,
      `"${s.candidateEmail || ""}"`,
      `"${s.candidatePhone || ""}"`,
      s.assignmentId || "",
      `"${s.title || ""}"`,
      `"Phase ${s.phaseId} (${s.phaseTitle || ""})"`,
      `"${s.status || ""}"`,
      `"${s.score !== null ? s.score : ""}"`,
      `"${(s.notes || "").replace(/"/g, '""')}"`,
      `"${s.submittedAt ? new Date(s.submittedAt).toISOString() : ""}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `partner_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Submissions */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Partner Submissions</span>
            <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              {metrics.totalSubmissions}
            </span>
            <span className="text-[11px] font-medium text-slate-400">milestones</span>
          </div>
        </div>

        {/* Needs Review */}
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 to-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900">Needs Review</span>
            <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-amber-800">
              {metrics.pendingReview}
            </span>
            <span className="text-[11px] font-bold text-amber-600">Awaiting score</span>
          </div>
        </div>

        {/* Reviewed & Scored */}
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 to-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">Reviewed & Scored</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-emerald-800">
              {metrics.reviewedCount}
            </span>
            <span className="text-[11px] font-bold text-emerald-600">Evaluated</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 to-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900">In Progress</span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
              <Layers size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-blue-800">
              {metrics.inProgressCount}
            </span>
            <span className="text-[11px] font-bold text-blue-600">Drafting</span>
          </div>
        </div>

        {/* Active Partners */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Partners</span>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Award size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              {metrics.activePartnersCount}
            </span>
            <span className="text-[11px] font-medium text-slate-400">On Track</span>
          </div>
        </div>
      </div>

      {/* Filter / Control Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Input */}
          <div className="relative min-w-[240px] flex-1 max-w-md">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search partner, email, phone, assignment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Phase Filter */}
          <div className="relative">
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-amber-500 focus:outline-hidden cursor-pointer"
            >
              {PHASES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-amber-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted (Needs Review)</option>
              <option value="reviewed">Reviewed & Scored</option>
              <option value="in_progress">In Progress (Draft)</option>
              <option value="open">Open</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPartnerSubmissions}
            disabled={loading}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            <RefreshCw size={13} className={loading ? "animate-spin text-amber-600" : ""} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Partner Candidate</th>
                <th className="px-4 py-3.5">Milestone & Phase</th>
                <th className="px-4 py-3.5">Deliverables & Evidence</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Score</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw size={24} className="mx-auto animate-spin text-amber-600 mb-2" />
                    <span className="font-semibold">Loading partner submissions...</span>
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Briefcase size={32} className="mx-auto text-slate-300 mb-2" />
                    <div className="font-bold text-slate-700">No partner submissions found</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      No assignments match your selected phase or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => {
                  const phaseObj = PHASES.find((p) => p.id === String(sub.phaseId)) || {
                    label: `Phase ${sub.phaseId}`,
                    color: "bg-amber-50 text-amber-700 border-amber-200"
                  };

                  return (
                    <tr
                      key={sub._id}
                      className="hover:bg-slate-50/60 transition-colors group cursor-default"
                    >
                      {/* Candidate */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            {sub.candidateName ? sub.candidateName[0].toUpperCase() : "P"}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                              <span>{sub.candidateName}</span>
                              <span className="rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 text-[9px] font-bold uppercase">
                                Partner
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {sub.candidateEmail}
                            </div>
                            {sub.candidatePhone && (
                              <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-600">
                                <span>📞 {sub.candidatePhone}</span>
                                <button
                                  type="button"
                                  onClick={(e) => handleCopyPhone(sub.candidatePhone, e)}
                                  className="text-slate-400 hover:text-amber-600"
                                  title="Copy phone"
                                >
                                  {copiedPhone === sub.candidatePhone ? (
                                    <Check size={11} className="text-emerald-600" />
                                  ) : (
                                    <Copy size={11} />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Milestone & Phase */}
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold border ${phaseObj.color}`}
                          >
                            Week {sub.assignmentId} • Phase {sub.phaseId}
                          </span>
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">
                            {sub.title}
                          </div>
                          <div className="text-[10px] text-slate-400">{sub.phaseTitle}</div>
                        </div>
                      </td>

                      {/* Deliverables & Evidence Badges (Click opens Dossier) */}
                      <td className="px-4 py-4">
                        {(() => {
                          const cleanLinks = (Array.isArray(sub.links) ? sub.links : [])
                            .map((l) => (typeof l === "string" ? l.trim() : ""))
                            .filter(Boolean);
                          const filesCount = Array.isArray(sub.files) ? sub.files.length : 0;
                          const hasNotes = Boolean(sub.notes && sub.notes.trim());

                          return (
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {cleanLinks.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDossierSub(sub)}
                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                                    title="View link deliverables in dossier"
                                  >
                                    <Globe size={11} className="text-amber-600" />
                                    <span>{cleanLinks.length} Link{cleanLinks.length > 1 ? "s" : ""}</span>
                                  </button>
                                )}

                                {filesCount > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDossierSub(sub)}
                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                                    title="View uploaded files in dossier"
                                  >
                                    <Paperclip size={11} className="text-teal-600" />
                                    <span>{filesCount} File{filesCount > 1 ? "s" : ""}</span>
                                  </button>
                                )}

                                {hasNotes && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDossierSub(sub)}
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                                    title="View notes in dossier"
                                  >
                                    <FileText size={10} className="text-slate-500" />
                                    <span>Notes</span>
                                  </button>
                                )}

                                {!cleanLinks.length && !filesCount && !hasNotes && (
                                  <span className="text-[11px] text-slate-400 italic">
                                    No deliverables attached
                                  </span>
                                )}
                              </div>

                              {hasNotes && (
                                <div
                                  onClick={() => setSelectedDossierSub(sub)}
                                  className="text-[10px] text-slate-500 line-clamp-1 italic max-w-[200px] cursor-pointer hover:text-slate-800"
                                >
                                  "{sub.notes}"
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {sub.status === "reviewed" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} />
                            <span>Reviewed</span>
                          </span>
                        )}
                        {sub.status === "submitted" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 border border-amber-200 animate-pulse">
                            <Clock size={12} />
                            <span>Submitted</span>
                          </span>
                        )}
                        {sub.status === "in_progress" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 border border-blue-200">
                            <span>In Progress</span>
                          </span>
                        )}
                        {sub.status === "open" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                            <span>Open</span>
                          </span>
                        )}
                      </td>

                      {/* Score */}
                      <td className="px-4 py-4">
                        {sub.score !== null && sub.score !== undefined ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-black text-slate-900">
                              {sub.score}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">/100</span>
                          </div>
                        ) : (
                          <span className="rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-bold">
                            Ungraded
                          </span>
                        )}
                      </td>

                      {/* Submitted At */}
                      <td className="px-4 py-4 text-slate-500 font-medium text-[11px]">
                        {sub.submittedAt
                          ? new Date(sub.submittedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })
                          : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedDossierSub(sub)}
                            className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2.5 py-1.5 text-xs font-bold transition shadow-2xs cursor-pointer"
                            title="Open Evidence Dossier"
                          >
                            <FileText size={12} className="text-slate-500" />
                            <span className="hidden sm:inline">Dossier</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEvaluation(sub)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white border border-amber-200 hover:border-amber-600 px-3 py-1.5 text-xs font-bold transition shadow-2xs active:scale-95 cursor-pointer"
                          >
                            <Award size={13} />
                            <span>Evaluate</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Evidence Drawer */}
      <SubmissionEvidenceDrawer
        isOpen={!!selectedDossierSub}
        onClose={() => setSelectedDossierSub(null)}
        submission={selectedDossierSub}
        type="partner"
        onOpenEvaluation={handleOpenEvaluation}
        adminEmail={adminEmail}
      />

      {/* Interactive Partner Evaluation Modal */}
      {evaluatingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                    Partner Evaluation Node
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Week {evaluatingSub.assignmentId} • Phase {evaluatingSub.phaseId}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {evaluatingSub.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Partner:{" "}
                  <span className="font-bold text-slate-800">
                    {evaluatingSub.candidateName}
                  </span>{" "}
                  ({evaluatingSub.candidateEmail})
                </p>
              </div>

              <button
                onClick={() => setEvaluatingSub(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Evidence & Submission Details */}
            <div className="my-4 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Partner Deliverables & Attached Evidence
              </h4>

              {/* Links */}
              {evaluatingSub.links && evaluatingSub.links.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-1">Submitted URLs:</div>
                  <div className="flex flex-wrap gap-2">
                    {evaluatingSub.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.startsWith("http") ? link : `https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-white border border-amber-200 px-3 py-1.5 rounded-xl hover:bg-amber-50"
                      >
                        <Globe size={13} />
                        <span>{link}</span>
                        <ExternalLink size={11} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Files */}
              {evaluatingSub.files && evaluatingSub.files.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-1">Attached Files:</div>
                  <div className="flex flex-wrap gap-2">
                    {evaluatingSub.files.map((f, i) => (
                      <a
                        key={i}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100"
                      >
                        <FileText size={13} />
                        <span>{f.name}</span>
                        <Download size={11} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {evaluatingSub.notes && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-1">Partner Notes:</div>
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-sans whitespace-pre-wrap">
                    {evaluatingSub.notes}
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEvaluation} className="space-y-5">
              {/* Status & Numerical Score */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Evaluation Verdict
                  </label>
                  <select
                    value={evalStatus}
                    onChange={(e) => setEvalStatus(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="reviewed">✅ Reviewed & Approved</option>
                    <option value="in_progress">⏳ Request Revision / In Progress</option>
                    <option value="submitted">📥 Keep Submitted</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Numerical Score (/100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={evalScore}
                    onChange={(e) => setEvalScore(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-900 focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Founder / Mentor Review Feedback
                </label>
                <textarea
                  rows={3}
                  value={evalFeedback}
                  onChange={(e) => setEvalFeedback(e.target.value)}
                  placeholder="Provide tactical feedback on this partner milestone..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-hidden"
                />

                {/* Quick Templates */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyTemplate(
                        "Exceptional startup research and actionable business insights. Great execution!"
                      )
                    }
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition cursor-pointer"
                  >
                    + Great execution
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyTemplate(
                        "Please strengthen the quantitative evidence and attach supporting screenshots/data."
                      )
                    }
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition cursor-pointer"
                  >
                    + Need more data
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyTemplate(
                        "Strong founder-level thinking with clear prioritization and trade-off analysis."
                      )
                    }
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition cursor-pointer"
                  >
                    + Founder thinking
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEvaluatingSub(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEvaluation}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {savingEvaluation ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  <span>Publish Partner Verdict</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  GraduationCap,
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
  BookOpen
} from "lucide-react";

import SubmissionEvidenceDrawer from "./SubmissionEvidenceDrawer";

const TRACKS = [
  { id: "all", label: "All Tracks" },
  { id: "data-analyst", label: "Data Analyst", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "data-science", label: "Data Science", color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: "artificial-intelligence", label: "Artificial Intelligence", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "ui-ux-design", label: "UI/UX Design", color: "bg-pink-50 text-pink-700 border-pink-200" },
  { id: "app-development", label: "App Development", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: "full-stack-development", label: "Full Stack Dev", color: "bg-amber-50 text-amber-700 border-amber-200" }
];

export default function FellowshipSubmissionsHub({ adminEmail }) {
  const [submissions, setSubmissions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalSubmissions: 0,
    pendingReview: 0,
    passedCount: 0,
    revisionCount: 0,
    totalEnrollments: 0,
    trackBreakdown: {}
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [evaluatingSub, setEvaluatingSub] = useState(null);
  const [selectedDossierSub, setSelectedDossierSub] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(null);

  // Evaluation Form State
  const [evalStatus, setEvalStatus] = useState("passed");
  const [evalScore, setEvalScore] = useState(85);
  const [rubrics, setRubrics] = useState({
    codeQuality: 22,
    features: 23,
    problemSolving: 20,
    presentation: 20
  });
  const [mentorFeedback, setMentorFeedback] = useState("");
  const [issueCertificate, setIssueCertificate] = useState(false);
  const [savingEvaluation, setSavingEvaluation] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const apiBase =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "https://server.datasenseai.com";

      const res = await fetch(`${apiBase}/careersense/admin/fellowship/submissions`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [adminEmail]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Open Evaluation Modal
  const handleOpenEvaluation = (sub) => {
    setEvaluatingSub(sub);
    setEvalStatus(sub.status === "submitted" ? "passed" : sub.status);
    setEvalScore(sub.score || 85);
    setMentorFeedback(sub.mentorFeedback || "");
    setIssueCertificate(!!sub.certificateCode);
    if (sub.rubricScores) {
      setRubrics({
        codeQuality: sub.rubricScores.codeQuality || 22,
        features: sub.rubricScores.features || 23,
        problemSolving: sub.rubricScores.problemSolving || 20,
        presentation: sub.rubricScores.presentation || 20
      });
    } else {
      setRubrics({ codeQuality: 22, features: 23, problemSolving: 20, presentation: 20 });
    }
  };

  // Submit Evaluation
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

      const calculatedScore = Math.min(
        100,
        Math.max(
          0,
          rubrics.codeQuality + rubrics.features + rubrics.problemSolving + rubrics.presentation
        )
      );

      const res = await fetch(
        `${apiBase}/careersense/admin/fellowship/submissions/${evaluatingSub._id}/evaluate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-email": adminEmail
          },
          body: JSON.stringify({
            status: evalStatus,
            score: evalScore || calculatedScore,
            rubricScores: rubrics,
            mentorFeedback,
            issueCertificate
          })
        }
      );

      const data = await res.json();
      if (data.success) {
        setEvaluatingSub(null);
        fetchSubmissions();
      } else {
        alert(data.message || "Failed to save evaluation.");
      }
    } catch (err) {
      console.error("Save evaluation error:", err);
      alert("An error occurred while saving evaluation.");
    } finally {
      setSavingEvaluation(false);
    }
  };

  // Quick Feedback Templates
  const handleApplyTemplate = (text) => {
    setMentorFeedback((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleCopyPhone = (phone, e) => {
    e.stopPropagation();
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      if (selectedTrack !== "all" && sub.programId !== selectedTrack) return false;
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
  }, [submissions, selectedTrack, selectedStatus, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredSubmissions.length) return;
    const headers = [
      "Candidate Name",
      "Email",
      "Phone",
      "Track",
      "Milestone Title",
      "Phase",
      "Status",
      "Score",
      "GitHub Repo",
      "Live Demo",
      "Certificate Code",
      "Submitted At"
    ];

    const rows = filteredSubmissions.map((s) => [
      `"${s.candidateName || ""}"`,
      `"${s.candidateEmail || ""}"`,
      `"${s.candidatePhone || ""}"`,
      `"${s.programId || ""}"`,
      `"${s.title || ""}"`,
      `"${s.phaseId || 1}"`,
      `"${s.status || ""}"`,
      `"${s.score !== null ? s.score : ""}"`,
      `"${s.githubUrl || ""}"`,
      `"${s.liveDemoUrl || ""}"`,
      `"${s.certificateCode || ""}"`,
      `"${s.createdAt ? new Date(s.createdAt).toISOString() : ""}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fellowship_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Submissions</span>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <BookOpen size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              {metrics.totalSubmissions}
            </span>
            <span className="text-[11px] font-medium text-slate-400">across tracks</span>
          </div>
        </div>

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

        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 to-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">Passed & Certified</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-emerald-800">
              {metrics.passedCount}
            </span>
            <span className="text-[11px] font-bold text-emerald-600">Approved</span>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50/50 to-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-900">Revisions Needed</span>
            <div className="rounded-lg bg-rose-100 p-2 text-rose-700">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-rose-800">
              {metrics.revisionCount}
            </span>
            <span className="text-[11px] font-bold text-rose-600">Feedback sent</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Fellows</span>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              {metrics.totalEnrollments}
            </span>
            <span className="text-[11px] font-medium text-slate-400">Enrolled</span>
          </div>
        </div>
      </div>

      {/* Control / Filter Bar */}
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
              placeholder="Search by candidate, email, phone, project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Track Filter */}
          <div className="relative">
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-hidden cursor-pointer"
            >
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Pending Review (Submitted)</option>
              <option value="under_review">Under Review</option>
              <option value="passed">Passed (Approved)</option>
              <option value="revision_required">Revision Required</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchSubmissions}
            disabled={loading}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            <RefreshCw size={13} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
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
                <th className="px-5 py-3.5">Candidate</th>
                <th className="px-4 py-3.5">Track & Milestone</th>
                <th className="px-4 py-3.5">Code & Demo Links</th>
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
                    <RefreshCw size={24} className="mx-auto animate-spin text-blue-600 mb-2" />
                    <span className="font-semibold">Loading fellowship submissions...</span>
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <BookOpen size={32} className="mx-auto text-slate-300 mb-2" />
                    <div className="font-bold text-slate-700">No submissions found</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      No project submissions match your filter criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => {
                  const trackObj = TRACKS.find((t) => t.id === sub.programId) || {
                    label: sub.programId,
                    color: "bg-slate-50 text-slate-700 border-slate-200"
                  };

                  return (
                    <tr
                      key={sub._id}
                      className="hover:bg-slate-50/60 transition-colors group cursor-default"
                    >
                      {/* Candidate */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            {sub.candidateName ? sub.candidateName[0].toUpperCase() : "C"}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-tight">
                              {sub.candidateName}
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
                                  className="text-slate-400 hover:text-blue-600"
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

                      {/* Track & Milestone */}
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold border ${trackObj.color}`}
                          >
                            {trackObj.label}
                          </span>
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">
                            {sub.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Phase {sub.phaseId || 1} • Milestone #{sub.assignmentId}
                          </div>
                        </div>
                      </td>

                      {/* Deliverables & Evidence Badges (Click opens Dossier) */}
                      <td className="px-4 py-4">
                        {(() => {
                          const links = [sub.githubUrl, sub.liveDemoUrl]
                            .map((l) => (typeof l === "string" ? l.trim() : ""))
                            .filter(Boolean);
                          const filesCount = Array.isArray(sub.fileUrls) ? sub.fileUrls.length : 0;
                          const hasNotes = Boolean(sub.notes && sub.notes.trim());

                          return (
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {sub.githubUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDossierSub(sub)}
                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-2 py-0.5 rounded-lg transition cursor-pointer"
                                    title="View Code repository in dossier"
                                  >
                                    <Code2 size={11} />
                                    <span>Code</span>
                                  </button>
                                )}

                                {sub.liveDemoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDossierSub(sub)}
                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                                    title="View Live Demo in dossier"
                                  >
                                    <Globe size={11} className="text-teal-600" />
                                    <span>Live Demo</span>
                                  </button>
                                )}

                                {filesCount > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDossierSub(sub)}
                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                                    title="View uploaded files in dossier"
                                  >
                                    <Paperclip size={11} className="text-indigo-600" />
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

                                {!links.length && !filesCount && !hasNotes && (
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
                        {sub.status === "passed" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} />
                            <span>Passed</span>
                          </span>
                        )}
                        {sub.status === "submitted" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 border border-amber-200 animate-pulse">
                            <Clock size={12} />
                            <span>Submitted</span>
                          </span>
                        )}
                        {sub.status === "under_review" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 border border-blue-200">
                            <Clock size={12} />
                            <span>Under Review</span>
                          </span>
                        )}
                        {sub.status === "revision_required" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 border border-rose-200">
                            <AlertCircle size={12} />
                            <span>Revision</span>
                          </span>
                        )}
                        {sub.status === "in_progress" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                            <span>Draft / In Progress</span>
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
                        {sub.createdAt
                          ? new Date(sub.createdAt).toLocaleDateString("en-IN", {
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
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 px-3 py-1.5 text-xs font-bold transition shadow-2xs active:scale-95 cursor-pointer"
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
        type="fellowship"
        onOpenEvaluation={handleOpenEvaluation}
        adminEmail={adminEmail}
      />

      {/* Interactive Evaluation Modal */}
      {evaluatingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                    Capstone Evaluation Hub
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Milestone #{evaluatingSub.assignmentId}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {evaluatingSub.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Applicant:{" "}
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

            {/* Submission Links Banner */}
            <div className="my-4 rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                {evaluatingSub.githubUrl && (
                  <a
                    href={
                      evaluatingSub.githubUrl.startsWith("http")
                        ? evaluatingSub.githubUrl
                        : `https://${evaluatingSub.githubUrl}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-blue-600 underline"
                  >
                    <Code2 size={15} />
                    <span>Open GitHub Repo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {evaluatingSub.liveDemoUrl && (
                  <a
                    href={
                      evaluatingSub.liveDemoUrl.startsWith("http")
                        ? evaluatingSub.liveDemoUrl
                        : `https://${evaluatingSub.liveDemoUrl}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline"
                  >
                    <Globe size={15} />
                    <span>Open Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
              {evaluatingSub.notes && (
                <div className="text-[11px] text-slate-600 italic bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Note: "{evaluatingSub.notes}"
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEvaluation} className="space-y-5">
              {/* Rubric Sliders */}
              <div className="space-y-3 rounded-2xl border border-slate-200/80 p-4 bg-slate-50/40">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Grading Rubrics (Total 100)
                  </h4>
                  <div className="text-xs font-extrabold text-blue-700">
                    Calculated Score:{" "}
                    {rubrics.codeQuality +
                      rubrics.features +
                      rubrics.problemSolving +
                      rubrics.presentation}
                    /100
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Code Quality & Structure</span>
                      <span className="font-bold text-blue-600">{rubrics.codeQuality}/25</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={rubrics.codeQuality}
                      onChange={(e) =>
                        setRubrics({ ...rubrics, codeQuality: Number(e.target.value) })
                      }
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Feature Completeness</span>
                      <span className="font-bold text-blue-600">{rubrics.features}/25</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={rubrics.features}
                      onChange={(e) =>
                        setRubrics({ ...rubrics, features: Number(e.target.value) })
                      }
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Problem Solving & Logic</span>
                      <span className="font-bold text-blue-600">{rubrics.problemSolving}/25</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={rubrics.problemSolving}
                      onChange={(e) =>
                        setRubrics({ ...rubrics, problemSolving: Number(e.target.value) })
                      }
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Documentation & UI</span>
                      <span className="font-bold text-blue-600">{rubrics.presentation}/25</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={rubrics.presentation}
                      onChange={(e) =>
                        setRubrics({ ...rubrics, presentation: Number(e.target.value) })
                      }
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Status Selector & Overall Score */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Evaluation Verdict
                  </label>
                  <select
                    value={evalStatus}
                    onChange={(e) => setEvalStatus(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-800 focus:border-blue-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="passed">✅ Passed (Approve Milestone)</option>
                    <option value="revision_required">⚠️ Revision Required (Request Fixes)</option>
                    <option value="under_review">⏳ Keep Under Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Final Numerical Score (/100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={evalScore}
                    onChange={(e) => setEvalScore(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-900 focus:border-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Mentor Feedback */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mentor Evaluation Notes & Guidance
                </label>
                <textarea
                  rows={3}
                  value={mentorFeedback}
                  onChange={(e) => setMentorFeedback(e.target.value)}
                  placeholder="Provide constructive feedback for the fellow..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-hidden"
                />

                {/* Quick Templates */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyTemplate(
                        "Outstanding code structure and well-implemented logic. Approved!"
                      )
                    }
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition cursor-pointer"
                  >
                    + Excellent work
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyTemplate(
                        "Please add a comprehensive README and deploy the live demo link before resubmitting."
                      )
                    }
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition cursor-pointer"
                  >
                    + Need README/Demo
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyTemplate(
                        "Clean UI/UX design with responsive layout across mobile and desktop viewports."
                      )
                    }
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 transition cursor-pointer"
                  >
                    + Great UI/UX
                  </button>
                </div>
              </div>

              {/* Issue Certificate Checkbox */}
              <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50/60 p-3">
                <input
                  type="checkbox"
                  id="certCheck"
                  checked={issueCertificate}
                  onChange={(e) => setIssueCertificate(e.target.checked)}
                  className="h-4 w-4 rounded-md accent-purple-600 cursor-pointer"
                />
                <label
                  htmlFor="certCheck"
                  className="text-xs font-bold text-purple-900 cursor-pointer select-none"
                >
                  Issue Verifiable Track Certificate Code (e.g. CS-DAT-2026-XXXXX)
                </label>
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
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {savingEvaluation ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  <span>Save Verdict & Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

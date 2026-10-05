import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Globe,
  Code2,
  Paperclip,
  Download,
  Award,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileIcon,
  Image as ImageIcon,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Send
} from "lucide-react";

export default function SubmissionEvidenceDrawer({
  isOpen,
  onClose,
  submission,
  type = "partner", // "partner" | "fellowship"
  onOpenEvaluation,
  adminEmail
}) {
  if (!isOpen || !submission) return null;

  const [activeTab, setActiveTab] = useState("all");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  // Extract clean links
  const links = (Array.isArray(submission.links) ? submission.links : [
    submission.githubUrl,
    submission.liveDemoUrl
  ])
    .map((l) => (typeof l === "string" ? l.trim() : ""))
    .filter((l) => l && l.length > 0);

  // Extract files
  const files = Array.isArray(submission.files)
    ? submission.files
    : Array.isArray(submission.fileUrls)
    ? submission.fileUrls.map((url, idx) => ({
        name: `Evidence Attachment #${idx + 1}`,
        url,
        type: url.endsWith(".pdf") ? "application/pdf" : "image/jpeg"
      }))
    : [];

  const handleCopyPhone = () => {
    if (!submission.candidatePhone) return;
    navigator.clipboard.writeText(submission.candidatePhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyLink = (url, idx) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(idx);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const formatUrl = (url) => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  };

  const getLinkSource = (url) => {
    try {
      const host = new URL(formatUrl(url)).hostname.replace(/^www\./, "");
      if (host.includes("github.com")) return { label: "GitHub Repository", icon: Code2, color: "text-slate-800 bg-slate-100 border-slate-300" };
      if (host.includes("figma.com")) return { label: "Figma Prototype", icon: Layers, color: "text-purple-700 bg-purple-50 border-purple-200" };
      if (host.includes("drive.google.com") || host.includes("docs.google.com")) return { label: "Google Drive Asset", icon: FileText, color: "text-blue-700 bg-blue-50 border-blue-200" };
      if (host.includes("vercel.app") || host.includes("netlify.app") || host.includes("onrender.com")) return { label: "Live Deployment", icon: Globe, color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
      return { label: host || "Web Resource", icon: Globe, color: "text-cyan-700 bg-cyan-50 border-cyan-200" };
    } catch {
      return { label: "External Link", icon: Globe, color: "text-slate-700 bg-slate-100 border-slate-200" };
    }
  };

  const isImageFile = (file) => {
    if (file?.type?.startsWith("image/")) return true;
    const url = file?.url || file?.name || "";
    return /\.(png|jpe?g|webp|gif|svg)$/i.test(url);
  };

  const isPdfFile = (file) => {
    if (file?.type === "application/pdf") return true;
    const url = file?.url || file?.name || "";
    return /\.pdf$/i.test(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border-l border-slate-200 text-slate-800 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="border-b border-slate-100 bg-slate-50/90 p-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black text-white shadow-xs text-base ${
                  type === "partner"
                    ? "bg-gradient-to-br from-amber-500 to-amber-700 ring-2 ring-amber-500/20"
                    : "bg-gradient-to-br from-blue-600 to-indigo-700 ring-2 ring-blue-500/20"
                }`}
              >
                {(submission.candidateName?.[0] || "C").toUpperCase()}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-black text-slate-900 leading-tight">
                  {submission.candidateName || "Candidate"}
                </h2>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border ${
                    type === "partner"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                >
                  {type === "partner" ? "Partner Program" : `${submission.programId || "Fellowship"} Track`}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold border capitalize ${
                    submission.status === "reviewed" || submission.status === "passed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : submission.status === "submitted"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {submission.status === "submitted" ? "Needs Evaluation" : submission.status}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Mail size={12} className="text-slate-400" />
                  {submission.candidateEmail}
                </span>

                {submission.candidatePhone && (
                  <span className="flex items-center gap-1 font-mono text-[11px] text-slate-700">
                    <Phone size={12} className="text-slate-400" />
                    {submission.candidatePhone}
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="text-slate-400 hover:text-amber-600 ml-0.5"
                      title="Copy phone"
                    >
                      {copiedPhone ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Milestone Card Summary */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-4 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {type === "partner" ? `Milestone #${submission.assignmentId} • ${submission.phaseTitle || "Phase 1"}` : `Milestone #${submission.assignmentId} • Phase ${submission.phaseId || 1}`}
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">{submission.title}</h3>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">Score Awarded</div>
              <div className="text-lg font-black text-amber-300">
                {submission.score !== null && submission.score !== undefined ? `${submission.score} / 100` : "Ungraded"}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-5 text-xs font-bold text-slate-600 gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "all"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText size={14} />
            <span>Overview & Notes</span>
          </button>

          <button
            onClick={() => setActiveTab("links")}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "links"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe size={14} />
            <span>Links & Code ({links.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("files")}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "files"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Paperclip size={14} />
            <span>Files & PDFs ({files.length})</span>
          </button>
        </div>

        {/* Drawer Body Scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Overview Tab Content */}
          {(activeTab === "all" || activeTab === "notes") && (
            <div className="space-y-4">
              {/* Planning & Deliverable Notes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileText size={13} className="text-amber-600" />
                  Candidate Approach & Deliverable Notes
                </h4>
                {submission.notes && submission.notes.trim() ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans">
                    {submission.notes}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
                    No written notes provided for this submission.
                  </div>
                )}
              </div>

              {/* Mentor Feedback & Score */}
              {(submission.feedback || submission.mentorFeedback) && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                    <Award size={13} />
                    Mentor Evaluation & Feedback
                  </h4>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs leading-relaxed text-emerald-950 whitespace-pre-wrap">
                    {submission.feedback || submission.mentorFeedback}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Links Section */}
          {(activeTab === "all" || activeTab === "links") && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe size={13} className="text-blue-600" />
                  Submitted Evidence Links ({links.length})
                </span>
              </h4>

              {links.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
                  No live URLs or code repositories attached.
                </div>
              ) : (
                <div className="space-y-2">
                  {links.map((url, idx) => {
                    const source = getLinkSource(url);
                    const SourceIcon = source.icon;
                    const formatted = formatUrl(url);

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs hover:border-slate-300 transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-2 rounded-lg border shrink-0 ${source.color}`}>
                            <SourceIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                              <span>{source.label}</span>
                              <span className="text-[10px] text-slate-400 font-normal">#{idx + 1}</span>
                            </div>
                            <div className="text-xs font-mono text-slate-500 truncate max-w-sm">
                              {url}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopyLink(formatted, idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                            title="Copy link"
                          >
                            {copiedLink === idx ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                          </button>

                          <a
                            href={formatted}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-2xs"
                          >
                            <span>Open</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Files & PDF Section */}
          {(activeTab === "all" || activeTab === "files") && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Paperclip size={13} className="text-teal-600" />
                  Uploaded Evidence Files & PDFs ({files.length})
                </span>
              </h4>

              {files.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
                  No files or PDF documents uploaded for this assignment.
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file, idx) => {
                    const isImg = isImageFile(file);
                    const isPdf = isPdfFile(file);

                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
                              {isImg ? <ImageIcon size={16} /> : isPdf ? <FileText size={16} /> : <FileIcon size={16} />}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">
                                {file.name || `Attachment #${idx + 1}`}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {file.size ? `${(file.size / 1024).toFixed(1)} KB` : "Uploaded Evidence"}
                              </div>
                            </div>
                          </div>

                          {file.url && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-2xs"
                              >
                                <Download size={12} />
                                <span>View / Download</span>
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Image Preview Thumbnail */}
                        {isImg && file.url && (
                          <div className="rounded-lg overflow-hidden border border-slate-100 bg-slate-50 max-h-48 flex items-center justify-center">
                            <img
                              src={file.url}
                              alt={file.name || "Evidence"}
                              className="max-h-48 object-contain w-full hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer / Evaluation CTA */}
        <div className="border-t border-slate-200 bg-slate-50/80 p-4 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Submitted on{" "}
            <span className="font-semibold text-slate-700">
              {submission.submittedAt || submission.createdAt
                ? new Date(submission.submittedAt || submission.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                : "Recently"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenEvaluation) onOpenEvaluation(submission);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Award size={14} />
            <span>Open Evaluation & Grading</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { 
  X, 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Target, 
  Award, 
  BookOpen, 
  Clock, 
  Download, 
  ExternalLink,
  Receipt,
  Layers,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function CandidateDossierDrawer({ 
  isOpen, 
  onClose, 
  clerkId, 
  onOpenTokenModal, 
  adminEmail 
}) {
  if (!isOpen || !clerkId) return null;

  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    let isMounted = true;
    const fetchDossier = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
        const res = await fetch(`${apiBase}/careersense/admin/users/${clerkId}/details`, {
          headers: {
            "x-admin-email": adminEmail
          }
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || "Failed to load candidate dossier");
        }
        if (isMounted) setDossier(data.candidate);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDossier();
    return () => { isMounted = false; };
  }, [clerkId, adminEmail]);

  const profile = dossier?.profile;
  const subscription = dossier?.subscription;
  const tokenLedger = dossier?.tokenLedger || [];
  const resumes = dossier?.resumes || [];
  const atsScans = dossier?.atsScans || [];
  const coverLetters = dossier?.coverLetters || [];
  const certifications = dossier?.certifications || [];
  const passes = dossier?.downloadPasses || [];
  const assessment = dossier?.assessment;

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "resumes", label: `Resumes (${resumes.length})`, icon: FileText },
    { id: "ats", label: `ATS Scans (${atsScans.length})`, icon: Target },
    { id: "cover-letters", label: `Cover Letters (${coverLetters.length})`, icon: Mail },
    { id: "certifications", label: `Certificates (${certifications.length})`, icon: Award },
    { id: "ledger", label: `Token Ledger (${tokenLedger.length})`, icon: Receipt },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border-l border-slate-200 text-slate-800 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="border-b border-slate-100 bg-slate-50/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="h-12 w-12 rounded-2xl object-cover ring-2 ring-teal-500/30" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-700 text-base font-black text-white shadow-xs">
                  {(profile?.fullName?.[0] || profile?.email?.[0] || "U").toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{profile?.fullName || "Anonymous Candidate"}</h2>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 border border-amber-200">
                  {subscription?.plan || "Free"}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                <span>{profile?.email}</span>
                {profile?.phone && (
                  <>
                    <span>•</span>
                    <span className="font-bold text-teal-700">📞 {profile.phone}</span>
                  </>
                )}
                <span>•</span>
                <span className="text-[11px] text-slate-400 font-mono">{clerkId.slice(0, 16)}...</span>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenTokenModal(dossier ? { clerkUserId: clerkId, email: profile?.email, subscription } : null)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b132b] hover:bg-slate-800 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Zap size={14} fill="currentColor" className="text-amber-400" />
              <span>Adjust Tokens</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-white px-4 overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3.5 py-3 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#f8fafc]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={32} className="text-teal-600 animate-spin" />
              <p className="mt-3 text-xs font-bold text-slate-500">Loading 360° Candidate Profile...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center">
              <AlertCircle size={32} className="mx-auto text-rose-500" />
              <p className="mt-2 text-sm font-bold text-rose-700">{error}</p>
            </div>
          ) : (
            <>
              {/* 1. OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Token & Plan Summary Card */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Subscription & Quota</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-[#f8fafc] p-3 border border-slate-200/60">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Active Tier</div>
                        <div className="text-sm font-black text-amber-600 uppercase mt-0.5">{subscription?.plan || "Free"}</div>
                        <div className="text-[10px] text-slate-400 mt-1 capitalize">{subscription?.billingCycle || "Monthly"}</div>
                      </div>
                      <div className="rounded-xl bg-[#f8fafc] p-3 border border-slate-200/60">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Tokens Balance</div>
                        <div className="text-sm font-black text-emerald-600 mt-0.5">{subscription?.tokensRemaining?.toLocaleString() || 0}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Live Countdown</div>
                      </div>
                      <div className="rounded-xl bg-[#f8fafc] p-3 border border-slate-200/60">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Status</div>
                        <div className="text-sm font-black text-teal-600 capitalize mt-0.5">{subscription?.subscriptionStatus || "Active"}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Source: {profile?.source || "CareerSense"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Counters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 text-center shadow-xs">
                      <div className="text-xl font-black text-slate-900">{resumes.length}</div>
                      <div className="text-[11px] font-bold text-slate-500 mt-0.5">Resumes Built</div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 text-center shadow-xs">
                      <div className="text-xl font-black text-teal-600">{atsScans.length}</div>
                      <div className="text-[11px] font-bold text-slate-500 mt-0.5">ATS Scans Run</div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 text-center shadow-xs">
                      <div className="text-xl font-black text-purple-600">{coverLetters.length}</div>
                      <div className="text-[11px] font-bold text-slate-500 mt-0.5">Cover Letters</div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 text-center shadow-xs">
                      <div className="text-xl font-black text-amber-600">{certifications.length}</div>
                      <div className="text-[11px] font-bold text-slate-500 mt-0.5">Certificates</div>
                    </div>
                  </div>

                  {/* Micro-Passes Unlocked */}
                  {passes.length > 0 && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                      <div className="text-xs font-bold uppercase text-slate-500 mb-2">Paid Download Passes ({passes.length})</div>
                      <div className="space-y-2">
                        {passes.map((p, i) => (
                          <div key={i} className="flex items-center justify-between rounded-xl bg-[#f8fafc] p-2.5 border border-slate-200/60 text-xs">
                            <span className="font-semibold text-slate-800 capitalize">{p.resourceType?.replace(/_/g, " ")}</span>
                            <span className="text-[11px] font-bold text-emerald-600">₹{p.amountPaid || 1} • Paid</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-2 text-xs text-slate-600 shadow-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Registered On:</span>
                      <span className="text-slate-800 font-semibold">{profile?.createdAt ? new Date(profile.createdAt).toLocaleString() : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Last Updated:</span>
                      <span className="text-slate-800 font-semibold">{profile?.updatedAt ? new Date(profile.updatedAt).toLocaleString() : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Clerk User ID:</span>
                      <span className="text-slate-700 font-mono text-[11px]">{clerkId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. RESUMES TAB */}
              {activeTab === "resumes" && (
                <div className="space-y-3">
                  {resumes.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">No resumes created yet.</div>
                  ) : (
                    resumes.map((r, i) => (
                      <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <FileText size={16} className="text-blue-600" />
                            <span className="text-xs font-bold text-slate-900">{r.title || r.name || `Resume #${i+1}`}</span>
                          </div>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                            {r.templateId || "Modern"}
                          </span>
                        </div>
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                          <span>Last updated: {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : "Recent"}</span>
                          {r.score && <span className="font-bold text-emerald-600">Score: {r.score}/100</span>}
                        </div>
                        {(r.url || r.s3Url) && (
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex justify-end">
                            <a
                              href={r.url || r.s3Url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"
                            >
                              <ExternalLink size={12} />
                              <span>View / Download Resume PDF</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 3. ATS SCANS TAB */}
              {activeTab === "ats" && (
                <div className="space-y-3">
                  {atsScans.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">No ATS scans executed yet.</div>
                  ) : (
                    atsScans.map((a, i) => (
                      <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText size={15} className="text-teal-600" />
                            <span className="text-xs font-bold text-slate-900">{a.file_name || `Scanned Resume #${i+1}`}</span>
                          </div>
                          <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-black">
                            Score: {a.current_score || a.latestAnalysis?.overall_score || 0}%
                          </span>
                        </div>
                        {a.latestAnalysis?.summary && (
                          <p className="text-[11px] text-slate-600 leading-relaxed bg-[#f8fafc] p-3 rounded-xl border border-slate-200/60">
                            {a.latestAnalysis.summary}
                          </p>
                        )}
                        {a.s3Url && (
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                            <span className="text-slate-400 font-medium">Uploaded: {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "N/A"}</span>
                            <a
                              href={a.s3Url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"
                            >
                              <ExternalLink size={12} />
                              <span>Open Original PDF</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 4. COVER LETTERS TAB */}
              {activeTab === "cover-letters" && (
                <div className="space-y-3">
                  {coverLetters.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">No cover letters generated yet.</div>
                  ) : (
                    coverLetters.map((c, i) => (
                      <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-purple-200 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-xs font-black text-slate-900 block truncate">
                              {c.title || c.jobRole || c.company || c.companyName || `Executive Letter #${i + 1}`}
                            </span>
                            {(c.company || c.companyName || c.recipient?.company) && (
                              <div className="text-[11px] text-purple-700 font-bold mt-0.5">
                                Target Company: {c.company || c.companyName || c.recipient?.company}
                              </div>
                            )}
                            {(c.recipient?.targetRole || c.targetRole) && (
                              <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                Target Role: {c.recipient?.targetRole || c.targetRole}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 shrink-0 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "Recent"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 5. CERTIFICATIONS TAB */}
              {activeTab === "certifications" && (
                <div className="space-y-3">
                  {certifications.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">No certificates issued yet.</div>
                  ) : (
                    certifications.map((cert, i) => (
                      <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3">
                          <Award size={20} className="text-amber-500" />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{cert.skillName || "Certified Skill"}</div>
                            <div className="text-[10px] text-slate-500">Score: {cert.score}% • Issued: {cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString() : "Recent"}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {cert.certificateId || "VERIFIED"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 6. TOKEN LEDGER TAB */}
              {activeTab === "ledger" && (
                <div className="space-y-2.5">
                  {tokenLedger.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">No ledger transactions recorded yet.</div>
                  ) : (
                    tokenLedger.map((tx, i) => {
                      const amount = typeof tx.amount === "number" 
                        ? tx.amount 
                        : (typeof tx.tokenAmount === "number" ? tx.tokenAmount : 0);
                      
                      const isCredit = amount > 0 || 
                        ["one_time_free", "monthly_refill", "token_addon", "grant", "purchase"].includes(tx.transactionType);
                      
                      // Human friendly title mapping
                      let title = "Token Activity";
                      if (tx.serviceId === "onboarding" || tx.transactionType === "one_time_free") {
                        title = "Welcome Free Tier Grant";
                      } else if (tx.serviceId === "admin_plan_upgrade") {
                        title = "Admin Plan Upgrade";
                      } else if (tx.serviceId === "admin_grant" || tx.transactionType === "admin_adjustment") {
                        title = "Admin Token Grant / Adjustment";
                      } else if (tx.serviceId === "monthly_renewal" || tx.transactionType === "monthly_refill") {
                        title = "Monthly Plan Refill";
                      } else if (tx.serviceId === "ats_scan" || tx.serviceId === "ats") {
                        title = "ATS Resume Scan & Optimization";
                      } else if (tx.serviceId === "cover_letter") {
                        title = "AI Cover Letter Generation";
                      } else if (tx.serviceId === "certifi_quiz") {
                        title = "Skill Assessment & Quiz";
                      } else if (tx.serviceId === "resume_pdf" || tx.serviceId === "resume_builder") {
                        title = "AI Resume Builder & Export";
                      } else if (tx.notes) {
                        title = tx.notes;
                      } else if (tx.serviceId) {
                        title = tx.serviceId.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                      } else if (tx.transactionType) {
                        title = tx.transactionType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                      }

                      // Note or metadata
                      const noteText = tx.metadata?.note || tx.notes || "";
                      const balanceAfterVal = typeof tx.balanceAfter === "number" 
                        ? tx.balanceAfter.toLocaleString() 
                        : (typeof tx.tokensRemainingAfter === "number" ? tx.tokensRemainingAfter.toLocaleString() : null);

                      return (
                        <div key={i} className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-200/80 text-xs shadow-xs hover:border-slate-300 transition">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs shrink-0 ${
                              isCredit 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}>
                              {isCredit ? "+" : "-"}
                            </div>
                            <div className="min-w-0">
                              <div className="text-slate-900 font-bold flex items-center gap-2">
                                <span>{title}</span>
                                {tx.transactionType && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                    {tx.transactionType.replace(/_/g, " ")}
                                  </span>
                                )}
                              </div>
                              {noteText && (
                                <div className="text-[11px] text-slate-500 truncate mt-0.5 max-w-xs sm:max-w-md">
                                  {noteText}
                                </div>
                              )}
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {tx.createdAt ? new Date(tx.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "Recent"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0 pl-3">
                            <div className={`font-black text-sm ${isCredit ? "text-emerald-600" : "text-rose-600"}`}>
                              {isCredit ? "+" : "-"}{Math.abs(amount).toLocaleString()}
                            </div>
                            {balanceAfterVal && (
                              <div className="text-[10px] font-bold text-slate-400 mt-0.5">
                                Bal: {balanceAfterVal}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

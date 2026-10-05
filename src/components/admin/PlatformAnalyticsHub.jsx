import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Zap,
  Activity,
  Users,
  Sparkles,
  Flame,
  FileCheck2,
  FileText,
  Award,
  Compass,
  RefreshCw,
  Download,
  Copy,
  Check,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function PlatformAnalyticsHub({ adminEmail }) {
  const [analyticsData, setAnalyticsData] = useState({
    metrics: {
      totalToolSessions: 0,
      totalTokensBurned: 0,
      avgTokensPerTool: 0,
      totalProfilesCount: 0,
      activeTokenConsumersCount: 0
    },
    tools: {
      ats: { totalScans: 0, activeUsers: 0, avgScore: 0, scoreDistribution: {} },
      resumeBuilder: { totalResumes: 0, activeUsers: 0 },
      coverLetter: { totalLetters: 0, activeUsers: 0 },
      certifi: { totalTests: 0, activeUsers: 0 },
      careerAssessment: { totalAssessments: 0, activeUsers: 0 }
    },
    tokenCategoryBreakdown: {},
    topConsumers: [],
    dailyActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [copiedPhone, setCopiedPhone] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const apiBase =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "https://server.datasenseai.com";

      const res = await fetch(`${apiBase}/careersense/admin/analytics`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  }, [adminEmail]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleCopy = (text, e) => {
    e.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedPhone(text);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const { metrics, tools, topConsumers, dailyActivity, tokenCategoryBreakdown } =
    analyticsData;

  // Export CSV of Top Consumers
  const handleExportCSV = () => {
    if (!topConsumers.length) return;
    const headers = [
      "User Name",
      "Email",
      "Phone",
      "Plan",
      "Tokens Consumed",
      "Tool Operations",
      "Current Balance"
    ];

    const rows = topConsumers.map((c) => [
      `"${c.name || ""}"`,
      `"${c.email || ""}"`,
      `"${c.phone || ""}"`,
      `"${c.plan || "free"}"`,
      c.tokensBurned || 0,
      c.operationsCount || 0,
      c.balanceRemaining || 0
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `top_token_consumers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top AI Intelligence & Usage KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tokens Burned */}
        <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-500/10 via-purple-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
              Total AI Tokens Burned
            </span>
            <div className="rounded-xl bg-purple-600 text-white p-2 shadow-xs">
              <Flame size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-purple-950">
              {((metrics.totalTokensBurned || 0) / 1000000).toFixed(2)}M
            </span>
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
              {(metrics.totalTokensBurned || 0).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            Cumulative across ATS scans & resume AI generations
          </div>
        </div>

        {/* Total Tool Sessions */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Tool Sessions
            </span>
            <div className="rounded-xl bg-slate-900 text-white p-2">
              <Activity size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">
              {(metrics.totalToolSessions || 0).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            ATS scans, resume builds, cover letters & assessments
          </div>
        </div>

        {/* Avg Tokens / Tool Session */}
        <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-500/10 via-teal-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">
              Avg Tokens / Session
            </span>
            <div className="rounded-xl bg-teal-600 text-white p-2 shadow-xs">
              <Cpu size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-teal-950">
              {(metrics.avgTokensPerTool || 0).toLocaleString()}
            </span>
            <span className="text-xs font-bold text-teal-700">tokens/run</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            Mean AI token payload per tool interaction
          </div>
        </div>

        {/* Active Power Users */}
        <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-500/10 via-blue-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Active Token Consumers
            </span>
            <div className="rounded-xl bg-blue-600 text-white p-2 shadow-xs">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-blue-950">
              {metrics.activeTokenConsumersCount || 0}
            </span>
            <span className="text-xs font-bold text-blue-700">
              of {metrics.totalProfilesCount || 0} users
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            Candidates who performed 1+ AI tool operations
          </div>
        </div>
      </div>

      {/* Cross-Tool Engagement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* ATS Resume Checker */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">ATS Checker</span>
              <div className="rounded-lg bg-teal-50 p-1.5 text-teal-600">
                <FileCheck2 size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-slate-900">
              {tools.ats?.totalScans || 0}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Total Resumes Scanned</div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Avg ATS Score:</span>
              <span className="font-bold text-teal-700">{tools.ats?.avgScore || 74}/100</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Unique Users:</span>
              <span className="font-bold text-slate-900">{tools.ats?.activeUsers || 0}</span>
            </div>
          </div>
        </div>

        {/* AI Resume Builder */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Resume Builder</span>
              <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600">
                <FileText size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-slate-900">
              {tools.resumeBuilder?.totalResumes || 0}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Resumes Created</div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Active Creators:</span>
              <span className="font-bold text-blue-700">
                {tools.resumeBuilder?.activeUsers || 0}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Templates:</span>
              <span className="font-bold text-slate-900">10+ Styles</span>
            </div>
          </div>
        </div>

        {/* AI Cover Letter */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Cover Letters</span>
              <div className="rounded-lg bg-purple-50 p-1.5 text-purple-600">
                <Sparkles size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-slate-900">
              {tools.coverLetter?.totalLetters || 0}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Letters Tailored</div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Active Users:</span>
              <span className="font-bold text-purple-700">
                {tools.coverLetter?.activeUsers || 0}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Job Tailoring:</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
          </div>
        </div>

        {/* Certifi Assessments */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Certifi Tests</span>
              <div className="rounded-lg bg-amber-50 p-1.5 text-amber-600">
                <Award size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-slate-900">
              {tools.certifi?.totalTests || 0}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Skill Tests Evaluated</div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Active Testers:</span>
              <span className="font-bold text-amber-700">{tools.certifi?.activeUsers || 0}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Badge Verification:</span>
              <span className="font-bold text-slate-900">Active</span>
            </div>
          </div>
        </div>

        {/* Career Assessment */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Career Compass</span>
              <div className="rounded-lg bg-indigo-50 p-1.5 text-indigo-600">
                <Compass size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-slate-900">
              {tools.careerAssessment?.totalAssessments || 0}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Assessments Completed</div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Candidates:</span>
              <span className="font-bold text-indigo-700">
                {tools.careerAssessment?.activeUsers || 0}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Track Mapping:</span>
              <span className="font-bold text-emerald-600">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top AI Token Power-Users Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Top 10 AI Token Power-Users & Consumption Audit
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Live ranking of candidates utilizing AI models for ATS resume scans and cover letter generations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              <RefreshCw size={12} className={loading ? "animate-spin text-purple-600" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-3.5 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Download size={13} />
              <span>Export Power-Users</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Rank & Candidate</th>
                <th className="px-4 py-3.5">Plan</th>
                <th className="px-4 py-3.5">Tokens Burned</th>
                <th className="px-4 py-3.5">Tool Runs</th>
                <th className="px-4 py-3.5">Remaining Balance</th>
                <th className="px-5 py-3.5 text-right">Burn Intensity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw size={24} className="mx-auto animate-spin text-purple-600 mb-2" />
                    <span className="font-semibold">Calculating token consumption...</span>
                  </td>
                </tr>
              ) : topConsumers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No token activity recorded yet.
                  </td>
                </tr>
              ) : (
                topConsumers.map((c, idx) => {
                  const maxBurn = topConsumers[0]?.tokensBurned || 1;
                  const percent = Math.min(100, Math.round((c.tokensBurned / maxBurn) * 100));

                  return (
                    <tr
                      key={c.clerkUserId}
                      className="hover:bg-slate-50/60 transition-colors cursor-default"
                    >
                      {/* Rank & Candidate */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-7 w-7 rounded-lg font-black text-xs flex items-center justify-center ${
                              idx === 0
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : idx === 1
                                ? "bg-slate-200 text-slate-800"
                                : idx === 2
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{idx + 1}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-tight">{c.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{c.email}</div>
                            {c.phone && (
                              <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-600">
                                <span>📞 {c.phone}</span>
                                <button
                                  type="button"
                                  onClick={(e) => handleCopy(c.phone, e)}
                                  className="text-slate-400 hover:text-purple-600"
                                  title="Copy phone"
                                >
                                  {copiedPhone === c.phone ? (
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

                      {/* Plan */}
                      <td className="px-4 py-4">
                        {c.plan === "partner" && (
                          <span className="rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase">
                            Partner
                          </span>
                        )}
                        {c.plan === "intern" && (
                          <span className="rounded-md bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 text-[10px] font-bold uppercase">
                            Intern
                          </span>
                        )}
                        {c.plan === "student" && (
                          <span className="rounded-md bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 text-[10px] font-bold uppercase">
                            Student
                          </span>
                        )}
                        {(!c.plan || c.plan === "free") && (
                          <span className="rounded-md bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px] font-bold uppercase">
                            Free
                          </span>
                        )}
                      </td>

                      {/* Tokens Burned */}
                      <td className="px-4 py-4">
                        <span className="font-black text-slate-900 text-xs">
                          {c.tokensBurned.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-purple-600 font-bold ml-1">tokens</span>
                      </td>

                      {/* Tool Runs */}
                      <td className="px-4 py-4 font-bold text-slate-700">
                        {c.operationsCount} runs
                      </td>

                      {/* Remaining Balance */}
                      <td className="px-4 py-4 font-mono text-xs font-bold text-slate-800">
                        {c.balanceRemaining.toLocaleString()}
                      </td>

                      {/* Intensity Bar */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="font-bold text-[10px] text-slate-500 w-7 text-right">
                            {percent}%
                          </span>
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
    </div>
  );
}

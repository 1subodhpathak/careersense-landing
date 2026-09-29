import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Zap, 
  Eye, 
  ShieldCheck, 
  Users, 
  Flame, 
  Coins, 
  TrendingUp,
  FileText,
  Target,
  Mail,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  ArrowUpDown,
  CalendarDays
} from "lucide-react";

export default function UserDirectoryCrm({
  candidates = [],
  metrics = {},
  loading = false,
  onRefresh,
  onSelectCandidate,
  onOpenTokenModal,
  adminEmail
}) {
  const safeMetrics = metrics || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedTokenFilter, setSelectedTokenFilter] = useState("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Filter & Search Candidates (Purely in-memory, instant response)
  const filteredCandidates = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    let result = candidates.filter((c) => {
      // 1. Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          c.email?.toLowerCase().includes(q) ||
          c.fullName?.toLowerCase().includes(q) ||
          c.clerkUserId?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Plan Filter
      if (selectedPlan !== "all") {
        if (selectedPlan === "paid") {
          if (!c.subscription.isPaid) return false;
        } else if (c.subscription.plan?.toLowerCase() !== selectedPlan.toLowerCase()) {
          return false;
        }
      }

      // 3. Token Filter
      if (selectedTokenFilter === "low") {
        if (c.subscription.tokensRemaining >= 5000 || c.subscription.isPaid) return false;
      } else if (selectedTokenFilter === "zero") {
        if (c.subscription.tokensRemaining > 0 || c.subscription.isPaid) return false;
      } else if (selectedTokenFilter === "active_burners") {
        if (c.subscription.tokensUsed <= 0) return false;
      }

      // 4. Date Filter
      if (selectedDateFilter !== "all" && c.createdAt) {
        const itemTime = new Date(c.createdAt).getTime();

        if (selectedDateFilter === "today") {
          if (itemTime < startOfToday) return false;
        } else if (selectedDateFilter === "yesterday") {
          const startOfYesterday = startOfToday - oneDayMs;
          if (itemTime < startOfYesterday || itemTime >= startOfToday) return false;
        } else if (selectedDateFilter === "7d") {
          const sevenDaysAgo = now.getTime() - 7 * oneDayMs;
          if (itemTime < sevenDaysAgo) return false;
        } else if (selectedDateFilter === "30d") {
          const thirtyDaysAgo = now.getTime() - 30 * oneDayMs;
          if (itemTime < thirtyDaysAgo) return false;
        } else if (selectedDateFilter === "this_month") {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
          if (itemTime < startOfMonth) return false;
        } else if (selectedDateFilter === "custom") {
          if (customStartDate) {
            const startLimit = new Date(customStartDate).getTime();
            if (itemTime < startLimit) return false;
          }
          if (customEndDate) {
            const endLimit = new Date(customEndDate).getTime() + oneDayMs - 1; // inclusive end of day
            if (itemTime > endLimit) return false;
          }
        }
      }

      return true;
    });

    // 5. Sorting
    result.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [
    candidates,
    searchQuery,
    selectedPlan,
    selectedTokenFilter,
    selectedDateFilter,
    customStartDate,
    customEndDate,
    sortOrder
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredCandidates.length / pageSize) || 1;
  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCandidates.slice(start, start + pageSize);
  }, [filteredCandidates, currentPage, pageSize]);

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      "Index",
      "Full Name",
      "Email",
      "Clerk ID",
      "Plan",
      "Subscription Status",
      "Tokens Remaining",
      "Tokens Used",
      "Resumes Count",
      "ATS Scans Count",
      "Cover Letters Count",
      "Certificates Count",
      "Assessment Completed",
      "Registration Date",
      "Source"
    ];

    const rows = filteredCandidates.map((c, idx) => [
      idx + 1,
      `"${(c.fullName || "").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${c.clerkUserId}"`,
      `"${c.subscription.plan}"`,
      `"${c.subscription.status}"`,
      c.subscription.tokensRemaining,
      c.subscription.tokensUsed,
      c.activity.resumesCount,
      c.activity.atsScansCount,
      c.activity.coverLettersCount,
      c.activity.certificationsCount,
      c.activity.hasCompletedAssessment ? "Yes" : "No",
      `"${c.createdAt ? new Date(c.createdAt).toISOString() : ""}"`,
      `"${c.source || "CareerSense"}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `careersense-candidates-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const planBadges = {
    free: { label: "Free", color: "bg-slate-100 text-slate-700 border-slate-200" },
    student: { label: "Student", color: "bg-blue-50 text-blue-700 border-blue-200" },
    intern: { label: "Intern", color: "bg-teal-50 text-teal-700 border-teal-200" },
    partner: { label: "Partner", color: "bg-amber-50 text-amber-800 border-amber-300 font-black shadow-2xs" }
  };

  const isInitialLoading = loading && candidates.length === 0;

  return (
    <div className="space-y-6">
      {/* ── Top Metric Cards Strip (Light theme matching dashboard) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Registered */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Profiles</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={16} />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="mt-3 space-y-2">
              <div className="h-7 w-20 bg-slate-200/70 rounded-lg animate-pulse" />
              <div className="h-3 w-28 bg-slate-100 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="mt-2 text-2xl font-black text-slate-900">{safeMetrics.totalUsers || candidates.length}</div>
              <div className="mt-1 text-[11px] font-semibold text-slate-400">Registered candidates</div>
            </>
          )}
        </div>

        {/* Paid Subscriptions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Paid Subscribers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck size={16} />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="mt-3 space-y-2">
              <div className="h-7 w-16 bg-slate-200/70 rounded-lg animate-pulse" />
              <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="mt-2 text-2xl font-black text-amber-600">{safeMetrics.paidUsersCount || 0}</div>
              <div className="mt-1 text-[11px] font-semibold text-slate-400">Student / Intern / Partner</div>
            </>
          )}
        </div>

        {/* Active Token Burners */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active AI Users</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Zap size={16} fill="currentColor" />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="mt-3 space-y-2">
              <div className="h-7 w-16 bg-slate-200/70 rounded-lg animate-pulse" />
              <div className="h-3 w-28 bg-slate-100 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="mt-2 text-2xl font-black text-teal-600">{safeMetrics.activeTokenBurnersCount || 0}</div>
              <div className="mt-1 text-[11px] font-semibold text-slate-400">Consuming AI tools</div>
            </>
          )}
        </div>

        {/* Hot Leads (<5k tokens left) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">High Priority Leads</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Flame size={16} />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="mt-3 space-y-2">
              <div className="h-7 w-16 bg-slate-200/70 rounded-lg animate-pulse" />
              <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="mt-2 text-2xl font-black text-rose-600">{safeMetrics.lowTokenUsersCount || 0}</div>
              <div className="mt-1 text-[11px] font-semibold text-slate-400">&lt; 5k tokens remaining</div>
            </>
          )}
        </div>

        {/* Total AI Tokens Consumed */}
        <div className="col-span-2 lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tokens Burned</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Coins size={16} />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="mt-3 space-y-2">
              <div className="h-7 w-20 bg-slate-200/70 rounded-lg animate-pulse" />
              <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="mt-2 text-2xl font-black text-purple-700">
                {((safeMetrics.totalTokensConsumed || 0) / 1000).toFixed(0)}k
              </div>
              <div className="mt-1 text-[11px] font-semibold text-slate-400">Total platform AI usage</div>
            </>
          )}
        </div>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search candidate name, email or clerk ID..."
            className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Plan Dropdown */}
          <select
            value={selectedPlan}
            onChange={(e) => {
              setSelectedPlan(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-300 bg-[#f8fafc] px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition cursor-pointer"
          >
            <option value="all">All Plans {candidates.length > 0 ? `(${candidates.length})` : ""}</option>
            <option value="free">Free Tier Only</option>
            <option value="paid">Paid Plans (All)</option>
            <option value="student">Student Plan</option>
            <option value="intern">Intern Track</option>
            <option value="partner">Partner Program</option>
          </select>

          {/* Token Filter Pills */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-[#f8fafc] p-1">
            <button
              type="button"
              onClick={() => {
                setSelectedTokenFilter("all");
                setCurrentPage(1);
              }}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                selectedTokenFilter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedTokenFilter("low");
                setCurrentPage(1);
              }}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                selectedTokenFilter === "low" ? "bg-rose-50 text-rose-700 font-extrabold border border-rose-200" : "text-slate-500 hover:text-rose-600"
              }`}
            >
              🔥 &lt; 5k Left
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedTokenFilter("active_burners");
                setCurrentPage(1);
              }}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                selectedTokenFilter === "active_burners" ? "bg-teal-50 text-teal-700 font-extrabold border border-teal-200" : "text-slate-500 hover:text-teal-700"
              }`}
            >
              Active Burners
            </button>
          </div>

          {/* Date Filter Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-[#f8fafc] px-3 py-1.5 text-xs font-bold text-slate-700">
            <Calendar size={13} className="text-slate-400 shrink-0" />
            <select
              value={selectedDateFilter}
              onChange={(e) => {
                setSelectedDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer py-1"
            >
              <option value="all">All Dates (Joined)</option>
              <option value="today">Joined Today</option>
              <option value="yesterday">Joined Yesterday</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="this_month">This Month</option>
              <option value="custom">Custom Date Range...</option>
            </select>
          </div>

          {/* Custom Date Inputs (Appears when Custom is selected) */}
          {selectedDateFilter === "custom" && (
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 py-1 shadow-2xs">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => {
                  setCustomStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700 outline-none focus:border-teal-500"
              />
              <span className="text-[11px] font-bold text-slate-400">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => {
                  setCustomEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700 outline-none focus:border-teal-500"
              />
            </div>
          )}

          {/* Sort Order Toggle */}
          <button
            type="button"
            onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
            title={sortOrder === "newest" ? "Sorting: Newest Joined First" : "Sorting: Oldest Joined First"}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowUpDown size={13} className="text-teal-600" />
            <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
          </button>

          {/* Export to CSV Button */}
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={candidates.length === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer disabled:opacity-40"
          >
            <Download size={14} className="text-teal-600" />
            <span>Export CSV</span>
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={`text-slate-600 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── Candidates Data Roster Table ── */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Plan & Status</th>
                <th className="py-3.5 px-4">AI Token Balance</th>
                <th className="py-3.5 px-4">Tool Activity</th>
                <th 
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-800 select-none transition"
                  onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                >
                  <div className="flex items-center gap-1">
                    <span>Registered</span>
                    <ArrowUpDown size={11} className="text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isInitialLoading ? (
                [...Array(7)].map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-slate-100/80">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-200/80 shrink-0" />
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="h-3.5 w-36 bg-slate-200/80 rounded" />
                          <div className="h-2.5 w-48 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-6 w-20 bg-slate-200/70 rounded-lg" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-36 space-y-1.5">
                        <div className="h-3.5 w-24 bg-slate-200/80 rounded" />
                        <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-9 bg-slate-100 rounded-md" />
                        <div className="h-5 w-9 bg-slate-100 rounded-md" />
                        <div className="h-5 w-9 bg-slate-100 rounded-md" />
                        <div className="h-5 w-9 bg-slate-100 rounded-md" />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-3.5 w-20 bg-slate-100 rounded" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <div className="h-7 w-16 bg-slate-100 rounded-lg" />
                        <div className="h-7 w-16 bg-slate-200/70 rounded-lg" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : paginatedCandidates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-slate-400">
                    <Users className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-sm font-bold text-slate-700">No candidates match your current filter.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedDateFilter !== "all" 
                        ? `A Date filter ("${selectedDateFilter}") is currently active. Try clearing or expanding your date range.`
                        : "Try checking your spelling or resetting active plan & token filters."
                      }
                    </p>
                    {(searchQuery || selectedPlan !== "all" || selectedTokenFilter !== "all" || selectedDateFilter !== "all") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedPlan("all");
                          setSelectedTokenFilter("all");
                          setSelectedDateFilter("all");
                          setCustomStartDate("");
                          setCustomEndDate("");
                          setCurrentPage(1);
                        }}
                        className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl bg-[#0b132b] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedCandidates.map((candidate) => {
                  const sub = candidate.subscription;
                  const planConfig = planBadges[sub.plan] || planBadges.free;
                  const tokenPercent = Math.min(100, Math.max(0, (sub.tokensRemaining / sub.initialTokens) * 100));
                  
                  // Color coding token progress
                  const isCritical = sub.tokensRemaining < 5000 && !sub.isPaid;
                  const isZero = sub.tokensRemaining <= 0;
                  const tokenColor = isZero
                    ? "bg-rose-500 text-rose-700"
                    : isCritical
                      ? "bg-amber-500 text-amber-700"
                      : "bg-teal-500 text-teal-700";

                  return (
                    <tr 
                      key={candidate.id || candidate.clerkUserId} 
                      className="group hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Candidate Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {candidate.avatarUrl ? (
                            <img src={candidate.avatarUrl} alt="" className="h-9 w-9 rounded-xl object-cover ring-1 ring-slate-200" />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-700 text-xs ring-1 ring-slate-200">
                              {(candidate.fullName?.[0] || candidate.email?.[0] || "U").toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center gap-1.5 truncate">
                              <span>{candidate.fullName}</span>
                              {sub.isPaid && (
                                <ShieldCheck size={14} className="text-amber-500 shrink-0" />
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plan & Status */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center gap-1 w-fit rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${planConfig.color}`}>
                            {planConfig.label}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 capitalize">
                            {sub.billingCycle} • {sub.status}
                          </span>
                        </div>
                      </td>

                      {/* AI Token Balance */}
                      <td className="py-3.5 px-4">
                        <div className="w-36 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-extrabold">
                            <span className={isCritical || isZero ? "text-rose-600 font-black" : "text-slate-800"}>
                              {sub.tokensRemaining.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              / {(sub.initialTokens / 1000).toFixed(0)}k
                            </span>
                          </div>
                          {/* Progress Bar */}
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/80">
                            <div
                              className={`h-full transition-all duration-300 ${isZero ? "bg-rose-500" : isCritical ? "bg-amber-500" : "bg-teal-500"}`}
                              style={{ width: `${tokenPercent}%` }}
                            />
                          </div>
                          {isCritical && (
                            <div className="text-[9px] font-black uppercase text-rose-600 tracking-wider flex items-center gap-1">
                              <Flame size={10} />
                              Near Limit
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Tool Activity Matrix */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {/* Resumes */}
                          <span 
                            title={`Resumes Created: ${candidate.activity.resumesCount}`}
                            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${
                              candidate.activity.resumesCount > 0
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-slate-50 text-slate-400 border-slate-200"
                            }`}
                          >
                            <FileText size={12} />
                            {candidate.activity.resumesCount}
                          </span>

                          {/* ATS Scans */}
                          <span 
                            title={`ATS Scans Run: ${candidate.activity.atsScansCount}`}
                            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${
                              candidate.activity.atsScansCount > 0
                                ? "bg-teal-50 text-teal-700 border-teal-200"
                                : "bg-slate-50 text-slate-400 border-slate-200"
                            }`}
                          >
                            <Target size={12} />
                            {candidate.activity.atsScansCount}
                          </span>

                          {/* Cover Letters */}
                          <span 
                            title={`Cover Letters: ${candidate.activity.coverLettersCount}`}
                            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${
                              candidate.activity.coverLettersCount > 0
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-slate-50 text-slate-400 border-slate-200"
                            }`}
                          >
                            <Mail size={12} />
                            {candidate.activity.coverLettersCount}
                          </span>

                          {/* Certifications */}
                          <span 
                            title={`Certificates: ${candidate.activity.certificationsCount}`}
                            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${
                              candidate.activity.certificationsCount > 0
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-slate-50 text-slate-400 border-slate-200"
                            }`}
                          >
                            <Award size={12} />
                            {candidate.activity.certificationsCount}
                          </span>
                        </div>
                      </td>

                      {/* Registered Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        <div className="font-semibold text-slate-700">{candidate.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : "N/A"}</div>
                        <div className="text-[10px] text-slate-400">{candidate.source || "CareerSense"}</div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 360 Dossier Button */}
                          <button
                            type="button"
                            onClick={() => onSelectCandidate(candidate.clerkUserId)}
                            title="Open 360° Candidate Profile Drawer"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                          >
                            <Eye size={13} className="text-teal-600" />
                            <span className="hidden sm:inline">Dossier</span>
                          </button>

                          {/* Token Grant Button */}
                          <button
                            type="button"
                            onClick={() => onOpenTokenModal(candidate)}
                            title="Adjust Tokens or Upgrade Plan"
                            className="inline-flex items-center gap-1 rounded-lg bg-[#0b132b] hover:bg-slate-800 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-2xs transition active:scale-95 cursor-pointer"
                          >
                            <Zap size={13} fill="currentColor" className="text-amber-400" />
                            <span className="hidden sm:inline">Grant</span>
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

        {/* ── Pagination Footer ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 text-xs text-slate-500 gap-3">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredCandidates.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-bold text-slate-800">{Math.min(currentPage * pageSize, filteredCandidates.length)}</span> of{" "}
            <span className="font-bold text-slate-800">{filteredCandidates.length}</span> candidates
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 font-bold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

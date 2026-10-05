import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  Layers,
  Users,
  Award,
  Zap,
  ArrowUpRight,
  FileSpreadsheet
} from "lucide-react";

export default function FinancialLedgerMonetization({ adminEmail }) {
  const [monetizationData, setMonetizationData] = useState({
    metrics: {
      totalGmv: 0,
      mrr: 0,
      activePaidSubCount: 0,
      passRevenue: 0,
      passesCount: 0,
      fellowshipRevenue: 0,
      fellowshipCount: 0,
      tokenAddonRevenue: 0,
      tierDistribution: { free: 0, student: 0, intern: 0, partner: 0 },
      totalTransactionsCount: 0
    },
    transactions: []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [copiedText, setCopiedText] = useState(null);

  const fetchMonetization = useCallback(async () => {
    setLoading(true);
    try {
      const apiBase =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "https://server.datasenseai.com";

      const res = await fetch(`${apiBase}/careersense/admin/monetization`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setMonetizationData(data);
      }
    } catch (err) {
      console.error("Failed to load monetization data:", err);
    } finally {
      setLoading(false);
    }
  }, [adminEmail]);

  useEffect(() => {
    fetchMonetization();
  }, [fetchMonetization]);

  const handleCopy = (text, e) => {
    e.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const { metrics, transactions } = monetizationData;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = tx.customerName?.toLowerCase().includes(q);
        const matchEmail = tx.customerEmail?.toLowerCase().includes(q);
        const matchPhone = tx.customerPhone?.toLowerCase().includes(q);
        const matchId = tx.id?.toLowerCase().includes(q);
        const matchItem = tx.item?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchId && !matchItem) return false;
      }
      return true;
    });
  }, [transactions, typeFilter, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredTransactions.length) return;
    const headers = [
      "Transaction ID",
      "Date",
      "Customer Name",
      "Customer Email",
      "Customer Phone",
      "Product / Plan",
      "Amount (INR)",
      "Currency",
      "Payment Status",
      "Gateway Reference"
    ];

    const rows = filteredTransactions.map((tx) => [
      `"${tx.id || ""}"`,
      `"${tx.createdAt ? new Date(tx.createdAt).toISOString() : ""}"`,
      `"${tx.customerName || ""}"`,
      `"${tx.customerEmail || ""}"`,
      `"${tx.customerPhone || ""}"`,
      `"${tx.item || ""}"`,
      tx.amount || 0,
      `"INR"`,
      `"${tx.status || "Captured"}"`,
      `"${tx.gatewayRef || ""}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `financial_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalUsers =
    (metrics.tierDistribution?.free || 0) +
    (metrics.tierDistribution?.student || 0) +
    (metrics.tierDistribution?.intern || 0) +
    (metrics.tierDistribution?.partner || 0);

  return (
    <div className="space-y-6">
      {/* Top Financial KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Monthly Recurring (MRR)
            </span>
            <div className="rounded-xl bg-amber-500 text-white p-2 shadow-xs">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">
              ₹{(metrics.mrr || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Live Subscriptions
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            Generated from {metrics.activePaidSubCount || 0} active recurring subscribers
          </div>
        </div>

        {/* Estimated Total GMV */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Platform Gross Revenue (GMV)
            </span>
            <div className="rounded-xl bg-slate-900 text-white p-2">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-slate-900">
              ₹{(metrics.totalGmv || 0).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            Cumulative total across passes, subscriptions & fellowships
          </div>
        </div>

        {/* ₹1 Resume Passes */}
        <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-500/10 via-teal-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">
              ₹1 Instant Download Passes
            </span>
            <div className="rounded-xl bg-teal-600 text-white p-2 shadow-xs">
              <Download size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-teal-950">
              {metrics.passesCount || 0} Passes
            </span>
            <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
              ₹{metrics.passRevenue || 0}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            100% conversion on instant watermark-free exports
          </div>
        </div>

        {/* Fellowship Tuition */}
        <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-500/10 via-purple-50/40 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
              Fellowship Tuition Revenue
            </span>
            <div className="rounded-xl bg-purple-600 text-white p-2 shadow-xs">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-purple-950">
              ₹{(metrics.fellowshipRevenue || 0).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            {metrics.fellowshipCount || 0} fellows enrolled across tracks
          </div>
        </div>
      </div>

      {/* Subscription Tier Distribution Visualizer */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Subscription Tier Distribution & Monetization Mix
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Live breakdown of customer plan distribution across {totalUsers} registered accounts.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {metrics.activePaidSubCount || 0} Paid Subscribers (
            {totalUsers > 0
              ? (((metrics.activePaidSubCount || 0) / totalUsers) * 100).toFixed(1)
              : 0}
            %)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Free Tier */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase">Free Starter</span>
              <span className="text-xs font-bold text-slate-400">₹0/mo</span>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              {metrics.tierDistribution?.free || 0}
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-slate-400 rounded-full"
                style={{
                  width: `${totalUsers ? ((metrics.tierDistribution?.free || 0) / totalUsers) * 100 : 0}%`
                }}
              />
            </div>
            <div className="mt-1.5 text-[10px] text-slate-400 font-medium">
              30k free countdown tokens
            </div>
          </div>

          {/* Student Tier */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase">Student Plan</span>
              <span className="text-xs font-extrabold text-blue-700">₹199/mo</span>
            </div>
            <div className="mt-2 text-2xl font-black text-blue-900">
              {metrics.tierDistribution?.student || 0}
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-blue-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${totalUsers ? ((metrics.tierDistribution?.student || 0) / totalUsers) * 100 : 0}%`
                }}
              />
            </div>
            <div className="mt-1.5 text-[10px] text-blue-600 font-medium">
              150k monthly tokens
            </div>
          </div>

          {/* Intern Tier */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 uppercase">Intern Plan</span>
              <span className="text-xs font-extrabold text-teal-700">₹499/mo</span>
            </div>
            <div className="mt-2 text-2xl font-black text-teal-900">
              {metrics.tierDistribution?.intern || 0}
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-teal-100 overflow-hidden">
              <div
                className="h-full bg-teal-600 rounded-full"
                style={{
                  width: `${totalUsers ? ((metrics.tierDistribution?.intern || 0) / totalUsers) * 100 : 0}%`
                }}
              />
            </div>
            <div className="mt-1.5 text-[10px] text-teal-600 font-medium">
              500k monthly tokens
            </div>
          </div>

          {/* Partner Tier */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase">Partner Plan</span>
              <span className="text-xs font-extrabold text-amber-700">₹999/mo</span>
            </div>
            <div className="mt-2 text-2xl font-black text-amber-900">
              {metrics.tierDistribution?.partner || 0}
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-amber-100 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{
                  width: `${totalUsers ? ((metrics.tierDistribution?.partner || 0) / totalUsers) * 100 : 0}%`
                }}
              />
            </div>
            <div className="mt-1.5 text-[10px] text-amber-600 font-medium">
              1M monthly tokens + tracks
            </div>
          </div>
        </div>
      </div>

      {/* Unified Transaction Stream & Ledger */}
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Search */}
            <div className="relative min-w-[240px] flex-1 max-w-md">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by customer, email, phone, reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-amber-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Products / Transactions</option>
              <option value="subscription">Subscriptions</option>
              <option value="download_pass">₹1 Instant PDF Passes</option>
              <option value="fellowship_fee">Fellowship Tuition Fees</option>
              <option value="token_addon">AI Token Top-ups</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMonetization}
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
              <FileSpreadsheet size={14} />
              <span>Export Ledger</span>
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Transaction & Date</th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Item / Plan</th>
                  <th className="px-4 py-3.5">Amount</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Gateway Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <RefreshCw size={24} className="mx-auto animate-spin text-amber-600 mb-2" />
                      <span className="font-semibold">Loading financial ledger...</span>
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <CreditCard size={32} className="mx-auto text-slate-300 mb-2" />
                      <div className="font-bold text-slate-700">No transactions found</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        No transactions match your current search or filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/60 transition-colors group cursor-default"
                    >
                      {/* Transaction ID & Date */}
                      <td className="px-5 py-4">
                        <div className="font-mono text-xs font-bold text-slate-900">
                          {tx.id}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {tx.createdAt
                            ? new Date(tx.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })
                            : "—"}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-900 leading-tight">
                          {tx.customerName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {tx.customerEmail}
                        </div>
                        {tx.customerPhone && (
                          <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-600">
                            <span>📞 {tx.customerPhone}</span>
                            <button
                              type="button"
                              onClick={(e) => handleCopy(tx.customerPhone, e)}
                              className="text-slate-400 hover:text-amber-600"
                              title="Copy phone"
                            >
                              {copiedText === tx.customerPhone ? (
                                <Check size={11} className="text-emerald-600" />
                              ) : (
                                <Copy size={11} />
                              )}
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Item */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {tx.type === "subscription" && (
                            <span className="rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-bold">
                              Subscription
                            </span>
                          )}
                          {tx.type === "download_pass" && (
                            <span className="rounded-md bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 text-[10px] font-bold">
                              ₹1 Pass
                            </span>
                          )}
                          {tx.type === "fellowship_fee" && (
                            <span className="rounded-md bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 text-[10px] font-bold">
                              Fellowship
                            </span>
                          )}
                          {tx.type === "token_addon" && (
                            <span className="rounded-md bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 text-[10px] font-bold">
                              Token Addon
                            </span>
                          )}
                          <span className="font-bold text-slate-800 text-xs">{tx.item}</span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4">
                        <span className="text-sm font-black text-slate-900">
                          ₹{Number(tx.amount || 0).toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} />
                          <span>Captured</span>
                        </span>
                      </td>

                      {/* Gateway Reference */}
                      <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[140px]">{tx.gatewayRef}</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopy(tx.gatewayRef, e)}
                            className="text-slate-400 hover:text-slate-700"
                            title="Copy Gateway Ref"
                          >
                            {copiedText === tx.gatewayRef ? (
                              <Check size={11} className="text-emerald-600" />
                            ) : (
                              <Copy size={11} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

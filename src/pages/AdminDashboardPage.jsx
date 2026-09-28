import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { 
  ShieldAlert, 
  ShieldCheck, 
  MenuSquare, 
  LayoutDashboard, 
  Sparkles, 
  RefreshCw, 
  LogOut,
  GraduationCap,
  CreditCard,
  BarChart3,
  Loader2,
  Lock,
  ExternalLink
} from "lucide-react";
import AdminSidebar from "../components/admin/AdminSidebar";
import UserDirectoryCrm from "../components/admin/UserDirectoryCrm";
import CandidateDossierDrawer from "../components/admin/CandidateDossierDrawer";
import TokenGrantModal from "../components/admin/TokenGrantModal";

const ADMIN_EMAILS = [
  "pathaksubodh945@gmail.com",
  "support.careersense@gmail.com"
];

export default function AdminDashboardPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("users-crm");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Data state
  const [candidates, setCandidates] = useState([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    paidUsersCount: 0,
    activeTokenBurnersCount: 0,
    lowTokenUsersCount: 0,
    totalTokensConsumed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal / Drawer state
  const [selectedClerkId, setSelectedClerkId] = useState(null);
  const [tokenModalCandidate, setTokenModalCandidate] = useState(null);

  const userEmail = (
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    ""
  ).toLowerCase().trim();

  const isAdmin = ADMIN_EMAILS.includes(userEmail);

  const fetchUsers = useCallback(async () => {
    if (!isAdmin || !userEmail) return;
    setLoading(true);
    setError(null);
    try {
      const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
      const res = await fetch(`${apiBase}/careersense/admin/users`, {
        headers: {
          "x-admin-email": userEmail
        }
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch user directory");
      }
      setCandidates(data.candidates || []);
      if (data.metrics) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      setError(err.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, [isAdmin, userEmail]);

  useEffect(() => {
    if (isLoaded && isAdmin) {
      fetchUsers();
    }
  }, [isLoaded, isAdmin, fetchUsers]);

  // Handle non-admin or loading state
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc] text-slate-800 font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-teal-600" />
          <p className="text-xs font-bold text-slate-500">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc] p-6 text-slate-800 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-200">
            <Lock size={28} />
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900">Admin Clearance Required</h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            The account <span className="font-bold text-teal-700">{userEmail || "current user"}</span> does not have administrative privileges for the CareerSense Admin Control Center.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b132b] hover:bg-slate-800 px-5 py-3 text-xs font-bold text-white shadow-xs transition active:scale-95"
            >
              <LayoutDashboard size={15} />
              Return to Candidate Dashboard
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] font-sans antialiased text-slate-800">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        metrics={metrics}
        userEmail={userEmail}
        adminUser={user}
      />

      {/* Main Workspace Area */}
      <section className="relative flex flex-1 flex-col overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f8fafc]">
        {/* Top Header Bar */}
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <MenuSquare size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {activeTab === "users-crm" && "User Directory & Candidate CRM"}
                  {activeTab === "submissions" && "Fellowship Submissions Hub"}
                  {activeTab === "monetization" && "Financial Ledger & Monetization"}
                  {activeTab === "analytics" && "Platform & Tool Usage Analytics"}
                </h1>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold uppercase hidden sm:inline-flex">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Central management node for candidate profiles, live token countdown balances, and administrative controls.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
              <div className="h-7 w-7 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <div className="leading-none">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Super Admin</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{userEmail}</div>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0b132b] hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <LayoutDashboard size={14} className="text-cyan-400" />
              <span>Candidate Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="w-full max-w-7xl mx-auto space-y-6">
          {/* Module 1: User Directory CRM */}
          {activeTab === "users-crm" && (
            <UserDirectoryCrm
              candidates={candidates}
              metrics={metrics}
              loading={loading}
              onRefresh={fetchUsers}
              onSelectCandidate={(clerkId) => setSelectedClerkId(clerkId)}
              onOpenTokenModal={(candidate) => setTokenModalCandidate(candidate)}
              adminEmail={userEmail}
            />
          )}

          {/* Module 2: Fellowship Submissions (Upcoming) */}
          {activeTab === "submissions" && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs">
                <GraduationCap size={28} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">Module 2: Fellowship Submissions Review Hub</h2>
              <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-500">
                Rubric-based evaluation queue for reviewing capstone projects, video walkthroughs, and issuing verifiable certificates across all 6 career tracks.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700">
                <span>Next in queue for implementation</span>
              </div>
            </div>
          )}

          {/* Module 3: Financial Ledger (Upcoming) */}
          {activeTab === "monetization" && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-2xs">
                <CreditCard size={28} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">Module 3: Platform Monetization & Financial Ledger</h2>
              <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-500">
                Razorpay payment audits, recurring subscription MRR metrics, ₹1 export pass ledgers, and token top-up sales analytics.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700">
                <span>Coming in Step 3</span>
              </div>
            </div>
          )}

          {/* Module 4: Platform Analytics (Upcoming) */}
          {activeTab === "analytics" && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-2xs">
                <BarChart3 size={28} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">Module 4: Cross-Platform & AI Tool Analytics</h2>
              <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-500">
                ATS keyword mismatch trends, resume template usage rates, assessment difficulty curves, and conversion funnel cohorts.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-bold text-purple-700">
                <span>Coming in Step 4</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 360° Candidate Dossier Side Drawer */}
      <CandidateDossierDrawer
        isOpen={!!selectedClerkId}
        onClose={() => setSelectedClerkId(null)}
        clerkId={selectedClerkId}
        onOpenTokenModal={(cand) => {
          setSelectedClerkId(null);
          setTokenModalCandidate(cand);
        }}
        adminEmail={userEmail}
      />

      {/* Manual Token Grant & Plan Upgrade Modal */}
      <TokenGrantModal
        isOpen={!!tokenModalCandidate}
        onClose={() => setTokenModalCandidate(null)}
        candidate={tokenModalCandidate}
        onSuccess={() => {
          fetchUsers();
        }}
        adminEmail={userEmail}
      />
    </div>
  );
}

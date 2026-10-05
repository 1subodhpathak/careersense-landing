import React from "react";
import {
  Users,
  FileCheck2,
  CreditCard,
  BarChart3,
  ShieldAlert,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Compass,
  GraduationCap,
  X,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import CSLogo from "../../Assets/CSlogo.png";

const navItems = [
  {
    id: "users-crm",
    label: "User Directory CRM",
    description: "Profiles, tokens & activity",
    icon: Users,
    badge: "Live",
    badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200"
  },
  {
    id: "submissions",
    label: "Fellowship Submissions",
    description: "6 Career Tracks Capstones",
    icon: GraduationCap,
    badge: "Live",
    badgeClass: "bg-blue-50 text-blue-700 border border-blue-200",
    disabled: false
  },
  {
    id: "partner-submissions",
    label: "Partner Submissions",
    description: "20 Startup Milestones",
    icon: Briefcase,
    badge: "Live",
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
    disabled: false
  },
  {
    id: "monetization",
    label: "Financial Ledger",
    description: "Orders, passes & MRR",
    icon: CreditCard,
    badge: "Live",
    badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    disabled: false
  },
  {
    id: "analytics",
    label: "Platform Analytics",
    description: "Tool engagement & funnel",
    icon: BarChart3,
    badge: "Live",
    badgeClass: "bg-purple-50 text-purple-700 border border-purple-200",
    disabled: false
  }
];

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  metrics,
  userEmail,
  adminUser
}) {
  const username = adminUser?.fullName || adminUser?.username || userEmail || "Admin User";
  const userInitials = adminUser?.firstName && adminUser?.lastName
    ? `${adminUser.firstName[0]}${adminUser.lastName[0]}`.toUpperCase()
    : username.substring(0, 2).toUpperCase();

  const safeMetrics = metrics || {};

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container (matching candidate dashboard #0b132b theme) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-slate-900 bg-[#0b132b] p-5 text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 lg:static lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Brand Header */}
          <div className="mb-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
              <div className="leading-none">
                <span className="text-[18px] font-black tracking-tight text-white">
                  Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
                </span>
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 mt-1 flex items-center gap-1">
                  <ShieldCheck size={11} className="inline" /> Admin Command
                </div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {/* Core Menu Section */}
          <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Control Center
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13.5px] font-medium transition-all cursor-pointer ${isSelected
                      ? "bg-[#1c2541] text-teal-400 border border-slate-700/50 shadow-xs"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                    }`}
                >
                  <Icon
                    size={18}
                    className={isSelected ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] font-bold truncate ${isSelected ? "text-teal-300" : "text-slate-300"}`}>
                      {item.label}
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics Widget Box */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-[#070e1e]/60 p-3.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              <span>Platform Roster</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-[#0b132b] p-2 border border-slate-800/80">
                <div className="text-[9px] font-bold text-slate-500 uppercase">Profiles</div>
                <div className="text-sm font-black text-white mt-0.5">{safeMetrics.totalUsers || 0}</div>
              </div>
              <div className="rounded-lg bg-[#0b132b] p-2 border border-slate-800/80">
                <div className="text-[9px] font-bold text-slate-500 uppercase">Paid Users</div>
                <div className="text-sm font-black text-amber-400 mt-0.5">{safeMetrics.paidUsersCount || 0}</div>
              </div>
              <div className="rounded-lg bg-[#0b132b] p-2 border border-slate-800/80">
                <div className="text-[9px] font-bold text-slate-500 uppercase">AI Burners</div>
                <div className="text-sm font-black text-cyan-400 mt-0.5">{safeMetrics.activeTokenBurnersCount || 0}</div>
              </div>
              <div className="rounded-lg bg-[#0b132b] p-2 border border-slate-800/80">
                <div className="text-[9px] font-bold text-slate-500 uppercase">&lt; 5k Tokens</div>
                <div className="text-sm font-black text-rose-400 mt-0.5">{safeMetrics.lowTokenUsersCount || 0}</div>
              </div>
            </div>
          </div>

          {/* Return to Candidate Dashboard Link */}
          <div className="mt-4">
            <Link
              to="/dashboard"
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-teal-500/20 bg-teal-500/[0.06] p-3 text-left hover:bg-teal-500/10 transition"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard size={15} className="text-teal-400" />
                <span className="text-xs font-bold text-white">Candidate Dashboard</span>
              </div>
              <ExternalLink size={13} className="text-teal-400" />
            </Link>
          </div>
        </div>

        {/* Bottom Profile User Bar */}
        <div className="mt-4 flex items-center gap-3 border-t border-slate-800 px-2 pt-4">
          {adminUser?.imageUrl ? (
            <img src={adminUser.imageUrl} alt={username} className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-xs font-black text-white">
              {userInitials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-bold text-white">{username}</div>
            <div className="truncate text-[10px] text-amber-400 font-bold uppercase">
              Super Admin Access
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

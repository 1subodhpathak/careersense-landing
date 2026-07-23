import React, { useState, useEffect } from "react";
import {
  FileText,
  FileSearch,
  BookOpen,
  MessageSquareText,
  ShieldCheck,
  Users,
  UserRound,
  CreditCard,
  LayoutDashboard,
  TrendingUp,
  Award,
  Coins,
  Zap,
  GraduationCap,
  Calendar,
  Clock,
  LogOut,
  Sparkles,
  CheckCircle2,
  Lock,
  MenuSquare,
  ChevronRight,
  ExternalLink,
  History,
  X,
  FileDown,
  Plus,          // Fixed: Added missing import
  AlertCircle    // Fixed: Added missing import
} from "lucide-react";
import { Link } from "react-router-dom";
import CSLogo from "../Assets/CSlogo.png";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FileText, label: "Resume Builder" },
    { icon: FileSearch, label: "ATS Checker" },
    { icon: BookOpen, label: "Cover Letters" },
    { icon: MessageSquareText, label: "Interview Practice" },
    { icon: ShieldCheck, label: "Certificates" },
    { icon: Users, label: "Community" },
    { icon: UserRound, label: "My Profile" },
    { icon: CreditCard, label: "Usage & Billing" },
  ];

  // --- DATA RESOLVER FOR DYNAMIC CONTENT SYSTEM ---
  const getTabDetailedData = () => {
    switch (activeTab) {
      case "Dashboard":
        return {
          title: "Platform Overview",
          subtitle: "Central control node for platform certifications, infrastructure usage tracking, and system tokens.",
          stats: [
            { label: "Career Readiness Score", value: "78%", status: "Good", color: "text-blue-600", bg: "bg-blue-50", icon: <TrendingUp size={16} /> },
            { label: "ATS Matching Average", value: "82%", status: "Great", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Sparkles size={16} /> },
            { label: "Verified Credentials", value: "4 Issued", status: "Synced", color: "text-indigo-600", bg: "bg-indigo-50", icon: <ShieldCheck size={16} /> },
            { label: "AI Compute Tokens", value: "420/500", status: "84% Free", color: "text-amber-600", bg: "bg-amber-50", icon: <Coins size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><History size={16} className="text-slate-400"/> Recent Activity Log</h3>
                  <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline">View All</span>
                </div>
                <div className="space-y-3.5">
                  {[
                    { event: "Mock Interview #3 Evaluation Finalized", time: "2 hours ago", metric: "Score: 84%", badgeColor: "bg-emerald-50 text-emerald-700" },
                    { event: "ATS Optimization Scan - Senior Data Analyst", time: "Yesterday", metric: "Match: 82%", badgeColor: "bg-blue-50 text-blue-700" },
                    { event: "Certificate Minted: Advanced Python Foundations", time: "3 days ago", metric: "ID: #9401", badgeColor: "bg-indigo-50 text-indigo-700" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                      <div>
                        <div className="font-semibold text-slate-800">{item.event}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.time}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${item.badgeColor}`}>{item.metric}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2"><GraduationCap size={16} className="text-slate-400"/> Contextual AI Roadmap Action</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Your career profile metrics indicate strong Python performance but missing relational cloud schema clusters. Fixing this target stack immediately optimizes your positioning match matrices.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-amber-100 text-amber-700 text-xs font-bold p-2 rounded-lg">!</div>
                    <div className="text-xs font-bold text-slate-700">Missing Core Stack Tag: PostgreSQL Enterprise</div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">Resolve <ChevronRight size={14}/></button>
                </div>
              </div>
            </div>
          )
        };

      case "Resume Builder":
        return {
          title: "AI Resume Builder Workspace",
          subtitle: "Compile, optimize syntax structuring, and export parsing-compliant master profiles.",
          stats: [
            { label: "Active Profiles", value: "2 Live", status: "Validated", color: "text-blue-600", bg: "bg-blue-50", icon: <FileText size={16} /> },
            { label: "Average Syntax Score", value: "88/100", status: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Award size={16} /> },
            { label: "Tailored Bullet Verbs", value: "24 Used", status: "Active", color: "text-purple-600", bg: "bg-purple-50", icon: <Sparkles size={16} /> },
            { label: "Compliant Export File", value: "PDF format", status: "Ready", color: "text-indigo-600", bg: "bg-indigo-50", icon: <CheckCircle2 size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Your Generated Resumes</h3>
                <button className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"><Plus size={14}/> Build New Layout</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
                      <th className="p-3">Profile Designation Name</th>
                      <th className="p-3">ATS Match Target</th>
                      <th className="p-3">Last Modified Timestamp</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 flex items-center gap-2"><FileText size={14} className="text-blue-500"/> Master Profile _ Analytics Engineer_2026</td>
                      <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">86% Index</span></td>
                      <td className="p-3 text-slate-400">Jul 8, 2026 • 02:14</td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-blue-600 hover:underline">Edit</button>
                        <button className="text-slate-400 hover:text-slate-600 inline-flex items-center gap-0.5"><FileDown size={12}/> Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 flex items-center gap-2"><FileText size={14} className="text-slate-400"/> Generic_General Startup Operations Copy</td>
                      <td className="p-3"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">71% Index</span></td>
                      <td className="p-3 text-slate-400">Jun 28, 2026 • 14:45</td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-blue-600 hover:underline">Edit</button>
                        <button className="text-slate-400 hover:text-slate-600 inline-flex items-center gap-0.5"><FileDown size={12}/> Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        };

      case "ATS Checker":
        return {
          title: "ATS Matrix Optimization Engine",
          subtitle: "Scan your configuration directly against customized system requirements to isolate keywords.",
          stats: [
            { label: "Target Scanned Matrix", value: "Data Analyst", status: "Active", color: "text-blue-600", bg: "bg-blue-50", icon: <LayoutDashboard size={16} /> },
            { label: "Keyword Matching Score", value: "82%", status: "Good Match", color: "text-emerald-600", bg: "bg-emerald-50", icon: <TrendingUp size={16} /> },
            { label: "Critical Core Deficits", value: "7 Keywords", status: "Action Required", color: "text-red-600", bg: "bg-red-50", icon: <AlertCircle size={16} /> },
            { label: "Density Ratio Profile", value: "Optimal", status: "Balanced", color: "text-indigo-600", bg: "bg-indigo-50", icon: <CheckCircle2 size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Identified Missing Technical Stacks</h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS Redshift", "ETL Pipelines", "Tableau Desktop Certification", "CI/CD Deployment", "PySpark Clusters", "Data Warehousing Schemas", "dbt Cloud"].map((tag, i) => (
                    <span key={i} className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">Upload Target Job Spec</h3>
                  <p className="text-[11px] text-slate-400 leading-normal mb-3">Paste the full corporate responsibilities listing here to verify parameters instantly.</p>
                  <textarea className="w-full h-24 border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none placeholder:text-slate-300" placeholder="Paste job requirements parameters..."></textarea>
                </div>
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl transition-all mt-2">Trigger Match Evaluation</button>
              </div>
            </div>
          )
        };

      case "Cover Letters":
        return {
          title: "Personalized Cover Letter Logs",
          subtitle: "Generate dynamic, company-specific cover letters highlighting matching credentials.",
          stats: [
            { label: "Total Asset Documents", value: "5 Saved", status: "Active", color: "text-blue-600", bg: "bg-blue-50", icon: <BookOpen size={16} /> },
            { label: "AI Tailoring Balance", value: "Unlimited", status: "Premium Enabled", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Sparkles size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[
                { org: "Google Cloud Division", position: "Data Solutions Architect", date: "Jul 7, 2026" },
                { org: "Stripe Infrastructure", position: "Metrics Lead Specialist", date: "Jul 2, 2026" },
                { org: "Snowflake Cloud Systems", position: "Developer Advocate - Analytics", date: "Jun 19, 2026" }
              ].map((doc, i) => (
                <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-xs flex flex-col justify-between h-40 hover:border-slate-300 transition-all">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{doc.org}</div>
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight mt-1 truncate">{doc.position}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Generated System Document: {doc.date}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3">
                    <button className="text-xs font-bold text-blue-600 hover:underline">Review Document</button>
                    <button className="text-xs font-medium text-slate-400 hover:text-slate-600"><FileDown size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          )
        };

      case "Interview Practice":
        return {
          title: "AI Interactive Simulator Room",
          subtitle: "Participate in evaluation modules mapped contextually to targeted corporate question sets.",
          stats: [
            { label: "Simulations Passed", value: "3 Completed", status: "Target: 5", color: "text-blue-600", bg: "bg-blue-50", icon: <MessageSquareText size={16} /> },
            { label: "Average Behavioral Rating", value: "Good Tier", status: "Consistent", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Award size={16} /> },
            { label: "Technical Execution", value: "76%", status: "Needs Work", color: "text-purple-600", bg: "bg-purple-50", icon: <TrendingUp size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Simulated Category Profiles</h3>
              <div className="space-y-4">
                {[
                  { name: "SQL Performance Tuning & Window Aggregations", total: "15 Questions", progress: "100%", color: "bg-emerald-500" },
                  { name: "Product Metrics Evaluation & Root Cause Analysis", total: "10 Questions", progress: "60%", color: "bg-blue-500" },
                  { name: "Cloud System Architecture & Warehousing Scales", total: "20 Questions", progress: "0%", color: "bg-slate-200" }
                ].map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-700 mb-1.5">
                      <div>{item.name} <span className="text-slate-400 font-medium ml-2">({item.total})</span></div>
                      <span className="font-mono">{item.progress} Completed</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.progress }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        };

      case "Certificates":
        return {
          title: "Verified Skill Credentials Registry",
          subtitle: "Manage decentralized public verification credentials tracking system achievements.",
          stats: [
            { label: "Active Certificates", value: "4 Issued", status: "Verified", color: "text-teal-600", bg: "bg-teal-50", icon: <ShieldCheck size={16} /> },
            { label: "Public Hashes Minted", value: "4 Hashes", status: "Secured", color: "text-indigo-600", bg: "bg-indigo-50", icon: <Award size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                { name: "Advanced SQL Optimization & Architecture", hash: "cs_hash_8410294", date: "Jul 4, 2026" },
                { name: "Data Science Foundations with Python Core", hash: "cs_hash_3019284", date: "Jun 20, 2026" },
                { name: "Enterprise Business Analytics with Power BI", hash: "cs_hash_1029482", date: "Jun 11, 2026" },
                { name: "Algorithmic Data Structures Execution", hash: "cs_hash_7740294", date: "May 29, 2026" }
              ].map((cert, i) => (
                <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-xs flex items-center justify-between group hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0"><Award size={20}/></div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate tracking-tight">{cert.name}</h4>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 truncate">Hash Reference: {cert.hash}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-[11px] font-bold text-slate-400">{cert.date}</div>
                    <button className="text-[11px] font-bold text-blue-600 hover:underline mt-1 flex items-center gap-0.5 ml-auto">Verify <ExternalLink size={10}/></button>
                  </div>
                </div>
              ))}
            </div>
          )
        };

      case "Community":
        return {
          title: "Peer Placement Network",
          subtitle: "Connect with system aspirants, sync recruitment timelines, and evaluate strategy blueprints.",
          stats: [
            { label: "Available Spaces", value: "8 Hubs", status: "Joined", color: "text-pink-600", bg: "bg-pink-50", icon: <Users size={16} /> },
            { label: "Active Active Peers", value: "1,240 Online", status: "Live Tracking", color: "text-emerald-600", bg: "bg-emerald-50", icon: <TrendingUp size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Trending Discussion Channels</h3>
              <div className="space-y-3">
                {[
                  { channel: "#placement-timeline-2026", desc: "Crowdsourced logs tracking enterprise application callbacks.", activity: "14 new posts today" },
                  { channel: "#faang-interview-breakdowns", desc: "Deep technical analysis regarding algorithm expectations.", activity: "42 active members chatting" },
                  { channel: "#resume-review-feedback", desc: "Post your document copies for constructive formatting peer audits.", activity: "9+ threads open" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs border-b border-slate-50 last:border-0 pb-3 last:pb-0 gap-2">
                    <div>
                      <div className="font-bold text-blue-600 cursor-pointer hover:underline">{item.channel}</div>
                      <div className="text-slate-400 font-medium mt-0.5">{item.desc}</div>
                    </div>
                    <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold text-[10px] whitespace-nowrap self-start sm:self-center">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        };

      case "My Profile":
        return {
          title: "System Identity & Configurations",
          subtitle: "Modify default deployment data parameters, target industry preferences, and security details.",
          stats: [
            { label: "Profile Status Progress", value: "92%", status: "Nearly Complete", color: "text-indigo-600", bg: "bg-indigo-50", icon: <UserRound size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Target Application Coordinates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">Primary Career Title Preference</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-800" defaultValue="Senior Data Analyst / Analytics Engineer" readOnly />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">Configured Geographical Alignment</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-800" defaultValue="Remote Worldwide / Hybrid (Gurugram)" readOnly />
                </div>
              </div>
            </div>
          )
        };

      case "Usage & Billing":
        return {
          title: "Infrastructure Tokens & Billing Ledger",
          subtitle: "Verify computational quota allocations and clear transaction operational history.",
          stats: [
            { label: "Current Balance Incurred", value: "$0.0000", status: "Settled", color: "text-cyan-600", bg: "bg-cyan-50", icon: <CreditCard size={16} /> },
            { label: "Active Operational Tier", value: "Free Pool", status: "Quota Limited", color: "text-slate-500", bg: "bg-slate-100", icon: <Lock size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Current Quota Metrics Allocation</h3>
              <div className="space-y-3 text-xs font-semibold text-slate-600">
                <div className="flex justify-between items-center">
                  <span>AI Resume Suggestions Pool</span>
                  <span className="font-mono text-slate-800">14 / 50 Requests Generated</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ATS Processing Scan Pipelines</span>
                  <span className="font-mono text-slate-800">3 / 10 Active Monthly Runs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Simulated Interview Minutes Logs</span>
                  <span className="font-mono text-slate-800">45 / 120 Minutes Consumed</span>
                </div>
              </div>
            </div>
          )
        };

      default:
        return { title: "Overview", subtitle: "System module workspace node.", stats: [], renderExtra: () => null };
    }
  };

  const detailedData = getTabDetailedData();

  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] text-slate-800 lg:flex-row">
      
      {/* --- SIDEBAR PANEL --- */}
      <aside className="hidden w-[260px] shrink-0 select-none border-r border-slate-900 bg-[#0b132b] p-5 text-slate-300 lg:flex lg:flex-col lg:justify-between">
        <div>
          <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-6">
            <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
            <div className="leading-none">
              <span className="text-[18px] font-black tracking-tight text-white">Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span></span>
            </div>
          </Link>

          <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Menu</div>
          
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:space-y-1 lg:gap-0">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all sm:text-[13.5px] ${
                    isSelected 
                      ? "bg-[#1c2541] text-teal-400 border border-slate-700/50" 
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={isSelected ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-6 space-y-4 lg:mt-8">
          <div className="rounded-xl border border-slate-800 bg-[#111a36] p-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1.5">
              <Zap size={13} fill="currentColor" /> Pro Plan
            </div>
            <p className="text-[11px] text-slate-400 leading-normal mb-3">Unlock unlimited AI assessments and tailored paths.</p>
            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2 rounded-lg transition-all active:scale-95">
              Upgrade Account
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                wer
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-xs font-bold text-white truncate">wer</div>
                <div className="text-[10px] text-slate-500 font-medium truncate">Free Tier Account</div>
              </div>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition-colors ml-2">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close dashboard menu"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-[86%] max-w-[320px] flex-col justify-between border-r border-slate-900 bg-[#0b132b] p-5 text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                  <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
                  <div className="leading-none">
                    <span className="text-[18px] font-black tracking-tight text-white">
                      Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Menu</div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setActiveTab(item.label);
                        setSidebarOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13.5px] font-medium transition-all ${
                        isSelected
                          ? "bg-[#1c2541] text-teal-400 border border-slate-700/50"
                          : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                      }`}
                    >
                      <Icon size={18} className={isSelected ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-[#111a36] p-4 shadow-sm">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Zap size={13} fill="currentColor" /> Pro Plan
                </div>
                <p className="mb-3 text-[11px] leading-normal text-slate-400">
                  Unlock unlimited AI assessments and tailored paths.
                </p>
                <button className="w-full rounded-lg bg-teal-600 py-2 text-xs font-bold text-white transition-all active:scale-95 hover:bg-teal-500">
                  Upgrade Account
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* --- CENTRAL INTERFACE CONTAINER --- */}
      <section className="flex flex-1 flex-col justify-between overflow-y-auto p-4 sm:p-6 md:p-8 lg:h-screen">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Open dashboard menu"
            >
              <MenuSquare size={20} />
            </button>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
              <div className="text-[17px] font-black tracking-tight text-slate-900">
                Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
              </div>
            </Link>
            <div className="w-11" />
          </div>

          {/* Top Info Header Bar */}
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{detailedData.title}</h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{detailedData.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                <div className="h-7 w-7 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center"><Zap size={14} fill="currentColor"/></div>
                <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">CS Points Used</div><div className="text-sm font-black text-slate-800 mt-1">0</div></div>
              </div>
              <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                <div className="h-7 w-7 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold text-sm">$</div>
                <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Consumed</div><div className="text-sm font-black text-slate-800 mt-1">$0.0000</div></div>
              </div>
              <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                <div className="h-7 w-7 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center"><ShieldCheck size={14}/></div>
                <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Certs</div><div className="text-sm font-black text-slate-800 mt-1">4</div></div>
              </div>
              <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                <div className="h-7 w-7 rounded-md bg-indigo-50 text-indigo-500 flex items-center justify-center"><TrendingUp size={14}/></div>
                <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Paths</div><div className="text-sm font-black text-slate-800 mt-1">0</div></div>
              </div>
            </div>
          </div>

          {/* System Active Callout Welcome Card */}
          <div className="bg-white border border-slate-200/60 rounded-xl p-6 mb-6 shadow-xs relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> System Active
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5"><Calendar size={13}/> {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 font-mono"><Clock size={13}/> {currentTime.toLocaleTimeString()}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Welcome back, wer</h2>
                <p className="text-slate-400 text-sm mt-1.5 max-w-[65ch] leading-relaxed">
                  Track your certification progress, analyze assessment performance, and monitor active learning paths across your organization's workspace.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                  <Sparkles size={13}/> Create Assessment
                </button>
              </div>
            </div>
          </div>

          {/* --- METRIC CARDS GRID --- */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detailedData.stats.map((card, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300/80 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</div>
                  <div className={`h-8 w-8 rounded-lg ${card.bg} flex items-center justify-center text-slate-700 transition-transform group-hover:scale-105`}>
                    {card.icon}
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className={`text-3xl font-black tracking-tight ${card.color}`}>{card.value}</div>
                  <p className="text-[11.5px] text-slate-400 leading-normal font-medium mt-1.5">{card.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* --- SUB-VIEW EXTRA INJECTIONS --- */}
          {detailedData.renderExtra && detailedData.renderExtra()}

        </div>

        {/* Global Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-400">
          <div>CareerSense Operations Framework Dashboard v2.4</div>
          <div className="flex items-center gap-4">
            <a href="#docs" className="hover:text-slate-600 transition-colors">Documentation</a>
            <a href="#support" className="hover:text-slate-600 transition-colors">Support Center</a>
          </div>
        </div>
      </section>
    </main>
  );
}

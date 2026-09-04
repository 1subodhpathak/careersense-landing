import { Award, BarChart3, Bell, Bot, CalendarDays, Check, ChevronDown, CircleDollarSign, CircleHelp, Clock3, Code2, CreditCard, Database, Download, ExternalLink, FileCheck2, FilePenLine, GraduationCap, LifeBuoy, Mail, MenuSquare, MessagesSquare, MoonStar, Palette, PlayCircle, ReceiptText, ScrollText, ShieldCheck, Smartphone, SunMedium, Trash2, Users, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import CSLogo from "../../Assets/CSlogo.png";
import { careerSenseClerkAppearance } from "../../config/clerkAppearance";

const routeItems = [
  { href: "/#career-tools", label: "Career Tools", tools: true },
  { href: "/dashboard?tab=Fellowship%20Program", label: "Fellowships", fellowships: true },
  { href: "/career-gps", label: "Career Score", internal: true },
  { href: "/linkedin-optimizer", label: "LinkedIn", internal: true },
  { href: "/partner-program", label: "Partner Program", internal: true },
  { href: "/#more", label: "More", more: true },
];

const moreItems = [
  { href: "/pricing", label: "Pricing & Plans", description: "Explore subscription and credit plans", icon: CircleDollarSign },
  { href: "/#certificate-sample", label: "Certification Sample", description: "Explore certificate security and verification", icon: ShieldCheck },
  { href: "/#how-it-works", label: "How It Works", description: "See the CareerSense journey", icon: PlayCircle },
  { href: "/#career-readiness", label: "Career Readiness", description: "Understand your path to job readiness", icon: Award },
  { href: "/#testimonials", label: "Success Stories", description: "Hear from CareerSense learners", icon: Users },
  { href: "/#colleges", label: "For Colleges", description: "Career-readiness support for institutions", icon: GraduationCap },
  { href: "/#faq", label: "FAQs", description: "Find answers to common questions", icon: CircleHelp },
];

const careerTools = [
  { href: "/resume-builder", label: "AI Resume Builder", description: "Create an ATS-ready resume", icon: FilePenLine, tone: "text-blue-700 bg-blue-100" },
  { href: "https://ats.careersenseai.com/", label: "ATS Score Checker", description: "Review keywords and job fit", icon: FileCheck2, tone: "text-emerald-700 bg-emerald-100", external: true },
  { href: "https://coverletter.careersenseai.com/", label: "Cover Letter Builder", description: "Write a tailored introduction", icon: ScrollText, tone: "text-violet-700 bg-violet-100", external: true },
  { href: "/interview-simulator", label: "Interview Simulator", description: "Practise role-specific interviews", icon: MessagesSquare, tone: "text-amber-700 bg-amber-100" },
  { href: "https://certifi.careersenseai.com/", label: "Skill Certification", description: "Prove job-ready capabilities", icon: Award, tone: "text-cyan-700 bg-cyan-100", external: true },
];

const fellowshipPrograms = [
  { id: "data-analyst", href: "/fellowships/data-analyst", label: "Data Analyst", description: "SQL, Power BI and Tableau", icon: BarChart3, tone: "text-blue-700 bg-blue-50" },
  { id: "data-science", href: "/fellowships/data-science", label: "Data Science", description: "Python, statistics and machine learning", icon: Database, tone: "text-emerald-700 bg-emerald-50" },
  { id: "artificial-intelligence", href: "/fellowships/artificial-intelligence", label: "Artificial Intelligence", description: "TensorFlow, OpenAI and NLP", icon: Bot, tone: "text-violet-700 bg-violet-50" },
  { id: "ui-ux-design", href: "/fellowships/ui-ux-design", label: "UI/UX Design", description: "Figma, research and prototyping", icon: Palette, tone: "text-fuchsia-700 bg-fuchsia-50" },
  { id: "app-development", href: "/fellowships/app-development", label: "App Development", description: "Flutter and React Native", icon: Smartphone, tone: "text-rose-700 bg-rose-50" },
  { id: "full-stack-development", href: "/fellowships/full-stack-development", label: "Full Stack Development", description: "React, Node.js and MongoDB", icon: Code2, tone: "text-amber-700 bg-amber-50" },
];

function SubscriptionProfilePage() {
  const { user } = useUser();
  const [subData, setSubData] = useState({
    plan: "free",
    tokensRemaining: 10000,
    status: "active",
    tokenRenewalDate: null,
    planExpiresAt: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchStatus = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
        const res = await fetch(`${backendUrl}/careersense/subscription/status?clerkId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setSubData(data);
          }
        }
      } catch (err) {
        console.error("Error fetching subscription status in modal:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [user?.id]);

  const planTitles = {
    free: "Free Plan",
    student: "Student Plan",
    intern: "Intern Plan",
    partner: "Partner Plan"
  };

  const planDescriptions = {
    free: "Your CareerSense starter access is active with 10,000 onboarding tokens.",
    student: "100,000 auto-refilling monthly AI tokens + unlimited free downloads.",
    intern: "500,000 tokens / month + 1 selected Fellowship Track access.",
    partner: "1,000,000 tokens / month + Partner Program, ID Card Studio & Offer Letter workspace."
  };

  const planList = [
    { key: "free", name: "Free", desc: "10,000 One-time AI Tokens" },
    { key: "student", name: "Student", desc: "100,000 Tokens / Mo (₹250/mo)" },
    { key: "intern", name: "Intern", desc: "500,000 Tokens / Mo (₹2,000 3-Mo)" },
    { key: "partner", name: "Partner", desc: "1,000,000 Tokens / Mo (₹2,499/mo)" }
  ];

  const currentPlanKey = subData.plan || "free";
  const renewalDateFormatted = subData.tokenRenewalDate
    ? new Date(subData.tokenRenewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : subData.planExpiresAt
    ? new Date(subData.planExpiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "No expiry";

  return (
    <div className="w-full text-[#071536]">
      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-[#F1F8FF] to-[#ECFBF8] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0B8F9C]">Current subscription</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">{planTitles[currentPlanKey] || "Free Plan"}</h2>
            <p className="mt-1 text-sm text-[#667792]">{planDescriptions[currentPlanKey] || planDescriptions.free}</p>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700">
            {subData.status ? subData.status.toUpperCase() : "ACTIVE"}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-white bg-white/80 p-4">
            <Zap className="h-5 w-5 text-amber-500 fill-amber-400" />
            <div>
              <p className="text-xs font-bold text-[#667792]">Tokens Balance</p>
              <p className="mt-0.5 text-sm font-black text-amber-600">
                {loading ? "Loading..." : `${(subData.tokensRemaining || 0).toLocaleString()} tokens`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white bg-white/80 p-4">
            <Clock3 className="h-5 w-5 text-[#0EA8B9]" />
            <div>
              <p className="text-xs font-bold text-[#667792]">Subscription Renewal</p>
              <p className="mt-0.5 text-sm font-black">{renewalDateFormatted}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black">Available Plans</h3>
          <Link to="/pricing" className="text-xs font-bold text-[#0EA8B9] hover:underline">
            View All Plans & Features →
          </Link>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {planList.map((p) => {
            const isCurrent = currentPlanKey === p.key;
            return (
              <div
                key={p.key}
                className={`rounded-xl border p-4 transition-all ${
                  isCurrent
                    ? "border-cyan-400 bg-cyan-50/70 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-[#071536]">{p.name} Plan</span>
                  {isCurrent ? (
                    <span className="rounded-full bg-[#0EA8B9] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                      Current
                    </span>
                  ) : (
                    <Link to="/pricing" className="text-[10px] font-black text-[#0EA8B9] hover:underline">
                      Upgrade
                    </Link>
                  )}
                </div>
                <p className="mt-1 text-xs text-[#667792]">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BillingProfilePage() {
  const { user } = useUser();
  const [ledgerLogs, setLedgerLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchLedger = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
        const res = await fetch(`${backendUrl}/careersense/subscription/ledger?clerkId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.ledger) {
            setLedgerLogs(data.ledger);
          }
        }
      } catch (err) {
        console.error("Error fetching ledger in modal:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, [user?.id]);

  const usageLogs = ledgerLogs.filter(log => log.amount < 0);
  const totalPointsConsumed = usageLogs.reduce((sum, log) => sum + Math.abs(log.amount), 0);
  const totalBillUsd = totalPointsConsumed / 100000;

  return (
    <div className="w-full text-[#071536]">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-cyan-100 bg-[#F1F8FF] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0EA8B9]">
            <ReceiptText size={19} />
          </div>
          <p className="mt-4 text-xs font-bold text-[#667792]">Points Consumed</p>
          <p className="mt-1 text-2xl font-black text-[#071536]">
            {loading ? "Loading..." : `${totalPointsConsumed.toLocaleString()} points`}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-[#ECFBF8] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0EA8B9]">
            <CircleDollarSign size={19} />
          </div>
          <p className="mt-4 text-xs font-bold text-[#667792]">Current Bill</p>
          <p className="mt-1 text-2xl font-black text-[#071536]">
            {loading ? "Loading..." : `$${totalBillUsd.toFixed(4)}`}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <CreditCard className="text-[#0EA8B9]" size={20} />
            <h3 className="text-sm font-black">Recent Usage History</h3>
          </div>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[9px] font-black uppercase text-emerald-700">
            Real-time Ledger
          </span>
        </div>

        {loading ? (
          <p className="py-6 text-center text-xs font-semibold text-slate-500">Loading ledger logs...</p>
        ) : usageLogs.length === 0 ? (
          <p className="py-6 text-center text-xs font-medium text-slate-400">No usage logs recorded yet.</p>
        ) : (
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
            {usageLogs.slice(0, 8).map((log, i) => {
              const pts = Math.abs(log.amount);
              const cost = pts / 100000;
              const dateStr = new Date(log.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              return (
                <div key={log._id || i} className="flex items-center justify-between py-2.5 text-xs">
                  <div>
                    <p className="font-extrabold text-[#071536]">{log.serviceId || "AI Feature Usage"}</p>
                    <p className="text-[10px] text-slate-400">{dateStr}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-amber-600">-{pts.toLocaleString()} pts</p>
                    <p className="text-[10px] font-bold text-slate-500">${cost.toFixed(4)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const notificationOptions = [
  { id: "progress", title: "Progress updates", description: "Weekly summaries, scores and recommended next steps.", defaultOn: true },
  { id: "opportunities", title: "Career opportunities", description: "Relevant fellowships, internships and partner openings.", defaultOn: true },
  { id: "product", title: "Product news", description: "New CareerSense tools, features and learning resources.", defaultOn: false },
];

function NotificationsProfilePage() {
  const [preferences, setPreferences] = useState(() =>
    Object.fromEntries(notificationOptions.map((option) => [option.id, option.defaultOn]))
  );

  return (
    <div className="w-full text-[#071536]">
      <div className="mb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0B8F9C]">Communication preferences</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">Choose what reaches you</h2>
        <p className="mt-1 max-w-xl text-sm leading-6 text-[#667792]">These preferences are a UI preview and will be saved once notification services are connected.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {notificationOptions.map((option, index) => {
          const enabled = preferences[option.id];
          return (
            <div key={option.id} className={`flex items-center justify-between gap-5 p-5 ${index ? "border-t border-slate-100" : ""}`}>
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#0B8F9C]"><Mail size={17} /></span>
                <div><h3 className="text-sm font-extrabold">{option.title}</h3><p className="mt-1 text-xs leading-5 text-[#667792]">{option.description}</p></div>
              </div>
              <button type="button" role="switch" aria-checked={enabled} aria-label={`${option.title}: ${enabled ? "on" : "off"}`} onClick={() => setPreferences((current) => ({ ...current, [option.id]: !current[option.id] }))} className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors ${enabled ? "border-[#0EA8B9] bg-[#0EA8B9]" : "border-slate-300 bg-slate-200"}`}>
                <span className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`}>{enabled && <Check size={11} className="text-[#0B8F9C]" />}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PrivacyProfilePage() {
  return (
    <div className="w-full text-[#071536]">
      <div className="rounded-2xl border border-cyan-100 bg-[#F1F8FF] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B8F9C]"><ShieldCheck size={22} /></span>
          <div><h2 className="text-xl font-black tracking-tight">Your data, your control</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[#667792]">Manage CareerSense data requests here. Authentication credentials and identity verification remain securely managed by Clerk.</p></div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div><h3 className="text-sm font-extrabold">Download your data</h3><p className="mt-1 text-xs leading-5 text-[#667792]">Request a copy of your profile, assessments and activity.</p></div>
          <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-400"><Download size={15} />Coming soon</button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 p-5">
          <div><h3 className="text-sm font-extrabold text-rose-700">Delete CareerSense account</h3><p className="mt-1 text-xs leading-5 text-[#667792]">Permanent account deletion appears in Clerk's native Security page when enabled.</p></div>
          <span className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-extrabold text-rose-700"><Trash2 size={15} />Security tab</span>
        </div>
      </div>
    </div>
  );
}

function SupportProfilePage() {
  return (
    <div className="w-full text-[#071536]">
      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-[#F1F8FF] to-[#ECFBF8] p-5 sm:p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0B8F9C]">CareerSense support</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">How can we help?</h2>
        <p className="mt-1 max-w-xl text-sm leading-6 text-[#667792]">Get help with your account, assessments, fellowship or partner-program experience.</p>
        <a href="mailto:support.careersense@gmail.com" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#071536] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#102753]"><Mail size={17} />Email support</a>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a href="/#faq" className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-300 hover:bg-cyan-50/30"><div className="flex items-center justify-between"><CircleHelp size={20} className="text-[#0EA8B9]" /><ExternalLink size={15} className="text-slate-400 group-hover:text-[#0EA8B9]" /></div><h3 className="mt-4 text-sm font-extrabold">Frequently asked questions</h3><p className="mt-1 text-xs leading-5 text-[#667792]">Find quick answers about CareerSense.</p></a>
        <a href="mailto:support.careersense@gmail.com" className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-cyan-300 hover:bg-cyan-50/30"><div className="flex items-center justify-between"><LifeBuoy size={20} className="text-[#0EA8B9]" /><ExternalLink size={15} className="text-slate-400 group-hover:text-[#0EA8B9]" /></div><h3 className="mt-4 text-sm font-extrabold">Contact the team</h3><p className="mt-1 text-xs leading-5 text-[#667792]">Reach us for account or program assistance.</p></a>
      </div>
    </div>
  );
}

function CareerSenseUserButton({ compact = false }) {
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={compact ? { elements: { avatarBox: "h-9 w-9 border border-cyan-500/30 hover:border-cyan-500 transition-colors" } } : careerSenseClerkAppearance}
      userProfileProps={{ appearance: careerSenseClerkAppearance }}
    >
      <UserButton.UserProfilePage label="Subscription" url="subscription" labelIcon={<CreditCard size={16} />}>
        <SubscriptionProfilePage />
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage label="Usage & Billing" url="billing" labelIcon={<ReceiptText size={16} />}>
        <BillingProfilePage />
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage label="Notifications" url="notifications" labelIcon={<Bell size={16} />}>
        <NotificationsProfilePage />
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage label="Privacy & Data" url="privacy" labelIcon={<ShieldCheck size={16} />}>
        <PrivacyProfilePage />
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage label="Support" url="support" labelIcon={<LifeBuoy size={16} />}>
        <SupportProfilePage />
      </UserButton.UserProfilePage>
    </UserButton>
  );
}

export default function Navbar({ heroTheme = "dark", onToggleHeroTheme }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [fellowshipsOpen, setFellowshipsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isLightTheme = heroTheme === "light";

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  const isRouteActive = (item) => {
    if (item.fellowships) {
      return location.pathname.startsWith("/fellowships/") || (location.pathname === "/dashboard" && new URLSearchParams(location.search).get("tab") === "Fellowship Program");
    }
    if (item.tools) {
      return (location.pathname === "/" && location.hash === "#career-tools") || careerTools.some((tool) => !tool.external && location.pathname === tool.href);
    }
    if (item.more) {
      return location.pathname === "/" && moreItems.some((moreItem) => location.hash === moreItem.href.slice(1));
    }
    if (item.href.startsWith("/#")) {
      const hash = item.href.slice(1);
      return location.pathname === "/" && (hash === "#home" ? !location.hash || location.hash === "#home" : location.hash === hash);
    }
    return location.pathname === item.href;
  };

  const activeNavClass = isLightTheme
    ? "border-blue-600 text-blue-700"
    : "border-cyan-400 text-cyan-300";

  const navLinkClass = `relative whitespace-nowrap border-b-2 border-transparent px-2 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-sm ${
    isLightTheme
      ? "text-slate-700 hover:bg-slate-900/6 hover:text-slate-950"
      : "text-slate-300 hover:bg-white/6 hover:text-white"
  }`;

  return (
    <header
      className={`relative z-50 border-b shadow-[0_10px_30px_rgba(2,11,31,0.24)] transition-colors duration-300 ${
        isLightTheme
          ? "border-slate-900/8 bg-[#eef6ff] text-slate-950"
          : "border-white/10 bg-[#081634] text-white"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-5 lg:px-6 xl:px-8">
        <div className="flex min-h-[74px] items-center justify-between gap-3 xl:gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 xl:gap-3">
            <img
              src={CSLogo}
              alt="CareerSense logo"
              className="h-9 w-auto object-contain"
            />
            <div className="leading-none">
              <div
                className={`text-[16px] font-black tracking-tight sm:text-[20px] ${
                  isLightTheme ? "text-slate-950" : "text-white"
                }`}
              >
                <span className={isLightTheme ? "text-slate-950" : "text-white"}>
                  Career
                </span>
                <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Sense
                </span>
              </div>
              <div
                className={`mt-1 hidden text-[9px] font-bold uppercase tracking-[0.34em] sm:block ${
                  isLightTheme ? "text-cyan-700/90" : "text-cyan-300/80"
                }`}
              >
                AI Career Copilot
              </div>
            </div>
          </Link>

          <nav className="hidden min-w-0 shrink items-center justify-center gap-1 xl:flex">
            {routeItems.map((item) => item.fellowships ? (
              <div key={item.label} className="relative shrink-0" onMouseEnter={() => { setFellowshipsOpen(true); setToolsOpen(false); }} onMouseLeave={() => setFellowshipsOpen(false)}>
                <button type="button" onClick={() => { setFellowshipsOpen((value) => !value); setToolsOpen(false); }} className={`${navLinkClass} inline-flex items-center gap-1.5 ${isRouteActive(item) ? activeNavClass : ""}`} aria-expanded={fellowshipsOpen} aria-haspopup="menu" aria-current={isRouteActive(item) ? "page" : undefined}>
                  {item.label}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${fellowshipsOpen ? "rotate-180" : ""}`} />
                </button>
                {fellowshipsOpen && <div role="menu" className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"><div className={`overflow-hidden rounded-2xl border shadow-[0_24px_60px_rgba(2,11,31,0.24)] ${isLightTheme ? "border-slate-200 bg-white" : "border-white/10 bg-[#0d2042]"}`}><div className={`border-b px-5 py-3 ${isLightTheme ? "border-slate-100" : "border-white/10"}`}><p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-600">Three-month fellowship</p><p className={`mt-0.5 text-xs font-semibold ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>Choose one professional track to begin.</p></div><div className="grid grid-cols-2 gap-1 p-2.5">{fellowshipPrograms.map((program) => { const Icon = program.icon; return <Link key={program.id} to={program.href || `/dashboard?tab=Fellowship%20Program&fellowship=${program.id}`} role="menuitem" onClick={() => setFellowshipsOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${isLightTheme ? "hover:bg-blue-50" : "hover:bg-white/7"}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${program.tone}`}><Icon size={18} /></span><span className="min-w-0"><span className={`block text-sm font-extrabold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{program.label}</span><span className={`mt-0.5 block truncate text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{program.description}</span></span></Link>; })}</div><div className={`flex items-center justify-between border-t px-5 py-3 text-[10px] font-semibold ${isLightTheme ? "border-slate-100 bg-slate-50 text-slate-500" : "border-white/10 bg-black/10 text-slate-400"}`}><span>Actively Looking for Candidates</span><span>One active fellowship at a time</span></div></div></div>}
              </div>
            ) : item.tools ? (
              <div key={item.label} className="relative shrink-0" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
                <button type="button" onClick={() => { setToolsOpen((value) => !value); setFellowshipsOpen(false); }} className={`${navLinkClass} inline-flex items-center gap-1.5 ${isRouteActive(item) ? activeNavClass : ""}`} aria-expanded={toolsOpen} aria-haspopup="menu" aria-current={isRouteActive(item) ? "page" : undefined}>
                  {item.label}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                </button>
                {toolsOpen && (
                  <div role="menu" className={`absolute left-0 top-full w-[350px] pt-3`}>
                    <div className={`rounded-2xl border p-2.5 shadow-[0_24px_60px_rgba(2,11,31,0.24)] ${isLightTheme ? "border-slate-200 bg-white" : "border-white/10 bg-[#0d2042]"}`}>
                      <div className="px-3 pb-2 pt-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-500">CareerSense tools</div>
                      {careerTools.map((tool) => {
                        const Icon = tool.icon;
                        const content = <><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tool.tone}`}><Icon size={18} /></span><span><span className={`block text-sm font-extrabold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{tool.label}</span><span className={`mt-0.5 block text-xs ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{tool.description}</span></span></>;
                        return tool.external ? <a key={tool.label} href={tool.href} target="_blank" rel="noreferrer" role="menuitem" className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${isLightTheme ? "hover:bg-blue-50" : "hover:bg-white/7"}`}>{content}</a> : <Link key={tool.label} to={tool.href} role="menuitem" onClick={() => setToolsOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${isLightTheme ? "hover:bg-blue-50" : "hover:bg-white/7"}`}>{content}</Link>;
                      })}
                      <Link to="/#career-tools" onClick={() => setToolsOpen(false)} className={`mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-black ${isLightTheme ? "bg-slate-50 text-blue-700 hover:bg-blue-50" : "bg-white/5 text-cyan-300 hover:bg-white/8"}`}>Explore all career tools<span aria-hidden="true">→</span></Link>
                    </div>
                  </div>
                )}
              </div>
            ) : item.more ? (
              <div key={item.label} className="relative shrink-0" onMouseEnter={() => { setMoreOpen(true); setToolsOpen(false); setFellowshipsOpen(false); }} onMouseLeave={() => setMoreOpen(false)}>
                <button type="button" onClick={() => { setMoreOpen((value) => !value); setToolsOpen(false); setFellowshipsOpen(false); }} className={`${navLinkClass} inline-flex items-center gap-1.5 ${isRouteActive(item) ? activeNavClass : ""}`} aria-expanded={moreOpen} aria-haspopup="menu">
                  {item.label}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div role="menu" className="absolute right-0 top-full w-[420px] pt-3">
                    <div className={`overflow-hidden rounded-2xl border shadow-[0_24px_60px_rgba(2,11,31,0.24)] ${isLightTheme ? "border-slate-200 bg-white" : "border-white/10 bg-[#0d2042]"}`}>
                      <div className="grid grid-cols-2 gap-1 p-2.5">
                        {moreItems.map((moreItem) => { const Icon = moreItem.icon; return <Link key={moreItem.label} to={moreItem.href} role="menuitem" onClick={() => setMoreOpen(false)} className={`flex items-start gap-3 rounded-xl px-3 py-3 transition ${isLightTheme ? "hover:bg-blue-50" : "hover:bg-white/7"}`}><span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isLightTheme ? "bg-blue-50 text-blue-700" : "bg-white/8 text-cyan-300"}`}><Icon size={17} /></span><span><span className={`block text-xs font-extrabold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{moreItem.label}</span><span className={`mt-1 block text-[10px] leading-4 ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{moreItem.description}</span></span></Link>; })}
                      </div>
                      <button type="button" onClick={() => { onToggleHeroTheme?.(); setMoreOpen(false); }} className={`flex w-full items-center justify-between border-t px-5 py-3 text-xs font-bold transition ${isLightTheme ? "border-slate-100 bg-slate-50 text-slate-700 hover:bg-blue-50" : "border-white/10 bg-black/10 text-slate-300 hover:bg-white/5"}`}>
                        <span>Switch to {isLightTheme ? "dark" : "light"} theme</span>{isLightTheme ? <MoonStar size={16} /> : <SunMedium size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : item.internal ? (
              <Link key={item.label} to={item.href} aria-current={isRouteActive(item) ? "page" : undefined} className={`${navLinkClass} relative ${isRouteActive(item) ? activeNavClass : ""}`}>
                {item.label}
              </Link>
            ) : (
              <Link key={item.label} to={item.href} aria-current={isRouteActive(item) ? "page" : undefined} className={`${navLinkClass} ${isRouteActive(item) ? activeNavClass : ""}`}>{item.label}</Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 xl:gap-3">
            <button
              type="button"
              onClick={onToggleHeroTheme}
              title={`Switch to ${isLightTheme ? "dark" : "light"} theme`}
              aria-label={`Switch to ${isLightTheme ? "dark" : "light"} theme`}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                isLightTheme
                  ? "border-slate-300/80 bg-white/80 text-slate-700 hover:bg-slate-100 hover:text-slate-950 shadow-xs"
                  : "border-white/15 bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white shadow-xs"
              }`}
            >
              {isLightTheme ? <MoonStar size={18} /> : <SunMedium size={18} />}
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="hidden min-h-[50px] items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] transition-all duration-200 hover:brightness-105 xl:inline-flex"
                >
                  Log In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2 xl:gap-3">
                <Link
                  to="/dashboard"
                  className="hidden min-h-[50px] items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] transition-all duration-200 hover:brightness-105 xl:inline-flex"
                >
                  <CalendarDays className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center justify-center">
                  <CareerSenseUserButton compact />
                </div>
              </div>
            </SignedIn>

            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition xl:hidden ${
                isLightTheme
                  ? "border-slate-900/10 bg-white/70 text-slate-800 hover:bg-white"
                  : "border-white/12 bg-white/5 text-white hover:bg-white/10"
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <MenuSquare className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className={`max-h-[calc(100vh-106px)] overflow-y-auto border-t xl:hidden ${
            isLightTheme
              ? "border-slate-900/8 bg-[#eef6ff]"
              : "border-white/10 bg-[#081634]"
          }`}
        >
          <div className="mx-auto max-w-[1400px] px-6 pb-4 pt-3 lg:px-10">
            <div
              className={`rounded-2xl border p-3 ${
                isLightTheme
                  ? "border-slate-900/8 bg-white/80"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="grid gap-1.5">
                {routeItems.map((item) => item.fellowships ? (
                  <div key={item.label}>
                    <button type="button" onClick={() => { setFellowshipsOpen((value) => !value); setToolsOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${isRouteActive(item) ? activeNavClass : isLightTheme ? "text-slate-700 hover:bg-slate-900/6" : "text-slate-300 hover:bg-white/8"}`} aria-expanded={fellowshipsOpen}>
                      {item.label}<ChevronDown className={`h-4 w-4 transition-transform ${fellowshipsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {fellowshipsOpen && <div className={`mx-2 mb-2 grid gap-1 rounded-xl p-2 sm:grid-cols-2 ${isLightTheme ? "bg-slate-100/80" : "bg-black/15"}`}>{fellowshipPrograms.map((program) => { const Icon = program.icon; return <Link key={program.id} to={program.href || `/dashboard?tab=Fellowship%20Program&fellowship=${program.id}`} onClick={() => { setOpen(false); setFellowshipsOpen(false); }} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isLightTheme ? "hover:bg-white" : "hover:bg-white/8"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${program.tone}`}><Icon size={16} /></span><span className="min-w-0"><span className={`block text-xs font-extrabold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{program.label}</span><span className={`block truncate text-[10px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{program.description}</span></span></Link>; })}<div className={`px-3 py-2 text-center text-[10px] font-bold sm:col-span-2 ${isLightTheme ? "text-blue-700" : "text-cyan-300"}`}>3 months · Open year-round</div></div>}
                  </div>
                ) : item.tools ? (
                  <div key={item.label}>
                    <button type="button" onClick={() => { setToolsOpen((value) => !value); setFellowshipsOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${isRouteActive(item) ? activeNavClass : isLightTheme ? "text-slate-700 hover:bg-slate-900/6" : "text-slate-300 hover:bg-white/8"}`} aria-expanded={toolsOpen} aria-current={isRouteActive(item) ? "page" : undefined}>
                      {item.label}<ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {toolsOpen && <div className={`mx-2 mb-2 grid gap-1 rounded-xl p-2 ${isLightTheme ? "bg-slate-100/80" : "bg-black/15"}`}>{careerTools.map((tool) => { const Icon = tool.icon; const itemClass = `flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isLightTheme ? "hover:bg-white" : "hover:bg-white/8"}`; const content = <><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tool.tone}`}><Icon size={16} /></span><span><span className={`block text-xs font-extrabold ${isLightTheme ? "text-slate-900" : "text-[#000]"}`}>{tool.label}</span><span className={`block text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{tool.description}</span></span></>; return tool.external ? <a key={tool.label} href={tool.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className={itemClass}>{content}</a> : <Link key={tool.label} to={tool.href} onClick={() => setOpen(false)} className={itemClass}>{content}</Link>; })}<Link to="/#career-tools" onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-center text-xs font-black ${isLightTheme ? "text-blue-700" : "text-cyan-300"}`}>Explore all career tools →</Link></div>}
                  </div>
                ) : item.more ? (
                  <div key={item.label}>
                    <button type="button" onClick={() => { setMoreOpen((value) => !value); setToolsOpen(false); setFellowshipsOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${isRouteActive(item) ? activeNavClass : isLightTheme ? "text-slate-700 hover:bg-slate-900/6" : "text-slate-300 hover:bg-white/8"}`} aria-expanded={moreOpen}>
                      {item.label}<ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                    </button>
                    {moreOpen && (
                      <div className={`mx-2 mb-2 grid gap-1 rounded-xl p-2 sm:grid-cols-2 ${isLightTheme ? "bg-slate-100/80" : "bg-black/15"}`}>
                        {moreItems.map((moreItem) => { const Icon = moreItem.icon; return <Link key={moreItem.label} to={moreItem.href} onClick={() => { setOpen(false); setMoreOpen(false); }} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isLightTheme ? "hover:bg-white" : "hover:bg-white/8"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isLightTheme ? "bg-blue-50 text-blue-700" : "bg-white/8 text-cyan-300"}`}><Icon size={16} /></span><span><span className={`block text-xs font-extrabold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{moreItem.label}</span><span className={`block text-[10px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{moreItem.description}</span></span></Link>; })}
                        <button type="button" onClick={() => { onToggleHeroTheme?.(); setMoreOpen(false); }} className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold sm:col-span-2 ${isLightTheme ? "bg-white text-slate-700" : "bg-white/5 text-slate-300"}`}><span>Switch to {isLightTheme ? "dark" : "light"} theme</span>{isLightTheme ? <MoonStar size={15} /> : <SunMedium size={15} />}</button>
                      </div>
                    )}
                  </div>
                ) : item.internal ? (
                  <Link key={item.label} to={item.href} onClick={() => setOpen(false)} aria-current={isRouteActive(item) ? "page" : undefined} className={`relative rounded-xl px-4 py-3 text-sm font-semibold transition ${isRouteActive(item) ? activeNavClass : isLightTheme ? "text-slate-700 hover:bg-slate-900/6 hover:text-slate-950" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}>{item.label}</Link>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isRouteActive(item) ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isRouteActive(item)
                        ? activeNavClass
                        : isLightTheme
                        ? "text-slate-700 hover:bg-slate-900/6 hover:text-slate-950"
                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:brightness-105"
                    >
                      Log In
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:brightness-105"
                    >
                      <CalendarDays className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <div className="mt-2 flex items-center justify-center gap-2 py-2 border-t border-dashed border-slate-700/20">
                      <span className={`text-xs font-semibold ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>Account:</span>
                      <CareerSenseUserButton />
                    </div>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

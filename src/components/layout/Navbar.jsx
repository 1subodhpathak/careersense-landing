import { Award, CalendarDays, ChevronDown, FileCheck2, FilePenLine, MenuSquare, MessagesSquare, MoonStar, ScrollText, SunMedium, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import CSLogo from "../../Assets/CSlogo.png";

const routeItems = [
  { href: "/#home", label: "Home" },
  { href: "/#career-tools", label: "Career Tools", tools: true },
  { href: "/linkedin-optimizer", label: "LinkedIn Optimizer", internal: true },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/career-gps", label: "Career Score Check", internal: true },
  { href: "/partner-program", label: "Partner Program", internal: true },
  { href: "/#faq", label: "FAQ" },
];

const careerTools = [
  { href: "/resume-builder", label: "AI Resume Builder", description: "Create an ATS-ready resume", icon: FilePenLine, tone: "text-blue-700 bg-blue-100" },
  { href: "https://ats.careersenseai.com/", label: "ATS Score Checker", description: "Review keywords and job fit", icon: FileCheck2, tone: "text-emerald-700 bg-emerald-100", external: true },
  { href: "https://coverletter.careersenseai.com/", label: "Cover Letter Builder", description: "Write a tailored introduction", icon: ScrollText, tone: "text-violet-700 bg-violet-100", external: true },
  { href: "/interview-simulator", label: "Interview Simulator", description: "Practise role-specific interviews", icon: MessagesSquare, tone: "text-amber-700 bg-amber-100" },
  { href: "https://certifi.careersenseai.com/", label: "Skill Certification", description: "Prove job-ready capabilities", icon: Award, tone: "text-cyan-700 bg-cyan-100", external: true },
];

export default function Navbar({ heroTheme = "dark", onToggleHeroTheme }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
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
    if (item.tools) {
      return (location.pathname === "/" && location.hash === "#career-tools") || careerTools.some((tool) => !tool.external && location.pathname === tool.href);
    }
    if (item.href.startsWith("/#")) {
      const hash = item.href.slice(1);
      return location.pathname === "/" && (hash === "#home" ? !location.hash || location.hash === "#home" : location.hash === hash);
    }
    return location.pathname === item.href;
  };

  const activeNavClass = isLightTheme
    ? "bg-white text-blue-700 shadow-sm ring-1 ring-blue-100"
    : "bg-white/10 text-cyan-300 ring-1 ring-white/10";

  const navLinkClass = `whitespace-nowrap rounded-xl px-2.5 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-3 xl:text-sm ${
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
        <div className="flex min-h-[82px] items-center justify-between gap-3 xl:gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 xl:gap-3">
            <img
              src={CSLogo}
              alt="CareerSense logo"
              className="h-10 w-auto object-contain"
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
            {routeItems.map((item) => item.tools ? (
              <div key={item.label} className="relative shrink-0" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
                <button type="button" onClick={() => setToolsOpen((value) => !value)} className={`${navLinkClass} inline-flex items-center gap-1.5 ${isRouteActive(item) ? activeNavClass : ""}`} aria-expanded={toolsOpen} aria-haspopup="menu" aria-current={isRouteActive(item) ? "page" : undefined}>
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
              className={`hidden h-11 w-11 items-center justify-center rounded-xl border transition xl:inline-flex ${
                isLightTheme
                  ? "border-slate-900/10 bg-white/70 text-slate-800 hover:bg-white"
                  : "border-white/12 bg-white/5 text-white hover:bg-white/10"
              }`}
              aria-label={`Switch to ${isLightTheme ? "dark" : "light"} hero theme`}
              title={`Switch to ${isLightTheme ? "dark" : "light"} hero theme`}
            >
              {isLightTheme ? (
                <MoonStar className="h-4 w-4" />
              ) : (
                <SunMedium className="h-4 w-4" />
              )}
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
                  <UserButton afterSignOutUrl="/" appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 border border-cyan-500/30 hover:border-cyan-500 transition-colors"
                    }
                  }} />
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
                {routeItems.map((item) => item.tools ? (
                  <div key={item.label}>
                    <button type="button" onClick={() => setToolsOpen((value) => !value)} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${isRouteActive(item) ? activeNavClass : isLightTheme ? "text-slate-700 hover:bg-slate-900/6" : "text-slate-300 hover:bg-white/8"}`} aria-expanded={toolsOpen} aria-current={isRouteActive(item) ? "page" : undefined}>
                      {item.label}<ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {toolsOpen && <div className={`mx-2 mb-2 grid gap-1 rounded-xl p-2 ${isLightTheme ? "bg-slate-100/80" : "bg-black/15"}`}>{careerTools.map((tool) => { const Icon = tool.icon; const itemClass = `flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isLightTheme ? "hover:bg-white" : "hover:bg-white/8"}`; const content = <><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tool.tone}`}><Icon size={16} /></span><span><span className={`block text-xs font-extrabold ${isLightTheme ? "text-slate-900" : "text-white"}`}>{tool.label}</span><span className={`block text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{tool.description}</span></span></>; return tool.external ? <a key={tool.label} href={tool.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className={itemClass}>{content}</a> : <Link key={tool.label} to={tool.href} onClick={() => setOpen(false)} className={itemClass}>{content}</Link>; })}<Link to="/#career-tools" onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-center text-xs font-black ${isLightTheme ? "text-blue-700" : "text-cyan-300"}`}>Explore all career tools →</Link></div>}
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

                <button
                  type="button"
                  onClick={() => {
                    onToggleHeroTheme?.();
                    setOpen(false);
                  }}
                  className={`mt-2 inline-flex h-11 w-11 items-center justify-center self-center rounded-xl border transition ${
                    isLightTheme
                      ? "border-slate-900/10 bg-white text-slate-800 hover:bg-slate-50"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                  aria-label={`Switch to ${isLightTheme ? "dark" : "light"} hero theme`}
                  title={`Switch to ${isLightTheme ? "dark" : "light"} hero theme`}
                >
                  {isLightTheme ? (
                    <MoonStar className="h-4 w-4" />
                  ) : (
                    <SunMedium className="h-4 w-4" />
                  )}
                </button>

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
                      <UserButton afterSignOutUrl="/" />
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

import { CalendarDays, MenuSquare, MoonStar, SunMedium, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import CSLogo from "../../Assets/CSlogo.png";

const routeItems = [
  { href: "/#home", label: "Home" },
  { href: "/#career-tools", label: "Career Tools" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#career-readiness", label: "Readiness Score" },
  { href: "/#testimonials", label: "Success Stories" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar({ heroTheme = "dark", onToggleHeroTheme }) {
  const [open, setOpen] = useState(false);
  const isLightTheme = heroTheme === "light";

  const navLinkClass = `rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
    isLightTheme
      ? "text-slate-700 hover:bg-slate-900/6 hover:text-slate-950"
      : "text-slate-300 hover:bg-white/6 hover:text-white"
  }`;

  return (
    <header
      className={`relative z-50 border-b shadow-[0_10px_30px_rgba(2,11,31,0.24)] ${
        isLightTheme
          ? "border-slate-900/8 bg-[#eef6ff] text-slate-950"
          : "border-white/10 bg-[#081634] text-white"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex min-h-[82px] items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
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

          <nav className="hidden items-center gap-1 lg:flex">
            {routeItems.map((item) => (
              <a key={item.label} href={item.href} className={navLinkClass}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleHeroTheme}
              className={`hidden h-11 w-11 items-center justify-center rounded-xl border transition lg:inline-flex ${
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
                  className="hidden min-h-[50px] items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] transition-all duration-200 hover:brightness-105 lg:inline-flex"
                >
                  Log In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="hidden min-h-[50px] items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] transition-all duration-200 hover:brightness-105 lg:inline-flex"
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
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition lg:hidden ${
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
          className={`border-t lg:hidden ${
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
                {routeItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isLightTheme
                        ? "text-slate-700 hover:bg-slate-900/6 hover:text-slate-950"
                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
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

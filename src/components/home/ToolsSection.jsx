"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ExternalLink, PenLine, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toolCards } from "../../data/homePageData";
import { ebooks } from "../../data/ebooks";

import InterviewImg from "../../Assets/Interview.png";
import ResumeImg from "../../Assets/Resume.png";
import ATSImg from "../../Assets/ATS.png";
import CoverLetterImg from "../../Assets/CoverLetter.png";
import SkillCertificationImg from "../../Assets/SkillCertification.png";

const cardThemes = [
  {
    image: ResumeImg,
    accent: "from-cyan-400 to-teal-400",
    iconBg: "bg-cyan-400/15 text-cyan-100 ring-cyan-300/20",
    button: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    glow: "group-hover:shadow-cyan-500/20",
    fallback:
      "Build a polished, recruiter-ready resume with strong keywords and clean formatting.",
    chips: ["Resume Score", "ATS Ready", "Better Bullets"],
  },
  {
    image: InterviewImg,
    accent: "from-blue-400 to-indigo-400",
    iconBg: "bg-blue-400/15 text-blue-100 ring-blue-300/20",
    button: "bg-blue-500 text-white hover:bg-blue-400",
    glow: "group-hover:shadow-blue-500/20",
    fallback:
      "Practice realistic interview rounds and improve your answers with AI feedback.",
    chips: ["Mock Rounds", "AI Feedback", "Confidence"],
  },
  {
    image: ATSImg,
    accent: "from-emerald-400 to-teal-400",
    iconBg: "bg-emerald-400/15 text-emerald-100 ring-emerald-300/20",
    button: "bg-emerald-500 text-white hover:bg-emerald-400",
    glow: "group-hover:shadow-emerald-500/20",
    fallback:
      "Compare your resume with the job description and identify missing keywords fast.",
    chips: ["JD Match", "Keyword Gaps", "Fix Plan"],
  },
];

const secondaryTools = [
  {
    icon: PenLine,
    title: "Cover Letter Builder",
    text: "Create a tailored cover letter that matches the role and highlights your strengths professionally.",
    button: "Build your First Cover Letter Free",
    href: "https://coverletter.careersenseai.com/",
    image: CoverLetterImg,
    accent: "from-orange-400 to-amber-400",
    iconStyle: "bg-orange-400/15 text-orange-100 ring-orange-300/20",
    buttonStyle: "bg-orange-500 text-white hover:bg-orange-400",
    glow: "group-hover:shadow-orange-500/20",
    chips: ["Tailored Draft", "Role Match", "Quick Edits"],
    status: "live",
  },
  {
    icon: ShieldCheck,
    title: "Skill Certification",
    text: "Validate your skills with structured practice, role-based assessments, and certification-ready prep.",
    button: "Get Free Certification",
    href: "https://certifi.careersenseai.com/",
    image: SkillCertificationImg,
    accent: "from-blue-400 to-indigo-400",
    iconStyle: "bg-blue-400/15 text-blue-100 ring-blue-300/20",
    buttonStyle: "bg-indigo-500 text-white hover:bg-indigo-400",
    glow: "group-hover:shadow-blue-500/20",
    chips: ["Assessments", "Proof of Skill", "Skill Certification"],
    status: "live",
  },
];

function getStatusUi(status) {
  if (status === "live") {
    return {
      badgeClass:
        "border border-emerald-300/35 bg-emerald-400/18 text-emerald-100 ring-1 ring-emerald-300/25",
      badgeText: "LIVE",
      dotClass: "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]",
      showDot: true,
      buttonIcon: ExternalLink,
      external: true,
    };
  }

  return {
    badgeClass:
      "border border-white/35 bg-[linear-gradient(135deg,rgba(103,232,249,0.96),rgba(45,212,191,0.95),rgba(96,165,250,0.94))] text-slate-950 shadow-[0_10px_24px_rgba(14,165,233,0.28)] ring-1 ring-white/20",
    badgeText: "COMING SOON",
    dotClass: "",
    showDot: false,
    buttonIcon: ArrowRight,
    external: false,
  };
}

function getTimeLeftParts(targetDate, now) {
  const totalMs = Math.max(targetDate.getTime() - now.getTime(), 0);
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { totalMs, days, hours, minutes, seconds };
}

function formatCountdownUnit(value) {
  return String(value).padStart(2, "0");
}

function formatLaunchDate(launchAt) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(new Date(launchAt));
}

function ComingSoonModal({ tool, onClose }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const launchTargetDate = useMemo(() => {
    const d = new Date(tool.launchAt);
    if (!isNaN(d.getTime()) && d > now) return d;
    const fallback = new Date();
    fallback.setUTCHours(0, 0, 0, 0);
    fallback.setUTCDate(fallback.getUTCDate() + 28);
    return fallback;
  }, [tool?.launchAt]);

  const countdown = useMemo(
    () => getTimeLeftParts(launchTargetDate, now),
    [launchTargetDate, now]
  );

  const countdownBlocks = [
    { label: "Days", value: formatCountdownUnit(countdown.days) },
    { label: "Hours", value: formatCountdownUnit(countdown.hours) },
    { label: "Minutes", value: formatCountdownUnit(countdown.minutes) },
    { label: "Seconds", value: formatCountdownUnit(countdown.seconds) },
  ];

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-launch-title"
      onClick={onClose}
    >
      {/* ENTERPRISE STYLING: Flat solid backdrop, no heavy glassmorphism */}
      <div className="absolute inset-0 bg-slate-900/80" />
      <div
        className="relative z-10 w-full max-w-[820px] overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[560px]">
              <span className="inline-flex rounded-md bg-cyan-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-cyan-800">
                Coming Soon
              </span>
              <h3
                id="tool-launch-title"
                className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
              >
                {tool.title}
              </h3>
              <p className="mt-3 max-w-[620px] text-base leading-relaxed text-slate-600">
                Launching on{" "}
                <span className="font-semibold text-slate-900">
                  {formatLaunchDate(launchTargetDate)}
                </span>
                . The countdown below shows exactly how long is left.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 shadow-sm transition hover:border-cyan-200 hover:text-slate-900"
              aria-label="Close coming soon dialog"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4 sm:gap-4">
            {countdownBlocks.map((block) => (
              <div
                key={block.label}
                className="rounded-[24px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,246,255,0.94))] px-4 py-6 text-center shadow-[0_14px_30px_rgba(148,163,184,0.12)]"
              >
                <div className="bg-[linear-gradient(135deg,#0891b2,#14b8a6,#2563eb)] bg-clip-text text-[38px] font-black leading-none text-transparent sm:text-[44px]">
                  {block.value}
                </div>
                <div className="mt-4 text-[11px] font-black uppercase tracking-[0.34em] text-slate-500">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolAction({ href, label, className, external, onClick, children }) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {label}
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {label}
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {label}
      {children}
    </Link>
  );
}

function useInViewOnce() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function MainToolCard({ tool, index, isVisible }) {
  const theme = cardThemes[index % cardThemes.length];
  const statusUi = getStatusUi(tool.status);
  const StatusIcon = statusUi.buttonIcon;
  const isComingSoon = tool.status === "coming-soon";

  return (
    <div
      className={`group relative h-[290px] overflow-hidden rounded-[26px] bg-slate-950 shadow-[0_18px_48px_rgba(15,23,42,0.15)] transition-all duration-500 ease-out sm:h-[305px] lg:h-[315px] ${theme.glow} ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <img
        src={theme.image}
        alt={`${tool.title} visual`}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:brightness-110"
      />

      <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(180deg,rgba(2,6,23,0.14),rgba(2,6,23,0.52)_44%,rgba(2,6,23,0.94))]" />
      <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_30%_16%,rgba(255,255,255,0.18),transparent_34%)]" />

      <div
        className={`absolute left-5 top-5 h-1 w-16 rounded-full bg-gradient-to-r ${theme.accent}`}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex justify-end">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur-md ${statusUi.badgeClass}`}
            >
              {statusUi.showDot ? (
                <span className={`h-1.5 w-1.5 rounded-full ${statusUi.dotClass}`} />
              ) : null}
              {statusUi.badgeText}
            </span>
          </div>

          <h3 className="mt-12 max-w-[14ch] text-[22px] leading-[1.1] tracking-tight text-white sm:text-[24px] lg:text-[26px]">
            {tool.title}
          </h3>

          <p className="mt-2.5 max-w-[36ch] text-[12px] font-medium leading-5 text-white/75 sm:text-[13px] sm:leading-5">
            {tool.description || theme.fallback}
          </p>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {theme.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/75 ring-1 ring-white/10 backdrop-blur-md"
              >
                {chip}
              </span>
            ))}
          </div>

          <ToolAction
            href={tool.href}
            external={statusUi.external}
            onClick={tool.onOpen}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-extrabold shadow-lg transition-all duration-300 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[13px] ${theme.button}`}
          >
            {isComingSoon ? "View Launch Details" : tool.button}
            <StatusIcon
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </ToolAction>
        </div>
      </div>
    </div>
  );
}

function SecondaryToolCard({ item, index, isVisible }) {
  const statusUi = getStatusUi(item.status);
  const StatusIcon = statusUi.buttonIcon;

  return (
    <div
      className={`group relative h-[290px] overflow-hidden rounded-[26px] bg-slate-950 shadow-[0_18px_48px_rgba(15,23,42,0.15)] transition-all duration-500 ease-out sm:h-[305px] lg:h-[315px] ${item.glow} ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${360 + index * 110}ms` }}
    >
      <img
        src={item.image}
        alt={`${item.title} visual`}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:brightness-110"
      />
      <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(180deg,rgba(2,6,23,0.14),rgba(2,6,23,0.52)_44%,rgba(2,6,23,0.94))]" />
      <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_30%_16%,rgba(255,255,255,0.18),transparent_34%)]" />
      <div
        className={`absolute left-5 top-5 h-1 w-16 rounded-full bg-gradient-to-r ${item.accent}`}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex justify-end">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur-md ${statusUi.badgeClass}`}
            >
              {statusUi.showDot ? (
                <span className={`h-1.5 w-1.5 rounded-full ${statusUi.dotClass}`} />
              ) : null}
              {statusUi.badgeText}
            </span>
          </div>

          <h3 className="mt-12 max-w-[14ch] text-[22px] leading-[1.1] tracking-tight text-white sm:text-[24px] lg:text-[26px]">
            {item.title}
          </h3>

          <p className="mt-2.5 max-w-[36ch] text-[12px] font-medium leading-5 text-white/75 sm:text-[13px] sm:leading-5">
            {item.text}
          </p>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {item.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/75 ring-1 ring-white/10 backdrop-blur-md"
              >
                {chip}
              </span>
            ))}
          </div>

          <ToolAction
            href={item.href}
            external={statusUi.external}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-extrabold shadow-lg transition-all duration-300 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[13px] ${item.buttonStyle}`}
          >
            {item.button}
            <StatusIcon
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </ToolAction>
        </div>
      </div>
    </div>
  );
}

export default function ToolsSection() {
  const { ref, isVisible } = useInViewOnce();
  const [activeComingSoonTool, setActiveComingSoonTool] = useState(null);

  const toolCardsWithActions = useMemo(
    () =>
      toolCards.map((tool) => ({
        ...tool,
        onOpen:
          tool.status === "coming-soon"
            ? () => setActiveComingSoonTool(tool)
            : undefined,
      })),
    []
  );

  return (
    <>
      <section
        id="career-tools"
        ref={ref}
        className="relative px-5 py-6 sm:px-6 lg:min-h-screen lg:py-6"
      >
        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1320px] flex-col justify-center">
        <div
          className={`mx-auto mb-4 max-w-3xl text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
        

          <h2 className="text-[28px] font-black leading-tight tracking-tight text-black sm:text-[32px] md:text-[34px]">
            Everything You Need in{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
              One Career Platform
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[13px] font-medium leading-6 text-slate-600 sm:max-w-2xl">
            Build resumes, prepare for interviews, check ATS readiness, and earn
            certifications with one focused workflow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toolCardsWithActions.slice(0, 3).map((tool, index) => (
            <MainToolCard
              key={tool.title}
              tool={tool}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          {secondaryTools.map((item, index) => (
            <SecondaryToolCard
              key={item.title}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* E-Learning Materials Section */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                E-Learning <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">Materials</span>
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Access structured guides, cheatsheets, and comprehensive career eBooks.
              </p>
            </div>
            <Link
              to="/dashboard?tab=E-Learning"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-teal-200 bg-teal-50/80 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-all shadow-2xs hover:shadow-xs shrink-0 self-start sm:self-auto"
            >
              Explore Learning <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {ebooks.slice(0, 6).map((material) => (
              <Link
                key={material.slug}
                to={`/ebooks/${material.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={material.thumbnail}
                    alt={material.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-2.5 top-2.5 rounded-full border border-white/20 bg-slate-900/80 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                    {material.format || "PDF"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                      {material.title}
                    </h4>
                    <ExternalLink size={13} className="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between text-[10px] font-semibold text-slate-500">
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold truncate max-w-[110px]">
                      {material.category}
                    </span>
                    <span className="text-slate-400 font-medium">Read Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>

      {activeComingSoonTool ? (
        <ComingSoonModal
          tool={activeComingSoonTool}
          onClose={() => setActiveComingSoonTool(null)}
        />
      ) : null}
    </>
  );
}

import { useMemo, useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useHeroTheme from "../hooks/useHeroTheme";

import GpsArchetypeStep from "../components/gps/GpsArchetypeStep";
import GpsQuestion from "../components/gps/GpsQuestion";
import GpsResults from "../components/gps/GpsResults";

import CareerGpsHero from "../Assets/Career GPS.svg";

import {
  archetypeQuestions,
  gpsQuestions,
  calculateGpsResults,
  resolveArchetype,
  getReadinessLevel,
  careerArchetypes,
} from "../data/careerGpsData";

// ============================================================
// FIELD ICONS
// ============================================================

function FieldIcon({ type = "user", className = "" }) {
  if (type === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-[19px] w-[19px] ${className}`}
      >
        <rect
          x="3.5"
          y="5.5"
          width="17"
          height="13"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.65"
        />
        <path
          d="m4.5 7 7.5 5.3L19.5 7"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-[19px] w-[19px] ${className}`}
      >
        <circle
          cx="12"
          cy="12"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-[19px] w-[19px] ${className}`}
    >
      <circle
        cx="12"
        cy="8"
        r="3.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.3 19a6.7 6.7 0 0 1 13.4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ============================================================
// REPORT ICON
// ============================================================

function ReportIcon({ type, isLight }) {
  const styles = {
    archetype: isLight
      ? "bg-[#EEF4FF] text-[#2463EB]"
      : "bg-blue-950/50 text-blue-300",

    pipeline: isLight
      ? "bg-[#EAFBF7] text-[#12B99D]"
      : "bg-emerald-950/40 text-emerald-300",

    plan: isLight
      ? "bg-[#F5EEFF] text-[#8B5CF6]"
      : "bg-violet-950/40 text-violet-300",

    tools: isLight
      ? "bg-[#FFF3E7] text-[#F97316]"
      : "bg-orange-950/40 text-orange-300",

    share: isLight
      ? "bg-[#EEF4FF] text-[#2463EB]"
      : "bg-blue-950/50 text-blue-300",
  };

  return (
    <div
      className={`
        flex h-[46px] w-[46px] shrink-0
        items-center justify-center rounded-[15px]
        ${styles[type]}
      `}
    >
      {type === "pipeline" && (
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]">
          <rect
            x="3"
            y="14"
            width="3.4"
            height="7"
            rx="1.2"
            fill="currentColor"
            opacity="0.7"
          />
          <rect
            x="10.3"
            y="9"
            width="3.4"
            height="12"
            rx="1.2"
            fill="currentColor"
            opacity="0.85"
          />
          <rect
            x="17.6"
            y="4"
            width="3.4"
            height="17"
            rx="1.2"
            fill="currentColor"
          />
        </svg>
      )}

      {type === "plan" && (
        <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
          <rect
            x="6"
            y="4"
            width="12"
            height="16"
            rx="2.3"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 3.5v3M15 3.5v3M9 10h6M9 14h6M9 17h3.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )}

      {type === "tools" && (
        <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
          <path
            d="m10.2 13.8-3 3a2.5 2.5 0 0 1-3.5-3.5l3-3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="m13.8 10.2 3-3a2.5 2.5 0 0 1 3.5 3.5l-3 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="m9.5 14.5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}

      {type === "share" && (
        <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
          <circle
            cx="6"
            cy="12"
            r="2.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="17.5"
            cy="6"
            r="2.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="17.5"
            cy="18"
            r="2.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m8 11 7.3-4M8 13l7.3 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}

      {type === "archetype" && (
        <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
          <circle
            cx="12"
            cy="8"
            r="3.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5.5 19a6.5 6.5 0 0 1 13 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

// ============================================================
// BENEFIT ICON
// ============================================================

function BenefitIcon({ type }) {
  if (type === "time") {
    return (
      <svg viewBox="0 0 24 24" className="h-[23px] w-[23px]">
        <path
          d="M13.2 2.3 6.3 13h5l-1 8.7 7.5-11.6h-4.9l.3-7.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "secure") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
        <rect
          x="5.5"
          y="10"
          width="13"
          height="9"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "results") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-[23px] w-[23px]">
        <path
          d="M8 5h8M7 3h10v5a5 5 0 0 1-10 0V3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 5H4.5v2A4.5 4.5 0 0 0 9 11.5M17 5h2.5v2a4.5 4.5 0 0 1-4.5 4.5M12 13v4M9 20h6M10 17h4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[23px] w-[23px]">
      <path
        d="M12 3.5 5.5 6v5.3c0 4.4 2.7 7 6.5 9.2 3.8-2.2 6.5-4.8 6.5-9.2V6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m9.2 12 1.9 1.9 3.8-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================================
// INPUT
// ============================================================

function GpsInput({
  label,
  type,
  inputType = "text",
  value,
  placeholder,
  onChange,
  isLight,
}) {
  return (
    <label className="block">
      <span
        className={`
          mb-[7px] block text-[12px] font-semibold lg:mb-[5px] lg:text-[11px]
          ${isLight ? "text-[#25334F]" : "text-slate-200"}
        `}
      >
        {label}
        <span className="ml-1 text-red-500">*</span>
      </span>

      <div className="relative">
        <FieldIcon
          type={type}
          className={`
            pointer-events-none absolute
            left-[16px] top-1/2 -translate-y-1/2
            ${isLight ? "text-[#8CA0BF]" : "text-slate-500"}
          `}
        />

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`
            h-[52px] w-full rounded-[13px] border lg:h-[44px] lg:rounded-[11px]
            pl-[47px] pr-4 text-[13px]
            outline-none transition-all duration-200
            ${
              isLight
                ? `
                  border-[#D8E1EF]
                  bg-white text-slate-900
                  placeholder:text-[#8797B4]
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-500/10
                `
                : `
                  border-slate-700
                  bg-slate-900 text-white
                  placeholder:text-slate-500
                  focus:border-cyan-500
                  focus:ring-4 focus:ring-cyan-500/10
                `
            }
          `}
        />
      </div>
    </label>
  );
}

// ============================================================
// REPORT ROW
// ============================================================

function ReportRow({ item, isLight, isLast = false }) {
  return (
    <div
      className={`
        flex min-h-[78px] items-center gap-[14px]
        py-[12px] lg:min-h-[60px] lg:py-[8px]
        ${!isLast ? "border-b" : ""}
        ${isLight ? "border-[#EDF1F7]" : "border-slate-800"}
      `}
    >
      <ReportIcon type={item.type} isLight={isLight} />

      <div className="min-w-0">
        <p
          className={`
            text-[13px] font-bold leading-[18px]
            ${isLight ? "text-[#071536]" : "text-white"}
          `}
        >
          {item.title}
        </p>

        <p
          className={`
            mt-[4px] text-[11px] leading-[17px]
            ${isLight ? "text-[#5D6D88]" : "text-slate-400"}
          `}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// BENEFIT
// ============================================================

function GpsBenefit({
  type,
  title,
  description,
  isLight,
  last = false,
}) {
  const iconStyle = {
    free: isLight
      ? "bg-[#EAF2FF] text-[#2870F1]"
      : "bg-blue-950/50 text-blue-300",

    time: isLight
      ? "bg-[#EAFBF5] text-[#2CCFA4]"
      : "bg-emerald-950/40 text-emerald-300",

    secure: isLight
      ? "bg-[#F3ECFF] text-[#9460F6]"
      : "bg-violet-950/40 text-violet-300",

    results: isLight
      ? "bg-[#FFF5DF] text-[#F5A900]"
      : "bg-amber-950/40 text-amber-300",
  };

  return (
    <div
      className={`
        flex items-center gap-[14px]
        px-5 py-1
        ${
          !last
            ? isLight
              ? "lg:border-r lg:border-[#E8EDF5]"
              : "lg:border-r lg:border-slate-700"
            : ""
        }
      `}
    >
      <div
        className={`
          flex h-[46px] w-[46px] shrink-0
          items-center justify-center rounded-[15px]
          ${iconStyle[type]}
        `}
      >
        <BenefitIcon type={type} />
      </div>

      <div>
        <p
          className={`
            text-[13px] font-bold
            ${isLight ? "text-[#071536]" : "text-white"}
          `}
        >
          {title}
        </p>

        <p
          className={`
            mt-[2px] text-[10px]
            ${isLight ? "text-[#65748E]" : "text-slate-400"}
          `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// INTRO
// ============================================================

function GpsIntro({
  heroTheme,
  profile,
  onChange,
  onStart,
}) {
  const isLight = heroTheme === "light";

  const isReady =
    profile.name.trim() &&
    profile.email.trim() &&
    profile.targetRole.trim();

  const leftReportItems = [
    {
      type: "archetype",
      title: "Your Career Archetype",
      description: "Climber, Switcher, Fresh Grad, Returner",
    },
    {
      type: "plan",
      title: "A 3-Step Action Plan",
      description: "Personalized, sequenced steps for your archetype",
    },
    {
      type: "share",
      title: "Shareable Career Score Card",
      description: "Showcase your score and plan on LinkedIn",
    },
  ];

  const rightReportItems = [
    {
      type: "pipeline",
      title: "5-Phase Pipeline Scorecard",
      description: "Resume → ATS → Certifi → Cover Letter → Interview",
    },
    {
      type: "tools",
      title: "Right Tools. Right Now.",
      description: "Direct links to the right CareerSense tools for each gap",
    },
  ];

  return (
    <section
      className={`
        relative min-h-[calc(100vh-74px)] overflow-hidden
        ${isLight ? "bg-[#F8FAFE]" : "bg-slate-950"}
      `}
    >
      {/* ===============================================
          BACKGROUND AMBIENCE
      =============================================== */}

      <div
        className={`
          pointer-events-none absolute inset-0
          ${
            isLight
              ? `
                bg-[radial-gradient(circle_at_21%_25%,rgba(59,130,246,0.065),transparent_28%),radial-gradient(circle_at_76%_27%,rgba(14,165,233,0.06),transparent_23%)]
              `
              : `
                bg-[radial-gradient(circle_at_21%_25%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_76%_27%,rgba(14,165,233,0.10),transparent_23%)]
              `
          }
        `}
      />

      {/* subtle right-side grid */}
      <div
        className={`
          pointer-events-none absolute right-0 top-0
          hidden h-full w-[30%] lg:block
          bg-[size:18px_18px]
          ${
            isLight
              ? `
                bg-[linear-gradient(to_right,rgba(69,125,219,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(69,125,219,0.045)_1px,transparent_1px)]
              `
              : `
                bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)]
              `
          }
        `}
      />

      <div
        className="
          relative z-10 mx-auto
          max-w-[1460px]
          px-6 pb-7 pt-9
          lg:px-10 lg:pb-4 lg:pt-12
          xl:px-14
        "
      >
        {/* ===============================================
            HERO + FORM
        =============================================== */}

        <div
          className="
            grid items-start gap-8
            lg:grid-cols-[1.12fr_0.88fr]
            lg:gap-10
            xl:grid-cols-[1.15fr_0.85fr]
            xl:gap-12
          "
        >
          {/* =============================================
              LEFT SIDE
          ============================================= */}

          <div className="min-w-0">
            {/* Hero block */}
            <div
              className="
                relative
                lg:min-h-[230px]
                lg:pr-[255px]
                xl:min-h-[236px]
                xl:pr-[285px]
              "
            >
              {/* Badge */}
              <div
                className={`
                  inline-flex items-center gap-[8px]
                  rounded-full border
                  px-[16px] py-[9px]
                  text-[11px] font-extrabold
                  uppercase tracking-[0.1em]
                  ${
                    isLight
                      ? "border-[#D4E6FF] bg-[#E5F0FF] text-[#075DE7] shadow-[0_4px_12px_rgba(37,99,235,0.08)]"
                      : "border-cyan-800/70 bg-cyan-950/55 text-cyan-300"
                  }
                `}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[15px] w-[15px]"
                >
                  <path
                    d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                Career GPS
              </div>

              {/* Heading */}
              <h1
                className={`
                  relative z-10 mt-[20px] w-fit max-w-none text-[clamp(30px,8.8vw,40px)] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-[46px]
                  lg:mt-[14px] lg:text-[43px]
                  xl:text-[46px]
                  2xl:text-[49px]
                  ${
                    isLight
                      ? "text-[#050E27]"
                      : "text-white"
                  }
                `}
              >
                <span className="block whitespace-nowrap">Map your exact route</span>
                <span className="block whitespace-nowrap">
                  to{" "}
                  <span
                    className="
                      bg-gradient-to-r
                      from-[#2563EB]
                      via-[#1599EE]
                      to-[#25C9DD]
                      bg-clip-text
                      text-transparent
                    "
                  >
                    getting hired.
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p
                className={`
                  mt-[20px] lg:mt-[13px]
                  max-w-[570px]
                  text-[14px]
                  leading-[1.8] lg:leading-[1.6]
                  xl:text-[14px]
                  ${
                    isLight
                      ? "text-[#4E607C]"
                      : "text-slate-300"
                  }
                `}
              >
                Career GPS diagnoses your job-readiness across 5 essential
                phases — from your resume and ATS score to interview readiness.
                Get a personalized 3-step action plan for your profile.
              </p>

              {/* Real SVG artwork */}
              <div
                className="
                  absolute right-0 top-[20px]
                  hidden
                  lg:flex lg:w-[205px]
                  xl:w-[225px]
                  2xl:w-[240px]
                  items-center justify-center
                "
              >
                <div className="absolute inset-x-8 bottom-2 h-16 rounded-full bg-blue-300/20 blur-3xl" />

                <img
                  src={CareerGpsHero}
                  alt="Career GPS roadmap"
                  className="
                    relative h-auto w-full object-contain
                    drop-shadow-[0_22px_32px_rgba(37,99,235,0.13)]
                  "
                />
              </div>
            </div>

            {/* Mobile hero artwork */}
            <div className="mt-6 flex justify-center lg:hidden">
              <img
                src={CareerGpsHero}
                alt="Career GPS roadmap"
                className="w-full max-w-[300px] object-contain"
              />
            </div>

            {/* =============================================
                GPS REPORT CARD
            ============================================= */}

            <div
              className={`
                mt-[18px] lg:mt-[12px]
                rounded-[22px] border
                px-6 pb-[10px] pt-[21px] lg:rounded-[18px] lg:px-5 lg:pb-[7px] lg:pt-[14px]
                ${
                  isLight
                    ? `
                      border-[#DCE4EF]
                      bg-white/90
                      shadow-[0_16px_44px_rgba(22,52,103,0.045)]
                    `
                    : `
                      border-slate-700
                      bg-slate-900/82
                    `
                }
              `}
            >
              <h2
                className={`
                  text-[17px] font-bold lg:text-[15px]
                  tracking-[-0.015em]
                  ${
                    isLight
                      ? "text-[#071536]"
                      : "text-white"
                  }
                `}
              >
                What's in your GPS report
              </h2>

              <div
                className="
                  mt-[9px] lg:mt-[5px]
                  grid
                  sm:grid-cols-2
                  sm:gap-x-7
                "
              >
                {/* Left column */}
                <div>
                  {leftReportItems.map((item, index) => (
                    <ReportRow
                      key={item.title}
                      item={item}
                      isLight={isLight}
                      isLast={index === leftReportItems.length - 1}
                    />
                  ))}
                </div>

                {/* Right column */}
                <div>
                  {rightReportItems.map((item, index) => (
                    <ReportRow
                      key={item.title}
                      item={item}
                      isLight={isLight}
                      isLast={index === rightReportItems.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* =============================================
                TRUST STRIP
            ============================================= */}

            
          </div>

          {/* =============================================
              RIGHT FORM
          ============================================= */}

          <div className="flex justify-center lg:justify-end">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isReady) onStart();
              }}
              className={`
                w-full max-w-[535px]
                rounded-[28px] border
                px-8 pb-[30px] pt-[33px]
                lg:rounded-[22px] lg:px-7 lg:pb-[18px] lg:pt-[20px]
                xl:px-8
                ${
                  isLight
                    ? `
                      border-white
                      bg-white
                      shadow-[0_28px_70px_rgba(34,96,191,0.115)]
                    `
                    : `
                      border-slate-700
                      bg-slate-900
                      shadow-[0_28px_70px_rgba(0,0,0,0.35)]
                    `
                }
              `}
            >
              {/* Compass icon */}
              <div
                className="
                  mx-auto
                  flex h-[67px] w-[67px] lg:h-[52px] lg:w-[52px]
                  items-center justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#2765EC]
                  via-[#1599EE]
                  to-[#27C8D8]
                  shadow-[0_14px_32px_rgba(37,99,235,0.22)]
                "
              >
                <div
                  className="
                    flex h-[41px] w-[41px] lg:h-[32px] lg:w-[32px]
                    items-center justify-center
                    rounded-full bg-white
                    text-[#2169EA]
                  "
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
                    <path
                      d="m7 13 9-5-5 9-1-4-3 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              {/* Form heading */}
              <div className="mt-[22px] text-center lg:mt-[13px]">
                <h2
                  className={`
                    text-[24px] font-bold lg:text-[21px]
                    tracking-[-0.025em]
                    xl:text-[22px]
                    ${
                      isLight
                        ? "text-[#071536]"
                        : "text-white"
                    }
                  `}
                >
                  Let's set up your GPS
                </h2>

                <p
                  className={`
                    mt-[8px] text-[13px] lg:mt-[5px] lg:text-[12px]
                    ${
                      isLight
                        ? "text-[#667792]"
                        : "text-slate-400"
                    }
                  `}
                >
                  Takes 5 minutes. Completely free.
                </p>
              </div>

              {/* Fields */}
              <div className="mt-[31px] grid gap-[18px] lg:mt-[18px] lg:gap-[12px]">
                <GpsInput
                  label="Full Name"
                  type="user"
                  value={profile.name}
                  placeholder="Your full name"
                  onChange={(e) =>
                    onChange("name", e.target.value)
                  }
                  isLight={isLight}
                />

                <GpsInput
                  label="Email"
                  type="email"
                  inputType="email"
                  value={profile.email}
                  placeholder="email@example.com"
                  onChange={(e) =>
                    onChange("email", e.target.value)
                  }
                  isLight={isLight}
                />

                <GpsInput
                  label="Target Role"
                  type="target"
                  value={profile.targetRole}
                  placeholder="e.g. Software Engineer, Product Manager"
                  onChange={(e) =>
                    onChange("targetRole", e.target.value)
                  }
                  isLight={isLight}
                />
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={!isReady}
                className="
                  mt-[22px] lg:mt-[14px]
                  flex h-[55px] w-full lg:h-[48px]
                  items-center justify-center
                  gap-[13px]
                  rounded-[13px]
                  bg-gradient-to-r
                  from-[#0757E6]
                  via-[#0876EE]
                  to-[#119FEC]
                  text-[14px] font-bold
                  text-white
                  shadow-[0_14px_30px_rgba(14,116,241,0.23)]
                  transition-all duration-200
                  hover:-translate-y-[1px]
                  hover:shadow-[0_18px_36px_rgba(14,116,241,0.29)]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:translate-y-0
                "
              >
                Start My GPS Assessment

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[19px] w-[19px]"
                >
                  <path
                    d="M5 12h13M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Security */}
              <div
                className={`
                  mt-[16px] lg:mt-[11px]
                  flex items-center justify-center
                  gap-[8px]
                  text-[10px]
                  ${
                    isLight
                      ? "text-[#8090A9]"
                      : "text-slate-500"
                  }
                `}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[14px] w-[14px]"
                >
                  <rect
                    x="5.5"
                    y="10"
                    width="13"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>

                Your data is secure and will never be shared.
              </div>
            </form>
          </div>
        </div>

        {/* ===============================================
            BOTTOM BENEFITS
        =============================================== */}

        <div
          className={`
            mt-[27px] lg:mt-[16px]
            grid gap-4
            rounded-[20px] border
            px-5 py-[17px] lg:py-[12px]
            sm:grid-cols-2
            lg:grid-cols-4
            ${
              isLight
                ? `
                  border-[#DDE5EF]
                  bg-white/92
                  shadow-[0_12px_35px_rgba(16,48,95,0.035)]
                `
                : `
                  border-slate-700
                  bg-slate-900/85
                `
            }
          `}
        >
          <GpsBenefit
            type="free"
            title="100% Free"
            description="Full report at no cost"
            isLight={isLight}
          />

          <GpsBenefit
            type="time"
            title="5 Minutes"
            description="Quick & easy assessment"
            isLight={isLight}
          />

          <GpsBenefit
            type="secure"
            title="Private & Secure"
            description="Your data is protected"
            isLight={isLight}
          />

          <GpsBenefit
            type="results"
            title="Actionable Results"
            description="Clear steps. Real progress."
            isLight={isLight}
            last
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CACHE HELPERS
// ============================================================

const CACHE_KEY = "careersense_gps_cache";

function getLocalCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getGuestSessionCache() {
  try {
    const raw = sessionStorage.getItem(
      "cs_guest_active_session_report"
    );

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setLocalCache(payload) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(payload)
    );
  } catch {
    // local cache unavailable
  }
}

// ============================================================
// INITIAL PROFILE
// ============================================================

const initialProfile = {
  name: "",
  email: "",
  targetRole: "",
  status: "Job Seeker",
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function CareerGpsPage() {
  const {
    heroTheme,
    toggleHeroTheme,
  } = useHeroTheme();

  const {
    user,
    isLoaded,
  } = useUser();

  const {
    getToken,
  } = useAuth();

  const isLight =
    heroTheme === "light";

  // ----------------------------------------------------------
  // INITIAL STEP
  // ----------------------------------------------------------

  const [step, setStep] = useState(() => {
    const localC =
      getLocalCache();

    if (
      localC &&
      localC.answers &&
      Object.keys(localC.answers).length > 0
    ) {
      return "results";
    }

    const guestCache =
      getGuestSessionCache();

    if (
      guestCache &&
      guestCache.answers &&
      Object.keys(guestCache.answers).length > 0
    ) {
      return "results";
    }

    return "intro";
  });

  // ----------------------------------------------------------
  // PROFILE
  // ----------------------------------------------------------

  const [profile, setProfile] = useState(() => {
    const localC =
      getLocalCache();

    if (localC?.profile) {
      return {
        ...initialProfile,
        ...localC.profile,
      };
    }

    const guestCache =
      getGuestSessionCache();

    if (guestCache?.profile) {
      return {
        ...initialProfile,
        ...guestCache.profile,
      };
    }

    return initialProfile;
  });

  // ----------------------------------------------------------
  // ANSWERS
  // ----------------------------------------------------------

  const [answers, setAnswers] = useState(() => {
    const localC =
      getLocalCache();

    if (localC?.answers) {
      return localC.answers;
    }

    const guestCache =
      getGuestSessionCache();

    return guestCache?.answers || {};
  });

  // ----------------------------------------------------------
  // ARCHETYPE ANSWERS
  // ----------------------------------------------------------

  const [
    archetypeAnswers,
    setArchetypeAnswers,
  ] = useState(() => {
    const localC =
      getLocalCache();

    if (localC?.archetypeAnswers) {
      return localC.archetypeAnswers;
    }

    const guestCache =
      getGuestSessionCache();

    return guestCache?.archetypeAnswers || {};
  });

  // ----------------------------------------------------------
  // ARCHETYPE
  // ----------------------------------------------------------

  const [
    archetype,
    setArchetype,
  ] = useState(() => {
    const localC =
      getLocalCache();

    if (localC?.archetype) {
      return (
        careerArchetypes[localC.archetype] ||
        resolveArchetype(
          localC.archetypeAnswers || {}
        )
      );
    }

    const guestCache =
      getGuestSessionCache();

    if (guestCache?.archetype) {
      return (
        careerArchetypes[guestCache.archetype] ||
        resolveArchetype(
          guestCache.archetypeAnswers || {}
        )
      );
    }

    return null;
  });

  // ----------------------------------------------------------
  // AI DIAGNOSIS
  // ----------------------------------------------------------

  const [
    aiDiagnosis,
    setAiDiagnosis,
  ] = useState(() => {
    const localC =
      getLocalCache();

    if (localC?.aiDiagnosis) {
      return localC.aiDiagnosis;
    }

    const guestCache =
      getGuestSessionCache();

    return guestCache?.aiDiagnosis || null;
  });

  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    isAiLoading,
    setIsAiLoading,
  ] = useState(false);

  const [
    isRestoring,
    setIsRestoring,
  ] = useState(() => {
    const localC =
      getLocalCache();

    return !(
      localC &&
      localC.answers &&
      Object.keys(localC.answers).length > 0
    );
  });

  const currentQuestion =
    gpsQuestions[questionIndex];

  const results =
    useMemo(
      () => calculateGpsResults(answers),
      [answers]
    );

  // ==========================================================
  // FETCH AI DIAGNOSIS
  // ==========================================================

  async function fetchAiDiagnosis(
    computedResults,
    reportTakenAt = null
  ) {
    setIsAiLoading(true);

    try {
      const apiBase =
        import.meta.env.VITE_API_URL ||
        "https://server.datasenseai.com";

      const endpoint =
        user
          ? `${apiBase}/careersense/assessment/ai-diagnose`
          : `${apiBase}/careersense/assessment/ai-diagnose-guest`;

      const headers = {
        "Content-Type": "application/json",
      };

      if (user) {
        const token =
          await getToken();

        headers.Authorization =
          `Bearer ${token}`;
      }

      const response =
        await fetch(
          endpoint,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              profile,
              archetype,
              categoryScores:
                computedResults.categoryScores,
              answers,
              reportTakenAt:
                reportTakenAt ||
                new Date().toISOString(),
            }),
          }
        );

      if (response.ok) {
        const data =
          await response.json();

        setAiDiagnosis(data);

        setLocalCache({
          profile,
          answers,
          archetypeAnswers,
          archetype:
            archetype?.id,
          aiDiagnosis: data,
        });

        return data;
      }
    } catch (err) {
      console.error(
        "AI diagnosis fetch error:",
        err
      );
    } finally {
      setIsAiLoading(false);
    }

    return null;
  }

  // ==========================================================
  // LIVE ACTIVITY
  // ==========================================================

  async function syncLiveActivity(
    reportTakenAt
  ) {
    if (!user) return;

    try {
      const token =
        await getToken();

      const apiBase =
        import.meta.env.VITE_API_URL ||
        "https://server.datasenseai.com";

      const res =
        await fetch(
          `${apiBase}/careersense/assessment/sync-live-activity`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              reportTakenAt,
            }),
          }
        );

      if (res.ok) {
        const {
          completedPhases,
        } = await res.json();

        if (completedPhases) {
          setAiDiagnosis((prev) =>
            prev
              ? {
                  ...prev,
                  completedPhases,
                }
              : prev
          );
        }
      }
    } catch (err) {
      console.error(
        "Error syncing live activity:",
        err
      );
    }
  }

  // ==========================================================
  // RESTORE LATEST REPORT
  // ==========================================================

  useEffect(() => {
    const loadLatestSavedReport =
      async () => {
        if (!user) {
          setIsRestoring(false);
          return;
        }

        try {
          const token =
            await getToken();

          const apiBase =
            import.meta.env.VITE_API_URL ||
            "https://server.datasenseai.com";

          const res =
            await fetch(
              `${apiBase}/careersense/assessment/latest`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          if (res.ok) {
            const data =
              await res.json();

            if (
              data &&
              data.answers &&
              Object.keys(data.answers).length > 0
            ) {
              const restoredProfile =
                data.profile
                  ? {
                      ...profile,
                      ...data.profile,
                    }
                  : profile;

              if (data.profile) {
                setProfile(
                  restoredProfile
                );
              }

              setAnswers(
                data.answers || {}
              );

              if (
                data.archetypeAnswers
              ) {
                setArchetypeAnswers(
                  data.archetypeAnswers
                );
              }

              const resolved =
                data.archetype
                  ? careerArchetypes[
                      data.archetype
                    ]
                  : resolveArchetype(
                      data.archetypeAnswers ||
                        {}
                    );

              if (resolved) {
                setArchetype(
                  resolved
                );
              }

              const computed =
                calculateGpsResults(
                  data.answers || {}
                );

              setStep("results");

              const currentAi =
                data.aiDiagnosis;

              const reportTakenAt =
                data.takenAt ||
                data.createdAt;

              if (
                currentAi &&
                currentAi.sprintPlan
              ) {
                setAiDiagnosis(
                  currentAi
                );

                setLocalCache({
                  profile:
                    restoredProfile,
                  answers:
                    data.answers,
                  archetypeAnswers:
                    data.archetypeAnswers,
                  archetype:
                    data.archetype ||
                    resolved?.id,
                  aiDiagnosis:
                    currentAi,
                  takenAt:
                    reportTakenAt,
                });

                if (reportTakenAt) {
                  syncLiveActivity(
                    reportTakenAt
                  );
                }
              } else {
                fetchAiDiagnosis(
                  computed,
                  reportTakenAt
                ).then((aiData) => {
                  if (!aiData) {
                    return;
                  }

                  setLocalCache({
                    profile:
                      restoredProfile,
                    answers:
                      data.answers,
                    archetypeAnswers:
                      data.archetypeAnswers,
                    archetype:
                      data.archetype ||
                      resolved?.id,
                    aiDiagnosis:
                      aiData,
                    takenAt:
                      reportTakenAt,
                  });

                  fetch(
                    `${apiBase}/careersense/assessment/save`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type":
                          "application/json",
                        Authorization:
                          `Bearer ${token}`,
                      },
                      body:
                        JSON.stringify({
                          profile:
                            restoredProfile,
                          answers:
                            data.answers,
                          archetypeAnswers:
                            data.archetypeAnswers,
                          archetype:
                            data.archetype ||
                            resolved?.id,
                          aiDiagnosis:
                            aiData,
                          results: {
                            overallScore:
                              computed.overallScore,
                            categoryScores:
                              computed.categoryScores,
                            readinessLevel:
                              {
                                label:
                                  computed
                                    .readinessLevel
                                    .label,
                                summary:
                                  computed
                                    .readinessLevel
                                    .summary,
                              },
                          },
                        }),
                    }
                  ).catch(console.error);
                });
              }
            }
          }
        } catch (err) {
          console.error(
            "Error restoring saved assessment report:",
            err
          );
        } finally {
          setIsRestoring(false);
        }
      };

    if (
      isLoaded &&
      user
    ) {
      loadLatestSavedReport();
    } else if (
      isLoaded &&
      !user
    ) {
      const guestC =
        getGuestSessionCache();

      if (!guestC) {
        setStep("intro");
        setProfile(
          initialProfile
        );
        setAnswers({});
        setArchetypeAnswers(
          {}
        );
        setArchetype(null);
        setAiDiagnosis(null);
      }

      setIsRestoring(false);
    }
  }, [
    isLoaded,
    user,
    getToken,
  ]);

  // ==========================================================
  // PREFILL CLERK PROFILE
  // ==========================================================

  useEffect(() => {
    if (
      isLoaded &&
      user &&
      !profile.name
    ) {
      setProfile((prev) => ({
        ...prev,

        name:
          user.fullName ||
          prev.name ||
          "",

        email:
          user
            .primaryEmailAddress
            ?.emailAddress ||
          prev.email ||
          "",
      }));
    }
  }, [
    isLoaded,
    user,
    profile.name,
  ]);

  // ==========================================================
  // PROFILE CHANGE
  // ==========================================================

  function updateProfile(
    field,
    value
  ) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // ==========================================================
  // ARCHETYPE COMPLETE
  // ==========================================================

  function handleArchetypeComplete(
    answersData
  ) {
    setArchetypeAnswers(
      answersData
    );

    const resolved =
      resolveArchetype(
        answersData
      );

    setArchetype(
      resolved
    );

    const customRole =
      answersData[
        "custom-role"
      ];

    setProfile((prev) => ({
      ...prev,

      status:
        resolved.label ||
        prev.status ||
        "Job Seeker",

      targetRole:
        customRole ||
        prev.targetRole ||
        "Software Developer",
    }));

    setStep(
      "questions"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================================
  // LIVE SCORES
  // ==========================================================

  const effectiveCategoryScores =
    useMemo(() => {
      const base = {
        ...results.categoryScores,
      };

      if (
        aiDiagnosis?.completedPhases
      ) {
        if (
          aiDiagnosis
            .completedPhases
            .ats
        ) {
          base.ats = 100;
        }

        if (
          aiDiagnosis
            .completedPhases
            .skills
        ) {
          base.skills = 100;
        }

        if (
          aiDiagnosis
            .completedPhases
            .coverletter
        ) {
          base.coverletter =
            100;
        }

        if (
          aiDiagnosis
            .completedPhases
            .resume
        ) {
          base.resume = 100;
        }

        if (
          aiDiagnosis
            .completedPhases
            .interview
        ) {
          base.interview =
            100;
        }
      }

      return base;
    }, [
      results.categoryScores,
      aiDiagnosis?.completedPhases,
    ]);

  const effectiveOverallScore =
    useMemo(() => {
      const values =
        Object.values(
          effectiveCategoryScores
        );

      if (
        values.length === 0
      ) {
        return results.overallScore;
      }

      return Math.round(
        values.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / values.length
      );
    }, [
      effectiveCategoryScores,
      results.overallScore,
    ]);

  // ==========================================================
  // ANSWER
  // ==========================================================

  function selectAnswer(
    score
  ) {
    setAnswers((prev) => ({
      ...prev,

      [currentQuestion.id]:
        score,
    }));
  }

  // ==========================================================
  // NEXT
  // ==========================================================

  function goNext() {
    if (
      answers[
        currentQuestion.id
      ] === undefined
    ) {
      return;
    }

    if (
      questionIndex ===
      gpsQuestions.length - 1
    ) {
      const computed =
        calculateGpsResults(
          answers
        );

      const reportTakenAt =
        new Date().toISOString();

      setStep("results");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      fetchAiDiagnosis(
        computed,
        reportTakenAt
      ).then((aiData) => {
        saveResults(
          aiData,
          reportTakenAt
        );
      });

      return;
    }

    setQuestionIndex(
      (prev) => prev + 1
    );
  }

  // ==========================================================
  // PREVIOUS
  // ==========================================================

  function goPrevious() {
    setQuestionIndex(
      (prev) =>
        Math.max(
          0,
          prev - 1
        )
    );
  }

  // ==========================================================
  // SAVE RESULTS
  // ==========================================================

  async function saveResults(
    aiData = null,
    reportTakenAt = null
  ) {
    const finalDiagnosis =
      aiData ||
      aiDiagnosis;

    const takenAt =
      reportTakenAt ||
      new Date().toISOString();

    if (user) {
      setLocalCache({
        profile,
        answers,
        archetypeAnswers,

        archetype:
          archetype?.id,

        aiDiagnosis:
          finalDiagnosis,

        takenAt,
      });
    } else {
      try {
        sessionStorage.setItem(
          "cs_guest_active_session_report",
          JSON.stringify({
            profile,
            answers,
            archetypeAnswers,

            archetype:
              archetype?.id,

            aiDiagnosis:
              finalDiagnosis,

            takenAt,
          })
        );

        localStorage.setItem(
          "cs_guest_gps_report",
          JSON.stringify({
            profile,
            answers,
            archetypeAnswers,

            archetype:
              archetype?.id,

            aiDiagnosis:
              finalDiagnosis,

            takenAt,
          })
        );
      } catch {
        // ignored
      }

      return;
    }

    try {
      const token =
        await getToken();

      const apiBase =
        import.meta.env.VITE_API_URL ||
        "https://server.datasenseai.com";

      const computed =
        calculateGpsResults(
          answers
        );

      await fetch(
        `${apiBase}/careersense/assessment/save`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            profile,
            answers,
            archetypeAnswers,

            archetype:
              archetype?.id,

            aiDiagnosis:
              finalDiagnosis,

            results: {
              overallScore:
                computed.overallScore,

              categoryScores:
                computed.categoryScores,

              readinessLevel: {
                label:
                  computed
                    .readinessLevel
                    .label,

                summary:
                  computed
                    .readinessLevel
                    .summary,
              },
            },

            takenAt,

            source:
              "career-gps",
          }),
        }
      );
    } catch (err) {
      console.error(
        "GPS save error:",
        err
      );
    }
  }

  // ==========================================================
  // CLAIM GUEST REPORT AFTER LOGIN
  // ==========================================================

  useEffect(() => {
    const claimGuestReportIfAny =
      async () => {
        if (!user) {
          return;
        }

        try {
          const guestDataRaw =
            localStorage.getItem(
              "cs_guest_gps_report"
            );

          if (!guestDataRaw) {
            return;
          }

          const guestData =
            JSON.parse(
              guestDataRaw
            );

          const token =
            await getToken();

          const apiBase =
            import.meta.env.VITE_API_URL ||
            "https://server.datasenseai.com";

          const computed =
            calculateGpsResults(
              guestData.answers ||
                {}
            );

          await fetch(
            `${apiBase}/careersense/assessment/save`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  profile:
                    guestData.profile ||
                    profile,

                  answers:
                    guestData.answers ||
                    {},

                  archetypeAnswers:
                    guestData.archetypeAnswers ||
                    {},

                  archetype:
                    guestData.archetype,

                  aiDiagnosis:
                    guestData.aiDiagnosis,

                  results: {
                    overallScore:
                      computed.overallScore,

                    categoryScores:
                      computed.categoryScores,

                    readinessLevel: {
                      label:
                        computed
                          .readinessLevel
                          .label,

                      summary:
                        computed
                          .readinessLevel
                          .summary,
                    },
                  },

                  takenAt:
                    guestData.takenAt ||
                    new Date().toISOString(),

                  source:
                    "guest-claim",
                }),
            }
          );

          localStorage.removeItem(
            "cs_guest_gps_report"
          );
        } catch (err) {
          console.error(
            "Guest report auto-claim error:",
            err
          );
        }
      };

    claimGuestReportIfAny();
  }, [
    isLoaded,
    user,
    getToken,
  ]);

  // ==========================================================
  // RESTART
  // ==========================================================

  function restart() {
    try {
      if (user) {
        localStorage.removeItem(
          CACHE_KEY
        );
      }

      sessionStorage.removeItem(
        "cs_guest_active_session_report"
      );
    } catch {
      // ignored
    }

    setStep("intro");

    setProfile(
      initialProfile
    );

    setAnswers({});

    setArchetypeAnswers(
      {}
    );

    setArchetype(null);

    setAiDiagnosis(null);

    setQuestionIndex(0);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main
      className={`
        relative min-h-screen
        transition-colors duration-300
        ${
          isLight
            ? "bg-slate-50 text-slate-900"
            : "bg-slate-950 text-white"
        }
      `}
    >
      {/* NAVBAR */}
      <Navbar
        heroTheme={heroTheme}
        onToggleHeroTheme={
          toggleHeroTheme
        }
      />

      {/* PAGE CONTENT */}
      <div className="relative z-10">
        {isRestoring &&
        step !== "results" ? (
          // ==================================================
          // RESTORE SCREEN
          // ==================================================

          <div
            className="
              mx-auto flex
              min-h-[calc(100vh-180px)]
              max-w-xl
              flex-col items-center
              justify-center
              px-6 py-20
              text-center
            "
          >
            <div
              className="
                h-16 w-16
                animate-spin
                rounded-full
                border-4
                border-blue-500/20
                border-t-blue-500
              "
            />

            <span
              className={`
                mt-6 inline-flex
                rounded-full
                px-3 py-1
                text-xs font-bold
                uppercase
                tracking-widest
                ${
                  isLight
                    ? "bg-blue-100 text-blue-700"
                    : "bg-cyan-950 text-cyan-400"
                }
              `}
            >
              Career GPS Restoring
            </span>

            <h3
              className={`
                mt-3 text-2xl font-bold
                ${
                  isLight
                    ? "text-slate-900"
                    : "text-white"
                }
              `}
            >
              Restoring Your Saved Career Map...
            </h3>

            <p
              className={`
                mt-2 max-w-md
                text-sm
                ${
                  isLight
                    ? "text-slate-600"
                    : "text-slate-300"
                }
              `}
            >
              Loading your latest Career GPS assessment and AI diagnosis...
            </p>
          </div>
        ) : (
          <>
            {/* INTRO */}
            {step === "intro" && (
              <GpsIntro
                heroTheme={
                  heroTheme
                }

                profile={
                  profile
                }

                onChange={
                  updateProfile
                }

                onStart={() =>
                  setStep(
                    "archetype"
                  )
                }
              />
            )}

            {/* ARCHETYPE */}
            {step === "archetype" && (
              <GpsArchetypeStep
                heroTheme={
                  heroTheme
                }

                questions={
                  archetypeQuestions
                }

                onComplete={
                  handleArchetypeComplete
                }
              />
            )}

            {/* QUESTIONS */}
            {step === "questions" && (
              <GpsQuestion
                heroTheme={
                  heroTheme
                }

                question={
                  currentQuestion
                }

                index={
                  questionIndex
                }

                total={
                  gpsQuestions.length
                }

                selectedScore={
                  answers[
                    currentQuestion.id
                  ]
                }

                onSelect={
                  selectAnswer
                }

                onNext={
                  goNext
                }

                onPrevious={
                  goPrevious
                }

                archetype={
                  archetype
                }
              />
            )}

            {/* RESULTS */}
            {step === "results" && (
              <GpsResults
                heroTheme={
                  heroTheme
                }

                profile={
                  profile
                }

                overallScore={
                  effectiveOverallScore
                }

                categoryScores={
                  effectiveCategoryScores
                }

                readinessLevel={
                  getReadinessLevel(
                    effectiveOverallScore
                  )
                }

                archetype={
                  archetype
                }

                aiDiagnosis={
                  aiDiagnosis
                }

                onSyncProgress={() => {
                  const cache =
                    getLocalCache();

                  const reportTakenAt =
                    cache?.takenAt ||
                    new Date().toISOString();

                  return syncLiveActivity(
                    reportTakenAt
                  );
                }}

                onRestart={
                  restart
                }
              />
            )}
          </>
        )}
      </div>

      {/* AI DIAGNOSIS LOADING */}
      {isAiLoading &&
        step === "results" && (
          <div
            className="
              pointer-events-none
              fixed bottom-5 right-5
              z-30
            "
          >
            <div
              className={`
                flex items-center
                gap-3 rounded-2xl
                border px-4 py-3
                shadow-xl
                ${
                  isLight
                    ? `
                      border-slate-200
                      bg-white
                      text-slate-700
                    `
                    : `
                      border-slate-700
                      bg-slate-900
                      text-slate-200
                    `
                }
              `}
            >
              <div
                className="
                  h-4 w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-blue-500/25
                  border-t-blue-500
                "
              />

              <span className="text-sm font-medium">
                Generating your AI diagnosis...
              </span>
            </div>
          </div>
        )}

      {/* ======================================================
          CAREERSENSE FOOTER
          KEEP THIS ON ALL STATES INCLUDING INTRO
      ====================================================== */}

      <div className="relative z-10">
        <Footer
          heroTheme={
            heroTheme
          }
        />
      </div>
    </main>
  );
}

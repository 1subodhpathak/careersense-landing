import React from "react";
import logoBack from "../../Assets/Logoback.png";

const logos = [
  { name: "GitHub", kind: "github", className: "text-slate-300" },
  { name: "Uber", kind: "uber", className: "text-slate-900" },
  { name: "Apple", kind: "apple", className: "text-slate-500" },
  { name: "Bolt", kind: "bolt", className: "text-sky-400" },
  { name: "Stripe", kind: "stripe", className: "text-sky-600" },
  { name: "Airbnb", kind: "airbnb", className: "text-rose-400" },
  { name: "Spotify", kind: "spotify", className: "text-emerald-500" },
  { name: "Coinbase", kind: "coinbase", className: "text-blue-600" },
  { name: "Databricks", kind: "databricks", className: "text-red-500" },
  { name: "Snowflake", kind: "snowflake", className: "text-sky-400" },
  { name: "Google", kind: "google", className: "" },
];

function LogoGlyph({ kind, className }) {
  if (kind === "stripe") {
    return <span className={`text-[22px] font-black tracking-tight ${className}`}>stripe</span>;
  }

  if (kind === "apple") {
    return <span className={`text-[44px] leading-none ${className}`}></span>;
  }

  if (kind === "google") {
    return (
      <span className="text-[46px] font-black leading-none tracking-tight">
        <span className="text-blue-500">G</span>
        <span className="text-red-400"></span>
        <span className="text-yellow-400"></span>
        <span className="text-emerald-500"></span>
      </span>
    );
  }

  if (kind === "github") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <path
          fill="currentColor"
          d="M32 7c-13.8 0-25 11.2-25 25 0 11 7.1 20.4 17 23.7 1.2.2 1.6-.5 1.6-1.2v-4.2c-6.9 1.5-8.4-2.9-8.4-2.9-1.1-2.9-2.8-3.7-2.8-3.7-2.3-1.6.2-1.5.2-1.5 2.5.2 3.9 2.6 3.9 2.6 2.2 3.8 5.9 2.7 7.3 2 .2-1.6.9-2.7 1.6-3.3-5.5-.6-11.4-2.8-11.4-12.4 0-2.7 1-4.9 2.6-6.6-.3-.6-1.1-3.1.2-6.4 0 0 2.1-.7 6.9 2.5a23.8 23.8 0 0 1 12.6 0c4.8-3.2 6.9-2.5 6.9-2.5 1.3 3.3.5 5.8.2 6.4 1.6 1.8 2.6 4 2.6 6.6 0 9.6-5.8 11.8-11.4 12.4.9.8 1.7 2.3 1.7 4.6v6.8c0 .7.4 1.4 1.6 1.2 9.9-3.3 17-12.7 17-23.7 0-13.8-11.2-25-25-25Z"
        />
      </svg>
    );
  }

  if (kind === "uber") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-black text-white">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white">
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        </div>
      </div>
    );
  }

  if (kind === "bolt") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <path fill="currentColor" d="M38 4 16 34h14l-4 26 22-30H34l4-26Z" />
      </svg>
    );
  }

  if (kind === "airbnb") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <path
          d="M32 12c3.6 0 6.5 2.3 8.5 6.9l11 24.3c1.2 2.7.8 5.8-1 8-1.8 2.2-4.7 3.5-7.7 3.5-4.2 0-7.5-1.7-10.8-5.2-3.3 3.5-6.6 5.2-10.8 5.2-3 0-5.9-1.3-7.7-3.5-1.8-2.2-2.2-5.3-1-8l11-24.3C25.5 14.3 28.4 12 32 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
    );
  }

  if (kind === "spotify") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill="currentColor" />
        <path d="M19 25c10-2 17-1.4 26 2.2" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M21 34c8-1.6 14-1 21 1.8" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M23 42c5.7-1 10-.5 15.2 1.3" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  if (kind === "coinbase") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M42 32a10 10 0 1 1-10-10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "databricks") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <path d="M32 10 18 18l14 8 14-8-14-8Zm-14 20 14 8 14-8M18 42l14 8 14-8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "snowflake") {
    return (
      <svg viewBox="0 0 64 64" className={`h-12 w-12 ${className}`} aria-hidden="true">
        <path d="M32 10v44M13 21l38 22M13 43l38-22M21 13l22 38M43 13 21 51" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}

const textColorMap = {
  dark: "text-slate-400",
  light: "text-slate-500",
};

const bgColorMap = {
  dark: "border-slate-800 bg-[#0b1221]",
  light: "border-transparent bg-white",
};

export default function LogoSection({ isDark = false }) {
  const theme = isDark ? "dark" : "light";

  return (
    <div className={`relative overflow-hidden border-y py-10 transition-colors duration-500 ${bgColorMap[theme]}`}>
      {!isDark && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: `url(${logoBack})` }}
        />
      )}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 38s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="relative z-10 mx-auto w-full px-6">
        <p
          className={`mb-7 text-center text-[11px] font  uppercase tracking-[0.28em] ${textColorMap[theme]}`}
        >
          Get Career-Ready for Top Companies
        </p>

        <div className="overflow-hidden">
          <div className="animate-marquee items-center gap-x-16 py-3 md:gap-x-24">
            {[...Array(2)].map((_, arrayIndex) => (
              <React.Fragment key={arrayIndex}>
                {logos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${arrayIndex}-${index}`}
                    className="group relative flex h-14 items-center justify-center opacity-90 transition-all duration-300 hover:opacity-100"
                    aria-label={logo.name}
                    title={logo.name}
                  >
                    <LogoGlyph kind={logo.kind} className={logo.className} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

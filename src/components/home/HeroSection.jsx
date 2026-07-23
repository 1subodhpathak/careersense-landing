import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, ShieldCheck, X } from "lucide-react";
import heroGraduatesDarkImage from "../../Assets/Back-optimized.jpg";
import heroGraduatesLightImage from "../../Assets/Back-2-optimized.jpg";
import atsSampleReport from "../../Assets/ATS Resume Checker-1.pdf";

const atsSampleReportViewer = `${atsSampleReport}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

export default function HeroSection({ heroTheme = "dark" }) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const isLightTheme = heroTheme === "light";
  const heroBackgroundImage = isLightTheme
    ? heroGraduatesLightImage
    : heroGraduatesDarkImage;

  useEffect(() => {
    if (!isReportOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isReportOpen]);

  return (
    <>
      <section
        id="home"
        className={`relative overflow-visible border-b-8 border-transparent pb-24 pt-32 sm:pb-32 sm:pt-36 lg:pb-44 lg:pt-36 ${
          isLightTheme
            ? "bg-[#eef6ff] text-slate-950"
            : "bg-[#0b1121] text-white"
        }`}
      >
        <img
          src={heroBackgroundImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
        />
        <div
          className={`absolute inset-0 ${
            isLightTheme
              ? "bg-[linear-gradient(145deg,rgba(242,248,255,0.92)_0%,rgba(227,240,255,0.84)_44%,rgba(214,234,255,0.74)_100%)] sm:bg-none"
              : "bg-[linear-gradient(135deg,rgba(5,13,32,0.96)_0%,rgba(8,24,56,0.92)_48%,rgba(9,37,76,0.88)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,17,33,0.48)_0%,rgba(8,17,33,0.38)_35%,rgba(8,17,33,0.24)_58%,rgba(8,17,33,0.14)_100%)]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isLightTheme
              ? "bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(20,184,166,0.12),transparent_24%)] sm:bg-none"
              : "bg-[radial-gradient(circle_at_20%_18%,rgba(96,165,250,0.14),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(45,212,191,0.12),transparent_24%)] sm:bg-[linear-gradient(180deg,rgba(11,17,33,0.08)_0%,rgba(11,17,33,0.22)_100%)]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isLightTheme
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(204,226,251,0.34)_100%)] sm:bg-none"
              : "bg-[linear-gradient(180deg,rgba(8,17,33,0.08)_0%,rgba(6,14,32,0.48)_100%)] sm:bg-[radial-gradient(circle_at_72%_24%,rgba(32,201,151,0.08),transparent_0%),radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.1),transparent_0%)]"
          }`}
        />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
          <div className="relative z-10 grid items-center gap-5 lg:grid-cols-[1fr_1.1fr]">
            <div className="max-w-1xl">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium sm:px-4 sm:text-[13px] ${
                  isLightTheme
                    ? "bg-white/80 text-blue-800 shadow-[0_14px_40px_rgba(148,163,184,0.22)]"
                    : "bg-[#162032] text-blue-200"
                }`}
              >
                <BadgeCheck
                  className={`h-4 w-4 ${
                    isLightTheme ? "text-teal-600" : "text-[#20c997]"
                  }`}
                />
                For Students, Freshers, and Professionals
              </div>

              <h1
                className={`mt-5 max-w-[12ch] text-[36px] font-bold leading-[1.08] tracking-tight sm:max-w-none sm:text-[44px] ${
                  isLightTheme ? "text-slate-950" : "text-white"
                }`}
              >
                Build a{" "}
                <span
                  className={
                    isLightTheme
                      ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent"
                  }
                >
                  Job-Ready Career Profile
                </span>{" "}
                With AI
              </h1>

              <p
                className={`mt-5 max-w-full text-[15px] leading-7 sm:mt-6 sm:max-w-[80%] sm:text-[17px] sm:leading-relaxed ${
                  isLightTheme ? "text-slate-700" : "text-slate-300"
                }`}
              >
                Create Professional Resumes, Generate Personalized Cover Letters,
                Check your ATS score, Practice Interviews, Validate Skills &
                get Certifications — all in one Career Platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  to="/career-assessment"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-8 text-[15px] font-semibold text-white shadow-[0_18px_36px_rgba(37,99,235,0.24)] transition hover:brightness-105 sm:w-auto"
                >
                  Start Free Career Check
                </Link>
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-8 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-50 sm:w-auto"
                >
                  Sample ATS Report
                </button>
              </div>

              <div className="mt-10 flex items-start gap-4 pt-6 sm:mt-12 sm:pt-8">
                <ShieldCheck
                  className={`mt-1 h-6 w-6 shrink-0 ${
                    isLightTheme ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <p
                  className={`max-w-sm text-[14px] leading-relaxed ${
                    isLightTheme ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  Designed to help students, freshers and job seekers move from “I want a better job” to “I am fully prepared to apply and interview.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isReportOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center">
          <button
            type="button"
            aria-label="Close PDF modal"
            className="absolute inset-0 bg-[#08111f]/70 backdrop-blur-md"
            onClick={() => setIsReportOpen(false)}
          />

          <div className="relative z-10 flex h-[100dvh] w-full max-w-none flex-col overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:h-[100vh] md:h-[96vh] md:w-[96vw] md:rounded-[24px] md:border md:border-white/10">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:items-center sm:px-6">
              <div>
                <h3 className="text-[17px] font-black tracking-tight text-slate-900 sm:text-[18px]">
                  Sample ATS Report
                </h3>
                <p className="mt-1 text-[13px] text-slate-500">
                  Review the sample report directly on screen.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close sample ATS report"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-slate-100">
              <iframe
                src={atsSampleReportViewer}
                title="Sample ATS Report PDF"
                className="h-full w-full border-0"
              >
                Loading...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

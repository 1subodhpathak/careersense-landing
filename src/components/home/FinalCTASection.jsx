import { useEffect, useState } from "react";
import { ArrowRight, Coffee, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";

const COFFEE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfz55NWi27Do0xWsPxNVEMU6CTqW8diTrwk3oxR62ufMVsPxg/viewform?embedded=true";

export default function FinalCTASection() {
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);

  useEffect(() => {
    if (!isCoffeeModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCoffeeModalOpen]);

  return (
    <>
      <section className="px-5 pb-14 sm:px-6">
        <div className="mx-auto grid max-w-[1320px] items-center gap-6 overflow-hidden rounded-[20px] bg-[#07142d] p-5 text-white shadow-[0_22px_44px_rgba(15,23,42,0.18)] sm:p-6 lg:grid-cols-[1fr_0.85fr] lg:p-8">
          <div>
            <h2 className="mt-3 text-[30px] font-black leading-tight tracking-tight text-white sm:mt-5 sm:text-[34px] md:text-[30px]">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Job-Ready Profile?
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-7 text-slate-300">
              Start with a free career check and improve your resume, ATS score,
              interview readiness, and certifications in one place.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/career-assessment"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-5 py-3 text-[13px] font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.24)] transition hover:brightness-105"
              >
                Start Free Career Check <ArrowRight size={14} />
              </Link>
              <button className="w-full rounded-lg border border-white/20 px-5 py-3 text-[13px] font-bold text-white sm:w-auto">
                <a href="/#career-tools">Explore CareerSense Tools</a>
              </button>
              <button
                type="button"
                onClick={() => setIsCoffeeModalOpen(true)}
                className="inline-flex w-full items-center justify-center gap-3 rounded-[10px] bg-[#ff7a17] px-6 py-3 text-[13px] font-extrabold text-white shadow-[0_14px_30px_rgba(255,122,23,0.28)] transition hover:bg-[#ff861f] sm:w-auto"
              >
                <Coffee size={16} />
                Coffee Connect
              </button>
            </div>
          </div>
          <div className="relative min-h-[180px] rounded-[18px] bg-white/6 p-4 ring-1 ring-white/10 sm:min-h-[220px]">
            <div className="absolute inset-5 rounded-[18px] border border-dashed border-cyan-300/20" />
            <div className="relative flex h-full min-h-[200px] items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-500/20 to-teal-500/20">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl">
                  💼
                </div>
                <p className="text-[18px] font-extrabold">Career-ready starts here</p>
                <p className="mt-2 text-[13px] text-slate-300">
                  Resume. ATS. Interview. Skills. One platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isCoffeeModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-0 py-0 sm:px-4 sm:py-8">
          <button
            type="button"
            aria-label="Close Coffee Connect modal"
            className="absolute inset-0 bg-[#08111f]/60 backdrop-blur-md"
            onClick={() => setIsCoffeeModalOpen(false)}
          />

          <div className="relative z-10 flex h-[100vh] w-full max-w-[980px] flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(245,251,255,0.98),rgba(234,246,255,0.96))] shadow-[0_28px_80px_rgba(3,10,24,0.28)] sm:h-[85vh] sm:rounded-[28px] sm:border sm:border-white/60">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#06b6d4,#14b8a6,#3b82f6)]" />
            <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-cyan-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 bottom-10 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" />

            <div className="relative flex items-start justify-between border-b border-cyan-100/80 bg-white/70 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-8 sm:py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#ecfeff,#d1fae5,#dbeafe)] text-[#155e75] shadow-[0_14px_30px_rgba(14,165,233,0.18)] ring-1 ring-white/70">
                  <Coffee className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-[20px] font-black tracking-tight text-slate-900">
                    Coffee Connect
                  </h3>
                  <p className="mt-1 text-[13px] text-slate-600">
                    Let&apos;s grab a virtual or in-person coffee and connect.
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setIsCoffeeModalOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition hover:bg-cyan-50 hover:text-slate-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-3 border-b border-cyan-100 bg-[linear-gradient(90deg,rgba(236,254,255,0.92),rgba(220,252,231,0.74),rgba(219,234,254,0.86))] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8">
              <p className="text-[13px] text-slate-600">
                If the form does not load below, open it directly in the same tab.
              </p>
              <a
                href="https://forms.gle/TMHMZZCLJL1rwHoP6"
                className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-4 py-2 text-[12px] font-extrabold text-white shadow-[0_12px_26px_rgba(37,99,235,0.24)] transition hover:brightness-110"
              >
                Open Form
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="relative flex-1 bg-[linear-gradient(180deg,rgba(239,252,255,0.92),rgba(219,234,254,0.68))] p-3 sm:p-5">
              <div className="h-full overflow-hidden rounded-[24px] border border-cyan-100 bg-white shadow-[0_18px_38px_rgba(15,23,42,0.1)]">
                <iframe
                  src={COFFEE_FORM_URL}
                  title="CareerSense Coffee Connect Form"
                  className="h-full w-full border-0"
                >
                  Loading...
                </iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { ArrowRight, Check, ExternalLink, X } from "lucide-react";
import {
  collegeBenefits,
  collegeFeatureBullets,
  collegeMetrics,
} from "../../data/homePageData";

const PARTNERSHIP_FORM_URL = "https://forms.gle/1K8NT2XqgfaiVBgX7";

export default function CollegesSection() {
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);

  useEffect(() => {
    if (!isPartnershipModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPartnershipModalOpen]);

  return (
    <>
      <section id="colleges" className="relative px-5 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(241,247,255,0.86))] p-6 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <h2 className="mt-5 text-[24px] font-black leading-tight tracking-tight text-Black md:text-[30px]">
              CareerSense for{" "}
              <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
                Colleges
              </span>
            </h2>
            <p className="mt-4 text-[14px] leading-7 text-slate-600">
              Empower your students with industry-ready skills and placement
              confidence. Our platform offers resume checks, ATS scoring, mock
              interviews, certifications, and progress tracking — all in one
              place.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {collegeFeatureBullets.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-[14px] font-semibold text-slate-700"
                >
                  <Icon size={16} className="text-teal-600" />
                  {text}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsPartnershipModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-5 py-3 text-[13px] font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.24)] transition hover:brightness-105"
              >
                Partner With CareerSense <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsPartnershipModalOpen(true)}
                className="rounded-lg border border-slate-200 px-5 py-3 text-[13px] font-bold text-slate-700"
              >
                Request Demo
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[20px] bg-[#0a1d45] p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.16)]">
          
            <h3 className="mt-5 text-[24px] font-black leading-tight tracking-tight text-Black md:text-[24px]">
              College{" "}
              <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
                Benefits
              </span>
            </h3>
            <div className="mt-5 grid gap-3">
              {collegeBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-[14px] text-slate-200">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <Check size={12} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {collegeMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[16px] bg-white/10 p-4 ring-1 ring-white/10"
                >
                  <div className="text-[32px] font-extrabold text-white">
                    {metric.value}
                  </div>
                  <p className="mt-2 text-[13px] leading-5 text-slate-300">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isPartnershipModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-0 py-0 sm:px-4 sm:py-8">
          <button
            type="button"
            aria-label="Close partnership form modal"
            className="absolute inset-0 bg-[#08111f]/60 backdrop-blur-md"
            onClick={() => setIsPartnershipModalOpen(false)}
          />

          <div className="relative z-10 flex h-[100vh] w-full max-w-[980px] flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(245,251,255,0.98),rgba(234,246,255,0.96))] shadow-[0_28px_80px_rgba(3,10,24,0.28)] sm:h-[85vh] sm:rounded-[28px] sm:border sm:border-white/60">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#06b6d4,#14b8a6,#3b82f6)]" />
            <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-cyan-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 bottom-10 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" />

            <div className="relative flex items-start justify-between border-b border-cyan-100/80 bg-white/70 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-8 sm:py-5">
              <div>
                <h3 className="text-[20px] font-black tracking-tight text-slate-900">
                  Partner With CareerSense
                </h3>
                <p className="mt-1 text-[13px] text-slate-600">
                  Share your details and we&apos;ll reach out to discuss partnership or a demo.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setIsPartnershipModalOpen(false)}
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
                href={PARTNERSHIP_FORM_URL}
                className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-4 py-2 text-[12px] font-extrabold text-white shadow-[0_12px_26px_rgba(37,99,235,0.24)] transition hover:brightness-110"
              >
                Open Form
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="relative flex-1 bg-[linear-gradient(180deg,rgba(239,252,255,0.92),rgba(219,234,254,0.68))] p-3 sm:p-5">
              <div className="h-full overflow-hidden rounded-[24px] border border-cyan-100 bg-white shadow-[0_18px_38px_rgba(15,23,42,0.1)]">
                <iframe
                  src={PARTNERSHIP_FORM_URL}
                  title="CareerSense partnership form"
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

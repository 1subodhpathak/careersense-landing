import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

function PartnerPass() {
  return (
    <div className="relative mx-auto w-[210px] sm:w-[230px] pt-11 transition-all duration-500 transform -rotate-6 hover:rotate-0 hover:scale-105 select-none">
      {/* Lanyard Clip & Hook */}
      <div className="absolute left-1/2 top-0 h-[52px] w-[14px] -translate-x-1/2 rounded-b-md bg-gradient-to-b from-[#25CDC3] to-[#168D9C] shadow-md z-10" />
      <div className="absolute left-1/2 top-[38px] h-[22px] w-[56px] -translate-x-1/2 rounded-full border-[5px] border-[#0A2445] bg-[#DDEAF3] shadow-inner z-10" />

      {/* ID Badge Body */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#0EA8B9]/40 bg-[#071A38] p-6 text-white shadow-[0_25px_60px_rgba(7,26,56,0.35)]">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-[#16C7CB] to-[#1787E8] text-xs font-black text-white shadow-sm">C</span>
          <span className="text-xs font-black tracking-tight text-white">Career<span className="text-[#17AFAD]">Sense</span></span>
        </div>

        <div className="mt-5 text-[17px] font-black uppercase leading-tight tracking-tight text-white">
          PARTNER<br />PROGRAM
        </div>

        <div className="mt-3.5 inline-block rounded-full bg-[#19C8C0]/20 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#22D3C5]">
          3 Months · 12 Weeks
        </div>

        <div className="mt-5 space-y-2 text-[9px] font-semibold text-[#D3E0ED]">
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> 50,000 Credits / Month</div>
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> Partner Workspace Access</div>
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> 20 Real-World Assignments</div>
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> Leadership & Founder Exposure</div>
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> Certificate & Completion Letter</div>
        </div>

        <div className="my-4 h-px w-full bg-white/15" />

        <div className="rounded-xl bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] py-2 text-center text-[8.5px] font-black uppercase tracking-[0.18em] text-white shadow-md">
          BUILD · LEARN · IMPACT
        </div>
      </div>
    </div>
  );
}

export default function PartnerFaqSection({ isDark = false }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is the CareerSense Partner Program?",
      a: "The CareerSense Partner Program is a 3-month (12-week) experiential startup program where participants work on 20 real-world assignments across product, AI, growth, design, and strategy under the guidance of startup founders.",
    },
    {
      q: "How long is the program?",
      a: "The program runs for 3 months (12 weeks) with flexible remote participation.",
    },
    {
      q: "Do I need prior startup experience?",
      a: "No prior experience is required. All assignments provide structured context, resources, and mentorship to guide you step-by-step.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes, participants who complete at least 12 core assignments and achieve a 70%+ score receive an official Partner Program Certificate and Completion Letter.",
    },
    {
      q: "How many assignments are included?",
      a: "The program features 20 real-world startup assignments divided into 5 phases: Discover, Build, Analyse, Grow, and Lead.",
    },
    {
      q: "What do I receive after onboarding?",
      a: "Upon onboarding, you receive 50,000 CS Credits/month, access to the Partner Workspace, an official Partner ID card, and an engagement letter.",
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={`py-16 sm:py-24 transition-colors duration-300 ${isDark ? "bg-[#041024] text-white" : "bg-white text-slate-800"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0EA8B9]">
              Need Clarity?
            </div>
            <h2 className={`mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Frequently Asked Questions
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {faqs.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border transition-all duration-200 ${
                      isDark
                        ? isOpen
                          ? "border-[#0EA8B9] bg-[#0A2647] text-white shadow-lg ring-1 ring-[#0EA8B9]/30"
                          : "border-slate-800 bg-[#0A2647]/80 text-white shadow-xs hover:border-slate-700"
                        : isOpen
                          ? "border-[#0EA8B9] bg-white text-slate-900 shadow-md shadow-cyan-500/5 ring-1 ring-[#0EA8B9]/30"
                          : "border-slate-200/90 bg-white text-slate-800 shadow-xs hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-[#0EA8B9]">
                          <HelpCircle className="h-4.5 w-4.5" />
                        </div>
                        <span className={`text-sm font-extrabold transition-colors leading-snug ${
                          isDark ? "text-white group-hover:text-[#0EA8B9]" : "text-slate-900 group-hover:text-[#0EA8B9]"
                        }`}>
                          {faq.q}
                        </span>
                      </div>
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isDark ? "bg-slate-800 text-slate-300 group-hover:bg-[#0EA8B9] group-hover:text-white" : "bg-slate-100 text-slate-600 group-hover:bg-[#0EA8B9] group-hover:text-white"
                      }`}>
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className={`px-5 sm:px-6 pb-5 sm:pb-6 border-t pt-3.5 text-xs sm:text-[13px] font-medium leading-relaxed ${
                        isDark ? "border-slate-800 text-slate-300" : "border-slate-100 text-slate-600"
                      }`}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Larger 3D Tilted PartnerPass Component (Unchanged) */}
          <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center">
            <PartnerPass />
          </div>
        </div>
      </div>
    </section>
  );
}

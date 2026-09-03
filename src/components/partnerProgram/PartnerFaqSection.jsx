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
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> 500,000 Credits / Month</div>
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> Partner Workspace Access</div>
          <div className="flex items-center gap-2"><span className="text-[#22D3C5] font-bold">●</span> 20 Real-World Business Projects</div>
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
    a: (
      <>
        The <strong>CareerSense Partner Program</strong> is a{" "}
        <span className="font-semibold text-cyan-600">
          3-month (12-week) experiential startup program
        </span>{" "}
        where participants work through practical challenges across{" "}
        <strong>
          product, technology, AI, analytics, growth, partnerships, and business
          strategy
        </strong>
        . The journey follows five phases:{" "}
        <span className="font-semibold text-cyan-600">
          Discover → Build → Analyse → Grow → Lead
        </span>
        .
      </>
    ),
  },

  {
    q: "Who can join the Partner Program?",
    a: (
      <>
        The program is designed for{" "}
        <strong>
          students, fresh graduates, working professionals, builders, designers,
          analysts, marketers, and aspiring founders
        </strong>{" "}
        who want practical startup exposure.{" "}
        <span className="font-semibold text-cyan-600">
          No prior startup experience is required
        </span>
        , and you do not need to be an expert in every area to participate.
      </>
    ),
  },

  {
    q: "How long is the program and how much time do I need to commit?",
    a: (
      <>
        The Partner Program runs for{" "}
        <span className="font-semibold text-cyan-600">
          3 months (12 weeks)
        </span>{" "}
        with <strong>flexible, assignment-based participation</strong>. Partners
        are expected to complete assigned activities within reasonable timelines
        and participate in required{" "}
        <strong>sessions, reviews, and program milestones</strong>.
      </>
    ),
  },

  {
    q: "What will I actually work on as a CareerSense Partner?",
    a: (
      <>
        Partners work through{" "}
        <span className="font-semibold text-cyan-600">
          20 structured real-world assignments
        </span>{" "}
        covering <strong>product research, UX, software development, AI, data
        analytics, machine learning, experimentation, SEO, digital marketing,
        college outreach, B2B partnerships, community building, and startup
        strategy</strong>. The program concludes with the{" "}
        <span className="font-semibold text-cyan-600">
          CareerSense Boardroom Challenge
        </span>
        .
      </>
    ),
  },

  {
    q: "What do I receive after onboarding?",
    a: (
      <>
        After successful onboarding, Partners receive{" "}
        <span className="font-semibold text-cyan-600">
          500,000 CareerSense Credits per month
        </span>
        , access to a <strong>restricted Partner Workspace</strong>, an{" "}
        <strong>official Partner ID</strong>,{" "}
        <strong>Offer & Engagement Letter</strong>,{" "}
        <strong>Partner Learning Library</strong>, structured assignments, and
        selected <strong>leadership and community sessions</strong>.
      </>
    ),
  },

  {
    q: "Is the Partner Program a job or internship? Will I be paid?",
    a: (
      <>
        <span className="font-semibold text-cyan-600">
          No. The CareerSense Partner Program is not a job or internship.
        </span>{" "}
        It is an <strong>experiential learning and contribution program</strong>{" "}
        and does not create an employer-employee relationship. Participation does
        not guarantee <strong>salary, compensation, or future employment</strong>.
        Any separately approved{" "}
        <strong>paid assignment, incentive, or performance bonus</strong> will be
        communicated through specific written terms.
      </>
    ),
  },

  {
    q: "How much does the Partner Program cost?",
    a: (
      <>
        The current <strong>Founding Partner Program</strong> fee is{" "}
        <span className="font-semibold text-cyan-600">
          $24.99 per month for the complete 3-month program
        </span>
        . This provides access to the Partner experience and applicable program
        resources for the full program term.
      </>
    ),
  },

  {
    q: "What do I receive after completing the program?",
    a: (
      <>
        Partners who successfully meet the program requirements may receive an{" "}
        <strong>official Partner Certificate</strong>,{" "}
        <strong>Completion or Relieving Letter</strong>, and a{" "}
        <span className="font-semibold text-cyan-600">
          verified Contribution or Experience Letter
        </span>{" "}
        based on the work actually completed. Successful completion requires
        meeting the applicable{" "}
        <strong>
          assignment, score, project, session, Boardroom Challenge, and
          professional conduct requirements
        </strong>
        .
      </>
    ),
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

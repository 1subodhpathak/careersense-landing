import React from "react";

export default function CareerAssessmentCTA() {
  return (
    <section className="px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 px-6 py-10 text-white shadow-md sm:px-10 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-12">
        
        {/* Left Content Area */}
        <div>
          <span className="inline-flex rounded-md bg-cyan-900/50 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
            Free Assessment
          </span>
          
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Find out exactly what is holding back your career progress.
          </h2>
          
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
            Get a personalized score across your resume, ATS readiness,
            interviews, skills, and career direction in just a few minutes.
          </p>
        </div>

        {/* Right CTA Area */}
        <a
          href="/career-assessment"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 sm:w-auto"
        >
          Check Career Readiness
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
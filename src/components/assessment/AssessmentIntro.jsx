import React from "react";

const statusOptions = [
  "Student",
  "Fresher",
  "Job Seeker",
  "Working Professional",
  "Career Switcher",
];

export default function AssessmentIntro({
  heroTheme,
  profile,
  onChange,
  onStart,
}) {
  const isReady =
    profile.name.trim() &&
    profile.email.trim() &&
    profile.status &&
    profile.targetRole.trim();
  const isLightTheme = heroTheme === "light";

  // ENTERPRISE STYLING: Removed glassmorphism, heavy shadows, and weird opacities. 
  // Replaced with crisp, solid backgrounds and standard subtle shadows.
  const panelClass = isLightTheme
    ? "border-slate-200 bg-white text-slate-900 shadow-sm"
    : "border-slate-700 bg-slate-900 text-white shadow-md";
    
  const fieldClass = isLightTheme
    ? "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
    : "border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";
    
  const statClass = isLightTheme
    ? "border-slate-200 bg-slate-50 text-slate-900"
    : "border-slate-700 bg-slate-800 text-white";
    
  const secondaryTextClass = isLightTheme ? "text-slate-600" : "text-slate-400";
  const labelClass = isLightTheme ? "text-slate-700" : "text-slate-300";

  return (
    <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
      
      {/* Left Column: Information */}
      <div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
            isLightTheme
              ? "bg-cyan-100 text-cyan-800"
              : "bg-cyan-900/50 text-cyan-300"
          }`}
        >
          Free Assessment
        </span>

        <h1
          className={`mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${
            isLightTheme ? "text-slate-900" : "text-white"
          }`}
        >
          Evaluate your career readiness
        </h1>

        <p className={`mt-4 max-w-xl text-base leading-relaxed ${secondaryTextClass}`}>
          Take our 15-question assessment to benchmark your profile against industry standards. Receive actionable feedback on your resume, ATS compatibility, and interview preparation.
        </p>

        {/* Enterprise Stats Section: Clean, bordered, flat */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { value: "15", label: "Questions" },
            { value: "5", label: "Core Areas" },
            { value: "1", label: "Action Plan" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className={`rounded-lg border p-4 ${statClass}`}
            >
              <div
                className={`text-2xl font-bold ${
                  isLightTheme ? "text-slate-900" : "text-white"
                }`}
              >
                {value}
              </div>
              <div
                className={`mt-0.5 text-sm font-medium ${secondaryTextClass}`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Form */}
      <form
        className={`rounded-xl border p-6 sm:p-8 ${panelClass}`}
        onSubmit={(event) => {
          event.preventDefault();
          if (isReady) onStart();
        }}
      >
        <div className="mb-6">
          <h2
            className={`text-xl font-bold ${
              isLightTheme ? "text-slate-900" : "text-white"
            }`}
          >
            Candidate Details
          </h2>
          <p className={`mt-1 text-sm ${secondaryTextClass}`}>
            Please provide your details to begin the assessment.
          </p>
        </div>

        <div className="grid gap-5">
          <label className="grid gap-1.5">
            <span className={`text-sm font-medium ${labelClass}`}>Full Name <span className="text-red-500">*</span></span>
            <input
              value={profile.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="Enter your full name"
              className={`h-10 rounded-md border px-3 text-sm outline-none transition-shadow ${fieldClass}`}
              required
            />
          </label>

          <label className="grid gap-1.5">
            <span className={`text-sm font-medium ${labelClass}`}>Email Address <span className="text-red-500">*</span></span>
            <input
              type="email"
              value={profile.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="email@example.com"
              className={`h-10 rounded-md border px-3 text-sm outline-none transition-shadow ${fieldClass}`}
              required
            />
          </label>

          <label className="grid gap-1.5">
            <span className={`text-sm font-medium ${labelClass}`}>Current Status <span className="text-red-500">*</span></span>
            <select
              value={profile.status}
              onChange={(event) => onChange("status", event.target.value)}
              className={`h-10 rounded-md border px-3 text-sm outline-none transition-shadow ${fieldClass}`}
              required
            >
              <option value="" disabled>Select status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5">
            <span className={`text-sm font-medium ${labelClass}`}>Target Role <span className="text-red-500">*</span></span>
            <input
              value={profile.targetRole}
              onChange={(event) => onChange("targetRole", event.target.value)}
              placeholder="e.g. Software Engineer"
              className={`h-10 rounded-md border px-3 text-sm outline-none transition-shadow ${fieldClass}`}
              required
            />
          </label>
        </div>

        {/* Replaced multi-color gradient with a solid, trustworthy enterprise blue/cyan */}
        <button
          type="submit"
          disabled={!isReady}
          className={`mt-6 h-10 w-full rounded-md px-4 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            isLightTheme 
              ? "bg-cyan-600 hover:bg-cyan-700" 
              : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          Start Assessment
        </button>

        <div className={`mt-4 text-center text-xs ${secondaryTextClass}`}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </form>
    </section>
  );
}
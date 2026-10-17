import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  GraduationCap, 
  BriefcaseBusiness, 
  Users, 
  Zap, 
  Check, 
  ShieldCheck, 
  Lock, 
  X, 
  ChevronDown, 
  FileText, 
  Award, 
  BadgeCheck,
  ArrowRight,
  Layers
} from "lucide-react";

export const FELLOWSHIP_TRACKS = [
  { id: "data-analyst", name: "Data Analyst Fellowship", label: "Data Analyst Fellowship" },
  { id: "data-science", name: "Data Science Fellowship", label: "Data Science Fellowship" },
  { id: "artificial-intelligence", name: "Artificial Intelligence Fellowship", label: "Artificial Intelligence Fellowship" },
  { id: "ui-ux-design", name: "UI/UX Design Fellowship", label: "UI/UX Design Fellowship" },
  { id: "app-development", name: "App Development Fellowship", label: "App Development Fellowship" },
  { id: "full-stack-development", name: "Full Stack Development Fellowship", label: "Full Stack Development Fellowship" },
];

export default function PlanConfirmationModal({
  isOpen,
  onClose,
  initialPlan = "intern",
  currency = "INR",
  selectedFellowship = "data-analyst",
  onFellowshipChange,
  partnerBillingCycle = "monthly",
  onPartnerBillingChange,
  onProceedToPayment,
  loading = false,
}) {
  const [activePlan, setActivePlan] = useState(initialPlan);
  const [localTrack, setLocalTrack] = useState(selectedFellowship);
  const [localBilling, setLocalBilling] = useState(partnerBillingCycle);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Sync internal states when modal opens or initial values change
  useEffect(() => {
    if (isOpen) {
      setActivePlan(initialPlan);
      setLocalTrack(selectedFellowship || "data-analyst");
      setLocalBilling(partnerBillingCycle || "monthly");
      setHasAcceptedTerms(false);
    }
  }, [isOpen, initialPlan, selectedFellowship, partnerBillingCycle]);

  if (!isOpen) return null;

  const isUsd = currency === "USD";
  const isTopUp = activePlan === "token_addon";

  const handleTrackSelect = (trackId) => {
    setLocalTrack(trackId);
    if (onFellowshipChange) {
      onFellowshipChange(trackId);
    }
  };

  const handleBillingSelect = (cycle) => {
    setLocalBilling(cycle);
    if (onPartnerBillingChange) {
      onPartnerBillingChange(cycle);
    }
  };

  const handleProceed = () => {
    if (!hasAcceptedTerms || loading) return;
    if (onProceedToPayment) {
      onProceedToPayment(activePlan, localTrack, localBilling);
    }
  };

  // Pricing calculations
  const getOrderDetails = () => {
    if (activePlan === "student") {
      return {
        name: "Student Plan",
        duration: "Monthly subscription",
        priceFormatted: isUsd ? "$3.99" : "₹250",
        periodText: "/ month (~₹8/day)",
        accent: "#0ea59e",
      };
    }
    if (activePlan === "intern") {
      const trackObj = FELLOWSHIP_TRACKS.find((t) => t.id === localTrack) || FELLOWSHIP_TRACKS[0];
      return {
        name: trackObj.name,
        duration: "One 3-month fellowship",
        priceFormatted: isUsd ? "$24.99" : "₹2,000",
        periodText: "/ 3-month internship",
        accent: "#0a9d89",
      };
    }
    if (activePlan === "partner") {
      const isSixMonth = localBilling === "half_yearly";
      return {
        name: "Partner Program",
        duration: isSixMonth ? "6-month partner package" : "Monthly partner package",
        priceFormatted: isSixMonth ? (isUsd ? "$99.99" : "₹10,000") : (isUsd ? "$24.99" : "₹2,499"),
        periodText: isSixMonth ? "total for 6 months" : "/ month",
        accent: "#c08b32",
      };
    }
    if (activePlan === "token_addon") {
      return {
        name: "50,000 AI Token Add-on",
        duration: "Instant token top-up",
        priceFormatted: isUsd ? "$1" : "₹99",
        periodText: "one-time payment",
        accent: "#b87616",
      };
    }
    return {
      name: "Plan",
      duration: "Subscription",
      priceFormatted: "₹0",
      periodText: "",
      accent: "#0ea59e",
    };
  };

  const order = getOrderDetails();

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans">
      {/* Blurred Royal Navy Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1528]/80 backdrop-blur-md transition-opacity"
        onClick={loading ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-[880px] max-h-[92vh] flex flex-col transform overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl transition-all my-auto text-[#122A42]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-confirmation-title"
      >
        {/* Top Accent Gradient Bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300" 
          style={{ backgroundColor: order.accent }}
        />

        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 flex-none bg-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div 
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs transition-colors"
                style={{ 
                  backgroundColor: activePlan === "student" ? "#e7f7f5" : activePlan === "intern" ? "#e5f7f3" : activePlan === "partner" ? "#fff0d9" : "#fff8ec",
                  color: order.accent 
                }}
              >
                {activePlan === "student" && <GraduationCap size={24} />}
                {activePlan === "intern" && <BriefcaseBusiness size={24} />}
                {activePlan === "partner" && <Users size={24} />}
                {activePlan === "token_addon" && <Zap size={24} />}
              </div>

              <div>
                <div 
                  className="text-[10.5px] font-black uppercase tracking-wider mb-0.5"
                  style={{ color: order.accent }}
                >
                  {activePlan === "student" && "Stage 2 • Build Your Career"}
                  {activePlan === "intern" && "Stage 3 • Build Real Things"}
                  {activePlan === "partner" && "Stage 4 • Help Build CareerSense"}
                  {activePlan === "token_addon" && "Instant Top-Up Service"}
                </div>
                <h2 id="plan-confirmation-title" className="text-xl sm:text-2xl font-black tracking-tight text-[#122A42]">
                  {activePlan === "student" && "Confirm Student Plan"}
                  {activePlan === "intern" && "Join CareerSense Fellowship"}
                  {activePlan === "partner" && "Join Partner Program"}
                  {activePlan === "token_addon" && "Confirm Instant Token Top-Up"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activePlan === "student" && "Everything you need for stronger job applications"}
                  {activePlan === "intern" && "Understand your internship curriculum & deliverables before enrolling"}
                  {activePlan === "partner" && "Build with CareerSense. Mentorship, assignments, and leadership roadmap."}
                  {activePlan === "token_addon" && "Add 50,000 AI tokens to your active balance immediately"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition"
              aria-label="Close confirmation dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Plan Switcher Tabs (For Subscription Tiers) */}
          {!isTopUp && (
            <div className="mt-4 flex gap-2 rounded-xl bg-slate-100/80 p-1">
              <button
                type="button"
                onClick={() => { setActivePlan("student"); setHasAcceptedTerms(false); }}
                className={`flex-1 rounded-lg py-2 text-xs font-black transition-all ${
                  activePlan === "student"
                    ? "bg-white text-[#122A42] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Student Plan (₹250/mo)
              </button>
              <button
                type="button"
                onClick={() => { setActivePlan("intern"); setHasAcceptedTerms(false); }}
                className={`flex-1 rounded-lg py-2 text-xs font-black transition-all ${
                  activePlan === "intern"
                    ? "bg-white text-[#0a9d89] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Intern Fellowship (₹2,000)
              </button>
              <button
                type="button"
                onClick={() => { setActivePlan("partner"); setHasAcceptedTerms(false); }}
                className={`flex-1 rounded-lg py-2 text-xs font-black transition-all ${
                  activePlan === "partner"
                    ? "bg-white text-[#c08b32] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Partner Program
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Modal Content */}
        <div className="px-6 sm:px-8 py-5 overflow-y-auto overscroll-contain flex-1">
          {/* ======================= STUDENT TAB ======================= */}
          {activePlan === "student" && (
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-teal-800">
                    <Zap size={13} fill="currentColor" /> Student Subscription
                  </div>
                  <div className="mt-1 text-2xl sm:text-3xl font-black text-[#122A42]">
                    {order.priceFormatted} <span className="text-xs text-slate-500 font-semibold">{order.periodText}</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white border border-teal-200/80 px-2.5 py-0.5 text-[10.5px] font-extrabold text-teal-900">
                      100,000 Monthly AI Tokens
                    </span>
                    <span className="rounded-full bg-white border border-teal-200/80 px-2.5 py-0.5 text-[10.5px] font-extrabold text-teal-900">
                      All 4 AI Career Tools Active
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                    What You'll Get
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {[
                      "Access to all CareerSense AI career tools",
                      "AI Resume Builder and job-specific personalization",
                      "ATS resume checker and detailed gap reports",
                      "AI Cover Letter Builder tailored to job postings",
                      "Unlimited free report & resume PDF downloads",
                      "Priority AI execution queue for rapid analysis",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-[10px] font-black mt-0.5">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Who Is This For?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Students, fresh graduates, and active job seekers who want to build ATS-optimized resumes and prepare targeted applications with AI tools.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4">
                  <Zap size={22} className="text-amber-700 shrink-0 mt-0.5" fill="currentColor" />
                  <div>
                    <strong className="block text-xs font-black text-amber-950">
                      100,000 AI Tokens Every Month
                    </strong>
                    <small className="block text-[11px] text-amber-800/90 mt-0.5 leading-normal">
                      Tokens refill every monthly billing cycle. Unused monthly tokens do not roll over to the next month.
                    </small>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                    Important to Know
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {[
                      "Fellowship internship enrollment is not included",
                      "Partner workspace and founder calls are not included",
                      "Tokens refill automatically on the monthly plan cycle",
                      "No internship or employment documents are included",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQs */}
                <div className="space-y-2 pt-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Questions Before Purchase
                  </h3>
                  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      <span>When do my tokens refresh?</span>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      100,000 tokens are credited to your balance instantly upon upgrade and refresh every 30 days while your subscription is active.
                    </p>
                  </details>

                  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      <span>Does Student include internships?</span>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      No. Internship projects, mentorship, offer letters, and completion certificates are part of the <strong>Intern Fellowship Plan</strong>.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* ======================= INTERN (FELLOWSHIP) TAB ======================= */}
          {activePlan === "intern" && (
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
              {/* Left Column */}
              <div className="space-y-4">
                {/* SELECT FELLOWSHIP TRACK - ALL 6 TRACKS */}
                <div className="rounded-2xl border-2 border-teal-500/80 bg-teal-50/50 p-4">
                  <label htmlFor="modalFellowshipTrack" className="block text-[11px] font-black uppercase tracking-wider text-teal-900 mb-2">
                    Select Your Fellowship Track (Required)
                  </label>
                  <select
                    id="modalFellowshipTrack"
                    value={localTrack}
                    onChange={(e) => handleTrackSelect(e.target.value)}
                    className="w-full rounded-xl border border-teal-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-xs focus:border-teal-600 focus:outline-none"
                  >
                    {FELLOWSHIP_TRACKS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-[11px] text-teal-800 font-medium">
                    You are enrolling for: <strong className="font-bold">{FELLOWSHIP_TRACKS.find(t => t.id === localTrack)?.name}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                    <div className="text-lg font-black text-[#122A42]">3 Months</div>
                    <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-500">Duration</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                    <div className="text-lg font-black text-teal-700">500,000</div>
                    <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-500">AI Tokens / Month</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                    What You Will Do
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {[
                      "Join your selected fellowship track with assigned projects",
                      "Complete real-world tasks and practical problem statements",
                      "Receive hands-on guidance and structured mentorship",
                      "Full access to all CareerSense AI career tools",
                      "Unlimited free resume and report downloads",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-[10px] font-black mt-0.5">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-teal-200/80 bg-teal-50/40 p-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-teal-900 mb-1">
                    Documents on Successful Completion
                  </h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed mb-2.5">
                    Upon completing the full 3-month internship period <strong>and all assigned project requirements</strong>, you will receive:
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                      <FileText size={15} className="text-teal-700" />
                      <span>Official Internship Completion Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                      <FileText size={15} className="text-teal-700" />
                      <span>Official Internship Relieving Letter</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[10.5px] text-slate-500 italic">
                    * An official internship offer letter is provided upon enrollment onboarding.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                    ⚡ Fellowship Enrollment
                  </div>
                  <div className="mt-1 text-2xl sm:text-3xl font-black text-[#122A42]">
                    {order.priceFormatted} <span className="text-xs text-slate-500 font-semibold">{order.periodText}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-white border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      Real-World Projects
                    </span>
                    <span className="rounded-full bg-white border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      1-on-1 Mentorship
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-teal-300 bg-teal-50/60 p-3.5 text-xs text-teal-950">
                  <BadgeCheck size={18} className="text-teal-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Internship ID Card Validity:</strong> Valid for <strong>3 months from the official internship start date</strong>, not the payment date.
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                    Your Internship Journey
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { step: "1", title: "Enroll in Track", desc: "Select your fellowship and complete enrollment." },
                      { step: "2", title: "Start Internship", desc: "Receive official offer letter and start date." },
                      { step: "3", title: "Complete Projects", desc: "Work on real tasks with hands-on mentorship." },
                      { step: "4", title: "Earn Documents", desc: "Receive completion certificate & relieving letter." },
                    ].map((s) => (
                      <div key={s.step} className="flex items-start gap-2.5 text-xs">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-slate-900 font-black text-[10.5px]">
                          {s.step}
                        </span>
                        <div>
                          <strong className="text-slate-800">{s.title}: </strong>
                          <span className="text-slate-500">{s.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="space-y-2 pt-1">
                  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      <span>When does the 3-month period begin?</span>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      Your internship start date is designated during onboarding, so you get the full 3-month working duration regardless of your registration date.
                    </p>
                  </details>

                  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      <span>Are completion documents automatic?</span>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      Documents are awarded upon active participation and successful completion of your assigned track projects and milestone evaluations.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* ======================= PARTNER TAB ======================= */}
          {activePlan === "partner" && (
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-4">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-amber-900 mb-2">
                    Choose Your Billing Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleBillingSelect("monthly")}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        localBilling === "monthly"
                          ? "border-amber-600 bg-amber-100/90 text-amber-950 font-black shadow-xs ring-2 ring-amber-500/20"
                          : "border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs">Monthly</div>
                      <div className="text-sm font-black mt-0.5">{isUsd ? "$24.99" : "₹2,499"} / mo</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBillingSelect("half_yearly")}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        localBilling === "half_yearly"
                          ? "border-amber-600 bg-amber-100/90 text-amber-950 font-black shadow-xs ring-2 ring-amber-500/20"
                          : "border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs">6-Month Package</div>
                      <div className="text-sm font-black mt-0.5">{isUsd ? "$99.99" : "₹10,000"} total</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                    <div className="text-lg font-black text-[#122A42]">12 Weeks</div>
                    <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-500">Program Journey</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                    <div className="text-lg font-black text-amber-700">20 Tasks</div>
                    <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-500">Assignments</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                    What You Will Experience
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {[
                      "Real-world startup projects and structured assignments",
                      "Exposure to product, AI, research, analytics and growth",
                      "Partner workspace and full access to AI career tools",
                      "Weekly founder mentorship calls and strategy sessions",
                      "Final CareerSense Boardroom Challenge",
                      "Official Partner Program ID and program offer letter",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-black mt-0.5">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2">
                    Pathway to a CareerSense Role
                  </h3>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <span className="font-black text-amber-800">1.</span>
                      <span>Finish the program and all 20 required assignments.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-black text-amber-800">2.</span>
                      <span>Qualifying graduates progress to a final interview with the CareerSense CEO.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-black text-amber-800">3.</span>
                      <span>Selected candidates may be offered a role based on performance and available openings.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4">
                  <Zap size={22} className="text-amber-700 shrink-0 mt-0.5" fill="currentColor" />
                  <div>
                    <strong className="block text-xs font-black text-amber-950">
                      1,000,000 AI Tokens / Month
                    </strong>
                    <small className="block text-[11px] text-amber-800/90 mt-0.5 leading-normal">
                      Monthly allocation under the enrolled plan while eligible.
                    </small>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Who Should Join?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Entrepreneurs and aspiring leaders who want practical startup exposure, enjoy tackling assignments, and want to collaborate directly with the core team.
                  </p>
                </div>

                <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/80 p-3 text-[11px] text-amber-900 leading-relaxed">
                  <strong>Important:</strong> Participation and program completion do not guarantee employment. Any job offer is contingent upon CEO interview performance, role availability, and hiring decisions.
                </div>

                {/* FAQs */}
                <div className="space-y-2 pt-1">
                  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      <span>Do I get a job automatically?</span>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      No. Completing the assignments qualifies you for the CEO interview. Employment offers are merit-based.
                    </p>
                  </details>

                  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      <span>What documents are included?</span>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      You receive an official Partner Program ID and a formal participation letter for the cohort.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TOKEN TOP-UP VIEW ======================= */}
          {isTopUp && (
            <div className="max-w-lg mx-auto py-2 space-y-4">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-center">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-amber-100 text-amber-800 mb-3">
                  <Layers size={28} />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-800">
                  Instant Token Top-Up
                </div>
                <h3 className="text-2xl font-black text-[#122A42] mt-1">
                  50,000 AI Tokens
                </h3>
                <div className="text-3xl font-black text-[#122A42] mt-2">
                  {order.priceFormatted}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  One-time instant token add-on · Never expires
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5 text-xs text-slate-700 shadow-xs">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-teal-600 shrink-0" />
                  <span>Tokens added instantly to your active CareerSense account</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-teal-600 shrink-0" />
                  <span>Works across all CareerSense tools (Resume, ATS, Cover Letter, Certifi)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-teal-600 shrink-0" />
                  <span>Does not modify or cancel your existing subscription tier</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50/80 border-t border-slate-100 flex-none">
          {/* Order Summary Line */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Selected Plan
              </div>
              <div className="text-xs font-black text-[#122A42]">
                {order.name} · <span className="font-semibold text-slate-500">{order.duration}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl sm:text-2xl font-black text-[#122A42] leading-tight">
                {order.priceFormatted}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                Total before Razorpay
              </div>
            </div>
          </div>

          {/* Mandatory Checkbox Agreement */}
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none mb-3.5">
            <input
              type="checkbox"
              id="confirmPlanCheckbox"
              checked={hasAcceptedTerms}
              onChange={(e) => setHasAcceptedTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <span className="leading-tight">
              I have read the plan details, price, program requirements, and completion conditions.
            </span>
          </label>

          {/* Action Buttons */}
          <div className="grid grid-cols-[130px_1fr] gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={handleProceed}
              disabled={!hasAcceptedTerms || loading}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black text-white shadow-md transition-all ${
                !hasAcceptedTerms || loading
                  ? "bg-slate-300 cursor-not-allowed shadow-none"
                  : activePlan === "partner"
                  ? "bg-gradient-to-r from-[#daaa59] to-[#b77e26] hover:brightness-105 active:scale-95"
                  : activePlan === "token_addon"
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-105 active:scale-95"
                  : "bg-gradient-to-r from-[#0aa59c] to-[#166abf] hover:brightness-105 active:scale-95"
              }`}
            >
              <Lock size={14} />
              <span>
                {loading
                  ? "Connecting to Razorpay…"
                  : hasAcceptedTerms
                  ? `Proceed to Payment · ${order.priceFormatted}`
                  : "Accept Terms to Continue"}
              </span>
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-slate-400">
            🔒 Secure checkout will be processed by <strong>Razorpay</strong>. No deductions occur without your bank confirmation.
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

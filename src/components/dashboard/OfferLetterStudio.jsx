import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, CalendarDays, Download, Eye, LockKeyhole, MapPin, Maximize2, Monitor, PanelLeftOpen, UserRound, Sparkles, GraduationCap } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import CSLogo from "../../Assets/CSlogo.png";
import ShagunSignature from "../../Assets/ShagunSignature.png";
import {
  FELLOWSHIP_OFFER_TEMPLATES,
  FELLOWSHIP_COMMON_TERMS,
  FELLOWSHIP_PAGE3_SECTIONS
} from "./fellowshipOfferTemplates";

const getEffectiveOfferDate = (subscription, profile, user) => {
  if (profile?.offerDate) return profile.offerDate.slice(0, 10);

  const now = new Date();

  // 1. Explicit activatedAt timestamp if set specifically on subscription (and in past/present)
  if (subscription?.activatedAt) {
    try {
      const d = new Date(subscription.activatedAt);
      if (!isNaN(d.getTime()) && d <= now) return d.toISOString().slice(0, 10);
    } catch (_) {}
  }

  // 2. Calculate backwards from planExpiresAt for active paid tier (6 months for partner, 3 for intern, 1 for student)
  if (subscription?.planExpiresAt && subscription?.plan && subscription.plan !== "free") {
    try {
      const expiry = new Date(subscription.planExpiresAt);
      if (!isNaN(expiry.getTime())) {
        const planKey = subscription.plan;
        
        const d6 = new Date(expiry);
        d6.setMonth(d6.getMonth() - 6);

        const d3 = new Date(expiry);
        d3.setMonth(d3.getMonth() - 3);

        const d1 = new Date(expiry);
        d1.setMonth(d1.getMonth() - 1);

        let candidateDate = now;
        if (planKey === "partner") {
          candidateDate = (d6 <= now) ? d6 : ((d1 <= now) ? d1 : now);
        } else if (planKey === "intern") {
          candidateDate = (d3 <= now) ? d3 : ((d1 <= now) ? d1 : now);
        } else {
          candidateDate = (d1 <= now) ? d1 : now;
        }

        return candidateDate.toISOString().slice(0, 10);
      }
    } catch (_) {}
  }

  return now.toISOString().slice(0, 10);
};

const getEffectiveJoiningDate = (offerDateStr, profile) => {
  if (profile?.dateOfJoining) return profile.dateOfJoining.slice(0, 10);
  try {
    const d = new Date(`${offerDateStr}T00:00:00`);
    if (!isNaN(d.getTime())) {
      d.setDate(d.getDate() + 7);
      return d.toISOString().slice(0, 10);
    }
  } catch (_) {}
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
};

const displayDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "Not specified";

function Field({ label, children }) {
  return <label className="grid gap-1.5"><span className="text-[11px] font-black uppercase tracking-[0.11em] text-slate-500">{label}</span>{children}</label>;
}

const letterPageClass = "mx-auto flex aspect-[210/297] w-[794px] flex-col overflow-hidden bg-white px-[50px] pb-[34px] pt-[38px] font-serif text-[9px] leading-[1.4] text-[#10233f] shadow-[0_20px_55px_rgba(15,35,65,.14)]";

function LetterHeader({ section, headerTag = "PARTNER PROGRAM" }) {
  return (
    <>
      <header className="flex h-[58px] items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={CSLogo} alt="CareerSense" className="h-[46px] w-auto object-contain" />
          <div>
            <div className="text-[24px] font-bold leading-none text-[#082d57]">CareerSense</div>
            <div className="mt-1 text-[9px] tracking-wide text-[#0097a7]">AI-Powered Career Growth</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[12px] font-bold text-[#147bd1] uppercase">{headerTag}</div>
          <div className="mt-1 text-[9px] text-slate-500">{section}</div>
        </div>
      </header>
      <div className="mt-4 grid h-[10px] grid-cols-[1.4fr_1fr_.7fr]">
        <span className="bg-[#082d57]" />
        <span className="bg-[#147bd1]" />
        <span className="bg-[#20c7b7]" />
      </div>
    </>
  );
}

function LetterFooter({ page, programLabel = "Partner Program" }) {
  return <div className="mt-auto border-t border-slate-200 pt-3 text-center text-[8px] leading-none tracking-wide text-slate-500">CareerSense&nbsp; • &nbsp;careersenseai.com&nbsp; • &nbsp;{programLabel}&nbsp; • &nbsp;Page {page} of 3</div>;
}

export default function OfferLetterStudio({
  profile,
  user,
  subscription,
  plan = "partner",
  initialFellowshipId = "data-analyst"
}) {
  const isPartner = plan === "partner";
  const purchasedFellowships = subscription?.purchasedFellowships || [];
  
  // Default fellowship to enrolled or initial
  const defaultFellowshipId = purchasedFellowships.length > 0
    ? purchasedFellowships[0]
    : initialFellowshipId;

  const [selectedFellowshipId, setSelectedFellowshipId] = useState(defaultFellowshipId);

  useEffect(() => {
    if (purchasedFellowships.length > 0 && !purchasedFellowships.includes(selectedFellowshipId)) {
      setSelectedFellowshipId(purchasedFellowships[0]);
    }
  }, [purchasedFellowships]);

  const fellowshipTemplate = FELLOWSHIP_OFFER_TEMPLATES[selectedFellowshipId] || FELLOWSHIP_OFFER_TEMPLATES["data-analyst"];

  const letterRef = useRef(null);
  const [exporting, setExporting] = useState(false);
  const [viewMode, setViewMode] = useState("split");
  const [shareMessage, setShareMessage] = useState("");

  const initialOfferDate = getEffectiveOfferDate(subscription, profile, user);
  const initialJoiningDate = getEffectiveJoiningDate(initialOfferDate, profile);

  const [details, setDetails] = useState({
    fullName: profile.fullName || user?.fullName || (isPartner ? "CareerSense Partner" : "CareerSense Fellow"),
    email: profile.email || user?.primaryEmailAddress?.emailAddress || "",
    address: profile.location || profile.geographicalAlignment || "",
    offerDate: initialOfferDate,
    joiningDate: initialJoiningDate,
    position: isPartner ? (profile.currentJobTitle || "CareerSense Partner") : fellowshipTemplate.position,
    workingMode: isPartner ? "Remote" : "Remote / Online, with cohort sessions as applicable",
    location: profile.location || profile.geographicalAlignment || "Delhi",
    engagementType: isPartner ? "Partner / Community Collaboration" : fellowshipTemplate.details.engagementType,
    initialTerm: isPartner ? "3 months, renewable by mutual agreement" : fellowshipTemplate.details.initialTerm,
    timeCommitment: isPartner ? "Flexible and task-based; agreed with the Partner Lead" : fellowshipTemplate.details.timeCommitment,
    compensation: isPartner ? "As applicable to the specific Partner Program and communicated separately" : fellowshipTemplate.details.benefits,
  });

  useEffect(() => {
    const computedOfferDate = getEffectiveOfferDate(subscription, profile, user);
    const computedJoiningDate = getEffectiveJoiningDate(computedOfferDate, profile);

    setDetails((current) => ({
      ...current,
      fullName: profile.fullName || user?.fullName || current.fullName,
      email: profile.email || user?.primaryEmailAddress?.emailAddress || current.email,
      address: profile.location || profile.geographicalAlignment || current.address,
      location: profile.location || profile.geographicalAlignment || current.location,
      position: isPartner ? (profile.currentJobTitle || current.position) : fellowshipTemplate.position,
      engagementType: isPartner ? "Partner / Community Collaboration" : fellowshipTemplate.details.engagementType,
      initialTerm: isPartner ? "3 months, renewable by mutual agreement" : fellowshipTemplate.details.initialTerm,
      timeCommitment: isPartner ? "Flexible and task-based; agreed with the Partner Lead" : fellowshipTemplate.details.timeCommitment,
      compensation: isPartner ? "As applicable to the specific Partner Program and communicated separately" : fellowshipTemplate.details.benefits,
      offerDate: computedOfferDate,
      joiningDate: computedJoiningDate,
    }));
  }, [profile, user, subscription, isPartner, selectedFellowshipId]);

  const firstName = details.fullName.trim().split(/\s+/)[0] || (isPartner ? "Partner" : "Fellow");
  const inputClass = "h-11 w-full cursor-default rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-semibold text-slate-800 outline-none";

  async function downloadOfferLetter() {
    if (!letterRef.current) return;
    setExporting(true);
    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pages = letterRef.current.querySelectorAll("[data-offer-page]");
      for (let index = 0; index < pages.length; index += 1) {
        const canvas = await html2canvas(pages[index], { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false });
        if (index > 0) pdf.addPage("a4", "portrait");
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }
      const filePrefix = details.fullName.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || (isPartner ? "CareerSense-Partner" : "CareerSense-Fellow");
      const docType = isPartner ? "Partner-Offer-Letter" : `${fellowshipTemplate.trackName.replace(/\s+/g, "-")}-Fellowship-Offer-Letter`;
      pdf.save(`${filePrefix}-${docType}.pdf`);
    } finally { setExporting(false); }
  }

  async function shareOnLinkedIn() {
    const text = isPartner
      ? `I am delighted to share that I have received an offer to join CareerSense as ${details.position}. I look forward to contributing, learning and creating meaningful career impact with the CareerSense Partner Program.`
      : `I am delighted to share that I have received an offer to join the CareerSense ${fellowshipTemplate.trackName} Fellowship! Excited to build practical capability and ship real projects with CareerSense.`;

    try {
      await navigator.clipboard.writeText(text);
      setShareMessage("Caption copied. Attach your downloaded offer letter on LinkedIn.");
    } catch {
      setShareMessage("Download the letter, then attach it to your LinkedIn post.");
    }
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setShareMessage(""), 5000);
  }

  return (
    <div className={`grid gap-6 ${viewMode === "split" ? "xl:grid-cols-[minmax(390px,0.82fr)_minmax(0,1.18fr)]" : "grid-cols-1"}`}>
      {viewMode !== "letter" && (
        <section className={`self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-xs xl:sticky xl:top-6 ${viewMode === "details" ? "mx-auto w-full max-w-4xl" : ""}`}>
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                {isPartner ? <BriefcaseBusiness size={19} /> : <GraduationCap size={19} />}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">
                    {isPartner ? "Partner Offer details" : "Fellowship Offer details"}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-600">
                    <LockKeyhole size={11} />Profile managed
                  </span>
                </div>
                <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                  These details are securely populated from your {isPartner ? "partner" : "fellowship"} enrollment and profile.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "details" ? "split" : "details")}
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
            >
              {viewMode === "details" ? <Eye size={16} /> : <PanelLeftOpen size={16} />}
              {viewMode === "details" ? "View letter" : "Focus details"}
            </button>
          </div>

          {/* Enrolled Track for Intern users - Only allows access to purchased tracks */}
          {!isPartner && (
            purchasedFellowships.length > 1 ? (
              <div className="mt-5 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50/70 to-teal-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-800">Enrolled Fellowship Track</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-cyan-100/80 px-2 py-0.5 text-[9px] font-bold text-cyan-800">
                    <LockKeyhole size={10} /> Enrolled Access Only
                  </span>
                </div>
                <select
                  value={selectedFellowshipId}
                  onChange={(e) => setSelectedFellowshipId(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-cyan-200 bg-white px-3.5 text-sm font-bold text-slate-800 outline-none focus:border-cyan-500"
                >
                  {purchasedFellowships.map((trackId) => {
                    const tmpl = FELLOWSHIP_OFFER_TEMPLATES[trackId];
                    if (!tmpl) return null;
                    return (
                      <option key={tmpl.id} value={tmpl.id}>
                        {tmpl.trackName} Fellowship
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50/70 to-teal-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-800">Enrolled Fellowship Track</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-cyan-100/80 px-2 py-0.5 text-[9px] font-bold text-cyan-800">
                    <LockKeyhole size={10} /> Enrolled Track
                  </span>
                </div>
                <div className="mt-2 flex h-11 w-full items-center rounded-xl border border-cyan-200 bg-white px-3.5 text-sm font-black text-slate-800 shadow-xs">
                  {fellowshipTemplate.trackName} Fellowship
                </div>
              </div>
            )
          )}

          <div className="mt-5 grid gap-4">
            <Field label="Full name">
              <div className="relative">
                <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={details.fullName} readOnly aria-readonly="true" className={`${inputClass} pl-10`} />
              </div>
            </Field>
            <Field label="Email">
              <input type="email" value={details.email} readOnly aria-readonly="true" className={inputClass} />
            </Field>
            <Field label="Address / City, State">
              <input value={details.address} readOnly aria-readonly="true" className={inputClass} placeholder="Not provided in profile" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Offer date">
                <input type="date" value={details.offerDate} readOnly aria-readonly="true" className={inputClass} />
              </Field>
              <Field label="Date of joining">
                <input type="date" value={details.joiningDate} readOnly aria-readonly="true" className={inputClass} />
              </Field>
            </div>
            <Field label="Offered position">
              <div className="relative">
                <BriefcaseBusiness className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={details.position} readOnly aria-readonly="true" className={`${inputClass} pl-10`} />
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Working mode">
                <div className="relative">
                  <Monitor className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input value={details.workingMode} readOnly aria-readonly="true" className={`${inputClass} pl-10`} />
                </div>
              </Field>
              <Field label="Location">
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input value={details.location} readOnly aria-readonly="true" className={`${inputClass} pl-10`} />
                </div>
              </Field>
            </div>
            <Field label="Engagement type">
              <input value={details.engagementType} readOnly aria-readonly="true" className={inputClass} />
            </Field>
            <Field label="Initial term">
              <input value={details.initialTerm} readOnly aria-readonly="true" className={inputClass} />
            </Field>
            <Field label="Time commitment">
              <input value={details.timeCommitment} readOnly aria-readonly="true" className={inputClass} />
            </Field>
            <Field label={isPartner ? "Compensation / benefits" : "Program Benefits / Recognition"}>
              <textarea value={details.compensation} readOnly aria-readonly="true" className="min-h-20 w-full cursor-default resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold leading-5 text-slate-800 outline-none" />
            </Field>
          </div>
          <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-xs leading-5 text-cyan-900">
            <strong>Need a correction?</strong> Update the corresponding information in your CareerSense profile. The offer letter will then refresh from the approved profile data.
          </div>
        </section>
      )}

      {viewMode !== "details" && (
        <section className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6 ${viewMode === "letter" ? "mx-auto w-full max-w-[1180px]" : ""}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Live A4 preview</p>
              <h3 className="mt-1 text-base font-black text-slate-900">
                {isPartner ? "CareerSense Partner Offer Letter" : `CareerSense ${fellowshipTemplate.trackName} Fellowship Offer Letter`}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-teal-700">
                <CalendarDays size={13} />Joining {displayDate(details.joiningDate)}
              </span>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "letter" ? "split" : "letter")}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
              >
                {viewMode === "letter" ? <PanelLeftOpen size={16} /> : <Maximize2 size={16} />}
                {viewMode === "letter" ? "Show details" : "Focus letter"}
              </button>
            </div>
          </div>

          <div ref={letterRef} className="mt-5 grid max-h-[980px] gap-7 overflow-auto rounded-2xl bg-slate-100 p-4 sm:p-7">
            {isPartner ? (
              // ---------------- PARTNER OFFER LETTER (UNTOUCHED ORIGINAL) ----------------
              <>
                <article data-offer-page className={letterPageClass}>
                  <LetterHeader section="careersenseai.com" headerTag="PARTNER PROGRAM" />
                  <div className="mt-4 text-right font-bold text-[#008ea0]">{displayDate(details.offerDate)}</div>
                  <h1 className="mt-2 text-center text-[18px] font-bold tracking-wide text-[#082d57]">CAREERSENSE PARTNER OFFER LETTER</h1>
                  <div className="mt-4">
                    <strong>To,</strong><br />
                    <strong>{details.fullName}</strong><br />
                    {details.address || details.location}<br />
                    {details.email || "Email not provided"}
                  </div>
                  <p className="mt-3 font-bold">Subject: Offer to Join CareerSense as {details.position}</p>
                  <p className="mt-2 font-bold">Dear {firstName},</p>
                  <p className="mt-1.5">
                    We are pleased to invite you to join CareerSense as <strong>{details.position}</strong>. CareerSense is building a connected career-readiness ecosystem that brings together learning, career tools, skill development, interview preparation and career guidance. As a Partner, you will contribute according to your strengths while collaborating with people from diverse academic and professional backgrounds.
                  </p>
                  <p className="mt-1.5">
                    Your role may contribute to technology, data, product, design, research, content, outreach, operations, partnerships or community initiatives based on your skills and the needs of the CareerSense ecosystem. Your planned joining date is <strong>{displayDate(details.joiningDate)}</strong>.
                  </p>
                  <h2 className="mt-3 text-[13px] font-bold text-[#0097a7]">Partner Program Details</h2>
                  <div className="mt-1.5">
                    {[
                      ["Position", details.position],
                      ["Engagement Type", details.engagementType],
                      ["Initial Term", details.initialTerm],
                      ["Working Mode", `${details.workingMode} - ${details.location}`],
                      ["Time Commitment", details.timeCommitment],
                      ["Compensation / Benefits", details.compensation]
                    ].map(([label, value], index) => (
                      <div key={label} className={`grid grid-cols-[190px_1fr] ${index % 2 ? "bg-slate-100" : "bg-cyan-50"}`}>
                        <strong className="px-3 py-2">{label}</strong>
                        <span className="px-3 py-2">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <strong>Before onboarding, you may be asked to provide:</strong>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 marker:text-teal-500">
                      <li>Basic identification and current contact details</li>
                      <li>Current college, company or professional information, where applicable</li>
                      <li>Portfolio, profile or skill information relevant to your contribution area</li>
                    </ul>
                  </div>
                  <p className="mt-3 italic text-slate-500">
                    This offer is issued for the CareerSense Partner Program. Final responsibilities, benefits or project terms may be updated for a specific cohort, project, location or engagement by mutual written communication.
                  </p>
                  <LetterFooter page="1" programLabel="Partner Program" />
                </article>

                <article data-offer-page className={letterPageClass}>
                  <LetterHeader section="TERMS OF ENGAGEMENT" headerTag="PARTNER PROGRAM" />
                  <h2 className="mt-5 text-[13px] font-bold text-[#082d57]">1. Partner Responsibilities</h2>
                  <p className="mt-2">As a CareerSense Partner, your responsibilities may include the following. The exact mix will depend on your skills, interests and assigned initiatives:</p>
                  <ol className="mt-2 grid list-decimal gap-1 pl-5">
                    <li>Understand the data structures, information flows, product architecture and operating model behind the CareerSense ecosystem so you can contribute effectively within your area.</li>
                    <li>Identify opportunities to improve the overall performance, usability, reliability, quality and user experience of CareerSense products and services.</li>
                    <li>Work with real datasets, build predictive models using Python, Pandas &amp; Scikit-learn, and present data-driven insights to solve business problems.</li>
                    <li>Analyse business data using Excel, SQL &amp; Power BI. Build dashboards, identify trends, and deliver actionable reports to stakeholders.</li>
                    <li>Spread awareness of CareerSense across colleges, universities, companies, professional communities and relevant networks in a responsible and brand-aligned manner.</li>
                    <li>Collect structured feedback from students, professionals, institutions and users, and share actionable insights with the appropriate CareerSense teams.</li>
                    <li>Support cross-functional projects involving technology, product, data, research, content, design, operations, partnerships, marketing, community or events as relevant to your skills.</li>
                    <li>Participate in testing, research, documentation, ideation, workshops, campaigns, events and partner initiatives when requested and mutually agreed.</li>
                    <li>Build end-to-end web applications using React/Next.js on the frontend and Node.js or PHP on the backend. Work with REST APIs, databases &amp; deployment pipelines.</li>
                    <li>Run live SEO, Google Ads &amp; social media campaigns. Learn content strategy, email marketing, analytics &amp; performance tracking for real brands.</li>
                    <li>Help build and maintain a high-quality CareerSense community by sharing knowledge, supporting learners and connecting suitable institutions or organizations to the platform.</li>
                    <li>Design intuitive user interfaces and experiences using Figma. Learn design systems, wireframing, prototyping, usability testing &amp; handoff to developers.</li>
                    <li>Build AI &amp; ML models — from NLP and computer vision to LLM integrations. Work on real-world AI projects with Python, TensorFlow &amp; OpenAI APIs.</li>
                    <li>Maintain professional standards, communicate progress clearly, meet agreed deadlines and represent CareerSense responsibly in external interactions.</li>
                  </ol>
                  <div className="mt-3 grid gap-2">
                    {[
                      ["2. Collaboration & Working Expectations", "The Partner Program is flexible and outcome-oriented. You are expected to stay responsive, attend agreed meetings or sessions, complete assigned activities within reasonable timelines and proactively communicate blockers or changes in availability."],
                      ["3. Confidentiality", "Keep non-public CareerSense information confidential, including internal product information, data, roadmaps, credentials, research, partner information, business plans and unreleased materials. It may not be shared without written authorization."],
                      ["4. Intellectual Property", "Unless separately agreed in writing, original work created specifically for an assigned CareerSense activity may be used by CareerSense for its products, content, operations, marketing, training or business needs. Pre-existing work remains with its original owner."],
                      ["5. Data Protection & Security", "Use CareerSense systems and information responsibly. Do not copy, download, expose or share personal, confidential or restricted data beyond an approved task. Credentials, access links and internal tools must not be shared."],
                      ["6. Public Representation", "You may describe yourself as a CareerSense Partner only while participation is active. You must not make commitments, contracts, pricing promises, hiring promises or official statements for CareerSense unless authorized."],
                      ["7. Professional Conduct", "Act respectfully, inclusively and professionally. Harassment, discrimination, data misuse, misleading representation, plagiarism, fraud, illegal activity or materially harmful behavior may lead to immediate removal."],
                      ["8. Nature of Relationship", "Unless a separate employment agreement is signed, the Partner Program does not create an employer-employee relationship or guarantee compensation or future employment. Paid work, incentives or employment require separate written terms."]
                    ].map(([title, copy]) => (
                      <section key={title}>
                        <h3 className="font-bold text-[#008ea0]">{title}</h3>
                        <p>{copy}</p>
                      </section>
                    ))}
                  </div>
                  <LetterFooter page="2" programLabel="Partner Program" />
                </article>

                <article data-offer-page className={letterPageClass}>
                  <LetterHeader section="ACCEPTANCE & ONBOARDING" headerTag="PARTNER PROGRAM" />
                  <div className="mt-6 grid gap-4">
                    <section><h2 className="text-[13px] font-bold text-[#008ea0]">9. Learning &amp; Growth Opportunities</h2><p className="mt-1">CareerSense may provide selected learning resources, community sessions, product exposure, workshops, projects, mentorship, events or networking opportunities depending on availability and the Partner Program.</p></section>
                    <section><h2 className="text-[13px] font-bold text-[#008ea0]">10. Recognition</h2><p className="mt-1">Active Partners may be eligible for participation certificates, experience or contribution letters, public recognition, references, event opportunities or expanded responsibilities based on contribution quality, duration and program policies. These are not automatic and may vary by cohort.</p></section>
                    <section><h2 className="text-[13px] font-bold text-[#008ea0]">11. Termination / Exit</h2><p className="mt-1">Either CareerSense or the Partner may end the collaboration with reasonable written notice. CareerSense may end access immediately for confidentiality breaches, misuse of systems or data, misconduct, repeated non-performance, misrepresentation or illegal activity. On exit, all access, credentials, confidential materials and internal documents must be returned or deleted as instructed.</p></section>
                    <section><h2 className="text-[13px] font-bold text-[#008ea0]">12. Future Opportunities</h2><p className="mt-1">Strong performers may be considered for additional projects, leadership responsibilities, paid assignments, internships, consulting opportunities or full-time roles when available. Participation does not guarantee any future role.</p></section>
                  </div>
                  <p className="mt-5 italic">Our intent is simple: give Partners meaningful exposure to how CareerSense is built, improved and grown - while creating opportunities to contribute, learn and build professional experience.</p>
                  <h2 className="mt-5 text-[13px] font-bold text-[#082d57]">Acceptance</h2>
                  <p className="mt-2">I, <strong>{details.fullName}</strong>, accept the offer to participate as a CareerSense Partner and agree to follow the terms and expectations stated in this letter and any applicable CareerSense Partner Program policies communicated to me.</p>
                  <div className="mt-6 grid grid-cols-2 gap-12">
                    <div>
                      <p className="font-bold text-[#008ea0]">For CareerSense</p>
                      <img src={ShagunSignature} alt="Signature of Shagun Nagpal" className="mt-3 h-[72px] w-[150px] object-contain object-left" />
                      <div className="w-52 border-t border-[#10233f] pt-2">
                        <strong>Shagun Nagpal</strong><br />
                        Founder &amp; CEO, CareerSense<br />
                        {displayDate(details.offerDate)}
                      </div>
                    </div>
                    <div className="pt-[91px]">
                      <div className="w-52 border-t border-[#10233f] pt-2">
                        <strong>{details.fullName}</strong><br />
                        Partner Signature<br />
                        Date: __________________
                      </div>
                    </div>
                  </div>
                  <div className="mt-7 rounded-lg bg-[#082d57] px-5 py-4 text-center text-white">
                    <strong className="text-[14px]">WELCOME TO CAREERSENSE</strong>
                    <div className="mt-1 text-[9px] tracking-wide text-blue-100">Build skills. Improve products. Create impact. Grow together.</div>
                  </div>
                  <LetterFooter page="3" programLabel="Partner Program" />
                </article>
              </>
            ) : (
              // ---------------- FELLOWSHIP OFFER LETTER (TRACK-SPECIFIC) ----------------
              <>
                <article data-offer-page className={letterPageClass}>
                  <LetterHeader section="careersenseai.com" headerTag={fellowshipTemplate.headerTag} />
                  <div className="mt-4 text-right font-bold text-[#008ea0]">{displayDate(details.offerDate)}</div>
                  <h1 className="mt-2 text-center text-[18px] font-bold tracking-wide text-[#082d57]">{fellowshipTemplate.title}</h1>
                  <div className="mt-4">
                    <strong>To,</strong><br />
                    <strong>{details.fullName}</strong><br />
                    {details.address || details.location}<br />
                    {details.email || "Email not provided"}
                  </div>
                  <p className="mt-3 font-bold">Subject: {fellowshipTemplate.subject}</p>
                  <p className="mt-2 font-bold">Dear {firstName},</p>
                  <p className="mt-1.5">{fellowshipTemplate.intro1(firstName)}</p>
                  <p className="mt-1.5">{fellowshipTemplate.intro2}</p>
                  <h2 className="mt-3 text-[13px] font-bold text-[#0097a7]">{fellowshipTemplate.trackName} Fellowship Details</h2>
                  <div className="mt-1.5">
                    {[
                      ["Position", fellowshipTemplate.details.position],
                      ["Engagement Type", fellowshipTemplate.details.engagementType],
                      ["Initial Term", fellowshipTemplate.details.initialTerm],
                      ["Working Mode", fellowshipTemplate.details.workingMode],
                      ["Time Commitment", fellowshipTemplate.details.timeCommitment],
                      ["Program Benefits / Recognition", fellowshipTemplate.details.benefits]
                    ].map(([label, value], index) => (
                      <div key={label} className={`grid grid-cols-[190px_1fr] ${index % 2 ? "bg-slate-100" : "bg-cyan-50"}`}>
                        <strong className="px-3 py-2">{label}</strong>
                        <span className="px-3 py-2">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <strong>Before onboarding, you may be asked to provide:</strong>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 marker:text-teal-500">
                      <li>Basic identification and contact details</li>
                      <li>Current college / university / company / professional information, where applicable</li>
                      <li>Portfolio, GitHub, LinkedIn, profile, or skill information relevant to the Fellowship track</li>
                    </ul>
                  </div>
                  <p className="mt-3 italic text-slate-500">{fellowshipTemplate.footerDisclaimer}</p>
                  <LetterFooter page="1" programLabel={`${fellowshipTemplate.trackName} Fellowship`} />
                </article>

                <article data-offer-page className={letterPageClass}>
                  <LetterHeader section="TERMS OF PARTICIPATION" headerTag={fellowshipTemplate.headerTag} />
                  <h2 className="mt-5 text-[13px] font-bold text-[#082d57]">1. Fellowship Responsibilities</h2>
                  <p className="mt-2">As a CareerSense {fellowshipTemplate.position}, your responsibilities and learning activities may include the following. The exact mix may vary by cohort, project and your current skill level:</p>
                  <ol className="mt-2 grid list-decimal gap-1 pl-5">
                    {fellowshipTemplate.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ol>
                  <div className="mt-3 grid gap-2">
                    {FELLOWSHIP_COMMON_TERMS.map(([title, copy]) => (
                      <section key={title}>
                        <h3 className="font-bold text-[#008ea0]">{title}</h3>
                        <p>{copy}</p>
                      </section>
                    ))}
                  </div>
                  <LetterFooter page="2" programLabel={`${fellowshipTemplate.trackName} Fellowship`} />
                </article>

                <article data-offer-page className={letterPageClass}>
                  <LetterHeader section="ACCEPTANCE & COMPLETION" headerTag={fellowshipTemplate.headerTag} />
                  <div className="mt-6 grid gap-4">
                    {FELLOWSHIP_PAGE3_SECTIONS.map((sec) => (
                      <section key={sec.num}>
                        <h2 className="text-[13px] font-bold text-[#008ea0]">{sec.num}</h2>
                        <p className="mt-1">{sec.text}</p>
                      </section>
                    ))}
                  </div>
                  <p className="mt-5 italic">{fellowshipTemplate.intent}</p>
                  <h2 className="mt-5 text-[13px] font-bold text-[#082d57]">Acceptance</h2>
                  <p className="mt-2">
                    I, <strong>{details.fullName}</strong>, accept the offer to participate as a {fellowshipTemplate.acceptanceRole} and agree to follow the terms and expectations stated in this letter and any applicable {fellowshipTemplate.acceptancePolicy} policies or cohort instructions communicated to me.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-12">
                    <div>
                      <p className="font-bold text-[#008ea0]">For CareerSense</p>
                      <img src={ShagunSignature} alt="Signature of Shagun Nagpal" className="mt-3 h-[72px] w-[150px] object-contain object-left" />
                      <div className="w-52 border-t border-[#10233f] pt-2">
                        <strong>Shagun Nagpal</strong><br />
                        Founder &amp; CEO, CareerSense<br />
                        {displayDate(details.offerDate)}
                      </div>
                    </div>
                    <div className="pt-[91px]">
                      <div className="w-52 border-t border-[#10233f] pt-2">
                        <strong>{details.fullName}</strong><br />
                        Fellow Signature<br />
                        Date: __________________
                      </div>
                    </div>
                  </div>
                  <div className="mt-7 rounded-lg bg-[#082d57] px-5 py-4 text-center text-white">
                    <strong className="text-[14px]">WELCOME TO THE CAREERSENSE FELLOWSHIP</strong>
                    <div className="mt-1 text-[9px] tracking-wide text-blue-100">{fellowshipTemplate.welcomeTagline}</div>
                  </div>
                  <LetterFooter page="3" programLabel={`${fellowshipTemplate.trackName} Fellowship`} />
                </article>
              </>
            )}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={exporting}
              onClick={downloadOfferLetter}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition hover:brightness-105 disabled:opacity-60"
            >
              <Download size={17} />
              {exporting ? "Preparing PDF..." : "Download offer letter"}
            </button>
            <button
              type="button"
              onClick={shareOnLinkedIn}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#0a66c2] bg-white px-5 text-sm font-black text-[#0a66c2] transition hover:bg-blue-50"
            >
              <span className="grid h-[18px] w-[18px] place-items-center rounded-[3px] bg-[#0a66c2] text-[10px] font-black leading-none text-white">in</span>
              Share on LinkedIn
            </button>
          </div>
          {shareMessage && <p className="mt-3 rounded-xl bg-blue-50 px-4 py-3 text-center text-xs font-bold text-blue-800">{shareMessage}</p>}
        </section>
      )}
    </div>
  );
}

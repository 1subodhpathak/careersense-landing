import { Award, BookOpenCheck, Check, ChevronLeft, ChevronRight, Compass, Database, FileSearch, FileText, MessageSquareText, Plane, Sparkles, Target, TrendingUp, UserRound, Zap, ShieldCheck, Briefcase, Layers, GraduationCap } from "lucide-react";
import CSLogo from "../../../Assets/CSlogo.png";
import CompassWatermark from "../../../Assets/Passport backgrounds/compass_watermark.svg";
import MountainFooter from "../../../Assets/Passport backgrounds/mountain_footer.svg";
import WorldMapWatermark from "../../../Assets/Passport backgrounds/world_map_watermark.svg";

const dateLabel = (value) => {
  if (!value) return "Date recorded";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

function InkStamp({ type = "verified", className = "" }) {
  const stamp = {
    verified: { icon: Check, top: "CareerSense", main: "Verified", bottom: "Skill passport" },
    journey: { icon: Plane, top: "CareerSense", main: "Journey", bottom: "Milestone" },
    performer: { icon: Award, top: "CareerSense", main: "High", bottom: "Performer" },
    roadmap: { icon: Compass, top: "CareerSense", main: "On track", bottom: "Career GPS" },
  }[type] || { icon: Check, top: "CareerSense", main: "Verified", bottom: "Skill passport" };
  const Icon = stamp.icon;
  return (
    <span className={`passport-ink-stamp stamp-${type} ${className}`} aria-label={`${stamp.top} ${stamp.main} ${stamp.bottom}`}>
      <small>{stamp.top}</small>
      <Icon />
      <b>{stamp.main}</b>
      <em>{stamp.bottom}</em>
    </span>
  );
}

function SecurityLayer({ code, page }) {
  return (
    <div className="passport-security" aria-hidden="true">
      <span className="passport-guilloche" />
      <span className="passport-fiber fiber-one" />
      <span className="passport-fiber fiber-two" />
      <span className="passport-microprint">CAREERSENSE • VERIFIED SKILL JOURNEY • {code} • CAREERSENSE • VERIFIED SKILL JOURNEY •</span>
      <span className="passport-perforation">{code.slice(0, 3)}{String(page).padStart(2, "0")}</span>
    </div>
  );
}

function PageFolio({ code, page }) {
  return (
    <>
      <div className="passport-machine-code" aria-label={`Document code ${code}`}>
        <span>{`CSP<IND${code}<<<<<<<<<<<<`}</span>
        <span>{`${String(page).padStart(2, "0")}CSJOURNEY<<<<<<<<<<<<<<`}</span>
      </div>
      <span className="passport-page-number">{String(page).padStart(2, "0")}</span>
    </>
  );
}

function SectionHeader({ label, page }) {
  return (
    <header className="passport-section-header">
      <div className="passport-page-brand">
        <img src={CSLogo} alt="" />
        <b>Career<span>Sense</span></b>
        <small>{label}</small>
      </div>
      <span className="passport-section-code">P{String(page).padStart(2, "0")}</span>
    </header>
  );
}

// ── SPREAD 1: Passport Holder & Overview ───────────────────────────────────────────
function OverviewSpread({ journey }) {
  const inCurrentMonth = (value) => {
    const date = new Date(value);
    const now = new Date();
    return !Number.isNaN(date.getTime()) && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };
  const certificatesThisMonth = journey.certificates.filter((item) => inCurrentMonth(item.issuedAt || item.date || item.createdAt)).length;
  const scansThisMonth = journey.atsResumes.filter((item) => inCurrentMonth(item.createdAt)).length;
  const metrics = [
    { icon: Award, label: "Certificates completed", value: String(journey.certificates.length).padStart(2, "0"), note: certificatesThisMonth ? `+${certificatesThisMonth} this month` : "Verified total", tone: "blue" },
    { icon: BookOpenCheck, label: "Active learning paths", value: String(journey.learningPaths.length).padStart(2, "0"), note: journey.learningPaths.length ? `${journey.learningPaths.length} in progress` : "Ready to begin", tone: "teal" },
    { icon: FileSearch, label: "ATS scans completed", value: String(journey.atsResumes.length).padStart(2, "0"), note: scansThisMonth ? `+${scansThisMonth} this month` : "Career total", tone: "navy" },
    { icon: Compass, label: "Career readiness score", value: journey.readinessScore == null ? "—" : `${journey.readinessScore}%`, note: journey.readinessLabel || "GPS assessment pending", tone: "violet" },
  ];
  const events = [
    ...(journey.memberSince ? [{ title: "Joined CareerSense", date: journey.memberSince }] : []),
    ...journey.events,
  ].filter((event) => event.date).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-5);
  const mrzName = journey.ownerName.toUpperCase().replace(/[^A-Z0-9]+/g, "<");
  return (
    <div className="passport-spread">
      <article className="passport-page passport-profile-page">
        <SecurityLayer code={journey.documentCode} page={1} />
        <div className="passport-holder-header">
          <div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>Skill Passport</small></div>
          <span className="passport-holder-perforation">CSP01</span>
        </div>
        <div className="passport-holder-frame">
          <p className="passport-kicker">Passport holder</p>
          <div className="passport-holder-body">
            <div className="passport-holder-photo">
              {journey.avatar ? <img src={journey.avatar} alt={`${journey.ownerName} passport portrait`} /> : <span>{journey.initials}</span>}
              <div className={`passport-holder-signature ${journey.ownerName.length > 26 ? "signature-very-long" : journey.ownerName.length > 18 ? "signature-long" : ""}`}>{journey.ownerName}</div>
              <small>Holder signature</small>
            </div>
            <dl className="passport-holder-fields">
              <div><dt>Full name</dt><dd>{journey.ownerName}</dd></div>
              <div><dt>Passport ID</dt><dd>{journey.passportNumber}</dd></div>
              <div><dt>Member since</dt><dd>{dateLabel(journey.memberSince)}</dd></div>
              <div><dt>Nationality</dt><dd>{journey.nationality}</dd></div>
              <div className="passport-level-field"><dt>Explorer level</dt><dd><Award />{journey.explorerLevel}</dd></div>
            </dl>
          </div>
          <InkStamp type="verified" className="passport-holder-stamp" />
          <div className="passport-holder-mrz">
            <span>{`${journey.passportNumber.replace(/-/g, "")}<<${mrzName}<<<<<<<<<<<<`}</span>
            <span>{`CAREERSENSE<<SKILL<PASSPORT<<<<<<<<<<<<01`}</span>
          </div>
        </div>
        <PageFolio code={journey.documentCode} page={1} />
      </article>
      <article className="passport-page passport-overview-page">
        <SecurityLayer code={journey.documentCode} page={2} />
        <img className="passport-overview-compass" src={CompassWatermark} alt="" aria-hidden="true" />
        <div className="passport-overview-heading"><h2>My journey</h2><p>Your growth. Your story. Your future.</p></div>
        <div className="passport-overview-panel">
          <p className="passport-kicker">Passport overview</p>
          <div className="passport-overview-metrics">
            {metrics.map(({ icon: Icon, label, value, note, tone }, metricIndex) => (
              <div className={`passport-overview-metric metric-${tone}`} key={label}>
                <span className="passport-overview-icon"><Icon size={24} /></span>
                <div><small>{label}</small><strong>{value}</strong></div>
                <em>{note}</em>
                {metricIndex === 3 && journey.readinessScore >= 75 && <InkStamp type="performer" className="passport-overview-stamp" />}
              </div>
            ))}
          </div>
        </div>
        <p className="passport-kicker passport-overview-timeline-title">Journey timeline</p>
        <div className="passport-overview-timeline">
          {events.length ? events.map((event, index) => (
            <div key={`${event.title}-${index}`} className={`timeline-stop stop-${index}`}>
              <span>{index >= 2 ? <Sparkles size={11} /> : <Check size={12} />}</span>
              <small>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}</small>
              <b>{event.title}</b>
            </div>
          )) : (
            <div className="timeline-stop">
              <span><Sparkles size={12} /></span>
              <small>Today</small>
              <b>Your first stamp awaits</b>
            </div>
          )}
        </div>
        <span className="passport-overview-code">CSP01</span>
        <PageFolio code={journey.documentCode} page={2} />
      </article>
    </div>
  );
}

// ── SPREAD 2: Resume Builder ───────────────────────────────────────────────────────
function ResumeBuilderSpread({ journey }) {
  const builderResumes = journey.builderResumes || [];
  const builderUploads = journey.builderUploads || [];
  const builderJds = journey.builderJds || [];
  const latestResume = builderResumes[0];
  const pageLeft = 3;
  const pageRight = 4;
  const now = new Date();
  const ticketDate = {
    day: String(now.getDate()).padStart(2, "0"),
    month: now.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: now.getFullYear(),
  };

  return (
    <div className="passport-spread" data-document={journey.documentCode}>
      <article className="passport-page passport-achievement-page">
        <SecurityLayer code={journey.documentCode} page={pageLeft} />
        <header className="passport-achievement-header">
          <div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>Resume Studio</small></div>
          <span className="passport-certificate-perforation">RES01</span>
        </header>
        <div className="passport-certificate-frame">
          <p className="passport-kicker">Resume Dossier</p>
          <div className="passport-certificate-card">
            <span className="passport-completed-status">{builderResumes.length > 0 ? "Synchronized" : "Ready"} <Check size={12} /></span>
            <div className="passport-cert-heading">
              <span className="passport-hex" style={{ background: "oklch(42% .14 285)" }}><FileText size={30} /></span>
              <div>
                <h3>{latestResume ? (latestResume.title || latestResume.role || "Tailored Master Resume") : "AI Resume Studio"}</h3>
                <p>{latestResume ? `Targeting ${latestResume.targetRole || journey.targetRole || "Professional Opportunities"}` : "AI-driven structural formatting, section polish, and ATS styling"}</p>
              </div>
            </div>
            <dl className="passport-details">
              <div><dt>Crafted for</dt><dd className="passport-signature">{journey.ownerName}</dd></div>
              <div><dt>Resumes created</dt><dd className="passport-score">{String(builderResumes.length).padStart(2, "0")}</dd></div>
              <div><dt>Source assets</dt><dd>{String(builderUploads.length + builderJds.length).padStart(2, "0")} files</dd></div>
              <div><dt>Registry Code</dt><dd>{journey.documentCode}-RESUME</dd></div>
            </dl>
            <InkStamp type="verified" className="passport-verified-seal" />
          </div>
          <div className="passport-achievement-copy">
            <b>Resume Builder Milestones</b>
            <p>Comprehensive career experience compilation, structured with AI precision, ATS-friendly typography, and tailored skill alignment.</p>
          </div>
          <div className="passport-boarding-pass">
            <span className="passport-ticket-plane"><FileText size={26} /></span>
            <span className="passport-ticket-copy">
              <b>AI Resume Studio<br />Workspace Synchronized</b>
              <small>Formatted for global recruiter and ATS standards.</small>
              <em>CareerSense · Resume Studio</em>
            </span>
            <strong><b>{ticketDate.day}</b><small>{ticketDate.month}<br />{ticketDate.year}</small></strong>
          </div>
          <img className="passport-mountains" src={MountainFooter} alt="" aria-hidden="true" />
        </div>
        <div className="passport-certificate-folio"><span>{journey.documentCode}RES</span><b>{String(pageLeft).padStart(2, "0")}</b></div>
      </article>

      <article className="passport-page passport-certificate-overview-page">
        <SecurityLayer code={journey.documentCode} page={pageRight} />
        <div className="passport-destination-heading">
          <p className="passport-kicker">Resume Portfolio</p>
          <p>Your professional history. Tailored for impact.</p>
        </div>
        <div className="passport-destination-content">
          <span className="passport-destination-air-stamp"><FileText /><small>CareerSense</small></span>
          <p className="passport-kicker passport-destination-label">Crafted documents</p>
          <h2>Resume Builder Hub</h2>
          <p className="passport-destination-subtitle">Dynamic resume repository and AI tailoring logs.</p>
          <div className="passport-destination-stats">
            <div><small>Saved Resumes</small><strong>{String(builderResumes.length).padStart(2, "0")}</strong></div>
            <div><small>Source Assets</small><strong>{String(builderUploads.length + builderJds.length).padStart(2, "0")}</strong></div>
            <div><small>Format</small><strong>ATS Standard</strong></div>
          </div>

          <div className="passport-journey-summary" style={{ marginTop: "14px" }}>
            {builderResumes.slice(0, 3).map((r, i) => (
              <div key={i} className="passport-summary-row">
                <span className="passport-summary-icon tone-2"><FileText size={18} /></span>
                <div>
                  <small>{r.targetRole || r.role || "Crafted Resume"}</small>
                  <strong>{r.title || `Resume Version ${i + 1}`}</strong>
                  <em>Updated {dateLabel(r.updatedAt || r.createdAt)}</em>
                </div>
                <span className="passport-stamp passport-stamp-teal">Tailored</span>
              </div>
            ))}
            {builderResumes.length === 0 && (
              <div className="passport-summary-row">
                <span className="passport-summary-icon tone-2"><FileText size={18} /></span>
                <div>
                  <small>Resume Studio</small>
                  <strong>No resumes saved yet</strong>
                  <em>Create your first resume to record this stamp</em>
                </div>
              </div>
            )}
          </div>

          <blockquote>“Your resume is your professional passport — structured for clarity, impact, and opportunity.”</blockquote>
          <div className="passport-destination-stamps" aria-label="Achievement stamps">
            <span className="destination-round-stamp stamp-blue"><FileText /><b>Polished</b><small>Resume AI</small></span>
            <span className="destination-box-stamp"><b>Tailored</b><small>ATS Ready</small></span>
            <span className="destination-round-stamp stamp-violet"><Sparkles /><b>Pro Quality</b><small>CareerSense</small></span>
          </div>
        </div>
        <div className="passport-certificate-folio passport-destination-folio"><span>{journey.documentCode}RES</span><b>{String(pageRight).padStart(2, "0")}</b></div>
      </article>
    </div>
  );
}

// ── SPREAD 3: ATS Checker ──────────────────────────────────────────────────────────
function AtsCheckerSpread({ journey }) {
  const atsResumes = journey.atsResumes || [];
  const latestAts = atsResumes[0];
  const pageLeft = 5;
  const pageRight = 6;
  const avgScore = atsResumes.length
    ? Math.round(atsResumes.reduce((sum, r) => sum + (r.current_score || 0), 0) / atsResumes.length)
    : 0;
  const now = new Date();
  const ticketDate = {
    day: String(now.getDate()).padStart(2, "0"),
    month: now.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: now.getFullYear(),
  };

  return (
    <div className="passport-spread" data-document={journey.documentCode}>
      <article className="passport-page passport-achievement-page">
        <SecurityLayer code={journey.documentCode} page={pageLeft} />
        <header className="passport-achievement-header">
          <div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>ATS Scanner</small></div>
          <span className="passport-certificate-perforation">ATS01</span>
        </header>
        <div className="passport-certificate-frame">
          <p className="passport-kicker">ATS Diagnostic Record</p>
          <div className="passport-certificate-card">
            <span className="passport-completed-status">{atsResumes.length > 0 ? "Audited" : "Ready"} <Check size={12} /></span>
            <div className="passport-cert-heading">
              <span className="passport-hex" style={{ background: "oklch(46% .16 230)" }}><FileSearch size={30} /></span>
              <div>
                <h3>{latestAts ? (latestAts.file_name ? latestAts.file_name.replace(/\.[^/.]+$/, "") : "ATS Match Analysis") : "ATS Optimization Studio"}</h3>
                <p>{latestAts ? `Overall benchmark score: ${latestAts.current_score || 0}% match rate` : "AI resume keyword audit and parser compatibility check"}</p>
              </div>
            </div>
            <dl className="passport-details">
              <div><dt>Applicant</dt><dd className="passport-signature">{journey.ownerName}</dd></div>
              <div><dt>Latest ATS Score</dt><dd className="passport-score">{latestAts ? `${latestAts.current_score}%` : "—"}</dd></div>
              <div><dt>Scans Logged</dt><dd>{String(atsResumes.length).padStart(2, "0")}</dd></div>
              <div><dt>Diagnostic ID</dt><dd>{latestAts?.resume_id ? String(latestAts.resume_id).slice(-8).toUpperCase() : `${journey.documentCode}-ATS`}</dd></div>
            </dl>
            <InkStamp type="performer" className="passport-verified-seal" />
          </div>
          <div className="passport-achievement-copy">
            <b>ATS Parser Validation</b>
            <p>Comprehensive applicant tracking system audit covering format readability, essential keyword frequency, and JD alignment.</p>
          </div>
          <div className="passport-boarding-pass">
            <span className="passport-ticket-plane"><FileSearch size={26} /></span>
            <span className="passport-ticket-copy">
              <b>ATS Scanner Core<br />Keyword Validated</b>
              <small>Optimized for modern applicant tracking systems.</small>
              <em>CareerSense · ATS Core</em>
            </span>
            <strong><b>{ticketDate.day}</b><small>{ticketDate.month}<br />{ticketDate.year}</small></strong>
          </div>
          <img className="passport-mountains" src={MountainFooter} alt="" aria-hidden="true" />
        </div>
        <div className="passport-certificate-folio"><span>{journey.documentCode}ATS</span><b>{String(pageLeft).padStart(2, "0")}</b></div>
      </article>

      <article className="passport-page passport-certificate-overview-page">
        <SecurityLayer code={journey.documentCode} page={pageRight} />
        <div className="passport-destination-heading">
          <p className="passport-kicker">ATS Match Journey</p>
          <p>Keyword precision. Recruiter pass-rate confidence.</p>
        </div>
        <div className="passport-destination-content">
          <span className="passport-destination-air-stamp"><FileSearch /><small>CareerSense</small></span>
          <p className="passport-kicker passport-destination-label">Audit results</p>
          <h2>ATS Checker Hub</h2>
          <p className="passport-destination-subtitle">Verified scanner evaluations and keyword coverage records.</p>
          <div className="passport-destination-stats">
            <div><small>Average Score</small><strong>{atsResumes.length ? `${avgScore}%` : "N/A"}</strong></div>
            <div><small>Scans Logged</small><strong>{String(atsResumes.length).padStart(2, "0")}</strong></div>
            <div><small>Readiness</small><strong>{avgScore >= 75 ? "High Match" : avgScore >= 50 ? "Solid Match" : "Ready"}</strong></div>
          </div>

          <div className="passport-journey-summary" style={{ marginTop: "14px" }}>
            {atsResumes.slice(0, 3).map((scan, i) => (
              <div key={i} className="passport-summary-row">
                <span className="passport-summary-icon tone-1"><FileSearch size={18} /></span>
                <div>
                  <small>ATS Scan Result</small>
                  <strong>{scan.file_name ? scan.file_name.replace(/\.[^/.]+$/, "") : `Scan #${i + 1}`}</strong>
                  <em>Score: {scan.current_score}% · {dateLabel(scan.createdAt)}</em>
                </div>
                <span className="passport-stamp passport-stamp-blue">{scan.current_score >= 75 ? "Passed" : "Audited"}</span>
              </div>
            ))}
            {atsResumes.length === 0 && (
              <div className="passport-summary-row">
                <span className="passport-summary-icon tone-1"><FileSearch size={18} /></span>
                <div>
                  <small>ATS Scanner</small>
                  <strong>No scans recorded yet</strong>
                  <em>Scan a resume to record your first ATS audit</em>
                </div>
              </div>
            )}
          </div>

          <blockquote>“Targeted keyword alignment bridges the gap between your resume and the hiring manager’s desk.”</blockquote>
          <div className="passport-destination-stamps" aria-label="Achievement stamps">
            <span className="destination-round-stamp stamp-blue"><FileSearch /><b>ATS Scanned</b><small>Verified</small></span>
            <span className="destination-box-stamp"><b>Parser Ready</b><small>Keywords 100%</small></span>
            <span className="destination-round-stamp stamp-teal"><Check /><b>Callback Ready</b><small>CareerSense</small></span>
          </div>
        </div>
        <div className="passport-certificate-folio passport-destination-folio"><span>{journey.documentCode}ATS</span><b>{String(pageRight).padStart(2, "0")}</b></div>
      </article>
    </div>
  );
}

// ── SPREAD 4: Cover Letter Builder ─────────────────────────────────────────────────
function CoverLetterSpread({ journey }) {
  const coverLetters = journey.coverLetters || [];
  const latestLetter = coverLetters[0];
  const pageLeft = 7;
  const pageRight = 8;
  const targetedCompaniesCount = new Set(coverLetters.map(l => l.companyName || l.company).filter(Boolean)).size || (coverLetters.length ? 1 : 0);
  const now = new Date();
  const ticketDate = {
    day: String(now.getDate()).padStart(2, "0"),
    month: now.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: now.getFullYear(),
  };

  return (
    <div className="passport-spread" data-document={journey.documentCode}>
      <article className="passport-page passport-achievement-page">
        <SecurityLayer code={journey.documentCode} page={pageLeft} />
        <header className="passport-achievement-header">
          <div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>Cover Letter</small></div>
          <span className="passport-certificate-perforation">LET01</span>
        </header>
        <div className="passport-certificate-frame">
          <p className="passport-kicker">Application Letter Dossier</p>
          <div className="passport-certificate-card">
            <span className="passport-completed-status">{coverLetters.length > 0 ? "Tailored" : "Ready"} <Check size={12} /></span>
            <div className="passport-cert-heading">
              <span className="passport-hex" style={{ background: "oklch(48% .14 35)" }}><BookOpenCheck size={30} /></span>
              <div>
                <h3>{latestLetter ? (latestLetter.recipient?.targetRole || latestLetter.title || "Custom Cover Letter") : "Cover Letter Studio"}</h3>
                <p>{latestLetter ? `Target Organization: ${latestLetter.companyName || latestLetter.company || "Target Organization"}` : "AI-driven personalized narrative tailored to employer requirements"}</p>
              </div>
            </div>
            <dl className="passport-details">
              <div><dt>Author</dt><dd className="passport-signature">{journey.ownerName}</dd></div>
              <div><dt>Target Role</dt><dd>{latestLetter ? (latestLetter.recipient?.targetRole || latestLetter.title || "Applied Role") : "Career Target"}</dd></div>
              <div><dt>Letters Crafted</dt><dd className="passport-score">{String(coverLetters.length).padStart(2, "0")}</dd></div>
              <div><dt>Document Code</dt><dd>{journey.documentCode}-LETTER</dd></div>
            </dl>
            <InkStamp type="verified" className="passport-verified-seal" />
          </div>
          <div className="passport-achievement-copy">
            <b>Tailored Application Pitches</b>
            <p>Custom narrative crafted for company culture and requirements, highlighting key achievements and authentic motivation.</p>
          </div>
          <div className="passport-boarding-pass">
            <span className="passport-ticket-plane"><BookOpenCheck size={26} /></span>
            <span className="passport-ticket-copy">
              <b>Cover Letter Builder<br />Pitch Validated</b>
              <small>High impact introduction for hiring leaders.</small>
              <em>CareerSense · Cover Letter</em>
            </span>
            <strong><b>{ticketDate.day}</b><small>{ticketDate.month}<br />{ticketDate.year}</small></strong>
          </div>
          <img className="passport-mountains" src={MountainFooter} alt="" aria-hidden="true" />
        </div>
        <div className="passport-certificate-folio"><span>{journey.documentCode}LET</span><b>{String(pageLeft).padStart(2, "0")}</b></div>
      </article>

      <article className="passport-page passport-certificate-overview-page">
        <SecurityLayer code={journey.documentCode} page={pageRight} />
        <div className="passport-destination-heading">
          <p className="passport-kicker">Outreach Journey</p>
          <p>Targeted outreach. Compelling career storytelling.</p>
        </div>
        <div className="passport-destination-content">
          <span className="passport-destination-air-stamp"><BookOpenCheck /><small>CareerSense</small></span>
          <p className="passport-kicker passport-destination-label">Company applications</p>
          <h2>Cover Letter Portfolio</h2>
          <p className="passport-destination-subtitle">Verified application letters and employer-specific pitches.</p>
          <div className="passport-destination-stats">
            <div><small>Letters Prepared</small><strong>{String(coverLetters.length).padStart(2, "0")}</strong></div>
            <div><small>Target Companies</small><strong>{String(targetedCompaniesCount).padStart(2, "0")}</strong></div>
            <div><small>Tone Standard</small><strong>Executive Pro</strong></div>
          </div>

          <div className="passport-journey-summary" style={{ marginTop: "14px" }}>
            {coverLetters.slice(0, 3).map((doc, i) => (
              <div key={i} className="passport-summary-row">
                <span className="passport-summary-icon tone-3"><BookOpenCheck size={18} /></span>
                <div>
                  <small>{doc.companyName || doc.company || "Target Company"}</small>
                  <strong>{doc.recipient?.targetRole || doc.title || "Application Letter"}</strong>
                  <em>Generated {dateLabel(doc.createdAt)}</em>
                </div>
                <span className="passport-stamp passport-stamp-teal">Tailored</span>
              </div>
            ))}
            {coverLetters.length === 0 && (
              <div className="passport-summary-row">
                <span className="passport-summary-icon tone-3"><BookOpenCheck size={18} /></span>
                <div>
                  <small>Cover Letter Builder</small>
                  <strong>No letters prepared yet</strong>
                  <em>Draft a cover letter to record your first application</em>
                </div>
              </div>
            )}
          </div>

          <blockquote>“A tailored cover letter turns your credentials into a compelling story that demands an interview.”</blockquote>
          <div className="passport-destination-stamps" aria-label="Achievement stamps">
            <span className="destination-round-stamp stamp-blue"><BookOpenCheck /><b>Persuasive</b><small>Letter AI</small></span>
            <span className="destination-box-stamp"><b>Tailored</b><small>Company Match</small></span>
            <span className="destination-round-stamp stamp-violet"><Sparkles /><b>Stand Out</b><small>CareerSense</small></span>
          </div>
        </div>
        <div className="passport-certificate-folio passport-destination-folio"><span>{journey.documentCode}LET</span><b>{String(pageRight).padStart(2, "0")}</b></div>
      </article>
    </div>
  );
}

// ── SPREAD 5: Certifi Platform ─────────────────────────────────────────────────────
function CertifiPlatformSpread({ journey }) {
  const certificates = journey.certificates || [];
  const learningPaths = journey.learningPaths || [];
  const badges = journey.badges || [];
  const latestCert = certificates[0];
  const pageLeft = 9;
  const pageRight = 10;
  const now = new Date();
  const ticketDate = {
    day: String(now.getDate()).padStart(2, "0"),
    month: now.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: now.getFullYear(),
  };

  return (
    <div className="passport-spread" data-document={journey.documentCode}>
      <article className="passport-page passport-achievement-page">
        <SecurityLayer code={journey.documentCode} page={pageLeft} />
        <header className="passport-achievement-header">
          <div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>Certifi Platform</small></div>
          <span className="passport-certificate-perforation">CRT01</span>
        </header>
        <div className="passport-certificate-frame">
          <p className="passport-kicker">Skill Verification Dossier</p>
          <div className="passport-certificate-card">
            <span className="passport-completed-status">{certificates.length > 0 ? "Certified" : "Enrolled"} <Check size={12} /></span>
            <div className="passport-cert-heading">
              <span className="passport-hex" style={{ background: "oklch(50% .15 170)" }}><Award size={30} /></span>
              <div>
                <h3>{latestCert ? (latestCert.title || latestCert.name || "Verified Skill Credentials") : "Certifi Skill Hub"}</h3>
                <p>{latestCert ? `Credential ID: ${latestCert.certificateId || latestCert.id || "CS-CERT"}` : "AI-evaluated competency tests and verified certifications"}</p>
              </div>
            </div>
            <dl className="passport-details">
              <div><dt>Credential Holder</dt><dd className="passport-signature">{journey.ownerName}</dd></div>
              <div><dt>Verified Certs</dt><dd className="passport-score">{String(certificates.length).padStart(2, "0")}</dd></div>
              <div><dt>Skill Badges</dt><dd>{String(badges.length).padStart(2, "0")}</dd></div>
              <div><dt>Active Tracks</dt><dd>{String(learningPaths.length).padStart(2, "0")}</dd></div>
            </dl>
            <InkStamp type="verified" className="passport-verified-seal" />
          </div>
          <div className="passport-achievement-copy">
            <b>Certifi Verification Standards</b>
            <p>All certifications and badges reflect rigorous assessment criteria benchmarked against real-world industry requirements.</p>
          </div>
          <div className="passport-boarding-pass">
            <span className="passport-ticket-plane"><Award size={26} /></span>
            <span className="passport-ticket-copy">
              <b>Certifi Skill Platform<br />Credentials Issued</b>
              <small>Cryptographically verifiable proof of skill competency.</small>
              <em>CareerSense · Certifi</em>
            </span>
            <strong><b>{ticketDate.day}</b><small>{ticketDate.month}<br />{ticketDate.year}</small></strong>
          </div>
          <img className="passport-mountains" src={MountainFooter} alt="" aria-hidden="true" />
        </div>
        <div className="passport-certificate-folio"><span>{journey.documentCode}CRT</span><b>{String(pageLeft).padStart(2, "0")}</b></div>
      </article>

      <article className="passport-page passport-certificate-overview-page">
        <SecurityLayer code={journey.documentCode} page={pageRight} />
        <div className="passport-destination-heading">
          <p className="passport-kicker">Skill Pathways</p>
          <p>Continuous mastery. Lifelong learning milestones.</p>
        </div>
        <div className="passport-destination-content">
          <span className="passport-destination-air-stamp"><Award /><small>CareerSense</small></span>
          <p className="passport-kicker passport-destination-label">Verified competency</p>
          <h2>Certifi Platform Hub</h2>
          <p className="passport-destination-subtitle">Tracked milestones, verified credentials, and active skill tracks.</p>
          <div className="passport-destination-stats">
            <div><small>Certificates</small><strong>{String(certificates.length).padStart(2, "0")}</strong></div>
            <div><small>Skill Badges</small><strong>{String(badges.length).padStart(2, "0")}</strong></div>
            <div><small>Active Tracks</small><strong>{String(learningPaths.length).padStart(2, "0")}</strong></div>
          </div>

          <div className="passport-journey-summary" style={{ marginTop: "14px" }}>
            {(badges.length ? badges : learningPaths.length ? learningPaths : certificates).slice(0, 3).map((item, i) => (
              <div key={i} className="passport-summary-row">
                <span className="passport-summary-icon tone-1"><Award size={18} /></span>
                <div>
                  <small>{item.skill || item.category || "Verified Track"}</small>
                  <strong>{item.label || item.title || item.name || `Skill Milestone #${i + 1}`}</strong>
                  <em>{item.date ? `Earned ${dateLabel(item.date)}` : item.progress ? `${item.progress}% Completed` : "Verified Competency"}</em>
                </div>
                <span className="passport-stamp passport-stamp-blue">Verified</span>
              </div>
            ))}
            {(!badges.length && !learningPaths.length && !certificates.length) && (
              <div className="passport-summary-row">
                <span className="passport-summary-icon tone-1"><Award size={18} /></span>
                <div>
                  <small>Certifi Assessment</small>
                  <strong>Ready for skill checks</strong>
                  <em>Enroll in a skill track to earn verified badges</em>
                </div>
              </div>
            )}
          </div>

          <blockquote>“Learning is a journey of discovery that opens doors to every career milestone.”</blockquote>
          <div className="passport-destination-stamps" aria-label="Achievement stamps">
            <span className="destination-round-stamp stamp-blue"><Award /><b>Certified</b><small>Certifi AI</small></span>
            <span className="destination-box-stamp"><b>Skills Validated</b><small>100% Score</small></span>
            <span className="destination-round-stamp stamp-teal"><Check /><b>Mastery</b><small>CareerSense</small></span>
          </div>
        </div>
        <div className="passport-certificate-folio passport-destination-folio"><span>{journey.documentCode}CRT</span><b>{String(pageRight).padStart(2, "0")}</b></div>
      </article>
    </div>
  );
}

// ── SPREAD 6+: Individual Certificate Spreads ──────────────────────────────────────
function CertificateSpread({ certificate, journey, index, total }) {
  const title = certificate.title || certificate.name || "CareerSense Skill Certification";
  const rawScore = certificate.score ?? certificate.percentage ?? certificate.result?.score;
  const score = rawScore == null ? null : String(rawScore).replace(/%/g, "");
  const numericScore = score == null ? null : Number(score);
  const impact = numericScore == null || Number.isNaN(numericScore) ? "Verified" : numericScore >= 80 ? "High" : numericScore >= 60 ? "Strong" : "Developing";
  const issuedAt = certificate.issuedAt || certificate.date || certificate.createdAt;
  const issuedDate = issuedAt ? new Date(issuedAt) : new Date();
  const ticketDate = Number.isNaN(issuedDate.getTime()) ? { day: "--", month: "---", year: "----" } : {
    day: String(issuedDate.getDate()).padStart(2, "0"),
    month: issuedDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: issuedDate.getFullYear(),
  };
  const verificationId = certificate.certificateId || certificate.id || `CS-${new Date().getFullYear()}-${String(index + 1).padStart(4, "0")}`;
  const documentNumber = String(verificationId).toUpperCase().replace(/[^A-Z0-9]/g, "");
  // Starts after Spread 5 (Pages 1-10)
  const achievementPage = 11 + index * 2;
  const journeyPage = achievementPage + 1;

  return (
    <div className="passport-spread" data-document={journey.documentCode}>
      <article className="passport-page passport-achievement-page">
        <SecurityLayer code={journey.documentCode} page={achievementPage} />
        <header className="passport-achievement-header">
          <div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>Skill Passport</small></div>
          <span className="passport-certificate-perforation">V{String(index + 1).padStart(2, "0")}</span>
        </header>
        <div className="passport-certificate-frame">
          <p className="passport-kicker">Achievement passport</p>
          <div className="passport-certificate-card">
            <span className="passport-completed-status">Completed <Check size={12} /></span>
            <div className="passport-cert-heading">
              <span className="passport-hex"><Database size={31} /></span>
              <div><h3>{title}</h3><p>{certificate.subtitle || certificate.description || "Verified professional skill credential"}</p></div>
            </div>
            <dl className="passport-details">
              <div><dt>Issued to</dt><dd className="passport-signature">{journey.ownerName}</dd></div>
              <div><dt>Completed on</dt><dd>{dateLabel(issuedAt)}</dd></div>
              <div><dt>Score</dt><dd className="passport-score">{score == null ? "—" : `${score}%`}</dd></div>
              <div><dt>Verification ID</dt><dd>{verificationId}</dd></div>
            </dl>
            <InkStamp type="verified" className="passport-verified-seal" />
          </div>
          <div className="passport-achievement-copy">
            <b>Achievement details</b>
            <p>{certificate.description || `Demonstrated strong understanding of ${title} concepts and practical application, recorded as part of the CareerSense lifelong skill journey.`}</p>
          </div>
          <div className="passport-boarding-pass">
            <span className="passport-ticket-plane"><Plane size={30} /></span>
            <span className="passport-ticket-copy">
              <b>Skill journey<br />milestone unlocked</b>
              <small>Keep building. The world is your runway.</small>
              <em>CareerSense · Skill Passport</em>
            </span>
            <strong><b>{ticketDate.day}</b><small>{ticketDate.month}<br />{ticketDate.year}</small></strong>
          </div>
          <img className="passport-mountains" src={MountainFooter} alt="" aria-hidden="true" />
        </div>
        <div className="passport-certificate-folio"><span>{documentNumber}</span><b>{String(achievementPage).padStart(2, "0")}</b></div>
      </article>

      <article className="passport-page passport-certificate-overview-page">
        <SecurityLayer code={journey.documentCode} page={journeyPage} />
        <div className="passport-destination-heading">
          <p className="passport-kicker">My journey</p>
          <p>Your growth. Your story. Your future.</p>
        </div>
        <div className="passport-destination-content">
          <span className="passport-destination-air-stamp"><Plane /><small>CareerSense</small></span>
          <p className="passport-kicker passport-destination-label">Destination unlocked</p>
          <h2>{title}</h2>
          <p className="passport-destination-subtitle">New skill territory conquered.</p>
          <div className="passport-destination-stats">
            <div><small>Certificate</small><strong>{String(index + 1).padStart(2, "0")} <em>of {String(total).padStart(2, "0")}</em></strong></div>
            <div><small>Status</small><strong>Completed</strong></div>
            <div><small>Impact</small><strong>{impact}</strong></div>
          </div>
          <blockquote>“Every skill is a new country on the map of your career.”</blockquote>
          <div className="passport-destination-stamps" aria-label="Achievement stamps">
            <span className="destination-round-stamp stamp-blue"><Plane /><b>Determination</b><small>Discipline</small></span>
            <span className="destination-box-stamp"><b>Great work</b><small>Keep exploring</small></span>
            <span className="destination-round-stamp stamp-violet"><Sparkles /><b>Future ready</b><small>CareerSense</small></span>
          </div>
        </div>
        <div className="passport-certificate-folio passport-destination-folio"><span>{documentNumber}</span><b>{String(journeyPage).padStart(2, "0")}</b></div>
      </article>
    </div>
  );
}

// ── FINAL SPREAD: Progress & Career GPS Summary ────────────────────────────────────
function ProgressSpread({ journey }) {
  // Starts after Spread 5 + all certificates
  const roadmapPage = 11 + (journey.certificates?.length || 0) * 2;
  const activityPage = roadmapPage + 1;
  const skillPoints = journey.usageLedger.reduce((sum, entry) => sum + Number(entry.careerPoints || entry.points || 0), 0);
  const activityRows = [
    { icon: UserRound, label: "Profile completed", value: `${journey.profileCompleteness}%` },
    { icon: FileSearch, label: "ATS scans", value: journey.atsResumes.length },
    { icon: FileText, label: "Cover letters", value: journey.coverLetters.length },
    { icon: Award, label: "Verified certificates", value: journey.certificates.length },
    { icon: BookOpenCheck, label: "Learning paths", value: journey.learningPaths.length },
    { icon: Target, label: "Partner missions", value: `${journey.partnerCompleted}/20` },
    { icon: Sparkles, label: "Skills recorded", value: journey.skills.length },
    { icon: MessageSquareText, label: "Awards & education", value: journey.awards.length + journey.education.length },
    { icon: TrendingUp, label: "Skill points earned", value: skillPoints.toLocaleString() },
    { icon: Compass, label: "Target role", value: journey.targetRole || "Exploring" },
  ];

  return (
    <div className="passport-spread">
      <article className="passport-page passport-roadmap-page">
        <SecurityLayer code={journey.documentCode} page={roadmapPage} />
        <SectionHeader label="Career GPS" page={roadmapPage} />
        <img className="passport-section-watermark passport-roadmap-watermark" src={CompassWatermark} alt="" aria-hidden="true" />
        <p className="passport-kicker">Career roadmap</p><h2>Your five-phase route</h2>
        <p className="passport-lede">A live roadmap from your Career GPS assessment and activity across CareerSense.</p>
        <div className="passport-roadmap-list">
          {journey.gpsPhases.map((phase) => (
            <div key={phase.id} className={phase.completed ? "complete" : phase.score > 0 ? "active" : "pending"}>
              <span>{phase.phase}</span>
              <div><b>{phase.label}</b><small>{phase.tip}</small><i><em style={{ width: `${phase.score}%` }} /></i></div>
              <strong>{phase.score}%</strong>
            </div>
          ))}
        </div>
        <InkStamp type="roadmap" className="passport-roadmap-stamp" />
        <PageFolio code={journey.documentCode} page={roadmapPage} />
      </article>

      <article className="passport-page passport-activity-page">
        <SecurityLayer code={journey.documentCode} page={activityPage} />
        <SectionHeader label="Journey Record" page={activityPage} />
        <img className="passport-section-watermark passport-map-watermark" src={WorldMapWatermark} alt="" aria-hidden="true" />
        <p className="passport-kicker">Dashboard record</p><h2>CareerSense activity</h2>
        <p className="passport-lede">A consolidated record of progress captured from your complete dashboard.</p>
        <div className="passport-activity-grid">
          {activityRows.map(({ icon: Icon, label, value }) => (
            <div key={label}><Icon /><span><small>{label}</small><b>{value}</b></span></div>
          ))}
        </div>
        <div className="passport-readiness-band">
          <Target />
          <span><small>Career readiness</small><b>{journey.readinessScore == null ? "Assessment pending" : `${journey.readinessScore}% · ${journey.readinessLabel || "Roadmap active"}`}</b></span>
        </div>
        <InkStamp type="journey" className="passport-activity-stamp" />
        <PageFolio code={journey.documentCode} page={activityPage} />
      </article>
    </div>
  );
}

// ── ROOT PASSPORT BOOKLET ──────────────────────────────────────────────────────────
export default function PassportBooklet({ journey, spreadIndex, onPrevious, onNext, onClose }) {
  const spreads = [
    <OverviewSpread key="overview" journey={journey} />,
    <ResumeBuilderSpread key="resume-builder" journey={journey} />,
    <AtsCheckerSpread key="ats-checker" journey={journey} />,
    <CoverLetterSpread key="cover-letter" journey={journey} />,
    <CertifiPlatformSpread key="certifi-platform" journey={journey} />,
    ...(journey.certificates || []).map((certificate, index) => (
      <CertificateSpread
        key={certificate.id || certificate.certificateId || index}
        certificate={certificate}
        journey={journey}
        index={index}
        total={journey.certificates.length}
      />
    )),
    <ProgressSpread key="progress" journey={journey} />,
  ];

  return (
    <section className="passport-reader" aria-label="Open CareerSense Skill Passport">
      <div className="passport-reader-toolbar">
        <button type="button" onClick={onClose}><ChevronLeft size={17} /> Close passport</button>
        <span>Spread {spreadIndex + 1} of {spreads.length}</span>
      </div>
      <div className="passport-book-shell">
        <div className="passport-book-edge" />
        {spreads[spreadIndex]}
      </div>
      <div className="passport-controls">
        <button type="button" onClick={onPrevious} disabled={spreadIndex === 0}>
          <ChevronLeft /> Previous
        </button>
        <div>
          {spreads.map((_, index) => (
            <i key={index} className={index === spreadIndex ? "active" : ""} />
          ))}
        </div>
        <button type="button" onClick={onNext} disabled={spreadIndex === spreads.length - 1}>
          Next page <ChevronRight />
        </button>
      </div>
    </section>
  );
}

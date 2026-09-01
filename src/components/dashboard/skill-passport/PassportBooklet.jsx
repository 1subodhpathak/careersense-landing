import { Award, BookOpenCheck, Check, ChevronLeft, ChevronRight, Compass, Database, FileSearch, FileText, MessageSquareText, Plane, Sparkles, Target, TrendingUp, UserRound } from "lucide-react";
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
  }[type];
  const Icon = stamp.icon;
  return <span className={`passport-ink-stamp stamp-${type} ${className}`} aria-label={`${stamp.top} ${stamp.main} ${stamp.bottom}`}><small>{stamp.top}</small><Icon /><b>{stamp.main}</b><em>{stamp.bottom}</em></span>;
}

function SecurityLayer({ code, page }) {
  return <div className="passport-security" aria-hidden="true"><span className="passport-guilloche" /><span className="passport-fiber fiber-one" /><span className="passport-fiber fiber-two" /><span className="passport-microprint">CAREERSENSE • VERIFIED SKILL JOURNEY • {code} • CAREERSENSE • VERIFIED SKILL JOURNEY •</span><span className="passport-perforation">{code.slice(0, 3)}{String(page).padStart(2, "0")}</span></div>;
}

function PageFolio({ code, page }) {
  return <><div className="passport-machine-code" aria-label={`Document code ${code}`}><span>{`CSP<IND${code}<<<<<<<<<<<<`}</span><span>{`${String(page).padStart(2, "0")}CSJOURNEY<<<<<<<<<<<<<<`}</span></div><span className="passport-page-number">{String(page).padStart(2, "0")}</span></>;
}

function SectionHeader({ label, page }) {
  return <header className="passport-section-header"><div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>{label}</small></div><span className="passport-section-code">P{String(page).padStart(2, "0")}</span></header>;
}

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
  const achievementPage = index * 2 + 3;
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
          <div className="passport-achievement-copy"><b>Achievement details</b><p>{certificate.description || `Demonstrated strong understanding of ${title} concepts and practical application, recorded as part of the CareerSense lifelong skill journey.`}</p></div>
          <div className="passport-boarding-pass">
            <span className="passport-ticket-plane"><Plane size={30} /></span>
            <span className="passport-ticket-copy"><b>Skill journey<br />milestone unlocked</b><small>Keep building. The world is your runway.</small><em>CareerSense · Skill Passport</em></span>
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
        <div className="passport-holder-header"><div className="passport-page-brand"><img src={CSLogo} alt="" /><b>Career<span>Sense</span></b><small>Skill Passport</small></div><span className="passport-holder-perforation">CSP01</span></div>
        <div className="passport-holder-frame">
          <p className="passport-kicker">Passport holder</p>
          <div className="passport-holder-body">
            <div className="passport-holder-photo">
              {journey.avatar ? <img src={journey.avatar} alt={`${journey.ownerName} passport portrait`} /> : <span>{journey.initials}</span>}
              <div className={`passport-holder-signature ${journey.ownerName.length > 26 ? "signature-very-long" : journey.ownerName.length > 18 ? "signature-long" : ""}`}>{journey.ownerName}</div><small>Holder signature</small>
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
          <div className="passport-holder-mrz"><span>{`${journey.passportNumber.replace(/-/g, "")}<<${mrzName}<<<<<<<<<<<<`}</span><span>{`CAREERSENSE<<SKILL<PASSPORT<<<<<<<<<<<<01`}</span></div>
        </div>
        <PageFolio code={journey.documentCode} page={1} />
      </article>
      <article className="passport-page passport-overview-page">
        <SecurityLayer code={journey.documentCode} page={2} />
        <img className="passport-overview-compass" src={CompassWatermark} alt="" aria-hidden="true" />
        <div className="passport-overview-heading"><h2>My journey</h2><p>Your growth. Your story. Your future.</p></div>
        <div className="passport-overview-panel">
          <p className="passport-kicker">Passport overview</p>
          <div className="passport-overview-metrics">{metrics.map(({ icon: Icon, label, value, note, tone }, metricIndex) => <div className={`passport-overview-metric metric-${tone}`} key={label}><span className="passport-overview-icon"><Icon size={24} /></span><div><small>{label}</small><strong>{value}</strong></div><em>{note}</em>{metricIndex === 3 && journey.readinessScore >= 75 && <InkStamp type="performer" className="passport-overview-stamp" />}</div>)}</div>
        </div>
        <p className="passport-kicker passport-overview-timeline-title">Journey timeline</p>
        <div className="passport-overview-timeline">
          {events.length ? events.map((event, index) => <div key={`${event.title}-${index}`} className={`timeline-stop stop-${index}`}><span>{index >= 2 ? <Sparkles size={11} /> : <Check size={12} />}</span><small>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}</small><b>{event.title}</b></div>) : <div className="timeline-stop"><span><Sparkles size={12} /></span><small>Today</small><b>Your first stamp awaits</b></div>}
        </div>
        <span className="passport-overview-code">CSP01</span>
        <PageFolio code={journey.documentCode} page={2} />
      </article>
    </div>
  );
}

function ProgressSpread({ journey }) {
  const roadmapPage = journey.certificates.length * 2 + 3;
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
          {journey.gpsPhases.map((phase) => <div key={phase.id} className={phase.completed ? "complete" : phase.score > 0 ? "active" : "pending"}><span>{phase.phase}</span><div><b>{phase.label}</b><small>{phase.tip}</small><i><em style={{ width: `${phase.score}%` }} /></i></div><strong>{phase.score}%</strong></div>)}
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
        <div className="passport-activity-grid">{activityRows.map(({ icon: Icon, label, value }) => <div key={label}><Icon /><span><small>{label}</small><b>{value}</b></span></div>)}</div>
        <div className="passport-readiness-band"><Target /><span><small>Career readiness</small><b>{journey.readinessScore == null ? "Assessment pending" : `${journey.readinessScore}% · ${journey.readinessLabel || "Roadmap active"}`}</b></span></div>
        <InkStamp type="journey" className="passport-activity-stamp" />
        <PageFolio code={journey.documentCode} page={activityPage} />
      </article>
    </div>
  );
}

export default function PassportBooklet({ journey, spreadIndex, onPrevious, onNext, onClose }) {
  const spreads = [<OverviewSpread key="overview" journey={journey} />, ...journey.certificates.map((certificate, index) => <CertificateSpread key={certificate.id || certificate.certificateId || index} certificate={certificate} journey={journey} index={index} total={journey.certificates.length} />), <ProgressSpread key="progress" journey={journey} />];
  return (
    <section className="passport-reader" aria-label="Open CareerSense Skill Passport">
      <div className="passport-reader-toolbar"><button type="button" onClick={onClose}><ChevronLeft size={17} /> Close passport</button><span>Spread {spreadIndex + 1} of {spreads.length}</span></div>
      <div className="passport-book-shell"><div className="passport-book-edge" />{spreads[spreadIndex]}</div>
      <div className="passport-controls">
        <button type="button" onClick={onPrevious} disabled={spreadIndex === 0}><ChevronLeft /> Previous</button>
        <div>{spreads.map((_, index) => <i key={index} className={index === spreadIndex ? "active" : ""} />)}</div>
        <button type="button" onClick={onNext} disabled={spreadIndex === spreads.length - 1}>Next page <ChevronRight /></button>
      </div>
    </section>
  );
}

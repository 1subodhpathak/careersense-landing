import React, { useState, useEffect, useMemo, useRef } from "react";
import Prism from "prismjs";
import {
  Mail,
  Send,
  Upload,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Eye,
  Trash2,
  Check,
  Search,
  ShieldCheck,
  Smartphone,
  Monitor,
  Loader2,
  Copy,
  Zap,
  Code,
  Folder,
  Plus,
  Save,
  Lock,
  ChevronDown,
  ChevronUp,
  FileCode2,
  Filter
} from "lucide-react";

// Helper to pre-render production-grade responsive HTML for the 7 system templates
function buildDefaultHtmlTemplate({ title, headline, body, ctaText, ctaUrl }) {
  const formattedBody = body
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #0f172a; font-weight: 700;">$1</strong>')
    .replace(/\n/g, "<br>\n      ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 24px 16px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; font-size: 15px; line-height: 1.65;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- CareerSense Brand Bar -->
    <div style="margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #0d9488;">
      <a href="https://careersenseai.com" target="_blank" style="text-decoration: none; color: #0b132b; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">
        Career<span style="color: #0d9488;">Sense</span>
      </a>
      <span style="font-size: 11px; color: #64748b; margin-left: 8px;">• AI Career Intelligence</span>
    </div>

    ${headline ? `<h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; line-height: 1.4;">${headline}</h2>` : ""}

    <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155;">
      Hi {{name}},
    </p>

    <div style="font-size: 15px; color: #334155; line-height: 1.65; margin-bottom: 24px;">
      ${formattedBody}
    </div>

    ${ctaText && ctaUrl ? `
    <div style="margin: 28px 0;">
      <a href="${ctaUrl}" target="_blank" style="background-color: #0d9488; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 700; line-height: 44px; padding: 0 28px; border-radius: 10px; text-decoration: none;">
        ${ctaText} &rarr;
      </a>
    </div>` : ""}

    <!-- Founder Signoff -->
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 15px; color: #334155;">
        Best regards,<br>
        <strong style="color: #0f172a;">Shagun from CareerSense</strong>
      </p>
    </div>

    <!-- Minimal Footer -->
    <div style="margin-top: 36px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; line-height: 1.5;">
      CareerSense AI | <a href="mailto:support@careersenseai.com" style="color: #0d9488; text-decoration: none;">support@careersenseai.com</a> | <a href="https://careersenseai.com" target="_blank" style="color: #0d9488; text-decoration: none;">careersenseai.com</a>
    </div>

  </div>
</body>
</html>`;
}

// 8 Default System Templates with FULL HTML code
const DEFAULT_TEMPLATES = [
  {
    id: "candidate-onboarding-toolkit",
    name: "Candidate Onboarding & Career Toolkit",
    category: "Onboarding",
    subject: "Welcome to CareerSense — your career toolkit is ready",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "Welcome to CareerSense — your career toolkit is ready",
      headline: "Welcome to CareerSense, your personal AI career co-pilot",
      ctaText: "Open Your CareerSense Workspace",
      ctaUrl: "https://careersenseai.com/dashboard",
      body: `Welcome aboard! We built CareerSense to give ambitious candidates a direct, unfair advantage in today's competitive hiring landscape.

Whether you're polishing an existing resume, preparing for technical evaluations, or building production-grade capstones, here is your quick-access guide to our core career tools:

• **ATS Resume Checker:** Audit your resume against top ATS parser algorithms, identify missing keywords, and ensure 100% parseable formatting:
  <a href="https://ats.careersenseai.com/" target="_blank" style="color: #0d9488; font-weight: 600; text-decoration: underline;">ats.careersenseai.com</a>

• **AI Resume Builder:** Restructure routine bullet points into quantifiable, achievement-driven impact metrics that catch recruiter attention:
  <a href="https://resume.careersenseai.com/" target="_blank" style="color: #0d9488; font-weight: 600; text-decoration: underline;">resume.careersenseai.com</a>

• **AI Cover Letter Generator:** Generate authentic, tailored cover letters customized for the exact target job description in under 30 seconds:
  <a href="https://coverletter.careersenseai.com/" target="_blank" style="color: #0d9488; font-weight: 600; text-decoration: underline;">coverletter.careersenseai.com</a>

• **Skill Certification (Certifi):** Complete hands-on technical assessments to earn verifiable credentials recognized by our hiring partner network:
  <a href="https://certifi.careersenseai.com/" target="_blank" style="color: #0d9488; font-weight: 600; text-decoration: underline;">certifi.careersenseai.com</a>

• **Career Fellowships:** Hands-on milestone capstone tracks in Data Analytics, Data Science, AI/ML, Full-Stack, and UI/UX Design:
  <a href="https://careersenseai.com/fellowships/data-analyst" target="_blank" style="color: #0d9488; font-weight: 600; text-decoration: underline;">careersenseai.com/fellowships</a>

• **Career GPS & Roadmap:** Map your personalized milestones from your current skill level directly to senior engineering and analytics roles:
  <a href="https://careersenseai.com/career-gps" target="_blank" style="color: #0d9488; font-weight: 600; text-decoration: underline;">careersenseai.com/career-gps</a>

Feel free to start with any tool that fits your immediate goals today. If you ever have a question or need feedback on your resume, simply reply directly to this email — our team reads and responds to every candidate message.`
    })
  },
  {
    id: "ats-resume-checker",
    name: "ATS Resume Checker",
    category: "Career Tools",
    subject: "A quick tip on resume formatting for ATS screening",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "A quick tip on resume formatting for ATS screening",
      headline: "How recruiters filter resumes before reading them",
      ctaText: "Scan My Resume on ATS Checker",
      ctaUrl: "https://ats.careersenseai.com/",
      body: `I wanted to share a quick insight about resume screening. When applying to companies, automated ATS parsers read your resume before any hiring manager does.

If your resume uses complex tables, multi-column layouts, or non-standard fonts, the parser can scramble your work history or miss your skills completely.

We built the CareerSense ATS Scanner to help you check this in advance:
• **Instant ATS Match Score:** See how closely your resume aligns with top job descriptions.
• **Missing Keyword Detection:** Automatically pinpoint high-intent keywords missing in your skills and experience.
• **Formatting & Parser Audit:** Ensure your headers, dates, and tables are 100% parseable by modern ATS engines.

You can upload your latest resume PDF to test it here:`
    })
  },
  {
    id: "skill-certification",
    name: "Skill Certification (Certifi)",
    category: "Career Tools",
    subject: "How to showcase verified technical skills on your resume",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "How to showcase verified technical skills on your resume",
      headline: "Adding verified proof of skills to your profile",
      ctaText: "Take a Skill Certification Test",
      ctaUrl: "https://certifi.careersenseai.com/",
      body: `When hiring managers review hundreds of candidate profiles, verified proof of competence is what sets top applicants apart.

We launched CareerSense Certifi so you can test your hands-on technical skills and earn shareable, verifiable credentials:
• **Practical Skill Testing:** Rigorous assessment questions designed around real industry job requirements.
• **Verifiable Credentials:** Shareable verification links and credential codes for LinkedIn and resumes.
• **Recruiter Recognition:** Validated credential codes recognized across our hiring partner network.

If you'd like to test your skills and add verified credentials to your profile, you can take an assessment here:`
    })
  },
  {
    id: "career-fellowships",
    name: "Career Fellowships (6 Tracks)",
    category: "Programs",
    subject: "Hands-on Career Fellowships: Build real-world portfolio projects",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "Hands-on Career Fellowships: Build real-world portfolio projects",
      headline: "Fast-Track Your Tech Career with Intensive Milestone Fellowships",
      ctaText: "Explore Career Fellowships",
      ctaUrl: "https://careersenseai.com/fellowships/data-analyst",
      body: `Traditional courses teach theory. Our CareerSense Fellowships focus on what actually gets you hired: building production-grade capstone projects and passing real-world mentor evaluations.

We offer focused fellowship tracks in:
• **Data Analytics:** SQL, Power BI, Python, Business Intelligence
• **Data Science & AI:** Machine Learning, Predictive Modeling, Deep Learning
• **Full-Stack & App Development:** Production Web & Mobile Systems
• **UI/UX Design:** User Research, Figma Prototyping, Design Systems

Each milestone is evaluated with detailed feedback, culminating in verifiable certification.`
    })
  },
  {
    id: "resume-builder",
    name: "AI Resume Builder",
    category: "Career Tools",
    subject: "A cleaner way to structure your resume bullet points",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "A cleaner way to structure your resume bullet points",
      headline: "Writing high-impact, quantifiable resume bullets",
      ctaText: "Build Your Resume with AI",
      ctaUrl: "https://resume.careersenseai.com/",
      body: `One of the most common reasons candidates struggle to get interview callbacks is that their resume bullet points list daily tasks rather than measurable results.

With the CareerSense AI Resume Builder, you can quickly restructure your bullet points into quantifiable impact metrics:
• **AI Bullet Point Rewriter:** Turn routine job descriptions into recruiter-approved achievement bullets.
• **ATS-Compliant Layouts:** Clean, battle-tested modern templates approved by top tech recruiters.
• **Instant PDF Download:** Export pixel-perfect resumes with single-click styling.

You can start drafting your updated resume here:`
    })
  },
  {
    id: "cover-letter-builder",
    name: "AI Cover Letter Generator",
    category: "Career Tools",
    subject: "Why tailored cover letters still win interviews",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "Why tailored cover letters still win interviews",
      headline: "Crafting authentic, job-specific cover letters",
      ctaText: "Generate Your Cover Letter",
      ctaUrl: "https://coverletter.careersenseai.com/",
      body: `Generic cover letters get ignored. Personalized cover letters that speak directly to the hiring manager get interviews.

The CareerSense AI Cover Letter Builder analyzes both your resume and the exact target job description to produce a tailored, authentic narrative that demonstrates why you're the ideal hire.

No filler, no robotic clichés — just concise, compelling storytelling that catches the hiring team's attention.`
    })
  },
  {
    id: "partner-program",
    name: "Startup Partner Program",
    category: "Programs",
    subject: "Work directly with founders: Join the CareerSense Partner Program",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "Work directly with founders: Join the CareerSense Partner Program",
      headline: "Build, Scale & Lead Like a Startup Founder",
      ctaText: "Apply to Partner Program",
      ctaUrl: "https://careersenseai.com/partner-program",
      body: `The CareerSense Partner Program is our executive entrepreneurial track for top performers who want real experience inside an EdTech/AI startup.

Work through 20 hands-on milestone challenges covering:
• **Product Feature Specs:** AI Prompt Architecture and System Design
• **Growth Marketing Sprints:** Conversion Optimization and User Acquisition
• **B2B Partnerships:** Recruiter Network and University Expansion
• **Capstone Pitch:** Executive presentation directly to startup founders

Earn executive badges, profit-sharing incentives, and 1,000,000 platform AI credits.`
    })
  },
  {
    id: "custom-announcement",
    name: "Platform Announcement",
    category: "General",
    subject: "A quick update from the CareerSense team",
    isSystem: true,
    body: buildDefaultHtmlTemplate({
      title: "A quick update from the CareerSense team",
      headline: "Important Update from the CareerSense Team",
      ctaText: "Visit CareerSense Platform",
      ctaUrl: "https://careersenseai.com/dashboard",
      body: `We have just pushed fresh updates to your CareerSense dashboard to help you streamline your job search and interview preparation.

Log in to check out your refreshed dashboard and explore new AI tools designed to accelerate your career growth.`
    })
  }
];

// Compact VS Code HTML Editor with Fixed Height (~20 lines) and Synchronized Scrolling
function CompactVsCodeEditor({ value, onChange, editorRef, height = "360px" }) {
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => value.split("\n"), [value]);

  const highlightedHtml = useMemo(() => {
    try {
      let code = Prism.highlight(value, Prism.languages.html, "html");
      // Merge tag highlighting
      code = code.replace(
        /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
        '<span class="token merge-tag" style="background-color: rgba(45, 212, 191, 0.2); color: #2dd4bf; border: 1px solid rgba(45, 212, 191, 0.45); border-radius: 4px; padding: 0 4px; font-weight: 700;">{{$1}}</span>'
      );
      if (value.endsWith("\n")) {
        code += "\n ";
      }
      return code;
    } catch {
      return value;
    }
  }, [value]);

  const handleScroll = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (editorRef) {
      editorRef.current = textareaRef.current;
    }
  }, [editorRef]);

  return (
    <div className="rounded-xl overflow-hidden border border-[#2b2b2b] bg-[#1e1e1e] shadow-sm flex flex-col font-mono text-[12.5px]">
      {/* Top VS Code Tab */}
      <div className="flex items-center justify-between bg-[#252526] px-3 py-1.5 border-b border-[#333333] select-none text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#1e1e1e] text-[#cccccc] px-2.5 py-0.5 rounded-t border-t-2 border-[#007acc] text-xs font-medium">
            <span className="text-[#e44d26] font-bold">&lt;/&gt;</span>
            <span>email-template.html</span>
          </div>
          <span className="text-[11px] text-[#6e7681]">({lines.length} lines)</span>
        </div>

        <button
          type="button"
          onClick={handleCopyCode}
          className="flex items-center gap-1 hover:text-white transition cursor-pointer px-2 py-0.5 rounded bg-[#333333] text-[#cccccc] text-[11px]"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy HTML"}</span>
        </button>
      </div>

      {/* Editor Body: Exactly capped at ~20 lines with auto-scroll */}
      <div className="relative flex overflow-hidden" style={{ height, minHeight: height, maxHeight: height }}>
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="w-11 bg-[#1e1e1e] border-r border-[#2d2d2d] py-3 pr-2 text-right text-[11px] text-[#5a5a5a] select-none overflow-hidden shrink-0 font-mono"
          style={{ lineHeight: "20px" }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Canvas */}
        <div className="relative flex-1 overflow-hidden">
          <pre
            ref={preRef}
            aria-hidden="true"
            className="vscode-prism-canvas absolute inset-0 m-0 p-3 overflow-hidden font-mono text-[12.5px] pointer-events-none select-none"
            style={{
              lineHeight: "20px",
              tabSize: 2,
              whiteSpace: "pre",
              wordBreak: "normal"
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            className="absolute inset-0 w-full h-full m-0 p-3 font-mono text-[12.5px] bg-transparent text-transparent caret-[#2dd4bf] resize-none outline-none border-none overflow-auto custom-scrollbar selection:bg-[#264f78]"
            style={{
              lineHeight: "20px",
              tabSize: 2,
              whiteSpace: "pre",
              wordBreak: "normal"
            }}
          />
        </div>
      </div>

      <style>{`
        .vscode-prism-canvas { color: #d4d4d4; background-color: transparent !important; }
        .vscode-prism-canvas .token.comment { color: #6a9955 !important; font-style: italic; }
        .vscode-prism-canvas .token.doctype, .vscode-prism-canvas .token.doctype-tag { color: #569cd6 !important; }
        .vscode-prism-canvas .token.punctuation { color: #808080 !important; }
        .vscode-prism-canvas .token.tag { color: #569cd6 !important; font-weight: 600; }
        .vscode-prism-canvas .token.attr-name { color: #9cdcfe !important; }
        .vscode-prism-canvas .token.attr-value, .vscode-prism-canvas .token.string { color: #ce9178 !important; }
        .vscode-prism-canvas .token.property { color: #9cdcfe !important; }
      `}</style>
    </div>
  );
}

export default function EmailMarketingHub({ candidates = [], adminEmail = "" }) {
  const apiBase =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "https://server.datasenseai.com";

  // Templates from Database + Defaults
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [selectedTemplateId, setSelectedTemplateId] = useState(DEFAULT_TEMPLATES[0].id);
  const [customTemplateName, setCustomTemplateName] = useState("");

  // Email Content
  const [subject, setSubject] = useState(DEFAULT_TEMPLATES[0].subject);
  const [htmlCode, setHtmlCode] = useState(DEFAULT_TEMPLATES[0].body);

  // Sender Identity
  const [fromAddress, setFromAddress] = useState("Shagun from CareerSense <shagun@careersenseai.com>");

  // ==========================================
  // RECIPIENT SELECTION (Full Toggle & Filters)
  // ==========================================
  const [recipientSource, setRecipientSource] = useState("platform");
  const [selectedCandidateIds, setSelectedCandidateIds] = useState(new Set());
  const [platformFilter, setPlatformFilter] = useState("all");
  const [platformSearch, setPlatformSearch] = useState("");

  // CSV State
  const [csvRecipients, setCsvRecipients] = useState([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvParsingError, setCsvParsingError] = useState("");
  const fileInputRef = useRef(null);

  // Manual State
  const [manualText, setManualText] = useState("");

  // ==========================================
  // TEST & DISPATCH STATE
  // ==========================================
  const defaultTestName = adminEmail.toLowerCase().includes("subodh") ? "Subodh" : "Subodh";
  const [testEmailAddress, setTestEmailAddress] = useState(adminEmail);
  const [testRecipientName, setTestRecipientName] = useState(defaultTestName);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSendingBulk, setIsSendingBulk] = useState(false);
  const [bulkStatus, setBulkStatus] = useState(null);

  // Template Save / Delete Status
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preview Mode
  const [previewMode, setPreviewMode] = useState("desktop");

  // History
  const [campaigns, setCampaigns] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const editorRef = useRef(null);

  // Select all platform users by default on initial load
  useEffect(() => {
    if (candidates && candidates.length > 0 && selectedCandidateIds.size === 0) {
      const all = new Set(candidates.map((c) => c.clerkUserId || c.id || c.email).filter(Boolean));
      setSelectedCandidateIds(all);
    }
  }, [candidates]);

  // Load templates & campaigns
  useEffect(() => {
    fetchTemplates();
    fetchCampaigns();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(`${apiBase}/careersense/admin/marketing/templates`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.templates) && data.templates.length > 0) {
        setTemplates(data.templates);
      }
      if (data.fromAddress) {
        setFromAddress(data.fromAddress);
      }
    } catch (err) {
      console.warn("Using default templates");
    }
  };

  const fetchCampaigns = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/marketing/campaigns`, {
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Change selected template
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    setSaveStatus(null);

    if (templateId === "blank") {
      setCustomTemplateName("New Custom Campaign");
      setSubject("Update from CareerSense");
      setHtmlCode(DEFAULT_TEMPLATES[0].body);
      return;
    }

    const t = templates.find((item) => (item.id || item._id) === templateId);
    if (!t) return;
    setCustomTemplateName(t.name);
    setSubject(t.subject || "");
    setHtmlCode(t.body || "");
  };

  // Filtered platform candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (platformFilter === "paid" && !c.subscription?.isPaid) return false;
      if (platformFilter === "free" && c.subscription?.isPaid) return false;
      if (platformFilter === "low_tokens" && (c.subscription?.tokensRemaining >= 5000 || c.subscription?.isPaid)) return false;
      if (platformFilter === "burners" && (!c.subscription?.tokensUsed || c.subscription.tokensUsed <= 0)) return false;

      if (platformSearch.trim()) {
        const q = platformSearch.toLowerCase().trim();
        const matches =
          c.email?.toLowerCase().includes(q) ||
          c.fullName?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [candidates, platformFilter, platformSearch]);

  // Toggle Select All filtered platform candidates
  const handleToggleSelectAll = () => {
    const currentFilteredIds = filteredCandidates.map((c) => c.clerkUserId || c.id || c.email).filter(Boolean);
    const allSelected = currentFilteredIds.every((id) => selectedCandidateIds.has(id));

    const next = new Set(selectedCandidateIds);
    if (allSelected) {
      currentFilteredIds.forEach((id) => next.delete(id));
    } else {
      currentFilteredIds.forEach((id) => next.add(id));
    }
    setSelectedCandidateIds(next);
  };

  // Parse Manual Emails
  const manualRecipients = useMemo(() => {
    if (!manualText.trim()) return [];
    const rawTokens = manualText.split(/[\n,;]+/);
    const unique = new Map();
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;

    rawTokens.forEach((token) => {
      const match = token.match(emailRegex);
      if (match) {
        const email = match[1].toLowerCase().trim();
        let name = token.replace(match[0], "").replace(/[<>:"']/g, "").trim();
        if (!unique.has(email)) {
          unique.set(email, { email, name });
        }
      }
    });

    return Array.from(unique.values());
  }, [manualText]);

  // CSV File Upload
  const handleCsvFileUpload = (event) => {
    setCsvParsingError("");
    const file = event.target.files?.[0];
    if (!file) return;

    setCsvFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== "string") return;

        const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length === 0) {
          setCsvParsingError("Uploaded CSV is empty.");
          return;
        }

        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
        const parsed = new Map();

        lines.forEach((line) => {
          const m = line.match(emailRegex);
          if (m) {
            const email = m[1].toLowerCase().trim();
            if (!parsed.has(email)) {
              parsed.set(email, { email, name: "" });
            }
          }
        });

        const list = Array.from(parsed.values());
        if (list.length === 0) {
          setCsvParsingError("No valid email addresses found in CSV.");
        } else {
          setCsvRecipients(list);
        }
      } catch (err) {
        setCsvParsingError("Failed to parse CSV: " + err.message);
      }
    };

    reader.readAsText(file);
  };

  // Determine active recipients list
  const activeRecipients = useMemo(() => {
    if (recipientSource === "platform") {
      return candidates
        .filter((c) => selectedCandidateIds.has(c.clerkUserId || c.id || c.email) && c.email && c.email.includes("@"))
        .map((c) => ({ email: c.email.trim(), name: c.fullName || "" }));
    }
    if (recipientSource === "csv") return csvRecipients;
    if (recipientSource === "manual") return manualRecipients;
    return [];
  }, [recipientSource, candidates, selectedCandidateIds, csvRecipients, manualRecipients]);

  // Real-time Preview HTML generator
  const livePreviewHtml = useMemo(() => {
    const name = testRecipientName || "Subodh";
    const email = testEmailAddress || "candidate@example.com";
    return (htmlCode || "")
      .replace(/{{\s*name\s*}}/gi, name)
      .replace(/{{\s*email\s*}}/gi, email);
  }, [htmlCode, testRecipientName, testEmailAddress]);

  // Insert code snippet into editor at cursor
  const insertCodeSnippet = (snippet) => {
    const textarea = editorRef.current;
    if (!textarea) {
      setHtmlCode((prev) => prev + "\n" + snippet);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = htmlCode;
    const updated = current.substring(0, start) + snippet + current.substring(end);
    setHtmlCode(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 50);
  };

  // Save current HTML code as custom template
  const handleSaveTemplate = async (asNewCopy = false) => {
    const currentT = templates.find((t) => (t.id || t._id) === selectedTemplateId);
    const nameToSave = customTemplateName.trim() || currentT?.name || "My Custom Template";

    if (!nameToSave || !subject.trim() || !htmlCode.trim()) {
      setSaveStatus({ success: false, message: "Template Name, Subject, and HTML code are required." });
      return;
    }

    setIsSavingTemplate(true);
    setSaveStatus(null);

    const isExistingCustom = !asNewCopy && selectedTemplateId && !currentT?.isSystem && selectedTemplateId !== "blank";

    try {
      const url = isExistingCustom
        ? `${apiBase}/careersense/admin/marketing/templates/${selectedTemplateId}`
        : `${apiBase}/careersense/admin/marketing/templates`;

      const method = isExistingCustom ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({
          name: nameToSave,
          category: "Custom",
          subject: subject.trim(),
          body: htmlCode,
          layoutStyle: "raw_html"
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to save template");
      }

      setSaveStatus({
        success: true,
        message: isExistingCustom
          ? `Template "${nameToSave}" successfully updated!`
          : `Template "${nameToSave}" saved to template repository!`
      });

      if (data.template) {
        setSelectedTemplateId(data.template.id || data.template._id);
        setCustomTemplateName(data.template.name);
      }

      await fetchTemplates();
    } catch (err) {
      setSaveStatus({ success: false, message: err.message || "Failed to save template" });
    } finally {
      setIsSavingTemplate(false);
    }
  };

  // Delete Custom Template
  const handleDeleteTemplate = async (templateId) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/marketing/templates/${templateId}`, {
        method: "DELETE",
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete template");
      }

      setDeleteConfirmId(null);
      setSaveStatus({ success: true, message: "Template deleted from repository." });
      handleSelectTemplate("ats-resume-checker");
      await fetchTemplates();
    } catch (err) {
      setSaveStatus({ success: false, message: err.message });
    } finally {
      setIsDeleting(false);
    }
  };

  // Send Test Email to Subodh
  const handleSendTestEmail = async () => {
    if (!testEmailAddress || !testEmailAddress.includes("@")) {
      setTestStatus({ success: false, message: "Please provide a valid test email address." });
      return;
    }
    setIsSendingTest(true);
    setTestStatus(null);

    try {
      const res = await fetch(`${apiBase}/careersense/admin/marketing/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({
          testEmail: testEmailAddress,
          recipientName: testRecipientName || "Subodh",
          layoutStyle: "raw_html",
          subject,
          body: htmlCode
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send test email");
      }

      setTestStatus({
        success: true,
        message: `Test email sent to ${testEmailAddress} with greeting "Hi ${testRecipientName || "Subodh"}"!`
      });
    } catch (err) {
      setTestStatus({ success: false, message: err.message });
    } finally {
      setIsSendingTest(false);
    }
  };

  // Launch Bulk Campaign
  const handleLaunchCampaign = async () => {
    if (activeRecipients.length === 0) {
      setBulkStatus({ success: false, message: "No recipients selected to receive campaign." });
      return;
    }

    setIsSendingBulk(true);
    setBulkStatus(null);
    setIsConfirmModalOpen(false);

    const activeT = templates.find((t) => (t.id || t._id) === selectedTemplateId);
    const campaignTitle = activeT?.name || subject;

    try {
      const res = await fetch(`${apiBase}/careersense/admin/marketing/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({
          title: campaignTitle,
          subject,
          body: htmlCode,
          templateId: selectedTemplateId,
          recipientSource,
          layoutStyle: "raw_html",
          recipients: activeRecipients
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to dispatch campaign");
      }

      setBulkStatus({
        success: true,
        message: `Campaign completed! Sent: ${data.stats?.sent || activeRecipients.length}, Failed: ${data.stats?.failed || 0}.`
      });

      fetchCampaigns();
    } catch (err) {
      setBulkStatus({ success: false, message: err.message });
    } finally {
      setIsSendingBulk(false);
    }
  };

  const selectedTemplateObj = templates.find((t) => (t.id || t._id) === selectedTemplateId);
  const isSelectedCustom = selectedTemplateObj && !selectedTemplateObj.isSystem && selectedTemplateId !== "blank";

  return (
    <div className="space-y-6">

      {/* TOP COMMAND HEADER */}
      <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-r from-[#0b132b] via-[#111c40] to-[#0b132b] p-5 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/30">
              <Mail size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold tracking-tight text-white">CareerSense Email Broadcast Center</h2>
              </div>
              <p className="mt-0.5 text-xs text-slate-300 leading-snug">
                Dispatched from: <span className="font-bold text-teal-300">{fromAddress}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 text-xs font-bold transition border border-slate-700/60 cursor-pointer"
            >
              <Clock size={13} />
              <span>Past Broadcasts ({campaigns.length})</span>
              {showHistory ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE BROADCAST HISTORY */}
      {showHistory && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Clock size={14} className="text-teal-600" />
              <span>Recent Broadcast Logs</span>
            </div>
            <button
              type="button"
              onClick={fetchCampaigns}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={12} className={loadingHistory ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">No campaigns have been sent yet.</div>
          ) : (
            <div className="overflow-x-auto max-h-56 custom-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Subject</th>
                    <th className="py-2 px-3">Audience</th>
                    <th className="py-2 px-3">Recipients</th>
                    <th className="py-2 px-3">Sent / Failed</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {campaigns.map((camp) => (
                    <tr key={camp._id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                        {new Date(camp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 truncate max-w-xs">{camp.subject}</td>
                      <td className="py-2.5 px-3 uppercase text-[10px]">{camp.recipientSource}</td>
                      <td className="py-2.5 px-3 font-bold">{camp.totalRecipients || 0}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-emerald-600 font-bold">{camp.sentCount || 0}</span>
                        {camp.failedCount > 0 && <span className="text-rose-600 font-bold ml-1">/ {camp.failedCount} err</span>}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${camp.status === "completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SINGLE-COLUMN STACKED WORKSPACE (FULL WIDTH RECIPIENTS -> EDITOR -> PREVIEW -> SEND) */}
      <div className="space-y-6">

        {/* ------------------------------------------------------ */}
        {/* STEP 1: AUDIENCE SELECTION (FULL FILTERS & SELECTION)   */}
        {/* ------------------------------------------------------ */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[11px] font-black text-white">
                1
              </span>
              <h3 className="text-sm font-bold text-slate-900">Select Campaign Recipients</h3>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
              {activeRecipients.length.toLocaleString()} Candidates Targeted
            </span>
          </div>

          {/* Recipient Source Tabs */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRecipientSource("platform")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition cursor-pointer ${recipientSource === "platform"
                  ? "bg-[#0b132b] text-teal-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              <Users size={14} />
              <span>Platform Users ({candidates.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setRecipientSource("csv")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition cursor-pointer ${recipientSource === "csv"
                  ? "bg-[#0b132b] text-teal-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              <Upload size={14} />
              <span>CSV Upload {csvRecipients.length > 0 && `(${csvRecipients.length})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setRecipientSource("manual")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-bold transition cursor-pointer ${recipientSource === "manual"
                  ? "bg-[#0b132b] text-teal-300 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              <FileText size={14} />
              <span>Manual Paste</span>
            </button>
          </div>

          {/* PLATFORM USERS: Filter chips, search bar & toggle selection */}
          {recipientSource === "platform" && (
            <div className="space-y-2.5 pt-1">
              {/* Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
                {[
                  { id: "all", label: "All Users" },
                  { id: "paid", label: "Paid Subscribers" },
                  { id: "free", label: "Free Tier" },
                  { id: "low_tokens", label: "< 5k Tokens" },
                  { id: "burners", label: "AI Burners" }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setPlatformFilter(chip.id)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${platformFilter === chip.id
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Search Bar & Toggle Select All Button */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={platformSearch}
                    onChange={(e) => setPlatformSearch(e.target.value)}
                    placeholder="Search candidates by name or email..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="shrink-0 text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-200 transition cursor-pointer"
                >
                  Toggle Select All ({filteredCandidates.length})
                </button>
              </div>

              {/* Candidate Selection Checkbox Roster */}
              <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-slate-50/50 custom-scrollbar">
                {filteredCandidates.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">No candidates match this filter.</div>
                ) : (
                  filteredCandidates.map((c) => {
                    const id = c.clerkUserId || c.id || c.email;
                    const isChecked = selectedCandidateIds.has(id);
                    return (
                      <label
                        key={id}
                        className="flex items-center justify-between px-3 py-1.5 text-xs hover:bg-slate-100/80 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              const next = new Set(selectedCandidateIds);
                              if (isChecked) next.delete(id);
                              else next.add(id);
                              setSelectedCandidateIds(next);
                            }}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-800 truncate block text-xs">{c.fullName || "Candidate"}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{c.email}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${c.subscription?.isPaid ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-600"
                            }`}
                        >
                          {c.subscription?.plan || "free"}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* CSV UPLOAD MODE */}
          {recipientSource === "csv" && (
            <div className="space-y-2 pt-1">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-teal-500 rounded-xl p-5 text-center bg-slate-50 cursor-pointer transition"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv,text/plain"
                  onChange={handleCsvFileUpload}
                  className="hidden"
                />
                <Upload size={22} className="mx-auto text-teal-600 mb-1" />
                <div className="text-xs font-bold text-slate-800">
                  {csvFileName ? `File: ${csvFileName}` : "Click or drag & drop CSV file"}
                </div>
                <span className="text-[10px] text-slate-400">Auto-detects emails & cleans duplicates</span>
              </div>
              {csvParsingError && <div className="text-xs text-rose-600 font-bold">{csvParsingError}</div>}
            </div>
          )}

          {/* MANUAL ENTRY MODE */}
          {recipientSource === "manual" && (
            <div className="space-y-1.5 pt-1">
              <textarea
                rows={3}
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Paste emails separated by commas or lines...&#10;e.g. user1@gmail.com, Subodh <subodh@domain.com>"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-teal-500 bg-slate-50"
              />
              <div className="text-right text-[11px] text-slate-500">
                {manualRecipients.length} valid address{manualRecipients.length === 1 ? "" : "es"} detected
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------ */}
        {/* STEP 2: TEMPLATE SELECTOR & HTML RUNNER EDITOR         */}
        {/* ------------------------------------------------------ */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[11px] font-black text-white">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-900">Choose Template & Edit Email HTML</h3>
            </div>
            <span className="text-xs text-slate-400">Pure, Direct HTML Email</span>
          </div>

          {/* Template Dropdown Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Select from CareerSense Templates Library</label>
            <div className="flex items-center gap-2">
              <select
                value={selectedTemplateId}
                onChange={(e) => handleSelectTemplate(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
              >
                <optgroup label="CareerSense Tool Presets (Locked System Defaults)">
                  {templates.filter((t) => t.isSystem).map((t) => (
                    <option key={t.id || t._id} value={t.id || t._id}>
                      🔒 {t.name} ({t.category})
                    </option>
                  ))}
                </optgroup>
                {templates.filter((t) => !t.isSystem).length > 0 && (
                  <optgroup label="Custom Saved Templates">
                    {templates.filter((t) => !t.isSystem).map((t) => (
                      <option key={t.id || t._id} value={t.id || t._id}>
                        ⭐ {t.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                <option value="blank">+ Create Fresh Custom HTML Campaign</option>
              </select>

              {isSelectedCustom && (
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(selectedTemplateId)}
                  className="rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 text-xs font-bold transition cursor-pointer"
                  title="Delete custom template"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Subject Line & Template Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Subject Line{" "}
                <span className="text-[10px] font-normal text-slate-400">(Supports <code className="text-teal-600">{"{{name}}"}</code>)</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject line..."
                className="w-full rounded-xl border border-slate-200 p-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Template Name (in Repository)</label>
              <input
                type="text"
                value={customTemplateName}
                onChange={(e) => setCustomTemplateName(e.target.value)}
                placeholder="e.g. October Feature Blast"
                className="w-full rounded-xl border border-slate-200 p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Quick Insertion Helpers */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Insert Tag:</span>
            <button
              type="button"
              onClick={() => insertCodeSnippet("{{name}}")}
              className="rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-700 transition cursor-pointer"
              title="Inserts recipient name merge tag"
            >
              {"{{name}}"}
            </button>
            <button
              type="button"
              onClick={() => insertCodeSnippet("{{email}}")}
              className="rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-700 transition cursor-pointer"
            >
              {"{{email}}"}
            </button>
            <button
              type="button"
              onClick={() => insertCodeSnippet("<strong>Bold Text</strong>")}
              className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-700 transition cursor-pointer"
            >
              &lt;strong&gt;
            </button>
            <button
              type="button"
              onClick={() => insertCodeSnippet('<a href="https://careersenseai.com" target="_blank" style="background-color: #0d9488; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px;">Click Here &rarr;</a>')}
              className="rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 px-2 py-0.5 text-[11px] font-bold text-teal-700 transition cursor-pointer"
            >
              CTA Button
            </button>
            <button
              type="button"
              onClick={() => insertCodeSnippet('<div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 14px 18px; border-radius: 6px; margin: 16px 0;">\n  <h4 style="margin: 0 0 6px 0; color: #0b132b;">Key Takeaway</h4>\n  <p style="margin: 0; color: #475569; font-size: 14px;">Insert highlighted insight here.</p>\n</div>')}
              className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-700 transition cursor-pointer"
            >
              Callout Box
            </button>
          </div>

          {/* COMPACT VS CODE HTML EDITOR (~20 LINES HEIGHT WITH AUTO-SCROLL) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileCode2 size={14} className="text-teal-600" />
                <span>HTML Email Markup (VS Code Dark+ Highlighting)</span>
              </label>
              <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Live Runner
              </span>
            </div>

            <CompactVsCodeEditor
              value={htmlCode}
              onChange={setHtmlCode}
              editorRef={editorRef}
              height="360px"
            />
          </div>

          {/* Save Template Actions */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isSavingTemplate}
                onClick={() => handleSaveTemplate(false)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer disabled:bg-slate-400"
              >
                {isSavingTemplate ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                <span>Save Template to Repository</span>
              </button>

              <button
                type="button"
                disabled={isSavingTemplate}
                onClick={() => handleSaveTemplate(true)}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 text-xs font-bold transition cursor-pointer"
                title="Save as a new copy"
              >
                <Copy size={12} />
                <span>Save Copy</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400">
              {selectedTemplateObj?.isSystem ? "🔒 System Default Preset" : "⭐ Custom Saved Template"}
            </span>
          </div>

          {saveStatus && (
            <div
              className={`text-xs p-2 rounded-xl font-bold flex items-center gap-1.5 ${saveStatus.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
            >
              {saveStatus.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{saveStatus.message}</span>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------ */}
        {/* LIVE INBOX PREVIEW (NOW BELOW RECIPIENTS & EDITOR)      */}
        {/* ------------------------------------------------------ */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">

          {/* Toolbar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Live Inbox Preview
              </h3>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`p-1 rounded text-xs transition cursor-pointer ${previewMode === "desktop" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400 hover:text-slate-700"
                  }`}
                title="Desktop View"
              >
                <Monitor size={14} />
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`p-1 rounded text-xs transition cursor-pointer ${previewMode === "mobile" ? "bg-white text-slate-900 shadow-xs" : "text-slate-400 hover:text-slate-700"
                  }`}
                title="Mobile View (360px)"
              >
                <Smartphone size={14} />
              </button>
            </div>
          </div>

          {/* Email Simulated Envelope Headers */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs space-y-1.5 mb-3 font-sans max-w-3xl mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-400">From:</span>
              <span className="font-bold text-slate-700 truncate">{fromAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">To:</span>
              <span className="font-bold text-slate-700">
                {testRecipientName || "Subodh"} &lt;{testEmailAddress || "candidate@example.com"}&gt;
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200/50">
              <span className="text-slate-400">Subject:</span>
              <span className="font-bold text-teal-700 truncate">
                {subject ? subject.replace(/{{\s*name\s*}}/gi, testRecipientName || "Subodh") : "(No subject)"}
              </span>
            </div>
          </div>

          {/* Sandboxed Live HTML Iframe (Zero CSS leakage, 100% accurate rendering) */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 p-3">
            <div className={`mx-auto transition-all ${previewMode === "mobile" ? "max-w-[360px]" : "max-w-3xl"}`}>
              <iframe
                title="Real-Time Email Preview"
                srcDoc={livePreviewHtml}
                className="w-full h-[580px] rounded-lg border border-slate-200 bg-white shadow-inner"
                sandbox="allow-same-origin allow-popups"
              />
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------ */}
        {/* STEP 3: INSTANT TEST EMAIL & LAUNCH BROADCAST          */}
        {/* ------------------------------------------------------ */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[11px] font-black text-white">
              3
            </span>
            <h3 className="text-sm font-bold text-slate-900">Test & Send Broadcast</h3>
          </div>

          {/* Quick Test Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-teal-700">
                <ShieldCheck size={14} /> Send Test Preview to Your Inbox
              </span>
              <span className="text-[10px] text-slate-400">Verifies layout before sending</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-4">
                <input
                  type="text"
                  value={testRecipientName}
                  onChange={(e) => setTestRecipientName(e.target.value)}
                  placeholder="Name (Subodh)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800"
                />
              </div>
              <div className="sm:col-span-5">
                <input
                  type="email"
                  value={testEmailAddress}
                  onChange={(e) => setTestEmailAddress(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="button"
                  disabled={isSendingTest || !testEmailAddress}
                  onClick={handleSendTestEmail}
                  className="w-full rounded-lg bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 text-xs font-bold transition cursor-pointer disabled:bg-slate-400 flex items-center justify-center gap-1"
                >
                  {isSendingTest ? <Loader2 size={13} className="animate-spin" /> : <Send size={12} />}
                  <span>Send Test</span>
                </button>
              </div>
            </div>

            {testStatus && (
              <div
                className={`text-xs p-2 rounded-lg font-medium ${testStatus.success ? "text-emerald-700 bg-emerald-50 border border-emerald-200" : "text-rose-700 bg-rose-50 border border-rose-200"
                  }`}
              >
                {testStatus.message}
              </div>
            )}
          </div>

          {/* Launch Campaign Button */}
          <div className="pt-1">
            <button
              type="button"
              disabled={activeRecipients.length === 0 || isSendingBulk || !subject || !htmlCode}
              onClick={() => setIsConfirmModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white p-3.5 text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              {isSendingBulk ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Dispatching Emails via Resend...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Campaign to {activeRecipients.length.toLocaleString()} Recipients &rarr;</span>
                </>
              )}
            </button>

            {bulkStatus && (
              <div
                className={`mt-3 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${bulkStatus.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
              >
                {bulkStatus.success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                <span>{bulkStatus.message}</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* CONFIRMATION SAFETY MODAL: DELETE TEMPLATE */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center ring-1 ring-rose-200">
                <Trash2 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Delete Custom Template</h3>
                <p className="text-[11px] text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this custom template from your repository?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDeleteTemplate(deleteConfirmId)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 text-xs font-bold transition shadow-sm cursor-pointer disabled:bg-slate-300"
              >
                {isDeleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                <span>Delete Template</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION SAFETY MODAL: BULK DISPATCH */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center ring-1 ring-amber-200">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Confirm Bulk Email Broadcast</h3>
                <p className="text-xs text-slate-500">Please review campaign summary before sending</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Sender Identity:</span>
                <span className="font-bold text-slate-900 truncate max-w-xs">{fromAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Recipients:</span>
                <span className="font-bold text-teal-700">{activeRecipients.length.toLocaleString()} candidates</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Audience Source:</span>
                <span className="font-bold text-slate-900 uppercase text-[11px]">{recipientSource}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200/60">
                <span className="text-slate-500">Subject:</span>
                <span className="font-bold text-slate-900 truncate max-w-xs">{subject}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              This action will dispatch live emails through Resend to{" "}
              <strong className="text-slate-800">{activeRecipients.length.toLocaleString()}</strong> recipients.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLaunchCampaign}
                className="flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <Send size={14} />
                <span>Confirm & Dispatch Emails</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

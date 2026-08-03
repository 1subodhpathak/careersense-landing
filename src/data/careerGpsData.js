// ─────────────────────────────────────────────────────────────
//  Career GPS Data  — NEW (does not replace careerAssessmentData.js)
// ─────────────────────────────────────────────────────────────

// ── Step 1: Archetype Discovery Questions ───────────────────
export const archetypeQuestions = [
  {
    id: "career-stage",
    question: "Where are you in your career right now?",
    subtitle: "Be honest — this shapes every recommendation we give you.",
    options: [
      { id: "fresh", label: "Just Starting Out", sub: "0–2 years of experience" },
      { id: "switcher", label: "Switching Industries or Roles", sub: "Moving into something new" },
      { id: "climber", label: "Seeking a Promotion or Step-Up", sub: "Looking to level up" },
      { id: "returner", label: "Returning After a Gap", sub: "Back after a break" },
    ],
  },
  {
    id: "biggest-blocker",
    question: "What's your biggest career blocker right now?",
    subtitle: "Pick the one that hurts most.",
    options: [
      { id: "no-callbacks", label: "I apply a lot but get no callbacks", sub: "Resume or ATS issue" },
      { id: "fail-interviews", label: "I get interviews but don't land offers", sub: "Interview prep needed" },
      { id: "no-proof", label: "I can't prove my skills to employers", sub: "Credentials gap" },
      { id: "no-direction", label: "I'm not sure what role to target", sub: "Career clarity needed" },
    ],
  },
  {
    id: "work-domain",
    question: "What type of work are you targeting?",
    subtitle: "This helps us map the right tools for your path.",
    options: [
      { id: "tech", label: "Tech / Engineering", sub: "Software, Data, DevOps, etc." },
      { id: "business", label: "Business / Management", sub: "Product, Finance, Strategy, etc." },
      { id: "creative", label: "Creative / Design", sub: "UX, Marketing, Content, etc." },
      { id: "other", label: "Other / Not Sure Yet", sub: "Still exploring options" },
    ],
  },
];

// ── Archetype Resolution ─────────────────────────────────────
export const careerArchetypes = {
  fresh: {
    id: "fresh",
    label: "The Fresh Grad",
    tagline: "Building from the ground up",
    color: "emerald",
    priorityOrder: ["skills", "resume", "ats", "coverletter", "interview"],
    actionIntro: "You're at the start of your journey — and that's a real advantage. Employers love potential. Your top priority is proving your skills early and building a targeted resume that stands out in ATS filters.",
  },
  switcher: {
    id: "switcher",
    label: "The Career Switcher",
    tagline: "Writing a new professional story",
    color: "violet",
    priorityOrder: ["resume", "skills", "coverletter", "ats", "interview"],
    actionIntro: "Switching careers is bold. Your challenge is translating past experience into the new domain's language. A targeted resume with transferable skills + verifiable new-domain credentials is your fastest route in.",
  },
  climber: {
    id: "climber",
    label: "The Climber",
    tagline: "Leveling up strategically",
    color: "cyan",
    priorityOrder: ["resume", "interview", "skills", "ats", "coverletter"],
    actionIntro: "You already have experience — now it's about positioning yourself for the next level. Quantified achievements, leadership stories, and verified senior-level skills will separate you from other applicants.",
  },
  returner: {
    id: "returner",
    label: "The Returner",
    tagline: "Reclaiming your professional identity",
    color: "amber",
    priorityOrder: ["resume", "skills", "interview", "ats", "coverletter"],
    actionIntro: "Returning after a gap is more common than ever, and employers know it. Your job is to show that you're current — fresh certifications, an updated resume, and strong interview storytelling will close the gap fast.",
  },
};

export function resolveArchetype(archetypeAnswers) {
  const stage = archetypeAnswers["career-stage"];
  if (stage && careerArchetypes[stage]) return careerArchetypes[stage];
  return careerArchetypes["climber"]; // safe default
}

// ── Assessment Categories (same structure, new copy) ─────────
export const gpsCategories = {
  resume: {
    label: "Resume Strength",
    shortLabel: "Resume",
    description: "How well your resume positions you for your target role.",
    phaseIndex: 0,
  },
  ats: {
    label: "ATS Compatibility",
    shortLabel: "ATS",
    description: "How likely your application is to pass automated screening.",
    phaseIndex: 1,
  },
  skills: {
    label: "Skills & Credentials",
    shortLabel: "Skills",
    description: "How well you can prove your skills with verifiable evidence.",
    phaseIndex: 2,
  },
  coverletter: {
    label: "Cover Letter & Outreach",
    shortLabel: "Cover Letter",
    description: "How effectively you personalize your applications.",
    phaseIndex: 3,
  },
  interview: {
    label: "Interview Readiness",
    shortLabel: "Interview",
    description: "How prepared you are for real-world interview scenarios.",
    phaseIndex: 4,
  },
};

// ── Scoring Questions ────────────────────────────────────────
export const gpsQuestions = [
  // RESUME (3 questions)
  {
    id: "resume-ready",
    category: "resume",
    question: "If your dream job posted today, how ready is your resume to apply right now?",
    options: [
      { label: "It's outdated — needs a complete overhaul", score: 0 },
      { label: "It's mostly there but I'd need to update it", score: 1 },
      { label: "I'd make a few tweaks and apply", score: 2 },
      { label: "I could apply within the hour, no edits needed", score: 3 },
    ],
  },
  {
    id: "resume-targeted",
    category: "resume",
    question: "Does your resume speak directly to the jobs you want — or is it a general overview of your past?",
    options: [
      { label: "Mostly a chronological list of everything I've done", score: 0 },
      { label: "There's some targeting but it could be much sharper", score: 1 },
      { label: "It's fairly well-targeted to my area", score: 2 },
      { label: "Every word is chosen for my specific target role", score: 3 },
    ],
  },
  {
    id: "resume-impact",
    category: "resume",
    question: "How well does your resume show measurable impact — not just what you did, but what changed because of you?",
    options: [
      { label: "Mostly responsibilities and duties, no real numbers", score: 0 },
      { label: "A few achievements have results attached", score: 1 },
      { label: "Most roles have measurable outcomes", score: 2 },
      { label: "Every major bullet is a clear, quantified achievement", score: 3 },
    ],
  },

  // ATS (2 questions)
  {
    id: "ats-keywords",
    category: "ats",
    question: "How intentionally do you match the exact keywords from job descriptions into your resume?",
    options: [
      { label: "I don't think about keywords at all", score: 0 },
      { label: "I copy a few obvious terms but that's it", score: 1 },
      { label: "I align my skills and responsibilities with the JD", score: 2 },
      { label: "I systematically optimize each application", score: 3 },
    ],
  },
  {
    id: "ats-format",
    category: "ats",
    question: "Have you ever tested your resume with an ATS checker — or are you guessing it's fine?",
    options: [
      { label: "I have no idea if it's ATS-friendly or not", score: 0 },
      { label: "I use a designed template that probably isn't ATS-safe", score: 1 },
      { label: "I keep the format simple and clean, likely ATS-friendly", score: 2 },
      { label: "I've run it through an ATS checker and know my score", score: 3 },
    ],
  },

  // SKILLS (3 questions)
  {
    id: "skills-proof",
    category: "skills",
    question: "If a recruiter asked \"can you prove you know X?\", how solid is your evidence?",
    options: [
      { label: "Just my word on a resume — no hard proof", score: 0 },
      { label: "I have a few course completion certificates", score: 1 },
      { label: "I have projects or assessments that back up my skills", score: 2 },
      { label: "Strong portfolio, verified certifications, and assessments", score: 3 },
    ],
  },
  {
    id: "skills-gap",
    category: "skills",
    question: "How well do you understand the specific skill gaps between where you are and where you want to be?",
    options: [
      { label: "I honestly don't know what I'm missing", score: 0 },
      { label: "I have a rough idea of what to learn", score: 1 },
      { label: "I know the key gaps for my target role clearly", score: 2 },
      { label: "I have a specific, prioritized list and I'm closing them", score: 3 },
    ],
  },
  {
    id: "skills-learning",
    category: "skills",
    question: "How consistently are you actively building skills relevant to your next role?",
    options: [
      { label: "Not learning consistently right now", score: 0 },
      { label: "I pick things up when I happen to need them", score: 1 },
      { label: "I follow a loose learning routine", score: 2 },
      { label: "I have a structured, role-specific plan and track my progress", score: 3 },
    ],
  },

  // COVER LETTER (2 questions)
  {
    id: "cl-custom",
    category: "coverletter",
    question: "How personalized are your cover letters — do they feel written for *this* company or copy-pasted?",
    options: [
      { label: "I rarely write cover letters or use the same one for everything", score: 0 },
      { label: "I swap out the company name but keep most of it the same", score: 1 },
      { label: "I personalize the key points for each role", score: 2 },
      { label: "Every letter is a tailored story that connects my background to their specific needs", score: 3 },
    ],
  },
  {
    id: "cl-story",
    category: "coverletter",
    question: "Does your cover letter tell a compelling story about why *you*, *this role*, *this company* — or does it just summarize your resume?",
    options: [
      { label: "It's basically a summary of my resume in paragraph form", score: 0 },
      { label: "It adds a little personality but mostly restates my CV", score: 1 },
      { label: "It connects my experience to the role meaningfully", score: 2 },
      { label: "It tells a sharp, specific story that makes the hiring manager want to meet me", score: 3 },
    ],
  },

  // INTERVIEW (2 questions)
  {
    id: "interview-stories",
    category: "interview",
    question: "How prepared are your achievement stories for behavioural interview questions?",
    options: [
      { label: "I usually improvise in interviews — no structured stories", score: 0 },
      { label: "I have a few examples in my head", score: 1 },
      { label: "I have structured STAR stories for key competencies", score: 2 },
      { label: "I have strong, refined stories for virtually any question type", score: 3 },
    ],
  },
  {
    id: "interview-practice",
    category: "interview",
    question: "How often do you actively practice answering interview questions out loud?",
    options: [
      { label: "Almost never — I'll figure it out when it happens", score: 0 },
      { label: "Only the night before a real interview", score: 1 },
      { label: "I practice a few times a month", score: 2 },
      { label: "Consistently, often with structured feedback", score: 3 },
    ],
  },
];

const get28DaysLaunchDate = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + 28);
  return d.toISOString();
};

// ── Pipeline Phases ──────────────────────────────────────────
export const pipelinePhases = [
  {
    id: "resume",
    phase: 1,
    label: "Resume",
    tool: "Resume Builder",
    href: null, // coming-soon
    status: "coming-soon",
    launchAt: get28DaysLaunchDate(),
    color: "violet",
    tip: "Your resume is your first impression. A targeted, ATS-ready resume is the foundation of everything.",
  },
  {
    id: "ats",
    phase: 2,
    label: "ATS Check",
    tool: "ATS Checker",
    href: "https://ats.careersenseai.com/",
    status: "live",
    color: "cyan",
    tip: "Before applying anywhere, know your ATS score. Most resumes fail before a human ever sees them.",
  },
  {
    id: "skills",
    phase: 3,
    label: "Certifi",
    tool: "Certifi",
    href: "https://certifi.careersenseai.com/",
    status: "live",
    color: "emerald",
    tip: "Verified credentials are your proof layer. They turn claims on a resume into undeniable evidence.",
  },
  {
    id: "coverletter",
    phase: 4,
    label: "Cover Letter",
    tool: "Cover Letter Builder",
    href: "https://coverletter.careersenseai.com/",
    status: "live",
    color: "blue",
    tip: "A tailored cover letter doubles your chances. It's the only place to show personality before the interview.",
  },
  {
    id: "interview",
    phase: 5,
    label: "Interview",
    tool: "Interview Simulator",
    href: null, // coming-soon
    status: "coming-soon",
    launchAt: get28DaysLaunchDate(),
    color: "orange",
    tip: "Most candidates walk in underprepared. The simulator gives you role-specific practice with real feedback.",
  },
];

// ── Readiness Levels ─────────────────────────────────────────
export const gpsReadinessLevels = [
  {
    min: 0,
    max: 39,
    label: "Career Launch Pad",
    color: "red",
    summary: "Your journey is just beginning. The tools below will build the foundations you need to start landing interviews.",
  },
  {
    min: 40,
    max: 59,
    label: "Building Momentum",
    color: "amber",
    summary: "You've started, but some key gaps could be costing you opportunities. Focused effort in the right areas will accelerate your progress significantly.",
  },
  {
    min: 60,
    max: 74,
    label: "Nearly Job-Ready",
    color: "yellow",
    summary: "Solid foundations in place. A few targeted improvements can make you meaningfully more competitive in your market.",
  },
  {
    min: 75,
    max: 89,
    label: "Job Ready",
    color: "emerald",
    summary: "You're well-prepared for active applications. Refine the gaps and you'll be in strong shape for most roles you target.",
  },
  {
    min: 90,
    max: 100,
    label: "Career-Optimized",
    color: "cyan",
    summary: "You have a strong, structured approach. Your challenge now is standing out — not getting through the door.",
  },
];

// ── Archetype-Aware Action Plans ────────────────────────────
export const archetypeActionPlans = {
  fresh: {
    actions: [
      {
        priority: 1,
        title: "Prove your skills first, then apply",
        body: "For a Fresh Grad, credentials do the heavy lifting that experience can't yet. Before mass-applying, earn a verifiable certificate in your target domain — it signals seriousness to employers scanning 200+ resumes.",
        cta: "Assess & Certify",
        tool: "skills",
        phaseId: "skills",
      },
      {
        priority: 2,
        title: "Build a targeted resume, not a history list",
        body: "Your resume should answer one question: 'Why you, for this role?' Every line should point toward your target position — even if you have limited experience. Projects, coursework, and certifications count.",
        cta: "Build Resume",
        tool: "resume",
        phaseId: "resume",
      },
      {
        priority: 3,
        title: "Check your ATS score before hitting submit",
        body: "70% of resumes are filtered out by ATS before a human sees them. As a newcomer, you can't afford this. Run every application through an ATS checker to ensure your keywords and format clear the filter.",
        cta: "Check ATS Score",
        tool: "ats",
        phaseId: "ats",
      },
    ],
  },
  switcher: {
    actions: [
      {
        priority: 1,
        title: "Rewrite your story for the new industry",
        body: "Your past experience is valuable — but it needs to be re-framed in the language of your target domain. A Career Switcher's resume must translate transferable skills into the terminology employers in the new field recognize.",
        cta: "Rebuild Resume",
        tool: "resume",
        phaseId: "resume",
      },
      {
        priority: 2,
        title: "Fill the credential gap with verifiable proof",
        body: "Employers hiring switchers need to see that you've invested in the new domain. A targeted certification in your new field closes the credibility gap that your work history alone can't — faster than any other approach.",
        cta: "Earn a Certificate",
        tool: "skills",
        phaseId: "skills",
      },
      {
        priority: 3,
        title: "Write cover letters that explain the switch compellingly",
        body: "For a switcher, the cover letter is not optional — it's your best shot to own the narrative. AI-powered cover letters can frame your career change as a deliberate, strategic advantage rather than a gap.",
        cta: "Build Cover Letter",
        tool: "coverletter",
        phaseId: "coverletter",
      },
    ],
  },
  climber: {
    actions: [
      {
        priority: 1,
        title: "Quantify leadership and impact, not just tasks",
        body: "At the senior level, 'what you did' is less important than 'what changed because of you.' Rebuild your resume around leadership impact, scale, and business outcomes — not job responsibilities.",
        cta: "Rebuild Resume",
        tool: "resume",
        phaseId: "resume",
      },
      {
        priority: 2,
        title: "Prepare for senior-level interview patterns",
        body: "Senior interviews go deeper — they test strategic thinking, leadership under pressure, and cross-functional influence. Consistent structured practice with feedback is the only way to build this reliably.",
        cta: "Practice Interviews",
        tool: "interview",
        phaseId: "interview",
      },
      {
        priority: 3,
        title: "Validate advanced skills with industry-recognized credentials",
        body: "Senior roles attract strong competition. A verified credential in a high-demand skill (cloud, data, leadership frameworks) adds a layer of proof that separates 'experienced' candidates from truly qualified ones.",
        cta: "Earn a Certificate",
        tool: "skills",
        phaseId: "skills",
      },
    ],
  },
  returner: {
    actions: [
      {
        priority: 1,
        title: "Update your resume — bridge the gap with honesty and recency",
        body: "Career gaps are not the liability they once were. Your resume needs to show what you've done recently (even informally) and position the gap as a human reality, not a red flag. Recency of skills matters most.",
        cta: "Rebuild Resume",
        tool: "resume",
        phaseId: "resume",
      },
      {
        priority: 2,
        title: "Prove you're current with fresh certifications",
        body: "Nothing says 'I'm back and up to date' like a recent credential in your domain. Employers screening returners look for signals of current relevance — certifications from the past 3–6 months send exactly that signal.",
        cta: "Earn a Certificate",
        tool: "skills",
        phaseId: "skills",
      },
      {
        priority: 3,
        title: "Prepare your 'return story' for interviews",
        body: "Every interviewer will ask about your gap. A practiced, confident, honest answer that pivots quickly to your current readiness is the difference between getting the offer and ending the conversation. Practice it until it's natural.",
        cta: "Practice Interviews",
        tool: "interview",
        phaseId: "interview",
      },
    ],
  },
};

export function getReadinessLevel(score) {
  return (
    gpsReadinessLevels.find((l) => score >= l.min && score <= l.max) ||
    gpsReadinessLevels[0]
  );
}

// ── Score Calculator ─────────────────────────────────────────
export function calculateGpsResults(answers) {
  const categoryTotals = {};
  const categoryMaximums = {};

  gpsQuestions.forEach((q) => {
    categoryTotals[q.category] = (categoryTotals[q.category] || 0) + (answers[q.id] || 0);
    categoryMaximums[q.category] =
      (categoryMaximums[q.category] || 0) + Math.max(...q.options.map((o) => o.score));
  });

  const categoryScores = Object.keys(gpsCategories).reduce((result, cat) => {
    const earned = categoryTotals[cat] || 0;
    const maximum = categoryMaximums[cat] || 1;
    result[cat] = Math.round((earned / maximum) * 100);
    return result;
  }, {});

  const overallScore = Math.round(
    Object.values(categoryScores).reduce((sum, s) => sum + s, 0) /
      Object.values(categoryScores).length
  );

  const readinessLevel = getReadinessLevel(overallScore);

  const sortedCategories = Object.entries(categoryScores)
    .sort(([, a], [, b]) => a - b)
    .map(([cat]) => cat);

  return { categoryScores, overallScore, readinessLevel, sortedCategories };
}

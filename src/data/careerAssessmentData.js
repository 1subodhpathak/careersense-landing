export const assessmentCategories = {
  resume: {
    label: "Resume Readiness",
    shortLabel: "Resume",
    description: "How clearly and effectively your resume presents your experience.",
  },
  ats: {
    label: "ATS Readiness",
    shortLabel: "ATS",
    description: "How well your application is optimized for applicant tracking systems.",
  },
  interview: {
    label: "Interview Readiness",
    shortLabel: "Interview",
    description: "How prepared and confident you are for real interviews.",
  },
  skills: {
    label: "Skills Readiness",
    shortLabel: "Skills",
    description: "How well your skills match the roles you are targeting.",
  },
  direction: {
    label: "Career Direction",
    shortLabel: "Direction",
    description: "How clear and focused your career goals and action plan are.",
  },
};

export const assessmentQuestions = [
  {
    id: "resume-updated",
    category: "resume",
    question: "How recently did you update your resume?",
    options: [
      { label: "More than a year ago", score: 0 },
      { label: "Within the last year", score: 1 },
      { label: "Within the last 3 months", score: 2 },
      { label: "I update it for every major application", score: 3 },
    ],
  },
  {
    id: "resume-targeted",
    category: "resume",
    question: "How often do you tailor your resume for a role?",
    options: [
      { label: "Never", score: 0 },
      { label: "Only for important applications", score: 1 },
      { label: "For most applications", score: 2 },
      { label: "For every application", score: 3 },
    ],
  },
  {
    id: "resume-impact",
    category: "resume",
    question: "How strongly does your resume show measurable impact?",
    options: [
      { label: "It mostly lists responsibilities", score: 0 },
      { label: "A few achievements include results", score: 1 },
      { label: "Most roles include measurable outcomes", score: 2 },
      { label: "Every major achievement is clear and quantified", score: 3 },
    ],
  },
  {
    id: "ats-keywords",
    category: "ats",
    question: "How do you use job-description keywords?",
    options: [
      { label: "I do not use them intentionally", score: 0 },
      { label: "I copy a few common terms", score: 1 },
      { label: "I match relevant skills and responsibilities", score: 2 },
      { label: "I systematically optimize each application", score: 3 },
    ],
  },
  {
    id: "ats-format",
    category: "ats",
    question: "How ATS-friendly is your resume format?",
    options: [
      { label: "I am not sure", score: 0 },
      { label: "It uses a visually designed template", score: 1 },
      { label: "It is simple and mostly ATS-friendly", score: 2 },
      { label: "It has been tested with an ATS checker", score: 3 },
    ],
  },
  {
    id: "ats-score",
    category: "ats",
    question: "Have you checked your resume against a target role?",
    options: [
      { label: "Never", score: 0 },
      { label: "I have used a general resume checker", score: 1 },
      { label: "I have checked it for a few roles", score: 2 },
      { label: "I check every important application", score: 3 },
    ],
  },
  {
    id: "interview-practice",
    category: "interview",
    question: "How often do you practise interview answers?",
    options: [
      { label: "Rarely or never", score: 0 },
      { label: "Only before an interview", score: 1 },
      { label: "A few times each month", score: 2 },
      { label: "I practise consistently with feedback", score: 3 },
    ],
  },
  {
    id: "interview-stories",
    category: "interview",
    question: "How prepared are your achievement stories?",
    options: [
      { label: "I usually answer spontaneously", score: 0 },
      { label: "I have a few examples in mind", score: 1 },
      { label: "I have structured examples for key skills", score: 2 },
      { label: "I have strong STAR stories for most question types", score: 3 },
    ],
  },
  {
    id: "interview-confidence",
    category: "interview",
    question: "How confident do you feel in interviews?",
    options: [
      { label: "Very nervous and unprepared", score: 0 },
      { label: "Somewhat nervous", score: 1 },
      { label: "Generally confident", score: 2 },
      { label: "Confident, structured, and adaptable", score: 3 },
    ],
  },
  {
    id: "skills-gap",
    category: "skills",
    question: "How clearly do you understand your skill gaps?",
    options: [
      { label: "I do not know my gaps", score: 0 },
      { label: "I have a general idea", score: 1 },
      { label: "I know the major gaps for my target role", score: 2 },
      { label: "I track and actively close specific gaps", score: 3 },
    ],
  },
  {
    id: "skills-proof",
    category: "skills",
    question: "How well can you prove your skills?",
    options: [
      { label: "Mostly through claims on my resume", score: 0 },
      { label: "I have a few course certificates", score: 1 },
      { label: "I have projects or assessments for key skills", score: 2 },
      { label: "I have strong projects, assessments, and evidence", score: 3 },
    ],
  },
  {
    id: "skills-learning",
    category: "skills",
    question: "How consistently are you building relevant skills?",
    options: [
      { label: "I am not learning consistently", score: 0 },
      { label: "I learn when a need comes up", score: 1 },
      { label: "I follow a regular learning plan", score: 2 },
      { label: "I follow a role-specific plan and track progress", score: 3 },
    ],
  },
  {
    id: "direction-role",
    category: "direction",
    question: "How clear is your target role?",
    options: [
      { label: "I am not sure which role to pursue", score: 0 },
      { label: "I am considering several unrelated roles", score: 1 },
      { label: "I have one or two related target roles", score: 2 },
      { label: "I have a clearly defined primary target role", score: 3 },
    ],
  },
  {
    id: "direction-plan",
    category: "direction",
    question: "Do you have a structured career action plan?",
    options: [
      { label: "No plan yet", score: 0 },
      { label: "I have a rough list of things to do", score: 1 },
      { label: "I have priorities and a timeline", score: 2 },
      { label: "I follow and review a clear weekly plan", score: 3 },
    ],
  },
  {
    id: "direction-tracking",
    category: "direction",
    question: "How do you track your applications and progress?",
    options: [
      { label: "I do not track them", score: 0 },
      { label: "I track applications informally", score: 1 },
      { label: "I use a spreadsheet or tracker", score: 2 },
      { label: "I track applications, outcomes, and improvements", score: 3 },
    ],
  },
];

export const readinessLevels = [
  {
    min: 0,
    max: 39,
    label: "Getting Started",
    summary:
      "You have a clear opportunity to strengthen your career foundations before applying at scale.",
  },
  {
    min: 40,
    max: 59,
    label: "Building Foundations",
    summary:
      "You have started preparing, but a few important gaps may still reduce your chances.",
  },
  {
    min: 60,
    max: 74,
    label: "Nearly Ready",
    summary:
      "Your foundations are solid. Focused improvements can make you significantly more competitive.",
  },
  {
    min: 75,
    max: 89,
    label: "Job Ready",
    summary:
      "You are well prepared for active applications and interviews, with a few areas left to refine.",
  },
  {
    min: 90,
    max: 100,
    label: "Career Ready",
    summary:
      "You have a strong, structured approach across applications, skills, interviews, and career planning.",
  },
];

export const toolRecommendations = {
  resume: {
    title: "Strengthen your resume",
    description:
      "Build a focused, achievement-driven resume aligned with your target role.",
    cta: "Build My Resume",
    href: "/resume-builder",
    status: "coming-soon",
    launchAt: "2026-08-01T10:00:00+05:30",
  },
  ats: {
    title: "Improve your ATS score",
    description:
      "Compare your resume with a job description and uncover missing keywords.",
    cta: "Check My ATS Score",
    href: "https://ats.careersenseai.com/",
    status: "live",
  },
  interview: {
    title: "Practise with an AI interviewer",
    description:
      "Get role-specific questions, structured feedback, and confidence-building practice.",
    cta: "Start Interview Practice",
    href: "/interview-simulator",
    status: "coming-soon",
    launchAt: "2026-09-04T10:00:00+05:30",
  },
  skills: {
    title: "Validate your skills",
    description:
      "Identify skill gaps and prove your strengths through assessments and certifications.",
    cta: "Assess My Skills",
    href: "https://certifi.careersenseai.com/",
    status: "live",
  },
  direction: {
    title: "Create your career roadmap",
    description:
      "Turn your target role into a practical, personalized action plan.",
    cta: "Open My Dashboard",
    href: "/dashboard",
    status: "internal",
  },
};

import {
  Award,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  FileText,
  Gauge,
  GraduationCap,
  Lightbulb,
  MessagesSquare,
  PenLine,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  UploadCloud,
  Users,
} from "lucide-react";

export const navLinks = [
  "Home",
  "Resume Builder",
  "Cover Letter Builder",
  "ATS Checker",
  "Interview Simulator",
  "Certifications",
  "For Colleges",
  "Pricing",
];

export const stats = [
  { icon: BarChart3, value: "ATS", label: "Resume Analysis" },
  { icon: MessagesSquare, value: "Interview", label: "Practice" },
  { icon: Award, value: "Skill", label: "Certifications" },
  { icon: Briefcase, value: "Resume", label: "AI Builder" },
  { icon: Gauge, value: "Score", label: "Career Readiness" },
];

export const problems = [
  { icon: FileText, title: "ATS Rejection", color: "text-rose-500 bg-rose-50" },
  { icon: PenLine, title: "Generic Cover Letters", color: "text-orange-500 bg-orange-50" },
  { icon: CircleHelp, title: "Unrealistic Interview Preparation", color: "text-violet-500 bg-violet-50" },
  { icon: Trophy, title: "Hard to Prove Skills", color: "text-blue-500 bg-blue-50" },
  { icon: Gauge, title: "No Clear Career Readiness Score", color: "text-emerald-500 bg-emerald-50" },
];

export const platformFeatures = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Build ATS-friendly resumes with strong bullet points and clean formatting.",
    color: "text-teal-600 bg-teal-500",
    href: "/resume-builder",
  },
  {
    icon: PenLine,
    title: "Cover Letter Builder",
    description: "Generate personalized cover letters tailored to each role with 1-click customization.",
    color: "text-orange-600 bg-orange-500",
    href: "/cover-letter-builder",
  },
  {
    icon: SearchCheck,
    title: "ATS Score Checker",
    description: "Compare your resume with job descriptions and identify missing keywords.",
    color: "text-blue-600 bg-blue-50",
    href: "/ats-checker",
  },
  {
    icon: MessagesSquare,
    title: "Interview Simulator",
    description: "Practice realistic AI-driven interviews based on your resume or target role. Get feedback and scoring.",
    color: "text-violet-600 bg-violet-50",
    href: "/interview-simulator",
  },
  {
    icon: Award,
    title: "Skill Certification",
    description: "Validate your skills through assessments and earn shareable certificates.",
    color: "text-emerald-600 bg-emerald-50",
    href: "/skill-certification",
  },
];

const get28DaysLaunchDate = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + 28);
  return d.toISOString();
};

export const toolCards = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Build ATS-friendly resumes with strong bullet points, cleaner structure, and role-fit suggestions.",
    bullets: ["ATS-friendly formatting", "Role-based suggestions", "AI bullet improvements", "PDF export"],
    button: "Coming Soon",
    featured: false,
    href: "/resume-builder",
    status: "coming-soon",
    launchAt: get28DaysLaunchDate(),
  },
  {
    icon: MessagesSquare,
    title: "Interview Simulator",
    description: "Practice realistic interviews with tailored questions, instant feedback, and confidence-building drills.",
    bullets: ["Resume-based mode", "Position-based mode", "Custom difficulty levels", "Feedback and scoring"],
    button: "Coming Soon",
    featured: true,
    href: "/interview-simulator",
    status: "coming-soon",
    launchAt: get28DaysLaunchDate(),
  },
  {
    icon: SearchCheck,
    title: "ATS Score Checker",
    description: "Compare your resume against the job description and spot keyword, formatting, and match gaps fast.",
    bullets: ["Keyword match analysis", "Formatting checks", "JD comparison", "Improvement report"],
    button: "Check ATS for Free",
    featured: false,
    href: "https://ats.careersenseai.com/",
    status: "live",
  },
];

export const readinessMetrics = [
  { label: "Resume Quality", score: "80%", color: "text-emerald-600" },
  { label: "ATS Compatibility", score: "82%", color: "text-emerald-600" },
  { label: "JD Match", score: "76%", color: "text-blue-600" },
  { label: "Interview Readiness", score: "72%", color: "text-blue-600" },
  { label: "Skill Strength", score: "70%", color: "text-orange-500" },
  { label: "Profile Completeness", score: "85%", color: "text-emerald-600" },
];

export const steps = [
  { icon: UploadCloud, title: "Upload Current Resume", description: "Build a professional resume or upload your existing one.", color: "bg-teal-500" },
  { icon: Target, title: "Choose Your Target Job Description", description: "Select the job role you are preparing for.", color: "bg-orange-500" },
  { icon: BarChart3, title: "Get A Readiness Report", description: "Receive AI insights on ATS score, skills, and gaps.", color: "bg-violet-500" },
  { icon: Sparkles, title: "Improve Using AI Tools", description: "Use our tools to fix issues, practice, and upskill.", color: "bg-blue-600" },
  { icon: Rocket, title: "Apply With Confidence", description: "Your profile is job-ready. Go and get hired.", color: "bg-emerald-500" },
];

export const audiences = [
  { icon: GraduationCap, title: "Students and Freshers", description: "Start your career strong with resume building, skill proof, and interview practice.", color: "text-teal-600 bg-teal-50" },
  { icon: Briefcase, title: "Job Seekers", description: "Improve your profile, target the right roles, and stand out to recruiters.", color: "text-orange-600 bg-orange-50" },
  { icon: Users, title: "Working Professionals", description: "Switch roles, grow your career, and stay ahead with relevant skills and certifications.", color: "text-violet-600 bg-violet-50" },
  { icon: Building2, title: "Colleges and Training Institutes", description: "Enhance student employability with placement readiness tools and analytics.", color: "text-blue-600 bg-blue-50" },
];


export const faqs = [
  {
    question: "What is CareerSense?",
    answer: "CareerSense is an AI-powered career-readiness platform that brings together career diagnostics, resume and ATS tools, LinkedIn optimization, interview preparation, structured learning, eBooks, certifications, and professional-development programs.",
  },
  {
    question: "Who can use CareerSense?",
    answer: "CareerSense is designed for students, freshers, active job seekers, career switchers, working professionals, colleges, and training institutes.",
  },
  {
    question: "What is the Career Score Check?",
    answer: "The free Career Score Check reviews your readiness across essential hiring stages and gives you a personalized scorecard, career archetype, and prioritized action plan.",
  },
  {
    question: "How does the LinkedIn Profile Optimizer work?",
    answer: "You can analyze individual profile sections such as your headline, About section, experience, skills, services, projects, and posts. CareerSense scores the content and provides professional, ready-to-use improvements based on the details you supply.",
  },
  {
    question: "Which career tools are available?",
    answer: "CareerSense provides access to an AI Resume Builder, ATS Score Checker, Cover Letter Builder, Interview Simulator, Skill Certification tools, Career Score Check, and LinkedIn Profile Optimizer.",
  },
  {
    question: "Does CareerSense include learning resources?",
    answer: "Yes. The E-Learning library includes structured, chapter-based learning platforms and a growing collection of career and technical eBooks that can be viewed from your dashboard.",
  },
  {
    question: "What is the CareerSense Partner Program?",
    answer: "It is a selective six-month program where participants contribute to real CareerSense initiatives, collaborate with the core team and leadership, and build documented professional experience.",
  },
  {
    question: "What do selected CareerSense Partners receive?",
    answer: "Selected Partners receive an official offer letter and a verified CareerSense Partner ID after onboarding. Eligible Partners receive a relieving letter after successfully completing the program and its requirements.",
  },
  {
    question: "How can I apply for the Partner Program?",
    answer: "Open the Partner Program page and select Apply Now. Share your profile, interests, availability, preferred contribution area, and LinkedIn profile. Selection depends on profile fit and current program requirements.",
  },
  {
    question: "How can CareerSense support colleges?",
    answer: "CareerSense helps colleges strengthen placement readiness through resume and ATS support, interview preparation, skill development, certifications, and student progress tracking.",
  },
];

export const collegeBenefits = [
  "Placement readiness dashboard",
  "Student progress tracking",
  "Resume and interview support",
  "Skill certification tracking",
];

export const collegeMetrics = [
  { value: "240+", label: "Students supported" },
  { value: "1,800+", label: "Assessments done" },
  { value: "+32%", label: "Avg readiness improvement" },
  { value: "190+", label: "Certificates issued" },
];

export const collegeFeatureBullets = [
  { icon: BadgeCheck, text: "Improve placement readiness" },
  { icon: BarChart3, text: "Real-time student analytics" },
  { icon: MessagesSquare, text: "Mock interviews at scale" },
  { icon: ClipboardCheck, text: "Skill and certification tracking" },
];

export const footerColumns = [
  {
    title: "Career Tools",
    links: [
      { label: "Career Score Check", href: "/career-gps" },
      { label: "LinkedIn Optimizer", href: "/linkedin-optimizer" },
      { label: "AI Resume Builder", href: "/resume-builder" },
      { label: "ATS Score Checker", href: "https://ats.careersenseai.com/", external: true },
      { label: "Cover Letter Builder", href: "https://coverletter.careersenseai.com/", external: true },
    ],
  },
  {
    title: "Learn & Grow",
    links: [
      { label: "Partner Program", href: "/partner-program" },
      { label: "E-Learning & eBooks", href: "/dashboard" },
      { label: "Interview Simulator", href: "/interview-simulator" },
      { label: "Skill Certification", href: "https://certifi.careersenseai.com/", external: true },
      { label: "CareerSense for Colleges", href: "/#colleges" },
    ],
  },
  {
    title: "CareerSense",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Explore All Tools", href: "/#career-tools" },
      { label: "Frequently Asked Questions", href: "/#faq" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Contact Support", href: "mailto:support.careersense@gmail.com" },
    ],
  },
];

export const importedIcons = {
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Star,
};

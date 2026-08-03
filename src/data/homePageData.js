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
    answer: "CareerSense is an AI-powered career readiness platform that helps users build resumes, generate cover letters, check ATS scores, practice interviews, and earn skill certifications.",
  },
  {
    question: "Who can use CareerSense?",
    answer: "Students, freshers, job seekers, working professionals, career switchers, colleges, and training institutes can use CareerSense.",
  },
  {
    question: "Can CareerSense compare my resume with a job description?",
    answer: "Yes. You can upload your resume and compare it with a job description to get an ATS score, keyword match, and improvement suggestions.",
  },
  {
    question: "Does it help with interview preparation?",
    answer: "Yes. The interview simulator can ask questions based on your resume, target role, or job description.",
  },
  {
    question: "Are certificates included?",
    answer: "Yes. CareerSense can provide skill certifications after completing assessments.",
  },
  {
    question: "Is CareerSense useful for colleges?",
    answer: "Yes. Colleges can use CareerSense to improve student placement readiness through resume checks, mock interviews, certifications, and progress tracking.",
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
  { title: "Product", links: ["Resume Builder", "Cover Letter Builder", "ATS Checker", "Interview Simulator", "Skill Certification"] },
  { title: "Company", links: ["About Us", "For Colleges", "Pricing", "Contact Support"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Use"] },
];

export const importedIcons = {
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Star,
};

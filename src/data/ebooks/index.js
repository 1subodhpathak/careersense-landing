import practicalPythonPdf from "./Practical Python.pdf";
import gitGithubPdf from "./Git_GitHub_for_Professionals.pdf";
import sqlProfessionalsPdf from "./SQL_for_Professionals.pdf";
import statisticsProfessionalsPdf from "./Statistics_for_Data_Professionals.pdf";
import jobReadyPlanPdf from "./30_Day_Job_Ready_Plan.pdf";
import apiBeginnersPdf from "./APIs_for_Beginners.pdf";
import promptEngineeringPdf from "./Prompt_Engineering.pdf";
import resumeWritingPdf from "./Resume_Writing_for_Freshers_and_Experienced_Professionals.pdf";
import salaryNegotiationPdf from "./Salary_Negotiation.pdf";
import jobReadyThumbnail from "../../Assets/Elearnings/30-Day-Job.png";
import apiThumbnail from "../../Assets/Elearnings/API.png";
import gitThumbnail from "../../Assets/Elearnings/GIT.png";
import pythonThumbnail from "../../Assets/Elearnings/PYTHON.png";
import promptThumbnail from "../../Assets/Elearnings/Prompt.png";
import resumeThumbnail from "../../Assets/Elearnings/Resume.png";
import sqlThumbnail from "../../Assets/Elearnings/SQL.png";
import statisticsThumbnail from "../../Assets/Elearnings/Stat.png";
import salaryThumbnail from "../../Assets/Elearnings/salary.png";

export const ebooks = [
  {
    slug: "30-day-job-ready-plan",
    title: "30-Day Job-Ready Plan",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "A focused 30-day action plan to improve your resume, strengthen ATS readiness, practise interviews and build a clear career roadmap.",
    pdf: jobReadyPlanPdf,
    thumbnail: jobReadyThumbnail,
    category: "Career Readiness",
  },
  {
    slug: "practical-python",
    title: "Practical Python",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "A practical Python guide for learners building programming confidence and job-ready foundations.",
    pdf: practicalPythonPdf,
    thumbnail: pythonThumbnail,
    category: "Programming",
  },
  {
    slug: "git-github-for-professionals",
    title: "Git & GitHub for Professionals",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "A practical guide to version control, collaborative repositories and professional GitHub workflows.",
    pdf: gitGithubPdf,
    thumbnail: gitThumbnail,
    category: "Developer Tools",
  },
  {
    slug: "sql-for-professionals",
    title: "SQL for Professionals",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "Strengthen SQL querying, data analysis and database problem-solving for professional work.",
    pdf: sqlProfessionalsPdf,
    thumbnail: sqlThumbnail,
    category: "Data",
  },
  {
    slug: "statistics-for-data-professionals",
    title: "Statistics for Data Professionals",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "Learn the statistical concepts data professionals use to interpret evidence and support decisions.",
    pdf: statisticsProfessionalsPdf,
    thumbnail: statisticsThumbnail,
    category: "Data",
  },
  {
    slug: "apis-for-beginners",
    title: "APIs for Beginners",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "Understand how APIs work and learn the foundations of requests, responses, authentication and practical integrations.",
    pdf: apiBeginnersPdf,
    thumbnail: apiThumbnail,
    category: "Developer Tools",
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "Learn practical prompting techniques for clearer instructions, stronger AI outputs and reliable professional workflows.",
    pdf: promptEngineeringPdf,
    thumbnail: promptThumbnail,
    category: "Artificial Intelligence",
  },
  {
    slug: "resume-writing",
    title: "Resume Writing for Freshers and Experienced Professionals",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "Build a focused, achievement-led resume with guidance tailored to both early-career and experienced professionals.",
    pdf: resumeWritingPdf,
    thumbnail: resumeThumbnail,
    category: "Career Readiness",
  },
  {
    slug: "salary-negotiation",
    title: "Salary Negotiation",
    format: "PDF Edition",
    released: "9 Aug 2026",
    description: "Prepare your evidence, discuss compensation confidently and navigate salary negotiations professionally.",
    pdf: salaryNegotiationPdf,
    thumbnail: salaryThumbnail,
    category: "Career Growth",
  },
];

export const ebookBySlug = Object.fromEntries(ebooks.map((item) => [item.slug, item]));

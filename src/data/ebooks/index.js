import practicalPythonPdf from "./Practical Python.pdf";
import gitGithubPdf from "./Git_GitHub_for_Professionals.pdf";
import sqlProfessionalsPdf from "./SQL_for_Professionals.pdf";
import statisticsProfessionalsPdf from "./Statistics_for_Data_Professionals.pdf";
import jobReadyPlanPdf from "./30_Day_Job_Ready_Plan.pdf";
import apiBeginnersPdf from "./APIs_for_Beginners.pdf";
import promptEngineeringPdf from "./Prompt_Engineering.pdf";
import resumeWritingPdf from "./Resume_Writing_for_Freshers_and_Experienced_Professionals.pdf";
import salaryNegotiationPdf from "./Salary_Negotiation.pdf";

import bizDevPdf from "./Business_Development_B2B_Sales.pdf";
import customerResearchPdf from "./Customer_Research_User_Interviews.pdf";
import digitalMarketingPdf from "./Digital_Marketing_for_Startups.pdf";
import founderMindsetPdf from "./Founder_Mindset_Startup_Strategy.pdf";
import powerBiPdf from "./Power_BI_for_Professionals.pdf";
import productMgmtPdf from "./Product_Management_for_Professionals.pdf";
import seoPdf from "./SEO_for_Professionals.pdf";
import softwareQaPdf from "./Software_QA_Product_Testing.pdf";
import startupOpsPdf from "./Startup_Operations_for_Beginners.pdf";
import uiUxDesignPdf from "./UI_UX_Design_with_Figma.pdf";

import jobReadyThumbnail from "../../Assets/Elearnings/30-Day-Job.png";
import apiThumbnail from "../../Assets/Elearnings/API.png";
import gitThumbnail from "../../Assets/Elearnings/GIT.png";
import pythonThumbnail from "../../Assets/Elearnings/PYTHON.png";
import promptThumbnail from "../../Assets/Elearnings/Prompt.png";
import resumeThumbnail from "../../Assets/Elearnings/Resume.png";
import sqlThumbnail from "../../Assets/Elearnings/SQL.png";
import statisticsThumbnail from "../../Assets/Elearnings/Stat.png";
import salaryThumbnail from "../../Assets/Elearnings/salary.png";

import bizDevThumbnail from "../../Assets/Elearnings/Business Development.png";
import customerResearchThumbnail from "../../Assets/Elearnings/Customer Research.png";
import digitalMarketingThumbnail from "../../Assets/Elearnings/DigitalMarketing.png";
import founderMindsetThumbnail from "../../Assets/Elearnings/Founder Mindset.png";
import powerBiThumbnail from "../../Assets/Elearnings/PowerBI.png";
import productMgmtThumbnail from "../../Assets/Elearnings/Product Management.png";
import seoThumbnail from "../../Assets/Elearnings/SEO.png";
import softwareQaThumbnail from "../../Assets/Elearnings/Software QA.png";
import startupOpsThumbnail from "../../Assets/Elearnings/StartupOperations.png";
import uiUxDesignThumbnail from "../../Assets/Elearnings/UI_UX Design.png";

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
  {
    slug: "business-development-b2b-sales",
    title: "Business Development & B2B Sales",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Master strategic B2B sales pipelines, client acquisition techniques, partnership building, and revenue growth strategies.",
    pdf: bizDevPdf,
    thumbnail: bizDevThumbnail,
    category: "Business & Sales",
  },
  {
    slug: "customer-research-user-interviews",
    title: "Customer Research & User Interviews",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Conduct actionable user interviews, analyze customer feedback loops, and extract key insights to shape product strategy.",
    pdf: customerResearchPdf,
    thumbnail: customerResearchThumbnail,
    category: "Product & Research",
  },
  {
    slug: "digital-marketing-for-startups",
    title: "Digital Marketing for Startups",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Build high-impact digital marketing campaigns, growth loops, and channel strategies optimized for early-stage startup growth.",
    pdf: digitalMarketingPdf,
    thumbnail: digitalMarketingThumbnail,
    category: "Marketing",
  },
  {
    slug: "founder-mindset-startup-strategy",
    title: "Founder Mindset & Startup Strategy",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Develop strategic founder decision-making skills, business model validation, scaling frameworks, and startup execution principles.",
    pdf: founderMindsetPdf,
    thumbnail: founderMindsetThumbnail,
    category: "Entrepreneurship",
  },
  {
    slug: "power-bi-for-professionals",
    title: "Power BI for Professionals",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Transform raw data into interactive dashboards, master DAX expressions, and build enterprise-level Power BI reports.",
    pdf: powerBiPdf,
    thumbnail: powerBiThumbnail,
    category: "Data & Analytics",
  },
  {
    slug: "product-management-for-professionals",
    title: "Product Management for Professionals",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Learn end-to-end product lifecycle management, roadmap prioritization, user story drafting, and cross-functional team leadership.",
    pdf: productMgmtPdf,
    thumbnail: productMgmtThumbnail,
    category: "Product Management",
  },
  {
    slug: "seo-for-professionals",
    title: "SEO for Professionals",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Master technical SEO, keyword architecture, content optimization, and backlink strategies to drive organic search traffic.",
    pdf: seoPdf,
    thumbnail: seoThumbnail,
    category: "Marketing",
  },
  {
    slug: "software-qa-product-testing",
    title: "Software QA & Product Testing",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Comprehensive guide to manual and automated software quality assurance, test case execution, and defect lifecycle tracking.",
    pdf: softwareQaPdf,
    thumbnail: softwareQaThumbnail,
    category: "Software Engineering",
  },
  {
    slug: "startup-operations-for-beginners",
    title: "Startup Operations for Beginners",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Understand foundational startup operational workflows, process automation, team alignment, and resource management.",
    pdf: startupOpsPdf,
    thumbnail: startupOpsThumbnail,
    category: "Operations",
  },
  {
    slug: "ui-ux-design-with-figma",
    title: "UI/UX Design with Figma",
    format: "PDF Edition",
    released: "14 Aug 2026",
    description: "Design modern user interfaces, component design systems, interactive prototypes, and wireframes using Figma.",
    pdf: uiUxDesignPdf,
    thumbnail: uiUxDesignThumbnail,
    category: "Design",
  },
];

export const ebookBySlug = Object.fromEntries(ebooks.map((item) => [item.slug, item]));

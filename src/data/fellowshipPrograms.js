import { fellowshipAssignments, fellowshipPhases } from "./fellowships/index.js";

export const fellowshipPrograms = [
  {
    id: "data-analyst",
    name: "Data Analyst",
    short: "SQL, dashboards and business insight",
    accent: "#2563eb",
    soft: "#eff6ff",
    skills: ["SQL", "Excel", "Power BI", "Tableau"],
    outcome: "Turn raw information into clear decisions and stakeholder-ready dashboards.",
    capstone: "Build an executive analytics dashboard from a real-world business dataset.",
  },
  {
    id: "data-science",
    name: "Data Science",
    short: "Python, statistics and machine learning",
    accent: "#059669",
    soft: "#ecfdf5",
    skills: ["Python", "Pandas", "Statistics", "Machine Learning"],
    outcome: "Investigate data, test hypotheses and create defensible predictive models.",
    capstone: "Develop and communicate an end-to-end predictive modelling study.",
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    short: "LLMs, applied AI and responsible systems",
    accent: "#7c3aed",
    soft: "#f5f3ff",
    skills: ["Python", "OpenAI", "NLP", "Responsible AI"],
    outcome: "Prototype useful AI experiences with evaluation, safety and documentation built in.",
    capstone: "Ship an evaluated AI assistant for a practical career or business workflow.",
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    short: "Research, flows and high-fidelity prototypes",
    accent: "#c026d3",
    soft: "#fdf4ff",
    skills: ["Figma", "Research", "Prototyping", "Accessibility"],
    outcome: "Translate user evidence into accessible, testable product experiences.",
    capstone: "Research and redesign a complete digital product journey with a tested prototype.",
  },
  {
    id: "app-development",
    name: "App Development",
    short: "Flutter, mobile architecture and release",
    accent: "#db2777",
    soft: "#fdf2f8",
    skills: ["Flutter", "Dart", "APIs", "Mobile UX"],
    outcome: "Build reliable, responsive mobile experiences connected to real services.",
    capstone: "Create a production-minded mobile application with authentication and APIs.",
  },
  {
    id: "full-stack-development",
    name: "Full Stack Development",
    short: "React, Node.js and production delivery",
    accent: "#d97706",
    soft: "#fffbeb",
    skills: ["React", "Node.js", "Databases", "Deployment"],
    outcome: "Design, build and deploy complete web products across frontend and backend.",
    capstone: "Deliver a deployed full-stack product with authentication, data and documentation.",
  },
];

export function assignmentsFor(program) {
  return fellowshipAssignments[program.id] || [];
}

export function phasesFor(program) {
  return fellowshipPhases[program.id] || null;
}

export const fellowshipFee = 2000;
export const fellowshipDurationDays = 90;
export const fellowshipJoiningDelayDays = 7;
export const fellowshipPassScore = 75;
export const fellowshipAttendanceMinimum = 75;

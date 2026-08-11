export const optimizerSections = [
  { id: "headline", label: "Headline", short: "Headline" },
  { id: "about", label: "About", short: "About" },
  { id: "experience", label: "Experience", short: "Experience" },
  { id: "skills", label: "Top Skills", short: "Skills" },
  { id: "services", label: "Services", short: "Services" },
  { id: "projects", label: "Projects", short: "Projects" },
  { id: "posts", label: "Post Ideas", short: "Posts" },
  { id: "overall", label: "Overall Score", short: "Score" },
];

export const sectionConfig = {
  headline: {
    title: "Make your first impression searchable",
    description: "Your headline follows you through search, comments and connection requests. Make every character earn its place.",
    label: "Current LinkedIn headline",
    placeholder: "e.g. Analytics Manager | Turning data into decisions | SQL, Power BI & Strategy",
    min: 20,
    max: 220,
  },
  about: {
    title: "Turn your career story into a reason to connect",
    description: "We assess the opening, credibility, proof, keywords and closing—not just grammar.",
    label: "Current About section",
    placeholder: "Paste your full LinkedIn About section here…",
    min: 80,
    max: 2600,
  },
  experience: {
    title: "Show the impact behind the responsibilities",
    description: "Add your role and bullets. We look for ownership, measurable results, role keywords and recruiter-friendly structure.",
    label: "Experience description or bullet points",
    placeholder: "Paste one role at a time. Include responsibilities, projects, outcomes and any numbers you can share…",
    min: 60,
    max: 3200,
  },
  projects: {
    title: "Make your projects prove what you can do",
    description: "Strong project entries connect the problem, your contribution, the tools used and the result.",
    label: "Project details",
    placeholder: "Project name, objective, your contribution, tools or skills, outcome and link (if available)…",
    min: 60,
    max: 2400,
  },
};

export const scoreWeights = {
  headline: 15,
  about: 15,
  experience: 25,
  skills: 15,
  services: 10,
  projects: 10,
};

export function scoreTier(score) {
  if (score >= 85) return { label: "Exceptional", color: "emerald" };
  if (score >= 70) return { label: "Strong", color: "blue" };
  if (score >= 55) return { label: "Building", color: "amber" };
  return { label: "Needs work", color: "rose" };
}

const actionVerbs = ["led", "built", "created", "launched", "delivered", "improved", "increased", "reduced", "managed", "designed", "developed", "optimized", "automated", "grew", "drove"];
const filler = ["hardworking", "passionate", "results-driven", "team player", "go-getter", "responsible for", "helped with"];
const hasNumber = (text) => /\b\d+(?:\.\d+)?\s*(?:%|x|k|m|hours?|days?|users?|clients?|projects?|₹|\$)?\b/i.test(text);
const countMatches = (text, words) => words.filter((word) => text.toLowerCase().includes(word)).length;

function feedbackItem(tone, title, detail) {
  return { tone, title, detail };
}

export function localAnalyze(section, values) {
  const text = (values[section] || "").trim();
  const target = values.targetRole || "Experienced";
  const industry = values.industry || "cross-functional environments";
  const words = text.split(/\s+/).filter(Boolean);
  const numbers = hasNumber(text);
  const verbCount = countMatches(text, actionVerbs);
  const fillerCount = countMatches(text, filler);
  let score = 48;
  let criteria = [];
  let rewrite = text;

  if (section === "headline") {
    score = 38;
    const goodLength = text.length >= 70 && text.length <= 200;
    const separators = /[|•—]/.test(text);
    const hasTarget = values.targetRole && text.toLowerCase().includes(values.targetRole.toLowerCase().split(" ")[0]);
    score += goodLength ? 18 : 7;
    score += separators ? 12 : 4;
    score += hasTarget ? 16 : 7;
    score += numbers ? 12 : 3;
    score += fillerCount === 0 ? 4 : 0;
    criteria = [
      feedbackItem(goodLength ? "strong" : "tip", goodLength ? "Length supports discovery" : "Use more of the available space", goodLength ? `${text.length} characters gives you room for role, expertise and value.` : "Aim for roughly 100–200 characters without keyword stuffing."),
      feedbackItem(separators ? "strong" : "tip", separators ? "Easy to scan" : "Separate your positioning", "Use dividers to distinguish your role, specialty and outcome."),
      feedbackItem(numbers ? "strong" : "fix", numbers ? "Credibility is visible" : "Add one proof point", numbers ? "A concrete figure makes the claim more believable." : "Add scale, years, users, revenue or a measurable improvement if it is factual."),
    ];
    const role = values.targetRole || text.split(/[|—]/)[0].trim();
    const focus = values.industry || "Business Growth";
    rewrite = `${role} | ${focus} | Turning expertise into clear, practical business outcomes`;
  }

  if (section === "about") {
    score = 35 + Math.min(18, Math.round(words.length / 8)) + (numbers ? 16 : 3) + (words.length >= 120 ? 12 : 4) + (fillerCount === 0 ? 8 : 2) + (/connect|reach out|message/i.test(text) ? 8 : 2);
    criteria = [
      feedbackItem(words.length >= 120 ? "strong" : "tip", "Professional story depth", `${words.length} words ${words.length >= 120 ? "creates enough room for context and proof." : "is brief; add context, strengths and evidence."}`),
      feedbackItem(numbers ? "strong" : "fix", numbers ? "Evidence strengthens the story" : "No measurable proof yet", numbers ? "Your outcomes give readers a reason to trust the positioning." : "Add one or two factual metrics rather than relying only on descriptive claims."),
      feedbackItem(/connect|reach out|message/i.test(text) ? "strong" : "tip", "Close with direction", "Tell the right reader what topics, opportunities or conversations you welcome."),
    ];
    const cleanAbout = text.replace(/\s+/g, " ").trim();
    rewrite = `${target} professional with experience in ${industry}, focused on solving complex challenges with clarity, collaboration and practical execution.\n\n${cleanAbout}\n\nI value thoughtful work, continuous learning and opportunities to create meaningful results. Open to conversations about ${target} opportunities, industry ideas and professional collaborations.`;
  }

  if (section === "experience") {
    const bulletLines = text.split(/\n/).filter((line) => line.trim()).length;
    score = 32 + Math.min(20, verbCount * 4) + (numbers ? 24 : 4) + (bulletLines >= 3 ? 12 : 5) + (fillerCount === 0 ? 8 : 2);
    criteria = [
      feedbackItem(verbCount >= 3 ? "strong" : "tip", "Action-led language", `${verbCount} recognizable action verbs found. Start every bullet with a precise verb.`),
      feedbackItem(numbers ? "strong" : "fix", numbers ? "Impact is quantified" : "Results need scale", numbers ? "Numbers make the contribution easier to evaluate." : "Add time saved, revenue, efficiency, audience, quality or delivery metrics where truthful."),
      feedbackItem(bulletLines >= 3 ? "strong" : "tip", "Recruiter scanability", `${bulletLines} content lines detected. Keep the strongest 4–6 achievement bullets.`),
    ];
    const experienceLines = text.split(/\n|[•▪■]/).map((line) => line.trim()).filter(Boolean);
    rewrite = experienceLines.map((line) => {
      const cleaned = line.replace(/^[-–—•▪■]+\s*/, "").replace(/[.;]+$/, "");
      const startsStrong = actionVerbs.some((verb) => cleaned.toLowerCase().startsWith(verb));
      return `• ${startsStrong ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1) : `Managed ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`}.`;
    }).slice(0, 7).join("\n");
  }

  if (section === "projects") {
    score = 38 + (numbers ? 22 : 5) + (/built|created|designed|developed|launched/i.test(text) ? 15 : 5) + (/using|with|tools?|tech/i.test(text) ? 12 : 4) + (/result|impact|improv|reduc|increas/i.test(text) ? 13 : 4);
    criteria = [
      feedbackItem(/built|created|designed|developed|launched/i.test(text) ? "strong" : "tip", "Your contribution", "State exactly what you owned, built or decided."),
      feedbackItem(numbers ? "strong" : "fix", numbers ? "Outcome is concrete" : "Add an outcome", "Connect the finished work to a user, business or learning result."),
      feedbackItem(/using|with|tools?|tech/i.test(text) ? "strong" : "tip", "Skills are discoverable", "Name the most relevant tools and methods naturally."),
    ];
    const projectCopy = text.replace(/\s+/g, " ").trim();
    const projectTitle = text.split(/[.\n]/)[0].replace(/^[-–—•▪■]+\s*/, "").trim().slice(0, 90) || "Professional Project";
    rewrite = `${projectTitle}\n\n${projectCopy}\n\nThis project demonstrates practical problem-solving, ownership and the ability to turn an objective into a completed body of work.`;
  }

  return {
    score: Math.max(25, Math.min(96, Math.round(score))),
    summary: score >= 75 ? "A credible foundation with a few high-value refinements." : "The substance is here; clearer proof and positioning will make it work harder.",
    feedback: criteria,
    rewrite,
    source: "CareerSense diagnostic",
  };
}

const roleSkills = {
  data: ["Data Analysis", "SQL", "Data Visualization", "Business Intelligence", "Dashboard Development", "Statistical Analysis", "Data Storytelling", "Python", "Stakeholder Management", "Process Optimization"],
  product: ["Product Strategy", "Product Roadmapping", "User Research", "Agile Methodologies", "Market Analysis", "Product Analytics", "Go-to-Market Strategy", "Cross-functional Leadership", "Prioritization", "Stakeholder Management"],
  marketing: ["Digital Marketing", "Content Strategy", "Campaign Management", "SEO", "Marketing Analytics", "Brand Strategy", "Social Media Marketing", "Lead Generation", "Customer Insights", "Copywriting"],
  software: ["Software Development", "System Design", "JavaScript", "API Development", "Cloud Computing", "Git", "Testing", "Performance Optimization", "Technical Leadership", "Agile Methodologies"],
  design: ["User Experience Design", "User Interface Design", "Design Systems", "Prototyping", "User Research", "Figma", "Interaction Design", "Usability Testing", "Visual Design", "Product Strategy"],
};

export function generateSkills(values) {
  const haystack = `${values.targetRole} ${values.industry} ${values.experience}`.toLowerCase();
  const key = Object.keys(roleSkills).find((item) => haystack.includes(item)) || "data";
  return roleSkills[key].map((name, index) => ({ name, relevance: index < 4 ? "Core" : index < 8 ? "High" : "Supporting", reason: index < 4 ? "Central to your target positioning" : "Supported by your experience context" }));
}

export function generateServices(values) {
  const base = generateSkills(values);
  return base.map((skill, index) => ({
    name: index % 2 === 0 ? `${skill.name} Consulting` : `${skill.name} Solutions`,
    description: `Help teams apply ${skill.name.toLowerCase()} to solve a defined business challenge and create a measurable, practical outcome.`,
    audience: values.industry ? `${values.industry} teams` : "Growing teams and professionals",
  }));
}

export function generatePostIdeas(values) {
  const topic = values.industry || values.targetRole || "your field";
  const formats = [
    ["Lesson learned", `The ${topic} mistake that changed how I approach my work`],
    ["How-to", `A practical 5-step way to solve a common ${topic} challenge`],
    ["Behind the scenes", `What a recent ${topic} project really looked like behind the polished result`],
    ["Contrarian take", `One popular ${topic} belief I would challenge—and what I do instead`],
    ["Project breakdown", `From problem to outcome: breaking down one project decision`],
    ["Data + opinion", `One number every ${topic} professional should pay attention to`],
    ["Career milestone", `What reaching my latest career milestone taught me about growth`],
    ["Framework", `The simple framework I use to make better ${topic} decisions`],
    ["Client perspective", `Three questions I ask before starting any ${topic} engagement`],
    ["Skills reflection", `The skill that looked optional early in my career—but became essential`],
  ];
  return formats.map(([type, title]) => ({ type, title, prompt: `Open with a specific moment or claim. Add one concrete example from your experience, then close with a focused question.` }));
}

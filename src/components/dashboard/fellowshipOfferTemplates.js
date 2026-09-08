// Structured registry of all 6 official CareerSense Fellowship Offer Letter templates
export const FELLOWSHIP_OFFER_TEMPLATES = {
  "data-analyst": {
    id: "data-analyst",
    trackName: "Data Analyst",
    headerTag: "DATA ANALYST FELLOWSHIP",
    title: "CAREERSENSE DATA ANALYST FELLOWSHIP OFFER LETTER",
    position: "Data Analyst Fellow",
    subject: "Offer to Join the CareerSense Data Analyst Fellowship",
    intro1: (firstName) => `We are pleased to offer you a place in the CareerSense Data Analyst Fellowship, a 3-month (12-week) hands-on learning program designed to build practical capability in data analysis, business intelligence, reporting and data storytelling. The Fellowship combines structured assignments, guided projects, mentor feedback, portfolio development and a final capstone experience.`,
    intro2: `As a Data Analyst Fellow, you will learn by doing. You will collect, clean, analyse and visualize data to answer practical business questions and communicate useful insights. You are expected to document your work professionally, reflect on feedback, and build credible evidence of your skills through projects and presentations.`,
    details: {
      position: "Data Analyst Fellow",
      engagementType: "Experiential Learning Fellowship",
      initialTerm: "3 months (12 weeks)",
      workingMode: "Remote / Online, with cohort sessions as applicable",
      timeCommitment: "Flexible and project-based; cohort milestones and sessions as communicated",
      benefits: "Learning resources, projects, mentor feedback, Fellow ID and completion recognition as applicable",
    },
    footerDisclaimer: "This offer is issued for the CareerSense Data Analyst Fellowship. Cohort dates, project briefs, tools, mentor availability, learning resources, completion requirements, or other program terms may be updated by CareerSense and communicated in writing.",
    responsibilities: [
      "Work with structured datasets and clearly document data sources, assumptions, definitions and limitations.",
      "Use Excel or Google Sheets and SQL to clean, transform, join, aggregate and validate data for analysis.",
      "Perform exploratory data analysis to identify patterns, trends, anomalies and meaningful business questions.",
      "Create clear KPIs, charts and dashboards using Power BI, Tableau or other approved visualization tools.",
      "Translate analysis into concise business insights, recommendations and stakeholder-ready summaries.",
      "Apply basic statistics and analytical reasoning appropriately, and explain methods in simple language.",
      "Maintain organized project files, queries, dashboards, documentation and versioned portfolio evidence.",
      "Complete a capstone or final analysis project that demonstrates an end-to-end data-to-insight workflow."
    ],
    intent: "Our intent is simple: help Data Analyst Fellows build practical capability, complete credible projects, strengthen their portfolio, and leave the program with clearer evidence of what they can do.",
    acceptanceRole: "CareerSense Data Analyst Fellow",
    acceptancePolicy: "CareerSense Data Analyst Fellowship",
    welcomeTagline: "Learn by doing. Turn data into decisions. Build proof of work."
  },

  "data-science": {
    id: "data-science",
    trackName: "Data Science",
    headerTag: "DATA SCIENCE FELLOWSHIP",
    title: "CAREERSENSE DATA SCIENCE FELLOWSHIP OFFER LETTER",
    position: "Data Science Fellow",
    subject: "Offer to Join the CareerSense Data Science Fellowship",
    intro1: (firstName) => `We are pleased to offer you a place in the CareerSense Data Science Fellowship, a 3-month (12-week) hands-on learning program designed to build practical capability in data science, statistics, machine learning and applied predictive analytics. The Fellowship combines structured assignments, guided projects, mentor feedback, portfolio development and a final capstone experience.`,
    intro2: `As a Data Science Fellow, you will learn by doing. You will prepare data, explore patterns, build and evaluate machine-learning models, and communicate model results responsibly. You are expected to document your work professionally, reflect on feedback, and build credible evidence of your skills through projects and presentations.`,
    details: {
      position: "Data Science Fellow",
      engagementType: "Experiential Learning Fellowship",
      initialTerm: "3 months (12 weeks)",
      workingMode: "Remote / Online, with cohort sessions as applicable",
      timeCommitment: "Flexible and project-based; cohort milestones and sessions as communicated",
      benefits: "Learning resources, projects, mentor feedback, Fellow ID and completion recognition as applicable",
    },
    footerDisclaimer: "This offer is issued for the CareerSense Data Science Fellowship. Cohort dates, project briefs, tools, mentor availability, learning resources, completion requirements, or other program terms may be updated by CareerSense and communicated in writing.",
    responsibilities: [
      "Use Python, Pandas, NumPy and related tools to prepare, clean and explore structured datasets.",
      "Apply statistical reasoning and exploratory analysis to understand relationships, distributions and data quality.",
      "Create suitable features and prepare training, validation and test data while avoiding data leakage.",
      "Build baseline and machine-learning models using appropriate algorithms and documented assumptions.",
      "Evaluate models using suitable metrics and compare results against meaningful baselines.",
      "Interpret feature importance, errors, limitations, fairness considerations and practical business implications.",
      "Create reproducible notebooks, visualizations, documentation and portfolio-ready project summaries.",
      "Complete an end-to-end capstone that frames a problem, builds a model, evaluates it and presents actionable conclusions."
    ],
    intent: "Our intent is simple: help Data Science Fellows build practical capability, complete credible projects, strengthen their portfolio, and leave the program with clearer evidence of what they can do.",
    acceptanceRole: "CareerSense Data Science Fellow",
    acceptancePolicy: "CareerSense Data Science Fellowship",
    welcomeTagline: "Learn by doing. Build models. Solve real problems."
  },

  "artificial-intelligence": {
    id: "artificial-intelligence",
    trackName: "Artificial Intelligence",
    headerTag: "ARTIFICIAL INTELLIGENCE FELLOWSHIP",
    title: "CAREERSENSE ARTIFICIAL INTELLIGENCE FELLOWSHIP OFFER LETTER",
    position: "Artificial Intelligence Fellow",
    subject: "Offer to Join the CareerSense Artificial Intelligence Fellowship",
    intro1: (firstName) => `We are pleased to offer you a place in the CareerSense Artificial Intelligence Fellowship, a 3-month (12-week) hands-on learning program designed to build practical capability in applied AI, large language models, intelligent applications, agents and model evaluation. The Fellowship combines structured assignments, guided projects, mentor feedback, portfolio development and a final capstone experience.`,
    intro2: `As a Artificial Intelligence Fellow, you will learn by doing. You will design and prototype practical AI capabilities using prompts, models, APIs, retrieval, agents and evaluation techniques. You are expected to document your work professionally, reflect on feedback, and build credible evidence of your skills through projects and presentations.`,
    details: {
      position: "Artificial Intelligence Fellow",
      engagementType: "Experiential Learning Fellowship",
      initialTerm: "3 months (12 weeks)",
      workingMode: "Remote / Online, with cohort sessions as applicable",
      timeCommitment: "Flexible and project-based; cohort milestones and sessions as communicated",
      benefits: "Learning resources, projects, mentor feedback, Fellow ID and completion recognition as applicable",
    },
    footerDisclaimer: "This offer is issued for the CareerSense Artificial Intelligence Fellowship. Cohort dates, project briefs, tools, mentor availability, learning resources, completion requirements, or other program terms may be updated by CareerSense and communicated in writing.",
    responsibilities: [
      "Build a practical foundation in AI, machine-learning concepts, modern language models and responsible AI principles.",
      "Design and test prompts, structured outputs and model interactions for clear, repeatable AI behavior.",
      "Prototype LLM-powered applications using approved model APIs, Python and suitable application frameworks.",
      "Explore retrieval-augmented generation, embeddings and vector databases where relevant to project requirements.",
      "Design AI agent or automation workflows that use tools safely and keep human review where appropriate.",
      "Evaluate output quality, reliability, failure cases, latency, cost and safety rather than relying on demos alone.",
      "Document prompts, architecture, test cases, limitations and responsible-use considerations for each project.",
      "Complete a capstone AI project that solves a real problem and demonstrates an end-to-end build, evaluation and demo."
    ],
    intent: "Our intent is simple: help Artificial Intelligence Fellows build practical capability, complete credible projects, strengthen their portfolio, and leave the program with clearer evidence of what they can do.",
    acceptanceRole: "CareerSense Artificial Intelligence Fellow",
    acceptancePolicy: "CareerSense Artificial Intelligence Fellowship",
    welcomeTagline: "Learn by doing. Build intelligent systems. Create real impact."
  },

  "full-stack-development": {
    id: "full-stack-development",
    trackName: "Full Stack Development",
    headerTag: "FULL STACK DEVELOPER FELLOWSHIP",
    title: "CAREERSENSE FULL STACK DEVELOPER FELLOWSHIP OFFER LETTER",
    position: "Full Stack Developer Fellow",
    subject: "Offer to Join the CareerSense Full Stack Developer Fellowship",
    intro1: (firstName) => `We are pleased to offer you a place in the CareerSense Full Stack Developer Fellowship, a 3-month (12-week) hands-on learning program designed to build practical capability in frontend development, backend services, APIs, databases, testing and deployment. The Fellowship combines structured assignments, guided projects, mentor feedback, portfolio development and a final capstone experience.`,
    intro2: `As a Full Stack Developer Fellow, you will learn by doing. You will design, build, test and deploy end-to-end web applications using modern frontend and backend technologies. You are expected to document your work professionally, reflect on feedback, and build credible evidence of your skills through projects and presentations.`,
    details: {
      position: "Full Stack Developer Fellow",
      engagementType: "Experiential Learning Fellowship",
      initialTerm: "3 months (12 weeks)",
      workingMode: "Remote / Online, with cohort sessions as applicable",
      timeCommitment: "Flexible and project-based; cohort milestones and sessions as communicated",
      benefits: "Learning resources, projects, mentor feedback, Fellow ID and completion recognition as applicable",
    },
    footerDisclaimer: "This offer is issued for the CareerSense Full Stack Developer Fellowship. Cohort dates, project briefs, tools, mentor availability, learning resources, completion requirements, or other program terms may be updated by CareerSense and communicated in writing.",
    responsibilities: [
      "Build responsive, accessible frontend interfaces using React, Next.js or another approved modern framework.",
      "Develop backend services and business logic using Node.js, Express or another suitable server-side stack.",
      "Design and use REST APIs with clear request/response contracts, validation, error handling and documentation.",
      "Work with SQL and/or NoSQL databases, including data modelling, queries, CRUD operations and safe migrations.",
      "Implement common application concerns such as authentication, authorization, forms and secure data handling where relevant.",
      "Use Git and GitHub professionally through branches, meaningful commits, pull requests and code reviews.",
      "Test, debug and deploy applications using suitable cloud or hosting platforms and document environment/setup requirements.",
      "Complete and demonstrate a production-style capstone application covering frontend, backend, database and deployment."
    ],
    intent: "Our intent is simple: help Full Stack Developer Fellows build practical capability, complete credible projects, strengthen their portfolio, and leave the program with clearer evidence of what they can do.",
    acceptanceRole: "CareerSense Full Stack Developer Fellow",
    acceptancePolicy: "CareerSense Full Stack Developer Fellowship",
    welcomeTagline: "Learn by doing. Build end-to-end products. Ship with confidence."
  },

  "app-development": {
    id: "app-development",
    trackName: "App Development",
    headerTag: "APP DEVELOPER FELLOWSHIP",
    title: "CAREERSENSE APP DEVELOPER FELLOWSHIP OFFER LETTER",
    position: "App Developer Fellow",
    subject: "Offer to Join the CareerSense App Developer Fellowship",
    intro1: (firstName) => `We are pleased to offer you a place in the CareerSense App Developer Fellowship, a 3-month (12-week) hands-on learning program designed to build practical capability in mobile application development, user interfaces, APIs, backend integration, testing and deployment. The Fellowship combines structured assignments, guided projects, mentor feedback, portfolio development and a final capstone experience.`,
    intro2: `As a App Developer Fellow, you will learn by doing. You will design, build, test and demonstrate practical mobile applications using modern cross-platform or native development approaches. You are expected to document your work professionally, reflect on feedback, and build credible evidence of your skills through projects and presentations.`,
    details: {
      position: "App Developer Fellow",
      engagementType: "Experiential Learning Fellowship",
      initialTerm: "3 months (12 weeks)",
      workingMode: "Remote / Online, with cohort sessions as applicable",
      timeCommitment: "Flexible and project-based; cohort milestones and sessions as communicated",
      benefits: "Learning resources, projects, mentor feedback, Fellow ID and completion recognition as applicable",
    },
    footerDisclaimer: "This offer is issued for the CareerSense App Developer Fellowship. Cohort dates, project briefs, tools, mentor availability, learning resources, completion requirements, or other program terms may be updated by CareerSense and communicated in writing.",
    responsibilities: [
      "Build mobile application screens and reusable components using React Native, Flutter or another approved framework.",
      "Translate product requirements and UI designs into clear, responsive and user-friendly mobile experiences.",
      "Integrate APIs, backend services, authentication and data persistence where required by project scope.",
      "Work with local storage and suitable databases while handling loading, offline and error states responsibly.",
      "Test applications across representative devices or screen sizes and resolve usability, performance and reliability issues.",
      "Use Git and GitHub to maintain source code, branches, commits and project documentation professionally.",
      "Understand build, release, security and app-store deployment concepts even when publishing is not required.",
      "Complete a capstone mobile application with a working demo, technical documentation and portfolio-ready presentation."
    ],
    intent: "Our intent is simple: help App Developer Fellows build practical capability, complete credible projects, strengthen their portfolio, and leave the program with clearer evidence of what they can do.",
    acceptanceRole: "CareerSense App Developer Fellow",
    acceptancePolicy: "CareerSense App Developer Fellowship",
    welcomeTagline: "Learn by doing. Build working apps. Create real impact."
  },

  "ui-ux-design": {
    id: "ui-ux-design",
    trackName: "UI/UX Design",
    headerTag: "UI/UX DESIGN FELLOWSHIP",
    title: "CAREERSENSE UI/UX DESIGN FELLOWSHIP OFFER LETTER",
    position: "UI/UX Design Fellow",
    subject: "Offer to Join the CareerSense UI/UX Design Fellowship",
    intro1: (firstName) => `We are pleased to offer you a place in the CareerSense UI/UX Design Fellowship, a 3-month (12-week) hands-on learning program designed to build practical capability in user research, UX strategy, wireframing, interface design, prototyping, usability and design systems. The Fellowship combines structured assignments, guided projects, mentor feedback, portfolio development and a final capstone experience.`,
    intro2: `As a UI/UX Design Fellow, you will learn by doing. You will research users, map journeys, design interfaces, create prototypes and communicate design decisions through strong case studies. You are expected to document your work professionally, reflect on feedback, and build credible evidence of your skills through projects and presentations.`,
    details: {
      position: "UI/UX Design Fellow",
      engagementType: "Experiential Learning Fellowship",
      initialTerm: "3 months (12 weeks)",
      workingMode: "Remote / Online, with cohort sessions as applicable",
      timeCommitment: "Flexible and project-based; cohort milestones and sessions as communicated",
      benefits: "Learning resources, projects, mentor feedback, Fellow ID and completion recognition as applicable",
    },
    footerDisclaimer: "This offer is issued for the CareerSense UI/UX Design Fellowship. Cohort dates, project briefs, tools, mentor availability, learning resources, completion requirements, or other program terms may be updated by CareerSense and communicated in writing.",
    responsibilities: [
      "Conduct structured user and product research using appropriate interviews, observations, reviews or secondary research.",
      "Translate findings into personas, problem statements, user journeys, flows and clearly prioritized experience opportunities.",
      "Create low-fidelity wireframes that explore structure, navigation, interaction and information hierarchy before visual polish.",
      "Design accessible, consistent high-fidelity interfaces in Figma using sound typography, spacing, color and component principles.",
      "Create interactive prototypes that communicate important user flows, states and product behavior.",
      "Build or extend reusable components, patterns and design-system documentation where relevant.",
      "Plan and conduct usability reviews or tests, document findings and iterate designs based on evidence.",
      "Complete a portfolio-ready UX case study showing the problem, research, process, decisions, final design and learning."
    ],
    intent: "Our intent is simple: help UI/UX Design Fellows build practical capability, complete credible projects, strengthen their portfolio, and leave the program with clearer evidence of what they can do.",
    acceptanceRole: "CareerSense UI/UX Design Fellow",
    acceptancePolicy: "CareerSense UI/UX Design Fellowship",
    welcomeTagline: "Learn by doing. Design for users. Build a strong portfolio."
  }
};

// Common terms (Sections 2 to 8) for Fellowship offer letters
export const FELLOWSHIP_COMMON_TERMS = [
  [
    "2. Learning & Project Expectations",
    "The Fellowship is practical and outcome-oriented. You are expected to stay responsive, attend required sessions, complete assigned work within reasonable timelines, submit original work, and communicate blockers or availability changes."
  ],
  [
    "3. Confidentiality",
    "Keep non-public CareerSense information confidential, including unreleased materials, private project briefs, credentials, research, business plans and restricted data. Do not share confidential information outside CareerSense without written authorization."
  ],
  [
    "4. Intellectual Property",
    "Pre-existing work remains with its owner. Unless separately agreed in writing, independently created portfolio work remains yours; CareerSense-owned briefs, brand assets, confidential information and proprietary materials remain CareerSense property. Any project specifically commissioned for CareerSense production use will have separate written ownership or licensing terms."
  ],
  [
    "5. Data Protection & Security",
    "Use CareerSense systems, datasets and learning materials responsibly. Do not copy, expose or share personal, confidential or restricted information beyond an approved task, and never share credentials or private access links. Prefer sample, synthetic, public or expressly approved data."
  ],
  [
    "6. Public Representation",
    "While your participation is active, you may accurately describe yourself as an enrolled CareerSense Fellow. You may not represent yourself as a CareerSense employee, intern, contractor or official representative, or make commitments on behalf of CareerSense unless authorized in writing."
  ],
  [
    "7. Professional Conduct",
    "Fellows must act respectfully, inclusively and professionally. Plagiarism, misrepresentation, harassment, discrimination, data misuse, credential sharing, fraud, illegal activity or conduct that materially harms CareerSense or its community may lead to removal from the Fellowship."
  ],
  [
    "8. Nature of Relationship",
    "The CareerSense Fellowship is an educational and experiential learning program. It does not create employment, internship, contractor, agency or legal partnership status and does not guarantee compensation or future employment. Any paid or employment relationship requires separate written terms."
  ]
];

// Page 3 Sections (9 to 12) for Fellowship offer letters
export const FELLOWSHIP_PAGE3_SECTIONS = [
  {
    num: "9. Learning & Mentorship Opportunities",
    text: "During the Fellowship, CareerSense may provide structured learning resources, project briefs, mentor feedback, peer or community sessions, project reviews, portfolio guidance, workshops, events or other learning opportunities depending on the cohort and availability."
  },
  {
    num: "10. Recognition",
    text: "CareerSense may issue a digital Fellow ID for active participation. Fellows who successfully complete the published requirements for the Fellowship may be eligible for a Fellowship Certificate, completion recognition, project showcase, digital badge, references, public recognition or other cohort-specific benefits. Completion recognition is not automatic and is subject to program requirements, originality, conduct and CareerSense policies."
  },
  {
    num: "11. Termination / Exit",
    text: "Either CareerSense or the Fellow may end participation by providing reasonable written notice. CareerSense may end access immediately in cases involving confidentiality breaches, misuse of systems or data, misconduct, plagiarism, repeated non-performance, misrepresentation or illegal activity. On exit, CareerSense access, credentials and confidential materials must be returned or deleted as instructed."
  },
  {
    num: "12. Future Opportunities",
    text: "Strong performers may be considered for advanced CareerSense projects, the Partner Program, community or leadership opportunities, events, referrals, paid assignments, internships, consulting engagements or full-time roles when such opportunities exist. Participation in the Fellowship does not guarantee any future role or paid opportunity."
  }
];

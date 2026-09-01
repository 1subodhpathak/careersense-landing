export const partnerPhases = [
  { id: 1, title: "Understand the Startup", range: "Weeks 1-4", assignmentIds: [1, 2, 3, 4] },
  { id: 2, title: "Build & Improve the Product", range: "Weeks 5-10", assignmentIds: [5, 6, 7, 8, 9, 10] },
  { id: 3, title: "Understand the Business Engine", range: "Weeks 11-13", assignmentIds: [11, 12, 13] },
  { id: 4, title: "Grow the Startup", range: "Weeks 14-18", assignmentIds: [14, 15, 16, 17, 18] },
  { id: 5, title: "Lead Like a Founder", range: "Weeks 19-20", assignmentIds: [19, 20] },
];

export const partnerEvaluation = [
  { criterion: "Execution quality", weight: 25 },
  { criterion: "Evidence & research", weight: 20 },
  { criterion: "Startup & business thinking", weight: 20 },
  { criterion: "Decision quality", weight: 15 },
  { criterion: "Measurable impact", weight: 10 },
  { criterion: "Communication", weight: 10 },
];

export const partnerFounderOperatingSystem = {
  purpose:
    "A persistent operating workspace that evolves throughout all 20 weeks. Partners should update these artifacts rather than treating each assignment as an isolated submission.",
  artifacts: [
    "Product Issue & Opportunity Backlog",
    "Customer Insight Repository",
    "Founder Decision Log",
    "Assumption Register",
    "Company KPI Scorecard",
    "Risk Register",
    "Experiment & Learning Log",
    "Growth Backlog",
    "Partnership CRM",
    "90-Day Priority Board",
  ],
  weeklyReview: [
    "What did I learn this week?",
    "What changed my mind?",
    "What is the biggest opportunity now?",
    "What is the biggest risk now?",
    "What ONE founder decision would I make?",
    "What would I deliberately not do?",
    "Which metric should move if my decision is correct?",
  ],
};

const getPhaseId = (assignmentId) =>
  partnerPhases.find((phase) => phase.assignmentIds.includes(assignmentId))?.id ?? null;

const a = (
  id,
  title,
  _timeline,
  mission,
  tasks,
  deliverables,
  skills,
  specialNote = ""
) => ({
  id,
  phaseId: getPhaseId(id),
  week: id,
  title,
  timeline: `Week ${id}, Day 1 - Week ${id}, Day 7`,
  mission,
  summary: mission,
  tasks,
  deliverables,
  skills,
  specialNote,
  points: 1000,
  evidence: {
    maxLinks: 6,
    allowMultipleFiles: true,
    acceptedTypes: ["PDF", "DOCX", "XLSX", "CSV", "PPTX", "PNG", "JPG", "MP4", "ZIP"],
  },
  evaluation: partnerEvaluation,
  founderReview: {
    required: true,
    fields: partnerFounderOperatingSystem.weeklyReview,
    decisionFormat: "Decision → Evidence → Expected Impact → Effort / Investment → KPI → Risk / Trade-Off → What We Will NOT Do",
  },
});

export const partnerAssignments = [
a(1,"CareerSense 360°: Test CareerSense Like a Real User", "Week 1",
  "Create a new CareerSense account, explore every major user-facing feature, test the platform on different browsers and devices, and submit a clear report showing what works well, what is confusing, what is broken, and what should be improved.",
  [
    "Create a completely new CareerSense account using your own test details and experience the onboarding process exactly like a new user.",
    "Do NOT use or request access to the CareerSense admin portal, backend, database, source code, private APIs, internal dashboards, credentials, or production infrastructure.",
    "Start from the CareerSense homepage and explore the complete normal-user journey: Sign Up → Login → Profile → Dashboard → Career Tools → Reports → Learning / Certifications → other user-facing features available to you.",
    "Try every major CareerSense feature that is available from your account. Examples may include Career Readiness / Career Report, Career GPS / Roadmap, Resume Builder, ATS Checker, Interview Simulation, Cover Letter Builder, Skill Certification, Learning Resources, Partner Program, and Dashboard.",
    "For every feature, complete at least one realistic test. Do not only open the page. Enter sample information, submit forms, generate results, navigate back, edit information where possible, and check what happens.",
    "Test important pages on Chrome, Safari, Edge, and Firefox where available.",
    "Test both desktop and mobile layouts. You can use a real mobile device or your browser's responsive/device mode.",
    "Check navigation: buttons, menus, links, Back buttons, CTAs, redirects, and whether the user can easily understand where to go next.",
    "Check forms: required fields, empty submissions, invalid values, error messages, success messages, dropdowns, file uploads, and form validation.",
    "Check UI and UX: alignment, spacing, fonts, readability, overlapping elements, broken layouts, confusing instructions, consistency, and mobile responsiveness.",
    "Check loading and error behavior. If a page or AI feature takes time, observe whether CareerSense clearly tells the user what is happening.",
    "Look for basic accessibility issues such as unreadable text, poor contrast, buttons that are difficult to understand, missing labels, or important actions that are hard to find.",
    "Record every issue you find with a screenshot and enough information for another person to reproduce it.",
    "Identify things CareerSense already does very well. The assignment is not only about finding bugs.",
    "At the end, suggest the five improvements or new features that would create the biggest improvement for CareerSense users."
  ],

  [
    "1. CareerSense Feature Checklist - list every major feature you tested and mark it as Working Well, Needs Improvement, or Issue Found.",
    "2. Feature-by-Feature Review - for each feature, briefly explain what it does, what you tested, what worked well, and what could be improved.",
    "3. Bug Report - document every bug with Bug Title, Feature/Page, Browser/Device, Steps to Reproduce, Expected Result, Actual Result, Severity, and Screenshot.",
    "4. Browser Compatibility Report - show which major flows you tested on Chrome, Safari, Edge, and Firefox and whether they worked correctly.",
    "5. Mobile & Responsive Testing Report - include screenshots of important CareerSense pages on mobile and mention any layout or usability problems.",
    "6. Top 10 CareerSense Strengths - list the ten things you believe CareerSense currently does best.",
    "7. Top 10 Improvement Opportunities - list the ten most important areas that could improve the user experience.",
    "8. Top 5 Features / Improvements You Would Build Next - explain what you would build or improve, who it helps, and why it should be prioritized.",
    "9. CareerSense Scorecard - give CareerSense an overall score out of 100 and briefly explain your scoring.",
    "10. Final Submission - combine your feature review, bugs, screenshots, browser/mobile testing, strengths, improvements, recommendations, and scorecard into one PDF or presentation."
  ],

  "Product testing, QA, UX analysis, product thinking, documentation, critical thinking"
),
  
  // Assignment 2: Decode CareerSense: Map the Complete User Journey

  a(2,"Decode CareerSense: Map the Complete User Journey","Week 2",
  "Use CareerSense exactly like a new user and create a visual map showing how information appears to move from one feature to another. You do NOT need access to the CareerSense admin portal, database, source code, APIs, or backend architecture.",
  [
    "Create a completely new CareerSense user account and complete the journey as a normal user.",
    "Start from Sign Up / Login and document every major step you experience in the frontend.",
    "Complete your CareerSense profile with sample information and observe where that information appears again across the platform.",
    "Use the major CareerSense features available to you, such as Career Report / Career Readiness, Resume Builder, ATS Checker, Interview Simulation, Skill Certification, Career Roadmap, Learning resources, and Dashboard.",
    "For every feature, note what information you enter, what output CareerSense generates, and where that output appears later.",
    "Track information that appears to move between features. For example: profile information appearing in a report, report information appearing on the dashboard, resume information being used by ATS, certification results appearing in the user profile, etc.",
    "Create a complete User Journey Flowchart showing what happens from the user's point of view.",
    "Create a second Information Flow Diagram showing how you THINK information may move between CareerSense modules based only on what you can observe in the frontend.",
    "Clearly mark anything that you cannot directly verify as 'Assumption / Inferred Flow'. Do not try to access the backend, database, browser secrets, admin portal, private APIs, or internal system architecture.",
    "Identify places where the same information has to be entered more than once or where information could potentially flow more smoothly between CareerSense features.",
    "Finally, recommend improvements that could make the CareerSense user journey more connected and easier to understand."
  ],
  [
    "1. New User Journey Evidence - screenshots showing the major steps you completed as a new CareerSense user.",
    "2. Complete User Journey Roadmap - one visual diagram showing the journey from account creation through the major CareerSense features.",
    "3. Information Flow Diagram - show what information is entered, generated, saved from the user's perspective, and where it appears again.",
    "4. Feature Flow Table - for every feature, list: Input → Action → Output → Where the output appears next.",
    "5. Cross-Feature Connection Map - identify which CareerSense features appear to share or reuse information.",
    "6. Assumptions List - clearly document any system behavior you inferred but could not confirm from the frontend.",
    "7. Duplicate Information Report - identify places where users may need to enter the same information multiple times.",
    "8. Top 5 Integration Recommendations - suggest five ways CareerSense could make information flow more smoothly between features.",
    "9. Final Submission - combine the journey, diagrams, observations, screenshots, and recommendations into one PDF or presentation."
  ],

  "Product understanding, user journey mapping, information flow, system thinking, product architecture thinking"
),
  a(3,"Inside the Founder’s Room: Learn Directly from the CEO","Week 3",
  "Attend a structured interaction with Shagun Nagpal, Founder & CEO of CareerSense, understand why CareerSense was created, where the company is going, what challenges it faces, and then convert those learnings into your own strategic recommendations.",
  [
    "Before the session, spend time reviewing CareerSense as a user so you already understand the major products, services, Partner Program, and target users.",
    "Prepare at least 10 thoughtful questions before attending the session. Do not depend only on questions asked by other Partners.",
    "Your questions should cover areas such as: why CareerSense was started, the problem it is solving, long-term vision, target users, business model, revenue, universities, companies, product strategy, AI, growth, competition, hiring, partnerships, and current startup challenges.",
    "During the session, listen carefully and take structured notes. Focus on the reasoning behind decisions, not only the final answers.",
    "Identify at least five important things you learned about CareerSense that you did not understand before the meeting.",
    "Identify at least three assumptions you had about CareerSense that changed after speaking with the Founder.",
    "Based on the conversation, identify what you believe is CareerSense's biggest current opportunity.",
    "Identify what you believe is the biggest current risk or challenge for CareerSense.",
    "Imagine you were responsible for CareerSense for the next 30 days. Decide the three things you would prioritize first and explain why.",
    "Finally, write a short Founder Vision Memo summarizing what you understood about the mission, business, product direction, growth strategy, and future of CareerSense."
  ],

  [
    "1. CEO Session Question List - submit the minimum 10 questions you prepared before the meeting.",
    "2. Session Notes - submit your structured notes from the Founder interaction. You do not need to create a word-for-word transcript.",
    "3. Founder Vision Memo - write a 1-2 page summary explaining why CareerSense exists, who it serves, what it is trying to become, and the major priorities you understood from the Founder.",
    "4. Five Key Learnings - list five important things you learned during the interaction and briefly explain why each one matters.",
    "5. Three Changed Assumptions - explain three things you believed before the session and how your understanding changed afterward.",
    "6. Biggest Opportunity - identify one major opportunity you believe CareerSense should focus on and explain your reasoning.",
    "7. Biggest Risk - identify one major business, product, growth, technology, market, or execution risk and explain why it matters.",
    "8. My 30-Day CEO Plan - if you became CEO of CareerSense for the next 30 days, list your top three priorities, what you would do, and what result you would expect.",
    "9. Final Submission - combine your questions, session notes, Founder Vision Memo, learnings, changed assumptions, opportunity, risk, and 30-day CEO plan into one PDF or presentation."
  ],

  "Leadership exposure, founder mindset, strategic thinking, business understanding, executive communication"
),
  
  
  // Assignment 4: Voice of the User: Understand What People Really Need

  a(4,"Voice of the User: Understand What People Really Need","Week 4",
  "Talk to real users, understand their career challenges, and use their feedback to suggest improvements for CareerSense.",
  [
    "Interview 7 people in total: 3 students, 2 fresh graduates/job seekers, and 2 working professionals.",
    "Ask every person the same core questions about: resume building, job search, interview preparation, skill gaps, certifications, career guidance, and the tools they currently use.",
    "If possible, ask them to explore CareerSense and share what they like, what is confusing, what is missing, and what they would improve.",
    "Write short notes for every interview. Do not record sensitive personal information.",
    "After completing all interviews, combine the feedback and identify the most common problems mentioned by users.",
    "Create 3 simple user personas: Student, Job Seeker / Fresh Graduate, and Working Professional.",
    "List the feature requests suggested by users and rank them based on how many people mentioned them.",
    "Finally, recommend the top 5 changes you think CareerSense should make based on the interviews."
  ],
  [
    "1. Interview Questionnaire - the list of questions you asked every participant.",
    "2. Interview Notes - one short summary for each of the 7 users. Mention only user type such as Student 1, Job Seeker 1, Professional 1.",
    "3. User Feedback Summary - a table showing the top recurring problems and how many users mentioned each problem.",
    "4. User Personas - 3 simple personas: Student, Job Seeker / Fresh Graduate, and Working Professional.",
    "5. Feature Request Ranking - list requested features from most requested to least requested.",
    "6. Top 5 CareerSense Recommendations - explain what should be improved, why it matters, and which user feedback supports the recommendation.",
    "7. Final Submission - combine everything into one PDF or presentation and upload it along with your supporting notes."
  ],
"Customer research, user interviews, product discovery, feedback analysis, product thinking"
),
  a(
  5,
  "The ₹50,000 Build Challenge: Build Your Own Resume Builder",
  "Week 5",

  "Design, build, and deploy your own working Resume Builder as an independent project. A user should be able to enter their career information, generate a professional resume, preview it, edit it, and download the final resume. You do not need access to CareerSense source code, admin portal, backend, database, or internal APIs.",

  [
    "Build the Resume Builder as your own independent application. Do not modify or connect directly to the CareerSense production application.",

    "Create a simple landing or start screen that clearly explains what your Resume Builder does.",

    "Allow a user to enter basic personal information such as name, email, phone number, location, LinkedIn, portfolio, and professional summary.",

    "Allow users to add education details such as institution, degree, field of study, dates, and relevant achievements.",

    "Allow users to add work experience including company, role, dates, responsibilities, and achievements.",

    "Allow users to add projects with project name, description, technologies used, and project links where applicable.",

    "Allow users to add skills and organize them in a clear way.",

    "Generate a formatted resume using the information entered by the user.",

    "Show a live or generated preview so the user can review the resume before downloading it.",

    "Allow the user to edit their information and regenerate or update the resume.",

    "Allow the final resume to be downloaded as a PDF. A high-quality printable format is required.",

    "Save the user's information so that refreshing the page does not immediately destroy their work. You may use local storage or a database depending on your implementation.",

    "Create at least one professional resume template. Additional templates are optional.",

    "Make the application responsive and usable on both desktop and mobile screens.",

    "Add basic validation for important fields such as name, email, dates, and required resume sections.",

    "Handle empty states, loading states, validation errors, and failed actions clearly so the user understands what went wrong.",

    "Deploy the completed application to a public URL using a platform such as Vercel, Netlify, Render, Railway, AWS, Azure, or another suitable service.",

    "Store your complete source code in a GitHub repository with a clear project structure and setup instructions.",

    "You may use any reasonable technology stack. Examples include React, Next.js, Vue, Node.js, Python, FastAPI, Firebase, Supabase, PostgreSQL, MongoDB, or similar technologies.",

    "AI is optional. If you use AI, it should solve a real user problem such as improving professional summaries, rewriting bullet points, suggesting skills, or improving achievement statements.",

    "Do not use real CareerSense user information, internal credentials, private APIs, production data, or confidential CareerSense resources while building your project.",

    "Before submission, test the complete journey yourself: Create Resume → Enter Information → Preview → Edit → Save → Download PDF."
  ],

  [
    "1. Live Application URL - submit a publicly accessible deployed version of your Resume Builder.",

    "2. GitHub Repository - submit the complete source-code repository. The repository should contain the code required to run the project.",

    "3. README File - explain what the product does, how to run it locally, technology stack used, installation steps, environment variables if required, and deployment instructions.",

    "4. Feature List - clearly list all completed features and identify any optional or AI-powered features you added.",

    "5. Product Screenshots - include screenshots of the landing page, resume form, resume preview, completed resume, mobile view, and any important additional features.",

    "6. Architecture Overview - create one simple diagram showing the major parts of your application. Example: User → Frontend → Backend/API → Database → Resume Generator → PDF Download.",

    "7. Technical Explanation - briefly explain why you selected your frontend, backend, database, hosting, PDF generation, and AI technologies.",

    "8. Test Report - show that you tested the major user journey and document any important bugs you discovered and fixed.",

    "9. Known Limitations - clearly mention features that are incomplete, unsupported, or that you would improve with more time.",

    "10. Future Improvements - list at least five features you would add if you continued developing the product.",

    "11. 3-Minute Product Demo Video - demonstrate the complete user journey from creating a resume to downloading the final PDF.",

    "12. Final Submission - provide one PDF or presentation containing your project overview, screenshots, architecture, features, technology decisions, testing, limitations, future improvements, live URL, GitHub URL, and demo-video URL."
  ],

  "Frontend development, backend development, APIs, databases, PDF generation, deployment, UI/UX, software testing, product ownership",

  "Exceptional submissions may qualify for an additional performance bonus of up to ₹50,000. The bonus is not guaranteed and is subject to separately published judging criteria, originality requirements, functional and technical quality, design quality, verification, and written bonus terms."
),
  a(
  6,
  "UX Rescue Mission: Redesign One CareerSense Experience",
  "Week 6",

  "Choose one CareerSense user-facing experience, study how it works today, identify the biggest usability problems, and redesign it in Figma to make the experience simpler, clearer, and easier to use. You do not need access to CareerSense source code, admin portal, backend, database, or internal design files.",

  [
    "Choose ONE CareerSense experience to redesign. You can select Resume Builder, Interview Simulator, Skill Certification, Career Roadmap / GPS, Dashboard, Partner Program, or another major user-facing experience approved for the assignment.",

    "Use CareerSense exactly like a normal user and complete the current journey yourself before starting the redesign.",

    "Take screenshots of the important screens and document the current user journey from start to finish.",

    "Identify the main usability problems. Look for issues such as confusing navigation, too many steps, unclear instructions, poor hierarchy, difficult forms, weak mobile experience, inconsistent buttons, missing feedback, or unclear next actions.",

    "Do not redesign something only because you prefer a different visual style. Every major design change should solve a specific user problem.",

    "Create a Current Journey Map showing the steps a user follows today.",

    "Create a Proposed Journey Map showing how your redesigned experience would work.",

    "Create low-fidelity wireframes before creating the final visual design.",

    "Create high-fidelity screens in Figma using a consistent design system including typography, colors, buttons, cards, form fields, spacing, icons, and interaction patterns.",

    "Create both desktop and mobile versions of the most important screens.",

    "Build a clickable Figma prototype so another person can complete the redesigned journey without needing explanation.",

    "Use realistic sample content in your designs instead of placeholder text wherever possible.",

    "For every major change, explain what problem you found, what you changed, and how the new design improves the user experience.",

    "Use at least five recognized usability principles in your redesign and explain where you applied them.",

    "Before submission, test your clickable prototype with at least 2 people if possible and note any important feedback or changes you made afterward.",

    "Do not access or request CareerSense backend systems, admin portals, private APIs, source code, internal credentials, or confidential user data. This assignment should be completed entirely from the user-facing product and your own Figma workspace."
  ],

  [
    "1. Selected Experience - clearly mention which CareerSense feature or journey you chose to redesign.",

    "2. Current Experience Screenshots - include screenshots of the existing user-facing journey you reviewed.",

    "3. Current User Journey Map - show the existing steps from the user's starting point to completion.",

    "4. UX Problem Analysis - identify the main usability problems and explain why each problem matters.",

    "5. Low-Fidelity Wireframes - submit your early wireframes showing the proposed structure before visual styling.",

    "6. High-Fidelity Figma Design - submit the final polished desktop design for the redesigned experience.",

    "7. Mobile Design - submit mobile versions of the most important screens.",

    "8. Clickable Figma Prototype - provide a working prototype link that demonstrates the main user journey.",

    "9. Before vs After Comparison - show the current CareerSense experience next to your redesigned version and explain the major improvements.",

    "10. UX Rationale - for every important design change, explain: Problem → Design Change → Expected User Benefit.",

    "11. Usability Principles - explain at least five usability or UX principles you used in your design.",

    "12. Design System Snapshot - show the major typography, colors, buttons, form fields, cards, spacing, and reusable components used in your redesign.",

    "13. Prototype Feedback - if you tested the design with users, briefly summarize the feedback and what you changed after testing.",

    "14. Final Submission - combine your journey maps, screenshots, problem analysis, wireframes, final designs, before/after comparison, UX rationale, usability principles, and Figma prototype link into one PDF or presentation."
  ],

  "Figma, UX research, user journey mapping, wireframing, UI design, design systems, prototyping, usability testing"
),
  a(
  7,
  "Make CareerSense Faster: Frontend Performance & Reliability Lab",
  "Week 7",

  "Test CareerSense like a normal user and identify pages, features, or interactions that feel slow, confusing, broken, or unreliable. Use browser-based tools such as Lighthouse, Chrome DevTools, and PageSpeed Insights to collect evidence and recommend practical improvements. You do not need access to CareerSense backend systems, source code, servers, databases, logs, or internal APIs.",

  [
    "Create or use a normal CareerSense user account and test the major user-facing pages and features available to you.",

    "Do NOT access or request the CareerSense admin portal, backend, database, source code, server logs, cloud infrastructure, private APIs, credentials, or internal monitoring tools.",

    "Start by identifying the most important user-facing pages to test, such as Homepage, Login / Sign Up, Dashboard, Career Report / Career Readiness, Resume Builder, ATS Checker, Interview Simulator, Skill Certification, Career Roadmap / GPS, Cover Letter Builder, and other major frontend experiences available to you.",

    "For each selected page, note how quickly it appears to load and whether the user sees useful feedback while waiting.",

    "Use Google Lighthouse in Chrome DevTools to collect Performance, Accessibility, Best Practices, and SEO scores for important public pages where the tool can run correctly.",

    "Use PageSpeed Insights for suitable public URLs and capture available Core Web Vitals or performance recommendations.",

    "Use Chrome DevTools Network tab to observe frontend behavior such as large images, large files, repeated requests, long-loading resources, or requests that appear slow from the user's perspective.",

    "Use Chrome DevTools Performance tools where useful to identify visible rendering delays, layout shifts, long tasks, or slow interactions.",

    "Check whether large images, videos, animations, fonts, or visual assets appear to delay page loading.",

    "Test important CareerSense experiences on both desktop and mobile / responsive mode and compare whether mobile performance feels significantly worse.",

    "Check loading states. When CareerSense is generating a report, resume, ATS analysis, interview feedback, or other result, verify that the user clearly understands that processing is happening.",

    "Check error states by performing safe frontend actions such as submitting incomplete forms, entering invalid values, using unsupported file types where allowed, or navigating to broken / unavailable pages.",

    "Do not intentionally overload, repeatedly stress-test, flood requests, bypass protections, manipulate APIs, or perform any activity that could affect CareerSense availability for other users.",

    "Check important links, buttons, navigation items, forms, redirects, and calls to action for broken or unexpected behavior.",

    "Record every significant issue with screenshots or tool evidence and explain exactly where the problem occurred.",

    "Separate performance issues from usability issues. For example, a page may load quickly but still feel slow because the user receives no loading feedback.",

    "Rank the issues you find based on User Impact and Priority instead of simply listing every Lighthouse warning.",

    "For each major issue, recommend a practical improvement and explain what user experience improvement you expect if it is fixed."
  ],

  [
    "1. Pages Tested - provide a list of the CareerSense pages and user journeys you tested.",

    "2. Performance Scorecard - create a table showing available Lighthouse / PageSpeed results for the major pages you tested.",

    "3. Core Web Vitals Summary - document available LCP, INP, CLS, FCP, TBT, or other relevant metrics when the tools provide them. If a metric is unavailable, mark it as Not Available rather than guessing.",

    "4. Performance Evidence - attach screenshots from Lighthouse, PageSpeed Insights, Chrome DevTools Network, or Performance tools for the most important findings.",

    "5. Top Performance Bottlenecks - identify the most important frontend performance problems you observed and explain how they affect users.",

    "6. Reliability & Error Report - document broken links, failed forms, confusing error states, missing loading indicators, unexpected redirects, or other user-facing reliability problems.",

    "7. Desktop vs Mobile Comparison - compare important pages on desktop and mobile and highlight significant differences.",

    "8. Issue Priority Table - rank findings using Priority, User Impact, Evidence, Recommended Fix, and Expected Improvement.",

    "9. Top 10 Recommended Improvements - provide the ten changes you believe would create the biggest improvement in speed, reliability, or perceived performance.",

    "10. Quick Wins vs Larger Improvements - separate recommendations that appear simple to address from improvements that may require more substantial engineering work.",

    "11. Final Submission - combine your page list, performance scores, screenshots, findings, reliability issues, prioritized recommendations, and expected impact into one PDF or presentation."
  ],

  "Frontend performance testing, Lighthouse, Chrome DevTools, PageSpeed Insights, Core Web Vitals, reliability testing, UX performance, technical analysis"
),
  a(
  8,
  "Connect Everything: Design an API Blueprint",
  "Week 8",

  "Choose one CareerSense capability and design how its frontend could communicate with a backend through REST APIs. You are creating a proposed API design based on the user experience you can observe. You do not need access to CareerSense source code, backend services, database, private APIs, credentials, or internal architecture.",

  [
    "Choose ONE CareerSense capability to design APIs for. You can select User Profile, Resume Builder, ATS / Career Readiness, Interview Simulator, Skill Certification, or another approved user-facing capability.",

    "Use the selected CareerSense feature like a normal user and understand its complete frontend journey before designing the API.",

    "Identify the main actions the user performs. For example: create, view, update, delete, generate, submit, download, retry, or view history.",

    "For each user action, decide whether the frontend would reasonably need to communicate with a backend service.",

    "Create a simple User Action → API Call map showing how the selected feature could work.",

    "Design REST API endpoints for the major actions using clear resource-oriented URLs.",

    "Choose the correct HTTP method for every endpoint such as GET, POST, PATCH, PUT, or DELETE.",

    "Define what information the frontend sends in the request and what information the backend returns in the response.",

    "Create example JSON request and response payloads for the important endpoints.",

    "Define common status codes such as 200, 201, 400, 401, 403, 404, 409, 422, and 500 only where they make sense for your API.",

    "Design clear error responses so the frontend can show useful messages to users.",

    "Explain at a high level how authentication should work. For example, the frontend may send an authenticated user token and the backend verifies that the user can access the requested resource.",

    "Do not attempt to discover, inspect, call, reverse-engineer, or test CareerSense private APIs. Do not capture or reuse authentication tokens, credentials, internal URLs, or production API requests.",

    "Clearly label the entire design as a Proposed API Blueprint. If you make assumptions about how CareerSense may work internally, mark them as assumptions rather than facts.",

    "Create one API flow diagram showing how the User, Frontend, Authentication, API, and Data Storage could interact.",

    "Create basic API documentation that another developer could understand without needing additional explanation.",

    "Finally, identify at least five design decisions you made and explain why you made them."
  ],

  [
    "1. Selected Capability - clearly mention which CareerSense feature you selected and briefly explain the user journey you observed.",

    "2. User Action → API Map - create a table showing each major user action and the API operation you propose for it.",

    "3. Endpoint List - provide all proposed endpoints with HTTP Method, URL, Purpose, Authentication Requirement, and Expected Status Code.",

    "4. Request & Response Examples - provide example JSON payloads for the important API operations.",

    "5. Error Handling Design - document the major error scenarios, status codes, error response format, and what message the frontend should show.",

    "6. Authentication & Authorization Overview - explain at a high level how authenticated users would access their own resources. No real tokens, secrets, or CareerSense credentials should be included.",

    "7. API Flow Diagram - create one visual diagram showing User → Frontend → Authentication → API → Data / Service → Response → Frontend.",

    "8. Resource / Data Model - create a simple proposed model showing the major objects used by your selected feature and how they relate.",

    "9. API Documentation - create developer-friendly documentation for the proposed API including endpoints, parameters, payloads, responses, and errors.",

    "10. Design Decisions - explain at least five important decisions you made while designing the API and why.",

    "11. Assumptions & Limitations - list anything you assumed because the real CareerSense backend architecture is intentionally not available to you.",

    "12. Final Submission - combine the user journey, API map, endpoints, payloads, errors, authentication overview, diagrams, data model, design decisions, and documentation into one PDF or presentation."
  ],

  "REST APIs, API design, HTTP methods, JSON, authentication concepts, system integration, backend thinking, technical documentation"
),
  a(
  9,
  "Ship a Real Feature: Full-Stack Sprint",
  "Week 9",

  "Choose one small product feature, design it, build the frontend and backend where required, store the data, test it, and deploy a working version. The goal is to experience a complete software-development sprint from idea to release. You do not need access to CareerSense production code, admin portal, database, private APIs, or internal infrastructure.",

  [
    "Choose ONE small feature to build. Recommended options include Saved Jobs, Learning Tracker, Job Application Tracker, Interview History, Certificate Verification, Feedback Widget, or another small feature approved for the assignment.",

    "Keep the scope focused. Your feature should solve one clear user problem and be realistic to complete during Week 6 - Week 7.",

    "Before coding, write a short problem statement explaining who the feature is for, what problem it solves, and what the user should be able to do.",

    "Create a simple user flow showing how someone will use the feature from start to finish.",

    "Create a basic wireframe or screen sketch before building the final interface.",

    "Build the frontend experience using any reasonable framework such as React, Next.js, Vue, or another suitable technology.",

    "Build a backend or API only where the feature requires it. You may use Node.js, Python, FastAPI, Firebase, Supabase, or another suitable technology.",

    "Use a database or persistent storage where the feature needs to save information. Local storage is acceptable only for very simple features where a backend is genuinely unnecessary.",

    "Implement the minimum actions required for the chosen feature. These may include Create, View, Update, Delete, Search, Filter, Track Status, or Verify depending on your feature.",

    "Add appropriate form validation, empty states, loading states, success messages, and error states.",

    "Make the feature responsive enough to work on desktop and mobile.",

    "If authentication is required, you may implement your own simple authentication or use a service such as Clerk, Firebase Auth, or Supabase Auth. CareerSense production authentication is not required.",

    "Test the complete user journey before submission. Test both successful actions and common failure cases.",

    "Store the complete source code in GitHub with clear commits and a readable project structure.",

    "Deploy the working feature to a public URL using Vercel, Netlify, Render, Railway, Firebase, Supabase, or another suitable deployment platform.",

    "Do not connect your project to CareerSense production systems, private APIs, internal databases, credentials, or real user data.",

    "If you are designing the feature as something that could eventually become part of CareerSense, clearly explain how you think it could integrate in the future, but keep your implementation independent."
  ],

  [
    "1. Feature Selection - clearly mention which feature you built and why you selected it.",

    "2. Problem Statement - explain the user problem, target user, and expected outcome.",

    "3. User Flow - create one simple diagram showing how the user moves through the feature.",

    "4. Wireframe / Initial Design - include a simple wireframe or early design before the final implementation.",

    "5. Working Feature - submit a publicly accessible deployed URL where the feature can be tested.",

    "6. GitHub Repository - submit the complete source code with a clear folder structure and meaningful commits.",

    "7. README - explain what the feature does, technology stack, setup instructions, environment variables where required, and how to run the project locally.",

    "8. API Documentation - if your project uses a backend, document the main endpoints, HTTP methods, request payloads, and responses.",

    "9. Data Model - if data is stored, show a simple diagram or table explaining the main entities and fields.",

    "10. Test Cases - provide the major test cases you executed including successful flows, validation failures, and important edge cases.",

    "11. Screenshots - include the important screens such as empty state, create flow, completed state, mobile view, and any important error or success state.",

    "12. Known Limitations - explain what is incomplete, simplified, or intentionally outside the scope of the sprint.",

    "13. Future CareerSense Integration - briefly explain where this feature could fit inside CareerSense and what would be required to integrate it in the future.",

    "14. Final Submission - combine the problem statement, user flow, screenshots, architecture, data model, testing, limitations, deployed URL, and GitHub URL into one PDF or presentation."
  ],

  "Full-stack development, frontend development, backend APIs, databases, Git, testing, deployment, product ownership"
),
  a(
  10,
  "AI Inside CareerSense: Build an Intelligent Product Feature",
  "Week 10",

  "Choose one useful AI-powered career feature, build a working prototype, test how well the AI performs, document where it can fail, and explain how it could eventually fit into CareerSense. You do not need access to CareerSense production code, backend, private APIs, database, internal prompts, credentials, or real user data.",

  [
    "Choose ONE AI feature to prototype. Recommended options include Resume Bullet Improver, Job Description Matcher, Interview Feedback Generator, Skill-Gap Analyzer, Career Recommendation Assistant, or Cover Letter Assistant.",

    "Clearly define the user problem before building anything. Explain who the feature is for, what information the user provides, and what useful result the AI should return.",

    "Build the prototype as an independent application or demo. Do not connect it directly to CareerSense production systems.",

    "Create a simple user interface where someone can enter the required information and receive an AI-generated result.",

    "Use any reasonable AI model or provider such as OpenAI, Anthropic, Gemini, an open-source model, or another suitable option. You may also use a mocked model during development before connecting a real model.",

    "Use your own development API credentials where required. Never request, expose, copy, or use CareerSense production API keys or internal credentials.",

    "Do not use real CareerSense customer data, resumes, interview responses, personal information, or other confidential information. Use fictional or anonymized sample data for testing.",

    "Design the prompt carefully. Clearly define the AI's role, input, instructions, expected output format, and restrictions.",

    "Where possible, make the AI output structured and predictable instead of returning uncontrolled free-form text.",

    "Create at least 10 different test cases covering normal users, different career levels, incomplete information, unusual inputs, and difficult cases.",

    "Compare the AI's output across those test cases and identify what works well and where the model produces weak, incorrect, generic, or unsafe responses.",

    "Document at least five important failure cases or limitations of your AI feature.",

    "Add basic input validation and appropriate loading, success, and error states in the prototype.",

    "Add safeguards so the AI does not present unsupported claims as facts, expose sensitive information, or provide misleading career guarantees.",

    "If the AI output may affect important career decisions, make it clear that the output is guidance and should be reviewed by the user.",

    "Estimate approximately how much one AI request costs based on the model and token usage you selected. An exact production forecast is not required.",

    "Think about what happens if 100, 1,000, or 10,000 users use the feature and briefly explain how cost could be controlled.",

    "Explain what information should and should not be sent to the AI model from a privacy perspective.",

    "If your feature stores user information, clearly explain what is stored and why. Persistent storage is optional unless your feature requires it.",

    "Deploy the prototype to a public URL where possible, or provide a locally runnable application with clear setup instructions.",

    "Finally, explain how this AI capability could be added to CareerSense in the future without claiming that your prototype represents the current CareerSense architecture."
  ],

  [
    "1. AI Feature Selection - clearly state which AI feature you built, who it is for, and what problem it solves.",

    "2. Working Prototype - provide a deployed URL where possible, or clear instructions for running the prototype locally.",

    "3. GitHub Repository - submit the source code for the prototype with a clear project structure.",

    "4. README - explain the feature, technology stack, model used, setup process, required environment variables, and how to run the project.",

    "5. User Flow - create a simple diagram showing User Input → Application → AI Model → AI Response → User Result.",

    "6. Prompt Design - document the main prompt or prompt structure, including the AI role, instructions, input variables, expected output, and important restrictions.",

    "7. Sample Inputs & Outputs - provide at least 10 representative test examples showing what users entered and what the AI returned.",

    "8. Failure Cases - document at least five examples where the AI produced an incorrect, weak, generic, incomplete, inconsistent, or potentially misleading answer.",

    "9. Evaluation Table - rate your test cases using criteria such as Relevance, Accuracy, Clarity, Usefulness, Consistency, and Safety.",

    "10. Safety & Privacy Review - explain what user information should not be sent to the model, what safeguards you added, and where human review may still be required.",

    "11. Cost Estimate - provide an approximate cost per request and a simple estimate for 100, 1,000, and 10,000 requests.",

    "12. Improvement Plan - explain at least five ways you would improve the AI feature with more time.",

    "13. CareerSense Integration Concept - briefly show where this capability could eventually fit into the CareerSense user journey.",

    "14. Demo Video - record a short 2-3 minute demonstration showing the feature with at least two different examples.",

    "15. Final Submission - combine the problem statement, user flow, screenshots, prompt design, test results, evaluation, failure cases, safety considerations, cost analysis, architecture concept, prototype URL, GitHub URL, and demo URL into one PDF or presentation."
  ],

  "LLMs, AI integration, prompt engineering, AI evaluation, safety, privacy, cost analysis, product AI, prototyping"
),  
a(
  11,
  "CareerSense Data Detective: Build the Business Dashboard",
  "Week 11",

  "Use a provided or sample CareerSense dataset to understand how users move through the platform, identify important business trends, and build a decision-ready dashboard using Excel, SQL, and Power BI. You do not need access to the CareerSense production database, admin portal, backend, private analytics tools, or real user data.",

  [
    "Use only the dataset provided for this assignment or a clearly labeled synthetic/sample dataset.",

    "Do NOT request or attempt to access the CareerSense production database, admin portal, backend systems, private APIs, analytics credentials, or real customer data.",

    "Start by understanding the dataset. Identify the available tables, columns, date fields, user identifiers, events, and business metrics.",

    "Create a simple Data Dictionary explaining what each important column represents.",

    "Check the dataset for basic data-quality issues such as missing values, duplicates, inconsistent categories, invalid dates, or unexpected values.",

    "Clean or transform the data where required and document the major cleaning steps you performed.",

    "Analyze user registrations over time. Show how many new users joined CareerSense by day, week, or month.",

    "Analyze active users. Define what you consider an active user based on the available dataset and clearly explain your definition.",

    "Analyze adoption of major CareerSense features such as Resume Builder, ATS Checks, Interview Simulation, Skill Certification, Career Report / Readiness, or other features available in the dataset.",

    "Calculate how many users use each feature and identify the most-used and least-used features.",

    "Analyze the user journey. For example: Registered → Completed Profile → Created Resume → Ran ATS Check → Completed Interview → Earned Certification.",

    "Calculate conversion rates between important stages where the dataset supports the calculation.",

    "Analyze retention where possible. For example, determine how many users return after their first week or month.",

    "Identify users who registered but did not use any major CareerSense feature.",

    "Identify users who use multiple CareerSense features and compare their behavior with users who use only one feature.",

    "Look for trends by time period, user segment, geography, education level, career stage, or other dimensions available in the provided dataset.",

    "Use SQL to answer the important business questions. Do not only create a Power BI dashboard without showing the underlying analysis.",

    "Use Excel for exploratory analysis, validation, pivot tables, calculations, or quick summaries.",

    "Build a Power BI dashboard that allows a stakeholder to understand the most important CareerSense business metrics without reading the raw data.",

    "Your dashboard should focus on decisions, not just charts. Every visual should answer a useful business question.",

    "Create at least five meaningful business insights based on your analysis.",

    "For each insight, recommend a practical action CareerSense could consider.",

    "Clearly separate facts found in the dataset from assumptions. If the dataset does not contain enough information to answer a question, write 'Not Available in Dataset' instead of guessing."
  ],

  [
    "1. Dataset Overview - briefly explain the files/tables provided, number of rows, important columns, date range, and what the dataset represents.",

    "2. Data Dictionary - create a simple table explaining the important fields used in your analysis.",

    "3. Data Quality Report - document missing values, duplicates, incorrect values, transformations, and cleaning steps.",

    "4. SQL File - submit the SQL queries used to calculate registrations, active users, feature adoption, conversion, retention, and other major metrics.",

    "5. Excel Analysis File - submit your cleaned analysis workbook containing relevant calculations, pivot tables, summaries, or validation work.",

    "6. Power BI Dashboard - submit the Power BI file and screenshots / exported dashboard pages.",

    "7. KPI Summary - clearly show the major business metrics calculated from the dataset.",

    "8. User Journey / Funnel Analysis - show how users move between important CareerSense stages and where major drop-offs occur.",

    "9. Feature Adoption Analysis - compare usage of Resume Builder, ATS, Interviews, Certifications, Career Reports, or other available CareerSense features.",

    "10. Retention Analysis - show whether users return and continue using CareerSense where the available data supports this calculation.",

    "11. Five Business Insights - explain five important findings from the data and why each one matters.",

    "12. Five Recommended Actions - provide one practical CareerSense action for each major insight.",

    "13. Executive Summary - write a short summary explaining what you would tell CareerSense leadership if you had only five minutes to present the analysis.",

    "14. Final Submission - combine your dashboard screenshots, KPI summary, funnel analysis, insights, recommended actions, and executive summary into one PDF or presentation. Also upload the SQL file, Excel workbook, and Power BI file separately."
  ],

  "Excel, SQL, Power BI, data cleaning, business analytics, funnel analysis, retention analysis, dashboard design, stakeholder reporting"
),
  a(
  12,
  "The Money Question: Make CareerSense a Sustainable Business",
  "Week 12",
  "Act as the startup owner responsible for making CareerSense financially sustainable. Decide who should pay, what value should remain free, how paid plans could work, what it costs to serve users, and which business-model assumptions should be tested before CareerSense invests heavily.",
  [
    "Map the major CareerSense user and customer segments such as students, job seekers, working professionals, universities, companies, and partners, and describe the specific value CareerSense creates for each.",
    "Separate users, beneficiaries, buyers, influencers, and decision-makers so you do not assume the person using CareerSense is always the person who should pay.",
    "Research at least five relevant public competitors or adjacent products and document their publicly visible pricing, packaging, free limits, trials, and target customers.",
    "Identify which CareerSense capabilities should remain free because they support trust, acquisition, activation, or mission value, and explain your reasoning.",
    "Identify which capabilities could reasonably belong in paid individual, student, university, or enterprise offerings without inventing features CareerSense has not approved.",
    "Design at least three different monetization models for CareerSense, such as freemium subscription, one-time career package, university licensing, enterprise licensing, usage-based services, or another defensible model.",
    "Create a recommended packaging structure showing what a user or customer receives in each proposed tier and what problem each tier solves.",
    "Estimate variable cost drivers using clearly labeled assumptions, including areas such as AI/model usage, infrastructure, document generation, storage, payment fees, customer support, or partner delivery where relevant.",
    "Build a simple unit-economics model containing assumed price, variable cost, gross contribution, conversion rate, acquisition cost assumption, retention assumption, and customer lifetime assumptions.",
    "Calculate illustrative ARPU, gross margin, CAC payback, and LTV:CAC only where your assumptions support the calculation, and label all simulated figures clearly.",
    "Create Base Case, Strong Case, and Weak Case scenarios showing how the economics change when conversion, retention, acquisition cost, or AI/infrastructure cost changes.",
    "Identify the three financial assumptions that create the greatest risk in your model and explain how CareerSense could validate each cheaply before scaling.",
    "Speak with at least five people from relevant user or buyer groups, where practical, to understand perceived value, willingness to pay, preferred pricing structure, and what would make them refuse to pay.",
    "Design one ethical pricing or packaging experiment CareerSense could run in an approved environment without misleading users or inventing fake scarcity.",
    "Create a Founder Recommendation choosing ONE business model to test first, ONE monetization idea to postpone, and ONE area you believe CareerSense should deliberately keep free.",
    "Update your Founder Operating System with the business-model assumptions, pricing risks, revenue KPIs, and financial decision made this week."
  ],
  [
    "1. Business Model Map - Users, Beneficiaries, Buyers, Influencers, Value Created, and Possible Revenue Relationship.",
    "2. Competitor Pricing & Packaging Study - compare at least five relevant public offerings.",
    "3. Free vs Paid Value Framework - explain what should remain free, what could be paid, and why.",
    "4. Three Monetization Options - summarize the model, target customer, value proposition, advantages, risks, and assumptions for each.",
    "5. Recommended Pricing & Packaging Concept - show the proposed tiers / offers and what each includes.",
    "6. Unit Economics Workbook - include clearly labeled assumptions and illustrative ARPU, variable cost, contribution, CAC, retention, LTV, and payback calculations where applicable.",
    "7. Scenario Model - Base, Strong, and Weak cases with the variables that change in each.",
    "8. Customer / Buyer Value Research - summarize at least five conversations where practical, without collecting unnecessary personal information.",
    "9. Pricing Experiment Proposal - hypothesis, audience, treatment, success metric, guardrails, and decision rule.",
    "10. Founder Business-Model Decision - state what CareerSense should test first, what should wait, what should remain free, the KPI, and the biggest risk.",
    "11. Final Submission - combine the business-model research, pricing analysis, unit economics, scenarios, customer input, experiment, and Founder Decision into one professional Business Model Pack. Upload the financial model separately."
  ],
  "Business models, startup finance, pricing, packaging, unit economics, customer value, scenario planning, founder decision making",
  "All financial figures must be either publicly sourced or clearly labeled assumptions / simulations. Do not present hypothetical pricing, revenue, costs, customer counts, or financial performance as official CareerSense information."
),
  a(
  13,
  "Retention Rescue: Why Aren’t Users Coming Back?",
  "Week 13",
  "Act as the owner responsible for turning registrations into recurring product value. Use provided or synthetic CareerSense data, user feedback, and product observations to identify where users fail to activate or return, then design one focused retention intervention and a measurable experiment to test it.",
  [
    "Define what meaningful Activation should mean for CareerSense based on the value a new user should experience, rather than defining activation as registration alone.",
    "Use only provided, synthetic, public, or explicitly approved data and clearly distinguish observed facts from assumptions.",
    "Map the journey from Discovery → Registration → Profile / Setup → First Value → Second Meaningful Action → Return Visit → Continued Usage.",
    "Calculate or estimate the major drop-off points using the available dataset and mark any metric that cannot be measured as Not Available instead of guessing.",
    "Create at least three user cohorts based on signup period, first feature used, career stage, acquisition source, or another useful non-sensitive dimension supported by the data.",
    "Compare cohort activation and return behavior and identify where retention differs materially.",
    "Identify users who registered but never reached first value, users who reached first value but did not return, and users who became multi-feature users.",
    "Review findings from earlier user interviews and, where practical, speak with at least five inactive or low-engagement users using approved outreach to understand why they stopped or failed to continue.",
    "Identify the likely CareerSense 'aha moment' - the point where a user first receives enough value to understand why the product is useful - and explain the evidence or assumptions behind it.",
    "Create a Retention Problem Tree separating possible causes across Product Value, UX Friction, Messaging, Timing, Trust, Relevance, Performance, and Missing User Need.",
    "Select ONE retention problem to solve first using Impact, Evidence, Confidence, and Effort rather than proposing many unrelated changes.",
    "Design one intervention such as improved onboarding, next-best-action guidance, progress tracking, reminders, cross-feature recommendation, saved progress, follow-up communication, or another relevant mechanism.",
    "Write one measurable hypothesis using If → Then → Because and define the exact audience who should receive the intervention.",
    "Define the Control and Treatment experiences and create mockups or a lightweight prototype where the intervention changes the user interface.",
    "Define one Primary Metric, relevant Secondary Metrics, and Guardrail Metrics with exact formulas or counting rules.",
    "Estimate the baseline, minimum meaningful improvement, sample-size assumptions, and test duration where possible; clearly label assumptions when production data is unavailable.",
    "Create the experiment decision rules in advance: Ship, Iterate, Stop, or Inconclusive.",
    "Design a 30-day retention action plan showing what CareerSense should learn or change before attempting a broader retention program.",
    "Create a Founder Retention Decision containing the ONE change you would test first, expected impact, KPI, risk, and what you deliberately would not change yet.",
    "Update your Founder Operating System with the activation definition, retention KPIs, experiment hypothesis, new risks, and what changed your mind this week."
  ],
  [
    "1. Activation Definition - define the first meaningful value event and explain why it represents activation.",
    "2. Activation & Retention Funnel - show major stages, available conversion / return metrics, and drop-offs.",
    "3. Cohort Analysis - compare at least three meaningful groups using available or synthetic data.",
    "4. Inactive-User / Low-Engagement Insight Summary - combine previous research and new interviews where practical.",
    "5. Retention Problem Tree - show the strongest possible causes and supporting evidence.",
    "6. Priority Retention Problem - explain why this is the single issue you would solve first.",
    "7. Retention Intervention - provide the user journey, copy / mockups where relevant, and expected behavior change.",
    "8. Experiment Plan - hypothesis, audience, Control, Treatment, metrics, baseline assumptions, sample-size reasoning, duration, guardrails, and decision rules.",
    "9. 30-Day Retention Plan - define the sequence of research, product changes, measurement, and learning you recommend.",
    "10. Founder Retention Decision - Decision → Evidence → Expected Impact → Effort → KPI → Risk / Trade-Off → What We Will NOT Do.",
    "11. Final Submission - combine the funnel, cohorts, user insights, retention diagnosis, intervention, experiment, 30-day plan, and Founder Decision into one Retention Rescue Pack."
  ],
  "Activation, retention, cohort analysis, customer research, product analytics, experimentation, lifecycle thinking, prioritization",
  "Do not run experiments on live CareerSense users unless CareerSense provides an explicitly approved environment, audience, and execution process."
),
  a(
  14,
  "Google Me: CareerSense SEO Growth Mission",
  "Week 14",

  "Research how people search online for career tools such as Resume Builders, ATS Checkers, Mock Interviews, Career Roadmaps, Skill Certifications, and job-readiness support. Identify the keywords CareerSense should target, review competitors, audit the public CareerSense website for SEO opportunities, and create a practical 90-day SEO growth plan. You do not need access to CareerSense admin systems, Search Console, analytics accounts, CMS, backend, or source code.",

  [
    "Use only publicly available information, SEO research tools, search engines, and the public CareerSense website for this assignment.",

    "Do NOT request or attempt to access CareerSense admin portals, Google Search Console, Google Analytics, CMS, backend systems, private SEO tools, credentials, source code, or internal data unless CareerSense explicitly provides access.",

    "Start by understanding what CareerSense offers and identify the major search topics connected to the product.",

    "Research keywords around Resume Builder, ATS Checker, Cover Letter Builder, Mock Interview / Interview Simulator, Career Roadmap, Career Readiness, Skill Certification, Career Guidance, Job Preparation, and other relevant CareerSense services.",

    "Build a keyword list containing at least 50 useful search terms.",

    "For every important keyword, capture where possible: Keyword, Search Intent, Topic, Estimated Search Volume, Keyword Difficulty / Competition, Suggested Page Type, and Priority.",

    "Classify search intent into categories such as Informational, Commercial, Transactional, or Navigational.",

    "Group related keywords into topic clusters instead of treating every keyword as a separate page opportunity.",

    "Identify which keywords should map to existing CareerSense pages and which keywords may require new landing pages, guides, comparison pages, or articles.",

    "Search Google for your most important keywords and identify the websites that appear frequently.",

    "Select at least five relevant competitors or search competitors and compare their SEO approach.",

    "For each competitor, review topics they cover, landing pages, article formats, titles, headings, content depth, internal linking, CTAs, and other publicly visible SEO patterns.",

    "Identify important keywords or topics competitors appear to target that CareerSense currently does not cover well.",

    "Perform an on-page SEO review of important public CareerSense pages.",

    "Check publicly visible SEO elements such as page title, meta description where available, H1 and heading structure, page copy, keyword relevance, URL structure, image alt text where observable, internal links, CTA clarity, and content depth.",

    "Perform a basic technical SEO review using only public/browser-based tools.",

    "Check important areas such as mobile usability, page speed, HTTPS, broken links, redirects, sitemap availability, robots.txt availability, indexability signals, canonical tags where visible, structured data where visible, and general page accessibility.",

    "Do not perform intrusive crawling, automated high-volume requests, vulnerability scanning, or any activity that could affect the CareerSense website.",

    "Identify at least five high-potential content opportunities based on keyword demand, user intent, CareerSense offerings, and competitor gaps.",

    "Create three detailed SEO article outlines for the strongest content opportunities.",

    "Each article outline should include Primary Keyword, Secondary Keywords, Search Intent, Suggested Title, Meta Description, H1, H2/H3 structure, key questions to answer, internal links, CTA, and intended CareerSense feature connection.",

    "Create recommendations for improving the existing CareerSense service pages so they can better target high-value search queries.",

    "Create a simple internal-linking plan showing how CareerSense articles, tools, resources, and service pages should connect to one another.",

    "Create a 90-day SEO strategy divided into Month 1, Month 2, and Month 3.",

    "Prioritize recommendations based on expected impact and effort instead of creating an unranked list of SEO ideas.",

    "Finally, define how CareerSense should measure whether the SEO strategy is working using metrics such as organic traffic, impressions, keyword rankings, click-through rate, landing-page visits, tool starts, sign-ups, and conversions. If you do not have real analytics access, describe the measurement plan rather than inventing results."
  ],

  [
    "1. SEO Research Summary - briefly explain CareerSense's main search opportunities, target audiences, and the major topics you researched.",

    "2. 50-Keyword Research Sheet - submit at least 50 relevant keywords with Search Intent, Topic Cluster, Volume where available, Competition / Difficulty where available, Suggested Page, and Priority.",

    "3. Keyword Cluster Map - organize the keywords into logical groups such as Resume, ATS, Interviews, Career Planning, Certifications, Cover Letters, and Job Readiness.",

    "4. Keyword-to-Page Map - show which CareerSense page should target each important keyword and identify where new pages may be required.",

    "5. Competitor Analysis - compare at least five relevant websites or search competitors and document what they appear to do well, what CareerSense can learn, and where content gaps exist.",

    "6. On-Page SEO Audit - review important CareerSense public pages and document issues related to titles, descriptions, headings, content, URLs, images, internal links, CTAs, and keyword relevance.",

    "7. Technical SEO Review - document publicly observable issues related to page speed, mobile experience, sitemap, robots.txt, broken links, indexability, canonical signals, structured data, and other relevant technical SEO factors.",

    "8. Five SEO Content Opportunities - identify the five content topics you believe have the strongest combination of user value, search opportunity, and CareerSense relevance.",

    "9. Three SEO Article Outlines - create complete optimized outlines including keywords, search intent, title, meta description, headings, questions, internal links, and CTA.",

    "10. Internal Linking Plan - show how CareerSense tools, landing pages, articles, learning resources, and related pages should connect.",

    "11. Priority SEO Recommendations - separate your recommendations into High, Medium, and Low priority or use an Impact vs Effort framework.",

    "12. 90-Day SEO Strategy - create a Month 1, Month 2, and Month 3 action plan covering technical improvements, page optimization, content creation, internal linking, and measurement.",

    "13. SEO Measurement Plan - define which metrics CareerSense should monitor and what each metric tells the business.",

    "14. Executive Summary - summarize the five most important SEO actions you would recommend to CareerSense leadership.",

    "15. Final Submission - combine your keyword research, competitor analysis, SEO audit, content opportunities, article outlines, internal-linking plan, 90-day strategy, measurement plan, and executive summary into one PDF or presentation. Upload the keyword research sheet separately as Excel or Google Sheets."
  ],

  "SEO, keyword research, search intent, competitor research, on-page SEO, technical SEO, content strategy, internal linking, analytics"
),
  a(
  15,
  "Make CareerSense Viral: Digital Growth Sprint",
  "Week 15",

  "Design a complete digital marketing campaign for CareerSense across selected social and digital channels. Define the target audience, campaign idea, content pillars, creatives, publishing plan, calls to action, landing-page recommendations, and success metrics. You do not need access to CareerSense social-media passwords, ad accounts, email systems, analytics accounts, backend, or production systems.",

  [
    "Choose ONE clear CareerSense campaign goal before creating content.",

    "Possible goals include: increase CareerSense awareness, drive new registrations, promote Resume Builder, promote ATS Checker, promote Interview Simulator, promote Skill Certification, promote the Student Plan, or increase Partner Program applications.",

    "Do not try to promote every CareerSense feature in one campaign. Focus on one primary goal and one main audience.",

    "Define the target audience clearly. Examples may include college students, fresh graduates, active job seekers, working professionals, career switchers, or university audiences.",

    "Create a simple target persona describing their age range, career stage, biggest problems, goals, preferred platforms, and the type of content most likely to attract them.",

    "Choose the platforms that make sense for your target audience. You may select Instagram, LinkedIn, YouTube, Facebook, and/or Email. You do not need to use every platform.",

    "Create one strong campaign concept or central message that connects all content across the selected channels.",

    "Define 3-5 content pillars for the campaign. Examples may include Career Education, Product Demonstration, User Problems, Career Tips, Success Stories, Challenges, or Community Content.",

    "Create at least 10 social-media post concepts. For every post, provide the hook, main message, suggested visual, caption, CTA, and platform.",

    "Create at least 5 short-form video / Reel concepts. Each concept should include the opening hook, video flow, main message, CTA, and approximate duration.",

    "Create at least 3 ad creatives or paid-campaign concepts. Each should contain a headline, supporting copy, creative concept, CTA, target audience, and suggested destination page.",

    "Create the actual visual mockups for the strongest campaign assets using Canva, Figma, Adobe tools, or another suitable design platform.",

    "Keep CareerSense branding consistent across all campaign assets including logo usage, colors, typography, tone, and visual style.",

    "Write the final copy and captions for the campaign. Avoid unsupported claims, guaranteed career outcomes, fake statistics, or promises that CareerSense cannot verify.",

    "Define one primary CTA for the campaign, such as Create Your Career Report, Check Your ATS Score, Build Your Resume, Start Interview Practice, Get Certified, Start Student Plan, or Apply for Partner Program.",

    "Review the landing page connected to the campaign using only the public CareerSense website.",

    "Recommend improvements to the landing page so the message from the ad/post continues clearly after the user clicks.",

    "Create a publishing calendar showing what content should be published, on which platform, on which day, and for what purpose.",

    "Define the KPIs you would use to measure the campaign. These may include Reach, Impressions, Video Views, Engagement Rate, Saves, Shares, Link Clicks, CTR, Landing-Page Visits, Registrations, Tool Starts, Applications, or Conversion Rate.",

    "Create a simple KPI dashboard template showing how campaign performance should be monitored.",

    "If CareerSense explicitly approves a campaign for live publishing, you may support execution using the access and process provided by CareerSense.",

    "Do not request or use CareerSense account passwords, social-media credentials, ad-payment information, private analytics access, email databases, or customer lists unless access is explicitly provided through an approved process.",

    "Do not independently publish content pretending to officially represent CareerSense without approval.",

    "If the campaign is not run live, clearly label any performance numbers as targets, benchmarks, or simulated examples rather than actual results.",

    "At the end, explain which three campaign ideas you believe should be tested first and why."
  ],

  [
    "1. Campaign Goal - clearly define the single primary outcome your campaign is designed to achieve.",

    "2. Target Persona - describe the target user, their career stage, problems, motivations, preferred channels, and expected behavior.",

    "3. Campaign Concept - explain the central campaign idea, headline/message, positioning, and why it should attract the selected audience.",

    "4. Content Pillars - define 3-5 repeatable themes that will guide campaign content.",

    "5. 10 Social Post Concepts - provide Platform, Hook, Message, Visual Idea, Caption, CTA, and Objective for every post.",

    "6. 5 Reel / Short-Video Concepts - provide the hook, scene-by-scene flow, script or talking points, CTA, platform, and expected duration.",

    "7. 3 Ad Creative Concepts - provide the visual, headline, body copy, CTA, audience, campaign objective, and destination page.",

    "8. Creative Files - submit the final designed mockups for the strongest social posts, Reels covers / storyboards, and ad creatives.",

    "9. Campaign Copy Library - include the final captions, headlines, CTA text, ad copy, and important hashtags / keywords where applicable.",

    "10. Landing-Page Recommendation - show the page users would reach after clicking and explain what should be improved for message consistency and conversion.",

    "11. Publishing Calendar - create a structured 2-4 week calendar showing Date, Platform, Content Type, Topic, CTA, and Goal.",

    "12. KPI Framework - define the important campaign metrics, formulas where required, and what each metric tells CareerSense.",

    "13. KPI Dashboard - create a simple dashboard or spreadsheet template for monitoring campaign performance.",

    "14. Experiment Ideas - identify at least three elements you would A/B test, such as Hook, Creative, CTA, Audience, Headline, or Landing-Page Message.",

    "15. Results - if the campaign was officially approved and published, document actual results and clearly identify the measurement period. If it was not run live, provide targets or simulated examples and label them clearly.",

    "16. Top 3 Recommendations - explain which campaign ideas CareerSense should test first and why.",

    "17. Final Submission - combine the strategy, persona, campaign concept, posts, Reels, ads, creatives, copy, publishing calendar, landing-page recommendations, KPI framework, and recommendations into one Campaign Deck. Upload the editable creative files and KPI sheet separately."
  ],

  "Digital marketing, social media strategy, content creation, creative design, paid media, copywriting, campaign planning, growth analytics"
),
  a(
  16,
  "Campus Catalyst: Take CareerSense to Colleges",
  "Week 16",

  "Research colleges and universities that could benefit from CareerSense, identify the right career and placement contacts, build a structured outreach plan, and professionally introduce CareerSense to suitable institutions where outreach is approved. The goal is to learn partnership development, research, CRM thinking, and professional communication.",

  [
    "Build a researched list of at least 25 colleges or universities that could be relevant for CareerSense.",

    "Prioritize institutions where students may benefit from career-readiness support such as Resume Building, ATS Checks, Interview Practice, Career Roadmaps, Skill Certification, and job-readiness tools.",

    "For each institution, collect only publicly available professional information such as Institution Name, City, Website, Student / Career Services Page, Placement Cell, Training & Placement Officer, Career Services Contact, relevant student society, and publicly listed professional email or contact form.",

    "Do not collect private phone numbers, personal email addresses, sensitive personal information, or information obtained through unauthorized scraping.",

    "Do not purchase contact databases or use questionable lead lists for this assignment.",

    "Identify the most appropriate contact for each institution. Examples may include Training & Placement Officer, Career Services Team, Placement Cell, Dean / Student Affairs Office, Entrepreneurship Cell, student career society, or another publicly listed institutional contact.",

    "Research each college briefly before outreach so the message can be relevant rather than sending the same generic message everywhere.",

    "For every institution, identify one possible CareerSense value proposition. For example: improving student job readiness, providing career assessment tools, supporting placement preparation, helping students improve resumes, or offering interview practice.",

    "Segment the colleges into Priority A, Priority B, and Priority C based on relevance, potential student impact, contact availability, and likelihood of partnership.",

    "Create an outreach sequence containing an introduction message, one follow-up message, and a final polite follow-up.",

    "Create separate outreach templates for Email, LinkedIn, and other approved professional channels where appropriate.",

    "Keep all communication simple, professional, personalized, and focused on how CareerSense could help students rather than only promoting the product.",

    "Do not make claims about guaranteed placements, employment outcomes, university partnerships, certifications, pricing, discounts, exclusivity, or commercial agreements unless those claims have been explicitly approved by CareerSense.",

    "Clearly represent yourself according to the role and wording approved for CareerSense Partners. Do not present yourself as an employee, university representative, or authorized commercial signatory unless specifically authorized.",

    "Where CareerSense approves live outreach, contact suitable institutions using the approved message and communication process.",

    "Do not mass-message institutions, repeatedly contact people who have declined, or send unsolicited bulk email.",

    "Track every approved outreach attempt in a simple CRM-style engagement tracker.",

    "For each contact, record the Institution, Contact Role, Channel, Date Contacted, Outreach Status, Response, Follow-Up Date, Next Action, and Notes.",

    "Use clear pipeline stages such as Researching, Ready for Outreach, Contacted, Follow-Up, Responded, Interested, Meeting Requested, Meeting Scheduled, Not Interested, and Closed.",

    "If someone expresses interest, do not independently negotiate pricing, sign agreements, promise partnerships, or make commitments on behalf of CareerSense. Escalate the opportunity to the designated CareerSense team.",

    "If meetings are approved and scheduled, prepare a short institutional introduction explaining what CareerSense does, which student problems it addresses, and possible ways a college could explore CareerSense.",

    "At the end of the assignment, analyze which types of institutions, contacts, messages, and channels received the strongest response.",

    "Document what you learned from unanswered messages, positive responses, objections, and meeting opportunities.",

    "Recommend at least five improvements CareerSense could make to its future college partnership strategy."
  ],

  [
    "1. College Database - submit a researched list of at least 25 colleges / universities with Location, Website, Relevant Department, Public Contact, Contact Role, Contact Channel, Priority, and Notes.",

    "2. Institution Prioritization - classify institutions into Priority A, B, or C and explain the criteria you used.",

    "3. Contact Map - identify the most relevant type of decision-maker or influencer for every institution.",

    "4. CareerSense Value Proposition - write a short customized reason why CareerSense could be useful for each Priority A institution.",

    "5. Outreach Strategy - explain who you would contact first, which channel you would use, and the sequence of follow-ups.",

    "6. Outreach Templates - create an initial Email, LinkedIn message, Follow-Up 1, Follow-Up 2, and Meeting Request template.",

    "7. Engagement Tracker - submit a CRM-style sheet containing all approved outreach activities, statuses, responses, follow-ups, and next actions.",

    "8. Response Analysis - if live outreach was approved, summarize total institutions contacted, responses, positive responses, meeting opportunities, and common objections. If outreach was not run live, clearly state that and submit the outreach plan instead.",

    "9. Meeting Opportunities - document any institutions that requested further discussion and the next step required from CareerSense.",

    "10. Lessons Learned - explain which messaging, institution types, contact roles, or channels appeared strongest and what did not work.",

    "11. Five Partnership Recommendations - provide five practical recommendations for improving CareerSense college outreach in the future.",

    "12. Final Submission - combine your college research, prioritization, outreach strategy, templates, response analysis, lessons learned, and recommendations into one PDF or presentation. Upload the College Database / Engagement Tracker separately as Excel or Google Sheets."
  ],

  "Partnership research, outreach, CRM thinking, B2B communication, sales development, stakeholder management, relationship building"
),
  a(
  17,
  "Enterprise Bridge: Take CareerSense to Companies",
  "Week 17",

  "Research organizations that could benefit from CareerSense, identify the right business decision-makers, create a clear B2B value proposition, and build a professional outreach and opportunity pipeline. The goal is to understand how companies evaluate career-readiness, employee-development, campus-hiring, skill-verification, and interview-preparation solutions.",

  [
    "Research at least 20 organizations that could be relevant for CareerSense.",

    "Choose organizations where CareerSense could potentially support use cases such as Employee Development, Graduate / Early-Career Programs, Campus Hiring, Candidate Preparation, Skill Verification, Interview Readiness, Internal Mobility, or Career Development.",

    "Use only publicly available professional and company information for your research.",

    "Do not collect private personal information, purchase questionable contact databases, scrape restricted data, or use confidential company information.",

    "For each organization, understand its industry, approximate size, hiring model, early-career programs, employee-development initiatives, and potential CareerSense use case.",

    "Identify the most relevant decision-maker personas for each organization.",

    "Possible personas may include Head of Talent Acquisition, Campus Recruitment Lead, Learning & Development Leader, HR Business Partner, Early Careers Lead, University Recruiting Manager, Talent Development Leader, People Development Leader, or another relevant role.",

    "Do not focus only on finding individual names. First identify which ROLE would logically own the problem CareerSense could solve.",

    "Create a short CareerSense opportunity statement for every target company explaining why the organization may benefit from CareerSense.",

    "Segment organizations into Priority A, Priority B, and Priority C based on strategic fit, potential user volume, relevance of the CareerSense use case, decision-maker accessibility, and likelihood of engagement.",

    "For Priority A companies, perform deeper research and identify the strongest possible CareerSense use case.",

    "Create a B2B value proposition that focuses on business outcomes rather than only listing CareerSense features.",

    "Examples of value areas may include improving candidate preparation, supporting graduate-program readiness, providing structured interview practice, helping employees identify skill gaps, improving career development, or providing skill-verification experiences.",

    "Create a concise CareerSense B2B pitch that can be delivered in approximately 60 seconds.",

    "Create a one-page company proposal explaining the business problem, CareerSense solution, relevant capabilities, potential implementation concept, expected value, and proposed next step.",

    "Create separate outreach messages for Email and LinkedIn, including an initial message and professional follow-ups.",

    "Personalize outreach for Priority A companies based on the organization, industry, hiring model, or relevant people-development initiative.",

    "Do not make unsupported claims about CareerSense customers, partnerships, ROI, hiring outcomes, certifications, employee performance, security, compliance, integrations, or enterprise capabilities.",

    "Do not promise discounts, pricing, enterprise licenses, custom development, integrations, SLAs, security commitments, data-processing terms, or contractual conditions unless CareerSense has explicitly approved them.",

    "Where CareerSense approves live outreach, contact suitable companies using the approved communication process.",

    "Do not send bulk spam, repeatedly contact people who have declined, or represent yourself as an authorized CareerSense commercial signatory.",

    "Track every approved outreach activity in a CRM-style opportunity tracker.",

    "Use pipeline stages such as Researching, Qualified, Ready for Outreach, Contacted, Follow-Up, Responded, Discovery Opportunity, Meeting Scheduled, CareerSense Handoff, Not Interested, and Closed.",

    "If a company expresses interest, prepare for a discovery conversation by researching the company and preparing questions instead of immediately trying to sell.",

    "Create at least 10 discovery questions that would help understand the organization's hiring, learning, career-development, or skills challenges.",

    "If the conversation reaches pricing, procurement, legal terms, security, integrations, contracts, data handling, or official partnership discussions, hand the opportunity to the designated CareerSense team.",

    "At the end of the assignment, analyze which company types, use cases, personas, and messages appear most promising.",

    "Recommend at least five improvements CareerSense could make to strengthen its future B2B strategy."
  ],

  [
    "1. Target Company Database - submit at least 20 researched organizations with Company, Industry, Location, Approximate Size where publicly available, Relevant Program / Need, Potential CareerSense Use Case, Priority, and Notes.",

    "2. Company Prioritization - classify organizations into Priority A, B, or C and explain the criteria used.",

    "3. Decision-Maker Persona Map - identify the most relevant buyer, influencer, and user personas for the CareerSense B2B opportunity.",

    "4. Priority A Research - provide deeper research for the strongest target organizations, including why CareerSense may be relevant to them.",

    "5. CareerSense B2B Value Proposition - explain the main business problems CareerSense could help address and the value it could provide.",

    "6. 60-Second B2B Pitch - create a concise spoken pitch that explains CareerSense, the business problem, the value proposition, and the suggested next step.",

    "7. One-Page B2B Proposal - create a professional one-page document that can be used to introduce CareerSense to a potential organization.",

    "8. Outreach Templates - create an Initial Email, LinkedIn Message, Follow-Up 1, Follow-Up 2, and Meeting Request template.",

    "9. Discovery Question Set - create at least 10 questions that could be used during an initial company discovery conversation.",

    "10. Opportunity Tracker - submit a CRM-style tracker containing Company, Persona, Contact Channel, Date Contacted, Status, Response, Follow-Up Date, Opportunity, Next Action, and Notes.",

    "11. Outreach Results - if live outreach was approved, summarize organizations contacted, responses, positive responses, discovery opportunities, meetings, and common objections. If outreach was not run live, clearly state this and submit the complete outreach plan instead.",

    "12. Meeting Opportunities - document any organizations requesting additional discussion and clearly identify the next step required from CareerSense.",

    "13. Objection Analysis - document common concerns or objections and explain how CareerSense could prepare better responses.",

    "14. Five B2B Recommendations - provide five practical recommendations for strengthening CareerSense's enterprise strategy.",

    "15. Final Submission - combine the company research, personas, value proposition, B2B pitch, proposal, outreach strategy, discovery questions, opportunity analysis, lessons learned, and recommendations into one PDF or presentation. Upload the Target Company Database / Opportunity Tracker separately as Excel or Google Sheets."
  ],

  "Business development, B2B sales, company research, stakeholder mapping, value proposition design, outreach, discovery, CRM thinking, partnership development"
),
  a(
  18,
  "Build the Community: Host a CareerSense Experience",
  "Week 18",

  "Design and, where approved, host one useful CareerSense community experience such as a webinar, resume workshop, mock interview session, AI career session, college session, LinkedIn Live, or career Q&A. Plan the event from idea to execution, including audience, topic, speakers, registration, promotion, presentation, attendee communication, delivery, feedback, and post-event analysis.",

  [
    "Choose ONE event format that provides clear value to a CareerSense audience.",

    "Recommended formats include Resume Workshop, ATS Masterclass, Mock Interview Session, AI for Careers Session, Career Readiness Workshop, College Career Session, LinkedIn Live, Skill-Building Session, or Career Q&A.",

    "Define one clear event objective. Examples include helping students improve resumes, teaching ATS readiness, preparing users for interviews, introducing AI career skills, or helping job seekers understand career readiness.",

    "Define the target audience clearly, such as college students, fresh graduates, active job seekers, working professionals, career switchers, or CareerSense community members.",

    "Choose a focused topic instead of trying to cover every CareerSense feature in one session.",

    "Create a simple event value proposition explaining why someone should spend their time attending.",

    "Define the event format, duration, date, delivery platform, speaker requirements, interaction format, and expected audience size.",

    "If another person will speak or appear in promotional material, obtain their approval before publishing their name, image, title, or session details.",

    "Create a detailed event agenda showing what will happen from opening to closing.",

    "Prepare the presentation, demonstrations, activities, worksheets, examples, or discussion questions required for the event.",

    "Where CareerSense products are demonstrated, use approved public-facing functionality and safe/sample information. Do not expose private user data, internal dashboards, credentials, admin systems, or confidential information.",

    "Create a registration experience using an approved form or event platform.",

    "Collect only the minimum participant information needed for the event, such as Name, Email, College / Company where relevant, Career Stage, and optional questions related to the session.",

    "Do not collect unnecessary sensitive personal information or share registration data outside the approved CareerSense process.",

    "Create promotional assets for the event. These may include a primary poster, social post, story / status creative, LinkedIn creative, email / WhatsApp invitation, and reminder content.",

    "Write the event title, description, registration CTA, promotional captions, invitation message, reminder message, and post-event thank-you message.",

    "Create a promotion plan showing when and where the event should be promoted.",

    "Create attendee communications for Registration Confirmation, Event Reminder, Joining Instructions, Final Reminder, and Thank You / Feedback.",

    "If the event will be recorded, clearly inform participants and speakers beforehand and follow the approved recording and consent process.",

    "Where live execution is approved, run the event professionally and ensure the session starts and ends approximately on time.",

    "Include at least one interactive element such as Polls, Q&A, Resume Review, Career Quiz, Live Demonstration, Audience Questions, or an Exercise.",

    "Keep a simple event operations checklist covering speaker readiness, presentation, links, registration list, joining link, internet/audio/video check, moderation, recording where approved, feedback form, and backup plan.",

    "Create a feedback form that measures usefulness, clarity, speaker/session quality, likelihood to recommend, favorite part, and suggestions for improvement.",

    "Track registrations, attendance, attendance rate, engagement, feedback responses, and other relevant event metrics.",

    "Do not create fake registrations, attendance figures, testimonials, feedback scores, or event results.",

    "If live execution is not approved or possible, create a complete ready-to-run event package and clearly state that the event was not conducted. Do not present planned or simulated numbers as actual results.",

    "After the event, analyze what worked, what did not work, what participants asked for, and what CareerSense should do next.",

    "Recommend at least five improvements for future CareerSense community events."
  ],

  [
    "1. Event Brief - document Event Name, Objective, Topic, Audience, Format, Platform, Duration, Proposed Date, Speaker, and Expected Outcome.",

    "2. Target Audience & Value Proposition - explain exactly who the event is for, what problem it addresses, and why someone should attend.",

    "3. Event Agenda - provide a minute-by-minute or section-by-section session flow from introduction to closing.",

    "4. Presentation / Session Material - submit the slides, worksheets, examples, demos, discussion prompts, or other material used during the event.",

    "5. Registration Plan - provide the registration form / registration structure and explain what attendee information is being collected and why.",

    "6. Promotional Content - submit the main event poster plus relevant social-media, LinkedIn, WhatsApp / email, story, or reminder creatives and copy.",

    "7. Promotion Calendar - show when each promotional activity should happen before the event.",

    "8. Communication Templates - provide Registration Confirmation, Reminder, Joining Instructions, Final Reminder, Thank You, and Feedback Request messages.",

    "9. Event Operations Checklist - document the complete checklist required to run the event smoothly.",

    "10. Engagement Plan - explain how you will keep participants involved through polls, Q&A, exercises, demonstrations, reviews, or other interactive activities.",

    "11. Feedback Form - create a structured post-event feedback form and provide the questions used.",

    "12. Registration & Attendance Report - if the event was officially conducted, document registrations, attendees, attendance rate, and relevant audience information using only approved data.",

    "13. Feedback Analysis - summarize feedback score, response rate, common positive comments, improvement areas, and repeated participant requests.",

    "14. Community Insights - identify what the event taught you about CareerSense users, their problems, interests, or future learning needs.",

    "15. Post-Event Report - explain what worked, what did not work, operational challenges, participant engagement, and what you would change next time.",

    "16. Five Recommendations - provide at least five practical recommendations for improving future CareerSense community events.",

    "17. Final Submission - combine the event strategy, agenda, promotional content, presentation, communications, registration / attendance summary, feedback analysis, lessons learned, and recommendations into one Event Report PDF or presentation. Upload editable creatives, presentation files, and tracker / feedback sheet separately where applicable."
  ],

  "Event planning, community management, operations, public speaking, content creation, marketing, communication, feedback analysis"
),
  a(
  19,
  "CEO for a Week: CareerSense Operating Simulation",
  "Week 19",
  "Run a seven-day simulated CEO week where new business situations arrive every day. Make a decision with incomplete information, protect the company's priorities, update resources and risks as conditions change, and finish with a focused 90-day operating plan. All scenario numbers are simulations unless CareerSense explicitly states otherwise.",
  [
    "Begin the week by writing your CEO thesis for CareerSense in one sentence: who the company serves, the problem it solves, and the most important outcome you would protect.",
    "Choose only THREE company objectives for the next 90 days and define one measurable result for each before seeing the daily scenarios.",
    "Create an initial hypothetical 100-point resource allocation across Product & Engineering, Growth, Customer / Community, Partnerships & Sales, Data / AI, and Operations.",
    "Day 1 Scenario - registrations are simulated to be up 40%, but only 18% of new users reach the defined activation event. Decide what you would investigate, what you would change now, what you would not change yet, and which metric you would watch.",
    "Day 2 Scenario - a university is simulated to request a 5,000-student pilot within 30 days. Decide whether to pursue it, what conditions must be true, what capacity risks exist, and what work would be delayed if you accept.",
    "Day 3 Scenario - AI inference cost for important AI features is simulated to increase 2.4x. Decide what to optimize, restrict, redesign, measure, or renegotiate without simply removing all AI value.",
    "Day 4 Scenario - a critical mobile problem is simulated to affect the Resume Builder journey. Decide the incident priority, user communication, temporary mitigation, engineering focus, and what work should pause.",
    "Day 5 Scenario - a promising enterprise prospect is simulated to ask for a custom capability that is not on the roadmap. Decide whether to build, configure, defer, decline, or investigate it, and explain how you avoid one-customer roadmap capture.",
    "Day 6 Scenario - a growth campaign is simulated to produce 90% more traffic while registration conversion becomes worse. Decide whether to scale, pause, change targeting, change the landing experience, or investigate measurement quality.",
    "Day 7 Scenario - assume you can fund only ONE near-term capability: senior product/engineering capacity, growth capacity, partnerships/sales capacity, or customer-success/community capacity. Choose one and explain what evidence drives the decision.",
    "For every daily scenario, use the same CEO Decision format: Decision → Evidence Available → Assumptions → Immediate Action → Expected Impact → KPI → Risk / Trade-Off → What We Will NOT Do.",
    "After every scenario, update your 100-point resource allocation and explain any material movement instead of resetting the company strategy from scratch.",
    "Maintain a rolling Risk Register and Assumption Register, adding or closing items as the simulated week changes your understanding.",
    "Identify at least two moments where a new scenario forced you to reverse, narrow, or delay an earlier decision and explain why changing your mind was rational.",
    "At the end of the week, create a Start / Continue / Stop plan based on what you learned from all seven scenarios.",
    "Create a Month 1, Month 2, and Month 3 operating roadmap connected only to the three company objectives you selected at the beginning or explicitly revised during the simulation.",
    "Define an 8-12 metric CEO dashboard that tells you whether Product Value, Growth, Retention, Revenue / Business Model, Partnerships, Reliability, and Customer Experience are moving in the right direction.",
    "Create a final Founder Memo explaining the three most important decisions you made, the hardest trade-off, the decision you regret or would revisit, and what you now believe CareerSense should focus on next.",
    "Prepare a 10-minute leadership review that tells the story of the week through decisions and changing evidence rather than repeating every artifact."
  ],
  [
    "1. CEO Starting Position - one-sentence thesis, three 90-day objectives, and initial 100-point resource allocation.",
    "2. Seven Daily Decision Memos - one for each simulated scenario using the required CEO Decision format.",
    "3. Resource Allocation Tracker - show how the 100-point allocation changed during the week and why.",
    "4. Rolling Risk & Assumption Register - include what was added, changed, validated, or closed.",
    "5. Changed-My-Mind Log - document at least two decisions materially changed by new evidence.",
    "6. Start / Continue / Stop Plan - identify what CareerSense should begin, protect, and stop or delay.",
    "7. Three-Month Operating Roadmap - Month 1, Month 2, Month 3 linked to the selected company objectives.",
    "8. CEO KPI Dashboard - approximately 8-12 decision-oriented metrics with Definition, Desired Direction, Warning Signal, and Leadership Action.",
    "9. Final Founder Memo - summarize the most important decisions, trade-offs, unresolved risk, and next focus.",
    "10. 10-Minute Leadership Presentation - present the simulated week as a connected decision story.",
    "11. Final Submission - combine the simulation decisions, resource tracker, risks, roadmap, KPI dashboard, Founder Memo, and presentation into one CEO Operating Pack."
  ],
  "Startup leadership, decision making under uncertainty, prioritization, resource allocation, incident response, growth, product strategy, risk management, executive communication",
  "All scenarios and figures in this assignment are simulations unless explicitly identified as CareerSense-provided facts. The exercise does not authorize spending, hiring, product changes, contracts, outreach, or company commitments."
),
  a(
  20,
  "Partner to Founder: The CareerSense Boardroom Challenge",
  "Week 20",
  "Present to CareerSense leadership as if you were part of the founding team. Using evidence accumulated across the full Partner Program, answer one boardroom question: If you had a hypothetical ₹1 crore and 12 months, how would you build a stronger CareerSense product, create recurring user value, grow sustainable revenue, expand the right partnerships, and build a company that can execute?",
  [
    "Start by reviewing your full Founder Operating System: Product Backlog, Customer Insights, Decision Log, Assumptions, KPI Scorecard, Risks, Experiments, Growth Backlog, Partnership CRM, and 90-Day priorities.",
    "Separate verified observations, externally sourced facts, CareerSense-provided information, assumptions, and simulations before using them in the final strategy.",
    "Write a one-page diagnosis of CareerSense today covering Product, Customer Value, Technology, AI, Data, Growth, Retention, Revenue Model, Universities, B2B, Community, Operations, Team, and Risk.",
    "Define only three to five measurable company outcomes for the next 12 months and explain why these outcomes matter more than competing priorities.",
    "Define the primary target users and buyers CareerSense should focus on during the year and write one clear positioning statement.",
    "Create a Product Strategy identifying which existing experiences should be improved, connected, simplified, expanded, deprioritized, or stopped.",
    "Explain how the major CareerSense capabilities should form one connected career journey rather than a collection of disconnected tools.",
    "Identify at least five things CareerSense should deliberately NOT build or pursue during the next 12 months.",
    "Create a Technology & Reliability Strategy covering product quality, performance, security, privacy, deployment, observability, technical debt, and developer productivity at a level appropriate for a founder plan.",
    "Create an AI Strategy identifying where AI creates meaningful user value, how quality should be evaluated, what privacy / safety / hallucination risks exist, and where AI should not be added.",
    "Create a Data & Experimentation Strategy defining the product events, business metrics, KPI definitions, experimentation capability, and decision rituals CareerSense should establish.",
    "Create a Retention Strategy explaining how CareerSense should move users from registration to activation, repeated value, multi-feature adoption, and long-term engagement.",
    "Create a Growth Strategy choosing only two to four primary acquisition channels and explain how those channels connect to activation and retention rather than vanity metrics.",
    "Create a University Strategy covering ideal institution profile, partnership value, pilot path, decision-makers, success measures, and expansion logic.",
    "Create a Company / B2B Strategy covering strongest use cases, buyer personas, discovery process, pilot concept, success criteria, and what enterprise requests CareerSense should avoid chasing prematurely.",
    "Create a Community Strategy showing how recurring experiences, learning, challenges, events, content, projects, and peer participation could create user value and strengthen retention.",
    "Create a Revenue & Business Model Strategy using the Week 12 work: what remains free, what CareerSense should test charging for, major unit-economic assumptions, and what evidence is still missing.",
    "Create a Growth Model showing Discovery → Registration → Activation → Engagement → Retention → Paid / Partnership Outcome with the most uncertain conversion assumptions clearly identified.",
    "Allocate exactly ₹1,00,00,000 of hypothetical strategic budget across the priorities you believe matter most and connect every major allocation to an expected outcome, KPI, assumption, and trade-off.",
    "Create a Team / Capability Plan identifying what should be hired, contracted, automated, handled by partners, delayed, or solved by improving existing processes.",
    "Create a 12-month roadmap in logical phases or quarters, with every major initiative linked to one of the company outcomes.",
    "Create a detailed 30 / 60 / 90-day execution plan showing what leadership should do first if the strategy were accepted.",
    "Define a Board-Level KPI Framework containing approximately 10-15 metrics across Product Value, Activation, Engagement, Retention, Growth, Revenue / Business Model, Partnerships, Reliability, and Customer Experience.",
    "Create a final Assumption Register identifying the assumptions most likely to invalidate the strategy and the cheapest credible way to test each one.",
    "Create a final Risk Register covering strategic, product, technical, privacy, financial, growth, partnership, operational, and execution risks with early warning signals and mitigations.",
    "Create Base Case, Strong Growth Case, and Weak Growth Case scenarios and explain which spending, roadmap, or hiring decisions would change in each.",
    "Define what success should look like at Month 3, Month 6, Month 9, and Month 12.",
    "Select your Top 10 Founder Decisions using Decision → Why → Expected Impact → Investment → KPI → Risk / Trade-Off.",
    "Prepare a professional 15-20 slide Boardroom Presentation that tells one connected strategic story and does not simply combine 19 previous assignment decks.",
    "Prepare to defend your decisions in approximately 15 minutes, including questions on prioritization, budget, customer value, business model, retention, technology, AI, partnerships, risks, and what you deliberately chose not to do.",
    "Complete a final Partner Reflection showing how your startup thinking changed from Week 1, the decisions you would make differently now, your strongest evidence-backed contribution, and what responsibility you are ready to own next."
  ],
  [
    "1. Founder Strategy Deck - a professional 15-20 slide boardroom story covering the diagnosis, strategic outcomes, positioning, priorities, major decisions, and expected impact.",
    "2. 12-Month Operating Plan - product, technology, AI, data, retention, growth, university, B2B, community, revenue, team, milestones, and roadmap in one connected strategy.",
    "3. ₹1 Crore Financial & Resource Model - allocate exactly ₹1,00,00,000 and show Expected Outcome, KPI, Assumption, and Trade-Off for every major allocation.",
    "4. Growth, Retention & Revenue Model - show Discovery → Activation → Engagement → Retention → Paid / Partnership Outcome plus business-model assumptions and key experiments.",
    "5. Product / Technology / AI Decision Pack - include what should improve, connect, build, delay, stop, and the reasoning behind those decisions.",
    "6. Board KPI + Risk Dashboard - 10-15 KPIs, final Risk Register, final Assumption Register, warning signals, and leadership actions.",
    "7. 30 / 60 / 90-Day Execution Plan - the immediate operating plan leadership would follow before the broader 12-month roadmap.",
    "8. Top 10 Founder Decision Log - provide the ten highest-impact decisions with expected impact, investment, KPI, risk, and trade-off.",
    "9. Boardroom Presentation & Defence - deliver the strategy in approximately 15 minutes and answer leadership questions.",
    "10. Personal Founder Reflection - explain how your thinking changed, strongest contribution, mistakes / revisions, skills developed, and the responsibility you believe you are ready to own next.",
    "11. Final Submission - submit the Strategy Deck, Operating Plan, Financial Model, Growth/Retention/Revenue Model, KPI/Risk Dashboard, 90-Day Plan, Decision Log, and Reflection as the final CareerSense Partner Program capstone."
  ],
  "Founder thinking, startup strategy, finance, resource allocation, product strategy, technology, AI, data, retention, growth, revenue, partnerships, leadership, business operations, executive storytelling",
  "The ₹1 crore budget, projections, scenarios, future pricing, partnerships, customers, hiring, and roadmap choices are strategic simulations unless explicitly approved by CareerSense. Do not represent them as official commitments."
),
  ];

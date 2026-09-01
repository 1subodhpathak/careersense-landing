export const uiuxDesignPhases = [
  { id: 1, title: "Build UX Foundations", range: "Weeks 1-4", assignmentIds: [1, 2, 3, 4] },
  { id: 2, title: "Design Real Product Experiences", range: "Weeks 5-8", assignmentIds: [5, 6, 7, 8] },
  { id: 3, title: "Build Scalable Interface Systems", range: "Weeks 9-12", assignmentIds: [9, 10, 11, 12] },
  { id: 4, title: "Design Modern Product Experiences", range: "Weeks 13-16", assignmentIds: [13, 14, 15, 16] },
  { id: 5, title: "Operate Like a Product Designer", range: "Weeks 17-20", assignmentIds: [17, 18, 19, 20] },
];

const phaseFor = (id) => uiuxDesignPhases.find((phase) => phase.assignmentIds.includes(id))?.id ?? null;

const evaluation = [
  { criterion: "Problem framing & UX reasoning", weight: 25 },
  { criterion: "Interaction & information design", weight: 20 },
  { criterion: "Visual design & consistency", weight: 20 },
  { criterion: "Research, validation & accessibility", weight: 20 },
  { criterion: "Documentation & presentation", weight: 15 },
];

const a = (id, title, mission, tasks, deliverables, skills, specialNote = "") => ({
  id,
  phaseId: phaseFor(id),
  week: id,
  timeline: `Week ${id}, Day 1 - Week ${id}, Day 7`,
  title,
  mission,
  summary: mission,
  tasks,
  deliverables,
  skills,
  specialNote,
  points: 1000,
  evidence: {
    maxLinks: 8,
    allowMultipleFiles: true,
    acceptedTypes: [
      "PDF", "DOCX", "PPTX", "FIG", "SVG", "PNG", "JPG", "JPEG",
      "GIF", "MP4", "MOV", "CSV", "XLSX", "ZIP"
    ],
  },
  evaluation,
});

export const uiuxDesignAssignments = [
  a(1, "Rescue the Signup Experience",
    "A consumer app is losing new users before they ever reach the product. Audit a deliberately frustrating signup and login experience, identify the highest-friction moments, and redesign the entry journey so it is clearer, faster, more inclusive, and easier to recover when something goes wrong.",
    [
      "Recreate or select an intentionally weak signup and login flow with at least six screens or states, then capture the current experience as a baseline before changing anything.",
      "Run a heuristic review focused on clarity, hierarchy, consistency, error prevention, recognition over recall, user control, and recovery from mistakes; rank the issues by severity.",
      "Map the complete entry journey from first visit through account creation, verification, login, forgot-password, and successful landing so hidden dead ends become visible.",
      "Rewrite labels, helper text, validation messages, button copy, password guidance, and recovery instructions in plain language without adding unnecessary explanation.",
      "Create low-fidelity alternatives for the two highest-friction moments and compare them against the original using a short decision matrix.",
      "Design the final high-fidelity mobile flow with default, focused, filled, invalid, loading, disabled, success, and recovery states rather than showing only happy-path screens.",
      "Check keyboard order, visible focus, touch-target size, contrast, form labels, error identification, and screen-reader-friendly field naming; record each accessibility correction.",
      "Produce a before-versus-after rationale explaining which design decisions reduce effort, confusion, abandonment risk, or support burden and which product metric should move if the redesign works."
    ],
    [
      "1. Baseline signup/login screen capture and problem inventory.",
      "2. Severity-ranked heuristic audit.",
      "3. End-to-end entry journey map.",
      "4. Low-fidelity alternatives and decision matrix.",
      "5. High-fidelity Figma flow covering normal and edge states.",
      "6. Accessibility correction checklist.",
      "7. Before/after design rationale with success metric.",
      "8. Shareable Figma or prototype link."
    ],
    "UX heuristics, form design, interaction states, microcopy, accessibility, visual hierarchy, Figma fundamentals",
    "Do not submit only polished screens. The evidence must show what was wrong, why it mattered, and how the redesign addresses specific user problems."),

  a(2, "Fix the Checkout That Makes Customers Leave",
    "An e-commerce company sees strong add-to-cart activity but poor purchase completion. Diagnose the checkout experience, remove avoidable friction, and prototype a purchase flow that improves confidence without using manipulative patterns.",
    [
      "Inspect a real or synthetic e-commerce checkout and document every step, decision, field, interruption, reassurance cue, fee reveal, and exit opportunity from cart to order confirmation.",
      "Create a friction map that separates necessary effort from unnecessary effort and identifies where uncertainty, forced registration, surprise costs, or weak feedback may cause abandonment.",
      "Define the minimum information genuinely required to complete an order and justify what should be removed, deferred, auto-filled, or made optional.",
      "Sketch three checkout structures such as single-page, stepped, or express-first and choose one using conversion, comprehension, mobile effort, and implementation complexity as decision criteria.",
      "Design cart, delivery, address, shipping, payment, review, error, payment-failure, and confirmation experiences with persistent awareness of order total and progress.",
      "Add trust signals only where they answer a real concern, including delivery expectations, refund information, secure-payment cues, editable order details, and transparent fees.",
      "Create an unmoderated task script for a first-time shopper, define observable failure signals, and run the prototype with at least three people without coaching them through the flow.",
      "Turn the test evidence into a prioritized iteration log and propose one product experiment with a primary metric, guardrail metric, and ethical constraint."
    ],
    [
      "1. Current-state checkout walkthrough.",
      "2. Necessary-vs-unnecessary friction map.",
      "3. Information minimization rationale.",
      "4. Checkout structure explorations and selection matrix.",
      "5. Complete interactive checkout prototype.",
      "6. Three-user task-test evidence.",
      "7. Prioritized iteration log.",
      "8. Ethical conversion experiment plan."
    ],
    "Checkout UX, conversion design, user flows, trust design, prototyping, usability testing, growth ethics"),

  a(3, "Design a Mobile Food Ordering Experience",
    "A neighborhood food marketplace needs a mobile experience that helps hungry users discover a meal, customize it, place an order, and track delivery without losing context. Design the core customer journey from first browse to completed delivery.",
    [
      "Define two high-intent ordering situations such as a quick solo lunch and a group dinner, including what each user values, what creates urgency, and what information they need before deciding.",
      "Organize restaurants, cuisines, offers, delivery time, dietary needs, ratings, price, and search into an information architecture that still works when the catalog becomes large.",
      "Create a task flow for discovery, restaurant selection, menu scanning, item customization, cart review, checkout entry, order tracking, and post-delivery action.",
      "Wireframe the key mobile screens at low fidelity and test whether users can maintain location, restaurant, item, price, and cart context while moving through the experience.",
      "Design reusable mobile patterns for restaurant cards, menu sections, item modifiers, quantity controls, dietary markers, offer application, persistent cart access, and order status.",
      "Resolve difficult interaction cases including unavailable items, required modifiers, minimum order, address outside delivery range, delayed order, and contactless-delivery instructions.",
      "Build a high-fidelity prototype with realistic menu content and motion only where it communicates state, continuity, confirmation, or progress.",
      "Record a two-minute product walkthrough explaining the ordering journey, the most important trade-off you made, and one behavior you intentionally chose not to add."
    ],
    [
      "1. Two ordering-context briefs.",
      "2. Mobile information architecture.",
      "3. End-to-end ordering task flow.",
      "4. Low-fidelity wireframe set.",
      "5. Reusable mobile UI pattern sheet.",
      "6. Edge-case screen collection.",
      "7. High-fidelity interactive prototype.",
      "8. Two-minute design walkthrough."
    ],
    "Mobile UX, information architecture, task flows, interaction design, component thinking, edge-state design, prototyping"),

  a(4, "Turn User Complaints Into a Better Product",
    "A subscription product has accumulated complaints across app reviews, support tickets, and customer interviews. Convert messy qualitative feedback into a defensible product opportunity and design a focused improvement rather than guessing what users want.",
    [
      "Collect or use a provided set of at least 40 qualitative feedback items from reviews, interview notes, support tickets, forums, or synthetic research and preserve the original wording.",
      "Code the feedback into observations without immediately proposing solutions, then group related observations using affinity mapping and label each cluster in user-centered language.",
      "Separate frequency from severity so a rare but critical breakdown is not hidden by a large number of minor complaints.",
      "Create one evidence-based proto-persona or needs profile that summarizes goals, behaviors, constraints, triggers, and frustrations without inventing unsupported demographic detail.",
      "Map the current journey for the chosen problem and annotate emotional highs, low points, workarounds, breakdowns, unanswered questions, and backstage causes suggested by the evidence.",
      "Write several How Might We opportunities, evaluate them against user value, business relevance, confidence, and effort, and select one design challenge for the remainder of the project.",
      "Produce concept sketches for at least four substantially different approaches before committing to a direction, then state what evidence influenced the choice.",
      "Design a focused solution concept and create a research readout that distinguishes direct evidence, interpretation, assumption, and questions that still require validation."
    ],
    [
      "1. Qualitative research corpus or source log.",
      "2. Affinity map with coded observations.",
      "3. Frequency-versus-severity prioritization.",
      "4. Evidence-based needs profile.",
      "5. Current-state journey map.",
      "6. How Might We opportunity set and prioritization.",
      "7. Four concept directions plus selected concept.",
      "8. Research-backed solution readout."
    ],
    "Qualitative research, affinity mapping, persona discipline, journey mapping, opportunity framing, concept generation, evidence-based design",
    "Do not fabricate research quotes or claim that synthetic participants are real users. Clearly label the source and limitations of every research input."),

  a(5, "Design a Fintech Command Center",
    "A personal-finance startup wants one place where users can understand cash flow, upcoming obligations, spending patterns, savings progress, and account health without being overwhelmed. Design a dashboard that supports decisions rather than merely displaying charts.",
    [
      "Define the five financial decisions the dashboard must help a user make and rank the information required for each decision by urgency and frequency.",
      "Inventory candidate metrics and classify them as headline status, diagnostic detail, trend, forecast, alert, or action so every number has a purpose.",
      "Create a content hierarchy that determines what belongs above the fold, what appears on demand, and what should never compete for primary attention.",
      "Design an overview layout using progressive disclosure so balances, bills, spending, savings, and anomalies remain scannable at a glance but support deeper investigation.",
      "Create chart choices for cash flow, category spending, account movement, and savings progress, then justify why each encoding is appropriate for the question being answered.",
      "Design sensitive-finance states including hidden balances, disconnected account, failed sync, unusual transaction, negative cash flow, overdue bill, and no historical data.",
      "Apply a clear visual language for positive, neutral, cautionary, and risky information without relying on color alone to communicate meaning.",
      "Run a five-second comprehension check with at least three reviewers and revise anything they consistently misunderstand, overlook, or misinterpret."
    ],
    [
      "1. Dashboard decision brief.",
      "2. Metric-purpose inventory.",
      "3. Content hierarchy and layout rationale.",
      "4. High-fidelity fintech dashboard.",
      "5. Chart-selection rationale.",
      "6. Sensitive and exceptional-state designs.",
      "7. Accessible visual-language reference.",
      "8. Five-second test findings and revision evidence."
    ],
    "Dashboard UX, data visualization, information hierarchy, financial UX, progressive disclosure, exceptional states, comprehension testing"),

  a(6, "Build an Interactive Travel Booking Prototype",
    "A travel platform needs a booking experience that helps users compare options, understand trade-offs, and confidently reserve a trip despite dates, filters, fare rules, extras, and changing availability. Create a realistic interactive prototype, not a static set of screens.",
    [
      "Choose one booking domain such as flights, hotels, trains, or vacation rentals and document the high-stakes decisions users make before purchase.",
      "Model the search parameters, comparison criteria, filter logic, sort options, fare or room variations, and booking constraints that the interface must support.",
      "Design a search-results experience that makes meaningful differences comparable without forcing users to open every result individually.",
      "Create an interaction pattern for changing dates, travelers, filters, and preferences while preserving the user's previous selections wherever possible.",
      "Prototype the transition from search result to detail, option selection, extras, traveler information, payment review, and booking confirmation with realistic branching.",
      "Add price-change, sold-out, limited-availability, cancellation-policy, connection-time, and retry states that communicate what changed and what the user can do next.",
      "Use variables, component properties, overlays, interactive components, or equivalent prototyping features so the prototype behaves like a coherent product rather than linked images.",
      "Create a prototype test checklist and verify every intended branch, back action, overlay, input state, and confirmation path before submission."
    ],
    [
      "1. Travel-domain decision brief.",
      "2. Search and comparison logic model.",
      "3. Results and filtering interaction design.",
      "4. Complete booking prototype with branching.",
      "5. Price/availability disruption states.",
      "6. Advanced Figma interaction evidence.",
      "7. Prototype QA checklist.",
      "8. Shareable interactive prototype link."
    ],
    "Complex flows, comparison UX, filters and sorting, interactive prototyping, transactional UX, state continuity, prototype QA"),

  a(7, "Design for Accessibility, Not Just Beauty",
    "A visually polished digital service excludes users through weak contrast, inaccessible forms, poor focus behavior, ambiguous icons, and motion choices. Audit the experience and produce an inclusive redesign that can be defended against concrete accessibility requirements.",
    [
      "Select an existing interface containing navigation, form inputs, interactive controls, imagery, and at least one dynamic component so the audit covers more than color contrast.",
      "Evaluate text contrast, non-text contrast, zoom resilience, touch targets, focus visibility, heading order, landmarks, labels, instructions, status messaging, and error recovery against relevant WCAG guidance.",
      "Simulate keyboard-only use and document where focus order, hidden controls, traps, missing states, or hover-only behavior would block completion.",
      "Review icons, images, charts, and decorative content to decide what requires alternative text, adjacent labels, captions, patterns, or should be ignored by assistive technology.",
      "Redesign one complex form so labels, required fields, instructions, validation timing, inline errors, summary errors, success feedback, and recovery remain understandable without relying on color.",
      "Create accessible component states for buttons, links, inputs, toggles, checkboxes, menus, dialogs, and notifications including keyboard and focus behavior annotations.",
      "Document motion and animation preferences, including how the experience should respond to reduced-motion settings and what feedback must remain when animation is removed.",
      "Build an accessibility conformance report showing each audited problem, user impact, criterion or principle, proposed correction, and verification method."
    ],
    [
      "1. Accessibility audit scope and evidence.",
      "2. WCAG-oriented issue register.",
      "3. Keyboard-path findings.",
      "4. Non-text content treatment plan.",
      "5. Accessible complex-form redesign.",
      "6. Accessible component-state library.",
      "7. Reduced-motion behavior specification.",
      "8. Accessibility conformance report."
    ],
    "Accessibility, WCAG reasoning, keyboard UX, forms, assistive-technology considerations, inclusive components, design annotation",
    "Accessibility should be treated as a functional product requirement, not as a visual checklist added after the design is finished."),

  a(8, "Run Your First Usability Study and Fix the Product",
    "A team is debating whether a new feature is ready to ship. Plan and run a small usability study, capture behavioral evidence, separate observed problems from opinions, and iterate the product based on what participants actually struggle with.",
    [
      "Select a feature-rich prototype or product flow and write a research objective that names the decisions the team needs the study to inform.",
      "Define participant criteria, recruitment constraints, session format, consent language, confidentiality expectations, and what would make a participant unsuitable for the study.",
      "Write five behavior-based tasks that give participants goals without revealing the exact controls, labels, or steps you expect them to use.",
      "Create a moderator guide with neutral prompts, follow-up questions, timeboxes, note-taking conventions, and rules for when the facilitator may intervene.",
      "Run at least three sessions, recording task completion, hesitation, misclicks, backtracking, quotes, workaround behavior, confidence, and moments requiring assistance.",
      "Synthesize observations into a severity-ranked findings table using evidence across participants rather than treating every comment as equally important.",
      "Redesign the two most consequential usability breakdowns and show precisely how the revised interaction responds to the observed behavior.",
      "Prepare a research playback for the product team with findings, clips or notes, design changes, unresolved risks, and what should be tested next."
    ],
    [
      "1. Usability-study research plan.",
      "2. Participant criteria and consent approach.",
      "3. Behavior-based task script.",
      "4. Moderator guide.",
      "5. Session notes or recordings where permission exists.",
      "6. Severity-ranked findings table.",
      "7. Evidence-driven redesign of two breakdowns.",
      "8. Product-team research playback."
    ],
    "Usability research, moderation, task design, observation, synthesis, severity rating, evidence-driven iteration"),

  a(9, "Create a Design System From First Principles",
    "A product has grown into dozens of screens with inconsistent colors, spacing, components, and interaction patterns. Build a scalable design system that creates consistency without freezing the product into rigid templates.",
    [
      "Audit at least eight existing screens and catalogue visual and behavioral inconsistencies across typography, color, spacing, radius, elevation, iconography, controls, and component states.",
      "Create a token architecture for color, typography, spacing, sizing, radius, elevation, and semantic intent, distinguishing primitive values from product-facing semantic tokens.",
      "Define naming conventions and governance rules that make tokens and components understandable to both designers and developers without depending on visual appearance names such as blue-500 for every use case.",
      "Build foundational components including buttons, inputs, selectors, checkboxes, radio controls, badges, alerts, tabs, navigation, cards, and dialogs using variants and properties rather than duplicated frames.",
      "Specify component anatomy, content rules, allowed variants, responsive behavior, interactive states, accessibility expectations, and situations where the component should not be used.",
      "Create at least three composite patterns such as a data table toolbar, account settings form, filter panel, or confirmation workflow using the system's primitives and components.",
      "Stress-test the library by recreating two audited screens exclusively with system assets and record where the system breaks, over-constrains, or needs an additional primitive.",
      "Publish a lightweight design-system documentation page covering principles, tokens, components, contribution workflow, versioning expectations, and deprecation guidance."
    ],
    [
      "1. Interface inconsistency audit.",
      "2. Token architecture and naming scheme.",
      "3. Foundation and semantic token set.",
      "4. Component library with variants and states.",
      "5. Component usage documentation.",
      "6. Three composite product patterns.",
      "7. Two-screen system stress test.",
      "8. Design-system governance documentation."
    ],
    "Design systems, design tokens, component architecture, variants, governance, documentation, designer-developer consistency"),

  a(10, "Design a SaaS Product Using Your System",
    "A B2B startup needs a multi-page SaaS workspace for teams to manage work, roles, activity, and reporting. Use the design system from the previous project to prove it can support a real product at scale.",
    [
      "Write a product brief for a small B2B SaaS tool with at least three roles and identify the recurring jobs each role must complete inside the product.",
      "Create an application-level information architecture covering global navigation, workspace switching, primary objects, settings, help, notifications, and account controls.",
      "Model permission-aware behavior so users with different roles understand what they can view, edit, invite, approve, configure, or are prevented from accessing.",
      "Design a dense list or table experience with search, filter, sort, bulk action, column management, pagination or infinite loading, and row-level actions while preserving readability.",
      "Create an object detail page that balances summary, status, history, collaboration, related records, and next actions without turning into a collection of unrelated cards.",
      "Design product-level states for first-time empty workspace, permission denied, deleted record, network failure, stale data, background processing, and partial success.",
      "Use only system tokens and documented components for the high-fidelity product, extending the library through a recorded contribution decision when a genuinely new pattern is needed.",
      "Create a consistency review comparing multiple pages for spacing, behavior, terminology, component usage, hierarchy, and role-specific affordances."
    ],
    [
      "1. B2B SaaS product and role brief.",
      "2. Application information architecture.",
      "3. Role-and-permission behavior matrix.",
      "4. Advanced list/table design.",
      "5. Object detail experience.",
      "6. Product-level state library.",
      "7. Multi-page SaaS high-fidelity design.",
      "8. Design-system consistency review."
    ],
    "B2B SaaS UX, role-based design, information architecture, data-dense UI, permission states, scalable product design, system adoption"),

  a(11, "Redesign a Real App With Evidence",
    "Choose a widely used digital product and improve one meaningful experience without redesigning it merely because you prefer a different visual style. Build a case for change using evidence, constraints, and measurable product outcomes.",
    [
      "Select one bounded journey inside a real application and state why it deserves attention based on observable friction, public feedback, heuristic issues, accessibility concerns, or product opportunity.",
      "Benchmark at least four comparable products at the interaction-pattern level, documenting what each competitor solves well, what it sacrifices, and which ideas should not be copied blindly.",
      "Capture the current journey step by step and annotate decision points, repeated effort, ambiguity, hidden dependencies, failure states, and moments where the product's existing mental model must be preserved.",
      "Write a redesign hypothesis linking a specific user problem to a proposed behavioral change and a product or experience metric that could validate the change after launch.",
      "Generate divergent concepts that include at least one conservative improvement, one structural rethinking, and one deliberately experimental direction before selecting a path.",
      "Create the redesigned experience while preserving relevant brand, platform, business, legal, technical, and content constraints instead of treating the project as a blank canvas.",
      "Conduct a side-by-side critique of original and redesigned flows using task effort, clarity, accessibility, error recovery, and product implications rather than aesthetic preference.",
      "Publish the work as a portfolio-style case study that clearly separates observed evidence, assumptions, proposed solution, expected outcome, and limitations."
    ],
    [
      "1. Redesign opportunity statement and evidence log.",
      "2. Four-product interaction benchmark.",
      "3. Annotated current-state journey.",
      "4. Redesign hypothesis and success metric.",
      "5. Three divergent concept directions.",
      "6. Constraint-aware final redesign.",
      "7. Original-versus-redesign critique.",
      "8. Portfolio-ready case study."
    ],
    "Product critique, competitive analysis, redesign strategy, constraint awareness, concept divergence, case-study writing, outcome thinking",
    "Do not claim access to internal product metrics or user research you do not have. Public evidence and assumptions must be labeled accurately."),

  a(12, "Make One Product Work on Every Screen",
    "A desktop-first product now needs to work convincingly on phones, tablets, laptops, and wide monitors. Redesign one complex experience as a responsive system where content priority and interaction behavior adapt intentionally rather than simply shrinking.",
    [
      "Choose a complex product page with navigation, content hierarchy, interactive controls, and a data-rich or transactional section that cannot be solved by stacking every element vertically.",
      "Define responsive content priorities by deciding what remains primary, what condenses, what relocates, what becomes progressive, and what can disappear at smaller widths.",
      "Set breakpoint logic based on layout failure and content needs rather than copying device names, then document the reason for each layout transition.",
      "Design a responsive grid and spacing strategy that handles narrow mobile, larger mobile, tablet, standard desktop, and wide desktop without creating arbitrary one-off dimensions.",
      "Adapt navigation, tables, filters, dialogs, toolbars, forms, and secondary actions for touch, pointer, and varying available space while preserving task continuity.",
      "Create responsive component behaviors showing when components reflow, collapse, wrap, scroll, transform into alternate patterns, or expose actions differently.",
      "Build a prototype that demonstrates at least three responsive transitions or viewport-specific interaction changes rather than providing only static artboards.",
      "Perform a responsive QA pass using long labels, localization expansion, empty content, dense content, zoom, and extreme viewport widths to expose brittle layouts."
    ],
    [
      "1. Responsive product-page selection rationale.",
      "2. Content-priority rules.",
      "3. Breakpoint logic document.",
      "4. Responsive grid and spacing specification.",
      "5. Mobile, tablet, desktop, and wide-screen designs.",
      "6. Responsive component behavior sheet.",
      "7. Viewport-transition prototype.",
      "8. Responsive stress-test report."
    ],
    "Responsive design, adaptive UX, content prioritization, breakpoint reasoning, multi-input interaction, responsive components, layout QA"),

  a(13, "Design an AI Research Assistant People Can Trust",
    "An AI team can generate answers, search sources, and use tools, but users do not understand what the system is doing or when to trust it. Design the end-to-end experience of an AI research assistant that communicates capability, uncertainty, sources, progress, and control.",
    [
      "Define three research jobs the assistant should support and distinguish what the AI may do automatically, what it should suggest, and what requires explicit user confirmation.",
      "Map the lifecycle of an AI request from prompt composition through planning, searching, tool activity, streaming generation, citation attachment, completion, follow-up, and failure.",
      "Design a prompt composer that supports text, file attachment, constraints, examples, mode or scope selection, and clarification without making the interface feel like a configuration panel.",
      "Create transparent in-progress states for thinking, searching, reading, tool execution, waiting, partial completion, cancellation, and recovery without exposing fabricated certainty or meaningless animation.",
      "Design answer presentation that differentiates generated synthesis, quoted or sourced evidence, citations, assumptions, unresolved questions, and low-confidence areas.",
      "Resolve AI-specific failure cases such as missing source, conflicting sources, unsupported answer, tool failure, outdated information, safety refusal, partial result, and user correction.",
      "Design conversation memory controls that allow users to understand what context is being reused, start fresh, remove an item from context, and inspect attached sources.",
      "Create a trust-and-control review explaining how the product avoids anthropomorphic overclaiming, dark patterns, false certainty, accidental actions, and hidden automation."
    ],
    [
      "1. AI research jobs and autonomy boundaries.",
      "2. AI request lifecycle map.",
      "3. Multimodal prompt-composer design.",
      "4. Transparent AI progress-state system.",
      "5. Source-aware answer experience.",
      "6. AI failure and correction state set.",
      "7. Conversation memory controls.",
      "8. AI trust-and-control design review."
    ],
    "AI UX, trust design, progressive disclosure, source transparency, uncertainty design, tool-state UX, conversational interfaces, safety-aware product design"),

  a(14, "Design Onboarding That Gets Users to Value Faster",
    "A productivity product attracts signups but too many users leave before experiencing its core value. Design an onboarding system that helps different users reach a meaningful first success without burying them in tours, setup work, or generic checklists.",
    [
      "Define the product's activation moment and identify the minimum user behaviors that strongly indicate the person has reached meaningful value rather than merely completed setup.",
      "Segment onboarding needs by intent or starting condition, such as creating from scratch, importing existing work, joining a team, or evaluating a template, and decide where personalization is worth the added complexity.",
      "Map the time-to-value journey from signup through first meaningful outcome and label every step as required, deferrable, optional, educational, or potentially removable.",
      "Design a first-run experience that asks only for information needed to shape the immediate experience and explains why any sensitive or effortful input is being requested.",
      "Create contextual guidance patterns such as starter content, templates, inline hints, progressive setup, empty-state actions, and milestone feedback instead of relying on a long product tour.",
      "Design re-entry behavior for users who abandon onboarding, skip steps, arrive through an invitation, or return after several days so progress is preserved without trapping them in setup.",
      "Specify instrumentation events for the onboarding funnel, including activation, abandonment, skipped guidance, first successful task, invite, and return behavior.",
      "Propose an onboarding experiment with a clear hypothesis, target segment, success threshold, guardrail against coercive behavior, and plan for interpreting mixed results."
    ],
    [
      "1. Activation definition and value signal.",
      "2. Intent-based onboarding segmentation.",
      "3. Time-to-value journey map.",
      "4. First-run personalization flow.",
      "5. Contextual guidance pattern set.",
      "6. Abandonment and re-entry designs.",
      "7. Onboarding analytics event plan.",
      "8. Activation experiment proposal."
    ],
    "Onboarding UX, activation, progressive disclosure, personalization, empty states, product analytics, experimentation, growth ethics"),

  a(15, "Increase Conversion Without Dark Patterns",
    "A subscription product wants more users to upgrade, but the design team must improve conversion without hiding costs, creating false urgency, obstructing cancellation, or exploiting user confusion. Redesign a monetization journey where clarity and business performance can coexist.",
    [
      "Audit an upgrade, subscription, trial, donation, or checkout journey for decision clarity, pricing transparency, plan comparability, consent, cancellation expectations, and manipulative interface patterns.",
      "List the legitimate reasons a user might choose each plan and rewrite the plan architecture so differences are understandable without using a deliberately confusing feature matrix.",
      "Design a pricing and upgrade experience that communicates recurring cost, billing period, taxes or fees, trial terms, renewal behavior, included limits, and downgrade consequences before commitment.",
      "Create an ethical persuasive hierarchy using value evidence, social proof, recommendations, defaults, and urgency only where each claim can be substantiated and users remain free to choose otherwise.",
      "Design cancellation, pause, downgrade, payment failure, renewal reminder, and refund-request experiences that preserve informed control instead of increasing friction solely to prevent exit.",
      "Write a dark-pattern review covering forced continuity, confirmshaming, obstruction, hidden costs, disguised ads, sneaking, preselection, scarcity claims, and privacy manipulation.",
      "Create two materially different monetization concepts and define an experiment capable of measuring conversion alongside complaints, refunds, cancellation completion, and support contact as guardrails.",
      "Prepare an ethics review note explaining which higher-converting idea you would refuse to ship and why the long-term product risk outweighs the short-term metric gain."
    ],
    [
      "1. Monetization journey audit.",
      "2. Plan-value and comparison architecture.",
      "3. Transparent upgrade flow.",
      "4. Ethical persuasion pattern rationale.",
      "5. Cancellation and subscription-management states.",
      "6. Dark-pattern review.",
      "7. Two-concept experiment design with guardrails.",
      "8. Product ethics decision note."
    ],
    "Growth design, monetization UX, pricing clarity, ethical persuasion, subscription management, dark-pattern analysis, experimentation"),

  a(16, "Hand Your Design to a Developer",
    "A beautiful design has reached implementation and engineering says it is full of unanswered questions. Turn a feature into a development-ready specification that accounts for states, behavior, content, responsive rules, tokens, accessibility, and acceptance criteria.",
    [
      "Select one substantial feature from an earlier project and identify every place where a developer would currently have to guess about layout, data, interaction, state, or responsive behavior.",
      "Clean the Figma file so naming, pages, sections, frames, auto layout, components, variables, assets, and styles are organized for handoff rather than only for the designer who created them.",
      "Annotate spacing, sizing, layout behavior, breakpoints, truncation, overflow, content limits, image treatment, icon use, and token references without duplicating information available directly through inspect tools.",
      "Specify the state model for loading, skeleton, success, empty, partial data, validation error, server error, offline, permission restriction, destructive action, undo, and long-running operation where relevant.",
      "Document interaction behavior for hover, focus, pressed, disabled, selection, keyboard navigation, overlays, escape behavior, destructive confirmation, and return focus after dialogs.",
      "Provide realistic content examples and boundary cases including very long text, localization expansion, zero values, large numbers, missing images, many tags, and unusually large data sets.",
      "Write implementation acceptance criteria that describe observable product behavior rather than visual instructions alone, then review them with a developer or technical peer if available.",
      "Run a simulated handoff review in which a reviewer lists unanswered implementation questions, then update the design package until the highest-risk ambiguities are resolved."
    ],
    [
      "1. Developer-ambiguity inventory.",
      "2. Cleaned and structured Figma handoff file.",
      "3. Layout and token annotations.",
      "4. Complete feature state model.",
      "5. Interaction behavior specification.",
      "6. Content and boundary-case pack.",
      "7. Behavioral acceptance criteria.",
      "8. Handoff review questions and resolution log."
    ],
    "Developer handoff, design specification, auto layout, design tokens, interaction states, responsive documentation, acceptance criteria, cross-functional communication"),

  a(17, "48-Hour Startup MVP Design Sprint",
    "A founder has a promising idea, limited time, and no product yet. In 48 hours, turn a rough startup concept into a testable MVP experience by deciding what not to build, identifying the riskiest assumption, and designing only enough product to learn.",
    [
      "Choose or receive a startup concept and convert the founder's feature-heavy description into a one-sentence user problem, target user, desired outcome, and business assumption.",
      "Create an assumptions map separating desirability, usability, feasibility, and viability risks, then select the single assumption most dangerous to leave untested.",
      "Define the MVP boundary using must-have, useful-later, and intentionally-excluded capabilities, and explain why each excluded feature does not belong in the first learning loop.",
      "Create a storyboard showing the user's situation before the product, trigger to try it, first use, core action, outcome, and reason to return.",
      "Produce rapid low-fidelity concepts under a strict timebox, choose one using evidence and risk reduction rather than visual preference, and move immediately into an interactive prototype.",
      "Design only the minimum high-fidelity surfaces necessary to make the core value proposition believable enough to test with a prospective user or realistic proxy.",
      "Run at least three short concept tests focused on whether users understand the value, can complete the core job, and would choose this approach over their current workaround.",
      "End the sprint with a founder decision memo stating continue, change direction, or stop; include evidence, unresolved assumptions, and the next cheapest test."
    ],
    [
      "1. One-sentence startup problem framing.",
      "2. Assumptions and risk map.",
      "3. Explicit MVP scope and exclusions.",
      "4. Core-value storyboard.",
      "5. Rapid concept explorations.",
      "6. Testable MVP prototype.",
      "7. Three concept-test summaries.",
      "8. Founder continue/change/stop memo."
    ],
    "Design sprint, MVP scoping, assumption mapping, rapid prototyping, concept testing, product judgment, prioritization",
    "Timeboxing is part of the assignment. The goal is not to create the largest or most polished product; it is to reduce the most important product risk quickly."),

  a(18, "The Founder Gives You an Ambiguous Problem",
    "A university says students are not using its career services platform enough and asks you to improve the experience. No screens, features, or research method are prescribed. Determine what the actual problem is before deciding what should be designed.",
    [
      "Turn the vague request into a discovery plan that lists what you need to learn about students, career-service staff, existing behavior, institutional goals, timing, constraints, and current product performance.",
      "Conduct lightweight discovery using a defensible mix of interviews, survey responses, public student feedback, analytics supplied by the brief, desk research, or clearly labeled synthetic inputs.",
      "Create a problem-space model that connects student goals, barriers, triggers, current workarounds, service processes, institutional constraints, and moments where the platform could or could not add value.",
      "Write multiple competing problem statements and explicitly reject at least one plausible framing after showing why the evidence does not support it strongly enough.",
      "Choose an opportunity and define the intended behavior change, beneficiary, business or institutional outcome, leading signal, and risk of making the experience worse.",
      "Determine the smallest coherent product intervention required; it may involve onboarding, navigation, reminders, content architecture, appointments, personalization, a dashboard, or no new screen at all.",
      "Create and test a prototype or service concept appropriate to the selected intervention, choosing fidelity based on what uncertainty needs to be reduced rather than on portfolio appearance.",
      "Present a decision narrative showing how the project moved from ambiguous request to evidence, reframed problem, chosen opportunity, proposed intervention, validation, and next-step recommendation."
    ],
    [
      "1. Ambiguous-problem discovery plan.",
      "2. Discovery evidence and source limitations.",
      "3. Problem-space model.",
      "4. Competing and rejected problem statements.",
      "5. Opportunity and behavior-change definition.",
      "6. Minimum coherent product intervention.",
      "7. Fit-for-purpose validation artifact.",
      "8. End-to-end decision narrative."
    ],
    "Product discovery, ambiguity management, research planning, problem framing, opportunity selection, service thinking, product strategy, decision communication",
    "You are intentionally not told which screens to design. A strong submission may conclude that the original request was framed incorrectly."),

  a(19, "UI/UX Designer Take-Home Challenge",
    "Complete a realistic hiring exercise under time constraints. You receive a product brief, limited context, and a submission deadline; your job is to demonstrate how you prioritize, make assumptions visible, explore, design, and communicate without pretending you had unlimited research access.",
    [
      "Read the provided or self-generated take-home brief once, then create a time budget allocating effort across understanding, assumptions, exploration, design, validation, documentation, and final presentation.",
      "List clarifying questions you would ask a hiring manager and create explicit working assumptions for anything that cannot be answered within the simulated exercise.",
      "Identify the primary user, job to be done, business goal, constraints, success signal, and out-of-scope areas in a one-page problem brief before opening high-fidelity design tools.",
      "Explore at least three interaction approaches at low fidelity and document the trade-offs that caused you to reject two of them rather than hiding discarded work.",
      "Create a focused high-fidelity solution with enough normal, error, empty, loading, and responsive behavior to demonstrate product thinking beyond one attractive hero screen.",
      "Use a short critique or proxy test to identify one weakness in your own design, then make a visible revision and explain why you changed it.",
      "Prepare a concise case-study presentation that can be understood in ten minutes and prioritizes reasoning, constraints, trade-offs, and outcomes over a chronological diary of every step.",
      "Record a simulated interview walkthrough and answer five challenge questions about your assumptions, accessibility, trade-offs, missing research, and what you would do with another week."
    ],
    [
      "1. Take-home time budget.",
      "2. Clarifying questions and assumption register.",
      "3. One-page problem brief.",
      "4. Three low-fidelity directions with trade-offs.",
      "5. Focused high-fidelity solution and key states.",
      "6. Self-critique evidence and revision.",
      "7. Ten-minute case-study deck.",
      "8. Recorded interview-style walkthrough."
    ],
    "Design interview preparation, time management, assumption management, interaction exploration, self-critique, case-study presentation, design defense",
    "Treat the time limit as real. Reviewers should reward prioritization and judgment, not the number of screens produced."),

  a(20, "Portfolio Capstone: Research, Design, Test & Defend",
    "Own a substantial product-design problem from discovery through handoff and defend the final decisions as if presenting to product, engineering, research, accessibility, and executive stakeholders. The capstone must demonstrate a complete design process without forcing every method where it does not add value.",
    [
      "Write a capstone charter covering problem area, target users, stakeholder needs, desired behavior or outcome, constraints, ethical considerations, project risks, milestones, and definition of success.",
      "Build a research evidence base appropriate to the problem, document participant or source limitations, and maintain a traceable link between raw evidence, synthesized insight, opportunity, and design decision.",
      "Create the product structure through information architecture, service blueprint where relevant, critical user flows, content model, and a record of major decisions before final visual execution.",
      "Explore multiple product directions and preserve the rationale for convergence, including the most important alternative you rejected and the condition under which it might have been preferable.",
      "Develop a high-fidelity product experience with reusable components, responsive behavior, accessibility considerations, realistic content, and comprehensive normal, empty, error, loading, permission, and edge states appropriate to the domain.",
      "Plan and conduct validation that targets the project's highest remaining risk, synthesize the evidence, revise the design, and show a clear before-and-after of at least two consequential changes.",
      "Prepare an implementation-ready handoff package with design-system usage, behavior specifications, content boundaries, analytics or measurement recommendations, acceptance criteria, and known product debt.",
      "Deliver a boardroom-style design defense covering problem framing, evidence, alternatives, final experience, validation, expected outcomes, limitations, and next steps; then respond to stakeholder challenge questions without hiding uncertainty."
    ],
    [
      "1. Capstone charter and milestone plan.",
      "2. Research evidence base and insight traceability.",
      "3. Product architecture, critical flows, and decision log.",
      "4. Concept exploration and convergence rationale.",
      "5. Production-quality high-fidelity product and component set.",
      "6. Risk-focused validation and iteration evidence.",
      "7. Implementation handoff and measurement package.",
      "8. Portfolio case study, boardroom presentation, and design defense recording."
    ],
    "End-to-end product design, research synthesis, information architecture, visual and interaction design, accessibility, validation, design systems, handoff, portfolio storytelling, stakeholder defense",
    "Completion should require mentor approval, evidence of iteration, accessibility review, a working prototype, and a defensible explanation of what remains uncertain. Do not fabricate user research, business metrics, or implementation results."),

];

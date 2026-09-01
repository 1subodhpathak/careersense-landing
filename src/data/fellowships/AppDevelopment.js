export const appDevelopmentPhases = [
  { id: 1, title: "Build Your First Mobile Products", range: "Weeks 1-4", assignmentIds: [1, 2, 3, 4] },
  { id: 2, title: "Build Real Mobile Experiences", range: "Weeks 5-8", assignmentIds: [5, 6, 7, 8] },
  { id: 3, title: "Build Connected Applications", range: "Weeks 9-12", assignmentIds: [9, 10, 11, 12] },
  { id: 4, title: "Build Production-Grade Apps", range: "Weeks 13-16", assignmentIds: [13, 14, 15, 16] },
  { id: 5, title: "Ship Like a Mobile Engineer", range: "Weeks 17-20", assignmentIds: [17, 18, 19, 20] },
];

const phaseFor = (id) => appDevelopmentPhases.find((phase) => phase.assignmentIds.includes(id))?.id ?? null;

const evaluation = [
  { criterion: "Functional correctness", weight: 25 },
  { criterion: "Technical execution", weight: 25 },
  { criterion: "Product & UX quality", weight: 20 },
  { criterion: "Code quality & documentation", weight: 15 },
  { criterion: "Testing, reliability & communication", weight: 15 },
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
    maxLinks: 6,
    allowMultipleFiles: true,
    acceptedTypes: ["PDF", "DOCX", "ZIP", "PNG", "JPG", "MP4", "APK", "AAB"],
  },
  evaluation,
});

export const appDevelopmentAssignments = [
  a(
    1,
    "Build Your First Habit Tracker",
    "Join a mobile product team and build a polished habit-tracking app that lets users create habits, complete daily check-ins, see progress, and return to a useful state after reopening the app.",
    [
      "Set up a React Native + Expo + TypeScript project and create a repository structure that separates screens, components, utilities, assets, and application state.",
      "Translate a simple product brief into a screen map covering habit list, create habit, habit detail, progress, and settings experiences.",
      "Build reusable mobile UI components for buttons, cards, inputs, progress indicators, empty states, and section headers instead of styling each screen independently.",
      "Implement habit creation with name, frequency, reminder preference, color or icon choice, and validation for incomplete or invalid input.",
      "Create daily completion interactions that update streaks, completion totals, and visual progress without requiring an app restart.",
      "Persist user-created habits and completion history locally so the app restores meaningful state after closing and reopening.",
      "Design loading, first-use, empty, success, and invalid-input states so the experience does not depend on ideal data.",
      "Run the app on at least two mobile screen sizes and document the layout or interaction changes needed to keep it usable."
    ],
    [
      "1. GitHub repository with runnable Expo project and setup instructions.",
      "2. Screen map or lightweight flow showing the app structure.",
      "3. Working habit creation, completion, progress, and persistence flows.",
      "4. Screenshots from at least two mobile screen sizes.",
      "5. Short demo video showing a complete user journey.",
      "6. README describing architecture, local state approach, known limitations, and next improvements."
    ],
    "React Native, Expo, TypeScript, component design, state, local persistence, mobile layout",
    "The goal is not visual complexity. Prioritize a reliable first mobile product with clean structure and predictable interaction."
  ),

  a(
    2,
    "Build an Offline Personal Expense Manager",
    "Build a personal finance app that records expenses without requiring internet access, organizes transactions, calculates summaries, and gives users a useful view of where their money is going.",
    [
      "Define a transaction data model covering amount, category, merchant or note, date, payment method, and optional tags.",
      "Create an add-expense form with numeric validation, category selection, date selection, required-field feedback, and a clear cancellation path.",
      "Store transactions in a durable local database or structured local persistence layer rather than keeping them only in component memory.",
      "Build transaction history with grouping, sorting, category filtering, date filtering, and an understandable no-results state.",
      "Calculate monthly spend, category totals, average transaction value, and budget usage from the stored transaction data.",
      "Create at least two compact mobile visualizations that help the user understand spending without overwhelming the interface.",
      "Implement edit and delete flows with confirmation behavior that protects users from accidental destructive actions.",
      "Test the complete app in airplane mode and prove that creating, editing, deleting, filtering, and reopening still work."
    ],
    [
      "1. Working offline expense-management application.",
      "2. Transaction schema and local-storage design note.",
      "3. Add, edit, delete, filter, summary, and visualization evidence.",
      "4. Airplane-mode test recording proving core functionality remains available.",
      "5. Sample seeded transaction dataset for reviewer testing.",
      "6. GitHub repository with README and explanation of persistence decisions."
    ],
    "Forms, validation, SQLite or local storage, offline data, calculations, mobile visualization"
  ),

  a(
    3,
    "Build a Movie & Entertainment Discovery App",
    "Build a consumer discovery application that integrates with a real public API and helps users search, browse, inspect, and save movies or entertainment content while handling unreliable networks professionally.",
    [
      "Choose an appropriate public entertainment API, document its usage limits, and isolate API configuration from presentation components.",
      "Create a typed service layer that fetches trending, popular, search, and detail data instead of calling endpoints directly from every screen.",
      "Build a discovery home screen with multiple content sections, horizontal lists, image handling, and meaningful skeleton or loading states.",
      "Implement debounced search with result feedback, no-results behavior, request-error recovery, and safe handling of rapid query changes.",
      "Create a detail screen that combines poster artwork, description, rating, metadata, genres, and related content into a scannable mobile layout.",
      "Add a favorites or watchlist feature that remains available after the user closes and reopens the application.",
      "Handle slow networks, failed images, API errors, empty responses, and rate-limit-style failures without leaving users on broken screens.",
      "Instrument or log the major API states and document how you would diagnose a production data-fetching issue."
    ],
    [
      "1. Working API-driven discovery application.",
      "2. API service architecture and endpoint summary.",
      "3. Search, loading, error, empty, and retry state evidence.",
      "4. Persistent favorites or watchlist demonstration.",
      "5. Network-failure test evidence.",
      "6. Repository with environment setup and API configuration guidance."
    ],
    "REST APIs, async data fetching, TypeScript services, search, loading states, error handling"
  ),

  a(
    4,
    "Build a Multi-Screen Travel Planner",
    "Build a travel-planning mobile product with a clear navigation architecture where users can discover destinations, create trips, organize plans, and move naturally between overview and detail experiences.",
    [
      "Create an information architecture that distinguishes discovery, trips, saved places, trip detail, daily itinerary, and profile responsibilities.",
      "Implement stack and tab navigation with route typing, meaningful screen titles, correct back behavior, and deep nested transitions.",
      "Build a destination discovery flow where users can inspect a location and add it to a new or existing trip.",
      "Create a trip planner that lets users add dates, itinerary items, notes, and places to individual trip days.",
      "Use shared route parameters and state deliberately so trip data remains consistent as users move between related screens.",
      "Implement a saved-trips home experience with upcoming, past, and empty-state treatments.",
      "Add at least one deep-linkable route and document what should happen when the app is opened directly into that screen.",
      "Review navigation on Android and iOS conventions and fix at least three behaviors or visual details that should not be identical by accident."
    ],
    [
      "1. Travel-planner application with complete navigation flows.",
      "2. Information-architecture and navigation diagram.",
      "3. Trip creation and itinerary-management demonstration.",
      "4. Deep-link configuration or evidence.",
      "5. Android/iOS navigation comparison note.",
      "6. Repository with route structure and state-management explanation."
    ],
    "Navigation, Expo Router or React Navigation, route typing, deep links, mobile information architecture"
  ),

  a(
    5,
    "Build a Secure Login & Profile Experience",
    "Build the authentication foundation for a real mobile product, covering account creation, login, session restoration, protected screens, profile updates, logout, and defensive handling of authentication failures.",
    [
      "Integrate a real authentication provider or backend service and document the chosen session model.",
      "Build signup and login flows with email validation, password rules, submission feedback, and server-side error messaging.",
      "Create protected application routes that cannot be reached when no valid authenticated session exists.",
      "Restore a valid user session on app launch without flashing protected content to signed-out users.",
      "Implement logout that clears sensitive local session state and returns the user to an appropriate public screen.",
      "Build a profile screen that reads authenticated user information and supports at least one safe profile update.",
      "Handle expired sessions, invalid credentials, unavailable authentication services, duplicate accounts, and interrupted login attempts.",
      "Document where tokens or credentials are stored and identify data that must never be committed to source control or stored insecurely."
    ],
    [
      "1. Working signup, login, protected-route, profile, and logout flows.",
      "2. Authentication architecture diagram.",
      "3. Session restoration and expired-session evidence.",
      "4. Error-state screenshots for at least four authentication failures.",
      "5. Security note describing secrets, token storage, and sensitive-data handling.",
      "6. Repository configured without exposed credentials."
    ],
    "Authentication, sessions, protected navigation, secure storage, backend integration, security basics",
    "Use only test credentials and development accounts. Never submit real passwords, access tokens, private keys, or personal user data."
  ),

  a(
    6,
    "Build a Camera-Based Receipt Capture App",
    "Build a receipt and document capture experience that uses the phone camera and file system, guides users through permissions, lets them review images, and creates a searchable local receipt history.",
    [
      "Design the complete capture journey from permission request to camera, preview, retake, accept, metadata entry, save, and receipt history.",
      "Request camera and media permissions contextually and build a useful fallback experience when permission is denied or permanently blocked.",
      "Capture a receipt image and create a preview experience that supports retaking before the user commits the document.",
      "Store the accepted image reference with receipt metadata such as merchant, amount, date, category, and notes.",
      "Build a receipt history where users can search or filter saved captures and reopen the full image and metadata.",
      "Create safe handling for missing files, failed saves, canceled capture, unavailable camera, and corrupted image references.",
      "Apply image resizing or compression where appropriate and explain the trade-off between quality, upload size, and device storage.",
      "Test the workflow on a physical device and document at least three differences from simulator or emulator testing."
    ],
    [
      "1. Working camera-based receipt capture application.",
      "2. Permission-state flow showing granted, denied, and blocked outcomes.",
      "3. Capture, preview, retake, accept, and history demonstration.",
      "4. Image-storage and compression decision note.",
      "5. Physical-device testing evidence.",
      "6. Repository with documented device requirements."
    ],
    "Camera APIs, permissions, file handling, media processing, physical-device testing"
  ),

  a(
    7,
    "Build a Location-Based Places Explorer",
    "Build a location-aware application that understands the user's current position, presents nearby places on a map, supports place discovery, and remains usable when location access is unavailable.",
    [
      "Implement foreground location permission handling with clear pre-permission context and a useful denied-permission path.",
      "Read the user's current coordinates and convert them into a stable initial map region without continuously recentering the map.",
      "Display nearby place markers from a suitable public dataset or API and avoid rendering every result indiscriminately.",
      "Build a place-detail experience containing location, distance, useful metadata, and a save or favorite action.",
      "Add search or category filtering that updates the visible set of places and keeps map and list states understandable.",
      "Calculate or display approximate distance from the user and document the assumptions behind the value.",
      "Handle disabled device location, delayed GPS, denied access, API failure, and empty nearby results independently.",
      "Test movement or simulated coordinate changes and verify the application does not trigger uncontrolled network requests."
    ],
    [
      "1. Location-aware places explorer.",
      "2. Map and nearby-place discovery evidence.",
      "3. Permission-denied and location-disabled experiences.",
      "4. Search/filter and saved-place demonstration.",
      "5. Request-frequency or location-update test note.",
      "6. Architecture diagram showing location, map, and place-data flow."
    ],
    "Location, maps, geospatial UX, device permissions, external APIs, request control"
  ),

  a(
    8,
    "Build a Complete Mobile Shopping Experience",
    "Build a polished mobile commerce experience covering product discovery, product detail, cart management, address collection, checkout simulation, order confirmation, and reliable state across the journey.",
    [
      "Model products, variants, cart lines, pricing, discounts, delivery cost, taxes, address, and order state explicitly.",
      "Build browse and category experiences with search, filtering, product images, price information, and reusable product cards.",
      "Create a product-detail screen with variant selection, stock-state handling, quantity selection, and add-to-cart feedback.",
      "Implement cart updates that correctly recalculate line totals, subtotal, discount, delivery, tax, and final total after every change.",
      "Build checkout steps for address, delivery option, payment simulation, order review, and final confirmation without collecting real payment details.",
      "Prevent invalid purchase states such as zero quantity, unavailable variant, missing address, stale product price, or double submission.",
      "Persist the cart so accidental app closure does not silently discard the user's shopping session.",
      "Write a compact manual test plan and execute at least ten shopping-path cases including edge and failure conditions."
    ],
    [
      "1. Working commerce app from browse through order confirmation.",
      "2. Product/cart/order state model.",
      "3. Pricing-calculation test evidence.",
      "4. Cart persistence demonstration.",
      "5. Ten-case manual checkout test report.",
      "6. Demo video showing a complete purchase simulation."
    ],
    "Commerce state, derived calculations, forms, persistence, validation, product UX, manual testing",
    "Use simulated checkout only unless the learner is explicitly working in a payment provider sandbox."
  ),

  a(
    9,
    "Build a Social Feed Application",
    "Build a connected social application where authenticated users can publish posts, browse a paginated feed, interact with content, and see backend state update consistently across screens.",
    [
      "Design backend entities and relationships for users, posts, comments, reactions, and optional media while defining ownership rules.",
      "Create a feed query that returns a stable ordering and supports pagination instead of downloading the entire dataset at once.",
      "Build post creation with text validation, optimistic or confirmed submission feedback, and protection against accidental duplicate posting.",
      "Implement like or reaction behavior that keeps count and current-user state synchronized after refresh.",
      "Create a comment experience with loading, posting, empty, and error behavior separate from the main feed.",
      "Add pull-to-refresh and infinite-scroll behavior with guards against repeated page requests or duplicate records.",
      "Enforce basic backend authorization so users cannot edit or delete another user's content merely by changing client requests.",
      "Test feed consistency using at least two test accounts and document one concurrency or stale-state issue you discovered."
    ],
    [
      "1. Authenticated social-feed application.",
      "2. Backend schema and ownership-rule diagram.",
      "3. Feed pagination and refresh evidence.",
      "4. Post, reaction, and comment workflows.",
      "5. Two-account authorization and consistency test report.",
      "6. Repository with backend setup instructions."
    ],
    "Backend data, pagination, optimistic UI, authorization, social interactions, concurrency awareness"
  ),

  a(
    10,
    "Build a Real-Time Messaging App",
    "Build a real-time one-to-one messaging product where users can start conversations, exchange messages instantly, track unread state, and recover gracefully from connectivity interruptions.",
    [
      "Design conversation and message records with sender, recipient or membership, timestamps, ordering, and unread-state requirements.",
      "Create a conversation list that updates last-message preview, timestamp, and unread indicator as messages arrive.",
      "Implement a real-time chat screen that receives new messages without requiring manual refresh.",
      "Add optimistic sending with temporary state and visibly reconcile sent, failed, and retried messages.",
      "Implement message pagination so older history loads incrementally rather than on initial screen entry.",
      "Add typing or presence behavior using an appropriate ephemeral mechanism instead of writing permanent database records for every keystroke.",
      "Simulate an offline period, queue or fail outgoing communication deliberately, and design the recovery experience when connectivity returns.",
      "Protect conversation access so a signed-in user cannot read a chat they are not a member of."
    ],
    [
      "1. Working real-time messaging application.",
      "2. Conversation/message schema.",
      "3. Real-time receive and optimistic-send evidence.",
      "4. Unread, typing/presence, and history-pagination demonstration.",
      "5. Offline-send and reconnect recovery test.",
      "6. Conversation-access security evidence."
    ],
    "Realtime data, subscriptions or WebSockets, optimistic updates, pagination, presence, authorization"
  ),

  a(
    11,
    "Build a Photo & Media Sharing App",
    "Build a media-centric mobile application that lets users select or capture images, prepare them efficiently, upload them to cloud storage, publish media posts, and recover from interrupted transfers.",
    [
      "Implement media-library selection and optional camera capture with appropriate permissions and cancellation handling.",
      "Create an image-preparation step that previews the selected media and allows the user to remove or replace it before upload.",
      "Resize or compress large media files on-device and record the before-and-after file sizes for comparison.",
      "Upload media to cloud storage using collision-safe paths and retain only the necessary public or signed reference in application data.",
      "Display upload progress and distinguish preparing, uploading, processing, success, and failure states.",
      "Build a media feed or gallery that loads optimized images rather than unnecessarily requesting full-resolution originals everywhere.",
      "Handle interrupted upload, duplicate submission, deleted remote file, failed thumbnail load, and user cancellation as separate states.",
      "Document the storage lifecycle and explain how orphaned uploads would be detected or removed in a production system."
    ],
    [
      "1. Media-selection/capture and upload application.",
      "2. Image compression comparison with file-size evidence.",
      "3. Upload progress and failure-retry demonstration.",
      "4. Cloud storage path and metadata design.",
      "5. Optimized gallery/feed screenshots.",
      "6. Storage lifecycle and orphan-cleanup design note."
    ],
    "Media library, camera, image compression, cloud storage, upload progress, asset lifecycle"
  ),

  a(
    12,
    "Build a Smart Reminder & Notification App",
    "Build a reminder application that schedules useful notifications, lets users control timing and recurrence, deep-links them to relevant content, and behaves predictably across permission and lifecycle states.",
    [
      "Create a reminder model supporting title, description, scheduled time, recurrence, enabled state, and destination context.",
      "Request notification permission at an intentional moment and provide an in-app explanation when permission is declined.",
      "Schedule local notifications and keep scheduled identifiers synchronized when reminders are edited, disabled, or deleted.",
      "Handle notification taps by navigating users directly to the reminder or relevant application screen.",
      "Implement recurring reminder behavior and document how timezone or daylight-saving changes can affect scheduling assumptions.",
      "Create a notification settings screen that clearly reflects application-level preferences separately from operating-system permission state.",
      "Test foreground, background, terminated-app, denied-permission, edited-reminder, and canceled-reminder scenarios.",
      "Document how remote push notifications would differ from the local scheduling approach used in this project."
    ],
    [
      "1. Working reminder and local-notification application.",
      "2. Reminder scheduling and cancellation evidence.",
      "3. Notification deep-link demonstration.",
      "4. Permission and settings-state screenshots.",
      "5. Lifecycle test matrix and results.",
      "6. Local-versus-remote notification architecture note."
    ],
    "Notifications, deep linking, scheduling, lifecycle states, permissions, timezone awareness"
  ),

  a(
    13,
    "Build an Offline-First Field Service App",
    "Build a field-service application for technicians who must download assigned jobs, complete inspections, capture evidence, and continue working when connectivity disappears for long periods.",
    [
      "Design separate server, local, and synchronization representations for assigned jobs, inspection answers, notes, status changes, and media references.",
      "Download assigned jobs into a local database and make the primary job workflow read from local state rather than depending on a live request.",
      "Build an inspection checklist where every local edit receives enough metadata to determine what still needs synchronization.",
      "Create a durable sync queue that survives app restarts and can retry pending changes after connectivity returns.",
      "Display synchronization state at job and application level so technicians can distinguish saved locally, syncing, synchronized, and failed work.",
      "Create at least one conflict scenario where server and device versions both changed, then implement and explain a resolution strategy.",
      "Prevent a failed media upload from blocking unrelated text or checklist updates from synchronizing.",
      "Run a full field simulation: download while online, go offline, complete work, restart the app, reconnect, synchronize, and verify server state."
    ],
    [
      "1. Offline-first field-service application.",
      "2. Local/server/sync architecture diagram.",
      "3. Durable sync queue implementation evidence.",
      "4. Conflict-resolution scenario and explanation.",
      "5. Full offline-to-reconnect field simulation video.",
      "6. Sync failure and recovery test report."
    ],
    "Offline-first architecture, local database, sync queues, conflict resolution, connectivity, resilient workflows"
  ),

  a(
    14,
    "Build a Subscription-Based Premium App",
    "Build a premium mobile product where users can discover paid features, see subscription options, complete a sandbox purchase flow, restore access, and experience entitlement changes safely.",
    [
      "Define free and premium capabilities and create an entitlement model that does not rely only on hiding buttons in the client.",
      "Design a paywall explaining value, billing period, trial or introductory information, restore action, and relevant subscription terms clearly.",
      "Integrate a supported subscription or in-app-purchase sandbox and keep product identifiers outside presentation logic.",
      "Unlock premium functionality only after validated entitlement state is available rather than immediately after a button tap.",
      "Implement purchase cancellation, pending transaction, failed purchase, restored purchase, expired entitlement, and already-subscribed experiences.",
      "Create a settings or account area where the user can inspect premium status and reach platform subscription-management guidance.",
      "Test the application with at least two entitlement states and record the expected screen differences.",
      "Document which parts of subscription validation would need trusted backend or provider-side verification before production."
    ],
    [
      "1. Subscription-enabled application using sandbox or test mode.",
      "2. Free-versus-premium entitlement map.",
      "3. Paywall and purchase-state screenshots.",
      "4. Restore and expired-entitlement evidence.",
      "5. Two-state premium-access test report.",
      "6. Production subscription-validation security note."
    ],
    "In-app purchases, subscriptions, entitlements, paywalls, platform commerce, secure product access",
    "Use sandbox or test environments only. Do not ask reviewers or learners to make real purchases."
  ),

  a(
    15,
    "Make One App Feel Native on iPhone and Android",
    "Take an existing fellowship application and refine it so the same codebase respects platform conventions, accessibility requirements, device differences, and user expectations on both iOS and Android.",
    [
      "Audit the selected app on both iOS and Android and record platform-specific problems instead of assuming identical behavior means correct behavior.",
      "Correct safe-area, status-bar, keyboard, modal, back-navigation, and gesture behavior where the platforms require different handling.",
      "Review touch-target size, dynamic text behavior, screen-reader labels, focus order, and meaningful accessibility roles on critical flows.",
      "Support light and dark appearance without creating unreadable text, invisible borders, or hard-coded visual assumptions.",
      "Test at least one small phone and one large phone layout and remove clipping, overflow, or unreachable controls.",
      "Adapt at least three interactions or visual conventions intentionally for platform expectations while preserving the same product logic.",
      "Run a keyboard-only or external-input accessibility check where supported and document any limitation that remains.",
      "Create a before-and-after platform comparison showing what changed and why each change improves product quality."
    ],
    [
      "1. Updated cross-platform application.",
      "2. iOS-versus-Android audit with identified issues.",
      "3. Accessibility test evidence.",
      "4. Light/dark and small/large device screenshots.",
      "5. Before-and-after platform comparison.",
      "6. Short rationale for each platform-specific implementation decision."
    ],
    "Cross-platform UX, iOS/Android conventions, accessibility, responsive layout, dark mode, device testing"
  ),

  a(
    16,
    "Take a Slow App and Make It Production Ready",
    "Profile and improve a deliberately inefficient mobile application, add meaningful automated tests, strengthen error handling, and produce evidence that the final build is more stable and responsive.",
    [
      "Measure the starter app before changing code and identify concrete slow interactions, unnecessary renders, heavy lists, repeated requests, or startup bottlenecks.",
      "Use profiling or instrumentation to trace at least three performance problems to specific components, data flows, or operations.",
      "Optimize a large scrolling experience with appropriate virtualization, stable keys, rendering control, and image strategy.",
      "Remove duplicate network work through caching, request deduplication, memoization, or better ownership of server state where appropriate.",
      "Add an application-level error boundary or equivalent failure strategy and create user-facing recovery for at least two recoverable faults.",
      "Write automated tests for critical utility logic and at least two important UI or integration behaviors.",
      "Create a release configuration that separates development diagnostics from production behavior and does not ship secrets or debug-only settings.",
      "Repeat the original measurements and produce a before-and-after performance report using the same scenarios."
    ],
    [
      "1. Optimized production-readiness project.",
      "2. Baseline profiling evidence.",
      "3. Three documented root-cause performance fixes.",
      "4. Automated test suite and passing-results screenshot.",
      "5. Development-versus-production configuration note.",
      "6. Before-and-after performance comparison."
    ],
    "Performance profiling, list optimization, caching, testing, error boundaries, production configuration"
  ),

  a(
    17,
    "You Inherited a Broken Production App",
    "Take ownership of an unfamiliar mobile codebase containing realistic defects, diagnose problems from symptoms, make safe fixes, and deliver a regression-tested stabilization release.",
    [
      "Run the unfamiliar repository without rewriting it and create an initial defect inventory based on observed product behavior.",
      "Reproduce each selected defect with explicit steps and separate symptoms from likely root causes before editing code.",
      "Trace one authentication or session bug through navigation, state, persistence, and backend interaction until the real failure point is identified.",
      "Diagnose one rendering or performance issue using evidence rather than replacing components until the symptom disappears.",
      "Repair one network or asynchronous-state bug involving duplicate requests, stale data, race conditions, retry loops, or unhandled failures.",
      "Fix one mobile-specific interaction problem involving keyboard, navigation, permissions, lifecycle, or device differences.",
      "Add regression tests or reproducible validation steps around every repaired high-severity defect.",
      "Prepare release notes that explain fixed behavior, remaining risks, testing completed, and any issue intentionally deferred."
    ],
    [
      "1. Stabilized inherited application repository.",
      "2. Prioritized defect inventory.",
      "3. Root-cause analysis for selected defects.",
      "4. Before-and-after defect evidence.",
      "5. Regression test or validation pack.",
      "6. Release notes with remaining risks and deferred issues."
    ],
    "Debugging, unfamiliar codebases, root-cause analysis, regression testing, production maintenance, release discipline",
    "Do not refactor the entire application. The exercise tests safe diagnosis and targeted engineering under existing constraints."
  ),

  a(
    18,
    "A Founder Gives You an Idea — Build the MVP",
    "Act as the first mobile engineer for a startup: turn a broad product idea into a constrained MVP, make architecture and scope decisions, build the most valuable workflow, and explain what you deliberately left out.",
    [
      "Convert the founder brief into user outcomes, assumptions, must-have capabilities, risks, and an explicit list of features that will not be built this week.",
      "Choose the application architecture, backend or storage approach, authentication need, navigation model, and third-party services without receiving a prescribed stack beyond the fellowship baseline.",
      "Create a thin vertical slice proving the riskiest technical or product assumption before spending the majority of the week polishing secondary screens.",
      "Build the primary end-to-end user journey with real state and data behavior rather than a clickable mockup pretending to be functional.",
      "Add only the secondary capabilities required to make the MVP testable by a new user.",
      "Instrument at least one meaningful product event or define exactly how the MVP would measure activation or successful usage.",
      "Conduct a short test with two people unfamiliar with the project and prioritize fixes based on observed blockers rather than cosmetic preference.",
      "Present the final MVP with a roadmap separating immediate bugs, next validation work, and possible V2 features."
    ],
    [
      "1. MVP scope document with explicit non-goals.",
      "2. Architecture and major technology decisions.",
      "3. Working end-to-end MVP.",
      "4. Risky-assumption proof or technical spike evidence.",
      "5. Two-person user test and revision summary.",
      "6. Demo video, repository, and V2 roadmap."
    ],
    "MVP scoping, architecture, product judgment, full-stack mobile delivery, user validation",
    "This assignment is intentionally open-ended. Reviewers should evaluate decisions and trade-offs, not whether every learner built the same screens."
  ),

  a(
    19,
    "72-Hour Mobile Developer Take-Home Challenge",
    "Complete a hiring-style mobile engineering challenge from a compact brief, make reasonable assumptions without excessive clarification, and submit a professional solution that another engineer can run and review.",
    [
      "Read the challenge once, extract explicit requirements, identify ambiguity, and record reasonable assumptions before beginning implementation.",
      "Plan a 72-hour execution strategy that reserves time for functional completion, edge cases, testing, documentation, and final review.",
      "Build the required core workflow with production-quality navigation, state, data handling, and visual feedback rather than optimizing for number of screens.",
      "Use at least one real asynchronous data source or backend interaction and handle loading, error, empty, retry, and stale-data behavior where relevant.",
      "Implement at least one mobile-specific capability selected from secure storage, media, location, notifications, offline behavior, or deep linking when it materially improves the product.",
      "Write targeted tests for the highest-risk business logic or user path instead of maximizing test count.",
      "Perform a final reviewer-style pass for setup failures, secrets, dead code, confusing naming, broken states, inaccessible controls, and undocumented assumptions.",
      "Record a concise walkthrough that explains the architecture, hardest trade-off, known limitation, and what you would improve with another day."
    ],
    [
      "1. Complete take-home challenge repository.",
      "2. Assumptions and implementation plan.",
      "3. Runnable mobile application.",
      "4. High-risk automated or manual test evidence.",
      "5. Reviewer-ready README with setup and architecture.",
      "6. Five-minute maximum technical walkthrough."
    ],
    "Hiring challenge execution, prioritization, mobile engineering, testing, documentation, technical communication",
    "Treat this as an individual hiring simulation. Do not copy a finished public implementation or submit generated code that the learner cannot explain."
  ),

  a(
    20,
    "Launch-Ready Mobile App Capstone",
    "Own a mobile product from problem framing through release candidate: define the product, build a complete cross-platform application, integrate data and device capabilities, prove quality, and defend engineering decisions in a professional handoff.",
    [
      "Write a product and engineering charter defining target user, core problem, success metric, constraints, privacy considerations, launch scope, and explicit non-goals.",
      "Design the technical architecture across mobile client, navigation, state, backend or local data, authentication, external services, device capabilities, and observability.",
      "Build the primary product journey to release-candidate quality with complete loading, empty, error, permission, offline or degraded, and success behavior.",
      "Implement at least one meaningful native mobile capability such as camera, location, notifications, secure storage, files, sensors, or deep linking because the product benefits from it.",
      "Create a reliable data strategy covering validation, caching or persistence, synchronization expectations, authorization, and destructive-action protection.",
      "Establish a quality gate including linting or type checks, targeted automated tests, manual device coverage, performance checks, accessibility review, and secret scanning.",
      "Produce installable or previewable builds for the platforms available to you and document any platform-specific limitation that prevents equivalent distribution.",
      "Run a structured beta test with at least three reviewers, triage the findings, fix launch blockers, and keep a revision log.",
      "Prepare a technical handoff covering setup, environment configuration, architecture, backend dependencies, build process, troubleshooting, known risks, and future work.",
      "Deliver a ten-minute product and engineering defence focused on why the app was designed this way, what could fail in production, and what evidence supports launch readiness."
    ],
    [
      "1. Product and engineering charter.",
      "2. Architecture diagram and technical decision record.",
      "3. Complete cross-platform capstone repository.",
      "4. Working release candidate with at least one native mobile capability.",
      "5. Quality-gate report covering tests, devices, performance, accessibility, and secrets.",
      "6. Android build or equivalent installable artifact where supported.",
      "7. iOS/Expo preview or build evidence where available.",
      "8. Three-reviewer beta test and revision log.",
      "9. Technical handoff and release notes.",
      "10. Final demo and ten-minute engineering defence."
    ],
    "End-to-end mobile engineering, architecture, backend integration, native capabilities, testing, release readiness, technical handoff",
    "Use only authorized services, sandbox credentials, test data, and legally usable assets. Remove secrets and personal data before submission. Platform distribution evidence should reflect the learner's available development hardware and accounts."
  ),
];

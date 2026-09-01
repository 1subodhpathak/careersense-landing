export const fullStackDevelopmentPhases = [
  { id: 1, title: "Build Full Stack Foundations", range: "Weeks 1-4", assignmentIds: [1, 2, 3, 4] },
  { id: 2, title: "Build Real Multi-User Products", range: "Weeks 5-8", assignmentIds: [5, 6, 7, 8] },
  { id: 3, title: "Build Connected Web Platforms", range: "Weeks 9-12", assignmentIds: [9, 10, 11, 12] },
  { id: 4, title: "Build Production-Grade SaaS", range: "Weeks 13-16", assignmentIds: [13, 14, 15, 16] },
  { id: 5, title: "Operate Like a Full Stack Engineer", range: "Weeks 17-20", assignmentIds: [17, 18, 19, 20] },
];

const phaseFor = (id) => fullStackDevelopmentPhases.find((phase) => phase.assignmentIds.includes(id))?.id ?? null;

const evaluation = [
  { criterion: "Functional correctness", weight: 25 },
  { criterion: "Technical execution", weight: 25 },
  { criterion: "Architecture & data design", weight: 20 },
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
    acceptedTypes: ["PDF", "DOCX", "ZIP", "PNG", "JPG", "MP4", "SQL", "JSON"],
  },
  evaluation,
});

export const fullStackDevelopmentAssignments = [
  a(
    1,
    "Build Your First Production-Style Web App",
    "Build a polished learning-tracker web application where users can manage skills, resources, and weekly progress while following professional frontend structure, responsive design, and deployment practices.",
    [
      "Set up a Next.js + TypeScript project with a repository structure that separates routes, components, domain types, utilities, assets, and configuration.",
      "Translate the product brief into a screen and component map covering dashboard, skill detail, resource management, weekly progress, and settings.",
      "Build reusable UI primitives and feature components instead of duplicating layout and styling across pages.",
      "Create forms for adding skills and resources with client-side validation, error feedback, and clear success behavior.",
      "Implement filters, sorting, derived progress metrics, and persistent local state so users can return to meaningful data after refreshing.",
      "Design loading, empty, partial-data, validation, and destructive-action confirmation states rather than assuming ideal usage.",
      "Make the major screens responsive across mobile, tablet, and desktop widths without hiding core functionality.",
      "Deploy the application and verify the production build works independently of the local development environment."
    ],
    [
      "1. GitHub repository with runnable Next.js + TypeScript project.",
      "2. Screen/component map and brief architecture note.",
      "3. Working learning-tracker application with persistence.",
      "4. Responsive screenshots across three viewport sizes.",
      "5. Deployed application URL.",
      "6. README with setup, scripts, project structure, known limitations, and next steps."
    ],
    "Next.js, React, TypeScript, component architecture, forms, responsive design, deployment",
    "Prioritize a clean and maintainable first product over visual complexity."
  ),

  a(
    2,
    "Build a Personal Task & Productivity Platform",
    "Build a richer productivity product with projects, tasks, priorities, due dates, labels, search, multiple views, and carefully managed client state.",
    [
      "Define the domain model for projects, tasks, labels, status, priority, due dates, and user preferences before writing view-specific state.",
      "Build task creation and editing workflows with date handling, labels, validation, and prevention of impossible or incomplete task states.",
      "Create list and board views that represent the same underlying task data without maintaining conflicting duplicate sources of truth.",
      "Implement search, project filtering, status filtering, priority filtering, and due-date filtering with clear reset behavior.",
      "Add drag-and-drop or equivalent status movement while ensuring task state remains consistent after reordering.",
      "Create derived productivity summaries such as overdue count, completion rate, upcoming work, and project progress.",
      "Persist application data and user preferences locally while handling schema changes or malformed stored data defensively.",
      "Document one state-management problem encountered and explain why your final ownership model avoids unnecessary synchronization."
    ],
    [
      "1. Working productivity platform.",
      "2. Domain model and state-ownership diagram.",
      "3. List/board/search/filter demonstration.",
      "4. Productivity summary evidence.",
      "5. Persistence and invalid-storage recovery evidence.",
      "6. Repository with state-management rationale."
    ],
    "State management, domain modelling, drag-and-drop, derived state, filtering, local persistence"
  ),

  a(
    3,
    "Build a Real Backend for Your Application",
    "Replace local-only application data with a real server-side API and create a clear separation between browser UI, request validation, business logic, and persistence.",
    [
      "Design REST-style endpoints for the productivity domain using appropriate resources, verbs, status codes, and consistent response shapes.",
      "Create server-side request validation that rejects malformed input independently of any client-side form checks.",
      "Move business rules into a service layer or equivalent boundary instead of placing all logic inside route handlers.",
      "Implement create, read, update, delete, filtering, and pagination behavior against a server-side data source.",
      "Build centralized API error handling with safe client-facing messages and separate diagnostic logging for unexpected failures.",
      "Replace direct local mutations in the frontend with asynchronous server requests and predictable loading, success, retry, and error states.",
      "Add environment-based configuration and ensure secrets or private service values are not exposed to browser bundles or committed files.",
      "Create an API test collection or automated request suite proving successful and invalid behaviors for the major endpoints."
    ],
    [
      "1. Full-stack application using a real backend API.",
      "2. Endpoint contract document.",
      "3. Validation and centralized-error evidence.",
      "4. Frontend server-state integration screenshots or demo.",
      "5. API test collection or automated request suite.",
      "6. Repository with environment setup and architecture explanation."
    ],
    "API design, Node.js, server validation, service layers, async UI, error handling, environment configuration"
  ),

  a(
    4,
    "Build a Database-Driven Expense Manager",
    "Build a financial tracking application backed by PostgreSQL, using explicit relational modelling, migrations, aggregates, indexes, and safe data changes.",
    [
      "Design an ER model for users, accounts, transactions, categories, budgets, and recurring transactions with clear cardinality and ownership.",
      "Create PostgreSQL tables through Prisma or another migration-based ORM workflow rather than manually depending on an undocumented database state.",
      "Seed realistic development data that covers multiple accounts, categories, months, budget states, and edge cases.",
      "Build transaction entry, editing, transfer, categorization, and deletion workflows that preserve relational consistency.",
      "Implement monthly summaries, category totals, budget usage, account balances, and recurring-transaction views using server-side queries.",
      "Identify at least two frequently used query patterns and add or justify indexes based on how the application accesses data.",
      "Use a database transaction for one multi-step operation where partial success would create incorrect financial state.",
      "Prove database reproducibility by rebuilding a fresh local database from migrations and seed scripts only."
    ],
    [
      "1. Expense-management application backed by PostgreSQL.",
      "2. ER diagram and schema explanation.",
      "3. Migration and seed workflow.",
      "4. Aggregate-reporting evidence.",
      "5. Index and transaction decision note.",
      "6. Fresh-database rebuild proof."
    ],
    "PostgreSQL, Prisma, relational modelling, migrations, aggregates, indexes, database transactions"
  ),

  a(
    5,
    "Build Secure Signup, Login & User Accounts",
    "Add real identity and account protection to a web product so users can register, authenticate, maintain sessions, recover access, and remain isolated from other users' private data.",
    [
      "Integrate an authentication system and document whether identity is session-cookie, token, or provider based.",
      "Build signup, login, logout, and session restoration without relying on client-rendered visibility as the security boundary.",
      "Create protected server routes or actions that verify the authenticated user before reading or mutating private resources.",
      "Implement password reset or account recovery using the chosen provider's secure workflow rather than inventing a custom insecure mechanism.",
      "Add profile management with safe validation and ensure users cannot change protected identity fields arbitrarily.",
      "Test horizontal authorization by attempting to access another test user's resource through modified URLs, IDs, or direct API requests.",
      "Handle expired sessions, revoked sessions, invalid credentials, duplicate accounts, and interrupted auth-provider responses.",
      "Document which cookies, tokens, secrets, and user data exist in the system and where each is allowed to live."
    ],
    [
      "1. Working authentication and account-management flows.",
      "2. Authentication/session architecture diagram.",
      "3. Server-side authorization evidence.",
      "4. Cross-user access test report.",
      "5. Auth failure-state screenshots.",
      "6. Security note covering tokens, cookies, secrets, and private data."
    ],
    "Authentication, sessions, authorization, protected routes, account recovery, web security",
    "Use only test accounts and development credentials. Never submit real passwords, private keys, access tokens, or personal user data."
  ),

  a(
    6,
    "Build a Multi-User Project Management Platform",
    "Build a collaborative workspace product where teams create projects, assign work, discuss tasks, and operate under role-based permissions.",
    [
      "Model workspaces, memberships, roles, projects, tasks, assignments, comments, and activity history with explicit ownership relationships.",
      "Implement workspace creation and member invitation using a safe tokenized or provider-supported invitation flow.",
      "Create owner, admin, member, and viewer permissions and enforce them in backend authorization checks for every sensitive operation.",
      "Build project and task workflows supporting assignment, status, priority, due dates, comments, and activity tracking.",
      "Create a workspace member-management screen that clearly communicates role changes and protects the last required owner from accidental removal.",
      "Add server-side filtering and pagination for tasks so larger workspaces do not depend on loading every record into the browser.",
      "Generate an immutable or append-only activity entry for key actions such as task reassignment, status change, member addition, or role update.",
      "Test a permission matrix using multiple test users and document any operation intentionally restricted by role."
    ],
    [
      "1. Multi-user project management application.",
      "2. Workspace/membership/role data model.",
      "3. Invitation and member-management evidence.",
      "4. RBAC permission matrix and test results.",
      "5. Activity-history demonstration.",
      "6. Repository with authorization design explanation."
    ],
    "RBAC, multi-user data, invitations, collaboration, pagination, audit history"
  ),

  a(
    7,
    "Build an E-Commerce Storefront",
    "Build a production-style commerce storefront where customers can discover products, inspect variants, search and filter inventory, maintain a cart, and handle changing product state correctly.",
    [
      "Design product, category, variant, inventory, pricing, image, and cart-line data structures that avoid duplicating authoritative price or stock state in unsafe places.",
      "Build server-driven product listing with category, price, availability, search, sorting, and paginated or cursor-based browsing.",
      "Create a product-detail page that supports variants, stock availability, quantity selection, image presentation, and clear unavailable-state behavior.",
      "Implement cart operations with server or durable session persistence and recalculate totals from authoritative product data.",
      "Detect stale cart conditions such as changed price, unavailable variant, or insufficient inventory and require the user to reconcile before checkout.",
      "Build saved-item or wishlist behavior with authenticated persistence separate from the active cart.",
      "Optimize product images and page-loading behavior so the storefront remains usable on slower connections.",
      "Create tests for pricing calculations, cart merging, quantity limits, and stale inventory conditions."
    ],
    [
      "1. Working e-commerce storefront.",
      "2. Product/variant/inventory data model.",
      "3. Search/filter/product-detail demonstration.",
      "4. Durable cart and stale-cart evidence.",
      "5. Commerce calculation tests.",
      "6. Performance-aware product media implementation evidence."
    ],
    "E-commerce modelling, server state, cart architecture, product search, inventory handling, performance"
  ),

  a(
    8,
    "Build Checkout & Order Management",
    "Extend the storefront into a reliable order pipeline with address capture, shipping choices, payment sandbox integration, idempotent order creation, inventory updates, and clear order status.",
    [
      "Define an order state model covering pending, payment processing, paid, failed, fulfilled, canceled, and refunded or equivalent business states.",
      "Build address and shipping selection with server validation rather than trusting browser-submitted delivery values.",
      "Integrate a payment provider sandbox and create checkout sessions without storing raw payment card data in your application.",
      "Make order creation idempotent so retries, refreshes, or repeated payment-provider callbacks do not create duplicate paid orders.",
      "Process provider webhooks using signature verification and update internal order state from trusted server-side events.",
      "Wrap inventory reservation or deduction and order mutation in a consistency strategy that prevents partial successful checkout state.",
      "Create customer order-history and order-detail views that display current fulfillment status and relevant totals.",
      "Simulate failed payment, duplicate webhook, stale inventory, canceled checkout, and successful payment scenarios and record results."
    ],
    [
      "1. End-to-end sandbox checkout and order-management system.",
      "2. Order state model.",
      "3. Payment-session and webhook implementation evidence.",
      "4. Idempotency and duplicate-webhook test proof.",
      "5. Inventory consistency strategy note.",
      "6. Multi-scenario checkout test report."
    ],
    "Payments, webhooks, idempotency, order state machines, transactions, inventory consistency",
    "Use only payment sandbox/test mode. Never collect or submit real payment credentials."
  ),

  a(
    9,
    "Build a Social Community Platform",
    "Build a community product with user profiles, posts, reactions, comments, follows, and a scalable feed where server queries and authorization remain reliable as content grows.",
    [
      "Design relational models for profiles, posts, comments, reactions, follows, and content ownership with unique constraints where duplicate relationships are invalid.",
      "Build post creation, editing, and deletion with server authorization that permits only the correct owner or moderator role.",
      "Create a feed query using cursor-based or stable pagination rather than offset-only assumptions on rapidly changing content.",
      "Implement reactions with optimistic UI while reconciling server truth after failures or concurrent changes.",
      "Build comment threads with incremental loading and separate permissions for creation, editing, moderation, and deletion.",
      "Add follow or connection behavior and use it to influence a personalized or scoped feed.",
      "Prevent common duplicate-state problems such as repeated reactions, duplicate follow relationships, or feed records appearing twice after pagination.",
      "Profile one expensive feed query and explain one schema, query, caching, or indexing change that would help at larger scale."
    ],
    [
      "1. Working social community platform.",
      "2. Social graph/content schema.",
      "3. Paginated feed and optimistic-reaction evidence.",
      "4. Comment and follow workflows.",
      "5. Duplicate-state prevention tests.",
      "6. Feed query performance note."
    ],
    "Feeds, cursor pagination, optimistic UI, social graphs, authorization, query optimization"
  ),

  a(
    10,
    "Build Real-Time Chat & Notifications",
    "Add real-time communication to a web platform with persistent conversations, ephemeral presence, unread state, and reliable client recovery after disconnects.",
    [
      "Model conversations, memberships, messages, read markers, and notification records separately from ephemeral typing or presence state.",
      "Implement one-to-one or small-group conversation creation with server checks that prevent unauthorized membership manipulation.",
      "Deliver new messages to connected clients through WebSockets, server-sent events, or a managed realtime service while persisting authoritative message history.",
      "Create optimistic message sending with temporary IDs and reconcile success, failure, retry, and duplicate acknowledgment cases.",
      "Track unread state based on persisted read position or equivalent durable logic rather than a fragile in-memory counter.",
      "Implement typing and presence using short-lived realtime state that does not create permanent database rows for every transient event.",
      "Reconnect after network loss and reconcile missing messages without duplicating already rendered content.",
      "Create notification preferences and prove that muted conversations or disabled notification types are respected server-side."
    ],
    [
      "1. Real-time messaging and notification system.",
      "2. Persistent-versus-ephemeral data design.",
      "3. Realtime delivery and reconnect demonstration.",
      "4. Optimistic send and retry evidence.",
      "5. Unread-state test results.",
      "6. Notification preference enforcement proof."
    ],
    "WebSockets, realtime systems, persistence, reconnect logic, unread state, notifications"
  ),

  a(
    11,
    "Build a File & Media Management Platform",
    "Build a file-management product that stores metadata in the database and large binary objects in object storage, with secure upload, download, preview, organization, and lifecycle controls.",
    [
      "Design file, folder, ownership, storage-key, MIME type, size, and sharing metadata separately from the binary object itself.",
      "Implement authenticated upload initiation with file-size and MIME validation before accepting storage operations.",
      "Use presigned or provider-supported direct upload so large files do not unnecessarily pass through the main application server.",
      "Create folder navigation, file listing, rename, move, soft-delete or trash, and restore workflows with consistent metadata updates.",
      "Build safe download or preview access that checks user authorization before generating temporary object access.",
      "Create media preview behavior for supported types while rendering an explicit unsupported-file state for unknown formats.",
      "Enforce a storage quota or simulated usage limit using server-calculated ownership totals.",
      "Document how orphaned objects, deleted metadata, failed multipart uploads, and scheduled cleanup should be reconciled."
    ],
    [
      "1. Working file/media management platform.",
      "2. Storage metadata and object architecture diagram.",
      "3. Secure direct-upload evidence.",
      "4. Folder, move, trash, restore, and preview flows.",
      "5. Authorization and quota test report.",
      "6. Object lifecycle and orphan-cleanup design note."
    ],
    "Object storage, presigned uploads, file metadata, secure downloads, quotas, lifecycle management"
  ),

  a(
    12,
    "Build an Admin & Analytics Dashboard",
    "Build an operations-facing admin console that turns application data into trustworthy metrics while protecting sensitive controls behind administrative authorization.",
    [
      "Define the admin audience, decisions, operational KPIs, date ranges, segmentation needs, and sensitive actions before designing dashboard screens.",
      "Create server-side aggregate queries for user growth, activity, orders or revenue, retention-style metrics, and operational exceptions.",
      "Build date-range and segment filters that update metrics consistently and avoid mixing incompatible time grains.",
      "Add drill-down tables that allow an administrator to move from summary metrics to relevant underlying records.",
      "Implement CSV export from validated server queries while preventing clients from exporting data they are not authorized to access.",
      "Protect every admin route and server operation using administrative authorization rather than navigation visibility.",
      "Add one safe administrative action such as user suspension, refund request flagging, content moderation, or feature enablement with confirmation and audit logging.",
      "Reconcile at least three displayed dashboard totals against direct database queries and record the verification."
    ],
    [
      "1. Admin and analytics dashboard.",
      "2. KPI definition and query document.",
      "3. Filter and drill-down demonstration.",
      "4. Secure CSV export evidence.",
      "5. Audited administrative action proof.",
      "6. Metric reconciliation report."
    ],
    "Analytics queries, admin UX, exports, privileged authorization, audit logging, metric validation"
  ),

  a(
    13,
    "Build a Multi-Tenant SaaS Application",
    "Convert a single-organization product into a true multi-tenant SaaS where users can belong to organizations while every query and mutation preserves tenant isolation.",
    [
      "Introduce organizations, memberships, invitations, roles, and active-organization context into the application data model.",
      "Decide which records are tenant-owned and add explicit organization ownership to every relevant table instead of inferring tenancy indirectly.",
      "Create organization switching while preventing stale client state from leaking records from the previously selected tenant.",
      "Scope server queries by authenticated membership and active organization before applying user-provided filters or record IDs.",
      "Build invitation acceptance with expiration and membership duplication protection.",
      "Add organization-level settings that only authorized roles can change and verify that member permissions differ appropriately.",
      "Write automated tenant-isolation tests attempting cross-organization reads, updates, deletions, exports, and nested-resource access.",
      "Document how background jobs, caches, logs, analytics, and file storage must preserve tenant context beyond normal request handlers."
    ],
    [
      "1. Multi-tenant SaaS application.",
      "2. Organization/membership tenancy model.",
      "3. Organization-switching and invitation evidence.",
      "4. Tenant-isolation automated tests.",
      "5. Organization-role authorization matrix.",
      "6. Cross-system tenant-context design note."
    ],
    "Multi-tenancy, tenant isolation, organizations, memberships, authorization boundaries, SaaS architecture"
  ),

  a(
    14,
    "Build Subscription Billing for Your SaaS",
    "Add commercial plans and subscription entitlements to the multi-tenant SaaS so organizations receive server-enforced capabilities based on trusted billing state.",
    [
      "Define free, pro, and business plan capabilities in an entitlement model separate from pricing page presentation.",
      "Build pricing and upgrade flows using a payment provider's subscription sandbox or test environment.",
      "Store billing customer and subscription references against the correct organization rather than individual browser state.",
      "Process subscription webhooks with signature verification and idempotent event handling.",
      "Enforce premium capability checks on the server so a user cannot unlock paid functionality by editing frontend state or requests.",
      "Handle active, trialing, past-due, canceled, expired, upgraded, and downgraded subscription states with deliberate product behavior.",
      "Create a billing settings area showing plan, entitlement summary, renewal or cancellation status, and access to provider-supported management.",
      "Replay or simulate duplicate and out-of-order billing events and document how the application avoids corrupting subscription state."
    ],
    [
      "1. Subscription-enabled multi-tenant SaaS.",
      "2. Plan and entitlement matrix.",
      "3. Sandbox checkout and billing-settings evidence.",
      "4. Signed webhook and idempotency implementation proof.",
      "5. Server-enforced premium access test.",
      "6. Billing event replay test report."
    ],
    "SaaS billing, subscriptions, entitlements, webhooks, idempotency, server authorization",
    "Use billing sandbox/test mode only. Do not request or submit real card details."
  ),

  a(
    15,
    "Turn Your Application Into an API Platform",
    "Expose selected product capabilities through a versioned external API with predictable contracts, authentication, rate limits, documentation, and developer-friendly error handling.",
    [
      "Choose a coherent set of resources to expose externally and create `/api/v1` contracts without simply mirroring internal database tables.",
      "Define request and response schemas with stable identifiers, validation rules, timestamps, pagination metadata, and consistent error envelopes.",
      "Implement API-key or token-based external access separately from browser session authentication and store only safe credential representations.",
      "Add per-client or per-key rate limiting and return meaningful retry information when limits are exceeded.",
      "Implement filtering, sorting, and pagination while placing sensible boundaries on page size and expensive query combinations.",
      "Generate or maintain OpenAPI documentation and ensure examples reflect the actual running API rather than aspirational behavior.",
      "Add version-aware deprecation guidance for one hypothetical breaking change and explain how existing integrations would migrate.",
      "Create an integration test suite that uses the public API surface as an external developer would."
    ],
    [
      "1. Versioned external API.",
      "2. Public API schema and resource design.",
      "3. API-key/token authentication evidence.",
      "4. Rate-limit and error-response demonstration.",
      "5. OpenAPI documentation.",
      "6. External-style integration test suite."
    ],
    "API platforms, versioning, API keys, rate limiting, OpenAPI, integration testing"
  ),

  a(
    16,
    "Make a Slow Application Production Ready",
    "Profile a deliberately inefficient full-stack application, improve measurable bottlenecks across browser, server, and database layers, and strengthen reliability with testing, logging, and deployment checks.",
    [
      "Capture a performance baseline using browser metrics, API timings, database query evidence, and at least one production-style user journey.",
      "Identify one frontend bottleneck involving bundle size, render work, image handling, hydration, or repeated client fetching and trace its root cause.",
      "Identify one backend bottleneck involving repeated computation, duplicate requests, serialization, network dependency, or missing cache ownership.",
      "Identify one database bottleneck involving N+1 behavior, missing indexes, excessive rows, unbounded joins, or inefficient aggregation.",
      "Implement targeted optimizations and avoid adding caches where invalidation cost would exceed the measured benefit.",
      "Add automated tests around critical business logic and at least one end-to-end flow using Playwright or an equivalent browser test framework.",
      "Introduce structured server logging and correlation/request identifiers sufficient to investigate a failed production request.",
      "Repeat the baseline tests under the same conditions and report the before-and-after impact, remaining bottlenecks, and next likely optimization."
    ],
    [
      "1. Production-readiness optimization repository.",
      "2. Frontend/API/database baseline measurements.",
      "3. Three root-cause performance fixes.",
      "4. Automated unit/integration/end-to-end test evidence.",
      "5. Structured logging example.",
      "6. Before-and-after performance report."
    ],
    "Performance profiling, caching, database optimization, testing, structured logging, production readiness"
  ),

  a(
    17,
    "You Inherited a Broken Production System",
    "Take ownership of an unfamiliar full-stack codebase containing realistic defects, diagnose them from symptoms, make targeted fixes, and ship a safe stabilization release without rewriting the system.",
    [
      "Run the inherited application and create a severity-ranked defect inventory based on reproducible behavior before making changes.",
      "Trace one authorization vulnerability from route or UI symptom through server checks and data access until the actual boundary failure is identified.",
      "Repair one broken or unsafe database migration while preserving existing development data and documenting rollback considerations.",
      "Diagnose one asynchronous or concurrency defect such as duplicate order creation, stale state, race conditions, or repeated requests.",
      "Investigate one production crash using logs, stack traces, failing input, or test reproduction rather than broad speculative refactoring.",
      "Repair one slow query or page by measuring the actual bottleneck and changing only the necessary schema, query, or rendering path.",
      "Add regression coverage around every repaired high-severity problem so the original failure can no longer silently return.",
      "Prepare a stabilization release note covering fixes, migration instructions, deployment order, known risks, and deferred defects."
    ],
    [
      "1. Stabilized inherited full-stack repository.",
      "2. Severity-ranked defect inventory.",
      "3. Root-cause reports for repaired defects.",
      "4. Migration and rollback note.",
      "5. Regression test evidence.",
      "6. Stabilization release notes."
    ],
    "Debugging, production incidents, migrations, authorization repair, concurrency, regression testing",
    "Do not rewrite the project into a preferred stack. The assignment measures diagnosis and safe maintenance of an existing system."
  ),

  a(
    18,
    "A Founder Gives You an Idea — Ship the MVP",
    "Act as the first full-stack engineer for a startup: turn a broad founder brief into a focused product, choose architecture and scope independently, and ship a testable end-to-end MVP within one week.",
    [
      "Convert the founder brief into target users, core workflow, assumptions, success criteria, engineering risks, must-haves, and explicit non-goals.",
      "Choose the application architecture, data model, auth approach, rendering strategy, backend boundaries, and deployment services without receiving a prescribed implementation.",
      "Build a thin vertical slice proving the highest-risk assumption before investing heavily in secondary functionality.",
      "Implement the primary workflow using real persistence and server behavior rather than mocked frontend-only interactions.",
      "Add only the supporting functionality required for a new user to experience and evaluate the core value proposition.",
      "Instrument or define at least three product events or metrics that would reveal whether real users successfully activate and complete the intended workflow.",
      "Conduct a short usability/product test with two people unfamiliar with the project and prioritize fixes based on observed blockers.",
      "Present the MVP with an architecture summary, conscious trade-offs, launch risks, and a V2 roadmap."
    ],
    [
      "1. MVP scope and non-goals document.",
      "2. Architecture and key technology decisions.",
      "3. Working deployed full-stack MVP.",
      "4. Highest-risk assumption proof.",
      "5. Two-person user test and revision summary.",
      "6. Product metrics plan and V2 roadmap."
    ],
    "MVP scoping, architecture, product engineering, deployment, user validation, technical judgment",
    "This assignment is intentionally ambiguous. Review the reasoning and trade-offs, not whether every learner built the same product."
  ),

  a(
    19,
    "72-Hour Full Stack Engineer Take-Home Challenge",
    "Complete a hiring-style full-stack challenge under a fixed time limit and submit a reviewer-ready application with working frontend, backend, database, tests, deployment, and concise technical explanation.",
    [
      "Extract required behaviors, optional enhancements, ambiguity, and assumptions from the challenge before beginning implementation.",
      "Plan the 72-hour effort so core functionality, edge states, tests, documentation, and final review receive dedicated time.",
      "Design a minimal relational schema and API contract that supports the required workflow without premature overengineering.",
      "Implement the primary user flow end to end with real persistence, validation, server-side authorization where applicable, and complete async UI states.",
      "Add one technically meaningful enhancement such as search, background processing, realtime updates, file handling, caching, or role-based access only after core requirements are stable.",
      "Write targeted tests around the highest-risk server logic and at least one critical browser workflow.",
      "Perform a reviewer-style audit for setup failures, leaked secrets, broken migrations, dead code, poor naming, inaccessible forms, missing error states, and undocumented shortcuts.",
      "Record a concise technical walkthrough explaining architecture, trade-offs, known limitations, test strategy, and what you would change with one additional day."
    ],
    [
      "1. Complete take-home repository.",
      "2. Assumptions and 72-hour implementation plan.",
      "3. Deployed full-stack application.",
      "4. Database migration/seed setup.",
      "5. Targeted automated test evidence.",
      "6. Reviewer-ready README and technical walkthrough."
    ],
    "Hiring simulation, end-to-end delivery, prioritization, testing, deployment, technical communication",
    "Building a smaller reliable product is preferred over adding many incomplete bonus features."
  ),

  a(
    20,
    "Production SaaS Capstone: Build, Deploy & Defend",
    "Own a production-style B2B SaaS from problem framing through release candidate, including multi-user access, tenant-safe data, business workflows, testing, security, deployment, observability, and professional handoff.",
    [
      "Write a product and engineering charter defining users, business problem, success measures, scope, non-goals, privacy constraints, reliability expectations, and major technical risks.",
      "Design the system architecture across frontend, server, database, authentication, authorization, tenant model, background or async work, storage, external integrations, and observability.",
      "Create a relational model for organizations, memberships, customers, tickets or work items, comments, attachments, statuses, and audit history with migrations and seed data.",
      "Build the primary B2B workflow end to end with organization-safe authorization, validation, search, filtering, pagination, loading, error, empty, and destructive-action states.",
      "Implement at least one production integration such as object storage, realtime notifications, transactional email, billing sandbox, queue/background work, or external API consumption because the product requires it.",
      "Add administrative or operational views that let authorized users inspect key metrics, exceptions, and recent activity without bypassing tenant boundaries.",
      "Establish a quality gate covering linting, type checks, unit or integration tests, browser end-to-end tests, migration verification, accessibility checks, security review, and secret scanning.",
      "Create CI/CD or equivalent automated deployment checks and produce a reproducible production build with environment-specific configuration.",
      "Add structured logs, error reporting or equivalent observability and demonstrate how you would trace one failed request through the system.",
      "Run a beta review with at least three users or engineers, triage the findings, fix launch blockers, and retain a revision log.",
      "Prepare a technical handoff covering architecture, setup, environments, schema, integrations, migrations, deployment, backups or recovery assumptions, troubleshooting, and known risks.",
      "Deliver a ten-minute engineering defence explaining why the system was designed this way, where the largest production risks remain, and what would change at significantly larger scale."
    ],
    [
      "1. Product and engineering charter.",
      "2. Complete architecture diagram and decision record.",
      "3. Production-style full-stack capstone repository.",
      "4. ER diagram, migrations, seed workflow, and tenant model.",
      "5. Deployed frontend/backend application.",
      "6. API or integration documentation.",
      "7. Quality-gate test and security evidence.",
      "8. CI/CD and production-build evidence.",
      "9. Observability and failed-request trace example.",
      "10. Three-reviewer beta report and revision log.",
      "11. Technical handoff and release notes.",
      "12. Final product demo and ten-minute engineering defence."
    ],
    "Full-stack architecture, SaaS, PostgreSQL, auth, multi-tenancy, testing, security, deployment, observability, technical handoff",
    "Use only authorized services, sandbox integrations, test data, and legally usable assets. Remove secrets and personal data before submission."
  ),
];

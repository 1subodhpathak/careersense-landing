export const dataAnalystPhases = [
  { id: 1, title: "Enter the Analyst World", range: "Weeks 1-4", assignmentIds: [1, 2, 3, 4] },
  { id: 2, title: "Investigate the Business", range: "Weeks 5-8", assignmentIds: [5, 6, 7, 8] },
  { id: 3, title: "Build Analytics Products", range: "Weeks 9-12", assignmentIds: [9, 10, 11, 12] },
  { id: 4, title: "Work Like a Real Analyst", range: "Weeks 13-16", assignmentIds: [13, 14, 15, 16] },
  { id: 5, title: "Become Job Ready", range: "Weeks 17-20", assignmentIds: [17, 18, 19, 20] },
];

const phaseFor = (id) => dataAnalystPhases.find((phase) => phase.assignmentIds.includes(id))?.id ?? null;

const evaluation = [
  { criterion: "Analytical accuracy", weight: 25 },
  { criterion: "Technical execution", weight: 25 },
  { criterion: "Business insight", weight: 20 },
  { criterion: "Documentation", weight: 15 },
  { criterion: "Communication", weight: 15 },
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
    acceptedTypes: [
      "PDF", "DOCX", "PPTX", "XLSX", "CSV", "SQL", "PY", "IPYNB",
      "PBIX", "TWBX", "PNG", "JPG", "ZIP"
    ],
  },
  evaluation,
});

export const dataAnalystAssignments = [
  a(1, "Your First Day as a Data Analyst",
    "You have joined a growing company as a junior data analyst. Set up a professional analytics workspace, take ownership of your first dataset, inspect its quality, and prepare an initial analyst handoff that proves you can start working independently.",
    [
      "Set up a spreadsheet tool, SQL environment, BI tool, Python environment, GitHub account or repository, and a professional project-folder structure.",
      "Find a public or synthetic business dataset with at least 2,000 rows and document its source, licence or usage permission, business context, grain, date range, and limitations.",
      "Create a data dictionary covering every important field, including definition, type, example value, expected range or category, and quality notes.",
      "Profile the dataset for missing values, duplicates, invalid types, impossible values, inconsistent categories, suspicious dates, and unusual numeric values.",
      "Write ten questions that a sales manager, operations manager, finance leader, or product manager could realistically ask about the data.",
      "Use the dataset to answer at least three of those questions with a spreadsheet, SQL query, or simple visualization.",
      "Create a README explaining the business context, tools used, folder structure, data source, known issues, and how another analyst could reproduce your work.",
      "Create a personal 20-week skills baseline showing your current confidence in Excel, SQL, statistics, BI, Python, business reasoning, and communication."
    ],
    [
      "1. Workspace and folder-structure screenshots.",
      "2. Dataset source link plus source, licence, grain, scope, and limitation note.",
      "3. Complete data dictionary and initial data-quality profile.",
      "4. Ten stakeholder questions and answers to at least three of them.",
      "5. Baseline workbook, SQL file, or analysis artifact with supporting screenshots.",
      "6. GitHub or project repository link with README.",
      "7. Week 1 skills-baseline document."
    ],
    "Analytics setup, data literacy, data profiling, business questioning, reproducibility, documentation",
    "Do not submit a tutorial dataset together with copied tutorial answers. The work must show your own analysis and reasoning."),

  a(2, "Clean the Sales Data Before Monday's Meeting",
    "A sales manager has sent you a messy workbook shortly before a leadership meeting. Clean it without destroying the raw data, document every important change, and produce an analysis-ready version the business can trust.",
    [
      "Use a public, synthetic, or self-created sales dataset with at least 5,000 transaction rows and intentionally retain realistic quality issues if the source is too clean.",
      "Preserve the untouched raw data and create separate raw, cleaned, calculations, analysis, dashboard, and documentation sheets or equivalent layers.",
      "Standardize dates, currencies, category labels, product names, customer or region values, blanks, duplicates, and obvious formatting problems.",
      "Use formulas such as SUMIFS, COUNTIFS, XLOOKUP or INDEX/MATCH, IF or IFS, IFERROR, text functions, and date functions where they solve a genuine business need.",
      "Create a cleaning log recording the original issue, business rule used, action taken, number of affected rows, and whether the change is fully trusted or requires confirmation.",
      "Reconcile row counts, revenue, quantity, and other major totals before and after cleaning so legitimate transactions are not accidentally lost.",
      "Create at least four pivot analyses that help management understand sales by product, region, channel, customer type, or time period.",
      "Write five observations discovered during cleaning or initial analysis and flag anything management should not trust yet."
    ],
    [
      "1. Original and cleaned workbook with clearly separated layers.",
      "2. Cleaning log with issue, rule, action, affected rows, and confidence status.",
      "3. Formula evidence and four or more pivot analyses.",
      "4. Before-and-after reconciliation checks.",
      "5. Five observations plus unresolved-data warning note.",
      "6. Screenshots proving the workbook structure and key cleaning decisions."
    ],
    "Excel or Google Sheets, data cleaning, formulas, pivots, reconciliation, auditability"),

  a(3, "Why Are Our Profits Falling?",
    "Leadership says revenue looks healthy but profit is weakening. Use spreadsheet analysis to determine where profitability is deteriorating, what is driving it, and what management should do next.",
    [
      "Use a transactional sales dataset containing revenue plus enough information to derive or analyse cost, profit, discount, product, geography, customer, and time.",
      "Create validated calculations for revenue, cost, gross profit, margin percentage, order count, units, average order value, and average discount.",
      "Analyse monthly and quarterly revenue and profit trends and identify periods where revenue and profit moved in different directions.",
      "Compare profitability by product, category, region, channel, customer segment, and discount band.",
      "Identify at least five products or segments that appear successful by revenue but weak by profit or margin.",
      "Investigate whether discounting, product mix, geography, seasonality, order size, or another measurable factor explains the deterioration.",
      "Build a one-page interactive spreadsheet dashboard that lets a manager inspect the problem without opening raw tables.",
      "Recommend three specific business actions and quantify the evidence supporting each recommendation."
    ],
    [
      "1. Analysis-ready workbook with validated business calculations.",
      "2. Trend, product, region, customer, and discount analysis pack.",
      "3. Evidence for five revenue-versus-profit contradictions.",
      "4. Interactive one-page spreadsheet dashboard.",
      "5. Executive memo with five findings and three recommended actions.",
      "6. Formula-audit and reconciliation evidence."
    ],
    "Spreadsheet analytics, profitability analysis, pivots, business reasoning, dashboarding, recommendations"),

  a(4, "The Customer Database Investigation",
    "Your manager has given you a relational database instead of a spreadsheet. Connect customer, order, product, payment, and supporting tables to answer real business questions without double-counting or breaking the data model.",
    [
      "Use or create a relational business dataset with at least four related tables and load it into PostgreSQL, MySQL, SQLite, DuckDB, SQL Server, or another SQL environment.",
      "Create an ER diagram showing primary keys, foreign keys, table grain, relationship direction, and expected cardinality.",
      "Write validation queries for row counts, null keys, duplicate keys, orphan records, invalid dates, and numeric boundaries before answering business questions.",
      "Answer at least twelve stakeholder questions using SELECT, WHERE, GROUP BY, HAVING, CASE, joins, date logic, and aggregations.",
      "Include at least two questions where an incorrect join would inflate results and prove that your chosen query avoids double-counting.",
      "Use a CTE or subquery to solve at least three multi-step questions.",
      "Create a reusable reporting query or SQL view for a common management question.",
      "Translate the outputs into six plain-English insights and recommend two follow-up investigations."
    ],
    [
      "1. Database setup or load script and ER diagram.",
      "2. SQL validation-query pack with findings.",
      "3. Twelve stakeholder questions with complete SQL solutions.",
      "4. Join-grain and double-counting validation evidence.",
      "5. Reusable reporting view or query layer.",
      "6. Six business insights and two follow-up questions.",
      "7. SQL file or repository link."
    ],
    "SQL foundations, relational modelling, joins, aggregations, CTEs, validation, business translation"),

  a(5, "Find Our Most Valuable Customers",
    "The commercial team wants to know which customers deserve retention, upsell, or reactivation attention. Use advanced SQL to segment customers based on actual behaviour rather than intuition.",
    [
      "Use a customer-and-transactions database with customer ID, transaction dates, value, and useful dimensions such as product, region, channel, or acquisition source.",
      "Define what 'valuable customer' means for the selected business and document the assumptions behind the definition.",
      "Use SQL to calculate customer-level metrics such as recency, frequency, monetary value, lifetime revenue, average order value, order cadence, and active months.",
      "Use CTEs and window functions for ranking, percentiles, running totals, first or last purchase, period comparisons, or behavioural sequences.",
      "Create a defensible segmentation framework with at least four customer groups and write the logic directly in SQL.",
      "Compare segments by revenue contribution, retention behaviour, purchase frequency, product mix, or another meaningful dimension.",
      "Identify high-value customers at risk of becoming inactive and quantify the value potentially exposed.",
      "Recommend a different business action for each major segment and define how success would be measured."
    ],
    [
      "1. Customer-value definition and assumptions document.",
      "2. Reproducible advanced SQL analysis.",
      "3. Customer-level metric table or view.",
      "4. Segmentation logic and segment profile table.",
      "5. High-value-at-risk customer analysis.",
      "6. Segment-specific action plan and success metrics.",
      "7. Output screenshots or dashboard excerpt."
    ],
    "Advanced SQL, CTEs, window functions, customer segmentation, RFM-style analysis, commercial reasoning"),

  a(6, "Management Says the Numbers Don't Match",
    "Finance, sales, and the dashboard are reporting different revenue numbers for the same month. Treat this as a real production analytics incident: trace the discrepancy, identify root causes, correct what can be corrected, and restore trust in the metric.",
    [
      "Create or source two or more reports or datasets that should represent the same business metric but contain intentional differences in scope, timing, grain, filters, or data quality.",
      "Write a metric contract defining exactly what revenue means, including inclusion rules, exclusions, transaction status, date logic, currency treatment, refunds, taxes, and grain.",
      "Reconcile record counts and monetary totals step by step instead of comparing only final numbers.",
      "Investigate at least five possible mismatch causes such as duplicated joins, missing transactions, timezone shifts, cancelled orders, refunds, late-arriving data, currency conversion, or inconsistent filters.",
      "Build a reconciliation table that explains how much of the gap is attributable to each confirmed cause.",
      "Correct the query or transformation logic for issues that can be resolved without business approval and preserve unresolved exceptions separately.",
      "Create validation checks that would catch the same type of discrepancy in the future.",
      "Write a concise incident summary explaining root cause, business impact, corrected number, residual risk, and prevention plan."
    ],
    [
      "1. Metric contract and scope definition.",
      "2. Reconciliation workbook or SQL pack.",
      "3. Root-cause analysis with quantified mismatch bridge.",
      "4. Corrected logic and before-versus-after evidence.",
      "5. Automated or reusable validation checks.",
      "6. Analytics incident report for management."
    ],
    "Reconciliation, debugging, SQL quality, metric governance, root-cause analysis, stakeholder trust"),

  a(7, "What Is Actually Driving the Business?",
    "A senior manager has asked for a deeper explanation of performance, not another summary dashboard. Explore a multi-variable dataset to identify the segments, trends, relationships, and anomalies most likely to explain business results.",
    [
      "Choose a dataset with multiple numeric and categorical variables and define the analytical population, grain, time window, measures, dimensions, and exclusions.",
      "Profile key variables with descriptive statistics and distributions, including central tendency, spread, percentiles, missingness, and skew where relevant.",
      "Analyse trends over time and compare meaningful business segments instead of relying only on overall averages.",
      "Investigate at least three relationships between variables using appropriate plots or summary measures, while explicitly avoiding unsupported causal claims.",
      "Identify material outliers and test whether your main conclusions change when they are included versus excluded.",
      "Create at least eight purposeful visualizations, each tied to an explicit business question.",
      "Separate confirmed findings, interpretations, assumptions, hypotheses, and unanswered questions in your analysis notes.",
      "Prioritize the five findings that deserve management attention and explain why each matters."
    ],
    [
      "1. Analysis scope, population, and assumptions document.",
      "2. Reproducible EDA workbook, SQL analysis, or notebook.",
      "3. Descriptive-statistics and segmentation tables.",
      "4. Eight-chart visualization pack with question and interpretation for each chart.",
      "5. Outlier and sensitivity analysis.",
      "6. Executive EDA summary with five prioritized findings and open questions."
    ],
    "EDA, descriptive statistics, segmentation, visualization, outlier analysis, analytical reasoning"),

  a(8, "Did the Campaign Really Work?",
    "Marketing claims a recent campaign increased conversions. Determine whether the evidence supports that claim, quantify the size and uncertainty of the change, and advise whether the company should scale, modify, or stop the campaign.",
    [
      "Use a public or synthetic campaign, experiment, or pre-post dataset containing an outcome such as conversion, revenue, engagement, or retention.",
      "Define the treatment or comparison groups, success metric, time window, population, exclusions, and any known selection limitations.",
      "Calculate baseline and observed performance for the relevant groups and quantify absolute and relative lift.",
      "Choose and perform an appropriate statistical comparison such as a confidence interval, proportion test, t-test, chi-square test, or another justified method.",
      "Check sample size, imbalance, outliers, missingness, seasonality, and segment mix for reasons the result could be misleading.",
      "Analyse at least three meaningful segments and distinguish planned analysis from exploratory slicing.",
      "Translate statistical significance, practical significance, and uncertainty into non-technical business language.",
      "Recommend whether to scale, rerun, redesign, or stop the campaign and define the next measurement plan."
    ],
    [
      "1. Campaign or experiment analysis brief.",
      "2. Reproducible calculation workbook, SQL, or Python notebook.",
      "3. Statistical test or confidence-interval evidence with assumptions.",
      "4. Segment and sensitivity analysis.",
      "5. Business interpretation separating statistical and practical significance.",
      "6. Go, modify, rerun, or stop recommendation with next measurement plan."
    ],
    "Business statistics, hypothesis testing, confidence intervals, experimentation, interpretation, decision-making"),

  a(9, "Design the Metrics Leadership Should Trust",
    "A fast-growing business has many dashboards but no agreement on what its most important metrics actually mean. Build a governed KPI framework that leaders can use consistently without arguing over definitions every month.",
    [
      "Choose a business model such as ecommerce, SaaS, marketplace, fintech, logistics, media, or retail and describe its customer journey and operating model.",
      "Define one primary business objective and create a metric tree connecting a north-star outcome to drivers, inputs, and guardrail metrics.",
      "Define at least twelve KPIs with business definition, formula, numerator, denominator, grain, dimensions, source, refresh frequency, owner, exclusions, and interpretation.",
      "Classify metrics as leading, lagging, diagnostic, operational, or guardrail where appropriate.",
      "Calculate at least eight of the KPIs from sample data and reconcile important totals against source records.",
      "Design targets, thresholds, or alert logic and explain the evidence or assumption behind each threshold.",
      "Document at least five ways the KPIs could be misread, gamed, double-counted, or compared incorrectly.",
      "Create a one-page leadership scorecard showing current status and the action expected when a metric turns red, amber, or green."
    ],
    [
      "1. Business context and customer-journey summary.",
      "2. North-star metric and complete metric tree.",
      "3. KPI dictionary with at least twelve governed definitions.",
      "4. KPI calculation and reconciliation files.",
      "5. Target, threshold, and alert logic.",
      "6. Metric misuse and governance note.",
      "7. Leadership scorecard and action guide."
    ],
    "KPI design, metric trees, governance, business modelling, calculation, executive reporting"),

  a(10, "Build the CEO Dashboard",
    "The CEO wants one place to understand company performance and decide where leadership attention is needed. Build a stakeholder-ready Power BI or Tableau dashboard from raw data through validated metrics and final decision views.",
    [
      "Write a dashboard brief defining the executive audience, decisions, core questions, KPIs, scope, refresh expectations, and success criteria.",
      "Prepare a clean analytical model using a star schema or another justified structure and document relationships and grain.",
      "Create calculated measures or fields for the agreed KPIs and reconcile them against independent control totals.",
      "Build an executive overview page that communicates health and exceptions within seconds rather than showing every available metric.",
      "Build at least two diagnostic pages that let leaders move from a high-level problem into product, geography, customer, channel, or time drivers.",
      "Use appropriate charts, hierarchy, labels, tooltips, filters, drill paths, and accessible design rather than decorative visuals.",
      "Handle empty, zero, partial-period, incomplete, and unusual-data states so the dashboard cannot silently mislead users.",
      "Test the dashboard with at least three people, record where they struggle, and revise the design based on evidence."
    ],
    [
      "1. Executive dashboard requirements brief.",
      "2. Data-model diagram and measure dictionary.",
      "3. PBIX, Tableau workbook, or published dashboard link.",
      "4. KPI reconciliation and validation evidence.",
      "5. Executive overview plus diagnostic-page screenshots.",
      "6. Three-user usability report and revision log.",
      "7. Short dashboard interaction guide."
    ],
    "Power BI or Tableau, data modelling, DAX or calculated fields, dashboard UX, validation, usability testing"),

  a(11, "Fix This Terrible Dashboard",
    "You have inherited a dashboard that technically works but is confusing, crowded, inconsistent, and difficult to use. Audit it like a professional analyst, redesign it around decisions, and prove that the new version is better.",
    [
      "Find a public dashboard, recreate a deliberately poor dashboard, or use one of your earlier dashboards as the starting point; retain screenshots of the original.",
      "Conduct a structured audit covering audience fit, KPI choice, chart selection, hierarchy, colour, labels, filters, clutter, accessibility, mobile or screen fit, and misleading design risks.",
      "List at least ten specific usability or communication problems and rank them by business impact.",
      "Rewrite the dashboard's purpose around the decisions the intended user needs to make.",
      "Redesign the information architecture before changing colours or styling.",
      "Rebuild the dashboard using fewer, more purposeful visuals and consistent metric definitions.",
      "Run task-based testing with at least three users and measure whether they can answer five predefined questions faster or more accurately than with the original.",
      "Document every major change and the evidence or design principle behind it."
    ],
    [
      "1. Original dashboard screenshots or file.",
      "2. Structured dashboard audit with at least ten ranked issues.",
      "3. Redesigned dashboard file or published link.",
      "4. Before-and-after comparison pack.",
      "5. Task-based usability test results for three users.",
      "6. Revision log explaining major design decisions."
    ],
    "Dashboard critique, visualization design, UX, accessibility, stakeholder focus, usability testing"),

  a(12, "Present the Bad News to Leadership",
    "Your analysis has uncovered a meaningful business problem. Turn the technical work into a short executive briefing that explains what happened, why it matters, what leadership should do next, and how success will be measured.",
    [
      "Select one analysis from Weeks 3-11 that contains a meaningful negative, risky, or counterintuitive finding.",
      "Identify the executive audience, the decision they need to make, the deadline, and the financial or operational stakes.",
      "Reduce the analysis to one central message supported by no more than five critical findings.",
      "Choose only charts that directly support the decision and remove analytical detail that belongs in an appendix.",
      "Quantify impact, uncertainty, trade-offs, and risks using language a non-technical leader can understand.",
      "Write recommendations with owner, action, expected result, measurement metric, and review date.",
      "Create a technical appendix preserving definitions, queries, calculations, assumptions, validation checks, and limitations.",
      "Deliver and record a five-minute presentation, collect at least three questions, then revise the briefing so it can stand alone without narration."
    ],
    [
      "1. Executive audience, decision, deadline, and stakes statement.",
      "2. One-page executive brief.",
      "3. Five-minute presentation deck with speaker notes.",
      "4. Recommendation action table.",
      "5. Technical appendix and metric definitions.",
      "6. Presentation video link or evidence.",
      "7. Reviewer questions, responses, and final revision."
    ],
    "Executive communication, data storytelling, recommendations, stakeholder management, presentation"),

  a(13, "Analyze 500,000 Transactions with Python",
    "The dataset is now too large and repetitive for comfortable spreadsheet analysis. Use Python and pandas to load, clean, validate, analyse, and communicate insights from a large transaction dataset reproducibly.",
    [
      "Use a public or synthetic transaction dataset with at least 500,000 rows; if necessary, combine or generate realistic records while documenting the method.",
      "Load and inspect the data efficiently, checking shape, schema, memory use, missingness, duplicates, date coverage, and numeric boundaries.",
      "Build reusable cleaning steps for types, dates, text categories, missing values, duplicates, impossible values, and selected outliers.",
      "Create validation assertions or checks so the notebook or script can detect unexpected row loss, duplicate keys, negative values, or broken totals.",
      "Use pandas groupby, merge, pivot_table, transformations, datetime operations, and appropriate vectorized logic to answer at least ten business questions.",
      "Create at least six purposeful visualizations and identify the five most decision-relevant findings.",
      "Compare one inefficient approach with a more efficient implementation and explain the improvement.",
      "Package the analysis so another analyst can rerun it from raw data to final outputs."
    ],
    [
      "1. Dataset source or generation note and data profile.",
      "2. Reproducible Jupyter notebook or Python script.",
      "3. Cleaning and validation framework.",
      "4. Ten business questions with code and outputs.",
      "5. Six-chart visualization pack.",
      "6. Efficiency comparison and explanation.",
      "7. README with setup and reproducibility instructions."
    ],
    "Python, pandas, large-data analysis, validation, visualization, performance awareness, reproducibility"),

  a(14, "Stop Building This Report Manually",
    "A weekly business report takes an analyst hours of copy-paste work. Automate the workflow so raw files can be processed, validated, summarized, and delivered consistently with minimal manual effort.",
    [
      "Choose a recurring report you can realistically simulate, such as weekly sales, operations, marketing, inventory, finance, or customer-service performance.",
      "Document the current manual workflow step by step, including inputs, transformations, calculations, quality checks, outputs, and failure points.",
      "Create at least four historical input files or batches that follow the same general structure but include realistic variation.",
      "Build a Python, SQL, Power Query, or mixed automation that ingests new files, cleans them, applies business rules, calculates metrics, and generates the required output.",
      "Add validation checks for missing files, changed columns, duplicates, invalid dates, unexpected categories, row-count shifts, and material total changes.",
      "Generate a repeatable output such as an Excel report, CSV summary, dashboard-ready table, PDF, or email-ready summary file.",
      "Test the automation against at least three input batches, including one intentionally broken batch, and document how failures are handled.",
      "Estimate the manual time saved per week and write a handoff guide so another analyst can operate the workflow."
    ],
    [
      "1. Current-state manual workflow map.",
      "2. Automation code, query, or Power Query workflow.",
      "3. Sample input files and generated outputs.",
      "4. Validation and failure-handling evidence.",
      "5. Test log covering at least three batches and one broken case.",
      "6. Time-saved estimate and business impact note.",
      "7. Technical handoff and operating guide."
    ],
    "Analytics automation, Python or Power Query, validation, repeatable reporting, error handling, documentation"),

  a(15, "Which Stores Should We Invest In?",
    "A retail leadership team has a limited investment budget and wants to know which locations deserve expansion, remediation, or possible closure. Build an end-to-end decision model using store performance data rather than ranking stores by revenue alone.",
    [
      "Use or construct a multi-store dataset containing time, location, sales, cost or margin, transactions, and at least three operational or market dimensions such as footfall, area, staffing, returns, category mix, local population, or customer ratings.",
      "Define the investment decision and create a scorecard that includes both performance and risk rather than relying on a single metric.",
      "Clean and reconcile the data, then calculate store-level KPIs consistently across comparable time periods.",
      "Separate strong stores, high-potential stores, turnaround candidates, and structurally weak stores using transparent rules.",
      "Investigate drivers behind underperformance and identify cases where raw revenue gives a misleading picture.",
      "Run at least one scenario analysis showing how the recommendation changes if a key assumption or weight changes.",
      "Recommend how a fixed hypothetical investment budget should be allocated across selected stores and explain the expected business logic.",
      "Build a concise decision dashboard or scorecard and write an executive recommendation."
    ],
    [
      "1. Investment decision brief and scoring framework.",
      "2. Cleaned and reconciled store-performance dataset.",
      "3. Store KPI and segmentation analysis.",
      "4. Driver analysis and examples where revenue alone is misleading.",
      "5. Scenario or sensitivity analysis.",
      "6. Budget-allocation recommendation.",
      "7. Decision dashboard or scorecard plus executive memo."
    ],
    "Operations analytics, scorecards, profitability, segmentation, scenario analysis, executive decision support"),

  a(16, "Why Are Customers Leaving?",
    "A subscription or repeat-purchase business is losing customers. Analyse behavioural patterns around churn, identify the groups and signals associated with higher risk, and recommend interventions the business can test.",
    [
      "Use a public or synthetic customer-retention dataset containing a clear churn or inactivity outcome plus behavioural, product, service, or demographic-safe attributes.",
      "Define churn precisely, including observation window, inactivity period, eligible population, exclusions, and any limitations of the available data.",
      "Calculate overall churn and compare it across tenure, product, contract, usage, support, payment, geography, acquisition source, or other meaningful dimensions.",
      "Create cohorts based on signup or first purchase period and examine whether retention differs across cohorts.",
      "Identify at least five behaviours or attributes associated with materially different churn rates, while avoiding claims that correlation proves causation.",
      "Estimate the revenue or customer value exposed in the highest-risk groups using a transparent method.",
      "Prioritize three retention interventions and define the target population, expected behaviour change, success metric, and experiment design for each.",
      "Create a stakeholder-ready churn analysis artifact and explicitly state what additional data would improve the decision."
    ],
    [
      "1. Churn definition, population, and limitations document.",
      "2. Reproducible churn and segment analysis.",
      "3. Cohort-retention analysis.",
      "4. Five or more high-risk signals with evidence.",
      "5. Revenue or customer-value exposure estimate.",
      "6. Three prioritized retention experiments.",
      "7. Dashboard, report, or executive summary with additional-data request."
    ],
    "Customer analytics, churn, cohorts, retention, segmentation, commercial impact, experiment design"),

  a(17, "Where Is Our Marketing Money Going?",
    "The company is spending across multiple marketing channels but leadership cannot tell which channels create valuable customers. Analyse the full funnel from spend to acquisition to revenue and recommend where budget should move next.",
    [
      "Use or create a marketing dataset spanning at least four channels and containing spend, impressions or reach, clicks or visits, conversions or customers, and downstream revenue or value.",
      "Define the marketing funnel and document the attribution assumptions, time window, exclusions, and limitations before calculating performance.",
      "Calculate relevant metrics such as CPM, CPC, CTR, conversion rate, CAC or CPA, revenue per acquired customer, ROAS, and payback proxy where supported by the data.",
      "Compare channel performance across time and at least two additional dimensions such as campaign, geography, device, audience, product, or customer type.",
      "Identify channels that look efficient on top-of-funnel metrics but weak on customer or revenue quality, and vice versa.",
      "Create a simple scenario showing how reallocating a fixed budget could change expected acquisitions or revenue, with assumptions clearly stated.",
      "Recommend where to increase, maintain, test, or reduce spend and attach a measurement plan to each recommendation.",
      "Present the analysis as if you were answering a CMO who wants a budget decision, not a lesson on marketing metrics."
    ],
    [
      "1. Funnel, attribution, scope, and assumptions document.",
      "2. Reproducible channel-performance analysis.",
      "3. Marketing KPI table with definitions.",
      "4. Channel and segment comparison visuals.",
      "5. Budget-reallocation scenario.",
      "6. Increase, maintain, test, or reduce recommendation by channel.",
      "7. CMO-ready briefing or dashboard."
    ],
    "Marketing analytics, funnels, CAC, ROAS, attribution awareness, scenario analysis, budget recommendations"),

  a(18, "The CEO Gives You an Ambiguous Problem",
    "The CEO says only: 'Growth has slowed. Tell me what is happening and what we should do.' You will receive no prescribed tool, KPI list, chart list, or step-by-step method. Frame the problem, choose the analysis, challenge assumptions, and produce a defensible recommendation.",
    [
      "Select a realistic public or synthetic business dataset broad enough to investigate growth across time, customers, products, channels, and at least one operational dimension.",
      "Write your own problem statement, stakeholder decision, analytical scope, success condition, assumptions, and list of questions that must be answered.",
      "Decide which metrics define growth for this business and justify why those metrics matter more than plausible alternatives.",
      "Inspect data quality and document any limitation that could materially change the conclusion.",
      "Choose your own combination of SQL, spreadsheets, Python, BI, statistics, or other analytical methods; use only what the problem requires.",
      "Identify the most important drivers of growth slowdown and test at least two alternative explanations before settling on a conclusion.",
      "Quantify business impact and recommend no more than three actions, each with expected outcome, owner, metric, and review period.",
      "Create an executive artifact plus a technical appendix that allows another analyst to challenge or reproduce your reasoning."
    ],
    [
      "1. Self-authored problem statement, decision, scope, and analytical plan.",
      "2. Data-quality and limitation assessment.",
      "3. Reproducible analysis using tools of your choice.",
      "4. Alternative-hypothesis or competing-explanation analysis.",
      "5. Quantified growth-driver findings.",
      "6. Maximum three prioritized recommendations with measurement plan.",
      "7. Executive artifact and technical appendix.",
      "8. Short reflection explaining why you chose your analytical approach."
    ],
    "Problem framing, ambiguous requirements, independent analysis, hypothesis testing, business judgment, executive communication",
    "This assignment intentionally provides less structure. Scoring rewards justified choices and evidence, not the use of a specific tool."),

  a(19, "The Data Analyst 72-Hour Take-Home Challenge",
    "Simulate a real hiring take-home. Choose a fresh dataset you have not previously analysed, work under a strict time-box, and submit a concise package that demonstrates how you clean data, write queries or code, analyse the business, visualize findings, and communicate recommendations.",
    [
      "Start with a new public or synthetic dataset and record the timestamp or evidence showing when you began the challenge.",
      "Limit total working time to a self-declared maximum of 12 focused hours inside a 72-hour window and maintain a simple time log.",
      "Create a one-page analysis plan before doing deep analysis, including stakeholder, key questions, likely metrics, risks, and intended deliverables.",
      "Perform only the cleaning and transformation necessary to answer the business questions, documenting material assumptions and unresolved issues.",
      "Use SQL, Python, spreadsheets, BI, or a justified combination to answer the highest-value questions rather than trying to analyse everything.",
      "Produce a polished visual or dashboard plus an executive summary containing the three most important findings and three recommendations or next steps.",
      "Package the work exactly as you would send it to a hiring manager: clean repository, README, runnable files, outputs, assumptions, limitations, and no unnecessary clutter.",
      "Record a five-minute walkthrough explaining your approach, one trade-off you made because of the time limit, and what you would investigate next with more time."
    ],
    [
      "1. Start evidence and 72-hour challenge time log.",
      "2. One-page analysis plan.",
      "3. Clean, reproducible analysis repository or submission package.",
      "4. Technical analysis files and validation evidence.",
      "5. Polished dashboard, visual report, or analytical presentation.",
      "6. Executive summary with three findings and three recommendations.",
      "7. README, assumptions, and limitations.",
      "8. Five-minute interview-style walkthrough video link."
    ],
    "Take-home case execution, prioritization, time management, technical analysis, portfolio quality, interview communication",
    "Do not reuse a dataset or finished analysis from an earlier fellowship week. The purpose is to demonstrate independent performance under time pressure."),

  a(20, "Boardroom Capstone: Defend Your Analysis",
    "Operate as the lead analyst on a complete business problem. Build an end-to-end analytics solution from raw data to executive recommendation, present it as if to a leadership team, defend your choices under questioning, and hand over work another analyst can continue.",
    [
      "Choose a substantial public, synthetic, or explicitly authorized dataset and write a capstone charter covering stakeholder, business problem, decision, scope, milestones, risks, and success criteria.",
      "Create a complete data dictionary, quality assessment, cleaning workflow, exception log, and reconciliation controls before final analysis.",
      "Build a documented analytical model and governed KPI layer appropriate to the business problem.",
      "Conduct trend, segment, driver, diagnostic, and at least one sensitivity, cohort, funnel, experiment, or scenario analysis where relevant.",
      "Develop a stakeholder-ready analytics product such as an executive Power BI or Tableau dashboard, analytical application, or equivalent interactive decision tool.",
      "Validate important calculations independently and complete usability or peer testing with at least three reviewers.",
      "Write a boardroom recommendation that prioritizes actions by impact, confidence, effort, risk, owner, and success metric.",
      "Create a presentation that explains context, data, method, findings, recommendations, limitations, and next steps without overwhelming the audience with technical detail.",
      "Deliver and record a ten-minute presentation, capture at least five reviewer questions, and submit written responses or corrections after the review.",
      "Create a professional technical handoff covering setup, data refresh, dependencies, metric definitions, validation controls, troubleshooting, known limitations, and future improvements.",
      "Publish a sanitized portfolio version and create a two-minute interview-ready explanation of the project.",
      "Compare your Week 1 skills baseline with Week 20 and provide evidence of how your analytical capability changed across the fellowship."
    ],
    [
      "1. Capstone charter and milestone plan.",
      "2. Source note, data dictionary, quality report, cleaning workflow, and exception log.",
      "3. Analytical model, KPI dictionary, and governed calculation layer.",
      "4. Reproducible analysis files with validation and reconciliation evidence.",
      "5. Published or packaged dashboard or analytical product.",
      "6. Reviewer usability evidence and revision log.",
      "7. Boardroom recommendations with impact, confidence, effort, risk, owner, and measurement.",
      "8. Final executive presentation deck and ten-minute presentation video.",
      "9. Reviewer questions, responses, and correction log.",
      "10. Technical handoff guide and complete repository.",
      "11. Sanitized public portfolio link and two-minute interview introduction.",
      "12. Week 1 versus Week 20 evidence-based skills reflection."
    ],
    "End-to-end analytics, project ownership, data quality, modelling, SQL, Python, BI, validation, storytelling, stakeholder defence, handoff, portfolio development",
    "Completion requires mentor approval, a score of at least 75%, all required corrections, and adherence to data privacy and program policies. Use only public, synthetic, or explicitly authorized data; remove personal data, secrets, tokens, and credentials before submission."),
];

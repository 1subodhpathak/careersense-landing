export const dataSciencePhases = [
  { id: 1, title: "Enter the Data Science World", range: "Weeks 1-4", assignmentIds: [1, 2, 3, 4] },
  { id: 2, title: "Build Predictive Intelligence", range: "Weeks 5-8", assignmentIds: [5, 6, 7, 8] },
  { id: 3, title: "Solve Real Machine Learning Problems", range: "Weeks 9-12", assignmentIds: [9, 10, 11, 12] },
  { id: 4, title: "Build Production-Ready Data Science", range: "Weeks 13-16", assignmentIds: [13, 14, 15, 16] },
  { id: 5, title: "Operate Like a Data Scientist", range: "Weeks 17-20", assignmentIds: [17, 18, 19, 20] },
];

const phaseFor = (id) => dataSciencePhases.find((phase) => phase.assignmentIds.includes(id))?.id ?? null;

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
      "JSON", "PKL", "JOBLIB", "ONNX", "PNG", "JPG", "ZIP"
    ],
  },
  evaluation,
});

export const dataScienceAssignments = [
  a(1, "Your First Week as a Data Scientist",
    "You have joined a product company as a junior data scientist. Set up a reproducible working environment, take ownership of an unfamiliar dataset, frame meaningful business questions, and establish a baseline showing how you currently approach data science work.",
    [
      "Set up Python, Jupyter or VS Code, Git, GitHub, a virtual environment, and a professional project structure with folders for data, notebooks, source code, models, reports, and documentation.",
      "Choose a public or synthetic business dataset with at least 5,000 rows and document its source, usage permission, business context, grain, date range, target possibilities, and known limitations.",
      "Create a structured data dictionary describing important fields, data types, units, valid ranges or categories, missing-value meaning, and likely modelling relevance.",
      "Perform a first-pass scientific triage that measures schema consistency, missingness, duplicates, unusual distributions, suspicious values, class balance where applicable, and possible target leakage candidates.",
      "Write ten business questions that could reasonably lead to descriptive analysis, experimentation, prediction, ranking, segmentation, forecasting, or recommendation work.",
      "Select one question and create a lightweight baseline analysis showing how you move from a business question to evidence without building a complex model.",
      "Create a reproducibility README with environment setup, dataset instructions, project structure, assumptions, and exact steps another data scientist would follow to run your work.",
      "Score your current confidence in Python, SQL, statistics, EDA, machine learning, model evaluation, deployment, experimentation, and communication to create a Week 1 baseline."
    ],
    [
      "1. Environment and project-structure screenshots.",
      "2. Dataset source and business-context note.",
      "3. Data dictionary and scientific data-triage report.",
      "4. Ten business questions with problem-type classification.",
      "5. Baseline analysis notebook or script.",
      "6. GitHub or project repository with reproducibility README.",
      "7. Week 1 Data Science skills-baseline document."
    ],
    "Data Science setup, reproducibility, data literacy, problem framing, exploratory reasoning, documentation",
    "Do not copy a completed Kaggle notebook or tutorial solution. The submission must show your own project setup, questions, analysis choices, and reasoning."),

  a(2, "The Dataset Is Messier Than Everyone Thought",
    "The modelling team expected clean training data, but the source contains broken values, inconsistent records, hidden duplicates, and ambiguous missingness. Build a reproducible preprocessing workflow that fixes what can be defended and isolates what cannot.",
    [
      "Use a dataset with at least 20,000 rows and preserve an immutable raw copy before performing any cleaning or transformation.",
      "Create a data-quality inventory that separates schema defects, missing-value patterns, duplicate entities, invalid ranges, inconsistent categories, timestamp problems, and suspicious outliers.",
      "Investigate whether missing values appear random, structurally meaningful, or concentrated in particular segments, time periods, or source systems.",
      "Design explicit remediation rules for each major issue and distinguish deterministic corrections from imputations, exclusions, and cases requiring business confirmation.",
      "Implement the preprocessing workflow in reusable Python functions or a pipeline rather than relying on one-off notebook edits.",
      "Create an exceptions dataset containing records that cannot be safely corrected and attach a reason code to every quarantined row.",
      "Compare important distributions, record counts, target rates, and aggregate totals before and after preprocessing to detect unintended distortion.",
      "Write a short model-readiness decision explaining which fields are safe to use, which should be excluded, and which data problems could bias a future model."
    ],
    [
      "1. Raw-data preservation evidence and data-quality inventory.",
      "2. Missingness and anomaly investigation.",
      "3. Cleaning and remediation rules register.",
      "4. Reusable Python preprocessing code.",
      "5. Exceptions dataset with reason codes.",
      "6. Before-and-after distribution and reconciliation report.",
      "7. Model-readiness assessment."
    ],
    "Python, pandas, data quality, missing-data analysis, preprocessing, reproducibility, bias awareness"),

  a(3, "What Is Actually Driving Customer Behaviour?",
    "A product leader sees major differences in customer activity but does not know what is associated with those differences. Conduct a disciplined exploratory investigation that turns raw behaviour into testable hypotheses without confusing correlation with causation.",
    [
      "Use a customer, product, subscription, marketplace, or engagement dataset containing multiple numeric and categorical variables plus a meaningful behavioural outcome.",
      "Define the analytical population, observation period, unit of analysis, outcome measures, exclusions, and any sampling limitations before exploring relationships.",
      "Characterize key variables using distributions, percentiles, skew, category frequency, and segment-specific summaries rather than relying only on averages.",
      "Investigate at least five candidate drivers using appropriate visualizations, grouped statistics, correlations, or conditional comparisons.",
      "Check whether apparent relationships change when controlling for a third variable such as tenure, geography, acquisition channel, product tier, or time period.",
      "Identify high-leverage anomalies or subgroups whose behaviour differs materially from the overall population and explain why they deserve separate investigation.",
      "Create a hypothesis register that labels each statement as observed fact, interpretation, testable hypothesis, or unsupported causal claim.",
      "Prioritize three hypotheses for future experimentation or modelling and explain what additional evidence would be needed to test each one."
    ],
    [
      "1. Analytical population and scope document.",
      "2. Reproducible EDA notebook.",
      "3. Variable-distribution and segment-analysis pack.",
      "4. Candidate-driver analysis with conditional comparisons.",
      "5. Anomaly or subgroup investigation.",
      "6. Hypothesis register.",
      "7. Three prioritized next-step hypotheses with evidence requirements."
    ],
    "Exploratory data analysis, descriptive statistics, multivariate reasoning, hypothesis generation, confounding awareness, scientific communication"),

  a(4, "Did the Experiment Really Work?",
    "A product team ran an experiment and wants to ship the winning experience immediately. Analyse the evidence, challenge the experiment design, quantify uncertainty, and decide whether the result is strong enough for a rollout decision.",
    [
      "Use a public or synthetic A/B test dataset containing assignment group, outcome, timestamp, and at least two useful segmentation variables.",
      "Audit randomization by checking sample balance, duplicate participants, exposure integrity, pre-treatment characteristics, and whether users appear in more than one group.",
      "Define the primary metric, guardrail metrics, analysis population, minimum practical effect, and decision rule before running significance tests.",
      "Calculate treatment effect with an appropriate confidence interval and statistical test, clearly stating assumptions and interpreting the result in business terms.",
      "Estimate practical impact by translating the measured effect into an expected number of users, transactions, revenue, cost, or another meaningful business unit.",
      "Investigate whether the conclusion is sensitive to outliers, incomplete observation windows, sample-ratio mismatch, multiple comparisons, or excluded records.",
      "Perform no more than three justified segment checks and explain why post-hoc slicing can create false discoveries.",
      "Issue a ship, do-not-ship, continue-test, or redesign recommendation and define exactly what evidence would change your decision."
    ],
    [
      "1. Experiment-design audit.",
      "2. Metric and decision-rule specification.",
      "3. Reproducible statistical analysis notebook.",
      "4. Treatment-effect estimate with confidence interval and assumptions.",
      "5. Practical-impact calculation.",
      "6. Sensitivity and experiment-risk assessment.",
      "7. Final rollout recommendation with decision threshold."
    ],
    "Experimentation, hypothesis testing, confidence intervals, causal reasoning, practical significance, decision-making"),

  a(5, "Predict Next Month's Revenue",
    "Finance needs an early estimate of future revenue for planning. Build and compare regression models, but treat usefulness, error behaviour, and business consequences as more important than producing the highest possible score.",
    [
      "Use a dataset where a continuous business outcome can be predicted from information that would genuinely be available before the prediction date.",
      "Define the prediction target, prediction horizon, observation unit, feature-availability cutoff, and business use case in a model charter.",
      "Create a naive business baseline such as historical mean, segment average, previous-period value, or another defensible benchmark before training machine learning models.",
      "Prepare a leakage-safe train, validation, and test strategy that respects time or entity boundaries where the problem requires it.",
      "Train a linear regression model and at least two alternative regression approaches, using a consistent preprocessing process for fair comparison.",
      "Compare models using MAE, RMSE, R-squared, and at least one business-relevant error view such as percentage error, error by segment, or under-versus-over prediction.",
      "Inspect residual patterns to identify non-linearity, heteroscedasticity, influential observations, systematic segment bias, or other failure modes.",
      "Recommend whether Finance should use the model and state a range of situations where its prediction should not be trusted."
    ],
    [
      "1. Model charter with target, horizon, cutoff, and use case.",
      "2. Naive baseline and benchmark results.",
      "3. Reproducible regression modelling notebook or scripts.",
      "4. Model-comparison table with technical and business error metrics.",
      "5. Residual and failure-mode analysis.",
      "6. Final model-selection rationale.",
      "7. Finance usage and non-usage guidance."
    ],
    "Regression, baselines, train-validation-test design, error analysis, model comparison, business evaluation"),

  a(6, "Which Customers Are Most Likely to Leave?",
    "The retention team can contact only a limited number of customers. Build a churn-risk model that prioritizes intervention candidates using the real cost of false positives and false negatives rather than defaulting to accuracy.",
    [
      "Use a churn or inactivity dataset and define the prediction point, observation window, outcome window, eligible population, and exact target label.",
      "Create a leakage checklist and remove any field that would only become known after the churn decision or target event.",
      "Quantify class imbalance and establish simple benchmarks such as majority class, rule-based risk, or a basic logistic-regression baseline.",
      "Train at least three classification models and compare them using precision, recall, F1, ROC-AUC, PR-AUC, and calibration where appropriate.",
      "Build a cost or capacity framework that reflects how many customers the retention team can contact and the relative cost of missed churners versus unnecessary outreach.",
      "Select a decision threshold based on business capacity or expected value rather than accepting the library default of 0.5.",
      "Examine model performance across at least three customer segments to identify where errors are concentrated or uneven.",
      "Produce a prioritized intervention list and explain how the business should test whether using the model actually reduces churn."
    ],
    [
      "1. Churn-target and prediction-window specification.",
      "2. Leakage checklist and feature-eligibility table.",
      "3. Classification models and benchmark comparison.",
      "4. Precision, recall, F1, ROC-AUC, PR-AUC, and calibration evidence.",
      "5. Business-capacity or cost framework.",
      "6. Threshold-selection analysis.",
      "7. Segment error analysis and prioritized intervention list.",
      "8. Retention-test measurement plan."
    ],
    "Classification, imbalanced data, thresholding, model evaluation, leakage prevention, cost-sensitive decision-making"),

  a(7, "Build Features That Make the Model Smarter",
    "A baseline model has plateaued because the raw columns do not capture how customers actually behave. Engineer defensible features, prove which ones add value, and prevent the feature process from leaking future information.",
    [
      "Start from a previously unseen transactional or event dataset where important behavioural patterns must be derived rather than supplied as ready-made columns.",
      "Create a feature specification listing each candidate feature, its business meaning, source fields, calculation window, availability time, expected direction, and leakage risk.",
      "Engineer behavioural features such as recency, frequency, monetary value, tenure, velocity, ratios, rolling aggregates, trend indicators, interaction terms, or domain-specific measures where justified.",
      "Design categorical handling, missingness indicators, transformations, scaling, or encoding so the same logic can later be reused on unseen data.",
      "Build all learned transformations on training data only and demonstrate how your workflow prevents validation or test information from influencing feature construction.",
      "Run an ablation study comparing raw features, selected feature groups, and the full engineered set against the same baseline model and validation split.",
      "Remove features that add complexity without stable performance gain and document at least one engineered feature that failed your expectations.",
      "Create a reusable feature-building module or pipeline and summarize which business behaviours the strongest features appear to represent."
    ],
    [
      "1. Feature specification and leakage-risk register.",
      "2. Reusable feature-engineering code or pipeline.",
      "3. Evidence that learned transformations use training data only.",
      "4. Ablation-study results.",
      "5. Removed or rejected feature log.",
      "6. Final feature set with business interpretations.",
      "7. Model improvement summary."
    ],
    "Feature engineering, temporal leakage prevention, pipelines, ablation testing, encoding, behavioural modelling"),

  a(8, "The Model Looks Great. Can You Trust It?",
    "You inherit a model boasting exceptional validation performance. Your job is not to improve it first; your job is to audit whether the result is real, reproducible, stable, and safe enough to influence a business decision.",
    [
      "Create or obtain a deliberately suspicious modelling project with unusually strong performance and preserve the original results before making corrections.",
      "Reproduce the reported score from the supplied code or notebook and document anything required to make the run repeatable.",
      "Audit the data split for duplicated entities, temporal contamination, target leakage, preprocessing fitted before splitting, oversampling before splitting, or other forms of information leakage.",
      "Test the model against a stricter validation design such as grouped cross-validation, time-based validation, nested validation, or a genuinely untouched holdout where appropriate.",
      "Compare training and validation behaviour to diagnose overfitting, unstable feature selection, hyperparameter over-tuning, or excessive model complexity.",
      "Challenge the evaluation metric by showing at least one scenario where the headline metric creates a misleading impression of business performance.",
      "Run robustness checks across seeds, subgroups, time periods, or perturbations and quantify how much the reported performance varies.",
      "Write an independent model-audit verdict stating whether the model should be accepted, revised, or rejected and listing the minimum fixes required before deployment."
    ],
    [
      "1. Original-model reproduction evidence.",
      "2. Data-split and leakage audit.",
      "3. Corrected validation design and results.",
      "4. Overfitting and stability analysis.",
      "5. Metric-risk demonstration.",
      "6. Robustness test results.",
      "7. Independent model-audit verdict and required remediation."
    ],
    "Model validation, leakage detection, cross-validation, robustness, metric selection, audit thinking"),

  a(9, "Find the Customer Segments Nobody Defined",
    "Marketing has no reliable customer segments and wants the data to reveal meaningful groups. Build an unsupervised segmentation that is statistically defensible, commercially interpretable, and useful enough to change how customers are treated.",
    [
      "Use customer-level or transaction-level data that supports meaningful behavioural segmentation and define what business action the segmentation is intended to improve.",
      "Construct a customer-level modelling table with carefully chosen behavioural variables and document why each variable belongs in the segmentation.",
      "Prepare features for distance-based analysis by addressing skew, scale, extreme values, redundancy, and highly correlated variables.",
      "Compare at least two clustering approaches or multiple cluster-count choices using metrics such as silhouette score, inertia, stability, or another justified criterion.",
      "Use PCA or another dimensionality-reduction technique as an interpretation aid and explain what information is lost when compressing the feature space.",
      "Profile every final cluster using original business variables and give each segment a descriptive name based on behaviour rather than cluster number.",
      "Stress-test segment stability by changing random seed, sample, feature subset, or time period and identify any customers that frequently switch clusters.",
      "Recommend a distinct marketing, retention, service, or product action for each important segment and define how its value would be measured."
    ],
    [
      "1. Segmentation objective and customer-level modelling table.",
      "2. Feature-preparation and scaling evidence.",
      "3. Clustering comparison and cluster-count rationale.",
      "4. PCA or dimensionality-reduction interpretation.",
      "5. Named cluster profiles.",
      "6. Segment-stability analysis.",
      "7. Segment-specific business action plan."
    ],
    "Clustering, unsupervised learning, scaling, PCA, segment profiling, stability analysis, commercial interpretation"),

  a(10, "Forecast Demand Before Inventory Runs Out",
    "Operations needs a forward demand plan before the next purchasing cycle. Build a time-series forecast that respects chronology, quantifies uncertainty, and reveals where forecast error could create stockouts or excess inventory.",
    [
      "Use a time-indexed sales, demand, traffic, bookings, energy, or inventory dataset with enough history to show trend, seasonality, and changing behaviour.",
      "Audit time coverage for missing periods, irregular frequency, duplicate timestamps, late records, promotions, holidays, and structural breaks.",
      "Define the forecast horizon, aggregation level, business planning cadence, and error cost for over-forecasting versus under-forecasting.",
      "Create naive seasonal and recent-history baselines before training more sophisticated forecasting approaches.",
      "Build at least two forecast models appropriate to the series and evaluate them using rolling or walk-forward validation rather than random train-test splitting.",
      "Compare forecast performance using MAE, RMSE, MAPE or WAPE where appropriate, plus error by horizon and at least one business-relevant segment.",
      "Generate prediction intervals or another uncertainty representation and identify periods where the forecast is least reliable.",
      "Translate the forecast into an inventory or capacity recommendation and explain how the business should react when observed demand falls outside the expected range."
    ],
    [
      "1. Time-series quality audit.",
      "2. Forecast horizon and business-cost specification.",
      "3. Naive baseline forecasts.",
      "4. Reproducible forecast models with walk-forward validation.",
      "5. Error analysis by horizon and segment.",
      "6. Forecast uncertainty or interval analysis.",
      "7. Inventory or capacity recommendation."
    ],
    "Time-series forecasting, temporal validation, seasonality, baselines, uncertainty, operations decision support"),

  a(11, "Turn Thousands of Customer Reviews Into Insight",
    "Customer experience teams have thousands of reviews and support comments they cannot read manually. Build a text-analytics workflow that turns unstructured feedback into themes, sentiment signals, and a prioritized list of product problems.",
    [
      "Use a text dataset containing at least 10,000 reviews, comments, tickets, or feedback records with timestamps and at least one useful metadata field.",
      "Inspect language quality, duplicates, boilerplate, extremely short records, encoding problems, and personally identifying content before modelling text.",
      "Create a text-preparation workflow appropriate to your chosen methods and explain which normalization steps you intentionally did not apply and why.",
      "Build a simple lexical or classical NLP baseline for sentiment, category, or topic identification before using more advanced text representations.",
      "Use TF-IDF, embeddings, topic modelling, clustering, classification, or another justified method to surface recurring themes or predict useful labels.",
      "Validate machine-generated themes or sentiment against a manually reviewed sample and record common error types rather than trusting outputs blindly.",
      "Analyse how major themes or sentiment change across product, time, rating, geography, channel, or another meaningful dimension.",
      "Create a product-team briefing naming the highest-priority customer problems, representative evidence, estimated prevalence, and recommended next investigation."
    ],
    [
      "1. Text-data quality and privacy assessment.",
      "2. Reproducible text-preparation workflow.",
      "3. Baseline NLP method and results.",
      "4. Theme, sentiment, or classification model outputs.",
      "5. Manual validation sample and error analysis.",
      "6. Trend or segment analysis of customer feedback.",
      "7. Product-team insight briefing."
    ],
    "NLP, text preprocessing, TF-IDF or embeddings, topic analysis, validation, unstructured-data interpretation",
    "Remove or mask personal information before submission. Do not upload private customer text or confidential support conversations."),

  a(12, "Build a Recommendation Engine",
    "A digital product wants to personalize what each user sees next. Build a recommendation system, prove that it beats simple popularity, and explain how the system should behave for new users, new items, and sparse histories.",
    [
      "Use a public or synthetic user-item interaction dataset containing purchases, ratings, views, listens, clicks, or another meaningful preference signal.",
      "Define the recommendation objective, interaction signal, candidate universe, evaluation cutoff, and what constitutes a successful recommendation.",
      "Create a popularity or most-recent baseline that a machine learning approach must outperform.",
      "Build at least two recommendation strategies such as content-based filtering, collaborative filtering, matrix factorization, nearest-neighbour retrieval, or a hybrid method.",
      "Use a user-aware or time-aware holdout strategy so the evaluation resembles recommending items the user has not yet interacted with.",
      "Compare recommenders using metrics such as Precision@K, Recall@K, MAP@K, NDCG, coverage, diversity, novelty, or another justified combination.",
      "Design explicit cold-start behaviour for a brand-new user and a brand-new item, and demonstrate each scenario with examples.",
      "Produce sample recommendation cards for at least five users and explain where business rules, safety constraints, or popularity bias might need to override the model."
    ],
    [
      "1. Recommendation objective and interaction definition.",
      "2. Popularity or recency baseline.",
      "3. Two or more recommendation approaches.",
      "4. User-aware or time-aware evaluation setup.",
      "5. Ranking-metric comparison.",
      "6. Cold-start strategy and examples.",
      "7. Five user-level recommendation examples with bias or rule discussion."
    ],
    "Recommendation systems, collaborative filtering, content-based methods, ranking metrics, cold start, personalization"),

  a(13, "Why Did the Model Make That Prediction?",
    "A stakeholder accepts the model's overall performance but refuses to act on individual predictions without an explanation. Build an explainability review that distinguishes global behaviour, local reasoning, unstable explanations, and potentially unfair patterns.",
    [
      "Select a trained classification or regression model from an earlier week or build a comparable model where individual predictions have meaningful consequences.",
      "Create a global model-behaviour view using permutation importance, coefficients, gain-based importance, partial dependence, or another appropriate technique.",
      "Use SHAP or a comparable local-explanation method to explain at least ten individual predictions, including correct, incorrect, high-confidence, and borderline cases.",
      "Compare explanations for similar records that received different predictions and investigate whether small input changes cause unexpectedly large decision changes.",
      "Check model performance and prediction distributions across relevant non-sensitive operational groups and, where ethically and legally appropriate, approved fairness-analysis groups.",
      "Identify features that may act as proxies, encode historical bias, or create explanations that are technically valid but operationally unacceptable.",
      "Rewrite three technical model explanations into language a customer-support, risk, product, or operations stakeholder could actually use.",
      "Issue an explainability and governance recommendation covering what should be shown to users, what should remain internal, and what requires further review."
    ],
    [
      "1. Global model-behaviour report.",
      "2. Local SHAP or equivalent explanation set.",
      "3. Explanation-stability investigation.",
      "4. Segment-performance and prediction-distribution review.",
      "5. Proxy or bias-risk register.",
      "6. Three stakeholder-friendly explanation examples.",
      "7. Explainability and governance recommendation."
    ],
    "Model explainability, SHAP, feature importance, local explanations, fairness awareness, model governance",
    "Use only public, synthetic, or authorized data. Any fairness analysis must avoid unsupported conclusions about protected groups and should be framed as a model-risk investigation."),

  a(14, "Turn Your Notebook Into a Reproducible ML Pipeline",
    "Your proof-of-concept works, but nobody can reliably retrain it outside your notebook. Refactor the project into a repeatable machine learning pipeline with configuration, modular code, tests, artifacts, and one-command execution.",
    [
      "Choose one completed modelling project from Weeks 5-13 and freeze a reference result that the refactored pipeline must reproduce within an explained tolerance.",
      "Separate data loading, validation, preprocessing, feature generation, training, evaluation, inference, and artifact saving into clear modules rather than notebook cells.",
      "Move environment-specific values, file paths, model parameters, and run settings into configuration or command-line inputs instead of hard-coding them throughout the codebase.",
      "Build a single training entry point that takes raw or staged data through preprocessing, model fitting, evaluation, and artifact creation without manual intervention.",
      "Add automated tests for at least five critical behaviours such as schema validation, feature output shape, deterministic transformations, metric calculation, or prediction format.",
      "Record model metadata including training timestamp, dataset or data-version identifier, parameters, evaluation results, feature list, and code version or Git commit.",
      "Run the pipeline from a clean environment or fresh clone and prove that another person can reproduce the documented output.",
      "Create an engineering handoff describing architecture, commands, dependencies, failure points, and how to add a new model or feature safely."
    ],
    [
      "1. Before-refactor reference result.",
      "2. Modular ML project repository.",
      "3. Configuration and single training entry point.",
      "4. Automated test suite with results.",
      "5. Model metadata or run manifest.",
      "6. Clean-environment reproducibility evidence.",
      "7. ML engineering handoff guide."
    ],
    "ML pipelines, modular Python, configuration, testing, reproducibility, model metadata, software engineering"),

  a(15, "Put the Model Behind an API",
    "An application team wants to consume your model without opening a notebook. Package inference behind a documented API, validate inputs, containerize the service, and prove the system behaves correctly for normal and failure cases.",
    [
      "Select a trained model suitable for online or request-based inference and define the exact request schema, response schema, latency expectation, and known model limitations.",
      "Serialize or package the model together with every preprocessing artifact required to transform raw request data consistently with training.",
      "Build a FastAPI or comparable service exposing a health endpoint and a prediction endpoint with typed input validation.",
      "Return useful prediction metadata such as class probability, prediction score, model version, or warning flags where appropriate without exposing sensitive internals.",
      "Implement clear error handling for malformed payloads, missing fields, invalid ranges, unsupported categories, and unavailable model artifacts.",
      "Write automated API tests covering successful predictions plus at least five failure or edge cases.",
      "Containerize the inference service with Docker and prove that a clean container can start the API and serve a sample prediction.",
      "Create an integration guide containing example requests, example responses, endpoint documentation, limitations, and what the application team should log in production."
    ],
    [
      "1. Inference API contract.",
      "2. Packaged model and preprocessing artifacts.",
      "3. FastAPI or equivalent prediction service.",
      "4. Input-validation and failure-handling evidence.",
      "5. Automated API test results.",
      "6. Dockerfile and container run evidence.",
      "7. Application-team integration guide."
    ],
    "Model serving, FastAPI, inference pipelines, validation, testing, Docker, API documentation",
    "Never include production credentials, tokens, private endpoints, or confidential model artifacts in the submission."),

  a(16, "Your Production Model Is Getting Worse",
    "A model that performed well at launch is now producing weaker business results. Diagnose whether the problem comes from data quality, feature drift, prediction drift, concept drift, or broken serving assumptions, then recommend an operational response.",
    [
      "Create or use separate reference and current-period datasets representing the model's training-era population and a later production population.",
      "Verify that the current scoring data still satisfies the expected schema, units, category sets, missingness rules, and feature-generation assumptions.",
      "Measure feature-distribution change using appropriate statistics or drift measures such as PSI, KS statistic, divergence, or standardized distribution comparisons.",
      "Compare prediction distributions, confidence, class mix, and business decision rates between reference and current periods.",
      "Where delayed labels are available, calculate current model performance and separate pure data drift from actual deterioration in predictive relationship.",
      "Trace at least three material changes back to a plausible source such as customer mix, product policy, acquisition channel, seasonality, instrumentation, or upstream pipeline change.",
      "Define monitoring thresholds and an escalation policy for schema failures, drift, performance decay, unusual prediction rates, and stale model versions.",
      "Recommend whether to do nothing, investigate further, recalibrate, retrain, roll back, or redesign the model and justify the operational trade-off."
    ],
    [
      "1. Reference-versus-current data package.",
      "2. Production schema and feature-integrity audit.",
      "3. Feature-drift report.",
      "4. Prediction-drift and business-decision analysis.",
      "5. Current performance assessment where labels exist.",
      "6. Root-cause investigation.",
      "7. Monitoring thresholds and escalation policy.",
      "8. Operational model-response recommendation."
    ],
    "Model monitoring, data drift, prediction drift, concept drift, production diagnostics, retraining decisions"),

  a(17, "Design a Data Science Experiment From Scratch",
    "A product leader believes a new experience will improve engagement, but no experiment has been designed yet. Turn a vague product idea into a rigorous measurement plan before any data is collected.",
    [
      "Choose a realistic product, pricing, onboarding, recommendation, notification, checkout, or retention change and write the business hypothesis in falsifiable form.",
      "Define the experimental unit, treatment, control, eligibility criteria, exposure event, randomization method, and contamination risks.",
      "Select one primary outcome metric plus guardrail and diagnostic metrics, and document why each metric is appropriate for the decision.",
      "Specify the minimum detectable effect or minimum practical effect and estimate a sample size using explicit assumptions about baseline rate, variance, power, and significance level.",
      "Choose the experiment duration by considering expected traffic, weekday effects, seasonality, novelty effects, delayed outcomes, and business constraints.",
      "Create a pre-analysis plan describing exclusions, stopping rule, statistical test, multiple-comparison policy, segment analysis, and how missing or late data will be handled.",
      "List at least five ways the experiment could produce a misleading result and design a monitoring or validation check for each risk.",
      "Present the experiment proposal to a mock product review and revise the design after receiving at least three challenges from reviewers."
    ],
    [
      "1. Falsifiable business hypothesis.",
      "2. Full experiment-design specification.",
      "3. Primary, guardrail, and diagnostic metric definitions.",
      "4. Sample-size and duration calculation.",
      "5. Pre-analysis plan.",
      "6. Experiment-risk and monitoring register.",
      "7. Reviewer questions and revised experiment proposal."
    ],
    "Experimental design, power analysis, metric design, randomization, pre-analysis planning, product science"),

  a(18, "The CEO Gives You a Dataset and One Question",
    "The CEO gives you a broad dataset and asks only: 'Why is our growth slowing?' No algorithm, target variable, dashboard, or modelling technique is prescribed. Decide what kind of data science problem this actually is and produce the simplest defensible answer.",
    [
      "Select a broad public or synthetic business dataset covering time plus several dimensions such as customers, products, channels, geography, pricing, engagement, or operations.",
      "Write your own problem framing that defines what growth means, which decision the CEO needs to make, what is in scope, and what evidence would count as a satisfactory answer.",
      "Create a question tree that decomposes the growth problem into measurable hypotheses before choosing any machine learning method.",
      "Audit whether the available data is sufficient to answer the highest-priority branches of the question tree and identify additional data you would request if employed by the company.",
      "Choose your own mix of descriptive analysis, statistical testing, forecasting, segmentation, predictive modelling, or no machine learning at all, and justify why the chosen methods fit the decision.",
      "Test at least two competing explanations for the slowdown and actively search for evidence that could disprove your preferred explanation.",
      "Quantify the likely business impact of the main drivers and attach confidence, uncertainty, or sensitivity information where the data supports it.",
      "Deliver no more than three recommendations to the CEO and explain one reason each recommendation could fail."
    ],
    [
      "1. Self-authored problem framing and CEO decision statement.",
      "2. Growth question tree.",
      "3. Data-sufficiency audit and additional-data request.",
      "4. Reproducible analysis using methods of your choice.",
      "5. Competing-hypothesis analysis.",
      "6. Quantified driver and uncertainty assessment.",
      "7. Maximum three CEO recommendations with failure risks.",
      "8. Short reflection explaining why you did or did not use machine learning."
    ],
    "Ambiguous problem framing, method selection, scientific skepticism, independent analysis, executive judgment",
    "This assignment intentionally provides minimal structure. A simpler method that correctly answers the business question should score higher than unnecessary machine learning."),

  a(19, "The Data Scientist 72-Hour Take-Home Challenge",
    "Simulate a real hiring take-home assignment. Work with a fresh dataset under a strict time-box, decide what deserves attention, build only the modelling necessary to solve the problem, and submit a concise package that a hiring panel can evaluate quickly.",
    [
      "Begin with a dataset and business problem you have not used in any earlier fellowship assignment and capture evidence of when the challenge started.",
      "Limit yourself to a self-declared maximum of 14 focused working hours inside a 72-hour window and maintain a simple time log showing where the effort went.",
      "Write a one-page approach memo before deep modelling that defines the business objective, target or analytical outcome, likely risks, evaluation strategy, and intended deliverables.",
      "Perform focused data inspection and preprocessing, documenting only the data issues that materially affect the decision or modelling result.",
      "Establish a simple baseline before trying more sophisticated methods and stop model experimentation when additional complexity no longer justifies the gain.",
      "Evaluate the final approach with a validation design and metric set appropriate to the business problem, including at least one analysis of model errors or failure cases.",
      "Package the solution as a hiring submission with clean code, environment instructions, README, assumptions, limitations, model or analysis artifacts, and executive conclusions.",
      "Record a seven-minute walkthrough explaining your framing, most important technical choice, one model or approach you rejected, one time-box trade-off, and what you would do with another week."
    ],
    [
      "1. Challenge start evidence and time log.",
      "2. One-page approach memo.",
      "3. Clean and reproducible repository or submission package.",
      "4. Baseline and final modelling or analytical approach.",
      "5. Validation, metric, and failure-case analysis.",
      "6. Executive conclusions and business recommendation.",
      "7. README, assumptions, environment, and limitations.",
      "8. Seven-minute interview-style walkthrough video link."
    ],
    "Take-home modelling, prioritization, baseline discipline, model evaluation, reproducibility, interview communication",
    "Do not reuse a prior fellowship dataset or finished notebook. Using machine learning is optional if a simpler analysis solves the problem more appropriately."),

  a(20, "Data Science Boardroom Capstone: Build, Defend & Handoff",
    "Operate as the lead data scientist on an end-to-end business problem. Frame the decision, create a trustworthy data foundation, build and evaluate the right analytical or machine learning solution, explain its behaviour, address production risks, defend your choices to a leadership panel, and hand off work another team could continue.",
    [
      "Choose a substantial public, synthetic, or explicitly authorized multi-table or multi-file dataset and write a capstone charter covering stakeholder, business decision, success criteria, scope, milestones, risks, and ethical considerations.",
      "Create a complete source inventory, entity and time-grain map, data dictionary, quality assessment, preprocessing design, and exception strategy before modelling begins.",
      "Establish a business or statistical baseline and define a validation strategy that matches how the solution would actually be used after deployment.",
      "Develop at least two serious candidate approaches and choose the final solution using predictive performance, business value, robustness, interpretability, operating cost, and implementation complexity rather than a single metric.",
      "Perform a deep error analysis that identifies where the final solution fails, which populations or scenarios are most affected, and which failures matter most to the business.",
      "Create an explainability package covering global model behaviour, representative local predictions, important assumptions, and any fairness, proxy, privacy, or governance concerns relevant to the use case.",
      "Design the production path by specifying inference mode, model artifacts, data dependencies, monitoring signals, drift checks, retraining triggers, rollback conditions, and ownership after launch.",
      "Quantify expected business value with transparent assumptions and compare the proposed data science solution against a simpler rule-based, manual, or no-model alternative.",
      "Build an executive presentation that communicates the decision, evidence, expected value, risks, and recommendation without turning the board meeting into a model-training lecture.",
      "Complete a ten-minute boardroom defence, capture at least six challenges to your data, methods, assumptions, metrics, model behaviour, or deployment plan, and issue a written response-and-correction log.",
      "Create a technical handoff package containing environment setup, data contracts, pipeline instructions, model or analysis artifacts, validation approach, tests, monitoring plan, troubleshooting, and known limitations.",
      "Publish a sanitized portfolio version, record a two-minute interview explanation, and compare your Week 1 baseline with Week 20 using concrete evidence from fellowship submissions."
    ],
    [
      "1. Capstone charter, milestone plan, and ethical-risk note.",
      "2. Source inventory, grain map, data dictionary, quality report, and preprocessing design.",
      "3. Baseline, candidate approaches, and justified final solution.",
      "4. Reproducible modelling or analytical pipeline with validation evidence.",
      "5. Error-analysis and robustness report.",
      "6. Explainability, fairness-awareness, and governance package.",
      "7. Production architecture, monitoring, drift, retraining, and rollback plan.",
      "8. Business-value analysis versus simpler alternative.",
      "9. Final executive presentation and ten-minute defence video.",
      "10. Board questions, responses, and correction log.",
      "11. Complete technical handoff repository.",
      "12. Sanitized portfolio link, two-minute interview introduction, and Week 1 versus Week 20 evidence-based reflection."
    ],
    "End-to-end Data Science, problem ownership, data quality, modelling, validation, explainability, MLOps thinking, business value, stakeholder defence, handoff, portfolio development",
    "Completion requires mentor approval, a score of at least 75%, all required corrections, and adherence to privacy, security, and responsible-data-science policies. Use only public, synthetic, or explicitly authorized data; remove personal data, secrets, tokens, credentials, and confidential artifacts before submission."),
];

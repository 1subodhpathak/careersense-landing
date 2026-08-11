import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Lightbulb,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";


export const chapters = [
  {
    "id": "foundations",
    "title": "1. Machine Learning Foundations",
    "topics": [
      {
        "id": "what-is-ml",
        "title": "What is Machine Learning?",
        "readTime": "10 min"
      },
      {
        "id": "ml-workflow",
        "title": "The End-to-End ML Workflow",
        "readTime": "10 min"
      },
      {
        "id": "types-of-learning",
        "title": "Types of Machine Learning",
        "readTime": "10 min"
      },
      {
        "id": "bias-variance",
        "title": "Bias, Variance and Generalisation",
        "readTime": "10 min"
      },
      {
        "id": "math-foundations",
        "title": "Math Foundations Cheat Sheet",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "data",
    "title": "2. Data Preparation and Exploration",
    "topics": [
      {
        "id": "data-understanding",
        "title": "Understand Your Dataset",
        "readTime": "10 min"
      },
      {
        "id": "train-validation-test",
        "title": "Train, Validation and Test Splits",
        "readTime": "10 min"
      },
      {
        "id": "missing-values",
        "title": "Missing Values",
        "readTime": "10 min"
      },
      {
        "id": "categorical-encoding",
        "title": "Categorical Encoding",
        "readTime": "10 min"
      },
      {
        "id": "scaling-transformations",
        "title": "Scaling and Transformations",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "supervised",
    "title": "3. Supervised Learning Algorithms",
    "topics": [
      {
        "id": "linear-regression",
        "title": "Linear Regression",
        "readTime": "10 min"
      },
      {
        "id": "logistic-regression",
        "title": "Logistic Regression",
        "readTime": "10 min"
      },
      {
        "id": "decision-trees",
        "title": "Decision Trees",
        "readTime": "10 min"
      },
      {
        "id": "random-forests",
        "title": "Random Forests",
        "readTime": "10 min"
      },
      {
        "id": "gradient-boosting",
        "title": "Gradient Boosting, XGBoost and LightGBM",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "other-models",
    "title": "4. More Core Algorithms",
    "topics": [
      {
        "id": "knn",
        "title": "K-Nearest Neighbours",
        "readTime": "10 min"
      },
      {
        "id": "svm",
        "title": "Support Vector Machines",
        "readTime": "10 min"
      },
      {
        "id": "naive-bayes",
        "title": "Naive Bayes",
        "readTime": "10 min"
      },
      {
        "id": "neural-networks",
        "title": "Neural Network Basics",
        "readTime": "10 min"
      },
      {
        "id": "ensembles",
        "title": "Ensemble Methods",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "unsupervised",
    "title": "5. Unsupervised Learning",
    "topics": [
      {
        "id": "clustering",
        "title": "Clustering Fundamentals",
        "readTime": "10 min"
      },
      {
        "id": "kmeans",
        "title": "K-Means",
        "readTime": "10 min"
      },
      {
        "id": "hierarchical-dbscan",
        "title": "Hierarchical Clustering and DBSCAN",
        "readTime": "10 min"
      },
      {
        "id": "pca",
        "title": "Principal Component Analysis",
        "readTime": "10 min"
      },
      {
        "id": "anomaly-detection",
        "title": "Anomaly Detection",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "evaluation",
    "title": "6. Evaluation and Model Selection",
    "topics": [
      {
        "id": "regression-metrics",
        "title": "Regression Metrics",
        "readTime": "10 min"
      },
      {
        "id": "classification-metrics",
        "title": "Classification Metrics",
        "readTime": "10 min"
      },
      {
        "id": "cross-validation",
        "title": "Cross-Validation",
        "readTime": "10 min"
      },
      {
        "id": "hyperparameter-tuning",
        "title": "Hyperparameter Tuning",
        "readTime": "10 min"
      },
      {
        "id": "threshold-calibration",
        "title": "Thresholds and Probability Calibration",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "features",
    "title": "7. Feature Engineering and Explainability",
    "topics": [
      {
        "id": "feature-engineering",
        "title": "Feature Engineering",
        "readTime": "10 min"
      },
      {
        "id": "time-features",
        "title": "Time-Series and Date Features",
        "readTime": "10 min"
      },
      {
        "id": "text-features",
        "title": "Text Features",
        "readTime": "10 min"
      },
      {
        "id": "feature-selection",
        "title": "Feature Selection",
        "readTime": "10 min"
      },
      {
        "id": "explainability",
        "title": "Model Explainability",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "production",
    "title": "8. Pipelines, Deployment and MLOps",
    "topics": [
      {
        "id": "sklearn-pipelines",
        "title": "Scikit-Learn Pipelines",
        "readTime": "10 min"
      },
      {
        "id": "experiment-tracking",
        "title": "Experiment Tracking",
        "readTime": "10 min"
      },
      {
        "id": "model-serving",
        "title": "Model Serving",
        "readTime": "10 min"
      },
      {
        "id": "monitoring-drift",
        "title": "Monitoring and Data Drift",
        "readTime": "10 min"
      },
      {
        "id": "retraining-governance",
        "title": "Retraining and Model Governance",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "responsible",
    "title": "9. Responsible ML and Real-World Practice",
    "topics": [
      {
        "id": "fairness",
        "title": "Fairness and Bias",
        "readTime": "10 min"
      },
      {
        "id": "privacy-security",
        "title": "Privacy and Security",
        "readTime": "10 min"
      },
      {
        "id": "causal-vs-predictive",
        "title": "Prediction vs Causation",
        "readTime": "10 min"
      },
      {
        "id": "error-analysis",
        "title": "Error Analysis",
        "readTime": "10 min"
      },
      {
        "id": "ml-project-structure",
        "title": "Production ML Project Structure",
        "readTime": "10 min"
      }
    ]
  },
  {
    "id": "cheats",
    "title": "10. Machine Learning Cheat Sheets",
    "topics": [
      {
        "id": "algorithm-selection",
        "title": "Algorithm Selection Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "preprocessing-cheat",
        "title": "Preprocessing Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "metrics-cheat",
        "title": "Metrics Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "interview-cheat",
        "title": "ML Interview Cheat Sheet",
        "readTime": "10 min"
      },
      {
        "id": "python-ml-cheat",
        "title": "Python and Scikit-Learn Cheat Sheet",
        "readTime": "10 min"
      }
    ]
  }
];
export const topicContent = {
  "what-is-ml": {
    "eyebrow": "1. Machine Learning Foundations",
    "title": "What is Machine Learning?",
    "summary": "Understand how machine learning uses data to learn patterns and make predictions without hard-coding every rule.",
    "concepts": [
      "Machine learning learns statistical patterns from examples.",
      "The model maps inputs to outputs using parameters learned during training.",
      "Good performance depends on data quality, problem framing and evaluation."
    ],
    "workflow": [
      "Define the business problem and target outcome.",
      "Identify available data and prediction timing.",
      "Choose a simple baseline before trying complex models."
    ],
    "mistakes": [
      "Starting with an algorithm before defining the problem.",
      "Using target information that would not exist at prediction time.",
      "Confusing correlation with causation."
    ],
    "cheat": [
      "Supervised learning: labelled examples with a target.",
      "Unsupervised learning: discover structure without labels.",
      "Reinforcement learning: learn actions from rewards."
    ],
    "prompts": [
      {
        "title": "Beginner explanation",
        "prompt": "Explain machine learning to a complete beginner using one everyday analogy, three real-world examples, the difference between training and prediction, and three limitations."
      },
      {
        "title": "Problem framing",
        "prompt": "Help me frame this business problem as a machine learning problem. Identify the target, unit of prediction, features, prediction horizon, success metric, constraints and a non-ML baseline. Problem: [DESCRIBE]."
      }
    ]
  },
  "ml-workflow": {
    "eyebrow": "1. Machine Learning Foundations",
    "title": "The End-to-End ML Workflow",
    "summary": "Learn the complete process from problem definition to monitoring in production.",
    "concepts": [
      "A reliable workflow includes framing, data, modelling, evaluation, deployment and monitoring.",
      "Each stage should have explicit assumptions and validation checks.",
      "Most real-world failures happen outside model training."
    ],
    "workflow": [
      "Frame the problem and define metrics.",
      "Prepare data and build a baseline.",
      "Train, validate, deploy and monitor.",
      "Document experiments and decisions."
    ],
    "mistakes": [
      "Tuning before building a baseline.",
      "Testing repeatedly on the final test set.",
      "Deploying without monitoring data drift."
    ],
    "cheat": [
      "Frame → Collect → Clean → Split → Train → Validate → Test → Deploy → Monitor."
    ],
    "prompts": [
      {
        "title": "Workflow plan",
        "prompt": "Create an end-to-end machine learning workflow for [USE CASE]. Include problem framing, data requirements, validation strategy, baseline, candidate models, metrics, deployment architecture, monitoring and retraining triggers."
      },
      {
        "title": "Project checklist",
        "prompt": "Create a production ML project checklist for [PROJECT]. Organise it into data, modelling, validation, deployment, governance and monitoring."
      }
    ]
  },
  "types-of-learning": {
    "eyebrow": "1. Machine Learning Foundations",
    "title": "Types of Machine Learning",
    "summary": "Compare supervised, unsupervised, semi-supervised, self-supervised and reinforcement learning.",
    "concepts": [
      "Supervised learning predicts known targets.",
      "Unsupervised learning discovers hidden structure.",
      "Semi-supervised learning combines small labelled and large unlabelled datasets.",
      "Self-supervised learning creates learning signals from the data itself."
    ],
    "workflow": [
      "Ask whether labels exist.",
      "Check whether the goal is prediction, grouping, representation or control.",
      "Choose the simplest learning setup that matches the objective."
    ],
    "mistakes": [
      "Calling clustering a prediction model.",
      "Using reinforcement learning where rules would work.",
      "Ignoring the cost of labels."
    ],
    "cheat": [
      "Classification, regression, clustering, dimensionality reduction, anomaly detection, recommendation, control."
    ],
    "prompts": [
      {
        "title": "Choose learning type",
        "prompt": "Classify the following use case as supervised, unsupervised, semi-supervised, self-supervised or reinforcement learning. Explain the choice, required data and risks. Use case: [PASTE]."
      },
      {
        "title": "Compare approaches",
        "prompt": "Compare three ML formulations for [PROBLEM]. For each, define labels, inputs, output, advantages, limitations and evaluation method."
      }
    ]
  },
  "bias-variance": {
    "eyebrow": "1. Machine Learning Foundations",
    "title": "Bias, Variance and Generalisation",
    "summary": "Understand underfitting, overfitting and the trade-off between model simplicity and flexibility.",
    "concepts": [
      "High bias causes underfitting.",
      "High variance causes overfitting.",
      "Generalisation measures performance on unseen data."
    ],
    "workflow": [
      "Compare training and validation performance.",
      "Use regularisation or more data when variance is high.",
      "Increase model capacity or improve features when bias is high."
    ],
    "mistakes": [
      "Judging only by training accuracy.",
      "Adding complexity without evidence.",
      "Ignoring data leakage."
    ],
    "cheat": [
      "Underfit: train poor, validation poor. Overfit: train strong, validation weak. Good fit: both strong and close."
    ],
    "prompts": [
      {
        "title": "Diagnose model fit",
        "prompt": "Given these training and validation metrics across epochs, diagnose underfitting, overfitting or healthy learning. Recommend next steps. Metrics: [PASTE]."
      },
      {
        "title": "Bias-variance explanation",
        "prompt": "Explain the bias-variance trade-off using polynomial regression and one visual analogy. Include practical remedies for each failure mode."
      }
    ]
  },
  "math-foundations": {
    "eyebrow": "1. Machine Learning Foundations",
    "title": "Math Foundations Cheat Sheet",
    "summary": "Review the essential linear algebra, probability, statistics and calculus used in machine learning.",
    "concepts": [
      "Vectors and matrices represent data and parameters.",
      "Probability models uncertainty.",
      "Derivatives guide optimisation.",
      "Statistics supports estimation and inference."
    ],
    "workflow": [
      "Learn concepts through model examples.",
      "Practise matrix shapes and broadcasting.",
      "Connect gradients to loss reduction."
    ],
    "mistakes": [
      "Memorising formulas without understanding shapes.",
      "Ignoring units and scaling.",
      "Using statistical tests without checking assumptions."
    ],
    "cheat": [
      "Mean: Σx/n",
      "Variance: Σ(x−μ)²/n",
      "Standard deviation: √variance",
      "Dot product: xᵀw",
      "Gradient descent: θ ← θ − α∇J(θ)"
    ],
    "prompts": [
      {
        "title": "Math tutor",
        "prompt": "Teach me the minimum linear algebra and calculus needed for machine learning. Use small numeric examples and connect every concept to a real ML algorithm."
      },
      {
        "title": "Formula practice",
        "prompt": "Create 15 machine learning math exercises on vectors, matrices, probability, derivatives and gradients. Provide answers separately after the questions."
      }
    ]
  },
  "data-understanding": {
    "eyebrow": "2. Data Preparation and Exploration",
    "title": "Understand Your Dataset",
    "summary": "Profile data before modelling to understand structure, quality and potential risks.",
    "concepts": [
      "Identify rows, columns, units and target definition.",
      "Check missing values, duplicates and impossible values.",
      "Understand how the data was collected."
    ],
    "workflow": [
      "Create a data dictionary.",
      "Inspect distributions and cardinality.",
      "Review the target rate and segment differences."
    ],
    "mistakes": [
      "Assuming column names are self-explanatory.",
      "Ignoring collection bias.",
      "Treating missing values as random without investigation."
    ],
    "cheat": [
      "df.shape",
      "df.info()",
      "df.describe(include='all')",
      "df.isna().mean().sort_values(ascending=False)"
    ],
    "prompts": [
      {
        "title": "EDA plan",
        "prompt": "Create a detailed exploratory data analysis plan for a dataset with columns: [LIST]. Target: [TARGET]. Include quality checks, distributions, relationships, leakage checks and visualisations."
      },
      {
        "title": "Data dictionary",
        "prompt": "Create a data dictionary template for this dataset. Include field name, type, business meaning, unit, valid range, missing-value meaning and leakage risk. Columns: [LIST]."
      }
    ]
  },
  "train-validation-test": {
    "eyebrow": "2. Data Preparation and Exploration",
    "title": "Train, Validation and Test Splits",
    "summary": "Split data correctly so model evaluation reflects real-world performance.",
    "concepts": [
      "Training data fits model parameters.",
      "Validation data supports model selection.",
      "Test data estimates final generalisation."
    ],
    "workflow": [
      "Split before fitting preprocessing.",
      "Use time-based splits for temporal problems.",
      "Use grouped splits when multiple rows belong to the same entity."
    ],
    "mistakes": [
      "Random split for future prediction problems.",
      "Repeatedly tuning against the test set.",
      "Putting the same customer in train and validation."
    ],
    "cheat": [
      "Typical random split: 70/15/15 or 80/20 with cross-validation.",
      "Time split: past → train, later → validation, latest → test."
    ],
    "prompts": [
      {
        "title": "Split strategy",
        "prompt": "Recommend a train/validation/test strategy for [USE CASE]. Consider time, groups, class imbalance, leakage and deployment conditions. Data description: [PASTE]."
      },
      {
        "title": "Leakage audit",
        "prompt": "Audit this proposed data split for leakage and unrealistic evaluation. Explain every risk and propose a safer split. Plan: [PASTE]."
      }
    ]
  },
  "missing-values": {
    "eyebrow": "2. Data Preparation and Exploration",
    "title": "Missing Values",
    "summary": "Handle missing data based on why values are absent and how models behave.",
    "concepts": [
      "Missingness can be informative.",
      "Simple imputation is often a strong baseline.",
      "Imputation must be fit only on training data."
    ],
    "workflow": [
      "Measure missingness by feature and segment.",
      "Compare median, mode, constant and model-based imputation.",
      "Add missing indicators when absence carries meaning."
    ],
    "mistakes": [
      "Dropping rows without measuring impact.",
      "Using full-dataset statistics for imputation.",
      "Replacing all missing values with zero."
    ],
    "cheat": [
      "Numeric baseline: median imputation.",
      "Categorical baseline: most frequent or 'Missing'.",
      "Pipeline: SimpleImputer(strategy='median')."
    ],
    "prompts": [
      {
        "title": "Missing-data strategy",
        "prompt": "Design a missing-value strategy for these columns: [LIST WITH RATES]. Explain likely missingness mechanism, imputation method, indicators and validation checks."
      },
      {
        "title": "Code request",
        "prompt": "Write a scikit-learn preprocessing pipeline that applies median imputation to numeric columns and most-frequent imputation to categorical columns without leakage."
      }
    ]
  },
  "categorical-encoding": {
    "eyebrow": "2. Data Preparation and Exploration",
    "title": "Categorical Encoding",
    "summary": "Convert categorical variables into model-ready representations.",
    "concepts": [
      "One-hot encoding works well for low-cardinality nominal variables.",
      "Ordinal encoding is appropriate only when order is meaningful.",
      "Target encoding requires strong leakage controls."
    ],
    "workflow": [
      "Measure cardinality.",
      "Handle unseen categories.",
      "Keep encoding inside a pipeline."
    ],
    "mistakes": [
      "Assigning arbitrary integer order to nominal categories.",
      "One-hot encoding extremely high-cardinality IDs.",
      "Target encoding before data splitting."
    ],
    "cheat": [
      "OneHotEncoder(handle_unknown='ignore')",
      "OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)",
      "High cardinality: hashing, frequency or carefully validated target encoding."
    ],
    "prompts": [
      {
        "title": "Encoding recommendation",
        "prompt": "Recommend categorical encoding methods for each feature below. Consider cardinality, order, unseen values, model type and leakage. Features: [PASTE]."
      },
      {
        "title": "Pipeline code",
        "prompt": "Create a ColumnTransformer for numeric and categorical columns using scaling, imputation and one-hot encoding. Include get_feature_names_out usage."
      }
    ]
  },
  "scaling-transformations": {
    "eyebrow": "2. Data Preparation and Exploration",
    "title": "Scaling and Transformations",
    "summary": "Scale or transform features when model assumptions or optimisation require it.",
    "concepts": [
      "Standardisation centres and scales by standard deviation.",
      "Min-max scaling maps values to a range.",
      "Log transforms reduce positive skew."
    ],
    "workflow": [
      "Use scaling for distance-based and gradient-based models.",
      "Fit scalers only on training data.",
      "Inspect skew and outliers before transforming."
    ],
    "mistakes": [
      "Scaling tree-based models unnecessarily.",
      "Applying log to zero or negative values without adjustment.",
      "Scaling before the train-test split."
    ],
    "cheat": [
      "StandardScaler: (x−μ)/σ",
      "MinMaxScaler: (x−min)/(max−min)",
      "Log1p: log(1+x)"
    ],
    "prompts": [
      {
        "title": "Transformation plan",
        "prompt": "Recommend scaling or transformations for these features and model candidates: [PASTE]. Explain which features should remain unchanged."
      },
      {
        "title": "Code request",
        "prompt": "Write a scikit-learn pipeline with log1p transformation for skewed positive features, robust scaling for outlier-heavy numeric features and one-hot encoding for categoricals."
      }
    ]
  },
  "linear-regression": {
    "eyebrow": "3. Supervised Learning Algorithms",
    "title": "Linear Regression",
    "summary": "Model a continuous target as a weighted linear combination of features.",
    "concepts": [
      "Linear regression estimates coefficients that minimise squared error.",
      "Coefficients describe association when assumptions are reasonable.",
      "Regularisation can improve stability."
    ],
    "workflow": [
      "Start with a baseline and residual analysis.",
      "Check multicollinearity and non-linearity.",
      "Compare ordinary, ridge and lasso regression."
    ],
    "mistakes": [
      "Interpreting coefficients causally.",
      "Ignoring outliers and heteroscedasticity.",
      "Using R² as the only metric."
    ],
    "cheat": [
      "ŷ = β₀ + β₁x₁ + … + βₚxₚ",
      "MSE = mean((y−ŷ)²)",
      "Ridge: MSE + λΣβ²",
      "Lasso: MSE + λΣ|β|"
    ],
    "prompts": [
      {
        "title": "Model explanation",
        "prompt": "Explain linear regression using a small house-price example. Cover coefficients, intercept, residuals, MSE, R², ridge and lasso."
      },
      {
        "title": "Code request",
        "prompt": "Write a complete scikit-learn regression pipeline with preprocessing, LinearRegression, Ridge and Lasso comparison using cross-validation and MAE/RMSE/R²."
      }
    ]
  },
  "logistic-regression": {
    "eyebrow": "3. Supervised Learning Algorithms",
    "title": "Logistic Regression",
    "summary": "Predict class probabilities using a linear decision boundary and logistic function.",
    "concepts": [
      "Logistic regression outputs probabilities between 0 and 1.",
      "The decision threshold does not need to be 0.5.",
      "Regularisation controls complexity."
    ],
    "workflow": [
      "Scale numeric features when appropriate.",
      "Evaluate probability quality and threshold trade-offs.",
      "Inspect coefficients and class imbalance."
    ],
    "mistakes": [
      "Calling it a regression model because of its name.",
      "Using accuracy on highly imbalanced data.",
      "Ignoring probability calibration."
    ],
    "cheat": [
      "p(y=1|x)=1/(1+e^(−z))",
      "z=wᵀx+b",
      "Log-odds = log(p/(1−p))"
    ],
    "prompts": [
      {
        "title": "Classification tutorial",
        "prompt": "Explain logistic regression using customer churn. Include sigmoid, log-odds, coefficients, threshold selection and regularisation."
      },
      {
        "title": "Code request",
        "prompt": "Build a logistic regression classification pipeline with class weights, cross-validation, ROC-AUC, PR-AUC, confusion matrix, threshold tuning and coefficient interpretation."
      }
    ]
  },
  "decision-trees": {
    "eyebrow": "3. Supervised Learning Algorithms",
    "title": "Decision Trees",
    "summary": "Learn rule-based models that recursively split data into more homogeneous groups.",
    "concepts": [
      "Trees handle non-linear interactions and mixed feature scales.",
      "Depth and leaf constraints control overfitting.",
      "Split criteria measure impurity reduction."
    ],
    "workflow": [
      "Use shallow trees as interpretable baselines.",
      "Tune max_depth, min_samples_leaf and max_features.",
      "Validate feature importance carefully."
    ],
    "mistakes": [
      "Growing fully deep trees.",
      "Treating impurity importance as causal.",
      "Ignoring instability across samples."
    ],
    "cheat": [
      "Classification: Gini or entropy.",
      "Regression: variance or squared-error reduction.",
      "Control: max_depth, min_samples_split, min_samples_leaf."
    ],
    "prompts": [
      {
        "title": "Tree explanation",
        "prompt": "Explain decision trees with a small loan-approval example. Include splits, impurity, depth, overfitting and pruning."
      },
      {
        "title": "Code request",
        "prompt": "Train and visualise a DecisionTreeClassifier with cross-validated hyperparameters. Include confusion matrix, tree depth, leaf count and feature importance caveats."
      }
    ]
  },
  "random-forests": {
    "eyebrow": "3. Supervised Learning Algorithms",
    "title": "Random Forests",
    "summary": "Combine many decorrelated trees to improve robustness and predictive performance.",
    "concepts": [
      "Bootstrap samples create diverse trees.",
      "Random feature subsets reduce correlation.",
      "Averaging lowers variance."
    ],
    "workflow": [
      "Tune number of trees, depth, leaf size and max_features.",
      "Use out-of-bag estimates as an additional diagnostic.",
      "Compare permutation importance with impurity importance."
    ],
    "mistakes": [
      "Assuming more trees always fix bias.",
      "Using default thresholds on imbalanced data.",
      "Interpreting importance without validation."
    ],
    "cheat": [
      "Bagging = bootstrap + aggregation.",
      "Classification vote; regression average.",
      "OOB score uses samples omitted from each tree's bootstrap set."
    ],
    "prompts": [
      {
        "title": "Forest tutorial",
        "prompt": "Explain random forests using the concepts of bootstrap sampling, feature randomness, voting and variance reduction."
      },
      {
        "title": "Code request",
        "prompt": "Build a RandomForestClassifier pipeline with stratified cross-validation, class weighting, permutation importance and threshold tuning."
      }
    ]
  },
  "gradient-boosting": {
    "eyebrow": "3. Supervised Learning Algorithms",
    "title": "Gradient Boosting, XGBoost and LightGBM",
    "summary": "Build strong tabular models by sequentially correcting previous errors.",
    "concepts": [
      "Boosting adds weak learners stage by stage.",
      "Learning rate and number of trees trade off speed and complexity.",
      "Early stopping helps prevent overfitting."
    ],
    "workflow": [
      "Start with conservative depth and learning rate.",
      "Use validation-based early stopping.",
      "Tune subsampling and regularisation."
    ],
    "mistakes": [
      "Aggressive tuning on a small validation set.",
      "Ignoring categorical handling differences.",
      "Using feature importance as explanation without care."
    ],
    "cheat": [
      "Fₘ(x)=Fₘ₋₁(x)+ηhₘ(x)",
      "Key parameters: learning_rate, n_estimators, max_depth/leaves, subsample, colsample."
    ],
    "prompts": [
      {
        "title": "Boosting explanation",
        "prompt": "Explain gradient boosting intuitively using residual correction. Compare XGBoost, LightGBM and CatBoost at a practical level."
      },
      {
        "title": "Code request",
        "prompt": "Create an XGBoost or LightGBM training workflow with cross-validation, early stopping, imbalance handling, SHAP explanation and saved model artifacts."
      }
    ]
  },
  "knn": {
    "eyebrow": "4. More Core Algorithms",
    "title": "K-Nearest Neighbours",
    "summary": "Predict using the labels or values of nearby training examples.",
    "concepts": [
      "KNN is non-parametric and distance-based.",
      "Scaling strongly affects neighbours.",
      "Prediction cost grows with dataset size."
    ],
    "workflow": [
      "Scale features.",
      "Tune k and distance metric.",
      "Use dimensionality reduction for high-dimensional data."
    ],
    "mistakes": [
      "Using raw mixed-scale features.",
      "Small k causing noisy predictions.",
      "Using KNN on very large datasets without indexing."
    ],
    "cheat": [
      "Classification: majority vote.",
      "Regression: neighbour average.",
      "Common distances: Euclidean, Manhattan, cosine."
    ],
    "prompts": [
      {
        "title": "KNN explanation",
        "prompt": "Explain KNN with a two-dimensional classification example. Cover k, distance, scaling, decision boundaries and computational cost."
      },
      {
        "title": "Code request",
        "prompt": "Build a KNN pipeline with scaling, cross-validation for k and distance metric, and visualise validation performance."
      }
    ]
  },
  "svm": {
    "eyebrow": "4. More Core Algorithms",
    "title": "Support Vector Machines",
    "summary": "Find a separating boundary with maximum margin and optional kernel transformations.",
    "concepts": [
      "Support vectors define the decision boundary.",
      "C controls margin violations.",
      "Kernels allow non-linear boundaries."
    ],
    "workflow": [
      "Scale features.",
      "Tune C and gamma using cross-validation.",
      "Use linear SVM for high-dimensional sparse data."
    ],
    "mistakes": [
      "Using RBF SVM on huge datasets.",
      "Ignoring scaling.",
      "Treating probability=True as cost-free."
    ],
    "cheat": [
      "Margin = distance between boundary and nearest points.",
      "Linear kernel for sparse text; RBF for non-linear patterns.",
      "C ↑ means less regularisation."
    ],
    "prompts": [
      {
        "title": "SVM tutorial",
        "prompt": "Explain SVMs using margin, support vectors, C and kernels. Use a visual two-class example."
      },
      {
        "title": "Code request",
        "prompt": "Create a scikit-learn SVM pipeline with scaling and grid search over linear and RBF kernels, C and gamma. Report ROC-AUC and training time."
      }
    ]
  },
  "naive-bayes": {
    "eyebrow": "4. More Core Algorithms",
    "title": "Naive Bayes",
    "summary": "Use Bayes' theorem with conditional independence assumptions for fast probabilistic classification.",
    "concepts": [
      "Naive Bayes combines prior and likelihood information.",
      "It performs strongly on many text problems.",
      "Different variants match different feature distributions."
    ],
    "workflow": [
      "Use MultinomialNB for counts or TF-IDF-like non-negative features.",
      "Use GaussianNB for continuous features.",
      "Inspect class priors and calibration."
    ],
    "mistakes": [
      "Using negative features with MultinomialNB.",
      "Assuming independence is literally true.",
      "Comparing only accuracy."
    ],
    "cheat": [
      "P(y|x) ∝ P(y)∏P(xᵢ|y)",
      "Variants: Gaussian, Multinomial, Bernoulli."
    ],
    "prompts": [
      {
        "title": "Bayes explanation",
        "prompt": "Explain Naive Bayes using spam detection. Include priors, likelihoods, posterior probability and the independence assumption."
      },
      {
        "title": "Code request",
        "prompt": "Build a text classification pipeline using TfidfVectorizer and MultinomialNB. Include cross-validation and error analysis."
      }
    ]
  },
  "neural-networks": {
    "eyebrow": "4. More Core Algorithms",
    "title": "Neural Network Basics",
    "summary": "Understand layers, activations, losses and backpropagation.",
    "concepts": [
      "Layers transform inputs using weights, biases and activations.",
      "Backpropagation computes gradients.",
      "Optimisers update weights to reduce loss."
    ],
    "workflow": [
      "Start with small networks.",
      "Normalise inputs.",
      "Monitor validation loss and use early stopping."
    ],
    "mistakes": [
      "Using deep networks for tiny tabular datasets.",
      "Training without a validation set.",
      "Ignoring reproducibility and random seeds."
    ],
    "cheat": [
      "Neuron: a=f(wᵀx+b)",
      "ReLU=max(0,z)",
      "Backprop: chain rule for gradients."
    ],
    "prompts": [
      {
        "title": "Neural network tutor",
        "prompt": "Explain a feed-forward neural network with one hidden layer. Cover weights, bias, activation, loss, forward pass, backpropagation and epochs."
      },
      {
        "title": "Code request",
        "prompt": "Create a small Keras neural network for tabular binary classification with preprocessing, dropout, early stopping, calibration and evaluation."
      }
    ]
  },
  "ensembles": {
    "eyebrow": "4. More Core Algorithms",
    "title": "Ensemble Methods",
    "summary": "Combine models to improve stability and predictive performance.",
    "concepts": [
      "Bagging reduces variance.",
      "Boosting reduces bias through sequential correction.",
      "Stacking learns how to combine model outputs."
    ],
    "workflow": [
      "Ensemble diverse models.",
      "Generate meta-features out-of-fold.",
      "Compare against the best single model."
    ],
    "mistakes": [
      "Stacking on in-sample predictions.",
      "Combining highly correlated models.",
      "Using complexity without measurable benefit."
    ],
    "cheat": [
      "Voting: majority or average.",
      "Bagging: parallel models.",
      "Boosting: sequential models.",
      "Stacking: meta-model over out-of-fold predictions."
    ],
    "prompts": [
      {
        "title": "Ensemble selector",
        "prompt": "Recommend whether to use voting, bagging, boosting or stacking for this problem. Explain diversity, leakage risks and validation design. Problem: [PASTE]."
      },
      {
        "title": "Code request",
        "prompt": "Create a leakage-safe stacking classifier using out-of-fold predictions from logistic regression, random forest and gradient boosting."
      }
    ]
  },
  "clustering": {
    "eyebrow": "5. Unsupervised Learning",
    "title": "Clustering Fundamentals",
    "summary": "Group similar observations without labelled targets.",
    "concepts": [
      "Clusters depend on feature representation and distance.",
      "There may be no single correct number of clusters.",
      "Business usefulness matters more than a clustering score alone."
    ],
    "workflow": [
      "Scale and select features.",
      "Compare multiple algorithms and cluster counts.",
      "Profile and validate cluster stability."
    ],
    "mistakes": [
      "Treating clusters as true labels.",
      "Using IDs or leakage features.",
      "Naming clusters before examining their properties."
    ],
    "cheat": [
      "Evaluate: silhouette, Davies–Bouldin, stability and business interpretability."
    ],
    "prompts": [
      {
        "title": "Clustering plan",
        "prompt": "Design a clustering analysis for [USE CASE]. Include feature selection, scaling, candidate algorithms, cluster-count selection, stability checks and profiling."
      },
      {
        "title": "Cluster interpretation",
        "prompt": "Given cluster summaries below, create neutral cluster names, defining characteristics, risks and possible actions. Avoid stereotypes. Data: [PASTE]."
      }
    ]
  },
  "kmeans": {
    "eyebrow": "5. Unsupervised Learning",
    "title": "K-Means",
    "summary": "Partition data into k groups by minimising within-cluster squared distance.",
    "concepts": [
      "K-means assumes roughly spherical clusters.",
      "Initialisation can affect results.",
      "Scaling is usually required."
    ],
    "workflow": [
      "Use k-means++ initialisation.",
      "Try several k values.",
      "Check stability across random seeds."
    ],
    "mistakes": [
      "Applying K-means to categorical raw data.",
      "Choosing k only from elbow plots.",
      "Ignoring outliers."
    ],
    "cheat": [
      "Objective: minimise Σ||xᵢ−μcluster||²",
      "Key parameters: n_clusters, init, n_init, random_state."
    ],
    "prompts": [
      {
        "title": "K-means explanation",
        "prompt": "Explain K-means step by step with a small customer segmentation example. Include assignment, centroid update, inertia and limitations."
      },
      {
        "title": "Code request",
        "prompt": "Build a K-means segmentation pipeline with preprocessing, elbow and silhouette analysis, stability checks and cluster profiling."
      }
    ]
  },
  "hierarchical-dbscan": {
    "eyebrow": "5. Unsupervised Learning",
    "title": "Hierarchical Clustering and DBSCAN",
    "summary": "Use hierarchy or density to find non-spherical clusters and noise.",
    "concepts": [
      "Hierarchical clustering creates a dendrogram.",
      "DBSCAN finds dense regions and labels noise.",
      "Distance choice remains critical."
    ],
    "workflow": [
      "Use dendrograms for smaller datasets.",
      "Tune DBSCAN eps and min_samples.",
      "Inspect cluster shape and noise fraction."
    ],
    "mistakes": [
      "Using DBSCAN in high dimensions without dimensionality reduction.",
      "Interpreting dendrogram cuts mechanically.",
      "Ignoring sensitivity to scale."
    ],
    "cheat": [
      "DBSCAN parameters: eps, min_samples.",
      "Hierarchical linkages: single, complete, average, Ward."
    ],
    "prompts": [
      {
        "title": "Algorithm comparison",
        "prompt": "Compare K-means, hierarchical clustering and DBSCAN for [DATA DESCRIPTION]. Recommend one and explain scaling, distance and validation."
      },
      {
        "title": "Code request",
        "prompt": "Create Python code comparing AgglomerativeClustering and DBSCAN with scaling, PCA visualisation and silhouette analysis where valid."
      }
    ]
  },
  "pca": {
    "eyebrow": "5. Unsupervised Learning",
    "title": "Principal Component Analysis",
    "summary": "Compress correlated numeric features into orthogonal components.",
    "concepts": [
      "PCA finds directions of maximum variance.",
      "Components are linear combinations of original features.",
      "Scaling is usually important."
    ],
    "workflow": [
      "Standardise features.",
      "Inspect explained variance.",
      "Use loadings to understand components."
    ],
    "mistakes": [
      "Using PCA on unscaled mixed units.",
      "Assuming components have simple business meaning.",
      "Choosing components only by visualisation."
    ],
    "cheat": [
      "X ≈ ZWᵀ",
      "Explained variance ratio indicates retained variance.",
      "Use PCA inside cross-validation pipelines."
    ],
    "prompts": [
      {
        "title": "PCA tutorial",
        "prompt": "Explain PCA using a two-feature correlated dataset. Cover centring, covariance, eigenvectors, components and explained variance."
      },
      {
        "title": "Code request",
        "prompt": "Build a pipeline comparing models with and without PCA. Tune number of components using cross-validation and report explained variance."
      }
    ]
  },
  "anomaly-detection": {
    "eyebrow": "5. Unsupervised Learning",
    "title": "Anomaly Detection",
    "summary": "Identify unusual observations that may represent fraud, failure or data-quality problems.",
    "concepts": [
      "Anomalies are context-dependent.",
      "Label scarcity makes evaluation difficult.",
      "Thresholds control alert volume."
    ],
    "workflow": [
      "Define operational meaning of anomaly.",
      "Start with simple statistical baselines.",
      "Compare Isolation Forest, One-Class SVM and autoencoders when justified."
    ],
    "mistakes": [
      "Assuming rare means bad.",
      "Evaluating only on synthetic anomalies.",
      "Ignoring alert investigation capacity."
    ],
    "cheat": [
      "Methods: z-score, IQR, Isolation Forest, Local Outlier Factor, One-Class SVM."
    ],
    "prompts": [
      {
        "title": "Detection plan",
        "prompt": "Design an anomaly detection system for [USE CASE]. Define entity, time window, features, candidate methods, thresholding, evaluation and human review."
      },
      {
        "title": "Code request",
        "prompt": "Create an Isolation Forest workflow with scaling, contamination sensitivity analysis, anomaly profiling and export of review cases."
      }
    ]
  },
  "regression-metrics": {
    "eyebrow": "6. Evaluation and Model Selection",
    "title": "Regression Metrics",
    "summary": "Choose metrics that reflect error size, business impact and target scale.",
    "concepts": [
      "MAE is easy to interpret and robust to some outliers.",
      "RMSE penalises large errors more strongly.",
      "R² measures variance explained, not absolute usefulness."
    ],
    "workflow": [
      "Report multiple metrics.",
      "Compare against a naive baseline.",
      "Inspect segment-level and residual performance."
    ],
    "mistakes": [
      "Using MAPE when targets can be zero.",
      "Comparing RMSE across different target scales.",
      "Ignoring asymmetric business costs."
    ],
    "cheat": [
      "MAE=mean(|y−ŷ|)",
      "RMSE=√mean((y−ŷ)²)",
      "R²=1−SSE/SST",
      "MAPE=mean(|(y−ŷ)/y|)"
    ],
    "prompts": [
      {
        "title": "Metric selection",
        "prompt": "Recommend regression metrics for [USE CASE]. Consider outliers, zero targets, asymmetric costs and interpretability."
      },
      {
        "title": "Evaluation code",
        "prompt": "Write Python code to calculate MAE, RMSE, R², median absolute error and segment-level residual diagnostics."
      }
    ]
  },
  "classification-metrics": {
    "eyebrow": "6. Evaluation and Model Selection",
    "title": "Classification Metrics",
    "summary": "Evaluate class predictions using metrics aligned with error costs and class balance.",
    "concepts": [
      "Precision measures correctness of positive predictions.",
      "Recall measures capture of actual positives.",
      "F1 balances precision and recall."
    ],
    "workflow": [
      "Start from the confusion matrix.",
      "Use PR-AUC for highly imbalanced positive classes.",
      "Evaluate thresholds, not only default predictions."
    ],
    "mistakes": [
      "Using accuracy on imbalanced data.",
      "Reporting ROC-AUC without threshold metrics.",
      "Ignoring class-specific errors."
    ],
    "cheat": [
      "Precision=TP/(TP+FP)",
      "Recall=TP/(TP+FN)",
      "F1=2PR/(P+R)",
      "Specificity=TN/(TN+FP)"
    ],
    "prompts": [
      {
        "title": "Metric selector",
        "prompt": "Choose classification metrics for [USE CASE]. False positive cost: [COST]. False negative cost: [COST]. Class rate: [RATE]."
      },
      {
        "title": "Evaluation code",
        "prompt": "Create Python code for confusion matrix, precision, recall, F1, ROC-AUC, PR-AUC and threshold curves."
      }
    ]
  },
  "cross-validation": {
    "eyebrow": "6. Evaluation and Model Selection",
    "title": "Cross-Validation",
    "summary": "Estimate model stability and select models without overusing the test set.",
    "concepts": [
      "K-fold rotates validation folds.",
      "Stratification preserves class proportions.",
      "Grouped and time-series CV address dependency structures."
    ],
    "workflow": [
      "Choose CV based on data generation.",
      "Keep preprocessing inside each fold.",
      "Report mean and variability."
    ],
    "mistakes": [
      "Random CV on time series.",
      "Feature selection before CV.",
      "Comparing many models without accounting for variance."
    ],
    "cheat": [
      "KFold, StratifiedKFold, GroupKFold, TimeSeriesSplit, RepeatedStratifiedKFold."
    ],
    "prompts": [
      {
        "title": "CV strategy",
        "prompt": "Recommend a cross-validation strategy for [DATA DESCRIPTION]. Consider time, repeated entities, imbalance and sample size."
      },
      {
        "title": "Code request",
        "prompt": "Write a leakage-safe scikit-learn cross-validation workflow using Pipeline and the correct splitter for [PROBLEM]."
      }
    ]
  },
  "hyperparameter-tuning": {
    "eyebrow": "6. Evaluation and Model Selection",
    "title": "Hyperparameter Tuning",
    "summary": "Search model settings efficiently while preserving valid evaluation.",
    "concepts": [
      "Hyperparameters are chosen before fitting.",
      "Random search often explores large spaces better than small grids.",
      "Bayesian optimisation can focus on promising regions."
    ],
    "workflow": [
      "Tune only impactful parameters.",
      "Use cross-validation or validation sets.",
      "Record experiments and random seeds."
    ],
    "mistakes": [
      "Huge grids with little rationale.",
      "Tuning on the test set.",
      "Selecting tiny improvements that are within noise."
    ],
    "cheat": [
      "GridSearchCV, RandomizedSearchCV, Optuna/Bayesian optimisation, early stopping."
    ],
    "prompts": [
      {
        "title": "Search design",
        "prompt": "Design a hyperparameter search space for [MODEL] on [PROBLEM]. Prioritise high-impact parameters, sensible ranges, compute budget and stopping criteria."
      },
      {
        "title": "Code request",
        "prompt": "Create a RandomizedSearchCV workflow with pipeline preprocessing, multiple metrics and refit on the primary metric."
      }
    ]
  },
  "threshold-calibration": {
    "eyebrow": "6. Evaluation and Model Selection",
    "title": "Thresholds and Probability Calibration",
    "summary": "Turn probabilities into actions using costs, capacity and calibrated confidence.",
    "concepts": [
      "The default threshold of 0.5 is arbitrary.",
      "Calibration checks whether predicted probabilities match observed rates.",
      "Operational capacity may determine the threshold."
    ],
    "workflow": [
      "Plot precision-recall and cost curves.",
      "Use calibration plots and Brier score.",
      "Select thresholds on validation data."
    ],
    "mistakes": [
      "Choosing thresholds on test data.",
      "Using uncalibrated probabilities as risk scores.",
      "Ignoring alert capacity."
    ],
    "cheat": [
      "Calibration methods: Platt/sigmoid, isotonic.",
      "Brier score = mean((p−y)²)."
    ],
    "prompts": [
      {
        "title": "Threshold design",
        "prompt": "Design a threshold-selection process for [USE CASE]. Include business costs, capacity limits, validation method and monitoring."
      },
      {
        "title": "Code request",
        "prompt": "Write Python code for calibration curves, Brier score, precision-recall threshold analysis and cost-based threshold selection."
      }
    ]
  },
  "feature-engineering": {
    "eyebrow": "7. Feature Engineering and Explainability",
    "title": "Feature Engineering",
    "summary": "Create informative model inputs from raw data while avoiding leakage.",
    "concepts": [
      "Features should be available at prediction time.",
      "Domain knowledge often creates strong signals.",
      "Simple aggregated and temporal features can outperform complexity."
    ],
    "workflow": [
      "Define a prediction timestamp.",
      "Create features only from prior information.",
      "Validate incremental value using cross-validation."
    ],
    "mistakes": [
      "Using future information.",
      "Creating features that encode IDs without meaning.",
      "Adding thousands of features without controls."
    ],
    "cheat": [
      "Common types: ratios, counts, recency, frequency, rolling windows, interactions, domain bins."
    ],
    "prompts": [
      {
        "title": "Feature ideas",
        "prompt": "Generate leakage-safe feature ideas for [USE CASE]. For each feature, define calculation, required raw fields, prediction-time availability and business rationale."
      },
      {
        "title": "Feature review",
        "prompt": "Audit these proposed features for leakage, instability, fairness and production availability. Features: [LIST]."
      }
    ]
  },
  "time-features": {
    "eyebrow": "7. Feature Engineering and Explainability",
    "title": "Time-Series and Date Features",
    "summary": "Extract calendar, recency, lag and rolling-window signals safely.",
    "concepts": [
      "Time features must respect chronology.",
      "Lags use past target or feature values.",
      "Rolling statistics require careful window boundaries."
    ],
    "workflow": [
      "Sort by entity and time.",
      "Create lags after grouping.",
      "Shift before rolling to exclude the current target."
    ],
    "mistakes": [
      "Random splitting after creating future-aware features.",
      "Rolling windows that include the current outcome.",
      "Ignoring seasonality."
    ],
    "cheat": [
      "Calendar: day, week, month, holiday.",
      "Lag: xₜ₋₁, xₜ₋₇.",
      "Rolling: mean of previous N periods."
    ],
    "prompts": [
      {
        "title": "Temporal features",
        "prompt": "Design time-based features for [FORECAST/PREDICTION]. Include calendar, lag, rolling, trend and recency features with leakage-safe definitions."
      },
      {
        "title": "Code request",
        "prompt": "Write pandas code to create group-wise lag and rolling features using shift before rolling, with sorted timestamps and missing-value handling."
      }
    ]
  },
  "text-features": {
    "eyebrow": "7. Feature Engineering and Explainability",
    "title": "Text Features",
    "summary": "Represent text using counts, TF-IDF, embeddings or language-model features.",
    "concepts": [
      "Bag-of-words and TF-IDF are strong baselines.",
      "Embeddings capture semantic similarity.",
      "Text preprocessing should match the model."
    ],
    "workflow": [
      "Start with TF-IDF plus linear models.",
      "Use stratified evaluation.",
      "Inspect errors by language, length and topic."
    ],
    "mistakes": [
      "Removing useful negations.",
      "Data leakage from duplicate text.",
      "Using embeddings without checking domain relevance."
    ],
    "cheat": [
      "TF-IDF = term frequency × inverse document frequency.",
      "Sparse baseline: TfidfVectorizer + LogisticRegression."
    ],
    "prompts": [
      {
        "title": "Text model plan",
        "prompt": "Design a text classification baseline for [TASK]. Include preprocessing, TF-IDF, model, split, metrics and error analysis."
      },
      {
        "title": "Code request",
        "prompt": "Create a scikit-learn text classification pipeline with TfidfVectorizer, LogisticRegression, cross-validation and top coefficient terms."
      }
    ]
  },
  "feature-selection": {
    "eyebrow": "7. Feature Engineering and Explainability",
    "title": "Feature Selection",
    "summary": "Reduce unnecessary features while preserving predictive information.",
    "concepts": [
      "Filter methods score features independently.",
      "Wrapper methods evaluate subsets.",
      "Embedded methods select during model training."
    ],
    "workflow": [
      "Remove constant and duplicate features first.",
      "Perform selection inside cross-validation.",
      "Compare performance and stability."
    ],
    "mistakes": [
      "Selecting features using the full dataset.",
      "Removing correlated features automatically without context.",
      "Using importance from one unstable model."
    ],
    "cheat": [
      "Filter: mutual information, ANOVA, correlation.",
      "Embedded: L1, tree-based.",
      "Wrapper: RFE."
    ],
    "prompts": [
      {
        "title": "Selection strategy",
        "prompt": "Recommend a feature-selection strategy for [DATASET/MODEL]. Include leakage controls, stability checks and interpretation."
      },
      {
        "title": "Code request",
        "prompt": "Build a pipeline using VarianceThreshold, SelectKBest or L1 selection inside cross-validation."
      }
    ]
  },
  "explainability": {
    "eyebrow": "7. Feature Engineering and Explainability",
    "title": "Model Explainability",
    "summary": "Explain predictions and global behaviour without overclaiming causality.",
    "concepts": [
      "Global explanations describe overall patterns.",
      "Local explanations describe one prediction.",
      "Explanations reflect the model, not necessarily the real world."
    ],
    "workflow": [
      "Use permutation importance for global reliance.",
      "Use SHAP for detailed local and global views.",
      "Compare explanations across segments and time."
    ],
    "mistakes": [
      "Treating importance as causality.",
      "Ignoring correlated-feature effects.",
      "Showing complex explanations without user context."
    ],
    "cheat": [
      "Methods: coefficients, partial dependence, permutation importance, SHAP, local counterfactuals."
    ],
    "prompts": [
      {
        "title": "Explanation plan",
        "prompt": "Create an explainability plan for [MODEL/USE CASE]. Define audiences, global and local methods, limitations, fairness checks and presentation format."
      },
      {
        "title": "Code request",
        "prompt": "Write Python code for permutation importance and SHAP explanations for a fitted tree-based model, including caveats for correlated features."
      }
    ]
  },
  "sklearn-pipelines": {
    "eyebrow": "8. Pipelines, Deployment and MLOps",
    "title": "Scikit-Learn Pipelines",
    "summary": "Bundle preprocessing and modelling to prevent leakage and simplify deployment.",
    "concepts": [
      "Pipeline applies transformations consistently.",
      "ColumnTransformer handles different feature types.",
      "Pipelines work naturally with cross-validation."
    ],
    "workflow": [
      "Separate numeric and categorical transformations.",
      "Use named steps.",
      "Persist the full pipeline, not only the model."
    ],
    "mistakes": [
      "Preprocessing outside cross-validation.",
      "Saving only the estimator.",
      "Using different training and serving code."
    ],
    "cheat": [
      "Pipeline([('prep', preprocessor), ('model', estimator)])",
      "ColumnTransformer([('num', num_pipe, num_cols), ('cat', cat_pipe, cat_cols)])"
    ],
    "prompts": [
      {
        "title": "Pipeline design",
        "prompt": "Design a leakage-safe scikit-learn pipeline for this schema: [SCHEMA]. Include imputation, encoding, scaling and model selection."
      },
      {
        "title": "Complete code",
        "prompt": "Write complete Python code for a ColumnTransformer + Pipeline with training, cross-validation, evaluation, saving and loading."
      }
    ]
  },
  "experiment-tracking": {
    "eyebrow": "8. Pipelines, Deployment and MLOps",
    "title": "Experiment Tracking",
    "summary": "Record datasets, code, parameters, metrics and artifacts for reproducible model development.",
    "concepts": [
      "Experiments should be comparable and repeatable.",
      "Record data version and code commit.",
      "Store metrics, plots and model artifacts."
    ],
    "workflow": [
      "Define a naming convention.",
      "Track baseline and candidate runs.",
      "Document why a model was promoted."
    ],
    "mistakes": [
      "Keeping results only in notebooks.",
      "Changing multiple variables without logging.",
      "Promoting based on one metric."
    ],
    "cheat": [
      "Track: run ID, data version, code version, parameters, metrics, artifacts, notes."
    ],
    "prompts": [
      {
        "title": "Tracking schema",
        "prompt": "Create an experiment-tracking schema for [PROJECT]. Include metadata, data version, features, parameters, metrics, artifacts and promotion decision."
      },
      {
        "title": "MLflow code",
        "prompt": "Create a minimal MLflow training script that logs parameters, metrics, plots, model artifact and dataset version."
      }
    ]
  },
  "model-serving": {
    "eyebrow": "8. Pipelines, Deployment and MLOps",
    "title": "Model Serving",
    "summary": "Expose trained models through batch jobs, APIs or streaming systems.",
    "concepts": [
      "Batch is efficient for scheduled predictions.",
      "Online APIs support low-latency decisions.",
      "Streaming supports event-driven use cases."
    ],
    "workflow": [
      "Choose serving based on latency and freshness.",
      "Validate input schema.",
      "Version models and contracts."
    ],
    "mistakes": [
      "Serving a notebook directly.",
      "No input validation.",
      "Changing feature logic between training and serving."
    ],
    "cheat": [
      "Serving options: batch, REST API, streaming, embedded model.",
      "FastAPI endpoint: validate → transform → predict → log."
    ],
    "prompts": [
      {
        "title": "Serving architecture",
        "prompt": "Design a serving architecture for [USE CASE]. Include latency, throughput, batch/online choice, feature retrieval, validation, versioning and failure handling."
      },
      {
        "title": "FastAPI code",
        "prompt": "Create a FastAPI service for a saved scikit-learn pipeline with Pydantic validation, health check, prediction endpoint, logging and error handling."
      }
    ]
  },
  "monitoring-drift": {
    "eyebrow": "8. Pipelines, Deployment and MLOps",
    "title": "Monitoring and Data Drift",
    "summary": "Detect changes in inputs, predictions, outcomes and operational performance.",
    "concepts": [
      "Data drift changes feature distributions.",
      "Concept drift changes the relationship between features and target.",
      "Performance monitoring requires delayed ground truth."
    ],
    "workflow": [
      "Monitor schema, missingness and distributions.",
      "Track prediction rates and confidence.",
      "Define retraining and investigation thresholds."
    ],
    "mistakes": [
      "Monitoring only API uptime.",
      "Retraining automatically on any drift.",
      "Ignoring segment-level degradation."
    ],
    "cheat": [
      "Monitor: latency, errors, feature drift, prediction drift, calibration, performance, fairness."
    ],
    "prompts": [
      {
        "title": "Monitoring plan",
        "prompt": "Create a production monitoring plan for [MODEL]. Include operational, data, prediction, performance and fairness metrics with thresholds and actions."
      },
      {
        "title": "Drift code",
        "prompt": "Write Python code comparing reference and current data using PSI, KS test and categorical distribution differences."
      }
    ]
  },
  "retraining-governance": {
    "eyebrow": "8. Pipelines, Deployment and MLOps",
    "title": "Retraining and Model Governance",
    "summary": "Define when and how models are updated with review, testing and rollback controls.",
    "concepts": [
      "Retraining should be triggered by evidence.",
      "New models must pass validation and governance checks.",
      "Rollback plans reduce deployment risk."
    ],
    "workflow": [
      "Define trigger, dataset window and approval.",
      "Use champion-challenger evaluation.",
      "Document lineage and sign-off."
    ],
    "mistakes": [
      "Automatic retraining with no review.",
      "Changing features and model simultaneously without isolation.",
      "No rollback artifact."
    ],
    "cheat": [
      "Governance: owner, version, data lineage, validation report, approvals, deployment record, rollback."
    ],
    "prompts": [
      {
        "title": "Retraining policy",
        "prompt": "Write a retraining policy for [MODEL]. Include triggers, minimum data, validation tests, approval roles, deployment strategy and rollback."
      },
      {
        "title": "Governance checklist",
        "prompt": "Create a model-governance checklist covering documentation, data, fairness, security, validation, explainability, approvals and monitoring."
      }
    ]
  },
  "fairness": {
    "eyebrow": "9. Responsible ML and Real-World Practice",
    "title": "Fairness and Bias",
    "summary": "Evaluate whether model performance or outcomes differ unfairly across groups.",
    "concepts": [
      "Bias can enter through data, labels, features and deployment.",
      "Different fairness definitions can conflict.",
      "Context and stakeholder input are essential."
    ],
    "workflow": [
      "Identify protected and affected groups.",
      "Measure segment-level errors and outcomes.",
      "Review proxy features and intervention impact."
    ],
    "mistakes": [
      "Removing protected attributes and assuming fairness.",
      "Using one fairness metric universally.",
      "Ignoring downstream decision processes."
    ],
    "cheat": [
      "Common metrics: demographic parity, equal opportunity, equalised odds, calibration by group."
    ],
    "prompts": [
      {
        "title": "Fairness audit",
        "prompt": "Design a fairness audit for [MODEL/DECISION]. Identify groups, harms, metrics, data gaps, mitigation options and governance steps."
      },
      {
        "title": "Segment analysis",
        "prompt": "Create Python code to report precision, recall, false-positive rate, false-negative rate and calibration by group."
      }
    ]
  },
  "privacy-security": {
    "eyebrow": "9. Responsible ML and Real-World Practice",
    "title": "Privacy and Security",
    "summary": "Protect sensitive data and reduce risks from model access, leakage and adversarial behaviour.",
    "concepts": [
      "Minimise collected data.",
      "Control access to training and prediction data.",
      "Models may leak information or be attacked."
    ],
    "workflow": [
      "Classify data sensitivity.",
      "Apply encryption and least privilege.",
      "Threat-model the serving interface."
    ],
    "mistakes": [
      "Logging raw sensitive inputs.",
      "Using unrestricted production data in notebooks.",
      "Ignoring model extraction and poisoning risks."
    ],
    "cheat": [
      "Controls: minimisation, masking, encryption, access control, retention, audit logs, adversarial testing."
    ],
    "prompts": [
      {
        "title": "Security review",
        "prompt": "Perform a privacy and security review for this ML system: [DESCRIPTION]. Cover data lifecycle, access, logging, attacks, model leakage and mitigations."
      },
      {
        "title": "PII handling",
        "prompt": "Create a safe data-handling policy for an ML project using [DATA TYPES]. Include collection, storage, training, logging, retention and deletion."
      }
    ]
  },
  "causal-vs-predictive": {
    "eyebrow": "9. Responsible ML and Real-World Practice",
    "title": "Prediction vs Causation",
    "summary": "Distinguish models that predict outcomes from analyses that estimate intervention effects.",
    "concepts": [
      "Predictive accuracy does not establish causality.",
      "Interventions require counterfactual reasoning.",
      "Confounding can create misleading associations."
    ],
    "workflow": [
      "Ask whether the goal is prediction or impact.",
      "Use experiments when possible.",
      "State causal assumptions explicitly."
    ],
    "mistakes": [
      "Recommending actions from feature importance.",
      "Controlling for post-treatment variables.",
      "Using observational correlations as intervention effects."
    ],
    "cheat": [
      "Prediction: What will happen? Causation: What would happen if we intervene?"
    ],
    "prompts": [
      {
        "title": "Causal framing",
        "prompt": "Determine whether this question is predictive or causal. Explain required data, assumptions and suitable methods. Question: [PASTE]."
      },
      {
        "title": "Experiment design",
        "prompt": "Design an experiment to estimate the effect of [INTERVENTION] on [OUTCOME]. Include units, randomisation, metrics, sample considerations and threats to validity."
      }
    ]
  },
  "error-analysis": {
    "eyebrow": "9. Responsible ML and Real-World Practice",
    "title": "Error Analysis",
    "summary": "Study where and why a model fails to guide improvements.",
    "concepts": [
      "Aggregate metrics hide important failure modes.",
      "Errors should be grouped by meaningful segments.",
      "Manual review often reveals label and feature problems."
    ],
    "workflow": [
      "Sample false positives and false negatives.",
      "Create error categories.",
      "Quantify each category and prioritise fixes."
    ],
    "mistakes": [
      "Only inspecting best examples.",
      "Changing the model before understanding errors.",
      "Ignoring annotation quality."
    ],
    "cheat": [
      "Error table: case ID, true label, prediction, confidence, segment, error type, likely cause, action."
    ],
    "prompts": [
      {
        "title": "Error-analysis plan",
        "prompt": "Create an error-analysis plan for [MODEL]. Include sampling, taxonomy, segment metrics, confidence analysis and prioritisation."
      },
      {
        "title": "Case review",
        "prompt": "Analyse these prediction errors. Group them into root-cause categories and recommend data, feature, model or process fixes. Cases: [PASTE]."
      }
    ]
  },
  "ml-project-structure": {
    "eyebrow": "9. Responsible ML and Real-World Practice",
    "title": "Production ML Project Structure",
    "summary": "Organise code, data contracts, tests and configuration for maintainability.",
    "concepts": [
      "Separate data, features, training, evaluation and serving.",
      "Use configuration instead of hard-coded paths.",
      "Automate tests and reproducible environments."
    ],
    "workflow": [
      "Create modular packages.",
      "Add unit and integration tests.",
      "Version dependencies and schemas."
    ],
    "mistakes": [
      "One giant notebook.",
      "Duplicated preprocessing logic.",
      "No tests for feature calculations."
    ],
    "cheat": [
      "src/data, src/features, src/models, src/evaluation, src/serving, configs, tests, notebooks, artifacts."
    ],
    "prompts": [
      {
        "title": "Repository design",
        "prompt": "Design a production-ready repository structure for a Python ML project using scikit-learn and FastAPI. Include files, responsibilities, configs, tests and CI steps."
      },
      {
        "title": "Refactor plan",
        "prompt": "Refactor this notebook-based ML project into modules. Identify functions, classes, configs, tests and artifacts. Notebook outline: [PASTE]."
      }
    ]
  },
  "algorithm-selection": {
    "eyebrow": "10. Machine Learning Cheat Sheets",
    "title": "Algorithm Selection Cheat Sheet",
    "summary": "Choose a practical starting algorithm based on target, data size, interpretability and structure.",
    "concepts": [
      "Start simple and escalate based on evidence.",
      "Tabular data often favours linear models and tree ensembles.",
      "Text and images require suitable representations."
    ],
    "workflow": [
      "Classification baseline: logistic regression.",
      "Regression baseline: linear or regularised regression.",
      "Tabular strong model: gradient boosting.",
      "Sparse text: linear model or Naive Bayes."
    ],
    "mistakes": [
      "Choosing based on popularity.",
      "Ignoring inference latency.",
      "Using deep learning without enough data."
    ],
    "cheat": [
      "Need interpretability → linear/tree.",
      "Non-linear tabular → boosting/random forest.",
      "High-dimensional sparse → linear/SVM.",
      "Clusters → K-means/DBSCAN.",
      "Anomalies → Isolation Forest."
    ],
    "prompts": [
      {
        "title": "Algorithm recommender",
        "prompt": "Recommend a baseline and three candidate algorithms for [PROBLEM]. Consider dataset size, feature types, interpretability, latency and expected non-linearity."
      },
      {
        "title": "Comparison table",
        "prompt": "Create an algorithm comparison table for [CANDIDATES] covering strengths, weaknesses, preprocessing, key parameters, interpretability and complexity."
      }
    ]
  },
  "preprocessing-cheat": {
    "eyebrow": "10. Machine Learning Cheat Sheets",
    "title": "Preprocessing Cheat Sheet",
    "summary": "Use a fast reference for missing values, encoding, scaling and transformations.",
    "concepts": [
      "Numeric: impute, inspect skew, scale when needed.",
      "Categorical: impute, encode and handle unseen values.",
      "Text: clean lightly, vectorise and validate duplicates."
    ],
    "workflow": [
      "Tree models usually do not need scaling.",
      "Linear, KNN, SVM and neural networks usually benefit from scaling.",
      "Fit every transformer only on training data."
    ],
    "mistakes": [
      "Preprocessing before splitting.",
      "Dropping unknown categories.",
      "Using target statistics without cross-validation."
    ],
    "cheat": [
      "Numeric baseline: median + StandardScaler.",
      "Categorical baseline: most-frequent + OneHotEncoder(handle_unknown='ignore').",
      "Skewed positive: log1p.",
      "Outliers: RobustScaler or clipping with justification."
    ],
    "prompts": [
      {
        "title": "Preprocessing builder",
        "prompt": "Create a preprocessing plan for this schema: [SCHEMA]. Return a table with feature, issue, transformation, leakage risk and pipeline component."
      },
      {
        "title": "Code request",
        "prompt": "Generate a reusable scikit-learn ColumnTransformer for numeric, categorical, boolean and date-derived features."
      }
    ]
  },
  "metrics-cheat": {
    "eyebrow": "10. Machine Learning Cheat Sheets",
    "title": "Metrics Cheat Sheet",
    "summary": "Select evaluation metrics based on target type, imbalance and business cost.",
    "concepts": [
      "Regression: MAE, RMSE, R².",
      "Classification: precision, recall, F1, ROC-AUC, PR-AUC.",
      "Probability: log loss, Brier score and calibration."
    ],
    "workflow": [
      "Choose one primary metric and supporting diagnostics.",
      "Report segment-level performance.",
      "Compare to business and naive baselines."
    ],
    "mistakes": [
      "Using accuracy by default.",
      "Optimising a metric disconnected from business value.",
      "Ignoring confidence intervals."
    ],
    "cheat": [
      "Rare positive class → PR-AUC.",
      "High FN cost → recall.",
      "High FP cost → precision.",
      "Large regression errors costly → RMSE.",
      "Easy interpretability → MAE."
    ],
    "prompts": [
      {
        "title": "Metric recommender",
        "prompt": "Choose a primary and secondary metric set for [USE CASE]. Explain business alignment, imbalance and threshold implications."
      },
      {
        "title": "Metric report",
        "prompt": "Create an evaluation report template containing overall, segment, threshold, calibration and uncertainty metrics."
      }
    ]
  },
  "interview-cheat": {
    "eyebrow": "10. Machine Learning Cheat Sheets",
    "title": "ML Interview Cheat Sheet",
    "summary": "Review common concepts, trade-offs and practical questions for interviews.",
    "concepts": [
      "Explain models intuitively and technically.",
      "Discuss assumptions, metrics and failure modes.",
      "Connect answers to production considerations."
    ],
    "workflow": [
      "Practise short and deep versions of each answer.",
      "Use examples and equations selectively.",
      "Explain trade-offs instead of claiming one best model."
    ],
    "mistakes": [
      "Reciting definitions with no example.",
      "Ignoring leakage and validation.",
      "Discussing only modelling, not deployment."
    ],
    "cheat": [
      "Core topics: bias-variance, regularisation, cross-validation, metrics, trees, boosting, leakage, drift, explainability."
    ],
    "prompts": [
      {
        "title": "Mock interview",
        "prompt": "Run a senior machine learning interview. Ask one question at a time across statistics, algorithms, system design, MLOps and case studies. Score my answers and challenge weak reasoning."
      },
      {
        "title": "Rapid revision",
        "prompt": "Create 40 concise ML interview questions with two-sentence answers and one follow-up question for each."
      }
    ]
  },
  "python-ml-cheat": {
    "eyebrow": "10. Machine Learning Cheat Sheets",
    "title": "Python and Scikit-Learn Cheat Sheet",
    "summary": "Use a practical code reference for common data, modelling and evaluation operations.",
    "concepts": [
      "Use pandas for data manipulation.",
      "Use Pipeline and ColumnTransformer for preprocessing.",
      "Use cross_validate for reliable comparison."
    ],
    "workflow": [
      "Set random_state where supported.",
      "Separate configuration from code.",
      "Save the entire fitted pipeline."
    ],
    "mistakes": [
      "Notebook-only workflows.",
      "Manual preprocessing duplication.",
      "Ignoring versions and reproducibility."
    ],
    "cheat": [
      "Split: train_test_split(..., stratify=y)",
      "Pipeline: Pipeline([...])",
      "CV: cross_validate(pipe, X, y, scoring=[...])",
      "Save: joblib.dump(pipe, 'model.joblib')",
      "Load: joblib.load('model.joblib')"
    ],
    "prompts": [
      {
        "title": "Starter template",
        "prompt": "Create a complete reusable scikit-learn project template for binary classification using pandas, Pipeline, ColumnTransformer, cross-validation, threshold tuning and joblib saving."
      },
      {
        "title": "Cheat sheet",
        "prompt": "Create a one-page Python ML cheat sheet covering pandas EDA, splitting, preprocessing, pipelines, training, metrics, tuning, saving and inference."
      }
    ]
  }
};

function getTheme(theme) {
  const isLight = ["light", "day", "white"].includes(String(theme).toLowerCase());

  return {
    isLight,
    page: isLight ? "bg-[#f3f2ef]" : "bg-gray-950",
    shell: isLight ? "border-gray-200 bg-white" : "border-gray-800 bg-gray-900",
    sidebar: isLight ? "border-gray-200 bg-[#f9fafc]" : "border-gray-800 bg-gray-900",
    surface: isLight ? "bg-white" : "bg-gray-900",
    surfaceMuted: isLight ? "bg-gray-50" : "bg-gray-800",
    border: isLight ? "border-gray-200" : "border-gray-800",
    text: isLight ? "text-gray-900" : "text-gray-100",
    heading: isLight ? "text-gray-900" : "text-gray-100",
    body: isLight ? "text-gray-700" : "text-gray-200",
    muted: isLight ? "text-gray-700" : "text-gray-300",
    softText: isLight ? "text-gray-500" : "text-gray-400",
    activeRow: isLight
      ? "bg-white border-l-4 border-[#0a66c2] text-gray-900 font-semibold shadow-sm"
      : "bg-gray-800 border-l-4 border-blue-400 text-white font-semibold shadow-sm",
    hoverRow: isLight
      ? "border-l-4 border-transparent hover:bg-white hover:shadow-sm"
      : "border-l-4 border-transparent hover:bg-gray-800 hover:shadow-sm",
    input: isLight
      ? "border-gray-300 bg-white text-gray-900 focus:border-[#0a66c2] focus:ring-[#0a66c2]/20"
      : "border-gray-700 bg-gray-800 text-white focus:border-blue-400 focus:ring-blue-400/20",
    button: isLight
      ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      : "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700",
    primaryText: isLight ? "text-[#0a66c2]" : "text-blue-400",
  };
}

function Sidebar({
  theme,
  activeTopic,
  setActiveTopic,
  search,
  setSearch,
  mobileOpen,
  setMobileOpen,
}) {
  const styles = getTheme(theme);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chapters;

    return chapters
      .map((chapter) => ({
        ...chapter,
        topics: chapter.topics.filter((topic) =>
          topic.title.toLowerCase().includes(q)
        ),
      }))
      .filter((chapter) => chapter.topics.length);
  }, [search]);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close chapters"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-full max-w-[320px] flex-col border-r
          transition-transform duration-300 lg:sticky lg:top-0 lg:z-10
          lg:h-screen lg:translate-x-0
          ${styles.sidebar}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className={`flex items-center justify-between border-b px-6 py-6 ${styles.border}`}
        >
          <a href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#0a66c2] text-white">
              <BookOpen className="h-5 w-5" />
            </span>

            <div>
              <p className={`text-base font-bold ${styles.heading}`}>
                Learning Center
              </p>
              <p className={`mt-0.5 text-xs font-medium ${styles.muted}`}>
                Machine Learning Guide
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className={`grid h-8 w-8 place-items-center rounded-md lg:hidden ${styles.surfaceMuted} ${styles.muted}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className={`border-b p-5 ${styles.border}`}>
          <div className="relative">
            <Search
              className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${styles.softText}`}
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search chapters..."
              className={`h-10 w-full rounded-md border pl-10 pr-3 text-sm outline-none transition focus:ring-2 ${styles.input}`}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {filtered.map((chapter) => (
            <div key={chapter.id} className="mb-6">
              <p
                className={`px-3 text-[11px] font-bold uppercase tracking-wider ${styles.muted}`}
              >
                {chapter.title.replace(/^\d+\.\s*/, "")}
              </p>

              <div className="mt-2 space-y-1">
                {chapter.topics.map((topic) => {
                  const active = topic.id === activeTopic;

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => {
                        setActiveTopic(topic.id);
                        setMobileOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`relative flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition ${
                        active
                          ? styles.activeRow
                          : `${styles.muted} ${styles.hoverRow}`
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          active ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {topic.title}
                      </span>

                      <span className={`shrink-0 text-[11px] ${styles.softText}`}>
                        {topic.readTime}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

      </aside>
    </>
  );
}

function BulletSection({ title, items, icon: Icon, tone, theme }) {
  const styles = getTheme(theme);

  const tones = {
    blue: styles.isLight
      ? "text-blue-700 bg-blue-100"
      : "text-blue-400 bg-blue-900/30",
    amber: styles.isLight
      ? "text-yellow-700 bg-yellow-100"
      : "text-yellow-400 bg-yellow-900/30",
    rose: styles.isLight
      ? "text-red-700 bg-red-100"
      : "text-red-400 bg-red-900/30",
  };

  return (
    <section className={`border-t py-8 ${styles.border}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-md ${tones[tone]}`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <h2 className={`text-xl font-bold tracking-tight ${styles.heading}`}>
            {title}
          </h2>
        </div>

        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" />
              <span
                className={`text-sm leading-relaxed sm:text-base ${
                  styles.isLight ? "!text-[#475569]" : "!text-[#d7dfec]"
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheatCard({ items, theme }) {
  const styles = getTheme(theme);

  return (
    <section className={`border-t py-8 ${styles.border}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-md ${
            styles.isLight
              ? "bg-cyan-100 text-cyan-700"
              : "bg-cyan-900/30 text-cyan-400"
          }`}
        >
          <Code2 className="h-4 w-4" />
        </span>

        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${styles.primaryText}`}>
            Quick cheat sheet
          </p>
          <h2 className={`mt-1 text-xl font-bold tracking-tight ${styles.heading}`}>
            Key formulas, rules and code
          </h2>
        </div>
      </div>

      <div
        className={`mt-5 rounded-lg border p-5 ${
          styles.isLight
            ? "border-gray-200 bg-[#0f172a]"
            : "border-gray-800 bg-[#050b16]"
        }`}
      >
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-7 text-slate-200">
          {items.map((item) => `• ${item}`).join("\n")}
        </pre>
      </div>
    </section>
  );
}

function PromptCard({ item, index, theme }) {
  const styles = getTheme(theme);
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article
      className={`rounded-lg border p-5 ${
        styles.isLight
          ? "border-gray-200 bg-gray-50"
          : "border-gray-800 bg-gray-900"
      }`}
    >
      <div
        className={`mb-4 flex flex-col items-start gap-3 border-b pb-4 min-[380px]:flex-row min-[380px]:justify-between min-[380px]:gap-4 ${styles.border}`}
      >
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${styles.primaryText}`}>
            Template {index + 1}
          </p>
          <h3 className={`mt-1 text-base font-bold ${styles.heading}`}>
            {item.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={copyPrompt}
          className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition ${styles.button}`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre
        className={`overflow-x-auto whitespace-pre-wrap rounded-md font-mono text-sm leading-relaxed ${styles.text}`}
      >
        {item.prompt}
      </pre>
    </article>
  );
}

export default function MachineLearningGuidePage({ theme = "light" }) {
  const styles = getTheme(theme);
  const [activeTopic, setActiveTopic] = useState("what-is-ml");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const allTopics = useMemo(() => chapters.flatMap((chapter) => chapter.topics), []);
  const activeIndex = allTopics.findIndex((topic) => topic.id === activeTopic);
  const current = topicContent[activeTopic] || topicContent["what-is-ml"];
  const previousTopic = activeIndex > 0 ? allTopics[activeIndex - 1] : null;
  const nextTopic = activeIndex < allTopics.length - 1 ? allTopics[activeIndex + 1] : null;
  function changeTopic(topic) {
    if (!topic) return;
    setActiveTopic(topic.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={`min-h-screen ${styles.page}`}>
      <div
        className={`min-h-screen w-full shadow-sm lg:grid lg:grid-cols-[300px_minmax(0,1fr)] ${styles.shell}`}
      >
        <Sidebar
          theme={theme}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          search={search}
          setSearch={setSearch}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div className="min-w-0">
          <header
            className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-5 backdrop-blur-sm sm:px-8 ${styles.border} ${styles.surface}/95`}
          >
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={`grid h-11 w-11 place-items-center rounded-md border lg:hidden ${styles.border} ${styles.text}`}
              >
                <Menu className="h-4 w-4" />
              </button>

              <a
                href="/"
                className={`inline-flex items-center gap-2 text-sm font-semibold ${styles.muted}`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Learning materials</span>
              </a>
            </div>

            <div className={`text-sm font-medium ${styles.muted}`}>
              Module {activeIndex + 1} of {allTopics.length}
            </div>
          </header>

          <div className="w-full px-0 py-10 lg:py-12">
            <article>
              <div className="mx-auto mb-8 max-w-3xl px-8 lg:px-12">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${styles.primaryText}`}
                  >
                    {current.eyebrow.replace(/^\d+\.\s*/, "")}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-gray-300"></span>

                  <span className={`text-xs font-medium ${styles.muted}`}>
                    {allTopics[activeIndex]?.readTime}
                  </span>
                </div>

                <h1
                  className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${styles.heading}`}
                >
                  {current.title}
                </h1>

                <p
                  className={`mt-4 text-base leading-relaxed sm:text-lg ${styles.body}`}
                >
                  {current.summary}
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-3xl px-8 lg:px-12">
                <BulletSection
                  title="A simple way to understand it"
                  items={current.concepts}
                  icon={Sparkles}
                  tone="blue"
                  theme={theme}
                />

                <BulletSection
                  title="What it can help you do"
                  items={current.workflow}
                  icon={Lightbulb}
                  tone="amber"
                  theme={theme}
                />

                <BulletSection
                  title="What to watch out for"
                  items={current.mistakes}
                  icon={ShieldAlert}
                  tone="rose"
                  theme={theme}
                />

                <CheatCard items={current.cheat} theme={theme} />
              </div>

              <section
                className={`mx-auto mt-8 max-w-3xl border-t px-8 pt-8 lg:px-12 ${styles.border}`}
              >
                <div>
                  <h2 className={`text-2xl font-bold tracking-tight ${styles.heading}`}>
                    Ready-to-use prompts
                  </h2>
                  <p className={`mt-2 text-sm ${styles.body}`}>
                    Copy, customize, and replace the bracketed placeholders with
                    your own information.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {current.prompts.map((prompt, index) => (
                    <PromptCard
                      key={prompt.title}
                      item={prompt}
                      index={index}
                      theme={theme}
                    />
                  ))}
                </div>
              </section>
            </article>

            <div
              className={`mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 border-t px-8 pt-6 pb-12 sm:flex-row lg:px-12 ${styles.border}`}
            >
              <button
                type="button"
                disabled={!previousTopic}
                onClick={() => changeTopic(previousTopic)}
                className={`flex w-full items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto ${styles.button}`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous: {previousTopic ? previousTopic.title : "Start"}
              </button>

              <button
                type="button"
                disabled={!nextTopic}
                onClick={() => changeTopic(nextTopic)}
                className={`flex w-full items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto ${styles.button}`}
              >
                Next: {nextTopic ? nextTopic.title : "Complete"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

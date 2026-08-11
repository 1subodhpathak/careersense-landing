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
    "id": "group-1",
    "title": "1. MLOps Foundations",
    "topics": [
      {
        "id": "what-is-mlops",
        "title": "What is MLOps?",
        "readTime": "12 min"
      },
      {
        "id": "the-machine-learning-lifecycle",
        "title": "The Machine Learning Lifecycle",
        "readTime": "12 min"
      },
      {
        "id": "roles-and-responsibilities",
        "title": "Roles and Responsibilities",
        "readTime": "12 min"
      },
      {
        "id": "mlops-maturity-levels",
        "title": "MLOps Maturity Levels",
        "readTime": "12 min"
      },
      {
        "id": "designing-for-reproducibility",
        "title": "Designing for Reproducibility",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-2",
    "title": "2. Data and Feature Management",
    "topics": [
      {
        "id": "data-versioning",
        "title": "Data Versioning",
        "readTime": "12 min"
      },
      {
        "id": "data-validation",
        "title": "Data Validation",
        "readTime": "12 min"
      },
      {
        "id": "feature-engineering-pipelines",
        "title": "Feature Engineering Pipelines",
        "readTime": "12 min"
      },
      {
        "id": "feature-stores",
        "title": "Feature Stores",
        "readTime": "12 min"
      },
      {
        "id": "data-lineage-and-metadata",
        "title": "Data Lineage and Metadata",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-3",
    "title": "3. Experimentation and Model Development",
    "topics": [
      {
        "id": "experiment-tracking",
        "title": "Experiment Tracking",
        "readTime": "12 min"
      },
      {
        "id": "configuration-management",
        "title": "Configuration Management",
        "readTime": "12 min"
      },
      {
        "id": "reproducible-training",
        "title": "Reproducible Training",
        "readTime": "12 min"
      },
      {
        "id": "hyperparameter-optimisation",
        "title": "Hyperparameter Optimisation",
        "readTime": "12 min"
      },
      {
        "id": "model-evaluation-and-promotion",
        "title": "Model Evaluation and Promotion",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-4",
    "title": "4. Model Packaging and Registries",
    "topics": [
      {
        "id": "model-packaging",
        "title": "Model Packaging",
        "readTime": "12 min"
      },
      {
        "id": "model-serialization",
        "title": "Model Serialization",
        "readTime": "12 min"
      },
      {
        "id": "model-registry",
        "title": "Model Registry",
        "readTime": "12 min"
      },
      {
        "id": "artifact-management",
        "title": "Artifact Management",
        "readTime": "12 min"
      },
      {
        "id": "environment-and-dependency-management",
        "title": "Environment and Dependency Management",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-5",
    "title": "5. CI/CD for Machine Learning",
    "topics": [
      {
        "id": "ci-for-ml-projects",
        "title": "CI for ML Projects",
        "readTime": "12 min"
      },
      {
        "id": "automated-testing",
        "title": "Automated Testing",
        "readTime": "12 min"
      },
      {
        "id": "continuous-training",
        "title": "Continuous Training",
        "readTime": "12 min"
      },
      {
        "id": "continuous-delivery",
        "title": "Continuous Delivery",
        "readTime": "12 min"
      },
      {
        "id": "release-strategies",
        "title": "Release Strategies",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-6",
    "title": "6. Model Serving and Inference",
    "topics": [
      {
        "id": "batch-inference",
        "title": "Batch Inference",
        "readTime": "12 min"
      },
      {
        "id": "online-inference",
        "title": "Online Inference",
        "readTime": "12 min"
      },
      {
        "id": "streaming-inference",
        "title": "Streaming Inference",
        "readTime": "12 min"
      },
      {
        "id": "model-apis",
        "title": "Model APIs",
        "readTime": "12 min"
      },
      {
        "id": "performance-and-scalability",
        "title": "Performance and Scalability",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-7",
    "title": "7. Monitoring and Reliability",
    "topics": [
      {
        "id": "operational-monitoring",
        "title": "Operational Monitoring",
        "readTime": "12 min"
      },
      {
        "id": "data-drift",
        "title": "Data Drift",
        "readTime": "12 min"
      },
      {
        "id": "concept-drift",
        "title": "Concept Drift",
        "readTime": "12 min"
      },
      {
        "id": "model-performance-monitoring",
        "title": "Model Performance Monitoring",
        "readTime": "12 min"
      },
      {
        "id": "alerting-and-incident-response",
        "title": "Alerting and Incident Response",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-8",
    "title": "8. Governance, Security and Responsible AI",
    "topics": [
      {
        "id": "model-governance",
        "title": "Model Governance",
        "readTime": "12 min"
      },
      {
        "id": "security-for-ml-systems",
        "title": "Security for ML Systems",
        "readTime": "12 min"
      },
      {
        "id": "privacy-and-sensitive-data",
        "title": "Privacy and Sensitive Data",
        "readTime": "12 min"
      },
      {
        "id": "fairness-and-bias-monitoring",
        "title": "Fairness and Bias Monitoring",
        "readTime": "12 min"
      },
      {
        "id": "auditability-and-compliance",
        "title": "Auditability and Compliance",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-9",
    "title": "9. Platform Engineering and Cloud",
    "topics": [
      {
        "id": "mlops-platform-architecture",
        "title": "MLOps Platform Architecture",
        "readTime": "12 min"
      },
      {
        "id": "containers-and-kubernetes",
        "title": "Containers and Kubernetes",
        "readTime": "12 min"
      },
      {
        "id": "workflow-orchestration",
        "title": "Workflow Orchestration",
        "readTime": "12 min"
      },
      {
        "id": "cloud-native-mlops",
        "title": "Cloud-Native MLOps",
        "readTime": "12 min"
      },
      {
        "id": "cost-optimisation",
        "title": "Cost Optimisation",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-10",
    "title": "10. MLOps Best-Practice Cheat Sheets",
    "topics": [
      {
        "id": "project-structure-cheat-sheet",
        "title": "Project Structure Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "testing-cheat-sheet",
        "title": "Testing Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "deployment-cheat-sheet",
        "title": "Deployment Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "monitoring-cheat-sheet",
        "title": "Monitoring Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "mlops-interview-cheat-sheet",
        "title": "MLOps Interview Cheat Sheet",
        "readTime": "12 min"
      }
    ]
  }
];
export const topicContent = {
  "what-is-mlops": {
    "eyebrow": "1. MLOps Foundations",
    "title": "What is MLOps?",
    "summary": "Learn what is mlops? through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "MLOps combines machine learning, software engineering and operations.",
      "Its goal is to make models reproducible, deployable, observable and governable.",
      "The model is only one component of a production ML system."
    ],
    "workflow": [
      "Define the business and model objective.",
      "Design data, training, deployment and monitoring workflows.",
      "Automate repeatable steps.",
      "Add approval, rollback and audit controls."
    ],
    "mistakes": [
      "Treating deployment as the final step.",
      "Focusing only on model accuracy.",
      "Building pipelines without ownership or operating procedures."
    ],
    "cheat": [
      "MLOps = Data + Code + Models + Pipelines + Deployment + Monitoring + Governance",
      "Core goals: reproducibility, automation, reliability and traceability",
      "Production success requires model quality and system quality"
    ],
    "prompts": [
      {
        "title": "MLOps explanation",
        "prompt": "Explain MLOps to a software engineer using a complete model lifecycle example. Compare it with DevOps and highlight what is unique about ML systems."
      },
      {
        "title": "Maturity assessment",
        "prompt": "Assess the MLOps maturity of this team. Ask about data, experiments, testing, deployment, monitoring, governance and ownership. Then score each area and propose a roadmap."
      }
    ]
  },
  "the-machine-learning-lifecycle": {
    "eyebrow": "1. MLOps Foundations",
    "title": "The Machine Learning Lifecycle",
    "summary": "Learn the machine learning lifecycle through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of the machine learning lifecycle.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# The Machine Learning Lifecycle",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me The Machine Learning Lifecycle as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for The Machine Learning Lifecycle in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "roles-and-responsibilities": {
    "eyebrow": "1. MLOps Foundations",
    "title": "Roles and Responsibilities",
    "summary": "Learn roles and responsibilities through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of roles and responsibilities.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Roles and Responsibilities",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Roles and Responsibilities as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Roles and Responsibilities in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "mlops-maturity-levels": {
    "eyebrow": "1. MLOps Foundations",
    "title": "MLOps Maturity Levels",
    "summary": "Learn mlops maturity levels through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of mlops maturity levels.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# MLOps Maturity Levels",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me MLOps Maturity Levels as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for MLOps Maturity Levels in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "designing-for-reproducibility": {
    "eyebrow": "1. MLOps Foundations",
    "title": "Designing for Reproducibility",
    "summary": "Learn designing for reproducibility through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of designing for reproducibility.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Designing for Reproducibility",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Designing for Reproducibility as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Designing for Reproducibility in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "data-versioning": {
    "eyebrow": "2. Data and Feature Management",
    "title": "Data Versioning",
    "summary": "Learn data versioning through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Training data must be traceable to an immutable version.",
      "A model cannot be reproduced without its exact dataset.",
      "Large datasets often require pointer-based or object-store versioning."
    ],
    "workflow": [
      "Define dataset identity and schema.",
      "Create an immutable snapshot or version reference.",
      "Record lineage and checksums.",
      "Link the version to every experiment and model."
    ],
    "mistakes": [
      "Overwriting training files in place.",
      "Versioning code but not data.",
      "Using timestamps without content identity."
    ],
    "cheat": [
      "Track dataset ID, version, URI, schema, checksum and creation time",
      "Tools: DVC, lakeFS, Delta Lake, object-store versioning",
      "Every model version should reference one exact dataset version"
    ],
    "prompts": [
      {
        "title": "Versioning design",
        "prompt": "Design a data-versioning strategy for [DATA PLATFORM]. Include storage, naming, immutable snapshots, lineage and experiment integration."
      },
      {
        "title": "DVC workflow",
        "prompt": "Create a DVC workflow for versioning a training dataset, preprocessing output and model artifact with Git integration."
      }
    ]
  },
  "data-validation": {
    "eyebrow": "2. Data and Feature Management",
    "title": "Data Validation",
    "summary": "Learn data validation through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of data validation.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Data Validation",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Data Validation as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Data Validation in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "feature-engineering-pipelines": {
    "eyebrow": "2. Data and Feature Management",
    "title": "Feature Engineering Pipelines",
    "summary": "Learn feature engineering pipelines through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of feature engineering pipelines.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Feature Engineering Pipelines",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Feature Engineering Pipelines as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Feature Engineering Pipelines in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "feature-stores": {
    "eyebrow": "2. Data and Feature Management",
    "title": "Feature Stores",
    "summary": "Learn feature stores through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of feature stores.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Feature Stores",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Feature Stores as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Feature Stores in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "data-lineage-and-metadata": {
    "eyebrow": "2. Data and Feature Management",
    "title": "Data Lineage and Metadata",
    "summary": "Learn data lineage and metadata through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of data lineage and metadata.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Data Lineage and Metadata",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Data Lineage and Metadata as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Data Lineage and Metadata in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "experiment-tracking": {
    "eyebrow": "3. Experimentation and Model Development",
    "title": "Experiment Tracking",
    "summary": "Learn experiment tracking through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Experiments should record parameters, metrics, datasets, code versions and artifacts.",
      "Tracking enables comparison and reproducibility.",
      "A run should explain what changed and why."
    ],
    "workflow": [
      "Create a run ID.",
      "Log configuration and data version.",
      "Log metrics and artifacts.",
      "Tag and document the decision."
    ],
    "mistakes": [
      "Tracking only final metrics.",
      "Omitting data or code versions.",
      "Comparing runs created with different evaluation logic."
    ],
    "cheat": [
      "Track: run_id, git_sha, data_version, parameters, metrics, artifacts and notes",
      "Tools: MLflow, W&B, Neptune, ClearML",
      "Promotion requires metric and governance evidence"
    ],
    "prompts": [
      {
        "title": "Tracking schema",
        "prompt": "Design an experiment-tracking schema for [PROJECT]. Include run metadata, code version, data version, features, hyperparameters, metrics, artifacts and promotion decision."
      },
      {
        "title": "MLflow implementation",
        "prompt": "Create a Python training script that logs parameters, metrics, plots, model artifact and dataset version to MLflow."
      }
    ]
  },
  "configuration-management": {
    "eyebrow": "3. Experimentation and Model Development",
    "title": "Configuration Management",
    "summary": "Learn configuration management through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of configuration management.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Configuration Management",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Configuration Management as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Configuration Management in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "reproducible-training": {
    "eyebrow": "3. Experimentation and Model Development",
    "title": "Reproducible Training",
    "summary": "Learn reproducible training through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of reproducible training.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Reproducible Training",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Reproducible Training as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Reproducible Training in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "hyperparameter-optimisation": {
    "eyebrow": "3. Experimentation and Model Development",
    "title": "Hyperparameter Optimisation",
    "summary": "Learn hyperparameter optimisation through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of hyperparameter optimisation.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Hyperparameter Optimisation",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Hyperparameter Optimisation as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Hyperparameter Optimisation in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-evaluation-and-promotion": {
    "eyebrow": "3. Experimentation and Model Development",
    "title": "Model Evaluation and Promotion",
    "summary": "Learn model evaluation and promotion through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of model evaluation and promotion.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Model Evaluation and Promotion",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Model Evaluation and Promotion as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Model Evaluation and Promotion in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-packaging": {
    "eyebrow": "4. Model Packaging and Registries",
    "title": "Model Packaging",
    "summary": "Learn model packaging through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of model packaging.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Model Packaging",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Model Packaging as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Model Packaging in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-serialization": {
    "eyebrow": "4. Model Packaging and Registries",
    "title": "Model Serialization",
    "summary": "Learn model serialization through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of model serialization.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Model Serialization",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Model Serialization as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Model Serialization in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-registry": {
    "eyebrow": "4. Model Packaging and Registries",
    "title": "Model Registry",
    "summary": "Learn model registry through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "A registry manages model versions and lifecycle stages.",
      "Promotion should be controlled and auditable.",
      "Registry metadata should include validation and ownership."
    ],
    "workflow": [
      "Register the artifact.",
      "Attach metrics, lineage and validation reports.",
      "Promote through controlled stages.",
      "Archive replaced versions."
    ],
    "mistakes": [
      "Using the registry as file storage only.",
      "Promoting without test evidence.",
      "No rollback-compatible version history."
    ],
    "cheat": [
      "Stages: candidate \u2192 staging \u2192 production \u2192 archived",
      "Metadata: owner, code, data, metrics, approvals and deployment status",
      "Never overwrite production artifacts in place"
    ],
    "prompts": [
      {
        "title": "Registry design",
        "prompt": "Design a model registry workflow for [ORGANISATION]. Include stages, metadata, approvals, rollback and deprecation."
      },
      {
        "title": "Promotion policy",
        "prompt": "Write a model-promotion policy covering metric thresholds, tests, governance, approvals and rollback readiness."
      }
    ]
  },
  "artifact-management": {
    "eyebrow": "4. Model Packaging and Registries",
    "title": "Artifact Management",
    "summary": "Learn artifact management through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of artifact management.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Artifact Management",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Artifact Management as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Artifact Management in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "environment-and-dependency-management": {
    "eyebrow": "4. Model Packaging and Registries",
    "title": "Environment and Dependency Management",
    "summary": "Learn environment and dependency management through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of environment and dependency management.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Environment and Dependency Management",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Environment and Dependency Management as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Environment and Dependency Management in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "ci-for-ml-projects": {
    "eyebrow": "5. CI/CD for Machine Learning",
    "title": "CI for ML Projects",
    "summary": "Learn ci for ml projects through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of ci for ml projects.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# CI for ML Projects",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me CI for ML Projects as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for CI for ML Projects in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "automated-testing": {
    "eyebrow": "5. CI/CD for Machine Learning",
    "title": "Automated Testing",
    "summary": "Learn automated testing through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of automated testing.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Automated Testing",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Automated Testing as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Automated Testing in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "continuous-training": {
    "eyebrow": "5. CI/CD for Machine Learning",
    "title": "Continuous Training",
    "summary": "Learn continuous training through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Continuous training refreshes models when evidence justifies it.",
      "Triggers may be scheduled, drift-based or performance-based.",
      "Retraining still requires validation and approval."
    ],
    "workflow": [
      "Detect a trigger.",
      "Build the training dataset.",
      "Train a challenger.",
      "Compare it with the champion.",
      "Approve, deploy and monitor."
    ],
    "mistakes": [
      "Retraining on every drift signal.",
      "Promoting automatically without safeguards.",
      "Changing data, features and model together without attribution."
    ],
    "cheat": [
      "Trigger \u2192 Build data \u2192 Train \u2192 Validate \u2192 Compare \u2192 Approve \u2192 Deploy",
      "Champion-challenger reduces blind replacement risk",
      "Store the exact training dataset and pipeline version"
    ],
    "prompts": [
      {
        "title": "CT pipeline",
        "prompt": "Design a continuous-training pipeline for [MODEL]. Include triggers, dataset window, validation, champion-challenger logic, approvals and rollback."
      },
      {
        "title": "Retraining policy",
        "prompt": "Write a retraining policy with thresholds for drift, performance decline, data volume, schedule and manual review."
      }
    ]
  },
  "continuous-delivery": {
    "eyebrow": "5. CI/CD for Machine Learning",
    "title": "Continuous Delivery",
    "summary": "Learn continuous delivery through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of continuous delivery.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Continuous Delivery",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Continuous Delivery as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Continuous Delivery in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "release-strategies": {
    "eyebrow": "5. CI/CD for Machine Learning",
    "title": "Release Strategies",
    "summary": "Learn release strategies through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of release strategies.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Release Strategies",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Release Strategies as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Release Strategies in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "batch-inference": {
    "eyebrow": "6. Model Serving and Inference",
    "title": "Batch Inference",
    "summary": "Learn batch inference through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of batch inference.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Batch Inference",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Batch Inference as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Batch Inference in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "online-inference": {
    "eyebrow": "6. Model Serving and Inference",
    "title": "Online Inference",
    "summary": "Learn online inference through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Online inference serves low-latency predictions.",
      "Input validation and feature consistency are critical.",
      "Availability and latency targets shape the architecture."
    ],
    "workflow": [
      "Receive and validate the request.",
      "Retrieve or compute features.",
      "Run the model.",
      "Return the prediction.",
      "Log observability data safely."
    ],
    "mistakes": [
      "No schema validation.",
      "Different feature logic in training and serving.",
      "Logging sensitive inputs."
    ],
    "cheat": [
      "Request \u2192 Validate \u2192 Transform \u2192 Predict \u2192 Respond \u2192 Log",
      "Track p50, p95 and p99 latency",
      "Use timeouts, circuit breakers and fallbacks"
    ],
    "prompts": [
      {
        "title": "Serving design",
        "prompt": "Design a low-latency online inference service for [MODEL]. Include API contract, feature retrieval, scaling, caching, timeouts and fallbacks."
      },
      {
        "title": "FastAPI service",
        "prompt": "Create a production-ready FastAPI service for a saved ML pipeline with Pydantic validation, health checks, logging and structured errors."
      }
    ]
  },
  "streaming-inference": {
    "eyebrow": "6. Model Serving and Inference",
    "title": "Streaming Inference",
    "summary": "Learn streaming inference through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of streaming inference.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Streaming Inference",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Streaming Inference as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Streaming Inference in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-apis": {
    "eyebrow": "6. Model Serving and Inference",
    "title": "Model APIs",
    "summary": "Learn model apis through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of model apis.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Model APIs",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Model APIs as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Model APIs in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "performance-and-scalability": {
    "eyebrow": "6. Model Serving and Inference",
    "title": "Performance and Scalability",
    "summary": "Learn performance and scalability through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of performance and scalability.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Performance and Scalability",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Performance and Scalability as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Performance and Scalability in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "operational-monitoring": {
    "eyebrow": "7. Monitoring and Reliability",
    "title": "Operational Monitoring",
    "summary": "Learn operational monitoring through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of operational monitoring.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Operational Monitoring",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Operational Monitoring as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Operational Monitoring in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "data-drift": {
    "eyebrow": "7. Monitoring and Reliability",
    "title": "Data Drift",
    "summary": "Learn data drift through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Data drift means input distributions changed.",
      "Drift does not always imply model failure.",
      "Thresholds should reflect business and statistical significance."
    ],
    "workflow": [
      "Define reference and current windows.",
      "Measure feature-level drift.",
      "Prioritise important features.",
      "Investigate causes.",
      "Trigger action only when justified."
    ],
    "mistakes": [
      "Retraining on every statistical difference.",
      "Monitoring aggregate drift only.",
      "Ignoring seasonal changes."
    ],
    "cheat": [
      "Numeric: PSI, KS and Wasserstein",
      "Categorical: distribution difference, chi-square and PSI",
      "Combine drift with performance and operational context"
    ],
    "prompts": [
      {
        "title": "Drift plan",
        "prompt": "Create a data-drift monitoring plan for [MODEL]. Include reference window, metrics, thresholds, segmentation and actions."
      },
      {
        "title": "Drift code",
        "prompt": "Write Python code to calculate PSI, KS test and categorical distribution drift between reference and current datasets."
      }
    ]
  },
  "concept-drift": {
    "eyebrow": "7. Monitoring and Reliability",
    "title": "Concept Drift",
    "summary": "Learn concept drift through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of concept drift.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Concept Drift",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Concept Drift as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Concept Drift in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-performance-monitoring": {
    "eyebrow": "7. Monitoring and Reliability",
    "title": "Model Performance Monitoring",
    "summary": "Learn model performance monitoring through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of model performance monitoring.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Model Performance Monitoring",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Model Performance Monitoring as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Model Performance Monitoring in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "alerting-and-incident-response": {
    "eyebrow": "7. Monitoring and Reliability",
    "title": "Alerting and Incident Response",
    "summary": "Learn alerting and incident response through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of alerting and incident response.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Alerting and Incident Response",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Alerting and Incident Response as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Alerting and Incident Response in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "model-governance": {
    "eyebrow": "8. Governance, Security and Responsible AI",
    "title": "Model Governance",
    "summary": "Learn model governance through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of model governance.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Model Governance",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Model Governance as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Model Governance in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "security-for-ml-systems": {
    "eyebrow": "8. Governance, Security and Responsible AI",
    "title": "Security for ML Systems",
    "summary": "Learn security for ml systems through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of security for ml systems.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Security for ML Systems",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Security for ML Systems as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Security for ML Systems in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "privacy-and-sensitive-data": {
    "eyebrow": "8. Governance, Security and Responsible AI",
    "title": "Privacy and Sensitive Data",
    "summary": "Learn privacy and sensitive data through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of privacy and sensitive data.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Privacy and Sensitive Data",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Privacy and Sensitive Data as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Privacy and Sensitive Data in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "fairness-and-bias-monitoring": {
    "eyebrow": "8. Governance, Security and Responsible AI",
    "title": "Fairness and Bias Monitoring",
    "summary": "Learn fairness and bias monitoring through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of fairness and bias monitoring.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Fairness and Bias Monitoring",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Fairness and Bias Monitoring as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Fairness and Bias Monitoring in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "auditability-and-compliance": {
    "eyebrow": "8. Governance, Security and Responsible AI",
    "title": "Auditability and Compliance",
    "summary": "Learn auditability and compliance through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of auditability and compliance.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Auditability and Compliance",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Auditability and Compliance as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Auditability and Compliance in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "mlops-platform-architecture": {
    "eyebrow": "9. Platform Engineering and Cloud",
    "title": "MLOps Platform Architecture",
    "summary": "Learn mlops platform architecture through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of mlops platform architecture.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# MLOps Platform Architecture",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me MLOps Platform Architecture as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for MLOps Platform Architecture in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "containers-and-kubernetes": {
    "eyebrow": "9. Platform Engineering and Cloud",
    "title": "Containers and Kubernetes",
    "summary": "Learn containers and kubernetes through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Containers package runtime dependencies consistently.",
      "Kubernetes schedules and scales workloads.",
      "ML workloads may require GPUs, persistent storage and batch jobs."
    ],
    "workflow": [
      "Build a minimal image.",
      "Scan and test it.",
      "Define resources and probes.",
      "Deploy configuration and secrets.",
      "Monitor and autoscale."
    ],
    "mistakes": [
      "Huge images with unnecessary tools.",
      "Running as root.",
      "No resource limits or health checks."
    ],
    "cheat": [
      "Dockerfile \u2192 image \u2192 registry \u2192 deployment",
      "Kubernetes: Deployment, Service, Job, CronJob and HPA",
      "Use readiness and liveness probes"
    ],
    "prompts": [
      {
        "title": "Container design",
        "prompt": "Create a secure multi-stage Dockerfile for a Python ML inference service. Use a non-root user and minimal runtime image."
      },
      {
        "title": "Kubernetes deployment",
        "prompt": "Create Kubernetes manifests for an ML API with resource limits, probes, secrets, autoscaling and rolling deployment."
      }
    ]
  },
  "workflow-orchestration": {
    "eyebrow": "9. Platform Engineering and Cloud",
    "title": "Workflow Orchestration",
    "summary": "Learn workflow orchestration through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of workflow orchestration.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Workflow Orchestration",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Workflow Orchestration as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Workflow Orchestration in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "cloud-native-mlops": {
    "eyebrow": "9. Platform Engineering and Cloud",
    "title": "Cloud-Native MLOps",
    "summary": "Learn cloud-native mlops through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of cloud-native mlops.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Cloud-Native MLOps",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Cloud-Native MLOps as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Cloud-Native MLOps in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "cost-optimisation": {
    "eyebrow": "9. Platform Engineering and Cloud",
    "title": "Cost Optimisation",
    "summary": "Learn cost optimisation through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of cost optimisation.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Cost Optimisation",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Cost Optimisation as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Cost Optimisation in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "project-structure-cheat-sheet": {
    "eyebrow": "10. MLOps Best-Practice Cheat Sheets",
    "title": "Project Structure Cheat Sheet",
    "summary": "Learn project structure cheat sheet through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of project structure cheat sheet.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Project Structure Cheat Sheet",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Project Structure Cheat Sheet as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Project Structure Cheat Sheet in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "testing-cheat-sheet": {
    "eyebrow": "10. MLOps Best-Practice Cheat Sheets",
    "title": "Testing Cheat Sheet",
    "summary": "Learn testing cheat sheet through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of testing cheat sheet.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Testing Cheat Sheet",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Testing Cheat Sheet as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Testing Cheat Sheet in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "deployment-cheat-sheet": {
    "eyebrow": "10. MLOps Best-Practice Cheat Sheets",
    "title": "Deployment Cheat Sheet",
    "summary": "Learn deployment cheat sheet through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of deployment cheat sheet.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Deployment Cheat Sheet",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Deployment Cheat Sheet as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Deployment Cheat Sheet in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "monitoring-cheat-sheet": {
    "eyebrow": "10. MLOps Best-Practice Cheat Sheets",
    "title": "Monitoring Cheat Sheet",
    "summary": "Learn monitoring cheat sheet through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of monitoring cheat sheet.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# Monitoring Cheat Sheet",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me Monitoring Cheat Sheet as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for Monitoring Cheat Sheet in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  },
  "mlops-interview-cheat-sheet": {
    "eyebrow": "10. MLOps Best-Practice Cheat Sheets",
    "title": "MLOps Interview Cheat Sheet",
    "summary": "Learn mlops interview cheat sheet through practical architecture guidance, operating workflows, failure modes, cheat sheets and reusable implementation prompts.",
    "concepts": [
      "Understand the purpose and operating principles of mlops interview cheat sheet.",
      "Connect the practice to reproducibility, reliability and governance.",
      "Know which artifacts, owners and checks are required."
    ],
    "workflow": [
      "Define the input, output and owner.",
      "Automate repeatable steps.",
      "Add validation and observability.",
      "Document failure handling and rollback."
    ],
    "mistakes": [
      "Automating an undefined process.",
      "Skipping validation or approvals.",
      "Operating without metrics, ownership or rollback."
    ],
    "cheat": [
      "# MLOps Interview Cheat Sheet",
      "Define \u2192 Automate \u2192 Validate \u2192 Deploy \u2192 Monitor \u2192 Improve",
      "Track data, code, model and environment versions",
      "Every production workflow needs an owner and rollback path"
    ],
    "prompts": [
      {
        "title": "Detailed guide",
        "prompt": "Teach me MLOps Interview Cheat Sheet as an MLOps best practice. Include architecture, workflow, tooling options, failure modes and an implementation checklist."
      },
      {
        "title": "Implementation plan",
        "prompt": "Design an implementation plan for MLOps Interview Cheat Sheet in [ENVIRONMENT]. Include components, artifacts, owners, automation, tests, monitoring and rollout."
      }
    ]
  }
};

function getTheme(theme) {
  const isLight = ["light", "day", "white"].includes(String(theme).toLowerCase());
  return {
    isLight,
    page: isLight ? "bg-[#f7f8fb]" : "bg-[#050b16]",
    sidebar: isLight ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#091321]",
    card: isLight ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#0b1626]",
    text: isLight ? "text-[#101a35]" : "text-white",
    muted: isLight ? "text-slate-600" : "text-slate-400",
    soft: isLight ? "bg-slate-50" : "bg-white/[0.03]",
  };
}

function Sidebar({ theme, activeTopic, setActiveTopic, search, setSearch, mobileOpen, setMobileOpen }) {
  const styles = getTheme(theme);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.map((chapter) => ({
      ...chapter,
      topics: chapter.topics.filter((topic) => topic.title.toLowerCase().includes(q)),
    })).filter((chapter) => chapter.topics.length);
  }, [search]);

  return <>
    {mobileOpen && <button type="button" aria-label="Close chapters" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(330px,100vw)] flex-col border-r transition-transform duration-300 lg:sticky lg:top-0 lg:z-10 lg:h-screen lg:w-[330px] lg:translate-x-0 ${styles.sidebar} ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-5 dark:border-white/[0.08]">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white"><BookOpen className="h-5 w-5" /></span>
          <div><p className={`text-sm font-extrabold ${styles.text}`}>MLOps Best Practices</p><p className={`mt-0.5 text-xs ${styles.muted}`}>50 chapters + cheat sheets</p></div>
        </a>
        <button type="button" onClick={() => setMobileOpen(false)} className={`grid h-11 w-11 place-items-center rounded-lg lg:hidden ${styles.soft} ${styles.muted}`} aria-label="Close chapters"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4"><div className="relative"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search 50 chapters" className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${styles.isLight ? "border-slate-200 bg-slate-50 text-slate-900 focus:border-emerald-400 focus:bg-white" : "border-white/[0.08] bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-emerald-400"}`} /></div></div>
      <nav className="flex-1 overflow-y-auto px-3 pb-5">
        {filtered.map((chapter) => <div key={chapter.id} className="mb-6"><p className={`px-3 text-[11px] font-bold uppercase tracking-[0.12em] ${styles.muted}`}>{chapter.title}</p><div className="mt-2 space-y-1">{chapter.topics.map((topic) => {
          const active = topic.id === activeTopic;
          return <button key={topic.id} type="button" onClick={() => { setActiveTopic(topic.id); setMobileOpen(false); window.scrollTo({top:0, behavior:"smooth"}); }} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${active ? styles.isLight ? "bg-emerald-50 text-emerald-700" : "bg-emerald-500/12 text-emerald-300" : styles.isLight ? "text-slate-600 hover:bg-slate-50" : "text-slate-400 hover:bg-white/[0.04]"}`}><span className="text-sm font-semibold leading-5">{topic.title}</span><span className="shrink-0 text-[10px] opacity-70">{topic.readTime}</span></button>;
        })}</div></div>)}
      </nav>
    </aside>
  </>;
}

function BulletSection({ title, items, icon: Icon, tone, theme }) {
  const styles = getTheme(theme);
  const tones = { blue: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600" };
  return <section className={`border-t py-8 first:border-t-0 first:pt-0 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><div className="flex items-start gap-3"><span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-[18px] w-[18px]" /></span><div className="min-w-0 flex-1"><h2 className={`text-xl font-extrabold tracking-[-0.02em] ${styles.text}`}>{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className={`flex items-start gap-3 ${styles.muted}`}><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" strokeWidth={3} /></span><span className="text-[15px] leading-6">{item}</span></li>)}</ul></div></div></section>;
}

function CheatCard({ items, theme }) {
  const styles = getTheme(theme);
  return <section className={`border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-50 text-cyan-600"><Code2 className="h-[18px] w-[18px]" /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600">Quick cheat sheet</p><h2 className={`mt-1 text-xl font-extrabold ${styles.text}`}>Key patterns, controls and architecture rules</h2></div></div><div className={`mt-5 rounded-[16px] border p-5 ${styles.isLight ? "border-slate-200 bg-[#0f172a]" : "border-white/[0.08] bg-black/35"}`}><pre className="whitespace-pre-wrap font-mono text-[13px] leading-7 text-slate-200">{items.map((item) => `• ${item}`).join("\n")}</pre></div></section>;
}

function PromptCard({ item, index, theme }) {
  const styles = getTheme(theme);
  const [copied, setCopied] = useState(false);
  async function copyPrompt() { try { await navigator.clipboard.writeText(item.prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } }
  return <article className={`rounded-[18px] border p-5 sm:p-6 ${styles.isLight ? "border-emerald-100 bg-emerald-50/60" : "border-emerald-400/15 bg-emerald-500/[0.06]"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-600">Prompt {index+1}</p><h3 className={`mt-2 text-lg font-extrabold ${styles.text}`}>{item.title}</h3></div><button type="button" onClick={copyPrompt} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${styles.isLight ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-white/[0.08] bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]"}`}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button></div><pre className={`mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl p-5 font-mono text-[13px] leading-6 ${styles.isLight ? "bg-[#0f172a] text-slate-200" : "bg-black/35 text-slate-200"}`}>{item.prompt}</pre></article>;
}

export default function MLOpsBestPracticesPage({ theme = "light" }) {
  const styles = getTheme(theme);
  const [activeTopic, setActiveTopic] = useState("what-is-mlops");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const allTopics = useMemo(() => chapters.flatMap((chapter) => chapter.topics), []);
  const activeIndex = allTopics.findIndex((topic) => topic.id === activeTopic);
  const current = topicContent[activeTopic] || topicContent["what-is-mlops"];
  const previousTopic = activeIndex > 0 ? allTopics[activeIndex - 1] : null;
  const nextTopic = activeIndex < allTopics.length - 1 ? allTopics[activeIndex + 1] : null;
  function changeTopic(topic) { if (!topic) return; setActiveTopic(topic.id); window.scrollTo({top:0, behavior:"smooth"}); }

  return <main className={`min-h-screen ${styles.page}`}><div className="lg:grid lg:grid-cols-[330px_minmax(0,1fr)]"><Sidebar theme={theme} activeTopic={activeTopic} setActiveTopic={setActiveTopic} search={search} setSearch={setSearch} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className="min-w-0"><header className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-6 lg:px-10 ${styles.isLight ? "border-slate-200 bg-white/90" : "border-white/[0.08] bg-[#050b16]/90"}`}><div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${styles.soft} ${styles.text}`}><Menu className="h-5 w-5" /></button><a href="/" className={`inline-flex items-center gap-2 text-sm font-semibold ${styles.muted}`}><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Learning materials</span></a></div><div className={`text-xs font-semibold ${styles.muted}`}>Chapter {activeIndex+1} of {allTopics.length}</div></header><div className="mx-auto max-w-[960px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"><article className={`overflow-hidden rounded-[24px] border ${styles.card}`}><div className="p-6 sm:p-9 lg:p-12"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{current.eyebrow}</span><span className={`text-xs font-semibold ${styles.muted}`}>{allTopics[activeIndex]?.readTime}</span></div><h1 className={`mt-6 text-[38px] font-black leading-[1.05] tracking-[-0.045em] sm:text-[52px] ${styles.text}`}>{current.title}</h1><p className={`mt-5 max-w-3xl text-lg leading-8 ${styles.muted}`}>{current.summary}</p><div className="mt-10"><BulletSection title="What you need to understand" items={current.concepts} icon={Sparkles} tone="blue" theme={theme} /><BulletSection title="Recommended workflow" items={current.workflow} icon={Lightbulb} tone="amber" theme={theme} /><BulletSection title="Common mistakes to avoid" items={current.mistakes} icon={ShieldAlert} tone="rose" theme={theme} /><CheatCard items={current.cheat} theme={theme} /></div><section className={`mt-8 border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">Ready-to-use prompts</p><h2 className={`mt-2 text-2xl font-black ${styles.text}`}>Design, automate and operate</h2><p className={`mt-2 leading-7 ${styles.muted}`}>Replace the bracketed placeholders with your own platform, model and deployment environment.</p><div className="mt-6 space-y-4">{current.prompts.map((prompt,index) => <PromptCard key={prompt.title} item={prompt} index={index} theme={theme} />)}</div></section></div></article><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" disabled={!previousTopic} onClick={() => changeTopic(previousTopic)} className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-emerald-200" : "border-white/[0.08] bg-white/[0.03] hover:border-emerald-400/30"}`}><ChevronLeft className={`h-5 w-5 ${styles.muted}`} /><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Previous chapter</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{previousTopic?.title || "You are at the beginning"}</span></span></button><button type="button" disabled={!nextTopic} onClick={() => changeTopic(nextTopic)} className={`flex min-h-[68px] items-center justify-between gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-emerald-200" : "border-white/[0.08] bg-white/[0.03] hover:border-emerald-400/30"}`}><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Next chapter</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{nextTopic?.title || "Guide completed"}</span></span><ChevronRight className={`h-5 w-5 ${styles.muted}`} /></button></div></div></div></div></main>;
}

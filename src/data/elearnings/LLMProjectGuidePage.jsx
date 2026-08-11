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
    "title": "1. Use-Case Strategy",
    "topics": [
      {
        "id": "what-makes-an-llm-project-succeed",
        "title": "What Makes an LLM Project Succeed",
        "readTime": "12 min"
      },
      {
        "id": "problem-framing",
        "title": "Problem Framing",
        "readTime": "12 min"
      },
      {
        "id": "task-fit-for-llms",
        "title": "Task Fit for LLMs",
        "readTime": "12 min"
      },
      {
        "id": "business-value-and-roi",
        "title": "Business Value and ROI",
        "readTime": "12 min"
      },
      {
        "id": "risk-review",
        "title": "Risk Review",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-2",
    "title": "2. Product and System Design",
    "topics": [
      {
        "id": "user-journey-design",
        "title": "User Journey Design",
        "readTime": "12 min"
      },
      {
        "id": "llm-application-architecture",
        "title": "LLM Application Architecture",
        "readTime": "12 min"
      },
      {
        "id": "prompt-architecture",
        "title": "Prompt Architecture",
        "readTime": "12 min"
      },
      {
        "id": "structured-outputs",
        "title": "Structured Outputs",
        "readTime": "12 min"
      },
      {
        "id": "fallback-strategies",
        "title": "Fallback Strategies",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-3",
    "title": "3. Retrieval-Augmented Generation",
    "topics": [
      {
        "id": "rag-fundamentals",
        "title": "RAG Fundamentals",
        "readTime": "12 min"
      },
      {
        "id": "document-ingestion",
        "title": "Document Ingestion",
        "readTime": "12 min"
      },
      {
        "id": "chunking-strategies",
        "title": "Chunking Strategies",
        "readTime": "12 min"
      },
      {
        "id": "embeddings-and-vector-search",
        "title": "Embeddings and Vector Search",
        "readTime": "12 min"
      },
      {
        "id": "retrieval-quality",
        "title": "Retrieval Quality",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-4",
    "title": "4. Context, Memory and Tools",
    "topics": [
      {
        "id": "context-window-management",
        "title": "Context Window Management",
        "readTime": "12 min"
      },
      {
        "id": "conversation-memory",
        "title": "Conversation Memory",
        "readTime": "12 min"
      },
      {
        "id": "tool-calling",
        "title": "Tool Calling",
        "readTime": "12 min"
      },
      {
        "id": "function-schemas",
        "title": "Function Schemas",
        "readTime": "12 min"
      },
      {
        "id": "agentic-workflows",
        "title": "Agentic Workflows",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-5",
    "title": "5. Prompt Engineering",
    "topics": [
      {
        "id": "system-prompts",
        "title": "System Prompts",
        "readTime": "12 min"
      },
      {
        "id": "few-shot-prompting",
        "title": "Few-Shot Prompting",
        "readTime": "12 min"
      },
      {
        "id": "prompt-templates",
        "title": "Prompt Templates",
        "readTime": "12 min"
      },
      {
        "id": "prompt-chaining",
        "title": "Prompt Chaining",
        "readTime": "12 min"
      },
      {
        "id": "prompt-versioning",
        "title": "Prompt Versioning",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-6",
    "title": "6. Evaluation and Testing",
    "topics": [
      {
        "id": "evaluation-datasets",
        "title": "Evaluation Datasets",
        "readTime": "12 min"
      },
      {
        "id": "golden-test-cases",
        "title": "Golden Test Cases",
        "readTime": "12 min"
      },
      {
        "id": "llm-as-a-judge",
        "title": "LLM-as-a-Judge",
        "readTime": "12 min"
      },
      {
        "id": "prompt-regression-testing",
        "title": "Prompt Regression Testing",
        "readTime": "12 min"
      },
      {
        "id": "human-evaluation",
        "title": "Human Evaluation",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-7",
    "title": "7. Safety and Guardrails",
    "topics": [
      {
        "id": "hallucination-reduction",
        "title": "Hallucination Reduction",
        "readTime": "12 min"
      },
      {
        "id": "grounding-and-citations",
        "title": "Grounding and Citations",
        "readTime": "12 min"
      },
      {
        "id": "prompt-injection-defence",
        "title": "Prompt Injection Defence",
        "readTime": "12 min"
      },
      {
        "id": "content-guardrails",
        "title": "Content Guardrails",
        "readTime": "12 min"
      },
      {
        "id": "human-in-the-loop",
        "title": "Human-in-the-Loop",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-8",
    "title": "8. Production and Observability",
    "topics": [
      {
        "id": "tracing-and-logging",
        "title": "Tracing and Logging",
        "readTime": "12 min"
      },
      {
        "id": "latency-and-cost-optimisation",
        "title": "Latency and Cost Optimisation",
        "readTime": "12 min"
      },
      {
        "id": "caching-strategies",
        "title": "Caching Strategies",
        "readTime": "12 min"
      },
      {
        "id": "deployment-patterns",
        "title": "Deployment Patterns",
        "readTime": "12 min"
      },
      {
        "id": "monitoring-and-alerts",
        "title": "Monitoring and Alerts",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-9",
    "title": "9. Project Delivery",
    "topics": [
      {
        "id": "prototype-planning",
        "title": "Prototype Planning",
        "readTime": "12 min"
      },
      {
        "id": "mvp-scope",
        "title": "MVP Scope",
        "readTime": "12 min"
      },
      {
        "id": "team-roles-and-ownership",
        "title": "Team Roles and Ownership",
        "readTime": "12 min"
      },
      {
        "id": "launch-checklist",
        "title": "Launch Checklist",
        "readTime": "12 min"
      },
      {
        "id": "post-launch-improvement",
        "title": "Post-Launch Improvement",
        "readTime": "12 min"
      }
    ]
  },
  {
    "id": "group-10",
    "title": "10. LLM Project Cheat Sheets",
    "topics": [
      {
        "id": "use-case-selection-cheat-sheet",
        "title": "Use-Case Selection Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "rag-cheat-sheet",
        "title": "RAG Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "prompting-cheat-sheet",
        "title": "Prompting Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "evaluation-cheat-sheet",
        "title": "Evaluation Cheat Sheet",
        "readTime": "12 min"
      },
      {
        "id": "llm-project-interview-cheat-sheet",
        "title": "LLM Project Interview Cheat Sheet",
        "readTime": "12 min"
      }
    ]
  }
];
export const topicContent = {
  "what-makes-an-llm-project-succeed": {
    "eyebrow": "1. Use-Case Strategy",
    "title": "What Makes an LLM Project Succeed",
    "summary": "Learn what makes an llm project succeed through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Strong projects start with a real user task and measurable outcome.",
      "Reliability depends on system design, not only model choice.",
      "The best first version solves one narrow workflow well."
    ],
    "workflow": [
      "Define the user, task and success metric.",
      "Assess risk and acceptable error cost.",
      "Choose prompt-only, RAG, tools or agent workflow.",
      "Build a small evaluation set before implementation."
    ],
    "mistakes": [
      "Starting from a model instead of a problem.",
      "Building a broad assistant with unclear boundaries.",
      "Launching without measurable evaluation criteria."
    ],
    "cheat": [
      "User \u2192 Task \u2192 Context \u2192 Model \u2192 Output \u2192 Review \u2192 Action",
      "Best first use cases are narrow, frequent and reviewable",
      "Success = usefulness + reliability + acceptable cost"
    ],
    "prompts": [
      [
        "Project discovery",
        "Interview me about an LLM product idea. Ask about users, workflow, inputs, outputs, risk, review process and success metrics. Then recommend the best project scope."
      ],
      [
        "Project scorecard",
        "Score this LLM idea from 1-10 for user value, model fit, data availability, risk, measurability and implementation complexity. Idea: [PASTE]."
      ]
    ]
  },
  "problem-framing": {
    "eyebrow": "1. Use-Case Strategy",
    "title": "Problem Framing",
    "summary": "Learn problem framing through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of problem framing in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Problem Framing",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Problem Framing for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Problem Framing in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "task-fit-for-llms": {
    "eyebrow": "1. Use-Case Strategy",
    "title": "Task Fit for LLMs",
    "summary": "Learn task fit for llms through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of task fit for llms in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Task Fit for LLMs",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Task Fit for LLMs for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Task Fit for LLMs in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "business-value-and-roi": {
    "eyebrow": "1. Use-Case Strategy",
    "title": "Business Value and ROI",
    "summary": "Learn business value and roi through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of business value and roi in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Business Value and ROI",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Business Value and ROI for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Business Value and ROI in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "risk-review": {
    "eyebrow": "1. Use-Case Strategy",
    "title": "Risk Review",
    "summary": "Learn risk review through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of risk review in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Risk Review",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Risk Review for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Risk Review in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "user-journey-design": {
    "eyebrow": "2. Product and System Design",
    "title": "User Journey Design",
    "summary": "Learn user journey design through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of user journey design in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# User Journey Design",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me User Journey Design for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for User Journey Design in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "llm-application-architecture": {
    "eyebrow": "2. Product and System Design",
    "title": "LLM Application Architecture",
    "summary": "Learn llm application architecture through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of llm application architecture in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# LLM Application Architecture",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me LLM Application Architecture for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for LLM Application Architecture in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompt-architecture": {
    "eyebrow": "2. Product and System Design",
    "title": "Prompt Architecture",
    "summary": "Learn prompt architecture through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prompt architecture in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prompt Architecture",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prompt Architecture for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prompt Architecture in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "structured-outputs": {
    "eyebrow": "2. Product and System Design",
    "title": "Structured Outputs",
    "summary": "Learn structured outputs through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of structured outputs in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Structured Outputs",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Structured Outputs for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Structured Outputs in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "fallback-strategies": {
    "eyebrow": "2. Product and System Design",
    "title": "Fallback Strategies",
    "summary": "Learn fallback strategies through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of fallback strategies in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Fallback Strategies",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Fallback Strategies for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Fallback Strategies in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "rag-fundamentals": {
    "eyebrow": "3. Retrieval-Augmented Generation",
    "title": "RAG Fundamentals",
    "summary": "Learn rag fundamentals through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "RAG retrieves trusted context before generating an answer.",
      "Retrieval quality often matters more than model size.",
      "RAG reduces unsupported recall but does not eliminate hallucinations."
    ],
    "workflow": [
      "Ingest and clean source documents.",
      "Chunk and embed content.",
      "Retrieve relevant passages.",
      "Construct grounded prompts.",
      "Return citations and fallback when evidence is insufficient."
    ],
    "mistakes": [
      "Using arbitrary chunk sizes.",
      "Retrieving too many irrelevant documents.",
      "Allowing the model to answer without sufficient evidence."
    ],
    "cheat": [
      "Ingest \u2192 Chunk \u2192 Embed \u2192 Index \u2192 Retrieve \u2192 Rerank \u2192 Generate",
      "Measure retrieval before generation",
      "Use citation IDs and explicit fallback behaviour"
    ],
    "prompts": [
      [
        "RAG architecture",
        "Design a RAG system for [USE CASE]. Include ingestion, chunking, metadata, embedding model, retrieval, reranking, prompting, citations and evaluation."
      ],
      [
        "Grounded prompt",
        "Write a system prompt for a RAG assistant that must use only retrieved context, cite sources and say when evidence is insufficient."
      ]
    ]
  },
  "document-ingestion": {
    "eyebrow": "3. Retrieval-Augmented Generation",
    "title": "Document Ingestion",
    "summary": "Learn document ingestion through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of document ingestion in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Document Ingestion",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Document Ingestion for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Document Ingestion in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "chunking-strategies": {
    "eyebrow": "3. Retrieval-Augmented Generation",
    "title": "Chunking Strategies",
    "summary": "Learn chunking strategies through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of chunking strategies in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Chunking Strategies",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Chunking Strategies for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Chunking Strategies in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "embeddings-and-vector-search": {
    "eyebrow": "3. Retrieval-Augmented Generation",
    "title": "Embeddings and Vector Search",
    "summary": "Learn embeddings and vector search through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of embeddings and vector search in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Embeddings and Vector Search",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Embeddings and Vector Search for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Embeddings and Vector Search in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "retrieval-quality": {
    "eyebrow": "3. Retrieval-Augmented Generation",
    "title": "Retrieval Quality",
    "summary": "Learn retrieval quality through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of retrieval quality in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Retrieval Quality",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Retrieval Quality for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Retrieval Quality in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "context-window-management": {
    "eyebrow": "4. Context, Memory and Tools",
    "title": "Context Window Management",
    "summary": "Learn context window management through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of context window management in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Context Window Management",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Context Window Management for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Context Window Management in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "conversation-memory": {
    "eyebrow": "4. Context, Memory and Tools",
    "title": "Conversation Memory",
    "summary": "Learn conversation memory through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of conversation memory in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Conversation Memory",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Conversation Memory for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Conversation Memory in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "tool-calling": {
    "eyebrow": "4. Context, Memory and Tools",
    "title": "Tool Calling",
    "summary": "Learn tool calling through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Tool calling lets the model request structured application actions.",
      "Tools need narrow scope, explicit schemas and validation.",
      "Consequential actions should require confirmation or approval."
    ],
    "workflow": [
      "Define the tool purpose.",
      "Create a typed input schema.",
      "Describe when the tool should be called.",
      "Validate permissions and arguments.",
      "Return structured success or error results."
    ],
    "mistakes": [
      "Giving broad backend access.",
      "Using vague parameter names.",
      "Trusting model-provided identifiers without validation."
    ],
    "cheat": [
      "Tool = name + description + JSON schema + validation + error contract",
      "Read tools and write tools should have different controls",
      "Require confirmation for high-impact actions"
    ],
    "prompts": [
      [
        "Tool schema",
        "Design a function-calling tool for [ACTION]. Include name, description, JSON schema, validation rules, examples, error responses and safety constraints."
      ],
      [
        "Tool audit",
        "Review this tool definition for ambiguity, excessive permissions, missing validation and confirmation requirements. Tool: [PASTE]."
      ]
    ]
  },
  "function-schemas": {
    "eyebrow": "4. Context, Memory and Tools",
    "title": "Function Schemas",
    "summary": "Learn function schemas through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of function schemas in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Function Schemas",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Function Schemas for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Function Schemas in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "agentic-workflows": {
    "eyebrow": "4. Context, Memory and Tools",
    "title": "Agentic Workflows",
    "summary": "Learn agentic workflows through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of agentic workflows in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Agentic Workflows",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Agentic Workflows for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Agentic Workflows in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "system-prompts": {
    "eyebrow": "5. Prompt Engineering",
    "title": "System Prompts",
    "summary": "Learn system prompts through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of system prompts in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# System Prompts",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me System Prompts for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for System Prompts in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "few-shot-prompting": {
    "eyebrow": "5. Prompt Engineering",
    "title": "Few-Shot Prompting",
    "summary": "Learn few-shot prompting through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of few-shot prompting in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Few-Shot Prompting",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Few-Shot Prompting for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Few-Shot Prompting in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompt-templates": {
    "eyebrow": "5. Prompt Engineering",
    "title": "Prompt Templates",
    "summary": "Learn prompt templates through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prompt templates in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prompt Templates",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prompt Templates for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prompt Templates in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompt-chaining": {
    "eyebrow": "5. Prompt Engineering",
    "title": "Prompt Chaining",
    "summary": "Learn prompt chaining through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prompt chaining in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prompt Chaining",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prompt Chaining for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prompt Chaining in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompt-versioning": {
    "eyebrow": "5. Prompt Engineering",
    "title": "Prompt Versioning",
    "summary": "Learn prompt versioning through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prompt versioning in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prompt Versioning",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prompt Versioning for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prompt Versioning in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "evaluation-datasets": {
    "eyebrow": "6. Evaluation and Testing",
    "title": "Evaluation Datasets",
    "summary": "Learn evaluation datasets through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Evaluation data should represent real user tasks and edge cases.",
      "Each example needs an expected outcome or scoring rubric.",
      "Evaluation sets should be versioned and reviewed."
    ],
    "workflow": [
      "Collect representative user queries.",
      "Add normal, ambiguous and adversarial cases.",
      "Define expected behaviour and failure conditions.",
      "Version the dataset.",
      "Run it before every release."
    ],
    "mistakes": [
      "Using only happy-path examples.",
      "Creating tests after launch.",
      "Changing prompts without rerunning evaluations."
    ],
    "cheat": [
      "Test set = query + context + expected behaviour + rubric + tags",
      "Include normal, edge, adversarial and no-answer cases",
      "Version test data with prompts and model configuration"
    ],
    "prompts": [
      [
        "Eval set builder",
        "Create a 50-case evaluation dataset for [LLM APP]. Include happy paths, ambiguity, missing context, adversarial prompts and safety cases."
      ],
      [
        "Rubric builder",
        "Create a scoring rubric for [TASK] covering correctness, completeness, groundedness, style, safety and actionability."
      ]
    ]
  },
  "golden-test-cases": {
    "eyebrow": "6. Evaluation and Testing",
    "title": "Golden Test Cases",
    "summary": "Learn golden test cases through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of golden test cases in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Golden Test Cases",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Golden Test Cases for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Golden Test Cases in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "llm-as-a-judge": {
    "eyebrow": "6. Evaluation and Testing",
    "title": "LLM-as-a-Judge",
    "summary": "Learn llm-as-a-judge through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of llm-as-a-judge in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# LLM-as-a-Judge",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me LLM-as-a-Judge for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for LLM-as-a-Judge in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompt-regression-testing": {
    "eyebrow": "6. Evaluation and Testing",
    "title": "Prompt Regression Testing",
    "summary": "Learn prompt regression testing through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prompt regression testing in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prompt Regression Testing",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prompt Regression Testing for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prompt Regression Testing in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "human-evaluation": {
    "eyebrow": "6. Evaluation and Testing",
    "title": "Human Evaluation",
    "summary": "Learn human evaluation through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of human evaluation in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Human Evaluation",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Human Evaluation for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Human Evaluation in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "hallucination-reduction": {
    "eyebrow": "7. Safety and Guardrails",
    "title": "Hallucination Reduction",
    "summary": "Learn hallucination reduction through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of hallucination reduction in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Hallucination Reduction",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Hallucination Reduction for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Hallucination Reduction in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "grounding-and-citations": {
    "eyebrow": "7. Safety and Guardrails",
    "title": "Grounding and Citations",
    "summary": "Learn grounding and citations through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of grounding and citations in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Grounding and Citations",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Grounding and Citations for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Grounding and Citations in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompt-injection-defence": {
    "eyebrow": "7. Safety and Guardrails",
    "title": "Prompt Injection Defence",
    "summary": "Learn prompt injection defence through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Prompt injection attempts to override system instructions or misuse tools.",
      "Retrieved content must be treated as untrusted input.",
      "Security requires both prompt rules and application controls."
    ],
    "workflow": [
      "Separate instructions from untrusted content.",
      "Restrict tools and data access.",
      "Validate outputs and actions.",
      "Test adversarial inputs.",
      "Log and review suspicious behaviour."
    ],
    "mistakes": [
      "Relying on one defensive prompt.",
      "Allowing documents to define behaviour.",
      "Letting the model choose unrestricted actions."
    ],
    "cheat": [
      "Never trust retrieved text as instructions",
      "Enforce permissions outside the model",
      "Use allowlists, confirmation and output validation"
    ],
    "prompts": [
      [
        "Injection test plan",
        "Create a prompt-injection test suite for [LLM APP]. Include direct, indirect, tool-abuse, data-exfiltration and role-confusion attacks."
      ],
      [
        "Security review",
        "Review this LLM architecture for prompt injection, data leakage and unsafe tool use. Return risks and mitigations. Architecture: [PASTE]."
      ]
    ]
  },
  "content-guardrails": {
    "eyebrow": "7. Safety and Guardrails",
    "title": "Content Guardrails",
    "summary": "Learn content guardrails through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of content guardrails in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Content Guardrails",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Content Guardrails for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Content Guardrails in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "human-in-the-loop": {
    "eyebrow": "7. Safety and Guardrails",
    "title": "Human-in-the-Loop",
    "summary": "Learn human-in-the-loop through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of human-in-the-loop in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Human-in-the-Loop",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Human-in-the-Loop for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Human-in-the-Loop in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "tracing-and-logging": {
    "eyebrow": "8. Production and Observability",
    "title": "Tracing and Logging",
    "summary": "Learn tracing and logging through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Tracing captures the full request path across prompts, retrieval and tools.",
      "Logs should support debugging without exposing sensitive data.",
      "Observability should connect quality, latency and cost."
    ],
    "workflow": [
      "Assign a trace ID.",
      "Record prompt version and model config.",
      "Log retrieval and tool events.",
      "Capture latency, tokens and errors.",
      "Redact sensitive fields."
    ],
    "mistakes": [
      "Logging full private prompts.",
      "Tracking only final responses.",
      "No correlation ID across components."
    ],
    "cheat": [
      "Trace: request \u2192 retrieval \u2192 prompt \u2192 model \u2192 tools \u2192 response",
      "Track latency, tokens, cost, failures and quality signals",
      "Redact secrets and sensitive data"
    ],
    "prompts": [
      [
        "Observability design",
        "Design tracing and logging for [LLM APP]. Include trace schema, redaction, latency, token, cost, retrieval and tool metrics."
      ],
      [
        "Incident analysis",
        "Create an incident-analysis template for failed LLM requests using traces, prompts, retrieved context, tool calls and final output."
      ]
    ]
  },
  "latency-and-cost-optimisation": {
    "eyebrow": "8. Production and Observability",
    "title": "Latency and Cost Optimisation",
    "summary": "Learn latency and cost optimisation through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of latency and cost optimisation in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Latency and Cost Optimisation",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Latency and Cost Optimisation for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Latency and Cost Optimisation in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "caching-strategies": {
    "eyebrow": "8. Production and Observability",
    "title": "Caching Strategies",
    "summary": "Learn caching strategies through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of caching strategies in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Caching Strategies",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Caching Strategies for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Caching Strategies in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "deployment-patterns": {
    "eyebrow": "8. Production and Observability",
    "title": "Deployment Patterns",
    "summary": "Learn deployment patterns through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of deployment patterns in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Deployment Patterns",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Deployment Patterns for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Deployment Patterns in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "monitoring-and-alerts": {
    "eyebrow": "8. Production and Observability",
    "title": "Monitoring and Alerts",
    "summary": "Learn monitoring and alerts through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of monitoring and alerts in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Monitoring and Alerts",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Monitoring and Alerts for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Monitoring and Alerts in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prototype-planning": {
    "eyebrow": "9. Project Delivery",
    "title": "Prototype Planning",
    "summary": "Learn prototype planning through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prototype planning in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prototype Planning",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prototype Planning for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prototype Planning in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "mvp-scope": {
    "eyebrow": "9. Project Delivery",
    "title": "MVP Scope",
    "summary": "Learn mvp scope through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of mvp scope in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# MVP Scope",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me MVP Scope for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for MVP Scope in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "team-roles-and-ownership": {
    "eyebrow": "9. Project Delivery",
    "title": "Team Roles and Ownership",
    "summary": "Learn team roles and ownership through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of team roles and ownership in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Team Roles and Ownership",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Team Roles and Ownership for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Team Roles and Ownership in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "launch-checklist": {
    "eyebrow": "9. Project Delivery",
    "title": "Launch Checklist",
    "summary": "Learn launch checklist through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of launch checklist in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Launch Checklist",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Launch Checklist for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Launch Checklist in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "post-launch-improvement": {
    "eyebrow": "9. Project Delivery",
    "title": "Post-Launch Improvement",
    "summary": "Learn post-launch improvement through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of post-launch improvement in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Post-Launch Improvement",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Post-Launch Improvement for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Post-Launch Improvement in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "use-case-selection-cheat-sheet": {
    "eyebrow": "10. LLM Project Cheat Sheets",
    "title": "Use-Case Selection Cheat Sheet",
    "summary": "Learn use-case selection cheat sheet through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of use-case selection cheat sheet in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Use-Case Selection Cheat Sheet",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Use-Case Selection Cheat Sheet for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Use-Case Selection Cheat Sheet in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "rag-cheat-sheet": {
    "eyebrow": "10. LLM Project Cheat Sheets",
    "title": "RAG Cheat Sheet",
    "summary": "Learn rag cheat sheet through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of rag cheat sheet in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# RAG Cheat Sheet",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me RAG Cheat Sheet for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for RAG Cheat Sheet in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "prompting-cheat-sheet": {
    "eyebrow": "10. LLM Project Cheat Sheets",
    "title": "Prompting Cheat Sheet",
    "summary": "Learn prompting cheat sheet through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of prompting cheat sheet in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Prompting Cheat Sheet",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Prompting Cheat Sheet for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Prompting Cheat Sheet in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "evaluation-cheat-sheet": {
    "eyebrow": "10. LLM Project Cheat Sheets",
    "title": "Evaluation Cheat Sheet",
    "summary": "Learn evaluation cheat sheet through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of evaluation cheat sheet in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# Evaluation Cheat Sheet",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me Evaluation Cheat Sheet for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for Evaluation Cheat Sheet in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
    ]
  },
  "llm-project-interview-cheat-sheet": {
    "eyebrow": "10. LLM Project Cheat Sheets",
    "title": "LLM Project Interview Cheat Sheet",
    "summary": "Learn llm project interview cheat sheet through product strategy, architecture guidance, implementation workflows, common mistakes, cheat sheets and reusable prompts.",
    "concepts": [
      "Understand the purpose of llm project interview cheat sheet in an LLM application.",
      "Connect the topic to reliability, maintainability and user value.",
      "Know when the practice is necessary and when a simpler design is enough."
    ],
    "workflow": [
      "Define the objective and required inputs.",
      "Choose the simplest workable design.",
      "Add validation and evaluation.",
      "Document failure behaviour.",
      "Measure quality, latency and cost."
    ],
    "mistakes": [
      "Adding complexity before proving value.",
      "Skipping evaluation or fallback design.",
      "Changing multiple system components without versioning."
    ],
    "cheat": [
      "# LLM Project Interview Cheat Sheet",
      "Design \u2192 Build \u2192 Evaluate \u2192 Guard \u2192 Deploy \u2192 Monitor",
      "Track prompts, model, retrieval, tools and evaluation versions",
      "Every production path needs fallback and observability"
    ],
    "prompts": [
      [
        "Detailed guide",
        "Teach me LLM Project Interview Cheat Sheet for an LLM project. Include architecture, workflow, implementation options, trade-offs, failure modes and a checklist."
      ],
      [
        "Implementation plan",
        "Design an implementation plan for LLM Project Interview Cheat Sheet in [LLM PROJECT]. Include components, data, prompts, tools, tests, monitoring and rollout."
      ]
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
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white"><BookOpen className="h-5 w-5" /></span>
          <div><p className={`text-sm font-extrabold ${styles.text}`}>LLM Project Guide</p><p className={`mt-0.5 text-xs ${styles.muted}`}>50 chapters + cheat sheets</p></div>
        </a>
        <button type="button" onClick={() => setMobileOpen(false)} className={`grid h-11 w-11 place-items-center rounded-lg lg:hidden ${styles.soft} ${styles.muted}`} aria-label="Close chapters"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4"><div className="relative"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search 50 chapters" className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${styles.isLight ? "border-slate-200 bg-slate-50 text-slate-900 focus:border-violet-400 focus:bg-white" : "border-white/[0.08] bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-violet-400"}`} /></div></div>
      <nav className="flex-1 overflow-y-auto px-3 pb-5">
        {filtered.map((chapter) => <div key={chapter.id} className="mb-6"><p className={`px-3 text-[11px] font-bold uppercase tracking-[0.12em] ${styles.muted}`}>{chapter.title}</p><div className="mt-2 space-y-1">{chapter.topics.map((topic) => {
          const active = topic.id === activeTopic;
          return <button key={topic.id} type="button" onClick={() => { setActiveTopic(topic.id); setMobileOpen(false); window.scrollTo({top:0, behavior:"smooth"}); }} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${active ? styles.isLight ? "bg-violet-50 text-violet-700" : "bg-violet-500/12 text-violet-300" : styles.isLight ? "text-slate-600 hover:bg-slate-50" : "text-slate-400 hover:bg-white/[0.04]"}`}><span className="text-sm font-semibold leading-5">{topic.title}</span><span className="shrink-0 text-[10px] opacity-70">{topic.readTime}</span></button>;
        })}</div></div>)}
      </nav>
    </aside>
  </>;
}

function BulletSection({ title, items, icon: Icon, tone, theme }) {
  const styles = getTheme(theme);
  const tones = { violet: "bg-violet-50 text-violet-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600" };
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
  return <article className={`rounded-[18px] border p-5 sm:p-6 ${styles.isLight ? "border-violet-100 bg-violet-50/60" : "border-violet-400/15 bg-violet-500/[0.06]"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-600">Prompt {index+1}</p><h3 className={`mt-2 text-lg font-extrabold ${styles.text}`}>{item.title}</h3></div><button type="button" onClick={copyPrompt} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${styles.isLight ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-white/[0.08] bg-white/[0.04] text-slate-200 hover:bg-white/[0.07]"}`}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button></div><pre className={`mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl p-5 font-mono text-[13px] leading-6 ${styles.isLight ? "bg-[#0f172a] text-slate-200" : "bg-black/35 text-slate-200"}`}>{item.prompt}</pre></article>;
}

export default function LlmProjectGuidePage({ theme = "light" }) {
  const styles = getTheme(theme);
  const [activeTopic, setActiveTopic] = useState("what-makes-an-llm-project-succeed");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const allTopics = useMemo(() => chapters.flatMap((chapter) => chapter.topics), []);
  const activeIndex = allTopics.findIndex((topic) => topic.id === activeTopic);
  const current = topicContent[activeTopic] || topicContent["what-makes-an-llm-project-succeed"];
  const previousTopic = activeIndex > 0 ? allTopics[activeIndex - 1] : null;
  const nextTopic = activeIndex < allTopics.length - 1 ? allTopics[activeIndex + 1] : null;
  function changeTopic(topic) { if (!topic) return; setActiveTopic(topic.id); window.scrollTo({top:0, behavior:"smooth"}); }

  return <main className={`min-h-screen ${styles.page}`}><div className="lg:grid lg:grid-cols-[330px_minmax(0,1fr)]"><Sidebar theme={theme} activeTopic={activeTopic} setActiveTopic={setActiveTopic} search={search} setSearch={setSearch} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className="min-w-0"><header className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-6 lg:px-10 ${styles.isLight ? "border-slate-200 bg-white/90" : "border-white/[0.08] bg-[#050b16]/90"}`}><div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${styles.soft} ${styles.text}`}><Menu className="h-5 w-5" /></button><a href="/" className={`inline-flex items-center gap-2 text-sm font-semibold ${styles.muted}`}><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Learning materials</span></a></div><div className={`text-xs font-semibold ${styles.muted}`}>Chapter {activeIndex+1} of {allTopics.length}</div></header><div className="mx-auto max-w-[960px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"><article className={`overflow-hidden rounded-[24px] border ${styles.card}`}><div className="p-6 sm:p-9 lg:p-12"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">{current.eyebrow}</span><span className={`text-xs font-semibold ${styles.muted}`}>{allTopics[activeIndex]?.readTime}</span></div><h1 className={`mt-6 text-[38px] font-black leading-[1.05] tracking-[-0.045em] sm:text-[52px] ${styles.text}`}>{current.title}</h1><p className={`mt-5 max-w-3xl text-lg leading-8 ${styles.muted}`}>{current.summary}</p><div className="mt-10"><BulletSection title="What you need to understand" items={current.concepts} icon={Sparkles} tone="violet" theme={theme} /><BulletSection title="Recommended workflow" items={current.workflow} icon={Lightbulb} tone="amber" theme={theme} /><BulletSection title="Common mistakes to avoid" items={current.mistakes} icon={ShieldAlert} tone="rose" theme={theme} /><CheatCard items={current.cheat} theme={theme} /></div><section className={`mt-8 border-t pt-8 ${styles.isLight ? "border-slate-200" : "border-white/[0.08]"}`}><p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600">Ready-to-use prompts</p><h2 className={`mt-2 text-2xl font-black ${styles.text}`}>Plan, build and evaluate</h2><p className={`mt-2 leading-7 ${styles.muted}`}>Replace the bracketed placeholders with your own use case, documents, tools and product constraints.</p><div className="mt-6 space-y-4">{current.prompts.map((prompt,index) => <PromptCard key={prompt.title} item={prompt} index={index} theme={theme} />)}</div></section></div></article><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" disabled={!previousTopic} onClick={() => changeTopic(previousTopic)} className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-violet-200" : "border-white/[0.08] bg-white/[0.03] hover:border-violet-400/30"}`}><ChevronLeft className={`h-5 w-5 ${styles.muted}`} /><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Previous chapter</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{previousTopic?.title || "You are at the beginning"}</span></span></button><button type="button" disabled={!nextTopic} onClick={() => changeTopic(nextTopic)} className={`flex min-h-[68px] items-center justify-between gap-3 rounded-2xl border px-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.isLight ? "border-slate-200 bg-white hover:border-violet-200" : "border-white/[0.08] bg-white/[0.03] hover:border-violet-400/30"}`}><span><span className={`block text-[11px] font-semibold ${styles.muted}`}>Next chapter</span><span className={`mt-1 block text-sm font-bold ${styles.text}`}>{nextTopic?.title || "Guide completed"}</span></span><ChevronRight className={`h-5 w-5 ${styles.muted}`} /></button></div></div></div></div></main>;
}

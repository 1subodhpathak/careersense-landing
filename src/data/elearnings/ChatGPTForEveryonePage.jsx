import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
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
    "title": "1. ChatGPT Foundations",
    "topics": [
      { "id": "what-is-chatgpt", "title": "What is ChatGPT?", "readTime": "11 min" },
      { "id": "how-chatgpt-works", "title": "How ChatGPT Works", "readTime": "11 min" },
      { "id": "account-workspace", "title": "Set Up Your Workspace", "readTime": "11 min" },
      { "id": "models-modes", "title": "Models and Working Modes", "readTime": "11 min" },
      { "id": "verification-safety", "title": "Accuracy, Privacy and Safe Use", "readTime": "11 min" }
    ]
  },
  {
    "id": "prompting",
    "title": "2. Prompting Essentials",
    "topics": [
      { "id": "prompt-anatomy", "title": "Anatomy of a Strong Prompt", "readTime": "11 min" },
      { "id": "clarifying-questions", "title": "Clarifying Questions", "readTime": "11 min" },
      { "id": "few-shot-examples", "title": "Examples and Few-Shot Prompting", "readTime": "11 min" },
      { "id": "iterative-prompting", "title": "Iterative Prompting", "readTime": "11 min" },
      { "id": "structured-outputs", "title": "Tables, JSON and Structured Outputs", "readTime": "11 min" }
    ]
  },
  {
    "id": "writing",
    "title": "3. Writing and Communication",
    "topics": [
      { "id": "professional-emails", "title": "Professional Emails", "readTime": "11 min" },
      { "id": "email-replies", "title": "Email Replies and Follow-Ups", "readTime": "11 min" },
      { "id": "reports-documents", "title": "Reports and Business Documents", "readTime": "11 min" },
      { "id": "presentations", "title": "Presentations and Slide Content", "readTime": "11 min" },
      { "id": "social-content", "title": "Social Posts and Content Repurposing", "readTime": "11 min" }
    ]
  },
  {
    "id": "visuals",
    "title": "4. Images, Icons and Visual Design",
    "topics": [
      { "id": "image-generation", "title": "Image Generation", "readTime": "11 min" },
      { "id": "icon-generation", "title": "Icon Generation", "readTime": "11 min" },
      { "id": "image-editing", "title": "Image Editing and Variations", "readTime": "11 min" },
      { "id": "diagrams-infographics", "title": "Diagrams and Infographics", "readTime": "11 min" },
      { "id": "brand-visual-system", "title": "Brand Visual Systems", "readTime": "11 min" }
    ]
  },
  {
    "id": "web",
    "title": "5. Websites and Product Building",
    "topics": [
      { "id": "website-generation", "title": "Website Generation", "readTime": "11 min" },
      { "id": "landing-pages", "title": "High-Converting Landing Pages", "readTime": "11 min" },
      { "id": "react-components", "title": "React Components", "readTime": "11 min" },
      { "id": "debugging-websites", "title": "Debugging Websites", "readTime": "11 min" },
      { "id": "seo-accessibility", "title": "SEO and Accessibility", "readTime": "11 min" }
    ]
  },
  {
    "id": "tools",
    "title": "6. Tools, GPTs and Automation",
    "topics": [
      { "id": "custom-gpts", "title": "Custom GPTs", "readTime": "11 min" },
      { "id": "tool-creation", "title": "Tool Creation and Function Calling", "readTime": "11 min" },
      { "id": "workflow-automation", "title": "Workflow Automation", "readTime": "11 min" },
      { "id": "scheduled-tasks", "title": "Scheduled Tasks and Recurring Work", "readTime": "11 min" },
      { "id": "agents", "title": "AI Agents and Multi-Step Systems", "readTime": "11 min" }
    ]
  },
  {
    "id": "research",
    "title": "7. Research, Files and Data",
    "topics": [
      { "id": "web-research", "title": "Web Research", "readTime": "11 min" },
      { "id": "deep-research", "title": "Deep Research Reports", "readTime": "11 min" },
      { "id": "file-analysis", "title": "PDF and Document Analysis", "readTime": "11 min" },
      { "id": "spreadsheet-analysis", "title": "Spreadsheet and Data Analysis", "readTime": "11 min" },
      { "id": "summarisation", "title": "Summarisation and Knowledge Extraction", "readTime": "11 min" }
    ]
  },
  {
    "id": "productivity",
    "title": "8. Planning and Productivity",
    "topics": [
      { "id": "daily-planning", "title": "Daily Planning", "readTime": "11 min" },
      { "id": "meeting-preparation", "title": "Meeting Preparation", "readTime": "11 min" },
      { "id": "meeting-notes", "title": "Meeting Notes and Action Items", "readTime": "11 min" },
      { "id": "decision-making", "title": "Decision Making", "readTime": "11 min" },
      { "id": "personal-knowledge", "title": "Personal Knowledge Systems", "readTime": "11 min" }
    ]
  },
  {
    "id": "learning",
    "title": "9. Learning and Career",
    "topics": [
      { "id": "personal-learning-plan", "title": "Personal Learning Plans", "readTime": "11 min" },
      { "id": "tutor-mode", "title": "Using ChatGPT as a Tutor", "readTime": "11 min" },
      { "id": "interview-practice", "title": "Interview Practice", "readTime": "11 min" },
      { "id": "resume-cover-letter", "title": "Resumes and Cover Letters", "readTime": "11 min" },
      { "id": "portfolio-projects", "title": "Portfolio and Project Ideas", "readTime": "11 min" }
    ]
  },
  {
    "id": "advanced",
    "title": "10. Advanced ChatGPT Workflows",
    "topics": [
      { "id": "projects-feature", "title": "Projects for Long-Running Work", "readTime": "11 min" },
      { "id": "canvas-workflows", "title": "Canvas for Writing and Coding", "readTime": "11 min" },
      { "id": "memory-instructions", "title": "Memory and Custom Instructions", "readTime": "11 min" },
      { "id": "multimodal-workflows", "title": "Multimodal Workflows", "readTime": "11 min" },
      { "id": "end-to-end-workflow", "title": "Build Your Personal ChatGPT System", "readTime": "11 min" }
    ]
  }
];

export const topicContent = {
  "what-is-chatgpt": {
    "eyebrow": "1. ChatGPT Foundations",
    "title": "What is ChatGPT?",
    "summary": "Understand what ChatGPT is, what it can help with, and how to use it as a thinking and creation partner.",
    "concepts": [
      "Treat ChatGPT as an assistant that works from instructions and context.",
      "Use it for explanation, drafting, analysis, planning, creativity and problem solving.",
      "Review important outputs instead of assuming they are automatically correct."
    ],
    "workflow": [
      "Begin with a clear outcome, not a vague question.",
      "Provide context that ChatGPT cannot know on its own.",
      "Use follow-up prompts to improve the first answer."
    ],
    "mistakes": [
      "Expecting one perfect answer from a one-line prompt.",
      "Using generated facts without verification.",
      "Sharing private or confidential information without approval."
    ],
    "prompts": [
      {
        "title": "Beginner explanation",
        "prompt": "Explain ChatGPT to me as a complete beginner. Use one everyday analogy, five practical examples, three limitations and a short summary. Avoid technical jargon."
      },
      {
        "title": "Personal use-case discovery",
        "prompt": "Interview me with one question at a time to understand my work, learning goals and recurring tasks. After 8 questions, recommend the 10 highest-value ways I can use ChatGPT."
      }
    ]
  },
  "how-chatgpt-works": {
    "eyebrow": "1. ChatGPT Foundations",
    "title": "How ChatGPT Works",
    "summary": "Learn the basic mental model behind prompts, context, generated answers and iterative conversations.",
    "concepts": [
      "ChatGPT generates a response based on your instructions and the available conversation context.",
      "It may reason well but can still produce incorrect or unsupported claims.",
      "Your follow-up messages can correct assumptions and improve the result."
    ],
    "workflow": [
      "State the task, context, constraints and output format.",
      "Ask the model to list assumptions when the situation is ambiguous.",
      "Break complex work into stages instead of requesting everything at once."
    ],
    "mistakes": [
      "Confusing fluent writing with verified truth.",
      "Putting many unrelated tasks into one prompt.",
      "Failing to provide examples when style or quality matters."
    ],
    "prompts": [
      {
        "title": "Mental model",
        "prompt": "Explain how ChatGPT generates an answer using a restaurant-chef analogy. Cover prompts, context, prediction, limitations and follow-up refinement."
      },
      {
        "title": "Assumption check",
        "prompt": "Before answering my request below, list the assumptions you would need to make. Ask up to five clarification questions, then wait for my reply. Request: [PASTE REQUEST]."
      }
    ]
  },
  "account-workspace": {
    "eyebrow": "1. ChatGPT Foundations",
    "title": "Set Up Your Workspace",
    "summary": "Organise chats, projects, instructions and reusable templates so your work remains easy to find and continue.",
    "concepts": [
      "Use separate chats for unrelated tasks.",
      "Keep long-running work in a dedicated project or clearly named conversation.",
      "Store recurring prompts as templates with editable placeholders."
    ],
    "workflow": [
      "Create a naming convention for chats and projects.",
      "Start major projects with goals, audience, constraints and source material.",
      "Review privacy settings and organisational policies before uploading files."
    ],
    "mistakes": [
      "Mixing unrelated projects in the same chat.",
      "Repeating instructions instead of creating a reusable starter prompt.",
      "Uploading documents without removing unnecessary sensitive data."
    ],
    "prompts": [
      {
        "title": "Project starter",
        "prompt": "Help me create a reusable project starter instruction for [PROJECT]. Ask about goals, audience, inputs, tone, constraints, approval rules and deliverables. Then produce a concise instruction block."
      },
      {
        "title": "Chat organisation",
        "prompt": "Design a simple naming and folder system for my ChatGPT work. My main activities are: [LIST]. Include project names, chat naming rules and a weekly cleanup routine."
      }
    ]
  },
  "models-modes": {
    "eyebrow": "1. ChatGPT Foundations",
    "title": "Models and Working Modes",
    "summary": "Choose an appropriate working mode based on speed, depth, research needs, files, visuals or coding.",
    "concepts": [
      "Use a fast conversational mode for routine drafting and questions.",
      "Use deeper reasoning for multi-step analysis, planning and difficult technical work.",
      "Use specialised capabilities such as web research, image generation, file analysis or coding when the task requires them."
    ],
    "workflow": [
      "Define the risk and complexity before selecting a workflow.",
      "Ask for a plan first when the task has many dependencies.",
      "Use source-backed research for current or high-stakes factual work."
    ],
    "mistakes": [
      "Using deep research for a simple rewrite.",
      "Using quick chat for a decision that requires source verification.",
      "Assuming every capability is available on every account or plan."
    ],
    "prompts": [
      {
        "title": "Mode selector",
        "prompt": "Classify my task into one of these workflows: quick chat, deep reasoning, web research, file analysis, image generation or coding. Explain the choice and propose the first prompt. Task: [TASK]."
      },
      {
        "title": "Complex task plan",
        "prompt": "Do not solve the task yet. First create a step-by-step execution plan, identify missing inputs, risks and which ChatGPT capabilities would be useful. Task: [TASK]."
      }
    ]
  },
  "verification-safety": {
    "eyebrow": "1. ChatGPT Foundations",
    "title": "Accuracy, Privacy and Safe Use",
    "summary": "Build habits for verifying important claims, protecting sensitive information and recognising hallucinations.",
    "concepts": [
      "ChatGPT can be confidently wrong.",
      "Sensitive inputs may be inappropriate to share depending on your context and policies.",
      "High-stakes medical, legal, financial and security decisions require qualified review."
    ],
    "workflow": [
      "Ask for sources and inspect them.",
      "Verify calculations, quotations, dates and links independently.",
      "Redact personal, customer and confidential information before sharing."
    ],
    "mistakes": [
      "Requesting fabricated citations.",
      "Using untested code in production.",
      "Treating generated professional advice as final authority."
    ],
    "prompts": [
      {
        "title": "Verification review",
        "prompt": "Review the answer below as a skeptical fact-checker. Separate verified claims, uncertain claims, opinions and claims requiring external sources. Do not invent citations. Answer: [PASTE]."
      },
      {
        "title": "Privacy rewrite",
        "prompt": "Rewrite the following request so it can be safely shared with an AI assistant. Replace sensitive names, identifiers, financial values and confidential details with realistic placeholders. Text: [PASTE]."
      }
    ]
  },
  "prompt-anatomy": {
    "eyebrow": "2. Prompting Essentials",
    "title": "Anatomy of a Strong Prompt",
    "summary": "Use a repeatable structure containing role, context, task, constraints, examples and output format.",
    "concepts": [
      "Role sets a useful perspective.",
      "Context explains the situation and source material.",
      "Task states the exact action, while constraints and format define success."
    ],
    "workflow": [
      "Write the desired outcome first.",
      "Add only context that materially changes the answer.",
      "Specify tone, length, audience and format when they matter."
    ],
    "mistakes": [
      "Adding decorative detail that does not affect the output.",
      "Leaving the audience undefined.",
      "Requesting conflicting constraints."
    ],
    "prompts": [
      {
        "title": "Full framework",
        "prompt": "Act as [ROLE]. Context: [BACKGROUND]. Task: [EXACT TASK]. Constraints: [RULES]. Quality bar: [WHAT GOOD LOOKS LIKE]. Format: [OUTPUT FORMAT]. Ask questions if essential information is missing."
      },
      {
        "title": "Prompt improver",
        "prompt": "Improve my prompt without solving it. Identify ambiguity, missing context, conflicting constraints and quality criteria. Return: 1) issues, 2) improved prompt, 3) optional advanced version. Prompt: [PASTE]."
      }
    ]
  },
  "clarifying-questions": {
    "eyebrow": "2. Prompting Essentials",
    "title": "Clarifying Questions",
    "summary": "Make ChatGPT ask for missing information before generating an answer.",
    "concepts": [
      "Clarification is valuable when the outcome depends on audience, constraints or source data.",
      "One-question-at-a-time interviews are useful for complex personalisation.",
      "A maximum question limit keeps the interaction efficient."
    ],
    "workflow": [
      "Tell ChatGPT not to answer until questions are complete.",
      "Specify which decisions require clarification.",
      "Ask it to summarise your answers before proceeding."
    ],
    "mistakes": [
      "Receiving a generic answer because key inputs were omitted.",
      "Allowing endless questions.",
      "Answering all questions in a single unclear paragraph."
    ],
    "prompts": [
      {
        "title": "Question-first workflow",
        "prompt": "Before doing the task, ask up to 7 high-impact clarification questions. Ask one question at a time. After my final answer, summarise the requirements and wait for confirmation. Task: [TASK]."
      },
      {
        "title": "Fast clarification",
        "prompt": "Ask only the three questions that would most improve the quality of the result. If information is nonessential, make a stated assumption. Task: [TASK]."
      }
    ]
  },
  "few-shot-examples": {
    "eyebrow": "2. Prompting Essentials",
    "title": "Examples and Few-Shot Prompting",
    "summary": "Guide style and structure by showing examples of strong inputs and outputs.",
    "concepts": [
      "Examples communicate expectations more precisely than adjectives alone.",
      "Use examples that represent the desired range, not only one narrow case.",
      "Explain which characteristics should be copied and which details should not."
    ],
    "workflow": [
      "Provide two or three representative examples.",
      "Label input and output clearly.",
      "Ask ChatGPT to infer the pattern before creating a new version."
    ],
    "mistakes": [
      "Providing an example with errors.",
      "Accidentally asking for copied facts instead of copied style.",
      "Using examples too different from the real task."
    ],
    "prompts": [
      {
        "title": "Learn from examples",
        "prompt": "Study the examples below. Identify the recurring structure, tone and quality rules. Then create a new output for my input without copying example-specific facts. Examples: [PASTE]. New input: [INPUT]."
      },
      {
        "title": "Style extraction",
        "prompt": "Analyse this writing sample and create a reusable style guide covering voice, sentence length, vocabulary, structure, formatting and prohibited habits. Sample: [PASTE]."
      }
    ]
  },
  "iterative-prompting": {
    "eyebrow": "2. Prompting Essentials",
    "title": "Iterative Prompting",
    "summary": "Treat the first output as a draft and improve it through focused review cycles.",
    "concepts": [
      "Separate content review from style review.",
      "Request targeted changes rather than saying 'make it better'.",
      "Use a final quality-control pass against explicit criteria."
    ],
    "workflow": [
      "First improve accuracy and completeness.",
      "Then improve clarity, structure and tone.",
      "Finally check compliance with constraints."
    ],
    "mistakes": [
      "Changing too many variables at once.",
      "Accepting revisions that introduce new errors.",
      "Failing to preserve strong parts of the previous draft."
    ],
    "prompts": [
      {
        "title": "Three-pass revision",
        "prompt": "Revise the draft in three passes: 1) accuracy and missing information, 2) structure and clarity, 3) tone and concision. Preserve strong content. Show only the final version. Draft: [PASTE]."
      },
      {
        "title": "Targeted critique",
        "prompt": "Do not rewrite yet. Score this draft from 1-10 for clarity, specificity, structure, credibility and usefulness. Explain the three highest-impact improvements. Draft: [PASTE]."
      }
    ]
  },
  "structured-outputs": {
    "eyebrow": "2. Prompting Essentials",
    "title": "Tables, JSON and Structured Outputs",
    "summary": "Request predictable formats that can be scanned, copied or processed by another tool.",
    "concepts": [
      "Tables work well for comparisons and plans.",
      "JSON is useful for software workflows when the schema is explicit.",
      "Headings and checklists improve human readability."
    ],
    "workflow": [
      "Provide the exact columns or JSON keys.",
      "Define allowed values and required fields.",
      "Request no commentary outside the requested structure when machine parsing matters."
    ],
    "mistakes": [
      "Using invalid JSON examples.",
      "Leaving optional and required fields unclear.",
      "Choosing tables for long narrative content."
    ],
    "prompts": [
      {
        "title": "Table output",
        "prompt": "Return the answer as a markdown table with these columns: [COLUMNS]. Use one row per [ITEM]. Keep each cell concise and write 'Unknown' rather than guessing."
      },
      {
        "title": "JSON schema",
        "prompt": "Return valid JSON only using this schema: {\"title\":\"string\",\"priority\":\"low|medium|high\",\"actions\":[{\"task\":\"string\",\"owner\":\"string\",\"deadline\":\"YYYY-MM-DD|null\"}]}. Input: [PASTE]."
      }
    ]
  },
  "professional-emails": {
    "eyebrow": "3. Writing and Communication",
    "title": "Professional Emails",
    "summary": "Draft clear emails with the right purpose, tone, context and call to action.",
    "concepts": [
      "State who the recipient is and what relationship you have.",
      "Explain the purpose and desired response.",
      "Specify tone, length and deadline."
    ],
    "workflow": [
      "Use a descriptive subject line.",
      "Lead with the reason for writing.",
      "End with one clear next step."
    ],
    "mistakes": [
      "Overly formal or robotic language.",
      "Hiding the request in a long introduction.",
      "Using generic phrases that add no value."
    ],
    "prompts": [
      {
        "title": "Email draft",
        "prompt": "Write a professional email to [RECIPIENT] about [PURPOSE]. Context: [CONTEXT]. Tone: [TONE]. Keep it below [WORD COUNT] words. Include a clear subject line and end with one specific next step."
      },
      {
        "title": "Sensitive email",
        "prompt": "Draft a calm, respectful email addressing [ISSUE]. Acknowledge the other person's perspective, state the facts without blame, propose two solutions and invite discussion. Avoid legal-sounding or aggressive language."
      }
    ]
  },
  "email-replies": {
    "eyebrow": "3. Writing and Communication",
    "title": "Email Replies and Follow-Ups",
    "summary": "Create concise replies, follow-ups and escalation messages that preserve context.",
    "concepts": [
      "Include the prior thread's key decision or unanswered question.",
      "Match the relationship and urgency.",
      "Avoid repeating the entire conversation."
    ],
    "workflow": [
      "Paste the relevant email and specify your intended outcome.",
      "Ask for multiple tone options when uncertain.",
      "Use a direct follow-up date or action."
    ],
    "mistakes": [
      "Sounding passive-aggressive.",
      "Sending a follow-up with no new value.",
      "Escalating before clearly stating what is blocked."
    ],
    "prompts": [
      {
        "title": "Reply assistant",
        "prompt": "Draft a reply to the email below. My goal is [GOAL]. Tone: warm, concise and professional. Address every question, flag anything I cannot confirm and end with the next action. Email: [PASTE]."
      },
      {
        "title": "Follow-up",
        "prompt": "Write a polite follow-up because I have not received a response for [NUMBER] days. Briefly restate the request, explain why timing matters and provide an easy yes/no next step."
      }
    ]
  },
  "reports-documents": {
    "eyebrow": "3. Writing and Communication",
    "title": "Reports and Business Documents",
    "summary": "Turn raw information into structured, decision-ready documents.",
    "concepts": [
      "Define the reader and decision the document should support.",
      "Separate facts, analysis, risks and recommendations.",
      "Use headings that communicate the argument."
    ],
    "workflow": [
      "Provide source notes and required sections.",
      "Ask for an outline before the full draft.",
      "Request an executive summary after the analysis is complete."
    ],
    "mistakes": [
      "Writing before organising evidence.",
      "Mixing assumptions with facts.",
      "Creating long documents without a clear decision or action."
    ],
    "prompts": [
      {
        "title": "Report builder",
        "prompt": "Create a report for [AUDIENCE] about [TOPIC]. Use these sections: Executive Summary, Context, Evidence, Analysis, Risks, Options, Recommendation and Next Steps. Clearly label assumptions. Source notes: [PASTE]."
      },
      {
        "title": "Document outline",
        "prompt": "Create a detailed outline for a [DOCUMENT TYPE] that will help [AUDIENCE] decide [DECISION]. For each section, state its purpose, key questions and evidence needed."
      }
    ]
  },
  "presentations": {
    "eyebrow": "3. Writing and Communication",
    "title": "Presentations and Slide Content",
    "summary": "Develop a clear narrative, slide outline and speaker notes without overcrowding slides.",
    "concepts": [
      "Begin with audience, objective and desired decision.",
      "Use one core message per slide.",
      "Separate on-slide text from speaker notes."
    ],
    "workflow": [
      "Ask for a story arc before slide copy.",
      "Use evidence and examples, not only claims.",
      "Keep titles conclusion-oriented."
    ],
    "mistakes": [
      "Turning a report into dense slides.",
      "Using vague slide titles.",
      "Adding visuals that do not support the message."
    ],
    "prompts": [
      {
        "title": "Presentation outline",
        "prompt": "Create a [NUMBER]-slide presentation for [AUDIENCE] about [TOPIC]. Goal: [GOAL]. For each slide provide: conclusion-style title, 3 concise points, recommended visual and speaker note."
      },
      {
        "title": "Executive presentation",
        "prompt": "Turn the notes below into an executive presentation. Lead with the decision, quantify impact where supported, include risks and end with a clear ask. Notes: [PASTE]."
      }
    ]
  },
  "social-content": {
    "eyebrow": "3. Writing and Communication",
    "title": "Social Posts and Content Repurposing",
    "summary": "Convert one idea into platform-specific posts without making every channel sound identical.",
    "concepts": [
      "Define platform, audience and content objective.",
      "Preserve the core idea while adapting length and tone.",
      "Create a strong opening and a useful takeaway."
    ],
    "workflow": [
      "Provide the source content.",
      "Ask for multiple hooks.",
      "Specify prohibited clichés and formatting preferences."
    ],
    "mistakes": [
      "Using the same post everywhere.",
      "Excessive hype or emojis.",
      "Creating engagement bait without substance."
    ],
    "prompts": [
      {
        "title": "LinkedIn post",
        "prompt": "Turn the source below into a LinkedIn post for [AUDIENCE]. Use a strong first line, short paragraphs, one practical insight and a thoughtful closing question. Avoid clichés, exaggerated claims and excessive emojis. Source: [PASTE]."
      },
      {
        "title": "Repurpose content",
        "prompt": "Repurpose this content into: 1 LinkedIn post, 1 X thread, 1 Instagram caption, 1 newsletter intro and 5 short hooks. Preserve facts but adapt tone and length for each platform. Source: [PASTE]."
      }
    ]
  },
  "image-generation": {
    "eyebrow": "4. Images, Icons and Visual Design",
    "title": "Image Generation",
    "summary": "Create images by describing purpose, subject, composition, setting, style and constraints.",
    "concepts": [
      "Purpose influences composition and level of detail.",
      "Framing, lighting and visual hierarchy matter as much as subject.",
      "Iteration works best when each revision changes specific attributes."
    ],
    "workflow": [
      "Specify canvas size or aspect ratio.",
      "Describe where text or empty space must appear.",
      "State what should be excluded."
    ],
    "mistakes": [
      "Using vague style words without composition details.",
      "Requesting too much small text.",
      "Changing the entire prompt when only one element needs revision."
    ],
    "prompts": [
      {
        "title": "Marketing image",
        "prompt": "Create a premium website hero image for [PRODUCT]. Composition: subject on the right, clean negative space on the left for headline text. Style: polished editorial 3D, realistic materials, restrained palette. Lighting: soft studio. No words, logos, watermark, neon or clutter. Aspect ratio: 16:9."
      },
      {
        "title": "Image revision",
        "prompt": "Edit the attached image while preserving the exact composition and camera angle. Change only: [CHANGES]. Keep: [ELEMENTS TO PRESERVE]. Do not add text, logos or extra objects."
      }
    ]
  },
  "icon-generation": {
    "eyebrow": "4. Images, Icons and Visual Design",
    "title": "Icon Generation",
    "summary": "Design consistent icon sets that remain recognisable at small UI sizes.",
    "concepts": [
      "Use one visual language across the complete set.",
      "Simple silhouettes work better than complex scenes.",
      "Transparent backgrounds and consistent padding simplify implementation."
    ],
    "workflow": [
      "Define stroke or 3D style, palette and viewing angle.",
      "Keep each icon centred and similarly scaled.",
      "Request one concept per icon."
    ],
    "mistakes": [
      "Mixing flat, outline and realistic styles.",
      "Using tiny details that disappear.",
      "Leaving excessive transparent padding."
    ],
    "prompts": [
      {
        "title": "Single icon",
        "prompt": "Create a 4K square UI icon for [CONCEPT]. Style: clean premium 3D icon, rounded forms, blue and violet palette with one orange accent, centred, large on canvas, transparent background, no text, no watermark, no checkerboard."
      },
      {
        "title": "Icon set",
        "prompt": "Create a consistent set of icons for: [LIST]. Use the same materials, lighting, perspective, stroke weight and padding. Each icon must communicate one concept, fill about 82% of a square canvas and have a transparent background."
      }
    ]
  },
  "image-editing": {
    "eyebrow": "4. Images, Icons and Visual Design",
    "title": "Image Editing and Variations",
    "summary": "Change selected visual elements while preserving identity, layout or product consistency.",
    "concepts": [
      "State what must remain unchanged.",
      "Describe changes in priority order.",
      "Use reference images for colour, material or composition when available."
    ],
    "workflow": [
      "Separate preservation instructions from edit instructions.",
      "Call out exact object location.",
      "Request one controlled variation before producing a set."
    ],
    "mistakes": [
      "Saying only 'make it better'.",
      "Failing to protect alignment and proportions.",
      "Requesting incompatible lighting or perspective."
    ],
    "prompts": [
      {
        "title": "Controlled edit",
        "prompt": "Preserve the exact subject, alignment, crop, camera angle and proportions. Replace [OBJECT/AREA] with [NEW DESIGN]. Change the palette to [PALETTE]. Keep all other elements unchanged."
      },
      {
        "title": "Dark mode conversion",
        "prompt": "Convert the attached light-mode image to dark mode. Preserve every object's position, scale, alignment and composition. Replace the bright background with deep navy and adjust surfaces, shadows and highlights for natural dark-mode contrast."
      }
    ]
  },
  "diagrams-infographics": {
    "eyebrow": "4. Images, Icons and Visual Design",
    "title": "Diagrams and Infographics",
    "summary": "Turn processes and systems into clear visual explanations.",
    "concepts": [
      "Choose a diagram type that matches the relationship.",
      "Use labels sparingly and maintain a clear reading order.",
      "Highlight the primary path and de-emphasise supporting detail."
    ],
    "workflow": [
      "Describe nodes, connections and direction.",
      "Specify audience knowledge level.",
      "Request an accessible colour hierarchy."
    ],
    "mistakes": [
      "Decorative complexity.",
      "Crossing connectors and ambiguous arrows.",
      "Using long paragraphs inside diagram nodes."
    ],
    "prompts": [
      {
        "title": "Architecture diagram",
        "prompt": "Create a clean architecture diagram for [SYSTEM]. Include these components: [LIST]. Show data flow with labelled arrows, group components by layer and highlight the primary request path. White background, professional blue palette, no decorative 3D objects."
      },
      {
        "title": "Infographic",
        "prompt": "Create a vertical infographic explaining [PROCESS] in [NUMBER] steps for beginners. Each step should have a short title, one-sentence explanation and simple icon. Use strong hierarchy, generous spacing and minimal text."
      }
    ]
  },
  "brand-visual-system": {
    "eyebrow": "4. Images, Icons and Visual Design",
    "title": "Brand Visual Systems",
    "summary": "Create repeatable visual rules for colours, typography, imagery and components.",
    "concepts": [
      "A design system needs rules, not only examples.",
      "Define primary, secondary and semantic colours.",
      "Document consistent spacing, radii, shadows and image style."
    ],
    "workflow": [
      "Start from brand personality and audience.",
      "Create do/don't examples.",
      "Test the system on several real assets."
    ],
    "mistakes": [
      "Choosing colours without accessibility checks.",
      "Using too many visual styles.",
      "Creating a brand guide that cannot be implemented."
    ],
    "prompts": [
      {
        "title": "Visual direction",
        "prompt": "Create three distinct visual directions for [BRAND]. For each include: concept, mood, colour palette with hex codes, typography direction, image style, icon style, UI characteristics and what to avoid."
      },
      {
        "title": "Design system brief",
        "prompt": "Turn the following brand direction into an implementation-ready UI design system. Define colours, typography scale, spacing, border radius, shadows, buttons, cards, form controls, icons and light/dark behaviour. Direction: [PASTE]."
      }
    ]
  },
  "website-generation": {
    "eyebrow": "5. Websites and Product Building",
    "title": "Website Generation",
    "summary": "Plan and generate a complete website from business goals, audience, content and technical constraints.",
    "concepts": [
      "Start with information architecture before code.",
      "Define conversion goals for each page.",
      "Separate reusable components from page-specific sections."
    ],
    "workflow": [
      "Specify framework, styling system and routing.",
      "Provide content and design references.",
      "Request responsive and accessibility requirements."
    ],
    "mistakes": [
      "Generating code before agreeing on structure.",
      "Building every section as a single component.",
      "Using placeholder links and content in production."
    ],
    "prompts": [
      {
        "title": "Website brief",
        "prompt": "Act as a product designer and senior frontend engineer. Plan a website for [BUSINESS]. Audience: [AUDIENCE]. Primary conversion: [GOAL]. Create sitemap, page objectives, section order, component inventory, data model and responsive behaviour. Do not write code yet."
      },
      {
        "title": "Website generation",
        "prompt": "Build a production-ready [FRAMEWORK] landing page using [STYLING]. Sections: [LIST]. Requirements: responsive, accessible, reusable components, light/dark theme, no placeholder text, no external UI kit and no horizontal overflow. Return the complete file structure and code."
      }
    ]
  },
  "landing-pages": {
    "eyebrow": "5. Websites and Product Building",
    "title": "High-Converting Landing Pages",
    "summary": "Design a focused page that moves one audience toward one primary action.",
    "concepts": [
      "Lead with the customer's problem and desired outcome.",
      "Use proof close to important claims.",
      "Reduce competing calls to action."
    ],
    "workflow": [
      "Define awareness level and objections.",
      "Create message hierarchy before visual styling.",
      "Use specific proof and product screenshots."
    ],
    "mistakes": [
      "Generic hero copy.",
      "Feature lists without benefits.",
      "Too many unrelated sections."
    ],
    "prompts": [
      {
        "title": "Landing page strategy",
        "prompt": "Create a conversion-focused landing page strategy for [OFFER]. Audience: [AUDIENCE]. Include promise, pain points, objections, proof required, section order, CTA strategy and 10 headline options."
      },
      {
        "title": "Landing page code",
        "prompt": "Generate a polished responsive landing page for [OFFER] in React and Tailwind. Use this section order: [ORDER]. Visual direction: [STYLE]. Include meaningful hover states, accessible contrast, mobile behaviour and real copy."
      }
    ]
  },
  "react-components": {
    "eyebrow": "5. Websites and Product Building",
    "title": "React Components",
    "summary": "Generate reusable components with clear props, state handling and responsive behaviour.",
    "concepts": [
      "Define the component contract before implementation.",
      "Keep data outside presentation when it changes frequently.",
      "Handle empty, loading and error states."
    ],
    "workflow": [
      "Provide existing code and project conventions.",
      "Request complete imports and exports.",
      "Specify whether TypeScript is required."
    ],
    "mistakes": [
      "Returning incomplete snippets.",
      "Hard-coding data that should be props.",
      "Ignoring keyboard and screen-reader behaviour."
    ],
    "prompts": [
      {
        "title": "Component generation",
        "prompt": "Create a reusable React component named [NAME]. Props: [PROPS]. Behaviour: [BEHAVIOUR]. Styling: Tailwind. Include accessibility, responsive states, empty state, error handling and a usage example. Return complete code."
      },
      {
        "title": "Component refactor",
        "prompt": "Refactor the component below without changing visible behaviour. Improve readability, component boundaries, repeated styles, accessibility and performance. Return the full updated file and list any required import changes. Code: [PASTE]."
      }
    ]
  },
  "debugging-websites": {
    "eyebrow": "5. Websites and Product Building",
    "title": "Debugging Websites",
    "summary": "Use ChatGPT to isolate UI, state, build and runtime issues systematically.",
    "concepts": [
      "Provide the exact error and reproduction steps.",
      "Share the smallest relevant code path.",
      "Distinguish expected behaviour from actual behaviour."
    ],
    "workflow": [
      "Ask for likely causes ranked by probability.",
      "Test one hypothesis at a time.",
      "Request a complete corrected file after diagnosis."
    ],
    "mistakes": [
      "Pasting an entire repository with no error context.",
      "Applying many speculative changes.",
      "Ignoring browser console and network information."
    ],
    "prompts": [
      {
        "title": "Debug request",
        "prompt": "Debug this issue as a senior frontend engineer. Expected: [EXPECTED]. Actual: [ACTUAL]. Steps to reproduce: [STEPS]. Error: [ERROR]. Relevant code: [CODE]. Rank possible causes, explain the most likely cause and provide the smallest safe fix."
      },
      {
        "title": "Visual bug",
        "prompt": "The UI differs from the reference in these ways: [DIFFERENCES]. Inspect the provided JSX/CSS and identify which layout, spacing, sizing or responsive rules cause each difference. Return the full corrected code."
      }
    ]
  },
  "seo-accessibility": {
    "eyebrow": "5. Websites and Product Building",
    "title": "SEO and Accessibility",
    "summary": "Improve discoverability and usability without sacrificing design quality.",
    "concepts": [
      "Use semantic headings and meaningful page titles.",
      "Provide keyboard support and visible focus states.",
      "Write descriptive alternative text and link labels."
    ],
    "workflow": [
      "Audit one page at a time.",
      "Prioritise critical barriers before minor improvements.",
      "Include structured data only when it accurately represents the content."
    ],
    "mistakes": [
      "Keyword stuffing.",
      "Using divs for every interactive control.",
      "Low-contrast decorative text."
    ],
    "prompts": [
      {
        "title": "SEO audit",
        "prompt": "Audit the page content below for search intent, title, meta description, heading hierarchy, internal links, topical gaps and structured data opportunities. Return prioritised fixes and rewritten metadata. Content: [PASTE]."
      },
      {
        "title": "Accessibility audit",
        "prompt": "Audit this React component for keyboard navigation, focus management, labels, semantics, contrast, motion and screen-reader behaviour. Return issues by severity and provide the complete corrected component. Code: [PASTE]."
      }
    ]
  },
  "custom-gpts": {
    "eyebrow": "6. Tools, GPTs and Automation",
    "title": "Custom GPTs",
    "summary": "Create a specialised ChatGPT experience using instructions, knowledge and selected capabilities.",
    "concepts": [
      "Define one clear purpose and target user.",
      "Write behavioural instructions and boundaries.",
      "Add knowledge only when it is relevant and maintainable."
    ],
    "workflow": [
      "Design conversation starters around real jobs.",
      "Test happy paths and failure paths.",
      "Explain when the GPT should ask questions or refuse to guess."
    ],
    "mistakes": [
      "Trying to make one GPT do everything.",
      "Uploading uncurated documents.",
      "Leaving tool-use and escalation rules undefined."
    ],
    "prompts": [
      {
        "title": "GPT specification",
        "prompt": "Design a custom GPT for [PURPOSE]. Define target users, jobs to be done, scope, out-of-scope requests, required inputs, step-by-step behaviour, knowledge files, capabilities, safety rules, conversation starters and 15 test cases."
      },
      {
        "title": "GPT instructions",
        "prompt": "Write production-quality instructions for a custom GPT called [NAME]. It should [GOAL]. Include identity, workflow, question policy, quality checklist, tool rules, privacy rules, failure handling and response style."
      }
    ]
  },
  "tool-creation": {
    "eyebrow": "6. Tools, GPTs and Automation",
    "title": "Tool Creation and Function Calling",
    "summary": "Define safe, structured tools that let an AI system call application functions.",
    "concepts": [
      "A tool needs a precise name, purpose and typed arguments.",
      "The model should know when to call the tool and when not to.",
      "Your application must validate permissions and inputs."
    ],
    "workflow": [
      "Use narrow tools with explicit schemas.",
      "Return useful errors that the model can act on.",
      "Require confirmation before consequential actions."
    ],
    "mistakes": [
      "Giving the model unrestricted backend access.",
      "Using ambiguous argument names.",
      "Trusting model-provided IDs without validation."
    ],
    "prompts": [
      {
        "title": "Tool schema",
        "prompt": "Design a function tool for [ACTION]. Provide: tool name, description, JSON schema with types and required fields, validation rules, example calls, success response, error responses and guidance for when the model must not call it."
      },
      {
        "title": "Tool safety review",
        "prompt": "Review this AI tool definition for ambiguity, excessive permissions, missing validation, injection risks, confirmation requirements and error handling. Return a safer revised schema. Tool: [PASTE]."
      }
    ]
  },
  "workflow-automation": {
    "eyebrow": "6. Tools, GPTs and Automation",
    "title": "Workflow Automation",
    "summary": "Turn a recurring process into a sequence of triggers, decisions, tools and human approvals.",
    "concepts": [
      "Map the current process before automating it.",
      "Identify which steps require human judgement.",
      "Define success, failure and retry behaviour."
    ],
    "workflow": [
      "Start with one narrow workflow.",
      "Use structured inputs and outputs between steps.",
      "Log actions and preserve auditability."
    ],
    "mistakes": [
      "Automating an unclear or broken process.",
      "Removing human review from high-impact actions.",
      "Ignoring duplicate and retry behaviour."
    ],
    "prompts": [
      {
        "title": "Automation design",
        "prompt": "Design an automation for [PROCESS]. Include trigger, inputs, steps, decision points, tools, data schema, human approvals, retries, notifications, audit log and success metrics. Highlight what should remain manual."
      },
      {
        "title": "Workflow prompt",
        "prompt": "Convert this manual procedure into an AI-assisted workflow. For every step identify: actor, input, action, output, validation, failure path and whether human approval is required. Procedure: [PASTE]."
      }
    ]
  },
  "scheduled-tasks": {
    "eyebrow": "6. Tools, GPTs and Automation",
    "title": "Scheduled Tasks and Recurring Work",
    "summary": "Use scheduled prompts for reminders, briefings and repeated learning or monitoring workflows.",
    "concepts": [
      "Define cadence, timezone and delivery format.",
      "Specify what should happen when there is nothing meaningful to report.",
      "Keep recurring prompts focused and measurable."
    ],
    "workflow": [
      "Use exact times only when timing matters.",
      "Include source and recency requirements for briefings.",
      "Review and retire low-value tasks."
    ],
    "mistakes": [
      "Scheduling noisy updates.",
      "Leaving timezone ambiguous.",
      "Creating recurring tasks without a clear action."
    ],
    "prompts": [
      {
        "title": "Recurring briefing",
        "prompt": "Every [CADENCE] at [TIME AND TIMEZONE], create a briefing on [TOPIC]. Include only developments since the previous briefing, explain why each matters and end with three actions or questions to watch."
      },
      {
        "title": "Learning task",
        "prompt": "Create a recurring learning routine for [SKILL]. On each run, give me one concept, one worked example, one exercise and one review question. Adapt difficulty based on my previous answers."
      }
    ]
  },
  "agents": {
    "eyebrow": "6. Tools, GPTs and Automation",
    "title": "AI Agents and Multi-Step Systems",
    "summary": "Design systems that plan, use tools, maintain state and pause for approval when needed.",
    "concepts": [
      "Define the agent's objective and boundaries.",
      "Separate read actions from consequential write actions.",
      "Use checkpoints, observability and human approval."
    ],
    "workflow": [
      "Start with a deterministic workflow before adding autonomy.",
      "Define tool contracts and state transitions.",
      "Test adversarial and failure scenarios."
    ],
    "mistakes": [
      "Calling every workflow an agent.",
      "Giving autonomous write access too early.",
      "Hiding tool failures from users."
    ],
    "prompts": [
      {
        "title": "Agent architecture",
        "prompt": "Design an AI agent for [USE CASE]. Define objective, users, state, planning approach, tools, read/write permissions, human approval gates, memory, error recovery, observability, evaluation and deployment architecture."
      },
      {
        "title": "Agent test plan",
        "prompt": "Create a comprehensive test plan for this agent. Include normal scenarios, missing data, tool failure, conflicting instructions, prompt injection, permission errors, duplicate actions, timeout, recovery and human-approval tests. Agent: [DESCRIPTION]."
      }
    ]
  },
  "web-research": {
    "eyebrow": "7. Research, Files and Data",
    "title": "Web Research",
    "summary": "Research current information with explicit scope, source quality and citation requirements.",
    "concepts": [
      "Define the exact research question.",
      "Prioritise primary and authoritative sources.",
      "Separate sourced facts from inference."
    ],
    "workflow": [
      "Set date and geography boundaries.",
      "Ask for disagreement and uncertainty.",
      "Request links or citations for consequential claims."
    ],
    "mistakes": [
      "Using one source for a broad conclusion.",
      "Citing sources that do not support the claim.",
      "Ignoring publication dates."
    ],
    "prompts": [
      {
        "title": "Research brief",
        "prompt": "Research [QUESTION] for [PURPOSE]. Scope: [SCOPE]. Prioritise primary sources and information published after [DATE]. Compare credible viewpoints, identify uncertainty and cite every important factual claim."
      },
      {
        "title": "Source evaluation",
        "prompt": "Evaluate these sources for authority, recency, methodology, conflicts of interest and relevance. Explain which claims each source can and cannot support. Sources: [LIST]."
      }
    ]
  },
  "deep-research": {
    "eyebrow": "7. Research, Files and Data",
    "title": "Deep Research Reports",
    "summary": "Plan and execute longer source-backed investigations with traceable evidence.",
    "concepts": [
      "Create a research plan before collecting evidence.",
      "Break the question into subquestions.",
      "Maintain a claim-to-source trail."
    ],
    "workflow": [
      "Approve the research scope first.",
      "Request an executive summary and detailed appendix.",
      "Ask for gaps that remain unresolved."
    ],
    "mistakes": [
      "Beginning with an overly broad question.",
      "Treating all sources as equally reliable.",
      "Hiding uncertainty in a polished narrative."
    ],
    "prompts": [
      {
        "title": "Deep research plan",
        "prompt": "Create a deep-research plan for [QUESTION]. Include scope, exclusions, subquestions, preferred sources, search strategy, evaluation criteria, expected deliverables and stopping conditions. Do not start research yet."
      },
      {
        "title": "Research report",
        "prompt": "Produce a detailed research report on [QUESTION]. Include executive summary, methodology, findings by subquestion, conflicting evidence, limitations, implications, recommendations and a source table."
      }
    ]
  },
  "file-analysis": {
    "eyebrow": "7. Research, Files and Data",
    "title": "PDF and Document Analysis",
    "summary": "Extract information from files while preserving page references, context and uncertainty.",
    "concepts": [
      "State what information you need from the document.",
      "Request page-level references.",
      "Distinguish document claims from your own conclusions."
    ],
    "workflow": [
      "Analyse tables and figures separately.",
      "Ask for missing or unreadable sections to be flagged.",
      "Use structured extraction for repeated fields."
    ],
    "mistakes": [
      "Summarising only retrieved snippets.",
      "Ignoring footnotes and appendices.",
      "Making claims from unreadable scans."
    ],
    "prompts": [
      {
        "title": "Document summary",
        "prompt": "Analyse the attached document. Return: executive summary, key claims with page references, important definitions, evidence, risks, unresolved questions and a section-by-section outline. Do not infer missing text."
      },
      {
        "title": "Structured extraction",
        "prompt": "Extract the following fields from the attached files: [FIELDS]. Return a table with document name, page, extracted value, exact supporting text and confidence. Use 'Not found' instead of guessing."
      }
    ]
  },
  "spreadsheet-analysis": {
    "eyebrow": "7. Research, Files and Data",
    "title": "Spreadsheet and Data Analysis",
    "summary": "Inspect data quality, calculate metrics and communicate findings with clear assumptions.",
    "concepts": [
      "Understand columns and units before calculating.",
      "Check missing values, duplicates and outliers.",
      "Separate descriptive findings from causal claims."
    ],
    "workflow": [
      "Define the business question.",
      "Ask for validation checks.",
      "Request charts only when they improve understanding."
    ],
    "mistakes": [
      "Calculating with inconsistent units.",
      "Ignoring filtered or hidden data.",
      "Claiming causation from correlation."
    ],
    "prompts": [
      {
        "title": "Data analysis",
        "prompt": "Analyse the attached spreadsheet for [BUSINESS QUESTION]. First profile the data and flag quality issues. Then calculate relevant metrics, identify patterns and outliers, create suitable charts and provide recommendations with assumptions."
      },
      {
        "title": "Data cleaning plan",
        "prompt": "Inspect the dataset and create a cleaning plan covering types, missing values, duplicates, inconsistent categories, invalid dates, outliers and validation rules. Do not modify values without explaining the rule."
      }
    ]
  },
  "summarisation": {
    "eyebrow": "7. Research, Files and Data",
    "title": "Summarisation and Knowledge Extraction",
    "summary": "Create summaries tailored to a purpose rather than compressing everything equally.",
    "concepts": [
      "Define the reader and decision.",
      "Preserve critical caveats and numbers.",
      "Choose a structure such as executive summary, action list or study notes."
    ],
    "workflow": [
      "Specify what must not be omitted.",
      "Ask for quotations only when necessary.",
      "Request questions or knowledge gaps."
    ],
    "mistakes": [
      "Producing generic summaries.",
      "Dropping uncertainty and exceptions.",
      "Combining information from different sources without attribution."
    ],
    "prompts": [
      {
        "title": "Executive summary",
        "prompt": "Summarise the content for [AUDIENCE] who needs to decide [DECISION]. Include the five most important points, evidence, risks, open questions and recommended next actions. Preserve critical numbers and caveats."
      },
      {
        "title": "Study notes",
        "prompt": "Turn this material into study notes with definitions, concept explanations, examples, misconceptions, flashcards and ten practice questions with answers. Material: [PASTE]."
      }
    ]
  },
  "daily-planning": {
    "eyebrow": "8. Planning and Productivity",
    "title": "Daily Planning",
    "summary": "Turn tasks, deadlines and available time into a realistic daily plan.",
    "concepts": [
      "Account for effort, energy and dependencies.",
      "Protect focused time for high-value work.",
      "Keep buffer for interruptions."
    ],
    "workflow": [
      "Provide calendar constraints and priorities.",
      "Ask ChatGPT to challenge an overloaded plan.",
      "End with the first physical action."
    ],
    "mistakes": [
      "Planning every minute.",
      "Ignoring context switching.",
      "Treating all tasks as equal priority."
    ],
    "prompts": [
      {
        "title": "Day plan",
        "prompt": "Plan my day from [START] to [END]. Fixed events: [EVENTS]. Tasks with deadlines and estimates: [TASKS]. Priorities: [PRIORITIES]. Include focus blocks, breaks, buffer and a short end-of-day review."
      },
      {
        "title": "Overload review",
        "prompt": "Review my task list and tell me what is unrealistic. Categorise tasks into do today, schedule, delegate and remove. Explain trade-offs and create a minimum successful day. Tasks: [LIST]."
      }
    ]
  },
  "meeting-preparation": {
    "eyebrow": "8. Planning and Productivity",
    "title": "Meeting Preparation",
    "summary": "Prepare agendas, questions and decision material before a meeting.",
    "concepts": [
      "Define the meeting outcome.",
      "List decisions and pre-reading.",
      "Allocate time to the most important discussion."
    ],
    "workflow": [
      "Include attendees and their perspectives.",
      "Prepare likely objections.",
      "Define what will happen if no decision is reached."
    ],
    "mistakes": [
      "Using status updates as meetings.",
      "No clear owner or decision.",
      "Inviting people without a role."
    ],
    "prompts": [
      {
        "title": "Meeting agenda",
        "prompt": "Create a [DURATION]-minute agenda for [MEETING]. Goal: [GOAL]. Attendees: [PEOPLE]. Include preparation, timeboxes, decision questions, facilitator notes and expected outputs."
      },
      {
        "title": "Stakeholder preparation",
        "prompt": "Help me prepare for a meeting with [STAKEHOLDER]. Their likely priorities are [PRIORITIES]. My goal is [GOAL]. Create opening, key messages, questions, objections, responses and fallback options."
      }
    ]
  },
  "meeting-notes": {
    "eyebrow": "8. Planning and Productivity",
    "title": "Meeting Notes and Action Items",
    "summary": "Convert raw notes or transcripts into decisions, actions, owners and unresolved questions.",
    "concepts": [
      "Separate decisions from discussion.",
      "Assign owners and dates.",
      "Flag ambiguity rather than inventing commitments."
    ],
    "workflow": [
      "Provide participant names.",
      "Request exact wording for sensitive decisions.",
      "Create a follow-up message from the summary."
    ],
    "mistakes": [
      "Treating suggestions as decisions.",
      "Inventing owners.",
      "Losing unresolved risks."
    ],
    "prompts": [
      {
        "title": "Meeting summary",
        "prompt": "Turn these notes into: purpose, attendees, decisions, action items with owner and deadline, risks, unresolved questions and next meeting. Mark unclear owners or dates as TBD. Notes: [PASTE]."
      },
      {
        "title": "Follow-up email",
        "prompt": "Using the meeting summary below, draft a concise follow-up email. Lead with decisions, list actions in a table and ask recipients to correct anything inaccurate by [DATE]. Summary: [PASTE]."
      }
    ]
  },
  "decision-making": {
    "eyebrow": "8. Planning and Productivity",
    "title": "Decision Making",
    "summary": "Compare options using explicit criteria, evidence, risks and assumptions.",
    "concepts": [
      "Define decision criteria before comparing options.",
      "Weight criteria based on priorities.",
      "Include reversibility and cost of delay."
    ],
    "workflow": [
      "Ask for missing evidence.",
      "Run a pre-mortem on the preferred option.",
      "Separate recommendation from certainty."
    ],
    "mistakes": [
      "Choosing criteria after seeing results.",
      "Ignoring implementation risk.",
      "Using false precision."
    ],
    "prompts": [
      {
        "title": "Decision matrix",
        "prompt": "Help me choose between [OPTIONS]. First propose decision criteria and weights based on [PRIORITIES]. Then create a scored matrix, explain assumptions, identify sensitivity and recommend the next validation step."
      },
      {
        "title": "Pre-mortem",
        "prompt": "Assume we selected [OPTION] and it failed six months later. List the most plausible causes, early warning signals, prevention actions and contingency plans."
      }
    ]
  },
  "personal-knowledge": {
    "eyebrow": "8. Planning and Productivity",
    "title": "Personal Knowledge Systems",
    "summary": "Organise notes, prompts and decisions into a lightweight system you can maintain.",
    "concepts": [
      "Capture information with a clear purpose.",
      "Use consistent tags and templates.",
      "Review and consolidate regularly."
    ],
    "workflow": [
      "Keep the number of categories small.",
      "Link notes to projects and decisions.",
      "Archive instead of endlessly reorganising."
    ],
    "mistakes": [
      "Building a complex system before using it.",
      "Saving information without retrieval cues.",
      "Keeping duplicate versions."
    ],
    "prompts": [
      {
        "title": "Knowledge system",
        "prompt": "Design a simple personal knowledge system for [TOOLS I USE]. I need to manage [CONTENT TYPES]. Define folders, tags, note templates, capture workflow, weekly review and archive rules."
      },
      {
        "title": "Note cleanup",
        "prompt": "Organise the notes below into projects, areas, references and archive. Remove duplicates, identify actions and create clear titles and tags. Notes: [PASTE]."
      }
    ]
  },
  "personal-learning-plan": {
    "eyebrow": "9. Learning and Career",
    "title": "Personal Learning Plans",
    "summary": "Create a realistic learning path based on goals, current level and available time.",
    "concepts": [
      "Start with a diagnostic.",
      "Sequence prerequisites before advanced projects.",
      "Use projects and retrieval practice, not only content consumption."
    ],
    "workflow": [
      "Set a measurable target date.",
      "Define weekly outputs.",
      "Include review and adjustment checkpoints."
    ],
    "mistakes": [
      "Overloading the plan with resources.",
      "Skipping fundamentals.",
      "Measuring progress only by hours watched."
    ],
    "prompts": [
      {
        "title": "Learning plan",
        "prompt": "Create a [DURATION] learning plan for [SKILL]. Current level: [LEVEL]. Goal: [GOAL]. Time available: [TIME]. Include weekly concepts, exercises, projects, assessments, review days and success criteria."
      },
      {
        "title": "Diagnostic",
        "prompt": "Assess my current knowledge of [TOPIC] through 12 questions, one at a time. Adapt difficulty based on my answers. At the end, identify strengths, gaps and the next five topics I should study."
      }
    ]
  },
  "tutor-mode": {
    "eyebrow": "9. Learning and Career",
    "title": "Using ChatGPT as a Tutor",
    "summary": "Learn interactively through questions, explanations, examples and corrective feedback.",
    "concepts": [
      "Ask for one concept at a time.",
      "Use Socratic questions instead of immediate answers.",
      "Explain your reasoning and request feedback."
    ],
    "workflow": [
      "Specify your level.",
      "Ask for hints before solutions.",
      "End lessons with recall questions."
    ],
    "mistakes": [
      "Reading passively.",
      "Letting ChatGPT solve every exercise.",
      "Moving on without checking understanding."
    ],
    "prompts": [
      {
        "title": "Socratic tutor",
        "prompt": "Teach me [TOPIC] using the Socratic method. Ask one question at a time, adapt to my answers and give hints before explanations. Do not move on until I can explain the concept in my own words."
      },
      {
        "title": "Practice session",
        "prompt": "Create a 30-minute active practice session on [TOPIC]. Include warm-up recall, one worked example, three exercises of increasing difficulty, feedback criteria and a final reflection."
      }
    ]
  },
  "interview-practice": {
    "eyebrow": "9. Learning and Career",
    "title": "Interview Practice",
    "summary": "Simulate interviews, evaluate answers and improve communication under realistic constraints.",
    "concepts": [
      "Define role, level and interview type.",
      "Answer before seeing model responses.",
      "Review content, structure and delivery separately."
    ],
    "workflow": [
      "Use one question at a time.",
      "Request follow-up questions.",
      "Track recurring weaknesses."
    ],
    "mistakes": [
      "Memorising generic answers.",
      "Receiving overly positive feedback.",
      "Ignoring role-specific depth."
    ],
    "prompts": [
      {
        "title": "Mock interview",
        "prompt": "Run a realistic interview for [ROLE] at [LEVEL]. Ask one question at a time and use follow-ups. Do not give feedback until I answer. Score each answer for relevance, depth, structure and communication, then suggest a stronger version."
      },
      {
        "title": "Behavioural answer",
        "prompt": "Help me build a STAR answer for [QUESTION]. Interview me for Situation, Task, Action and Result. Challenge vague claims and ask for measurable impact. Then write a natural 90-second answer."
      }
    ]
  },
  "resume-cover-letter": {
    "eyebrow": "9. Learning and Career",
    "title": "Resumes and Cover Letters",
    "summary": "Tailor career documents to a target role without inventing experience.",
    "concepts": [
      "Use the job description as a source of priorities.",
      "Translate responsibilities into evidence and impact.",
      "Preserve truth and flag missing metrics."
    ],
    "workflow": [
      "Provide existing resume and role description.",
      "Request an evidence gap list.",
      "Use specific keywords naturally."
    ],
    "mistakes": [
      "Fabricating skills or achievements.",
      "Stuffing keywords.",
      "Using generic summaries."
    ],
    "prompts": [
      {
        "title": "Resume tailoring",
        "prompt": "Tailor my resume to the job description without inventing experience. Identify priority requirements, map existing evidence, rewrite bullets using action + context + impact, flag missing proof and produce an ATS-friendly version. Resume: [PASTE]. Job: [PASTE]."
      },
      {
        "title": "Cover letter",
        "prompt": "Write a concise cover letter for [ROLE] at [COMPANY] using only the evidence in my resume. Connect three relevant experiences to the company's needs and avoid generic enthusiasm. Resume: [PASTE]. Job: [PASTE]."
      }
    ]
  },
  "portfolio-projects": {
    "eyebrow": "9. Learning and Career",
    "title": "Portfolio and Project Ideas",
    "summary": "Design projects that demonstrate skills through a clear problem, implementation and measurable result.",
    "concepts": [
      "Start with an authentic user or business problem.",
      "Define scope that can be completed.",
      "Document decisions, trade-offs and results."
    ],
    "workflow": [
      "Choose projects aligned with target roles.",
      "Include evaluation and deployment.",
      "Create a strong README and demo story."
    ],
    "mistakes": [
      "Building tutorial clones.",
      "Using too many technologies.",
      "Showing code without explaining impact."
    ],
    "prompts": [
      {
        "title": "Project generator",
        "prompt": "Propose 10 portfolio projects for [TARGET ROLE]. My skills: [SKILLS]. Each project must solve a real problem and include users, dataset or inputs, core features, technical architecture, evaluation, deployment and what it proves."
      },
      {
        "title": "Project plan",
        "prompt": "Turn this idea into a four-week project plan: [IDEA]. Include scope, user stories, architecture, milestones, risks, test plan, evaluation metrics, demo script and portfolio README outline."
      }
    ]
  },
  "projects-feature": {
    "eyebrow": "10. Advanced ChatGPT Workflows",
    "title": "Projects for Long-Running Work",
    "summary": "Keep related chats, instructions and files together for an ongoing initiative.",
    "concepts": [
      "Use one project per meaningful body of work.",
      "Add project-level instructions that remain stable.",
      "Keep source files curated and current."
    ],
    "workflow": [
      "Define project goals and outputs.",
      "Create separate chats for research, drafting and review.",
      "Periodically remove stale material."
    ],
    "mistakes": [
      "Using projects as unorganised storage.",
      "Adding conflicting instructions.",
      "Assuming every chat needs the same context."
    ],
    "prompts": [
      {
        "title": "Project design",
        "prompt": "Design a ChatGPT Project for [INITIATIVE]. Define project instructions, recommended files, chat structure, naming conventions, recurring workflows, review checklist and what should not be stored in the project."
      },
      {
        "title": "Project instruction",
        "prompt": "Write concise project instructions for [PROJECT]. Include objective, audience, source hierarchy, tone, constraints, definition of done, privacy boundaries and how to handle missing information."
      }
    ]
  },
  "canvas-workflows": {
    "eyebrow": "10. Advanced ChatGPT Workflows",
    "title": "Canvas for Writing and Coding",
    "summary": "Use a shared editing workspace for longer documents, code and iterative revision.",
    "concepts": [
      "Canvas is useful when you need to edit sections directly.",
      "Highlight specific areas for focused changes.",
      "Use version history or staged review for major revisions."
    ],
    "workflow": [
      "Start with an outline.",
      "Revise one dimension at a time.",
      "Ask for inline critique before accepting changes."
    ],
    "mistakes": [
      "Rewriting the complete document for every change.",
      "Losing strong passages.",
      "Applying suggestions without reviewing context."
    ],
    "prompts": [
      {
        "title": "Writing canvas",
        "prompt": "Open a canvas and help me develop a [DOCUMENT]. First create an outline. Then draft one section at a time. After each section, critique clarity, evidence and flow before continuing."
      },
      {
        "title": "Code canvas",
        "prompt": "Open a coding canvas for the component below. First explain the current structure, then identify bugs and refactoring opportunities. Apply changes in small steps and preserve existing behaviour. Code: [PASTE]."
      }
    ]
  },
  "memory-instructions": {
    "eyebrow": "10. Advanced ChatGPT Workflows",
    "title": "Memory and Custom Instructions",
    "summary": "Use stable preferences to reduce repetition while keeping project-specific details in the right place.",
    "concepts": [
      "Custom instructions are best for enduring preferences.",
      "Project instructions should contain project-specific rules.",
      "Sensitive or temporary details should not become broad preferences."
    ],
    "workflow": [
      "Write concise, non-conflicting instructions.",
      "Review stored preferences periodically.",
      "Tell ChatGPT when a preference should apply only to one task."
    ],
    "mistakes": [
      "Saving every detail as a permanent preference.",
      "Creating contradictory instructions.",
      "Assuming memory replaces explicit context."
    ],
    "prompts": [
      {
        "title": "Custom instruction builder",
        "prompt": "Interview me to create useful ChatGPT custom instructions. Ask about my role, common tasks, preferred writing style, formatting, technical level, decision preferences and things to avoid. Then produce concise instructions."
      },
      {
        "title": "Instruction audit",
        "prompt": "Audit these instructions for ambiguity, conflicts, unnecessary detail and missing rules. Return a shorter, clearer version grouped into Context, Response Style, Workflow and Boundaries. Instructions: [PASTE]."
      }
    ]
  },
  "multimodal-workflows": {
    "eyebrow": "10. Advanced ChatGPT Workflows",
    "title": "Multimodal Workflows",
    "summary": "Combine text, images, files and structured outputs in one end-to-end workflow.",
    "concepts": [
      "Different input types provide different evidence.",
      "Describe what each attachment represents.",
      "Specify how insights should be combined."
    ],
    "workflow": [
      "Label files and images.",
      "Request uncertainty when content is unclear.",
      "Choose an output format suitable for the next step."
    ],
    "mistakes": [
      "Attaching files without instructions.",
      "Treating visual interpretation as perfectly reliable.",
      "Combining contradictory inputs without reconciliation."
    ],
    "prompts": [
      {
        "title": "Multimodal analysis",
        "prompt": "Analyse the attached screenshots, document and notes together. First state what each source contributes, then identify agreements, conflicts and missing information. Produce findings, recommendations and a source map."
      },
      {
        "title": "Design-to-code",
        "prompt": "Use the attached UI screenshot as the visual reference and the attached code as the implementation source. Identify layout differences, map each visible region to components and return the complete updated React code."
      }
    ]
  },
  "end-to-end-workflow": {
    "eyebrow": "10. Advanced ChatGPT Workflows",
    "title": "Build Your Personal ChatGPT System",
    "summary": "Combine templates, projects, verification and review into a repeatable personal operating system.",
    "concepts": [
      "Select a small set of high-value workflows.",
      "Standardise inputs, outputs and quality checks.",
      "Measure time saved and output quality."
    ],
    "workflow": [
      "Create starter prompts for recurring work.",
      "Define when human verification is mandatory.",
      "Review workflows monthly."
    ],
    "mistakes": [
      "Automating low-value tasks.",
      "Using one mega-prompt for everything.",
      "Failing to update workflows as needs change."
    ],
    "prompts": [
      {
        "title": "Personal AI system",
        "prompt": "Design my personal ChatGPT operating system. My role: [ROLE]. Recurring work: [TASKS]. Tools: [TOOLS]. Create projects, reusable prompts, daily and weekly workflows, verification rules, privacy boundaries and success metrics."
      },
      {
        "title": "Workflow optimisation",
        "prompt": "Analyse my current ChatGPT workflow below. Identify repeated effort, weak prompts, missing verification, tasks suitable for templates and tasks suitable for automation. Propose a simpler improved system. Workflow: [PASTE]."
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

function TopicSidebar({
  theme,
  activeTopic,
  setActiveTopic,
  search,
  setSearch,
  mobileOpen,
  setMobileOpen,
}) {
  const styles = getTheme(theme);

  const filteredChapters = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return chapters;

    return chapters
      .map((chapter) => ({
        ...chapter,
        topics: chapter.topics.filter((topic) =>
          topic.title.toLowerCase().includes(query)
        ),
      }))
      .filter((chapter) => chapter.topics.length > 0);
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
        <div className={`flex items-center justify-between border-b px-6 py-6 ${styles.border}`}>
          <a href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#0a66c2] text-white">
              <BookOpen className="h-5 w-5" />
            </span>

            <div>
              <p className={`text-base font-bold ${styles.heading}`}>
                Learning Center
              </p>
              <p className={`mt-0.5 text-xs font-medium ${styles.muted}`}>
                ChatGPT Guide
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
            <Search className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${styles.softText}`} />

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
          {filteredChapters.map((chapter) => (
            <div key={chapter.id} className="mb-6">
              <p className={`px-3 text-[11px] font-bold uppercase tracking-wider ${styles.muted}`}>
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
                      <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                        {topic.title}
                      </span>

                      <span className={`shrink-0 text-[11px] ${active ? styles.softText : styles.softText}`}>
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
    blue: styles.isLight ? "text-blue-700 bg-blue-100" : "text-blue-400 bg-blue-900/30",
    amber: styles.isLight ? "text-yellow-700 bg-yellow-100" : "text-yellow-400 bg-yellow-900/30",
    rose: styles.isLight ? "text-red-700 bg-red-100" : "text-red-400 bg-red-900/30",
  };

  return (
    <section className={`border-t py-8 ${styles.border}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className={`flex h-8 w-8 items-center justify-center rounded-md ${tones[tone]}`}>
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
      <div className={`mb-4 flex flex-col items-start gap-3 border-b pb-4 min-[380px]:flex-row min-[380px]:justify-between min-[380px]:gap-4 ${styles.border}`}>
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
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
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

export default function ChatGPTForEveryonePage({ theme = "light" }) {
  const styles = getTheme(theme);
  const [activeTopic, setActiveTopic] = useState("what-is-chatgpt");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const allTopics = useMemo(
    () => chapters.flatMap((chapter) => chapter.topics),
    []
  );

  const activeIndex = allTopics.findIndex((topic) => topic.id === activeTopic);
  const current = topicContent[activeTopic] || topicContent["what-is-chatgpt"];
  const previousTopic = activeIndex > 0 ? allTopics[activeIndex - 1] : null;
  const nextTopic =
    activeIndex < allTopics.length - 1 ? allTopics[activeIndex + 1] : null;

  function changeTopic(topic) {
    if (!topic) return;
    setActiveTopic(topic.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={`min-h-screen ${styles.page}`}>
      <div className={`min-h-screen w-full shadow-sm lg:grid lg:grid-cols-[300px_minmax(0,1fr)] ${styles.shell}`}>
        <TopicSidebar
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

              <span className={`text-sm font-semibold ${styles.muted}`}>
                Course Materials
              </span>
            </div>

            <div className={`text-sm font-medium ${styles.muted}`}>
              Module {activeIndex + 1} of {allTopics.length}
            </div>
          </header>

          <div className="w-full px-0 py-10 lg:py-12">
            <article>
              <div className="mx-auto mb-8 max-w-3xl px-8 lg:px-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${styles.primaryText}`}>
                    {current.eyebrow.replace(/^\d+\.\s*/, "")}
                  </span>

                  <span className={`h-1 w-1 rounded-full bg-gray-300`}></span>

                  <span className={`text-xs font-medium ${styles.muted}`}>
                    {allTopics[activeIndex]?.readTime}
                  </span>
                </div>

                <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${styles.heading}`}>
                  {current.title}
                </h1>

                <p className={`mt-4 text-base leading-relaxed sm:text-lg ${styles.body}`}>
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
              </div>

              <section className={`mx-auto mt-8 max-w-3xl border-t px-8 pt-8 lg:px-12 ${styles.border}`}>
                <div>
                  <h2 className={`text-2xl font-bold tracking-tight ${styles.heading}`}>
                    Ready-to-use prompts
                  </h2>
                  <p className={`mt-2 text-sm ${styles.body}`}>
                    Copy, customize, and replace the bracketed placeholders with your own information.
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

            <div className={`mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 border-t px-8 pt-6 pb-12 sm:flex-row lg:px-12 ${styles.border}`}>
              <button
                type="button"
                disabled={!previousTopic}
                onClick={() => changeTopic(previousTopic)}
                className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.button}`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous: {previousTopic ? previousTopic.title : "Start"}
              </button>

              <button
                type="button"
                disabled={!nextTopic}
                onClick={() => changeTopic(nextTopic)}
                className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${styles.button}`}
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

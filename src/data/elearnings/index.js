import { lazy } from "react";
import chatGptThumbnail from "../../Assets/Elearnings/ChatGPT.png";
import deepLearningThumbnail from "../../Assets/Elearnings/DeepLearning.png";
import llmProjectThumbnail from "../../Assets/Elearnings/LLMProject.png";
import mlOpsThumbnail from "../../Assets/Elearnings/MLOps.png";
import machineLearningThumbnail from "../../Assets/Elearnings/MachineLearning.png";
import pythonDataScienceThumbnail from "../../Assets/Elearnings/Python4DS.png";
import aiFundamentalsThumbnail from "../../Assets/Elearnings/AIFundamentals.png";

const synchronizedCourse = (name) => lazy(() => import("./SynchronizedCoursePages").then((module) => ({ default: module[name] })));
const ChatGPTForEveryonePage = synchronizedCourse("ChatGPTCoursePage");
const DeepLearningHandbookPage = synchronizedCourse("DeepLearningCoursePage");
const LLMProjectGuidePage = synchronizedCourse("LLMCoursePage");
const MLOpsBestPracticesPage = synchronizedCourse("MLOpsCoursePage");
const MachineLearningPage = synchronizedCourse("MachineLearningCoursePage");
const PythonForDataSciencePage = synchronizedCourse("PythonCoursePage");
const AIFundamentalsPage = lazy(() => import("./AIFundamentalsPage"));

export const elearnings = [
  { slug: "ai-fundamentals-advanced-for-professionals", title: "AI Fundamentals & Advanced AI for Professionals", level: "Beginner to Advanced", duration: "Self-paced", description: "Build practical AI literacy, design reliable AI products and lead responsible adoption from strategy through operations.", component: AIFundamentalsPage, accent: "cyan", thumbnail: aiFundamentalsThumbnail },
  { slug: "chatgpt-for-everyone", title: "ChatGPT for Everyone", level: "Beginner", duration: "Self-paced", description: "Use ChatGPT confidently for research, writing and professional workflows.", component: ChatGPTForEveryonePage, accent: "blue", thumbnail: chatGptThumbnail },
  { slug: "python-for-data-science", title: "Python for Data Science", level: "Beginner", duration: "Self-paced", description: "Learn practical Python patterns for data analysis and career projects.", component: PythonForDataSciencePage, accent: "teal", thumbnail: pythonDataScienceThumbnail },
  { slug: "machine-learning", title: "Machine Learning", level: "Intermediate", duration: "Self-paced", description: "Understand models, evaluation and production-minded ML workflows.", component: MachineLearningPage, accent: "blue", thumbnail: machineLearningThumbnail },
  { slug: "deep-learning-handbook", title: "Deep Learning Handbook", level: "Intermediate", duration: "Self-paced", description: "Explore neural networks and modern deep-learning foundations.", component: DeepLearningHandbookPage, accent: "cyan", thumbnail: deepLearningThumbnail },
  { slug: "llm-project-guide", title: "LLM Project Guide", level: "Advanced", duration: "Self-paced", description: "Move from use-case definition to a credible LLM project portfolio.", component: LLMProjectGuidePage, accent: "blue", thumbnail: llmProjectThumbnail },
  { slug: "mlops-best-practices", title: "MLOps Best Practices", level: "Advanced", duration: "Self-paced", description: "Design reliable deployment, monitoring and model-operation workflows.", component: MLOpsBestPracticesPage, accent: "teal", thumbnail: mlOpsThumbnail },
];

export const elearningBySlug = Object.fromEntries(elearnings.map((item) => [item.slug, item]));

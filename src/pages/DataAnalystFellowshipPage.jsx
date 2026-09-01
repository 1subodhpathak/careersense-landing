import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight, Award, BookOpen, Briefcase, Calendar, Check,
  Rocket, ShieldCheck, Target, User, Users
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// ── DATA ANALYST ASSET PACK ──────────────────────────────────────────
import daSalesOverviewCard from "../Assets/data_analyst_pack/hero/sales-overview-card.svg";
import daTopInsightsCard from "../Assets/data_analyst_pack/hero/top-insights-card.svg";
import daCategoryShareCard from "../Assets/data_analyst_pack/hero/category-share-card.svg";

import daDataCollectionSvg from "../Assets/data_analyst_pack/learning/data-collection.svg";
import daDataCleaningSvg from "../Assets/data_analyst_pack/learning/data-cleaning.svg";
import daAnalysisSqlSvg from "../Assets/data_analyst_pack/learning/analysis-sql.svg";
import daVisualizationSvg from "../Assets/data_analyst_pack/learning/visualization.svg";
import daBusinessInsightsSvg from "../Assets/data_analyst_pack/learning/business-insights.svg";
import daCapstoneSvg from "../Assets/data_analyst_pack/learning/capstone.svg";

import daSqlSvg from "../Assets/data_analyst_pack/tools/sql.svg";
import daExcelSvg from "../Assets/data_analyst_pack/tools/excel.svg";
import daPowerBiSvg from "../Assets/data_analyst_pack/tools/power-bi.svg";
import daPythonSvg from "../Assets/data_analyst_pack/tools/python.svg";
import daTableauSvg from "../Assets/data_analyst_pack/tools/tableau.svg";
import daPandasSvg from "../Assets/data_analyst_pack/tools/pandas.svg";
import daNumpySvg from "../Assets/data_analyst_pack/tools/numpy.svg";
import daMatplotlibSvg from "../Assets/data_analyst_pack/tools/matplotlib.svg";
import daSeabornSvg from "../Assets/data_analyst_pack/tools/seaborn.svg";
import daGoogleSheetsSvg from "../Assets/data_analyst_pack/tools/google-sheets.svg";

import daCredentialStackSvg from "../Assets/data_analyst_pack/credentials/credential-stack.svg";
import daWhyJoinSvg from "../Assets/data_analyst_pack/illustrations/why-join-data-analysis.svg";
import daDashboardCtaSvg from "../Assets/data_analyst_pack/illustrations/dashboard-cta.svg";

// ── DATA SCIENCE ASSET PACK ──────────────────────────────────────────
import dsModelPerformanceCard from "../Assets/data_science_pack/hero/model-performance-card.svg";
import dsConfusionMatrixCard from "../Assets/data_science_pack/hero/confusion-matrix-card.svg";
import dsTopFeaturesCard from "../Assets/data_science_pack/hero/top-features-card.svg";

import dsDataCollectionSvg from "../Assets/data_science_pack/learning/data-collection.svg";
import dsDataCleaningSvg from "../Assets/data_science_pack/learning/data-cleaning.svg";
import dsPythonSqlSvg from "../Assets/data_science_pack/learning/python-sql.svg";
import dsMachineLearningSvg from "../Assets/data_science_pack/learning/machine-learning.svg";
import dsDataVisualizationSvg from "../Assets/data_science_pack/learning/data-visualization.svg";
import dsCapstoneSvg from "../Assets/data_science_pack/learning/capstone-project.svg";

import dsSqlSvg from "../Assets/data_science_pack/tools/sql.svg";
import dsExcelSvg from "../Assets/data_science_pack/tools/excel.svg";
import dsPythonSvg from "../Assets/data_science_pack/tools/python.svg";
import dsPandasSvg from "../Assets/data_science_pack/tools/pandas.svg";
import dsNumpySvg from "../Assets/data_science_pack/tools/numpy.svg";
import dsScikitLearnSvg from "../Assets/data_science_pack/tools/scikit-learn.svg";
import dsMatplotlibSvg from "../Assets/data_science_pack/tools/matplotlib.svg";
import dsSeabornSvg from "../Assets/data_science_pack/tools/seaborn.svg";
import dsJupyterSvg from "../Assets/data_science_pack/tools/jupyter.svg";
import dsPowerBiSvg from "../Assets/data_science_pack/tools/power-bi.svg";

import dsCredentialStackSvg from "../Assets/data_science_pack/credentials/credential-stack.svg";
import dsWhyJoinSvg from "../Assets/data_science_pack/illustrations/why-join-data-science.svg";
import dsDashboardCtaSvg from "../Assets/data_science_pack/illustrations/data-science-cta-dashboard.svg";

// ── ARTIFICIAL INTELLIGENCE ASSET PACK ────────────────────────────────
import aiModelAccuracyCard from "../Assets/ai_pack/hero/model-accuracy-card.svg";
import aiPromptQualityCard from "../Assets/ai_pack/hero/prompt-quality-card.svg";
import aiAutomationTasksCard from "../Assets/ai_pack/hero/automation-tasks-card.svg";

import aiFoundationsSvg from "../Assets/ai_pack/learning/ai-foundations.svg";
import aiPromptEngineeringSvg from "../Assets/ai_pack/learning/prompt-engineering.svg";
import aiLlmApplicationsSvg from "../Assets/ai_pack/learning/llm-applications.svg";
import aiAgentsAutomationSvg from "../Assets/ai_pack/learning/ai-agents-automation.svg";
import aiModelEvaluationSvg from "../Assets/ai_pack/learning/model-evaluation.svg";
import aiCapstoneSvg from "../Assets/ai_pack/learning/capstone-project.svg";

import aiPythonSvg from "../Assets/ai_pack/tools/python.svg";
import aiPromptingSvg from "../Assets/ai_pack/tools/prompting.svg";
import aiLlmApisSvg from "../Assets/ai_pack/tools/llm-apis.svg";
import aiLangchainSvg from "../Assets/ai_pack/tools/langchain.svg";
import aiVectorDatabasesSvg from "../Assets/ai_pack/tools/vector-databases.svg";
import aiHuggingFaceSvg from "../Assets/ai_pack/tools/hugging-face.svg";
import aiPandasSvg from "../Assets/ai_pack/tools/pandas.svg";
import aiStreamlitSvg from "../Assets/ai_pack/tools/streamlit.svg";
import aiGithubSvg from "../Assets/ai_pack/tools/github.svg";
import aiApisSvg from "../Assets/ai_pack/tools/apis.svg";

import aiCredentialStackSvg from "../Assets/ai_pack/credentials/credential-stack.svg";
import aiWhyJoinSvg from "../Assets/ai_pack/illustrations/why-join-ai-hologram.svg";
import aiDashboardCtaSvg from "../Assets/ai_pack/illustrations/ai-cta-dashboard.svg";

// ── UI/UX DESIGN ASSET PACK ──────────────────────────────────────────
import uiUserFlowCard from "../Assets/uiux_pack/hero/user-flow-card.svg";
import uiUsabilityScoreCard from "../Assets/uiux_pack/hero/usability-score-card.svg";
import uiDesignSystemCard from "../Assets/uiux_pack/hero/design-system-card.svg";

import uiUserResearchSvg from "../Assets/uiux_pack/learning/user-research.svg";
import uiWireframingSvg from "../Assets/uiux_pack/learning/wireframing.svg";
import uiDesignSvg from "../Assets/uiux_pack/learning/ui-design.svg";
import uiPrototypingSvg from "../Assets/uiux_pack/learning/prototyping.svg";
import uiDesignSystemsSvg from "../Assets/uiux_pack/learning/design-systems.svg";
import uiUxCaseStudySvg from "../Assets/uiux_pack/learning/ux-case-study.svg";

import uiFigmaSvg from "../Assets/uiux_pack/tools/figma.svg";
import uiFigJamSvg from "../Assets/uiux_pack/tools/figjam.svg";
import uiAdobeXdSvg from "../Assets/uiux_pack/tools/adobe-xd.svg";
import uiPhotoshopSvg from "../Assets/uiux_pack/tools/photoshop.svg";
import uiIllustratorSvg from "../Assets/uiux_pack/tools/illustrator.svg";
import uiMiroSvg from "../Assets/uiux_pack/tools/miro.svg";
import uiNotionSvg from "../Assets/uiux_pack/tools/notion.svg";
import uiMazeSvg from "../Assets/uiux_pack/tools/maze.svg";
import uiWebflowSvg from "../Assets/uiux_pack/tools/webflow.svg";
import uiGoogleFormsSvg from "../Assets/uiux_pack/tools/google-forms.svg";

import uiCredentialStackSvg from "../Assets/uiux_pack/credentials/credential-stack.svg";
import uiWhyJoinSvg from "../Assets/uiux_pack/illustrations/why-join-uiux.svg";
import uiDashboardCtaSvg from "../Assets/uiux_pack/illustrations/uiux-cta-dashboard.svg";

// ── APP DEVELOPER ASSET PACK ──────────────────────────────────────────
import adProjectProgressCard from "../Assets/app_dev_pack/hero/project-progress-card.svg";
import adAppsBuiltCard from "../Assets/app_dev_pack/hero/apps-built-card.svg";
import adTopSkillsGainedCard from "../Assets/app_dev_pack/hero/top-skills-gained-card.svg";

import adMobileAppDevSvg from "../Assets/app_dev_pack/learning/mobile-app-development.svg";
import adUiUxSvg from "../Assets/app_dev_pack/learning/uiux-design.svg";
import adBackendApisSvg from "../Assets/app_dev_pack/learning/backend-apis.svg";
import adDatabaseCloudSvg from "../Assets/app_dev_pack/learning/database-cloud.svg";
import adTestingDebuggingSvg from "../Assets/app_dev_pack/learning/testing-debugging.svg";
import adCapstoneSvg from "../Assets/app_dev_pack/learning/capstone-project.svg";

import adReactNativeSvg from "../Assets/app_dev_pack/tools/react-native.svg";
import adFlutterSvg from "../Assets/app_dev_pack/tools/flutter.svg";
import adJavaScriptSvg from "../Assets/app_dev_pack/tools/javascript.svg";
import adTypeScriptSvg from "../Assets/app_dev_pack/tools/typescript.svg";
import adNodeJsSvg from "../Assets/app_dev_pack/tools/nodejs.svg";
import adFirebaseSvg from "../Assets/app_dev_pack/tools/firebase.svg";
import adMongoDbSvg from "../Assets/app_dev_pack/tools/mongodb.svg";
import adExpressJsSvg from "../Assets/app_dev_pack/tools/expressjs.svg";
import adGitGithubSvg from "../Assets/app_dev_pack/tools/git-github.svg";
import adPostmanSvg from "../Assets/app_dev_pack/tools/postman.svg";

import adCredentialStackSvg from "../Assets/app_dev_pack/credentials/credential-stack.svg";
import adWhyJoinSvg from "../Assets/app_dev_pack/illustrations/why-join-app-developer.svg";
import adDashboardCtaSvg from "../Assets/app_dev_pack/illustrations/app-developer-cta.svg";

// ── FULL STACK DEVELOPER ASSET PACK ──────────────────────────────────
import fsProjectProgressCard from "../Assets/full_stack_pack/hero/project-progress-card.svg";
import fsSkillsGraphCard from "../Assets/full_stack_pack/hero/skills-graph-card.svg";
import fsTechnologiesUsedCard from "../Assets/full_stack_pack/hero/technologies-used-card.svg";

import fsFrontendDevSvg from "../Assets/full_stack_pack/learning/frontend-development.svg";
import fsBackendDevSvg from "../Assets/full_stack_pack/learning/backend-development.svg";
import fsDatabaseManagementSvg from "../Assets/full_stack_pack/learning/database-management.svg";
import fsApiIntegrationSvg from "../Assets/full_stack_pack/learning/api-integration.svg";
import fsDevOpsDeploymentSvg from "../Assets/full_stack_pack/learning/devops-deployment.svg";
import fsCapstoneSvg from "../Assets/full_stack_pack/learning/capstone-project.svg";

import fsHtml5Svg from "../Assets/full_stack_pack/tools/html5.svg";
import fsCss3Svg from "../Assets/full_stack_pack/tools/css3.svg";
import fsJavaScriptSvg from "../Assets/full_stack_pack/tools/javascript.svg";
import fsReactSvg from "../Assets/full_stack_pack/tools/react.svg";
import fsNextJsSvg from "../Assets/full_stack_pack/tools/nextjs.svg";
import fsNodeJsSvg from "../Assets/full_stack_pack/tools/nodejs.svg";
import fsExpressJsSvg from "../Assets/full_stack_pack/tools/expressjs.svg";
import fsMongoDbSvg from "../Assets/full_stack_pack/tools/mongodb.svg";
import fsSqlSvg from "../Assets/full_stack_pack/tools/sql.svg";
import fsGitSvg from "../Assets/full_stack_pack/tools/git.svg";
import fsGitHubSvg from "../Assets/full_stack_pack/tools/github.svg";
import fsDockerSvg from "../Assets/full_stack_pack/tools/docker.svg";
import fsAwsSvg from "../Assets/full_stack_pack/tools/aws.svg";
import fsFirebaseSvg from "../Assets/full_stack_pack/tools/firebase.svg";
import fsPostmanSvg from "../Assets/full_stack_pack/tools/postman.svg";

import fsCredentialStackSvg from "../Assets/full_stack_pack/credentials/credential-stack.svg";
import fsWhyJoinSvg from "../Assets/full_stack_pack/illustrations/why-join-full-stack.svg";
import fsDashboardCtaSvg from "../Assets/full_stack_pack/illustrations/full-stack-cta.svg";

// ── ORIGINAL HERO BACKGROUND IMAGES ──────────────────────────────────
import dataAnalystHeroBg from "../Assets/DataAnalyst/DA.png";
import dataScienceHeroBg from "../Assets/DataAnalyst/DS.png";
import artificialIntelligenceHeroBg from "../Assets/DataAnalyst/AI.png";
import uiuxDesignHeroBg from "../Assets/DataAnalyst/UI.png";
import fullStackDevelopmentHeroBg from "../Assets/DataAnalyst/FSD.png";
import appDevelopmentHeroBg from "../Assets/DataAnalyst/AD.png";

const fellowshipTracksConfig = {
  "data-analyst": {
    name: "Data Analyst",
    titleFirstPart: "Data Analyst",
    titleHighlightPart: "Fellowship Program",
    highlightFirst: false,
    heroBg: dataAnalystHeroBg,
    tagline: "Learn • Build • Analyse • Present • Get Recognized",
    description: "A 3-month hands-on fellowship for students to transform data into insights and real impact.",
    metrics: [
      { value: "3", label: "Months Duration", icon: Calendar },
      { value: "20+", label: "Real-World Projects", icon: Briefcase },
      { value: "10+", label: "Tools & Skills", icon: Target },
      { value: "Fellowship", label: "Certificate", icon: Award },
    ],
    heroCards: [
      { src: daSalesOverviewCard, alt: "Sales Overview widget", width: "w-[180px] sm:w-[200px]" },
      { src: daTopInsightsCard, alt: "Top Insights widget", width: "w-[270px] sm:w-[180px]" },
      { src: daCategoryShareCard, alt: "Category Share widget", width: "w-[180px] sm:w-[200px]" },
    ],
    learnAndBuild: [
      { title: "Data Collection", subtitle: "Work with real datasets", icon: daDataCollectionSvg },
      { title: "Data Cleaning", subtitle: "Transform & prepare data", icon: daDataCleaningSvg },
      { title: "Analysis & SQL", subtitle: "Write queries & extract insights", icon: daAnalysisSqlSvg },
      { title: "Visualization", subtitle: "Create dashboards that tell stories", icon: daVisualizationSvg },
      { title: "Business Insights", subtitle: "Translate data into decisions", icon: daBusinessInsightsSvg },
      { title: "Capstone Project", subtitle: "Build & present your final project", icon: daCapstoneSvg },
    ],
    tools: [
      { name: "SQL", icon: daSqlSvg },
      { name: "Excel", icon: daExcelSvg },
      { name: "Power BI", icon: daPowerBiSvg },
      { name: "Python", icon: daPythonSvg },
      { name: "Tableau", icon: daTableauSvg },
      { name: "Pandas", icon: daPandasSvg },
      { name: "Numpy", icon: daNumpySvg },
      { name: "Matplotlib", icon: daMatplotlibSvg },
      { name: "Seaborn", icon: daSeabornSvg },
      { name: "Google Sheets", icon: daGoogleSheetsSvg },
    ],
    whatYouGet: [
      "Industry-Ready Skill Development",
      "Real-World Projects",
      "Mentor Feedback & Guidance",
      "Fellowship Certificate",
      "Digital ID Card",
      "Joining Letter & Relieving Letter",
      "Project Showcase on CareerSense",
    ],
    credentialStack: daCredentialStackSvg,
    whyJoinPoints: [
      "Build a strong foundation in data analysis",
      "Work on practical, real-world projects",
      "Build your portfolio with proof of work",
      "Get recognized with CareerSense Fellow Badge",
      "Stand out in your placements & resumes",
    ],
    whyJoinIllustration: daWhyJoinSvg,
    whoItsFor: [
      { title: "University Students", style: "bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-indigo-200/80 text-[#3730a3]" },
      { title: "Final Year Students", style: "bg-gradient-to-r from-[#fff1f2] to-[#ffe4e6] border-rose-200/80 text-[#9f1239]" },
      { title: "Fresh Graduates", style: "bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80 text-[#065f46]" },
      { title: "Aspiring Analysts", style: "bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-amber-200/80 text-[#92400e]" },
      { title: "Career Changers", style: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-sky-200/80 text-[#075985]" },
      { title: "Anyone Curious About Data", style: "bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-slate-200 text-[#334155]" },
    ],
    ctaTitle: "Start Your",
    ctaHighlight: "Data Journey",
    ctaSubtitle: "3 months. Real projects. Real learning. Real you.",
    ctaButtonText: "Apply Now for Data Analyst Fellowship",
    ctaIllustration: daDashboardCtaSvg,
  },

  "data-science": {
    name: "Data Science",
    titleFirstPart: "Data Science",
    titleHighlightPart: "Fellowship Program",
    highlightFirst: true,
    heroBg: dataScienceHeroBg,
    tagline: "Learn • Build • Model • Predict • Present • Get Recognized",
    description: "A 3-month hands-on fellowship for students to solve real-world problems and build data science projects with real impact.",
    metrics: [
      { value: "3", label: "Months Duration", icon: Calendar },
      { value: "20+", label: "Real-World Projects", icon: Briefcase },
      { value: "12+", label: "Tools & Skills", icon: Target },
    ],
    heroCards: [
      { src: dsModelPerformanceCard, alt: "Model Performance widget", width: "w-[180px] sm:w-[200px]" },
      { src: dsConfusionMatrixCard, alt: "Confusion Matrix widget", width: "w-[270px] sm:w-[180px]" },
      { src: dsTopFeaturesCard, alt: "Top Features widget", width: "w-[180px] sm:w-[200px]" },
    ],
    learnAndBuild: [
      { title: "Data Collection", subtitle: "Gather data from multiple sources", icon: dsDataCollectionSvg },
      { title: "Data Cleaning", subtitle: "Clean, transform & prepare data", icon: dsDataCleaningSvg },
      { title: "Python & SQL", subtitle: "Program & query data efficiently", icon: dsPythonSqlSvg },
      { title: "Machine Learning", subtitle: "Build, train & evaluate ML models", icon: dsMachineLearningSvg },
      { title: "Data Visualization", subtitle: "Visualize insights that drive decisions", icon: dsDataVisualizationSvg },
      { title: "Capstone Project", subtitle: "Solve real-world problems end-to-end", icon: dsCapstoneSvg },
    ],
    tools: [
      { name: "SQL", icon: dsSqlSvg },
      { name: "Excel", icon: dsExcelSvg },
      { name: "Python", icon: dsPythonSvg },
      { name: "Pandas", icon: dsPandasSvg },
      { name: "NumPy", icon: dsNumpySvg },
      { name: "Scikit-learn", icon: dsScikitLearnSvg },
      { name: "Matplotlib", icon: dsMatplotlibSvg },
      { name: "Seaborn", icon: dsSeabornSvg },
      { name: "Jupyter", icon: dsJupyterSvg },
      { name: "Power BI", icon: dsPowerBiSvg },
    ],
    whatYouGet: [
      "Industry-Ready Skill Development",
      "Real-World Projects",
      "Mentor Feedback & Guidance",
      "Fellowship Certificate",
      "Digital ID Card",
      "Joining Letter & Relieving Letter",
      "Project Showcase on CareerSense",
    ],
    credentialStack: dsCredentialStackSvg,
    whyJoinPoints: [
      "Build a strong foundation in data science",
      "Work on practical, real-world projects",
      "Build your portfolio with proof of work",
      "Get recognized with CareerSense Fellow Badge",
      "Stand out in placements and resumes",
    ],
    whyJoinIllustration: dsWhyJoinSvg,
    whoItsFor: [
      { title: "University Students", style: "bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-indigo-200/80 text-[#3730a3]" },
      { title: "Final Year Students", style: "bg-gradient-to-r from-[#fff1f2] to-[#ffe4e6] border-rose-200/80 text-[#9f1239]" },
      { title: "Fresh Graduates", style: "bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80 text-[#065f46]" },
      { title: "Aspiring Data Scientists", style: "bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-amber-200/80 text-[#92400e]" },
      { title: "Career Changers", style: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-sky-200/80 text-[#075985]" },
      { title: "Anyone Curious About AI & Data", style: "bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-slate-200 text-[#334155]" },
    ],
    ctaTitle: "Start Your",
    ctaHighlight: "Data Science",
    ctaSubtitle: "3 months. Real projects. Real learning. Real impact.",
    ctaButtonText: "Apply Now for Data Science Fellowship",
    ctaIllustration: dsDashboardCtaSvg,
  },

  "artificial-intelligence": {
    name: "Artificial Intelligence",
    titleFirstPart: "Artificial Intelligence",
    titleHighlightPart: "Fellowship Program",
    highlightFirst: true,
    heroBg: artificialIntelligenceHeroBg,
    tagline: "Learn • Build • Automate • Deploy • Get Recognized",
    description: "A 3-month hands-on fellowship for students to master AI concepts, build intelligent solutions, and create real-world impact.",
    metrics: [
      { value: "3", label: "Months Duration", icon: Calendar },
      { value: "20+", label: "Real-World Projects", icon: Briefcase },
      { value: "10+", label: "Tools & Skills", icon: Target },
      { value: "Fellowship", label: "Certificate", icon: Award },
    ],
    heroCards: [
      { src: aiModelAccuracyCard, alt: "Model Accuracy widget", width: "w-[180px] sm:w-[200px]" },
      { src: aiPromptQualityCard, alt: "Prompt Quality widget", width: "w-[270px] sm:w-[180px]" },
      { src: aiAutomationTasksCard, alt: "Automation Tasks widget", width: "w-[180px] sm:w-[200px]" },
    ],
    learnAndBuild: [
      { title: "AI Foundations", subtitle: "Understand core AI concepts, ML basics, and modern paradigms.", icon: aiFoundationsSvg },
      { title: "Prompt Engineering", subtitle: "Craft effective prompts and optimize outputs for real-world use.", icon: aiPromptEngineeringSvg },
      { title: "LLM Applications", subtitle: "Build powerful apps using LLMs for diverse domains.", icon: aiLlmApplicationsSvg },
      { title: "AI Agents & Automation", subtitle: "Design agents and automate workflows with real tools.", icon: aiAgentsAutomationSvg },
      { title: "Model Evaluation", subtitle: "Evaluate, compare, and improve models for better performance.", icon: aiModelEvaluationSvg },
      { title: "Capstone Project", subtitle: "Build and deploy an end-to-end AI project to solve real problems.", icon: aiCapstoneSvg },
    ],
    tools: [
      { name: "Python", icon: aiPythonSvg },
      { name: "Prompting", icon: aiPromptingSvg },
      { name: "LLM APIs", icon: aiLlmApisSvg },
      { name: "LangChain", icon: aiLangchainSvg },
      { name: "Vector Databases", icon: aiVectorDatabasesSvg },
      { name: "Hugging Face", icon: aiHuggingFaceSvg },
      { name: "Pandas", icon: aiPandasSvg },
      { name: "Streamlit", icon: aiStreamlitSvg },
      { name: "GitHub", icon: aiGithubSvg },
      { name: "APIs", icon: aiApisSvg },
    ],
    whatYouGet: [
      "Industry-Ready AI Skill Development",
      "Real-World Projects",
      "Mentor Feedback & Guidance",
      "Fellowship Certificate",
      "Digital ID Card",
      "Joining Letter & Relieving Letter",
      "Project Showcase on CareerSense",
    ],
    credentialStack: aiCredentialStackSvg,
    whyJoinPoints: [
      "Build a strong foundation in AI",
      "Work on practical, real-world projects",
      "Build your portfolio with proof of work",
      "Get recognized with a CareerSense Fellow Badge",
      "Stand out in placements & resumes",
    ],
    whyJoinIllustration: aiWhyJoinSvg,
    whoItsFor: [
      { title: "University Students", style: "bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-indigo-200/80 text-[#3730a3]" },
      { title: "Final Year Students", style: "bg-gradient-to-r from-[#fff1f2] to-[#ffe4e6] border-rose-200/80 text-[#9f1239]" },
      { title: "Fresh Graduates", style: "bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80 text-[#065f46]" },
      { title: "Aspiring AI Builders", style: "bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-amber-200/80 text-[#92400e]" },
      { title: "Career Changers", style: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-sky-200/80 text-[#075985]" },
      { title: "Anyone Curious About AI", style: "bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-slate-200 text-[#334155]" },
    ],
    ctaTitle: "Start Your",
    ctaHighlight: "AI",
    ctaSubtitle: "3 months. Real projects. Real learning. Real you.",
    ctaButtonText: "Apply Now for AI Fellowship",
    ctaIllustration: aiDashboardCtaSvg,
  },

  "ui-ux-design": {
    name: "UI/UX Design",
    titleFirstPart: "UI/UX Design",
    titleHighlightPart: "Fellowship Program",
    highlightFirst: true,
    heroBg: uiuxDesignHeroBg,
    tagline: "Research • Design • Prototype • Test • Get Recognized",
    description: "A 3-month hands-on fellowship for students to learn user-centered design, build product experiences, and create a strong portfolio.",
    metrics: [
      { value: "3", label: "Months Duration", icon: Calendar },
      { value: "20+", label: "Real-World Projects", icon: Briefcase },
      { value: "10+", label: "Tools & Skills", icon: Target },
      { value: "Fellowship", label: "Certificate", icon: Award },
    ],
    heroCards: [
      { src: uiUserFlowCard, alt: "User Flow widget", width: "w-[180px] sm:w-[200px]" },
      { src: uiUsabilityScoreCard, alt: "Usability Score widget", width: "w-[270px] sm:w-[180px]" },
      { src: uiDesignSystemCard, alt: "Design System widget", width: "w-[180px] sm:w-[200px]" },
    ],
    learnAndBuild: [
      { title: "User Research", subtitle: "Understand users, goals & pain points", icon: uiUserResearchSvg },
      { title: "Wireframing", subtitle: "Sketch flows & low-fidelity ideas", icon: uiWireframingSvg },
      { title: "UI Design", subtitle: "Create polished and accessible screens", icon: uiDesignSvg },
      { title: "Prototyping", subtitle: "Build interactive product experiences", icon: uiPrototypingSvg },
      { title: "Design Systems", subtitle: "Create reusable components & consistency", icon: uiDesignSystemsSvg },
      { title: "UX Case Study", subtitle: "Present your final project professionally", icon: uiUxCaseStudySvg },
    ],
    tools: [
      { name: "Figma", icon: uiFigmaSvg },
      { name: "FigJam", icon: uiFigJamSvg },
      { name: "Adobe XD", icon: uiAdobeXdSvg },
      { name: "Photoshop", icon: uiPhotoshopSvg },
      { name: "Illustrator", icon: uiIllustratorSvg },
      { name: "Miro", icon: uiMiroSvg },
      { name: "Notion", icon: uiNotionSvg },
      { name: "Maze", icon: uiMazeSvg },
      { name: "Webflow", icon: uiWebflowSvg },
      { name: "Google Forms", icon: uiGoogleFormsSvg },
    ],
    whatYouGet: [
      "Industry-Ready Design Skills",
      "Real-World Projects",
      "Mentor Feedback & Guidance",
      "Fellowship Certificate",
      "Digital ID Card",
      "Joining Letter & Relieving Letter",
      "Portfolio Showcase on CareerSense",
    ],
    credentialStack: uiCredentialStackSvg,
    whyJoinPoints: [
      "Build a strong foundation in UI/UX design",
      "Work on practical, real-world projects",
      "Build your portfolio with proof of work",
      "Get recognized with CareerSense Fellow Badge",
      "Stand out in internships, placements & interviews",
    ],
    whyJoinIllustration: uiWhyJoinSvg,
    whoItsFor: [
      { title: "University Students", style: "bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-indigo-200/80 text-[#3730a3]" },
      { title: "Final Year Students", style: "bg-gradient-to-r from-[#fff1f2] to-[#ffe4e6] border-rose-200/80 text-[#9f1239]" },
      { title: "Fresh Graduates", style: "bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80 text-[#065f46]" },
      { title: "Aspiring Designers", style: "bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-amber-200/80 text-[#92400e]" },
      { title: "Career Changers", style: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-sky-200/80 text-[#075985]" },
      { title: "Anyone Curious About Product Design", style: "bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-slate-200 text-[#334155]" },
    ],
    ctaTitle: "Start Your",
    ctaHighlight: "Design",
    ctaSubtitle: "3 months. Real projects. Real learning. Real portfolio.",
    ctaButtonText: "Apply Now for UI/UX Design Fellowship",
    ctaIllustration: uiDashboardCtaSvg,
  },

  "app-development": {
    name: "App Development",
    titleFirstPart: "App Developer",
    titleHighlightPart: "Fellowship Program",
    highlightFirst: false,
    heroBg: appDevelopmentHeroBg,
    tagline: "Design • Build • Publish • Impact",
    description: "A 3-month immersive fellowship to help you go from learner to confident app developer. Build real-world apps and launch your career.",
    metrics: [
      { value: "3", label: "Months Duration", icon: Calendar },
      { value: "20+", label: "Real-World Projects", icon: Briefcase },
      { value: "10+", label: "Technologies & Tools", icon: Target },
      { value: "Fellowship", label: "Certificate", icon: Award },
    ],
    heroCards: [
      { src: adProjectProgressCard, alt: "Project Progress widget", width: "w-[180px] sm:w-[200px]" },
      { src: adAppsBuiltCard, alt: "Apps Built widget", width: "w-[270px] sm:w-[180px]" },
      { src: adTopSkillsGainedCard, alt: "Top Skills Gained widget", width: "w-[180px] sm:w-[200px]" },
    ],
    learnAndBuild: [
      { title: "Mobile App Development", subtitle: "Build cross-platform apps with modern frameworks", icon: adMobileAppDevSvg },
      { title: "UI/UX Design", subtitle: "Design beautiful, user-friendly interfaces", icon: adUiUxSvg },
      { title: "Backend & APIs", subtitle: "Build and integrate robust APIs and backend services", icon: adBackendApisSvg },
      { title: "Database & Cloud", subtitle: "Work with databases and cloud platforms", icon: adDatabaseCloudSvg },
      { title: "Testing & Debugging", subtitle: "Test, debug and optimize your apps", icon: adTestingDebuggingSvg },
      { title: "Capstone Project", subtitle: "Build, publish & showcase your complete application", icon: adCapstoneSvg },
    ],
    tools: [
      { name: "React Native", icon: adReactNativeSvg },
      { name: "Flutter", icon: adFlutterSvg },
      { name: "JavaScript", icon: adJavaScriptSvg },
      { name: "TypeScript", icon: adTypeScriptSvg },
      { name: "Node.js", icon: adNodeJsSvg },
      { name: "Firebase", icon: adFirebaseSvg },
      { name: "MongoDB", icon: adMongoDbSvg },
      { name: "Express.js", icon: adExpressJsSvg },
      { name: "Git & GitHub", icon: adGitGithubSvg },
      { name: "Postman", icon: adPostmanSvg },
    ],
    whatYouGet: [
      "Industry-Ready App Development Skills",
      "Real-World Projects & Assignments",
      "Mentor Feedback & Code Reviews",
      "Fellowship Certificate",
      "Digital ID Card",
      "Joining Letter & Relieving Letter",
      "GitHub Portfolio to Showcase Projects",
    ],
    credentialStack: adCredentialStackSvg,
    whyJoinPoints: [
      "Build real-world mobile applications",
      "Learn from industry experts & mentors",
      "Enhance problem-solving & coding skills",
      "Create a strong developer portfolio",
      "Stand out in placements & interviews",
    ],
    whyJoinIllustration: adWhyJoinSvg,
    whoItsFor: [
      { title: "Computer Science Students", style: "bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-indigo-200/80 text-[#3730a3]" },
      { title: "Final Year Students", style: "bg-gradient-to-r from-[#fff1f2] to-[#ffe4e6] border-rose-200/80 text-[#9f1239]" },
      { title: "Aspiring App Developers", style: "bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80 text-[#065f46]" },
      { title: "Fresh Graduates", style: "bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-amber-200/80 text-[#92400e]" },
      { title: "Career Switchers", style: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-sky-200/80 text-[#075985]" },
      { title: "Anyone Passionate About App Development", style: "bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-slate-200 text-[#334155]" },
    ],
    ctaTitle: "Build Amazing Apps. Make an",
    ctaHighlight: "Impact.",
    ctaSubtitle: "Start your App Developer journey today!",
    ctaButtonText: "Apply Now for App Developer Fellowship",
    ctaIllustration: adDashboardCtaSvg,
  },

  "full-stack-development": {
    name: "Full Stack Development",
    titleFirstPart: "Full Stack Developer",
    titleHighlightPart: "Fellowship Program",
    highlightFirst: false,
    heroBg: fullStackDevelopmentHeroBg,
    tagline: "Design • Develop • Deploy • Scale • Succeed",
    description: "A 3-month immersive fellowship to help you build production-ready full stack applications and kickstart your developer career.",
    metrics: [
      { value: "3", label: "Months Duration", icon: Calendar },
      { value: "20+", label: "Real-World Projects", icon: Briefcase },
      { value: "10+", label: "Technologies & Tools", icon: Target },
      { value: "Fellowship", label: "Certificate", icon: Award },
    ],
    heroCards: [
      { src: fsProjectProgressCard, alt: "Project Progress widget", width: "w-[180px] sm:w-[200px]" },
      { src: fsSkillsGraphCard, alt: "Skills Graph widget", width: "w-[270px] sm:w-[180px]" },
      { src: fsTechnologiesUsedCard, alt: "Technologies Used widget", width: "w-[180px] sm:w-[200px]" },
    ],
    learnAndBuild: [
      { title: "Frontend Development", subtitle: "Build responsive UI with modern libraries", icon: fsFrontendDevSvg },
      { title: "Backend Development", subtitle: "Build robust APIs and server logic", icon: fsBackendDevSvg },
      { title: "Database Management", subtitle: "Work with SQL & NoSQL databases", icon: fsDatabaseManagementSvg },
      { title: "API Integration", subtitle: "Connect APIs and third-party services", icon: fsApiIntegrationSvg },
      { title: "DevOps & Deployment", subtitle: "Deploy applications to the cloud", icon: fsDevOpsDeploymentSvg },
      { title: "Capstone Project", subtitle: "Build & launch a full stack application", icon: fsCapstoneSvg },
    ],
    tools: [
      { name: "HTML", icon: fsHtml5Svg },
      { name: "CSS", icon: fsCss3Svg },
      { name: "JavaScript", icon: fsJavaScriptSvg },
      { name: "React", icon: fsReactSvg },
      { name: "Next.js", icon: fsNextJsSvg },
      { name: "Node.js", icon: fsNodeJsSvg },
      { name: "Express.js", icon: fsExpressJsSvg },
      { name: "MongoDB", icon: fsMongoDbSvg },
      { name: "SQL", icon: fsSqlSvg },
      { name: "Git", icon: fsGitSvg },
      { name: "GitHub", icon: fsGitHubSvg },
      { name: "Docker", icon: fsDockerSvg },
      { name: "AWS", icon: fsAwsSvg },
      { name: "Firebase", icon: fsFirebaseSvg },
      { name: "Postman", icon: fsPostmanSvg },
    ],
    whatYouGet: [
      "Industry-Ready Full Stack Skills",
      "Real-World Projects & Assignments",
      "Mentor Feedback & Code Reviews",
      "Fellowship Certificate",
      "Digital ID Card",
      "Joining Letter & Relieving Letter",
      "GitHub Portfolio to Showcase Projects",
    ],
    credentialStack: fsCredentialStackSvg,
    whyJoinPoints: [
      "Build end-to-end web applications",
      "Work on real-world industry projects",
      "Strengthen problem-solving skills",
      "Create a strong developer portfolio",
      "Stand out in placements & interviews",
    ],
    whyJoinIllustration: fsWhyJoinSvg,
    whoItsFor: [
      { title: "Computer Science Students", style: "bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border-indigo-200/80 text-[#3730a3]" },
      { title: "Final Year Students", style: "bg-gradient-to-r from-[#fff1f2] to-[#ffe4e6] border-rose-200/80 text-[#9f1239]" },
      { title: "Aspiring Full Stack Developers", style: "bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-emerald-200/80 text-[#065f46]" },
      { title: "Career Switchers", style: "bg-gradient-to-r from-[#fffbeb] to-[#fef3c7] border-amber-200/80 text-[#92400e]" },
      { title: "Fresh Graduates", style: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-sky-200/80 text-[#075985]" },
      { title: "Anyone Passionate About Web Development", style: "bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-slate-200 text-[#334155]" },
    ],
    ctaTitle: "Build. Code. Deploy. Make an",
    ctaHighlight: "Impact.",
    ctaSubtitle: "Start your Full Stack Developer journey today!",
    ctaButtonText: "Apply Now for Full Stack Developer Fellowship",
    ctaIllustration: fsDashboardCtaSvg,
  },
};

export default function DataAnalystFellowshipPage() {
  const { programId = "data-analyst" } = useParams();
  const track = fellowshipTracksConfig[programId] || fellowshipTracksConfig["data-analyst"];
  const applyLink = `/dashboard?tab=Fellowship%20Program&fellowship=${programId}`;
  const [heroTheme, setHeroTheme] = useState("light");

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        heroTheme={heroTheme}
        onToggleHeroTheme={() => setHeroTheme((t) => (t === "light" ? "dark" : "light"))}
      />

      {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf2ff] via-[#f3f8ff] to-[#f4f8ff] pt-10 pb-16 lg:pt-14 lg:pb-24">
        {/* Background photo overlay preserving original hero bg image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: `url("${track.heroBg}")` }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:pl-12 relative z-10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-12">

            {/* Left Content Column */}
            <div>
              {/* Top Dual Badge */}
              <div className="inline-flex items-center rounded-full bg-white p-1 shadow-xs border border-blue-100/80 mb-6">
                <span className="rounded-full bg-[#071B49] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-white">
                  3 MONTHS
                </span>
                <span className="rounded-full bg-[#d1f5ea] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#0abf9a] ml-1">
                  FELLOWSHIP PROGRAM
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black leading-[1.08] tracking-tight text-[#071B49]">
                {track.highlightFirst ? (
                  <>
                    <span className="bg-gradient-to-r from-[#0abf9a] to-[#1577EE] bg-clip-text text-transparent block sm:inline">
                      {track.titleFirstPart}
                    </span>{" "}
                    <span className="text-[#071B49]">{track.titleHighlightPart}</span>
                  </>
                ) : (
                  <>
                    {track.titleFirstPart}{" "}
                    <span className="bg-gradient-to-r from-[#0abf9a] to-[#1577EE] bg-clip-text text-transparent block sm:inline">
                      {track.titleHighlightPart}
                    </span>
                  </>
                )}
              </h1>

              {/* Sub-tagline */}
              <p className="mt-4 text-base sm:text-lg font-bold text-[#071B49] tracking-wide">
                {track.tagline}
              </p>

              {/* Subtitle */}
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                {track.description}
              </p>

              {/* Metric Badges Row */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 max-w-2xl">
                {track.metrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-xs border border-blue-100/80">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1577EE]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="text-l font-black leading-none text-[#071B49]">{m.value}</div>
                        <div className="text-[10px] font-bold text-slate-500 mt-1">{m.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={applyLink}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#071B49] px-8 text-sm font-black text-white shadow-lg transition-all hover:bg-[#0c2869] active:scale-95"
                >
                  Apply Now <ArrowRight size={16} />
                </Link>
                <a
                  href="#learn-build"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#071B49] bg-white px-8 text-sm font-bold text-[#071B49] shadow-xs transition-all hover:bg-slate-50 active:scale-95"
                >
                  Know More
                </a>
              </div>
            </div>

            {/* Right Side Stacked Analytics Cards (Clean Non-Overlapping Layout) */}
            <div className="flex flex-col items-center lg:items-end justify-center gap-4 py-0">
              {track.heroCards.map((c, i) => (
                <div key={i} className={`${c.width} transition-transform duration-300 hover:scale-105`}>
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="w-full h-auto drop-shadow-xl rounded-2xl"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. WHAT YOU'LL LEARN & BUILD ─────────────────────────────────── */}
      <section id="learn-build" className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">

          {/* Section Divider Header */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-0.5 w-14 bg-[#1577EE]" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#071B49] tracking-tight">
              What You’ll Learn & Build
            </h2>
            <div className="h-0.5 w-14 bg-[#1577EE]" />
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {track.learnAndBuild.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center text-center rounded-2xl bg-white p-6 shadow-xs border border-blue-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl mb-4">
                  <img src={card.icon} alt={card.title} className="h-16 w-16 object-contain" />
                </div>
                <h3 className="text-sm font-black text-[#071B49] leading-snug">{card.title}</h3>
                <p className="mt-2 text-xs font-medium text-slate-500 leading-normal">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TOOLS & WHAT YOU'LL GET (SIDE BY SIDE) ───────────────────── */}
      <section className="py-8 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px] grid lg:grid-cols-2 gap-8">

          {/* Left Block: Tools You'll Work With */}
          <div className="rounded-3xl bg-[#eef5ff] p-6 sm:p-8 border border-blue-100/80 shadow-xs flex flex-col justify-between">
            <h2 className="text-center text-2xl font-black text-[#071B49] mb-8">
              Tools You’ll Work With
            </h2>

            {/* 10 Tools Grid (5x2) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
              {track.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-2xs border border-slate-100 transition-all hover:scale-105"
                >
                  <img src={tool.icon} alt={tool.name} className="h-12 sm:h-14 w-12 sm:w-14 object-contain mb-2" />
                  <span className="text-xs font-bold text-[#071B49] text-center">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: What You'll Get */}
          <div className="rounded-3xl bg-[#eef5ff] p-6 sm:p-8 border border-blue-100/80 shadow-xs flex flex-col justify-between">
            <h2 className="text-center text-2xl font-black text-[#071B49] mb-8">
              What You’ll Get
            </h2>

            <div className="grid sm:grid-cols-[1.1fr_0.9fr] items-center gap-6">
              {/* Green Checkmarks List */}
              <div className="space-y-4">
                {track.whatYouGet.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0abf9a] text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#071B49]">{point}</span>
                  </div>
                ))}
              </div>

              {/* Certificate & ID Stack Graphic */}
              <div className="flex justify-center">
                <img
                  src={track.credentialStack}
                  alt={`${track.name} Fellowship Certificate and ID Card`}
                  className="w-full max-w-[260px] h-auto object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. WHY JOIN & WHO IT'S FOR (SIDE BY SIDE) ───────────────────── */}
      <section className="py-8 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px] grid lg:grid-cols-2 gap-8">

          {/* Left Block: Why Join? */}
          <div className="rounded-3xl bg-[#eef5ff] p-6 sm:p-8 border border-blue-100/80 shadow-xs flex flex-col justify-between">
            <h2 className="text-2xl font-black text-[#071B49] mb-8">
              Why Join?
            </h2>

            <div className="grid sm:grid-cols-[1.15fr_0.85fr] items-center gap-6">
              {/* Checkmark List */}
              <div className="space-y-4">
                {track.whyJoinPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0abf9a] text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#071B49] leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              {/* Why Join Illustration */}
              <div className="flex justify-center">
                <img
                  src={track.whyJoinIllustration}
                  alt={`Why Join ${track.name} illustration`}
                  className="w-full max-w-[240px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Block: Who It's For (Subtle Glassy Gradient Pills) */}
          <div className="rounded-3xl bg-[#eef5ff] p-6 sm:p-8 border border-blue-100/80 shadow-xs flex flex-col justify-between">
            <h2 className="text-center text-2xl font-black text-[#071B49] mb-8">
              Who It’s For
            </h2>

            {/* 6 Pill Cards with Custom Glassy Gradient BG */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {track.whoItsFor.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 border shadow-2xs transition-all hover:scale-102 ${item.style}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071B49] text-white shadow-xs">
                    <User size={16} />
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. SLEEK COMPACT BOTTOM CALLOUT BANNER ────────────────────────── */}
      <section className="py-10 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#06172f] via-[#071B49] to-[#0a3766] py-6 px-8 sm:px-10 text-white shadow-xl">

            {/* Background Dotted Patterns */}
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-cyan-400/20" />

            <div className="grid lg:grid-cols-[1.3fr_0.7fr] items-center gap-6 relative z-10">

              {/* Left Callout Text */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  {track.ctaTitle}{" "}
                  <span className="text-[#00c49f] underline decoration-cyan-400/40">
                    {track.ctaHighlight}
                  </span>{" "}
                  Today!
                </h2>
                <p className="mt-2 text-sm sm:text-base font-bold text-slate-200">
                  {track.ctaSubtitle}
                </p>

                <div className="mt-5">
                  <Link
                    to={applyLink}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#00c49f] px-7 text-xs sm:text-sm font-black text-[#071B49] shadow-lg transition-all hover:bg-[#02dbb4] active:scale-95"
                  >
                    {track.ctaButtonText} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Callout Dashboard CTA SVG (Sleek Compact Size) */}
              <div className="flex justify-center lg:justify-end">
                <img
                  src={track.ctaIllustration}
                  alt={`${track.name} CTA analytics preview`}
                  className="w-full max-w-[270px] h-auto object-contain drop-shadow-2xl"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FEATURE SUB-FOOTER BAR ────────────────────────────────────── */}
      <section className="border-t border-blue-100 bg-white py-6 px-5 sm:px-8">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-around gap-6 text-slate-700">

          <div className="flex items-center gap-2.5">
            <BookOpen size={24} className="text-[#1577EE]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#071B49]">Learn by Doing</span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <Briefcase size={24} className="text-[#1577EE]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#071B49]">Build Portfolio</span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <Users size={24} className="text-[#1577EE]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#071B49]">Mentor Support</span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <ShieldCheck size={24} className="text-[#1577EE]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#071B49]">Industry Relevant</span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <Target size={24} className="text-[#1577EE]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#071B49]">Career Focused</span>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer heroTheme="light" />

      {/* Floating Bottom Apply Sticky Bar */}
      <aside aria-label={`${track.name} fellowship application`} className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-4">
        <div className="mx-auto flex max-w-[1260px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#071B49] via-[#0b376f] to-[#1577EE] px-4 py-3 text-white shadow-2xl sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-black sm:text-base">Start your {track.name} Fellowship</p>
            <p className="mt-0.5 hidden text-[11px] font-semibold text-white/80 sm:block">3 months · 20 projects · One-time fee ₹2,000</p>
          </div>
          <Link to={applyLink} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#00c49f] px-5 sm:px-7 text-xs sm:text-sm font-black text-[#071B49] shadow-md transition-all hover:bg-[#02dbb4]">
            Apply now <ArrowRight size={16} />
          </Link>
        </div>
      </aside>
    </main>
  );
}

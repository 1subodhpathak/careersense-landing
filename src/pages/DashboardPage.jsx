import React, { useState, useEffect } from "react";
import {
  FileText,
  FileSearch,
  BookOpen,
  MessageSquareText,
  ShieldCheck,
  Users,
  UserRound,
  CreditCard,
  LayoutDashboard,
  TrendingUp,
  Award,
  Coins,
  Zap,
  GraduationCap,
  Calendar,
  Clock,
  LogOut,
  Sparkles,
  CheckCircle2,
  Lock,
  MenuSquare,
  ChevronRight,
  ExternalLink,
  History,
  X,
  FileDown,
  Plus,          // Fixed: Added missing import
  AlertCircle,   // Fixed: Added missing import
  Save,
  Check,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  User,
  Globe,
  Trash2,
  Camera,
  ImagePlus,
  Loader2,
  Compass,
  AlertTriangle
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import CSLogo from "../Assets/CSlogo.png";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const activeTab = tabFromUrl || "Dashboard";

  const handleTabChange = (label) => {
    setSearchParams({ tab: label });
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ledgerFilter, setLedgerFilter] = useState("all");
  const [ledgerLimit, setLedgerLimit] = useState(20);

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [communityStats, setCommunityStats] = useState(null);
  const [communityLoading, setCommunityLoading] = useState(false);

  // Master Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
    showPhoto: false,
    bannerImage: "",
    currentJobTitle: "",
    currentCompany: "",
    targetJobTitle: "",
    profileStatus: "Open to Work",
    experienceYears: "0",
    experienceMonths: "0",
    geographicalAlignment: "",
    linkedinPortfolio: "",
    githubUrl: "",
    websiteUrl: "",
    skills: [],
    education: [],
    certifications: []
  });
  const [newSkillInput, setNewSkillInput] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [profileErrorMsg, setProfileErrorMsg] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (dashboardData?.masterProfile) {
      const p = dashboardData.masterProfile;
      setProfileForm({
        fullName: p.fullName || user?.fullName || "",
        email: p.email || user?.primaryEmailAddress?.emailAddress || "",
        phone: p.phone || "",
        location: p.location || "",
        bio: p.bio || "",
        avatar: p.avatar || user?.imageUrl || "",
        showPhoto: p.showPhoto || false,
        bannerImage: p.bannerImage || "",
        currentJobTitle: p.currentJobTitle || "",
        currentCompany: p.currentCompany || "",
        targetJobTitle: p.targetJobTitle || "",
        profileStatus: p.profileStatus || "Open to Work",
        experienceYears: p.experienceYears || "0",
        experienceMonths: p.experienceMonths || "0",
        geographicalAlignment: p.geographicalAlignment || "",
        linkedinPortfolio: p.linkedinPortfolio || "",
        githubUrl: p.githubUrl || "",
        websiteUrl: p.websiteUrl || "",
        skills: p.skills || ["Project Management", "Data Analysis", "Strategic Planning"],
        education: p.education || [],
        certifications: p.certifications || []
      });
    } else if (user) {
      setProfileForm(prev => ({
        ...prev,
        fullName: prev.fullName || user.fullName || "",
        email: prev.email || user.primaryEmailAddress?.emailAddress || "",
        avatar: prev.avatar || user.imageUrl || ""
      }));
    }
  }, [dashboardData, user]);

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    setProfileSaving(true);
    setProfileSuccessMsg("");
    setProfileErrorMsg("");
    try {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const res = await fetch(`${apiBase}/careersense/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      if (res.ok) {
        const updated = await res.json();
        setDashboardData(prev => ({ ...prev, masterProfile: updated }));
        setProfileSuccessMsg("Master profile successfully saved across all CareerSense nodes!");
        setTimeout(() => setProfileSuccessMsg(""), 4000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setProfileErrorMsg(errData.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      setProfileErrorMsg("Network error saving profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const DEFAULT_PROFILE_BANNER = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80";

  const persistProfileFields = async (updatedFields) => {
    const nextForm = { ...profileForm, ...updatedFields };
    setProfileForm(nextForm);
    try {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const res = await fetch(`${apiBase}/careersense/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(nextForm)
      });
      if (res.ok) {
        const updated = await res.json();
        setDashboardData(prev => ({ ...prev, masterProfile: updated }));
      }
    } catch (err) {
      console.error("Auto persist profile error:", err);
    }
  };

  const calculateProfileCompleteness = () => {
    let score = 0;
    if (profileForm.fullName?.trim()) score += 10;
    if (profileForm.email?.trim()) score += 10;
    if (profileForm.phone?.trim()) score += 10;
    if (profileForm.location?.trim()) score += 10;
    if (profileForm.bio?.trim()) score += 10;
    if (profileForm.currentJobTitle?.trim()) score += 10;
    if (profileForm.targetJobTitle?.trim()) score += 10;
    if (profileForm.profileStatus?.trim()) score += 5;
    if (profileForm.avatar?.trim()) score += 5;
    if (profileForm.bannerImage?.trim()) score += 5;
    if (profileForm.linkedinPortfolio?.trim() || profileForm.githubUrl?.trim() || profileForm.websiteUrl?.trim()) score += 5;
    if (profileForm.skills?.length > 0) score += 10;
    return score;
  };

  const handleImageUpload = async (file, type) => {
    if (!file) return;
    const isBanner = type === "banner";
    if (isBanner) setIsUploadingBanner(true);
    else setIsUploadingPhoto(true);

    try {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${apiBase}/careersense/profile/upload-image`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        const fullUrl = data.url.startsWith("http") ? data.url : `${apiBase}${data.url}`;
        if (isBanner) {
          await persistProfileFields({ bannerImage: fullUrl });
        } else {
          await persistProfileFields({ avatar: fullUrl });
        }
        setProfileSuccessMsg(`${isBanner ? "Cover photo" : "Profile photo"} uploaded & saved successfully!`);
        setTimeout(() => setProfileSuccessMsg(""), 4000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setProfileErrorMsg(errData.error || "Image upload failed.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setProfileErrorMsg("Error uploading image to server.");
    } finally {
      if (isBanner) setIsUploadingBanner(false);
      else setIsUploadingPhoto(false);
    }
  };

  const handleRemoveAvatar = async () => {
    await persistProfileFields({ avatar: "" });
    setProfileSuccessMsg("Profile photo removed and saved.");
    setTimeout(() => setProfileSuccessMsg(""), 3000);
  };

  const handleResetBanner = async () => {
    await persistProfileFields({ bannerImage: DEFAULT_PROFILE_BANNER });
    setProfileSuccessMsg("Cover banner reset to default and saved.");
    setTimeout(() => setProfileSuccessMsg(""), 3000);
  };

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      if (!user) return;
      try {
        const token = await getToken();
        const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
        const response = await fetch(`${apiBase}/careersense/dashboard/summary`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchDashboardSummary();
    }
  }, [isLoaded, user, getToken]);

  // Fetch community stats when Community tab is active
  useEffect(() => {
    if (activeTab !== "Community" || communityStats) return;
    const fetchCommunityStats = async () => {
      setCommunityLoading(true);
      try {
        const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
        const res = await fetch(`${apiBase}/careersense/dashboard/community-stats`);
        if (res.ok) {
          const data = await res.json();
          setCommunityStats(data);
        }
      } catch (err) {
        console.error("Error fetching community stats:", err);
      } finally {
        setCommunityLoading(false);
      }
    };
    fetchCommunityStats();
  }, [activeTab, communityStats]);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Compass, label: "Career GPS" },
    { icon: FileText, label: "Resume Builder" },
    { icon: FileSearch, label: "ATS Checker" },
    { icon: BookOpen, label: "Cover Letters" },
    { icon: MessageSquareText, label: "Interview Practice" },
    { icon: ShieldCheck, label: "Certificates" },
    { icon: Users, label: "Community" },
    { icon: UserRound, label: "My Profile" },
    { icon: CreditCard, label: "Usage & Billing" },
  ];

  const username = user?.fullName || user?.username || "Guest User";
  const userInitials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : username.substring(0, 2).toUpperCase();

  const atsResumes = dashboardData?.ats?.resumes || [];
  const atsJds = dashboardData?.ats?.jobDescriptions || [];
  const atsPoints = (() => {
    let pts = atsResumes.length * 180 + atsJds.length * 95;
    atsResumes.forEach((resume) => {
      if (resume.latestAnalysis && resume.latestAnalysis.overall_score) {
        const report = resume.latestAnalysis;
        const base = report.jdText ? 1825 : 1350;
        const scoreBonus = Math.round((report.overall_score || 0) * 4.75);
        pts += base + scoreBonus;
      }
    });
    return pts;
  })();
  const atsCost = atsPoints / 100000;

  const latestAtsResume = atsResumes[0];
  const missingKeywords = latestAtsResume?.latestAnalysis?.analysis_points
    ?.filter(p => p.issue_found)
    ?.map(p => p.title) || [];

  const coverLetters = dashboardData?.coverLetter?.savedLetters || [];
  const coverLetterPoints = coverLetters.reduce((sum, letter) => {
    const resumeLen = (letter.resumeText || "").length;
    const jdLen = (letter.jobDescription || "").length;
    const genLen = (letter.generatedLetter || "").length;

    const inputPoints = (resumeLen > 0 || jdLen > 0)
      ? Math.round((resumeLen + jdLen) / 4) + 1036
      : 1800;
    const outputPoints = genLen > 0 ? Math.round(genLen / 4) : 600;
    return sum + inputPoints + outputPoints;
  }, 0);
  const coverLetterCost = coverLetterPoints / 10000;

  const usageLedger = dashboardData?.certifi?.usageLedger || [];
  const certifiPoints = usageLedger.reduce((sum, item) => sum + (item.careerPoints || 0), 0);
  const certifiCost = usageLedger.reduce((sum, item) => sum + (item.costUsd || 0), 0);

  const totalPoints = atsPoints + coverLetterPoints + certifiPoints;
  const totalCost = atsCost + coverLetterCost + certifiCost;
  const certsCount = dashboardData?.certifi?.certificates?.length || 0;
  const pathsCount = dashboardData?.certifi?.learningPaths?.length || 0;

  const avgAts = atsResumes.length > 0
    ? Math.round(atsResumes.reduce((sum, r) => sum + (r.current_score || 0), 0) / atsResumes.length)
    : 0;

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const recentActivities = (() => {
    const acts = [];

    if (dashboardData?.assessment) {
      acts.push({
        event: "Career Assessment Completed",
        time: new Date(dashboardData.assessment.takenAt || dashboardData.assessment.createdAt || Date.now()),
        metric: `Score: ${dashboardData.assessment.results.overallScore}%`,
        badgeColor: "bg-teal-50 text-teal-700"
      });
    }

    atsResumes.forEach((res) => {
      acts.push({
        event: `ATS Scan - ${res.file_name}`,
        time: new Date(res.createdAt),
        metric: `Match: ${res.current_score}%`,
        badgeColor: "bg-blue-50 text-blue-700"
      });
    });

    coverLetters.forEach((letter) => {
      acts.push({
        event: `Generated Cover Letter - ${letter.companyName || letter.company || 'Direct Entry'}`,
        time: new Date(letter.createdAt),
        metric: `Template: ${letter.selectedTemplate || 'default'}`,
        badgeColor: "bg-amber-50 text-amber-700"
      });
    });

    const certificates = dashboardData?.certifi?.certificates || [];
    certificates.forEach((cert) => {
      acts.push({
        event: `Certificate Minted: ${cert.title}`,
        time: new Date(cert.issuedAt || cert.date),
        metric: `ID: #${cert.certificateId ? cert.certificateId.substring(0, 5) : 'cert'}`,
        badgeColor: "bg-indigo-50 text-indigo-700"
      });
    });

    acts.sort((a, b) => b.time - a.time);
    return acts.slice(0, 3);
  })();

  const summaryBySite = {
    "ATS Checker": { points: atsPoints, cost: atsCost, count: atsResumes.length + atsJds.length },
    "Certifi": { points: certifiPoints, cost: certifiCost, count: usageLedger.length },
    "Cover Letter Builder": { points: coverLetterPoints, cost: coverLetterCost, count: coverLetters.length }
  };

  const combinedLedger = (() => {
    const list = [];

    usageLedger.forEach(log => {
      list.push({
        action: log.action,
        app: "Certifi",
        createdAt: new Date(log.createdAt),
        points: log.careerPoints || 0,
        cost: log.costUsd || 0
      });
    });

    atsResumes.forEach((resume) => {
      list.push({
        action: "Resume Upload",
        app: "ATS Checker",
        createdAt: new Date(resume.updatedAt || resume.createdAt),
        points: 180,
        cost: 180 / 100000
      });

      if (resume.latestAnalysis && resume.latestAnalysis.overall_score) {
        const report = resume.latestAnalysis;
        const base = report.jdText ? 1825 : 1350;
        const scoreBonus = Math.round((report.overall_score || 0) * 4.75);
        const pts = base + scoreBonus;
        list.push({
          action: report.jdText ? "ATS + JD Report" : "ATS Report",
          app: "ATS Checker",
          createdAt: new Date(report.createdAt),
          points: pts,
          cost: pts / 100000
        });
      }
    });

    atsJds.forEach((jd) => {
      list.push({
        action: "Job Description Upload",
        app: "ATS Checker",
        createdAt: new Date(jd.createdAt),
        points: 95,
        cost: 95 / 100000
      });
    });

    coverLetters.forEach((letter) => {
      const resumeLen = (letter.resumeText || "").length;
      const jdLen = (letter.jobDescription || "").length;
      const genLen = (letter.generatedLetter || "").length;

      const inputPoints = (resumeLen > 0 || jdLen > 0)
        ? Math.round((resumeLen + jdLen) / 4) + 1036
        : 1800;
      const outputPoints = genLen > 0 ? Math.round(genLen / 4) : 600;
      const pts = inputPoints + outputPoints;

      list.push({
        action: letter.resumeText && letter.jobDescription ? 'Executive Resume + JD Map' : 'Executive Analysis',
        app: "Cover Letter",
        createdAt: new Date(letter.createdAt),
        points: pts,
        cost: pts / 10000
      });
    });

    list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  })();

  const filteredLedger = ledgerFilter === "all"
    ? combinedLedger
    : combinedLedger.filter(log => log.app === ledgerFilter);
  const displayedLedger = filteredLedger.slice(0, ledgerLimit);

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  // --- DATA RESOLVER FOR DYNAMIC CONTENT SYSTEM ---
  const getTabDetailedData = () => {
    switch (activeTab) {
      case "Dashboard":
        const careerScore = dashboardData?.assessment?.results?.overallScore;
        const targetAtsVal = atsResumes.length > 0 ? `${avgAts}%` : "0%";
        const targetAtsStatus = atsResumes.length > 0 ? "Latest Match Average" : "No resume scans run";
        const certificatesCount = dashboardData?.certifi?.certificates?.length || 0;

        const assessmentTaken = !!dashboardData?.assessment;
        const weakestCategory = assessmentTaken ? dashboardData.assessment.results.weakestCategories[0] : "skills";

        const categoryMapNames = {
          resume: "Resume Optimization",
          ats: "ATS Readability check",
          interview: "Mock Interview simulations",
          skills: "Skill Certifications",
          direction: "Action roadmap planning"
        };

        const roadmapText = assessmentTaken
          ? `Your career readiness assessment indicates an opportunity for improvement in ${categoryMapNames[weakestCategory] || weakestCategory}. Focus on completing related modules to optimize your score.`
          : "Complete your free Career Assessment to analyze your skill gaps, identify critical core deficits, and generate a customized AI-guided roadmap action plan.";

        const missingTag = missingKeywords.length > 0 ? missingKeywords[0] : "Relational Cloud Schema";

        return {
          title: "Platform Overview",
          subtitle: "Central control node for platform certifications, infrastructure usage tracking, and system tokens.",
          stats: [
            { label: "Career Readiness Score", value: careerScore ? `${careerScore}%` : "N/A", status: assessmentTaken ? dashboardData.assessment.results.readinessLevel.label : "No assessment taken", color: "text-blue-600", bg: "bg-blue-50", icon: <TrendingUp size={16} /> },
            { label: "ATS Matching Average", value: targetAtsVal, status: targetAtsStatus, color: "text-emerald-600", bg: "bg-emerald-50", icon: <Sparkles size={16} /> },
            { label: "Verified Credentials", value: `${certificatesCount} Issued`, status: certificatesCount > 0 ? "Verified Credentials Sync" : "No certificates issued", color: "text-indigo-600", bg: "bg-indigo-50", icon: <ShieldCheck size={16} /> },
            { label: "AI Compute Tokens", value: "420/500", status: "84% Quota Free", color: "text-amber-600", bg: "bg-amber-50", icon: <Coins size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><History size={16} className="text-slate-400" /> Recent Activity Log</h3>
                </div>
                <div className="space-y-3.5">
                  {recentActivities.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">No recent activities recorded.</p>
                  ) : (
                    recentActivities.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                        <div>
                          <div className="font-semibold text-slate-800">{item.event}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{timeAgo(item.time)}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${item.badgeColor}`}>{item.metric}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2"><GraduationCap size={16} className="text-slate-400" /> Contextual AI Roadmap Action</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{roadmapText}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-amber-100 text-amber-700 text-xs font-bold p-2 rounded-lg">!</div>
                    <div className="text-xs font-bold text-slate-700 truncate max-w-[200px]">Missing Tag: {missingTag}</div>
                  </div>
                  <a href="https://ats.careersenseai.com/" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">Resolve <ChevronRight size={14} /></a>
                </div>
              </div>
            </div>
          )
        };

      case "Career GPS":
        const latestGps = dashboardData?.assessment;
        const gpsScore = latestGps?.results?.overallScore;
        const gpsReadiness = latestGps?.results?.readinessLevel?.label || "Not Taken";
        const gpsTargetRole = latestGps?.profile?.targetRole || "N/A";
        const aiDiag = latestGps?.aiDiagnosis;
        const catScores = latestGps?.results?.categoryScores || {};

        return {
          title: "Career GPS AI Workspace",
          subtitle: "Persistent career readiness tracking, 5-phase pipeline breakdown, and AI diagnostic report.",
          stats: [
            { label: "Overall GPS Score", value: gpsScore !== undefined ? `${gpsScore}%` : "N/A", status: gpsReadiness, color: "text-cyan-600", bg: "bg-cyan-50", icon: <TrendingUp size={16} /> },
            { label: "Target Role", value: gpsTargetRole, status: "Active Orientation", color: "text-blue-600", bg: "bg-blue-50", icon: <Briefcase size={16} /> },
            { label: "AI Diagnosis", value: aiDiag?.isAiGenerated ? "AI Verified" : "Rule Engine", status: "Sub-second Groq LLM", color: "text-purple-600", bg: "bg-purple-50", icon: <Sparkles size={16} /> },
            { label: "Last Assessment", value: latestGps?.takenAt ? new Date(latestGps.takenAt).toLocaleDateString() : "None", status: latestGps ? "Saved to Profile" : "Pending", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Calendar size={16} /> }
          ],
          renderExtra: () => (
            <div className="space-y-6 mt-6">
              {!latestGps ? (
                <div className="bg-gradient-to-r from-cyan-900 to-slate-900 border border-cyan-700/50 rounded-2xl p-8 text-white shadow-lg text-center">
                  <h3 className="text-xl font-bold mt-2">No Saved Career GPS Assessment Found</h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                    Take the free 5-minute Career GPS assessment to benchmark your profile across 5 core career phases and generate your AI-powered roadmap.
                  </p>
                  <Link to="/career-gps" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl mt-5 hover:brightness-105 shadow-md">
                    Launch Career GPS Assessment →
                  </Link>
                </div>
              ) : (
                <>
                  {/* AI Executive Summary Card */}
                  {aiDiag && (
                    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border border-cyan-500/30 rounded-2xl p-6 text-white shadow-md">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles size={18} className="text-cyan-400" />
                          <h3 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Executive Career Diagnosis</h3>
                        </div>
                        <Link to="/career-gps" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 border border-cyan-500/40 px-3 py-1 rounded-lg">
                          Open Interactive Map ↗
                        </Link>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{aiDiag.executiveSummary}</p>

                      {aiDiag.targetRoleBenchmark && (
                        <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">Target Role Benchmark · {gpsTargetRole}</p>
                          <p className="text-xs leading-relaxed text-slate-300">{aiDiag.targetRoleBenchmark}</p>
                        </div>
                      )}

                      {aiDiag.roleGaps && Array.isArray(aiDiag.roleGaps) && aiDiag.roleGaps.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-1">AI Detected Key Gaps:</span>
                          {aiDiag.roleGaps.map((gap, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-red-950/40 border border-red-800/40 px-3 py-1 text-xs text-red-300 font-medium">
                              <AlertTriangle size={12} /> {gap}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5 Phase Scorecard Grid */}
                  <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">5-Phase Career Pipeline Status</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Scored across Resume, ATS, Certifi, Cover Letter, and Interview readiness.</p>
                      </div>
                      <Link to="/career-gps" className="text-xs font-bold text-blue-600 hover:text-blue-700">Retake Assessment →</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {[
                        { label: "1. Resume", score: catScores.resume ?? 0 },
                        { label: "2. ATS Check", score: catScores.ats ?? 0 },
                        { label: "3. Certifi", score: catScores.skills ?? 0 },
                        { label: "4. Cover Letter", score: catScores.coverletter ?? 0 },
                        { label: "5. Interview", score: catScores.interview ?? 0 },
                      ].map((item) => (
                        <div key={item.label} className="border border-slate-200 rounded-xl p-4 text-center bg-slate-50">
                          <p className="text-xs font-bold text-slate-600 mt-1">{item.label}</p>
                          <p className={`text-xl font-extrabold mt-1 ${item.score >= 75 ? 'text-emerald-600' : item.score >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                            {item.score}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        };

      case "Resume Builder":
        return {
          title: "AI Resume Builder Workspace",
          subtitle: "Compile, optimize syntax structuring, and export parsing-compliant master profiles.",
          stats: [
            { label: "Active Profiles", value: "2 Live", status: "Validated", color: "text-blue-600", bg: "bg-blue-50", icon: <FileText size={16} /> },
            { label: "Average Syntax Score", value: "88/100", status: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Award size={16} /> },
            { label: "Tailored Bullet Verbs", value: "24 Used", status: "Active", color: "text-purple-600", bg: "bg-purple-50", icon: <Sparkles size={16} /> },
            { label: "Compliant Export File", value: "PDF format", status: "Ready", color: "text-indigo-600", bg: "bg-indigo-50", icon: <CheckCircle2 size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Your Generated Resumes</h3>
                <button className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"><Plus size={14} /> Build New Layout</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
                      <th className="p-3">Profile Designation Name</th>
                      <th className="p-3">ATS Match Target</th>
                      <th className="p-3">Last Modified Timestamp</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 flex items-center gap-2"><FileText size={14} className="text-blue-500" /> Master Profile _ Analytics Engineer_2026</td>
                      <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">86% Index</span></td>
                      <td className="p-3 text-slate-400">Jul 8, 2026 • 02:14</td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-blue-600 hover:underline">Edit</button>
                        <button className="text-slate-400 hover:text-slate-600 inline-flex items-center gap-0.5"><FileDown size={12} /> Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 flex items-center gap-2"><FileText size={14} className="text-slate-400" /> Generic_General Startup Operations Copy</td>
                      <td className="p-3"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">71% Index</span></td>
                      <td className="p-3 text-slate-400">Jun 28, 2026 • 14:45</td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-blue-600 hover:underline">Edit</button>
                        <button className="text-slate-400 hover:text-slate-600 inline-flex items-center gap-0.5"><FileDown size={12} /> Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        };

      case "ATS Checker":
        const targetMatrix = latestAtsResume?.file_name
          ? (latestAtsResume.file_name.length > 15 ? latestAtsResume.file_name.substring(0, 15) + "..." : latestAtsResume.file_name)
          : "No uploads";
        const keywordScore = latestAtsResume?.latestAnalysis?.keyword_match || 0;
        const deficitCount = missingKeywords.length;

        return {
          title: "ATS Matrix Optimization Engine",
          subtitle: "Scan your configuration directly against customized system requirements to isolate keywords.",
          stats: [
            { label: "Target Scanned Matrix", value: targetMatrix, status: latestAtsResume ? "File Uploaded" : "No Resumes Scanned", color: "text-blue-600", bg: "bg-blue-50", icon: <LayoutDashboard size={16} /> },
            { label: "Keyword Matching Score", value: `${keywordScore}%`, status: latestAtsResume ? "Calculated match" : "N/A", color: "text-emerald-600", bg: "bg-emerald-50", icon: <TrendingUp size={16} /> },
            { label: "Critical Core Deficits", value: `${deficitCount} Keywords`, status: latestAtsResume ? "Deficit detected" : "N/A", color: "text-red-600", bg: "bg-red-50", icon: <AlertCircle size={16} /> },
            { label: "Density Ratio Profile", value: latestAtsResume ? "Optimal" : "N/A", status: latestAtsResume ? "Balanced profile" : "N/A", color: "text-indigo-600", bg: "bg-indigo-50", icon: <CheckCircle2 size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Identified Missing Technical Stacks</h3>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.length === 0 ? (
                    <p className="text-xs text-slate-400 py-3">No missing technical stacks identified in your latest resume.</p>
                  ) : (
                    missingKeywords.map((tag, i) => (
                      <span key={i} className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> {tag}
                      </span>
                    ))
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 mt-6">Scanned Resumes History</h3>
                {atsResumes.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4">No resumes scanned yet. Go to the ATS Checker subdomain to optimize your resume.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-400 font-bold border-b border-slate-100">
                          <th className="pb-2">Resume File</th>
                          <th className="pb-2">Current Score</th>
                          <th className="pb-2">Date Scanned</th>
                          <th className="pb-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {atsResumes.map((res) => (
                          <tr key={res.resume_id}>
                            <td className="py-3 font-semibold text-slate-900 truncate max-w-[200px]">{res.file_name}</td>
                            <td className="py-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">{res.current_score}%</span></td>
                            <td className="py-3 text-slate-400">{new Date(res.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 text-right">
                              <a href={`https://ats.careersenseai.com/reports/analysis/${res.resume_id}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View Analysis</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">Launch ATS Analyzer</h3>
                  <p className="text-[11px] text-slate-400 leading-normal mb-3">Compare your resume against any job description to isolate missing skills and alignment details instantly on the platform.</p>
                </div>
                {/* <a href="https://ats.careersenseai.com/" target="_blank" rel="noreferrer" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 text-center rounded-xl transition-all mt-2 block">
                  Open ATS Checker Subdomain
                </a> */}
              </div>
            </div>
          )
        };

      case "Cover Letters":
        const savedLetters = dashboardData?.coverLetter?.savedLetters || [];
        return {
          title: "Personalized Cover Letter Logs",
          subtitle: "Generate dynamic, company-specific cover letters highlighting matching credentials.",
          stats: [
            { label: "Total Asset Documents", value: `${savedLetters.length} Saved`, status: "Active Letters", color: "text-blue-600", bg: "bg-blue-50", icon: <BookOpen size={16} /> },
            { label: "AI Tailoring Balance", value: "Unlimited", status: "Premium Enabled", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Sparkles size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {savedLetters.length === 0 ? (
                <div className="col-span-full text-center py-8 text-slate-400 text-xs font-semibold">
                  No cover letters found. Go to the Cover Letter Builder subdomain to generate custom layouts.
                </div>
              ) : (
                savedLetters.map((doc, i) => (
                  <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-xs flex flex-col justify-between h-40 hover:border-slate-300 transition-all">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{doc.companyName || doc.company || "Direct Entry"}</div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight mt-1 truncate">{doc.recipient?.targetRole || doc.title || "Target Role"}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Generated: {new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3">
                      <a href="https://coverletter.careersenseai.com/" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Open Workspace</a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        };

      case "Interview Practice":
        return {
          title: "AI Interactive Simulator Room",
          subtitle: "Participate in evaluation modules mapped contextually to targeted corporate question sets.",
          stats: [
            { label: "Simulations Passed", value: "3 Completed", status: "Target: 5", color: "text-blue-600", bg: "bg-blue-50", icon: <MessageSquareText size={16} /> },
            { label: "Average Behavioral Rating", value: "Good Tier", status: "Consistent", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Award size={16} /> },
            { label: "Technical Execution", value: "76%", status: "Needs Work", color: "text-purple-600", bg: "bg-purple-50", icon: <TrendingUp size={16} /> }
          ],
          renderExtra: () => (
            <div className="bg-white border border-slate-200/60 rounded-xl p-5 mt-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Simulated Category Profiles</h3>
              <div className="space-y-4">
                {[
                  { name: "SQL Performance Tuning & Window Aggregations", total: "15 Questions", progress: "100%", color: "bg-emerald-500" },
                  { name: "Product Metrics Evaluation & Root Cause Analysis", total: "10 Questions", progress: "60%", color: "bg-blue-500" },
                  { name: "Cloud System Architecture & Warehousing Scales", total: "20 Questions", progress: "0%", color: "bg-slate-200" }
                ].map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-700 mb-1.5">
                      <div>{item.name} <span className="text-slate-400 font-medium ml-2">({item.total})</span></div>
                      <span className="font-mono">{item.progress} Completed</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.progress }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        };

      case "Certificates":
        const certList = dashboardData?.certifi?.certificates || [];
        return {
          title: "Verified Skill Credentials Registry",
          subtitle: "Manage decentralized public verification credentials tracking system achievements.",
          stats: [
            { label: "Active Certificates", value: `${certList.length} Issued`, status: "Verified Credentials", color: "text-teal-600", bg: "bg-teal-50", icon: <ShieldCheck size={16} /> },
            { label: "Public Hashes Minted", value: `${certList.length} Hashes`, status: "Secured Nodes", color: "text-indigo-600", bg: "bg-indigo-50", icon: <Award size={16} /> }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {certList.length === 0 ? (
                <div className="col-span-full text-center py-8 text-slate-400 text-xs font-semibold">
                  No certificates verified. Take assessment checks on the Certifi subdomain to qualify.
                </div>
              ) : (
                certList.map((cert, i) => (
                  <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-xs flex items-center justify-between group hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0"><Award size={20} /></div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate tracking-tight">{cert.title}</h4>
                        <div className="font-mono text-[10px] text-slate-400 mt-0.5 truncate">Hash Reference: {cert.certificateId || cert.id}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-[11px] font-bold text-slate-400">{new Date(cert.issuedAt || cert.date).toLocaleDateString()}</div>
                      <a href={(() => {
                        const url = "https://certifi.careersenseai.com/my-certificates"
                        return url || "https://certifi.careersenseai.com/";
                        // <a href={(() => {
                        //   const url = cert.verifyUrl || cert.certificateUrl || "";
                        //   if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
                        //     const cleanPath = url.startsWith("/") ? url : `/${url}`;
                        //     return `https://certifi.careersenseai.com${cleanPath}`;
                        //   }
                        //   return url || "https://certifi.careersenseai.com/";
                      })()} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-blue-600 hover:underline mt-1 flex items-center gap-0.5 ml-auto">Verify <ExternalLink size={10} /></a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        };

      case "Community": {
        const cs = communityStats || {};
        const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n || 0);
        const platformCards = [
          {
            id: "ats",
            label: "ATS Resume Scanner",
            icon: <FileSearch size={22} className="text-blue-500" />,
            bg: "bg-blue-50 border-blue-100",
            accent: "text-blue-600",
            stats: [
              { label: "Resumes Scanned", value: fmt(cs.atsReports), icon: <FileText size={14} /> },
              { label: "Active Users", value: fmt(cs.atsUsers), icon: <Users size={14} /> }
            ]
          },
          {
            id: "coverletter",
            label: "Cover Letter Builder",
            icon: <MessageSquareText size={22} className="text-violet-500" />,
            bg: "bg-violet-50 border-violet-100",
            accent: "text-violet-600",
            stats: [
              { label: "Letters Generated", value: fmt(cs.coverLetters), icon: <FileText size={14} /> },
              { label: "Active Users", value: fmt(cs.coverLetterUsers), icon: <Users size={14} /> }
            ]
          },
          {
            id: "certifi",
            label: "Certifi Platform",
            icon: <Award size={22} className="text-amber-500" />,
            bg: "bg-amber-50 border-amber-100",
            accent: "text-amber-600",
            stats: [
              { label: "Certificates Issued", value: fmt(cs.certificates), icon: <Award size={14} /> },
              { label: "Skill Badges", value: fmt(cs.badges), icon: <ShieldCheck size={14} /> },
              { label: "Active Users", value: fmt(cs.certifiUsers), icon: <Users size={14} /> }
            ]
          },
          {
            id: "gps",
            label: "Career GPS",
            icon: <Compass size={22} className="text-cyan-500" />,
            bg: "bg-cyan-50 border-cyan-100",
            accent: "text-cyan-600",
            stats: [
              { label: "Assessments Taken", value: fmt(cs.gpsAssessments), icon: <BookOpen size={14} /> },
              { label: "Active Users", value: fmt(cs.gpsUsers), icon: <Users size={14} /> }
            ]
          }
        ];

        return {
          title: "Community Activity Hub",
          subtitle: "Real-time platform-wide stats across all CareerSense tools — every resume scanned, letter generated, and certificate earned.",
          stats: [
            { label: "Total Activities", value: fmt(cs.totalActivities || 0), status: "All Time", color: "text-cyan-600", bg: "bg-cyan-50", icon: <TrendingUp size={16} /> },
            { label: "Platform Users", value: fmt(cs.totalUsers || 0), status: "Registered", color: "text-violet-600", bg: "bg-violet-50", icon: <Users size={16} /> }
          ],
          renderExtra: () => (
            <div className="space-y-5 mt-6">
              {/* Loading shimmer */}
              {communityLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50 p-5 h-40" />
                  ))}
                </div>
              )}

              {/* Platform stats grid */}
              {!communityLoading && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {platformCards.map(card => (
                      <div key={card.id} className={`rounded-2xl border p-5 ${card.bg} transition-all hover:shadow-md`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-xl bg-white shadow-sm">{card.icon}</div>
                          <span className="text-sm font-bold text-slate-700">{card.label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {card.stats.map(s => (
                            <div key={s.label} className="bg-white rounded-xl p-3 shadow-xs">
                              <div className={`text-2xl font-extrabold ${card.accent}`}>{s.value}</div>
                              <div className="flex items-center gap-1 mt-0.5 text-[11px] font-semibold text-slate-500">
                                {s.icon}<span>{s.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total activity banner */}
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Platform-wide Impact</p>
                        <h3 className="text-3xl font-extrabold mt-1">{fmt(cs.totalActivities || 0)} <span className="text-slate-400 text-lg font-semibold">total activities</span></h3>
                        <p className="text-sm text-slate-400 mt-1">Generated by <span className="text-white font-bold">{fmt(cs.totalUsers || 0)} users</span> across all CareerSense tools.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {[
                          { label: "ATS Scans", value: fmt(cs.atsReports), color: "bg-blue-500/20 text-blue-300" },
                          { label: "Cover Letters", value: fmt(cs.coverLetters), color: "bg-violet-500/20 text-violet-300" },
                          { label: "Certificates", value: fmt(cs.certificates), color: "bg-amber-500/20 text-amber-300" },
                          { label: "GPS Reports", value: fmt(cs.gpsAssessments), color: "bg-cyan-500/20 text-cyan-300" }
                        ].map(pill => (
                          <span key={pill.label} className={`flex flex-col items-center rounded-xl px-3 py-2 text-center ${pill.color}`}>
                            <span className="text-xl font-extrabold">{pill.value}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{pill.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Refresh button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => { setCommunityStats(null); setCommunityLoading(true); }}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-xs"
                    >
                      <TrendingUp size={13} /> Refresh Stats
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        };
      }

      case "My Profile":
        const completeness = calculateProfileCompleteness();
        const PROFILE_STATUS_OPTIONS = [
          'Open to Work',
          'Hiring',
          'Not Looking for Job',
          'Learning',
          'Expecting Promotion',
          'Retired',
          'Startup Vibe',
          'Freelancing',
          'Building in Public',
          'Career Switch'
        ];

        const initialMaster = dashboardData?.masterProfile || {};
        const isDirty = (
          (profileForm.fullName || "") !== (initialMaster.fullName || "") ||
          (profileForm.email || "") !== (initialMaster.email || "") ||
          (profileForm.phone || "") !== (initialMaster.phone || "") ||
          (profileForm.location || "") !== (initialMaster.location || "") ||
          (profileForm.bio || "") !== (initialMaster.bio || "") ||
          (profileForm.currentJobTitle || "") !== (initialMaster.currentJobTitle || "") ||
          (profileForm.currentCompany || "") !== (initialMaster.currentCompany || "") ||
          (profileForm.targetJobTitle || "") !== (initialMaster.targetJobTitle || "") ||
          (profileForm.profileStatus || "Open to Work") !== (initialMaster.profileStatus || "Open to Work") ||
          (profileForm.experienceYears || "0") !== (initialMaster.experienceYears || "0") ||
          (profileForm.experienceMonths || "0") !== (initialMaster.experienceMonths || "0") ||
          (profileForm.geographicalAlignment || "") !== (initialMaster.geographicalAlignment || "") ||
          (profileForm.linkedinPortfolio || "") !== (initialMaster.linkedinPortfolio || "") ||
          (profileForm.githubUrl || "") !== (initialMaster.githubUrl || "") ||
          (profileForm.websiteUrl || "") !== (initialMaster.websiteUrl || "") ||
          JSON.stringify(profileForm.skills || []) !== JSON.stringify(initialMaster.skills || [])
        );

        return {
          title: "Master Identity & Unified Profile",
          subtitle: "Centralized profile control hub. Updates saved here automatically sync across ATS, Certifi & Cover Letter Builder.",
          stats: [],
          renderExtra: () => (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Alert Feedback Messages */}
              {profileSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-sm font-semibold flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    <span>{profileSuccessMsg}</span>
                  </div>
                </div>
              )}
              {profileErrorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm font-semibold flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-600 shrink-0" />
                    <span>{profileErrorMsg}</span>
                  </div>
                </div>
              )}

              {/* Public Profile Cover Image Section (Certifi UI Match) */}
              <section className="rounded-2xl border border-slate-200/75 bg-white p-6 shadow-xs space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Public Profile Cover Image</label>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="relative">
                      <div
                        className="h-44 sm:h-48 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${profileForm.bannerImage || DEFAULT_PROFILE_BANNER}")` }}
                      />
                      {isUploadingBanner && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-slate-500 font-medium">Upload a custom cover image or reset back to the default banner.</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95">
                          <ImagePlus className="h-4 w-4 text-slate-400" />
                          Upload Cover Image
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], "banner")} className="hidden" />
                        </label>
                        <button
                          type="button"
                          onClick={handleResetBanner}
                          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95 shadow-2xs"
                        >
                          Reset Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Details & Avatar Box */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="relative group shrink-0">
                      {profileForm.avatar ? (
                        <img
                          src={profileForm.avatar}
                          alt={profileForm.fullName || 'Profile avatar'}
                          className="h-24 w-24 rounded-2xl border border-slate-200 bg-slate-50 object-cover shadow-xs ring-4 ring-white"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-2xl bg-teal-600 text-white font-black text-2xl flex items-center justify-center border border-slate-200 shadow-xs ring-4 ring-white">
                          {userInitials}
                        </div>
                      )}
                      {isUploadingPhoto && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                          <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700 ring-1 ring-teal-200/50">
                          <UserRound className="h-3 w-3" />
                          Profile Details
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{profileForm.fullName || username}</h2>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {profileForm.currentJobTitle && profileForm.currentCompany
                          ? `${profileForm.currentJobTitle} at ${profileForm.currentCompany}`
                          : profileForm.currentJobTitle || profileForm.currentCompany || 'Add your current role and company to complete your profile.'}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 ring-1 ring-teal-200/70">
                          Status: {profileForm.profileStatus || 'Open to Work'}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95">
                          <ImagePlus className="h-4 w-4 text-slate-400" />
                          Upload Image
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0], "avatar")} className="hidden" />
                        </label>
                        {profileForm.avatar && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 active:scale-95 shadow-2xs"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Action Group: Circular Completeness Ring + Save Profile Button */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 shrink-0 pt-2 lg:pt-0">
                    {/* Circular Progress Gauge Component */}
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-2xs">
                      {/* SVG Progress Circle */}
                      <div className="relative flex items-center justify-center h-11 w-11 shrink-0">
                        <svg className="h-11 w-11 -rotate-90 transform" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            className="stroke-slate-200"
                            strokeWidth="3.2"
                            fill="none"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            className="stroke-teal-500 transition-all duration-700 ease-out"
                            strokeWidth="3.2"
                            strokeDasharray={97.39}
                            strokeDashoffset={97.39 - (97.39 * completeness) / 100}
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-black text-slate-900">
                          {completeness}%
                        </span>
                      </div>
                      <div className="leading-tight">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Score</div>
                        <div className="text-xs font-bold text-teal-700 mt-0.5">
                          {completeness === 100 ? "Fully Complete" : completeness >= 80 ? "Nearly Done" : "In Progress"}
                        </div>
                      </div>
                    </div>

                    {/* Save Profile Button */}
                    <button
                      type="submit"
                      disabled={!isDirty || profileSaving}
                      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all shadow-sm ${isDirty
                          ? "bg-teal-600 hover:bg-teal-500 cursor-pointer active:scale-95 shadow-teal-600/20"
                          : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                        }`}
                    >
                      {profileSaving ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          <span>Save Profile</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </section>

              {/* Personal & Contact Section */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                  <User size={18} className="text-teal-600" /> Personal Identity & Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm font-medium text-slate-800">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      placeholder="e.g. Subodh Pathak"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Primary Email Address</label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder="e.g. subodh@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location / City & Country</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      placeholder="e.g. Gurugram, India"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Professional Summary / Bio</label>
                    <textarea
                      rows={4}
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      placeholder="Brief summary of your expertise, career highlights, and objectives..."
                    />
                  </div>
                </div>
              </div>

              {/* Professional Coordinates & Work Experience */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                  <Briefcase size={18} className="text-blue-600" /> Career Coordinates & Work Experience
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm font-medium text-slate-800">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Current Job Title / Designation</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.currentJobTitle}
                      onChange={(e) => setProfileForm({ ...profileForm, currentJobTitle: e.target.value })}
                      placeholder="e.g. Senior Data Analyst"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Current Company / Organization</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.currentCompany}
                      onChange={(e) => setProfileForm({ ...profileForm, currentCompany: e.target.value })}
                      placeholder="e.g. DataSense AI"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Job Title / Primary Role Preference</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.targetJobTitle}
                      onChange={(e) => setProfileForm({ ...profileForm, targetJobTitle: e.target.value })}
                      placeholder="e.g. Analytics Engineer / Lead Data Analyst"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Configured Geographical Alignment</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.geographicalAlignment}
                      onChange={(e) => setProfileForm({ ...profileForm, geographicalAlignment: e.target.value })}
                      placeholder="e.g. Remote Worldwide / Hybrid (Gurugram)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Experience (Years)</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.experienceYears}
                      onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Experience (Months)</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.experienceMonths}
                      onChange={(e) => setProfileForm({ ...profileForm, experienceMonths: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Profile Status Availability</label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
                      value={profileForm.profileStatus}
                      onChange={(e) => setProfileForm({ ...profileForm, profileStatus: e.target.value })}
                    >
                      {PROFILE_STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Portfolio & Social Networks */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                  <Globe size={18} className="text-indigo-600" /> Portfolio & Professional Networks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm font-medium text-slate-800">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">LinkedIn / Portfolio URL</label>
                    <input
                      type="url"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.linkedinPortfolio}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedinPortfolio: e.target.value })}
                      placeholder="e.g. https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">GitHub Profile URL</label>
                    <input
                      type="url"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.githubUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                      placeholder="e.g. https://github.com/username"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Personal Website / Portfolio</label>
                    <input
                      type="url"
                      className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3.5 text-sm sm:text-base font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      value={profileForm.websiteUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, websiteUrl: e.target.value })}
                      placeholder="e.g. https://myportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Technical Expertise */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                  <Award size={18} className="text-amber-600" /> Core Skills & Technical Competencies
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2.5">
                    {profileForm.skills.length === 0 ? (
                      <p className="text-sm text-slate-400 font-medium">No skills added yet.</p>
                    ) : (
                      profileForm.skills.map((skill, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-900 px-3.5 py-1.5 rounded-xl text-sm font-bold shadow-2xs">
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSkills = profileForm.skills.filter((_, i) => i !== idx);
                              setProfileForm({ ...profileForm, skills: updatedSkills });
                            }}
                            className="text-slate-400 hover:text-red-500 transition-colors ml-0.5"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2.5 pt-2">
                    <input
                      type="text"
                      className="flex-1 rounded-xl border border-slate-300 bg-[#f8fafc] px-4 py-3 text-sm sm:text-base font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                      placeholder="Add a new skill (e.g. Python, SQL, Tableau)..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newSkillInput.trim() && !profileForm.skills.includes(newSkillInput.trim())) {
                            setProfileForm({ ...profileForm, skills: [...profileForm.skills, newSkillInput.trim()] });
                            setNewSkillInput("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSkillInput.trim() && !profileForm.skills.includes(newSkillInput.trim())) {
                          setProfileForm({ ...profileForm, skills: [...profileForm.skills, newSkillInput.trim()] });
                          setNewSkillInput("");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all active:scale-95 shadow-sm"
                    >
                      <Plus size={16} /> Add Skill
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )
        };

      case "Usage & Billing":
        const resumesCount = atsResumes.length;
        const letterCount = dashboardData?.coverLetter?.savedLetters?.length || 0;

        return {
          title: "Infrastructure Tokens & Billing Ledger",
          subtitle: "Verify computational quota allocations and clear transaction operational history.",
          stats: [
            { label: "Current Balance Incurred", value: `$${totalCost.toFixed(4)}`, status: "Settled", color: "text-cyan-600", bg: "bg-cyan-50", icon: <CreditCard size={16} /> },
            { label: "Active Operational Tier", value: "Free Pool", status: "Quota Limited", color: "text-slate-500", bg: "bg-slate-100", icon: <Lock size={16} /> }
          ],
          renderExtra: () => (
            <div className="space-y-6 mt-6">
              {/* Site Sumup Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "ATS Checker", subdomain: "ats.careersenseai.com", usage: `${resumesCount} / 10 runs`, points: summaryBySite["ATS Checker"].points, cost: summaryBySite["ATS Checker"].cost, badgeColor: "bg-blue-100 text-blue-800" },
                  { name: "Certifi Platform", subdomain: "certifi.careersenseai.com", usage: `${certsCount} / 5 certs`, points: summaryBySite["Certifi"].points, cost: summaryBySite["Certifi"].cost, badgeColor: "bg-teal-100 text-teal-800" },
                  { name: "Cover Letter Builder", subdomain: "coverletter.careersenseai.com", usage: `${letterCount} / 20 letters`, points: summaryBySite["Cover Letter Builder"].points, cost: summaryBySite["Cover Letter Builder"].cost, badgeColor: "bg-amber-100 text-amber-800" }
                ].map((site, i) => (
                  <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${site.badgeColor}`}>{site.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{site.subdomain}</span>
                      </div>
                      <div className="mt-4 font-mono text-sm font-semibold text-slate-500">
                        Usage Quota: <span className="text-slate-800 font-bold">{site.usage}</span>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-3 flex justify-between text-xs font-bold text-slate-500">
                      <div>Points: <span className="text-slate-800">{site.points}</span></div>
                      <div>Cost: <span className="text-slate-800">${site.cost.toFixed(4)}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Individual usage log ledger */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-3">
                  <h3 className="text-sm font-bold text-slate-800">Transaction Ledger Log</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Filter:</span>
                    <select
                      value={ledgerFilter}
                      onChange={(e) => {
                        setLedgerFilter(e.target.value);
                        setLedgerLimit(20);
                      }}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-teal-500"
                    >
                      <option value="all">All Operations</option>
                      <option value="ATS Checker">ATS Checker</option>
                      <option value="Cover Letter">Cover Letters</option>
                      <option value="Certifi">Certifi Platform</option>
                    </select>
                  </div>
                </div>
                {filteredLedger.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No transaction logs recorded in ledger.</p>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-400 font-bold border-b border-slate-100">
                            <th className="pb-2">Action</th>
                            <th className="pb-2">App Node</th>
                            <th className="pb-2">Date</th>
                            <th className="pb-2 text-right">Points Used</th>
                            <th className="pb-2 text-right">Cost (USD)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                          {displayedLedger.map((log, i) => {
                            let appBadge = "bg-teal-50 text-teal-800";
                            if (log.app === "ATS Checker") {
                              appBadge = "bg-blue-50 text-blue-800";
                            } else if (log.app === "Cover Letter") {
                              appBadge = "bg-amber-50 text-amber-800";
                            }

                            return (
                              <tr key={i} className="last:border-0">
                                <td className="py-3 font-semibold text-slate-800">{log.action}</td>
                                <td className="py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${appBadge}`}>{log.app}</span></td>
                                <td className="py-3 text-slate-400">{log.createdAt.toLocaleDateString()}</td>
                                <td className="py-3 text-right font-mono text-slate-800">{log.points}</td>
                                <td className="py-3 text-right font-mono text-slate-800">${log.cost.toFixed(4)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {filteredLedger.length > ledgerLimit && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setLedgerLimit(prev => prev + 20)}
                          className="inline-flex items-center gap-1 px-4 py-2 border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-all active:scale-95 shadow-xs"
                        >
                          Show More
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        };

      default:
        return { title: "Overview", subtitle: "System module workspace node.", stats: [], renderExtra: () => null };
    }
  };

  const detailedData = getTabDetailedData();

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800">

      {/* --- SIDEBAR PANEL --- */}
      <aside className="hidden w-[260px] shrink-0 select-none border-r border-slate-900 bg-[#0b132b] p-5 text-slate-300 lg:flex lg:flex-col" style={{height:'100vh'}}>
        <div className="flex flex-col h-full">
          <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-6 shrink-0">
            <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
            <div className="leading-none">
              <span className="text-[18px] font-black tracking-tight text-white">Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span></span>
            </div>
          </Link>

          <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 shrink-0">Menu</div>

          <nav className="flex-1 overflow-y-auto space-y-1 pr-1" style={{scrollbarWidth:'thin', scrollbarColor:'#1c2541 transparent'}}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleTabChange(item.label)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all sm:text-[13.5px] ${isSelected
                    ? "bg-[#1c2541] text-teal-400 border border-slate-700/50"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                    }`}
                >
                  <Icon size={18} className={isSelected ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-4 space-y-4 shrink-0">
          <div className="rounded-xl border border-slate-800 bg-[#111a36] p-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1.5">
              <Zap size={13} fill="currentColor" /> Pro Plan
            </div>
            <p className="text-[11px] text-slate-400 leading-normal mb-3">Unlock unlimited AI assessments and tailored paths.</p>
            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2 rounded-lg transition-all active:scale-95">
              Upgrade Account
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {user?.imageUrl ? (
                <img src={user.imageUrl} className="h-8 w-8 rounded-full object-cover shrink-0" alt={username} />
              ) : (
                <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {userInitials}
                </div>
              )}
              <div className="leading-tight min-w-0">
                <div className="text-xs font-bold text-white truncate">{username}</div>
                <div className="text-[10px] text-slate-500 font-medium truncate">Free Tier Account</div>
              </div>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition-colors ml-2">
              <LogOut size={15} />
            </button>
          </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close dashboard menu"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-[86%] max-w-[320px] flex-col justify-between border-r border-slate-900 bg-[#0b132b] p-5 text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                  <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
                  <div className="leading-none">
                    <span className="text-[18px] font-black tracking-tight text-white">
                      Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Menu</div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        handleTabChange(item.label);
                        setSidebarOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13.5px] font-medium transition-all ${isSelected
                        ? "bg-[#1c2541] text-teal-400 border border-slate-700/50"
                        : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                        }`}
                    >
                      <Icon size={18} className={isSelected ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-[#111a36] p-4 shadow-sm">
                <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Zap size={13} fill="currentColor" /> Pro Plan
                </div>
                <p className="mb-3 text-[11px] leading-normal text-slate-400">
                  Unlock unlimited AI assessments and tailored paths.
                </p>
                <button className="w-full rounded-lg bg-teal-600 py-2 text-xs font-bold text-white transition-all active:scale-95 hover:bg-teal-500">
                  Upgrade Account
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* --- CENTRAL INTERFACE CONTAINER --- */}
      <section className="relative flex flex-1 flex-col overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className={`flex flex-col justify-between min-h-full flex-1 ${(activeTab === "Resume Builder" || activeTab === "Interview Practice") ? "blur-[6px] pointer-events-none select-none" : ""}`}>
          <div>
            <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                aria-label="Open dashboard menu"
              >
                <MenuSquare size={20} />
              </button>
              <Link to="/" className="flex items-center gap-2.5">
                <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
                <div className="text-[17px] font-black tracking-tight text-slate-900">
                  Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span>
                </div>
              </Link>
              <div className="w-11" />
            </div>

            {/* Top Info Header Bar */}
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{detailedData.title}</h1>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{detailedData.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                  <div className="h-7 w-7 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center"><Zap size={14} fill="currentColor" /></div>
                  <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">CS Points Used</div><div className="text-sm font-black text-slate-800 mt-1">{totalPoints}</div></div>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                  <div className="h-7 w-7 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold text-sm">$</div>
                  <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Consumed</div><div className="text-sm font-black text-slate-800 mt-1">${totalCost.toFixed(4)}</div></div>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                  <div className="h-7 w-7 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center"><ShieldCheck size={14} /></div>
                  <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Certs</div><div className="text-sm font-black text-slate-800 mt-1">{certsCount}</div></div>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                  <div className="h-7 w-7 rounded-md bg-indigo-50 text-indigo-500 flex items-center justify-center"><TrendingUp size={14} /></div>
                  <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Paths</div><div className="text-sm font-black text-slate-800 mt-1">{pathsCount}</div></div>
                </div>
              </div>
            </div>

            {/* System Active Callout Welcome Card & Metric Cards Grid (Hidden on My Profile tab) */}
            {activeTab !== "My Profile" && (
              <>
                <div className="bg-white border border-slate-200/60 rounded-xl p-6 mb-6 shadow-xs relative overflow-hidden">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> System Active
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1.5 font-mono"><Clock size={13} /> {currentTime.toLocaleTimeString()}</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Welcome back, {user?.firstName || username}</h2>
                      <p className="text-slate-400 text-sm mt-1.5 max-w-[65ch] leading-relaxed">
                        Track your certification progress, analyze assessment performance, and monitor active learning paths across your organization's workspace.
                      </p>
                    </div>

                    {activeTab === "Certificates" && (
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a href="https://certifi.careersenseai.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <Sparkles size={13} /> Create Assessment
                        </a>
                      </div>
                    )}
                    {activeTab === "ATS Checker" && (
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a href="https://ats.careersenseai.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <Sparkles size={13} /> Check ATS
                        </a>
                      </div>
                    )}
                    {activeTab === "Cover Letters" && (
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a href="https://coverletter.careersenseai.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <Sparkles size={13} /> Build Letter
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- METRIC CARDS GRID --- */}
                {detailedData.stats.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    {detailedData.stats.map((card, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300/80 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</div>
                          <div className={`h-8 w-8 rounded-lg ${card.bg} flex items-center justify-center text-slate-700 transition-transform group-hover:scale-105`}>
                            {card.icon}
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className={`text-3xl font-black tracking-tight ${card.color}`}>{card.value}</div>
                          <p className="text-[11.5px] text-slate-400 leading-normal font-medium mt-1.5">{card.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* --- SUB-VIEW EXTRA INJECTIONS --- */}
            {detailedData.renderExtra && detailedData.renderExtra()}

          </div>

          {/* Global Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-400">
            <div>CareerSense Operations Framework Dashboard v2.4</div>
            <div className="flex items-center gap-4">
              <a href="#docs" className="hover:text-slate-600 transition-colors">Documentation</a>
              <a href="#support" className="hover:text-slate-600 transition-colors">Support Center</a>
            </div>
          </div>
        </div>

        {(activeTab === "Resume Builder" || activeTab === "Interview Practice") && (() => {
          // Compute a stable launch date: 28 days from the fixed reference (today at midnight UTC)
          const LAUNCH_DATES = {
            "Resume Builder": (() => {
              const d = new Date(); d.setUTCHours(0,0,0,0); d.setUTCDate(d.getUTCDate() + 28); return d;
            })(),
            "Interview Practice": (() => {
              const d = new Date(); d.setUTCHours(0,0,0,0); d.setUTCDate(d.getUTCDate() + 28); return d;
            })()
          };
          const launchDate = LAUNCH_DATES[activeTab];
          const diff = Math.max(0, launchDate - currentTime);
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);

          const isResume = activeTab === "Resume Builder";
          const accentColor = isResume ? "from-blue-600 to-indigo-600" : "from-violet-600 to-purple-600";
          const accentBg = isResume ? "bg-blue-50" : "bg-violet-50";
          const accentText = isResume ? "text-blue-600" : "text-violet-600";
          const accentBorder = isResume ? "border-blue-100" : "border-violet-100";
          const Icon = isResume ? FileText : MessageSquareText;

          return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[3px]">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center relative z-50 mx-4" style={{boxShadow:"0 32px 64px rgba(15,23,42,0.18)"}}>
                {/* Icon badge */}
                <div className={`h-14 w-14 rounded-2xl ${accentBg} ${accentText} flex items-center justify-center mx-auto mb-5 border ${accentBorder}`}>
                  <Icon size={26} />
                </div>

                {/* Gradient label */}
                <span className={`inline-block bg-gradient-to-r ${accentColor} bg-clip-text text-transparent text-xs font-black uppercase tracking-widest mb-2`}>
                  Coming Soon
                </span>

                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {activeTab} is almost here
                </h3>
                <p className="text-slate-500 text-xs mt-2 mb-6 leading-relaxed max-w-xs mx-auto">
                  We're building an intelligent AI-powered workspace for this module.
                  Launching in exactly:
                </p>

                {/* Countdown boxes */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { label: "Days", value: String(days).padStart(2, "0") },
                    { label: "Hours", value: String(hours).padStart(2, "0") },
                    { label: "Mins", value: String(mins).padStart(2, "0") },
                    { label: "Secs", value: String(secs).padStart(2, "0") }
                  ].map(({ label, value }) => (
                    <div key={label} className={`rounded-xl border ${accentBorder} ${accentBg} p-3 flex flex-col items-center`}>
                      <span className={`text-2xl font-black tabular-nums ${accentText}`}>{value}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Launch date */}
                <p className="text-[11px] text-slate-400 font-semibold">
                  Estimated launch: <span className="text-slate-600 font-bold">{launchDate.toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" })}</span>
                </p>
              </div>
            </div>
          );
        })()}

      </section>
    </main>
  );
}

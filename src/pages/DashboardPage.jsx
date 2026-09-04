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
  Plus,
  AlertCircle,
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
  AlertTriangle,
  BookOpenCheck,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Target,
  Rocket,
  BarChart3,
  Bot,
  Code2,
  Smartphone,
  Palette
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import CSLogo from "../Assets/CSlogo.png";
import { pipelinePhases } from "../data/careerGpsData";
import IdCardStudio from "../components/dashboard/IdCardStudio";
import OfferLetterStudio from "../components/dashboard/OfferLetterStudio";
import ELearningLibrary from "../components/dashboard/ELearningLibrary";
import PartnerAssignments from "../components/dashboard/PartnerAssignments";
import FellowshipProgram from "../components/dashboard/FellowshipProgram";
import SkillPassport from "../components/dashboard/skill-passport/SkillPassport";
// ── Timeline Section Component for Profile (Education, Certifications, Awards) ─────
function TimelineSection({
  title,
  icon: Icon,
  items = [],
  autoCertificates = [],
  onAdd,
  onChange,
  onRemove,
  accent = 'teal'
}) {
  const chipClass =
    accent === 'amber'
      ? 'bg-amber-50 text-amber-600 ring-amber-200/50'
      : accent === 'blue'
        ? 'bg-blue-50 text-blue-600 ring-blue-200/50'
        : 'bg-teal-50 text-teal-600 ring-teal-200/50';

  const inputClasses = "w-full rounded-xl border border-slate-300 bg-[#f8fafc] p-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20";
  const labelClasses = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500";

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${chipClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your {title.toLowerCase()} timeline and details.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4 text-slate-400" />
          Add Entry
        </button>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-8 text-center">
            <Icon className="mb-2 h-6 w-6 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">No {title.toLowerCase()} entries yet</p>
            <p className="text-xs text-slate-400 mt-1">Click 'Add Entry' to add to your timeline.</p>
          </div>
        ) : null}

        {items.map((item, index) => (
          <div key={index} className="group relative rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition-colors hover:border-slate-300 hover:bg-slate-50">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClasses}>Title</label>
                <input
                  value={item.title || ''}
                  onChange={(e) => onChange(index, 'title', e.target.value)}
                  placeholder={title === 'Education' ? 'Degree / Program' : title === 'Awards' ? 'Award name' : 'Certification name'}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Subtitle / Organization</label>
                <input
                  value={item.subtitle || ''}
                  onChange={(e) => onChange(index, 'subtitle', e.target.value)}
                  placeholder={title === 'Education' ? 'School / University' : 'Issuer / Organization'}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Start Date</label>
                <input
                  value={item.start || ''}
                  onChange={(e) => onChange(index, 'start', e.target.value)}
                  placeholder="e.g. Jun 2022"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>End Date</label>
                <input
                  value={item.end || ''}
                  onChange={(e) => onChange(index, 'end', e.target.value)}
                  placeholder="e.g. Present"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClasses}>Description / Notes</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => onChange(index, 'description', e.target.value)}
                rows={2}
                placeholder="Add a short description, achievements, or highlights."
                className={inputClasses}
              />
            </div>

            <div className="mt-4 flex items-center justify-end border-t border-slate-200/60 pt-3">
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Entry</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const fellowshipFromUrl = searchParams.get("fellowship");
  const activeTab = ["e Learning", "eLearning", "E-Learning"].includes(tabFromUrl)
    ? "E-Learning"
    : ["Certificates", "Skill Certification", "skill-certification", "SkillCertification"].includes(tabFromUrl)
      ? "Skill Certification"
      : tabFromUrl || "Dashboard";

  const handleTabChange = (label) => {
    setSearchParams({ tab: label });
  };

  const handleFellowshipChange = (programId) => {
    setSearchParams({ tab: "Fellowship Program", fellowship: programId });
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const careerToolLabels = ["Resume Builder", "ATS Checker", "Cover Letters", "Interview Practice", "Skill Certification"];
  const [careerToolsOpen, setCareerToolsOpen] = useState(() => careerToolLabels.includes(activeTab));
  const [fellowshipOpen, setFellowshipOpen] = useState(() => activeTab === "Fellowship Program");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [ledgerFilter, setLedgerFilter] = useState("all");
  const [ledgerLimit, setLedgerLimit] = useState(20);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const saved = localStorage.getItem("cs_sidebar_width");
      return saved ? Math.min(350, Math.max(260, Number(saved))) : 260;
    } catch (_) {
      return 260;
    }
  });
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);

  const startResizingSidebar = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
  };

  useEffect(() => {
    if (!isResizingSidebar) return;

    const handleMouseMove = (e) => {
      const newWidth = Math.min(350, Math.max(260, e.clientX));
      setSidebarWidth(newWidth);
      try {
        localStorage.setItem("cs_sidebar_width", String(newWidth));
      } catch (_) { }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizingSidebar]);

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [communityStats, setCommunityStats] = useState(null);
  const [communityLoading, setCommunityLoading] = useState(false);
  const [userSub, setUserSub] = useState({ plan: "free", tokensRemaining: 10000, purchasedFellowships: [] });

  useEffect(() => {
    if (!user?.id) return;
    const fetchUserSub = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
        const res = await fetch(`${backendUrl}/careersense/subscription/status?clerkId=${user.id}`);
        const data = await res.json();
        if (data.success) {
          setUserSub(data);
        }
      } catch (err) {
        console.error("Error fetching CareerSense subscription:", err);
      }
    };
    fetchUserSub();
  }, [user?.id]);

  // Master Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    batch: "",
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
    certifications: [],
    awards: []
  });
  const [newSkillInput, setNewSkillInput] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");
  const [profileErrorMsg, setProfileErrorMsg] = useState("");
  const [partnerPointsDelta, setPartnerPointsDelta] = useState(0);

  const addTimelineItem = (field) => {
    setProfileForm((current) => ({
      ...current,
      [field]: [...(current[field] || []), { title: "", subtitle: "", start: "", end: "", description: "" }]
    }));
  };

  const updateTimelineItem = (field, index, key, value) => {
    setProfileForm((current) => ({
      ...current,
      [field]: (current[field] || []).map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const removeTimelineItem = (field, index) => {
    setProfileForm((current) => ({
      ...current,
      [field]: (current[field] || []).filter((_, i) => i !== index)
    }));
  };

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
        batch: p.batch || (user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : new Date().getFullYear().toString()),
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
        certifications: p.certifications || [],
        awards: p.awards || []
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

  const getProfileCompletionItems = () => [
    { label: "Full name", points: 10, complete: Boolean(profileForm.fullName?.trim()) },
    { label: "Email address", points: 10, complete: Boolean(profileForm.email?.trim()) },
    { label: "Phone number", points: 10, complete: Boolean(profileForm.phone?.trim()) },
    { label: "Location", points: 10, complete: Boolean(profileForm.location?.trim()) },
    { label: "Professional bio", points: 10, complete: Boolean(profileForm.bio?.trim()) },
    { label: "Current job title", points: 10, complete: Boolean(profileForm.currentJobTitle?.trim()) },
    { label: "Target job title", points: 10, complete: Boolean(profileForm.targetJobTitle?.trim()) },
    { label: "Profile status", points: 5, complete: Boolean(profileForm.profileStatus?.trim()) },
    { label: "Profile photo", points: 5, complete: Boolean(profileForm.avatar?.trim()) },
    { label: "Custom cover image", points: 5, complete: Boolean(profileForm.bannerImage?.trim()) },
    {
      label: "Professional link",
      points: 5,
      complete: Boolean(profileForm.linkedinPortfolio?.trim() || profileForm.githubUrl?.trim() || profileForm.websiteUrl?.trim())
    },
    { label: "At least one skill", points: 10, complete: profileForm.skills?.length > 0 }
  ];

  const calculateProfileCompleteness = () =>
    getProfileCompletionItems().reduce((score, item) => score + (item.complete ? item.points : 0), 0);

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

  const [serverLedgerLogs, setServerLedgerLogs] = useState([]);
  const [serverLedgerLoading, setServerLedgerLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      setServerLedgerLoading(false);
      return;
    }

    // 1. Instant Cache Hit: render workspace in 0ms from sessionStorage if available
    try {
      const cached = sessionStorage.getItem("cs_dashboard_summary");
      if (cached) {
        setDashboardData(JSON.parse(cached));
        setLoading(false);
      }
    } catch (_) { }

    const fetchDashboardSummary = async () => {
      setServerLedgerLoading(true);
      try {
        const token = await getToken();
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
        const response = await fetch(`${apiBase}/careersense/dashboard/summary`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
          try { sessionStorage.setItem("cs_dashboard_summary", JSON.stringify(data)); } catch (_) { }
        }

        const ledgerRes = await fetch(`${apiBase}/careersense/subscription/ledger?clerkId=${user.id}`);
        if (ledgerRes.ok) {
          const ledgerData = await ledgerRes.json();
          if (ledgerData.ledger) {
            setServerLedgerLogs(ledgerData.ledger);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      } finally {
        setLoading(false);
        setServerLedgerLoading(false);
      }
    };

    fetchDashboardSummary();
  }, [isLoaded, user?.id]);

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
    { icon: UserRound, label: "My Profile", section: "Workspace", tone: "text-teal-400" },
    { icon: LayoutDashboard, label: "Dashboard", section: "Workspace", tone: "text-sky-400" },
    { icon: BookOpenCheck, label: "Skill Passport", section: "Workspace", tone: "text-amber-300" },
    { icon: CreditCard, label: "ID Card Studio", section: "Workspace", tone: "text-cyan-400" },
    { icon: Compass, label: "Career GPS", section: "Workspace", tone: "text-emerald-400" },
    {
      icon: Sparkles,
      label: "CareerTools",
      section: "Learn & Build",
      tone: "text-blue-400",
      children: [
        { icon: FileText, label: "Resume Builder", shortLabel: "Resume" },
        { icon: FileSearch, label: "ATS Checker", shortLabel: "ATS Checker" },
        { icon: BookOpen, label: "Cover Letters", shortLabel: "Cover Letter" },
        { icon: MessageSquareText, label: "Interview Practice", shortLabel: "Interview" },
        { icon: ShieldCheck, label: "Skill Certification", shortLabel: "Certificates" },
      ],
    },
    { icon: GraduationCap, label: "E-Learning", section: "Learn & Build", tone: "text-violet-400" },
    {
      icon: Rocket,
      label: "Fellowship Program",
      section: "Learn & Build",
      tone: "text-cyan-300",
      children: [
        { icon: TrendingUp, label: "Data Analyst", shortLabel: "Data Analyst", programId: "data-analyst" },
        { icon: BarChart3, label: "Data Science", shortLabel: "Data Science", programId: "data-science" },
        { icon: Bot, label: "Artificial Intelligence", shortLabel: "Artificial Intelligence", programId: "artificial-intelligence" },
        { icon: Palette, label: "UI/UX Design", shortLabel: "UI/UX Design", programId: "ui-ux-design" },
        { icon: Smartphone, label: "App Development", shortLabel: "App Development", programId: "app-development" },
        { icon: Code2, label: "Full Stack Development", shortLabel: "Full Stack", programId: "full-stack-development" },
      ],
    },
    { icon: BookOpenCheck, label: "Partner Journey", section: "Learn & Build", tone: "text-amber-400" },
    { icon: Briefcase, label: "Offer Letter Workspace", section: "Career Network", tone: "text-orange-400" },
    { icon: Users, label: "Community", section: "Career Network", tone: "text-rose-400" },
    { icon: CreditCard, label: "Usage & Billing", section: "Account", tone: "text-slate-400" },
  ];

  const userPlan = userSub?.plan || "free";
  const purchasedFellowships = userSub?.purchasedFellowships || [];

  useEffect(() => {
    if (!userSub) return;
    const plan = userSub.plan || "free";
    if ((activeTab === "Partner Journey" || activeTab === "ID Card Studio" || activeTab === "Offer Letter Workspace") && plan !== "partner") {
      setSearchParams({ tab: "Dashboard" });
    }
    if (activeTab === "Fellowship Program" && plan !== "intern") {
      setSearchParams({ tab: "Dashboard" });
    }
  }, [userSub, activeTab]);

  const filteredSidebarItems = sidebarItems.filter(item => {
    if (item.label === "ID Card Studio" && userPlan !== "partner") return false;
    if (item.label === "Offer Letter Workspace" && userPlan !== "partner") return false;
    if (item.label === "Partner Journey" && userPlan !== "partner") return false;
    if (item.label === "Fellowship Program" && userPlan !== "intern") return false;
    return true;
  }).map(item => {
    if (item.label === "Fellowship Program" && item.children) {
      const filteredChildren = item.children.filter(child =>
        purchasedFellowships.length === 0 || purchasedFellowships.includes(child.programId)
      );
      return { ...item, children: filteredChildren };
    }
    return item;
  });

  const username = user?.fullName || user?.username || "Guest User";
  const userInitials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : username.substring(0, 2).toUpperCase();

  const rawAtsResumes = dashboardData?.ats?.resumes || [];
  const atsResumes = [...rawAtsResumes].sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0));
  const atsJds = dashboardData?.ats?.jobDescriptions || [];
  const getResumeName = (res) => {
    if (!res) return "";
    return (
      res.file_name ||
      res.fileName ||
      res.filename ||
      res.resume_file_name ||
      res.originalName ||
      res.original_filename ||
      res.candidate_name ||
      res.candidateName ||
      res.title ||
      res.name ||
      (res.resume_id ? `Resume_${res.resume_id.substring(0, 6)}.pdf` : "Scanned Resume.pdf")
    );
  };
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
    const resumeLen = letter.resumeTextLen ?? (letter.resumeText || "").length;
    const jdLen = letter.jdLen ?? (letter.jobDescription || "").length;
    const genLen = letter.genLen ?? (letter.generatedLetter || "").length;

    const inputPoints = (resumeLen > 0 || jdLen > 0)
      ? Math.round((resumeLen + jdLen) / 4) + 1036
      : 1800;
    const outputPoints = genLen > 0 ? Math.round(genLen / 4) : 600;
    return sum + inputPoints + outputPoints;
  }, 0);
  const coverLetterCost = coverLetterPoints / 100000;

  const usageLedger = dashboardData?.certifi?.usageLedger || [];
  const certifiPoints = usageLedger.reduce((sum, item) => sum + (item.careerPoints || item.points || 0), 0);
  const certifiCost = usageLedger.reduce((sum, item) => sum + (item.costUsd || item.cost || 0), 0);

  const totalPoints = Math.max(0, atsPoints + coverLetterPoints + certifiPoints + partnerPointsDelta);
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
        event: `ATS Scan - ${getResumeName(res)}`,
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
    if (serverLedgerLoading) return [];
    if (serverLedgerLogs.length > 0) {
      return serverLedgerLogs
        .filter(log => log.amount < 0)
        .map(log => {
          const pts = Math.abs(log.amount);
          const service = log.serviceId || "tool_usage";
          const isAts = service.includes("ats");
          const isCover = service.includes("Cover") || service.includes("cover");
          return {
            action: isAts ? "ATS Report" : isCover ? "Executive Analysis" : service === "certifi_assessment" ? "Assessment Generation" : service,
            app: isAts ? "ATS Checker" : isCover ? "Cover Letter" : "Certifi",
            createdAt: new Date(log.createdAt),
            points: pts,
            cost: pts / 100000
          };
        });
    }
    return [];
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
      case "Skill Passport":
        return {
          title: "Skill Passport",
          subtitle: "Your living CareerSense journey, stamped with every milestone.",
          stats: [],
          renderExtra: () => (
            <SkillPassport
              dashboardData={dashboardData}
              profile={profileForm}
              user={user}
              atsResumes={atsResumes}
              coverLetters={coverLetters}
            />
          )
        };

      case "Fellowship Program":
        return {
          title: "Fellowship Program",
          subtitle: "Choose one professional track and complete a three-month, mentor-reviewed project journey.",
          stats: [],
          renderExtra: () => <FellowshipProgram profile={profileForm} user={user} initialProgramId={fellowshipFromUrl} />
        };
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

        const coverLettersCount = dashboardData?.coverLetter?.savedLetters?.length || 0;

        return {
          title: "Platform Overview",
          subtitle: "Central control node for platform certifications, infrastructure usage tracking, and system tokens.",
          stats: [
            { label: "Career Readiness Score", value: careerScore ? `${careerScore}%` : "N/A", status: assessmentTaken ? dashboardData.assessment.results.readinessLevel.label : "No assessment taken", color: "text-blue-600", bg: "bg-blue-50", icon: <TrendingUp size={16} /> },
            { label: "ATS Matching Average", value: targetAtsVal, status: targetAtsStatus, color: "text-emerald-600", bg: "bg-emerald-50", icon: <Sparkles size={16} /> },
            { label: "Verified Credentials", value: `${certificatesCount} Issued`, status: certificatesCount > 0 ? "Verified Credentials Sync" : "No certificates issued", color: "text-indigo-600", bg: "bg-indigo-50", icon: <ShieldCheck size={16} /> },
            { label: "Total Cover Letters", value: `${coverLettersCount} Saved`, status: coverLettersCount > 0 ? "Total Asset Documents" : "No cover letters created", color: "text-amber-600", bg: "bg-amber-50", icon: <BookOpen size={16} /> }
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

      case "Partner Journey":
      case "Partner Assignments":
        return {
          title: "Partner Assignment Roadmap",
          subtitle: "Complete real startup missions, build your portfolio, and grow your CareerSense Partner Score.",
          stats: [],
          renderExtra: () => <PartnerAssignments onViewIdCard={() => handleTabChange("ID Card Studio")} totalUserPoints={totalPoints} onPointsChange={setPartnerPointsDelta} />
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
                  {/* Interactive Creation Pipeline Stepper Map */}
                  {(() => {
                    const phaseList = pipelinePhases.map((phase) => {
                      const rawScore = catScores[phase.id] ?? 0;
                      const isDone = Boolean(aiDiag?.completedPhases?.[phase.id]);
                      const score = isDone ? 100 : rawScore;
                      return { ...phase, score, isDone };
                    });

                    const focusPhase = phaseList.find((p) => !p.isDone && p.status === "live") || phaseList.find((p) => !p.isDone) || phaseList[0];
                    const completedCount = phaseList.filter(p => p.isDone).length;
                    const progressPercent = Math.max(0, Math.min(100, (completedCount / (phaseList.length - 1)) * 100));

                    const phaseIconMap = {
                      resume: FileText,
                      ats: ShieldCheck,
                      skills: Award,
                      coverletter: BookOpen,
                      interview: MessageSquareText,
                    };

                    return (
                      <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-white text-slate-900 shadow-sm p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 pb-5 mb-8 gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-black tracking-tight text-slate-900">Creation Pipeline</h3>
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-cyan-100 text-cyan-800 border border-cyan-300">
                                <Sparkles size={11} className="text-cyan-600" /> Interactive Map
                              </span>
                            </div>
                            <p className="text-xs font-semibold mt-1 flex items-center gap-2 text-slate-500">
                              <span>Current focus:</span>
                              <span className="font-black px-2 py-0.5 rounded-md text-xs bg-slate-900 text-white shadow-xs">{focusPhase.tool}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-extrabold px-3.5 py-1.5 rounded-xl border bg-white border-slate-200/80 text-slate-600 shadow-xs">
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs animate-pulse"></span> Completed</span>
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-xs"></span> Focus</span>
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Pending</span>
                          </div>
                        </div>

                        {/* Stepper Roadmap Visual */}
                        <div className="relative mx-auto my-4 max-w-4xl px-2 sm:px-6">
                          <div className="absolute top-[28px] left-10 right-10 h-3 rounded-full bg-slate-200/90 z-0 p-0.5 shadow-inner">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 transition-all duration-700 ease-out shadow-md" style={{ width: `${progressPercent}%` }} />
                          </div>

                          <div className="relative z-10 flex items-start justify-between">
                            {phaseList.map((phase) => {
                              const isFocus = phase.id === focusPhase.id;
                              const isDone = phase.isDone;
                              const IconComponent = phaseIconMap[phase.id] || FileText;

                              let statusTagClass = "bg-slate-100 text-slate-500 border-slate-200";
                              let statusText = "PENDING";

                              if (isDone) {
                                statusText = "COMPLETED";
                                statusTagClass = "bg-emerald-100 text-emerald-800 border-emerald-300 font-black";
                              } else if (isFocus) {
                                statusText = "IN PROGRESS";
                                statusTagClass = "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-md animate-pulse border-transparent";
                              } else if (phase.status === "coming-soon") {
                                statusText = "COMING SOON";
                                statusTagClass = "bg-amber-100 text-amber-800 border-amber-300 font-black";
                              }

                              return (
                                <div
                                  key={phase.id}
                                  onClick={() => { if (phase.href) window.open(phase.href, "_blank"); }}
                                  className="group flex flex-col items-center cursor-pointer transition-all flex-1 min-w-0"
                                >
                                  <div className="relative flex items-center justify-center">
                                    <div className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${isFocus
                                      ? "bg-gradient-to-tr from-slate-900 via-cyan-950 to-slate-900 border-cyan-400 text-white shadow-xl shadow-cyan-500/30 ring-4 ring-cyan-500/20 scale-115"
                                      : isDone
                                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-300 text-white shadow-lg shadow-emerald-500/30 scale-105"
                                        : "bg-white border-slate-300 text-slate-400 group-hover:border-cyan-400 group-hover:text-cyan-600 shadow-sm"
                                      }`}>
                                      {isDone ? <Check size={24} strokeWidth={3} className="text-white" /> : isFocus ? <IconComponent size={22} strokeWidth={2.5} className="text-white" /> : <IconComponent size={20} strokeWidth={2} />}
                                    </div>
                                    {isFocus && (
                                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 shadow-sm">
                                        <Sparkles size={10} className="text-slate-950 fill-slate-950" />
                                      </span>
                                    )}
                                  </div>

                                  <div className="mt-3 text-center min-w-0 px-1">
                                    <p className={`text-xs font-black uppercase tracking-wider truncate ${isFocus ? "text-slate-900" : isDone ? "text-emerald-800" : "text-slate-600"}`}>
                                      {phase.label}
                                    </p>
                                    <div className="mt-1 flex justify-center">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${statusTagClass}`}>
                                        {isDone && <CheckCircle2 size={9} />}
                                        {statusText}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Interactive Phase Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-200/80">
                          {phaseList.map((phase) => {
                            const isDone = phase.isDone;
                            const isFocus = phase.id === focusPhase.id;
                            const IconComponent = phaseIconMap[phase.id] || FileText;

                            return (
                              <div
                                key={phase.id}
                                onClick={() => { if (phase.href) window.open(phase.href, "_blank"); }}
                                className={`group rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${isFocus
                                  ? "border-cyan-500/80 bg-gradient-to-b from-white via-cyan-50/30 to-white text-slate-900 shadow-md ring-2 ring-cyan-500/20"
                                  : isDone
                                    ? "border-emerald-200 bg-emerald-50/30 text-slate-900 shadow-xs"
                                    : "border-slate-200/80 bg-white text-slate-800 hover:border-cyan-300 shadow-xs"
                                  }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider ${isFocus ? "text-cyan-700" : isDone ? "text-emerald-600" : "text-slate-400"}`}>
                                    <IconComponent size={12} /> Phase {phase.phase}
                                  </span>
                                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${isDone ? "bg-emerald-600 text-white" : isFocus ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                                    {isDone ? "✓ Done" : isFocus ? "Focus" : "Pending"}
                                  </span>
                                </div>
                                <h4 className="text-sm font-black truncate">{phase.tool}</h4>
                                <div className="mt-2.5 flex items-center justify-between text-xs font-extrabold">
                                  <span className={isFocus ? "text-cyan-700" : isDone ? "text-emerald-600" : "text-slate-400"}>{phase.score}% Score</span>
                                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-cyan-700">Open <ExternalLink size={10} /></span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* AI Executive Summary Card */}
                  {aiDiag && (
                    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border border-cyan-500/30 rounded-2xl p-6 text-white shadow-md">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles size={18} className="text-cyan-400" />
                          <h3 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Executive Career Diagnosis</h3>
                        </div>
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
        const latestResumeName = getResumeName(latestAtsResume);
        const targetMatrix = latestResumeName
          ? (latestResumeName.length > 18 ? latestResumeName.substring(0, 18) + "..." : latestResumeName)
          : "No uploads";
        const deficitCount = missingKeywords.length;

        return {
          title: "ATS Checker Overview",
          subtitle: "Scan your resume against target job descriptions, track match scores, and fix missing skills.",
          stats: [
            {
              label: "Resumes Scanned",
              value: `${atsResumes.length}`,
              status: atsResumes.length > 0 ? "Uploaded & Analyzed" : "No resumes scanned yet",
              color: "text-blue-600",
              bg: "bg-blue-50",
              icon: <FileText size={16} />
            },
            {
              label: "Latest Match Score",
              value: latestAtsResume ? `${latestAtsResume.current_score}%` : "N/A",
              status: latestAtsResume ? `Target: ${targetMatrix}` : "Scan a resume to see score",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              icon: <Sparkles size={16} />
            },
            {
              label: "Skill Points Earned",
              value: `${atsPoints}`,
              status: "Earned from resume scans",
              color: "text-amber-600",
              bg: "bg-amber-50",
              icon: <Zap size={16} />
            },
            {
              label: "ATS Bill",
              value: `$${atsCost.toFixed(4)}`,
              status: "ATS Checker platform cost",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              icon: <CreditCard size={16} />
            }
          ],
          renderExtra: () => (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-0">
              <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs lg:col-span-2">
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
                            <td className="py-3 font-semibold text-slate-900 truncate max-w-[200px]">{getResumeName(res)}</td>
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
                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">ATS Scanner & Optimizer</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Compare your resume against target job descriptions to fix missing skills and boost interview callback rates.
                  </p>
                </div>
              </div>
            </div>
          )
        };

      case "Cover Letters":
        const savedLetters = dashboardData?.coverLetter?.savedLetters || [];
        const targetedCompaniesCount = (() => {
          const companies = new Set(savedLetters.map(l => l.companyName || l.company).filter(Boolean));
          return companies.size;
        })();
        const latestLetter = savedLetters[0];

        return {
          title: "Cover Letters Overview",
          subtitle: "Manage saved cover letters, targeted companies, and job application documents.",
          stats: [
            {
              label: "Saved Cover Letters",
              value: `${savedLetters.length}`,
              status: savedLetters.length > 0 ? "Saved application documents" : "No cover letters created",
              color: "text-blue-600",
              bg: "bg-blue-50",
              icon: <BookOpen size={16} />
            },
            {
              label: "Latest Cover Letter",
              value: latestLetter ? (latestLetter.companyName || latestLetter.company || "Direct Entry") : "None",
              status: latestLetter ? `Role: ${latestLetter.recipient?.targetRole || latestLetter.title || 'Target Role'}` : "Create your first letter",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              icon: <FileText size={16} />
            },
            {
              label: "Skill Points Earned",
              value: `${coverLetterPoints}`,
              status: "Earned from cover letters",
              color: "text-amber-600",
              bg: "bg-amber-50",
              icon: <Zap size={16} />
            },
            {
              label: "Cover Letter Bill",
              value: `$${coverLetterCost.toFixed(4)}`,
              status: "Cover Letter Builder cost",
              color: "text-purple-600",
              bg: "bg-purple-50",
              icon: <CreditCard size={16} />
            }
          ],
          renderExtra: () => (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedLetters.length === 0 ? (
                  <div className="col-span-full text-center py-8 bg-white border border-slate-200/60 rounded-xl text-slate-400 text-xs font-semibold">
                    No cover letters found. Go to the Cover Letter Builder subdomain to create custom letters.
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
                        <a href="https://coverletter.careersenseai.com/" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Open Workspace ↗</a>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
                      <span className="font-semibold">{item.progress} Completed</span>
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

      case "Skill Certification":
      case "Certificates":
        const certList = dashboardData?.certifi?.certificates || [];
        const certifiBill = dashboardData?.certifi?.usageSummary?.totalCostUsd ?? certifiCost;
        return {
          title: "Skill Certification Overview",
          subtitle: "View your earned certificates, verified skill badges, and active learning progress.",
          stats: [
            {
              label: "Certificates Earned",
              value: `${certList.length}`,
              status: certList.length > 0 ? "Verified & Issued" : "No certificates earned yet",
              color: "text-teal-600",
              bg: "bg-teal-50",
              icon: <Award size={16} />
            },
            {
              label: "Active Skill Paths",
              value: `${pathsCount}`,
              status: pathsCount > 0 ? "Enrolled skill tracks" : "No active paths",
              color: "text-blue-600",
              bg: "bg-blue-50",
              icon: <GraduationCap size={16} />
            },
            {
              label: "Skill Points Earned",
              value: `${certifiPoints}`,
              status: "Earned from assessments",
              color: "text-amber-600",
              bg: "bg-amber-50",
              icon: <Zap size={16} />
            },
            {
              label: "Certifi Bill",
              value: `$${(certifiBill || 0).toFixed(4)}`,
              status: "Certifi platform cost",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              icon: <CreditCard size={16} />
            }
          ],
          renderExtra: () => (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certList.length === 0 ? (
                  <div className="col-span-full text-center py-8 bg-white border border-slate-200/60 rounded-xl text-slate-400 text-xs font-semibold">
                    No certificates verified. Take assessment checks on Certifi to qualify.
                  </div>
                ) : (
                  certList.map((cert, i) => (
                    <div key={i} className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-xs flex items-center justify-between group hover:border-slate-300 transition-all">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0"><Award size={20} /></div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate tracking-tight">{cert.title}</h4>
                          <div className="text-[10px] font-medium text-slate-400 mt-0.5 truncate">ID: {cert.certificateId || cert.id}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className="text-[11px] font-bold text-slate-400">{new Date(cert.issuedAt || cert.date).toLocaleDateString()}</div>
                        <a href="https://certifi.careersenseai.com/my-certificates" target="_blank" rel="noreferrer" className="text-xs font-bold text-teal-600 hover:underline">View Certificate</a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        };

      case "Community": {
        // Calculate dynamic stats with fallback
        const startDate = new Date("2026-08-08T00:00:00Z");
        const now = new Date();
        const diffTime = Math.max(0, now.getTime() - startDate.getTime());
        const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const fullCycles = Math.floor(daysElapsed / 2);
        const remainder = daysElapsed % 2;
        const accumulatedIncrease = (fullCycles * 13) + (remainder === 1 ? 6 : 0);

        const realTotal = (communityStats?.atsReports || 0) + (communityStats?.coverLetters || 0) + (communityStats?.certificates || 0) + (communityStats?.gpsAssessments || 0);
        const totalCareerReports = communityStats?.totalCareerReports || (100 + accumulatedIncrease + realTotal);

        // 30-min varying online count (50 - 500)
        const timeSlot = Math.floor(now.getTime() / (30 * 60 * 1000));
        const seed = (timeSlot * 9301 + 49297) % 233280;
        const onlineUsers = communityStats?.onlineUsers || Math.floor(50 + (seed / 233280) * 450);

        // Exact summation distribution across 4 boxes
        const atsReports = communityStats?.atsReports || Math.round(totalCareerReports * 0.35);
        const coverLetters = communityStats?.coverLetters || Math.round(totalCareerReports * 0.25);
        const certificates = communityStats?.certificates || Math.round(totalCareerReports * 0.20);
        const gpsAssessments = communityStats?.gpsAssessments || (totalCareerReports - (atsReports + coverLetters + certificates));

        const atsOnline = communityStats?.atsOnline || Math.round(onlineUsers * 0.35);
        const coverLetterOnline = communityStats?.coverLetterOnline || Math.round(onlineUsers * 0.25);
        const certifiOnline = communityStats?.certifiOnline || Math.round(onlineUsers * 0.20);
        const gpsOnline = communityStats?.gpsOnline || (onlineUsers - (atsOnline + coverLetterOnline + certifiOnline));

        const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n || 0);

        const platformCards = [
          {
            id: "ats",
            label: "ATS Resume Scanner",
            icon: <FileSearch size={22} className="text-blue-500" />,
            bg: "bg-blue-50 border-blue-100",
            accent: "text-blue-600",
            stats: [
              { label: "Resumes Scanned", value: fmt(atsReports), icon: <FileText size={14} /> },
              { label: "Online Users", value: fmt(atsOnline), icon: <Users size={14} /> }
            ]
          },
          {
            id: "coverletter",
            label: "Cover Letter Builder",
            icon: <MessageSquareText size={22} className="text-violet-500" />,
            bg: "bg-violet-50 border-violet-100",
            accent: "text-violet-600",
            stats: [
              { label: "Letters Generated", value: fmt(coverLetters), icon: <FileText size={14} /> },
              { label: "Online Users", value: fmt(coverLetterOnline), icon: <Users size={14} /> }
            ]
          },
          {
            id: "certifi",
            label: "Certifi Platform",
            icon: <Award size={22} className="text-amber-500" />,
            bg: "bg-amber-50 border-amber-100",
            accent: "text-amber-600",
            stats: [
              { label: "Certificates Issued", value: fmt(certificates), icon: <Award size={14} /> },
              { label: "Online Users", value: fmt(certifiOnline), icon: <Users size={14} /> }
            ]
          },
          {
            id: "gps",
            label: "Career GPS",
            icon: <Compass size={22} className="text-cyan-500" />,
            bg: "bg-cyan-50 border-cyan-100",
            accent: "text-cyan-600",
            stats: [
              { label: "Assessments Taken", value: fmt(gpsAssessments), icon: <BookOpen size={14} /> },
              { label: "Online Users", value: fmt(gpsOnline), icon: <Users size={14} /> }
            ]
          }
        ];

        return {
          title: "Community Activity Hub",
          subtitle: "Real-time platform-wide stats across all CareerSense tools — every resume scanned, letter generated, and certificate earned.",
          stats: [
            { label: "Total Career Reports", value: fmt(totalCareerReports), status: "All Time Accumulated", color: "text-cyan-600", bg: "bg-cyan-50", icon: <TrendingUp size={16} /> },
            { label: "Online Users", value: fmt(onlineUsers), status: "Online Now", color: "text-violet-600", bg: "bg-violet-50", icon: <Users size={16} /> }
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
                        <h3 className="text-3xl font-extrabold mt-1">{fmt(totalCareerReports)} <span className="text-slate-400 text-lg font-semibold">total career reports</span></h3>
                        <p className="text-sm text-slate-400 mt-1">Generated by <span className="text-white font-bold">{fmt(onlineUsers)} online users</span> across all CareerSense tools.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {[
                          { label: "ATS Scans", value: fmt(atsReports), color: "bg-blue-500/20 text-blue-300" },
                          { label: "Cover Letters", value: fmt(coverLetters), color: "bg-violet-500/20 text-violet-300" },
                          { label: "Certificates", value: fmt(certificates), color: "bg-amber-500/20 text-amber-300" },
                          { label: "GPS Reports", value: fmt(gpsAssessments), color: "bg-cyan-500/20 text-cyan-300" }
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

      case "ID Card Studio":
        return {
          title: "Partner ID Card Studio",
          subtitle: "Generate and download your official CareerSense Partner ID from your master profile.",
          stats: [],
          renderExtra: () => <IdCardStudio profile={profileForm} user={user} />
        };

      case "Offer Letter Workspace":
        return {
          title: "Offer Letter Workspace",
          subtitle: "Review, personalize, download and share your CareerSense Offer letter.",
          stats: [],
          renderExtra: () => <OfferLetterStudio profile={profileForm} user={user} />
        };

      case "E-Learning":
        return {
          title: "CareerSense eLearning",
          subtitle: "Structured learning platforms and eBooks for continuous career development.",
          stats: [],
          renderExtra: () => <ELearningLibrary />
        };

      case "My Profile":
        const completeness = calculateProfileCompleteness();
        const pendingProfileItems = getProfileCompletionItems().filter((item) => !item.complete);
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

        const initialMaster = {
          fullName: dashboardData?.masterProfile?.fullName || user?.fullName || "",
          email: dashboardData?.masterProfile?.email || user?.primaryEmailAddress?.emailAddress || "",
          phone: dashboardData?.masterProfile?.phone || "",
          location: dashboardData?.masterProfile?.location || "",
          batch: dashboardData?.masterProfile?.batch || (user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : new Date().getFullYear().toString()),
          bio: dashboardData?.masterProfile?.bio || "",
          avatar: dashboardData?.masterProfile?.avatar || user?.imageUrl || "",
          showPhoto: dashboardData?.masterProfile?.showPhoto || false,
          bannerImage: dashboardData?.masterProfile?.bannerImage || "",
          currentJobTitle: dashboardData?.masterProfile?.currentJobTitle || "",
          currentCompany: dashboardData?.masterProfile?.currentCompany || "",
          targetJobTitle: dashboardData?.masterProfile?.targetJobTitle || "",
          profileStatus: dashboardData?.masterProfile?.profileStatus || "Open to Work",
          experienceYears: dashboardData?.masterProfile?.experienceYears || "0",
          experienceMonths: dashboardData?.masterProfile?.experienceMonths || "0",
          geographicalAlignment: dashboardData?.masterProfile?.geographicalAlignment || "",
          linkedinPortfolio: dashboardData?.masterProfile?.linkedinPortfolio || "",
          githubUrl: dashboardData?.masterProfile?.githubUrl || "",
          websiteUrl: dashboardData?.masterProfile?.websiteUrl || "",
          skills: dashboardData?.masterProfile?.skills || ["Project Management", "Data Analysis", "Strategic Planning"],
          education: dashboardData?.masterProfile?.education || [],
          certifications: dashboardData?.masterProfile?.certifications || [],
          awards: dashboardData?.masterProfile?.awards || []
        };

        const isDirty = (
          (profileForm.fullName || "") !== (initialMaster.fullName || "") ||
          (profileForm.email || "") !== (initialMaster.email || "") ||
          (profileForm.phone || "") !== (initialMaster.phone || "") ||
          (profileForm.location || "") !== (initialMaster.location || "") ||
          (profileForm.batch || "") !== (initialMaster.batch || "") ||
          (profileForm.bio || "") !== (initialMaster.bio || "") ||
          (profileForm.avatar || "") !== (initialMaster.avatar || "") ||
          (profileForm.showPhoto || false) !== (initialMaster.showPhoto || false) ||
          (profileForm.bannerImage || "") !== (initialMaster.bannerImage || "") ||
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
          JSON.stringify(profileForm.skills || []) !== JSON.stringify(initialMaster.skills || []) ||
          JSON.stringify(profileForm.education || []) !== JSON.stringify(initialMaster.education || []) ||
          JSON.stringify(profileForm.certifications || []) !== JSON.stringify(initialMaster.certifications || []) ||
          JSON.stringify(profileForm.awards || []) !== JSON.stringify(initialMaster.awards || [])
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

                    {/* View Public Profile Button */}
                    {(() => {
                      const hasSavedProfile = Boolean(dashboardData?.masterProfile && (dashboardData.masterProfile._id || dashboardData.masterProfile.createdAt));
                      const hasProfileDetails = Boolean(
                        (profileForm.location && profileForm.location.trim()) ||
                        (profileForm.phone && profileForm.phone.trim()) ||
                        (profileForm.bio && profileForm.bio.trim()) ||
                        (profileForm.currentJobTitle && profileForm.currentJobTitle.trim()) ||
                        (profileForm.currentCompany && profileForm.currentCompany.trim()) ||
                        (profileForm.geographicalAlignment && profileForm.geographicalAlignment.trim()) ||
                        (profileForm.linkedinPortfolio && profileForm.linkedinPortfolio.trim()) ||
                        (profileForm.githubUrl && profileForm.githubUrl.trim()) ||
                        (profileForm.websiteUrl && profileForm.websiteUrl.trim()) ||
                        (profileForm.education && profileForm.education.length > 0) ||
                        (profileForm.certifications && profileForm.certifications.length > 0) ||
                        (profileForm.awards && profileForm.awards.length > 0) ||
                        (initialMaster.location || initialMaster.phone || initialMaster.bio || initialMaster.currentJobTitle || initialMaster.currentCompany)
                      );
                      const isPublicProfileReady = hasSavedProfile && hasProfileDetails;

                      return isPublicProfileReady ? (
                        <a
                          href={`/u/${user?.id || 'candidate'}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4 text-slate-500" />
                          <span>View Public Profile</span>
                        </a>
                      ) : (
                        <div title="Add at least one field to view your public profile" className="inline-block">
                          <button
                            type="button"
                            disabled
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-bold text-slate-400 shadow-2xs opacity-60 cursor-not-allowed"
                          >
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                            <span>View Public Profile</span>
                          </button>
                        </div>
                      );
                    })()}

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

              {/* Profile Completion Alert Banner ("still to complete") */}
              <div
                className={`rounded-2xl border p-4 sm:p-5 ${pendingProfileItems.length > 0
                  ? "border-amber-200 bg-amber-50/70"
                  : "border-emerald-200 bg-emerald-50/70"
                  }`}
                aria-live="polite"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${pendingProfileItems.length > 0
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                      }`}>
                      {pendingProfileItems.length > 0 ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {pendingProfileItems.length > 0
                          ? `${pendingProfileItems.length} ${pendingProfileItems.length === 1 ? "item" : "items"} still to complete`
                          : "Your profile is fully complete"}
                      </h3>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                        {pendingProfileItems.length > 0
                          ? "Add the highlighted details below to improve your profile score."
                          : "All profile requirements are filled in. Keep them updated as your career grows."}
                      </p>
                    </div>
                  </div>

                  {pendingProfileItems.length > 0 && (
                    <div className="flex max-w-2xl flex-wrap gap-2 sm:justify-end">
                      {pendingProfileItems.map((item) => (
                        <span
                          key={item.label}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-xs font-bold text-amber-900 shadow-2xs"
                        >
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                          {item.label}
                          <span className="font-semibold text-amber-600">+{item.points}%</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

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

              {/* Education Timeline Section */}
              <TimelineSection
                title="Education"
                icon={GraduationCap}
                items={profileForm.education || []}
                onAdd={() => addTimelineItem('education')}
                onChange={(index, key, value) => updateTimelineItem('education', index, key, value)}
                onRemove={(index) => removeTimelineItem('education', index)}
                accent="blue"
              />

              {/* Certifications Timeline Section */}
              <TimelineSection
                title="Certifications"
                icon={Briefcase}
                items={profileForm.certifications || []}
                onAdd={() => addTimelineItem('certifications')}
                onChange={(index, key, value) => updateTimelineItem('certifications', index, key, value)}
                onRemove={(index) => removeTimelineItem('certifications', index)}
                accent="teal"
              />

              {/* Awards Timeline Section */}
              <TimelineSection
                title="Awards"
                icon={Award}
                items={profileForm.awards || []}
                onAdd={() => addTimelineItem('awards')}
                onChange={(index, key, value) => updateTimelineItem('awards', index, key, value)}
                onRemove={(index) => removeTimelineItem('awards', index)}
                accent="amber"
              />
            </form>
          )
        };

      case "Usage & Billing":
        const resumesCount = atsResumes.length;
        const letterCount = dashboardData?.coverLetter?.savedLetters?.length || 0;

        const tokenAllowanceMap = { free: "10,000 One-Time", student: "100,000 / Mo", intern: "500,000 / Mo", partner: "1,000,000 / Mo" };
        return {
          title: "Infrastructure Tokens & Billing Ledger",
          subtitle: "Verify computational quota allocations and clear transaction operational history.",
          stats: [
            { label: "AI Tokens Remaining", value: `${(userSub.tokensRemaining || 10000).toLocaleString()}`, status: "Reverse countdown balance", color: "text-amber-600", bg: "bg-amber-50", icon: <Zap size={16} fill="currentColor" /> },
            { label: "Active Operational Tier", value: `${userPlan.toUpperCase()} Plan`, status: "CareerSense subscription", color: "text-cyan-600", bg: "bg-cyan-50", icon: <CreditCard size={16} /> },
            { label: "Monthly Token Allowance", value: tokenAllowanceMap[userPlan] || "10,000", status: userPlan === "free" ? "One-Time Allocation" : "Monthly Auto-Renewal", color: "text-emerald-600", bg: "bg-emerald-50", icon: <ShieldCheck size={16} /> }
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
                        <span className="text-[10px] font-semibold text-slate-400">{site.subdomain}</span>
                      </div>
                      <div className="mt-4 text-sm font-semibold text-slate-500">
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
                {serverLedgerLoading ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
                    <p className="text-xs font-semibold text-slate-500">Loading subscription ledger logs...</p>
                  </div>
                ) : filteredLedger.length === 0 ? (
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
                                <td className="py-3 text-right font-bold text-slate-800">{log.points}</td>
                                <td className="py-3 text-right font-bold text-slate-800">${log.cost.toFixed(4)}</td>
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
  const profileCompleteness = calculateProfileCompleteness();

  const readinessScore = dashboardData?.assessment?.results?.overallScore;
  let partnerCompleted = 0;
  try {
    const partnerRecords = JSON.parse(localStorage.getItem("careersense-partner-assignments-v1")) || {};
    partnerCompleted = Object.values(partnerRecords).filter((entry) => entry?.status === "submitted").length;
  } catch (_) { }
  const certificateCount = dashboardData?.certifi?.certificates?.length || 0;

  const getSidebarBadge = (label) => ({
    "Career GPS": readinessScore != null ? `${readinessScore}%` : null,
    "E-Learning": pathsCount ? `${pathsCount} active` : null,
    "Partner Journey": `${partnerCompleted}/20`,
    "Community": communityStats?.unreadCount ? String(communityStats.unreadCount) : null,
    "Usage & Billing": totalPoints ? `${totalPoints.toLocaleString()} pts` : null,
  }[label]);

  const getToolBadge = (label) => ({
    "Resume Builder": atsResumes.length ? `${atsResumes.length} saved` : null,
    "ATS Checker": avgAts ? `${avgAts}%` : null,
    "Cover Letters": coverLetters.length ? `${coverLetters.length} made` : null,
    "Interview Practice": "Start",
    "Certificates": certificateCount ? `${certificateCount} earned` : null,
  }[label]);

  const nextAction = profileCompleteness < 100
    ? { label: "Complete your profile", detail: `${profileCompleteness}% complete`, tab: "My Profile" }
    : { label: `Complete Assignment ${Math.min(partnerCompleted + 1, 20)}`, detail: `${partnerCompleted}/20 finished`, tab: "Partner Journey" };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800">

      {/* --- SIDEBAR PANEL --- */}
      <aside
        className={`relative hidden shrink-0 select-none border-r border-slate-900 bg-[#0b132b] text-slate-300 ${isResizingSidebar ? "transition-none" : "transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
          } lg:flex lg:flex-col ${sidebarCollapsed ? "w-[88px] p-4" : "p-5"}`}
        style={{
          width: sidebarCollapsed ? "88px" : `${sidebarWidth}px`,
          height: '100vh'
        }}
      >
        {!sidebarCollapsed && (
          <div
            onMouseDown={startResizingSidebar}
            className={`absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-teal-500/30 transition-colors z-20 ${isResizingSidebar ? "bg-teal-400/50" : ""
              }`}
            title="Drag right edge to resize sidebar"
          />
        )}
        <div className="flex flex-col h-full min-w-0">
          <div className={`mb-6 flex items-center ${sidebarCollapsed ? "flex-col justify-center gap-3 px-0" : "justify-between gap-2 px-1"}`}>
            <Link to="/" className="flex min-w-0 items-center gap-3 py-2 shrink-0">
              <img src={CSLogo} alt="CareerSense logo" className="h-8 w-auto object-contain" />
              <div className={`leading-none transition-opacity ${sidebarCollapsed ? "hidden" : "block"}`}>
                <span className="text-[18px] font-black tracking-tight text-white">Career<span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">Sense</span></span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarCollapsed((value) => !value)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-teal-300"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-1 pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1c2541 transparent' }}>
            {filteredSidebarItems.map((item, itemIndex) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.label;
              const showSection = itemIndex === 0 || filteredSidebarItems[itemIndex - 1].section !== item.section;
              if (item.children) {
                const isFellowshipGroup = item.label === "Fellowship Program";
                const menuOpen = isFellowshipGroup ? fellowshipOpen : careerToolsOpen;
                const hasActiveChild = isFellowshipGroup
                  ? activeTab === "Fellowship Program"
                  : item.children.some((child) => child.label === activeTab);
                return (
                  <div key={item.label}>
                    {showSection && !sidebarCollapsed && <div className="mb-2 mt-5 px-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-600 first:mt-0">{item.section}</div>}
                    <button
                      type="button"
                      onClick={() => isFellowshipGroup ? setFellowshipOpen((open) => !open) : setCareerToolsOpen((open) => !open)}
                      aria-expanded={menuOpen}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200 active:scale-[0.98] sm:text-[13.5px] ${sidebarCollapsed ? "justify-center" : ""} ${hasActiveChild
                        ? "bg-[#1c2541] text-teal-400 border border-slate-700/50"
                        : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                        }`}
                    >
                      <Icon size={18} className={hasActiveChild ? "text-teal-400" : `${item.tone} opacity-75 group-hover:opacity-100`} />
                      {!sidebarCollapsed && <><span className="flex-1">{item.label}</span><ChevronDown size={15} className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} /></>}
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-200 ${menuOpen && !sidebarCollapsed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="ml-5 mt-1 space-y-1 border-l border-slate-700/70 pl-3">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            const childSelected = child.programId
                              ? activeTab === "Fellowship Program" && fellowshipFromUrl === child.programId
                              : activeTab === child.label;
                            return (
                              <button key={child.label} onClick={() => child.programId ? handleFellowshipChange(child.programId) : handleTabChange(child.label)} className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12.5px] font-medium transition ${childSelected ? "bg-teal-500/10 text-teal-300" : "text-slate-500 hover:bg-slate-800/40 hover:text-slate-200"}`}>
                                <ChildIcon size={15} />
                                <span className="flex-1">{child.shortLabel}</span>{!child.programId && getToolBadge(child.label) && <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold text-slate-400">{getToolBadge(child.label)}</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (<React.Fragment key={item.label}>
                {showSection && !sidebarCollapsed && <div className="mb-2 mt-5 px-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-600 first:mt-0">{item.section}</div>}
                <button
                  onClick={() => handleTabChange(item.label)}
                  title={sidebarCollapsed ? `${item.label}${getSidebarBadge(item.label) ? ` · ${getSidebarBadge(item.label)}` : ""}` : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200 active:scale-[0.98] sm:text-[13.5px] ${sidebarCollapsed ? "justify-center" : ""} ${isSelected
                    ? "bg-[#1c2541] text-teal-400 border border-slate-700/50 shadow-[0_8px_24px_rgba(20,184,166,0.08)]"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                    }`}
                >
                  {isSelected && <span className="absolute -left-px h-5 w-0.5 rounded-full bg-teal-400 motion-safe:animate-pulse" />}
                  <Icon size={18} className={`transition-transform duration-200 group-hover:scale-110 ${isSelected ? "text-teal-400" : `${item.tone} opacity-75 group-hover:opacity-100`}`} />
                  {!sidebarCollapsed && <span className="flex-1">{item.label}</span>}
                  {!sidebarCollapsed && getSidebarBadge(item.label) && <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-black text-slate-400">{getSidebarBadge(item.label)}</span>}
                  {item.label === "My Profile" && (
                    <span
                      className={`${sidebarCollapsed ? "absolute -right-1 -top-1 h-5 w-5" : "h-9 w-9"} flex shrink-0 items-center justify-center rounded-full`}
                      style={{ background: `conic-gradient(#2dd4bf ${profileCompleteness * 3.6}deg, #334155 0)` }}
                      title={`${profileCompleteness}% profile complete`}
                      aria-label={`${profileCompleteness}% profile complete`}
                    >
                      <span className={`${sidebarCollapsed ? "h-4 w-4 text-[5px]" : "h-7 w-7 text-[8px]"} flex items-center justify-center rounded-full bg-[#0b132b] font-black text-white`}>{profileCompleteness}%</span>
                    </span>
                  )}
                </button>
              </React.Fragment>);
            })}
          </nav>

          <div className="mt-4 shrink-0">
            {!sidebarCollapsed && <button onClick={() => handleTabChange(nextAction.tab)} className="group mb-3 w-full rounded-xl border border-teal-500/15 bg-teal-500/[0.06] p-3 text-left transition hover:border-teal-400/30 hover:bg-teal-500/10 active:scale-[0.98]">
              <div className="flex items-center justify-between"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-teal-400">Your next move</span><Target size={13} className="text-teal-400 transition-transform group-hover:translate-x-0.5" /></div>
              <div className="mt-1.5 truncate text-xs font-bold text-white">{nextAction.label}</div><div className="mt-1 text-[10px] font-medium text-slate-500">{nextAction.detail}</div>
            </button>}

            <div className={`relative flex items-center justify-between border-t border-slate-800/80 pt-4 ${sidebarCollapsed ? "px-1" : "px-2"}`}>
              <div className="flex items-center gap-2.5 min-w-0">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} className="h-8 w-8 rounded-full object-cover shrink-0" alt={username} />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {userInitials}
                  </div>
                )}
                {!sidebarCollapsed && <div className="leading-tight min-w-0"><div className="text-xs font-bold text-white truncate">{username}</div><div className="text-[10px] text-[#0EA8B9] font-bold uppercase truncate">{userPlan} Plan · {(userSub.tokensRemaining || 10000).toLocaleString()} tokens</div></div>}
              </div>
              {!sidebarCollapsed && <button onClick={() => setAccountMenuOpen((open) => !open)} className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white" aria-expanded={accountMenuOpen}><ChevronDown size={15} className={`transition-transform ${accountMenuOpen ? "rotate-180" : ""}`} /></button>}
              {accountMenuOpen && !sidebarCollapsed && <div className="absolute bottom-12 left-0 right-0 rounded-xl border border-slate-700 bg-[#111c36] p-2 shadow-2xl"><button onClick={() => handleTabChange("My Profile")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"><UserRound size={14} /> Manage profile</button><button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/10"><LogOut size={14} /> Sign out</button></div>}
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
                {filteredSidebarItems.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.label;
                  const showSection = itemIndex === 0 || filteredSidebarItems[itemIndex - 1].section !== item.section;
                  if (item.children) {
                    const isFellowshipGroup = item.label === "Fellowship Program";
                    const menuOpen = isFellowshipGroup ? fellowshipOpen : careerToolsOpen;
                    const hasActiveChild = isFellowshipGroup
                      ? activeTab === "Fellowship Program"
                      : item.children.some((child) => child.label === activeTab);
                    return (
                      <div key={item.label}>
                        {showSection && <div className="mb-2 mt-5 px-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-600 first:mt-0">{item.section}</div>}
                        <button type="button" onClick={() => isFellowshipGroup ? setFellowshipOpen((open) => !open) : setCareerToolsOpen((open) => !open)} aria-expanded={menuOpen} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13.5px] font-medium transition-all ${hasActiveChild ? "bg-[#1c2541] text-teal-400 border border-slate-700/50" : "text-slate-400 hover:bg-slate-800/40 hover:text-white"}`}>
                          <Icon size={18} className={hasActiveChild ? "text-teal-400" : "text-slate-400 group-hover:text-slate-200"} />
                          <span className="flex-1">{item.label}</span>
                          <ChevronDown size={15} className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-200 ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden">
                            <div className="ml-5 mt-1 space-y-1 border-l border-slate-700/70 pl-3">
                              {item.children.map((child) => {
                                const ChildIcon = child.icon;
                                const childSelected = child.programId
                                  ? activeTab === "Fellowship Program" && fellowshipFromUrl === child.programId
                                  : activeTab === child.label;
                                return <button key={child.label} onClick={() => { child.programId ? handleFellowshipChange(child.programId) : handleTabChange(child.label); setSidebarOpen(false); }} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[12.5px] font-medium transition ${childSelected ? "bg-teal-500/10 text-teal-300" : "text-slate-500 hover:bg-slate-800/40 hover:text-slate-200"}`}><ChildIcon size={15} /><span className="flex-1">{child.shortLabel}</span>{!child.programId && getToolBadge(child.label) && <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold text-slate-400">{getToolBadge(child.label)}</span>}</button>;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (<React.Fragment key={item.label}>
                    {showSection && <div className="mb-2 mt-5 px-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-600 first:mt-0">{item.section}</div>}
                    <button
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
                      <span className="flex-1">{item.label}</span>
                      {getSidebarBadge(item.label) && <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-black text-slate-400">{getSidebarBadge(item.label)}</span>}
                      {item.label === "My Profile" && (
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `conic-gradient(#2dd4bf ${profileCompleteness * 3.6}deg, #334155 0)` }}
                          title={`${profileCompleteness}% profile complete`}
                          aria-label={`${profileCompleteness}% profile complete`}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b132b] text-[8px] font-black text-white">{profileCompleteness}%</span>
                        </span>
                      )}
                    </button>
                  </React.Fragment>);
                })}
              </nav>
              <button onClick={() => { handleTabChange(nextAction.tab); setSidebarOpen(false); }} className="mt-5 w-full rounded-xl border border-teal-500/15 bg-teal-500/[0.06] p-3 text-left"><div className="flex items-center justify-between"><span className="text-[9px] font-black uppercase tracking-[0.16em] text-teal-400">Your next move</span><Target size={13} className="text-teal-400" /></div><div className="mt-1.5 text-xs font-bold text-white">{nextAction.label}</div><div className="mt-1 text-[10px] text-slate-500">{nextAction.detail}</div></button>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-slate-800 px-2 pt-4">{user?.imageUrl ? <img src={user.imageUrl} alt={username} className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-xs font-black text-white">{userInitials}</div>}<div className="min-w-0 flex-1"><div className="truncate text-xs font-bold text-white">{username}</div><div className="truncate text-[10px] text-[#0EA8B9] font-bold uppercase">{userPlan} Plan · {(userSub.tokensRemaining || 10000).toLocaleString()} tokens</div></div><LogOut size={15} className="text-slate-500" /></div>
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
            {activeTab !== "Partner Journey" && activeTab !== "Skill Passport" && activeTab !== "Fellowship Program" && <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{detailedData.title}</h1>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{detailedData.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border border-slate-200/60 rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                  <div className="h-7 w-7 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center"><Zap size={14} fill="currentColor" /></div>
                  <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">AI Tokens Remaining</div><div className="text-sm font-black text-slate-800 mt-1">{(userSub.tokensRemaining || 10000).toLocaleString()}</div></div>
                </div>
                <Link to="/pricing" className="bg-white border border-slate-200/60 hover:border-[#0EA8B9] rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xs transition">
                  <div className="h-7 w-7 rounded-md bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-xs uppercase">{(userPlan || "f")[0]}</div>
                  <div className="leading-none"><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Tier</div><div className="text-sm font-black text-[#0EA8B9] mt-1 uppercase">{userPlan}</div></div>
                </Link>
              </div>
            </div>}

            {/* System Active Callout Welcome Card & Metric Cards Grid (Hidden on My Profile tab) */}
            {activeTab !== "My Profile" && activeTab !== "Partner Journey" && activeTab !== "Skill Passport" && activeTab !== "Fellowship Program" && (
              <>
                <div className="bg-white border border-slate-200/60 rounded-xl p-5 mb-6 shadow-xs relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> System Active
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {currentTime.toLocaleTimeString()}</span>
                    </div>

                    {activeTab === "Career GPS" && (() => {
                      const completeness = calculateProfileCompleteness();
                      return (
                        <div className="flex items-center gap-2.5 shrink-0">
                          <Link
                            to="/career-gps"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
                          >
                            <Sparkles size={13} /> Open Interactive Map ↗
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleTabChange("My Profile")}
                            className="group relative flex items-center gap-3 rounded-xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 via-cyan-50/90 to-blue-50/90 px-3.5 py-1.5 shadow-2xs transition-all hover:scale-[1.02] hover:border-teal-300 hover:shadow-md active:scale-95 cursor-pointer shrink-0"
                          >
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500"></span>
                            </span>

                            <div className="flex items-center gap-2.5">
                              <div className="flex flex-col text-left">
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                                  <span>Profile Completeness</span>
                                  <span className="font-extrabold text-teal-600">{completeness}%</span>
                                </div>
                                <p className="text-[10px] font-semibold text-slate-500 group-hover:text-teal-700 transition-colors">
                                  {completeness < 100 ? "Please complete your profile →" : "Profile Complete ✓"}
                                </p>
                              </div>

                              <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200/80 p-0.5 shrink-0">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
                                  style={{ width: `${completeness}%` }}
                                />
                              </div>
                            </div>
                          </button>
                        </div>
                      );
                    })()}
                    {(activeTab === "Skill Certification" || activeTab === "Certificates") && (
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a href="https://certifi.careersenseai.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <Sparkles size={13} /> Get Certified Now
                        </a>
                        <a href="https://certifi.careersenseai.com/dashboard" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0b132b] hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <ExternalLink size={13} /> Detailed Dashboard ↗
                        </a>
                      </div>
                    )}
                    {activeTab === "ATS Checker" && (
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a href="https://ats.careersenseai.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <Sparkles size={13} /> Check ATS
                        </a>
                        <a href="https://ats.careersenseai.com/dashboard" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0b132b] hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <ExternalLink size={13} /> Detailed Dashboard ↗
                        </a>
                      </div>
                    )}
                    {activeTab === "Cover Letters" && (
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a href="https://coverletter.careersenseai.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <Sparkles size={13} /> Build Letter
                        </a>
                        <a href="https://coverletter.careersenseai.com/dashboard" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0b132b] hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95">
                          <ExternalLink size={13} /> Detailed Dashboard ↗
                        </a>
                      </div>
                    )}
                  </div>

                  {activeTab === "Dashboard" && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Welcome back, {user?.firstName || username}</h2>
                        <p className="text-slate-400 text-sm mt-1.5 max-w-[65ch] leading-relaxed">
                          Track your certification progress, analyze assessment performance, and monitor active learning paths across your organization's workspace.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- METRIC CARDS GRID --- */}
                {detailedData.stats.length > 0 && (
                  <div className={`grid gap-4 sm:grid-cols-2 ${detailedData.stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} mb-6`}>
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
              const d = new Date(); d.setUTCHours(0, 0, 0, 0); d.setUTCDate(d.getUTCDate() + 28); return d;
            })(),
            "Interview Practice": (() => {
              const d = new Date(); d.setUTCHours(0, 0, 0, 0); d.setUTCDate(d.getUTCDate() + 28); return d;
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
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center relative z-50 mx-4" style={{ boxShadow: "0 32px 64px rgba(15,23,42,0.18)" }}>
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
                  Estimated launch: <span className="text-slate-600 font-bold">{launchDate.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
                </p>
              </div>
            </div>
          );
        })()}

      </section>
    </main>
  );
}

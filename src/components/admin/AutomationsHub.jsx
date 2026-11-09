import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Clock,
  Zap,
  Play,
  Pause,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  Send,
  Trash2,
  Edit2,
  Eye,
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  Mail,
  Search,
  ExternalLink,
  Sparkles,
  Check,
  X,
  FileText,
  FileSpreadsheet,
  AlertTriangle,
  History,
  Upload,
  UserCheck,
  CheckSquare,
  Square
} from "lucide-react";

const AUDIENCE_OPTIONS = [
  { value: "all", label: "All Active Signups", desc: "Every registered user in CRM" },
  { value: "free_tier", label: "Free Tier Only", desc: "Users without active subscription" },
  { value: "paid_users", label: "Paid Subscribed Users", desc: "Users with active subscription" }
];

export default function AutomationsHub({ adminEmail, candidates = [] }) {
  // Main tabs: "onboarding" | "calendar" | "logs"
  const [activeTab, setActiveTab] = useState("onboarding");

  // Data states
  const [rules, setRules] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRules: 0,
    activeRules: 0,
    onboardingRules: 0,
    scheduledRules: 0,
    totalSent: 0,
    totalFailed: 0,
    totalLogs: 0
  });
  const [logs, setLogs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter states
  const [logSearch, setLogSearch] = useState("");
  const [logStatusFilter, setLogStatusFilter] = useState("all");

  // Modal states
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Form State for Create / Edit
  const [formType, setFormType] = useState("onboarding"); // "onboarding" | "calendar_schedule"
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formEnabled, setFormEnabled] = useState(false);

  // Form State - Onboarding
  const [onboardingTemplateId, setOnboardingTemplateId] = useState("");
  const [onboardingDelayHours, setOnboardingDelayHours] = useState(0);
  const [onboardingTargetAudience, setOnboardingTargetAudience] = useState("all");
  const [onboardingCtaText, setOnboardingCtaText] = useState("");
  const [onboardingCtaUrl, setOnboardingCtaUrl] = useState("");
  const [followUpSteps, setFollowUpSteps] = useState([]); // Up to 5 optional follow-up steps

  // Form State - Calendar Scheduler (Weekly 7 days / Monthly 30 days)
  const [scheduleScope, setScheduleScope] = useState("weekly"); // "weekly" | "monthly"
  const [startDateStr, setStartDateStr] = useState(new Date().toISOString().split("T")[0]);
  const [calendarDaysConfig, setCalendarDaysConfig] = useState([]);
  const [activePlannerDayIdx, setActivePlannerDayIdx] = useState(0);
  const [candidateSearchTerm, setCandidateSearchTerm] = useState("");
  const [candidateAudienceFilter, setCandidateAudienceFilter] = useState("all");

  const apiBase = useMemo(() => {
    return (
      import.meta.env.VITE_API_URL ||
      import.meta.env.VITE_BACKEND_URL ||
      import.meta.env.VITE_API_BASE_URL ||
      "http://localhost:4000"
    );
  }, []);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch automations & templates
  const fetchData = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);

      try {
        const res = await fetch(`${apiBase}/careersense/admin/automations`, {
          headers: { "x-admin-email": adminEmail }
        });
        const data = await res.json();
        if (data.success) {
          setRules(data.rules || []);
          if (data.metrics) setMetrics(data.metrics);
          if (data.recentLogs) setLogs(data.recentLogs);
        }

        const tplRes = await fetch(`${apiBase}/careersense/admin/marketing/templates`, {
          headers: { "x-admin-email": adminEmail }
        });
        const tplData = await tplRes.json();
        if (tplData.success && tplData.templates) {
          setTemplates(tplData.templates);
        }
      } catch (err) {
        showToast("Failed to load automations data.", "error");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [apiBase, adminEmail]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Generate initial calendar days based on scope and start date
  const generateDaysConfig = useCallback((scope, startDateVal, existingDays = []) => {
    const totalDays = scope === "monthly" ? 30 : 7;
    const start = new Date(startDateVal || new Date());
    const generated = [];
    const isEditing = Array.isArray(existingDays) && existingDays.length > 0;

    for (let i = 1; i <= totalDays; i++) {
      const curDate = new Date(start);
      curDate.setDate(start.getDate() + (i - 1));

      const existing = existingDays.find((d) => d.dayNumber === i);
      if (existing) {
        generated.push({
          dayNumber: i,
          included: existing.included !== undefined ? Boolean(existing.included) : true,
          dayLabel: existing.dayLabel || `Day ${i} (${curDate.toLocaleDateString("en-US", { weekday: "short" })})`,
          scheduledDate: curDate.toISOString(),
          sendTime: existing.sendTime || "10:00",
          templateId: existing.templateId || "",
          templateName: existing.templateName || "",
          subjectOverride: existing.subjectOverride || "",
          headlineOverride: existing.headlineOverride || "",
          ctaTextOverride: existing.ctaTextOverride || "",
          ctaUrlOverride: existing.ctaUrlOverride || "",
          recipientSource: existing.recipientSource || "platform",
          targetAudience: existing.targetAudience || "all",
          selectedEmails: Array.isArray(existing.selectedEmails) ? existing.selectedEmails : [],
          selectedRecipients: Array.isArray(existing.selectedRecipients) ? existing.selectedRecipients : [],
          manualText: existing.manualText || (existing.recipientSource === "manual" && Array.isArray(existing.selectedEmails) ? existing.selectedEmails.join(", ") : ""),
          csvFileName: existing.csvFileName || "",
          executed: Boolean(existing.executed),
          sentCount: existing.sentCount || 0,
          failedCount: existing.failedCount || 0
        });
      } else {
        generated.push({
          dayNumber: i,
          included: isEditing ? false : (i === 1), // If editing, unincluded days are false; if new schedule, default Day 1 to true
          dayLabel: `Day ${i} (${curDate.toLocaleDateString("en-US", { weekday: "short" })})`,
          scheduledDate: curDate.toISOString(),
          sendTime: "10:00",
          templateId: "",
          templateName: "",
          subjectOverride: "",
          headlineOverride: "",
          ctaTextOverride: "",
          ctaUrlOverride: "",
          recipientSource: "platform", // "platform" | "csv" | "manual"
          targetAudience: "all",
          selectedEmails: [],
          selectedRecipients: [],
          manualText: "",
          csvFileName: "",
          executed: false,
          sentCount: 0,
          failedCount: 0
        });
      }
    }
    return generated;
  }, []);

  // Open Create / Edit Modal
  const openCreateModal = (ruleToEdit = null) => {
    if (ruleToEdit) {
      setEditingRule(ruleToEdit);
      setFormType(ruleToEdit.type || "onboarding");
      setFormName(ruleToEdit.name || "");
      setFormDescription(ruleToEdit.description || "");
      setFormEnabled(ruleToEdit.enabled ?? false);

      if (ruleToEdit.type === "onboarding") {
        setOnboardingTemplateId(ruleToEdit.onboardingTemplateId || ruleToEdit.steps?.[0]?.templateId || "");
        setOnboardingDelayHours(ruleToEdit.onboardingDelayHours ?? (ruleToEdit.steps?.[0]?.delayHours || 0));
        setOnboardingTargetAudience(ruleToEdit.onboardingTargetAudience || ruleToEdit.targetAudience || "all");
        setOnboardingCtaText(ruleToEdit.onboardingCtaText || ruleToEdit.steps?.[0]?.ctaTextOverride || "");
        setOnboardingCtaUrl(ruleToEdit.onboardingCtaUrl || ruleToEdit.steps?.[0]?.ctaUrlOverride || "");
        setFollowUpSteps(Array.isArray(ruleToEdit.steps) ? ruleToEdit.steps : []);
      } else {
        const scope = ruleToEdit.scheduleScope || "weekly";
        setScheduleScope(scope);
        const sDate = ruleToEdit.startDate ? new Date(ruleToEdit.startDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
        setStartDateStr(sDate);
        setCalendarDaysConfig(generateDaysConfig(scope, sDate, ruleToEdit.scheduleDays || []));
        setActivePlannerDayIdx(0);
      }
    } else {
      setEditingRule(null);
      setFormType(activeTab === "calendar" ? "calendar_schedule" : "onboarding");
      setFormName("");
      setFormDescription("");
      setFormEnabled(false);

      // Reset Onboarding defaults (1 single clean email)
      setOnboardingTemplateId(templates[0]?.id || "");
      setOnboardingDelayHours(0);
      setOnboardingTargetAudience("all");
      setOnboardingCtaText("");
      setOnboardingCtaUrl("");
      setFollowUpSteps([]);

      // Reset Calendar defaults
      const initialDays = generateDaysConfig("weekly", new Date().toISOString().split("T")[0]);
      setScheduleScope("weekly");
      setStartDateStr(new Date().toISOString().split("T")[0]);
      setCalendarDaysConfig(initialDays);
      setActivePlannerDayIdx(0);
    }
    setIsCreateModalOpen(true);
  };

  // Toggle active/pause
  const handleToggleRule = async (rule) => {
    const newStatus = !rule.enabled;
    setActionLoading(rule._id);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/automations/${rule._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({ enabled: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Automation "${rule.name}" is now ${newStatus ? "ACTIVE" : "PAUSED"}.`);
        fetchData(true);
      } else {
        showToast(data.message || "Failed to update status", "error");
      }
    } catch {
      showToast("Error updating automation status.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Rule (Manual Deletion)
  const handleDeleteRule = async (rule) => {
    if (!window.confirm(`Are you sure you want to delete "${rule.name}"?`)) return;
    setActionLoading(rule._id);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/automations/${rule._id}`, {
        method: "DELETE",
        headers: { "x-admin-email": adminEmail }
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Automation "${rule.name}" deleted.`);
        fetchData(true);
      } else {
        showToast(data.message || "Failed to delete", "error");
      }
    } catch {
      showToast("Error deleting automation.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Trigger Rule Immediately
  const handleTriggerRule = async (rule, dayNumber = null) => {
    setActionLoading(`trigger-${rule._id}`);
    try {
      const res = await fetch(`${apiBase}/careersense/admin/automations/${rule._id}/trigger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify({ dayNumber })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Execution finished successfully!");
        fetchData(true);
      } else {
        showToast(data.message || "Trigger failed", "error");
      }
    } catch {
      showToast("Error running automation.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Save Automation (POST or PUT)
  const handleSaveAutomation = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast("Please provide an automation name.", "error");
      return;
    }

    let payload = {
      name: formName.trim(),
      description: formDescription.trim(),
      type: formType,
      enabled: formEnabled
    };

    if (formType === "onboarding") {
      if (!onboardingTemplateId) {
        showToast("Please choose an email template for new onboarding.", "error");
        return;
      }
      const matchedTpl = templates.find((t) => t.id === onboardingTemplateId || t._id === onboardingTemplateId);
      payload = {
        ...payload,
        onboardingTemplateId,
        onboardingTemplateName: matchedTpl?.name || onboardingTemplateId,
        onboardingDelayHours: Number(onboardingDelayHours || 0),
        onboardingTargetAudience,
        onboardingCtaText,
        onboardingCtaUrl,
        steps: followUpSteps
      };
    } else {
      // Calendar Scheduler
      const includedDays = calendarDaysConfig.filter((d) => d.included);
      if (includedDays.length === 0) {
        showToast("Please include at least one day in the schedule plan.", "error");
        return;
      }

      for (const d of includedDays) {
        if (!d.templateId) {
          showToast(`Please choose an email template for Day ${d.dayNumber}.`, "error");
          return;
        }
      }

      const totalDays = scheduleScope === "monthly" ? 30 : 7;
      const start = new Date(startDateStr);
      const end = new Date(start);
      end.setDate(start.getDate() + totalDays);

      payload = {
        ...payload,
        scheduleScope,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        scheduleDays: includedDays.map((d) => {
          const matchedTpl = templates.find((t) => t.id === d.templateId || t._id === d.templateId);
          return {
            dayNumber: d.dayNumber,
            included: true,
            dayLabel: d.dayLabel || `Day ${d.dayNumber}`,
            scheduledDate: d.scheduledDate,
            sendTime: d.sendTime || "10:00",
            templateId: d.templateId,
            templateName: matchedTpl?.name || d.templateId,
            subjectOverride: d.subjectOverride || "",
            recipientSource: d.recipientSource || "platform",
            targetAudience: d.targetAudience || "all",
            selectedEmails: d.selectedEmails || [],
            selectedRecipients: d.selectedRecipients || [],
            manualText: d.manualText || "",
            csvFileName: d.csvFileName || ""
          };
        })
      };
    }

    setActionLoading("saving");
    try {
      const url = editingRule
        ? `${apiBase}/careersense/admin/automations/${editingRule._id}`
        : `${apiBase}/careersense/admin/automations`;
      const method = editingRule ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingRule ? "Automation updated successfully." : "Automation created successfully!");
        setIsCreateModalOpen(false);
        fetchData(true);
      } else {
        showToast(data.message || "Failed to save", "error");
      }
    } catch {
      showToast("Error saving automation.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Preview a template
  const handlePreview = (templateId) => {
    const tpl = templates.find((t) => t.id === templateId || t._id === templateId);
    if (tpl) {
      setPreviewTemplate(tpl);
    } else {
      showToast("Template not found in repository.", "error");
    }
  };

  // Helper to format date
  const formatIST = (isoString) => {
    if (!isoString) return "Never";
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    } catch {
      return isoString;
    }
  };

  // Filtered candidate search for recipient toggle selection
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const isPaid = Boolean(c.isPaidUser || c.subscription?.isPaid);
      if (candidateAudienceFilter === "paid_users" && !isPaid) return false;
      if (candidateAudienceFilter === "free_tier" && isPaid) return false;
      if (candidateSearchTerm.trim()) {
        const term = candidateSearchTerm.toLowerCase().trim();
        const emailMatch = (c.email || "").toLowerCase().includes(term);
        const nameMatch = (c.fullName || "").toLowerCase().includes(term);
        return emailMatch || nameMatch;
      }
      return true;
    });
  }, [candidates, candidateAudienceFilter, candidateSearchTerm]);

  // Handle CSV file upload for a specific planner day
  const handleCsvUploadForDay = (dayIdx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== "string") return;

        const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length === 0) {
          showToast("Uploaded CSV is empty.", "error");
          return;
        }

        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
        const unique = new Map();

        lines.forEach((line) => {
          const match = line.match(emailRegex);
          if (match) {
            const email = match[1].toLowerCase().trim();
            if (!unique.has(email)) {
              // Extract candidate name from CSV columns if available
              const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
              let name = "";
              const emailColIdx = parts.findIndex((p) => p.toLowerCase().includes(email));
              if (emailColIdx > 0) {
                for (let c = 0; c < emailColIdx; c++) {
                  if (parts[c] && !/^\d+$/.test(parts[c]) && parts[c].length > 1) {
                    name = parts[c];
                    break;
                  }
                }
              }
              unique.set(email, { email, name: name || "there" });
            }
          }
        });

        const parsedRecipients = Array.from(unique.values());
        const parsedEmails = parsedRecipients.map((r) => r.email);

        if (parsedEmails.length === 0) {
          showToast("No valid email addresses found in CSV.", "error");
          return;
        }

        setCalendarDaysConfig((prev) => {
          const clone = [...prev];
          clone[dayIdx].selectedEmails = parsedEmails;
          clone[dayIdx].selectedRecipients = parsedRecipients;
          clone[dayIdx].csvFileName = file.name;
          return clone;
        });
        showToast(`Loaded ${parsedEmails.length} valid recipient${parsedEmails.length === 1 ? "" : "s"} from ${file.name}.`);
      } catch (err) {
        showToast("Failed to parse CSV: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  };

  // Handle manual paste parse
  const handleManualPasteForDay = (dayIdx, textVal) => {
    const rawTokens = textVal.split(/[\n,;]+/);
    const unique = new Map();
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;

    rawTokens.forEach((token) => {
      const match = token.match(emailRegex);
      if (match) {
        const email = match[1].toLowerCase().trim();
        if (!unique.has(email)) {
          unique.set(email, { email, name: "there" });
        }
      }
    });

    const parsedRecipients = Array.from(unique.values());
    const parsedEmails = parsedRecipients.map((r) => r.email);

    setCalendarDaysConfig((prev) => {
      const clone = [...prev];
      clone[dayIdx].manualText = textVal;
      clone[dayIdx].selectedEmails = parsedEmails;
      clone[dayIdx].selectedRecipients = parsedRecipients;
      return clone;
    });
  };

  // Filtered lists
  const onboardingRules = rules.filter((r) => r.type === "onboarding");
  const calendarRules = rules.filter((r) => r.type === "calendar_schedule" || r.type === "recurring_schedule");

  const filteredLogs = logs.filter((log) => {
    if (logStatusFilter !== "all" && log.status !== logStatusFilter) return false;
    if (logSearch.trim()) {
      const term = logSearch.toLowerCase().trim();
      const matchEmail = (log.recipientEmail || "").toLowerCase().includes(term);
      const matchName = (log.recipientName || "").toLowerCase().includes(term);
      const matchAuto = (log.automationName || "").toLowerCase().includes(term);
      const matchSub = (log.subject || "").toLowerCase().includes(term);
      return matchEmail || matchName || matchAuto || matchSub;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all transform animate-in slide-in-from-bottom-2 ${
            toastMessage.type === "error"
              ? "bg-rose-600 text-white"
              : "bg-[#0b132b] text-teal-400 border border-teal-500/30"
          }`}
        >
          {toastMessage.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* TOP HEADER & CONTROLS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Clock size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    Automations & Scheduler Hub
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Cron Active (3m Loop)
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  New signup onboarding & Day 1 to 7 / Day 1 to 30 calendar scheduling with custom recipients per day.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => openCreateModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              <span>New Automation</span>
            </button>
          </div>
        </div>

        {/* TOP KPI STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={13} className="text-indigo-500" />
              Active Automations
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {metrics?.activeRules ?? 0}{" "}
              <span className="text-xs font-semibold text-slate-400">/ {metrics?.totalRules ?? 0} Total</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {metrics?.onboardingRules ?? 0} Onboarding • {metrics?.scheduledRules ?? 0} Calendar
            </div>
          </div>

          {/* EXACT TOTAL EMAILS SENT BOX (ACCURATELY TRACKED FROM LOGS) */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-600" />
              Total Emails Sent
            </div>
            <div className="text-2xl font-black text-emerald-900 mt-1">
              {(metrics?.totalSent ?? 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              Accurately tracked by scheduler logs
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users size={13} className="text-blue-500" />
              Candidate Reach
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {candidates?.length ?? 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Available in CRM database
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={13} className={metrics?.totalFailed > 0 ? "text-rose-500" : "text-slate-400"} />
              Failed Deliveries
            </div>
            <div className={`text-2xl font-black mt-1 ${metrics?.totalFailed > 0 ? "text-rose-600" : "text-slate-800"}`}>
              {metrics?.totalFailed ?? 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {metrics?.totalFailed === 0 ? "100% Delivery Health" : "Logged in delivery audit"}
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("onboarding")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "onboarding"
              ? "bg-[#0b132b] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
        >
          <Zap size={14} className={activeTab === "onboarding" ? "text-cyan-400" : ""} />
          <span>New User Onboarding</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "onboarding" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            {onboardingRules.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "calendar"
              ? "bg-[#0b132b] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
        >
          <Calendar size={14} className={activeTab === "calendar" ? "text-cyan-400" : ""} />
          <span>Weekly / Monthly Calendar Schedulers</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "calendar" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            {calendarRules.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "logs"
              ? "bg-[#0b132b] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
        >
          <History size={14} className={activeTab === "logs" ? "text-cyan-400" : ""} />
          <span>Delivery Audit Logs</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "logs" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            {logs.length}
          </span>
        </button>
      </div>

      {/* TAB 1: NEW USER ONBOARDING */}
      {activeTab === "onboarding" && (
        <div className="space-y-5">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
            <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 leading-relaxed">
              <strong className="font-bold">New Users Only:</strong> Onboarding sends automatically to newly registered candidates after this automation is created. All past CRM users registered before this moment are completely excluded.
            </div>
          </div>

          {onboardingRules.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <Zap size={36} className="mx-auto text-slate-400 mb-3" />
              <h3 className="text-sm font-bold text-slate-800">No Onboarding Automations Configured</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Create a clean onboarding email to automatically welcome newly registered candidates.
              </p>
              <button
                onClick={() => openCreateModal()}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                <Plus size={14} />
                <span>Create Onboarding Automation</span>
              </button>
            </div>
          ) : (
            onboardingRules.map((rule) => {
              const isBusy = actionLoading === rule._id || actionLoading === `trigger-${rule._id}`;
              const tplId = rule.onboardingTemplateId || rule.steps?.[0]?.templateId;
              const matchedTpl = templates.find((t) => t.id === tplId || t._id === tplId);

              return (
                <div
                  key={rule._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition hover:border-slate-300"
                >
                  <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{rule.name}</h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            rule.enabled
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              rule.enabled ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {rule.enabled ? "Active" : "Paused"}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                          Audience: {rule.onboardingTargetAudience || rule.targetAudience || "All Users"}
                        </span>
                      </div>
                      {rule.description && (
                        <p className="text-xs text-slate-500">{rule.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-center">
                      <button
                        onClick={() => handleTriggerRule(rule)}
                        disabled={isBusy}
                        title="Process eligible new candidates right now"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition cursor-pointer disabled:opacity-50"
                      >
                        <Play size={12} className={actionLoading === `trigger-${rule._id}` ? "animate-spin" : ""} />
                        <span>Run Now</span>
                      </button>

                      <button
                        onClick={() => handleToggleRule(rule)}
                        disabled={isBusy}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer disabled:opacity-50 ${
                          rule.enabled
                            ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {rule.enabled ? <Pause size={12} /> : <Play size={12} />}
                        <span>{rule.enabled ? "Pause" : "Enable"}</span>
                      </button>

                      <button
                        onClick={() => openCreateModal(rule)}
                        disabled={isBusy}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        title="Edit Onboarding"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        onClick={() => handleDeleteRule(rule)}
                        disabled={isBusy}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Onboarding"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    {/* Primary Step 1 (Welcome Email) */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                            1
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                            {(!rule.onboardingDelayHours || rule.onboardingDelayHours === 0)
                              ? "Immediate (0 hrs upon signup)"
                              : `+${rule.onboardingDelayHours} Hours after Signup`}
                          </span>
                          {rule.onboardingCtaText && (
                            <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                              CTA: {rule.onboardingCtaText}
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Mail size={14} className="text-slate-400" />
                          <span>{matchedTpl ? matchedTpl.name : rule.onboardingTemplateName || tplId}</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Subject: &ldquo;{matchedTpl?.subject || "Welcome to CareerSense"}&rdquo;
                        </div>
                      </div>

                      {tplId && (
                        <button
                          onClick={() => handlePreview(tplId)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer self-start sm:self-center"
                        >
                          <Eye size={12} className="text-slate-500" />
                          <span>Preview Email</span>
                        </button>
                      )}
                    </div>

                    {/* Follow-up Steps (up to 5) */}
                    {Array.isArray(rule.steps) && rule.steps.map((fStep, fIdx) => {
                      const fMatched = templates.find((t) => t.id === fStep.templateId || t._id === fStep.templateId);
                      return (
                        <div key={fIdx} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-black">
                                {fIdx + 2}
                              </span>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                +{fStep.delayHours || (fIdx + 1) * 24} Hours after Signup
                              </span>
                              {fStep.ctaTextOverride && (
                                <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                                  CTA: {fStep.ctaTextOverride}
                                </span>
                              )}
                            </div>

                            <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                              <Mail size={14} className="text-slate-400" />
                              <span>{fMatched ? fMatched.name : fStep.templateName || fStep.templateId}</span>
                            </div>
                            <div className="text-xs text-slate-500">
                              Subject: &ldquo;{fMatched?.subject || "Follow-up Career Tip"}&rdquo;
                            </div>
                          </div>

                          {fStep.templateId && (
                            <button
                              onClick={() => handlePreview(fStep.templateId)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer self-start sm:self-center"
                            >
                              <Eye size={12} className="text-slate-500" />
                              <span>Preview Email</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-6 py-3 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      Active since: <span className="font-semibold text-slate-700">{formatIST(rule.onboardingStartDate || rule.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Delivered: <strong className="text-slate-800">{rule.totalSent || 0}</strong></span>
                      <span>Failed: <strong className="text-slate-800">{rule.totalFailed || 0}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: WEEKLY / MONTHLY CALENDAR SCHEDULERS */}
      {activeTab === "calendar" && (
        <div className="space-y-5">
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
            <Calendar size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <strong className="font-bold">Calendar Schedule Planning:</strong> Plan campaigns across Day 1 to 7 (Weekly) or Day 1 to 30 (Monthly). Choose which days to send (skip any days you like), pick a manual template for each day, and assign a unique recipient list per day (platform candidates with toggle selection, CSV upload, or manual paste). Schedulers expire automatically after completion, with manual deletion.
            </div>
          </div>

          {calendarRules.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <Calendar size={36} className="mx-auto text-slate-400 mb-3" />
              <h3 className="text-sm font-bold text-slate-800">No Calendar Schedules Configured</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Set up a 7-day or 30-day schedule with custom days, templates, and recipient lists.
              </p>
              <button
                onClick={() => openCreateModal()}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                <Plus size={14} />
                <span>Create Calendar Schedule</span>
              </button>
            </div>
          ) : (
            calendarRules.map((rule) => {
              const isBusy = actionLoading === rule._id || actionLoading === `trigger-${rule._id}`;
              const isExpired = rule.status === "expired";
              const totalDays = rule.scheduleDays?.length || 0;
              const executedDays = rule.scheduleDays?.filter((d) => d.executed).length || 0;

              return (
                <div
                  key={rule._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition hover:border-slate-300 space-y-0"
                >
                  <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900">{rule.name}</h3>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                          {rule.scheduleScope === "monthly" ? "30-Day Monthly Routine" : "7-Day Weekly Sprint"}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isExpired
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : rule.enabled
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isExpired ? "bg-amber-500" : rule.enabled ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {isExpired ? "Expired / Completed" : rule.enabled ? "Active" : "Paused"}
                        </span>
                      </div>
                      {rule.description && (
                        <p className="text-xs text-slate-500">{rule.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-center">
                      {!isExpired && (
                        <>
                          <button
                            onClick={() => handleTriggerRule(rule)}
                            disabled={isBusy}
                            title="Run next scheduled day right now"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition cursor-pointer disabled:opacity-50"
                          >
                            <Play size={11} className={actionLoading === `trigger-${rule._id}` ? "animate-spin" : ""} />
                            <span>Run Next Day</span>
                          </button>

                          <button
                            onClick={() => handleToggleRule(rule)}
                            disabled={isBusy}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer disabled:opacity-50 ${
                              rule.enabled
                                ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {rule.enabled ? <Pause size={11} /> : <Play size={11} />}
                            <span>{rule.enabled ? "Pause" : "Enable"}</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => openCreateModal(rule)}
                        disabled={isBusy}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        title="Edit Plan"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        onClick={() => handleDeleteRule(rule)}
                        disabled={isBusy}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Schedule"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Scheduled Days Grid */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        Scheduled Calendar Days ({executedDays} / {totalDays} Dispatched)
                      </span>
                      <span>Period: {formatIST(rule.startDate)} &mdash; {formatIST(rule.endDate)}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {rule.scheduleDays?.map((day) => {
                        const matchedTpl = templates.find((t) => t.id === day.templateId || t._id === day.templateId);

                        return (
                          <div
                            key={day._id || day.dayNumber}
                            className={`p-3.5 rounded-xl border transition ${
                              day.executed
                                ? "bg-slate-50 border-slate-200/80 opacity-80"
                                : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                                {day.dayLabel || `Day ${day.dayNumber}`}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  day.executed
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {day.executed ? "Executed" : `@ ${day.sendTime || "10:00"} IST`}
                              </span>
                            </div>

                            <div className="text-xs font-bold text-slate-800 truncate">
                              {matchedTpl ? matchedTpl.name : day.templateName || day.templateId}
                            </div>

                            <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                              <span>
                                Source: <strong className="text-slate-700 capitalize">{day.recipientSource === "csv" && day.csvFileName ? `CSV (${day.csvFileName})` : day.recipientSource}</strong>
                              </span>
                              <span>
                                Recipients: <strong className="text-slate-700">{day.selectedEmails?.length || day.selectedRecipients?.length || (day.recipientSource === "platform" ? candidates.length : 0)}</strong>
                              </span>
                            </div>

                            {day.templateId && (
                              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                                <button
                                  onClick={() => handlePreview(day.templateId)}
                                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye size={11} />
                                  <span>Preview Template</span>
                                </button>
                                {day.executed && (
                                  <span className="text-[10px] text-emerald-600 font-bold">
                                    ✓ Sent: {day.sentCount || 0}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      Last Activity: <span className="font-semibold text-slate-700">{formatIST(rule.lastRunAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Total Sent: <strong className="text-slate-800">{rule.totalSent || 0}</strong></span>
                      <span>Total Failed: <strong className="text-slate-800">{rule.totalFailed || 0}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 3: LIVE DELIVERY AUDIT LOGS */}
      {activeTab === "logs" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search recipient, email, or campaign..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setLogStatusFilter("all")}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    logStatusFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  All ({logs.length})
                </button>
                <button
                  onClick={() => setLogStatusFilter("sent")}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    logStatusFilter === "sent" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Sent ({logs.filter((l) => l.status === "sent").length})
                </button>
                <button
                  onClick={() => setLogStatusFilter("failed")}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    logStatusFilter === "failed" ? "bg-white text-rose-700 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Failed ({logs.filter((l) => l.status === "failed").length})
                </button>
              </div>

              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg transition cursor-pointer"
                title="Refresh logs"
              >
                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
              No delivery logs recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Recipient</th>
                    <th className="py-2.5 px-4">Automation / Day</th>
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-4">Sent At (IST)</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map((log) => (
                    <tr key={log._id || `${log.recipientEmail}-${log.dayNumber}-${log.sentAt}`} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{log.recipientName || "Candidate"}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{log.recipientEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-700">{log.automationName}</div>
                        <div className="text-[11px] text-indigo-600">
                          {log.automationType === "onboarding" ? "Onboarding Welcome" : `Day ${log.dayNumber} Broadcast`}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                        {log.subject || "Email Notification"}
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {formatIST(log.sentAt)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === "sent"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {log.status === "sent" ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                          <span className="capitalize">{log.status}</span>
                        </span>
                        {log.error && (
                          <div
                            className="text-[10px] text-rose-500 mt-0.5 max-w-xs truncate"
                            title={typeof log.error === "string" ? log.error : JSON.stringify(log.error)}
                          >
                            {typeof log.error === "string" ? log.error : (log.error?.message || JSON.stringify(log.error))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: TEMPLATE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-teal-400 font-bold">Template Preview</div>
                <h3 className="text-base font-bold">{previewTemplate.name}</h3>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs space-y-1">
              <div>
                <span className="text-slate-400 font-medium">From:</span>{" "}
                <span className="text-slate-800 font-semibold">Shagun from CareerSense &lt;shagun@careersenseai.com&gt;</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Subject:</span>{" "}
                <span className="text-slate-800 font-semibold">{previewTemplate.subject}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-100/50">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-lg mx-auto">
                {previewTemplate.htmlCode ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: previewTemplate.htmlCode
                        .replace(/\{\{name\}\}/g, "Candidate")
                        .replace(/\{\{email\}\}/g, "candidate@example.com")
                    }}
                  />
                ) : (
                  <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                    <div className="font-bold text-slate-900 text-sm">
                      {previewTemplate.headline || previewTemplate.name}
                    </div>
                    <div>Hi Candidate,</div>
                    <div className="whitespace-pre-line">{previewTemplate.body}</div>
                    {previewTemplate.ctaText && (
                      <div className="pt-2">
                        <span className="inline-block px-4 py-2 bg-teal-600 text-white font-bold rounded-lg text-xs">
                          {previewTemplate.ctaText} &rarr;
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE / EDIT AUTOMATION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 bg-[#0b132b] text-white flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-teal-400 font-bold">
                  {editingRule ? "Edit Automation Setup" : "Create New Automation"}
                </div>
                <h3 className="text-base font-bold">
                  {editingRule ? editingRule.name : formType === "onboarding" ? "New User Onboarding Workflow" : "Calendar Schedule Planner"}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAutomation} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Type Switcher (only when creating) */}
              {!editingRule && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Automation Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormType("onboarding")}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        formType === "onboarding"
                          ? "border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-2 ring-indigo-500/20"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Zap size={14} className="text-indigo-600" />
                        New User Onboarding (Single Email)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Valid strictly for new signups. Zero historical users emailed.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormType("calendar_schedule")}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        formType === "calendar_schedule"
                          ? "border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-2 ring-indigo-500/20"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Calendar size={14} className="text-indigo-600" />
                        Weekly (Day 1-7) / Monthly (Day 1-30) Calendar
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Select days, choose templates & assign custom recipient lists per day.
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Name & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Automation Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={formType === "onboarding" ? "e.g. New User Welcome Email" : "e.g. 7-Day Growth Sprint"}
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Internal Notes / Description
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description for admin reference"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* SECTION A: ONBOARDING FORM (ONE EMAIL BY DEFAULT) */}
              {formType === "onboarding" && (
                <div className="space-y-4 pt-3 border-t border-slate-100">
                  <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
                    <strong className="font-bold">Single Email Setup:</strong> Sent to new users who register after this automation is saved. No complex steps required.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Template <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={onboardingTemplateId}
                        onChange={(e) => setOnboardingTemplateId(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="">-- Choose from Email Marketing --</option>
                        {templates.map((tpl) => (
                          <option key={tpl.id || tpl._id} value={tpl.id || tpl._id}>
                            {tpl.name} {tpl.isSystem ? "(Preset)" : "(Custom)"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Send Delay after Registration
                      </label>
                      <select
                        value={onboardingDelayHours}
                        onChange={(e) => setOnboardingDelayHours(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                      >
                        <option value={0}>Immediate (0 hours upon registration)</option>
                        <option value={1}>1 hour after registration</option>
                        <option value={2}>2 hours after registration</option>
                        <option value={24}>24 hours (Day 1) after registration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
                    <select
                      value={onboardingTargetAudience}
                      onChange={(e) => setOnboardingTargetAudience(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                    >
                      {AUDIENCE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label} ({opt.desc})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Custom CTA Button Text (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Explore Dashboard →"
                        value={onboardingCtaText}
                        onChange={(e) => setOnboardingCtaText(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Custom CTA URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://careersenseai.com/..."
                        value={onboardingCtaUrl}
                        onChange={(e) => setOnboardingCtaUrl(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Optional follow-up steps section (up to 5 follow-up emails, all optional) */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Optional Follow-up Emails ({followUpSteps.length}/5 Max)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Each follow-up is completely optional and scheduled relative to candidate signup.
                        </div>
                      </div>

                      {followUpSteps.length < 5 && (
                        <button
                          type="button"
                          onClick={() => {
                            const nextStepNum = followUpSteps.length + 2;
                            const lastDelay = followUpSteps.length > 0
                              ? Number(followUpSteps[followUpSteps.length - 1].delayHours || 24)
                              : 24;
                            setFollowUpSteps((prev) => [
                              ...prev,
                              {
                                stepNumber: nextStepNum,
                                delayHours: lastDelay + 24,
                                templateId: templates[0]?.id || "",
                                templateName: templates[0]?.name || "",
                                ctaTextOverride: "",
                                ctaUrlOverride: ""
                              }
                            ]);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition cursor-pointer"
                        >
                          <Plus size={13} />
                          <span>+ Add Follow-up Step ({followUpSteps.length}/5)</span>
                        </button>
                      )}
                    </div>

                    {followUpSteps.map((fStep, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-black">
                              {fIdx + 2}
                            </span>
                            <span>Follow-up Email #{fIdx + 1} (Step {fIdx + 2})</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setFollowUpSteps((prev) =>
                                prev
                                  .filter((_, i) => i !== fIdx)
                                  .map((s, i) => ({ ...s, stepNumber: i + 2 }))
                              );
                            }}
                            className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                          >
                            Remove Step
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Template</label>
                            <select
                              value={fStep.templateId || ""}
                              onChange={(e) => {
                                const tId = e.target.value;
                                const matched = templates.find((t) => t.id === tId || t._id === tId);
                                setFollowUpSteps((prev) => {
                                  const clone = [...prev];
                                  clone[fIdx].templateId = tId;
                                  clone[fIdx].templateName = matched?.name || tId;
                                  return clone;
                                });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                            >
                              <option value="">-- Choose Template --</option>
                              {templates.map((tpl) => (
                                <option key={tpl.id || tpl._id} value={tpl.id || tpl._id}>
                                  {tpl.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Delay after Signup (Hours)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={fStep.delayHours}
                              onChange={(e) => {
                                const val = Number(e.target.value) || 24;
                                setFollowUpSteps((prev) => {
                                  const clone = [...prev];
                                  clone[fIdx].delayHours = val;
                                  return clone;
                                });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                            />
                            <span className="text-[10px] text-slate-400">
                              {fStep.delayHours} hrs ≈ {(fStep.delayHours / 24).toFixed(1)} days after signup
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              Custom CTA Button Text (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Continue Learning →"
                              value={fStep.ctaTextOverride || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFollowUpSteps((prev) => {
                                  const clone = [...prev];
                                  clone[fIdx].ctaTextOverride = val;
                                  return clone;
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              Custom CTA URL (Optional)
                            </label>
                            <input
                              type="url"
                              placeholder="https://careersenseai.com/..."
                              value={fStep.ctaUrlOverride || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFollowUpSteps((prev) => {
                                  const clone = [...prev];
                                  clone[fIdx].ctaUrlOverride = val;
                                  return clone;
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION B: WEEKLY (DAY 1-7) / MONTHLY (DAY 1-30) CALENDAR PLANNER */}
              {formType === "calendar_schedule" && (
                <div className="space-y-5 pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Planning Scope
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setScheduleScope("weekly");
                            setCalendarDaysConfig(generateDaysConfig("weekly", startDateStr));
                            setActivePlannerDayIdx(0);
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                            scheduleScope === "weekly"
                              ? "bg-[#0b132b] text-white border-[#0b132b]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Weekly (7 Days)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setScheduleScope("monthly");
                            setCalendarDaysConfig(generateDaysConfig("monthly", startDateStr));
                            setActivePlannerDayIdx(0);
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                            scheduleScope === "monthly"
                              ? "bg-[#0b132b] text-white border-[#0b132b]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          Monthly (30 Days)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDateStr}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStartDateStr(val);
                          setCalendarDaysConfig(generateDaysConfig(scheduleScope, val, calendarDaysConfig));
                        }}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  {/* Day Picker Pills (Skip any day allowed!) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Choose Days to Schedule (Skipping Days is Allowed)
                      </label>
                      <span className="text-[11px] text-slate-500">
                        {calendarDaysConfig.filter((d) => d.included).length} of {calendarDaysConfig.length} Days Selected
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200 max-h-36 overflow-y-auto">
                      {calendarDaysConfig.map((day, idx) => {
                        const isSelectedTab = activePlannerDayIdx === idx;
                        return (
                          <div
                            key={day.dayNumber}
                            onClick={() => setActivePlannerDayIdx(idx)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                              isSelectedTab
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                                : day.included
                                ? "bg-white text-indigo-900 border-indigo-200"
                                : "bg-slate-100 text-slate-400 border-transparent hover:bg-slate-200/70"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={day.included}
                              onChange={(e) => {
                                e.stopPropagation();
                                const val = e.target.checked;
                                setCalendarDaysConfig((prev) => {
                                  const clone = [...prev];
                                  clone[idx].included = val;
                                  return clone;
                                });
                              }}
                              className="rounded border-slate-300 text-indigo-600 cursor-pointer"
                            />
                            <span>Day {day.dayNumber}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Day Configuration Box */}
                  {calendarDaysConfig[activePlannerDayIdx] && (
                    <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-indigo-100/60 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-indigo-950">
                            Configure Day {calendarDaysConfig[activePlannerDayIdx].dayNumber}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({new Date(calendarDaysConfig[activePlannerDayIdx].scheduledDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric"
                            })})
                          </span>
                        </div>

                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={calendarDaysConfig[activePlannerDayIdx].included}
                            onChange={(e) => {
                              const val = e.target.checked;
                              setCalendarDaysConfig((prev) => {
                                const clone = [...prev];
                                clone[activePlannerDayIdx].included = val;
                                return clone;
                              });
                            }}
                            className="rounded border-slate-300 text-indigo-600 cursor-pointer"
                          />
                          <span>Include Day {calendarDaysConfig[activePlannerDayIdx].dayNumber} in Schedule</span>
                        </label>
                      </div>

                      {calendarDaysConfig[activePlannerDayIdx].included ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Template for Day {calendarDaysConfig[activePlannerDayIdx].dayNumber} <span className="text-rose-500">*</span>
                              </label>
                              <select
                                value={calendarDaysConfig[activePlannerDayIdx].templateId}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCalendarDaysConfig((prev) => {
                                    const clone = [...prev];
                                    clone[activePlannerDayIdx].templateId = val;
                                    return clone;
                                  });
                                }}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                              >
                                <option value="">-- Choose Template --</option>
                                {templates.map((tpl) => (
                                  <option key={tpl.id || tpl._id} value={tpl.id || tpl._id}>
                                    {tpl.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Send Time (IST)
                              </label>
                              <input
                                type="time"
                                value={calendarDaysConfig[activePlannerDayIdx].sendTime}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCalendarDaysConfig((prev) => {
                                    const clone = [...prev];
                                    clone[activePlannerDayIdx].sendTime = val;
                                    return clone;
                                  });
                                }}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                              />
                            </div>
                          </div>

                          {/* Recipient Source Selection (Platform users toggle, CSV, Manual) */}
                          <div className="pt-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Select Recipients for Day {calendarDaysConfig[activePlannerDayIdx].dayNumber}
                            </label>

                            <div className="flex items-center gap-2 mb-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setCalendarDaysConfig((prev) => {
                                    const clone = [...prev];
                                    clone[activePlannerDayIdx].recipientSource = "platform";
                                    return clone;
                                  });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  calendarDaysConfig[activePlannerDayIdx].recipientSource === "platform"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                Platform Candidates (Toggle Select)
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setCalendarDaysConfig((prev) => {
                                    const clone = [...prev];
                                    clone[activePlannerDayIdx].recipientSource = "csv";
                                    return clone;
                                  });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  calendarDaysConfig[activePlannerDayIdx].recipientSource === "csv"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                CSV File Upload
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setCalendarDaysConfig((prev) => {
                                    const clone = [...prev];
                                    clone[activePlannerDayIdx].recipientSource = "manual";
                                    return clone;
                                  });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  calendarDaysConfig[activePlannerDayIdx].recipientSource === "manual"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                Manual Paste
                              </button>
                            </div>

                            {/* Option 1: Platform Users with Toggle Select */}
                            {calendarDaysConfig[activePlannerDayIdx].recipientSource === "platform" && (
                              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                                    <button
                                      type="button"
                                      onClick={() => setCandidateAudienceFilter("all")}
                                      className={`px-2.5 py-1 rounded-md text-[11px] ${
                                        candidateAudienceFilter === "all" ? "bg-slate-900 text-white" : "text-slate-500 bg-slate-100"
                                      }`}
                                    >
                                      All ({candidates.length})
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setCandidateAudienceFilter("free_tier")}
                                      className={`px-2.5 py-1 rounded-md text-[11px] ${
                                        candidateAudienceFilter === "free_tier" ? "bg-slate-900 text-white" : "text-slate-500 bg-slate-100"
                                      }`}
                                    >
                                      Free Tier
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setCandidateAudienceFilter("paid_users")}
                                      className={`px-2.5 py-1 rounded-md text-[11px] ${
                                        candidateAudienceFilter === "paid_users" ? "bg-slate-900 text-white" : "text-slate-500 bg-slate-100"
                                      }`}
                                    >
                                      Paid Users
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {/* Toggle Select All */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const curSelectedEmails = calendarDaysConfig[activePlannerDayIdx].selectedEmails || [];
                                        const curRecipients = calendarDaysConfig[activePlannerDayIdx].selectedRecipients || [];
                                        const validCandidates = filteredCandidates.filter((c) => c.email && c.email.includes("@"));
                                        const visibleEmails = validCandidates.map((c) => c.email.toLowerCase().trim());
                                        const allVisibleSelected = visibleEmails.length > 0 && visibleEmails.every((e) => curSelectedEmails.includes(e));

                                        let newEmails = [];
                                        let newRecipients = [];
                                        if (allVisibleSelected) {
                                          newEmails = curSelectedEmails.filter((e) => !visibleEmails.includes(e));
                                          newRecipients = curRecipients.filter((r) => !visibleEmails.includes(r.email));
                                        } else {
                                          const emailSet = new Set(curSelectedEmails);
                                          const recMap = new Map(curRecipients.map((r) => [r.email, r]));
                                          validCandidates.forEach((c) => {
                                            const em = c.email.toLowerCase().trim();
                                            emailSet.add(em);
                                            recMap.set(em, { email: em, name: c.fullName || c.firstName || "there" });
                                          });
                                          newEmails = Array.from(emailSet);
                                          newRecipients = Array.from(recMap.values());
                                        }

                                        setCalendarDaysConfig((prev) => {
                                          const clone = [...prev];
                                          clone[activePlannerDayIdx].selectedEmails = newEmails;
                                          clone[activePlannerDayIdx].selectedRecipients = newRecipients;
                                          return clone;
                                        });
                                      }}
                                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-lg border border-indigo-200 transition cursor-pointer"
                                    >
                                      Toggle Select All ({filteredCandidates.length})
                                    </button>

                                    <span className="text-[11px] font-bold text-slate-700">
                                      Selected: {calendarDaysConfig[activePlannerDayIdx].selectedEmails?.length || 0}
                                    </span>
                                  </div>
                                </div>

                                <input
                                  type="text"
                                  placeholder="Search candidate name or email to select..."
                                  value={candidateSearchTerm}
                                  onChange={(e) => setCandidateSearchTerm(e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                                />

                                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg bg-slate-50/40">
                                  {filteredCandidates.length === 0 ? (
                                    <div className="p-4 text-center text-xs text-slate-400">No candidates match this search/filter.</div>
                                  ) : (
                                    filteredCandidates.map((cand) => {
                                      const em = (cand.email || "").toLowerCase().trim();
                                      const isChecked = (calendarDaysConfig[activePlannerDayIdx].selectedEmails || []).includes(em);
                                      const isPaid = cand.isPaidUser || cand.subscription?.isPaid;

                                      return (
                                        <div
                                          key={cand.clerkUserId || cand.id || em}
                                          onClick={() => {
                                            const curSelectedEmails = calendarDaysConfig[activePlannerDayIdx].selectedEmails || [];
                                            const curRecipients = calendarDaysConfig[activePlannerDayIdx].selectedRecipients || [];
                                            let updatedEmails = [];
                                            let updatedRecipients = [];
                                            if (isChecked) {
                                              updatedEmails = curSelectedEmails.filter((e) => e !== em);
                                              updatedRecipients = curRecipients.filter((r) => r.email !== em);
                                            } else {
                                              updatedEmails = [...curSelectedEmails, em];
                                              updatedRecipients = [...curRecipients, { email: em, name: cand.fullName || cand.firstName || "there" }];
                                            }
                                            setCalendarDaysConfig((prev) => {
                                              const clone = [...prev];
                                              clone[activePlannerDayIdx].selectedEmails = updatedEmails;
                                              clone[activePlannerDayIdx].selectedRecipients = updatedRecipients;
                                              return clone;
                                            });
                                          }}
                                          className="p-2 flex items-center justify-between hover:bg-slate-100/70 transition cursor-pointer text-xs"
                                        >
                                          <div className="flex items-center gap-2 min-w-0">
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              readOnly
                                              className="rounded border-slate-300 text-indigo-600 cursor-pointer h-3.5 w-3.5"
                                            />
                                            <div className="min-w-0 truncate">
                                              <span className="font-semibold text-slate-800">{cand.fullName || "Candidate"}</span>
                                              <span className="text-slate-400 ml-2 font-mono text-[11px] truncate">{em}</span>
                                            </div>
                                          </div>
                                          {isPaid ? (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                                              PAID
                                            </span>
                                          ) : (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                                              FREE
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Option 2: CSV Upload */}
                            {calendarDaysConfig[activePlannerDayIdx].recipientSource === "csv" && (
                              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                                <label className="block text-slate-700 font-bold">Upload Recipient CSV (must contain email column)</label>

                                {calendarDaysConfig[activePlannerDayIdx].csvFileName ? (
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                                        <FileSpreadsheet size={18} />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="font-bold text-emerald-950 flex items-center gap-2">
                                          <span className="truncate">{calendarDaysConfig[activePlannerDayIdx].csvFileName}</span>
                                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-emerald-200 text-emerald-800 rounded font-black shrink-0">
                                            Loaded
                                          </span>
                                        </div>
                                        <div className="text-[11px] text-emerald-700 mt-0.5">
                                          <strong className="font-bold">{calendarDaysConfig[activePlannerDayIdx].selectedEmails?.length || 0}</strong> valid recipients loaded & deduplicated
                                        </div>
                                      </div>
                                    </div>

                                    <label className="shrink-0 px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-lg transition cursor-pointer text-center">
                                      Upload Different CSV
                                      <input
                                        type="file"
                                        accept=".csv,text/csv,text/plain"
                                        onChange={(e) => handleCsvUploadForDay(activePlannerDayIdx, e.target.files?.[0])}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <input
                                      type="file"
                                      accept=".csv,text/csv,text/plain"
                                      onChange={(e) => handleCsvUploadForDay(activePlannerDayIdx, e.target.files?.[0])}
                                      className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                                      <span>Auto-detects emails & cleans duplicates</span>
                                      <span>
                                        Recipients loaded: <strong className="text-slate-800 font-bold">{calendarDaysConfig[activePlannerDayIdx].selectedEmails?.length || 0}</strong>
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Option 3: Manual Paste */}
                            {calendarDaysConfig[activePlannerDayIdx].recipientSource === "manual" && (
                              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                                <label className="block text-slate-600 font-semibold">Paste comma or newline separated emails</label>
                                <textarea
                                  rows={3}
                                  placeholder="candidate1@gmail.com, candidate2@yahoo.com"
                                  value={calendarDaysConfig[activePlannerDayIdx].manualText || ""}
                                  onChange={(e) => handleManualPasteForDay(activePlannerDayIdx, e.target.value)}
                                  className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                                />
                                <div className="text-[11px] text-slate-500">
                                  Valid emails detected: <strong className="text-slate-800">{calendarDaysConfig[activePlannerDayIdx].selectedEmails?.length || 0}</strong>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 py-3 text-center italic">
                          Day {calendarDaysConfig[activePlannerDayIdx].dayNumber} is skipped. Check the box above to schedule it.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === "saving"}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {actionLoading === "saving" ? "Saving..." : editingRule ? "Save Changes" : "Create Automation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

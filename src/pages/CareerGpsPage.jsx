import { useMemo, useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useHeroTheme from "../hooks/useHeroTheme";
import GpsArchetypeStep from "../components/gps/GpsArchetypeStep";
import GpsQuestion from "../components/gps/GpsQuestion";
import GpsResults from "../components/gps/GpsResults";
import {
  archetypeQuestions,
  gpsQuestions,
  calculateGpsResults,
  resolveArchetype,
  getReadinessLevel,
  careerArchetypes,
} from "../data/careerGpsData";

// ── Intro / Landing Step ──────────────────────────────────────
function GpsIntro({ heroTheme, profile, onChange, onStart }) {
  const isLight = heroTheme === "light";
  const isReady = profile.name.trim() && profile.email.trim() && profile.targetRole.trim();

  const fieldClass = isLight
    ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
    : "border-slate-600 bg-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none";

  return (
    <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
      {/* Left */}
      <div>
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${isLight ? "bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200" : "bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-400 border border-cyan-800/50"}`}>
          Career GPS — Free Assessment
        </span>

        <h1 className={`mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${isLight ? "text-slate-900" : "text-white"}`}>
          Map your exact route to{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            getting hired.
          </span>
        </h1>

        <p className={`mt-6 text-lg leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
          Career GPS diagnoses your job-readiness across 5 essential phases — from your resume and ATS score to interview readiness. Get a personalized 3-step action plan for your profile.
        </p>

        <div className={`mt-8 rounded-2xl border p-6 ${isLight ? "border-slate-200 bg-slate-50" : "border-slate-800 bg-slate-900/60"}`}>
          <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isLight ? "text-slate-400" : "text-slate-500"}`}>What's in your GPS report</p>
          <ul className="space-y-2">
            {[
              "Your Career Archetype (Climber, Switcher, Fresh Grad, Returner)",
              "5-phase pipeline scorecard: Resume → ATS → Certifi → Cover Letter → Interview",
              "A 3-step, sequenced action plan for your archetype",
              "Direct links to the right CareerSense tools for each gap",
              "A shareable career score card for LinkedIn",
            ].map((item) => (
              <li key={item} className={`flex items-start gap-2 text-sm ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Quick form */}
      <form
        className={`rounded-2xl border p-7 sm:p-9 ${isLight ? "border-slate-200 bg-white shadow-xl shadow-slate-200/60" : "border-slate-700/80 bg-slate-900 shadow-xl shadow-black/40"}`}
        onSubmit={(e) => { e.preventDefault(); if (isReady) onStart(); }}
      >
        <h2 className={`text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
          Let's set up your GPS
        </h2>
        <p className={`mt-1 text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>Takes 5 minutes. Completely free.</p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5">
            <span className={`text-sm font-semibold ${isLight ? "text-slate-700" : "text-slate-300"}`}>Full Name <span className="text-red-400">*</span></span>
            <input
              value={profile.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Your name"
              className={`h-11 rounded-xl border px-4 text-sm transition-all ${fieldClass}`}
              required
            />
          </label>

          <label className="grid gap-1.5">
            <span className={`text-sm font-semibold ${isLight ? "text-slate-700" : "text-slate-300"}`}>Email <span className="text-red-400">*</span></span>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="email@example.com"
              className={`h-11 rounded-xl border px-4 text-sm transition-all ${fieldClass}`}
              required
            />
          </label>

          <label className="grid gap-1.5">
            <span className={`text-sm font-semibold ${isLight ? "text-slate-700" : "text-slate-300"}`}>Target Role <span className="text-red-400">*</span></span>
            <input
              value={profile.targetRole}
              onChange={(e) => onChange("targetRole", e.target.value)}
              placeholder="e.g. Software Engineer, Product Manager"
              className={`h-11 rounded-xl border px-4 text-sm transition-all ${fieldClass}`}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!isReady}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Launch My Career GPS
        </button>

        <p className={`mt-4 text-center text-xs ${isLight ? "text-slate-400" : "text-slate-500"}`}>
          Free. No card required. Results in under 5 minutes.
        </p>
      </form>
    </section>
  );
}

// ── Local Storage Cache Helpers ───────────────────────────────
const CACHE_KEY = "careersense_gps_cache";

function getLocalCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function getGuestSessionCache() {
  try {
    const raw = sessionStorage.getItem("cs_guest_active_session_report");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setLocalCache(payload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (e) {}
}

// ── Main Page ─────────────────────────────────────────────────
const initialProfile = { name: "", email: "", targetRole: "", status: "Job Seeker" };

export default function CareerGpsPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const isLight = heroTheme === "light";

  // Synchronous state initialization:
  // For logged-in users, instantly restore from localCache so their saved report displays with 0 delay.
  // For guests, start fresh on "intro" unless refreshing an active generated report.
  const [step, setStep] = useState(() => {
    const localC = getLocalCache();
    if (localC && localC.answers && Object.keys(localC.answers).length > 0) return "results";
    const guestCache = getGuestSessionCache();
    if (guestCache && guestCache.answers && Object.keys(guestCache.answers).length > 0) return "results";
    return "intro";
  });

  const [profile, setProfile] = useState(() => {
    const localC = getLocalCache();
    if (localC?.profile) return { ...initialProfile, ...localC.profile };
    const guestCache = getGuestSessionCache();
    if (guestCache?.profile) return { ...initialProfile, ...guestCache.profile };
    return initialProfile;
  });

  const [answers, setAnswers] = useState(() => {
    const localC = getLocalCache();
    if (localC?.answers) return localC.answers;
    const guestCache = getGuestSessionCache();
    return guestCache?.answers || {};
  });

  const [archetypeAnswers, setArchetypeAnswers] = useState(() => {
    const localC = getLocalCache();
    if (localC?.archetypeAnswers) return localC.archetypeAnswers;
    const guestCache = getGuestSessionCache();
    return guestCache?.archetypeAnswers || {};
  });

  const [archetype, setArchetype] = useState(() => {
    const localC = getLocalCache();
    if (localC?.archetype) return careerArchetypes[localC.archetype] || resolveArchetype(localC.archetypeAnswers || {});
    const guestCache = getGuestSessionCache();
    if (guestCache?.archetype) return careerArchetypes[guestCache.archetype] || resolveArchetype(guestCache.archetypeAnswers || {});
    return null;
  });

  const [aiDiagnosis, setAiDiagnosis] = useState(() => {
    const localC = getLocalCache();
    if (localC?.aiDiagnosis) return localC.aiDiagnosis;
    const guestCache = getGuestSessionCache();
    return guestCache?.aiDiagnosis || null;
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(() => {
    const localC = getLocalCache();
    return !(localC && localC.answers && Object.keys(localC.answers).length > 0);
  });

  const currentQuestion = gpsQuestions[questionIndex];
  const results = useMemo(() => calculateGpsResults(answers), [answers]);

  // Restore latest saved assessment on mount if available
  useEffect(() => {
    const loadLatestSavedReport = async () => {
      if (!user) {
        setIsRestoring(false);
        return;
      }
      try {
        const token = await getToken();
        const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
        const res = await fetch(`${apiBase}/careersense/assessment/latest`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.answers && Object.keys(data.answers).length > 0) {
            const restoredProfile = data.profile ? { ...profile, ...data.profile } : profile;
            if (data.profile) setProfile(restoredProfile);
            setAnswers(data.answers || {});
            if (data.archetypeAnswers) setArchetypeAnswers(data.archetypeAnswers);
            const resolved = data.archetype ? careerArchetypes[data.archetype] : resolveArchetype(data.archetypeAnswers || {});
            if (resolved) setArchetype(resolved);

            const computed = calculateGpsResults(data.answers || {});
            setStep("results");

            let currentAi = data.aiDiagnosis;
            const reportTakenAt = data.takenAt || data.createdAt;
            if (currentAi && currentAi.sprintPlan) {
              setAiDiagnosis(currentAi);
              setLocalCache({
                profile: restoredProfile,
                answers: data.answers,
                archetypeAnswers: data.archetypeAnswers,
                archetype: data.archetype || resolved?.id,
                aiDiagnosis: currentAi
              });
              if (reportTakenAt) {
                syncLiveActivity(reportTakenAt);
              }
            } else {
              fetchAiDiagnosis(computed, reportTakenAt).then((aiData) => {
                if (aiData) {
                  setLocalCache({
                    profile: restoredProfile,
                    answers: data.answers,
                    archetypeAnswers: data.archetypeAnswers,
                    archetype: data.archetype || resolved?.id,
                    aiDiagnosis: aiData
                  });
                  fetch(`${apiBase}/careersense/assessment/save`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                      profile: restoredProfile,
                      answers: data.answers,
                      archetypeAnswers: data.archetypeAnswers,
                      archetype: data.archetype || resolved?.id,
                      aiDiagnosis: aiData,
                      results: {
                        overallScore: computed.overallScore,
                        categoryScores: computed.categoryScores,
                        readinessLevel: { label: computed.readinessLevel.label, summary: computed.readinessLevel.summary },
                      },
                    })
                  }).catch(console.error);
                }
              });
            }
          }
        }
      } catch (err) {
        console.error("Error restoring saved assessment report:", err);
      } finally {
        setIsRestoring(false);
      }
    };

    if (isLoaded && user) {
      loadLatestSavedReport();
    } else if (isLoaded && !user) {
      const guestC = getGuestSessionCache();
      if (!guestC) {
        setStep("intro");
        setProfile(initialProfile);
        setAnswers({});
        setArchetypeAnswers({});
        setArchetype(null);
        setAiDiagnosis(null);
      }
      setIsRestoring(false);
    }
  }, [isLoaded, user, getToken]);

  // Pre-fill profile from Clerk if not restored
  useEffect(() => {
    if (isLoaded && user && !profile.name) {
      setProfile((prev) => ({
        ...prev,
        name: user.fullName || prev.name || "",
        email: user.primaryEmailAddress?.emailAddress || prev.email || "",
      }));
    }
  }, [isLoaded, user, profile.name]);

  function updateProfile(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function handleArchetypeComplete(answers) {
    setArchetypeAnswers(answers);
    const resolved = resolveArchetype(answers);
    setArchetype(resolved);
    const customRole = answers["custom-role"];
    setProfile((p) => ({
      ...p,
      status: resolved.label || p.status || "Job Seeker",
      targetRole: customRole || p.targetRole || "Software Developer"
    }));
    setStep("questions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const effectiveCategoryScores = useMemo(() => {
    const base = { ...results.categoryScores };
    if (aiDiagnosis?.completedPhases) {
      if (aiDiagnosis.completedPhases.ats) base.ats = 100;
      if (aiDiagnosis.completedPhases.skills) base.skills = 100;
      if (aiDiagnosis.completedPhases.coverletter) base.coverletter = 100;
      if (aiDiagnosis.completedPhases.resume) base.resume = 100;
      if (aiDiagnosis.completedPhases.interview) base.interview = 100;
    }
    return base;
  }, [results.categoryScores, aiDiagnosis?.completedPhases]);

  const effectiveOverallScore = useMemo(() => {
    const vals = Object.values(effectiveCategoryScores);
    if (vals.length === 0) return results.overallScore;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [effectiveCategoryScores, results.overallScore]);

  function selectAnswer(score) {
    setAnswers((a) => ({ ...a, [currentQuestion.id]: score }));
  }

  async function fetchAiDiagnosis(computedResults, reportTakenAt = null) {
    setIsAiLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const endpoint = user ? `${apiBase}/careersense/assessment/ai-diagnose` : `${apiBase}/careersense/assessment/ai-diagnose-guest`;
      const headers = { "Content-Type": "application/json" };
      if (user) {
        const token = await getToken();
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          profile,
          archetype,
          categoryScores: computedResults.categoryScores,
          answers,
          reportTakenAt: reportTakenAt || new Date().toISOString()
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAiDiagnosis(data);
        setLocalCache({
          profile,
          answers,
          archetypeAnswers,
          archetype: archetype?.id,
          aiDiagnosis: data
        });
        return data;
      }
    } catch (err) {
      console.error("AI diagnosis fetch error:", err);
    } finally {
      setIsAiLoading(false);
    }
    return null;
  }

  async function syncLiveActivity(reportTakenAt) {
    if (!user) return;
    try {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const res = await fetch(`${apiBase}/careersense/assessment/sync-live-activity`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reportTakenAt })
      });
      if (res.ok) {
        const { completedPhases } = await res.json();
        if (completedPhases) {
          setAiDiagnosis(prev => prev ? { ...prev, completedPhases } : prev);
        }
      }
    } catch (err) {
      console.error("Error syncing live activity:", err);
    }
  }

  function goNext() {
    if (answers[currentQuestion.id] === undefined) return;
    if (questionIndex === gpsQuestions.length - 1) {
      const computed = calculateGpsResults(answers);
      const reportTakenAt = new Date().toISOString();
      setStep("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchAiDiagnosis(computed, reportTakenAt).then((aiData) => {
        saveResults(aiData, reportTakenAt);
      });
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  function goPrevious() {
    setQuestionIndex((i) => Math.max(0, i - 1));
  }

  async function saveResults(aiData = null, reportTakenAt = null) {
    const finalDiagnosis = aiData || aiDiagnosis;
    const takenAt = reportTakenAt || new Date().toISOString();

    if (user) {
      setLocalCache({
        profile,
        answers,
        archetypeAnswers,
        archetype: archetype?.id,
        aiDiagnosis: finalDiagnosis,
        takenAt,
      });
    } else {
      try {
        sessionStorage.setItem("cs_guest_active_session_report", JSON.stringify({
          profile,
          answers,
          archetypeAnswers,
          archetype: archetype?.id,
          aiDiagnosis: finalDiagnosis,
          takenAt
        }));
        localStorage.setItem("cs_guest_gps_report", JSON.stringify({
          profile,
          answers,
          archetypeAnswers,
          archetype: archetype?.id,
          aiDiagnosis: finalDiagnosis,
          takenAt
        }));
      } catch (e) {}
      return;
    }

    try {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const computed = calculateGpsResults(answers);
      await fetch(`${apiBase}/careersense/assessment/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          profile,
          answers,
          archetypeAnswers,
          archetype: archetype?.id,
          aiDiagnosis: finalDiagnosis,
          results: {
            overallScore: computed.overallScore,
            categoryScores: computed.categoryScores,
            readinessLevel: { label: computed.readinessLevel.label, summary: computed.readinessLevel.summary },
          },
          takenAt,
          source: "career-gps",
        }),
      });
    } catch (err) {
      console.error("GPS save error:", err);
    }
  }

  // Auto-sync guest report to account when user logs in / signs up
  useEffect(() => {
    const claimGuestReportIfAny = async () => {
      if (!user) return;
      try {
        const guestDataRaw = localStorage.getItem("cs_guest_gps_report");
        if (guestDataRaw) {
          const guestData = JSON.parse(guestDataRaw);
          const token = await getToken();
          const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
          const computed = calculateGpsResults(guestData.answers || {});
          await fetch(`${apiBase}/careersense/assessment/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              profile: guestData.profile || profile,
              answers: guestData.answers || {},
              archetypeAnswers: guestData.archetypeAnswers || {},
              archetype: guestData.archetype,
              aiDiagnosis: guestData.aiDiagnosis,
              results: {
                overallScore: computed.overallScore,
                categoryScores: computed.categoryScores,
                readinessLevel: { label: computed.readinessLevel.label, summary: computed.readinessLevel.summary },
              },
              takenAt: guestData.takenAt || new Date().toISOString(),
              source: "guest-claim",
            })
          });
          localStorage.removeItem("cs_guest_gps_report");
        }
      } catch (err) {
        console.error("Guest report auto-claim error:", err);
      }
    };

    claimGuestReportIfAny();
  }, [isLoaded, user, getToken]);

  function restart() {
    try {
      if (user) localStorage.removeItem(CACHE_KEY);
      sessionStorage.removeItem("cs_guest_active_session_report");
    } catch (e) {}
    setStep("intro");
    setProfile(initialProfile);
    setAnswers({});
    setArchetypeAnswers({});
    setArchetype(null);
    setAiDiagnosis(null);
    setQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={`relative min-h-screen transition-colors duration-300 ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"}`}>
      <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />

      <div className="relative z-10">
        {(isRestoring && step !== "results") ? (
          <div className="mx-auto flex min-h-[calc(100vh-180px)] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-500" />
            </div>
            <div className="mt-6">
              <span className="inline-flex rounded-full bg-cyan-100 dark:bg-cyan-950 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                Career GPS Restoring
              </span>
              <h3 className={`mt-3 text-2xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                Restoring Your Saved Career Map...
              </h3>
              <p className={`mt-2 text-sm max-w-md ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                Loading your latest Career GPS assessment and AI Diagnosis...
              </p>
            </div>
          </div>
        ) : (
          <>
            {step === "intro" && (
              <GpsIntro heroTheme={heroTheme} profile={profile} onChange={updateProfile} onStart={() => setStep("archetype")} />
            )}
            {step === "archetype" && (
              <GpsArchetypeStep heroTheme={heroTheme} questions={archetypeQuestions} onComplete={handleArchetypeComplete} />
            )}
            {step === "questions" && (
              <GpsQuestion
                heroTheme={heroTheme}
                question={currentQuestion}
                index={questionIndex}
                total={gpsQuestions.length}
                selectedScore={answers[currentQuestion.id]}
                onSelect={selectAnswer}
                onNext={goNext}
                onPrevious={goPrevious}
                archetype={archetype}
              />
            )}
            {step === "results" && (
              <GpsResults
                heroTheme={heroTheme}
                profile={profile}
                overallScore={effectiveOverallScore}
                categoryScores={effectiveCategoryScores}
                readinessLevel={getReadinessLevel(effectiveOverallScore)}
                archetype={archetype}
                aiDiagnosis={aiDiagnosis}
                onSyncProgress={() => {
                  const c = getLocalCache();
                  const reportTakenAt = c?.takenAt || new Date().toISOString();
                  return syncLiveActivity(reportTakenAt);
                }}
                onRestart={restart}
              />
            )}
          </>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <Footer heroTheme={heroTheme} />
      </div>
    </main>
  );
}

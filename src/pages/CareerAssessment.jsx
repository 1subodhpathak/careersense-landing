import { useEffect, useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AssessmentIntro from "../components/assessment/AssessmentIntro";
import AssessmentQuestion from "../components/assessment/AssessmentQuestion";
import AssessmentResults from "../components/assessment/AssessmentResults";
import useHeroTheme from "../hooks/useHeroTheme";
import {
  assessmentCategories,
  assessmentQuestions,
  readinessLevels,
} from "../data/careerAssessmentData";

const initialProfile = {
  name: "",
  email: "",
  status: "",
  targetRole: "",
};

function calculateResults(answers) {
  const categoryTotals = {};
  const categoryMaximums = {};

  assessmentQuestions.forEach((question) => {
    categoryTotals[question.category] =
      (categoryTotals[question.category] || 0) + (answers[question.id] || 0);

    categoryMaximums[question.category] =
      (categoryMaximums[question.category] || 0) +
      Math.max(...question.options.map((option) => option.score));
  });

  const categoryScores = Object.keys(assessmentCategories).reduce(
    (result, category) => {
      const earned = categoryTotals[category] || 0;
      const maximum = categoryMaximums[category] || 1;
      result[category] = Math.round((earned / maximum) * 100);
      return result;
    },
    {}
  );

  const overallScore = Math.round(
    Object.values(categoryScores).reduce((sum, score) => sum + score, 0) /
      Object.values(categoryScores).length
  );

  const readinessLevel =
    readinessLevels.find(
      (level) => overallScore >= level.min && overallScore <= level.max
    ) || readinessLevels[0];

  const weakestCategories = Object.entries(categoryScores)
    .sort(([, firstScore], [, secondScore]) => firstScore - secondScore)
    .slice(0, 3)
    .map(([category]) => category);

  return {
    categoryScores,
    overallScore,
    readinessLevel,
    weakestCategories,
  };
}

export default function CareerAssessment() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [step, setStep] = useState("intro");
  const [profile, setProfile] = useState(initialProfile);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];

  const results = useMemo(() => calculateResults(answers), [answers]);
  const isLightTheme = heroTheme === "light";

  useEffect(() => {
    if (isLoaded && user) {
      setProfile((prev) => ({
        ...prev,
        name: user.fullName || prev.name || "",
        email: user.primaryEmailAddress?.emailAddress || prev.email || "",
      }));
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const loadLatestAssessmentProfile = async () => {
      if (!user) return;
      setIsLoadingHistory(true);
      try {
        const token = await getToken();
        const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
        const response = await fetch(`${apiBase}/careersense/assessment/latest`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.profile) {
            setProfile((prev) => ({
              ...prev,
              status: data.profile.status || prev.status || "",
              targetRole: data.profile.targetRole || prev.targetRole || "",
            }));
          }
        }
      } catch (err) {
        console.error("Error loading latest assessment:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    if (isLoaded && user) {
      loadLatestAssessmentProfile();
    }
  }, [isLoaded, user, getToken]);

  const saveAssessment = async () => {
    try {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
      const calculatedResults = calculateResults(answers);

      const response = await fetch(`${apiBase}/careersense/assessment/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          profile,
          answers,
          results: {
            overallScore: calculatedResults.overallScore,
            categoryScores: calculatedResults.categoryScores,
            readinessLevel: {
              label: calculatedResults.readinessLevel.label,
              summary: calculatedResults.readinessLevel.summary
            },
            weakestCategories: calculatedResults.weakestCategories
          }
        })
      });

      if (!response.ok) {
        console.error("Failed to auto-save assessment results");
      }
    } catch (err) {
      console.error("Error saving assessment results:", err);
    }
  };

  const updateProfile = (field, value) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  };

  const selectAnswer = (score) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: score,
    }));
  };

  const goNext = () => {
    if (answers[currentQuestion.id] === undefined) return;

    if (currentQuestionIndex === assessmentQuestions.length - 1) {
      saveAssessment();
      setStep("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  };

  const goPrevious = () => {
    setCurrentQuestionIndex((index) => Math.max(0, index - 1));
  };

  const restartAssessment = () => {
    setStep("intro");
    setProfile(initialProfile);
    setAnswers({});
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isLightTheme
          ? "bg-[linear-gradient(180deg,#f7fbff_0%,#edf6ff_24%,#f3fbff_52%,#ebf7fb_78%,#f7fbff_100%)] text-slate-950"
          : "bg-[linear-gradient(180deg,#06152f_0%,#081a38_22%,#0b2146_52%,#0d1d3c_100%)] text-white"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isLightTheme
              ? "bg-[radial-gradient(circle_at_10%_16%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(59,130,246,0.14),transparent_24%),radial-gradient(circle_at_50%_62%,rgba(13,148,136,0.11),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06))]"
              : "bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_20%,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_52%_64%,rgba(20,184,166,0.08),transparent_30%),linear-gradient(180deg,rgba(8,23,58,0.10),rgba(4,10,24,0.42))]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isLightTheme ? "opacity-[0.18]" : "opacity-[0.10]"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,116,144,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.07) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        <div className="absolute left-[-16rem] top-[8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-300/16 blur-3xl" />
        <div className="absolute right-[-10rem] top-[24rem] h-[24rem] w-[24rem] rounded-full bg-blue-300/16 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-teal-300/12 blur-3xl" />
      </div>

      <section className={`relative overflow-hidden ${isLightTheme ? "bg-[#eef6ff]" : "bg-[#06152f]"}`}>
        <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />
      </section>

      <div className="relative z-10">
        {step === "intro" && (
          <AssessmentIntro
            heroTheme={heroTheme}
            profile={profile}
            onChange={updateProfile}
            onStart={() => setStep("questions")}
          />
        )}

        {step === "questions" && (
          <AssessmentQuestion
            heroTheme={heroTheme}
            question={currentQuestion}
            index={currentQuestionIndex}
            total={assessmentQuestions.length}
            categoryLabel={
              assessmentCategories[currentQuestion.category].label
            }
            selectedScore={answers[currentQuestion.id]}
            onSelect={selectAnswer}
            onNext={goNext}
            onPrevious={goPrevious}
          />
        )}

        {step === "results" && (
          <AssessmentResults
            heroTheme={heroTheme}
            profile={profile}
            overallScore={results.overallScore}
            categoryScores={results.categoryScores}
            readinessLevel={results.readinessLevel}
            weakestCategories={results.weakestCategories}
            onRestart={restartAssessment}
          />
        )}
      </div>

      <div className="relative z-10 mt-8">
        <Footer heroTheme={heroTheme} />
      </div>
    </main>
  );
}

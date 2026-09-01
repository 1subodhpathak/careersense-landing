import { useMemo, useState } from "react";
import PassportCover from "./PassportCover";
import PassportBooklet from "./PassportBooklet";
import { pipelinePhases } from "../../../data/careerGpsData";
import "./skill-passport.css";

export default function SkillPassport({ dashboardData, profile, user, atsResumes = [], coverLetters = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const journey = useMemo(() => {
    const certificates = dashboardData?.certifi?.certificates || profile?.certifications || [];
    const learningPaths = dashboardData?.certifi?.learningPaths || [];
    const assessment = dashboardData?.assessment;
    const events = [
      ...certificates.map((item) => ({ title: item.title || "Certificate earned", date: item.issuedAt || item.date || item.createdAt })),
      ...(assessment ? [{ title: "Career GPS completed", date: assessment.takenAt || assessment.createdAt }] : []),
      ...atsResumes.map((item) => ({ title: "ATS route checked", date: item.createdAt })),
      ...coverLetters.map((item) => ({ title: "Application prepared", date: item.createdAt })),
    ].filter((item) => item.date).sort((a, b) => new Date(b.date) - new Date(a.date));
    const ownerName = profile?.fullName || user?.fullName || "CareerSense Explorer";
    const initials = ownerName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    const identitySeed = user?.id || `${ownerName}-${profile?.email || "careersense"}`;
    const identityHash = Array.from(identitySeed).reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) >>> 0, 2166136261);
    const documentCode = identityHash.toString(36).toUpperCase().padStart(7, "0").slice(-7);
    const categoryScores = assessment?.results?.categoryScores || {};
    const completedPhases = assessment?.aiDiagnosis?.completedPhases || {};
    const gpsPhases = pipelinePhases.map((phase) => ({
      ...phase,
      score: completedPhases[phase.id] ? 100 : Math.round(categoryScores[phase.id] || 0),
      completed: Boolean(completedPhases[phase.id]),
    }));
    let partnerCompleted = 0;
    try {
      const partnerRecords = JSON.parse(localStorage.getItem("careersense-partner-assignments-v1")) || {};
      partnerCompleted = Object.values(partnerRecords).filter((entry) => entry?.status === "submitted").length;
    } catch (_) {}
    const profileFields = [profile?.fullName, profile?.email, profile?.phone, profile?.location, profile?.bio, profile?.currentJobTitle, profile?.targetJobTitle, profile?.avatar, profile?.linkedinPortfolio || profile?.githubUrl || profile?.websiteUrl, profile?.skills?.length];
    const profileCompleteness = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);
    const readinessScore = assessment?.results?.overallScore || 0;
    const achievementTotal = certificates.length + atsResumes.length + coverLetters.length + partnerCompleted;
    const explorerLevel = readinessScore >= 80 || achievementTotal >= 15 ? "Advanced Explorer" : readinessScore >= 50 || achievementTotal >= 6 ? "Skilled Explorer" : "Rising Explorer";
    return {
      ownerName, initials, certificates, learningPaths, atsResumes, coverLetters, events,
      avatar: profile?.avatar || user?.imageUrl,
      targetRole: profile?.targetJobTitle || assessment?.profile?.targetRole,
      currentRole: profile?.currentJobTitle,
      location: profile?.location,
      profileStatus: profile?.profileStatus,
      bio: profile?.bio,
      skills: profile?.skills || [], awards: profile?.awards || [], education: profile?.education || [],
      readinessScore: assessment?.results?.overallScore,
      readinessLabel: assessment?.results?.readinessLevel?.label,
      gpsPhases,
      gpsDiagnosis: assessment?.aiDiagnosis?.executiveSummary || assessment?.aiDiagnosis?.summary || assessment?.aiDiagnosis?.diagnosis,
      partnerCompleted,
      profileCompleteness,
      memberSince: user?.createdAt || user?.created_at || user?.externalAccounts?.[0]?.createdAt,
      nationality: profile?.nationality || "Global Learner",
      explorerLevel,
      usageLedger: dashboardData?.certifi?.usageLedger || [],
      experience: `${profile?.experienceYears || 0}y ${profile?.experienceMonths || 0}m`,
      documentCode,
      passportNumber: `CSP-${documentCode}`,
    };
  }, [dashboardData, profile, user, atsResumes, coverLetters]);

  const achievementCount = journey.certificates.length + journey.events.length + journey.awards.length + journey.education.length;
  return (
    <div className="skill-passport-stage">
      {!isOpen ? <div className="passport-cover-scene"><div className="passport-intro"><span>Your living career record</span><h2>Every milestone deserves a stamp.</h2><p>Open your CareerSense Skill Passport to travel through verified certificates, readiness progress, learning routes, and the achievements shaping your professional story.</p></div><PassportCover ownerName={journey.ownerName} achievementCount={achievementCount} onOpen={() => setIsOpen(true)} /></div> : <PassportBooklet journey={journey} spreadIndex={spreadIndex} onPrevious={() => setSpreadIndex((i) => Math.max(0, i - 1))} onNext={() => setSpreadIndex((i) => Math.min(journey.certificates.length + 1, i + 1))} onClose={() => { setIsOpen(false); setSpreadIndex(0); }} />}
    </div>
  );
}

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useHeroTheme from "../hooks/useHeroTheme";
import { elearningBySlug } from "../data/elearnings";

export default function ELearningPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const item = elearningBySlug[slug];
  if (!item) return <Navigate to="/dashboard?tab=E-Learning" replace />;
  const Course = item.component;
  function handleCourseNavigation(event) {
    const legacyBackLink = event.target.closest("main header a[href='/']");
    if (!legacyBackLink) return;
    event.preventDefault();
    navigate("/dashboard?tab=E-Learning");
  }

  return <main onClickCapture={handleCourseNavigation} className={`elearning-course-shell ${heroTheme === "light" ? "bg-slate-50" : "bg-slate-950"}`}><Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} /><Suspense fallback={<div className="flex min-h-[70vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-500" /></div>}><Course theme={heroTheme} /></Suspense><Footer heroTheme={heroTheme} /></main>;
}

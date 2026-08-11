import { Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useHeroTheme from "../hooks/useHeroTheme";
import { ebookBySlug } from "../data/ebooks";

export default function EbookReaderPage() {
  const { slug } = useParams();
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const item = ebookBySlug[slug];
  if (!item) return <Navigate to="/dashboard?tab=E-Learning" replace />;
  const isLight = heroTheme === "light";
  return <main className={`min-h-screen ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"}`}><Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} /><section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10"><Link to="/dashboard?tab=E-Learning" className={`inline-flex items-center gap-2 text-sm font-bold ${isLight ? "text-blue-700" : "text-cyan-300"}`}><ArrowLeft size={16} />Back to e-Learning</Link><div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600"><FileText size={14} />{item.format}</span><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{item.title}</h1><p className={`mt-2 max-w-2xl text-sm leading-6 ${isLight ? "text-slate-600" : "text-slate-300"}`}>{item.description}</p></div><a href={item.pdf} download className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/20"><Download size={17} />Download PDF</a></div><div className={`mt-8 overflow-hidden rounded-2xl border ${isLight ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-900"}`}><iframe src={item.pdf} title={item.title} className="h-[calc(100vh-190px)] min-h-[680px] w-full" /></div></section><Footer heroTheme={heroTheme} /></main>;
}

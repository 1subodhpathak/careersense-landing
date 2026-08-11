import { ArrowLeft, ArrowRight, BadgeCheck, BriefcaseBusiness, CalendarRange, Check, FileCheck2, GraduationCap, IdCard, Lightbulb, Network, ShieldCheck, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useHeroTheme from "../hooks/useHeroTheme";
import CSLogo from "../Assets/CSlogo.png";
import { partnerApplicationLink } from "../components/home/PartnerProgramSection";

const benefits = [
  [BriefcaseBusiness, "Real company contribution", "Work on relevant CareerSense initiatives instead of completing a simulated assignment."],
  [Users, "Leadership access", "Collaborate with the core team and receive direction from CareerSense leadership, including company CEOs when relevant to your work."],
  [IdCard, "Verified Partner identity", "Receive a profile-linked CareerSense Partner ID after selection and onboarding."],
  [FileCheck2, "Formal documentation", "Receive an offer letter at the start and a relieving letter after successful completion of the program."],
  [GraduationCap, "Learning and exposure", "Learn through selected resources, feedback, practical execution and cross-functional collaboration."],
  [Network, "Professional visibility", "Build relationships, a stronger body of work and evidence you can discuss in future applications."],
];

const journey = [
  ["1", "Apply", "Share your profile, interests, availability and the contribution areas that fit your strengths."],
  ["2", "Profile review", "The CareerSense team evaluates current program needs, profile fit and readiness."],
  ["3", "Conversation", "Shortlisted applicants discuss expectations, working style and possible contribution tracks."],
  ["4", "Onboarding", "Selected Partners receive their offer letter, Partner ID, program expectations and initial priorities."],
  ["5", "Six-month contribution", "Complete mutually agreed work, communicate progress and build practical experience."],
  ["6", "Successful completion", "Eligible Partners receive a relieving letter and may be considered for recognition or future opportunities."],
];

export default function PartnerProgramPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const isLight = heroTheme === "light";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  
  return (
    <main className={`min-h-screen font-sans transition-colors duration-300 ${isLight ? "bg-slate-50 text-[#071a38]" : "bg-[#041024] text-slate-100"}`}>
      <section className={isLight ? "bg-[#eef6ff]" : "bg-[#041024]"}>
        <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />
      </section>

      {/* Hero Section - Clean, High Contrast, Professional */}
      <section className={`relative overflow-hidden px-6 py-16 transition-colors duration-300 sm:py-24 ${isLight ? "bg-[#eaf5ff] text-[#071a38]" : "bg-[#071a38] text-white"}`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#2dd4bf 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_.8fr]">
          <div className="z-10">
            <Link to="/" className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors ${isLight ? "text-teal-700 hover:text-slate-950" : "text-teal-400 hover:text-white"}`}>
              <ArrowLeft size={16} /> Back to CareerSense
            </Link>
            
            <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.15em] text-teal-400/80">
              Six-month professional program
            </p>
            
            <h1 className="mt-4 max-w-4xl text-[38px] font-extrabold leading-[1.1] tracking-tight sm:text-[46px] lg:text-[54px]">
              Build with CareerSense. <br className="hidden lg:block"/>Learn how a company grows.
            </h1>
            
            <p className={`mt-6 max-w-xl text-[16px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              The CareerSense Partner Program gives selected students and professionals a structured way to contribute to real work, learn alongside the leadership team and build documented professional experience.
            </p>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={partnerApplicationLink} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-8 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-105">
                Apply for the Partner Program <ArrowRight size={18} />
              </a>
              <a href="#how-it-works" className={`inline-flex min-h-[50px] items-center justify-center rounded-xl border px-8 text-[15px] font-semibold transition-all ${isLight ? "border-slate-300 bg-white/70 text-slate-800 hover:bg-white" : "border-slate-600 bg-transparent text-white hover:bg-white/5"}`}>
                See how it works
              </a>
            </div>
          </div>
          
          {/* Refined Stats Card - Solid, structured, no messy blurs */}
          <div className={`relative z-10 rounded-[24px] border p-8 shadow-2xl transition-colors ${isLight ? "border-slate-200 bg-white" : "border-slate-700 bg-[#0a1f42]"}`}>
            <div className={`flex items-center justify-between border-b pb-5 ${isLight ? "border-slate-200" : "border-slate-700"}`}>
              <img src={CSLogo} alt="CareerSense" className={`h-9 w-auto ${isLight ? "" : "brightness-0 invert"}`} />
              <span className={`rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${isLight ? "bg-teal-50 text-teal-700" : "bg-teal-900/50 text-teal-300"}`}>
                Partner Program
              </span>
            </div>
            
            <div className="mt-6 grid gap-2">
              {[
                [CalendarRange, "Duration", "6 months"],
                [ShieldCheck, "Format", "Flexible & outcome-focused"],
                [Users, "Collaboration", "Core team & leadership"],
                [BadgeCheck, "Completion", "Relieving letter (on success)"]
              ].map(([Icon, label, value]) => (
                <div key={label} className={`flex items-start gap-4 rounded-xl p-3 transition ${isLight ? "hover:bg-slate-50" : "hover:bg-white/5"}`}>
                  <span className="mt-0.5 flex shrink-0 text-teal-400">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className={`text-[12px] font-semibold ${isLight ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
                    <p className={`mt-0.5 text-[14px] font-medium ${isLight ? "text-slate-800" : "text-slate-100"}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started It - Clean editorial layout */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-teal-700">The Context</p>
            <h2 className={`mt-3 text-[30px] font-bold leading-tight tracking-tight sm:text-[36px] ${isLight ? "text-[#071a38]" : "text-white"}`}>
              Experience should be built through contribution, not claimed through attendance.
            </h2>
          </div>
          <div className={`flex flex-col gap-6 text-[16px] leading-relaxed lg:pt-8 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
            <p>
              Many capable students and early professionals struggle to demonstrate how they work inside a real company. Courses teach knowledge, but they rarely show how priorities change, teams collaborate, feedback improves work or products reach users.
            </p>
            <p>
              We created the Partner Program to close that gap. Partners get visibility into how CareerSense is built and improved while contributing within areas that suit their skills. The program is designed around mutual expectations, responsible access and useful outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* What You Gain - Sharp, corporate cards */}
      <section className={`border-t px-6 py-20 transition-colors sm:py-24 ${isLight ? "border-slate-200 bg-white" : "border-slate-800 bg-[#071a38]"}`}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-teal-700">What you gain</p>
            <h2 className={`mt-3 text-[30px] font-bold tracking-tight sm:text-[36px] ${isLight ? "text-[#071a38]" : "text-white"}`}>
              A credible six-month professional journey.
            </h2>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([Icon, title, copy]) => (
              <article key={title} className={`rounded-2xl border p-7 transition-shadow hover:shadow-md ${isLight ? "border-slate-200 bg-slate-50" : "border-slate-700 bg-[#0a1f42]"}`}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-teal-500 shadow-sm border ${isLight ? "border-slate-200 bg-white" : "border-slate-700 bg-white/5"}`}>
                  <Icon size={22} />
                </span>
                <h3 className={`mt-6 text-[17px] font-bold ${isLight ? "text-[#071a38]" : "text-white"}`}>{title}</h3>
                <p className={`mt-2 text-[14.5px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join - Streamlined process list */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-teal-700">How to join</p>
            <h2 className={`mt-3 text-[30px] font-bold leading-tight tracking-tight sm:text-[36px] ${isLight ? "text-[#071a38]" : "text-white"}`}>
              From application to completion.
            </h2>
            <p className={`mt-4 text-[15px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Selection is not automatic. It depends on profile fit, availability, responsible conduct and current CareerSense requirements.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {journey.map(([number, title, copy]) => (
              <div key={number} className={`rounded-2xl border p-6 shadow-sm ${isLight ? "border-slate-200 bg-white" : "border-slate-700 bg-[#0a1f42]"}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-[13px] font-bold text-teal-800">
                    {number}
                  </span>
                  <h3 className={`text-[16px] font-bold ${isLight ? "text-[#071a38]" : "text-white"}`}>{title}</h3>
                </div>
                <p className={`mt-3 text-[14px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Container - Minimalist and authoritative */}
      <section className="px-6 pb-24">
        <div className={`mx-auto max-w-7xl overflow-hidden rounded-[24px] border p-10 transition-colors sm:p-14 ${isLight ? "border-slate-200 bg-white shadow-xl" : "border-slate-800 bg-[#071a38]"}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-teal-400">
                Ready to contribute?
              </p>
              <h2 className={`mt-3 text-[28px] font-bold leading-tight sm:text-[36px] ${isLight ? "text-[#071a38]" : "text-white"}`}>
                Start your CareerSense application.
              </h2>
              <p className={`mt-4 max-w-2xl text-[16px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                Tell us what you can contribute, what you want to learn and how much time you can commit during the six-month program.
              </p>
            </div>
            
            <a href={partnerApplicationLink} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-8 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-105">
              Apply Now <ArrowRight size={18} />
            </a>
          </div>
          
          <div className={`mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t pt-8 text-[13px] font-medium ${isLight ? "border-slate-200 text-slate-600" : "border-slate-700 text-slate-300"}`}>
            {["Offer letter after selection", "Verified Partner ID after onboarding", "Relieving letter after successful completion"].map(item => (
              <span key={item} className="inline-flex items-center gap-2.5">
                <Check size={16} className="text-teal-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      <Footer heroTheme={heroTheme} />
    </main>
  );
}

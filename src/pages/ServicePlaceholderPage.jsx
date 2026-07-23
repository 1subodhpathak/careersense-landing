import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { platformFeatures } from "../data/homePageData";

export default function ServicePlaceholderPage() {
  const location = useLocation();
  const feature = platformFeatures.find(({ href }) => href === location.pathname);

  const title = feature?.title ?? "CareerSense Service";
  const description =
    feature?.description ??
    "This CareerSense experience is being built and will be connected here soon.";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#06152f_0%,#0b1f46_38%,#f3f8ff_38%,#f8fbff_100%)] text-slate-950">
      <section className="relative overflow-hidden bg-[#06152f]">
        <Navbar />
        <div className="mx-auto max-w-[1320px] px-5 pb-20 pt-10 sm:px-6">
          <Link
            to="/#platform-features"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mt-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-gradient-to-r from-cyan-400/18 via-teal-400/14 to-blue-400/18 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-300/15 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
              Coming Soon
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-[1000px] rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(239,247,255,0.88))] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            This experience is on the way
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
            We have kept the route ready for {title}, and the full product flow can
            plug in here cleanly when it is ready to launch.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#06b6d4,#2563eb)] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_34px_rgba(37,99,235,0.24)] transition hover:brightness-110"
            >
              Open Dashboard
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

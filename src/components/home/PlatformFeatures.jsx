import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { platformFeatures } from "../../data/homePageData";
import heroGraduates from "../../Assets/services.png";

export default function PlatformFeatures({ heroTheme = "dark" }) {
  const isLightTheme = heroTheme === "light";

  const cardStyles = [
    "border-teal-300/30 bg-teal-400/10",
    "border-orange-300/30 bg-orange-400/10",
    "border-blue-300/30 bg-blue-400/10",
    "border-violet-300/30 bg-violet-400/10",
    "border-emerald-300/30 bg-emerald-400/10",
  ];

  return (
    <section
      id="platform-features"
      className={`relative overflow-hidden px-5 py-10 sm:px-6 lg:py-16 ${
        isLightTheme ? "bg-[#dfeefe]" : "bg-[#020B1D]"
      }`}
    >
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
          isLightTheme ? "scale-150 opacity-90 blur-[5px]" : "opacity-95"
        }`}
        style={{ backgroundImage: `url(${heroGraduates})` }}
      />

      <div
        className={`absolute inset-0 ${
          isLightTheme
            ? "bg-gradient-to-b from-[#f6fbff]/97 via-[#eef7ff]/95 to-[#e2f0ff]/94"
            : "bg-gradient-to-b from-[#020B1D]/90 via-[#061638]/88 to-[#020B1D]/96"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isLightTheme
            ? "bg-gradient-to-r from-[#f4f9ff]/96 via-[#edf6ff]/86 to-[#e3f1ff]/94"
            : "bg-gradient-to-r from-[#020B1D]/95 via-[#061638]/80 to-[#020B1D]/22"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isLightTheme
            ? "bg-[radial-gradient(circle_at_50%_99%,rgba(255,255,255,0.92),transparent_99%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.52),transparent_99%),radial-gradient(circle_at_99%_99%,rgba(223,240,255,0.46),transparent_99%)]"
            : "bg-transparent"
        }`}
      />

      {/* Tech grid */}
      

      <div className="relative mx-auto max-w-[1500px]">

        <div className="mx-auto max-w-4xl text-center">
          

          <h2
            className={`mt-5 text-[34px] font-black leading-tight tracking-tight md:text-[30px] ${
              isLightTheme ? "text-slate-950" : "text-white"
            }`}
          >
            Powerful AI Tools to{" "}
            <span
              className={
                isLightTheme
                  ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent"
              }
            >
              Advance Your Career
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-1xl text-[15px] leading-7 ${
              isLightTheme ? "text-slate-700" : "text-slate-300"
            }`}
          >
            Improve your resume, prepare for interviews, match job descriptions, and build stronger career confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {platformFeatures.map(({ title, description, href }, index) => (
            <article
              key={title}
              className={`group flex flex-col rounded-[28px] border p-6 text-left shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12] ${cardStyles[index % cardStyles.length]}`}
            >
              <h3
                className={`text-[20px] leading-tight tracking-tight ${
                  isLightTheme ? "text-slate-950" : "text-white"
                }`}
              >
                {title}
              </h3>

              <p
                className={`mt-3 text-[12px] leading-7 ${
                  isLightTheme ? "text-slate-700" : "text-slate-300"
                }`}
              >
                {description}
              </p>

              <div className="mt-auto pt-5">
                <div
                  className={`h-px w-full ${
                    isLightTheme
                      ? "bg-gradient-to-r from-slate-900/22 via-slate-700/10 to-transparent"
                      : "bg-gradient-to-r from-white/40 via-white/15 to-transparent"
                  }`}
                />
                <div className="mt-4 flex justify-end">
                  <Link
                    to={href}
                    aria-label={`Open ${title}`}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
                      isLightTheme
                        ? "border border-slate-900/18 bg-white/18 text-slate-800 hover:border-blue-500/30 hover:bg-white/30 hover:text-blue-700"
                        : "border border-white/20 bg-white/10 text-white hover:border-cyan-300/40 hover:bg-white/16 hover:text-cyan-200"
                    }`}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

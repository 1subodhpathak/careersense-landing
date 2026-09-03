import React from "react";
import coinsSvg from "../../Assets/partnerProgram/icons2/coins.svg";
import workspaceSvg from "../../Assets/partnerProgram/icons2/workspace.svg";
import partnerIdSvg from "../../Assets/partnerProgram/icons2/partner-id.svg";
import offerLetterSvg from "../../Assets/partnerProgram/icons2/offer-letter.svg";
import bookSvg from "../../Assets/partnerProgram/icons2/book.svg";
import recognitionSvg from "../../Assets/partnerProgram/icons2/recognition.svg";

export default function WhatsIncludedSection({ isDark = false }) {
  const items = [
    {
      title: "500,000 Credits / Month",
      description: "Use across CareerSense platform during your active partner term.",
      svg: coinsSvg,
    },
    {
      title: "Partner Workspace",
      description: "Expanded access for approved assignments and collaboration.",
      svg: workspaceSvg,
    },
    {
      title: "Partner ID Card",
      description: "Official, profile-linked CareerSense Partner identity.",
      svg: partnerIdSvg,
    },
    {
      title: "Offer & Letter",
      description: "Offer & Engagement Letter issued after successful onboarding.",
      svg: offerLetterSvg,
    },
    {
      title: "Partner Learning Library",
      description: "Access to handbooks, guides and resources mapped to assignments.",
      svg: bookSvg,
    },
    {
      title: "Completion Recognition",
      description: "Certificate and completion letter on meeting all requirements.",
      svg: recognitionSvg,
    },
  ];

  return (
    <section className={`py-8 sm:py-10 transition-colors duration-300 ${isDark ? "bg-[#041024] text-white" : "bg-white text-slate-800"}`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            What's <span className="text-[#0EA8B9]">Included</span>
          </h2>
        </div>

        {/* All 6 feature boxes in 1 single line on desktop */}
        <div className="mt-10 grid gap-3 sm:gap-3.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.title}
              className={`group flex flex-col items-center text-center rounded-2xl border p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA8B9]/60 hover:shadow-lg ${
                isDark
                  ? "border-slate-800 bg-[#0A2647]/90 text-white"
                  : "border-slate-200/80 bg-white text-slate-800"
              }`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl p-2.5 mb-3 transition-transform group-hover:scale-105 ${
                isDark
                  ? "bg-[#0EA8B9]/20 border border-cyan-500/30"
                  : "bg-[#F0FDFB] border border-cyan-100"
              }`}>
                <img
                  src={item.svg}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className={`text-[12.5px] font-extrabold leading-snug transition-colors ${
                isDark ? "text-white group-hover:text-[#0EA8B9]" : "text-slate-900 group-hover:text-[#0EA8B9]"
              }`}>
                {item.title}
              </h3>
              <p className={`mt-1.5 text-[10.5px] font-medium leading-tight ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

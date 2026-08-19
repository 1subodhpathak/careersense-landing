import React from "react";
import partnerIdImg from "../../Assets/partnerProgram/Partner ID.png";
import offerLetterImg from "../../Assets/partnerProgram/Offer Letter.png";
import weeklyAssignmentsImg from "../../Assets/partnerProgram/Weekly Assignments.png";
import mentorshipImg from "../../Assets/partnerProgram/Mentorship.png";
import startupExpImg from "../../Assets/partnerProgram/Startup_Experience.png";
import rewardsImg from "../../Assets/partnerProgram/Rewards.png";
import certificateImg from "../../Assets/partnerProgram/Certificate.png";

export default function WhyJoinSection({ isDark = false }) {
  const cards = [
    {
      title: "Verified Partner ID",
      description: "Get your official partner ID and build your profile with credibility.",
      img: partnerIdImg,
    },
    {
      title: "Offer Letter",
      description: "Receive an official offer letter recognizing your role and contribution.",
      img: offerLetterImg,
    },
    {
      title: "Weekly Assignments",
      description: "Work on real tasks every week and build your portfolio.",
      img: weeklyAssignmentsImg,
    },
    {
      title: "Mentorship",
      description: "Learn directly from founders and industry professionals.",
      img: mentorshipImg,
    },
    {
      title: "Real Startup Experience",
      description: "Work on live projects inside a fast-growing startup.",
      img: startupExpImg,
    },
    {
      title: "Performance Rewards",
      description: "Earn rewards, bonuses and top performer recognition.",
      img: rewardsImg,
    },
    {
      title: "Certificate & Letter",
      description: "Get a completion certificate and relieving letter.",
      img: certificateImg,
    },
  ];

  return (
    <section className={`py-14 sm:py-16 transition-colors duration-300 ${isDark ? "bg-[#041024] text-white" : "bg-white text-slate-800"}`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Why Join the <span className="text-[#0EA8B9]">CareerSense Partner Program?</span>
          </h2>
        </div>

        {/* All 7 pointer boxes in one single line on desktop */}
        <div className="mt-10 grid gap-3 sm:gap-3.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`group flex flex-col items-center text-center rounded-2xl border p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA8B9]/60 hover:shadow-lg ${
                isDark
                  ? "border-slate-800 bg-[#0A2647]/90 text-white"
                  : "border-slate-200/80 bg-white text-slate-800"
              }`}
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 mb-3 transition-transform group-hover:scale-105">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className={`text-[12.5px] font-extrabold leading-snug transition-colors ${
                isDark ? "text-white group-hover:text-[#0EA8B9]" : "text-slate-900 group-hover:text-[#0EA8B9]"
              }`}>
                {card.title}
              </h3>
              <p className={`mt-1.5 text-[10.5px] font-medium leading-tight ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

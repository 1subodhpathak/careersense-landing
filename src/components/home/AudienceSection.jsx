import { Link } from "react-router-dom";
import { audiences } from "../../data/homePageData";

import FresherImg from "../../Assets/Fresher.png";
import JobImg from "../../Assets/Job.png";
import WorkingImg from "../../Assets/Working.png";
import CollegeImg from "../../Assets/College.png";

import studentsIcon from "../../Assets/Icons/students.svg";
import jobIcon from "../../Assets/Icons/job.svg";
import workingIcon from "../../Assets/Icons/working.svg";
import collegeIcon from "../../Assets/Icons/college.svg";

const audienceIcons = [
  studentsIcon,
  jobIcon,
  workingIcon,
  collegeIcon,
];

const audienceStyles = [
  {
    image: FresherImg,
    iconBg: "bg-teal-50",
    line: "bg-teal-500",
    imagePosition: "object-center",
    glow: "bg-teal-200/45",
  },
  {
    image: JobImg,
    iconBg: "bg-orange-50",
    line: "bg-orange-500",
    imagePosition: "object-center",
    glow: "bg-orange-200/45",
  },
  {
    image: WorkingImg,
    iconBg: "bg-violet-50",
    line: "bg-violet-500",
    imagePosition: "object-center",
    glow: "bg-violet-200/45",
  },
  {
    image: CollegeImg,
    iconBg: "bg-blue-50",
    line: "bg-blue-500",
    imagePosition: "object-center",
    glow: "bg-blue-200/45",
  },
];

export default function AudienceSection() {
  return (
    <section className="relative px-5 py-14 sm:px-6">
      <div className="relative mx-auto max-w-[1320px]">
        <div className="text-center">
          <h2 className="text-[34px] font-black leading-tight tracking-tight text-slate-950 md:text-[35px]">
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
              Every Career Stage
            </span>
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-teal-500 to-cyan-500" />
            <div className="h-2 w-2 rounded-full bg-teal-500" />
            <div className="h-2 w-2 rounded-full bg-cyan-600" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ title, description }, index) => {
            const style = audienceStyles[index] || audienceStyles[0];
            const icon = audienceIcons[index] || audienceIcons[0];

            return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-[28px] bg-white p-3 text-left shadow-[0_22px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
              >
                <div className="relative overflow-hidden rounded-[20px]">
                  <img
                    src={style.image}
                    alt={title}
                    className={`h-[190px] w-full ${style.imagePosition} object-cover transition duration-500 group-hover:scale-105`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />
                </div>

                <div
                  className={`absolute left-7 top-[165px] flex h-[66px] w-[66px] items-center justify-center rounded-full ${style.iconBg} shadow-[0_12px_30px_rgba(15,23,42,0.10)] ring-[10px] ring-white transition-all duration-300 group-hover:scale-105`}
                >
                  <div
                    className={`pointer-events-none absolute inset-2 rounded-full ${style.glow} blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative z-10 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white/90 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="px-4 pb-6 pt-12">
                  <h3 className="text-[22px] font-black leading-tight tracking-tight text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 min-h-[96px] text-[15px] font-medium leading-7 text-slate-600">
                    {description}
                  </p>

                  <div className={`mt-6 h-1 w-full rounded-full ${style.line}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

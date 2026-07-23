"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, MousePointer2 } from "lucide-react";
import { steps } from "../../data/homePageData";

import uploadResumeIcon from "../../Assets/Icons/upload-resume.svg";
import targetRoleIcon from "../../Assets/Icons/target-role.svg";
import aiToolsIcon from "../../Assets/Icons/ai-tools.svg";
import reportIcon from "../../Assets/Icons/report.svg";
import confidenceIcon from "../../Assets/Icons/confidence.svg";
import coverageBg from "../../Assets/Testimony.png";

const stepIcons = [
  uploadResumeIcon,
  targetRoleIcon,
  aiToolsIcon,
  reportIcon,
  confidenceIcon,
];

const stepStyles = [
  {
    text: "text-cyan-500",
    ring: "ring-cyan-100",
    bg: "bg-cyan-50",
    line: "bg-cyan-500",
    glow: "shadow-cyan-300/60",
    cursor: "text-cyan-600",
    iconGlow: "bg-cyan-200/50",
  },
  {
    text: "text-orange-500",
    ring: "ring-orange-100",
    bg: "bg-orange-50",
    line: "bg-orange-500",
    glow: "shadow-orange-300/60",
    cursor: "text-orange-600",
    iconGlow: "bg-orange-200/50",
  },
  {
    text: "text-violet-500",
    ring: "ring-violet-100",
    bg: "bg-violet-50",
    line: "bg-violet-500",
    glow: "shadow-violet-300/60",
    cursor: "text-violet-600",
    iconGlow: "bg-violet-200/50",
  },
  {
    text: "text-blue-500",
    ring: "ring-blue-100",
    bg: "bg-blue-50",
    line: "bg-blue-500",
    glow: "shadow-blue-300/60",
    cursor: "text-blue-600",
    iconGlow: "bg-blue-200/50",
  },
  {
    text: "text-emerald-500",
    ring: "ring-emerald-100",
    bg: "bg-emerald-50",
    line: "bg-emerald-500",
    glow: "shadow-emerald-300/60",
    cursor: "text-emerald-600",
    iconGlow: "bg-emerald-200/50",
  },
];

function useInViewOnce() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useJourneyAnimation(isVisible, totalSteps) {
  const [cursorStep, setCursorStep] = useState(0);
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    if (!isVisible || totalSteps <= 0) return undefined;

    let isMounted = true;
    const timers = [];

    const moveDelay = 1450;
    const revealDelay = 620;
    const restartPause = 1500;

    const addTimer = (callback, delay) => {
      const timer = setTimeout(() => {
        if (isMounted) callback();
      }, delay);

      timers.push(timer);
    };

    const runJourney = () => {
      if (!isMounted) return;

      setCursorStep(0);
      setVisibleStep(0);

      for (let index = 1; index < totalSteps; index += 1) {
        addTimer(() => {
          setCursorStep(index);
        }, index * moveDelay);

        addTimer(() => {
          setVisibleStep(index);
        }, index * moveDelay + revealDelay);
      }

      addTimer(() => {
        runJourney();
      }, totalSteps * moveDelay + revealDelay + restartPause);
    };

    runJourney();

    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
    };
  }, [isVisible, totalSteps]);

  return { cursorStep, visibleStep };
}

export default function HowItWorksSection({ heroTheme = "dark" }) {
  const { ref, isVisible } = useInViewOnce();
  const isLightTheme = heroTheme === "light";

  const { cursorStep, visibleStep } = useJourneyAnimation(
    isVisible,
    steps.length
  );

  const progressPercent =
    steps.length > 1 ? (cursorStep / (steps.length - 1)) * 100 : 0;

  const activeCursorStyle =
    stepStyles[cursorStep] || stepStyles[stepStyles.length - 1];

  return (
    <section
      id="how-it-works"
      className={`relative overflow-hidden px-5 py-20 sm:px-6 ${
        isLightTheme ? "bg-[#e9f3ff]" : "bg-slate-950"
      }`}
    >
      <style>
        {`
          @keyframes csBlobFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(22px, -18px, 0) scale(1.08);
            }
          }

          @keyframes csIconFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes csArrowMove {
            0%, 100% {
              transform: translateX(0);
              opacity: 0.55;
            }
            50% {
              transform: translateX(7px);
              opacity: 1;
            }
          }

          @keyframes csPulseRing {
            0% {
              transform: scale(0.9);
              opacity: 0.42;
            }
            70% {
              transform: scale(1.28);
              opacity: 0;
            }
            100% {
              transform: scale(1.28);
              opacity: 0;
            }
          }

          @keyframes csOrbit {
            from {
              transform: rotate(0deg) translateX(48px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(48px) rotate(-360deg);
            }
          }

          @keyframes csCursorTap {
            0%, 100% {
              transform: translate(-2px, -2px) rotate(-10deg) scale(1);
            }
            50% {
              transform: translate(-2px, -2px) rotate(-10deg) scale(1.06);
            }
          }

          @keyframes csDotFloat {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.35;
            }
            50% {
              transform: translateY(-12px);
              opacity: 0.8;
            }
          }

          @keyframes csIconShine {
            0% {
              transform: translateX(-160%) rotate(18deg);
            }
            100% {
              transform: translateX(260%) rotate(18deg);
            }
          }
        `}
      </style>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px] ${
            isLightTheme ? "opacity-30 brightness-[1.18] saturate-[0.88]" : "opacity-2 mix-blend-luminosity"
          }`}
          style={{ backgroundImage: `url(${coverageBg})` }}
        />
        <div
          className={`absolute inset-0 ${
            isLightTheme
              ? "bg-[linear-gradient(90deg,rgba(237,246,255,0.72)_0%,rgba(229,242,255,0.56)_36%,rgba(223,238,255,0.34)_68%,rgba(223,238,255,0.48)_100%)]"
              : "bg-slate-950/80 mix-blend-multiply"
          }`}
        />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-[1320px] text-center">
        <h2
          className={`text-[38px] font-black leading-tight tracking-tight transition-all duration-700 md:text-[34px] ${
            isLightTheme ? "text-slate-950" : "text-white"
          } ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          How{" "}
          <span
            className={
              isLightTheme
                ? "bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent"
            }
          >
            CareerSense
          </span>{" "}
          Works
        </h2>

        <p
          className={`mx-auto mt-3 max-w-xl text-[14px] leading-7 transition-all delay-150 duration-700 ${
            isLightTheme ? "text-slate-600" : "text-slate-300"
          } ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          Your AI-powered career upgrade in five simple steps.
        </p>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-7">
          <div
            className="pointer-events-none absolute top-[156px] z-50 hidden transition-all duration-700 ease-out lg:block"
            style={{
              left: isVisible
                ? `calc(8% + ${progressPercent * 0.84}%)`
                : "8%",
              transform: "translateX(-10%)",
            }}
          >
            <MousePointer2
              size={24}
              className={`${activeCursorStyle.cursor} opacity-75 drop-shadow-sm [animation:csCursorTap_1s_ease-in-out_infinite]`}
              strokeWidth={2}
            />
          </div>

          {steps.map(({ title, description }, index) => {
            const style = stepStyles[index] || stepStyles[0];
            const icon = stepIcons[index] || stepIcons[0];

            const isActive = cursorStep === index;
            const isVisibleCard = index <= visibleStep;
            const isCompleted = index < visibleStep;

            return (
              <div
                key={title}
                className={`group relative overflow-visible bg-transparent px-4 py-4 text-center transition-all duration-700 ease-out hover:-translate-y-2 ${
                  isVisibleCard
                    ? isActive
                      ? "-translate-y-3 scale-100 opacity-100 blur-0"
                      : "translate-y-0 scale-100 opacity-100 blur-0"
                    : "pointer-events-none translate-y-8 scale-95 opacity-0 blur-sm"
                }`}
                style={{
                  transitionDelay: isVisibleCard ? `${index * 90}ms` : "0ms",
                }}
              >
                {index !== steps.length - 1 && isVisibleCard && (
                  <div
                    className={`absolute right-[-22px] top-[61px] z-40 hidden items-center justify-center bg-transparent lg:flex ${
                      isActive
                        ? "[animation:csArrowMove_0.9s_ease-in-out_infinite]"
                        : ""
                    }`}
                  >
                    <ChevronRight
                      size={24}
                      strokeWidth={2.4}
                      className={`${style.text} drop-shadow-sm`}
                    />
                  </div>
                )}

                <div
                  className={`relative z-10 mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ${style.bg} ring-8 ${style.ring} transition-all duration-500 [animation:csIconFloat_3.2s_ease-in-out_infinite] ${
                    isActive
                      ? `scale-110 shadow-2xl ${style.glow}`
                      : "shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                  }`}
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <span
                    className={`absolute inset-0 rounded-full ${style.bg} ${
                      isActive
                        ? "[animation:csPulseRing_1.5s_ease-out_infinite]"
                        : ""
                    }`}
                  />

                  <span
                    className={`pointer-events-none absolute inset-3 rounded-full ${style.iconGlow} blur-xl transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  />

                  <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-white/90 shadow-[0_14px_35px_rgba(15,23,42,0.1)] ring-1 ring-white backdrop-blur-xl">
                    <span
                      className={`pointer-events-none absolute -left-8 top-0 h-full w-5 bg-white/70 blur-md ${
                        isActive
                          ? "[animation:csIconShine_1.8s_ease-in-out_infinite]"
                          : ""
                      }`}
                    />

                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className={`relative z-10 h-[50px] w-[50px] object-contain transition-transform duration-500 ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {isActive && (
                    <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(59,130,246,0.7)] [animation:csOrbit_3s_linear_infinite]" />
                  )}
                </div>

                <div
                  className={`relative z-10 mx-auto mt-7 min-h-[42px] max-w-[15ch] text-[18px] font-medium leading-snug transition-all duration-500 ${
                    isLightTheme ? "text-slate-800" : "text-white"
                  } ${
                    isActive ? "scale-105" : ""
                  }`}
                >
                  {title}
                </div>

                <p
                  className={`relative z-10 mx-auto mt-5 max-w-[25ch] text-[15px] font-medium leading-7 ${
                    isLightTheme ? "text-slate-500" : "text-slate-300"
                  }`}
                >
                  {description}
                </p>

                <div
                  className={`relative z-10 mx-auto mt-7 h-1 rounded-full transition-all duration-500 ${style.line} ${
                    isActive ? "w-20" : "w-14"
                  }`}
                />

                {isCompleted && (
                  <div className="absolute right-6 top-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

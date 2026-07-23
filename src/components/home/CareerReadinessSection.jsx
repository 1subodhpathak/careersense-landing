import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbulb } from "lucide-react";
import { readinessMetrics } from "../../data/homePageData";

const metricRingColors = [
  "#059669",
  "#059669",
  "#2563eb",
  "#2563eb",
  "#f97316",
  "#059669",
];

function getNumber(value) {
  if (typeof value === "number") return value;
  return Number(String(value).replace("%", "").trim()) || 0;
}

function useInViewOnce() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

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

function useAutoRefresh(isActive, delay = 10000) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, delay);

    return () => clearInterval(interval);
  }, [isActive, delay]);

  return refreshKey;
}

function useAnimatedNumber(target, isActive, refreshKey, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let frameId;
    const startTime = performance.now();

    setValue(0);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target, isActive, refreshKey, duration]);

  return value;
}

function AnimatedCircularScore({ score, color, textClass, isActive, refreshKey }) {
  const animatedScore = useAnimatedNumber(score, isActive, refreshKey, 1400);

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(${color} ${
        animatedScore * 3.6
      }deg, #e2e8f0 0deg)`,
    }),
    [animatedScore, color]
  );

  return (
    <div
      className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full p-[6px] transition-all duration-700 ease-out"
      style={ringStyle}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-inner">
        <span className={`text-[18px] font-extrabold ${textClass}`}>
          {animatedScore}%
        </span>
      </div>
    </div>
  );
}

function AnimatedScoreCard({ isActive, refreshKey }) {
  const animatedScore = useAnimatedNumber(78, isActive, refreshKey, 1500);
  const animatedImprovement = useAnimatedNumber(12, isActive, refreshKey, 1300);

  return (
    <div className="rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(237,246,255,0.86))] p-6 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <p className="text-[12px] font-bold text-slate-600">
        Career Readiness Score
      </p>

      <div className="mt-4 text-[38px] font-bold leading-none text-blue-800">
        {animatedScore}%
      </div>

      <p className="mt-2 text-[28px] font-bold text-blue-500">Good</p>

      <p className="mt-5 text-[12px] font-semibold text-emerald-600">
        ↑ {animatedImprovement}% improvement this month
      </p>
    </div>
  );
}

export default function CareerReadinessSection() {
  const { ref, isVisible } = useInViewOnce();
  const refreshKey = useAutoRefresh(isVisible, 10000);

  return (
    <section
      id="career-readiness"
      className="relative px-5 py-8 sm:px-6"
    >
      <div ref={ref} className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <h2 className="mt-5 text-[34px] font-black leading-tight tracking-tight text-Black md:text-[30px]">
            Know Exactly{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
              Where You Stand
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-1xl text-[14px] leading-7 text-slate-600">
            CareerSense combines your resume quality, ATS match, interview
            readiness, and skill strength into one career readiness score.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[230px_1fr]">
          <AnimatedScoreCard isActive={isVisible} refreshKey={refreshKey} />

          <div className="rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,248,255,0.84))] p-5 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {readinessMetrics.map((metric, index) => {
                const score = getNumber(metric.score);
                const ringColor = metricRingColors[index] || "#2563eb";

                return (
                  <div
                    key={metric.label}
                    className="rounded-[18px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(243,248,255,0.9))] p-4 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                  >
                    <p className="text-[11px] font-bold text-slate-500">
                      {metric.label}
                    </p>

                    <AnimatedCircularScore
                      score={score}
                      color={ringColor}
                      textClass={metric.color}
                      isActive={isVisible}
                      refreshKey={refreshKey}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-[18px] border border-blue-100 bg-[linear-gradient(135deg,rgba(224,242,255,0.9),rgba(232,244,255,0.82))] p-3 text-[13px] font-medium text-blue-900">
              <Lightbulb className="h-4 w-4 flex-none text-blue-600" />
              <p>
                Improve ATS keywords, complete one certification, and practice
                two interview rounds to boost your score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

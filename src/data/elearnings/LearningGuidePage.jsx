import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  FileText,
  Lock,
  MonitorPlay,
  Play,
  X,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const dsLogoVideo = "/CareerSense.mp4";

function getTheme(theme, accent) {
  const value = String(theme).toLowerCase();
  const isLight = ["light", "day", "white"].includes(value);

  const accentMap = {
    blue: {
      main: "blue",
      text: "text-blue-600",
      lightText: "text-blue-700",
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      softBg: "bg-blue-50",
      darkSoftBg: "bg-blue-500/10",
      ring: "border-blue-200",
      darkRing: "border-blue-400/20",
      shadow: "rgba(37,99,235,0.75)",
    },
    violet: {
      main: "violet",
      text: "text-violet-600",
      lightText: "text-violet-700",
      bg: "bg-violet-600",
      hover: "hover:bg-violet-700",
      softBg: "bg-violet-50",
      darkSoftBg: "bg-violet-500/10",
      ring: "border-violet-200",
      darkRing: "border-violet-400/20",
      shadow: "rgba(124,58,237,0.75)",
    },
    emerald: {
      main: "emerald",
      text: "text-emerald-600",
      lightText: "text-emerald-700",
      bg: "bg-emerald-600",
      hover: "hover:bg-emerald-700",
      softBg: "bg-emerald-50",
      darkSoftBg: "bg-emerald-500/10",
      ring: "border-emerald-200",
      darkRing: "border-emerald-400/20",
      shadow: "rgba(5,150,105,0.75)",
    },
  };

  const selectedAccent = accentMap[accent] || accentMap.blue;

  return {
    isLight,
    accent: selectedAccent,
    page: isLight ? "bg-[#f6f8fc]" : "bg-[#020b18]",
    panel: isLight
      ? "border-slate-200 bg-white"
      : "border-white/[0.08] bg-[#0b182b]",
    panelSoft: isLight
      ? "border-slate-200 bg-[#f8fafc]"
      : "border-white/[0.07] bg-white/[0.03]",
    text: isLight ? "text-[#111a3b]" : "text-white",
    muted: isLight ? "text-slate-600" : "text-slate-400",
    subtle: isLight ? "text-slate-500" : "text-slate-500",
  };
}

function CourseSidebar({
  theme,
  accent,
  modules,
  selectedLesson,
  setSelectedLesson,
  openModules,
  setOpenModules,
  progress,
  sidebarTitle,
  sidebarIcon: SidebarIcon,
}) {
  const styles = getTheme(theme, accent);

  return (
    <aside
      className={`
        overflow-hidden rounded-[22px] border
        ${styles.panel}
        lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]
      `}
    >
      <div className="border-b border-slate-200/70 p-5 dark:border-white/[0.07]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-[0.16em] ${styles.subtle}`}
            >
              {sidebarTitle}
            </p>

            <h2 className={`mt-2 text-lg font-extrabold ${styles.text}`}>
              {modules.length} modules ·{" "}
              {modules.reduce(
                (total, module) => total + module.lessons.length,
                0,
              )}{" "}
              lessons
            </h2>
          </div>

          <SidebarIcon className={`h-5 w-5 ${styles.accent.text}`} />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className={styles.muted}>Course progress</span>
            <span className={styles.accent.text}>{progress}%</span>
          </div>

          <div
            className={`mt-2 h-2 overflow-hidden rounded-full ${
              styles.isLight ? "bg-slate-100" : "bg-white/[0.06]"
            }`}
          >
            <div
              className={`h-full rounded-full ${styles.accent.bg}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto">
        {modules.map((module) => {
          const open = openModules.includes(module.id);

          return (
            <div
              key={module.id}
              className="border-b border-slate-200/70 last:border-0 dark:border-white/[0.07]"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenModules((current) =>
                    current.includes(module.id)
                      ? current.filter((id) => id !== module.id)
                      : [...current, module.id],
                  )
                }
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <div>
                  <p
                    className={`text-[11px] font-bold uppercase tracking-[0.12em] ${styles.accent.text}`}
                  >
                    Module {module.id}
                  </p>

                  <h3 className={`mt-1 text-sm font-bold ${styles.text}`}>
                    {module.title}
                  </h3>

                  <p className={`mt-1 text-xs ${styles.subtle}`}>
                    {module.lessons.length} lessons · {module.duration}
                  </p>
                </div>

                <ChevronDown
                  className={`mt-1 h-4 w-4 shrink-0 transition ${
                    open ? "rotate-180" : ""
                  } ${styles.subtle}`}
                />
              </button>

              {open && (
                <div className="px-3 pb-3">
                  {module.lessons.map((lesson) => {
                    const selected = selectedLesson === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setSelectedLesson(lesson.id)}
                        className={`
                          flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition
                          ${
                            selected
                              ? styles.isLight
                                ? styles.accent.softBg
                                : styles.accent.darkSoftBg
                              : styles.isLight
                                ? "hover:bg-slate-50"
                                : "hover:bg-white/[0.03]"
                          }
                        `}
                      >
                        <span
                          className={`
                            grid h-7 w-7 shrink-0 place-items-center rounded-full
                            ${
                              lesson.completed
                                ? "bg-emerald-500 text-white"
                                : selected
                                  ? `${styles.accent.bg} text-white`
                                  : styles.isLight
                                    ? "bg-slate-100 text-slate-500"
                                    : "bg-white/[0.06] text-slate-400"
                            }
                          `}
                        >
                          {lesson.completed ? (
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          ) : selected ? (
                            <Play
                              className="ml-0.5 h-3 w-3"
                              fill="currentColor"
                            />
                          ) : (
                            <Lock className="h-3 w-3" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-xs font-semibold ${
                              selected ? styles.accent.text : styles.text
                            }`}
                          >
                            {lesson.title}
                          </span>

                          <span
                            className={`mt-1 block text-[11px] ${styles.subtle}`}
                          >
                            {lesson.duration}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function InfoPill({ icon: Icon, label, value, styles }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          styles.isLight
            ? `${styles.accent.softBg} ${styles.accent.text}`
            : `${styles.accent.darkSoftBg} ${styles.accent.text}`
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${styles.subtle}`}
        >
          {label}
        </p>
        <p className={`mt-0.5 text-sm font-bold ${styles.text}`}>{value}</p>
      </div>
    </div>
  );
}

export default function LearningGuidePage({
  theme = "light",
  accent = "blue",
  config,
}) {
  const styles = getTheme(theme, accent);

  const [selectedLesson, setSelectedLesson] = useState(
    config.modules[0].lessons[0].id,
  );
  const [openModules, setOpenModules] = useState([1, 2]);
  const [copied, setCopied] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const totalLessons = useMemo(
    () =>
      config.modules.reduce(
        (total, module) => total + module.lessons.length,
        0,
      ),
    [config.modules],
  );

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(config.codeExample.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const HeroIcon = config.heroIcon;
  const LessonIcon = config.lesson.icon;
  const SidebarIcon = config.sidebarIcon;

  return (
    <main className={`min-h-screen ${styles.page}`}>
      <section className="border-b border-slate-200/70 dark:border-white/[0.07]">
        <div className="mx-auto max-w-[1500px] px-5 py-5 lg:px-8">
          <a
            href="/"
            className={`inline-flex items-center gap-2 text-sm font-semibold ${styles.muted}`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to learning materials
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        <div className={`overflow-hidden rounded-[28px] border ${styles.panel}`}>
          <div className="grid lg:grid-cols-[1.3fr_.7fr]">
            <div className="p-7 sm:p-9 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    styles.isLight
                      ? `${styles.accent.softBg} ${styles.accent.lightText}`
                      : `${styles.accent.darkSoftBg} ${styles.accent.text}`
                  }`}
                >
                  {config.badge}
                </span>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    styles.isLight
                      ? "border-slate-200 text-slate-600"
                      : "border-white/[0.08] text-slate-300"
                  }`}
                >
                  {config.level}
                </span>
              </div>

              <h1
                className={`mt-6 max-w-4xl text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px] ${styles.text}`}
              >
                {config.title}
              </h1>

              <p className={`mt-5 max-w-3xl text-lg leading-8 ${styles.muted}`}>
                {config.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#course-content"
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 ${styles.accent.bg} ${styles.accent.hover}`}
                  style={{
                    boxShadow: `0 15px 30px -15px ${styles.accent.shadow}`,
                  }}
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                  {config.primaryCta}
                </a>

              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <InfoPill
                  icon={Clock3}
                  label="Duration"
                  value={config.duration}
                  styles={styles}
                />
                <InfoPill
                  icon={MonitorPlay}
                  label="Lessons"
                  value={`${totalLessons} lessons`}
                  styles={styles}
                />
                <InfoPill
                  icon={Users}
                  label="Level"
                  value={config.level}
                  styles={styles}
                />
                <InfoPill
                  icon={Trophy}
                  label={config.metaLabel}
                  value={config.metaValue}
                  styles={styles}
                />
              </div>
            </div>

            <div
              className={`
                relative flex min-h-[360px] items-center justify-center overflow-hidden
                ${
                  styles.isLight
                    ? `bg-[radial-gradient(circle_at_50%_45%,rgba(219,234,254,0.9),transparent_58%),linear-gradient(145deg,#eff6ff,#f8fafc)]`
                    : "bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.25),transparent_58%),linear-gradient(145deg,#0a1c35,#071426)]"
                }
              `}
            >
              <div
                className={`absolute h-64 w-64 rounded-full border ${
                  styles.isLight
                    ? `${styles.accent.ring} bg-white/70`
                    : `${styles.accent.darkRing} bg-white/[0.02]`
                }`}
              />

              <div
                className={`
                  relative grid h-40 w-40 place-items-center rounded-[34px] border bg-white
                  shadow-[0_30px_70px_-35px_rgba(37,99,235,0.55)]
                  ${
                    styles.isLight
                      ? styles.accent.ring
                      : `${styles.accent.darkRing} bg-[#0b1c33]`
                  }
                `}
              >
                <HeroIcon
                  className={`h-20 w-20 ${styles.accent.text}`}
                  strokeWidth={1.35}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="course-content"
        className="mx-auto grid max-w-[1500px] gap-7 px-5 pb-16 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-8"
      >
        <CourseSidebar
          theme={theme}
          accent={accent}
          modules={config.modules}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
          openModules={openModules}
          setOpenModules={setOpenModules}
          progress={config.progress}
          sidebarTitle={config.sidebarTitle}
          sidebarIcon={SidebarIcon}
        />

        <div className="space-y-7">
          <section className={`rounded-[22px] border p-6 sm:p-8 ${styles.panel}`}>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.14em] ${styles.accent.text}`}
                >
                  Module 1 · Lesson 1
                </p>

                <h2
                  className={`mt-3 text-3xl font-black tracking-[-0.04em] ${styles.text}`}
                >
                  {config.lesson.title}
                </h2>

                <p className={`mt-3 max-w-3xl leading-7 ${styles.muted}`}>
                  {config.lesson.description}
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                  styles.isLight
                    ? "bg-slate-100 text-slate-600"
                    : "bg-white/[0.05] text-slate-300"
                }`}
              >
                <Clock3 className="h-3.5 w-3.5" />
                {config.lesson.duration}
              </span>
            </div>

            <div
              className={`
                mt-7 grid min-h-[340px] place-items-center overflow-hidden rounded-[20px] border
                ${styles.panelSoft}
              `}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className={`grid h-24 w-24 place-items-center rounded-[28px] transition hover:scale-105 ${
                  styles.isLight
                    ? styles.accent.softBg
                    : styles.accent.darkSoftBg
                }`}
                aria-label="Play lesson video"
              >
                <Play
                  className={`ml-1 h-12 w-12 ${styles.accent.text}`}
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </section>

          <section className={`rounded-[22px] border p-6 sm:p-8 ${styles.panel}`}>
            <div className="flex items-center gap-3">
              <Target className={`h-5 w-5 ${styles.accent.text}`} />
              <h2 className={`text-xl font-extrabold ${styles.text}`}>
                What you will learn
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {config.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className={`flex items-start gap-3 rounded-xl border p-4 ${styles.panelSoft}`}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className={`text-sm font-medium leading-6 ${styles.muted}`}>
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {config.sections.map((section) => {
            const SectionIcon = section.icon;

            return (
              <section
                key={section.title}
                className={`rounded-[22px] border p-6 sm:p-8 ${styles.panel}`}
              >
                <div className="flex items-start gap-3">
                  <SectionIcon
                    className={`mt-1 h-6 w-6 ${styles.accent.text}`}
                  />

                  <div>
                    <h2
                      className={`text-2xl font-black tracking-[-0.035em] ${styles.text}`}
                    >
                      {section.title}
                    </h2>

                    <p className={`mt-2 leading-7 ${styles.muted}`}>
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((item, index) => {
                    const ItemIcon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className={`rounded-[18px] border p-5 ${styles.panelSoft}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`grid h-11 w-11 place-items-center rounded-xl ${
                              styles.isLight
                                ? `${styles.accent.softBg} ${styles.accent.text}`
                                : `${styles.accent.darkSoftBg} ${styles.accent.text}`
                            }`}
                          >
                            <ItemIcon className="h-5 w-5" />
                          </span>

                          <span
                            className={`text-xs font-black ${styles.accent.text}`}
                          >
                            0{index + 1}
                          </span>
                        </div>

                        <h3 className={`mt-4 font-extrabold ${styles.text}`}>
                          {item.title}
                        </h3>

                        <p className={`mt-2 text-sm leading-6 ${styles.muted}`}>
                          {item.description}
                        </p>

                        {item.points && (
                          <ul className="mt-4 space-y-3">
                            {item.points.map((point) => (
                              <li
                                key={point}
                                className={`flex items-start gap-3 text-sm ${styles.muted}`}
                              >
                                <Check
                                  className={`mt-0.5 h-4 w-4 shrink-0 ${styles.accent.text}`}
                                />
                                <span className="leading-6">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section className={`rounded-[22px] border p-6 sm:p-8 ${styles.panel}`}>
            <div className="flex items-center justify-between gap-5">
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.14em] ${styles.accent.text}`}
                >
                  {config.codeExample.label}
                </p>

                <h2 className={`mt-2 text-2xl font-black ${styles.text}`}>
                  {config.codeExample.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={copyCode}
                className={`
                  inline-flex items-center gap-2 rounded-xl border px-4 py-2.5
                  text-xs font-bold transition
                  ${
                    styles.isLight
                      ? "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                  }
                `}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>

            <pre
              className={`
                mt-6 overflow-x-auto whitespace-pre rounded-[18px] border p-5
                font-mono text-[13px] leading-6
                ${
                  styles.isLight
                    ? "border-slate-200 bg-[#0f172a] text-slate-200"
                    : "border-white/[0.08] bg-black/30 text-slate-200"
                }
              `}
            >
              {config.codeExample.code}
            </pre>
          </section>

          <section className={`rounded-[22px] border p-6 sm:p-8 ${styles.panel}`}>
            <h2
              className={`text-2xl font-black tracking-[-0.035em] ${styles.text}`}
            >
              Practice exercises
            </h2>

            <p className={`mt-2 ${styles.muted}`}>
              Apply the material using practical scenarios.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {config.exercises.map((exercise, index) => (
                <article
                  key={exercise.title}
                  className={`flex flex-col rounded-[18px] border p-5 ${styles.panelSoft}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-xs font-black ${styles.accent.text}`}
                    >
                      Exercise {index + 1}
                    </span>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      {exercise.difficulty}
                    </span>
                  </div>

                  <h3 className={`mt-4 font-extrabold ${styles.text}`}>
                    {exercise.title}
                  </h3>

                  <p className={`mt-3 text-sm leading-6 ${styles.muted}`}>
                    {exercise.task}
                  </p>

                  <div
                    className={`mt-auto pt-5 text-xs leading-5 ${styles.subtle}`}
                  >
                    <strong className={styles.text}>Hint:</strong>{" "}
                    {exercise.hint}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className={`
                inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold
                ${
                  styles.isLight
                    ? "border-slate-200 bg-white text-slate-600"
                    : "border-white/[0.08] bg-white/[0.03] text-slate-300"
                }
              `}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous lesson
            </button>

            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 ${styles.accent.bg} ${styles.accent.hover}`}
            >
              Mark complete & continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
          <div
            className={`relative w-full max-w-5xl overflow-hidden rounded-[28px] border shadow-2xl ${styles.panel}`}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className={`absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border transition ${
                styles.isLight
                  ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  : "border-white/[0.08] bg-[#0b182b]/90 text-white hover:bg-[#12233e]"
              }`}
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-video w-full bg-black">
              <video
                key={dsLogoVideo}
                src={dsLogoVideo}
                controls
                autoPlay
                playsInline
                className="h-full w-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

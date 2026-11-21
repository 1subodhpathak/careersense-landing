import { useEffect, useMemo, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Check,
  Clock3,
  FileCheck2,
  FileText,
  IdCard,
  IndianRupee,
  Loader2,
  LockKeyhole,
  Route,
  Sparkles,
  Upload,
  UsersRound,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import useHeroTheme from "../hooks/useHeroTheme";
import { fellowshipPrograms } from "../data/fellowshipPrograms";

const STORAGE_KEY = "careersense-fellowship-applications-v1";

const educationOptions = [
  "Currently in school",
  "Undergraduate student",
  "Postgraduate student",
  "Graduate",
  "Working professional",
  "Other",
];

const experienceOptions = [
  "No professional experience yet",
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "More than 5 years",
];

function Field({ label, required, hint, children }) {
  return (
    <div className="grid gap-2">
      <label className="text-[15px] font-normal leading-6 text-[#14264b]">
        {label} {required && <span className="text-[#d93025]" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs leading-5 text-[#6b7892]">{hint}</p>}
    </div>
  );
}

export default function FellowshipApplicationPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const { programId = "data-analyst" } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const program = useMemo(
    () => fellowshipPrograms.find((item) => item.id === programId) || fellowshipPrograms[0],
    [programId],
  );

  const [resume, setResume] = useState(null);
  const [validationError, setValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    educationStatus: "",
    institution: "",
    experience: "",
    motivation: "",
    source: "",
  });

  // Fetch initial profile information: Name, Email and Mobile No
  useEffect(() => {
    if (!user) return;

    const clerkPhone = user.primaryPhoneNumber?.phoneNumber || user.phoneNumbers?.[0]?.phoneNumber || "";
    const clerkFullName = user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const clerkEmail = user.primaryEmailAddress?.emailAddress || "";

    setForm((current) => ({
      ...current,
      fullName: current.fullName || clerkFullName,
      email: current.email || clerkEmail,
      phone: current.phone || clerkPhone,
    }));

    // Fetch master profile from backend to populate phone if not in Clerk session
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const apiBase =
          import.meta.env.VITE_API_URL ||
          import.meta.env.VITE_BACKEND_URL ||
          import.meta.env.VITE_API_BASE_URL ||
          "https://server.datasenseai.com";

        const res = await fetch(`${apiBase}/careersense/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const profile = await res.json();
          if (profile) {
            setForm((current) => ({
              ...current,
              fullName: current.fullName || profile.fullName || clerkFullName,
              email: current.email || profile.email || clerkEmail,
              phone: current.phone || profile.phone || clerkPhone,
            }));
          }
        }
      } catch (err) {
        console.warn("[Profile Pre-fill Warning]", err);
      }
    };

    fetchProfile();
  }, [user, getToken]);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setValidationError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      setValidationError(true);
      event.currentTarget.reportValidity();
      return;
    }

    setValidationError(false);
    setIsSubmitting(true);

    // 1. Save to local storage for quick offline / cached recovery
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      saved[program.id] = {
        ...form,
        programId: program.id,
        programName: program.name,
        resumeName: resume?.name || null,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch (error) {
      console.error("Could not save fellowship application to localStorage:", error);
    }

    // 2. Persist directly to server model
    try {
      const token = await getToken();
      const apiBase =
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "https://server.datasenseai.com";

      const formData = new FormData();
      formData.append("programId", program.id);
      formData.append("programName", program.name);
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("educationStatus", form.educationStatus);
      formData.append("institution", form.institution);
      formData.append("experience", form.experience);
      formData.append("motivation", form.motivation);
      formData.append("source", form.source);

      if (resume) {
        formData.append("resume", resume);
        formData.append("resumeName", resume.name);
      }

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch(`${apiBase}/careersense/fellowship/apply`, {
        method: "POST",
        headers,
        body: formData,
      });
    } catch (err) {
      console.warn("[Fellowship Application Backend Save Error]", err);
    } finally {
      setIsSubmitting(false);
      // Directly take user to cart page with respective selections
      navigate(`/cart?plan=intern&track=${program.id}`);
    }
  };

  const inputClass =
    "min-h-12 w-full rounded-lg border border-[#cbd8e7] bg-[#fbfdff] px-3.5 py-2.5 text-[15px] text-[#101f3f] outline-none transition placeholder:text-[#8b97aa] hover:border-[#9db5cf] focus:border-[#1577ee] focus:bg-white focus:ring-4 focus:ring-[#1577ee]/10";

  return (
    <main className="min-h-screen bg-[#f2f7fc] text-[#101f3f] antialiased">
      <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />
      <div className="border-b border-[#d9e5f1] bg-[#e8f2fb]">
        <div className="mx-auto flex min-h-10 max-w-[1120px] items-center justify-end gap-2 px-5 text-xs font-medium text-[#355579] sm:px-8">
          <LockKeyhole size={14} className="text-[#087f8c]" />
          Your information is private and securely handled
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to={`/fellowships/${program.id}`}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#37618e] transition hover:text-[#1577ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1577ee]"
        >
          <ArrowLeft size={16} /> Back to program
        </Link>

        <section className="grid overflow-hidden rounded-[18px] border border-[#d5e0ed] bg-white shadow-[0_18px_50px_rgba(18,49,91,0.10)] lg:grid-cols-[365px_minmax(0,1fr)]">
          <aside className="relative overflow-hidden bg-[#071b49] px-6 py-8 text-white sm:px-8 lg:min-h-[720px] lg:py-10">
            <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-[#1577ee]/25" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#12bca6]/15" aria-hidden="true" />
            <div className="relative">
              <div className="mb-7 grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[#49dac1] ring-1 ring-white/15">
                <Sparkles size={21} />
              </div>
              <p className="text-xs uppercase tracking-[0.17em] text-[#58dcc6]">Your CareerSense journey</p>
              <h1 className="mt-3 text-[27px] font-normal leading-[1.18] tracking-[-0.025em] text-white">
                {user?.firstName ? `${user.firstName}, take` : "Take"} the next step toward your career.
              </h1>
              <p className="mt-4 text-sm leading-6 text-blue-100/80">
                Tell us where you are today, and we’ll help you begin the {program.name} Fellowship with the right context.
              </p>

              <div className="mt-7 border-t border-white/15 pt-5">
                <div className="flex items-start gap-3">
                  <Clock3 size={17} className="mt-0.5 shrink-0 text-[#58dcc6]" />
                  <div>
                    <p className="text-sm text-white">About 3 minutes</p>
                    <p className="mt-0.5 text-xs text-blue-100/60">Short, focused application</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[#58dcc6]">Program snapshot</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white/[0.07] p-3 ring-1 ring-white/10">
                    <CalendarDays size={16} className="text-[#58dcc6]" />
                    <p className="mt-2 text-sm text-white">3 months</p>
                    <p className="mt-0.5 text-[10px] text-blue-100/60">12-week journey</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.07] p-3 ring-1 ring-white/10">
                    <BookOpenCheck size={16} className="text-[#58dcc6]" />
                    <p className="mt-2 text-sm text-white">20+ projects</p>
                    <p className="mt-0.5 text-[10px] text-blue-100/60">Practical learning</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.07] p-3 ring-1 ring-white/10">
                    <UsersRound size={16} className="text-[#58dcc6]" />
                    <p className="mt-2 text-sm text-white">Mentor feedback</p>
                    <p className="mt-0.5 text-[10px] text-blue-100/60">Guidance and reviews</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.07] p-3 ring-1 ring-white/10">
                    <IndianRupee size={16} className="text-[#58dcc6]" />
                    <p className="mt-2 text-sm text-white">₹2,000</p>
                    <p className="mt-0.5 text-[10px] text-blue-100/60">One-time fee</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-[#58dcc6]">
                  <BadgeCheck size={17} />
                  <p className="text-xs uppercase tracking-[0.14em]">What you’ll receive</p>
                </div>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center gap-3 text-sm text-blue-50">
                    <IdCard size={16} className="shrink-0 text-[#58dcc6]" /> Official fellowship ID card
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-50">
                    <FileCheck2 size={16} className="shrink-0 text-[#58dcc6]" /> CareerSense offer letter
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-50">
                    <FileText size={16} className="shrink-0 text-[#58dcc6]" /> Relieving letter on completion
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-50">
                    <Award size={16} className="shrink-0 text-[#58dcc6]" /> Fellowship certificate
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-[#58dcc6]">
                  <BookOpenCheck size={17} />
                  <p className="text-xs uppercase tracking-[0.14em]">What you’ll learn</p>
                </div>
                <p className="mt-3 text-xs leading-5 text-blue-100/75">
                  {program.short}. Learn through practical assignments and a portfolio-ready capstone.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {program.skills?.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-blue-50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-[#58dcc6]">
                  <Route size={17} />
                  <p className="text-xs uppercase tracking-[0.14em]">How it works</p>
                </div>
                <ol className="mt-4 grid gap-3">
                  {[
                    "Share your profile",
                    "Choose the fellowship plan",
                    "Complete secure checkout",
                    "Start within 7 days of payment",
                  ].map((step, index) => (
                    <li key={step} className="flex items-center gap-3 text-xs text-blue-50">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#58dcc6] text-[10px] text-[#071b49]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 rounded-xl border border-[#58dcc6]/20 bg-[#0b3159] p-4">
                <div className="flex items-start gap-3">
                  <UsersRound size={17} className="mt-0.5 shrink-0 text-[#58dcc6]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#58dcc6]">Who it’s for</p>
                    <p className="mt-2 text-xs leading-5 text-blue-100/75">
                      Students, graduates, job seekers, career switchers and working professionals ready to build practical experience.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[11px] leading-5 text-blue-100/55">
                Build portfolio-ready work, practise explaining your projects, and showcase your progress through CareerSense.
              </p>
            </div>
          </aside>

          <div>
            <div className="border-b border-[#e4eaf2] px-6 py-7 sm:px-9 sm:py-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eaf8f5] px-3 py-1.5 text-xs text-[#087b6a]">
                <Check size={14} /> Fellowship interest form
              </div>
              <h2 className="text-2xl font-normal tracking-[-0.02em] text-[#0b2048] sm:text-[28px]">A little about you</h2>
              <p className="mt-2 text-sm leading-6 text-[#62718a]">There are no perfect answers. Just share what best describes you.</p>
              <p className="mt-3 text-xs text-[#b9382f]">* Required fields</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid gap-7 px-6 py-8 sm:px-9 sm:py-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    className={inputClass}
                    name="fullName"
                    value={form.fullName}
                    onChange={update}
                    autoComplete="name"
                    placeholder="Your answer"
                    required
                  />
                </Field>
                <Field label="Email address" required>
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                  />
                </Field>
              </div>

              <Field label="Phone number" required>
                <input
                  className={inputClass}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  autoComplete="tel"
                  placeholder="Your phone number"
                  required
                />
              </Field>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Current education or work status" required>
                  <select
                    className={inputClass}
                    name="educationStatus"
                    value={form.educationStatus}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>Select one</option>
                    {educationOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Relevant experience" required>
                  <select
                    className={inputClass}
                    name="experience"
                    value={form.experience}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>Select one</option>
                    {experienceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="College, university or company" required>
                <input
                  className={inputClass}
                  name="institution"
                  value={form.institution}
                  onChange={update}
                  autoComplete="organization"
                  placeholder="Your answer"
                  required
                />
              </Field>

              <Field label={`Why are you applying for the ${program.name} Fellowship?`} required hint="A few clear sentences are enough.">
                <textarea
                  className={`${inputClass} min-h-[106px] resize-y`}
                  name="motivation"
                  value={form.motivation}
                  onChange={update}
                  placeholder="What would you like to learn or achieve?"
                  maxLength={600}
                  required
                />
              </Field>

              <Field label="Where did you hear about this program?" required>
                <select className={inputClass} name="source" value={form.source} onChange={update} required>
                  <option value="" disabled>Select one</option>
                  <option>LinkedIn</option>
                  <option>Naukri</option>
                  <option>CareerSense company website</option>
                </select>
              </Field>

              <Field label="Resume" hint="Optional · PDF, DOC or DOCX · Maximum 5 MB">
                <label className="flex min-h-[74px] cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#9eafc4] bg-[#f9fbfe] px-4 py-3 transition hover:border-[#1577ee] hover:bg-[#f3f8ff] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#1577ee]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f2ff] text-[#1577ee]">
                    {resume ? <FileText size={19} /> : <Upload size={19} />}
                  </span>
                  <span className="min-w-0 text-sm text-[#52647f]">
                    {resume ? (
                      <span className="block truncate text-[#173b68]">{resume.name}</span>
                    ) : (
                      "Choose a file to upload"
                    )}
                  </span>
                  <input
                    className="sr-only"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(event) => setResume(event.target.files?.[0] || null)}
                  />
                </label>
              </Field>

              {validationError && (
                <p className="text-sm text-[#bd2d25]" aria-live="polite">
                  Please complete all required fields before continuing.
                </p>
              )}

              <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-[#e3e9f1] pt-6 sm:flex-row sm:items-center">
                <p className="text-xs leading-5 text-[#748199]">
                  Next: continue directly to cart checkout with your chosen fellowship track.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1577ee] px-6 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(21,119,238,0.22)] transition hover:bg-[#0e67d5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1577ee] active:translate-y-px disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit & Continue <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-[#75849b]">
          CareerSense uses these details only to support your fellowship journey.
        </p>
      </div>
    </main>
  );
}

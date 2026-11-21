import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Crown,
  FileText,
  Globe2,
  Handshake,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import useHeroTheme from "../hooks/useHeroTheme";

const STORAGE_KEY = "careersense-partner-applications-v1";

const roleOptions = [
  "Student or recent graduate",
  "Working professional",
  "Founder or entrepreneur",
  "Educator or mentor",
  "Career services or placement professional",
  "Other",
];

const trackOptions = [
  "Product & Strategy",
  "Technology & AI",
  "Data & Research",
  "Growth & Partnerships",
  "Design & Content",
  "Operations & Community",
];

const availabilityOptions = [
  "3–5 hours per week",
  "6–8 hours per week",
  "9–12 hours per week",
  "More than 12 hours per week",
];

function Field({ label, required, hint, children }) {
  return (
    <div className="grid gap-2.5">
      <label className="text-sm font-semibold leading-6 text-[#17233c]">
        {label} {required && <span className="text-[#a66b17]" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs leading-5 text-[#718096]">{hint}</p>}
    </div>
  );
}

export default function PartnerApplicationPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [profileFile, setProfileFile] = useState(null);
  const [validationError, setValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    currentRole: "",
    organization: "",
    location: "",
    contributionTrack: "",
    availability: "",
    motivation: "",
    experience: "",
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

    // Fetch master profile from backend to populate phone, location, linkedin if available
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
              location: current.location || profile.location || "",
              linkedIn: current.linkedIn || profile.linkedinPortfolio || "",
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
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const applications = Array.isArray(saved) ? saved : [];
      applications.push({
        ...form,
        profileFileName: profileFile?.name || null,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (error) {
      console.error("Could not save partner application details to localStorage:", error);
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
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("linkedIn", form.linkedIn);
      formData.append("currentRole", form.currentRole);
      formData.append("organization", form.organization);
      formData.append("location", form.location);
      formData.append("contributionTrack", form.contributionTrack);
      formData.append("availability", form.availability);
      formData.append("motivation", form.motivation);
      formData.append("experience", form.experience);
      formData.append("source", form.source);

      if (profileFile) {
        formData.append("profileFile", profileFile);
        formData.append("profileFileName", profileFile.name);
      }

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch(`${apiBase}/careersense/partner/apply`, {
        method: "POST",
        headers,
        body: formData,
      });
    } catch (err) {
      console.warn("[Partner Application Backend Save Error]", err);
    } finally {
      setIsSubmitting(false);
      // Directly take user to cart page with partner plan selection
      navigate("/cart?plan=partner");
    }
  };

  const inputClass =
    "min-h-12 w-full rounded-xl border border-[#d8dee8] bg-[#fbfcfe] px-4 py-3 text-[15px] text-[#14213a] outline-none transition placeholder:text-[#98a2b3] hover:border-[#b5bfcd] focus:border-[#b98a3d] focus:bg-white focus:ring-4 focus:ring-[#b98a3d]/10";

  return (
    <main className="min-h-screen bg-[#eceff3] text-[#14213a] antialiased">
      <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />
      <div className="border-b border-[#d9d3c8] bg-[#f5efe4]">
        <div className="mx-auto flex min-h-10 max-w-[1220px] items-center justify-end gap-2 px-5 text-xs font-semibold text-[#725325] sm:px-8">
          <LockKeyhole size={14} className="text-[#a87930]" />
          Confidential Partner Program application
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1220px] px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/partner-program"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#52627b] transition hover:text-[#8f641f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b98a3d]"
        >
          <ArrowLeft size={16} /> Return to partner program
        </Link>

        <section className="overflow-hidden rounded-[24px] border border-[#d6dce5] bg-white shadow-[0_28px_80px_rgba(18,31,52,0.14)] lg:grid lg:grid-cols-[390px_minmax(0,1fr)]">
          <aside className="relative overflow-hidden bg-[#08152c] px-6 py-9 text-white sm:px-9 lg:min-h-[900px] lg:py-12">
            <div className="absolute -right-20 top-6 h-64 w-64 rounded-full border border-[#d5ae68]/20" aria-hidden="true" />
            <div className="absolute -right-8 top-18 h-40 w-40 rounded-full border border-[#d5ae68]/10" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent,rgba(185,138,61,0.08))]" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[#d5ae68]/40 bg-[#d5ae68]/10 text-[#e0bd7d]">
                  <Crown size={21} strokeWidth={1.6} />
                </div>
                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#cbd5e5]">
                  Founding cohort
                </span>
              </div>

              <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d5ae68]">Partner admissions</p>
              <h1 className="mt-4 text-[32px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#f5f2eb]">
                Build alongside the people shaping CareerSense.
              </h1>
              <p className="mt-5 text-sm leading-7 text-[#b8c4d6]">
                We keep each partner cohort intentional. Tell us what you bring, where you want to grow, and the work you would be proud to own.
              </p>

              <div className="mt-9 grid gap-5 border-y border-white/10 py-7">
                {[
                  [BriefcaseBusiness, "Real operating experience", "Contribute to meaningful startup work across live business functions."],
                  [Handshake, "Leadership proximity", "Learn through reviews, working sessions and direct team context."],
                  [BadgeCheck, "Verified partner identity", "Receive a professional partner profile and completion credentials."],
                ].map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-4">
                    <Icon size={19} className="mt-0.5 shrink-0 text-[#d5ae68]" strokeWidth={1.7} />
                    <div>
                      <p className="text-sm font-semibold text-[#f5f2eb]">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#91a0b6]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#d5ae68]/25 bg-[#d5ae68]/[0.07] p-5">
                <div className="flex items-center gap-2 text-[#e0bd7d]">
                  <Sparkles size={16} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.17em]">What happens next</p>
                </div>
                <ol className="mt-5 grid gap-4">
                  {["Share your partner profile", "Review program access", "Complete secure enrollment", "Receive onboarding details"].map((step, index) => (
                    <li key={step} className="flex items-center gap-3 text-xs text-[#d8e0eb]">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#d5ae68]/40 text-[10px] font-semibold text-[#e0bd7d]">
                        0{index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7 flex items-center gap-3 text-xs leading-5 text-[#8f9eb4]">
                <ShieldCheck size={17} className="shrink-0 text-[#d5ae68]" />
                Your information is reviewed only for Partner Program onboarding.
              </div>
            </div>
          </aside>

          <div>
            <div className="border-b border-[#e5e8ed] px-6 py-8 sm:px-10 sm:py-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#9b702d]">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f5ead7]">
                    <Check size={13} />
                  </span>
                  Private application
                </div>
                <p className="text-xs text-[#7b8799]">About 4 minutes</p>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-[#101c33] sm:text-[34px]">
                Introduce yourself
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#657287]">
                Help us understand the perspective, experience and energy you would bring to the partner cohort.
              </p>
              <p className="mt-4 text-xs text-[#9b702d]">* Required fields</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid gap-7 px-6 py-8 sm:px-10 sm:py-10">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    className={inputClass}
                    name="fullName"
                    value={form.fullName}
                    onChange={update}
                    autoComplete="name"
                    placeholder="Your full name"
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

              <div className="grid gap-7 sm:grid-cols-2">
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
                <Field label="LinkedIn profile" required>
                  <input
                    className={inputClass}
                    type="url"
                    name="linkedIn"
                    value={form.linkedIn}
                    onChange={update}
                    placeholder="https://linkedin.com/in/..."
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Current role" required>
                  <select
                    className={inputClass}
                    name="currentRole"
                    value={form.currentRole}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>Select your current role</option>
                    {roleOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Organisation or institution" required>
                  <input
                    className={inputClass}
                    name="organization"
                    value={form.organization}
                    onChange={update}
                    autoComplete="organization"
                    placeholder="Where you currently work or study"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="City and country" required>
                  <div className="relative">
                    <Globe2 size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9b702d]" />
                    <input
                      className={`${inputClass} pl-11`}
                      name="location"
                      value={form.location}
                      onChange={update}
                      autoComplete="address-level2"
                      placeholder="e.g. Bengaluru, India"
                      required
                    />
                  </div>
                </Field>
                <Field label="Preferred contribution track" required>
                  <select
                    className={inputClass}
                    name="contributionTrack"
                    value={form.contributionTrack}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>Select a track</option>
                    {trackOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Weekly availability" required hint="The program is flexible, but consistent participation matters.">
                <select
                  className={inputClass}
                  name="availability"
                  value={form.availability}
                  onChange={update}
                  required
                >
                  <option value="" disabled>Select your availability</option>
                  {availabilityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>

              <Field label="Why do you want to become a CareerSense Partner?" required hint={`${form.motivation.length}/700 characters`}>
                <textarea
                  className={`${inputClass} min-h-[120px] resize-y`}
                  name="motivation"
                  value={form.motivation}
                  onChange={update}
                  placeholder="What do you hope to contribute, learn or build?"
                  maxLength={700}
                  required
                />
              </Field>

              <Field label="Relevant experience or a project you are proud of" required hint={`${form.experience.length}/700 characters`}>
                <textarea
                  className={`${inputClass} min-h-[110px] resize-y`}
                  name="experience"
                  value={form.experience}
                  onChange={update}
                  placeholder="Share a concise example and your role in it."
                  maxLength={700}
                  required
                />
              </Field>

              <Field label="Where did you hear about the Partner Program?" required>
                <select className={inputClass} name="source" value={form.source} onChange={update} required>
                  <option value="" disabled>Select one</option>
                  <option>LinkedIn</option>
                  <option>CareerSense website</option>
                  <option>College or institution</option>
                  <option>Referral from a CareerSense member</option>
                  <option>Search or social media</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Resume or portfolio" hint="Optional · PDF, DOC or DOCX · Maximum 5 MB">
                <label className="flex min-h-[78px] cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[#b9c2cf] bg-[#fafbfc] px-4 py-3 transition hover:border-[#b98a3d] hover:bg-[#fdfaf4] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#b98a3d]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5ead7] text-[#9b702d]">
                    {profileFile ? <FileText size={18} /> : <Upload size={18} />}
                  </span>
                  <span className="min-w-0 text-sm text-[#657287]">
                    {profileFile ? (
                      <span className="block truncate font-medium text-[#263650]">{profileFile.name}</span>
                    ) : (
                      "Choose a file to support your application"
                    )}
                  </span>
                  <input
                    className="sr-only"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(event) => setProfileFile(event.target.files?.[0] || null)}
                  />
                </label>
              </Field>

              {validationError && (
                <p className="text-sm font-medium text-[#a63f35]" aria-live="polite">
                  Please complete all required fields before continuing.
                </p>
              )}

              <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-[#e2e6ec] pt-7 sm:flex-row sm:items-center">
                <p className="max-w-sm text-xs leading-5 text-[#778397]">
                  Next: continue directly to cart checkout with your Partner Program selection.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0d1d39] px-6 text-sm font-semibold text-[#f6f1e8] shadow-[0_8px_20px_rgba(8,21,44,0.2)] transition hover:bg-[#172d50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b98a3d] active:translate-y-px disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" /> Continuing...
                    </>
                  ) : (
                    <>
                      Continue Application <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-[#69778b]">
          CareerSense uses these details only to evaluate and support your Partner Program journey.
        </p>
      </div>
    </main>
  );
}

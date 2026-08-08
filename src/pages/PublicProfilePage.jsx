import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Award,
  BadgeCheck,
  Briefcase,
  ExternalLink,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Star,
  Mail,
  Phone,
  FileText,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import CSLogo from '../Assets/CSlogo.png';

function LinkedinIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={props.className || "h-4 w-4"}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const DEFAULT_PROFILE_BANNER = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80";

export default function PublicProfilePage() {
  const { publicId } = useParams();
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const targetId = publicId || user?.id || "default";

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `cs_pub_prof_${targetId}`;

    // 1. Check local session cache for instant render
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        setProfileData(parsed);
        setLoading(false);
      }
    } catch (_) {}

    const fetchPublicProfile = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "https://server.datasenseai.com";
        const res = await fetch(`${apiBase}/careersense/profile/public-profile/${targetId}`);
        if (res.ok && isMounted) {
          const data = await res.json();
          setProfileData(data);
          try { sessionStorage.setItem(cacheKey, JSON.stringify(data)); } catch (_) {}
        } else if (isMounted) {
          // Fallback snapshot if profile not in DB yet
          const fallbackData = {
            id: targetId,
            candidate: {
              name: user?.fullName || "CareerSense Candidate",
              avatar: user?.imageUrl || "",
              bannerImage: DEFAULT_PROFILE_BANNER,
              currentRole: "Certified Candidate",
              currentCompany: "CareerSense Platform",
              profileStatus: "Open to Work",
              location: "",
              email: user?.primaryEmailAddress?.emailAddress || "",
              phone: "",
              bio: "Verified professional showcasing validated credentials and skills on the CareerSense network.",
              education: [],
              certifications: [],
              awards: [],
              skills: ["Data Analysis", "Project Management"]
            }
          };
          setProfileData(fallbackData);
        }
      } catch (err) {
        console.error("Failed to fetch public profile:", err);
        if (isMounted) {
          setProfileData({
            id: targetId,
            candidate: {
              name: user?.fullName || "CareerSense Candidate",
              avatar: user?.imageUrl || "",
              bannerImage: DEFAULT_PROFILE_BANNER,
              currentRole: "Certified Candidate",
              currentCompany: "CareerSense Platform",
              profileStatus: "Open to Work",
              location: "",
              email: user?.primaryEmailAddress?.emailAddress || "",
              phone: "",
              bio: "Verified professional showcasing validated credentials and skills on the CareerSense network.",
              education: [],
              certifications: [],
              awards: [],
              skills: []
            }
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPublicProfile();
    return () => {
      isMounted = false;
    };
  }, [targetId]);

  const candidate = profileData?.candidate || null;
  const roleDisplay = [candidate?.currentRole, candidate?.currentCompany].filter(Boolean).join(' at ') || 'Certified Professional';
  const profileStatus = candidate?.profileStatus || 'Open to Work';
  const bannerImage = candidate?.bannerImage || DEFAULT_PROFILE_BANNER;
  const profileShareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const linkedInShareUrl = useMemo(() => {
    const text = `Check out my verified professional profile on CareerSense!`;
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileShareUrl)}&text=${encodeURIComponent(text)}`;
  }, [profileShareUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
        <p className="text-sm font-semibold text-slate-500">Retrieving public credentials profile...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">Profile Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            This public credential page may not exist or hasn't been published yet.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Immersive Header Banner */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url("${bannerImage}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-[#fafafa]" />
        
        {/* Navigation Bar */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-white shadow-lg backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/20"
          >
            <img src={CSLogo} alt="CareerSense" className="h-8 w-auto object-contain brightness-0 invert" />
            <div>
              <p className="text-base font-black tracking-tight">
                Career<span className="text-teal-400">Sense</span>
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 px-4 py-2.5 text-sm font-semibold shadow-sm transition active:scale-95 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Link Copied!" : "Copy Link"}
            </button>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0958a8]"
            >
              <LinkedinIcon className="h-4 w-4" />
              Share on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* 2. Portfolio Grid Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative -mt-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            
            {/* Main Identity Card */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-8">
              <div className="relative -mt-16 sm:-mt-20 mb-6 flex justify-center lg:justify-start">
                <div className="rounded-2xl bg-white p-1.5 shadow-md ring-1 ring-slate-100">
                  {candidate.avatar ? (
                    <img 
                      src={candidate.avatar} 
                      alt={candidate.name} 
                      className="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-xl bg-teal-600 text-5xl font-bold text-white uppercase">
                      {String(candidate.name || 'C').charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    {candidate.name}
                  </h1>
                  <BadgeCheck className="h-6 w-6 text-teal-500 shrink-0" />
                </div>
                <p className="text-base font-medium text-slate-600 mb-6 leading-relaxed">
                  {roleDisplay}
                </p>

                <div className="space-y-4 text-sm text-slate-600">
                  {candidate.location && (
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <MapPin className="h-4 w-4 text-slate-400 shrink-0" /> 
                      <span>{candidate.location}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <Briefcase className="h-4 w-4 text-slate-400 shrink-0" /> 
                    <span className="font-medium text-slate-900">{profileStatus}</span>
                  </div>
                  {candidate.email && (
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                      <a
                        href={`mailto:${candidate.email}`}
                        className="break-all transition hover:text-teal-600"
                      >
                        {candidate.email}
                      </a>
                    </div>
                  )}
                  {candidate.phone && (
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <a
                        href={`tel:${candidate.phone}`}
                        className="transition hover:text-teal-600"
                      >
                        {candidate.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-teal-500 shrink-0" /> 
                    <span className="break-all font-mono text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-600">
                      ID: {profileData.id || targetId}
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {candidate.email ? (
                    <a
                      href={`mailto:${candidate.email}?subject=${encodeURIComponent(`Hello ${candidate.name}`)}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      <Mail className="h-4 w-4" />
                      Contact {candidate.name.split(' ')[0]}
                    </a>
                  ) : null}
                  <button
                    onClick={handleCopyLink}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50 cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Share Public Link
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-8">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-slate-400" />
                About Me
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {candidate.bio || 'A verified professional showcasing validated credentials and skills on the CareerSense network.'}
              </p>
            </div>
          </div>


          {/* ================= RIGHT MAIN CONTENT ================= */}
          <div className="lg:col-span-8 space-y-8 mt-4 lg:mt-0">

            {/* Skills Badges Section */}
            {candidate.skills?.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-5">
                  <Star className="h-6 w-6 text-teal-500" />
                  Core Skills & Technical Competencies
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {candidate.skills.map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education Timeline */}
            <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-8">
                <GraduationCap className="h-6 w-6 text-teal-500" />
                Education & Background
              </h2>
              {candidate.education?.length > 0 ? (
                <div className="relative ml-3 border-l-2 border-slate-100 space-y-8 pb-4">
                  {candidate.education.map((edu, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-teal-500 shadow-sm" />
                      <h3 className="text-lg font-bold text-slate-900">{edu.title}</h3>
                      <p className="text-base font-medium text-slate-600 mt-1">{edu.subtitle}</p>
                      <span className="inline-flex items-center rounded-md bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 mt-3">
                        {[edu.start, edu.end].filter(Boolean).join(' - ') || 'Education Record'}
                      </span>
                      {edu.description && (
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-2xl">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500">No education details listed yet.</p>
                </div>
              )}
            </section>

            {/* Certifications & Awards Section */}
            {(candidate.awards?.length > 0 || candidate.certifications?.length > 0) && (
              <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-8">
                  <Award className="h-6 w-6 text-teal-500" />
                  Certifications & Honors
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[...(candidate.certifications || []), ...(candidate.awards || [])].map((item, idx) => (
                    <div key={idx} className="relative rounded-xl bg-slate-50 p-5 ring-1 ring-inset ring-slate-100">
                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-sm font-medium text-slate-600">{item.subtitle}</p>
                      {item.start && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{item.start}</p>}
                      {item.description && <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

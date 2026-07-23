import { Mail, MapPin, Phone } from "lucide-react";
import { footerColumns } from "../../data/homePageData";
import CSLogo from "../../Assets/CSlogo.png";

const socialLinks = [
  { label: "LinkedIn", icon: LinkedinIcon },
  { label: "YouTube", icon: YoutubeIcon },
  { label: "X", icon: XIcon },
  { label: "Instagram", icon: InstagramIcon },
];

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94A1.97 1.97 0 0 0 5.25 3Zm5.13 5.5H13.6v1.57h.05c.45-.86 1.55-1.77 3.19-1.77 3.41 0 4.04 2.24 4.04 5.15V20H17.5v-5.79c0-1.38-.02-3.15-1.92-3.15-1.92 0-2.21 1.5-2.21 3.05V20h-3.38V8.5Z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.58 7.19a2.84 2.84 0 0 0-2-2.01C17.82 4.7 12 4.7 12 4.7s-5.82 0-7.58.48a2.84 2.84 0 0 0-2 2.01A29.8 29.8 0 0 0 2 12a29.8 29.8 0 0 0 .42 4.81 2.84 2.84 0 0 0 2 2.01c1.76.48 7.58.48 7.58.48s5.82 0 7.58-.48a2.84 2.84 0 0 0 2-2.01A29.8 29.8 0 0 0 22 12a29.8 29.8 0 0 0-.42-4.81ZM10.09 14.98V9.02L15.27 12l-5.18 2.98Z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 2H21.98l-6.725 7.685L23.167 22h-6.194l-4.85-6.35L6.563 22H3.482l7.193-8.221L1.833 2h6.35l4.384 5.79L18.9 2Zm-1.08 18.16h1.705L7.255 3.744H5.424L17.82 20.16Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85Zm0 1.8A3.35 3.35 0 1 0 15.35 12 3.35 3.35 0 0 0 12 8.65Z" />
    </svg>
  );
}

export default function Footer({ heroTheme = "dark" }) {
  const isLightTheme = heroTheme === "light";

  return (
    <footer
      className={`px-5 py-10 sm:px-6 ${
        isLightTheme
          ? "bg-[#f2f7ff] text-slate-950"
          : "bg-[#07142d] text-white"
      }`}
    >
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.3fr_2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={CSLogo}
              alt="CareerSense logo"
              className="h-10 w-auto object-contain"
            />
            <div className="leading-none">
              <div
                className={`text-[20px] font-black tracking-tight ${
                  isLightTheme ? "text-slate-950" : "text-white"
                }`}
              >
                <span className={isLightTheme ? "text-slate-950" : "text-white"}>
                  Career
                </span>
                <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Sense
                </span>
              </div>
              <div
                className={`mt-1 text-[9px] font-bold uppercase tracking-[0.34em] ${
                  isLightTheme ? "text-cyan-700/90" : "text-cyan-300/80"
                }`}
              >
                AI Career Copilot
              </div>
            </div>
          </div>
          <p
            className={`mt-4 max-w-sm text-[13px] leading-6 ${
              isLightTheme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Your intelligent career copilot for resume building, ATS checks, cover
            letters, interview preparation, and skill certification.
          </p>
          <div className="mt-5 flex gap-2">
            {socialLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isLightTheme
                    ? "bg-slate-900/6 text-slate-700"
                    : "bg-white/10 text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4
                className={`text-[13px] font-extrabold ${
                  isLightTheme ? "text-slate-900" : "text-white"
                }`}
              >
                {column.title}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`text-[13px] ${
                        isLightTheme
                          ? "text-slate-600 hover:text-slate-950"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <h4
            className={`text-[13px] font-extrabold ${
              isLightTheme ? "text-slate-900" : "text-white"
            }`}
          >
            Contact
          </h4>
          <div
            className={`mt-3 space-y-3 text-[13px] ${
              isLightTheme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            <p className="flex items-center gap-3">
              <Mail size={14} /> support@careersenseai.com
            </p>
            <p className="flex items-center gap-3">
              <Phone size={14} /> 🇺🇸 +1 (201) 893-6385
            </p>
            <p className="flex items-center gap-3">
              <Phone size={14} /> 🇮🇳 +91 9891422329
            </p>
            <p className="flex items-start gap-3">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>
                85 CourtHouse Pl, Jersey City
                <br />
                New Jersey - 07306
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`mx-auto mt-8 max-w-[1320px] border-t pt-5 text-center text-[11px] ${
          isLightTheme
            ? "border-slate-900/10 text-slate-500"
            : "border-white/10 text-slate-400"
        }`}
      >
        © 2026 CareerSense. All rights reserved.
      </div>
    </footer>
  );
}

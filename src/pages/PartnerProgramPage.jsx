
/*
  CareerSense Partner Program — self-contained version.
  No imports, no local image/SVG/CSS dependencies, no react-router-dom.
  Tailwind utility classes are preserved, so Tailwind should already be
  available globally in the host CareerSense app.
*/

function Icon({ name, className = "", size = 24 }) {
  const paths = {
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.5A4.5 4.5 0 0 1 21 19"/></>,
    projects: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6M7 17h8"/></>,
    domains: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 8.5 8.5 12S9.5 18.5 12 21"/></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>,
    id: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5.5 16c.7-1.6 1.6-2.4 2.5-2.4s1.8.8 2.5 2.4M13 10h5M13 14h4"/></>,
    letter: <><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v5h5M8 12h8M8 16h6"/></>,
    assignments: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/><path d="m6 8 .5.5L7.5 7"/></>,
    mentor: <><circle cx="8" cy="8" r="3"/><path d="M2.5 19a5.5 5.5 0 0 1 11 0"/><path d="M15 6h6v5h-3l-2 2v-2h-1z"/></>,
    startup: <><path d="M14 4c3 1 5 3 6 6l-6 6-6-6z"/><path d="M9 11 5 15l4 1 1 4 4-4M15 9h.01"/></>,
    reward: <><path d="M8 4h8v4c0 3-1.8 5-4 5s-4-2-4-5z"/><path d="M8 6H4v2c0 2 1.5 3.5 4 3.5M16 6h4v2c0 2-1.5 3.5-4 3.5M12 13v4M8 21h8M9 17h6"/></>,
    certificate: <><rect x="4" y="3" width="16" height="14" rx="2"/><path d="m8 9 2 2 5-5"/><path d="m10 17-1 4 3-2 3 2-1-4"/></>,
    discover: <><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/><path d="M8 11h6M11 8v6"/></>,
    build: <><path d="m14 5 5 5-9 9H5v-5z"/><path d="m12 7 5 5"/></>,
    analyse: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    grow: <><path d="M4 17 10 11l4 4 6-8"/><path d="M15 7h5v5"/></>,
    lead: <><path d="M12 3 5 7v5c0 4.5 2.8 7.5 7 9 4.2-1.5 7-4.5 7-9V7z"/><path d="m9 12 2 2 4-5"/></>,
    credits: <><ellipse cx="9" cy="7" rx="5" ry="2.5"/><path d="M4 7v4c0 1.4 2.2 2.5 5 2.5M4 11v4c0 1.4 2.2 2.5 5 2.5"/><ellipse cx="16" cy="15" rx="4" ry="2.3"/></>,
    workspace: <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8M12 18v4M7 9h10M7 13h6"/></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/></>,
    recognition: <><circle cx="12" cy="9" r="5"/><path d="m9 14-1 7 4-2 4 2-1-7"/></>,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.star}
    </svg>
  );
}

function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`${compact ? "h-5 w-5 text-[10px]" : "h-8 w-8 text-[15px]"} grid shrink-0 place-items-center rounded-[9px] bg-gradient-to-br from-[#16C7CB] to-[#1787E8] font-black text-white shadow-sm`}>
        C
      </span>
      {!compact && (
        <div>
          <div className="text-[16px] font-black leading-none text-[#071A38]">
            Career<span className="text-[#17AFAD]">Sense</span>
          </div>
          <div className="mt-1 text-[5px] font-black uppercase tracking-[0.22em] text-[#60AFC1]">
            AI Career Copilot
          </div>
        </div>
      )}
    </div>
  );
}

function PeopleVisual({ variant = "hero", className = "" }) {
  if (variant === "hero") {
    return (
      <div className={`relative overflow-hidden bg-[linear-gradient(145deg,#dff6fb,#f5fbff_45%,#cde8f5)] ${className}`}>
        <div className="absolute inset-0 opacity-50" style={{backgroundImage:"radial-gradient(#8dd7df 1px,transparent 1px)",backgroundSize:"22px 22px"}} />
        <div className="absolute bottom-0 left-[8%] h-[76%] w-[27%] rounded-t-[100px] bg-[#173a5d]" />
        <div className="absolute bottom-0 left-[36%] h-[88%] w-[28%] rounded-t-[110px] bg-[#1488a8]" />
        <div className="absolute bottom-0 right-[7%] h-[71%] w-[26%] rounded-t-[95px] bg-[#294b75]" />
        <span className="absolute left-[14%] top-[16%] h-[86px] w-[86px] rounded-full bg-[#d8a27b] shadow-lg" />
        <span className="absolute left-[44%] top-[5%] h-[94px] w-[94px] rounded-full bg-[#bb805f] shadow-lg" />
        <span className="absolute right-[13%] top-[20%] h-[82px] w-[82px] rounded-full bg-[#e1b18c] shadow-lg" />
        <div className="absolute bottom-[10%] left-[25%] right-[18%] h-[16%] rounded-2xl border border-white/70 bg-white/80 shadow-xl" />
        <div className="absolute bottom-[13%] left-[31%] h-[7%] w-[30%] rounded bg-[#dce8f1]" />
        <div className="absolute bottom-[14%] right-[22%] h-[5%] w-[13%] rounded bg-[#16b8bf]" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[linear-gradient(135deg,#e9f8fb,#eaf2f8)] ${className}`}>
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[#d6e8ef]" />
      <span className="absolute left-[18%] top-[18%] h-[58px] w-[58px] rounded-full bg-[#d8a27b]" />
      <span className="absolute right-[18%] top-[14%] h-[62px] w-[62px] rounded-full bg-[#c58c6b]" />
      <div className="absolute bottom-0 left-[10%] h-[58%] w-[34%] rounded-t-[55px] bg-[#143c5e]" />
      <div className="absolute bottom-0 right-[9%] h-[62%] w-[36%] rounded-t-[55px] bg-[#128aa2]" />
      <div className="absolute bottom-[7%] left-[30%] right-[26%] h-[22%] rounded-xl border border-white bg-white/90 shadow" />
    </div>
  );
}

function MiniIconCard({ icon }) {
  return (
    <span className="grid h-[48px] w-[48px] place-items-center rounded-[12px] bg-[linear-gradient(145deg,#eefaff,#f8fdff)] text-[#13AABD] shadow-[0_6px_16px_rgba(8,31,62,.06)]">
      <Icon name={icon} size={30} />
    </span>
  );
}

const APPLY_LINK =
  "mailto:support.careersense@gmail.com?subject=CareerSense%20Partner%20Program%20Application&body=Hello%20CareerSense%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20CareerSense%20Partner%20Program.%0A%0AName%3A%0ACollege%20%2F%20Company%3A%0ALocation%3A%0AArea%20of%20Interest%3A%0ALinkedIn%3A%0A";

const stats = [
  ["users", "1000+", "Partners Onboarded"],
  ["projects", "500+", "Projects Delivered"],
  ["domains", "50+", "Domains to Explore"],
  ["star", "4.8/5", "Partner Satisfaction"],
];

const whyJoin = [
  {
    icon: "id",
    title: "Verified Partner ID",
    description: "Get your official Partner ID and build your profile with credibility.",
  },
  {
    icon: "letter",
    title: "Offer Letter",
    description: "Receive an official letter recognizing your role and contribution.",
  },
  {
    icon: "assignments",
    title: "Weekly Assignments",
    description: "Work on real tasks every week and build your portfolio.",
  },
  {
    icon: "mentor",
    title: "Mentorship",
    description: "Learn directly from founders and industry professionals.",
  },
  {
    icon: "startup",
    title: "Real Startup Experience",
    description: "Work on live projects inside a fast-growing career platform.",
  },
  {
    icon: "reward",
    title: "Performance Rewards",
    description: "Earn rewards, bonuses and top-performer recognition.",
  },
  {
    icon: "certificate",
    title: "Certificate & Letter",
    description: "Get completion recognition after meeting program requirements.",
  },
];

const journey = [
  {
    number: "1",
    icon: "discover",
    title: "Discover",
    description:
      "Explore the CareerSense ecosystem, understand products, users and opportunities.",
  },
  {
    number: "2",
    icon: "build",
    title: "Build",
    description:
      "Work on real assignments across product, technology, design, AI and data to create impact.",
  },
  {
    number: "3",
    icon: "analyse",
    title: "Analyse",
    description:
      "Convert data and feedback into insights that guide better product and growth decisions.",
  },
  {
    number: "4",
    icon: "grow",
    title: "Grow",
    description:
      "Drive growth through marketing, outreach, SEO, community and partnerships.",
  },
  {
    number: "5",
    icon: "lead",
    title: "Lead",
    description:
      "Think like a founder, plan strategy and present how you will scale CareerSense.",
  },
];

const assignmentGroups = [
  {
    phase: "Phase 1",
    title: "Discover",
    color: "#2E9BEF",
    bg: "#EDF7FF",
    assignments: [
      ["01", "CareerSense 360°"],
      ["02", "Decode the Machine"],
      ["03", "Inside the Founder’s Room"],
      ["04", "Voice of the User"],
    ],
  },
  {
    phase: "Phase 2",
    title: "Build",
    color: "#27C9B7",
    bg: "#ECFCF8",
    assignments: [
      ["05", "₹50,000 Build Challenge"],
      ["06", "UX Rescue Mission"],
      ["07", "Make CareerSense Faster"],
      ["08", "Connect Everything"],
      ["09", "Ship a Real Feature"],
      ["10", "AI Inside CareerSense"],
    ],
  },
  {
    phase: "Phase 3",
    title: "Analyse",
    color: "#8668E8",
    bg: "#F5F0FF",
    assignments: [
      ["11", "CareerSense Data Detective"],
      ["12", "Predict the Future"],
      ["13", "Growth Experiment Lab"],
    ],
  },
  {
    phase: "Phase 4",
    title: "Grow",
    color: "#F59A48",
    bg: "#FFF5EB",
    assignments: [
      ["14", "Google Me"],
      ["15", "Make CareerSense Viral"],
      ["16", "Campus Catalyst"],
      ["17", "Enterprise Bridge"],
      ["18", "Build the Community"],
    ],
  },
  {
    phase: "Phase 5",
    title: "Lead",
    color: "#F05B86",
    bg: "#FFF0F4",
    assignments: [
      ["19", "CEO for a Week"],
      ["20", "The Boardroom Challenge"],
    ],
  },
];

const included = [
  [
    "credits",
    "50,000 Credits / Month",
    "Use across CareerSense platform during your active Partner term.",
  ],
  [
    "workspace",
    "Partner Workspace",
    "Expanded access for approved assignments and collaboration.",
  ],
  [
    "id",
    "Partner ID Card",
    "Official, profile-linked CareerSense Partner identity.",
  ],
  [
    "letter",
    "Offer & Letter",
    "Offer & Engagement Letter issued after successful onboarding.",
  ],
  [
    "book",
    "Partner Learning Library",
    "Access to handbooks, guides and resources mapped to assignments.",
  ],
  [
    "recognition",
    "Completion Recognition",
    "Certificate and completion letter on meeting all requirements.",
  ],
];

const completionRequirements = [
  "Complete at least 12 core assignments",
  "Achieve at least 70% overall Partner Score",
  "Complete one major build / growth / analysis project",
  "Participate in required leadership / community sessions",
  "Complete the final Boardroom Challenge",
  "Maintain professional conduct and follow CareerSense data & brand policies",
];

const earned = [
  ["certificate", "Partner Program", "Certificate"],
  ["letter", "Completion", "Letter"],
  ["projects", "Contribution", "Documentation"],
  ["star", "Recognition on", "CareerSense Platform"],
];

const faqs = [
  [
    "What is the CareerSense Partner Program?",
    "A structured 3-month experiential learning and contribution program built around real CareerSense assignments.",
  ],
  [
    "How long is the program?",
    "The active Partner Program runs for 12 weeks, or approximately 3 months.",
  ],
  [
    "Do I need prior startup experience?",
    "No. The program is designed to help you learn through guided resources, assignments and practical exposure.",
  ],
  [
    "Will I receive a certificate?",
    "Completion recognition is issued after meeting the published participation and completion requirements.",
  ],
  [
    "How many assignments are included?",
    "There are 20 real-world assignments across Discover, Build, Analyse, Grow and Lead.",
  ],
  [
    "What do I receive after onboarding?",
    "You receive Partner identity, program documentation, learning resources and access to the Partner assignment journey.",
  ],
];

function CheckPoint({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#5B6D83]">
      <span className="grid h-[15px] w-[15px] place-items-center rounded-full border border-[#7EDBD6] text-[8px] font-black text-[#13B6AA]">
        ✓
      </span>
      {children}
    </span>
  );
}

function SectionTitle({ children, accent }) {
  return (
    <h2 className="text-center text-[25px] font-black tracking-[-0.035em] text-[#081B39] sm:text-[31px]">
      {children}{" "}
      {accent ? <span className="text-[#18BFC5]">{accent}</span> : null}
    </h2>
  );
}

function PartnerPass() {
  return (
    <div className="relative mx-auto w-[145px] pt-10 sm:w-[165px]">
      <div className="absolute left-1/2 top-0 h-[48px] w-[12px] -translate-x-1/2 rounded-b-md bg-gradient-to-b from-[#25CDC3] to-[#168D9C] shadow-sm" />
      <div className="absolute left-1/2 top-[36px] h-[18px] w-[48px] -translate-x-1/2 rounded-full border-[5px] border-[#0A2445] bg-[#DDEAF3]" />

      <div className="relative overflow-hidden rounded-[15px] border border-[#0E7490] bg-[#071A38] px-5 pb-5 pt-7 text-white shadow-[0_18px_40px_rgba(7,26,56,.18)]">
        <div className="flex items-center gap-2">
          <BrandMark compact />
          <span className="text-[8px] font-black">CareerSense</span>
        </div>

        <div className="mt-5 text-[14px] font-black uppercase leading-[1.05]">
          Partner
          <br />
          Program
        </div>

        <div className="mt-3 text-[8px] font-black uppercase tracking-[0.08em] text-[#22D3C5]">
          3 Months · 12 Weeks
        </div>

        <div className="mt-4 grid gap-2 text-[7px] leading-3 text-[#D3E0ED]">
          <span>● 50,000 Credits / Month</span>
          <span>● Partner Workspace Access</span>
          <span>● 20 Real-World Assignments</span>
          <span>● Leadership & Founder Exposure</span>
          <span>● Certificate & Completion Letter</span>
        </div>

        <div className="mx-auto mt-5 h-px w-full bg-white/15" />

        <div className="mt-4 text-center text-[6px] font-black uppercase tracking-[0.16em] text-[#26D0C1]">
          Build · Learn · Impact
        </div>
      </div>
    </div>
  );
}

export default function PartnerProgramPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7FBFF] text-[#081B39]">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .partner-soft-shadow {
          box-shadow: 0 10px 28px rgba(8, 31, 62, 0.055);
        }

        .partner-card-shadow {
          box-shadow: 0 8px 24px rgba(8, 31, 62, 0.07);
        }

        .partner-stat-divider:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 22%;
          width: 1px;
          height: 56%;
          background: #D5E6F2;
        }

        @media (max-width: 767px) {
          .partner-stat-divider::after {
            display: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 72% 25%, rgba(20,188,208,.16), transparent 28%), linear-gradient(180deg,#f9fdff 0%,#edf8ff 100%)",
        }}
      >
        <div className="mx-auto grid min-h-[300px] max-w-[1400px] items-center gap-8 px-6 py-8 lg:grid-cols-[.96fr_1.04fr] lg:px-9 lg:py-4">
          <div className="relative z-20 py-4 lg:py-7">
            <span className="inline-flex rounded-full border border-[#5DCAD6] bg-white/65 px-3 py-1 text-[8px] font-black uppercase tracking-[0.08em] text-[#148AA3]">
              CareerSense Partner Program
            </span>

            <h1 className="mt-4 max-w-[720px] text-[38px] font-black leading-[0.94] tracking-[-0.045em] text-[#081B39] sm:text-[48px] xl:text-[58px]">
              Build. Learn. Lead.
              <br />
              Make a{" "}
              <span className="bg-gradient-to-r from-[#10AED0] to-[#19BCAF] bg-clip-text text-transparent">
                Real Impact.
              </span>
            </h1>

            <p className="mt-4 max-w-[590px] text-[12px] font-medium leading-[1.45] text-[#44566D] sm:text-[13px]">
              Join the CareerSense Partner Program and work
              <br className="hidden sm:block" />
              inside one of India&apos;s fastest-growing career platforms.
            </p>

            <div className="mt-4 grid max-w-[550px] gap-x-7 gap-y-2 sm:grid-cols-2">
              <CheckPoint>Real startup experience</CheckPoint>
              <CheckPoint>Mentorship from founders</CheckPoint>
              <CheckPoint>Flexible & remote</CheckPoint>
              <CheckPoint>Certificate & rewards</CheckPoint>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={APPLY_LINK}
                className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-[5px] bg-gradient-to-r from-[#10AEC5] to-[#149FC5] px-5 text-[9px] font-black text-white shadow-[0_7px_18px_rgba(20,174,197,.18)] transition hover:-translate-y-0.5"
              >
                Apply Now & Become a Partner
                <span>→</span>
              </a>

              <a
                href="#journey"
                className="inline-flex min-h-[38px] items-center justify-center gap-3 rounded-[5px] border border-[#99C9DA] bg-white/80 px-5 text-[9px] font-black text-[#18314F] transition hover:bg-white"
              >
                Explore Program
                <span className="grid h-[14px] w-[14px] place-items-center rounded-full border border-[#5E7892] text-[6px]">
                  ▶
                </span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[270px] self-end lg:min-h-[315px]">
            <div className="absolute inset-y-0 left-[-60px] z-10 w-[160px] bg-gradient-to-r from-transparent via-[#F6FBFF]/75 to-[#F6FBFF]" />
            <PeopleVisual
              variant="hero"
              className="absolute bottom-0 right-0 h-full w-[100%] rounded-l-[34px] shadow-[0_26px_60px_rgba(7,26,56,.12)]"
            />
          </div>
        </div>
      </section>

      {/* FLOATING STATS */}
      <section className="relative z-30 -mt-4 px-5">
        <div className="partner-soft-shadow mx-auto grid max-w-[1380px] overflow-hidden rounded-[22px] border border-[#E0EDF4] bg-white md:grid-cols-4">
          {stats.map(([icon, value, label]) => (
            <div
              key={label}
              className="partner-stat-divider relative flex items-center justify-center gap-4 px-5 py-5"
            >
              <MiniIconCard icon={icon} />
              <div>
                <div className="text-[21px] font-black leading-none tracking-[-0.035em] text-[#071A38]">
                  {value}
                </div>
                <div className="mt-1 text-[8px] font-semibold text-[#60748A]">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="px-5 pb-4 pt-5">
        <div className="mx-auto max-w-[1380px]">
          <h2 className="text-center text-[15px] font-black tracking-[-0.01em] text-[#071A38]">
            Why Join the{" "}
            <span className="text-[#18AFC5]">
              CareerSense Partner Program?
            </span>
          </h2>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {whyJoin.map((item) => (
              <article
                key={item.title}
                className="partner-card-shadow flex min-h-[145px] flex-col items-center rounded-[11px] border border-[#E2EDF4] bg-white px-3 pb-4 pt-3 text-center"
              >
                <div className="grid h-[52px] w-full place-items-center">
                  <MiniIconCard icon={item.icon} />
                </div>

                <h3 className="mt-2 text-[8.5px] font-black text-[#112642]">
                  {item.title}
                </h3>

                <p className="mt-1.5 max-w-[130px] text-[7px] font-medium leading-[1.35] text-[#65788C]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section
        id="journey"
        className="relative mt-3 overflow-hidden px-5 py-7 text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(24,209,196,.15), transparent 36%), linear-gradient(135deg,#06152E,#082542)",
        }}
      >
        <div className="mx-auto max-w-[1380px]">
          <h2 className="text-center text-[22px] font-black tracking-[-0.025em]">
            Your <span className="text-[#18D1C4]">12-Week Journey</span>
          </h2>

          <div className="relative mt-7 grid gap-8 md:grid-cols-5">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-[37px] hidden border-t border-dotted border-[#19C6D6]/65 md:block" />

            {journey.map((item) => (
              <article key={item.title} className="relative z-10 text-center">
                <div className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full border border-[#1C7292] bg-[#092744] shadow-[0_0_24px_rgba(18,190,218,.16)]">
                  <Icon name={item.icon} size={42} className="text-white" />
                </div>

                <span className="mx-auto mt-3 grid h-4 w-4 place-items-center rounded-full bg-[#0E7B9E] text-[7px] font-black text-white">
                  {item.number}
                </span>

                <h3 className="mt-2 text-[13px] font-black">{item.title}</h3>

                <p className="mx-auto mt-2 max-w-[180px] text-[8px] font-medium leading-[1.5] text-[#D1DFEA]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ASSIGNMENTS */}
      <section className="px-5 py-4">
        <div className="mx-auto max-w-[1380px]">
          <div className="relative flex items-center justify-center">
            <h2 className="text-center text-[24px] font-black tracking-[-0.035em] text-[#081B39]">
              <span className="text-[#16C6BD]">20</span> Real-World Assignments
            </h2>

            <a
              href="#all-assignments"
              className="absolute right-0 hidden rounded-[7px] border border-[#58B7D2] bg-white px-5 py-2 text-[8px] font-black text-[#193651] sm:inline-flex"
            >
              View All Assignments
            </a>
          </div>

          <div
            id="all-assignments"
            className="mt-5 grid gap-4 lg:grid-cols-5"
          >
            {assignmentGroups.map((group) => (
              <article
                key={group.title}
                className="partner-card-shadow flex min-h-[255px] flex-col rounded-[10px] border border-[#E0E9F0] bg-white p-4"
                style={{
                  boxShadow: `0 8px 22px ${group.color}12`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="grid h-[30px] w-[30px] place-items-center rounded-[7px]"
                    style={{
                      backgroundColor: group.bg,
                      color: group.color,
                    }}
                  >
                    <span className="text-[11px] font-black">◉</span>
                  </span>

                  <div>
                    <p
                      className="text-[6.5px] font-black"
                      style={{ color: group.color }}
                    >
                      {group.phase}
                    </p>
                    <h3 className="text-[12px] font-black text-[#0D223F]">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {group.assignments.map(([number, title]) => (
                    <div key={number} className="flex items-start gap-3">
                      <span
                        className="w-[17px] shrink-0 text-[7px] font-black"
                        style={{ color: group.color }}
                      >
                        {number}
                      </span>
                      <span className="text-[7.5px] font-semibold leading-3 text-[#445B70]">
                        {title}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-auto pt-5 text-center text-[7px] font-black"
                  style={{ color: group.color }}
                >
                  {group.assignments.length} Assignments
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="px-5 py-3">
        <div className="mx-auto max-w-[1380px]">
          <SectionTitle accent="Included">What&apos;s</SectionTitle>

          <div className="partner-card-shadow mt-4 grid overflow-hidden rounded-[12px] border border-[#E2ECF2] bg-white md:grid-cols-3 xl:grid-cols-6">
            {included.map(([icon, title, description], index) => (
              <article
                key={title}
                className={`px-5 py-5 text-center ${
                  index < included.length - 1
                    ? "xl:border-r xl:border-[#EEF3F6]"
                    : ""
                }`}
              >
                <span className="mx-auto flex justify-center"><MiniIconCard icon={icon} /></span>
                <h3 className="mt-2 text-[8px] font-black text-[#102642]">
                  {title}
                </h3>
                <p className="mx-auto mt-1.5 max-w-[135px] text-[7px] font-medium leading-[1.45] text-[#64778B]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETION + EARN */}
      <section className="px-5 py-3">
        <div className="mx-auto grid max-w-[1380px] gap-3 lg:grid-cols-[1.25fr_.8fr_1fr]">
          <article className="partner-card-shadow rounded-[12px] border border-[#E3EDF3] bg-white px-6 py-5">
            <h2 className="text-[14px] font-black tracking-[-0.02em] text-[#112642]">
              Completion & Recognition
            </h2>

            <div className="mt-5 grid gap-3">
              {completionRequirements.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-[1px] grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border border-[#63D8D1] text-[7px] font-black text-[#14B7AB]">
                    ✓
                  </span>
                  <span className="text-[7.5px] font-semibold leading-3.5 text-[#455D72]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <div className="overflow-hidden rounded-[10px] border border-[#E1EBF1] bg-white p-2">
            <PeopleVisual variant="team" className="h-full min-h-[210px] w-full rounded-[7px]" />
          </div>

          <article className="partner-card-shadow rounded-[12px] border border-[#E3EDF3] bg-white px-5 py-5">
            <h2 className="text-[14px] font-black tracking-[-0.02em] text-[#112642]">
              What You Earn
            </h2>

            <div className="mt-5 grid grid-cols-4 gap-3">
              {earned.map(([icon, line1, line2]) => (
                <div key={`${line1}-${line2}`} className="text-center">
                  <div className="mx-auto grid h-[48px] w-[48px] place-items-center rounded-[10px] bg-[#F1FAFC]">
                    <Icon name={icon} size={31} className="text-[#13AABD]" />
                  </div>
                  <div className="mt-2 text-[6.5px] font-black leading-[1.4] text-[#21374F]">
                    {line1}
                    <br />
                    {line2}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 h-px bg-[#E4EDF2]" />

            <p className="mt-3 text-[6.6px] font-medium leading-[1.45] text-[#687B8E]">
              <strong>Note:</strong> This is an experiential learning program.
              Completion, letters and recognition are granted based on verified
              participation and meeting the requirements.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-[1380px]">
          <div className="relative">
            <div className="text-center">
              <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#14A9C1]">
                Need clarity?
              </p>
              <h2 className="mt-2 text-[25px] font-black tracking-[-0.035em] text-[#071A38] sm:text-[31px]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_180px]">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {faqs.map(([question, answer], index) => (
                  <details
                    key={question}
                    open={index === 0}
                    className="group overflow-hidden rounded-[8px] border border-[#DCE8F0] bg-white open:border-[#58A9E8]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-3">
                        <span className="text-[8px] text-[#7E94A8]">◉</span>
                        <span className="text-[7.5px] font-black text-[#19304C]">{question}</span>
                      </span>
                      <span className="text-[13px] font-black text-[#0EAEC6] group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="border-t border-[#EDF2F5] px-4 py-3 text-[7.5px] font-medium leading-4 text-[#60758A]">
                      {answer}
                    </div>
                  </details>
                ))}
              </div>

              <div className="hidden items-start justify-center lg:flex">
                <PartnerPass />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-3">
        <div
          className="relative mx-auto max-w-[1420px] overflow-hidden rounded-[18px] px-7 py-6 text-white sm:px-9"
          style={{
            backgroundImage:
              "radial-gradient(circle at 88% 25%, rgba(23,197,181,.18), transparent 27%), linear-gradient(135deg,#06152E,#0A294A)",
          }}
        >
          <div className="pointer-events-none absolute -right-8 -top-10 grid h-[230px] w-[230px] place-items-center rounded-full border border-cyan-300/10 text-cyan-300/20">
            <Icon name="startup" size={112} />
          </div>

          <div className="relative grid items-center gap-6 lg:grid-cols-[180px_1fr_auto]">
            <div className="overflow-hidden rounded-[10px] border border-white/10">
              <PeopleVisual variant="team" className="h-[95px] w-full" />
            </div>

            <div>
              <p className="text-[7px] font-black uppercase tracking-[0.18em] text-[#19C8C0]">
                Ready to build, learn and lead?
              </p>

              <h2 className="mt-2 text-[23px] font-black tracking-[-0.035em] sm:text-[29px]">
                Build work you can actually talk about.
              </h2>

              <p className="mt-3 max-w-[760px] text-[7.5px] font-medium leading-[1.55] text-[#B8C8D8]">
                Join the CareerSense Partner Program and spend three months
                learning how products, technology, data, AI, growth and
                leadership come together inside a startup.
              </p>
            </div>

            <a
              href={APPLY_LINK}
              className="relative z-10 inline-flex min-h-[42px] items-center justify-center rounded-[7px] bg-gradient-to-r from-[#16C8D2] to-[#2F7CE8] px-7 text-[8px] font-black text-white shadow-[0_9px_24px_rgba(20,191,210,.18)] transition hover:-translate-y-0.5"
            >
              Apply for the Partner Program →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5EDF3] bg-[#F1F7FC] px-6 pb-5 pt-5">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.55fr_.7fr_.7fr_.7fr_.9fr]">
          <div>
            <div className="flex items-center gap-2">
              <BrandMark />
            </div>

            <p className="mt-5 max-w-[380px] text-[7.5px] font-medium leading-[1.65] text-[#536B80]">
              Your AI career copilot for readiness diagnostics, resumes, ATS
              checks, LinkedIn optimization, interview preparation, structured
              learning, certifications, and real professional-development
              opportunities.
            </p>

            <div className="mt-5 flex gap-4 text-[9px] font-black text-[#304A63]">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">▶</a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="Instagram">◎</a>
            </div>
          </div>

          <FooterColumn
            title="Career Tools"
            items={[
              "Career Score Checker",
              "LinkedIn Optimizer",
              "AI Resume Builder",
              "ATS Score Checker",
              "Cover Letter Builder",
            ]}
          />

          <FooterColumn
            title="Learn & Grow"
            items={[
              "Partner Program",
              "E-Learning & eBooks",
              "Interview Simulator",
              "Skill Certification",
              "CareerSense for Colleges",
            ]}
          />

          <FooterColumn
            title="CareerSense"
            items={[
              "How It Works",
              "Explore All Tools",
              "Frequently Asked Questions",
              "Dashboard",
              "Contact Support",
            ]}
          />

          <div>
            <h3 className="text-[8px] font-black text-[#152A44]">Contact</h3>

            <div className="mt-4 grid gap-3 text-[7px] font-medium leading-4 text-[#536A7F]">
              <span>✉ support.careersense@gmail.com</span>
              <span>☎ 🇺🇸 +1 (201) 893-6385</span>
              <span>☎ 🇮🇳 +91 9891422329</span>
              <span>
                ◉ 85 CourtHouse Pl, Jersey City
                <br />
                <span className="pl-[12px]">New Jersey - 07306</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-[8px] font-black text-[#152A44]">{title}</h3>

      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <a
            key={item}
            href="#"
            className="text-[7px] font-medium text-[#536A7F] transition hover:text-[#0EA8B9]"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowRight, BadgeCheck, CalendarRange, FileCheck2, FlipHorizontal2, Globe, IdCard, Info, Mail, MapPin, Phone, ShieldCheck, Check } from "lucide-react";
import { Link } from "react-router-dom";
import CSLogo from "../../Assets/CSlogo.png";

export const partnerApplicationLink = "mailto:support.careersense@gmail.com?subject=Application%20for%20CareerSense%20Partner%20Program&body=Hello%20CareerSense%20Team%2C%0A%0AI%20would%20like%20to%20apply%20for%20the%20CareerSense%20Partner%20Program.%0A%0AFull%20Name%3A%0ALocation%3A%0ACurrent%20Role%20or%20College%3A%0AArea%20of%20Interest%3A%0ALinkedIn%20Profile%3A%0A%0AThank%20you.";

function MiniLogo({ inverse = false }) {
  return (
    <div className="flex items-center gap-1.5">
      <img src={CSLogo} alt="" className="h-7 w-auto object-contain" />
      <div>
        <div className={`text-[12px] font-black leading-none ${inverse ? "text-white" : "text-[#07172f]"}`}>
          Career<span className="text-teal-400">Sense</span>
        </div>
        <div className={`mt-1 text-[4px] font-bold uppercase tracking-[.19em] ${inverse ? "text-slate-300" : "text-slate-500"}`}>
          Guiding careers. Building futures.
        </div>
      </div>
    </div>
  );
}

function MiniDetail({ icon: Icon, label, value }) {
  return (
    <div className="grid grid-cols-[15px_42px_1fr] items-center gap-1 text-[6px]">
      <Icon size={9} className="text-teal-300" />
      <span className="text-slate-300">{label}</span>
      <strong className="truncate text-white">{value}</strong>
    </div>
  );
}

function SamplePartnerCard() {
  const [face, setFace] = useState("front");
  
  return (
    <div className="relative z-10 flex w-full flex-col items-center pt-8">
      {/* Concentric Decorative Rings */}
      <div className="absolute left-1/2 top-[160px] z-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="partner-ring partner-ring-one h-[250px] w-[250px] rounded-full border-[3px] border-teal-500/30" />
        <div className="partner-ring partner-ring-two absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-teal-500/20" />
        <div className="partner-ring partner-ring-three absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-500/10" />
      </div>

      {/* 3D Card */}
      <div className="partner-card-float relative z-10 h-[300px] w-[188px] [perspective:1000px]">
        <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${face === "back" ? "[transform:rotateY(180deg)]" : ""}`}>
          
          {/* Front of Card */}
          <div className="absolute inset-0 overflow-hidden rounded-[17px] bg-[#06284c] shadow-[0_30px_60px_rgba(8,45,87,.3)] [backface-visibility:hidden]">
            <div className="relative h-[121px] bg-[#f9fbfd] p-4">
              <MiniLogo />
              <div className="absolute -bottom-7 left-1/2 h-20 w-[238px] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600" />
              <div className="absolute -bottom-5 left-1/2 h-[70px] w-[232px] -translate-x-1/2 rounded-[50%] bg-[#06284c]" />
              
              {/* Photo Avatar instead of "S" */}
              <div className="absolute -bottom-11 left-1/2 h-[86px] w-[86px] -translate-x-1/2 overflow-hidden rounded-xl border-[3px] border-blue-500 bg-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Partner Profile" 
                  className="h-full w-full object-cover" 
                />
                <div className="absolute bottom-0 right-1 text-4xl font-black text-white/40 drop-shadow-md">S</div>
              </div>
            </div>
            
            <div className="px-4 pb-3 pt-[50px]">
              <h3 className="text-center text-[13px] font-black uppercase text-white">Sample Partner</h3>
              <p className="mt-0.5 text-center text-[8px] font-bold text-teal-300">CareerSense Partner</p>
              <div className="mt-4 grid gap-1.5">
                <MiniDetail icon={BadgeCheck} label="Partner ID" value="CS-SAMDEL" />
                <MiniDetail icon={ShieldCheck} label="Batch" value="2026" />
                <MiniDetail icon={MapPin} label="Location" value="Delhi" />
                <MiniDetail icon={Mail} label="Email" value="sample@careersenseai.com" />
                <MiniDetail icon={Phone} label="Phone" value="+91 98XXX XXXXX" />
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 overflow-hidden rounded-[17px] bg-[#06284c] shadow-[0_30px_60px_rgba(8,45,87,.3)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="relative z-10 px-4 pt-4">
              <MiniLogo inverse />
              <div className="mt-7 text-center">
                <h3 className="text-[19px] font-black uppercase leading-none text-white">Partner ID<br/>Card</h3>
                <div className="mt-3 inline-flex rounded-md bg-gradient-to-r from-teal-400 to-cyan-300 px-3 py-1.5 text-[7px] font-black uppercase tracking-wider text-[#06284c]">Verified &amp; Active</div>
              </div>
            </div>
            <div className="absolute left-1/2 top-[130px] h-[85px] w-[245px] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300" />
            <div className="absolute bottom-0 left-1/2 h-[188px] w-[240px] -translate-x-1/2 rounded-t-[50%] bg-[#f9fbfd] px-[34px] pb-2 pt-10">
              <p className="text-center text-[6px] font-bold leading-[10px] text-[#07172f]">This card confirms the holder as an active CareerSense partner. Present it when verification is requested.</p>
              <div className="my-2 h-px bg-teal-400" />
              <div className="grid gap-1 text-[5.5px] font-semibold text-slate-700">
                <span className="flex items-center gap-2 border-b border-dashed border-teal-300 pb-1"><Mail size={8} className="text-blue-700" />sample@careersenseai.com</span>
                <span className="flex items-center gap-2 border-b border-dashed border-teal-300 pb-1"><Globe size={8} className="text-blue-700" />careersenseai.com</span>
                <span className="flex items-center gap-2 border-b border-dashed border-teal-300 pb-1"><Phone size={8} className="text-blue-700" />+91 98XXX XXXXX</span>
                <span className="flex items-center gap-2"><MapPin size={8} className="text-blue-700" />Delhi</span>
              </div>
              <p className="mt-2 text-center text-[4px] font-bold uppercase tracking-wider text-slate-500">Property of CareerSense · Non-transferable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Bottom Toggle */}
      <button 
        type="button" 
        onClick={() => setFace((current) => current === "front" ? "back" : "front")} 
        aria-label="Toggle ID card face"
        className="mt-6 flex items-center gap-2 text-[13px] font-bold text-[#071a38] transition-colors hover:text-teal-600"
      >
        <FlipHorizontal2 size={16} /> 
        View Front | Back 
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default function PartnerProgramSection() {
  return (
    <section id="partner-program" className="relative px-4 py-12 sm:px-6 sm:py-16">
      <style>{`
        @keyframes partner-ring-breathe {
          0%, 100% { transform: translate(var(--partner-ring-x, 0), var(--partner-ring-y, 0)) scale(.92); opacity: .35; }
          50% { transform: translate(var(--partner-ring-x, 0), var(--partner-ring-y, 0)) scale(1.08); opacity: .8; }
        }
        @keyframes partner-card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes partner-status-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.7); opacity: .28; }
        }
        @keyframes partner-network-drift {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: .1; }
          50% { transform: translate3d(-10px, 7px, 0); opacity: .16; }
        }
        .partner-ring { transform-origin: center; will-change: transform, opacity; animation: partner-ring-breathe 4.8s cubic-bezier(.25,1,.5,1) infinite; }
        .partner-ring-two { --partner-ring-x: -50%; --partner-ring-y: -50%; animation-delay: -1.2s; }
        .partner-ring-three { --partner-ring-x: -50%; --partner-ring-y: -50%; animation-delay: -2.4s; }
        .partner-card-float { will-change: transform; animation: partner-card-float 4.2s cubic-bezier(.25,1,.5,1) infinite; }
        .partner-status-pulse { will-change: transform, opacity; animation: partner-status-pulse 2.2s cubic-bezier(.25,1,.5,1) infinite; }
        .partner-network-drift { will-change: transform, opacity; animation: partner-network-drift 8s cubic-bezier(.25,1,.5,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .partner-ring, .partner-card-float, .partner-status-pulse, .partner-network-drift { animation: none !important; }
        }
      `}</style>
      
      {/* Unified Background Container */}
      <div className="relative mx-auto flex max-w-[1240px] flex-col items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e6f2f7] to-[#f0f8fa] p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] lg:flex-row lg:gap-16 lg:p-14">
        <div className="absolute right-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-emerald-700 shadow-sm backdrop-blur-sm sm:right-7 sm:top-7">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center"><span className="partner-status-pulse absolute h-2.5 w-2.5 rounded-full bg-emerald-400" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
          Active Now
        </div>
        
        {/* Subtle Network & Dotted Background Overlays */}
        <div className="absolute left-0 top-0 h-full w-1/3 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(14,116,144,.15) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        
        {/* Right side abstract graphic mimicking network/arrow */}
        <div className="partner-network-drift absolute right-0 top-0 h-full w-2/3 pointer-events-none overflow-hidden opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,500 L700,100 L700,300 M700,100 L500,100" stroke="#06b6d4" strokeWidth="60" fill="none" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="200" cy="400" r="15" fill="#06b6d4" />
              <circle cx="500" cy="250" r="25" fill="#06b6d4" />
              <circle cx="650" cy="450" r="10" fill="#06b6d4" />
              <line x1="200" y1="400" x2="500" y2="250" stroke="#06b6d4" strokeWidth="2" />
              <line x1="500" y1="250" x2="650" y2="450" stroke="#06b6d4" strokeWidth="2" />
            </svg>
        </div>

        {/* Left Column: ID Card */}
        <div className="relative flex w-full max-w-[360px] flex-shrink-0 items-center justify-center lg:w-[40%]">
          <SamplePartnerCard />
        </div>

        {/* Right Column: Content */}
        <article className="relative z-10 flex w-full flex-col justify-center lg:w-[60%]">
          
          <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] text-teal-600">
            CareerSense Partner Program
          </h4>
          
          {/* Glass-Pill Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-slate-300/60 bg-white/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#071a38] backdrop-blur-sm">
              Flexible Mode
            </span>
            <span className="rounded-full border border-slate-300/60 bg-white/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#071a38] backdrop-blur-sm">
              6 Months
            </span>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#071a38]">
              Selected: <Check size={14} className="rounded-full bg-teal-100 p-[2px] text-teal-600" />
            </span>
          </div>
          
          <h2 className="mt-6 text-[32px] font-black leading-[1.15] tracking-tight text-[#071a38] sm:text-[40px]">
            Work directly with CareerSense and build credible experience.
          </h2>
          
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-700">
            Contribute to live initiatives with guidance from the CareerSense leadership team. Selected Partners receive a verified ID and offer letter, with a relieving letter after successful program completion.
          </p>
          
          {/* Feature List */}
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[14px] font-bold text-[#071a38]">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-teal-100 text-teal-600"><IdCard size={14} /></span>
              Verified Partner ID
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-teal-100 text-teal-600"><FileCheck2 size={14} /></span>
              Formal documentation
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-teal-100 text-teal-600"><CalendarRange size={14} /></span>
              Structured contribution
            </span>
          </div>
          
          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a 
              href={partnerApplicationLink} 
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-8 text-[15px] font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-105 hover:shadow-xl"
            >
              Apply Now <ArrowRight size={18} />
            </a>
            <Link 
              to="/partner-program" 
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] border border-slate-300 bg-white/40 px-8 text-[15px] font-bold text-[#071a38] backdrop-blur-md transition-all hover:bg-white/70"
            >
              <Info size={18} /> Details
            </Link>
          </div>

        </article>
      </div>
    </section>
  );
}

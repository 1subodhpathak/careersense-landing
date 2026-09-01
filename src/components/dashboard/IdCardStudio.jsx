import { useRef, useState } from "react";
import { BadgeCheck, Download, FlipHorizontal2, Globe, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import html2canvas from "html2canvas";
import CSLogo from "../../Assets/CSlogo.png";

function CardLogo({ inverse = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src={CSLogo} alt="" className="h-10 w-auto object-contain" />
      <div>
        <div className={`text-xl font-black tracking-tight ${inverse ? "text-white" : "text-[#07172f]"}`}>Career<span className="text-teal-400">Sense</span></div>
        <div className={`text-[7px] font-bold uppercase tracking-[0.22em] ${inverse ? "text-slate-300" : "text-slate-500"}`}>Guiding careers. Building futures.</div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return <div className="grid grid-cols-[25px_72px_1fr] items-center gap-2 text-[11px]"><Icon size={15} className="text-teal-300" /><span className="text-slate-300">{label}</span><strong className="truncate text-white">{value || "Not provided"}</strong></div>;
}

export default function IdCardStudio({ profile, user }) {
  const [face, setFace] = useState("front");
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);
  const name = profile.fullName || user?.fullName || "CareerSense Partner";
  const email = profile.email || user?.primaryEmailAddress?.emailAddress || "Not provided";
  const phone = profile.phone || "Not provided";
  const location = profile.location || profile.geographicalAlignment || "Not provided";
  const status = profile.profileStatus || profile.currentJobTitle || "Career Partner";
  const batch = profile.batch || new Date().getFullYear().toString();
  const firstName = name.trim().split(/\s+/)[0].replace(/[^a-z]/gi, "") || "Part";
  const city = location.split(",")[0].replace(/[^a-z]/gi, "") || "LOC";
  const nameCode = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1, 4).toLowerCase()}`;
  const locationCode = city.slice(0, 3).toUpperCase().padEnd(3, "X");
  const partnerId = `CS-${nameCode}${locationCode}`;
  const avatar = profile.avatar || user?.imageUrl;

  async function exportCard() {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3, backgroundColor: null, useCORS: true });
      const link = document.createElement("a");
      link.download = `${partnerId}-${face}-partner-id.png`;
      link.href = canvas.toDataURL("image/png", 1);
      link.click();
    } finally { setExporting(false); }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><UserRound size={19} /></div><div><h3 className="text-base font-bold text-slate-900">Profile data</h3><p className="mt-1 text-xs leading-5 text-slate-500">Your Partner ID is generated from the master profile. Update missing information in My Profile.</p></div></div>
        <div className="mt-5 grid gap-3">
          {[['Full name', name], ['Email', email], ['Phone', phone], ['Status', status], ['Batch', batch], ['Partner ID', partnerId], ['Location', location]].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span><span className="max-w-[58%] truncate text-right text-sm font-bold text-slate-800">{value}</span></div>)}
        </div>
        <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50 p-4 text-xs leading-5 text-teal-800"><strong>CareerSense Official ID.</strong> The CareerSense Partner ID design is locked to keep every issued card visually consistent.</div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Live card canvas</p><h3 className="mt-1 text-base font-bold text-slate-900">{face === "front" ? "Partner identification" : "Verification & contact"}</h3></div><button type="button" onClick={() => setFace((current) => current === "front" ? "back" : "front")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"><FlipHorizontal2 size={15} />Flip card</button></div>
        <div className="mt-5 flex min-h-[620px] items-center justify-center rounded-2xl bg-slate-50 p-4 sm:p-8">
          <div ref={cardRef} className="relative h-[560px] w-[350px] overflow-hidden rounded-[28px] bg-[#06284c] shadow-[0_28px_60px_rgba(2,20,45,0.28)]">
            {face === "front" ? <>
              <div className="relative h-[225px] bg-[#f9fbfd] p-7"><CardLogo /><div className="absolute -bottom-12 left-1/2 h-36 w-[440px] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600" /><div className="absolute -bottom-8 left-1/2 h-32 w-[430px] -translate-x-1/2 rounded-[50%] bg-[#06284c]" /><div className="absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-blue-500 bg-slate-200 shadow-xl">{avatar ? <img src={avatar} alt={name} className="h-full w-full object-cover" crossOrigin="anonymous" /> : <div className="flex h-full items-center justify-center text-4xl font-black text-slate-400">{name.slice(0, 2).toUpperCase()}</div>}</div></div>
              <div className="px-7 pb-6 pt-24"><h4 className="text-center text-2xl font-black uppercase tracking-tight text-white">{name}</h4><p className="mt-1 text-center text-sm font-bold text-teal-300">{status}</p><div className="mt-7 grid gap-3"><Detail icon={BadgeCheck} label="Partner ID" value={partnerId} /><Detail icon={ShieldCheck} label="Batch" value={batch} /><Detail icon={MapPin} label="Location" value={location} /><Detail icon={Mail} label="Email" value={email} /><Detail icon={Phone} label="Phone" value={phone} /></div></div>
            </> : <>
              <div className="relative z-10 px-8 pt-8">
                <div className="scale-110 origin-top-left"><CardLogo inverse /></div>
                <div className="mt-12 text-center">
                  <h4 className="text-[34px] font-black uppercase leading-none tracking-tight text-white">Partner ID Card</h4>
                  <div className="mt-5 flex items-center justify-center gap-3"><span className="h-px w-10 bg-teal-300" /><span className="rounded-lg bg-gradient-to-r from-teal-400 to-cyan-300 px-5 py-2 text-sm font-black uppercase tracking-wider text-[#06284c]">Verified &amp; Active</span><span className="h-px w-10 bg-teal-300" /></div>
                </div>
              </div>
              <div className="absolute left-1/2 top-[245px] h-40 w-[460px] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300" />
              <div className="absolute bottom-0 left-1/2 h-[350px] w-[445px] -translate-x-1/2 rounded-t-[50%] bg-[#f9fbfd] px-[62px] pb-4 pt-[68px]">
                <p className="text-center text-[11px] font-bold leading-[18px] text-[#07172f]">This card confirms the holder as an active CareerSense partner. Please present it when verification is requested.</p>
                <div className="my-4 h-px bg-teal-400" />
                <div className="grid gap-2 text-left text-[10.5px] font-semibold text-slate-700">
                  <span className="flex items-center gap-3 border-b border-dashed border-teal-300 pb-1.5"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white"><Mail size={13} /></span><span className="truncate">{email}</span></span>
                  <span className="flex items-center gap-3 border-b border-dashed border-teal-300 pb-1.5"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white"><Globe size={13} /></span>careersenseai.com</span>
                  <span className="flex items-center gap-3 border-b border-dashed border-teal-300 pb-1.5"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white"><Phone size={13} /></span>{phone}</span>
                  <span className="flex items-center gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white"><MapPin size={13} /></span><span className="truncate">{location}</span></span>
                </div>
                <p className="mt-3 text-center text-[7.5px] font-bold uppercase tracking-[0.12em] text-slate-500">Property of CareerSense · Non-transferable</p>
              </div>
            </>}
          </div>
        </div>
        <button type="button" onClick={exportCard} disabled={exporting} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-105 disabled:opacity-60"><Download size={17} />{exporting ? "Preparing high-resolution PNG…" : `Download ${face === "front" ? "front" : "back"} as PNG`}</button>
      </section>
    </div>
  );
}

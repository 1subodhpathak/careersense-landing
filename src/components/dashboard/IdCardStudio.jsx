import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Download, FlipHorizontal2, Globe, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import html2canvas from "html2canvas";
import CSLogo from "../../Assets/CSlogo.png";

function CardLogo({ inverse = false, size = "md" }) {
  const isLg = size === "lg";
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={CSLogo}
        alt="CareerSense Logo"
        className={`${isLg ? "h-11" : "h-10"} w-auto object-contain block`}
        crossOrigin="anonymous"
      />
      <div>
        <div
          className={`${isLg ? "text-2xl" : "text-xl"} font-black tracking-tight leading-tight ${
            inverse ? "text-white" : "text-[#07172f]"
          }`}
        >
          Career<span className="text-teal-400">Sense</span>
        </div>
        <div
          className={`${isLg ? "text-[8px]" : "text-[7px]"} font-bold uppercase tracking-[0.22em] leading-normal ${
            inverse ? "text-slate-300" : "text-slate-500"
          }`}
        >
          Guiding careers. Building futures.
        </div>
      </div>
    </div>
  );
}

function getNameStyle(nameStr) {
  const len = (nameStr || "").trim().length;
  if (len <= 13) return { fontSize: "22px", lineHeight: "1.3" };
  if (len <= 17) return { fontSize: "19px", lineHeight: "1.3" };
  if (len <= 21) return { fontSize: "16px", lineHeight: "1.3" };
  if (len <= 26) return { fontSize: "14px", lineHeight: "1.3" };
  return { fontSize: "12.5px", lineHeight: "1.3" };
}

function Detail({ icon: Icon, label, value }) {
  const displayVal = value || "Not provided";
  return (
    <div className="flex items-center gap-2.5 text-[11px] leading-normal py-0.5">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-teal-300">
        <Icon size={14} />
      </span>
      <span className="w-[72px] shrink-0 text-slate-300 font-medium leading-normal">{label}</span>
      <span
        title={displayVal}
        style={{ lineHeight: "1.5", paddingTop: "2px", paddingBottom: "2px" }}
        className="min-w-0 flex-1 truncate text-white font-bold tracking-normal"
      >
        {displayVal}
      </span>
    </div>
  );
}

export default function IdCardStudio({ profile = {}, user = {}, plan = "partner" }) {
  const isPartner = plan === "partner";
  const cardRole = isPartner ? "Partner" : "Student";
  const [face, setFace] = useState("front");
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);

  const name = profile.fullName || user?.fullName || (isPartner ? "CareerSense Partner" : "CareerSense Student");
  const email = profile.email || user?.primaryEmailAddress?.emailAddress || "Not provided";
  const phone = profile.phone || "Not provided";
  const location = profile.location || profile.geographicalAlignment || "Not provided";
  const status = profile.profileStatus || profile.currentJobTitle || (isPartner ? "Career Partner" : "Student Fellow");
  const batch = profile.batch || new Date().getFullYear().toString();
  const firstName = name.trim().split(/\s+/)[0].replace(/[^a-z]/gi, "") || (isPartner ? "Part" : "Stud");
  const city = location.split(",")[0].replace(/[^a-z]/gi, "") || "LOC";
  const nameCode = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1, 4).toLowerCase()}`;
  const locationCode = city.slice(0, 3).toUpperCase().padEnd(3, "X");
  const idNumber = isPartner ? `CS-${nameCode}${locationCode}` : `CS-STU-${nameCode}${locationCode}`;
  const avatar = profile.avatar || user?.imageUrl;

  const [avatarDataUrl, setAvatarDataUrl] = useState(avatar);

  useEffect(() => {
    if (!avatar) {
      setAvatarDataUrl(null);
      return;
    }
    if (avatar.startsWith("data:")) {
      setAvatarDataUrl(avatar);
      return;
    }
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        if (active) setAvatarDataUrl(dataUrl);
      } catch {
        if (active) setAvatarDataUrl(avatar);
      }
    };
    img.onerror = () => {
      if (active) setAvatarDataUrl(avatar);
    };
    img.src = avatar;
    return () => {
      active = false;
    };
  }, [avatar]);

  // Partner uses deep teal-navy (#06284c), Student uses ultra deep midnight dark blue (#020d1e)
  const cardBgColor = isPartner ? "#06284c" : "#020d1e";
  const cardShadowColor = isPartner ? "rgba(2,20,45,0.28)" : "rgba(1,8,18,0.45)";

  async function exportCard() {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        allowTaint: false,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: cardRef.current.offsetWidth,
        windowHeight: cardRef.current.offsetHeight,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector("[data-id-card]");
          if (clonedCard) {
            clonedCard.style.boxShadow = "none";
          }
        },
      });
      const link = document.createElement("a");
      link.download = `${idNumber}-${face}-${cardRole.toLowerCase()}-id.png`;
      link.href = canvas.toDataURL("image/png", 1);
      link.click();
    } catch (err) {
      console.error("ID Card export error:", err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <UserRound size={19} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Profile data</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your {cardRole} ID is generated from the master profile. Update missing information in My Profile.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {[
            ["Full name", name],
            ["Email", email],
            ["Phone", phone],
            ["Status", status],
            ["Batch", batch],
            [`${cardRole} ID`, idNumber],
            ["Location", location],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
              <span className="max-w-[58%] truncate text-right text-sm font-bold text-slate-800">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50 p-4 text-xs leading-5 text-teal-800">
          <strong>CareerSense Official ID.</strong> The CareerSense {cardRole} ID design is locked to keep every issued
          card visually consistent.
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Live card canvas</p>
            <h3 className="mt-1 text-base font-bold text-slate-900">
              {face === "front" ? `${cardRole} identification` : "Verification & contact"}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setFace((current) => (current === "front" ? "back" : "front"))}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <FlipHorizontal2 size={15} />Flip card
          </button>
        </div>
        <div className="mt-5 flex min-h-[620px] items-center justify-center rounded-2xl bg-slate-50 p-4 sm:p-8">
          <div
            ref={cardRef}
            data-id-card="true"
            style={{
              backgroundColor: cardBgColor,
              boxShadow: `0 28px 60px ${cardShadowColor}`,
              width: 350,
              height: 560,
            }}
            className="relative overflow-hidden rounded-[28px]"
          >
            {face === "front" ? (
              <>
                <div className="relative h-[225px] bg-[#f9fbfd] p-7">
                  <CardLogo />
                  <div
                    style={{ left: -45, width: 440 }}
                    className="absolute -bottom-12 h-36 rounded-[50%] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-600"
                  />
                  <div
                    style={{ backgroundColor: cardBgColor, left: -40, width: 430 }}
                    className="absolute -bottom-8 h-32 rounded-[50%]"
                  />
                  <div
                    style={{ left: 95, width: 160, height: 160 }}
                    className="absolute -bottom-20 overflow-hidden rounded-2xl border-2 border-blue-500 bg-slate-200 shadow-xl"
                  >
                    {avatarDataUrl || avatar ? (
                      <img
                        src={avatarDataUrl || avatar}
                        alt={name}
                        className="block h-full w-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl font-black text-slate-400">
                        {name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-6 pb-5 pt-[92px]">
                  <h4
                    style={getNameStyle(name)}
                    className="text-center font-black uppercase tracking-tight text-white whitespace-nowrap overflow-visible py-0.5"
                  >
                    {name}
                  </h4>
                  <p
                    style={{ lineHeight: "1.4" }}
                    className="mt-0.5 text-center text-xs font-bold text-teal-300 whitespace-nowrap overflow-visible py-0.5"
                  >
                    {status}
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <Detail icon={BadgeCheck} label={`${cardRole} ID`} value={idNumber} />
                    <Detail icon={ShieldCheck} label="Batch" value={batch} />
                    <Detail icon={MapPin} label="Location" value={location} />
                    <Detail icon={Mail} label="Email" value={email} />
                    <Detail icon={Phone} label="Phone" value={phone} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative z-10 px-8 pt-8">
                  <div>
                    <CardLogo inverse size="lg" />
                  </div>
                  <div className="mt-10 text-center">
                    <h4
                      style={{ lineHeight: "1.3" }}
                      className="text-[30px] font-black uppercase tracking-tight text-white py-1"
                    >
                      {cardRole} ID Card
                    </h4>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <span className="h-[2px] w-10 bg-teal-300" />
                      <span className="rounded-lg bg-gradient-to-r from-teal-400 to-cyan-300 px-5 py-2 text-sm font-black uppercase tracking-wider text-[#06284c] shadow-md leading-normal">
                        Verified &amp; Active
                      </span>
                      <span className="h-[2px] w-10 bg-teal-300" />
                    </div>
                  </div>
                </div>
                <div
                  style={{ left: -55, width: 460 }}
                  className="absolute top-[235px] h-40 rounded-[50%] bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300"
                />
                <div
                  style={{ left: -47.5, width: 445 }}
                  className="absolute bottom-0 h-[355px] rounded-t-[50%] bg-[#f9fbfd] px-[62px] pb-4 pt-[64px]"
                >
                  <p className="text-center text-[11px] font-bold leading-[18px] text-[#07172f] py-0.5">
                    {isPartner
                      ? "This card confirms the holder as an active CareerSense partner. Please present it when verification is requested."
                      : "This card confirms the holder as an active enrolled CareerSense student. Please present it when verification is requested."}
                  </p>
                  <div className="my-3.5 h-[2px] bg-teal-400" />
                  <div className="grid gap-2 text-left text-[10.5px] font-semibold text-slate-700">
                    <div className="flex items-center gap-3 border-b border-dashed border-teal-300 pb-1.5" style={{ lineHeight: "1.4" }}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
                        <Mail size={13} />
                      </span>
                      <span className="truncate py-0.5">{email}</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-dashed border-teal-300 pb-1.5" style={{ lineHeight: "1.4" }}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
                        <Globe size={13} />
                      </span>
                      <span className="py-0.5">careersenseai.com</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-dashed border-teal-300 pb-1.5" style={{ lineHeight: "1.4" }}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
                        <Phone size={13} />
                      </span>
                      <span className="py-0.5">{phone}</span>
                    </div>
                    <div className="flex items-center gap-3" style={{ lineHeight: "1.4" }}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
                        <MapPin size={13} />
                      </span>
                      <span className="truncate py-0.5">{location}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[8px] font-bold uppercase tracking-[0.14em] text-slate-500 py-0.5">
                    Property of CareerSense · Non-transferable
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={exportCard}
          disabled={exporting}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-105 disabled:opacity-60"
        >
          <Download size={17} />
          {exporting ? "Preparing high-resolution PNG…" : `Download ${face === "front" ? "front" : "back"} as PNG`}
        </button>
      </section>
    </div>
  );
}


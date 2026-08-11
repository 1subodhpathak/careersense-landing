import isoQuality from "../../Assets/Government/1.webp";
import isoSecurity from "../../Assets/Government/2.webp";
import msme from "../../Assets/Government/3.webp";
import corporateAffairs from "../../Assets/Government/4.webp";

const recognitions = [
  { src: isoQuality, alt: "ISO 9001:2015 certified company", className: "h-24 sm:h-28 lg:h-32" },
  { src: isoSecurity, alt: "ISO 27001:2022 certified company", className: "h-24 sm:h-28 lg:h-32" },
  { src: msme, alt: "Ministry of Micro, Small and Medium Enterprises, Government of India", className: "h-24 sm:h-28 lg:h-32" },
  { src: corporateAffairs, alt: "Ministry of Corporate Affairs, Government of India", className: "h-20 sm:h-24 lg:h-28" },
];

export default function GovernmentRecognitionSection() {
  return (
    <section aria-labelledby="recognition-heading" className="relative border-y border-slate-200/80 py-12 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 id="recognition-heading" className="text-center text-[11px] font-black uppercase tracking-[0.24em] text-slate-400 sm:text-xs">
          Recognised &amp; Certified By
        </h2>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 items-center gap-x-8 gap-y-10 sm:mt-10 lg:grid-cols-4 lg:gap-12">
          {recognitions.map((item) => (
            <div key={item.alt} className="flex min-h-28 items-center justify-center sm:min-h-32">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={`${item.className} max-w-full object-contain transition duration-300 hover:scale-[1.025]`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

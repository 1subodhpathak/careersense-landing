import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/homePageData";

export default function FAQSection() {
  return (
    <section id="faq" className="px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-[1320px]">
        
        <h2 className="mt-5 text-[34px] font-black leading-tight tracking-tight text-Black md:text-[30px]">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-extrabold text-slate-950">
                {faq.question}
                <ChevronDown size={16} className="transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[13px] leading-6 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

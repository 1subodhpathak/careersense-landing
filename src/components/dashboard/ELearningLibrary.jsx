import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Clock3, FileText, GraduationCap, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ebooks } from "../../data/ebooks";
import { elearnings } from "../../data/elearnings";

export default function ELearningLibrary() {
  const [tab, setTab] = useState("learning");
  const [query, setQuery] = useState("");
  const items = tab === "learning" ? elearnings : ebooks;
  const filtered = useMemo(() => items.filter((item) => `${item.title} ${item.description} ${item.level || item.category}`.toLowerCase().includes(query.toLowerCase())), [items, query]);
  const isLearning = tab === "learning";
  return (
    <div>
      <section className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.035em] text-[#0b2d61]">
            {isLearning ? "My eLearning" : "My eBooks"}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            {isLearning
              ? "Practical, self-paced learning designed to strengthen your career skills."
              : "Exclusive PDF guides and resources curated to boost your career preparation."}
          </p>
        </div>
        <label className="relative block w-full lg:max-w-[360px]">
          <span className="sr-only">Search {isLearning ? "eLearning" : "eBooks"}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search my ${isLearning ? "learning" : "eBooks"}…`}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-800 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
          />
        </label>
      </section>
      <div className="mt-5 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs"><button type="button" onClick={() => setTab("learning")} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${tab === "learning" ? "bg-[#0b2d61] text-white" : "text-slate-500 hover:text-slate-900"}`}><GraduationCap size={16} />eLearnings</button><button type="button" onClick={() => setTab("ebooks")} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${tab === "ebooks" ? "bg-[#0b2d61] text-white" : "text-slate-500 hover:text-slate-900"}`}><BookOpen size={16} />eBooks</button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((item) => {
          const isCourse = tab === "learning";
          return (
            <Link
              key={item.slug}
              to={isCourse ? `/learning/${item.slug}` : `/ebooks/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
            >
              {item.thumbnail ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-[#07172f]">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} ${isCourse ? "course" : "eBook"} thumbnail`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <span className="absolute right-2.5 top-2.5 rounded-full border border-white/20 bg-[#07172f]/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                    {isCourse ? item.level : item.format}
                  </span>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3 px-4 pt-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isCourse ? "bg-cyan-50 text-cyan-700" : "bg-blue-50 text-blue-700"}`}>
                    {isCourse ? <GraduationCap size={19} /> : <FileText size={19} />}
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    {isCourse ? item.level : item.format}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[15px] font-black leading-5 text-slate-900">{item.title}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-5 text-slate-500">{item.description}</p>
                <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    {isCourse ? <><Clock3 size={12} />{item.duration}</> : item.released}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-700">
                    {isCourse ? "Open learning" : "View PDF"}
                    <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {!filtered.length && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><BookOpen className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-600">No resources match your search.</p></div>}
    </div>
  );
}

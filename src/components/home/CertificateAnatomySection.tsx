import React from 'react';
import { ShieldCheck } from 'lucide-react';
import shagunSignature from '../../Assets/ShagunSignature.png';
import csSeal from '../../Assets/CSSeal.png';
import csWatermark from '../../Assets/CSWatermark4.png';
import barcodeImage from '../../Assets/Barcode.png';

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;600;700;800&display=swap');
`;

export default function InteractiveCertificateAnatomy() {
  return (
    <section
      className="relative flex flex-col items-center px-4 py-8 sm:min-h-screen sm:justify-center sm:px-6 sm:py-12 lg:px-8"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <style>{globalStyles}</style>

      <div className="relative z-10 max-w-[580px] py-2 sm:py-4">
        <div className="mb-7 text-center text-[11px] font uppercase tracking-[0.28em] text-slate-500">
          Skill Certificate Authenticity & Security Check
        </div>
      </div>

      {/* Certificate Render Frame */}
      <div className="relative z-10 w-full max-w-[920px] overflow-visible shadow-2xl">
        <div className="aspect-[1.02/1] w-full bg-[#fdfdfc] p-2 sm:aspect-[1.414/1] sm:p-4">
          
          {/* Outer Thick Beige Border */}
          <div className="relative flex h-full flex-col justify-between border-[5px] border-[#d8c8b0] bg-white p-1.5 sm:p-2">
            
            {/* Inner Thin Border */}
            <div className="pointer-events-none absolute inset-2 border-[1.5px] border-[#d8c8b0]/70" />

            {/* Dark Blue Corner L-Brackets */}
            <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l-[1.5px] border-t-[1.5px] border-[#0F203C]" />
            <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r-[1.5px] border-t-[1.5px] border-[#0F203C]" />
            <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b-[1.5px] border-l-[1.5px] border-[#0F203C]" />
            <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b-[1.5px] border-r-[1.5px] border-[#0F203C]" />

            {/* Interactive Watermark */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
              <img
                src={csWatermark}
                alt="Security Watermark"
                className="h-auto w-[65%] max-w-none select-none opacity-[0.06] mix-blend-multiply [filter:invert(1)_grayscale(1)_contrast(1.2)]"
              />
            </div>
            <div className="absolute left-1/2 top-[13%] z-20 flex h-16 w-28 -translate-x-1/2 items-center justify-center sm:top-[14%] sm:h-24 sm:w-40">
              <button
                type="button"
                className="group h-full w-full cursor-help rounded-full bg-transparent focus:outline-none"
                aria-label="Security Watermark information"
              >
                <Tooltip 
                  title="Security Watermark"
                  what="A subtle, embedded background layer that sits inside the certificate artwork."
                  why="It acts as a visual anti-tamper marker, helps the credential feel official, and makes the document harder to replicate cleanly."
                  positionClasses="top-full left-1/2 mt-3 -translate-x-1/2"
                />
              </button>
            </div>

            {/* Content Container */}
              <div className="relative z-10 flex h-full flex-col justify-between px-2.5 py-2.5 sm:px-8 sm:py-6">
              
              {/* Header */}
              <div className="relative z-30 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="group relative flex cursor-help items-start gap-2.5 sm:items-center sm:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#0F203C] sm:h-11 sm:w-11">
                    <ShieldCheck className="h-4 w-4 text-[#d8c8b0] stroke-[1.5] sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[0.72rem] font-medium tracking-[0.03em] text-[#0F203C] sm:text-[1.15rem] sm:tracking-[0.08em]" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                      CAREERSENSE ACADEMY
                    </div>
                    <div className="mt-0.5 text-[4.5px] font-bold uppercase tracking-[0.14em] text-[#8e95a3] sm:text-[8px] sm:tracking-[0.22em]">
                      Board of Verified Skills & Credentials
                    </div>
                  </div>
                  <Tooltip
                    title="Why CareerSense"
                    what="A globally shareable, verification-first certification system built for trusted digital credentials."
                    why="CareerSense certificates cannot be credibly copied as static documents alone. They can be verified anytime by scanning the barcode, matched to a live credential record, and trusted by recruiters and institutions worldwide."
                    positionClasses="top-full left-0 mt-3"
                  />
                </div>

                {/* Interactive Document Control */}
                <div className="group relative z-40 cursor-help text-left transition-transform hover:scale-[1.02] sm:text-right">
                  <div className="text-[4.5px] font-bold uppercase tracking-[0.16em] text-[#8e95a3] sm:text-[7px] sm:tracking-[0.2em]">Document Control</div>
                  <div className="mt-0.5 text-[7px] font-bold text-[#0F203C] sm:mt-1 sm:text-[11px]">ID: CS-966541</div>
                  <div className="mt-0.5 text-[5px] font-semibold tracking-[0.03em] text-[#c0a273] sm:text-[8px]">Secure Transcript Verified</div>
                  <Tooltip 
                    title="Credential ID"
                    what="A unique record number tied specifically to this issued certificate."
                    why="Ensures every document can be traced back to its immutable ledger entry to prevent fraud."
                    positionClasses="top-full right-0 mt-2"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="mt-2.5 flex flex-col items-center text-center sm:mt-5">
                <div className="mb-2 text-[5px] font-bold uppercase leading-relaxed tracking-[0.18em] text-[#b3915f] sm:mb-5 sm:text-[9px] sm:tracking-[0.35em]">
                  Upon recommendation of the executive evaluation engine
                </div>

                <h1 className="max-w-[92%] text-[0.66rem] leading-snug text-[#0F203C] sm:max-w-none sm:text-[1.35rem]" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  This Certificate of Proficiency is awarded to
                </h1>

                <div className="group relative my-2.5 inline-block max-w-full cursor-help border-y border-[#f0e8d9] bg-[#fcfaf5] px-4 py-1.5 sm:my-5 sm:px-14 sm:py-3">
                  <h2 className="text-center text-[1.2rem] font-bold italic leading-none tracking-tight text-[#0F203C] sm:text-[2.75rem]" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                    Pooja Aggarwal
                  </h2>
                  <Tooltip
                    title="Candidate Name"
                    what="The verified identity of the learner or professional who earned the credential."
                    why="It ties the certificate to a specific individual so employers, institutions, and recruiters know exactly whose achievement is being validated."
                    positionClasses="top-full left-1/2 mt-3 -translate-x-1/2"
                  />
                </div>

                <p className="hidden max-w-2xl text-[10px] font-medium leading-[1.7] text-[#5c687d] sm:block sm:text-[12px] sm:leading-[1.8]">
                  who has successfully demonstrated objective industry capability and completed all technical
                  <br />
                  evaluation parameters benchmarked for verified competence in
                </p>

                <div className="mt-0.5 text-[5.5px] font-semibold uppercase tracking-[0.16em] text-[#8e95a3] sm:hidden">
                  Verified competence in
                </div>

                <div className="group relative mt-1.5 max-w-[92%] cursor-help sm:mt-4 sm:max-w-none">
                  <h3 className="text-[0.62rem] font-bold uppercase leading-tight tracking-[0.02em] text-[#0F203C] sm:text-[1.35rem] sm:leading-snug sm:tracking-[0.06em]" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                    PROFESSIONAL COMMUNICATION
                    <br />
                    & BUSINESS ENGLISH
                  </h3>
                  <Tooltip
                    title="Certified Topic"
                    what="The skill domain, subject, or competency area that was formally assessed and certified."
                    why="It tells reviewers exactly what the learner has demonstrated proficiency in, making the credential useful for hiring, promotion, and validation."
                    positionClasses="top-full left-1/2 mt-3 -translate-x-1/2"
                  />
                </div>
              </div>

              {/* Interactive Metrics Box */}
              <div className="group relative mx-auto mt-2.5 flex w-full max-w-[92%] cursor-help justify-between bg-white py-0.5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-shadow hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] sm:mt-5 sm:max-w-[85%] sm:py-3.5">
                <MetricCell label="Performance Status" value="Pass" />
                <div className="my-1.5 w-px bg-slate-200 sm:my-2"></div>
                <MetricCell label="Confidence" value="94%" />
                <div className="my-1.5 w-px bg-slate-200 sm:my-2"></div>
                <MetricCell label="Trust Score" value="100%" />
                <Tooltip 
                  title="Evaluation Metrics"
                  what="Verified scores outputting performance, confidence, and proctoring trust levels."
                  why="Proves the credential is based on actual, audited performance—not just participation."
                  positionClasses="bottom-full left-1/2 -translate-x-1/2 mb-4"
                />
              </div>

              {/* Footer */}
              <div className="mt-3 flex flex-col items-center gap-2 pt-0.5 text-center sm:mt-auto sm:flex-row sm:items-end sm:justify-between sm:gap-5 sm:pt-6 sm:text-left">
                <div className="group relative cursor-help pb-1">
                  <div className="text-[4.5px] font-bold uppercase tracking-[0.16em] text-[#8e95a3] sm:text-[8px] sm:tracking-[0.2em]">Date of Validation</div>
                  <div className="mt-0.5 text-[7px] font-bold text-[#0F203C] sm:mt-1 sm:text-sm">24 Jun 2026</div>
                  <div className="mt-0.5 text-[5.5px] font-medium text-[#8e95a3] sm:text-[9px]">Academic Registry Ledger</div>
                  <Tooltip
                    title="Validation Date"
                    what="The official date on which this credential was recorded and issued."
                    why="It establishes the credential timeline, confirms when the assessment was validated, and helps employers judge recency and relevance."
                    positionClasses="bottom-full left-0 mb-3"
                  />
                </div>

                <div className="flex items-center gap-3 sm:translate-x-4 sm:gap-14">
                  {/* Interactive Academy Seal */}
                  <div className="group relative cursor-help transition-transform hover:scale-105">
                    <img src={csSeal} alt="CareerSense Seal" className="h-[28px] w-[28px] object-contain drop-shadow-md sm:h-[76px] sm:w-[76px]" />
                    <Tooltip 
                      title="Academy Seal"
                      what="The formal insignia of the CareerSense ecosystem."
                      why="Adds institutional trust and visually validates that the certificate was formally audited and issued."
                      positionClasses="bottom-full left-1/2 -translate-x-1/2 mb-2"
                    />
                  </div>

                  {/* Interactive Verification Barcode */}
                  <div className="group relative cursor-help transition-transform hover:scale-105">
                    <img 
                      src={barcodeImage} 
                      alt="Verification Barcode" 
                      className="h-7 w-7 object-contain sm:h-14 sm:w-14" 
                    />
                    <Tooltip 
                      title="Verification Barcode"
                      what="A scannable digital gateway to the live credential."
                      why="Lets any recruiter or institution instantly validate the credential's authenticity from a public verification page."
                      positionClasses="bottom-full left-1/2 -translate-x-1/2 mb-4"
                    />
                  </div>
                </div>

                <div className="group relative hidden cursor-help pb-1 text-center sm:block">
                  <img src={shagunSignature} alt="Shagun Nagpal Signature" className="mx-auto h-8 w-auto object-contain mix-blend-multiply sm:h-10" />
                  <div className="mt-1 border-t border-slate-300 pt-1 sm:pt-1.5">
                    <div className="text-[9px] font-bold text-[#0F203C] sm:text-[11px]">Shagun Nagpal</div>
                    <div className="mt-0.5 text-[6px] font-bold uppercase tracking-[0.12em] text-[#8e95a3] sm:text-[7px] sm:tracking-[0.15em]">CEO / Director of Assessments</div>
                  </div>
                  <Tooltip
                    title="Authorized Signature"
                    what="The approving sign-off from the issuing authority."
                    why="It shows the certificate is institution-backed, not auto-generated without oversight, and reinforces executive accountability behind the credential."
                    positionClasses="bottom-full right-0 mb-3"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Subcomponents ---

function MetricCell({ label, value }) {
  return (
    <div className="flex-1 px-1.5 py-1.5 text-center sm:px-4 sm:py-0">
      <div className="text-[4.5px] font-bold uppercase tracking-[0.1em] text-[#b3915f] sm:text-[8px] sm:tracking-[0.15em]">{label}</div>
      <div className="mt-0.5 text-[7px] font-bold text-[#0F203C] sm:mt-2 sm:text-[15px]">{value}</div>
    </div>
  );
}

function Tooltip({ title, what, why, positionClasses }) {
  return (
    <div 
      className={`invisible absolute z-50 w-56 sm:w-64 md:w-72 rounded-xl bg-[#0F203C] p-4 text-left opacity-0 shadow-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${positionClasses}`}
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-[#d8c8b0]">{title}</p>
      <div className="mt-3 space-y-2.5">
        <p className="text-[12px] font-medium leading-relaxed text-slate-300 sm:text-[13px]">
          <strong className="text-white">What it is: </strong> 
          {what}
        </p>
        <p className="text-[12px] font-medium leading-relaxed text-slate-300 sm:text-[13px]">
          <strong className="text-white">Why it matters: </strong> 
          {why}
        </p>
      </div>
    </div>
  );
}

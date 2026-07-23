import React from 'react';
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Layout,
  Mic,
  Target,
  Video,
  X,
  Zap,
} from 'lucide-react';
import atsPreviewImage from '../../Assets/Laptop.png';

const FeedbackLaptopShowcase = ({ isDark, sceneIndex = 0 }) => (
  <div className="relative flex w-full items-center justify-center bg-[url('/Office.png')] bg-cover bg-center bg-no-repeat px-3 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12">
    <div
      className={`absolute inset-0 backdrop-blur-[6px] transition-colors duration-500 ${isDark
          ? 'bg-slate-950/82'
          : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(248,250,252,0.68)),radial-gradient(circle_at_18%_24%,rgba(45,212,191,0.10),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.08),transparent_24%)]'
        }`}
    />

    <div className="relative z-10 mx-auto w-full max-w-[1300px]">
      <p
        className={`mb-7 text-center text-[11px] uppercase tracking-[0.28em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
      >
        Top Category Interview Practice &amp; Simulation
      </p>

      {/* Laptop Showcase - M1 MacBook Air Gold Edition (Enlarged to fit screen) */}
      <div className="relative aspect-[16/12.8] w-full sm:aspect-[16/11.4] lg:aspect-[16/10.2] lg:max-h-[900px]">

        {/* Screen Bezel (Black with rounded top edges, thick bottom edge for logo) */}
        <div className="absolute inset-x-[3.5%] top-0 h-[95.1%] rounded-t-[0.8rem] bg-[#111215] px-[8px] pb-[12px] pt-[9px] shadow-[0_28px_60px_-36px_rgba(0,0,0,0.42)] sm:rounded-t-[1rem] sm:px-[10px] sm:pb-[20px] sm:pt-[10px] lg:rounded-t-[1.2rem] lg:px-[12px] lg:pb-[20px] lg:pt-[12px]">

        {/* Camera Dot (Centered, no notch) */}
        <div className="absolute left-1/2 top-[6px] z-30 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#272a33] shadow-[0_0_0_1px_rgba(0,0,0,0.8)]" />

        {/* Screen Content Wrapper (Square inner corners for M1) */}
        <div
          className={`relative flex h-full w-full flex-col overflow-hidden border transition-colors duration-500 ${isDark ? 'border-slate-700 bg-slate-950' : 'border-[#22242a] bg-white'
            }`}
        >

          {/* App Navbar */}
          <div
            className={`flex shrink-0 flex-col items-start gap-3 border-b px-3 py-2.5 transition-colors duration-500 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 md:px-5 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-teal-500/12 text-teal-600">
                <BrainCircuit size={17} />
              </div>
              <div>
                <div className={`text-[0.94rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>CareerSense Review Console</div>
                <div className={`text-[0.68rem] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Live AI interview + report output
                </div>
              </div>
            </div>

            <div className={`rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] sm:text-[0.68rem] ${isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
              Coming Soon
            </div>
          </div>

          {/* Rendered Scenes */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="absolute inset-0 lg:hidden">
              <MobileLaptopPreview />
            </div>

            <div className="hidden lg:block">
              <div className="absolute inset-0 transition duration-500">
                {sceneIndex === 0 && <LiveSimulationScene isDark={isDark} />}
                {sceneIndex === 1 && <MetricsReportScene isDark={isDark} />}
                {sceneIndex === 2 && <ExecutiveSummaryScene isDark={isDark} />}
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Air Text at bottom of bezel */}
        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 sm:bottom-[4px]">
          <span className="text-[0.45rem] font-medium tracking-[0.15em] text-[#81838a] sm:text-[0.55rem] lg:text-[0.6rem]">CareerSense Mac Air</span>
        </div>
        </div>

        {/* Gold Base/Chassis (Thin metallic wedge) */}
        <div className="absolute inset-x-0 bottom-[2.4%] h-[2.1%] rounded-b-[0.55rem] rounded-t-[0.08rem] border-t border-white/50 bg-gradient-to-b from-[#fbe3cf] via-[#e5bc9e] to-[#c7926e] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.45)]">
          {/* Thumb Groove */}
          <div className="absolute left-1/2 top-0 h-[42%] w-[12%] -translate-x-1/2 rounded-b-[0.24rem] bg-gradient-to-b from-[#d4a989] to-[#c39373] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" />
        </div>

        {/* Base Drop Shadow */}
        <div className="absolute inset-x-[3%] bottom-[1.3%] -z-10 h-[1%] rounded-full bg-black/45 blur-[4px]" />
      </div>
    </div>
  </div>
);

const MobileLaptopPreview = () => (
  <div className="h-full w-full bg-[#f5f4ef]">
    <img
      src={atsPreviewImage}
      alt="CareerSense review console mobile preview"
      className="h-full w-full object-cover object-center"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  </div>
);

const LiveSimulationScene = ({ isDark }) => (
  <div className={`grid h-full grid-cols-1 lg:grid-cols-[200px_1fr_240px] ${isDark ? 'bg-[#0c162b]' : 'bg-slate-50'}`}>
    <div className={`border-b p-3 sm:p-4 lg:border-b-0 lg:border-r lg:p-5 ${isDark ? 'border-white/10 bg-[#101b31]' : 'border-slate-200 bg-white overflow-y-auto'}`}>
      <div className="grid place-items-center rounded-[1.15rem] bg-teal-500/12 p-4 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-teal-600 text-[1.8rem] font-black text-white">M</div>
        <div className={`mt-4 text-[1rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>MBA Professional</div>
        <div className="mt-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-teal-600">Live profile</div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Background</div>
          <div className={`mt-2 rounded-2xl border px-3 py-3 text-[0.86rem] font-medium leading-5 ${isDark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
            MBA professional with 11+ years in transformation, process design, and client leadership.
          </div>
        </div>

        <div>
          <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Target role</div>
          <div className={`mt-2 rounded-2xl border px-3 py-3 text-[0.86rem] font-bold ${isDark ? 'border-teal-500/20 bg-teal-500/8 text-teal-200' : 'border-teal-200 bg-teal-50 text-teal-700'}`}>
            Entry Level Position
          </div>
        </div>

        <div>
          <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Key skills</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Financial Transformation', 'Process Development', 'Project Management', 'Client Relations'].map((item) => (
              <span key={item} className={`rounded-xl px-3 py-1.5 text-[0.76rem] font-semibold ${isDark ? 'bg-white/6 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className={`p-3 sm:p-4 ${isDark ? 'bg-[#0c162b]' : 'bg-slate-100 overflow-y-auto'}`}>
      <div className="grid h-full grid-cols-1 auto-rows-[minmax(120px,1fr)] gap-3 sm:grid-cols-2 lg:grid-rows-[1fr_1fr_76px] lg:auto-rows-auto lg:min-h-[400px]">
        <VideoTile src="/sarah.mp4" name="Sarah Jenkins" role="AI Interviewer" badge="HD" />
        <VideoTile src="/david.mp4" name="David Chen" role="Hiring Manager" badge="Sync" />
        <VideoTile src="/emily.mp4" name="Emily Morris" role="HR Partner" badge="Live" />
        <div className={`relative overflow-hidden rounded-[1.55rem] ${isDark ? 'bg-[#20242d]' : 'bg-slate-200'}`}>
          <div className="grid h-full place-items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white/12 text-slate-400 sm:h-24 sm:w-24">
              <Video size={28} className="sm:h-9 sm:w-9" />
            </div>
          </div>
        </div>

        <div className={`col-span-1 flex flex-col gap-3 rounded-[1.5rem] border px-3 py-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${isDark ? 'border-white/10 bg-[#161f35]' : 'border-slate-200 bg-white'}`}>
          <div>
            <div className={`text-[0.65rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Live transcript</div>
            <div className={`mt-1.5 text-[0.86rem] font-bold ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>Generating performance insights while you answer...</div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { icon: Mic, tone: isDark ? 'bg-white/8 text-slate-200' : 'bg-slate-100 text-slate-600' },
              { icon: Video, tone: isDark ? 'bg-white/8 text-slate-200' : 'bg-slate-100 text-slate-600' },
              { icon: Layout, tone: 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' },
            ].map((item, index) => (
              <div key={index} className={`grid h-10 w-10 place-items-center rounded-full transition-transform hover:scale-105 cursor-pointer sm:h-11 sm:w-11 ${item.tone}`}>
                <item.icon size={18} />
              </div>
            ))}
            <div className="rounded-full bg-rose-500 px-4 py-2.5 text-[0.7rem] font-black uppercase tracking-[0.18em] text-white hover:bg-rose-600 cursor-pointer transition-colors sm:ml-2 sm:px-5 sm:py-3 sm:text-[0.76rem]">
              End
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={`border-t flex flex-col lg:border-l lg:border-t-0 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
      <div className={`flex items-center justify-between border-b px-3 py-3 sm:px-5 sm:py-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className={`text-[0.96rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>In-call messages</div>
        <X size={20} className={isDark ? 'text-slate-500' : 'text-slate-400 cursor-pointer hover:text-slate-600'} />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-6">
        <div className={`text-[0.76rem] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Messages are recorded for interview analysis.</div>
        <div className={`mt-6 rounded-[1.1rem] p-4 ${isDark ? 'bg-white/6' : 'bg-slate-100'}`}>
          <div className={`text-[0.8rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>David Chen <span className="ml-2 font-medium text-slate-400">14:55</span></div>
          <p className={`mt-3 text-[0.86rem] leading-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Walk me through how you used Power BI to connect reporting, decision-making, and business outcomes.
          </p>
        </div>
        <div className={`mt-6 rounded-full px-5 py-3 text-[0.86rem] font-medium ${isDark ? 'bg-white/6 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
          Responding via voice...
        </div>
      </div>
    </div>
  </div>
);

const VideoTile = ({ src, name, role, badge }) => (
  <div className="relative min-h-[128px] overflow-hidden rounded-[1.15rem] bg-slate-900 sm:min-h-[170px] sm:rounded-[1.35rem] lg:rounded-[1.55rem]">
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover opacity-80"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#08111d] via-transparent to-black/10" />
    <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[0.55rem] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.62rem]">
      {badge}
    </div>
    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3">
      <div className="rounded-[1rem] bg-[#121d34]/90 px-3 py-2 text-white backdrop-blur-md sm:rounded-[1.2rem] sm:px-4 sm:py-3">
        <div className="text-[0.78rem] font-black leading-none sm:text-[0.96rem]">{name}</div>
        <div className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-slate-300 sm:mt-1.5 sm:text-[0.65rem]">{role}</div>
      </div>
      <div className="grid h-9 w-9 place-items-center rounded-full bg-[#182541]/90 text-slate-300 backdrop-blur-md sm:h-11 sm:w-11">
        <Mic size={16} className="sm:h-[18px] sm:w-[18px]" />
      </div>
    </div>
  </div>
);

const MetricsReportScene = ({ isDark }) => (
  <div className={`grid h-full grid-cols-1 lg:grid-cols-[200px_1fr] transition-colors duration-500 ${isDark ? 'bg-[#0b1324]' : 'bg-[#f6f8fd]'}`}>
    <div className={`border-b px-3 py-3 overflow-y-auto transition-colors duration-500 sm:px-4 sm:py-4 lg:border-b-0 lg:border-r lg:px-5 lg:py-5 ${isDark ? 'border-slate-800 bg-[#10192c]' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-2xl ${isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>
          <BrainCircuit size={20} />
        </div>
        <div>
          <div className={`text-[0.96rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>CareerSense</div>
          <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Audit report</div>
        </div>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:mt-8 lg:block lg:space-y-3">
        {[
          ['Executive Summary', Layout, false],
          ['Performance Data', BarChart3, true],
          ['Communication', Mic, false],
          ['Interview Log', BookOpen, false],
          ['30-Day Roadmap', Clock, false],
        ].map(([label, Icon, active]) => (
          <div key={label} className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[0.82rem] font-semibold transition-colors cursor-pointer lg:text-[0.86rem] ${active ? 'bg-teal-500 text-white shadow-[0_14px_30px_-18px_rgba(20,184,166,0.6)]' : isDark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
            <Icon size={18} />
            {label}
          </div>
        ))}
      </div>
    </div>

    <div className="overflow-y-auto p-3 sm:p-4 lg:p-6">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className={`xl:col-span-2 rounded-[1.3rem] border p-6 shadow-sm transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between">
            <div className="max-w-xl">
              <span className={`inline-block rounded-full px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>Performance metrics</span>
              <div className={`mt-4 text-[1.4rem] font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Communication intelligence with benchmark context</div>
              <p className={`mt-2.5 text-[0.9rem] leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                A post-interview report that translates the session into scoring, pacing trends, and a concrete coaching signal.
              </p>
            </div>
            <div className={`rounded-full border-[8px] px-6 py-5 text-center shadow-inner sm:px-7 sm:py-6 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-50'}`}>
              <div className={`text-[2rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>84</div>
              <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>overall</div>
            </div>
          </div>
        </div>

        <div className={`rounded-[1.3rem] border p-6 shadow-sm transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex items-center gap-3 text-[0.76rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <BarChart3 size={18} className="text-teal-500" />
            Competency matrix
          </div>
          <div className="mt-6 space-y-5">
            {[
              ['Communication', '84/100', 'bg-emerald-400', 'w-[84%]'],
              ['Leadership signal', '76/100', 'bg-amber-400', 'w-[76%]'],
              ['Technical acumen', '72/100', 'bg-blue-400', 'w-[72%]'],
              ['Product sense', '68/100', 'bg-violet-400', 'w-[68%]'],
            ].map(([label, score, tone, width]) => (
              <div key={label}>
                <div className={`flex items-center justify-between text-[0.76rem] font-black uppercase tracking-[0.16em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>{label}</span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>{score}</span>
                </div>
                <div className={`mt-2 h-3 overflow-hidden rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className={`h-full rounded-full ${tone} ${width} transition-all duration-1000 ease-out`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[1.3rem] border p-6 shadow-sm transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex items-center gap-3 text-[0.76rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Target size={18} className="text-teal-500" />
            Benchmarking
          </div>
          <div className="mt-6 space-y-5">
            {[
              ['You', '84/100', 'w-[84%] bg-teal-500'],
              ['Top 10%', '92/100', 'w-[92%] bg-slate-400'],
              ['FAANG average', '82/100', 'w-[82%] bg-slate-300'],
            ].map(([label, score, width]) => (
              <div key={label}>
                <div className={`flex items-center justify-between text-[0.86rem] font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <span>{label}</span>
                  <span>{score}</span>
                </div>
                <div className={`mt-2 h-3 overflow-hidden rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className={`h-full rounded-full ${width} transition-all duration-1000 ease-out`} />
                </div>
              </div>
            ))}
            <div className={`mt-6 rounded-[1rem] border px-4 py-3 text-[0.86rem] font-medium leading-6 ${isDark ? 'border-blue-500/30 bg-blue-500/10 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
              You are trending above the benchmark on structure and listening clarity.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExecutiveSummaryScene = ({ isDark }) => (
  <div className={`grid h-full grid-cols-1 lg:grid-cols-[200px_1fr] transition-colors duration-500 ${isDark ? 'bg-[#0b1324]' : 'bg-[#f6f8fd]'}`}>
    <div className={`border-b px-3 py-3 overflow-y-auto transition-colors duration-500 sm:px-4 sm:py-4 lg:border-b-0 lg:border-r lg:px-5 lg:py-5 ${isDark ? 'border-slate-800 bg-[#10192c]' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-2xl ${isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>
          <BrainCircuit size={20} />
        </div>
        <div>
          <div className={`text-[0.96rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>CareerSense</div>
          <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Audit report</div>
        </div>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:mt-8 lg:block lg:space-y-3">
        {[
          ['Executive Summary', Layout, true],
          ['Performance Data', BarChart3, false],
          ['Communication', Mic, false],
          ['Interview Log', BookOpen, false],
          ['30-Day Roadmap', Clock, false],
        ].map(([label, Icon, active]) => (
          <div key={label} className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[0.82rem] font-semibold cursor-pointer transition-colors lg:text-[0.86rem] ${active ? 'bg-teal-500 text-white shadow-[0_14px_30px_-18px_rgba(20,184,166,0.6)]' : isDark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
            <Icon size={18} />
            {label}
          </div>
        ))}
      </div>
    </div>

    <div className="overflow-y-auto p-3 sm:p-4 lg:p-6">
      <div className="grid gap-4 xl:grid-cols-[1.14fr,0.86fr]">
        <div className={`rounded-[1.3rem] border p-6 shadow-sm transition-colors duration-500 ${isDark ? 'border-teal-500/25 bg-slate-900' : 'border-teal-200 bg-white'}`}>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between">
            <div className="max-w-xl">
              <span className={`inline-block rounded-full px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>Audit complete</span>
              <div className={`mt-4 text-[1.4rem] font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ready for the <span className="text-teal-600">next interview loop?</span>
              </div>
              <p className={`mt-4 rounded-2xl px-4 py-3 text-[0.9rem] leading-6 ${isDark ? 'bg-teal-500/10 text-slate-300' : 'bg-teal-50 text-slate-600'}`}>
                Strong confidence and audience engagement, but answers still need tighter structure to feel more executive and more direct.
              </p>
            </div>
            <div className={`rounded-full border-[8px] px-6 py-6 text-center shadow-inner sm:px-7 sm:py-7 ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-50'}`}>
              <div className={`text-[2rem] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>84</div>
              <div className={`text-[0.66rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>total score</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            ['Market value', 'High', 'text-emerald-600'],
            ['Trajectory', 'Rising', 'text-blue-600'],
            ['Role fit', 'Strong', 'text-violet-600'],
          ].map(([label, value, tone]) => (
            <div key={label} className={`rounded-[1.2rem] border p-5 shadow-sm flex justify-between items-center transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
              <div className={`text-[0.7rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
              <div className={`text-[1.1rem] font-black ${tone}`}>{value}</div>
            </div>
          ))}
        </div>

        <div className={`rounded-[1.3rem] border p-6 shadow-sm xl:col-span-2 transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex items-center gap-3 text-[0.76rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Zap size={18} className="text-teal-500" />
            Strategic deep-dives
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              'Reframe long-form answers into faster impact statements',
              'Support leadership claims with clearer numbers and outcomes',
              'Improve transitions between context, action, and result',
              'Build stronger follow-up depth for cross-functional collaboration',
            ].map((item) => (
              <div key={item} className={`rounded-2xl p-4 text-[0.86rem] leading-6 font-medium ${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-50 text-slate-700'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[1.3rem] border p-6 shadow-sm xl:col-span-2 transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex items-center gap-3 text-[0.76rem] font-black uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <CheckCircle2 size={18} className="text-teal-500" />
            Top strengths
          </div>
          <ul className={`mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[0.86rem] leading-6 font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            <li className={`flex gap-3 items-center rounded-xl p-3 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Calm delivery under pressure</li>
            <li className={`flex gap-3 items-center rounded-xl p-3 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Strong audience engagement</li>
            <li className={`flex gap-3 items-center rounded-xl p-3 ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Relevant leadership examples</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default FeedbackLaptopShowcase;

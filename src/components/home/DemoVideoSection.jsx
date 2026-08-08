import { useState, useRef, useEffect } from "react";

const demoVideo = "/CareerSense.mp4";

// ── Fullscreen Video Lightbox ─────────────────────────────────
function VideoLightbox({ onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Lock body scroll while modal is open
    document.body.style.overflow = "hidden";
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {});
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
    // Close on Escape
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[10000] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105"
        aria-label="Close video"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Fullscreen Video Container */}
      <div
        className="relative w-full h-full flex items-center justify-center p-2 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={demoVideo}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain rounded-2xl bg-black shadow-2xl"
        />
      </div>
    </div>
  );
}

// ── Demo Video Section ────────────────────────────────────────
export default function DemoVideoSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const loopRef = useRef(null);

  // Play loop preview on mount
  useEffect(() => {
    if (loopRef.current) {
      loopRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      {lightboxOpen && <VideoLightbox onClose={() => setLightboxOpen(false)} />}

      <section className="relative w-full overflow-hidden py-20 px-4 sm:px-6">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
          <div className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-400/8 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-teal-400/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Section heading */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              See CareerSense{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                in action
              </span>
            </h2>
            <p className="mt-3 text-sm font-medium text-slate-500 sm:text-base max-w-4xl mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
              Watch how CareerSense maps your career journey — from ATS score to certificates to your first interview call.
            </p>
          </div>

          {/* Video card */}
          <div
            className="group relative cursor-pointer overflow-hidden rounded-2xl"
            style={{
              boxShadow: isHovered
                ? "0 0 0 1.5px rgba(6,182,212,0.35), 0 32px 80px rgba(15,23,42,0.20), 0 0 60px rgba(34,211,238,0.08)"
                : "0 0 0 1px rgba(15,23,42,0.10), 0 24px 60px rgba(15,23,42,0.12)",
              transition: "box-shadow 0.35s ease",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setLightboxOpen(true)}
          >
            {/* Looping muted preview */}
            <video
              ref={loopRef}
              src={demoVideo}
              muted
              loop
              playsInline
              className="w-full h-auto block object-cover"
              style={{
                maxHeight: "520px",
                filter: isHovered ? "brightness(0.45)" : "brightness(0.6)",
                transition: "filter 0.35s ease",
              }}
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: isHovered
                  ? "linear-gradient(to top, rgba(2,8,23,0.75) 0%, rgba(2,8,23,0.1) 100%)"
                  : "linear-gradient(to top, rgba(2,8,23,0.55) 0%, rgba(2,8,23,0.05) 100%)",
              }}
            />

            {/* Center Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                className="relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300"
                style={{
                  background: isHovered
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.92)",
                  boxShadow: isHovered
                    ? "0 0 0 8px rgba(34,211,238,0.18), 0 8px 32px rgba(0,0,0,0.4)"
                    : "0 0 0 4px rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,0,0.3)",
                  transform: isHovered ? "scale(1.12)" : "scale(1)",
                }}
                aria-label="Play demo video"
              >
                {/* Play icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginLeft: "4px" }}
                >
                  <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11-7.36a1 1 0 0 0 0-1.72l-11-7.36A1 1 0 0 0 8 5.14z" fill="#06152f" />
                </svg>

                {/* Ripple ring on hover */}
                {isHovered && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "rgba(34,211,238,0.18)", animationDuration: "1.2s" }}
                  />
                )}
              </button>

              <span
                className="rounded-full px-4 py-1.5 text-xs font-bold tracking-widest text-white transition-all duration-300"
                style={{
                  background: "rgba(2,8,23,0.65)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? "translateY(0)" : "translateY(4px)",
                }}
              >
                WATCH FULL DEMO
              </span>
            </div>

            {/* Bottom bar — duration hint */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 transition-opacity duration-300"
              style={{ opacity: isHovered ? 1 : 0.6 }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-white/80 tracking-wide">PREVIEW</span>
              </div>
              <span className="text-[11px] font-semibold text-white/60 tracking-wider">
                Click to play with sound
              </span>
            </div>
          </div>

          {/* Feature pills below */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              "Career GPS Assessment",
              "ATS Resume Scanner",
              "AI Cover Letter Builder",
              "Certifi Skill Badges",
              "Unified Dashboard",
            ].map((f) => (
              <span
                key={f}
                className="rounded-full border border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white transition"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

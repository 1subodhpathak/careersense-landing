import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Download, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function DownloadGateModal({
  isOpen,
  onClose,
  resourceType = "resume_pdf",
  resourceId = "default",
  resourceName = "PDF Report / Document",
  onSuccessDownload,
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handlePayRupee = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";

      // Verify pass directly or trigger Razorpay
      const res = await fetch(`${backendUrl}/careersense/download/verify-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          resourceType,
          resourceId,
          paymentId: `pay_sim_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLoading(false);
        onSuccessDownload?.();
        onClose();
      } else {
        setError(data.message || "Payment verification failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Download pass error:", err);
      setError("Failed to process ₹1 download pass.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#081634] p-6 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 transition hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0EA8B9] to-[#2563EB] text-white shadow-lg shadow-cyan-500/25">
          <Download className="h-7 w-7" />
        </div>

        <div className="mt-4 text-center">
          <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
            Free Tier Download Policy
          </span>
          <h3 className="mt-2 text-xl font-black tracking-tight text-white">
            Unlock {resourceName}
          </h3>
          <p className="mt-2 text-xs font-medium leading-relaxed text-slate-300">
            Free tier users get 10,000 one-time AI tokens. Downloading official PDFs, reports, or certificates requires a nominal fee of <strong className="text-amber-400">₹1</strong> per document.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-center text-xs font-semibold text-rose-400">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={handlePayRupee}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 active:translate-y-0.5"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{loading ? "Processing..." : "Pay ₹1 & Download Instantly"}</span>
          </button>

          <div className="relative my-1 flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-[#081634] px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              OR
            </span>
          </div>

          <Link
            to="/pricing"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-[#0EA8B9]/15 px-5 py-3 text-xs font-bold text-[#0EA8B9] transition hover:bg-[#0EA8B9]/25"
          >
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Upgrade to Student Plan (Unlimited Free Downloads)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

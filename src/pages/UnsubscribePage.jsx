import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BellOff,
  ArrowLeft,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import CSLogo from "../Assets/CSlogo.png";

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const emailParam = (searchParams.get("email") || "").trim().toLowerCase();
  const tokenParam = (searchParams.get("token") || "").trim();

  const [email, setEmail] = useState(emailParam);
  const [token, setToken] = useState(tokenParam);
  const [reason, setReason] = useState("too_frequent");
  const [customReason, setCustomReason] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(Boolean(emailParam));
  const [isAlreadyUnsubscribed, setIsAlreadyUnsubscribed] = useState(false);
  const [unsubscribedAt, setUnsubscribedAt] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null); // 'unsubscribed' | 'resubscribed' | null
  const [actionMessage, setActionMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const backendUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "https://server.datasenseai.com";

  // Check initial subscription status on page load
  useEffect(() => {
    if (!emailParam) {
      setLoadingStatus(false);
      return;
    }

    let isMounted = true;
    const checkStatus = async () => {
      try {
        setLoadingStatus(true);
        const url = `${backendUrl}/careersense/marketing/unsubscribe/status?email=${encodeURIComponent(
          emailParam
        )}&token=${encodeURIComponent(tokenParam)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (isMounted && data.success) {
          setIsAlreadyUnsubscribed(Boolean(data.isUnsubscribed));
          if (data.unsubscribedAt) {
            setUnsubscribedAt(new Date(data.unsubscribedAt));
          }
        }
      } catch (err) {
        console.warn("[Unsubscribe Status Check Warning]:", err);
      } finally {
        if (isMounted) setLoadingStatus(false);
      }
    };

    checkStatus();
    return () => {
      isMounted = false;
    };
  }, [emailParam, tokenParam, backendUrl]);

  // Handle Unsubscribe Request
  const handleUnsubscribe = async (e) => {
    if (e) e.preventDefault();
    const targetEmail = (email || emailParam).trim().toLowerCase();
    if (!targetEmail || !targetEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const finalReason = reason === "other" && customReason.trim() ? customReason.trim() : reason;
      const res = await fetch(`${backendUrl}/careersense/marketing/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          token: token || tokenParam,
          reason: finalReason,
          source: "email_footer"
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsAlreadyUnsubscribed(true);
        setActionSuccess("unsubscribed");
        setActionMessage("You have been unsubscribed from CareerSense career updates.");
      } else {
        setErrorMessage(data.message || "Failed to process unsubscribe request. Please try again.");
      }
    } catch (err) {
      console.error("[Unsubscribe Error]:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Resubscribe Request
  const handleResubscribe = async () => {
    const targetEmail = (email || emailParam).trim().toLowerCase();
    if (!targetEmail || !targetEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch(`${backendUrl}/careersense/marketing/unsubscribe/resubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsAlreadyUnsubscribed(false);
        setActionSuccess("resubscribed");
        setActionMessage("Welcome back! You have successfully resubscribed to CareerSense emails.");
      } else {
        setErrorMessage(data.message || "Failed to resubscribe. Please try again.");
      }
    } catch (err) {
      console.error("[Resubscribe Error]:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800 flex flex-col justify-between antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Navbar Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={CSLogo} alt="CareerSense Logo" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="text-xl font-black tracking-tight text-slate-900">
              Career<span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Sense</span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to CareerSense</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0b132b] via-[#1c2541] to-[#0b132b] px-6 py-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 shadow-inner">
                <BellOff size={22} className="text-teal-400" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Email Preferences</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm">
                Manage your subscription and email notification settings
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Status Loading */}
            {loadingStatus ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <Loader2 size={32} className="text-teal-600 animate-spin" />
                <p className="text-sm font-medium text-slate-500">Checking your email preferences...</p>
              </div>
            ) : actionSuccess === "unsubscribed" ? (
              /* Success State: Just Unsubscribed */
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">You're Unsubscribed</h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    We've updated our records. You will no longer receive marketing updates, job tips, or automated alerts at:
                  </p>
                  <p className="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 py-1.5 px-3 rounded-lg inline-block border border-slate-200">
                    {email || emailParam}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left space-y-2">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">Please note:</strong> You may still receive essential transactional emails related to your account security, password resets, or active billing invoices.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleResubscribe}
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw size={14} className={submitting ? "animate-spin" : ""} />
                    <span>Unsubscribed by mistake? Resubscribe</span>
                  </button>
                  <Link
                    to="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0b132b] hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    Return to CareerSense
                  </Link>
                </div>
              </div>
            ) : isAlreadyUnsubscribed ? (
              /* Already Unsubscribed State */
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-600">
                  <BellOff size={28} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Already Unsubscribed</h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    This email is already opted out of CareerSense marketing and automation communications:
                  </p>
                  <p className="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 py-1.5 px-3 rounded-lg inline-block border border-slate-200">
                    {email || emailParam}
                  </p>
                  {unsubscribedAt && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      Opted out on {unsubscribedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  )}
                </div>

                {actionSuccess === "resubscribed" && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{actionMessage}</span>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left">
                  Would you like to receive our weekly career opportunities, ATS resume advice, and AI tool releases again?
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleResubscribe}
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                    <span>Resubscribe to CareerSense Updates</span>
                  </button>
                  <Link
                    to="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    Visit Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* Active Opt-Out Form */
              <form onSubmit={handleUnsubscribe} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm font-medium text-slate-900 bg-slate-50/50"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    You will be unsubscribed from all broadcast campaigns and automated product newsletters.
                  </p>
                </div>

                {/* Reason Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Reason for Unsubscribing <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: "too_frequent", label: "I receive emails too frequently" },
                      { id: "not_relevant", label: "The content is no longer relevant to my career" },
                      { id: "found_job", label: "I landed a job and don't need job search tools" },
                      { id: "never_signed_up", label: "I don't recall signing up for this service" },
                      { id: "other", label: "Other reason" }
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                          reason === opt.id
                            ? "border-teal-500 bg-teal-50/30 text-slate-900"
                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="unsubscribe_reason"
                          value={opt.id}
                          checked={reason === opt.id}
                          onChange={() => setReason(opt.id)}
                          className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
                        />
                        <span className="text-xs font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {reason === "other" && (
                    <div className="mt-2.5">
                      <textarea
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Please tell us how we could improve..."
                        rows={2}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Processing Unsubscribe...</span>
                      </>
                    ) : (
                      <>
                        <BellOff size={15} />
                        <span>Unsubscribe from CareerSense Emails</span>
                      </>
                    )}
                  </button>

                  <Link
                    to="/"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold text-center transition-all cursor-pointer"
                  >
                    Never Mind, Keep Me Subscribed
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Footer Note */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Secure 1-Click Opt-Out • CareerSense Data Privacy Compliant</span>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} CareerSense AI Inc. All rights reserved.</p>
        <p className="mt-1">
          <a href="mailto:support@careersenseai.com" className="hover:text-teal-600 underline">
            support@careersenseai.com
          </a>{" "}
          •{" "}
          <Link to="/" className="hover:text-teal-600">
            careersenseai.com
          </Link>
        </p>
      </footer>
    </div>
  );
}

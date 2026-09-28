import React, { useState } from "react";
import { 
  Zap, 
  X, 
  ShieldCheck, 
  PlusCircle, 
  MinusCircle, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Sparkles
} from "lucide-react";

export default function TokenGrantModal({ 
  isOpen, 
  onClose, 
  candidate, 
  onSuccess,
  adminEmail
}) {
  if (!isOpen || !candidate) return null;

  const [activeMode, setActiveMode] = useState("tokens"); // "tokens" | "plan"
  const [tokenAction, setTokenAction] = useState("add"); // "add" | "set" | "deduct"
  const [amount, setAmount] = useState(50000);
  const [selectedPlan, setSelectedPlan] = useState(candidate.subscription.plan || "free");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const tokenPresets = [10000, 25000, 50000, 100000, 500000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";

    try {
      if (activeMode === "tokens") {
        const res = await fetch(`${apiBase}/careersense/admin/users/${candidate.clerkUserId}/tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-email": adminEmail
          },
          body: JSON.stringify({
            action: tokenAction,
            amount: Number(amount),
            note: note || `Admin token ${tokenAction}`
          })
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || "Failed to adjust tokens");
        }
        setSuccessMessage(data.message);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        // Plan change
        const res = await fetch(`${apiBase}/careersense/admin/users/${candidate.clerkUserId}/plan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-email": adminEmail
          },
          body: JSON.stringify({
            plan: selectedPlan,
            note: note || `Admin manual plan upgrade to ${selectedPlan}`
          })
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || "Failed to update plan");
        }
        setSuccessMessage(data.message);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-bold">
              <Zap size={18} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Manage Credits & Tier</h3>
              <p className="text-xs text-slate-500 font-medium">Candidate: <span className="text-teal-600 font-bold">{candidate.email}</span></p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1.5">
          <button
            type="button"
            onClick={() => setActiveMode("tokens")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === "tokens"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Zap size={14} className="text-amber-500" fill="currentColor" />
            Adjust Token Balance
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("plan")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === "plan"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Award size={14} className="text-teal-600" />
            Change Plan Tier
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Current Status Overview */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-[#f8fafc] px-4 py-3 text-xs">
            <div className="text-slate-500 font-medium">
              Current Plan: <span className="font-extrabold uppercase text-amber-700 ml-1">{candidate.subscription.plan}</span>
            </div>
            <div className="text-slate-500 font-medium">
              Live Balance: <span className="font-black text-emerald-600 ml-1">{candidate.subscription.tokensRemaining?.toLocaleString()} Tokens</span>
            </div>
          </div>

          {activeMode === "tokens" ? (
            <>
              {/* Action Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Action Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "add", label: "+ Add Bonus", icon: PlusCircle },
                    { id: "set", label: "= Set Exact", icon: Sparkles },
                    { id: "deduct", label: "- Deduct", icon: MinusCircle }
                  ].map((act) => {
                    const Icon = act.icon;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => setTokenAction(act.id)}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition cursor-pointer ${
                          tokenAction === act.id
                            ? "border-teal-500 bg-teal-50 text-teal-700 shadow-2xs"
                            : "border-slate-200 bg-[#f8fafc] text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Icon size={14} />
                        {act.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Token Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] px-4 py-3 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                  placeholder="e.g. 50000"
                  required
                />

                {/* Quick Presets */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {tokenPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
                    >
                      +{preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Plan Tier Selection */
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select New Plan Tier
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "free", name: "Free Tier", tokens: "30k Tokens", badge: "Default" },
                  { id: "student", name: "Student Plan", tokens: "150k Tokens", badge: "Pro" },
                  { id: "intern", name: "Intern Track", tokens: "500k Tokens", badge: "Fellowship" },
                  { id: "partner", name: "Partner All-Access", tokens: "1M Tokens", badge: "Full Access" }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedPlan(tier.id)}
                    className={`flex flex-col items-start rounded-2xl border p-3 text-left transition cursor-pointer ${
                      selectedPlan === tier.id
                        ? "border-teal-500 bg-teal-50 text-slate-900 shadow-2xs"
                        : "border-slate-200 bg-[#f8fafc] text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{tier.name}</span>
                      <span className="text-[9px] font-extrabold uppercase rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-teal-700 shadow-2xs">{tier.badge}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 mt-1">{tier.tokens}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Audit Note */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Admin Reason / Audit Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Granted bonus for workshop completion or support resolution"
              className="w-full rounded-xl border border-slate-300 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b132b] hover:bg-slate-800 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 disabled:opacity-50 transition cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <ShieldCheck size={14} className="text-amber-400" />
                  Save & Apply Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

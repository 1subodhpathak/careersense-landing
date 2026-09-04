import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, X, Zap, ShieldCheck, Award, Rocket, Sparkles, HelpCircle, FileCheck2, ArrowRight, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useHeroTheme from "../hooks/useHeroTheme";
import { useUser } from "@clerk/clerk-react";

export default function PricingPage() {
  const { heroTheme, toggleHeroTheme } = useHeroTheme();
  const isDark = heroTheme === "dark";
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentPlan, setCurrentPlan] = useState("free");
  const [tokensRemaining, setTokensRemaining] = useState(10000);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [selectedFellowship, setSelectedFellowship] = useState("data-analyst");
  const [partnerBillingCycle, setPartnerBillingCycle] = useState("monthly");
  const [currency, setCurrency] = useState("INR"); // "INR" | "USD"

  useEffect(() => {
    const fParam = searchParams.get("fellowship");
    if (fParam) {
      setSelectedFellowship(fParam);
      setTimeout(() => {
        const elem = document.getElementById("intern-card");
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [searchParams]);

  // Custom Payment Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "success", // "success" | "error" | "info"
    title: "",
    message: "",
    planKey: "",
    tokensRemaining: 0,
  });

  useEffect(() => {
    if (!user) return;
    const fetchStatus = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";
        const res = await fetch(`${backendUrl}/careersense/subscription/status?clerkId=${user.id}`);
        const data = await res.json();
        if (data.success) {
          setCurrentPlan(data.plan);
          setTokensRemaining(data.tokensRemaining);
        }
      } catch (err) {
        console.error("Error fetching subscription status:", err);
      }
    };
    fetchStatus();
  }, [user]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (targetPlan) => {
    if (!user) {
      setModalConfig({
        isOpen: true,
        type: "info",
        title: "Authentication Required",
        message: "Please log in or sign up to upgrade your CareerSense subscription.",
      });
      return;
    }

    setLoadingPlan(true);
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setModalConfig({
          isOpen: true,
          type: "error",
          title: "Connection Error",
          message: "Failed to load Razorpay payment SDK. Please check your internet connection and try again.",
        });
        setLoadingPlan(false);
        return;
      }

      const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || "https://server.datasenseai.com";

      // 1. Create Razorpay Order
      const orderRes = await fetch(`${backendUrl}/careersense/subscription/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          planKey: targetPlan,
          billingCycle: targetPlan === "partner" ? partnerBillingCycle : undefined,
          fellowshipId: targetPlan === "intern" ? selectedFellowship : undefined,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        setModalConfig({
          isOpen: true,
          type: "error",
          title: "Order Error",
          message: orderData.message || "Failed to initialize payment order.",
        });
        setLoadingPlan(false);
        return;
      }

      // 2. Open Razorpay Modal
      const options = {
        key: orderData.keyId || import.meta.env.VITE_CAREERSENSE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CareerSense AI",
        description: `${targetPlan.toUpperCase()} Plan Subscription`,
        order_id: orderData.orderId,
        prefill: {
          name: user.fullName || user.firstName || "CareerSense User",
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#0EA8B9",
        },
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch(`${backendUrl}/careersense/subscription/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                clerkId: user.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planKey: targetPlan,
                billingCycle: targetPlan === "partner" ? partnerBillingCycle : undefined,
                fellowshipId: targetPlan === "intern" ? selectedFellowship : undefined,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setCurrentPlan(verifyData.plan);
              setTokensRemaining(verifyData.tokensRemaining);
              setModalConfig({
                isOpen: true,
                type: "success",
                title: "Payment Successful!",
                message: `🎉 Congratulations! You have activated the ${targetPlan.toUpperCase()} Plan.`,
                planKey: verifyData.plan,
                tokensRemaining: verifyData.tokensRemaining,
              });
            } else {
              setModalConfig({
                isOpen: true,
                type: "error",
                title: "Verification Failed",
                message: verifyData.message || "Payment signature verification failed.",
              });
            }
          } catch (vErr) {
            console.error("Payment verification error:", vErr);
            setModalConfig({
              isOpen: true,
              type: "error",
              title: "Verification Error",
              message: "An unexpected error occurred while verifying your payment.",
            });
          } finally {
            setLoadingPlan(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Upgrade error:", err);
      setModalConfig({
        isOpen: true,
        type: "error",
        title: "Checkout Error",
        message: "An error occurred while initiating the payment checkout.",
      });
      setLoadingPlan(false);
    }
  };

  const plans = [
    {
      id: "free",
      tagline: "Stage 1 — Explore",
      title: "FREE",
      priceDisplayInr: "₹0",
      priceDisplayUsd: "$0",
      periodInr: "Forever Free",
      periodUsd: "Forever Free",
      tokens: "10,000 One-Time Tokens",
      tokenDetail: "Initial allowance on signup",
      badge: "Getting Started",
      badgeColor: "bg-slate-500/10 text-slate-400 border-slate-500/30",
      accentBg: "from-slate-600/20 to-slate-800/10",
      buttonText: "Current Plan",
      buttonStyle: "bg-slate-700/50 text-slate-300 cursor-default",
      features: [
        { text: "All AI Career Tools Active", included: true },
        { text: "10,000 AI Tokens (One-Time)", included: true },
        { text: "Report / PDF Downloads", included: true, note: "₹1 per download pass" },
        { text: "Public Career Profile", included: true },
        { text: "Fellowship Program Access", included: false },
        { text: "Partner Program Workspace", included: false },
        { text: "Official Offer Letter", included: false },
      ],
    },
    {
      id: "student",
      tagline: "Stage 2 — Build Your Career",
      title: "STUDENT",
      priceDisplayInr: "₹250",
      priceDisplayUsd: "$2.49",
      periodInr: "/ month (~₹8/day)",
      periodUsd: "/ month (~$0.08/day)",
      tokens: "100,000 Tokens / Month",
      tokenDetail: "Refills monthly (old tokens exhaust)",
      badge: "Most Popular",
      badgeColor: "bg-[#0EA8B9]/15 text-[#0EA8B9] border-[#0EA8B9]/40",
      accentBg: "from-[#0EA8B9]/25 to-[#2563EB]/15",
      buttonText: "Upgrade to Student",
      buttonStyle: "bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] text-white shadow-lg shadow-cyan-500/25 hover:brightness-110",
      popular: true,
      features: [
        { text: "All AI Career Tools Active", included: true },
        { text: "100,000 AI Tokens / Month", included: true },
        { text: "Unlimited Free Downloads", included: true },
        { text: "Priority AI Execution Queue", included: true },
        { text: "Fellowship Program Access", included: false },
        { text: "Partner Program Workspace", included: false },
        { text: "Official Offer Letter", included: false },
      ],
    },
    {
      id: "intern",
      tagline: "Stage 3 — Build Real Things",
      title: "INTERN",
      priceDisplayInr: "₹2,000",
      priceDisplayUsd: "$19.99",
      periodInr: "/ 3-month internship",
      periodUsd: "/ 3-month internship",
      tokens: "500,000 Tokens / Month",
      tokenDetail: "Refills monthly for 3 months",
      badge: "Fellowship Track",
      badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/40",
      accentBg: "from-indigo-600/20 to-purple-800/15",
      buttonText: "Join Fellowship Track",
      buttonStyle: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110",
      hasFellowshipSelector: true,
      features: [
        { text: "All AI Career Tools Active", included: true },
        { text: "500,000 AI Tokens / Month", included: true },
        { text: "Unlimited Free Downloads", included: true },
        { text: "Purchased Fellowship Track Access", included: true, note: "Data Analyst, AI, UI/UX, etc." },
        { text: "Hands-on Real Projects & Mentorship", included: true },
        { text: "Partner Program Workspace", included: false },
        { text: "Official Offer Letter", included: false },
      ],
    },
    {
      id: "partner",
      tagline: "Stage 4 — Help Build CareerSense",
      title: "PARTNER",
      priceDisplayInr: partnerBillingCycle === "monthly" ? "₹2,499" : "₹10,000",
      priceDisplayUsd: partnerBillingCycle === "monthly" ? "$24.99" : "$99.99",
      periodInr: partnerBillingCycle === "monthly" ? "/ month" : "/ 6-month plan",
      periodUsd: partnerBillingCycle === "monthly" ? "/ month" : "/ 6-month plan",
      tokens: "1,000,000 Tokens / Month",
      tokenDetail: partnerBillingCycle === "monthly" ? "Refills monthly (₹2,499/mo)" : "Refills monthly for 6 months",
      badge: "Founder Level",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/40",
      accentBg: "from-amber-600/20 to-orange-800/15",
      buttonText: "Apply as Partner",
      buttonStyle: "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-lg shadow-amber-500/25 hover:brightness-110",
      features: [
        { text: "All AI Career Tools Active", included: true },
        { text: "1,000,000 AI Tokens / Month", included: true },
        { text: "Unlimited Free Downloads", included: true },
        { text: "Partner Program Workspace & 20 Assignments", included: true },
        { text: "Founder Mentorship & Weekly Calls", included: true },
        { text: "Official Partner ID & Offer Letter", included: true },
        { text: "Fellowship Programs Access", included: false, note: "Exclusive to Intern Plan" },
      ],
    },
  ];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${isDark ? "bg-[#041024] text-white" : "bg-slate-50 text-slate-900"}`}>
      <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0EA8B9]/30 bg-[#0EA8B9]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0EA8B9]">
              <Sparkles className="h-3.5 w-3.5 text-[#0EA8B9]" />
              CareerSense Progression Architecture
            </div>

            <h1 className={`mt-4 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl ${isDark ? "text-white" : "text-slate-900"}`}>
              Build Your Career with <br />
              <span className="bg-gradient-to-r from-[#0EA8B9] via-teal-400 to-blue-600 bg-clip-text text-transparent">
                Clear Progression.
              </span>
            </h1>

            <p className={`mt-4 text-base sm:text-lg font-medium leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Choose your career stage. Every plan powers your journey with AI tokens and specialized ecosystem access.
            </p>
          </div>

          {/* Current Status Pill if Logged In */}
          {user && (
            <div className="mt-8 flex justify-center">
              <div className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-2.5 shadow-sm ${isDark ? "border-slate-800 bg-[#0A2647] text-slate-200" : "border-slate-200 bg-white text-slate-800"
                }`}>
                <Zap className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold">
                  Active Plan: <span className="uppercase text-[#0EA8B9] font-black">{currentPlan}</span>
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-xs font-bold">
                  Tokens Balance: <span className="text-amber-400 font-black">{tokensRemaining.toLocaleString()}</span> Tokens
                </span>
              </div>
            </div>
          )}

          {/* Currency Toggle (INR vs USD) */}
          <div className="mt-5 flex justify-center">
            <div className={`inline-flex items-center rounded-2xl border p-1 shadow-sm ${isDark ? "border-slate-800 bg-[#0A2647]" : "border-slate-200 bg-white"
              }`}>
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition-all ${currency === "INR"
                    ? "bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] text-white shadow-sm"
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <span>🇮🇳</span>
                <span>INR (₹)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition-all ${currency === "USD"
                    ? "bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] text-white shadow-sm"
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <span>🇺🇸</span>
                <span>USD ($)</span>
              </button>
            </div>
          </div>

          {/* 4-Column Pricing Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const isCurrent = currentPlan === plan.id;
              const priceDisplay = currency === "USD" ? plan.priceDisplayUsd : plan.priceDisplayInr;
              const periodDisplay = currency === "USD" ? plan.periodUsd : plan.periodInr;

              return (
                <div
                  key={plan.id}
                  id={plan.id === "intern" ? "intern-card" : undefined}
                  className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${plan.popular
                      ? "border-[#0EA8B9] shadow-[0_12px_40px_rgba(14,168,185,0.2)] ring-1 ring-[#0EA8B9]/30"
                      : isDark
                        ? "border-slate-800 bg-[#0A2647]/80"
                        : "border-slate-200 bg-white shadow-sm"
                    } ${isDark ? "bg-[#0A2647]/90" : "bg-white"}`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {plan.tagline}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  </div>

                  {/* Title & Pricing */}
                  <div className="mt-4">
                    <h3 className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                      {plan.title}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className={`text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                        {priceDisplay}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {periodDisplay}
                      </span>
                    </div>

                    {/* AI Token Pill */}
                    <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                        <Zap className="h-4 w-4 fill-amber-400" />
                        <span>{plan.tokens}</span>
                      </div>
                      <div className="mt-0.5 text-[10.5px] font-medium text-slate-400">
                        {plan.id === "partner" ? (partnerBillingCycle === "monthly" ? (currency === "USD" ? "Refills monthly ($24.99/mo)" : "Refills monthly (₹2,499/mo)") : "Refills monthly for 6 months") : plan.tokenDetail}
                      </div>
                    </div>
                  </div>

                  {/* Billing Cycle Toggle for Partner Plan */}
                  {plan.id === "partner" && (
                    <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                        Partner Billing Frequency:
                      </label>
                      <div className="mt-2 flex gap-1 rounded-lg bg-slate-900/60 p-1">
                        <button
                          type="button"
                          onClick={() => setPartnerBillingCycle("monthly")}
                          className={`flex-1 rounded-md py-1.5 text-[10.5px] font-extrabold transition-all ${partnerBillingCycle === "monthly"
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-sm"
                              : "text-slate-400 hover:text-white"
                            }`}
                        >
                          {currency === "USD" ? "Monthly ($24.99)" : "Monthly (₹2,499)"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPartnerBillingCycle("half_yearly")}
                          className={`flex-1 rounded-md py-1.5 text-[10.5px] font-extrabold transition-all ${partnerBillingCycle === "half_yearly"
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-sm"
                              : "text-slate-400 hover:text-white"
                            }`}
                        >
                          {currency === "USD" ? "6-Month ($99.99)" : "6-Month (₹10,000)"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Fellowship Track Selector for Intern Plan */}
                  {plan.hasFellowshipSelector && (
                    <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3">
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-indigo-300">
                        Select Fellowship Track:
                      </label>
                      <select
                        value={selectedFellowship}
                        onChange={(e) => setSelectedFellowship(e.target.value)}
                        className={`mt-1.5 w-full rounded-lg border border-indigo-500/40 px-2.5 py-1.5 text-xs font-bold shadow-xs outline-hidden ${isDark ? "bg-[#061838] text-white" : "bg-white text-slate-900"
                          }`}
                      >
                        <option value="data-analyst">Data Analyst Fellowship</option>
                        <option value="data-science">Data Science Fellowship</option>
                        <option value="artificial-intelligence">Artificial Intelligence Fellowship</option>
                        <option value="ui-ux-design">UI/UX Design Fellowship</option>
                        <option value="app-development">App Development Fellowship</option>
                        <option value="full-stack-development">Full Stack Development Fellowship</option>
                      </select>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="my-6 space-y-3">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        {feat.included ? (
                          <Check className="h-4 w-4 shrink-0 text-[#0EA8B9]" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-slate-500/50" />
                        )}
                        <span className={feat.included ? (isDark ? "text-slate-200" : "text-slate-700") : "text-slate-500 line-through"}>
                          {feat.text}
                          {feat.note && (
                            <span className="block text-[10px] font-semibold text-amber-400/90">{feat.note}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => !isCurrent && handleUpgrade(plan.id)}
                    disabled={isCurrent || loadingPlan}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black transition-all ${isCurrent ? "bg-slate-700/40 text-slate-400 cursor-default" : plan.buttonStyle
                      }`}
                  >
                    <span>{isCurrent ? "Current Plan Active" : plan.buttonText}</span>
                    {!isCurrent && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* CUSTOM PAYMENT RESULT MODAL */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all animate-in fade-in duration-200">
          <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${isDark ? "border-cyan-500/30 bg-[#081836] text-white" : "border-slate-200 bg-white text-slate-900"
            }`}>

            <button
              type="button"
              onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
              className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              {modalConfig.type === "success" ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 size={36} />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shadow-lg shadow-rose-500/10">
                  <AlertCircle size={36} />
                </div>
              )}

              <h3 className="mt-4 text-2xl font-black tracking-tight">
                {modalConfig.title}
              </h3>

              <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {modalConfig.message}
              </p>

              {modalConfig.type === "success" && modalConfig.planKey && (
                <div className="mt-5 w-full rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-left">
                  <div className="flex justify-between items-center text-xs font-bold border-b border-cyan-500/20 pb-2">
                    <span className="text-slate-400">Activated Plan:</span>
                    <span className="uppercase text-[#0EA8B9] font-black">{modalConfig.planKey}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold pt-2">
                    <span className="text-slate-400">New Token Balance:</span>
                    <span className="text-amber-400 font-black">{modalConfig.tokensRemaining?.toLocaleString()} Tokens</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex w-full gap-3">
                {modalConfig.type === "success" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setModalConfig({ ...modalConfig, isOpen: false });
                      navigate("/dashboard");
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#0EA8B9] to-[#2563EB] py-3.5 text-xs font-black text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all"
                  >
                    Go to Dashboard →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                    className="w-full rounded-2xl bg-slate-700 py-3.5 text-xs font-black text-white hover:bg-slate-600 transition-all"
                  >
                    Close
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      <Footer heroTheme={heroTheme} />
    </div>
  );
}

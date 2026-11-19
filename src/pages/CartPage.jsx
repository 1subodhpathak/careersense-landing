import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  GraduationCap,
  BriefcaseBusiness,
  Users,
  Zap,
  Check,
  ShieldCheck,
  Lock,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  BadgeCheck,
  Tag,
  Loader2,
  Sparkles,
  Layers,
  AlertCircle,
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import CSLogo from "../Assets/CSlogo.png";

export const FELLOWSHIP_TRACKS = [
  { id: "data-analyst", name: "Data Analyst Fellowship", label: "Data Analyst" },
  { id: "data-science", name: "Data Science Fellowship", label: "Data Science" },
  { id: "artificial-intelligence", name: "Artificial Intelligence Fellowship", label: "AI & ML" },
  { id: "ui-ux-design", name: "UI/UX Design Fellowship", label: "UI/UX Design" },
  { id: "app-development", name: "App Development Fellowship", label: "App Development" },
  { id: "full-stack-development", name: "Full Stack Development Fellowship", label: "Full Stack Dev" },
];

export default function CartPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  // Extract query parameters with smart fallbacks
  const initialPlan = searchParams.get("plan") || "intern";
  const initialTrack = searchParams.get("track") || "data-analyst";
  const initialBilling = searchParams.get("cycle") || searchParams.get("billing") || "monthly";
  const initialCoupon = (searchParams.get("coupon") || "").trim().toUpperCase();

  // State
  const [activePlan, setActivePlan] = useState(initialPlan);
  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  const [billingCycle, setBillingCycle] = useState(initialBilling);

  // Coupon state
  const [couponInput, setCouponInput] = useState(initialCoupon);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Checkout state
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Current user active subscription state
  const [currentPlan, setCurrentPlan] = useState("free");
  const [purchasedFellowships, setPurchasedFellowships] = useState([]);

  // Payment processing loader popup state
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [verificationStage, setVerificationStage] = useState("processing"); // 'processing' | 'success' | 'failed'

  const backendUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "https://server.datasenseai.com";

  // Fetch current user subscription status to restrict rebuying active plans
  useEffect(() => {
    if (!user) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${backendUrl}/careersense/subscription/status?clerkId=${user.id}`);
        const data = await res.json();
        if (data.success && data.plan) {
          setCurrentPlan(data.plan);
          if (Array.isArray(data.purchasedFellowships)) {
            setPurchasedFellowships(data.purchasedFellowships);
          }
        }
      } catch (err) {
        console.warn("[CartPage] Error fetching user subscription status:", err);
      }
    };
    fetchStatus();
  }, [user, backendUrl]);

  // Check if selected plan is candidate's current active plan
  const isCurrentPlan =
    activePlan !== "token_addon" &&
    (activePlan === currentPlan || (activePlan === "intern" && purchasedFellowships.includes(selectedTrack)));

  // Validate coupon function
  const validateCouponCode = useCallback(
    async (codeToValidate, plan, cycle) => {
      if (!codeToValidate || !codeToValidate.trim()) return;

      setValidatingCoupon(true);
      setCouponError("");

      try {
        const res = await fetch(`${backendUrl}/careersense/subscription/validate-coupon`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponCode: codeToValidate.trim().toUpperCase(),
            planKey: plan,
            billingCycle: cycle,
            clerkId: user?.id || undefined,
          }),
        });

        const data = await res.json();
        if (data.success && data.valid) {
          setAppliedCoupon(data);
          setCouponError("");
        } else {
          setAppliedCoupon(null);
          setCouponError(data.message || "Invalid or inapplicable coupon code.");
        }
      } catch (err) {
        console.error("[Cart Coupon Validation Error]:", err);
        setCouponError("Network error while validating coupon code.");
      } finally {
        setValidatingCoupon(false);
      }
    },
    [backendUrl, user]
  );

  // Auto-validate initial coupon from URL on mount
  useEffect(() => {
    if (initialCoupon) {
      validateCouponCode(initialCoupon, activePlan, billingCycle);
    }
  }, [initialCoupon, activePlan, billingCycle, validateCouponCode]);

  // Revalidate or clear coupon when plan or billing cycle changes
  const handlePlanChange = (newPlan) => {
    setActivePlan(newPlan);
    setPaymentError("");
    if (appliedCoupon) {
      // Re-validate against new plan
      validateCouponCode(appliedCoupon.coupon.code, newPlan, billingCycle);
    }
  };

  const handleBillingChange = (newBilling) => {
    setBillingCycle(newBilling);
    setPaymentError("");
    if (appliedCoupon) {
      validateCouponCode(appliedCoupon.coupon.code, activePlan, newBilling);
    }
  };

  const handleApplyCoupon = (e) => {
    if (e) e.preventDefault();
    if (!couponInput.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    validateCouponCode(couponInput, activePlan, billingCycle);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  // Base price computations in INR
  const getPlanPricing = () => {
    if (activePlan === "student") {
      return {
        name: "Student Plan",
        duration: "Monthly subscription (renews at ₹250/mo)",
        baseAmountINR: 250,
        periodText: "/ month",
        accent: "#0ea59e",
      };
    }
    if (activePlan === "intern") {
      const trackObj = FELLOWSHIP_TRACKS.find((t) => t.id === selectedTrack) || FELLOWSHIP_TRACKS[0];
      return {
        name: trackObj.name,
        duration: "Full 3-month verified internship track",
        baseAmountINR: 2000,
        periodText: "/ 3 months",
        accent: "#0a9d89",
      };
    }
    if (activePlan === "partner") {
      const isSixMonth = billingCycle === "half_yearly";
      return {
        name: "Partner Program",
        duration: isSixMonth ? "6-month partner package (Save 33%)" : "Monthly partner package",
        baseAmountINR: isSixMonth ? 10000 : 2499,
        periodText: isSixMonth ? "for 6 months" : "/ month",
        accent: "#c08b32",
      };
    }
    if (activePlan === "token_addon") {
      return {
        name: "50,000 AI Token Add-on",
        duration: "Instant token balance credit · Never expires",
        baseAmountINR: 99,
        periodText: "one-time",
        accent: "#b87616",
      };
    }
    return {
      name: "Plan",
      duration: "Subscription",
      baseAmountINR: 0,
      periodText: "",
      accent: "#0ea59e",
    };
  };

  const pricing = getPlanPricing();
  const hasDiscount = Boolean(appliedCoupon && appliedCoupon.valid);
  const payableAmountINR = hasDiscount ? appliedCoupon.finalAmountINR : pricing.baseAmountINR;
  const discountAmountINR = hasDiscount ? appliedCoupon.discountINR : 0;

  // Razorpay payment SDK loader
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

  // Payment checkout flow
  const handleProceedToPayment = async () => {
    if (!hasAcceptedTerms || loadingPayment || isCurrentPlan) return;

    if (!user) {
      if (openSignIn) {
        openSignIn({
          afterSignInUrl: window.location.href,
          afterSignUpUrl: window.location.href,
        });
      } else {
        alert("Please sign in or create an account to proceed with your subscription.");
      }
      return;
    }

    setLoadingPayment(true);
    setPaymentError("");

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setPaymentError("Failed to load Razorpay payment SDK. Please check your internet connection.");
        setLoadingPayment(false);
        return;
      }

      const targetCouponCode = appliedCoupon?.coupon?.code || undefined;

      // 1. Create Razorpay Order
      const orderRes = await fetch(`${backendUrl}/careersense/subscription/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          planKey: activePlan,
          billingCycle: activePlan === "partner" ? billingCycle : undefined,
          fellowshipId: activePlan === "intern" ? selectedTrack : undefined,
          couponCode: targetCouponCode,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        setPaymentError(orderData.message || "Failed to initialize payment order.");
        setLoadingPayment(false);
        return;
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId || import.meta.env.VITE_CAREERSENSE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "CareerSense AI",
        description: `${pricing.name} ${targetCouponCode ? `(Coupon: ${targetCouponCode})` : ""}`,
        order_id: orderData.orderId,
        prefill: {
          name: user.fullName || user.firstName || "CareerSense User",
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#0EA8B9",
        },
        handler: async function (response) {
          // Open Payment Processing & Verification Loader Modal
          setVerifyingPayment(true);
          setVerificationStage("processing");

          try {
            // 3. Verify Payment with Backend
            const verifyRes = await fetch(`${backendUrl}/careersense/subscription/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                clerkId: user.id,
                userEmail: user.primaryEmailAddress?.emailAddress || "",
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planKey: activePlan,
                billingCycle: activePlan === "partner" ? billingCycle : undefined,
                fellowshipId: activePlan === "intern" ? selectedTrack : undefined,
                couponCode: targetCouponCode,
                discountPaise: appliedCoupon?.discountPaise || 0,
                finalAmountPaise: orderData.amount,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setVerificationStage("success");
              setCurrentPlan(verifyData.plan || activePlan);
              if (activePlan === "intern" && selectedTrack) {
                setPurchasedFellowships((prev) => [...prev, selectedTrack]);
              }
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000);
            } else {
              setVerificationStage("failed");
              setPaymentError(verifyData.message || "Payment signature verification failed.");
            }
          } catch (err) {
            console.error("[Payment Verification Error]:", err);
            setVerificationStage("failed");
            setPaymentError("Network error while verifying payment with server.");
          } finally {
            setLoadingPayment(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPayment(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (failResponse) {
        setPaymentError(failResponse.error?.description || "Payment failed. Please try a different payment method.");
        setLoadingPayment(false);
      });
      rzp.open();
    } catch (err) {
      console.error("[Checkout Error]:", err);
      setPaymentError("An unexpected error occurred during checkout.");
      setLoadingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src={CSLogo} alt="CareerSense Logo" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
              <span className="text-xl font-black tracking-tight text-slate-900">
                Career<span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Sense</span>
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400 pl-4 border-l border-slate-200">
              <Link to="/pricing" className="hover:text-slate-700 transition">Pricing Plans</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">Cart & Checkout</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <Lock size={12} className="text-teal-600" />
              <span>256-Bit SSL Encrypted</span>
            </div>
            <Link
              to="/pricing"
              className="text-xs font-bold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 transition"
            >
              <ArrowLeft size={14} />
              <span>Back to Plans</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Cart Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Step Indicator */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Order Review & Checkout
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Confirm your selected plan, customize your track or billing cycle, and apply promo discount codes.
            </p>
          </div>
        </div>

        {paymentSuccess ? (
          /* Payment Success Full Card */
          <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl border border-emerald-200 p-8 text-center shadow-xl space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
            <p className="text-sm text-slate-600">
              Your <strong>{pricing.name}</strong> has been successfully activated. Your tokens and program credentials are now live on your account.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b132b] hover:bg-slate-800 text-white text-xs font-bold shadow-md transition"
              >
                <span>Go to Candidate Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* Two-Column Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ============================================================== */}
            {/* LEFT COLUMN: Plan Selection & Detailed In-Depth Content (65%) */}
            {/* ============================================================== */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Plan Switcher Pills */}
              <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap gap-1.5">
                {[
                  { id: "student", label: "Student Plan", price: "₹250/mo", icon: GraduationCap },
                  { id: "intern", label: "Intern Fellowship", price: "₹2,000", icon: BriefcaseBusiness },
                  { id: "partner", label: "Partner Program", price: "₹2,499+", icon: Users },
                  { id: "token_addon", label: "50k Token Add-on", price: "₹99", icon: Zap },
                ].map((p) => {
                  const Icon = p.icon;
                  const isSelected = activePlan === p.id;
                  const isPlanCurrent = p.id !== "token_addon" && p.id === currentPlan;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePlanChange(p.id)}
                      className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0b132b] text-white shadow-md scale-[1.01]"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={14} className={isSelected ? "text-cyan-400" : "text-slate-400"} />
                      <span>{p.label}</span>
                      {isPlanCurrent ? (
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${isSelected ? "bg-emerald-500/30 text-emerald-200" : "bg-emerald-100 text-emerald-700"}`}>
                          Active
                        </span>
                      ) : (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                          {p.price}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Content Container */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
                {/* Header Banner */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs"
                      style={{
                        backgroundColor: activePlan === "student" ? "#e6fffa" : activePlan === "intern" ? "#e6fbf8" : activePlan === "partner" ? "#fff5e6" : "#fef3c7",
                        color: pricing.accent,
                      }}
                    >
                      {activePlan === "student" && <GraduationCap size={24} />}
                      {activePlan === "intern" && <BriefcaseBusiness size={24} />}
                      {activePlan === "partner" && <Users size={24} />}
                      {activePlan === "token_addon" && <Zap size={24} />}
                    </div>
                    <div>
                      <span
                        className="text-[10.5px] font-black uppercase tracking-wider block"
                        style={{ color: pricing.accent }}
                      >
                        {activePlan === "student" && "Stage 2 • Build Your Career"}
                        {activePlan === "intern" && "Stage 3 • Build Real Things"}
                        {activePlan === "partner" && "Stage 4 • Help Build CareerSense"}
                        {activePlan === "token_addon" && "Instant Top-Up Service"}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                        {pricing.name}
                      </h2>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      ₹{pricing.baseAmountINR}
                    </div>
                    <div className="text-[11px] text-slate-400 font-semibold mt-1">
                      {pricing.periodText}
                    </div>
                  </div>
                </div>

                {/* Current Active Plan Notice Banner */}
                {isCurrentPlan && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 animate-in fade-in">
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-950">
                        You are already on this plan
                      </div>
                      <p className="text-[11.5px] text-amber-800 mt-0.5 leading-relaxed">
                        {activePlan === "intern" && purchasedFellowships.includes(selectedTrack)
                          ? `You are currently enrolled in the ${FELLOWSHIP_TRACKS.find((t) => t.id === selectedTrack)?.name || "selected"} fellowship track. You can choose a different specialization track or purchase a 50,000 AI Token Add-on.`
                          : `Your account already has an active subscription to the ${pricing.name}. To upgrade, please select a higher tier or top up your balance with the 50,000 AI Token Add-on.`}
                      </p>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* 1. INTERN FELLOWSHIP DETAILED CONTENT                         */}
                {/* ============================================================== */}
                {activePlan === "intern" && (
                  <div className="space-y-6">
                    {/* Track Selection Card */}
                    <div className="rounded-2xl border-2 border-teal-500/80 bg-teal-50/40 p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-xs font-black uppercase tracking-wider text-teal-950">
                          Select Your Fellowship Specialization Track *
                        </label>
                        <span className="text-[10.5px] font-bold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                          6 Tracks Available
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {FELLOWSHIP_TRACKS.map((t) => {
                          const isTrackSelected = selectedTrack === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setSelectedTrack(t.id)}
                              className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between min-h-[72px] ${
                                isTrackSelected
                                  ? "border-teal-600 bg-white text-teal-950 shadow-md ring-2 ring-teal-500/20"
                                  : "border-teal-200/80 bg-white/70 hover:bg-white text-slate-700 hover:border-teal-400"
                              }`}
                            >
                              <span className="text-xs font-bold leading-tight">{t.name}</span>
                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
                                <span>3 Months</span>
                                {isTrackSelected && <span className="text-teal-600 font-black">✓ Selected</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                        <div className="text-base font-black text-slate-900">3 Months</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Duration</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                        <div className="text-base font-black text-teal-700">500,000</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tokens / Mo</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                        <div className="text-base font-black text-blue-700">Evaluated</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Capstone</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center">
                        <div className="text-base font-black text-emerald-700">Verified</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Certificate</div>
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Fellowship Curriculum & Deliverables
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                        {[
                          "Assigned real-world projects in your chosen specialization",
                          "Capstone code evaluation and GitHub repo reviews",
                          "Hands-on milestone guidance and technical mentorship",
                          "Full unlocked access to all 4 CareerSense AI tools",
                          "Unlimited resume and gap report PDF downloads",
                          "Candidate portfolio verification and badge",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/40">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-[10px] font-black mt-0.5">
                              ✓
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Completion Documents */}
                    <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-teal-950 mb-1">
                        Official Documents Awarded Upon Successful Completion
                      </h4>
                      <p className="text-xs text-slate-600 mb-3">
                        Awarded upon completion of the 3-month duration and evaluated project milestones:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-teal-900">
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-teal-200">
                          <FileText size={16} className="text-teal-700 shrink-0" />
                          <span>Official Internship Completion Certificate</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-teal-200">
                          <FileText size={16} className="text-teal-700 shrink-0" />
                          <span>Official Internship Relieving Letter</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 italic mt-2.5">
                        * An official onboarding internship offer letter is issued upon initial enrollment registration.
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="rounded-2xl border border-slate-200 p-4 space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Candidate Internship Roadmap
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        {[
                          { step: "1", title: "Enroll in Track", desc: "Select track and complete registration." },
                          { step: "2", title: "Offer Letter", desc: "Receive official offer letter and start date." },
                          { step: "3", title: "Build Capstone", desc: "Work on real tasks with mentor feedback." },
                          { step: "4", title: "Graduate", desc: "Earn verified certificate and relieving letter." },
                        ].map((s) => (
                          <div key={s.step} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                            <span className="inline-block w-5 h-5 rounded-md bg-teal-600 text-white text-[11px] font-black text-center leading-5 mb-1">
                              {s.step}
                            </span>
                            <div className="font-bold text-slate-900">{s.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{s.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* 2. PARTNER PROGRAM DETAILED CONTENT                            */}
                {/* ============================================================== */}
                {activePlan === "partner" && (
                  <div className="space-y-6">
                    {/* Billing Cycle Picker */}
                    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-4">
                      <label className="block text-xs font-black uppercase tracking-wider text-amber-950 mb-2.5">
                        Choose Your Billing Package
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleBillingChange("monthly")}
                          className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                            billingCycle === "monthly"
                              ? "border-amber-600 bg-white text-slate-900 shadow-md ring-2 ring-amber-500/20"
                              : "border-amber-200 bg-white/70 hover:bg-white text-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">Monthly Partner Package</span>
                            <span className="text-xs font-black text-amber-800">₹2,499 / mo</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">Flexible month-to-month participation</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBillingChange("half_yearly")}
                          className={`p-3.5 rounded-xl border text-left transition cursor-pointer relative overflow-hidden ${
                            billingCycle === "half_yearly"
                              ? "border-amber-600 bg-white text-slate-900 shadow-md ring-2 ring-amber-500/20"
                              : "border-amber-200 bg-white/70 hover:bg-white text-slate-700"
                          }`}
                        >
                          <span className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9.5px] font-black uppercase px-2 py-0.5 rounded-bl-lg">
                            Save 33%
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">6 Months Partner Package</span>
                            <span className="text-xs font-black text-amber-800">₹10,000 Total</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">₹1,667 / month equivalent</div>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <div className="text-xs font-black text-amber-800">1,000,000 AI Tokens / Month</div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Top-tier AI usage allowance across all CareerSense engines while enrolled.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <div className="text-xs font-black text-amber-800">20 Startup Assignments</div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Hands-on milestone assignments covering product, marketing, data, and operations.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/60 text-xs text-amber-950 leading-relaxed">
                      <strong>CEO Interview Pathway:</strong> Completing all 20 required assignments qualifies graduates for a final round interview with the CareerSense CEO for prospective team openings.
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* 3. STUDENT PLAN DETAILED CONTENT                              */}
                {/* ============================================================== */}
                {activePlan === "student" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                        <div className="text-lg font-black text-teal-700">100,000</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">Monthly AI Tokens</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                        <div className="text-lg font-black text-slate-900">All 4 Tools</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">Full Access</div>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                        <div className="text-lg font-black text-blue-700">Unlimited</div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">PDF Downloads</div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                        What's Included in Student Pro:
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {[
                          "AI Resume Builder with auto-keyword injection",
                          "ATS Scanner with deep parser diagnostic reports",
                          "Tailored AI Cover Letter Builder in seconds",
                          "Career GPS step-by-step roadmap simulators",
                          "Priority queue for instant AI processing",
                          "Cancel anytime with 1-click self-service",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/40">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white text-[10px] font-black mt-0.5">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* 4. TOKEN ADD-ON DETAILED CONTENT                              */}
                {/* ============================================================== */}
                {activePlan === "token_addon" && (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-center">
                      <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
                        <Layers size={24} />
                      </div>
                      <div className="text-xl font-black text-slate-900">50,000 AI Tokens</div>
                      <p className="text-xs text-slate-600 mt-1">
                        Instant top-up add-on credited directly to your CareerSense account balance.
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700">
                      {[
                        "Tokens are credited instantly upon payment confirmation",
                        "Tokens never expire and remain available until fully consumed",
                        "Works seamlessly across all tools (ATS Scanner, Resume Builder, Cover Letter, Certifi)",
                        "Does not modify or reset your existing active subscription plan",
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white">
                          <Check size={16} className="text-teal-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT COLUMN: Sticky Order Summary & Coupon Box (35%)         */}
            {/* ============================================================== */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Lock size={16} className="text-teal-600" />
                    <span>Order Summary</span>
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400">1 Item</span>
                </div>

                {/* Selected Item Summary */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs font-black text-slate-900">
                    <span className="truncate pr-2">{pricing.name}</span>
                    <span>₹{pricing.baseAmountINR}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {pricing.duration}
                  </div>
                </div>

                {/* ============================================================ */}
                {/* PROMO COUPON CODE SECTION (as requested by user)            */}
                {/* ============================================================ */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Do you have a coupon?
                  </label>

                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                            placeholder="e.g. WELCOME30"
                            className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={validatingCoupon || !couponInput.trim()}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs"
                        >
                          {validatingCoupon ? <Loader2 size={13} className="animate-spin" /> : null}
                          <span>Apply</span>
                        </button>
                      </div>

                      {couponError && (
                        <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-medium pt-0.5">
                          <AlertCircle size={13} className="shrink-0" />
                          <span>{couponError}</span>
                        </div>
                      )}
                    </form>
                  ) : (
                    /* Applied Coupon Card */
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                          <span className="font-mono font-black text-emerald-950 uppercase">
                            {appliedCoupon.coupon.code}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-slate-400 hover:text-red-600 text-[11px] font-semibold underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                        <span>Coupon Savings:</span>
                        <span>-₹{appliedCoupon.discountINR}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Calculation Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Package Price</span>
                    <span className="font-semibold text-slate-900">₹{pricing.baseAmountINR}</span>
                  </div>

                  {hasDiscount && (
                    <div className="flex items-center justify-between text-emerald-700 font-bold">
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        <span>Coupon Discount ({appliedCoupon.coupon.code})</span>
                      </span>
                      <span>-₹{discountAmountINR}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Platform & Gateway Fee</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                        Total Payable
                      </div>
                      <div className="text-[10px] text-slate-400">All taxes included</div>
                    </div>

                    <div className="text-right">
                      {hasDiscount && (
                        <div className="text-xs text-slate-400 line-through font-semibold leading-none mb-0.5">
                          ₹{pricing.baseAmountINR}
                        </div>
                      )}
                      <div className="text-2xl font-black text-slate-900 leading-tight">
                        ₹{payableAmountINR}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Banner if Payment Fails */}
                {paymentError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Terms Acceptance Checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    checked={hasAcceptedTerms}
                    onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="leading-tight">
                    I agree to the CareerSense program requirements, terms of service, and refund policy.
                  </span>
                </label>

                {/* Proceed to Payment Button */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  disabled={!hasAcceptedTerms || loadingPayment || isCurrentPlan}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 active:scale-[0.99] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isCurrentPlan ? (
                    <>
                      <CheckCircle2 size={15} className="text-emerald-600" />
                      <span>Your Current Active Plan</span>
                    </>
                  ) : loadingPayment ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Opening Razorpay Checkout...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      <span>Proceed to Payment • ₹{payableAmountINR}</span>
                    </>
                  )}
                </button>

                {isCurrentPlan && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-semibold text-center leading-normal">
                    You already have an active subscription to this tier. Please choose another plan or add-on.
                  </div>
                )}

                {/* Trust Badges Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[10.5px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-600" /> SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Razorpay Verified</span>
                  <span>•</span>
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Processing & Verification Modal Popup */}
        {verifyingPayment && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-3xl p-7 text-center shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
              {verificationStage === "processing" && (
                <>
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-60" />
                    <div className="relative w-16 h-16 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shadow-inner">
                      <Loader2 size={32} className="text-teal-600 animate-spin" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      Processing Payment & Activating Account
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Please do not close or refresh this page. We are securely validating your transaction with Razorpay and provisioning your tokens.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11.5px] text-slate-600 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>Payment completed via Razorpay</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal-800 font-bold">
                      <Loader2 size={13} className="animate-spin text-teal-600 shrink-0" />
                      <span>Verifying cryptographic payment signature...</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">•</span>
                      <span>Crediting AI token allowance to your profile</span>
                    </div>
                  </div>
                </>
              )}

              {verificationStage === "success" && (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={44} className="animate-in zoom-in-75 duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      Payment Verified Successfully! 🎉
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Your <strong>{pricing.name}</strong> is now fully active! Tokens and features have been credited to your account.
                    </p>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full animate-pulse w-full transition-all duration-1000" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 font-medium">Redirecting to candidate dashboard...</p>
                  </div>
                </>
              )}

              {verificationStage === "failed" && (
                <>
                  <div className="w-20 h-20 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-inner">
                    <AlertCircle size={44} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      Payment Verification Issue
                    </h3>
                    <p className="text-xs text-red-600 mt-1.5 leading-relaxed">
                      {paymentError || "We could not verify your payment with Razorpay. If money was debited, it will be credited automatically or please contact support."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVerifyingPayment(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Close & Try Again
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400 mt-12">
        <p>© {new Date().getFullYear()} CareerSense AI Inc. All rights reserved.</p>
        <p className="mt-1">
          Need support? Reach out at{" "}
          <a href="mailto:support@careersenseai.com" className="text-teal-600 hover:underline">
            support@careersenseai.com
          </a>
        </p>
      </footer>
    </div>
  );
}

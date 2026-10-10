import { useState, useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Check, X, Zap, ArrowRight, CheckCircle2, AlertCircle, GraduationCap, BriefcaseBusiness, Box, Users, Layers, Settings, ShoppingCart, FileText, ClipboardCheck, Bot, BadgeCheck, ChevronDown, BookOpen } from "lucide-react";

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

  const [tokensRemaining, setTokensRemaining] = useState(30000);

  const [loadingPlan, setLoadingPlan] = useState(false);

  const [selectedFellowship, setSelectedFellowship] = useState("data-analyst");

  const [partnerBillingCycle, setPartnerBillingCycle] = useState("monthly");

  const [currency, setCurrency] = useState("INR"); // "INR" | "USD"

  const [selectedPlan, setSelectedPlan] = useState("free");

  useEffect(() => {

    const fParam = searchParams.get("fellowship");

    if (fParam) {

      setSelectedFellowship(fParam);

      setSelectedPlan("intern");

      const scrollTimeout = setTimeout(() => {

        const elem = document.getElementById("intern-card");

        if (elem) {

          elem.scrollIntoView({ behavior: "smooth", block: "center" });

        }

      }, 300);

      return () => clearTimeout(scrollTimeout);

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

          setSelectedPlan(data.plan);

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

                title: targetPlan === "token_addon" ? "Tokens Added Successfully!" : "Payment Successful!",

                message: targetPlan === "token_addon"

                  ? "🎉 50,000 AI Tokens have been successfully added to your balance."

                  : `🎉 Congratulations! You have activated the ${targetPlan.toUpperCase()} Plan.`,

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

      tagline: "Stage 1 - Explore",

      title: "FREE",

      priceDisplayInr: "₹0",

      priceDisplayUsd: "$0",

      periodInr: "Forever Free",

      periodUsd: "Forever Free",

      tokens: "30,000 One-Time Tokens",

      tokenDetail: "Initial allowance on signup",

      buttonText: "Current Plan",

      features: [

        { text: "All AI Career Tools Active", included: true },

        { text: "30,000 AI Tokens (One-Time)", included: true },

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

      badge: "Recommended",

      buttonText: "Upgrade to Student",

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

      badge: "Fellowship",

      buttonText: "Join Fellowship Track",

      hasFellowshipSelector: true,

      features: [

        { text: "All AI Career Tools Active", included: true },

        { text: "500,000 AI Tokens / Month", included: true },

        { text: "Unlimited Free Downloads", included: true },

        { text: "Purchased Fellowship Track Access", included: true, note: "Data Analyst, AI, UI/UX, etc." },

        { text: "Hands-on Real Projects & Mentorship", included: true },

        { text: "Partner Program Workspace", included: false },

        { text: "Official Offer Letter", included: true },

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

      buttonText: "Apply as Partner",

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

  const iconFor = { free: Box, student: GraduationCap, intern: BriefcaseBusiness, partner: Users };

  const descriptions = {

    free: "Start your career with essential AI tools.",

    student: "Build skills and projects that stand out.",

    intern: "Gain real-project fellowship mentorship.",

    partner: "Help build CareerSense and make an impact.",

  };



  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [

    { question: "Which CareerSense plan is right for me?", answer: "Choose Free to explore the core tools, Student for regular career preparation and higher monthly usage, Intern for a three-month fellowship with real projects and mentorship, or Partner for the highest token allowance, partner workspace and founder support." },

    { question: "What are AI tokens, and where can I use them?", answer: "AI tokens power supported CareerSense features such as resume tools, ATS analysis, interview practice and other AI-assisted workflows. When you are signed in, your current balance appears beside the plan controls." },

    { question: "When do my tokens refresh?", answer: "Free includes a one-time allowance. Student, Intern and Partner include monthly token refills according to the plan details shown above. Intern refills continue during the three-month fellowship period." },

    { question: "Can I buy more tokens without changing my plan?", answer: "Yes. The 50,000-token top-up is a one-time add-on, so you can keep your current subscription and add more tokens when needed." },

    { question: "Can I upgrade or change my plan later?", answer: "Yes. You can return to this page and choose another available plan. The new plan is activated after checkout completes successfully." },

    { question: "What is included with the Intern fellowship?", answer: "The Intern plan includes your selected fellowship track, real projects, mentorship, monthly token refills for three months, priority AI execution, and an official CareerSense ID and offer letter." },

    { question: "How does Partner billing work?", answer: "You can choose monthly or six-month Partner billing before checkout. The displayed price and billing period update when you change the billing option." },

    { question: "How are payments and refunds handled?", answer: "Checkout is processed securely through Razorpay, with available payment methods shown during checkout. Refund eligibility follows the applicable CareerSense purchase terms, so please review them before paying." },

  ];

  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const sharedTools = [

    { title: "AI Resume Builder", detail: "Create ATS-friendly resumes", icon: FileText, tint: "red" },

    { title: "ATS Checker", detail: "Check JD match and insights", icon: ClipboardCheck, tint: "green" },

    { title: "Cover Letter Builder", detail: "Write personalized letters", icon: FileText, tint: "orange" },

    { title: "Interview Simulator", detail: "Practice interviews with AI", icon: Bot, tint: "purple" },

    { title: "Skill Certification", detail: "Demonstrate verified skills", icon: BadgeCheck, tint: "blue" },

    { title: "Career Resources", detail: "Explore guides and templates", icon: BookOpen, tint: "amber" },

  ];

  const compareRows = [

    { label: "AI tokens", values: ["30,000 (one-time)", "100,000 / month", "500,000 / month", "1,000,000 / month"] },

    { label: "AI Resume Builder", values: [true, true, true, true] },

    { label: "ATS Checker", values: [true, true, true, true] },

    { label: "Cover Letter Builder", values: [true, true, true, true] },

    { label: "Interview Simulator", values: [true, true, true, true] },

    { label: "Skill Certification", values: [true, true, true, true] },

    { label: "Career Resources", values: [true, true, true, true] },

    { label: "Report / PDF downloads", values: ["₹1 per pass", "Unlimited", "Unlimited", "Unlimited"] },

    { label: "Priority AI execution", values: [false, true, true, true] },

    { label: "Purchased fellowship track access", values: [false, false, true, false] },

    { label: "Real projects & fellowship mentorship", values: [false, false, true, false] },

    { label: "Partner workspace & 20 assignments", values: [false, false, false, true] },

    { label: "Founder mentorship & weekly calls", values: [false, false, false, true] },

    { label: "Official CareerSense ID & offer letter", values: [false, false, true, true] },

  ];

  const comparisonPlanLabels = {

    free: "Explore",

    student: "Build skills",

    intern: "Fellowship",

    partner: "Build & lead",

  };



  return (

    <div className={`cs-pricing-page min-h-screen antialiased ${isDark ? "cs-dark" : ""}`}>

      <style>{`/* CareerSense full-scroll pricing — styles are scoped to this page */

.cs-pricing-page {

  zoom: 0.9;

  min-height: 111.12vh;

  width: 100%;

  --cs-ink:#0b1845; --cs-muted:#65799a; --cs-blue:#0a64f4; --cs-line:#dfebf8;

  --cs-white:#fff; --cs-surface:#fff; --cs-bg:#f8fbff;

  color:var(--cs-ink); font-family:inherit; overflow-x:clip;

  background:radial-gradient(ellipse 58% 15% at 90% 15%,#e1efff 0%,transparent 100%),linear-gradient(180deg,#f8fcff 0%,#fff 42%,#f3faff 100%);

}

.cs-pricing-page *{box-sizing:border-box}

.cs-pricing-page .cs-container{width:min(1400px,calc(100% - 72px));margin:0 auto}

.cs-pricing-page .cs-hero{position:relative;overflow:hidden;padding:34px 0 27px;border-bottom:1px solid #e8f1fb;background:radial-gradient(circle at 72% 35%,#deedff 0%,transparent 37%),linear-gradient(103deg,#f6fbff,#eaf5ff 83%,#f8fcff)}

.cs-pricing-page .cs-hero-inner{position:relative;display:flex;align-items:center;justify-content:space-between;gap:25px;min-height:172px}

.cs-pricing-page .cs-hero-copy{position:relative;z-index:1;max-width:700px}

.cs-pricing-page .cs-eyebrow{display:inline-flex;align-items:center;gap:7px;font-weight:850;color:#066def;font-size:11px;letter-spacing:.095em;text-transform:uppercase}

.cs-pricing-page .cs-hero h1{margin:11px 0 9px;font-size:clamp(33px,3.1vw,48px);letter-spacing:-.055em;font-weight:900;line-height:1.08;max-width:670px}

.cs-pricing-page .cs-hero h1 span{color:#0b67f5}

.cs-pricing-page .cs-hero p{color:#62799d;font-size:15px;line-height:1.55;max-width:620px}

.cs-pricing-page .cs-hero-art{position:relative;width:340px;height:165px;flex:0 0 340px;pointer-events:none}

.cs-pricing-page .cs-art-app{position:absolute;left:36px;top:16px;width:178px;height:120px;border:1px solid #d9e9ff;border-radius:18px;padding:13px;background:#ffffffbd;box-shadow:0 18px 36px #2a76cf17;transform:rotate(-6deg)}

.cs-pricing-page .cs-art-topline{height:8px;width:75px;border-radius:12px;background:linear-gradient(90deg,#cfe6fe,#eff5ff);margin-bottom:12px}

.cs-pricing-page .cs-art-line{height:10px;border-radius:8px;background:#e9f2fe;margin:10px 0}

.cs-pricing-page .cs-art-line:nth-child(3){width:75%}.cs-pricing-page .cs-art-line:nth-child(4){width:54%}

.cs-pricing-page .cs-art-card{position:absolute;display:flex;align-items:center;justify-content:center;width:92px;height:82px;border:1px solid #d9e8ff;border-radius:17px;background:#ffffffee;box-shadow:0 14px 30px #165fae22;color:#0a66ef}

.cs-pricing-page .cs-art-card.one{top:5px;right:37px;transform:rotate(7deg)}

.cs-pricing-page .cs-art-card.two{bottom:8px;right:91px;transform:rotate(-8deg);color:#8756f8}

.cs-pricing-page .cs-art-card.three{bottom:20px;left:6px;width:61px;height:61px;color:#f3a011;transform:rotate(10deg)}

.cs-pricing-page .cs-art-spark{position:absolute;color:#0075ff;right:7px;top:40px}

.cs-pricing-page .cs-hero-controls{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:22px}

.cs-pricing-page .cs-switch{display:inline-flex;align-items:center;gap:4px;padding:4px;border:1px solid #d8e6f7;border-radius:40px;background:#fff;box-shadow:0 4px 14px #235ab50d}

.cs-pricing-page .cs-switch button{border:0;border-radius:30px;background:transparent;color:#10234e;padding:10px 17px;font-size:12px;font-weight:800;cursor:pointer}

.cs-pricing-page .cs-switch button.active{background:linear-gradient(105deg,#00b7d6,#0758ff);color:#fff;box-shadow:0 4px 8px #066bee20}

.cs-pricing-page .cs-topup-link{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:43px;padding:0 17px;border:1px solid #ffd49a;border-radius:30px;background:#fff8eb;color:#d97700;font-size:12px;font-weight:850;white-space:nowrap;cursor:pointer;box-shadow:0 3px 13px #e991130d;transition:background-color .16s ease,border-color .16s ease,transform .16s ease}

.cs-pricing-page .cs-topup-link svg{color:#f29400;fill:#f29400}.cs-pricing-page .cs-topup-link:hover{background:#fff2d8;border-color:#f7bd68;transform:translateY(-1px)}.cs-pricing-page .cs-topup-link:focus-visible{outline:3px solid #ffc66e;outline-offset:2px}

.cs-pricing-page .cs-account-pill{display:flex;align-items:center;gap:11px;border-radius:30px;border:1px solid #a7ded3;background:#fff;padding:11px 18px;font-size:12px;font-weight:650;box-shadow:0 3px 13px #009b7e0c;white-space:nowrap}

.cs-pricing-page .cs-account-pill svg{color:#00a68e;fill:#00a68e}.cs-pricing-page .cs-account-pill strong{color:#047af5;font-weight:850}.cs-pricing-page .cs-account-pill .tokens{color:#f59800}

.cs-pricing-page .cs-account-separator{height:19px;width:1px;background:#c4d2e5}

.cs-pricing-page .cs-section{padding:36px 0 0;scroll-margin-top:95px}

.cs-pricing-page .cs-section-heading{margin-bottom:20px}.cs-pricing-page .cs-section-heading h2{font-size:clamp(22px,2.1vw,29px);letter-spacing:-.045em;font-weight:900;line-height:1.2}

.cs-pricing-page .cs-section-heading h2 span{color:#0a6af6}.cs-pricing-page .cs-section-heading p{color:var(--cs-muted);font-size:13px;margin-top:5px}

.cs-pricing-page .cs-plans-heading{display:flex;align-items:center;justify-content:space-between;gap:24px}

.cs-pricing-page .cs-plan-controls{display:flex;align-items:center;justify-content:flex-end;gap:12px;flex-wrap:wrap}

.cs-pricing-page .cs-pricing-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px}

.cs-pricing-page .cs-plan{position:relative;display:flex;flex-direction:column;min-width:0;padding:22px 20px 18px;border:1px solid #dce9f8;border-radius:17px;background:#fff;box-shadow:0 7px 24px #22508c0b;min-height:488px;cursor:pointer;transition:transform .22s cubic-bezier(.22,1,.36,1),border-color .18s ease,box-shadow .22s ease,background-color .18s ease}

.cs-pricing-page .cs-plan.popular{box-shadow:0 7px 25px #047bfa10}

.cs-pricing-page .cs-plan:hover{z-index:2;transform:translateY(-6px);border-color:#8fc2fb;box-shadow:0 18px 38px #175da51c;background:#fbfdff}

.cs-pricing-page .cs-plan.selected{border:2px solid #0875f5;box-shadow:0 12px 30px #0875f524;background:#fbfdff}

.cs-pricing-page .cs-plan:focus-visible{outline:3px solid #80baff;outline-offset:3px}

.cs-pricing-page .cs-plan-top{display:flex;align-items:flex-start;justify-content:space-between;gap:7px;min-height:36px}

.cs-pricing-page .cs-plan-stage{font-size:10px;line-height:1.4;letter-spacing:.08em;color:#8a9cb8;font-weight:850;text-transform:uppercase;max-width:62%}

.cs-pricing-page .cs-plan-badge{font-size:9px;font-weight:850;border-radius:30px;white-space:nowrap;padding:6px 10px;color:#6484ae;background:#edf5ff;text-transform:uppercase}

.cs-pricing-page .cs-plan-badge.student{color:#fff;background:linear-gradient(90deg,#02abeb,#0b58fa)}.cs-pricing-page .cs-plan-badge.intern{color:#8a4aef;background:#f1eaff}.cs-pricing-page .cs-plan-badge.partner{color:#f08c00;background:#fff2e4}

.cs-pricing-page .cs-plan-icon{width:43px;height:43px;display:grid;place-items:center;border-radius:13px;color:#008efa;background:#e8f7ff;margin:8px 0 9px}

.cs-pricing-page .cs-plan-icon.intern{color:#8344ee;background:#f3edff}.cs-pricing-page .cs-plan-icon.partner{color:#ff9000;background:#fff2e2}

.cs-pricing-page .cs-plan h3{font-size:24px;line-height:1.12;letter-spacing:-.055em;font-weight:900}

.cs-pricing-page .cs-plan-desc{font-size:12px;line-height:1.45;color:#61769b;min-height:47px;margin-top:4px}

.cs-pricing-page .cs-plan-price{display:flex;align-items:baseline;flex-wrap:wrap;gap:7px;margin:10px 0 13px}

.cs-pricing-page .cs-plan-price strong{font-size:35px;font-weight:900;line-height:1;letter-spacing:-.05em}.cs-pricing-page .cs-plan-price span{font-size:11px;color:#899dbc;font-weight:700}

.cs-pricing-page .cs-token-box{display:flex;gap:8px;align-items:flex-start;background:linear-gradient(105deg,#fffaf0,#fff4e9);border:1px solid #ffe1bd;border-radius:10px;padding:12px 11px;margin-bottom:14px}

.cs-pricing-page .cs-token-box svg{flex:none;color:#f59900;fill:#f59900}.cs-pricing-page .cs-token-box b{display:block;font-size:12px;font-weight:850;color:#f08400;line-height:1.25}.cs-pricing-page .cs-token-box small{display:block;color:#8498ba;font-size:10.5px;margin-top:5px;line-height:1.25}

.cs-pricing-page .cs-plan-selector{background:#f5f0ff;border:1px solid #ded3ff;border-radius:10px;padding:10px;margin:-5px 0 14px}

.cs-pricing-page .cs-plan-selector.billing{background:#fff8ed;border-color:#ffdfb5}

.cs-pricing-page .cs-plan-selector label{display:block;font-size:9px;letter-spacing:.08em;color:#7559ff;font-weight:850;margin-bottom:7px}.cs-pricing-page .cs-plan-selector.billing label{color:#ef8b00}

.cs-pricing-page .cs-plan-selector select{width:100%;font-size:11px;font-weight:700;background:#fff;color:#18254b;border:1px solid #d7cfff;border-radius:8px;padding:9px 8px;cursor:pointer}

.cs-pricing-page .cs-billing-control{display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#e0e6ef;padding:4px;border-radius:8px}

.cs-pricing-page .cs-billing-control button{border:0;padding:8px 3px;border-radius:6px;background:transparent;color:#546480;cursor:pointer;font-size:10px;line-height:1.25;font-weight:800}

.cs-pricing-page .cs-billing-control button.active{background:linear-gradient(110deg,#ffb400,#ff7100);color:#102146}

.cs-pricing-page .cs-feature-list{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;flex:1}

.cs-pricing-page .cs-feature{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:#263b61;line-height:1.38}

.cs-pricing-page .cs-feature .cs-feature-check{display:grid;place-items:center;flex:none;width:16px;height:16px;margin-top:1px;border-radius:50%;color:#fff;background:#05a78e}

.cs-pricing-page .cs-feature .cs-feature-x{color:#b3bfd2;flex:none;margin-top:1px}.cs-pricing-page .cs-feature.excluded{color:#94a3bd}

.cs-pricing-page .cs-feature small{display:block;color:#f3980b;font-size:10px;margin-top:3px}

.cs-pricing-page .cs-plan-action{margin-top:auto;flex:none;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;height:44px;border:0;border-radius:9px;font-size:12px;font-weight:850;color:#fff;cursor:pointer;background:linear-gradient(100deg,#00b4c4,#0a59fc);transition:transform .16s,filter .16s}

.cs-pricing-page .cs-plan-action.student{background:linear-gradient(105deg,#00aed9,#075aff)}.cs-pricing-page .cs-plan-action.intern{background:linear-gradient(105deg,#675af6,#a01bf0)}.cs-pricing-page .cs-plan-action.partner{background:linear-gradient(110deg,#ffae00,#ff5b00)}

.cs-pricing-page .cs-plan-action:disabled{background:#c8d3e1;color:#506484;cursor:default}.cs-pricing-page .cs-plan-action:not(:disabled):hover{filter:brightness(1.06);transform:translateY(-1px)}

.cs-pricing-page .cs-topup{margin-top:34px;border:1px solid #f5c987;border-radius:17px;background:linear-gradient(112deg,#fff7e9,#fff 48%,#eef7ff);padding:22px 26px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(230px,.8fr) minmax(220px,.9fr);gap:24px;align-items:center;scroll-margin-top:98px;box-shadow:0 10px 30px #d9800b0b}

.cs-pricing-page .cs-topup .cs-eyebrow{color:#dc7900}.cs-pricing-page .cs-topup .cs-eyebrow svg{fill:#f29400;color:#f29400}

.cs-pricing-page .cs-topup h2{font-size:28px;line-height:1.1;letter-spacing:-.045em;font-weight:900;margin:9px 0 8px}.cs-pricing-page .cs-topup h2 span{color:#e77800}.cs-pricing-page .cs-topup p{font-size:12px;color:#607799;line-height:1.5;max-width:320px}

.cs-pricing-page .cs-topup-purchase{background:#fffdfa;border:1px solid #f3d5a8;border-radius:12px;padding:16px;box-shadow:0 7px 20px #d9800b10}

.cs-pricing-page .cs-topup-pack{display:flex;align-items:center;gap:10px}.cs-pricing-page .cs-topup-pack svg{color:#ed8500;background:#fff0d5;padding:7px;border-radius:10px;flex:none}

.cs-pricing-page .cs-topup-pack b{font-size:16px;font-weight:900}.cs-pricing-page .cs-topup-pack small{display:block;color:#8296b5;font-size:11px;margin-top:3px}

.cs-pricing-page .cs-topup-price{margin:12px 0 9px;display:grid;grid-template-columns:1fr 1fr;gap:7px}

.cs-pricing-page .cs-topup-price span{text-align:center;border:1px solid #eadcc6;border-radius:8px;padding:8px;font-size:12px;font-weight:850}.cs-pricing-page .cs-topup-price span.selected{color:#fff;background:#ed8500;border-color:#ed8500}

.cs-pricing-page .cs-topup-benefits{display:flex;flex-direction:column;gap:15px}.cs-pricing-page .cs-topup-benefits>div{display:flex;align-items:center;gap:12px}

.cs-pricing-page .cs-benefit-icon{width:35px;height:35px;border-radius:50%;display:grid;place-items:center;flex:none;color:#e57c00;background:#fff0d7}

.cs-pricing-page .cs-topup-benefits b{display:block;font-size:12px;font-weight:850}.cs-pricing-page .cs-topup-benefits small{display:block;font-size:10px;line-height:1.3;color:#8295b3;margin-top:3px}

.cs-pricing-page .cs-topup .cs-buybutton{background:linear-gradient(110deg,#ffae00,#ff6500);box-shadow:0 8px 18px #ee7d001f}

.cs-pricing-page .cs-tools-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:13px}.cs-pricing-page .cs-tool{border:1px solid #e2edf8;border-radius:13px;background:#fff;padding:19px 11px;text-align:center;min-height:141px;box-shadow:0 3px 14px #185eb30a}

.cs-pricing-page .cs-tool-icon{width:45px;height:45px;display:grid;place-items:center;border-radius:12px;margin:0 auto 13px;background:#eaf5ff;color:#057df5}

.cs-pricing-page .cs-tool-icon.red{background:#fff0f0;color:#fd4350}.cs-pricing-page .cs-tool-icon.green{background:#e6fbf3;color:#04b48b}.cs-pricing-page .cs-tool-icon.orange{background:#fff4e0;color:#ef9400}.cs-pricing-page .cs-tool-icon.purple{background:#f4e9ff;color:#8749e9}.cs-pricing-page .cs-tool-icon.amber{background:#fff3e4;color:#f48d00}

.cs-pricing-page .cs-tool b{display:block;font-size:12px;font-weight:850}.cs-pricing-page .cs-tool p{color:#8296b3;font-size:11px;margin-top:6px;line-height:1.45}

.cs-pricing-page .cs-comparison{overflow:auto;background:#fff;border:1px solid #cedff1;border-radius:16px;box-shadow:0 16px 42px #174f8a12}

.cs-pricing-page .cs-comparison table{width:100%;border-collapse:separate;border-spacing:0;min-width:820px;font-size:12.5px;text-align:center}

.cs-pricing-page .cs-comparison th,.cs-pricing-page .cs-comparison td{border-right:1px solid #e3edf8;border-bottom:1px solid #e4edf7;padding:14px 16px}

.cs-pricing-page .cs-comparison th:last-child,.cs-pricing-page .cs-comparison td:last-child{border-right:0}.cs-pricing-page .cs-comparison tbody tr:last-child td{border-bottom:0}

.cs-pricing-page .cs-comparison thead th{position:sticky;top:0;z-index:2;height:70px;background:#eaf3fd;color:#152a53;font-weight:900;box-shadow:0 1px 0 #dbe8f5}

.cs-pricing-page .cs-comparison thead th:nth-child(3){color:#056af5;background:#dcecff}.cs-pricing-page .cs-comparison thead th:nth-child(4){color:#138d80;background:#e8faf5}.cs-pricing-page .cs-comparison thead th:nth-child(5){color:#d97700;background:#fff0dc}

.cs-pricing-page .cs-table-plan{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:13px}.cs-pricing-page .cs-table-plan small{font-size:9px;letter-spacing:.05em;text-transform:uppercase;color:#7185a5;font-weight:750}

.cs-pricing-page .cs-comparison tbody tr:nth-child(even) td{background:#fbfdff}.cs-pricing-page .cs-comparison tbody tr{transition:background-color .15s ease}.cs-pricing-page .cs-comparison tbody tr:hover td{background:#f2f7fd}

.cs-pricing-page .cs-comparison tbody tr:first-child td{background:#fffaf2;color:#243a60;font-weight:750}.cs-pricing-page .cs-comparison tbody tr:first-child:hover td{background:#fff6e7}

.cs-pricing-page .cs-comparison th:first-child,.cs-pricing-page .cs-comparison td:first-child{position:sticky;left:0;z-index:1;text-align:left;width:32%;min-width:250px;font-weight:800;background:#fff}.cs-pricing-page .cs-comparison thead th:first-child{z-index:3;background:#eaf3fd}.cs-pricing-page .cs-comparison tbody tr:nth-child(even) td:first-child{background:#f8fbff}.cs-pricing-page .cs-comparison tbody tr:hover td:first-child{background:#edf5fd}.cs-pricing-page .cs-comparison tbody tr:first-child td:first-child{background:#fff7e9}

.cs-pricing-page .cs-comparison .cs-comparison-yes{width:21px;height:21px;padding:2px;border-radius:50%;color:#008f79;background:#e1f8f2;stroke-width:2.5}.cs-pricing-page .cs-comparison .cs-comparison-no{width:19px;height:19px;color:#b1bed0;stroke-width:1.8}

.cs-pricing-page .cs-comparison-section{padding-top:24px}.cs-pricing-page .cs-comparison-section .cs-section-heading{margin-bottom:12px}

@media(min-width:900px){

  .cs-pricing-page .cs-comparison-section .cs-section-heading h2{font-size:25px}

  .cs-pricing-page .cs-comparison-section .cs-section-heading p{font-size:12px;margin-top:3px}

  .cs-pricing-page .cs-comparison table{font-size:11.5px}

  .cs-pricing-page .cs-comparison th,.cs-pricing-page .cs-comparison td{padding:7px 14px;line-height:1.2}

  .cs-pricing-page .cs-comparison thead th{height:52px}

  .cs-pricing-page .cs-table-plan{gap:2px;font-size:12px}.cs-pricing-page .cs-table-plan small{font-size:8px}

  .cs-pricing-page .cs-comparison .cs-comparison-yes{width:18px;height:18px;padding:2px}.cs-pricing-page .cs-comparison .cs-comparison-no{width:16px;height:16px}

}

.cs-pricing-page .cs-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px;align-items:start}

.cs-pricing-page .cs-faq-item{border:1px solid #dce8f6;background:#fff;border-radius:12px;overflow:hidden;transition:border-color .18s ease,box-shadow .18s ease,background-color .18s ease}

.cs-pricing-page .cs-faq-item.open{border-color:#9fc9fb;background:#f8fbff;box-shadow:0 8px 22px #175fb00d}

.cs-pricing-page .cs-faq-item button{display:flex;align-items:center;gap:12px;width:100%;min-height:58px;border:0;background:transparent;color:#13244c;text-align:left;padding:13px 15px;font-weight:800;font-size:13px;line-height:1.4;cursor:pointer}

.cs-pricing-page .cs-faq-item button:focus-visible{outline:3px solid #8bc1ff;outline-offset:-3px}

.cs-pricing-page .cs-faq-number{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:50%;background:#eaf4ff;color:#0870eb;font-size:10px;font-weight:900}

.cs-pricing-page .cs-faq-item.open .cs-faq-number{background:#0870eb;color:#fff}

.cs-pricing-page .cs-faq-question{flex:1}.cs-pricing-page .cs-faq-item button>svg{flex:none;color:#6f86a7;transition:transform .18s ease}

.cs-pricing-page .cs-faq-answer{padding:0 55px 17px;color:#5d7395;font-size:12.5px;line-height:1.65;max-width:72ch}.cs-pricing-page .cs-faq-item .open-icon{transform:rotate(180deg);color:#0870eb}

.cs-pricing-page .cs-bottom-cta{margin:34px auto 36px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:23px 25px;border:1px solid #cfe4fb;border-radius:14px;background:linear-gradient(105deg,#f1f9ff,#fff)}

.cs-pricing-page .cs-bottom-cta h2{font-size:18px;font-weight:900;letter-spacing:-.03em}.cs-pricing-page .cs-bottom-cta p{font-size:12px;color:#7285a6;margin-top:5px}

.cs-pricing-page .cs-bottom-actions{display:flex;gap:10px;flex:none}.cs-pricing-page .cs-secondary-button{min-height:42px;padding:0 18px;border-radius:9px;font-size:12px;font-weight:850;background:#fff;border:1px solid #0a6bf9;color:#0968ec;cursor:pointer}

.cs-pricing-page .cs-buybutton{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;height:40px;background:linear-gradient(110deg,#00b1dc,#0759ff);border:0;color:#fff;border-radius:8px;font-size:12px;font-weight:850;cursor:pointer}

.cs-pricing-page .cs-buybutton:disabled{opacity:.6;cursor:wait}

.cs-pricing-page .cs-bottom-actions .cs-buybutton{width:auto;padding:0 23px;height:42px}

.cs-pricing-page.cs-dark{--cs-ink:#eef5ff;--cs-muted:#a7b9d4;background:linear-gradient(180deg,#08162a,#091c34 60%,#071729)}

.cs-pricing-page.cs-dark .cs-hero{background:linear-gradient(110deg,#0c2845,#112e52)}

.cs-pricing-page.cs-dark .cs-plan,.cs-pricing-page.cs-dark .cs-tool,.cs-pricing-page.cs-dark .cs-topup-purchase,.cs-pricing-page.cs-dark .cs-comparison,.cs-pricing-page.cs-dark .cs-faq-item{background:#102844;border-color:#294566}.cs-pricing-page.cs-dark .cs-plan:hover,.cs-pricing-page.cs-dark .cs-plan.selected{background:#132d4b}.cs-pricing-page.cs-dark .cs-plan.selected{border-color:#48a4ff}

.cs-pricing-page.cs-dark .cs-topup,.cs-pricing-page.cs-dark .cs-bottom-cta{background:linear-gradient(110deg,#102f4e,#122742);border-color:#294566}

.cs-pricing-page.cs-dark .cs-plan-desc,.cs-pricing-page.cs-dark .cs-feature,.cs-pricing-page.cs-dark .cs-topup p,.cs-pricing-page.cs-dark .cs-hero p{color:#b0c4df}

.cs-pricing-page.cs-dark .cs-feature.excluded{color:#778ba6}.cs-pricing-page.cs-dark .cs-account-pill,.cs-pricing-page.cs-dark .cs-switch{background:#132c48;color:#eef5ff}.cs-pricing-page.cs-dark .cs-topup-link{background:#3b2d17;border-color:#72531f;color:#ffc86e}

.cs-pricing-page.cs-dark .cs-switch button:not(.active){color:#ddeaff}.cs-pricing-page.cs-dark .cs-comparison thead th,.cs-pricing-page.cs-dark .cs-comparison thead th:nth-child(n){background:#203b5b;color:#fff}.cs-pricing-page.cs-dark .cs-comparison td,.cs-pricing-page.cs-dark .cs-comparison th{border-color:#294566}.cs-pricing-page.cs-dark .cs-comparison tbody tr td,.cs-pricing-page.cs-dark .cs-comparison tbody tr td:first-child{background:#102844}.cs-pricing-page.cs-dark .cs-comparison tbody tr:nth-child(even) td,.cs-pricing-page.cs-dark .cs-comparison tbody tr:nth-child(even) td:first-child{background:#122b48}.cs-pricing-page.cs-dark .cs-comparison tbody tr:hover td,.cs-pricing-page.cs-dark .cs-comparison tbody tr:hover td:first-child{background:#183552}.cs-pricing-page.cs-dark .cs-comparison tbody tr:first-child td,.cs-pricing-page.cs-dark .cs-comparison tbody tr:first-child td:first-child{background:#2e2a22;color:#ffe1ae}

.cs-pricing-page.cs-dark .cs-faq-item button{color:#eef5ff}.cs-pricing-page.cs-dark .cs-faq-answer{color:#acc0dd}.cs-pricing-page.cs-dark .cs-faq-item.open{background:#132d4b;border-color:#3973ad}

.cs-pricing-page.cs-dark .cs-topup-pack b,.cs-pricing-page.cs-dark .cs-tool b{color:#eef5ff}

.cs-pricing-page.cs-dark .cs-tool p{color:#a7bbd6}

.cs-pricing-page.cs-dark .cs-comparison td{color:#e2eafa}

@media(max-width:1150px){.cs-pricing-page .cs-pricing-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.cs-pricing-page .cs-topup{grid-template-columns:1fr 1fr}.cs-pricing-page .cs-topup-benefits{grid-column:1/-1;flex-direction:row;justify-content:space-between}.cs-pricing-page .cs-tools-grid{grid-template-columns:repeat(3,1fr)}}

@media(max-width:720px){.cs-pricing-page .cs-container{width:calc(100% - 32px)}.cs-pricing-page .cs-plans-heading{align-items:flex-start;flex-direction:column}.cs-pricing-page .cs-plan-controls{width:100%;justify-content:flex-start}.cs-pricing-page .cs-pricing-grid{grid-template-columns:1fr}.cs-pricing-page .cs-plan{min-height:0}.cs-pricing-page .cs-topup{grid-template-columns:1fr;padding:20px}.cs-pricing-page .cs-topup-benefits{grid-column:auto;flex-direction:column}.cs-pricing-page .cs-tools-grid{grid-template-columns:repeat(2,1fr)}.cs-pricing-page .cs-faq-grid{grid-template-columns:1fr}.cs-pricing-page .cs-faq-answer{padding-left:55px;padding-right:15px}.cs-pricing-page .cs-bottom-cta{flex-direction:column;align-items:stretch}.cs-pricing-page .cs-bottom-actions{flex-wrap:wrap}.cs-pricing-page .cs-bottom-actions button{flex:1}.cs-pricing-page .cs-account-pill{flex-wrap:wrap;white-space:normal;font-size:11px;gap:8px}.cs-pricing-page .cs-section{padding-top:30px}}

@media(max-width:410px){.cs-pricing-page .cs-tools-grid{grid-template-columns:1fr 1fr}.cs-pricing-page .cs-tool{min-height:135px;padding:14px 5px}.cs-pricing-page .cs-hero h1{font-size:28px}}

@media(prefers-reduced-motion:reduce){.cs-pricing-page .cs-plan,.cs-pricing-page .cs-plan-action{transition:none}.cs-pricing-page .cs-plan:hover{transform:none}}

/* =======================================================================
   CAREERSENSE UNIFIED BRAND PALETTE  |  VISUAL CHANGES ONLY
   Main CareerSense  : blue / teal / cool white
   Resume Builder    : deep navy / elegant champagne gold
   ATS Checker       : ink navy / warm amber
   Certifi platform  : emerald teal / pale mint

   The existing page markup, plan data, API calls, checkouts, and controls
   above this block are deliberately unchanged.
   ======================================================================= */

.cs-pricing-page {
  --cs-ink:#102a44;
  --cs-muted:#61778d;
  --cs-blue:#176cb8;
  --cs-line:#dfe6e9;
  --cs-brand-navy:#102f4a;
  --cs-brand-gold:#c78e36;
  --cs-brand-teal:#0c9d98;
  --cs-brand-blue:#1472d4;
  --cs-surface:#ffffff;
  --cs-bg:#fcfbf8;
  background:
    radial-gradient(ellipse 47% 16% at 96% 11%,rgba(25,158,170,.13),transparent 100%),
    radial-gradient(ellipse 41% 19% at 4% 7%,rgba(206,157,73,.11),transparent 100%),
    linear-gradient(180deg,#fcfaf6 0%,#ffffff 39%,#f6fbfa 76%,#faf8f3 100%);
}

/* Navbar/Footer are deliberately not restyled: they belong to the app. */
.cs-pricing-page .cs-section-heading h2,
.cs-pricing-page .cs-plan h3,
.cs-pricing-page .cs-bottom-cta h2,
.cs-pricing-page .cs-faq-item button {color:#102a44}
.cs-pricing-page .cs-section-heading h2 span{color:#117f97}
.cs-pricing-page .cs-section-heading p{color:#65778a}
.cs-pricing-page .cs-pricing-grid{gap:17px}
.cs-pricing-page .cs-plan{
  border-color:#e2e7e6;
  box-shadow:0 7px 24px rgba(16,47,74,.055);
}
.cs-pricing-page .cs-plan:hover{
  border-color:#83c6c4;
  box-shadow:0 17px 37px rgba(15,70,91,.14);
}
.cs-pricing-page .cs-plan-stage{color:#72859c}
.cs-pricing-page .cs-plan-desc{color:#61758a}
.cs-pricing-page .cs-plan-price span{color:#7890a5}
.cs-pricing-page .cs-feature{color:#223c53}
.cs-pricing-page .cs-feature.excluded{color:#96a7b7}
.cs-pricing-page .cs-feature .cs-feature-check{background:#0d9c84}
.cs-pricing-page .cs-feature small{color:#b97c25}
.cs-pricing-page .cs-token-box{
  background:linear-gradient(112deg,#fffaf1,#fff6e8);
  border-color:#f1dfc2;
}
.cs-pricing-page .cs-token-box svg{color:#c88930;fill:#c88930}
.cs-pricing-page .cs-token-box b{color:#b87721}
.cs-pricing-page .cs-token-box small{color:#7e8d9e}
.cs-pricing-page .cs-plan-action{box-shadow:0 6px 14px rgba(12,55,88,.12)}
.cs-pricing-page .cs-plan-action:disabled{
  background:#dce3e9;
  color:#4e6375;
  box-shadow:none;
}

/* 01 — FREE: main CareerSense blue + Certifi teal. */
.cs-pricing-page .cs-plan:nth-child(1){
  border-top:3px solid #0ba4a1;
  background:linear-gradient(180deg,#f8fefe 0%,#fff 32%);
}
.cs-pricing-page .cs-plan:nth-child(1) .cs-plan-icon{
  color:#126ed0;
  background:linear-gradient(135deg,#e0f5f6,#e8f1ff);
}
.cs-pricing-page .cs-plan:nth-child(1) .cs-plan-badge{
  color:#087e89;
  background:#e5f8f6;
}
.cs-pricing-page .cs-plan:nth-child(1) .cs-plan-action:not(:disabled){
  background:linear-gradient(110deg,#0caaa7,#1766ce);
}
.cs-pricing-page .cs-plan:nth-child(1).selected{
  border-color:#0a9e9c;
  box-shadow:0 12px 30px rgba(12,159,157,.17);
}

/* 02 — STUDENT: Resume Builder navy with gold accents. */
.cs-pricing-page .cs-plan:nth-child(2),
.cs-pricing-page .cs-plan:nth-child(2):hover,
.cs-pricing-page .cs-plan:nth-child(2).selected{
  background:linear-gradient(165deg,#173954 0%,#0c263f 84%);
  border-color:#1c4b67;
  color:#f7fbff;
  box-shadow:0 12px 33px rgba(13,42,68,.18);
}
.cs-pricing-page .cs-plan:nth-child(2){border-top:3px solid #d8aa57}
.cs-pricing-page .cs-plan:nth-child(2).selected{
  border-color:#d6a04c;
  box-shadow:0 14px 34px rgba(16,47,74,.24);
}
.cs-pricing-page .cs-plan:nth-child(2) h3,
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-price strong{color:#fff}
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-stage,
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-desc,
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-price span{color:#ccdce8}
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-icon{
  color:#f3cf87;
  background:rgba(242,198,113,.14);
  border:1px solid rgba(236,198,131,.15);
}
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-badge.student{
  color:#102f4a;
  background:linear-gradient(100deg,#f5ddaa,#d6a350);
}
.cs-pricing-page .cs-plan:nth-child(2) .cs-feature{color:#e2ebf2}
.cs-pricing-page .cs-plan:nth-child(2) .cs-feature.excluded{color:#a7b9c8}
.cs-pricing-page .cs-plan:nth-child(2) .cs-feature .cs-feature-x{color:#8ca4b6}
.cs-pricing-page .cs-plan:nth-child(2) .cs-feature .cs-feature-check{background:#0da58d}
.cs-pricing-page .cs-plan:nth-child(2) .cs-token-box{
  background:linear-gradient(120deg,#fff9ed,#faeed7);
  border-color:#ebd5af;
}
.cs-pricing-page .cs-plan:nth-child(2) .cs-token-box b{color:#96601c}
.cs-pricing-page .cs-plan:nth-child(2) .cs-plan-action.student{
  background:linear-gradient(110deg,#f1d18e,#d6a350);
  color:#122c45;
  box-shadow:0 8px 18px rgba(0,0,0,.15);
}

/* 03 — INTERN: Certifi-inspired teal validation palette. */
.cs-pricing-page .cs-plan:nth-child(3){
  border-top:3px solid #16a394;
  background:linear-gradient(180deg,#f9fffd 0%,#fff 38%);
}
.cs-pricing-page .cs-plan:nth-child(3) .cs-plan-icon.intern{
  color:#148c7f;
  background:#e9faf5;
}
.cs-pricing-page .cs-plan:nth-child(3) .cs-plan-badge.intern{
  color:#147f74;
  background:#e8faf5;
}
.cs-pricing-page .cs-plan:nth-child(3) .cs-token-box{
  background:linear-gradient(120deg,#f4fffc,#edf9f5);
  border-color:#cfeee6;
}
.cs-pricing-page .cs-plan:nth-child(3) .cs-token-box b{color:#137d71}
.cs-pricing-page .cs-plan:nth-child(3) .cs-plan-selector{
  background:#f2fcfa;
  border-color:#c9ebe1;
}
.cs-pricing-page .cs-plan:nth-child(3) .cs-plan-selector label{color:#14897c}
.cs-pricing-page .cs-plan:nth-child(3) .cs-plan-selector select{
  border-color:#bfe4da;
  color:#173854;
}
.cs-pricing-page .cs-plan:nth-child(3) .cs-feature .cs-feature-check{background:#17a091}
.cs-pricing-page .cs-plan:nth-child(3) .cs-plan-action.intern{
  background:linear-gradient(105deg,#19aa98,#0f8d80);
}
.cs-pricing-page .cs-plan:nth-child(3).selected{
  border-color:#18a294;
  box-shadow:0 12px 30px rgba(22,163,148,.16);
}

/* 04 — PARTNER: ATS navy/gold, with a stronger founder-level accent. */
.cs-pricing-page .cs-plan:nth-child(4){
  border-top:3px solid #c18b38;
  background:linear-gradient(180deg,#fffcf6 0%,#fff 35%);
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-plan-icon.partner{
  color:#bc7e24;
  background:#fff1da;
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-plan-badge.partner{
  color:#9a621b;
  background:#fff0d9;
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-plan-action.partner{
  background:linear-gradient(110deg,#c98d32,#a96b1d);
  color:#fff;
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-billing-control{
  background:#e8e9e7;
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-billing-control button.active{
  color:#102e46;
  background:linear-gradient(115deg,#f0ce80,#d7a54b);
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-plan-selector.billing{
  background:#fffaf0;
  border-color:#ecd8b9;
}
.cs-pricing-page .cs-plan:nth-child(4) .cs-plan-selector.billing label{color:#aa7328}
.cs-pricing-page .cs-plan:nth-child(4).selected{
  border-color:#c18b38;
  box-shadow:0 12px 30px rgba(183,134,61,.17);
}

/* Common controls: teal identity, navy text, amber for top-ups. */
.cs-pricing-page .cs-switch{border-color:#d9e7e5}
.cs-pricing-page .cs-switch button{color:#123b53}
.cs-pricing-page .cs-switch button.active{
  background:linear-gradient(105deg,#0aa5a1,#166abf);
  box-shadow:0 5px 13px rgba(8,138,150,.16);
}
.cs-pricing-page .cs-account-pill{
  border-color:#b6ded9;
  box-shadow:0 3px 13px rgba(10,141,134,.08);
}
.cs-pricing-page .cs-account-pill svg{color:#0a9b88;fill:#0a9b88}
.cs-pricing-page .cs-account-pill strong{color:#186bb2}
.cs-pricing-page .cs-account-pill .tokens{color:#c1842c}
.cs-pricing-page .cs-topup-link{
  color:#98621e;
  background:#fff9ef;
  border-color:#e6cba5;
}
.cs-pricing-page .cs-topup-link svg{color:#c28a31;fill:#c28a31}
.cs-pricing-page .cs-topup-link:hover{background:#fff1d9;border-color:#d7ae6f}
.cs-pricing-page .cs-topup{
  border-color:#e9d6ba;
  background:linear-gradient(111deg,#fffbf3 0%,#fff 53%,#f1faf9 100%);
  box-shadow:0 10px 30px rgba(173,116,38,.07);
}
.cs-pricing-page .cs-topup .cs-eyebrow,
.cs-pricing-page .cs-topup h2 span{color:#b77926}
.cs-pricing-page .cs-topup .cs-eyebrow svg{color:#c58c32;fill:#c58c32}
.cs-pricing-page .cs-topup-purchase{background:#fffdf8;border-color:#ecd8b7}
.cs-pricing-page .cs-topup-pack svg{color:#b9802b;background:#fff0d9}
.cs-pricing-page .cs-topup-price span{border-color:#e8d8c1}
.cs-pricing-page .cs-topup-price span.selected{background:#c38a33;border-color:#c38a33}
.cs-pricing-page .cs-topup .cs-buybutton{
  background:linear-gradient(110deg,#173e5c,#0c2a43);
  box-shadow:0 8px 18px rgba(16,47,74,.15);
}
.cs-pricing-page .cs-benefit-icon{background:#e4f5f2;color:#119d90}
.cs-pricing-page .cs-topup-benefits small{color:#73879c}
.cs-pricing-page .cs-tool{
  border-color:#e1e9e7;
  box-shadow:0 4px 18px rgba(16,47,74,.05);
}
.cs-pricing-page .cs-tool-icon{background:#e5f2ff;color:#176fbd}
.cs-pricing-page .cs-tool-icon.green{background:#e4f8f1;color:#0b9984}
.cs-pricing-page .cs-tool-icon.orange,
.cs-pricing-page .cs-tool-icon.amber{background:#fff3e2;color:#c68a2b}
.cs-pricing-page .cs-tool-icon.purple{background:#f1ebfb;color:#8455cf}
.cs-pricing-page .cs-tool b{color:#16314a}
.cs-pricing-page .cs-tool p{color:#6e8093}
.cs-pricing-page .cs-comparison{border-color:#dce5e8}
.cs-pricing-page .cs-comparison th,
.cs-pricing-page .cs-comparison td{border-color:#e5ebed}
.cs-pricing-page .cs-comparison thead th,
.cs-pricing-page .cs-comparison thead th:first-child{background:#eaf4f5;color:#163652}
.cs-pricing-page .cs-comparison thead th:nth-child(2){background:#e4f5f2;color:#097f79}
.cs-pricing-page .cs-comparison thead th:nth-child(3){background:#173650;color:#f3d18c}
.cs-pricing-page .cs-comparison thead th:nth-child(4){background:#fbefdc;color:#936020}
.cs-pricing-page .cs-comparison thead th:nth-child(5){background:#f7e5c8;color:#865313}
.cs-pricing-page .cs-comparison tbody tr:nth-child(even) td{background:#fcfdfc}
.cs-pricing-page .cs-comparison tbody tr:hover td{background:#f1f8f8}
.cs-pricing-page .cs-comparison tbody tr:nth-child(even) td:first-child{background:#fafdfc}
.cs-pricing-page .cs-comparison tbody tr:hover td:first-child{background:#e9f5f4}
.cs-pricing-page .cs-comparison tbody tr:first-child td{background:#fffaf0}
.cs-pricing-page .cs-comparison tbody tr:first-child td:first-child{background:#fff8ee}
.cs-pricing-page .cs-comparison .cs-comparison-yes{color:#078e7e;background:#e3f7f1}
.cs-pricing-page .cs-faq-item{border-color:#e2e9e9}
.cs-pricing-page .cs-faq-item.open{
  border-color:#80c8bf;
  background:#f5fcfa;
  box-shadow:0 8px 22px rgba(9,147,136,.09);
}
.cs-pricing-page .cs-faq-number{background:#e5f6f2;color:#087f76}
.cs-pricing-page .cs-faq-item.open .cs-faq-number{background:#0a9588;color:#fff}
.cs-pricing-page .cs-faq-item .open-icon{color:#0a9588}
.cs-pricing-page .cs-bottom-cta{
  background:linear-gradient(105deg,#f1faf8,#fffdf7);
  border-color:#d6e9e6;
}
.cs-pricing-page .cs-secondary-button{border-color:#1a556d;color:#143f5c}
.cs-pricing-page .cs-buybutton{background:linear-gradient(110deg,#0da3a1,#176abe)}
.cs-pricing-page .cs-bottom-actions .cs-buybutton{
  background:linear-gradient(110deg,#143b57,#0c283f);
}

/* Dark theme: preserve contrast, distinct plan identities and readability. */
.cs-pricing-page.cs-dark{
  --cs-ink:#f0f6f9;
  --cs-muted:#a9bdc9;
  background:linear-gradient(180deg,#081c2d,#0b2636 60%,#081e2b);
}
.cs-pricing-page.cs-dark .cs-section-heading h2,
.cs-pricing-page.cs-dark .cs-bottom-cta h2,
.cs-pricing-page.cs-dark .cs-faq-item button{color:#f0f6f9}
.cs-pricing-page.cs-dark .cs-plan:nth-child(1),
.cs-pricing-page.cs-dark .cs-plan:nth-child(3),
.cs-pricing-page.cs-dark .cs-plan:nth-child(4){
  background:linear-gradient(180deg,#12374a,#0e2b3e 75%);
  border-color:#315468;
  color:#f5f9fb;
}
.cs-pricing-page.cs-dark .cs-plan:nth-child(1) h3,
.cs-pricing-page.cs-dark .cs-plan:nth-child(3) h3,
.cs-pricing-page.cs-dark .cs-plan:nth-child(4) h3,
.cs-pricing-page.cs-dark .cs-plan:nth-child(1) .cs-plan-price strong,
.cs-pricing-page.cs-dark .cs-plan:nth-child(3) .cs-plan-price strong,
.cs-pricing-page.cs-dark .cs-plan:nth-child(4) .cs-plan-price strong{color:#fff}
.cs-pricing-page.cs-dark .cs-plan-desc,
.cs-pricing-page.cs-dark .cs-plan-price span,
.cs-pricing-page.cs-dark .cs-feature,
.cs-pricing-page.cs-dark .cs-plan-stage{color:#ccdbe6}
.cs-pricing-page.cs-dark .cs-feature.excluded{color:#859cad}
.cs-pricing-page.cs-dark .cs-plan:nth-child(2),
.cs-pricing-page.cs-dark .cs-plan:nth-child(2):hover,
.cs-pricing-page.cs-dark .cs-plan:nth-child(2).selected{
  background:linear-gradient(165deg,#173b57,#092036 90%);
  border-color:#b98b48;
}
.cs-pricing-page.cs-dark .cs-plan:nth-child(2) .cs-plan-desc,
.cs-pricing-page.cs-dark .cs-plan:nth-child(2) .cs-plan-stage,
.cs-pricing-page.cs-dark .cs-plan:nth-child(2) .cs-feature,
.cs-pricing-page.cs-dark .cs-plan:nth-child(2) .cs-plan-price span{color:#d7e3eb}
.cs-pricing-page.cs-dark .cs-plan:nth-child(2) .cs-feature.excluded{color:#91a8ba}
.cs-pricing-page.cs-dark .cs-comparison thead th:nth-child(2){background:#19505a;color:#e3f9f2}
.cs-pricing-page.cs-dark .cs-comparison thead th:nth-child(3){background:#173650;color:#f3d18c}
.cs-pricing-page.cs-dark .cs-comparison thead th:nth-child(4){background:#614a2e;color:#ffe7ba}
.cs-pricing-page.cs-dark .cs-comparison thead th:nth-child(5){background:#70512c;color:#ffe2a3}
.cs-pricing-page.cs-dark .cs-tool b{color:#f0f6f9}
.cs-pricing-page.cs-dark .cs-tool p{color:#b4c4d1}
.cs-pricing-page.cs-dark .cs-faq-item.open{background:#15394a;border-color:#43877e}
.cs-pricing-page.cs-dark .cs-bottom-cta{background:linear-gradient(110deg,#123749,#102b3e);border-color:#315469}
.cs-pricing-page.cs-dark .cs-topup{background:linear-gradient(110deg,#183348,#152e40);border-color:#8f764e}
.cs-pricing-page.cs-dark .cs-topup-purchase{background:#133346;border-color:#8a7048}
.cs-pricing-page.cs-dark .cs-topup-pack b{color:#f7f8fa}
.cs-pricing-page.cs-dark .cs-account-pill{background:#123548;border-color:#35887f}
.cs-pricing-page.cs-dark .cs-account-pill strong{color:#79baff}
.cs-pricing-page.cs-dark .cs-account-pill .tokens{color:#edbf70}
.cs-pricing-page.cs-dark .cs-switch{background:#123548}
.cs-pricing-page.cs-dark .cs-switch button:not(.active){color:#ecf5fb}
.cs-pricing-page.cs-dark .cs-faq-item .cs-faq-number{background:#26515c;color:#9fefdb}
.cs-pricing-page.cs-dark .cs-faq-item.open .cs-faq-number{background:#078f84;color:#fff}

`}</style>

      {/* Use the site's existing components; do not build another Navbar or Footer. */}

      <Navbar heroTheme={heroTheme} onToggleHeroTheme={toggleHeroTheme} />



      <main>

        <section id="plans" className="cs-section cs-container">

          <div className="cs-section-heading cs-plans-heading">

            <div>

              <h2>Subscription Plans</h2>

              <p>Choose a plan that matches your goals. Compare what each stage includes.</p>

            </div>

            <div className="cs-plan-controls">

              <div className="cs-switch" aria-label="Display prices in currency">

                <button type="button" className={currency === "INR" ? "active" : ""} aria-pressed={currency === "INR"} onClick={() => setCurrency("INR")}>🇮🇳   INR (₹)</button>

                <button type="button" className={currency === "USD" ? "active" : ""} aria-pressed={currency === "USD"} onClick={() => setCurrency("USD")}>🇺🇸   USD ($)</button>

              </div>

              <button type="button" className="cs-topup-link" onClick={() => jumpTo("topup")}><Zap size={16}/> Instant Token Top-Up</button>

              {user && (

                <div className="cs-account-pill" role="status" aria-live="polite">

                  <Zap size={20}/>

                  <span>Active Plan: <strong>{currentPlan?.toUpperCase()}</strong></span>

                  <span className="cs-account-separator" aria-hidden="true"/>

                  <span>Tokens Balance: <strong className="tokens">{tokensRemaining.toLocaleString()}</strong> Tokens</span>

                </div>

              )}

            </div>

          </div>

          <div className="cs-pricing-grid">

            {plans.map((plan) => {

              const Icon = iconFor[plan.id];

              const isCurrent = currentPlan === plan.id;

              const isSelected = selectedPlan === plan.id;

              const price = currency === "INR" ? plan.priceDisplayInr : plan.priceDisplayUsd;

              const period = currency === "INR" ? plan.periodInr : plan.periodUsd;

              const shortBadge = isCurrent ? "Current plan" : (plan.id === "free" ? "Get started" : plan.popular ? "Most popular" : plan.badge);

              const detail = plan.id === "partner" && partnerBillingCycle === "monthly"

                ? currency === "USD" ? "Refills monthly ($24.99/mo)" : "Refills monthly (₹2,499/mo)"

                : plan.tokenDetail;

              return (

                <article key={plan.id} id={`${plan.id}-card`} className={`cs-plan ${plan.popular ? "popular" : ""} ${isSelected ? "selected" : ""}`} tabIndex={0} aria-label={`${plan.title} plan${isSelected ? ", selected" : ""}`} onClick={() => setSelectedPlan(plan.id)} onKeyDown={(event) => { if (event.currentTarget === event.target && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setSelectedPlan(plan.id); } }}>

                  <div className="cs-plan-top">

                    <span className="cs-plan-stage">{plan.tagline}</span>

                    <span className={`cs-plan-badge ${plan.id}`}>{shortBadge}</span>

                  </div>

                  <div className={`cs-plan-icon ${plan.id}`}><Icon size={25} strokeWidth={2.2}/></div>

                  <h3>{plan.title}</h3>

                  <p className="cs-plan-desc">{descriptions[plan.id]}</p>

                  <div className="cs-plan-price"><strong>{price}</strong><span>{period}</span></div>

                  <div className="cs-token-box">

                    <Zap size={17}/>

                    <div><b>{plan.tokens}</b><small>{detail}</small></div>

                  </div>

                  {plan.hasFellowshipSelector && (

                    <div className="cs-plan-selector">

                      <label htmlFor="fellowship-track">SELECT FELLOWSHIP TRACK</label>

                      <select id="fellowship-track" value={selectedFellowship} onChange={(e) => setSelectedFellowship(e.target.value)}>

                        <option value="data-analyst">Data Analyst Fellowship</option>

                        <option value="data-science">Data Science Fellowship</option>

                        <option value="artificial-intelligence">Artificial Intelligence Fellowship</option>

                        <option value="ui-ux-design">UI/UX Design Fellowship</option>

                        <option value="app-development">App Development Fellowship</option>

                        <option value="full-stack-development">Full Stack Development Fellowship</option>

                      </select>

                    </div>

                  )}

                  {plan.id === "partner" && (

                    <div className="cs-plan-selector billing">

                      <label>PARTNER BILLING FREQUENCY</label>

                      <div className="cs-billing-control">

                        <button type="button" className={partnerBillingCycle === "monthly" ? "active" : ""} onClick={() => setPartnerBillingCycle("monthly")}>Monthly <span>({currency === "USD" ? "$24.99" : "₹2,499"})</span></button>

                        <button type="button" className={partnerBillingCycle === "half_yearly" ? "active" : ""} onClick={() => setPartnerBillingCycle("half_yearly")}>6-Month <span>({currency === "USD" ? "$99.99" : "₹10,000"})</span></button>

                      </div>

                    </div>

                  )}

                  <div className="cs-feature-list">

                    {plan.features.map((feature, index) => (

                      <div key={`${plan.id}-${index}`} className={`cs-feature ${feature.included ? "" : "excluded"}`}>

                        {feature.included ? <span className="cs-feature-check"><Check size={12} strokeWidth={3}/></span> : <X className="cs-feature-x" size={16}/>}

                        <span>{feature.text}{feature.note && <small>{feature.note}</small>}</span>

                      </div>

                    ))}

                  </div>

                  <button type="button" className={`cs-plan-action ${plan.id}`} disabled={isCurrent || loadingPlan} onClick={() => { setSelectedPlan(plan.id); handleUpgrade(plan.id); }}>

                    {isCurrent ? "Your Current Plan" : loadingPlan ? "Opening checkout…" : plan.buttonText}

                    {!isCurrent && !loadingPlan && <ArrowRight size={16}/>}

                  </button>

                </article>

              );

            })}

          </div>

        </section>



        <section id="topup" className="cs-container cs-topup">

          <div>

            <div className="cs-eyebrow"><Zap size={16} fill="currentColor"/> INSTANT TOP-UP SERVICE</div>

            <h2>Get More AI Tokens <span>Instantly</span></h2>

            <p>Need more tokens? Top up anytime and keep building without changing your subscription tier.</p>

          </div>

          <div className="cs-topup-purchase">

            <div className="cs-topup-pack"><Layers size={40}/><span><b>50,000 AI Tokens</b><small>One-Time Top-Up Add-on</small></span></div>

            <div className="cs-topup-price" aria-label={`Top-up price ${currency === "INR" ? "₹99" : "$1"}`}><span className={currency === "INR" ? "selected" : ""}>₹99</span><span className={currency === "USD" ? "selected" : ""}>$1</span></div>

            <button type="button" className="cs-buybutton" disabled={loadingPlan} onClick={() => handleUpgrade("token_addon")}><ShoppingCart size={17}/>{loadingPlan ? "Opening checkout…" : "Add 50,000 Tokens"}</button>

          </div>

          <div className="cs-topup-benefits">

            <div><span className="cs-benefit-icon"><Zap size={20}/></span><span><b>Instant Activation</b><small>Tokens added after successful payment</small></span></div>

            <div><span className="cs-benefit-icon"><Settings size={20}/></span><span><b>No Plan Change Required</b><small>Keep your current subscription</small></span></div>

            <div><span className="cs-benefit-icon"><Layers size={20}/></span><span><b>Use Across CareerSense Tools</b><small>Works across supported AI tools and exports</small></span></div>

          </div>

        </section>



        <section id="tools" className="cs-section cs-container">

          <div className="cs-section-heading">

            <h2>All Plans Include Access to <span>CareerSense Tools</span></h2>

            <p>From resume building to interview preparation — everything you need in one place.</p>

          </div>

          <div className="cs-tools-grid">

            {sharedTools.map(({title, detail, icon: ToolIcon, tint}) => (

              <div className="cs-tool" key={title}><span className={`cs-tool-icon ${tint}`}><ToolIcon size={25}/></span><b>{title}</b><p>{detail}</p></div>

            ))}

          </div>

        </section>



        <section id="compare" className="cs-section cs-container cs-comparison-section">

          <div className="cs-section-heading"><h2>Compare Plans</h2><p>See what's included in each plan and find the best fit for your goals.</p></div>

          <div className="cs-comparison" role="region" aria-label="Detailed plan comparison" tabIndex={0}>

            <table>

              <thead><tr><th scope="col">Features</th>{plans.map((p) => <th key={p.id} scope="col"><span className="cs-table-plan">{p.title.charAt(0) + p.title.slice(1).toLowerCase()}<small>{comparisonPlanLabels[p.id]}</small></span></th>)}</tr></thead>

              <tbody>{compareRows.map((row) => <tr key={row.label}><td>{row.label}</td>{row.values.map((value, i) => <td key={i}>{value === true ? <CheckCircle2 className="cs-comparison-yes" size={17} aria-label="Included"/> : value === false ? <X className="cs-comparison-no" size={17} aria-label="Not included"/> : value}</td>)}</tr>)}</tbody>

            </table>

          </div>

        </section>



        <section id="faqs" className="cs-section cs-container">

          <div className="cs-section-heading"><h2>Questions Before You Choose?</h2><p>Clear answers about plans, tokens, fellowships and payments.</p></div>

          <div className="cs-faq-grid">

            {faqs.map((faq, index) => (

              <div className={`cs-faq-item ${expandedFaq === index ? "open" : ""}`} key={faq.question}>

                <button type="button" aria-expanded={expandedFaq === index} aria-controls={`cs-faq-answer-${index}`} onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}>

                  <span className="cs-faq-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="cs-faq-question">{faq.question}</span><ChevronDown size={18} className={expandedFaq === index ? "open-icon" : ""}/>

                </button>

                {expandedFaq === index && <div className="cs-faq-answer" id={`cs-faq-answer-${index}`} role="region" aria-label={faq.question}>{faq.answer}</div>}

              </div>

            ))}

          </div>

        </section>



        <section className="cs-bottom-cta cs-container">

          <div><h2>Still not sure which plan is right for you?</h2><p>Compare detailed features or review answers to common questions before choosing.</p></div>

          <div className="cs-bottom-actions">

            <button type="button" className="cs-secondary-button" onClick={() => jumpTo("compare")}>Compare Plans</button>

            <button type="button" className="cs-buybutton" onClick={() => jumpTo("faqs")}>Browse FAQs <ArrowRight size={16}/></button>

          </div>

        </section>

      </main>

        {/* CUSTOM PAYMENT RESULT MODAL */}

      {modalConfig.isOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="payment-result-title">

          <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${isDark ? "border-cyan-500/30 bg-[#081836] text-white" : "border-slate-200 bg-white text-slate-900"

            }`}>

            <button

              type="button"

              aria-label="Close payment message"

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

              <h3 id="payment-result-title" className="mt-4 text-2xl font-black tracking-tight">

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

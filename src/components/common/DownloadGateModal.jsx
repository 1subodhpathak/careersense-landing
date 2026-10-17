import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, Download, ShieldCheck, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { loadRazorpaySdk, createPassOrder, verifyPassPayment } from "../../services/downloadGateService";

export default function DownloadGateModal({
  isOpen,
  onClose,
  resourceType = "document_pdf",
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
      const sdkLoaded = await loadRazorpaySdk();
      if (!sdkLoaded) {
        setError("Failed to load payment gateway. Please check your internet connection.");
        setLoading(false);
        return;
      }

      const orderData = await createPassOrder(user.id, resourceType, resourceId);
      if (!orderData.success || !orderData.orderId) {
        setError(orderData.message || "Failed to initialize ₹1 download pass order.");
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId || import.meta.env.VITE_CAREERSENSE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "CareerSense AI",
        description: `₹1 Download Pass - ${resourceName}`,
        order_id: orderData.orderId,
        prefill: {
          name: user.fullName || user.firstName || "CareerSense User",
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#0EA8B9",
        },
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await verifyPassPayment({
              clerkId: user.id,
              resourceType,
              resourceId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              setLoading(false);
              onSuccessDownload?.();
              onClose();
            } else {
              setError(verifyRes.message || "Payment verification failed.");
              setLoading(false);
            }
          } catch (vErr) {
            console.error("[Download Pass Verification Error]:", vErr);
            setError("Error verifying ₹1 download pass.");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("[Download pass error]:", err);
      setError("Failed to initiate ₹1 download pass.");
      setLoading(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[580px] overflow-hidden rounded-3xl border border-white/15 bg-[#081634] p-6 sm:p-8 text-white shadow-2xl">
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
            ONE-TIME TRANSACTION FEE
          </span>
          <h3 className="mt-2 text-xl font-black tracking-tight text-white">
            Your Document Is Ready to Download
          </h3>
          <div className="mt-3 space-y-2 text-xs font-medium leading-relaxed text-slate-300">
            <p>
              A small transaction fee helps cover payment processing and platform operating costs, allowing us to keep CareerSense AI running smoothly and reliably.
            </p>
            <p>
              Pay once to unlock your document, with the flexibility to access and download it again anytime.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-center text-xs font-semibold text-rose-400">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-slate-300 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          {!user ? (
            <SignInButton mode="modal">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0EA8B9] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition"
              >
                <span>Sign In to Pay ₹1 & Download</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </SignInButton>
          ) : (
            <button
              type="button"
              onClick={handlePayRupee}
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 active:scale-95 transition disabled:opacity-60"
            >
              <span>{loading ? "Opening Checkout..." : "Pay ₹1 & Download"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-5 border-t border-white/10 pt-3 text-center">
          <Link
            to="/pricing"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-[#0EA8B9] transition whitespace-nowrap"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span>Want unlimited downloads? Explore our Student Plan</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}

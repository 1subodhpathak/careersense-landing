import React, { useState, useEffect, useCallback } from "react";
import {
  Tag,
  Percent,
  Plus,
  Copy,
  Check,
  Trash2,
  Edit3,
  Calendar,
  Users,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  ShieldCheck,
  CheckCircle2,
  IndianRupee,
  Layers,
  ChevronRight,
  Search,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export default function CouponManagerHub({ adminEmail }) {
  const [coupons, setCoupons] = useState([]);
  const [metrics, setMetrics] = useState({
    totalCoupons: 0,
    activeCoupons: 0,
    totalRedemptions: 0,
    totalDiscountGivenINR: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'expired' | 'disabled'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Redemptions Drawer State
  const [viewingRedemptionsCoupon, setViewingRedemptionsCoupon] = useState(null);

  // Copy Feedback
  const [copiedCode, setCopiedCode] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 20,
    applicablePlans: ["all"],
    minOrderAmount: 0,
    maxDiscountAmount: "",
    totalRedemptionLimit: "",
    perUserLimit: 1,
    validFrom: new Date().toISOString().split("T")[0],
    expiresAt: "",
    isActive: true
  });

  const backendUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "https://server.datasenseai.com";

  // Fetch Coupons from Admin API
  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${backendUrl}/careersense/admin/coupons?status=${statusFilter}&search=${encodeURIComponent(
        searchQuery
      )}`;
      const res = await fetch(url, {
        headers: {
          "x-admin-email": adminEmail || "pathaksubodh945@gmail.com"
        }
      });
      const data = await res.json();
      if (data.success) {
        setCoupons(data.coupons || []);
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.error("[CouponManagerHub Fetch Error]:", err);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, adminEmail, statusFilter, searchQuery]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  // Open Create Modal
  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 25,
      applicablePlans: ["all"],
      minOrderAmount: 0,
      maxDiscountAmount: "",
      totalRedemptionLimit: "",
      perUserLimit: 1,
      validFrom: new Date().toISOString().split("T")[0],
      expiresAt: "",
      isActive: true
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType || "percentage",
      discountValue: coupon.discountValue || 0,
      applicablePlans: coupon.applicablePlans || ["all"],
      minOrderAmount: coupon.minOrderAmount || 0,
      maxDiscountAmount: coupon.maxDiscountAmount || "",
      totalRedemptionLimit: coupon.totalRedemptionLimit || "",
      perUserLimit: coupon.perUserLimit || 1,
      validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().split("T")[0] : "",
      expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().split("T")[0] : "",
      isActive: coupon.isActive !== false
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // Handle Form Submit (Create or Edit)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      setFormError("Coupon code is required.");
      return;
    }

    setFormSubmitting(true);
    setFormError("");

    try {
      const payload = {
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        applicablePlans: formData.applicablePlans,
        minOrderAmount: Number(formData.minOrderAmount) || 0,
        maxDiscountAmount: formData.maxDiscountAmount ? Number(formData.maxDiscountAmount) : null,
        totalRedemptionLimit: formData.totalRedemptionLimit ? Number(formData.totalRedemptionLimit) : null,
        perUserLimit: Number(formData.perUserLimit) || 1,
        validFrom: formData.validFrom ? new Date(formData.validFrom) : new Date(),
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
        isActive: formData.isActive
      };

      const isEdit = Boolean(editingCoupon);
      const url = isEdit
        ? `${backendUrl}/careersense/admin/coupons/${editingCoupon._id}`
        : `${backendUrl}/careersense/admin/coupons`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail || "pathaksubodh945@gmail.com"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchCoupons();
      } else {
        setFormError(data.message || "Operation failed.");
      }
    } catch (err) {
      console.error("[Save Coupon Error]:", err);
      setFormError("Network error while saving coupon.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Toggle Active State
  const handleToggleActive = async (coupon) => {
    try {
      const res = await fetch(`${backendUrl}/careersense/admin/coupons/${coupon._id}/toggle`, {
        method: "PATCH",
        headers: {
          "x-admin-email": adminEmail || "pathaksubodh945@gmail.com"
        }
      });
      const data = await res.json();
      if (data.success) {
        setCoupons((prev) =>
          prev.map((c) => (c._id === coupon._id ? { ...c, isActive: data.isActive } : c))
        );
      }
    } catch (err) {
      console.error("[Toggle Coupon Error]:", err);
    }
  };

  // Delete Coupon
  const handleDeleteCoupon = async (coupon) => {
    if (!window.confirm(`Are you sure you want to delete or deactivate coupon "${coupon.code}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/careersense/admin/coupons/${coupon._id}`, {
        method: "DELETE",
        headers: {
          "x-admin-email": adminEmail || "pathaksubodh945@gmail.com"
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchCoupons();
      } else {
        alert(data.message || "Failed to delete coupon.");
      }
    } catch (err) {
      console.error("[Delete Coupon Error]:", err);
    }
  };

  // Copy Code to Clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Toggle plan selection in form
  const handleTogglePlan = (planKey) => {
    if (planKey === "all") {
      setFormData((prev) => ({
        ...prev,
        applicablePlans: ["all"]
      }));
      return;
    }

    setFormData((prev) => {
      let current = prev.applicablePlans.filter((p) => p !== "all");
      if (current.includes(planKey)) {
        current = current.filter((p) => p !== planKey);
        if (current.length === 0) current = ["all"];
      } else {
        current.push(planKey);
      }
      return { ...prev, applicablePlans: current };
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b132b] p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-teal-500/20 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-teal-300 border border-teal-500/30">
                <Tag size={12} /> Promo & Discounts Engine
              </span>
              <span className="text-xs text-slate-400">Live Razorpay Checkout Integration</span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              CareerSense Coupon & Voucher Command
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
              Create and manage promo discount codes for CareerSense candidate subscriptions and token add-ons.
              Discounts are automatically calculated server-side and charged accurately on Razorpay checkout.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchCoupons}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:from-teal-400 hover:to-cyan-400 active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Create Coupon</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Codes</span>
            <Tag size={18} className="text-teal-600" />
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">{metrics.activeCoupons}</div>
          <div className="mt-1 text-[11px] text-slate-400">Out of {metrics.totalCoupons} total coupons</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Redemptions</span>
            <Users size={18} className="text-blue-600" />
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">{metrics.totalRedemptions}</div>
          <div className="mt-1 text-[11px] text-slate-400">Times applied by candidates</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Discount Value Given</span>
            <IndianRupee size={18} className="text-emerald-600" />
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">₹{metrics.totalDiscountGivenINR.toLocaleString()}</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">Candidate savings granted</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">All-Time Coupons</span>
            <Layers size={18} className="text-purple-600" />
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">{metrics.totalCoupons}</div>
          <div className="mt-1 text-[11px] text-slate-400">Campaigns created</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coupons by code or description..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Coupons" },
            { id: "active", label: "Active" },
            { id: "expired", label: "Expired" },
            { id: "disabled", label: "Disabled" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={32} className="text-teal-600 animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading coupons...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Tag size={26} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No promo coupons found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Create your first promotional discount coupon code to reward subscribers or send in email marketing blasts.
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 cursor-pointer"
            >
              <Plus size={14} />
              <span>Create First Coupon</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Coupon Code</th>
                  <th className="py-3.5 px-4">Discount</th>
                  <th className="py-3.5 px-4">Target Plans</th>
                  <th className="py-3.5 px-4">Redemptions</th>
                  <th className="py-3.5 px-4">Validity</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((coupon) => {
                  const now = new Date();
                  const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < now;
                  const isMaxedOut =
                    coupon.totalRedemptionLimit &&
                    coupon.redemptionCount >= coupon.totalRedemptionLimit;

                  return (
                    <tr key={coupon._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Code */}
                      <td className="py-4 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 text-xs">
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(coupon.code)}
                            title="Copy coupon code"
                            className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
                          >
                            {copiedCode === coupon.code ? (
                              <Check size={14} className="text-emerald-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                        {coupon.description && (
                          <div className="text-[11px] text-slate-500 mt-1 max-w-xs truncate font-sans">
                            {coupon.description}
                          </div>
                        )}
                      </td>

                      {/* Discount */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {coupon.discountType === "percentage" ? (
                            <>
                              <Percent size={12} />
                              <span>{coupon.discountValue}% OFF</span>
                            </>
                          ) : (
                            <>
                              <IndianRupee size={12} />
                              <span>₹{coupon.discountValue} FLAT OFF</span>
                            </>
                          )}
                        </div>
                        {coupon.discountType === "percentage" && coupon.maxDiscountAmount && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Up to ₹{coupon.maxDiscountAmount}
                          </div>
                        )}
                      </td>

                      {/* Applicable Plans */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {coupon.applicablePlans.includes("all") ? (
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200">
                              All Plans
                            </span>
                          ) : (
                            coupon.applicablePlans.map((plan) => (
                              <span
                                key={plan}
                                className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200 capitalize"
                              >
                                {plan.replace("_", " ")}
                              </span>
                            ))
                          )}
                        </div>
                      </td>

                      {/* Redemptions */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setViewingRedemptionsCoupon(coupon)}
                          className="group text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-teal-600 transition">
                            <span>{coupon.redemptionCount || 0}</span>
                            <span className="text-slate-400 font-normal">
                              / {coupon.totalRedemptionLimit || "∞"} used
                            </span>
                            <ChevronRight size={13} className="text-slate-400 group-hover:translate-x-0.5 transition" />
                          </div>
                          {coupon.totalRedemptionLimit && (
                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                              <div
                                className="bg-teal-500 h-full rounded-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    ((coupon.redemptionCount || 0) / coupon.totalRedemptionLimit) * 100
                                  )}%`
                                }}
                              />
                            </div>
                          )}
                        </button>
                      </td>

                      {/* Validity */}
                      <td className="py-4 px-4 text-[11px] text-slate-600">
                        {coupon.expiresAt ? (
                          <div>
                            <div>Exp: {new Date(coupon.expiresAt).toLocaleDateString()}</div>
                            {isExpired && (
                              <span className="text-[10px] font-bold text-red-500">Expired</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium">No Expiration</span>
                        )}
                      </td>

                      {/* Status Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(coupon)}
                          title={coupon.isActive ? "Click to deactivate" : "Click to activate"}
                          className="inline-flex items-center gap-1 cursor-pointer transition"
                        >
                          {coupon.isActive && !isExpired && !isMaxedOut ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active
                            </span>
                          ) : isExpired ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              Expired
                            </span>
                          ) : isMaxedOut ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              Exhausted
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              Disabled
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(coupon)}
                            title="Edit Coupon"
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteCoupon(coupon)}
                            title="Delete / Deactivate"
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 transition cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create / Edit Coupon */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <Tag size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : "Create New Promotional Coupon"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Discounts apply automatically at CareerSense checkout
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Code & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={Boolean(editingCoupon)}
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toUpperCase().replace(/\s+/g, "")
                      })
                    }
                    placeholder="e.g. WELCOME30"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 disabled:bg-slate-100"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Uppercase letters and digits only</p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Description / Note
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g. 30% off for campus webinar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="percentage">Percentage (% OFF)</option>
                    <option value="flat">Flat Amount (₹ OFF)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    {formData.discountType === "percentage" ? "Discount Percentage (%)" : "Flat Discount (₹ INR)"} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={formData.discountType === "percentage" ? "100" : "50000"}
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                {formData.discountType === "percentage" && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Max Discount Cap (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxDiscountAmount}
                      onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                      placeholder="e.g. 500 (blank = no limit)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                )}
              </div>

              {/* Applicable Plans */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Applicable Plans
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "all", label: "All Plans" },
                    { id: "student", label: "Student (₹250/m)" },
                    { id: "intern", label: "Intern Track (₹2k)" },
                    { id: "partner", label: "Partner Network" },
                    { id: "token_addon", label: "50k Add-on (₹99)" }
                  ].map((p) => {
                    const isSelected = formData.applicablePlans.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => handleTogglePlan(p.id)}
                        className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition cursor-pointer ${
                          isSelected
                            ? "border-teal-500 bg-teal-50 text-teal-800"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Redemption Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Total Redemption Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalRedemptionLimit}
                    onChange={(e) => setFormData({ ...formData, totalRedemptionLimit: e.target.value })}
                    placeholder="e.g. 100 (blank = unlimited)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Per-User Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.perUserLimit}
                    onChange={(e) => setFormData({ ...formData, perUserLimit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Status Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">Coupon Active State</div>
                  <div className="text-[11px] text-slate-500">Allow candidates to apply this code immediately</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className="cursor-pointer text-slate-700"
                >
                  {formData.isActive ? (
                    <ToggleRight size={32} className="text-teal-600" />
                  ) : (
                    <ToggleLeft size={32} className="text-slate-300" />
                  )}
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      <span>{editingCoupon ? "Save Changes" : "Create Coupon"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Redemptions Drawer / Audit View */}
      {viewingRedemptionsCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Redemption History</div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5 font-mono">
                    {viewingRedemptionsCoupon.code}
                  </h3>
                </div>
                <button
                  onClick={() => setViewingRedemptionsCoupon(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-xs text-slate-600">
                  Total times redeemed: <strong>{viewingRedemptionsCoupon.redemptionCount || 0}</strong>
                </div>
              </div>

              {/* Redemptions list */}
              <div className="mt-4 space-y-3 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar pr-1">
                {(!viewingRedemptionsCoupon.usedBy || viewingRedemptionsCoupon.usedBy.length === 0) ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    No candidates have redeemed this coupon code yet.
                  </div>
                ) : (
                  viewingRedemptionsCoupon.usedBy.map((redemption, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800">
                        <span className="truncate max-w-[200px]">
                          {redemption.userEmail || redemption.clerkId}
                        </span>
                        <span className="text-emerald-600 font-bold">
                          -₹{(redemption.discountPaise / 100).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="capitalize">{redemption.planKey || "subscription"}</span>
                        <span>
                          {redemption.redeemedAt
                            ? new Date(redemption.redeemedAt).toLocaleString()
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setViewingRedemptionsCoupon(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center transition cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

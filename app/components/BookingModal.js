"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { X, User, Mail, Phone, MessageSquare, MapPin, Calendar, Users, FileText, Loader2, AlertCircle } from "lucide-react";

const INPUT_BASE =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-300 transition [color-scheme:dark]";
const LABEL_BASE = "block text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5";

function Field({ label, required, children }) {
  return (
    <div>
      <label className={LABEL_BASE}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const EMPTY_FORM = {
  customerName: "",
  email: "",
  phone: "",
  whatsapp: "",
  city: "",
  travelDate: "",
  adults: "1",
  children: "0",
  pickupLocation: "",
  specialRequests: "",
  acceptTerms: false,
};

export default function BookingModal({ packageName, packageId, bookingMode = "group", travelDateOptions = [], isOpen, onClose }) {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user: clerkUser, isLoaded } = useUser();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const clerkProfile = {
    customerName: [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ").trim() || clerkUser?.username || "",
    email: clerkUser?.primaryEmailAddress?.emailAddress || "",
    phone: clerkUser?.primaryPhoneNumber?.phoneNumber || "",
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setApiError("");
  }, []);

  const totalTravelers = (parseInt(form.adults || "0", 10) || 0) + (parseInt(form.children || "0", 10) || 0);
  const isGroupBooking = bookingMode === "group";
  const hasTravelDateOptions = Array.isArray(travelDateOptions) && travelDateOptions.length > 0;
  const normalizedTravelDateOptions = travelDateOptions.map((option) => {
    if (typeof option === "string") {
      return {
        value: option,
        label: new Date(option + "T00:00:00").toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
    }

    return option;
  });

  // Min travel date: today
  const minDate = new Date().toISOString().split("T")[0];

  function validate(submissionForm = form) {
    const errs = {};
    if (!submissionForm.customerName.trim()) errs.customerName = "Full name is required.";
    if (!submissionForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submissionForm.email)) errs.email = "Valid email is required.";
    if (!submissionForm.phone.trim() || !/^[0-9+\-()\s]{7,20}$/.test(submissionForm.phone)) errs.phone = "Valid phone number is required.";
    if (!submissionForm.travelDate) errs.travelDate = "Travel date is required.";
    if (!submissionForm.adults || parseInt(submissionForm.adults, 10) < 1) errs.adults = "At least 1 adult is required.";
    if (!submissionForm.acceptTerms) errs.acceptTerms = "Please accept the rules and regulations to continue.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    if (!isLoaded || !clerkUser) {
      setApiError("Please log in before booking this tour.");
      return;
    }

    const normalizedForm = {
      ...form,
      customerName: form.customerName || clerkProfile.customerName,
      email: form.email || clerkProfile.email,
      phone: form.phone || clerkProfile.phone,
    };

    const errs = validate(normalizedForm);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...normalizedForm,
          packageId,
          packageName,
          bookingMode,
          adults: parseInt(normalizedForm.adults, 10),
          children: parseInt(normalizedForm.children || "0", 10),
          travelDate: normalizedForm.travelDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setApiError(data.message || "Failed to submit booking."); return; }

      const { booking } = data;
      onClose();
      router.push(
        `/booking/success?bookingId=${encodeURIComponent(booking.bookingId)}&packageName=${encodeURIComponent(booking.packageName)}&travelDate=${encodeURIComponent(booking.travelDate || "")}&travelers=${booking.totalTravelers}&customerName=${encodeURIComponent(booking.customerName)}&phone=${encodeURIComponent(booking.phone)}`
      );
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm overflow-hidden"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl border border-white/10 bg-slate-900 shadow-2xl overflow-visible">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white">Book Your Trip</h2>
            <p className="text-xs text-amber-300 font-medium mt-0.5">{packageName}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(95vh-72px)] overflow-y-auto overscroll-contain">
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-6">
            {/* API Error */}
            {apiError && (
              <div className="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{apiError}</p>
              </div>
            )}

            {/* Section: Customer Info */}
            <div>
              <p className="text-xs font-bold text-amber-300/80 uppercase tracking-widest mb-4">Customer Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="text"
                    value={form.customerName || clerkProfile.customerName}
                    onChange={(e) => set("customerName", e.target.value)}
                    placeholder="Your full name"
                    className={`${INPUT_BASE} pl-9 ${errors.customerName ? "border-red-400" : ""}`}
                    maxLength={100}
                  />
                </div>
                {errors.customerName && <p className="mt-1 text-xs text-red-400">{errors.customerName}</p>}
              </Field>

              <Field label="Email Address" required>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="email"
                    value={form.email || clerkProfile.email}
                    readOnly
                    disabled
                    placeholder="Auto-filled from your account"
                    className={`${INPUT_BASE} pl-9 opacity-60 cursor-not-allowed ${errors.email ? "border-red-400" : ""}`}
                    maxLength={200}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                <p className="mt-1 text-xs text-white/40">Email comes from your login account and cannot be changed.</p>
              </Field>

              <Field label="Mobile Number" required>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="tel"
                    value={form.phone || clerkProfile.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className={`${INPUT_BASE} pl-9 ${errors.phone ? "border-red-400" : ""}`}
                    maxLength={20}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </Field>

              <Field label="WhatsApp Number">
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    placeholder="If different from mobile"
                    className={`${INPUT_BASE} pl-9`}
                    maxLength={20}
                  />
                </div>
              </Field>

              <Field label="City">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Your city"
                    className={`${INPUT_BASE} pl-9`}
                    maxLength={80}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Section: Booking Info */}
          <div>
            <p className="text-xs font-bold text-amber-300/80 uppercase tracking-widest mb-4">Booking Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Package (readonly) */}
              <Field label="Package">
                <input
                  type="text"
                  value={packageName}
                  readOnly
                  className={`${INPUT_BASE} opacity-60 cursor-not-allowed`}
                />
              </Field>

              {isGroupBooking && hasTravelDateOptions ? (
                <Field label="Travel Date" required>
                  <select
                    value={form.travelDate}
                    onChange={(e) => set("travelDate", e.target.value)}
                    className={`${INPUT_BASE} ${errors.travelDate ? "border-red-400" : ""}`}
                  >
                    <option value="">Choose a travel date</option>
                    {normalizedTravelDateOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.travelDate && <p className="mt-1 text-xs text-red-400">{errors.travelDate}</p>}
                </Field>
              ) : (
                <Field label="Travel Date" required>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                    <input
                      type="date"
                      value={form.travelDate}
                      min={minDate}
                      onChange={(e) => set("travelDate", e.target.value)}
                      className={`${INPUT_BASE} pl-9 ${errors.travelDate ? "border-red-400" : ""}`}
                    />
                  </div>
                  {errors.travelDate && <p className="mt-1 text-xs text-red-400">{errors.travelDate}</p>}
                </Field>
              )}

              <Field label="Number of Adults" required>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="number"
                    value={form.adults}
                    min="1"
                    max="50"
                    onChange={(e) => set("adults", e.target.value)}
                    className={`${INPUT_BASE} pl-9 ${errors.adults ? "border-red-400" : ""}`}
                  />
                </div>
                {errors.adults && <p className="mt-1 text-xs text-red-400">{errors.adults}</p>}
              </Field>

              <Field label="Number of Children">
                <input
                  type="number"
                  value={form.children}
                  min="0"
                  max="50"
                  onChange={(e) => set("children", e.target.value)}
                  className={INPUT_BASE}
                />
              </Field>

              {/* Total Travelers */}
              <Field label="Total Travelers">
                <div className="rounded-xl border border-amber-300/20 bg-amber-400/5 px-4 py-3">
                  <span className="text-amber-300 font-bold text-lg">{totalTravelers}</span>
                  <span className="text-white/50 text-sm ml-1">traveler{totalTravelers !== 1 ? "s" : ""}</span>
                </div>
              </Field>

              <Field label="Pickup Location">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    type="text"
                    value={form.pickupLocation}
                    onChange={(e) => set("pickupLocation", e.target.value)}
                    placeholder="Hotel name / address"
                    className={`${INPUT_BASE} pl-9`}
                    maxLength={200}
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Special Requests / Notes">
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-4 w-4 text-white/30 pointer-events-none" />
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) => set("specialRequests", e.target.value)}
                    rows={3}
                    placeholder="Dietary requirements, room preferences, accessibility needs..."
                    className={`${INPUT_BASE} pl-9 resize-none`}
                    maxLength={500}
                  />
                </div>
              </Field>
            </div>
          </div>

            {/* Info banner */}
            <div className="rounded-xl bg-amber-400/8 border border-amber-400/20 p-4">
              <p className="text-xs text-amber-200/80 leading-relaxed">
                <strong className="text-amber-300">Pay Later:</strong> No payment is required now. After submission, our travel
                consultant will contact you within 24 hours to confirm your booking and share payment details.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => set("acceptTerms", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-amber-400 focus:ring-amber-300"
                />
                <span className="text-sm text-white/85 leading-relaxed">
                  I have read and agree to the
                  <a
                    href="/rules-regulations"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 font-semibold text-amber-300 underline decoration-amber-300/80 underline-offset-2 hover:text-amber-200"
                  >
                    Rules &amp; Regulations
                  </a>
                  for this tour.
                </span>
              </label>
              {errors.acceptTerms && <p className="mt-2 text-xs text-red-400">{errors.acceptTerms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !isLoaded || !clerkUser}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Booking Request...
                </>
              ) : !clerkUser ? (
                "Login Required to Submit"
              ) : (
                "Submit Booking Request →"
              )}
            </button>

            {!clerkUser && isLoaded && (
              <button
                type="button"
                onClick={() => openSignIn({ redirectUrl: window.location.pathname })}
                className="w-full border border-amber-300/40 text-amber-200 hover:text-amber-100 hover:border-amber-300 rounded-xl py-3 text-sm font-semibold transition"
              >
                Login / Create Account
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

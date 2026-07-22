"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Calendar, Phone, X } from "lucide-react";

export default function DOBModal() {
  const { user, loading, updateProfile } = useAuth();
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);

  // Show modal only when: loaded, user exists, missing DOB or phone, not dismissed
  const needsDob = !user?.dateOfBirth;
  const needsPhone = !user?.phoneNumber;
  if (loading || !user || (!needsDob && !needsPhone) || dismissed) return null;

  // Calculate max date (must be at least 5 years old)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 5);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleSave = async () => {
    if (needsDob && !dob) {
      setError("Please select your date of birth.");
      return;
    }
    if (needsPhone && !phone) {
      setError("Please enter your phone number.");
      return;
    }
    if (needsPhone && phone && !/^[+]?[0-9\s\-()]{7,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      const updates = {};
      if (needsDob && dob) updates.dateOfBirth = dob;
      if (needsPhone && phone) updates.phoneNumber = phone;
      await updateProfile(updates);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-2 ring-amber-300/20">
            <Calendar className="h-7 w-7" />
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-1">
          One quick thing!
        </h2>
        <p className="text-white/60 text-center text-sm mb-6">
          Please complete your profile to continue.
        </p>

        {needsDob && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wide mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              max={maxDateStr}
              onChange={(e) => {
                setDob(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white focus:outline-none focus:border-amber-300 transition [color-scheme:dark]"
            />
          </div>
        )}

        {needsPhone && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wide mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="tel"
                value={phone}
                placeholder="+91 98765 43210"
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-300 transition"
              />
            </div>
          </div>
        )}

        {error && (
          <p className="mb-3 text-xs text-red-400">{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={saving || (needsDob && !dob) || (needsPhone && !phone)}
          className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-xl transition duration-200"
        >
          {saving ? "Saving..." : "Save & Continue"}
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="mt-3 w-full text-white/40 hover:text-white/70 text-sm text-center transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

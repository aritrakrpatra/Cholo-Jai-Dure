"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Calendar, Phone, UserCircle2 } from "lucide-react";

const PHONE_REGEX = /^[+]?[0-9\s\-()]{7,20}$/;

export default function DOBModal() {
  const { user, loading, updateProfile } = useAuth();
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (user) {
      setDob(user.dateOfBirth || "");
      setGender(user.gender || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user?.dateOfBirth, user?.gender, user?.phoneNumber]);

  if (loading || !user || dismissed) return null;

  const requiredMissing = !user.dateOfBirth || !user.gender || !user.phoneNumber;
  if (!requiredMissing) return null;

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 5);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleSave = async () => {
    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }

    if (!gender) {
      setError("Please select your gender.");
      return;
    }

    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    if (!PHONE_REGEX.test(phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await updateProfile({ dateOfBirth: dob, gender, phoneNumber });
      setDismissed(true);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-5 flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-2 ring-amber-300/20">
            <Calendar className="h-7 w-7" />
          </span>
        </div>

        <h2 className="mb-1 text-center text-2xl font-bold text-white">
          Complete your profile
        </h2>
        <p className="mb-6 text-center text-sm text-white/60">
          Please provide your date of birth, gender, and phone number to continue.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
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
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white transition focus:border-amber-300 focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
              Gender
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setError("");
                }}
                className="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white transition focus:border-amber-300 focus:outline-none"
              >
                <option value="" className="bg-slate-900 text-white">Select gender</option>
                <option value="male" className="bg-slate-900 text-white">Male</option>
                <option value="female" className="bg-slate-900 text-white">Female</option>
                <option value="other" className="bg-slate-900 text-white">Other</option>
                <option value="prefer_not_to_say" className="bg-slate-900 text-white">Prefer not to say</option>
              </select>
              <UserCircle2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                placeholder="e.g. +91 9876543210"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 pl-10 text-white transition focus:border-amber-300 focus:outline-none"
              />
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !dob || !gender || !phoneNumber}
          className="mt-6 w-full rounded-xl bg-amber-400 py-3 font-bold text-slate-900 transition duration-200 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Calendar, Phone, UserCircle2, X } from "lucide-react";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-8 shadow-[var(--shadow-elevated)]">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          disabled={saving}
          aria-label="Skip profile completion"
          title="Skip profile completion"
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-5 flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:rgba(197,140,43,0.12)] text-[var(--accent)] ring-2 ring-[color:rgba(197,140,43,0.18)]">
            <Calendar className="h-7 w-7" />
          </span>
        </div>

        <h2 className="mb-1 text-center text-2xl font-bold text-[var(--foreground)]">
          Complete your profile
        </h2>
        <p className="mb-6 text-center text-sm text-[var(--muted)]">
          Please provide your date of birth, gender, and phone number to continue.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
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
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] transition focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Gender
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setError("");
                }}
                className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] transition focus:border-[var(--accent)] focus:outline-none"
              >
                <option value="" className="bg-[var(--surface-strong)] text-[var(--foreground)]">Select gender</option>
                <option value="male" className="bg-[var(--surface-strong)] text-[var(--foreground)]">Male</option>
                <option value="female" className="bg-[var(--surface-strong)] text-[var(--foreground)]">Female</option>
                <option value="other" className="bg-[var(--surface-strong)] text-[var(--foreground)]">Other</option>
                <option value="prefer_not_to_say" className="bg-[var(--surface-strong)] text-[var(--foreground)]">Prefer not to say</option>
              </select>
              <UserCircle2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
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
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 pl-10 text-[var(--foreground)] transition focus:border-[var(--accent)] focus:outline-none"
              />
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !dob || !gender || !phoneNumber}
          className="mt-6 w-full rounded-xl bg-[var(--accent)] py-3 font-bold text-slate-900 transition duration-200 hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-[rgba(197,140,43,0.2)]"
        >
          {saving ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}

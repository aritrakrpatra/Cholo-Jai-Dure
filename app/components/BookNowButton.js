"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import BookingModal from "./BookingModal";
import { useAuth } from "@/app/context/AuthContext";

/**
 * Drop-in "Book Now" button for any package card or details page.
 * Renders the BookingModal inline (no portal needed in App Router).
 *
 * @param {string} packageName  - Display name of the package
 * @param {string} packageId    - Slug / unique ID of the package
 * @param {string} [className]  - Optional extra Tailwind classes for the button
 * @param {string} [variant]    - "primary" (default) | "outline"
 */
export default function BookNowButton({ packageName, packageId, className = "", variant = "primary" }) {
  const [open, setOpen] = useState(false);
  const { user, loading, login } = useAuth();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

  const styles = {
    primary: "bg-amber-400 hover:bg-amber-300 text-slate-900 px-6 py-3",
    outline: "border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-amber-200 px-6 py-3",
  };

  async function handleBookClick() {
    if (loading) return;
    if (!user) {
      await login();
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleBookClick}
        disabled={loading}
        className={`${base} ${styles[variant] ?? styles.primary} ${className}`}
      >
        <CalendarCheck className="h-4 w-4" />
        {user ? "Book Now" : "Login to Book"}
      </button>

      <BookingModal
        packageName={packageName}
        packageId={packageId}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

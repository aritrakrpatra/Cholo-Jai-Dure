"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Home, MessageCircle, Calendar, Users, Package, User, Copy, Check } from "lucide-react";
import { useState, Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId") || "";
  const packageName = params.get("packageName") || "";
  const travelDate = params.get("travelDate") || "";
  const travelers = params.get("travelers") || "";
  const customerName = params.get("customerName") || "";
  const phone = params.get("phone") || "";
  const [copied, setCopied] = useState(false);

  const fmtDate = (d) => {
    if (!d) return "—";
    try {
      return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch { return d; }
  };

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waMessage = encodeURIComponent(
    `Hi, I have submitted a booking request.\n\nBooking ID: ${bookingId}\nPackage: ${packageName}\n\nPlease confirm my booking.`
  );
  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${waMessage}`
    : `https://wa.me/?text=${waMessage}`;

  function copyBookingId() {
    navigator.clipboard.writeText(bookingId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">

        {/* Success icon + heading */}
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-400/15 text-green-400 ring-2 ring-green-400/25 mb-5">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-white">Booking Request Submitted!</h1>
          <p className="text-white/60 mt-2 text-sm leading-relaxed">
            Thank you for choosing <span className="text-amber-300 font-semibold">Cholo Jai Dure Tour &amp; Travels</span>.
            We have received your booking request.
          </p>
        </div>

        {/* Booking ID card */}
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-center">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Your Booking ID</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-extrabold text-amber-300 tracking-wider">{bookingId}</span>
            <button
              onClick={copyBookingId}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 transition"
              title="Copy Booking ID"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2">Save this ID for future reference</p>
        </div>

        {/* Booking details */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
          {[
            { Icon: Package, label: "Package", value: packageName },
            { Icon: Calendar, label: "Travel Date", value: fmtDate(travelDate) },
            { Icon: Users, label: "Travelers", value: travelers ? `${travelers} person${travelers > 1 ? "s" : ""}` : "—" },
            { Icon: User, label: "Name", value: customerName },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-amber-300">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-white/40">{label}</p>
                <p className="text-sm font-semibold text-white">{value || "—"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What's next */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm font-bold text-blue-300 mb-2">What happens next?</p>
          <p className="text-sm text-white/60 leading-relaxed">
            Our travel consultant will contact you shortly to <strong className="text-white/80">confirm your booking</strong> and
            provide complete payment details. No payment is required right now.
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 text-sm transition"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-400 text-white font-bold py-3 text-sm transition"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

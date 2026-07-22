"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  User, Mail, Phone, LogOut, Plane, ArrowLeft,
  Calendar, Package, Clock, CheckCircle, XCircle, AlertCircle, LayoutDashboard,
} from "lucide-react";

const STATUS_STYLES = {
  confirmed: { icon: CheckCircle, label: "Confirmed", className: "text-green-400 bg-green-400/10 border-green-400/20" },
  contacted: { icon: Phone, label: "Contacted", className: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  payment_pending: { icon: Clock, label: "Payment Pending", className: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  paid: { icon: CheckCircle, label: "Paid", className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  pending:   { icon: Clock,       label: "Pending",   className: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  cancelled: { icon: XCircle,     label: "Cancelled", className: "text-red-400 bg-red-400/10 border-red-400/20" },
};

function BookingCard({ booking }) {
  const status = STATUS_STYLES[booking.status] ?? STATUS_STYLES.pending;
  const StatusIcon = status.icon;
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate">{booking.packageTitle}</p>
          <p className="text-white/50 text-xs mt-1">
            Booked on {new Date(booking.bookedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
          </p>
          {booking.travelDate && (
            <p className="text-amber-300/80 text-xs mt-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Travel: {new Date(booking.travelDate + "T00:00:00").toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          )}
          {booking.travelers && (
            <p className="text-white/50 text-xs mt-1">{booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}</p>
          )}
        </div>
        <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${status.className}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </span>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, isAdmin, logout, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    let active = true;

    async function loadBookings() {
      setBookingsLoading(true);

      try {
        const res = await fetch("/api/bookings/me", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load bookings.");
        }

        if (!active) {
          return;
        }

        setBookings(
          (data.bookings || []).map((booking) => ({
            id: booking.id,
            packageTitle: booking.packageName,
            bookedAt: booking.createdAt,
            travelDate: booking.travelDate,
            travelers: booking.totalTravelers,
            status: booking.bookingStatus || booking.status || "pending",
          }))
        );
      } catch {
        if (active) {
          setBookings([]);
        }
      } finally {
        if (active) {
          setBookingsLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="sticky top-0 z-50 px-4 py-5 backdrop-blur-xl bg-slate-950/40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20">
              <Plane className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Cholo Jai Dure</p>
              <p className="text-xs text-white/70">Your Journey, Our Priority</p>
            </div>
          </Link>
          <button
            onClick={() => router.back()}
            className="text-white/70 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-8">
        <div className="mx-auto w-full max-w-2xl space-y-6">

          {/* Profile Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-2 ring-amber-300/20 mb-4">
                <User className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
              <p className="text-white/60">Your profile information</p>
            </div>

            {/* User Info */}
            <div className="space-y-4 mb-8">
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">Full Name</p>
                <p className="text-lg font-semibold text-white">{user.name || "Traveler"}</p>
              </div>

              {user.dateOfBirth && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Date of Birth
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(user.dateOfBirth + "T00:00:00").toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              )}

              {user.gender && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">Gender</p>
                  <p className="text-lg font-semibold text-white capitalize">{user.gender}</p>
                </div>
              )}

              {user.phoneNumber && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1 flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    Phone Number
                  </p>
                  <p className="text-lg font-semibold text-white">{user.phoneNumber}</p>
                </div>
              )}

              {user.email && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1 flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email
                  </p>
                  <p className="text-lg font-semibold text-white break-all">{user.email}</p>
                </div>
              )}

              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">Member Since</p>
                <p className="text-lg font-semibold text-white">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                    : "Recently"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

            {/* Admin dashboard shortcut — only for admin users */}
            {isAdmin && (
              <Link
                href="/admin/bookings"
                className="mt-3 flex items-center justify-center gap-2 w-full rounded-lg border border-amber-400/20 bg-amber-400/5 hover:bg-amber-400/10 text-amber-300 font-semibold py-3 transition text-sm"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Booking History Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                <Package className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Booking History</h2>
                <p className="text-white/50 text-sm">
                  {bookingsLoading
                    ? "Loading booking history..."
                    : bookings.length > 0
                    ? `${bookings.length} booking${bookings.length > 1 ? "s" : ""} found`
                    : "No bookings yet"}
                </p>
              </div>
            </div>

            {bookingsLoading ? (
              <div className="flex items-center justify-center py-10 text-white/50 text-sm">
                Loading booking history...
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings
                  .slice()
                  .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
                  .map((booking, i) => (
                    <BookingCard key={booking.id ?? i} booking={booking} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/20 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </span>
                <p className="text-white/50 font-medium">No bookings found</p>
                <p className="text-white/30 text-sm mt-1">Your tour bookings will appear here once confirmed.</p>
                <Link
                  href="/tours"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/20 text-amber-300 px-5 py-2.5 text-sm font-semibold transition"
                >
                  <Plane className="h-4 w-4" />
                  Explore Packages
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

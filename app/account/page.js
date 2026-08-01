"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";
import Navbar from "@/app/components/Navbar";
import {
  User, Mail, Phone, LogOut, Plane, ArrowLeft,
  Calendar, Package, Clock, CheckCircle, XCircle, AlertCircle, LayoutDashboard,
  Pencil,
} from "lucide-react";

const STATUS_STYLES = {
  confirmed: { icon: CheckCircle, label: "Confirmed", dark: "text-green-400 bg-green-400/10 border-green-400/20", light: "text-green-700 bg-green-500/10 border-green-500/25" },
  contacted: { icon: Phone, label: "Contacted", dark: "text-blue-400 bg-blue-400/10 border-blue-400/20", light: "text-blue-700 bg-blue-500/10 border-blue-500/25" },
  payment_pending: { icon: Clock, label: "Payment Pending", dark: "text-orange-400 bg-orange-400/10 border-orange-400/20", light: "text-orange-700 bg-orange-500/10 border-orange-500/25" },
  paid: { icon: CheckCircle, label: "Paid", dark: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", light: "text-emerald-700 bg-emerald-500/10 border-emerald-500/25" },
  pending:   { icon: Clock,       label: "Pending",   dark: "text-amber-400 bg-amber-400/10 border-amber-400/20", light: "text-amber-700 bg-amber-500/10 border-amber-500/25" },
  cancelled: { icon: XCircle,     label: "Cancelled", dark: "text-red-400 bg-red-400/10 border-red-400/20", light: "text-red-700 bg-red-500/10 border-red-500/25" },
};

function BookingCard({ booking, isLightTheme }) {
  const status = STATUS_STYLES[booking.status] ?? STATUS_STYLES.pending;
  const StatusIcon = status.icon;
  return (
    <div className={`rounded-xl border p-4 ${isLightTheme ? "border-(--border) bg-(--surface)" : "border-white/10 bg-white/5"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`font-semibold truncate ${isLightTheme ? "text-foreground" : "text-white"}`}>{booking.packageTitle}</p>
          <p className={`text-xs mt-1 ${isLightTheme ? "text-(--muted)" : "text-white/50"}`}>
            Booked on {new Date(booking.bookedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
          </p>
          {booking.travelDate && (
            <p className={`text-xs mt-1 flex items-center gap-1 ${isLightTheme ? "text-amber-700" : "text-amber-300/80"}`}>
              <Calendar className="h-3 w-3" />
              Travel: {new Date(booking.travelDate + "T00:00:00").toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          )}
          {booking.travelers && (
            <p className={`text-xs mt-1 ${isLightTheme ? "text-(--muted)" : "text-white/50"}`}>{booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}</p>
          )}
        </div>
        <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${isLightTheme ? status.light : status.dark}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </span>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon: Icon, isLightTheme, capitalize, breakAll }) {
  return (
    <div className={`rounded-lg border p-4 ${isLightTheme ? "border-(--border) bg-(--surface)" : "border-white/10 bg-white/5"}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 flex items-center gap-2 ${isLightTheme ? "text-(--muted)" : "text-white/60"}`}>
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <p className={`text-lg font-semibold ${isLightTheme ? "text-foreground" : "text-white"} ${capitalize ? "capitalize" : ""} ${breakAll ? "break-all" : ""}`}>
        {value}
      </p>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, isAdmin, logout, loading, updateProfile } = useAuth();
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [isEditingDob, setIsEditingDob] = useState(false);
  const [dobValue, setDobValue] = useState("");
  const [dobSaving, setDobSaving] = useState(false);
  const [dobError, setDobError] = useState("");
  const [dobSuccess, setDobSuccess] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user?.dateOfBirth) {
      setDobValue(user.dateOfBirth);
    } else {
      setDobValue("");
    }
    setDobError("");
    setDobSuccess("");
    setIsEditingDob(false);
  }, [user?.dateOfBirth]);

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
      <div
        className={`min-h-screen flex items-center justify-center bg-linear-to-br ${
          isLightTheme ? "from-(--surface-strong) via-background to-(--surface-strong)" : "from-slate-950 via-slate-900 to-slate-950"
        }`}
      >
        <div className={isLightTheme ? "text-foreground" : "text-white"}>Loading...</div>
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

  const maxDobDate = new Date();
  maxDobDate.setFullYear(maxDobDate.getFullYear() - 5);
  const maxDobDateStr = maxDobDate.toISOString().split("T")[0];

  const handleDobSave = async () => {
    if (!dobValue) {
      setDobError("Please select your date of birth.");
      return;
    }

    try {
      setDobSaving(true);
      setDobError("");
      setDobSuccess("");
      await updateProfile({ dateOfBirth: dobValue });
      setDobSuccess("Date of birth updated successfully.");
      setIsEditingDob(false);
    } catch (err) {
      setDobError(err.message || "Failed to update date of birth.");
    } finally {
      setDobSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-linear-to-br ${
        isLightTheme ? "from-(--surface-strong) via-background to-(--surface-strong)" : "from-slate-950 via-slate-900 to-slate-950"
      }`}
    >
      {/* Navigation */}
      <Navbar />
      <div className={`px-4 py-3 ${isLightTheme ? "bg-(--surface-strong)" : "bg-slate-950/40"}`}>
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.back()}
            className={`transition flex items-center gap-2 text-sm ${isLightTheme ? "text-(--muted) hover:text-foreground" : "text-white/70 hover:text-white"}`}
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
          <div className={`rounded-3xl border backdrop-blur-xl p-8 shadow-2xl ${isLightTheme ? "border-(--border) bg-(--surface)" : "border-white/10 bg-white/5"}`}>
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-2 ring-amber-300/20 mb-4">
                <User className="h-8 w-8" />
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${isLightTheme ? "text-foreground" : "text-white"}`}>My Account</h1>
              <p className={isLightTheme ? "text-(--muted)" : "text-white/60"}>Your profile information</p>
            </div>

            {/* User Info */}
            <div className="space-y-4 mb-8">
              <InfoRow label="Full Name" value={user.name || "Traveler"} isLightTheme={isLightTheme} />

              <div className="space-y-2">
                <InfoRow
                  label="Date of Birth"
                  icon={Calendar}
                  isLightTheme={isLightTheme}
                  value={
                    user.dateOfBirth
                      ? new Date(user.dateOfBirth + "T00:00:00").toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                      : "Not added yet"
                  }
                />

                {!isEditingDob ? (
                  <button
                    type="button"
                    onClick={() => {
                      setDobValue(user.dateOfBirth || "");
                      setDobError("");
                      setDobSuccess("");
                      setIsEditingDob(true);
                    }}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${isLightTheme ? "border-(--border) bg-(--surface) text-foreground hover:bg-(--surface-strong)" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"}`}
                  >
                    <Pencil className="h-4 w-4" />
                    {user.dateOfBirth ? "Change Date of Birth" : "Add Date of Birth"}
                  </button>
                ) : (
                  <div className={`rounded-lg border p-4 ${isLightTheme ? "border-(--border) bg-(--surface)" : "border-white/10 bg-white/5"}`}>
                    <label className={`mb-2 block text-xs font-semibold uppercase tracking-wide ${isLightTheme ? "text-(--muted)" : "text-white/60"}`}>
                      Select Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dobValue}
                      max={maxDobDateStr}
                      onChange={(e) => {
                        setDobValue(e.target.value);
                        setDobError("");
                        setDobSuccess("");
                      }}
                      className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${isLightTheme ? "border-(--border) bg-background text-foreground" : "border-white/10 bg-slate-950/60 text-white"}`}
                    />
                    {dobError && <p className="mt-2 text-sm text-red-500">{dobError}</p>}
                    {dobSuccess && <p className="mt-2 text-sm text-emerald-500">{dobSuccess}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleDobSave}
                        disabled={dobSaving}
                        className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:opacity-60"
                      >
                        {dobSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDobValue(user.dateOfBirth || "");
                          setDobError("");
                          setDobSuccess("");
                          setIsEditingDob(false);
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium ${isLightTheme ? "border-(--border) text-foreground" : "border-white/10 text-white/80"}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {user.gender && (
                <InfoRow label="Gender" value={user.gender} isLightTheme={isLightTheme} capitalize />
              )}

              {user.phoneNumber && (
                <InfoRow label="Phone Number" icon={Phone} value={user.phoneNumber} isLightTheme={isLightTheme} />
              )}

              {user.email && (
                <InfoRow label="Email" icon={Mail} value={user.email} isLightTheme={isLightTheme} breakAll />
              )}

              <InfoRow
                label="Member Since"
                isLightTheme={isLightTheme}
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                    : "Recently"
                }
              />
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
                isLightTheme
                  ? "bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-700"
                  : "bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200"
              }`}
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

            {/* Admin dashboard shortcut — only for admin users */}
            {isAdmin && (
              <Link
                href="/admin/bookings"
                className={`mt-3 flex items-center justify-center gap-2 w-full rounded-lg border border-amber-400/20 bg-amber-400/5 hover:bg-amber-400/10 font-semibold py-3 transition text-sm ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Booking History Card */}
          <div className={`rounded-3xl border backdrop-blur-xl p-8 shadow-2xl ${isLightTheme ? "border-(--border) bg-(--surface)" : "border-white/10 bg-white/5"}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                <Package className="h-5 w-5" />
              </span>
              <div>
                <h2 className={`text-xl font-bold ${isLightTheme ? "text-foreground" : "text-white"}`}>Booking History</h2>
                <p className={`text-sm ${isLightTheme ? "text-(--muted)" : "text-white/50"}`}>
                  {bookingsLoading
                    ? "Loading booking history..."
                    : bookings.length > 0
                    ? `${bookings.length} booking${bookings.length > 1 ? "s" : ""} found`
                    : "No bookings yet"}
                </p>
              </div>
            </div>

            {bookingsLoading ? (
              <div className={`flex items-center justify-center py-10 text-sm ${isLightTheme ? "text-(--muted)" : "text-white/50"}`}>
                Loading booking history...
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings
                  .slice()
                  .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
                  .map((booking, i) => (
                    <BookingCard key={booking.id ?? i} booking={booking} isLightTheme={isLightTheme} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className={`flex h-16 w-16 items-center justify-center rounded-full mb-4 ${isLightTheme ? "bg-(--surface) text-(--muted)" : "bg-white/5 text-white/20"}`}>
                  <AlertCircle className="h-8 w-8" />
                </span>
                <p className={`font-medium ${isLightTheme ? "text-foreground" : "text-white/50"}`}>No bookings found</p>
                <p className={`text-sm mt-1 ${isLightTheme ? "text-(--muted)" : "text-white/30"}`}>Your tour bookings will appear here once confirmed.</p>
                <Link
                  href="/tours"
                  className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/20 px-5 py-2.5 text-sm font-semibold transition ${isLightTheme ? "text-amber-700" : "text-amber-300"}`}
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

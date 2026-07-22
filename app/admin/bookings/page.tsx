"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import type { Booking } from "@/app/types/booking";
import { BOOKING_STATUS_CONFIG, type BookingStatus } from "@/app/lib/bookingStatus";
import {
  Search, Filter, ChevronLeft, ChevronRight, Plane, LogOut,
  Package, Clock, CheckCircle, XCircle, AlertCircle, Users, Calendar, Phone, Mail,
  RefreshCw,
} from "lucide-react";

type BookingFilterStatus = "all" | BookingStatus;

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badgeClass}`}>
      {cfg.label}
    </span>
  );
}

function fmtDate(d: string | Date | null | undefined) {
  if (!d) return "—";

  try {
    const parsed = d instanceof Date ? d : new Date(`${d}T00:00:00`);
    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(d);
  }
}

function fmtDateTime(iso: string | Date | null | undefined) {
  if (!iso) return "—";

  try {
    const parsed = iso instanceof Date ? iso : new Date(iso);
    return parsed.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(iso);
  }
}

const STATUSES: BookingFilterStatus[] = [
  "all",
  "pending",
  "contacted",
  "confirmed",
  "payment_pending",
  "paid",
  "cancelled",
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminBookingsPage() {
  const router = useRouter();
  const { user, isAdmin, loading, logout } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<BookingFilterStatus>("all");

  // Require admin — layout already guards, this is a fallback
  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/auth/login"); return; }
    if (!isAdmin) router.replace("/?error=unauthorized");
  }, [loading, user, isAdmin, router]);

  const fetchBookings = useCallback(async () => {
    setFetching(true);
    try {
      const params = new URLSearchParams({ page: String(page), status });
      if (search) params.set("search", search);
      const res = await fetch(`/api/bookings?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      setBookings([]);
    } finally {
      setFetching(false);
    }
  }, [page, search, status]);

  useEffect(() => { if (user) fetchBookings(); }, [user, fetchBookings]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  }

  function changeStatus(s: BookingFilterStatus) {
    setStatus(s);
    setPage(1);
  }

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top Nav */}
      <div className="sticky top-0 z-50 px-4 py-4 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
              <Plane className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold leading-none">Cholo Jai Dure</p>
              <p className="text-xs text-amber-300/70 leading-none mt-0.5">Admin Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/users"
              className="hidden sm:flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs text-white/70 hover:text-white transition"
            >
              <Users className="h-3.5 w-3.5" />
              Manage Admins
            </Link>
            <button
              onClick={fetchBookings}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs text-white/70 hover:text-white transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${fetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <span className="text-xs text-white/40">Hi, {user.name?.split(" ")[0]}</span>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 text-xs text-red-300 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Booking Requests</h1>
            <p className="text-white/50 text-sm mt-1">
              {fetching ? "Fetching..." : `${total} booking${total !== 1 ? "s" : ""} found`}
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by booking ID, name, phone, package, email…"
                className="w-full rounded-xl border border-white/15 bg-white/5 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-300 transition"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-4 py-2.5 text-sm transition"
            >
              Search
            </button>
            {(search || status !== "all") && (
              <button
                type="button"
                onClick={() => { setSearch(""); setSearchInput(""); setStatus("all"); setPage(1); }}
                className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 px-3 py-2.5 text-sm transition"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition capitalize ${
                status === s
                  ? "bg-amber-400 border-amber-400 text-slate-900"
                  : "border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {s === "all" ? "All" : BOOKING_STATUS_CONFIG[s]?.label ?? s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {fetching ? (
            <div className="flex items-center justify-center py-16 text-white/40">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="h-10 w-10 text-white/20 mb-3" />
              <p className="text-white/50 font-medium">No bookings found</p>
              <p className="text-white/30 text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Booking ID", "Customer", "Package", "Travel Date", "Travelers", "Phone", "Status", "Created"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map((b) => (
                      <tr
                        key={b.id}
                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                        className="hover:bg-white/5 cursor-pointer transition group"
                      >
                        <td className="px-4 py-3">
                          <span className="text-amber-300 font-mono text-xs font-semibold group-hover:text-amber-200">
                            {b.bookingId}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white text-sm font-medium">{b.customerName}</p>
                          <p className="text-white/40 text-xs">{b.email}</p>
                        </td>
                        <td className="px-4 py-3 text-white/70 text-sm max-w-[160px] truncate">{b.packageName}</td>
                        <td className="px-4 py-3 text-white/70 text-sm whitespace-nowrap">{fmtDate(b.travelDate)}</td>
                        <td className="px-4 py-3 text-white/70 text-sm text-center">{b.totalTravelers}</td>
                        <td className="px-4 py-3 text-white/70 text-sm">{b.phone}</td>
                        <td className="px-4 py-3"><StatusBadge status={b.bookingStatus} /></td>
                        <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{fmtDateTime(b.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-white/10">
                {bookings.map((b) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`} className="block p-4 hover:bg-white/5 transition">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-amber-300 font-mono text-xs font-semibold">{b.bookingId}</span>
                      <StatusBadge status={b.bookingStatus} />
                    </div>
                    <p className="text-white font-semibold text-sm">{b.customerName}</p>
                    <p className="text-white/50 text-xs mt-0.5">{b.packageName}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-white/40">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{fmtDate(b.travelDate)}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{b.totalTravelers} travelers</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{b.phone}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-white/40 text-sm">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 text-sm text-white transition"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 text-sm text-white transition"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

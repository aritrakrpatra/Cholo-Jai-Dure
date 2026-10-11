"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import type { Booking } from "@/app/types/booking";
import { BOOKING_STATUS_CONFIG, type BookingStatus } from "@/app/lib/bookingStatus";
import Image from "next/image";
import ThemeToggle from "@/app/components/ThemeToggle";
import {
  Search, Filter, ChevronLeft, ChevronRight, LogOut,
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
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-[var(--muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Top Nav */}
      <div className="sticky top-0 z-50 px-4 py-4 backdrop-blur-xl bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-[var(--foreground)]">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-amber-300/20">
              <Image src="/cjd%20logo.jpg" alt="Cholo Jai Dure logo" width={36} height={36} className="h-full w-full object-cover" />
            </span>
            <div>
              <p className="text-sm font-bold leading-none">Cholo Jai Dure</p>
              <p className="text-xs text-[var(--accent)] leading-none mt-0.5">Admin Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle align="right" />
            <Link
              href="/admin/users"
              className="hidden sm:flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] hover:bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              <Users className="h-3.5 w-3.5" />
              Manage Admins
            </Link>
            <button
              onClick={fetchBookings}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] hover:bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${fetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <span className="text-xs text-[var(--muted)]">Hi, {user.name?.split(" ")[0]}</span>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 text-xs text-red-500 transition"
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
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Booking Requests</h1>
            <p className="text-[var(--muted)] text-sm mt-1">
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
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-9 pr-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-slate-900 font-semibold px-4 py-2.5 text-sm transition"
            >
              Search
            </button>
            {(search || status !== "all") && (
              <button
                type="button"
                onClick={() => { setSearch(""); setSearchInput(""); setStatus("all"); setPage(1); }}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-strong)] text-[var(--muted)] px-3 py-2.5 text-sm transition"
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
                  ? "bg-[var(--accent)] border-[var(--accent)] text-slate-900"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border)]"
              }`}
            >
              {s === "all" ? "All" : BOOKING_STATUS_CONFIG[s]?.label ?? s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] overflow-hidden shadow-[var(--shadow-elevated)]">
          {fetching ? (
            <div className="flex items-center justify-center py-16 text-[var(--muted)]">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="h-10 w-10 text-[var(--muted)] mb-3" />
              <p className="text-[var(--foreground)] font-medium">No bookings found</p>
              <p className="text-[var(--muted)] text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      {["Booking ID", "Customer", "Package", "Travel Date", "Travelers", "Phone", "Status", "Created"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {bookings.map((b) => (
                      <tr
                        key={b.id}
                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                        className="hover:bg-[var(--surface)] cursor-pointer transition group"
                      >
                        <td className="px-4 py-3">
                          <span className="text-[var(--accent)] font-mono text-xs font-semibold group-hover:text-[var(--accent-strong)]">
                            {b.bookingId}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-[var(--foreground)] text-sm font-medium">{b.customerName}</p>
                          <p className="text-[var(--muted)] text-xs">{b.email}</p>
                        </td>
                        <td className="px-4 py-3 text-[var(--muted)] text-sm max-w-[160px] truncate">{b.packageName}</td>
                        <td className="px-4 py-3 text-[var(--muted)] text-sm whitespace-nowrap">{fmtDate(b.travelDate)}</td>
                        <td className="px-4 py-3 text-[var(--muted)] text-sm text-center">{b.totalTravelers}</td>
                        <td className="px-4 py-3 text-[var(--muted)] text-sm">{b.phone}</td>
                        <td className="px-4 py-3"><StatusBadge status={b.bookingStatus} /></td>
                        <td className="px-4 py-3 text-[var(--muted)] text-xs whitespace-nowrap">{fmtDateTime(b.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-[var(--border)]">
                {bookings.map((b) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`} className="block p-4 hover:bg-[var(--surface)] transition">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[var(--accent)] font-mono text-xs font-semibold">{b.bookingId}</span>
                      <StatusBadge status={b.bookingStatus} />
                    </div>
                    <p className="text-[var(--foreground)] font-semibold text-sm">{b.customerName}</p>
                    <p className="text-[var(--muted)] text-xs mt-0.5">{b.packageName}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-[var(--muted)]">
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
            <p className="text-[var(--muted)] text-sm">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-strong)] disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 text-sm text-[var(--foreground)] transition"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-strong)] disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 text-sm text-[var(--foreground)] transition"
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

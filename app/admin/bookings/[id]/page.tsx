"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  BOOKING_FLOW_STEPS,
  BOOKING_STATUS_CONFIG,
  BOOKING_STATUSES,
  bookingStatusLabel,
  getAllowedNextStatuses,
  isBookingStatus,
  isTerminalBookingStatus,
  type BookingStatus,
} from "@/app/lib/bookingStatus";
import type { Booking, BookingStatusHistoryEntry } from "@/app/types/booking";
import {
  ArrowLeft, Plane, Phone, Mail, MapPin, Calendar, Users, Package,
  FileText, Clock, CheckCircle, XCircle, DollarSign, MessageSquare,
  Trash2, Loader2, AlertCircle, User, Building2, Save,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(d: string | Date | null | undefined) {
  if (!d) return "—";

  try {
    const parsed = d instanceof Date ? d : new Date(`${d}T00:00:00`);
    return parsed.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${cfg.badgeClass}`}>
      {cfg.label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: any }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-amber-300 mt-0.5">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-white/40 uppercase tracking-wide">{label}</p>
        <p className="text-white font-medium text-sm mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

function normalizeStatusHistory(entries: any[] | undefined): BookingStatusHistoryEntry[] {
  if (!Array.isArray(entries)) return [];

  return entries
    .map((entry) => {
      if (entry?.toStatus && isBookingStatus(entry.toStatus)) {
        return {
          fromStatus: isBookingStatus(entry.fromStatus) ? entry.fromStatus : null,
          toStatus: entry.toStatus,
          changedAt: entry.changedAt || new Date().toISOString(),
          changedByUserId: entry.changedByUserId ?? null,
          changedByName: entry.changedByName ?? null,
          note: entry.note ?? null,
        };
      }

      if (entry?.status && isBookingStatus(entry.status)) {
        return {
          fromStatus: null,
          toStatus: entry.status,
          changedAt: entry.changedAt || new Date().toISOString(),
          changedByUserId: null,
          changedByName: null,
          note: null,
        };
      }

      return null;
    })
    .filter(Boolean) as BookingStatusHistoryEntry[];
}

function getStatusActionMeta(status: BookingStatus) {
  const mapping: Record<BookingStatus, { label: string; icon: any; color: string }> = {
    pending: {
      label: "Set Pending",
      icon: Clock,
      color: "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/25 text-amber-300",
    },
    contacted: {
      label: "Mark as Contacted",
      icon: MessageSquare,
      color: "bg-blue-500/15 hover:bg-blue-500/25 border-blue-500/25 text-blue-300",
    },
    confirmed: {
      label: "Confirm Booking",
      icon: CheckCircle,
      color: "bg-green-500/15 hover:bg-green-500/25 border-green-500/25 text-green-300",
    },
    payment_pending: {
      label: "Mark Payment Pending",
      icon: DollarSign,
      color: "bg-orange-500/15 hover:bg-orange-500/25 border-orange-500/25 text-orange-300",
    },
    paid: {
      label: "Mark as Paid",
      icon: CheckCircle,
      color: "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/25 text-emerald-300",
    },
    cancelled: {
      label: "Cancel Booking",
      icon: XCircle,
      color: "bg-red-500/15 hover:bg-red-500/25 border-red-500/25 text-red-300",
    },
  };

  return mapping[status];
}

function buildTimeline(booking: Booking) {
  const history = normalizeStatusHistory(booking.statusHistory)
    .slice()
    .sort((a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime());

  const findChangedAt = (status: BookingStatus) => history.find((entry) => entry.toStatus === status)?.changedAt || null;

  const items = [
    {
      key: "created",
      label: "Booking Created",
      changedAt: booking.createdAt,
      completed: true,
      current: booking.bookingStatus === "pending",
      dotClass: "bg-amber-400",
    },
    ...BOOKING_FLOW_STEPS.filter((step) => step !== "pending").map((step) => ({
      key: step,
      label: BOOKING_STATUS_CONFIG[step].label,
      changedAt: findChangedAt(step),
      completed: Boolean(findChangedAt(step)),
      current: booking.bookingStatus === step,
      dotClass: BOOKING_STATUS_CONFIG[step].dotClass,
    })),
  ];

  const cancelledAt = findChangedAt("cancelled");
  if (cancelledAt) {
    items.push({
      key: "cancelled",
      label: BOOKING_STATUS_CONFIG.cancelled.label,
      changedAt: cancelledAt,
      completed: true,
      current: booking.bookingStatus === "cancelled",
      dotClass: BOOKING_STATUS_CONFIG.cancelled.dotClass,
    });
  }

  return items;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { user, loading } = useAuth();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<BookingStatus | null>(null);
  const [statusNote, setStatusNote] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [loading, user, router]);

  const fetchBooking = useCallback(async () => {
    if (!id) return;
    setFetching(true);
    setError("");
    try {
      const res = await fetch(`/api/bookings/${id}`);
      if (!res.ok) throw new Error("Not found");
      const data = (await res.json()) as { booking: Booking };
      setBooking(data.booking);
      setAdminNotes(data.booking.adminNotes || "");
    } catch {
      setError("Booking not found or failed to load.");
    } finally {
      setFetching(false);
    }
  }, [id]);

  useEffect(() => { if (user) fetchBooking(); }, [user, fetchBooking]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const allowedNextStatuses = useMemo(() => {
    if (!booking) return [] as BookingStatus[];
    return getAllowedNextStatuses(booking.bookingStatus);
  }, [booking]);

  const statusHistory = useMemo(() => {
    if (!booking) return [] as BookingStatusHistoryEntry[];
    return normalizeStatusHistory(booking.statusHistory)
      .slice()
      .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
  }, [booking]);

  const timeline = useMemo(() => {
    if (!booking) return [];
    return buildTimeline(booking);
  }, [booking]);

  function openStatusConfirmation(status: BookingStatus) {
    setPendingStatus(status);
    setStatusNote("");
    setShowStatusConfirm(true);
  }

  async function updateStatus(newStatus: BookingStatus, note: string) {
    setUpdating(newStatus);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingStatus: newStatus, statusNote: note || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      await fetchBooking();
      showToast(`Status updated to "${bookingStatusLabel(newStatus)}"`);
    } catch {
      showToast("Failed to update status. Please try again.");
    } finally {
      setUpdating("");
      setShowStatusConfirm(false);
      setPendingStatus(null);
      setStatusNote("");
    }
  }

  async function saveNotes() {
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes }),
      });
      if (!res.ok) throw new Error();
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
      showToast("Notes saved.");
    } catch {
      showToast("Failed to save notes.");
    } finally {
      setSavingNotes(false);
    }
  }

  async function deleteBooking() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.replace("/admin/bookings");
    } catch {
      showToast("Failed to delete booking.");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  // ── render ──

  if (loading || (!booking && fetching)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <p className="text-white font-semibold">{error}</p>
        <Link href="/admin/bookings" className="text-amber-300 hover:text-amber-200 text-sm">
          ← Back to Bookings
        </Link>
      </div>
    );
  }

  if (!booking) return null;

  const waContact = booking.whatsapp || booking.phone;
  const waMsg = encodeURIComponent(`Hi ${booking.customerName}, this is regarding your booking ${booking.bookingId} for ${booking.packageName}. `);
  const waLink = `https://wa.me/${waContact.replace(/[^0-9]/g, "")}?text=${waMsg}`;
  const isFinalStatus = isTerminalBookingStatus(booking.bookingStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-slate-800 border border-white/15 px-5 py-3 shadow-xl text-white text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-white/10 p-6">
            <h3 className="text-white font-bold text-lg mb-2">Delete Booking?</h3>
            <p className="text-white/60 text-sm mb-6">
              This will permanently delete booking <span className="text-amber-300 font-mono">{booking.bookingId}</span>. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white py-2.5 text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteBooking}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-60 text-white font-bold py-2.5 text-sm transition flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status confirmation modal */}
      {showStatusConfirm && pendingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 p-6">
            <h3 className="text-white font-bold text-lg mb-2">Confirm Status Change</h3>
            <p className="text-white/60 text-sm mb-3">
              Change status from <span className="text-amber-300">{bookingStatusLabel(booking.bookingStatus)}</span> to <span className="text-amber-300">{bookingStatusLabel(pendingStatus)}</span>?
            </p>
            <textarea
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Optional note for this status change"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-300 transition resize-none"
            />
            <div className="mt-2 text-right text-xs text-white/35">{statusNote.length}/500</div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowStatusConfirm(false);
                  setPendingStatus(null);
                  setStatusNote("");
                }}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white py-2.5 text-sm transition"
              >
                Back
              </button>
              <button
                onClick={() => updateStatus(pendingStatus, statusNote)}
                disabled={!!updating}
                className="flex-1 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-900 font-bold py-2.5 text-sm transition flex items-center justify-center gap-2"
              >
                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="sticky top-0 z-40 px-4 py-4 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/bookings" className="flex items-center gap-2 text-white/60 hover:text-white transition text-sm">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">All Bookings</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-amber-300 font-mono text-sm font-semibold">{booking.bookingId}</span>
          </div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <Plane className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline text-sm font-semibold">Cholo Jai Dure</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-white">Booking Detail</h1>
              <StatusBadge status={booking.bookingStatus} />
            </div>
            <p className="text-white/40 text-sm mt-1">
              Submitted on {fmtDateTime(booking.createdAt)}
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-red-300 px-4 py-2 text-sm font-semibold transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete Booking
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Customer Info */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-amber-300" /> Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow icon={User}    label="Full Name"      value={booking.customerName} />
                <InfoRow icon={Mail}    label="Email"          value={booking.email} />
                <InfoRow icon={Phone}   label="Phone"          value={booking.phone} />
                <InfoRow icon={MessageSquare} label="WhatsApp" value={booking.whatsapp || "Same as phone"} />
                <InfoRow icon={Building2} label="City"         value={booking.city} />
              </div>
            </div>

            {/* Booking Info */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-amber-300" /> Booking Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow icon={Package}  label="Package"        value={booking.packageName} />
                <InfoRow icon={Calendar} label="Travel Date"    value={fmtDate(booking.travelDate)} />
                <InfoRow icon={Users}    label="Adults"         value={booking.adults} />
                <InfoRow icon={Users}    label="Children"       value={booking.children ?? 0} />
                <InfoRow icon={Users}    label="Total Travelers" value={booking.totalTravelers} />
                <InfoRow icon={MapPin}   label="Pickup Location" value={booking.pickupLocation} />
              </div>
              {booking.specialRequests && (
                <div className="mt-4">
                  <InfoRow icon={FileText} label="Special Requests" value={booking.specialRequests} />
                </div>
              )}
            </div>

            {/* Admin Notes */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-300" /> Admin Notes
              </h2>
              <textarea
                value={adminNotes}
                onChange={(e) => { setAdminNotes(e.target.value); setNotesSaved(false); }}
                rows={3}
                placeholder="Internal notes, follow-up reminders, payment details…"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-300 transition resize-none"
                maxLength={1000}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white px-4 py-2 text-sm font-semibold transition"
                >
                  {savingNotes ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  {notesSaved ? "Saved!" : "Save Notes"}
                </button>
              </div>
            </div>
          </div>

          {/* Right — actions + history */}
          <div className="space-y-4">
            {/* Quick contact */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-3">Quick Contact</h2>
              <div className="space-y-2">
                <a
                  href={`tel:${booking.phone}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-white text-sm transition"
                >
                  <Phone className="h-4 w-4 text-amber-300" />
                  Call Customer
                </a>
                <a
                  href={`mailto:${booking.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-white text-sm transition"
                >
                  <Mail className="h-4 w-4 text-amber-300" />
                  Send Email
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 hover:bg-green-500/15 px-4 py-3 text-green-300 text-sm transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Customer
                </a>
              </div>
            </div>

            {/* Status Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-3">Update Status</h2>
              {isFinalStatus && (
                <p className="text-xs text-white/45 mb-3">
                  This booking is in a final state. Further transitions are disabled.
                </p>
              )}
              <div className="space-y-2">
                {BOOKING_STATUSES.filter((status) => status !== "pending").map((status) => {
                  const action = getStatusActionMeta(status);
                  const isCurrent = booking.bookingStatus === status;
                  const isAllowed = allowedNextStatuses.includes(status);
                  const disabled = !!updating || isCurrent || !isAllowed;
                  const Icon = action.icon;

                  return (
                    <button
                      key={status}
                      onClick={() => openStatusConfirmation(status)}
                      disabled={disabled}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed ${action.color}`}
                    >
                      {updating === status ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                      {action.label}
                      {isCurrent && <span className="ml-auto text-xs opacity-60">Current</span>}
                      {!isCurrent && !isAllowed && <span className="ml-auto text-xs opacity-60">Unavailable</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-300" /> Status Timeline
              </h2>
              <div className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.key} className="flex items-start gap-3">
                    <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${item.completed ? item.dotClass : "bg-white/20"}`} />
                    <div>
                      <p className={`text-sm ${item.current ? "text-white font-semibold" : "text-white/80"}`}>{item.label}</p>
                      <p className="text-white/40 text-xs">{item.changedAt ? fmtDateTime(item.changedAt) : "Not reached"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status History */}
            {statusHistory.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-300" /> Booking History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider">
                        <th className="text-left py-2 pr-3">Previous</th>
                        <th className="text-left py-2 pr-3">New</th>
                        <th className="text-left py-2 pr-3">Changed By</th>
                        <th className="text-left py-2 pr-3">Timestamp</th>
                        <th className="text-left py-2">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {statusHistory.map((entry, idx) => (
                        <tr key={`${entry.changedAt}-${idx}`}>
                          <td className="py-2 pr-3 text-white/70">
                            {entry.fromStatus ? bookingStatusLabel(entry.fromStatus) : "—"}
                          </td>
                          <td className="py-2 pr-3">
                            <StatusBadge status={entry.toStatus} />
                          </td>
                          <td className="py-2 pr-3 text-white/70">{entry.changedByName || entry.changedByUserId || "System"}</td>
                          <td className="py-2 pr-3 text-white/55">{fmtDateTime(entry.changedAt)}</td>
                          <td className="py-2 text-white/70">{entry.note || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

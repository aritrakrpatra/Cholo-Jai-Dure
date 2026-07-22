import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getBookingById, updateBooking, deleteBookingById } from "@/app/lib/bookings";
import { sendCustomerStatusUpdateEmail, sendAdminStatusUpdateEmail } from "@/app/lib/sendBookingEmails";
import { updateBookingInUserHistory, removeBookingFromUserHistory } from "@/app/lib/users";
import { canTransitionBookingStatus, isBookingStatus, type BookingStatus } from "@/app/lib/bookingStatus";
import { requireAdmin } from "@/app/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function buildAdminName(user: Awaited<ReturnType<typeof currentUser>>): string {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  return fullName || user?.username || user?.primaryEmailAddress?.emailAddress || "Admin";
}

// ─── GET /api/bookings/:id — public (used for success page & admin detail) ───

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });
  return NextResponse.json({ booking });
}

// ─── PATCH /api/bookings/:id — admin: update status or notes ─────────────────

export async function PATCH(request: Request, { params }: RouteContext) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = (await request.json()) as {
    bookingStatus?: unknown;
    adminNotes?: unknown;
    statusNote?: unknown;
  };
  const updates: { bookingStatus?: BookingStatus; adminNotes?: string } = {};
  const existingBooking = await getBookingById(id);
  if (!existingBooking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  const adminUser = await currentUser();
  const adminName = buildAdminName(adminUser);
  const userId = adminUser!.id;

  if (body.bookingStatus !== undefined) {
    if (!isBookingStatus(body.bookingStatus)) {
      return NextResponse.json({ message: "Invalid booking status." }, { status: 400 });
    }

    const nextStatus = body.bookingStatus;
    const currentStatus = existingBooking.bookingStatus;

    if (nextStatus !== currentStatus && !canTransitionBookingStatus(currentStatus, nextStatus)) {
      return NextResponse.json(
        {
          message: `Invalid status transition from ${currentStatus} to ${nextStatus}.`,
        },
        { status: 400 }
      );
    }

    updates.bookingStatus = nextStatus;
  }

  if (body.adminNotes !== undefined) {
    updates.adminNotes = String(body.adminNotes).slice(0, 1000);
  }

  const statusNote = body.statusNote !== undefined ? String(body.statusNote).trim().slice(0, 500) : null;

  const booking = await updateBooking(id, updates, {
    changedByUserId: userId,
    changedByName: adminName,
    note: statusNote,
  });
  if (!booking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  await updateBookingInUserHistory(booking);

  const previousStatus = existingBooking.bookingStatus;
  const newStatus = booking.bookingStatus;
  const shouldNotifyStatusChange =
    previousStatus !== newStatus && ["confirmed", "paid"].includes(newStatus);

  if (shouldNotifyStatusChange) {
    Promise.all([
      sendCustomerStatusUpdateEmail(booking, previousStatus).catch((e) =>
        console.error("[bookings PATCH] Customer status email failed:", e.message)
      ),
      sendAdminStatusUpdateEmail(booking, previousStatus).catch((e) =>
        console.error("[bookings PATCH] Admin status email failed:", e.message)
      ),
    ]);
  }

  return NextResponse.json({ booking });
}

// ─── DELETE /api/bookings/:id — admin: permanently remove a booking ──────────

export async function DELETE(_request: Request, { params }: RouteContext) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const existingBooking = await getBookingById(id);
  if (!existingBooking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  const deleted = await deleteBookingById(id);
  if (!deleted) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  await removeBookingFromUserHistory(existingBooking.bookingId);

  return NextResponse.json({ message: "Booking deleted successfully." });
}

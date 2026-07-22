import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { upsertUserFromClerk } from "@/app/lib/users";
import { getBookingsForCustomer } from "@/app/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDate(value) {
  if (!value) return null;
  const asDate = new Date(value);
  if (Number.isNaN(asDate.getTime())) return null;
  return asDate.toISOString().slice(0, 10);
}

function buildName(user) {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  return fullName || user?.username || user?.primaryEmailAddress?.emailAddress || "Traveler";
}

function isUpcomingBooking(booking) {
  if (!booking?.travelDate) return false;
  if (booking.bookingStatus === "cancelled") return false;

  const travelDate = new Date(booking.travelDate);
  if (Number.isNaN(travelDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return travelDate >= today;
}

function buildStats(bookingHistory) {
  const totalBookings = bookingHistory.length;
  const cancelledCount = bookingHistory.filter((item) => item.bookingStatus === "cancelled").length;
  const upcomingTrips = bookingHistory.filter(isUpcomingBooking).length;

  return {
    totalBookings,
    upcomingTrips,
    cancelledCount,
  };
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const profile = await upsertUserFromClerk({
      clerkUserId: user.id,
      name: buildName(user),
      email: user.primaryEmailAddress?.emailAddress || null,
      phoneNumber: user.unsafeMetadata?.phoneNumber || user.primaryPhoneNumber?.phoneNumber || null,
      gender: user.unsafeMetadata?.gender || null,
      dateOfBirth: normalizeDate(user.unsafeMetadata?.dateOfBirth),
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
    });

    let bookingHistory = Array.isArray(profile?.bookingHistory) ? profile.bookingHistory : [];

    // Fallback for older users whose booking history is not yet embedded in user docs.
    if (!bookingHistory.length) {
      bookingHistory = await getBookingsForCustomer({
        email: profile?.email || user.primaryEmailAddress?.emailAddress || "",
        phone: profile?.phoneNumber || user.primaryPhoneNumber?.phoneNumber || "",
      });
    }

    bookingHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json({
      user: profile,
      bookingHistory,
      stats: buildStats(bookingHistory),
    });
  } catch (error) {
    console.error("[users/me/summary GET]", error);
    return NextResponse.json({ message: "Failed to load user booking summary." }, { status: 500 });
  }
}

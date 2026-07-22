import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { readBookings, createBooking } from "@/app/lib/bookings";
import { generateBookingId, generateInternalId } from "@/app/lib/bookingId";
import { sendCustomerBookingEmail, sendAdminBookingEmail } from "@/app/lib/sendBookingEmails";
import { addBookingToUserHistory } from "@/app/lib/users";
import { requireAdmin } from "@/app/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-()\s]{7,20}$/;

// ─── GET /api/bookings — admin: list all bookings with filter + pagination ───

export async function GET(request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = (searchParams.get("search") || "").toLowerCase().trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = 20;

    let bookings = await readBookings();

    // Sort newest first
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (status !== "all") {
      bookings = bookings.filter((b) => b.bookingStatus === status);
    }

    if (search) {
      bookings = bookings.filter(
        (b) =>
          b.bookingId?.toLowerCase().includes(search) ||
          b.customerName?.toLowerCase().includes(search) ||
          b.phone?.toLowerCase().includes(search) ||
          b.packageName?.toLowerCase().includes(search) ||
          b.email?.toLowerCase().includes(search) ||
          b.city?.toLowerCase().includes(search)
      );
    }

    const total = bookings.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePages = Math.min(page, totalPages);
    const paginated = bookings.slice((safePages - 1) * limit, safePages * limit);

    return NextResponse.json({ bookings: paginated, total, page: safePages, totalPages });
  } catch (error) {
    console.error("[bookings GET]", error);
    return NextResponse.json({ message: "Failed to fetch bookings." }, { status: 500 });
  }
}

// ─── POST /api/bookings — public: create a new booking ──────────────────────

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Please log in to book a tour." }, { status: 401 });
    }

    const user = await currentUser();
    const authenticatedEmail = (user?.primaryEmailAddress?.emailAddress || "").trim().toLowerCase();
    if (!authenticatedEmail || !EMAIL_REGEX.test(authenticatedEmail)) {
      return NextResponse.json({ message: "Your account must have a valid email address to create a booking." }, { status: 400 });
    }

    const body = await request.json();

    // Sanitise & validate
    const customerName = (body.customerName || "").trim();
    const email = authenticatedEmail;
    const phone = (body.phone || "").trim();
    const packageId = (body.packageId || "").trim();
    const packageName = (body.packageName || "").trim();
    const travelDate = (body.travelDate || "").trim();
    const adults = parseInt(body.adults || "0", 10);
    const children = Math.max(0, parseInt(body.children || "0", 10));

    if (!customerName) return NextResponse.json({ message: "Full name is required." }, { status: 400 });
    if (!phone || !PHONE_REGEX.test(phone)) return NextResponse.json({ message: "A valid phone number is required." }, { status: 400 });
    if (!packageId || !packageName) return NextResponse.json({ message: "Package information is missing." }, { status: 400 });
    if (!travelDate) return NextResponse.json({ message: "Travel date is required." }, { status: 400 });
    if (!adults || adults < 1) return NextResponse.json({ message: "At least 1 adult traveler is required." }, { status: 400 });

    // Ensure travel date is in the future
    const travel = new Date(travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (travel < today) return NextResponse.json({ message: "Travel date must be today or in the future." }, { status: 400 });

    const bookingId = await generateBookingId();
    const id = generateInternalId();

    const booking = await createBooking({
      id,
      bookingId,
      packageId,
      packageName,
      customerName,
      email,
      phone,
      whatsapp: (body.whatsapp || "").trim(),
      city: (body.city || "").trim(),
      travelDate,
      adults,
      children,
      totalTravelers: adults + children,
      pickupLocation: (body.pickupLocation || "").trim(),
      specialRequests: (body.specialRequests || "").trim(),
      bookingStatus: "pending",
      adminNotes: "",
      createdByUserId: userId,
    });

    await addBookingToUserHistory({
      clerkUserId: userId,
      name: customerName,
      email,
      phoneNumber: phone,
      gender: user?.unsafeMetadata?.gender || null,
      dateOfBirth: user?.unsafeMetadata?.dateOfBirth || null,
      booking,
    });

    // Send emails in background — never block the booking response
    Promise.all([
      sendCustomerBookingEmail(booking).catch((e) =>
        console.error("[bookings POST] Customer email failed:", e.message)
      ),
      sendAdminBookingEmail(booking).catch((e) =>
        console.error("[bookings POST] Admin email failed:", e.message)
      ),
    ]);

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("[bookings POST]", error);
    return NextResponse.json({ message: "Failed to create booking. Please try again." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getBookingsForCustomer } from "@/app/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookings = await getBookingsForCustomer({
      email: user.primaryEmailAddress?.emailAddress || "",
      phone: user.primaryPhoneNumber?.phoneNumber || "",
    });

    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("[bookings/me GET]", error);
    return NextResponse.json({ message: "Failed to fetch booking history." }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { upsertUserFromClerk, updateUserByClerkId } from "@/app/lib/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PHONE_REGEX = /^[+]?[0-9\s\-()]{7,20}$/;

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

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error("[users/me GET]", error);
    return NextResponse.json({ message: "Failed to load user profile." }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updates = {};

    if (body.name !== undefined) {
      const name = String(body.name || "").trim();
      if (!name) {
        return NextResponse.json({ message: "Name cannot be empty." }, { status: 400 });
      }
      updates.name = name;
    }

    if (body.gender !== undefined) {
      const allowed = ["male", "female", "other", "prefer_not_to_say", ""];
      const gender = String(body.gender || "").trim().toLowerCase();
      if (!allowed.includes(gender)) {
        return NextResponse.json({ message: "Invalid gender." }, { status: 400 });
      }
      updates.gender = gender || null;
    }

    if (body.phoneNumber !== undefined) {
      const phoneNumber = String(body.phoneNumber || "").trim();
      if (phoneNumber && !PHONE_REGEX.test(phoneNumber)) {
        return NextResponse.json({ message: "Invalid phone number." }, { status: 400 });
      }
      updates.phoneNumber = phoneNumber || null;
    }

    if (body.dateOfBirth !== undefined) {
      const normalizedDob = normalizeDate(body.dateOfBirth);
      if (body.dateOfBirth && !normalizedDob) {
        return NextResponse.json({ message: "Invalid date of birth." }, { status: 400 });
      }
      updates.dateOfBirth = normalizedDob;
    }

    const updated = await updateUserByClerkId(user.id, updates);
    return NextResponse.json({ user: updated });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ message: "Email or phone already exists." }, { status: 409 });
    }

    console.error("[users/me PATCH]", error);
    return NextResponse.json({ message: "Failed to update profile." }, { status: 500 });
  }
}

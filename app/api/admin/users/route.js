import { NextResponse } from "next/server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { requireAdmin } from "@/app/lib/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/users
 * Lists all users (admin only).
 */
export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const client = await clerkClient();
    const response = await client.users.getUserList({ limit: 500, orderBy: "-created_at" });
    const users = response.data;
    const list = users.map((u) => ({
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username || "—",
      email: u.primaryEmailAddress?.emailAddress || null,
      role: u.publicMetadata?.role || "user",
      createdAt: u.createdAt,
    }));
    return NextResponse.json({ users: list });
  } catch (err) {
    console.error("[admin/users GET]", err);
    return NextResponse.json({ message: "Failed to fetch users." }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/users
 * Body: { targetUserId: string, role: "admin" | "user" }
 * Promotes or demotes a user (admin only).
 */
export async function PATCH(request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const caller = await currentUser();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON." }, { status: 400 });
  }

  const { targetUserId, role } = body;

  if (!targetUserId || typeof targetUserId !== "string") {
    return NextResponse.json({ message: "targetUserId is required." }, { status: 400 });
  }
  if (role !== "admin" && role !== "user") {
    return NextResponse.json({ message: "role must be 'admin' or 'user'." }, { status: 400 });
  }

  // Prevent removing your own admin role
  if (targetUserId === caller.id && role !== "admin") {
    return NextResponse.json({ message: "You cannot remove your own admin role." }, { status: 400 });
  }

  try {
    const client = await clerkClient();
    // updateUserMetadata merges publicMetadata — set role to null to remove it
    await client.users.updateUserMetadata(targetUserId, {
      publicMetadata: { role: role === "user" ? null : "admin" },
    });

    return NextResponse.json({ message: `User role updated to '${role}'.` });
  } catch (err) {
    console.error("[admin/users PATCH]", err);
    return NextResponse.json({ message: "Failed to update user role." }, { status: 500 });
  }
}

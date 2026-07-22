import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * requireAdmin() — Server-side admin guard for API route handlers.
 *
 * Usage in any route handler:
 *   const guard = await requireAdmin();
 *   if (guard) return guard;   // early-exit: returns 401 or 403 response
 *   // ...admin-only logic here
 *
 * Returns null when the caller IS an admin, so the handler can continue.
 * Returns a NextResponse (401 | 403) when the caller is not authorised.
 *
 * Role is read from Clerk publicMetadata.role ("admin").
 * This is set server-side only (Clerk Dashboard or /api/admin/users) so
 * users cannot elevate their own privileges.
 */
export async function requireAdmin() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized. Please sign in." }, { status: 401 });
  }

  if (user.publicMetadata?.role !== "admin") {
    return NextResponse.json(
      { message: "Forbidden. Admin access required." },
      { status: 403 }
    );
  }

  return null; // caller is an admin — proceed
}

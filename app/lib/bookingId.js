import { countBookingsByPrefix } from "./bookings";

/**
 * Generate a human-readable booking ID: CJD-YYYYMMDD-NNN
 * Sequence resets each calendar day (IST).
 */
export async function generateBookingId() {
  const now = new Date();
  // Use IST offset (+5:30) for consistent day boundaries
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const y = ist.getUTCFullYear();
  const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ist.getUTCDate()).padStart(2, "0");
  const prefix = `CJD-${y}${m}${d}-`;

  const todayCount = await countBookingsByPrefix(prefix);
  const seq = String(todayCount + 1).padStart(3, "0");

  return `${prefix}${seq}`;
}

/** Generate an internal opaque id for the booking record */
export function generateInternalId() {
  return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

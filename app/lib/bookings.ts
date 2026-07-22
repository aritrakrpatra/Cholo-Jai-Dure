import { getMongoDb } from "./mongodb";
import { isBookingStatus, type BookingStatus } from "./bookingStatus";
import type { Booking, BookingStatusHistoryEntry } from "@/app/types/booking";

const BOOKINGS_COLLECTION = "bookings";

type CreateBookingInput = Omit<Booking, "createdAt" | "updatedAt" | "statusHistory" | "mongoId">;

type BookingUpdates = Partial<
  Pick<
    Booking,
    "bookingStatus" | "adminNotes" | "email" | "phone" | "pickupLocation" | "specialRequests" | "city"
  >
>;

type StatusChangeMeta = {
  changedByUserId?: string | null;
  changedByName?: string | null;
  note?: string | null;
};

function normalizeEmail(value?: string | null) {
  return (value || "").trim().toLowerCase();
}

function normalizePhone(value?: string | null) {
  return (value || "").replace(/\D/g, "");
}

function normalizeLegacyHistory(entries: any[]): BookingStatusHistoryEntry[] {
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

function mapBookingDocument(document: any): Booking | null {
  if (!document) return null;
  const { _id, ...rest } = document;
  return {
    ...rest,
    statusHistory: normalizeLegacyHistory(rest.statusHistory || []),
    mongoId: _id?.toString() || null,
  } as Booking;
}

function getBookingFilter(id: string) {
  return { $or: [{ id }, { bookingId: id }] };
}

/** Read all bookings from MongoDB */
export async function readBookings(): Promise<Booking[]> {
  const db = await getMongoDb();
  const bookings = await db.collection(BOOKINGS_COLLECTION).find({}).toArray();
  return bookings.map(mapBookingDocument).filter(Boolean) as Booking[];
}

/** Find a booking by its internal `id` or human-readable `bookingId` */
export async function getBookingById(id: string): Promise<Booking | null> {
  const db = await getMongoDb();
  const booking = await db.collection(BOOKINGS_COLLECTION).findOne(getBookingFilter(id));
  return mapBookingDocument(booking);
}

/** Find bookings for a customer by email and/or phone */
export async function getBookingsForCustomer({
  email,
  phone,
}: {
  email?: string;
  phone?: string;
}): Promise<Booking[]> {
  const normalizedEmail = email?.trim().toLowerCase() || "";
  const normalizedPhone = phone?.replace(/\D/g, "") || "";

  const clauses = [];
  if (normalizedEmail) clauses.push({ emailNormalized: normalizedEmail });
  if (normalizedPhone) clauses.push({ phoneNormalized: normalizedPhone });
  if (!clauses.length) return [];

  const db = await getMongoDb();
  const bookings = await db.collection(BOOKINGS_COLLECTION).find({ $or: clauses }).toArray();
  return bookings.map(mapBookingDocument).filter(Boolean) as Booking[];
}

/** Persist a new booking */
export async function createBooking(data: CreateBookingInput): Promise<Booking> {
  const db = await getMongoDb();
  const now = new Date().toISOString();
  const initialStatus: BookingStatus = isBookingStatus(data.bookingStatus) ? data.bookingStatus : "pending";

  const booking = {
    ...data,
    bookingStatus: initialStatus,
    emailNormalized: normalizeEmail(data.email) || null,
    phoneNormalized: normalizePhone(data.phone) || null,
    statusHistory: [
      {
        fromStatus: null,
        toStatus: initialStatus,
        changedAt: now,
        changedByUserId: data.createdByUserId || null,
        changedByName: data.customerName || null,
        note: "Booking created",
      },
    ],
    createdAt: now,
    updatedAt: now,
  } satisfies Booking;

  await db.collection(BOOKINGS_COLLECTION).insertOne(booking);
  return booking;
}

/** Update a booking and append to status history when status changes */
export async function updateBooking(
  id: string,
  updates: BookingUpdates,
  meta: StatusChangeMeta = {}
): Promise<Booking | null> {
  const db = await getMongoDb();
  const collection = db.collection(BOOKINGS_COLLECTION);
  const existingRaw = await collection.findOne(getBookingFilter(id));
  const existing = mapBookingDocument(existingRaw);
  if (!existing) return null;

  const now = new Date().toISOString();
  const newStatusHistory = [...(existing.statusHistory || [])];

  if (updates.bookingStatus && updates.bookingStatus !== existing.bookingStatus) {
    newStatusHistory.push({
      fromStatus: existing.bookingStatus,
      toStatus: updates.bookingStatus,
      changedAt: now,
      changedByUserId: meta.changedByUserId ?? null,
      changedByName: meta.changedByName ?? null,
      note: meta.note || null,
    });
  }

  const merged: any = {
    ...updates,
    statusHistory: newStatusHistory,
    updatedAt: now,
  };

  if (updates.email !== undefined) {
    merged.emailNormalized = normalizeEmail(updates.email) || null;
  }

  if (updates.phone !== undefined) {
    merged.phoneNormalized = normalizePhone(updates.phone) || null;
  }

  await collection.updateOne(getBookingFilter(id), { $set: merged });
  const updated = await collection.findOne(getBookingFilter(id));
  return mapBookingDocument(updated);
}

/** Remove a booking from the store */
export async function deleteBookingById(id: string): Promise<boolean> {
  const db = await getMongoDb();
  const result = await db.collection(BOOKINGS_COLLECTION).deleteOne(getBookingFilter(id));
  return result.deletedCount > 0;
}

export async function countBookingsByPrefix(prefix: string): Promise<number> {
  const db = await getMongoDb();
  return db.collection(BOOKINGS_COLLECTION).countDocuments({
    bookingId: {
      $regex: `^${prefix}`,
    },
  });
}

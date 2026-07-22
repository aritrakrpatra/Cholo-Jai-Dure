import type { BookingStatus } from "@/app/lib/bookingStatus";

export type BookingStatusHistoryEntry = {
  fromStatus: BookingStatus | null;
  toStatus: BookingStatus;
  changedAt: string;
  changedByUserId: string | null;
  changedByName: string | null;
  note: string | null;
};

export type Booking = {
  id: string;
  bookingId: string;
  packageId: string;
  packageName: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  city?: string;
  travelDate: string;
  adults: number;
  children: number;
  totalTravelers: number;
  pickupLocation?: string;
  specialRequests?: string;
  bookingStatus: BookingStatus;
  adminNotes?: string;
  createdByUserId?: string;
  emailNormalized?: string | null;
  phoneNormalized?: string | null;
  createdAt: string;
  updatedAt: string;
  statusHistory: BookingStatusHistoryEntry[];
  mongoId?: string | null;
};

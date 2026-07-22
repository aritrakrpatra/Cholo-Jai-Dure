export const BOOKING_STATUSES = [
  "pending",
  "contacted",
  "confirmed",
  "payment_pending",
  "paid",
  "cancelled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type BookingStatusConfig = {
  label: string;
  badgeClass: string;
  dotClass: string;
};

export const BOOKING_STATUS_CONFIG: Record<BookingStatus, BookingStatusConfig> = {
  pending: {
    label: "Pending",
    badgeClass: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    dotClass: "bg-amber-400",
  },
  contacted: {
    label: "Contacted",
    badgeClass: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    dotClass: "bg-blue-400",
  },
  confirmed: {
    label: "Confirmed",
    badgeClass: "text-green-400 bg-green-400/10 border-green-400/25",
    dotClass: "bg-green-400",
  },
  payment_pending: {
    label: "Payment Pending",
    badgeClass: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    dotClass: "bg-orange-400",
  },
  paid: {
    label: "Paid",
    badgeClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    dotClass: "bg-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "text-red-400 bg-red-400/10 border-red-400/25",
    dotClass: "bg-red-400",
  },
};

export const BOOKING_ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["contacted", "cancelled"],
  contacted: ["confirmed", "cancelled"],
  confirmed: ["payment_pending", "cancelled"],
  payment_pending: ["paid", "cancelled"],
  paid: [],
  cancelled: [],
};

export const BOOKING_FLOW_STEPS: BookingStatus[] = [
  "pending",
  "contacted",
  "confirmed",
  "payment_pending",
  "paid",
];

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && BOOKING_STATUSES.includes(value as BookingStatus);
}

export function getAllowedNextStatuses(status: BookingStatus): BookingStatus[] {
  return BOOKING_ALLOWED_TRANSITIONS[status] || [];
}

export function canTransitionBookingStatus(from: BookingStatus, to: BookingStatus): boolean {
  return getAllowedNextStatuses(from).includes(to);
}

export function isTerminalBookingStatus(status: BookingStatus): boolean {
  return getAllowedNextStatuses(status).length === 0;
}

export function bookingStatusLabel(status: BookingStatus): string {
  return BOOKING_STATUS_CONFIG[status].label;
}

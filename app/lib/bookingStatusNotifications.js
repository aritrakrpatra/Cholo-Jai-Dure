const NOTIFIABLE_BOOKING_STATUSES = new Set([
  "contacted",
  "confirmed",
  "payment_pending",
  "paid",
  "cancelled",
]);

function logInfo(logger, message, meta) {
  if (typeof logger?.info === "function") {
    logger.info(message, meta);
  } else if (typeof logger?.log === "function") {
    logger.log(message, meta);
  }
}

function logError(logger, message, error, meta) {
  if (typeof logger?.error === "function") {
    logger.error(message, error, meta);
  }
}

export function shouldSendBookingStatusUpdateEmail(previousStatus, nextStatus, statusChanged) {
  if (!statusChanged) return false;
  if (!previousStatus || previousStatus === nextStatus) return false;
  return NOTIFIABLE_BOOKING_STATUSES.has(nextStatus);
}

export async function notifyBookingStatusChange({
  booking,
  previousStatus,
  statusChanged,
  sendCustomerStatusUpdateEmail,
  sendAdminStatusUpdateEmail,
  logger = console,
}) {
  if (!shouldSendBookingStatusUpdateEmail(previousStatus, booking?.bookingStatus, statusChanged)) {
    logInfo(logger, "[bookings PATCH] Skipping status emails.", {
      bookingId: booking?.bookingId || null,
      previousStatus: previousStatus || null,
      nextStatus: booking?.bookingStatus || null,
      statusChanged: !!statusChanged,
    });
    return { attempted: false };
  }

  logInfo(logger, "[bookings PATCH] Dispatching status emails.", {
    bookingId: booking.bookingId,
    previousStatus,
    nextStatus: booking.bookingStatus,
  });

  await Promise.allSettled([
    sendCustomerStatusUpdateEmail(booking, previousStatus).catch((error) =>
      logError(logger, "[bookings PATCH] Customer status email failed.", error, {
        bookingId: booking.bookingId,
        previousStatus,
        nextStatus: booking.bookingStatus,
      })
    ),
    sendAdminStatusUpdateEmail(booking, previousStatus).catch((error) =>
      logError(logger, "[bookings PATCH] Admin status email failed.", error, {
        bookingId: booking.bookingId,
        previousStatus,
        nextStatus: booking.bookingStatus,
      })
    ),
  ]);

  return { attempted: true };
}

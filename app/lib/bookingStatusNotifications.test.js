import test from "node:test";
import assert from "node:assert/strict";

import {
  notifyBookingStatusChange,
  shouldSendBookingStatusUpdateEmail,
} from "./bookingStatusNotifications.js";

function createBooking(overrides = {}) {
  return {
    id: "booking-1",
    bookingId: "CJD-001",
    packageName: "Darjeeling Tour",
    customerName: "Test Traveler",
    email: "traveler@example.com",
    bookingStatus: "contacted",
    updatedAt: "2026-07-31T00:00:00.000Z",
    ...overrides,
  };
}

function createLogger() {
  return {
    infoCalls: [],
    errorCalls: [],
    info(message, meta) {
      this.infoCalls.push({ message, meta });
    },
    error(message, error, meta) {
      this.errorCalls.push({ message, error, meta });
    },
  };
}

test("status emails are sent for qualifying status transitions", async () => {
  const calls = [];
  const logger = createLogger();
  const booking = createBooking({ bookingStatus: "confirmed" });

  const result = await notifyBookingStatusChange({
    booking,
    previousStatus: "contacted",
    statusChanged: true,
    sendCustomerStatusUpdateEmail: async (...args) => {
      calls.push(["customer", ...args]);
    },
    sendAdminStatusUpdateEmail: async (...args) => {
      calls.push(["admin", ...args]);
    },
    logger,
  });

  assert.equal(result.attempted, true);
  assert.equal(calls.length, 2);
  assert.deepEqual(
    calls.map(([target, sentBooking, previousStatus]) => [target, sentBooking.bookingStatus, previousStatus]),
    [
      ["customer", "confirmed", "contacted"],
      ["admin", "confirmed", "contacted"],
    ]
  );
  assert.equal(logger.errorCalls.length, 0);
  assert.equal(shouldSendBookingStatusUpdateEmail("contacted", "confirmed", true), true);
});

test("status emails are skipped when the status does not change", async () => {
  const logger = createLogger();
  let sendCount = 0;

  const result = await notifyBookingStatusChange({
    booking: createBooking({ bookingStatus: "confirmed" }),
    previousStatus: "confirmed",
    statusChanged: false,
    sendCustomerStatusUpdateEmail: async () => {
      sendCount += 1;
    },
    sendAdminStatusUpdateEmail: async () => {
      sendCount += 1;
    },
    logger,
  });

  assert.equal(result.attempted, false);
  assert.equal(sendCount, 0);
  assert.equal(logger.infoCalls.length, 1);
  assert.equal(shouldSendBookingStatusUpdateEmail("confirmed", "confirmed", false), false);
});

test("status email failures are logged without breaking the update flow", async () => {
  const logger = createLogger();
  const booking = createBooking({ bookingStatus: "paid" });

  const result = await notifyBookingStatusChange({
    booking,
    previousStatus: "payment_pending",
    statusChanged: true,
    sendCustomerStatusUpdateEmail: async () => {
      throw new Error("smtp down");
    },
    sendAdminStatusUpdateEmail: async () => {
      throw new Error("admin smtp down");
    },
    logger,
  });

  assert.equal(result.attempted, true);
  assert.equal(logger.errorCalls.length, 2);
  assert.match(String(logger.errorCalls[0].error?.message), /smtp down/);
  assert.match(String(logger.errorCalls[1].error?.message), /admin smtp down/);
});

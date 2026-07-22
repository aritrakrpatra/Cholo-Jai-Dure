import { getMongoDb } from "./mongodb";

const USERS_COLLECTION = "users";
let indexesInitialized = false;

function normalizeEmail(value) {
  return (value || "").trim().toLowerCase();
}

function normalizePhone(value) {
  return (value || "").replace(/\D/g, "");
}

function stripPassword(user) {
  if (!user) return null;
  const { _id, password, ...rest } = user;
  return {
    ...rest,
    mongoId: _id?.toString() || null,
  };
}

function normalizeDate(value) {
  if (!value) return null;
  const asDate = new Date(value);
  if (Number.isNaN(asDate.getTime())) return null;
  return asDate.toISOString().slice(0, 10);
}

function mapBookingForHistory(booking) {
  if (!booking) return null;

  return {
    id: booking.id || null,
    bookingId: booking.bookingId || null,
    packageId: booking.packageId || null,
    packageName: booking.packageName || null,
    customerName: booking.customerName || null,
    email: booking.email || null,
    phone: booking.phone || null,
    travelDate: booking.travelDate || null,
    adults: booking.adults ?? null,
    children: booking.children ?? null,
    totalTravelers: booking.totalTravelers ?? null,
    bookingStatus: booking.bookingStatus || "pending",
    createdAt: booking.createdAt || new Date().toISOString(),
    updatedAt: booking.updatedAt || new Date().toISOString(),
  };
}

async function ensureUserIndexes() {
  if (indexesInitialized) return;

  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);

  await Promise.all([
    users.createIndex({ clerkUserId: 1 }, { unique: true, sparse: true }),
    users.createIndex({ emailNormalized: 1 }, { unique: true, sparse: true }),
    users.createIndex({ phoneNormalized: 1 }, { unique: true, sparse: true }),
  ]);

  indexesInitialized = true;
}

export async function upsertUserFromClerk({
  clerkUserId,
  name,
  email,
  phoneNumber,
  gender,
  dateOfBirth,
  createdAt,
}) {
  await ensureUserIndexes();

  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);

  const normalizedEmail = normalizeEmail(email) || null;
  const normalizedPhone = normalizePhone(phoneNumber) || null;
  const now = new Date().toISOString();

  await users.updateOne(
    { clerkUserId },
    {
      $set: {
        clerkUserId,
        name: name || "Traveler",
        email: email || null,
        phoneNumber: phoneNumber || null,
        gender: gender || null,
        dateOfBirth: dateOfBirth || null,
        emailNormalized: normalizedEmail,
        phoneNormalized: normalizedPhone,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: createdAt || now,
      },
    },
    { upsert: true }
  );

  const user = await users.findOne({ clerkUserId });
  return stripPassword(user);
}

export async function updateUserByClerkId(clerkUserId, updates) {
  await ensureUserIndexes();

  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);

  const patch = {
    updatedAt: new Date().toISOString(),
  };

  if (updates.name !== undefined) {
    patch.name = updates.name || "Traveler";
  }

  if (updates.email !== undefined) {
    patch.email = updates.email || null;
    patch.emailNormalized = normalizeEmail(updates.email) || null;
  }

  if (updates.phoneNumber !== undefined) {
    patch.phoneNumber = updates.phoneNumber || null;
    patch.phoneNormalized = normalizePhone(updates.phoneNumber) || null;
  }

  if (updates.gender !== undefined) {
    patch.gender = updates.gender || null;
  }

  if (updates.dateOfBirth !== undefined) {
    patch.dateOfBirth = updates.dateOfBirth || null;
  }

  await users.updateOne({ clerkUserId }, { $set: patch });
  const user = await users.findOne({ clerkUserId });
  return stripPassword(user);
}

export async function createLegacyUser({ name, gender, phoneNumber, email, password }) {
  await ensureUserIndexes();

  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);

  const normalizedEmail = normalizeEmail(email) || null;
  const normalizedPhone = normalizePhone(phoneNumber) || null;
  const now = new Date().toISOString();

  const user = {
    id: Date.now().toString(),
    name,
    gender,
    phoneNumber: normalizedPhone,
    email: email || null,
    password,
    emailNormalized: normalizedEmail,
    phoneNormalized: normalizedPhone,
    authProvider: "legacy",
    createdAt: now,
    updatedAt: now,
  };

  await users.insertOne(user);
  return stripPassword(user);
}

export async function findLegacyUserByCredentials({ emailOrPhone, password }) {
  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);

  const normalizedIdentifier = String(emailOrPhone || "").trim();
  const emailNormalized = normalizeEmail(normalizedIdentifier);
  const phoneNormalized = normalizePhone(normalizedIdentifier);

  const user = await users.findOne({
    password,
    $or: [
      { emailNormalized },
      { phoneNormalized },
      { email: normalizedIdentifier },
      { phoneNumber: normalizedIdentifier },
    ],
  });

  return stripPassword(user);
}

export async function addBookingToUserHistory({
  clerkUserId,
  name,
  email,
  phoneNumber,
  gender,
  dateOfBirth,
  booking,
}) {
  if (!clerkUserId || !booking?.bookingId) return null;

  const user = await upsertUserFromClerk({
    clerkUserId,
    name,
    email,
    phoneNumber,
    gender,
    dateOfBirth: normalizeDate(dateOfBirth),
    createdAt: new Date().toISOString(),
  });

  await ensureUserIndexes();

  const db = await getMongoDb();
  const usersCollection = db.collection(USERS_COLLECTION);
  const historyEntry = mapBookingForHistory(booking);

  await usersCollection.updateOne(
    { clerkUserId, "bookingHistory.bookingId": { $ne: historyEntry.bookingId } },
    {
      $push: { bookingHistory: historyEntry },
      $set: { updatedAt: new Date().toISOString() },
    }
  );

  if (user?.emailNormalized || user?.phoneNormalized) {
    await usersCollection.updateMany(
      {
        clerkUserId: { $ne: clerkUserId },
        bookingHistory: { $exists: false },
        $or: [
          user.emailNormalized ? { emailNormalized: user.emailNormalized } : null,
          user.phoneNormalized ? { phoneNormalized: user.phoneNormalized } : null,
        ].filter(Boolean),
      },
      {
        $set: {
          clerkUserId,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          updatedAt: new Date().toISOString(),
        },
      }
    );
  }

  const updated = await usersCollection.findOne({ clerkUserId });
  return stripPassword(updated);
}

export async function updateBookingInUserHistory(booking) {
  if (!booking?.bookingId) return;

  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);
  const historyEntry = mapBookingForHistory(booking);

  await users.updateMany(
    { "bookingHistory.bookingId": historyEntry.bookingId },
    {
      $set: {
        "bookingHistory.$[entry]": historyEntry,
        updatedAt: new Date().toISOString(),
      },
    },
    {
      arrayFilters: [{ "entry.bookingId": historyEntry.bookingId }],
    }
  );
}

export async function removeBookingFromUserHistory(bookingId) {
  if (!bookingId) return;

  const db = await getMongoDb();
  const users = db.collection(USERS_COLLECTION);

  await users.updateMany(
    { "bookingHistory.bookingId": bookingId },
    {
      $pull: { bookingHistory: { bookingId } },
      $set: { updatedAt: new Date().toISOString() },
    }
  );
}

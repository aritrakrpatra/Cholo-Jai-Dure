import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "cholo_jai_dure";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI. Add it to your environment variables.");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function getMongoDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(MONGODB_DB);
}

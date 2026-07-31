import { MongoClient } from "mongodb";

const MONGODB_DB = process.env.MONGODB_DB || "cholo_jai_dure";

let client;
let clientPromise;

function getMongoClientPromise() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI. Add it to your environment variables.");
  }

  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(mongoUri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
    return clientPromise;
  }

  client = new MongoClient(mongoUri);
  clientPromise = client.connect();
  return clientPromise;
}

export async function getMongoDb() {
  const connectedClient = await getMongoClientPromise();
  return connectedClient.db(MONGODB_DB);
}

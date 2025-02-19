import mongoose, { Connection } from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;


interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const globalWithMongoose = global as typeof global & { mongoose?: Cached };

let cached: Cached = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectToDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance.connection; 
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}


globalWithMongoose.mongoose = cached;

import mongoose from "mongoose";
import chalk from "chalk";

let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    let uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not set");
    uri = uri.trim();
    const validPrefix = uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://");
    if (!validPrefix) {
      throw new Error(
        'MONGODB_URI invalid: must start with "mongodb://" or "mongodb+srv://"'
      );
    }
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((m) => {
        console.log(chalk.green("MongoDB connected"));
        return m;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error(chalk.red("MongoDB connection error:"), err);
    throw err;
  }
  return cached.conn;
}

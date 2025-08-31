const mongoose = require("mongoose");
const chalk = require("chalk");

let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not set");
    cached.promise = mongoose.connect(uri).then((m) => {
      console.log(chalk.green("MongoDB connected!"));
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error(chalk.red("MongoDB connection error:", err));
    throw err;
  }
  return cached.conn;
}

module.exports = connectDB;

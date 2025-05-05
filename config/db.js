import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const connectDB = async () => {
  const DB = process.env.DATABASE.replace(
    "<DATABASE_PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    });

    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Connection error:", err);
  }
};

export default connectDB;

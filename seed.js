// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./model/coursesModel.js";
import courses from "./coursesData.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const importData = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: "true",
    });

    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log("✅ Courses Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error while seeding data:", error);
    process.exit(1);
  }
};

importData();

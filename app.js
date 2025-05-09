import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./config.env" });

// connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error("ERROR 💥", err);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 4000;
export let server = app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
export default app;

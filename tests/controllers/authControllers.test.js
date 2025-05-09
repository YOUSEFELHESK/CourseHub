import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const crypto = await import("crypto");
import app from "../../app.js";
import dotenv from "dotenv";
import { jest } from "@jest/globals";
import { server } from "../../app.js";
import User from "../../model/userModel.js";

dotenv.config({ path: "config.env" });

beforeAll(async () => {
  // Mock randomBytes manually
  jest.unstable_mockModule("../../utils/generateToken.js", () => ({
    default: () => "mocked-verification-token",
  }));

  try {
    await mongoose.connect(
      process.env.DATABASE_Test.replace(
        "<DATABASE_PASSWORD>",
        process.env.DATABASE_PASSWORD
      ),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: "true",
      }
    );
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Connection error:", err);
  }
});
const userData = {
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  password: "Test1234",
  passwordConfirm: "Test1234",
  role: "USER",
};

afterAll(async () => {
  await User.deleteOne({ email: userData.email }); // Cleanup
  await mongoose.connection.close();
  await new Promise((resolve) => server.close(resolve));
  jest.restoreAllMocks();
});

describe("Auth Routes", () => {
  let token;
  let userId;

  it("should signup a new user", async () => {
    const res = await request(app).post("/api/users/signup").send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Verification email sent/i);
  });

  // it("should verify the user's email manually (mock)", async () => {
  //   const user = await User.findOne({ email: userData.email });
  //   user.isVerified = true;
  //   await user.save();
  //   userId = user._id;
  // });

  // it("should login the user", async () => {
  //   const res = await request(app).post("/api/users/login").send({
  //     email: userData.email,
  //     password: userData.password,
  //   });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.token).toBeDefined();
  //   token = res.body.token;
  // });

  // it("should not allow access to protected route without token", async () => {
  //   const res = await request(app).get("/api/courses");
  //   expect([401, 403]).toContain(res.statusCode);
  // });

  // it("should allow access to protected route with token", async () => {
  //   const res = await request(app)
  //     .post("/api/courses")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({
  //       name: "Protected Course",
  //       description: "Secured route test",
  //     });

  //   expect([200, 201, 403, 401]).toContain(res.statusCode);
  // });

  // it("should trigger forgot password", async () => {
  //   const res = await request(app)
  //     .post("/api/users/forgotPassword")
  //     .send({ email: userData.email });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.message).toMatch(/Token sent/i);
  // });
});

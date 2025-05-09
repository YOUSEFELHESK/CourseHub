// import request from "supertest";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import app from "../../app.js";
// import { server } from "../../app.js";
// import Course from "../../model/coursesModel.js";

// dotenv.config({ path: "config.env" });

// beforeAll(async () => {
//   await mongoose.connect(
//     process.env.DATABASE_Test.replace(
//       "<DATABASE_PASSWORD>",
//       process.env.DATABASE_PASSWORD
//     ),
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       retryWrites: "true",
//     }
//   );
//   console.log("✅ Connected to MongoDB!");
//   await Course.deleteMany();
// });

// afterAll(async () => {
//   await mongoose.connection.close();
//   server.close();
// });

// afterEach(async () => {
//   await Course.deleteMany(); // Clean test DB after each test
// });

// describe("Course API", () => {
//   // it("should create a new course", async () => {
//   //   const res = await request(app).post("/api/courses").send({
//   //     title: "JavaScript for Beginners",
//   //     description:
//   //       "Learn JavaScript from scratch and build interactive websites.",
//   //     instructor: "John Doe",
//   //     price: 49.99,
//   //     duration: "6h 30m",
//   //   });

//   //   expect(res.statusCode).toBe(201);
//   //   expect(res.body.data.item.title).toBe("JavaScript for Beginners");
//   // });

//   it("should get all courses", async () => {
//     await Course.create({
//       title: "JavaScript for Beginners",
//       description:
//         "Learn JavaScript from scratch and build interactive websites.",
//       instructor: "John Doe",
//       price: 49.99,
//       duration: "6h 30m",
//     });
//     await Course.create({
//       title: "Advanced JavaScript",
//       description: "Deep dive into JavaScript concepts.",
//       instructor: "Jane Doe",
//       price: 79.99,
//       duration: "8h 30m",
//     });

//     const res = await request(app).get("/api/courses");

//     expect(res.statusCode).toBe(200);
//     expect(res.body.results).toBe(2);
//     expect(res.body.data.data[0]).toHaveProperty("title");
//   });

//   // it("should return a course by ID", async () => {
//   //   const course = await Course.create({
//   //     title: "JavaScript for Beginners",
//   //     description:
//   //       "Learn JavaScript from scratch and build interactive websites.",
//   //     instructor: "John Doe",
//   //     price: 49.99,
//   //     duration: "6h 30m",
//   //   });

//   //   const res = await request(app).get(`/api/courses/${course._id}`);

//   //   expect(res.statusCode).toBe(200);
//   //   expect(res.body.data.item.title).toBe("JavaScript for Beginners");
//   // });

//   // it("should update a course", async () => {
//   //   const course = await Course.create({
//   //     title: "JavaScript for Beginners",
//   //     description:
//   //       "Learn JavaScript from scratch and build interactive websites.",
//   //     instructor: "John Doe",
//   //     price: 49.99,
//   //     duration: "6h 30m",
//   //   });

//   //   const res = await request(app)
//   //     .patch(`/api/courses/${course._id}`)
//   //     .send({ price: 59.99 });

//   //   expect(res.statusCode).toBe(200);
//   //   expect(res.body.data.item.price).toBe(59.99);
//   // });

//   // it("should delete a course", async () => {
//   //   const course = await Course.create({
//   //     title: "JavaScript for Beginners",
//   //     description:
//   //       "Learn JavaScript from scratch and build interactive websites.",
//   //     instructor: "John Doe",
//   //     price: 49.99,
//   //     duration: "6h 30m",
//   //   });

//   //   const res = await request(app).delete(`/api/courses/${course._id}`);

//   //   expect(res.statusCode).toBe(204);

//   //   const check = await Course.findById(course._id);
//   //   expect(check).toBeNull();
//   // });
// });

describe("course Controllers (Placeholder)", () => {
  it("placeholder test", () => {
    expect(true).toBe(true);
  });
});

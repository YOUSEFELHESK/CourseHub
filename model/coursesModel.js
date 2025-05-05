import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
    },
    category: {
      type: String,
      enum: ["development", "design", "marketing", "business", "data", "other"],
      default: "other",
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price must be a positive number"],
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"], // e.g. "5h 30m"
    },
    image: {
      type: String,
      default: "default-course.jpg", // URL or filename
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 0"],
      max: [5, "Rating must be below 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, min: 1, max: 5, required: true },
        reviewText: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    certificate: {
      type: String,
      default: null,
    },
    relatedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    startDate: { type: Date },
    endDate: { type: Date },
    supplementaryContent: [
      {
        title: String,
        type: {
          type: String,
          enum: ["video", "document", "link"],
          required: true,
        },
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);

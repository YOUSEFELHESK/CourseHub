import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseControllers.js";
import { protect, restrictTo } from "../controllers/authControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCourses)
  .post(protect, restrictTo("admin", "manager"), createCourse);

router
  .route("/:courseId")
  .get(getCourseById)
  .put(protect, restrictTo("admin", "manager"), updateCourse)
  .patch(protect, restrictTo("admin", "manager"), updateCourse)
  .delete(protect, restrictTo("admin", "manager"), deleteCourse);

export default router;

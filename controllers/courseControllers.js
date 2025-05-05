import Course from "../model/coursesModel.js";
import { FactoryController } from "./factoryController.js";

const courseController = new FactoryController(Course);

export const getAllCourses = courseController.getAll;
export const getCourseById = courseController.getById;
export const createCourse = courseController.create;
export const updateCourse = courseController.update;
export const deleteCourse = courseController.delete;

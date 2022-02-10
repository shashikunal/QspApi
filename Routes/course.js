import { Router } from "express";
import {
  CreateCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courses";
import { getCourses } from "./../controllers/courses";
let router = Router({ mergeParams: true });
router.route("/").get(getCourses).post(CreateCourse);
router.route("/:id").get(getCourses).put(updateCourse).delete(deleteCourse);

export { router as Courses };

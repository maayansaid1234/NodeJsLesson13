import express from "express";
import {addCourse,getAllCourses,getCourseById,deleteCourse} from "../controllers/course.js";

const router=express.Router();

router.get("/",getAllCourses);
router.get("/:id",getCourseById);
router.delete("/:id",deleteCourse);
router.post("/",addCourse);

export default router;
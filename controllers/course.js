import mongoose from "mongoose";
import { CourseModel } from "../models/course.js"

export const getAllCourses = async (req, res) => {
    try {

        let allCourses = await CourseModel.find({});
        res.json(allCourses)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get courses" })
    }
}



export const getCourseById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let course = await CourseModel.findById(id);
        if (!course)
            return res.status(404).json({ type: "no id", message: "no course with such id" })
        return res.json(course)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get course" })
    }

}


export const deleteCourse = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let course = await CourseModel.findByIdAndDelete(id);
        if (!course)
            return res.status(404).json({ type: "no course to delete", message: "no course with such id to delete" })

        return res.json(course)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get course" })
    }

}

export const addCourse = async (req, res) => {
    let { name, numLessons, startDate, tags, speaker, price } = req.body;

    if (!name || !price)
        return res.status(404).json({ type: "missing params", message: "missing details in body name or price" })
    try {
        let sameCourse = await CourseModel.findOne({ name: name });
        if (sameCourse)
            return res.status(409).json({ type: "same details", message: "there is already same course" })
        let newCourse = new CourseModel({ name, numLessons, startDate, tags, speaker, price });
        await newCourse.save();

        return res.json(newCourse)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get course" })
    }

}
import mongoose from "mongoose";

const speakerSchema = mongoose.Schema({
    fisrtName: String,
    lastName: String
})

const courseSchema = mongoose.Schema({
    name: String,
    price: Number,
    tags: [String],
    startDate: { type: Date, default: Date.now() },
    numLessons: Number,
    speaker: speakerSchema
})

export const CourseModel = mongoose.model("courses", courseSchema);
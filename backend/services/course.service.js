const Course = require("../models/Course");

const createCourse = async (courseData) => {
    return Course.create(courseData);
};

const getAllCourses = async () => {
    return Course.find().populate("createdBy", "name email");
};

const getCourseById = async (courseId) => {
    return Course.findById(courseId).populate(
        "createdBy",
        "name email"
    );
};

const updateCourse = async (courseId, updateData) => {
    return Course.findByIdAndUpdate(
        courseId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteCourse = async (courseId) => {
    return Course.findByIdAndDelete(courseId);
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};
const courseService = require("../services/course.service");
const sendResponse = require("../utils/response");

const createCourse = async (
    req,
    res,
    next
) => {
    try {
        const course =
            await courseService.createCourse({
                ...req.body,
                createdBy: req.user._id,
            });

        sendResponse(
            res,
            201,
            true,
            "Course created",
            course
        );
    } catch (error) {
        next(error);
    }
};
const getCourses = async (req, res, next) => {
    try {
        const courses =
            await courseService.getAllCourses();

        sendResponse(
            res,
            200,
            true,
            "Courses fetched successfully",
            courses
        );
    } catch (error) {
        next(error);
    }
};

const getCourse = async (req, res, next) => {
    try {
        const course =
            await courseService.getCourseById(
                req.params.id
            );

        sendResponse(
            res,
            200,
            true,
            "Course fetched successfully",
            course
        );
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const course =
            await courseService.updateCourse(
                req.params.id,
                req.body
            );

        sendResponse(
            res,
            200,
            true,
            "Course updated successfully",
            course
        );
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        await courseService.deleteCourse(
            req.params.id
        );

        sendResponse(
            res,
            200,
            true,
            "Course deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
};
const lessonService = require("../services/lesson.service");
const sendResponse = require("../utils/response");

const createLesson = async (req, res, next) => {
    try {
        const lesson =
            await lessonService.createLesson(req.body);

        sendResponse(
            res,
            201,
            true,
            "Lesson created successfully",
            lesson
        );
    } catch (error) {
        next(error);
    }
};

const getLessonsByCourse = async (
    req,
    res,
    next
) => {
    try {
        const lessons =
            await lessonService.getLessonsByCourse(
                req.params.courseId
            );

        sendResponse(
            res,
            200,
            true,
            "Lessons fetched successfully",
            lessons
        );
    } catch (error) {
        next(error);
    }
};

const updateLesson = async (req, res, next) => {
    try {
        const lesson =
            await lessonService.updateLesson(
                req.params.id,
                req.body
            );

        sendResponse(
            res,
            200,
            true,
            "Lesson updated successfully",
            lesson
        );
    } catch (error) {
        next(error);
    }
};

const deleteLesson = async (req, res, next) => {
    try {
        await lessonService.deleteLesson(
            req.params.id
        );

        sendResponse(
            res,
            200,
            true,
            "Lesson deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson,
};
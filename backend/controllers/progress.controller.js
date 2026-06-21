const progressService = require("../services/progress.service");
const sendResponse = require("../utils/response");

const markComplete = async (
    req,
    res,
    next
) => {
    try {
        const { courseId, lessonId } = req.body;

        const progress =
            await progressService.markLessonComplete(
                req.user._id,
                courseId,
                lessonId
            );

        sendResponse(
            res,
            200,
            true,
            "Lesson completed",
            progress
        );
    } catch (error) {
        next(error);
    }
};

const markIncomplete = async (
    req,
    res,
    next
) => {
    try {
        const { courseId, lessonId } = req.body;

        const progress =
            await progressService.markLessonIncomplete(
                req.user._id,
                courseId,
                lessonId
            );

        sendResponse(
            res,
            200,
            true,
            "Lesson marked incomplete",
            progress
        );
    } catch (error) {
        next(error);
    }
};

const getCourseProgress = async (
    req,
    res,
    next
) => {
    try {
        const progress =
            await progressService.getCourseProgress(
                req.user._id,
                req.params.courseId
            );

        sendResponse(
            res,
            200,
            true,
            "Progress fetched",
            progress
        );
    } catch (error) {
        next(error);
    }
};

const getMyProgress = async (
    req,
    res,
    next
) => {
    try {
        const progress =
            await progressService.getUserProgress(
                req.user._id
            );

        sendResponse(
            res,
            200,
            true,
            "Progress fetched",
            progress
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    markComplete,
    markIncomplete,
    getCourseProgress,
    getMyProgress,
};
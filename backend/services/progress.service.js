const Progress = require("../models/Progress");

const markLessonComplete = async (
    userId,
    courseId,
    lessonId
) => {
    let progress = await Progress.findOne({
        user: userId,
        course: courseId,
    });

    if (!progress) {
        progress = await Progress.create({
            user: userId,
            course: courseId,
            completedLessons: [],
        });
    }

    if (
        !progress.completedLessons.includes(lessonId)
    ) {
        progress.completedLessons.push(lessonId);

        await progress.save();
    }

    return progress;
};

const markLessonIncomplete = async (
    userId,
    courseId,
    lessonId
) => {
    const progress = await Progress.findOne({
        user: userId,
        course: courseId,
    });

    if (!progress) {
        throw new Error("Progress not found");
    }

    progress.completedLessons =
        progress.completedLessons.filter(
            (lesson) =>
                lesson.toString() !== lessonId
        );

    await progress.save();

    return progress;
};

const getCourseProgress = async (
    userId,
    courseId
) => {
    return Progress.findOne({
        user: userId,
        course: courseId,
    }).populate("completedLessons");
};

const getUserProgress = async (userId) => {
    return Progress.find({
        user: userId,
    })
        .populate("course")
        .populate("completedLessons");
};

module.exports = {
    markLessonComplete,
    markLessonIncomplete,
    getCourseProgress,
    getUserProgress,
};
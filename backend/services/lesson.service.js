const Lesson = require("../models/Lesson");

const createLesson = async (lessonData) => {
    return Lesson.create(lessonData);
};

const getLessonsByCourse = async (courseId) => {
    return Lesson.find({ course: courseId });
};

const getLessonById = async (lessonId) => {
    return Lesson.findById(lessonId);
};

const updateLesson = async (
    lessonId,
    updateData
) => {
    return Lesson.findByIdAndUpdate(
        lessonId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteLesson = async (lessonId) => {
    return Lesson.findByIdAndDelete(lessonId);
};

module.exports = {
    createLesson,
    getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson,
};
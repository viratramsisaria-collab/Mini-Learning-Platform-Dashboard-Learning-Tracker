const express = require("express");
const router = express.Router();

const {
    createLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson,
} = require("../controllers/lesson.controller");

const protect = require("../middlewares/auth.middleware");

router.post("/", protect, createLesson);

router.get(
    "/course/:courseId",
    getLessonsByCourse
);

router.put("/:id", protect, updateLesson);

router.delete("/:id", protect, deleteLesson);

module.exports = router;
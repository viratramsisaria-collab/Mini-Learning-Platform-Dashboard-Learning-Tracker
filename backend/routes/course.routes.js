const express = require("express");
const router = express.Router();

const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/course.controller");

const protect = require("../middlewares/auth.middleware");

router.post("/", protect, createCourse);

router.get("/", getCourses);

router.get("/:id", getCourse);

router.put("/:id", protect, updateCourse);

router.delete("/:id", protect, deleteCourse);

module.exports = router;
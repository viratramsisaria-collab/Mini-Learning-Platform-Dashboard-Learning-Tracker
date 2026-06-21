const express = require("express");
const router = express.Router();

const {
    markComplete,
    markIncomplete,
    getCourseProgress,
    getMyProgress,
} = require("../controllers/progress.controller");

const protect = require("../middlewares/auth.middleware");

router.post(
    "/complete",
    protect,
    markComplete
);

router.post(
    "/incomplete",
    protect,
    markIncomplete
);

router.get(
    "/course/:courseId",
    protect,
    getCourseProgress
);

router.get(
    "/me",
    protect,
    getMyProgress
);

module.exports = router;
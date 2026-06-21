import api from "../utils/axios";

export const completeLesson = (data) =>
    api.post("/progress/complete", data);

export const incompleteLesson = (data) =>
    api.post("/progress/incomplete", data);

export const getCourseProgress = (
    courseId
) =>
    api.get(
        `/progress/course/${courseId}`
    );

export const getMyProgress = () =>
    api.get("/progress/me");
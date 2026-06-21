import api from "../utils/axios";

export const createLesson = (data) =>
    api.post("/lessons", data);

export const getLessonsByCourse = (
    courseId
) =>
    api.get(
        `/lessons/course/${courseId}`
    );
export const updateLesson = (
    id,
    data
) =>
    api.put(`/lessons/${id}`, data);

export const deleteLesson = (id) =>
    api.delete(`/lessons/${id}`);
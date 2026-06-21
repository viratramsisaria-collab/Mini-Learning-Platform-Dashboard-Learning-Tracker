import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import LessonList from "../components/lesson/LessonList";

import formatProgress from "../utils/formatProgress";
import {
    getCourse,
    updateCourse,
} from "../api/course.api";

import {
    createLesson,
    getLessonsByCourse,
    deleteLesson,
    updateLesson,
} from "../api/lesson.api";

import {
    completeLesson,
    getCourseProgress,
} from "../api/progress.api";

export default function CourseDetails() {
    const { id } = useParams();

    const [course, setCourse] =
        useState(null);

    const [lessons, setLessons] =
        useState([]);

    const [completedLessons,
        setCompletedLessons] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [lessonForm,
        setLessonForm] = useState({
            title: "",
            content: "",
        });

    const [editingCourse, setEditingCourse] =
        useState(false);

    const [courseForm, setCourseForm] =
        useState({
            title: "",
            description: "",
        });
    const progress =
        formatProgress(
            completedLessons.length,
            lessons.length
        );

    const fetchCourse = async () => {
        try {
            const res =
                await getCourse(id);

            setCourse(res.data.data);
            setCourseForm({
                title: res.data.data.title,
                description:
                    res.data.data.description,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLessons = async () => {
        try {
            const res =
                await getLessonsByCourse(id);

            setLessons(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProgress = async () => {
        try {
            const res =
                await getCourseProgress(id);

            const progress =
                res.data.data;

            if (!progress) {
                setCompletedLessons([]);
                return;
            }

            setCompletedLessons(
                progress.completedLessons.map(
                    (lesson) =>
                        lesson._id
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await Promise.all([
                fetchCourse(),
                fetchLessons(),
                fetchProgress(),
            ]);

            setLoading(false);
        };

        loadData();
    }, [id]);

    const handleLessonChange = (e) => {
        setLessonForm((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };

    const handleAddLesson =
        async (e) => {
            e.preventDefault();

            try {
                await createLesson({
                    title:
                        lessonForm.title,
                    content:
                        lessonForm.content,
                    course: id,
                });

                setLessonForm({
                    title: "",
                    content: "",
                });

                await fetchLessons();
            } catch (error) {
                alert(
                    error?.response?.data
                        ?.message ||
                    "Failed to create lesson"
                );
            }
        };

    const handleDeleteLesson =
        async (lesson) => {
            try {
                await deleteLesson(
                    lesson._id
                );

                await fetchLessons();
            } catch (error) {
                alert(
                    error?.response?.data
                        ?.message ||
                    "Failed to delete lesson"
                );
            }
        };

    const handleCompleteLesson =
        async (lesson) => {
            try {
                await completeLesson({
                    courseId: id,
                    lessonId:
                        lesson._id,
                });

                await fetchProgress();
            } catch (error) {
                console.error(error);
            }
        };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />

                <div className="flex justify-center py-20">
                    Loading...
                </div>
            </div>
        );
    }

    const handleUpdateCourse =
        async () => {
            try {
                const res =
                    await updateCourse(
                        id,
                        courseForm
                    );

                setCourse(
                    res.data.data
                );

                setEditingCourse(
                    false
                );
            } catch (error) {
                console.error(error);
            }
        };

    const handleEditLesson =
        async (
            lessonId,
            lessonData
        ) => {
            try {
                await updateLesson(
                    lessonId,
                    lessonData
                );

                await fetchLessons();
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="mx-auto max-w-5xl px-8 py-10">

                <section className="mb-10">

                    <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        {editingCourse ? (
                            <>

                                <input
                                    value={courseForm.title}
                                    onChange={(e) =>
                                        setCourseForm({
                                            ...courseForm,
                                            title:
                                                e.target.value,
                                        })
                                    }
                                    className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                                />

                                <textarea
                                    rows="4"
                                    value={
                                        courseForm.description
                                    }
                                    onChange={(e) =>
                                        setCourseForm({
                                            ...courseForm,
                                            description:
                                                e.target.value,
                                        })
                                    }
                                    className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                                />

                                <div className="flex gap-3">

                                    <button
                                        onClick={
                                            handleUpdateCourse
                                        }
                                        className="rounded-xl bg-indigo-600 px-4 py-2"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() =>
                                            setEditingCourse(
                                                false
                                            )
                                        }
                                        className="rounded-xl border border-slate-700 px-4 py-2"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </>
                        ) : (
                            <>

                                <div className="mb-4 flex items-start justify-between">

                                    <div>

                                        <h1 className="text-5xl font-bold">
                                            {
                                                course.title
                                            }
                                        </h1>

                                        <p className="mt-3 text-slate-400">
                                            {
                                                course.description
                                            }
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            setEditingCourse(
                                                true
                                            )
                                        }
                                        className="rounded-xl border border-slate-700 px-4 py-2"
                                    >
                                        Edit
                                    </button>

                                </div>

                            </>
                        )}

                    </section>

                </section>

                <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="mb-3 flex justify-between">

                        <span className="text-slate-400">
                            Course Progress
                        </span>

                        <span className="font-semibold">
                            {progress}%
                        </span>

                    </div>

                    <div className="h-3 rounded-full bg-slate-800">

                        <div
                            className="h-3 rounded-full bg-indigo-600 transition-all"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </section>

                <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="mb-6 text-2xl font-semibold">
                        Add Lesson
                    </h2>

                    <form
                        onSubmit={
                            handleAddLesson
                        }
                        className="space-y-5"
                    >

                        <div>
                            <label className="mb-2 block text-sm text-slate-300">
                                Lesson Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={
                                    lessonForm.title
                                }
                                onChange={
                                    handleLessonChange
                                }
                                placeholder="React Components"
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-300">
                                Lesson Content
                            </label>

                            <textarea
                                rows="5"
                                name="content"
                                value={
                                    lessonForm.content
                                }
                                onChange={
                                    handleLessonChange
                                }
                                placeholder="Write lesson notes here..."
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500"
                        >
                            Create Lesson
                        </button>

                    </form>

                </section>

                <section>

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-2xl font-semibold">
                            Lessons
                        </h2>

                        <span className="text-sm text-slate-500">
                            {
                                lessons.length
                            } Lessons
                        </span>

                    </div>

                    {lessons.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/50 p-12 text-center">

                            <h3 className="mb-2 text-xl font-semibold">
                                No Lessons Yet
                            </h3>

                            <p className="text-slate-400">
                                Create your first lesson above.
                            </p>

                        </div>
                    ) : (
                        <LessonList
                            lessons={lessons}
                            completedLessons={completedLessons}
                            onComplete={handleCompleteLesson}
                            onDelete={handleDeleteLesson}
                            onEdit={handleEditLesson}
                        />
                    )}

                </section>

            </main>
        </div>
    );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import CourseList from "../components/course/CourseList";

import { getCourses } from "../api/course.api";
import { getMyProgress } from "../api/progress.api";

export default function Dashboard() {
    const [courses, setCourses] =
        useState([]);

    const [progressData,
        setProgressData] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchCourses = async () => {
        try {
            const res =
                await getCourses();

            setCourses(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProgress =
        async () => {
            try {
                const res =
                    await getMyProgress();

                setProgressData(
                    res.data.data || []
                );
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        const loadData =
            async () => {
                setLoading(true);

                await Promise.all([
                    fetchCourses(),
                    fetchProgress(),
                ]);

                setLoading(false);
            };

        loadData();
    }, []);

    const totalCourses =
        courses.length;

    const coursesStarted =
        progressData.length;

    const completedLessons =
        progressData.reduce(
            (total, progress) =>
                total +
                progress.completedLessons
                    .length,
            0
        );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="mx-auto max-w-7xl px-8 py-10">

                {/* Hero */}

                <section className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Welcome Back 👋
                        </h1>

                        <p className="mt-3 text-lg text-slate-400">
                            Continue your learning journey and track your progress.
                        </p>
                    </div>

                    <Link
                        to="/course/new"
                        className="
                            rounded-2xl
                            bg-indigo-600
                            px-6
                            py-3
                            font-medium
                            transition
                            hover:bg-indigo-500
                        "
                    >
                        + Create Course
                    </Link>

                </section>

                {/* Stats */}

                <section className="mb-12 grid gap-6 md:grid-cols-3">

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Total Courses
                        </p>

                        <h2 className="mt-3 text-4xl font-bold">
                            {totalCourses}
                        </h2>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Courses Started
                        </p>

                        <h2 className="mt-3 text-4xl font-bold">
                            {coursesStarted}
                        </h2>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <p className="text-sm text-slate-400">
                            Lessons Completed
                        </p>

                        <h2 className="mt-3 text-4xl font-bold">
                            {completedLessons}
                        </h2>
                    </div>

                </section>

                {/* Courses */}

                <section>

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-2xl font-semibold">
                            My Courses
                        </h2>

                        <span className="text-sm text-slate-500">
                            {courses.length} Courses
                        </span>

                    </div>

                    {loading ? (
                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
                            Loading...
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/50 p-16 text-center">

                            <h3 className="mb-3 text-2xl font-semibold">
                                No Courses Yet
                            </h3>

                            <p className="mb-8 text-slate-400">
                                Create your first course to start tracking your learning.
                            </p>

                            <Link
                                to="/course/new"
                                className="
                                    rounded-xl
                                    bg-indigo-600
                                    px-5
                                    py-3
                                    font-medium
                                    transition
                                    hover:bg-indigo-500
                                "
                            >
                                Create First Course
                            </Link>

                        </div>
                    ) : (
                        <CourseList
                            courses={courses}
                        />
                    )}

                </section>

            </main>
        </div>
    );
}
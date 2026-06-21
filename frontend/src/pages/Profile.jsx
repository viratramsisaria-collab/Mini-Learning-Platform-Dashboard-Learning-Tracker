import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import CourseList from "../components/course/CourseList";

import { getCourses } from "../api/course.api";
import { getMyProgress } from "../api/progress.api";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
    const { user } = useAuth();

    const [courses, setCourses] =
        useState([]);

    const [progressData,
        setProgressData] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchData = async () => {
        try {
            const [coursesRes,
                progressRes] =
                await Promise.all([
                    getCourses(),
                    getMyProgress(),
                ]);

            setCourses(
                coursesRes.data.data
            );

            setProgressData(
                progressRes.data.data || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const continueLearning =
        courses.slice(0, 3);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="mx-auto max-w-7xl px-8 py-10">

                {/* Profile Hero */}

                <section className="mb-12 rounded-3xl border border-slate-800 bg-slate-900 p-10">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center">

                        <div
                            className="
                                flex
                                h-24
                                w-24
                                items-center
                                justify-center
                                rounded-full
                                bg-indigo-600
                                text-4xl
                                font-bold
                            "
                        >
                            {user?.name?.charAt(0)}
                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">
                                {user?.name}
                            </h1>

                            <p className="mt-2 text-slate-400">
                                {user?.email}
                            </p>

                            <p className="mt-4 text-slate-500 italic">
                                Keep learning. One lesson at a time.
                            </p>

                        </div>

                    </div>

                </section>

                {/* Continue Learning */}

                <section className="mb-12">

                    <div className="mb-6">

                        <h2 className="text-2xl font-semibold">
                            Continue Learning
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Pick up where you left off.
                        </p>

                    </div>

                    <div className="grid gap-4 m-5 md:grid-cols-3">

                        {continueLearning.map(
                            (course) => (
                                <div
                                    key={
                                        course._id
                                    }
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        p-6
                                        transition
                                        hover:border-indigo-500
                                    "
                                >

                                    <h3 className="mb-2 text-lg font-semibold">
                                        {
                                            course.title
                                        }
                                    </h3>

                                    <p className="mb-4 line-clamp-3 text-sm text-slate-400">
                                        {
                                            course.description
                                        }
                                    </p>

                                    <span className="text-sm font-medium text-indigo-400">
                                        Continue →
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                </section>

                {/* Learning Activity */}

                <section className="mb-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="mb-4 text-2xl font-semibold">
                        Learning Activity
                    </h2>

                    <p className="text-slate-400">
                        You are currently enrolled in{" "}
                        <span className="font-semibold text-white">
                            {courses.length}
                        </span>{" "}
                        courses and have progress in{" "}
                        <span className="font-semibold text-white">
                            {progressData.length}
                        </span>{" "}
                        of them.
                    </p>

                </section>

                {/* My Courses */}

                <section>

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="mb-[0.5rem] text-2xl font-semibold">
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
                    ) : (
                        <CourseList className="mt-2"
                            courses={courses}
                        />
                    )}

                </section>

            </main>
        </div>
    );
}
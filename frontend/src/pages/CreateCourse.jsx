import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import CourseForm from "../components/course/CourseForm";

import { createCourse } from "../api/course.api";

export default function CreateCourse() {
    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const handleCreateCourse = async (
        formData
    ) => {
        try {
            setLoading(true);

            const res =
                await createCourse(formData);

            const course =
                res.data.data;

            navigate(
                `/course/${course._id}`
            );
        } catch (error) {
            alert(
                error?.response?.data
                    ?.message ||
                "Failed to create course"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="mx-auto max-w-4xl px-8 py-10">

                <h1 className="mb-2 text-4xl font-bold">
                    Create Course
                </h1>

                <p className="mb-10 text-slate-400">
                    Build your personal learning roadmap.
                </p>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <CourseForm
                        onSubmit={
                            handleCreateCourse
                        }
                        loading={loading}
                    />

                </div>

            </main>
        </div>
    );
}
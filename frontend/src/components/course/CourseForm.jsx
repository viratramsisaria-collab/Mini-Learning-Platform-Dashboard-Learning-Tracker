import { useEffect, useState } from "react";

export default function CourseForm({
    onSubmit,
    loading,
    initialData = {
        title: "",
        description: "",
    },
    buttonText = "Create Course",
}) {
    const [formData, setFormData] =
        useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label className="mb-2 block text-sm text-slate-300">
                    Course Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-slate-300">
                    Description
                </label>

                <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                />
            </div>

            <button
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
            >
                {loading
                    ? "Saving..."
                    : buttonText}
            </button>
        </form>
    );
}
import { useState } from "react";

export default function LessonCard({
    lesson,
    completed,
    onComplete,
    onDelete,
    onEdit,
}) {
    const [editing, setEditing] =
        useState(false);

    const [title, setTitle] =
        useState(lesson.title);

    const [content, setContent] =
        useState(lesson.content);

    const handleSave = async () => {
        await onEdit(
            lesson._id,
            {
                title,
                content,
            }
        );

        setEditing(false);
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            {editing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                    />

                    <textarea
                        rows="4"
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                        className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={
                                handleSave
                            }
                            className="rounded-xl bg-indigo-600 px-4 py-2"
                        >
                            Save
                        </button>

                        <button
                            onClick={() =>
                                setEditing(
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

                        <h3 className="text-xl font-semibold">
                            {lesson.title}
                        </h3>

                        <div className="flex gap-2">

                            <div className="flex gap-2">

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            setEditing(true)
                                        }
                                        className="
            rounded-xl
            bg-blue-500
            border
            border-blue-900
            px-4
            py-2
            text-sm
            font-medium
            transition
            hover:bg-blue-700
        "
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(lesson)
                                        }
                                        className="
            rounded-xl
            border
            border-red-900
            px-4
            py-2
            text-sm
            font-medium
            text-red-400
            transition
            hover:bg-red-950
        "
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <p className="mb-6 whitespace-pre-wrap text-slate-400">
                        {lesson.content}
                    </p>

                    {completed ? (
                        <button
                            disabled
                            className="rounded-xl bg-emerald-600 px-4 py-2"
                        >
                            Completed
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                onComplete(
                                    lesson
                                )
                            }
                            className="rounded-xl bg-indigo-600 px-4 py-2"
                        >
                            Mark Complete
                        </button>
                    )}
                </>
            )}

        </div>
    );
}
import { Link } from "react-router-dom";

export default function CourseCard({
    course,
    progress = 0,
}) {
    return (
        <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500">

            <div className="mb-4">
                <h3 className="text-xl font-semibold">
                    {course.title}
                </h3>

                <p className="mt-2 text-slate-400">
                    {course.description}
                </p>
            </div>

            <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-400">
                        Progress
                    </span>

                    <span>
                        {progress}%
                    </span>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                    <div
                        className="h-2 rounded-full bg-indigo-500 transition-all"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            <Link
                to={`/course/${course._id}`}
                className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 font-medium transition hover:bg-indigo-500"
            >
                Continue Learning
            </Link>

        </div>
    );
}
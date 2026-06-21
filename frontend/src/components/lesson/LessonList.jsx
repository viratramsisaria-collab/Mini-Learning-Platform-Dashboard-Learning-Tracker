import LessonCard from "./LessonCard";

export default function LessonList({
    lessons,
    completedLessons,
    onComplete,
    onDelete,
    onEdit,
}) {
    return (
        <div className="space-y-4">
            {lessons.map((lesson) => (
                <LessonCard
                    key={lesson._id}
                    lesson={lesson}
                    completed={completedLessons.includes(
                        lesson._id.toString()
                    )}
                    onComplete={onComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
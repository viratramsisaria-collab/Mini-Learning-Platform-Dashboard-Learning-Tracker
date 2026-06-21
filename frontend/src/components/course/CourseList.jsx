import CourseCard from "./CourseCard";

export default function CourseList({ courses }) {
    if (courses.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
                <CourseCard
                    key={course._id}
                    course={course}
                />
            ))}
        </div>
    );
}
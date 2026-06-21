const formatProgress = (
    completed,
    total
) => {
    if (!total) return 0;

    return Math.round(
        (completed / total) * 100
    );
};

export default formatProgress;
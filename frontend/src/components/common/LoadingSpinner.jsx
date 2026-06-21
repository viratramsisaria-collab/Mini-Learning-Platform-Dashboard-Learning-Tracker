export default function LoadingSpinner() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">

                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-indigo-500"></div>

                <p className="text-slate-400">
                    Loading...
                </p>

            </div>
        </div>
    );
}
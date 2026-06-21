import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-black/90 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight"
                >
                    LearnHub
                </Link>

                <div className="flex items-center gap-8">

                    <Link
                        to="/"
                        className="text-slate-400 transition hover:text-white"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className="text-slate-400 transition hover:text-white"
                    >
                        Profile
                    </Link>

                    <div className="h-8 w-px bg-slate-800"></div>

                    <div className="text-right">
                        <p className="text-sm font-medium">
                            {user?.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm transition hover:border-slate-600 hover:bg-slate-900"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
}
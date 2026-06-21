import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData);
            navigate("/");
        } catch (error) {
            alert(
                error?.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white lg:grid lg:grid-cols-2">
            {/* Left Section */}
            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-16">
                <h1 className="mb-6 text-6xl font-bold">
                    LearnHub
                </h1>

                <p className="max-w-lg text-lg text-slate-200">
                    Learn new skills, track your progress,
                    and stay consistent with your goals.
                </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">
                    <h2 className="mb-3 text-4xl font-bold">
                        Welcome Back
                    </h2>

                    <p className="mb-10 text-slate-400">
                        Sign in to continue your learning journey.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-4
          py-3.5
          text-white
          outline-none
          transition
          focus:border-indigo-500
        "
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-300">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-indigo-400 hover:text-indigo-300"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-4
          py-3.5
          text-white
          outline-none
          transition
          focus:border-indigo-500
        "
                            />
                        </div>

                        <button
                            type="submit"
                            className="
        mt-2
        w-full
        rounded-xl
        bg-indigo-600
        py-3.5
        font-medium
        text-white
        transition
        hover:bg-indigo-500
      "
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 border-t border-slate-800 pt-6">
                        <p className="text-center text-slate-400">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
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
            await register(formData);
            navigate("/");
        } catch (error) {
            alert(
                error?.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white lg:grid lg:grid-cols-2">
            {/* Left Section */}
            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-950 p-16">
                <h1 className="mb-6 text-6xl font-bold">
                    LearnHub
                </h1>

                <p className="max-w-lg text-lg text-slate-200">
                    Start your learning journey and build
                    your skills one lesson at a time.
                </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">
                    <h2 className="mb-3 text-4xl font-bold">
                        Create Account
                    </h2>

                    <p className="mb-10 text-slate-400">
                        Join and start learning today.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
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
          focus:border-emerald-500
        "
                            />
                        </div>

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
          focus:border-emerald-500
        "
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Password
                            </label>

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
          focus:border-emerald-500
        "
                            />
                        </div>

                        <button
                            type="submit"
                            className="
        mt-2
        w-full
        rounded-xl
        bg-emerald-600
        py-3.5
        font-medium
        transition
        hover:bg-emerald-500
      "
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 border-t border-slate-800 pt-6">
                        <p className="text-center text-slate-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-emerald-400 hover:text-emerald-300"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
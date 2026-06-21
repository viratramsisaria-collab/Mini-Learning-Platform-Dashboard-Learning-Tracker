import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import CreateCourse from "./pages/CreateCourse";

import ProtectedRoute from "./components/layout/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/course/:id",
        element: (
            <ProtectedRoute>
                <CourseDetails />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "/course/new",
        element: (
            <ProtectedRoute>
                <CreateCourse />
            </ProtectedRoute>
        ),
    },
]);

export default router;
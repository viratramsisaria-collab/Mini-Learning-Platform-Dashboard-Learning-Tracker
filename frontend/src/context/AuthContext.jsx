import { createContext, useEffect, useState } from "react";

import {
    getMe,
    loginUser,
    logoutUser,
    registerUser,
} from "../api/auth.api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (formData) => {
        const res = await registerUser(formData);

        setUser(res.data.data);

        return res.data;
    };

    const login = async (formData) => {
        const res = await loginUser(formData);

        setUser(res.data.data);

        return res.data;
    };

    const logout = async () => {
        await logoutUser();

        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const res = await getMe();

            setUser(res.data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        fetchUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
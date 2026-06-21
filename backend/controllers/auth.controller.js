const authService = require("../services/auth.service");
const generateToken = require("../utils/jwt");
const sendResponse = require("../utils/response");

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        sendResponse(
            res,
            201,
            true,
            "User registered successfully",
            user
        );
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req.body);

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        sendResponse(
            res,
            200,
            true,
            "Login successful",
            user
        );
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        sendResponse(
            res,
            200,
            true,
            "Logout successful"
        );
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await authService.getCurrentUser(
            req.user._id
        );

        sendResponse(
            res,
            200,
            true,
            "User fetched successfully",
            user
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    getMe,
};
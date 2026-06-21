const User = require("../models/User");

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
};

const getCurrentUser = async (userId) => {
    return User.findById(userId).select("-password");
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
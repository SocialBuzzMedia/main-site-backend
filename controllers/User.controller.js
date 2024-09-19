// import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

//Checking the authentication
export const checkAuth = (req, res) => {
    res.status(200).json({ message: "User is Authenticated" });
};

// Register User
export const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists" });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if User Exsists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        // Validate Password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );

        res.cookie("token", token, { httpOnly: true })
            .status(200)
            .json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Logout
export const logoutUser = (req, res) => {
    res.clearCookie("token")
        .status(200)
        .json({ message: "Logged out successfully" });
};

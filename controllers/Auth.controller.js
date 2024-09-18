import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

// User Login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find User By UserName
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.statys(401).json({ message: "Invalid Credentials" });
        }

        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Create JWT TOKEN
        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: "1h",
        });

        // Send te token back to candidate
        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Protected Routes
export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token is not provided" });
    }

    try {
        // verify the token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; //Attach the decoded user to the req
        next(); //Proceed to the next  middleware or route
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

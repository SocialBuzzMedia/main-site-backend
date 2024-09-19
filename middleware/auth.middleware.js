import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

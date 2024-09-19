import express from "express";
import {
    checkAuth,
    loginUser,
    logoutUser,
    register,
} from "../controllers/User.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", verifyToken, checkAuth);

export default router;

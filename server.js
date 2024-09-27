import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/Auth.route.js";
import blogRoutes from "./routes/Blog.route.js";
import aboutRoutes from "./routes/About.route.js";
import employeeRoutes from "./routes/Employee.route.js";
import serviceRoutes from "./routes/Service.route.js";
import visionMissionRoutes from "./routes/VisionMission.route.js";
import clientScrollRoutes from "./routes/ClientScroll.route.js";

// Error Handler Routes
import {
    errorResponseHandler,
    invalidPathHandler,
} from "./utils/errorHandler.js";

// Initialize dotenv to use env
dotenv.config();
connectDB();

// initialize express app
const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use("/uploads", express.static("uploads"));

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/vision-mission", visionMissionRoutes);
app.use("/api/client", clientScrollRoutes);

// Custom error handlers
app.use(invalidPathHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

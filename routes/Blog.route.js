import express from "express";

// Middleware for upload and blog controller functions
import upload from "../middleware/uploads.middleware.js";
import {
    createBlog,
    getBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
} from "../controllers/Blogs.controller.js";

// initialize router
const router = express.Router();

// Create blog route
router.post("/", upload.single("bannerImage"), createBlog);

// All blog list route
router.get("/", getBlogs);

// To get the blog by slug
router.get("/:slug", getBlogBySlug);

// Update the blog
router.put("/:id", upload.single("bannerImage"), updateBlog);

// delete blog
router.delete("/:id", deleteBlog);

export default router;

import express from "express";
import upload from "../middleware/about.uploads.middleware.js";
import {
    createAbout,
    deleteAbout,
    getAbout,
    updateAbout,
} from "../controllers/About.controller.js";

const router = express.Router();

// Create a new about section
router.post("/", upload.single("image"), createAbout);

// Get list of all about cards
router.get("/", getAbout);

// Update About Card
router.put("/:id", upload.single("image"), updateAbout);

// Delete About Card
router.delete("/:id", deleteAbout);

export default router;

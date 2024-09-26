import express from "express";
import upload from "../middleware/visionMission.uploads.middleware.js";
import {
    createSection,
    deleteSection,
    getSection,
    updateSection,
} from "../controllers/VisionMission.controller.js";

const router = express.Router();

// Create a new section (Vision and Mission)
router.post("/", upload.single("image"), createSection);

// Get all sections
router.get("/", getSection);

// Update Sections by id
router.put("/:id", upload.single("image"), updateSection);

// Delete Sections by id
router.delete("/:id", deleteSection);

export default router;

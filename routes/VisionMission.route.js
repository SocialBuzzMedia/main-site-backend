import express from "express";
import upload from "../middleware/visionmission.uploads.middleware.js";
import {
    createSection,
    deleteSection,
    getAllSections,
    updateSection,
} from "../controllers/VisionMission.controller.js";

const router = express.Router();

// Create new section
router.post("/", upload.single("image"), createSection);

// Get all sections
router.get("/", getAllSections);

// Route for updating section
router.put("/:id", upload.single("image"), updateSection);

//Delete section
router.delete("/:id", deleteSection);

export default router;

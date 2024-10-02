import express from "express";
import {
    createFaq,
    deleteFaq,
    getAllFaq,
    updateFaq,
} from "../controllers/FAQ.controller.js";

const router = express.Router();

// Create FAQ
router.post("/", createFaq);

// FAQ List
router.get("/", getAllFaq);

// Update FAQ
router.put("/:id", updateFaq);

// Delete FAQ
router.delete("/:id", deleteFaq);

export default router;

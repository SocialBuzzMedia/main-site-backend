import express from "express";
import upload from "../middleware/service.uploads.middleware.js";
import {
    createService,
    deleteService,
    getAllServices,
    getAllVisibleServices,
    getServiceBySlug,
    updateService,
} from "../controllers/Service.controller.js";

const router = express.Router();

// Create Service
router.post("/", upload.single("image"), createService);

// All Service list
router.get("/", getAllServices);

// Get Service list by category
router.get("/visible", getAllVisibleServices);

// Get Service by slug
router.get("/:slug", getServiceBySlug);

// Update Service
router.put("/:id", upload.single("image"), updateService);

// Delete Service
router.delete("/:id", deleteService);

export default router;

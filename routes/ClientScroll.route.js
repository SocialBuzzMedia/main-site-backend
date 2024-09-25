import express from "express";

// Upload Middle Ware

import upload from "../middleware/clientScroll.uploads.middleware.js";
import {
    createClient,
    deleteClientScroll,
    getAllClient,
} from "../controllers/Clients.controller.js";

const router = express.Router();

// Create Client Route
router.post("/", upload.single("image"), createClient);

// Client Scroll List Route
router.get("/", getAllClient);

// Delete Client Route
router.delete("/:id", deleteClientScroll);

export default router;

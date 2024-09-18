import express from "express";

// upload middleware
import upload from "../middleware/employee.uploads.middleware.js";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployee,
    updateEmployee,
} from "../controllers/Employee.controller.js";

// Initializing Router
const router = express.Router();

// Create Blog Route
router.post("/", upload.single("image"), createEmployee);

// Employee List route
router.get("/", getAllEmployee);

//Update the blog
router.put("/:id", upload.single("image"), updateEmployee);

// Delete Route
router.delete("/:id", deleteEmployee);

export default router;

import AboutUs from "../models/About.model.js";
import path from "path";
import fs from "fs";

// Function to Create New Service
export const createAbout = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? `/uploads/about/${req.file.filename}` : null;

        const newAbout = new AboutUs({ title, description, image });
        await newAbout.save();
        res.status(201).json(newAbout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all About Sections
export const getAbout = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find();
        res.status(200).json(aboutUs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the About Sections
export const updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const aboutUs = await AboutUs.findById(id);

        if (!aboutUs) {
            res.statys(404).json({ message: "About not found" });
        }

        aboutUs.title = title || aboutUs.title;
        aboutUs.description = description || aboutUs.description;

        if (req.file) {
            // delete old image
            const oldImagePath = path.join(process.cwd(), aboutUs.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            aboutUs.image = `/uploads/about/${req.file.filename}`;
        }
        await aboutUs.save();
        res.status(200).json(aboutUs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a about post
export const deleteAbout = async (req, res) => {
    try {
        const aboutus = await AboutUs.findById(req.params.id);
        if (!aboutus) {
            return res.status(404).json({
                message: "About not found",
            });
        }
        // Delete the image
        const imagePath = path.join(process.cwd(), aboutus.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        await aboutus.deleteOne();
        res.status(200).json({ message: "About deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

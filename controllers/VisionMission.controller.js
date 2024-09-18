import VisionMission from "../models/VisionMission.model.js";
import path from "path";
import fs, { existsSync } from "fs";
// import Service from "../models/Services.model.js";

// Create a new vision and mission
export const createSection = async (req, res) => {
    try {
        const { title, description, type } = req.body;
        const image = req.file
            ? `/uploads/visionMission/${req.file.filename}`
            : null;

        const newSection = new VisionMission({
            title,
            description,
            type,
            image,
        });

        await newSection.save();
        res.status(200).json(newSection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Vision and Mission
export const getAllSections = async (req, res) => {
    try {
        const sections = await VisionMission.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a section by ID
export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const section = await VisionMission.findById(id);

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        section.title = title || section.title;
        section.description = description || section.description;

        if (req.file) {
            if (
                section.image &&
                existsSync(path.join(process.cwd(), section.image))
            ) {
                fs.unlinkSync(path.join(process.cwd(), section.image));
            }
            section.image = `/uploads/visionMission/${req.file.filename}`;
        }
        await section.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a section by ID
export const deleteSection = async (res, req) => {
    try {
        const { id } = req.params;
        const section = await VisionMission.findById(id);

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        if (
            section.image &&
            existsSync(path.join(process.cwd(), section.image))
        ) {
            fs.unlinkSync(path.join(process.cwd(), section.image));
        }

        await section.deleteOne();
        res.status(200).json({ message: "Section deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

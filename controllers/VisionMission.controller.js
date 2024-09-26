import VisionMission from "../models/VisionMission.model.js";
import fs from "fs";
import path from "path";

// Create
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
        res.status(201).json(newSection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Sections
export const getSection = async (req, res) => {
    try {
        const sections = await VisionMission.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update Sections
export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, type } = req.body;

        const section = await VisionMission.findById(id);

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        section.title = title || section.title;
        section.description = description || section.description;
        section.type = type || section.type;

        if (req.file) {
            const oldImagePath = path.join(process.cwd(), section.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            section.image = `/uploads/visionMission/${req.file.filename}`;
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Sections
export const deleteSection = async (req, res) => {
    try {
        const section = await VisionMission.findById(req.params.id);

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        // remove image file
        const imagePath = path.join(process.cwd(), section.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await section.deleteOne();
        res.status(200).json({ message: "Section deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

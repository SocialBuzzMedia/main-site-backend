import Service from "../models/Services.model.js";
import path from "path";
import fs, { existsSync } from "fs";

//Function to create a new service card
export const createService = async (req, res) => {
    try {
        const { title, description, whyChooseUs, whyEssential, category } =
            req.body;

        const slug = title.toLowerCase().split(" ").join("-");

        const image = req.file
            ? `/uploads/services/${req.file.filename}`
            : null;

        const newService = new Service({
            title,
            slug,
            description,
            whyChooseUs: JSON.parse(whyChooseUs),
            whyEssential: JSON.parse(whyEssential),
            category,
            image,
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all the services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Services they has category "Show"
export const getAllVisibleServices = async (req, res) => {
    try {
        const services = await Service.find({ category: "Show" });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get service by slug
export const getServiceBySlug = async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the selected service
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, whyChooseUs, whyEssential, category } =
            req.body;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Update the service
        service.title = title || service.title;
        service.description = description || service.description;
        service.whyChooseUs = whyChooseUs
            ? JSON.parse(whyChooseUs)
            : service.whyChooseUs;
        service.whyEssential = whyEssential
            ? JSON.parse(whyEssential)
            : service.whyEssential;
        service.category = category || service.category;
        service.slug = title
            ? title.toLowerCase().split(" ").join("-")
            : service.slug;

        // If new image is uploaded
        if (req.file) {
            if (
                service.image &&
                existsSync(path.join(process.cwd(), service.image))
            ) {
                // Delete the old image
                fs.unlinkSync(path.join(process.cwd(), service.image));
            }

            // Set the new image
            service.image = `/uploads/services/${req.file.filename}`;
        }
        await service.save();
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a service card
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Delete the image
        if (
            service.image &&
            existsSync(path.join(process.cwd(), service.image))
        ) {
            fs.unlinkSync(path.join(process.cwd(), service.image));
        }
        await service.deleteOne();
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import ClientScroll from "../models/Clients.model.js";
import path from "path";
import fs, { existsSync, rmSync } from "fs";

// Create a New Client Scroll Item
export const createClient = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file
            ? `uploads/client-scroll/${req.file.filename}`
            : null;

        const newClientScroll = new ClientScroll({
            name,
            image,
        });

        await newClientScroll.save();
        res.status(201).json(newClientScroll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Client Scroll Items
export const getAllClient = async (req, res) => {
    try {
        const clients = await ClientScroll.find({});
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Client Scroll Item
export const deleteClientScroll = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await ClientScroll.findById(id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Delete the image
        if (
            client.image &&
            existsSync(path.join(process.cwd(), client.image))
        ) {
            rmSync(path.join(process.cwd(), client.image));
        }
        await client.deleteOne();
        res.status(200).json({ message: "Client Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

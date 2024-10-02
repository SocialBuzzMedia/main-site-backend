// import Faq from "../models/FAQ.model.js";
import FaqSection from "../models/FAQ.model.js";

// Function to Create New FAQ
export const createFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const newFaq = new FaqSection({
            question,
            answer,
        });

        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to Get All FAQs
export const getAllFaq = async (req, res) => {
    try {
        const faqs = await FaqSection.find({});
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to Update FAQ
export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const faq = await FaqSection.findById(id);

        // Update the details
        faq.question = question || faq.question;
        faq.answer = answer || faq.answer;
        await faq.save();
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete the faq
export const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        const faq = await FaqSection.findById(id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ not found" });
        }

        await faq.deleteOne();
        res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

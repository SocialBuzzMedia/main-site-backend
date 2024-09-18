import mongoose from "mongoose";

// Schema for whyEssentials
const whyEssentialSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// Schema for whyChooseUs
const whyChooseUsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// Schema for main service
const serviceSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            // required: true,
        },
        slug: {
            type: String,
            // required: true,
            unique: true,
        },
        title: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        whyEssential: [whyEssentialSchema],
        whyChooseUs: [whyChooseUsSchema],
    },
    { timestamps: true }
);

// Create and Export model
const Service = mongoose.model("Service", serviceSchema);

export default Service;

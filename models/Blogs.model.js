import mongoose from "mongoose";

// Blog Schema
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            // required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishDate: {
            type: Date,
            default: Date.now,
        },
        bannerImage: {
            type: String,
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
    },
    { timestamps: true }
);

// Export the model
const Blog = mongoose.model("blog", blogSchema);
export default Blog;

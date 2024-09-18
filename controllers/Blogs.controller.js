import Blog from "../models/Blogs.model.js";
import path from "path";
import fs, { existsSync } from "fs";

// Function to create a new blog
export const createBlog = async (req, res) => {
    try {
        const {
            title,
            description,
            content,
            author,
            metaTitle,
            metaDescription,
        } = req.body;
        const slug = title.toLowerCase().split(" ").join("-");

        const bannerImage = req.file
            ? `/uploads/blogs/${req.file.filename}`
            : null;

        const newBlog = new Blog({
            title,
            slug,
            description,
            content,
            author,
            metaTitle,
            metaDescription,
            bannerImage,
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get blog by slug
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a blog by id
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            content,
            author,
            metaTitle,
            metaDescription,
        } = req.body;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update Details
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.content = content || blog.content;
        blog.author = author || blog.author;
        blog.metaTitle = metaTitle || blog.metaTitle;
        blog.metaDescription = metaDescription || blog.metaDescription;
        blog.slug = title
            ? title.toLowerCase().split(" ").join("-")
            : blog.slug;

        // if new image is uploaded
        if (req.file) {
            if (
                blog.bannerImage &&
                existsSync(path.join(process.cwd(), blog.bannerImage))
            ) {
                // Delete the old image
                fs.unlinkSync(path.join(process.cwd(), blog.bannerImage));
            }
            // Set the new image
            blog.bannerImage = `/uploads/blogs/${req.file.filename}`;
        }
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete the blog id
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Delete image from the filesystem
        if (
            blog.bannerImage &&
            existsSync(path.join(process.cwd(), blog.bannerImage))
        ) {
            fs.unlinkSync(path.join(process.cwd(), blog.bannerImage));
        }

        await blog.deleteOne();
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

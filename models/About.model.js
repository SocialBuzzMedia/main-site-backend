import mongoose from "mongoose";

// About Us Card Schema

const aboutSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

//Export the model
const AboutUs = mongoose.model("AboutUs", aboutSchema);
export default AboutUs;

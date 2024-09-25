import mongoose from "mongoose";

// Client Scroll Schema

const clientScrollSchema = new mongoose.Schema(
    {
        name: {
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

// Export Model
const ClientScroll = mongoose.model("ClientScroll", clientScrollSchema);
export default ClientScroll;

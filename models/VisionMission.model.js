import mongoose from "mongoose";
const visionMissionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            // enum: ["vision", "mission"],
        },
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
            // required: true,
        },
    },
    { timestamps: true }
);

const VisionMission = mongoose.model("VisionMission", visionMissionSchema);

export default VisionMission;

import mongoose from "mongoose";

// Employee Schema
const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        linkedin: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Export model

const EmployeeDetails = mongoose.model("EmployeeDetails", employeeSchema);
export default EmployeeDetails;

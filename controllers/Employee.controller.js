import EmployeeDetails from "../models/Employee.model.js";
import path from "path";
import fs, { existsSync } from "fs";

// Function to Create New Employee
export const createEmployee = async (req, res) => {
    try {
        const { name, designation, linkedin } = req.body;
        const image = req.file
            ? `/uploads/employee/${req.file.filename}`
            : null;

        const newEmployee = new EmployeeDetails({
            name,
            designation,
            linkedin,
            image,
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to Get All Employees
export const getAllEmployee = async (req, res) => {
    try {
        const employees = await EmployeeDetails.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update an Employee
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, designation, linkedin } = req.body;
        const employee = await EmployeeDetails.findById(id);

        // Update Details
        employee.name = name || employee.name;
        employee.designation = designation || employee.designation;
        employee.linkedin = linkedin || employee.linkedin;

        // If new image updated
        if (req.file) {
            if (
                employee.image &&
                existsSync(path.join(process.cwd(), employee.image))
            ) {
                // Delete the old image
                fs.unlinkSync(path.join(process.cwd(), employee.image));
            }

            //Set the new image
            employee.image = `/uploads/employee/${req.file.filename}`;
        }
        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete an Employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeDetails.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Delete Image from the file system
        if (
            employee.image &&
            existsSync(path.join(process.cwd(), employee.image))
        ) {
            // Delete the old image
            fs.unlinkSync(path.join(process.cwd(), employee.image));
        }

        await employee.deleteOne();
        res.status(200).json({ message: "Employee Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

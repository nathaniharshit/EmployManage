// backend/controllers/employeeController.ts

import { Request, Response } from 'express';
import EmployeeModel from '../models/Employee';

// GET all employees
export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error });
  }
};

// GET one employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// POST create a new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    console.log('Creating employee with data:', req.body); // helpful for debugging
    const newEmployee = new EmployeeModel(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(400).json({ message: 'Failed to create employee', error });
  }
};

// PUT update employee by ID
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update employee', error });
  }
};

// DELETE employee by ID
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete employee', error });
  }
};

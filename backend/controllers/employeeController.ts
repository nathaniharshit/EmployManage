import Employee from '../models/Employee';
import { Request, Response } from 'express';

export const getAllEmployees = async (req: Request, res: Response) => {
  const employees = await Employee.find();
  res.json(employees);
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).send('Not found');
  res.json(employee);
};

export const createEmployee = async (req: Request, res: Response) => {
  const newEmp = new Employee(req.body);
  await newEmp.save();
  res.status(201).json(newEmp);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).send('Not found');
  res.json(updated);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

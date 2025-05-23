// backend/routes/employeeRoutes.ts

import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';

const router = express.Router();

// GET all employees
router.get('/', getAllEmployees);

// GET a single employee by ID
router.get('/:id', getEmployeeById);

// POST a new employee
router.post('/', createEmployee);

// PUT update an existing employee
router.put('/:id', updateEmployee);

// DELETE an employee
router.delete('/:id', deleteEmployee);

export default router;

// services/employeeService.ts
import { Employee, EmployeeType } from '@/types/employee';

const API_URL = "http://localhost:5000/api/employees"; // Use your backend URL

export const getAllEmployees = async (): Promise<Employee[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Employee not found");
  return res.json();
};

export const createEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return res.json();
};

export const updateEmployee = async (
  id: string,
  data: Partial<Employee>
): Promise<Employee> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
};

export const uploadProfilePicture = async (file: File): Promise<string> => {
  // Simulated local upload
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
export type { Employee, EmployeeType };


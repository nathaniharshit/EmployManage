
import { toast } from 'sonner';

export type EmployeeType = 'fulltime' | 'parttime' | 'contractor' | 'intern';

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  type: EmployeeType;
  hireDate: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
}

// In-memory store for demo purposes
let employees: Employee[] = [
  {
    id: '1',
    name: 'Harshit Nathani',
    email: 'harshitvnathani@gmail.com',
    position: 'Frontend Developer',
    department: 'Engineering',
    type: 'fulltime',
    hireDate: '2022-01-15',
    phone: '7567608326',
    address: '39 Sindhu Park Society, Warashiya, Vadodara',
  },
  {
    id: '2',
    name: 'Pranay Pandey',
    email: 'pandeypranay@gmail.com',
    position: 'UX Designer',
    department: 'Design',
    type: 'fulltime',
    hireDate: '2021-11-10',
    phone: '9824037632',
  },
  {
    id: '3',
    name: 'Dev Singh Bisht',
    email: 'bishtdev@gmail.com',
    position: 'Backend Developer',
    department: 'Engineering',
    type: 'parttime',
    hireDate: '9876543678',
  },
  {
    id: '4',
    name: 'Nidhi Desai',
    email: 'desai nidhi@gmail.com',
    position: 'Product Manager',
    department: 'Product',
    type: 'fulltime',
    hireDate: '2022-08-05',
    phone: '9824037632',
    address: '45 Gotri Bunglows Gotri Vadoara',
  },
  {
    id: '5',
    name: 'Ashish khatwani',
    email: 'khatwaniashish@gmail.com',
    position: 'Marketing Specialist',
    department: 'Marketing',
    type: 'contractor',
    hireDate: '2023-01-20',
    phone: '7656789654',
  },
  {
    id: '6',
    name: 'Vansh Phatwani',
    email: 'phatwanivansh@gmail.com',
    position: 'Marketing Manager',
    department: 'Marketing',
    type: 'fulltime',
    hireDate: '2021-05-15',
    phone: '6547897654',
  },
  {
    id: '7',
    name: 'Khush Patel',
    email: 'patelkhush@gmail.com',
    position: 'DevOps Engineer',
    department: 'Engineering',
    type: 'parttime',
    hireDate: '2022-11-10',
    phone: '6453789230'
  },
  {
    id: '8',
    name: 'Nidhi Jain',
    email: 'jainnishi@gmail.com',
    position: 'Content Writer',
    department: 'Marketing',
    type: 'parttime',
    hireDate: '2023-04-18'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllEmployees = async (): Promise<Employee[]> => {
  await delay(500);
  return [...employees];
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  await delay(300);
  const employee = employees.find(emp => emp.id === id);
  return employee || null;
};

export const searchEmployees = async (query: string): Promise<Employee[]> => {
  await delay(300);
  query = query.toLowerCase();
  return employees.filter(
    emp => 
      emp.name.toLowerCase().includes(query) || 
      emp.email.toLowerCase().includes(query) || 
      emp.position.toLowerCase().includes(query) || 
      emp.department.toLowerCase().includes(query)
  );
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  await delay(700);
  const newEmployee: Employee = {
    ...employee,
    id: Date.now().toString(),
  };
  employees = [...employees, newEmployee];
  toast.success('Employee created successfully');
  return newEmployee;
};

export const updateEmployee = async (id: string, employee: Partial<Employee>): Promise<Employee> => {
  await delay(700);
  const index = employees.findIndex(emp => emp.id === id);
  
  if (index === -1) {
    toast.error('Employee not found');
    throw new Error('Employee not found');
  }
  
  employees[index] = { ...employees[index], ...employee };
  toast.success('Employee updated successfully');
  return employees[index];
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  await delay(700);
  const initialLength = employees.length;
  employees = employees.filter(emp => emp.id !== id);
  
  if (employees.length === initialLength) {
    toast.error('Employee not found');
    return false;
  }
  
  toast.success('Employee deleted successfully');
  return true;
};

export const uploadProfilePicture = async (file: File): Promise<string> => {
  await delay(1000);
  // In a real app, this would upload to a server and return the URL
  
  // For demo purposes, create a data URL from the file
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

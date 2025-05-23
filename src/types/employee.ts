// employeeService.ts or wherever you define the employee types

export type EmployeeType = "fulltime" | "parttime" | "contractor" | "intern";

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  type: EmployeeType;
  hireDate: string;
  phone?: string;
  address: string;
  profilePicture?: string;
}

// Your upload function, for example
export async function uploadProfilePicture(file: File): Promise<string> {
  // mock upload
  return URL.createObjectURL(file);
}

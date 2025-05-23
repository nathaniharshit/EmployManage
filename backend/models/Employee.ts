// backend/models/Employee.ts

import mongoose, { Document } from 'mongoose';

export type EmployeeType = 'fulltime' | 'parttime' | 'contractor' | 'intern';

export interface Employee extends Document {
  name: string;
  email: string;
  position: string;
  department: string;
  type: EmployeeType;
  hireDate: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const EmployeeSchema = new mongoose.Schema<Employee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, enum: ['fulltime', 'parttime', 'contractor', 'intern'], required: true },
    hireDate: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model<Employee>('Employee', EmployeeSchema);

export default EmployeeModel;

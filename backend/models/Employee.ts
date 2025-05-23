import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, enum: ['fulltime', 'parttime', 'contractor', 'intern'], required: true },
  hireDate: { type: String, required: true },
  phone: String,
  address: String,
  profilePicture: String,
});

export default mongoose.model('Employee', employeeSchema);

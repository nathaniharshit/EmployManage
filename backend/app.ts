import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("MongoDB connected"));

app.use('/api/employees', employeeRoutes);

export default app;

import 'reflect-metadata';
import cors from 'cors';
import mongoose from 'mongoose';
import { errorInterceptor } from 'middleware/errorInterceptor';
import express from 'express';
import 'express-async-errors';
import employeeRouter from './modules/employees/routes/EmployeeRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/employees', employeeRouter);
app.use(errorInterceptor);

mongoose
  .connect('mongodb://localhost:27017/RBRdb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

export default app;

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import employeeRouter from './modules/employees/routes/CompanyRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/employee', employeeRouter);

export default app;

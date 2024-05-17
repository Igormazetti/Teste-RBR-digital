import { Router } from 'express';
import EmployeesController from '../controllers/EmployeesController';

const employeeRouter = Router();
const employeeController = new EmployeesController();

employeeRouter.post('/', employeeController.create);

export default employeeRouter;

import { Router } from 'express';
import EmployeesController from '../controllers/EmployeesController';

const employeeRouter = Router();
const employeeController = new EmployeesController();

employeeRouter.get('/', employeeController.getAll);
employeeRouter.get('/:id', employeeController.getById);
employeeRouter.post('/', employeeController.create);
employeeRouter.put('/:id', employeeController.update);
employeeRouter.delete('/:id', employeeController.delete);

export default employeeRouter;

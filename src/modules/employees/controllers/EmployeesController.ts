import { Request, Response } from 'express';
import * as yup from 'yup';
import { container } from 'tsyringe';
import CreateEmployeeService from '../services/CreateEmployeeService';
import EditEmployeeService from '../services/EditEmployeeService';

const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter mais de três caracteres'),
  job: yup
    .string()
    .required('Job is required')
    .min(3, 'Cargo deve ter mais de três caracteres'),
  department: yup
    .string()
    .required('Department is required')
    .min(3, 'Departamento deve ter mais de três caracteres'),
});

const updateEmployeeSchema = yup.object().shape({
  name: yup.string().optional().min(3, 'Nome deve ter mais de três caracteres'),
  job: yup.string().optional().min(3, 'Cargo deve ter mais de três caracteres'),
  department: yup
    .string()
    .optional()
    .min(3, 'Departamento deve ter mais de três caracteres'),
});

export default class EmployeesController {
  public async create(request: Request, response: Response) {
    const creteEmployeeService = container.resolve(CreateEmployeeService);
    await employeeSchema.validate(request.body, { abortEarly: false });

    const { name, job, department } = request.body;

    await creteEmployeeService.execute({ name, job, department });

    return response.status(201).json();
  }

  public async update(request: Request, response: Response) {
    const editEmployeeService = container.resolve(EditEmployeeService);
    await updateEmployeeSchema.validate(request.body, { abortEarly: false });

    const { id } = request.params;

    const { name, job, department } = request.body;

    await editEmployeeService.execute({ id, data: { name, job, department } });

    return response.status(201).json();
  }
}

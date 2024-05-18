import { Request, Response } from 'express';
import * as yup from 'yup';
import { container } from 'tsyringe';
import CreateEmployeeService from '../services/CreateEmployeeService';
import EditEmployeeService from '../services/EditEmployeeService';
import GetEmployeeByIdService from '../services/GetEmployeeByIdService';
import EmployeeRepository from '../repositories/EmployeeRepository';
import DeleteEmployeeService from '../services/DeleteEmployeeService';

const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter mais de três caracteres'),
  job: yup
    .string()
    .required('Cargo é obrigatório')
    .min(3, 'Cargo deve ter mais de três caracteres'),
  department: yup
    .string()
    .required('Departamento é obrigatório')
    .min(3, 'Departamento deve ter mais de três caracteres'),
  admission: yup.date().required('Data de admissão é obrigatória'),
});

const updateEmployeeSchema = yup.object().shape({
  name: yup.string().optional().min(3, 'Nome deve ter mais de três caracteres'),
  job: yup.string().optional().min(3, 'Cargo deve ter mais de três caracteres'),
  department: yup
    .string()
    .optional()
    .min(3, 'Departamento deve ter mais de três caracteres'),
  admission: yup.date().optional(),
});

export default class EmployeesController {
  public async getAll(request: Request, response: Response) {
    const employeeRepository = new EmployeeRepository();

    const employees = await employeeRepository.findAll();

    return response.status(201).json(employees);
  }

  public async create(request: Request, response: Response) {
    const creteEmployeeService = container.resolve(CreateEmployeeService);
    await employeeSchema.validate(request.body, { abortEarly: false });

    const { name, job, department, admission } = request.body;

    await creteEmployeeService.execute({ name, job, department, admission });

    return response.status(201).json();
  }

  public async update(request: Request, response: Response) {
    const editEmployeeService = container.resolve(EditEmployeeService);
    await updateEmployeeSchema.validate(request.body, { abortEarly: false });

    const { id } = request.params;

    const { name, job, department, admission } = request.body;

    await editEmployeeService.execute({
      id,
      data: { name, job, department, admission },
    });

    return response.status(201).json();
  }

  public async getById(request: Request, response: Response) {
    const getEmployeeByIdService = container.resolve(GetEmployeeByIdService);
    await updateEmployeeSchema.validate(request.body, { abortEarly: false });

    const { id } = request.params;

    const employeeDetails = await getEmployeeByIdService.execute(id);

    return response.status(201).json(employeeDetails);
  }

  public async delete(request: Request, response: Response) {
    const deleteEmployeeService = container.resolve(DeleteEmployeeService);
    await updateEmployeeSchema.validate(request.body, { abortEarly: false });

    const { id } = request.params;

    const employeeDetails = await deleteEmployeeService.execute(id);

    return response.status(201).json(employeeDetails);
  }
}

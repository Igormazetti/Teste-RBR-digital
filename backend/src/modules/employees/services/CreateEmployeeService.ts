import { CustomError } from '../../../common/error/CustomError';
import EmployeeRepository from '../repositories/EmployeeRepository';

interface IRequest {
  name: string;
  job: string;
  department: string;
  admission: Date;
}

export default class CreateEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute({ name, job, department, admission }: IRequest) {
    const checkIfEmployeeExists = await this.employeeRepository.findByName(
      name,
    );

    if (checkIfEmployeeExists) {
      throw new CustomError('Funcionário já cadastrado!', 422);
    }

    await this.employeeRepository.create({ name, job, department, admission });
  }
}

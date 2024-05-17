import { CustomError } from '../../../common/error/CustomError';
import EmployeeRepository from '../repositories/EmployeeRepository';

interface IRequest {
  id: string;
  data: {
    name?: string;
    job?: string;
    department?: string;
  };
}

export default class EditEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute({ id, data }: IRequest) {
    const checkIfEmployeeExists = await this.employeeRepository.findById(id);

    if (!checkIfEmployeeExists) {
      throw new CustomError('Funcionário não encontrado!', 404);
    }

    await this.employeeRepository.update(id, data);
  }
}

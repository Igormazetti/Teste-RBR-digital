import { CustomError } from '../../../common/error/CustomError';
import EmployeeRepository from '../repositories/EmployeeRepository';

export default class GetEmployeeByIdService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute(id: string) {
    const employeeDetails = await this.employeeRepository.findById(id);

    if (!employeeDetails) {
      throw new CustomError('Funcionário não encontrado!', 404);
    }

    return employeeDetails;
  }
}

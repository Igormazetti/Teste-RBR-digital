import { EmployeeDoc, Employee, IEmployee } from '../models/employee';

export default class EmployeeRepository {
  public async create({
    name,
    job,
    department,
    admission,
  }: IEmployee): Promise<void> {
    const newEmployee = Employee.build({
      name,
      job,
      department,
      admission,
    });

    await newEmployee.save();
  }

  public async findAll(): Promise<EmployeeDoc[]> {
    const employees = await Employee.find({});

    return employees;
  }

  public async findById(id: string): Promise<EmployeeDoc | null> {
    const employee = await Employee.findById(id);

    return employee;
  }

  public async findByName(name: string): Promise<EmployeeDoc | null> {
    const employee = await Employee.findOne({ name });

    return employee;
  }

  public async update(
    id: string,
    updateData: Partial<IEmployee>,
  ): Promise<void> {
    await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  public async delete(id: string): Promise<void> {
    await Employee.findByIdAndDelete(id);
  }
}

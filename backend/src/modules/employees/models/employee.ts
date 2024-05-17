import mongoose from 'mongoose';

export interface IEmployee {
  name: string;
  job: string;
  department: string;
}

export interface EmployeeDoc extends mongoose.Document {
  name: string;
  job: string;
  department: string;
}

interface IEmployeeModel extends mongoose.Model<EmployeeDoc> {
  build(attr: IEmployee): EmployeeDoc;
}

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

employeeSchema.statics.build = (attr: IEmployee) =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  new Employee(attr);

const Employee = mongoose.model<EmployeeDoc, IEmployeeModel>(
  'Employee',
  employeeSchema,
);

export { Employee };

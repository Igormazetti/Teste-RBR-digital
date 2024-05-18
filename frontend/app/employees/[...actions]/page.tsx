import axios from "axios";
import EmployeesForm from "../components/EmployeesForm";

type Params = {
  params: {
    actions: string | string[];
  };
};

export default async function HandleContract({ params }: Params) {
  const action = params.actions[0];
  const id = params.actions[1];

  if (action === "edit") {
    const employee = await axios({
      method: "get",
      url: `http://localhost:6060/api/employees/${id}`,
    });

    return <EmployeesForm employee={employee.data} type={action} />;
  }

  return <EmployeesForm type={action} />;
}

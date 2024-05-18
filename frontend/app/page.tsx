import ButtonComponent from "@/components/Button/ButtonComponent";
import EmployeesTable from "@/components/EmployeesTable/EmployeesTable";
import axios from "axios";

export interface Employee {
  _id: string;
  name: string;
  job: string;
  department: string;
}

export default async function Home() {
  const employees = await axios({
    method: "get",
    url: "http://localhost:6060/api/employees",
  });

  return (
    <div style={{ padding: "20px" }}>
      <EmployeesTable employees={employees.data} />
    </div>
  );
}

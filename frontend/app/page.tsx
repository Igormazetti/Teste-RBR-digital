"use client";
import EmployeesTable from "@/components/EmployeesTable/EmployeesTable";
import axios from "axios";
import { useQuery } from "react-query";

export interface Employee {
  _id: string;
  name: string;
  job: string;
  department: string;
}

export default function Home() {
  const {
    data: employeesData,
    isLoading,
    error: fetchingError,
    refetch,
  } = useQuery<Employee[]>(["employees-query"], () => getContractModels(), {
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const getContractModels = async (): Promise<Employee[]> => {
    const employees = await axios({
      method: "get",
      url: "http://localhost:6060/api/employees",
    });

    return employees.data || [];
  };

  return (
    <div style={{ padding: "20px" }}>
      <EmployeesTable employees={employeesData || []} refetch={refetch} />
    </div>
  );
}

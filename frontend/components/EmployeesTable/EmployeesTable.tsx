"use client";
import React from "react";
import { Employee } from "@/app/page";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import ButtonComponent from "../Button/ButtonComponent";

interface EmployeesTableProps {
  employees: Employee[];
}

export default function EmployeesTable({ employees }: EmployeesTableProps) {
  const route = useRouter();

  return (
    <Box overflowX="auto" height="calc(100vh - 200px)" borderBottom="1px" borderColor="gray.200">
      <Table variant="simple" border="1px" rounded="md" borderColor="gray.200">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Cargo</Th>
            <Th>Departamento</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.name}</Td>
              <Td>{employee.job}</Td>
              <Td>{employee.department}</Td>
              <Td display="flex" gap={2} justifyContent="center">
                <ButtonComponent color="teal" size="sm" onClick={() => route.push(`/employees/edit/${employee._id}`)}>
                  Editar
                </ButtonComponent>

                <ButtonComponent color="red" size="sm" onClick={() => route.push(`/employees/edit/${employee._id}`)}>
                  Excluir
                </ButtonComponent>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

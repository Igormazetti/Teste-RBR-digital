import { Employee } from "@/app/page";
import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ButtonComponent from "../Button/ButtonComponent";

interface EmployeesCardProps {
  employee: Employee;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function EmployeesCard({ employee, handleEdit, handleDelete }: EmployeesCardProps) {
  return (
    <Box border="1px" borderRadius="md" borderColor="gray.200" p={4}>
      <Text>Nome: {employee.name}</Text>
      <Text>Cargo: {employee.job}</Text>
      <Text>Departamento: {employee.department}</Text>

      <Box display="flex" gap={2} mt={2}>
        <ButtonComponent color="teal" size="sm" onClick={handleEdit}>
          Editar
        </ButtonComponent>

        <ButtonComponent color="red" size="sm" onClick={handleDelete}>
          Excluir
        </ButtonComponent>
      </Box>
    </Box>
  );
}

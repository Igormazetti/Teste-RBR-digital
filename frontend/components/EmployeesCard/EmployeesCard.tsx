import { Employee } from "@/app/page";
import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ButtonComponent from "../Button/ButtonComponent";
import { Pencil, Trash } from "@phosphor-icons/react";

interface EmployeesCardProps {
  employee: Employee;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function EmployeesCard({ employee, handleEdit, handleDelete }: EmployeesCardProps) {
  return (
    <Box border="1px" borderRadius="md" borderColor="gray.300" p={4}>
      <Text>Nome: {employee.name}</Text>
      <Text>Cargo: {employee.job}</Text>
      <Text>Departamento: {employee.department}</Text>

      <Box display="flex" gap={2} mt={2} w-full>
        <ButtonComponent color="teal" size="md" onClick={handleEdit}>
          <Pencil size={20} />
        </ButtonComponent>

        <ButtonComponent color="red" size="md" onClick={handleDelete}>
          <Trash size={20} />
        </ButtonComponent>
      </Box>
    </Box>
  );
}

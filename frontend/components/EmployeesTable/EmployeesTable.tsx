"use client";
import React, { useState } from "react";
import { Employee } from "@/app/page";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import ButtonComponent from "../Button/ButtonComponent";
import axios from "axios";
import { queryClient } from "@/libs/react-query/queryClient";
import RemoveEmployeesDialog from "../Dialog/RemoveEmployeesDialog";

interface EmployeesTableProps {
  employees: Employee[];
  refetch: () => void;
}

export default function EmployeesTable({ employees, refetch }: EmployeesTableProps) {
  const route = useRouter();
  const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);
  const [idToRemove, setIdToRemove] = useState<string>();

  const handleRemoveEmployee = async () => {
    try {
      await axios.delete(`http://localhost:6060/api/employees/${idToRemove}`);
      refetch();
      setOpenRemoveDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box display="flex" w="full" justifyContent="space-between" mb={4}>
        <Text fontSize="20px">RBR Digital</Text>
        <ButtonComponent color="blue" size="lg" onClick={() => route.push("/employees/add")}>
          Adicionar Funcionário
        </ButtonComponent>
      </Box>

      <Box overflowX="auto" height="calc(100vh - 200px)">
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

                  <ButtonComponent
                    color="red"
                    size="sm"
                    onClick={() => {
                      setIdToRemove(employee._id);
                      setOpenRemoveDialog(true);
                    }}
                  >
                    Excluir
                  </ButtonComponent>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <RemoveEmployeesDialog
        isOpen={openRemoveDialog}
        onClose={() => {
          setOpenRemoveDialog(false);
        }}
        handleRemove={handleRemoveEmployee}
      />
    </>
  );
}

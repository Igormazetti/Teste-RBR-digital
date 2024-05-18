"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Employee } from "@/app/page";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Input } from "@chakra-ui/react";
import ButtonComponent from "../Button/ButtonComponent";
import RemoveEmployeesDialog from "../Dialog/RemoveEmployeesDialog";
import EmployeesCard from "../EmployeesCard/EmployeesCard";

import { useWindowSize } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface EmployeesTableProps {
  employees: Employee[];
  refetch: () => void;
}

export default function EmployeesTable({ employees, refetch }: EmployeesTableProps) {
  const route = useRouter();
  const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);
  const [idToRemove, setIdToRemove] = useState<string>();
  const [search, setSearch] = useState<string>("");

  const size = useWindowSize();
  const isMobile = useMemo(() => size.width && size.width < 660, [size]);

  const filteredRows = employees.filter((row) => JSON.stringify(row)?.toUpperCase().includes(search.toUpperCase())) || [];

  const handleRemoveEmployee = async () => {
    try {
      await axios.delete(`http://localhost:6060/api/employees/${idToRemove}`);
      refetch();
      setOpenRemoveDialog(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "Falha ao remover funcionário");
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        gap={{ base: 4, md: 0 }}
        w="full"
        justifyContent="space-between"
        mb={4}
      >
        <Text fontSize="20px">RBR Digital</Text>

        <Box display="flex" gap={4}>
          <Box display="flex" alignItems="center" position="relative">
            <Input id="search" size="lg" placeholder="Busca" w="300px" onChange={(event) => setSearch(event.target.value)} />
            <Box position="absolute" right={2}>
              <MagnifyingGlass size={20} />
            </Box>
          </Box>
          <ButtonComponent color="blue" size="lg" onClick={() => route.push("/employees/add")}>
            Adicionar Funcionário
          </ButtonComponent>
        </Box>
      </Box>

      {isMobile ? (
        <Box display="flex" flexDir="column" gap={2} overflowX="auto" height="calc(100vh - 100px)">
          {filteredRows.map((employee) => (
            <EmployeesCard
              key={employee._id}
              employee={employee}
              handleEdit={() => route.push(`/employees/edit/${employee._id}`)}
              handleDelete={() => {
                setIdToRemove(employee._id);
                setOpenRemoveDialog(true);
              }}
            />
          ))}
        </Box>
      ) : (
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
              {filteredRows.map((employee) => (
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
      )}

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

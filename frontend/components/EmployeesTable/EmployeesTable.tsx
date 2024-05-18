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
import { dateFormatter } from "../../utils/dateFormatter";

interface EmployeesTableProps {
  employees: Employee[];
  refetch: () => void;
}

export default function EmployeesTable({ employees, refetch }: EmployeesTableProps) {
  const route = useRouter();
  const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);
  const [idToRemove, setIdToRemove] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortOrderAdmissionDate, setSortOrderAdmissionDate] = useState<"asc" | "desc">("asc");

  console.log(employees);

  const size = useWindowSize();
  const isMobile = useMemo(() => size.width && size.width < 660, [size]);

  const handleSortByName = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByAdmissionDate = () => {
    setSortOrderAdmissionDate(sortOrderAdmissionDate === "asc" ? "desc" : "asc");
  };

  const filteredRows = useMemo(() => {
    let sortedRows = [...employees];

    sortedRows.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    if (sortOrderAdmissionDate === "asc" || sortOrderAdmissionDate === "desc") {
      sortedRows.sort((a, b) => {
        const dateA = new Date(a.admission).getTime();
        const dateB = new Date(b.admission).getTime();
        if (sortOrderAdmissionDate === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    return sortedRows.filter((row) => JSON.stringify(row)?.toUpperCase().includes(search.toUpperCase()));
  }, [employees, search, sortOrder, sortOrderAdmissionDate]);

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
        <Text fontSize="24px">RBR Digital</Text>

        <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={4}>
          <Box display="flex" alignItems="center" position="relative">
            <Input
              id="search"
              size="lg"
              placeholder="Busca"
              w="300px"
              border="1px"
              borderColor="gray.300"
              onChange={(event) => setSearch(event.target.value)}
            />
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
          <Table variant="simple" border="1px" rounded="md" borderColor="gray.300">
            <Thead>
              <Tr bg="teal">
                <Th textColor="white" onClick={handleSortByName} cursor="pointer">
                  Nome
                </Th>
                <Th textColor="white">Cargo</Th>
                <Th textColor="white">Departamento</Th>
                <Th textColor="white" onClick={handleSortByAdmissionDate} cursor="pointer">
                  Data de admissão
                </Th>
                <Th textColor="white" textAlign="center">
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredRows.map((employee) => (
                <Tr key={employee._id}>
                  <Td borderColor="gray.300">{employee.name}</Td>
                  <Td borderColor="gray.300">{employee.job}</Td>
                  <Td borderColor="gray.300">{employee.department}</Td>
                  <Td borderColor="gray.300">{dateFormatter(employee.admission)}</Td>
                  <Td display="flex" gap={2} justifyContent="center" borderColor="gray.300">
                    <ButtonComponent color="teal" size="md" onClick={() => route.push(`/employees/edit/${employee._id}`)}>
                      Editar
                    </ButtonComponent>

                    <ButtonComponent
                      color="red"
                      size="md"
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

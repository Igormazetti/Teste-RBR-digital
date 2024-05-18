"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { queryClient } from "@/libs/react-query/queryClient";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Employee } from "@/app/page";
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Text } from "@chakra-ui/react";
import ButtonComponent from "@/components/Button/ButtonComponent";

import { toast } from "react-toastify";
import { formatISODate } from "@/utils/dateFormatter";

interface EmployeesFormProps {
  employee?: Employee;
  type: string;
}

interface EmployeeFormData {
  name: string;
  job: string;
  department: string;
  admission: string;
}

const employeeSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").min(3, "Quantidade de caracteres inválida, mínimo 3"),
  job: yup.string().required("Cargo é obrigatório").min(3, "Quantidade de caracteres inválida, mínimo 3"),
  department: yup.string().required("Departamento é obrigatório").min(3, "Quantidade de caracteres inválida, mínimo 3"),
  admission: yup.string().required("Data de admissão é obrigatória"),
});

export default function EmployeesForm({ employee, type }: EmployeesFormProps) {
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: employee && employee.name ? employee.name : "",
      job: employee && employee.job ? employee.job : "",
      department: employee && employee.department ? employee.department : "",
      admission: employee && employee.admission ? formatISODate(employee.admission) : formatISODate(),
    },
  });

  const onSubmitHandler = async (data: EmployeeFormData) => {
    if (type === "edit" && employee) {
      try {
        await axios.put(`http://localhost:6060/api/employees/${employee._id}`, data);
        toast.success("Funcionário editado com sucesso!");
        queryClient.removeQueries({
          queryKey: ["employees-query"],
        });
        route.push("/");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message || "Falha ao editar funcionário!");
      }
    }

    if (type === "add") {
      try {
        await axios.post(`http://localhost:6060/api/employees`, data);
        toast.success("Funcionário criado com sucesso!");
        queryClient.removeQueries({
          queryKey: ["employees-query"],
        });
        route.push("/");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message || "Falha ao criar funcionário!");
      }
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" h="full" w="full" p={20}>
      <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={{ base: 2, md: 0 }} w="full" justifyContent="space-between">
        <Text fontSize="24px">{type === "edit" ? "Editar Funcionário" : "Adicionar Funcionário"}</Text>
        <ButtonComponent color="teal" size="lg" onClick={() => route.back()}>
          Voltar
        </ButtonComponent>
      </Box>
      <Box p={8} w="full" mt={4} maxWidth="500px" borderWidth={1} borderRadius="lg" boxShadow="lg">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input size="lg" border="1px" borderColor="gray.300" placeholder="Insira o nome" {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.job}>
              <FormLabel htmlFor="job">Cargo</FormLabel>
              <Input size="lg" border="1px" borderColor="gray.300" id="job" placeholder="Insira o cargo" {...register("job")} />
              <FormErrorMessage>{errors.job?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.department}>
              <FormLabel htmlFor="department">Departamento</FormLabel>
              <Input
                size="lg"
                border="1px"
                borderColor="gray.300"
                id="department"
                placeholder="Insira o departamento"
                {...register("department")}
              />
              <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.department}>
              <FormLabel htmlFor="admission">Data de admissão</FormLabel>
              <Input
                size="lg"
                type="date"
                border="1px"
                borderColor="gray.300"
                id="admission"
                placeholder="Insira a data de admissão"
                {...register("admission")}
              />
              <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
            </FormControl>

            <Button colorScheme={type === "edit" ? "teal" : "blue"} type="submit" size="lg">
              {type === "edit" ? "Editar" : "Adicionar"}
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
}

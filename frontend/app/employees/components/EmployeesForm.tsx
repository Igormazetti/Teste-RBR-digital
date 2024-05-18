"use client";
import React from "react";
import { Employee } from "@/app/page";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ButtonComponent from "@/components/Button/ButtonComponent";
import RemoveEmployeesDialog from "./RemoveEmployeesDialog";

interface EmployeesFormProps {
  employee?: Employee;
  type: string;
}

interface EmployeeFormData {
  name: string;
  job: string;
  department: string;
}

const employeeSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").min(3, "Quantidade de caracteres inválida, mínimo 3"),
  job: yup.string().required("Cargo é obrigatório").min(3, "Quantidade de caracteres inválida, mínimo 3"),
  department: yup.string().required("Departamento é obrigatório").min(3, "Quantidade de caracteres inválida, mínimo 3"),
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
    },
  });

  console.log(errors);

  const onSubmitHandler = async (data: EmployeeFormData) => {
    if (type === "edit" && employee) {
      try {
        await axios.put(`http://localhost:6060/api/employees/${employee._id}`, data);
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "add" && employee) {
      try {
        await axios.post(`http://localhost:6060/api/employees`, data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" h="full" w="full" p={4}>
      <Box display="flex" flexDirection={{ base: "column", md: "row" }} w="full" justifyContent="space-between">
        <Text>{type === "edit" ? "Editar Funcionário" : "Adicionar Funcionário"}</Text>
        <ButtonComponent color="teal" size="sm" onClick={() => route.back()}>
          Voltar
        </ButtonComponent>
      </Box>
      <Box p={8} w="full" maxWidth="500px" borderWidth={1} borderRadius="lg" boxShadow="lg">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input id="name" placeholder="Nome" {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.job}>
              <FormLabel htmlFor="job">Cargo</FormLabel>
              <Input id="job" placeholder="Cargo" {...register("job")} />
              <FormErrorMessage>{errors.job?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.department}>
              <FormLabel htmlFor="department">Departamento</FormLabel>
              <Input id="department" placeholder="Departamento" {...register("department")} />
              <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
            </FormControl>

            <Button colorScheme="teal" type="submit">
              {type === "edit" ? "Editar" : "Adicionar"}
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
}

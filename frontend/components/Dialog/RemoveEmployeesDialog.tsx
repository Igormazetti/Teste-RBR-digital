import ButtonComponent from "@/components/Button/ButtonComponent";
import Dialog from "@/components/Dialog/Dialog";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface RemoveEmployeesDialog {
  isOpen: boolean;
  onClose: () => void;
  handleRemove: () => void;
}

export default function RemoveEmployeesDialog({ isOpen, onClose, handleRemove }: RemoveEmployeesDialog) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Box p={4}>
        <Text fontSize="24px" w="full" textAlign="center">
          Remover Funcionário
        </Text>

        <Text fontSize="18px" w="full" textAlign="center" mt={8}>
          Deseja realmente remover este funcionário?
        </Text>

        <Box display="flex" w="full" gap={4} justifyContent="center" mt={8}>
          <ButtonComponent color="blue" onClick={onClose} size="lg">
            Cancelar
          </ButtonComponent>
          <ButtonComponent color="red" onClick={handleRemove} size="lg">
            Remover
          </ButtonComponent>
        </Box>
      </Box>
    </Dialog>
  );
}

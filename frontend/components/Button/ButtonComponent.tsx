"use client";
import React, { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

interface ButtonProps {
  color: string;
  size: "sm" | "md" | "lg";
  children?: ReactNode;
  onClick: () => void;
}

export default function ButtonComponent({ color, size, children, onClick }: ButtonProps) {
  return (
    <Button colorScheme={color} size={size} onClick={onClick}>
      {children}
    </Button>
  );
}

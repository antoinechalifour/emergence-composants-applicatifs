import React, { ReactNode } from "react";

interface CustomButtonProps {
  type: "button" | "submit";
  children: ReactNode;
}

export const CustomButton = ({ type, children }: CustomButtonProps) => (
  <button type={type}>{children}</button>
);

import { HTMLProps, ReactNode } from "react";

interface CustomInputProps {
  label: ReactNode;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  inputProps?: Omit<HTMLProps<HTMLInputElement>, "type">;
}

export const CustomInput = ({
  name,
  value,
  onChange,
  inputProps,
  label,
}: CustomInputProps) => (
  <>
    <input
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...inputProps}
    />
    <label htmlFor={name}>{label}</label>
  </>
);

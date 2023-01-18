import { FC } from "react";

export type FormInputProps = {
  label: string;
  type?: "number" | "text" | "date" | "password" | "email";
  value?: string;
  onChange?: (value: string) => void;
};

export const FormInput: FC<FormInputProps> = ({ label, type = "text", value, onChange }) => {
  return (
    <label className="flex justify-between">
      <span>{label}</span>
      <input type={type} />
    </label>
  );
};

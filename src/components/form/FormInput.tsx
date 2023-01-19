import { cn } from "@/utils/classNames";
import { FC, InputHTMLAttributes } from "react";

export type FormInputProps = {
  label: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: FC<FormInputProps> = ({
  label,
  type = "text",
  className,
  ...inputrops
}) => {
  return (
    <label className="flex h-10 items-center justify-between">
      <span>{label}</span>
      <span className="relative ">
        <input
          type={type}
          className={cn("bg-inherit px-2 py-1 text-right text-inherit outline-none", className)}
          {...inputrops}
        />
      </span>
    </label>
  );
};

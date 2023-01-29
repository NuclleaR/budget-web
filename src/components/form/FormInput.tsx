import { cn } from "@/utils/classNames";
import { FC, InputHTMLAttributes } from "react";

export type FormInputProps = {
  label: string;
  className?: string;
  errors?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: FC<FormInputProps> = ({
  label,
  type = "text",
  className,
  errors,
  ...inputProps
}) => {
  return (
    <>
      <label className="flex h-10 items-center justify-between gap-4">
        <span>{label}</span>
        <span className="relative ">
          <input
            type={type}
            className={cn("bg-inherit px-2 py-1 text-inherit outline-none", className, {
              "text-red-700": errors != undefined && errors.length > 0,
            })}
            {...inputProps}
          />
        </span>
      </label>
      {errors?.map((error, index) => (
        <div key={index} className="text-sm text-red-700">
          {error}
        </div>
      ))}
    </>
  );
};

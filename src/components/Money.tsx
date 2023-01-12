import { cn } from "@/utils/classNames";
import { Currency, formatCurrency } from "@/utils/currency";
import { FC } from "react";

export type MoneyProps = {
  amount: number;
  currency?: Currency;
  className?: string;
};

export const Money: FC<MoneyProps> = ({ amount, currency, className }) => {
  const { value, currencySign, friction } = formatCurrency(amount, currency);
  return (
    <div className={cn("flex items-baseline leading-none", className)}>
      <span className="text-[1.5em] font-bold">{value}</span>
      <span className="text-[1em]">.{friction}</span>
      <span className="text-[1.25em] font-normal">{currencySign}</span>
    </div>
  );
};

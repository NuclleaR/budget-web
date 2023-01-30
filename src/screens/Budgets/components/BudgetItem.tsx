import { Money } from "@/components/Money";
import { Budget } from "@/models/Budget";
import { formatMonthYear } from "@/utils/date";
import { t } from "@/utils/translation";
import { FC } from "react";

export type BudgetListItemProps = {
  budget: Budget;
  position?: number;
  size?: number;
};

export const BudgetListItem: FC<BudgetListItemProps> = ({ budget, position, size }) => {
  return (
    <div
      className="inset-0 flex justify-between border-b border-b-gray-500/50 px-5 py-2 last:border-none"
      style={
        position != null
          ? {
              transform: `translateY(${position}px)`,
              position: "absolute",
              height: size ?? "auto",
            }
          : undefined
      }
    >
      <div>
        <div className="text-sm">{t("budgetFor")}</div>
        <div className="text-lg font-semibold capitalize">
          {formatMonthYear(budget.get("date"))}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Money amount={budget.get("amount")} currency={budget.get("currency")} />
        <Money
          className="text-xs"
          amount={budget.get("available")}
          currency={budget.get("currency")}
        />
      </div>
    </div>
  );
};

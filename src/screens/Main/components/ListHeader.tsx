import { Money } from "@/components/Money";
import { Spending } from "@/models/Spending";
import { useBudgetsStore } from "@/stores";
import { FC } from "react";
import { shallow } from "zustand/shallow";
import { AddSpending } from "./AddSpending";

export type ListHeaderProps = {
  spending?: Spending;
  onClose?(): void;
};

export const ListHeader: FC<ListHeaderProps> = ({ spending, onClose }) => {
  const { spent, currency } = useBudgetsStore((state) => {
    const budget = state.currentBudget;
    if (budget != null) {
      return {
        spent: budget.get("amount") - budget.get("available"),
        currency: budget.get("currency"),
      } as const;
    }
    return {
      spent: 0,
      currency: undefined,
    } as const;
  }, shallow);

  return (
    <div className="flex justify-between border-b border-b-gray-500/30 p-4">
      <Money amount={spent} currency={currency} />
      <AddSpending item={spending} onClose={onClose} />
    </div>
  );
};

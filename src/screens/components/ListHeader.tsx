import { Money } from "@/components/Money";
import { useBudgetsStore } from "@/stores";
import { FC } from "react";
import { shallow } from "zustand/shallow";

export type ListHeaderProps = {};

export const ListHeader: FC<ListHeaderProps> = () => {
  const { spent, currency } = useBudgetsStore((state) => {
    const budget = state.items.at(0);
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

  console.log("ListHeader render");

  return (
    <div className="p-4">
      <Money amount={spent} currency={currency} />
    </div>
  );
};

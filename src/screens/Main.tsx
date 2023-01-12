import { BudgetCard } from "@/components/BudgetCard";
import { useBudgetsStore } from "@/stores";
import { FC } from "react";
import { SpendingList } from "./SpendingList";

function voidFn() {}

export const Main: FC = () => {
  const items = useBudgetsStore((state) => state.items);
  const isLoading = useBudgetsStore((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-violet-500 to-fuchsia-500 pt-4">
      <BudgetCard budget={items[0]} onRefresh={voidFn} className="mx-4" />
      <SpendingList />
    </div>
  );
};

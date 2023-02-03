import { BudgetCard } from "@/screens/Main/components/BudgetCard";
import { getAllData } from "@/stores";
import { FC } from "react";
import { ListHeader } from "./components/ListHeader";
import { SpendingList } from "./components/SpendingList";

export const Main: FC = () => {
  console.log("Main render");

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-violet-500 to-fuchsia-500 pt-4">
      <BudgetCard onRefresh={getAllData} className="mx-4" />
      <div className="absolute bottom-0 left-0 right-0 h-[calc(100%-250px)] rounded-t-3xl bg-slate-200 dark:bg-stone-800">
        <div className="flex h-full flex-col">
          <ListHeader />
          <SpendingList />
        </div>
      </div>
    </div>
  );
};

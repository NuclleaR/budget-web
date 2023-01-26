import { BudgetCard } from "@/screens/Main/components/BudgetCard";
import { getAllData } from "@/stores";
import { Route } from "@tanstack/react-router";
import { CSSProperties, FC, useEffect } from "react";
import { layoutRoute } from "..";
import { ListHeader } from "./components/ListHeader";
import { SpendingList } from "./components/SpendingList";

function voidFn() {}

const styles: CSSProperties = {
  height: "calc(100% - 250px)",
};

const Main: FC = () => {
  console.log("Main render");

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-violet-500 to-fuchsia-500 pt-4">
      <BudgetCard onRefresh={voidFn} className="mx-4" />
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-slate-200 dark:bg-stone-800"
        style={styles}
      >
        <div className="flex h-full flex-col">
          <ListHeader />
          <SpendingList />
        </div>
      </div>
    </div>
  );
};

export const mainRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/main",
  component: Main,
});

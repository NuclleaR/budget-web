import { ListHeader } from "@/components/ListHeader";
import { ListLoader } from "@/components/ListLoader";
import { VirtualList } from "@/components/VirtualList";
import { useBudgetsStore } from "@/stores";
import { t } from "@/utils/translation";
import { FC, useState } from "react";
import { shallow } from "zustand/shallow";
import { BudgetCrud } from "./components/BudgetCrud";
import { BudgetListItem } from "./components/BudgetItem";

const estimateSize = () => 65;

export const Budgets: FC = () => {
  const [visible, setVisible] = useState(false);

  const { budgets, isLoading } = useBudgetsStore(
    (store) => ({
      budgets: store.items,
      isLoading: store.isLoading,
      fetchBudgets: store.fetchItems,
    }),
    shallow,
  );

  return (
    <>
      <div className="flex h-full w-full flex-col bg-gradient-to-br from-green-600 to-teal-700">
        <ListHeader
          onAdd={() => {
            setVisible(true);
          }}
        >
          {t("budgets")}
        </ListHeader>
        <div className="h-full flex-1 overflow-hidden rounded-t-3xl bg-slate-200 pt-2 dark:bg-stone-800">
          {isLoading ? (
            <ListLoader />
          ) : (
            <VirtualList count={budgets.length} estimateSize={estimateSize}>
              {(virtualRow) => {
                const budget = budgets.at(virtualRow.index);
                return budget != null ? (
                  <BudgetListItem
                    key={budget.id}
                    budget={budget}
                    position={virtualRow.start}
                    size={virtualRow.size}
                  />
                ) : null;
              }}
            </VirtualList>
          )}
        </div>
      </div>
      {visible && <BudgetCrud visible={visible} setVisible={setVisible} />}
    </>
  );
};

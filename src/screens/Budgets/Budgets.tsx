import { ListHeader } from "@/components/ListHeader";
import { ListLoader } from "@/components/ListLoader";
import { VirtualList } from "@/components/VirtualList";
import { Budget } from "@/models/Budget";
import { useBudgetsStore } from "@/stores";
import { useToastStore } from "@/stores/toastStore";
import { t } from "@/utils/translation";
import { FC, useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { BudgetCrud } from "./components/BudgetCrud";
import { BudgetActiionCalback, BudgetListItem } from "./components/BudgetItem";

const estimateSize = () => 75;

export const Budgets: FC = () => {
  const [visible, setVisible] = useState(false);
  const setToast = useToastStore((state) => state.setToast);
  const [budget, setBudget] = useState<Budget | undefined>(undefined);

  const { budgets, isLoading } = useBudgetsStore(
    (store) => ({
      budgets: store.items,
      isLoading: store.isLoading,
      fetchBudgets: store.fetchItems,
    }),
    shallow,
  );

  useEffect(() => {
    if (!visible && budget != null) {
      setBudget(undefined);
    }
  }, [visible]);

  const handleDelete = useCallback<BudgetActiionCalback>(async (budget) => {
    try {
      await budget.destroy();
      setToast(t("budgetDeleted"));
    } catch (error) {
      console.error("Error while deleting Spending: ", error);
      setToast(t("errorMessage"));
    }
  }, []);

  const handleEdit = useCallback<BudgetActiionCalback>((budget) => {
    setBudget(budget);
    setVisible(true);
  }, []);

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
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ) : null;
              }}
            </VirtualList>
          )}
        </div>
      </div>
      {visible && <BudgetCrud visible={visible} setVisible={setVisible} budget={budget} />}
    </>
  );
};

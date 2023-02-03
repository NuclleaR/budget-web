import { Budget } from "@/models/Budget";
import { Query } from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

type BudgetStore = {
  currentBudget: Budget | null;
};

export const useBudgetsStore = create<BudgetStore & ListState<Budget>>()((
  set,
  get,
) => {
  const slice = listSlice(
    set,
    get,
    new Query(Budget).descending("date"),
  );
  return ({
    currentBudget: null,
    ...slice,
    fetchItems: async (enableLiveQuery?: boolean) => {
      const now = new Date();
      await slice.fetchItems(enableLiveQuery);

      const currentBudget = get().items.find((b) => {
        const date = b.get("date");
        return date && date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
      }) ?? get().items[0];

      set({ currentBudget });
    },
    handleCreate(object) {
      slice.handleCreate(object);
      const now = new Date();
      const date = object.get("date");

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        set({ currentBudget: object });
      }
    },
    handleUpdate(object) {
      slice.handleUpdate(object);
      if (object.id === get().currentBudget?.id) {
        set({ currentBudget: object });
      }
    },
    handleDelete(object) {
      slice.handleDelete(object);
      if (object.id === get().currentBudget?.id) {
        set({ currentBudget: get().items.at(0) });
      }
    },
  });
});

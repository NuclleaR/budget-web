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
    new Query<Budget>("Budget").descending("date"),
  );
  return ({
    currentBudget: null,
    ...slice,
    fetchItems: async (enableLiveQuery?: boolean) => {
      slice.fetchItems(enableLiveQuery);
      console.log("fetchItems", get());
    },
  });
});

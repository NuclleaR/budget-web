import { Budget } from "@/models/Budget";
import Parse from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

type BudgetStore = {
  currentBudget: Budget | null;
};

export const useBudgetsStore = create<BudgetStore & ListState<Budget>>()((
  set,
  get,
) => ({
  currentBudget: null,
  ...listSlice(set, get, new Parse.Query<Budget>("Budget").descending("date")),
}));

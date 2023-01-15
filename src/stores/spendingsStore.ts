import { Spending } from "@/models/Spending";
import Parse from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

export const useSpendingsStore = create<ListState<Spending>>()((
  set,
  get,
) => ({
  ...listSlice(
    set,
    get,
    new Parse.Query<Spending>("Spendings").descending("date"),
  ),
}));

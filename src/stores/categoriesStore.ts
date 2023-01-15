import { Category } from "@/models/Category";
import Parse from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

export const useCategoriesStore = create<ListState<Category>>()((
  set,
  get,
) => ({
  ...listSlice(
    set,
    get,
    new Parse.Query<Category>("Categories"),
  ),
}));

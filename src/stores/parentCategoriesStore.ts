import { ParentCategory } from "@/models/ParentCategory";
import Parse from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

export const useParentCategoriesStore = create<ListState<ParentCategory>>()((
  set,
  get,
) => ({
  ...listSlice(
    set,
    get,
    new Parse.Query<ParentCategory>("ParentCategory"),
  ),
}));

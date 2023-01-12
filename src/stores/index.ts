import { Budget } from "@/models/Budget";
import { Category } from "@/models/Category";
import { ParentCategory } from "@/models/ParentCategory";
import { Spending } from "@/models/Spending";
import { initializeParse } from "@/utils/parse";

import Parse from "parse/dist/parse.min.js";
import { getListStore } from "./listStore";

initializeParse(import.meta.env.VITE_PARSE_SERVER, import.meta.env.VITE_APP_ID);

export const useBudgetsStore = getListStore(
  new Parse.Query<Budget>("Budget").descending("date"),
  true,
);

export const useSpendingsStore = getListStore(
  new Parse.Query<Spending>("Spendings").descending("date"),
  true,
);

export const useCategoriesStore = getListStore(
  new Parse.Query<Category>("Categories"),
  true,
);

export const useParentCategoriesStore = getListStore(
  new Parse.Query<ParentCategory>("ParentCategory"),
  true,
);

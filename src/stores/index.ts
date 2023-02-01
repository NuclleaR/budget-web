import { initializeParse } from "@/utils/parse";
import { useBudgetsStore } from "./budgetsStore";
import { useCategoriesStore } from "./categoriesStore";
import { useParentCategoriesStore } from "./parentCategoriesStore";
import { useSpendingsStore } from "./spendingsStore";

initializeParse(
  import.meta.env.VITE_PARSE_SERVER,
  import.meta.env.VITE_APP_ID,
);

function getAllData() {
  useBudgetsStore.getState().fetchItems();
  useCategoriesStore.getState().fetchItems();
  useParentCategoriesStore.getState().fetchItems();
  useSpendingsStore.getState().fetchItems();
}

export {
  getAllData,
  useBudgetsStore,
  useCategoriesStore,
  useParentCategoriesStore,
  useSpendingsStore,
};

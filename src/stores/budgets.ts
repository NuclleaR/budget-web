import Parse from "parse/dist/parse.min.js";
import { getListStore } from "./listStore";

export type Budget = Parse.Object<{
  available: number;
}>;

export const useBudgetStore = getListStore(
  new Parse.Query<Budget>("Budget"),
);

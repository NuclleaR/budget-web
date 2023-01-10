import Parse from "parse/dist/parse.min.js";
import { Budget } from "../models/Budget";
import { initializeParse } from "../utils/parse";
import { getListStore } from "./listStore";

initializeParse(import.meta.env.VITE_PARSE_SERVER, import.meta.env.VITE_APP_ID);

export const useBudgetStore = getListStore(
  new Parse.Query<Budget>("Budget"),
  true,
);

import Parse from "parse/dist/parse.min.js";

export type Budget = Parse.Object<{
  amount: number;
  available: number;
  budgetPlan: Record<string, number>;
  budgetSpending: Record<string, number>;
  date: Date;
}>;

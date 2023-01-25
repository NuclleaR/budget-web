import { Currency } from "@/utils/currency";
import { Object } from "parse/dist/parse.min.js";

export type BudgetAttributes = {
  amount: number;
  available: number;
  budgetPlan: Record<string, number>;
  budgetSpending: Record<string, number>;
  date: Date;
  currency: Currency;
};

export class Budget extends Object<BudgetAttributes> {
  constructor(attributes?: BudgetAttributes) {
    super("Budget", attributes as BudgetAttributes);
  }

  isValid(): boolean {
    return this.get("amount") > 0 && this.get("date") !== undefined;
  }
}

Parse.Object.registerSubclass("Budget", Budget);

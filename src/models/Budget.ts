import { CurrencyType } from "@/utils/currency";
import { Object } from "parse/dist/parse.min.js";

export type BudgetAttributes = {
  amount: number;
  available: number;
  budgetPlan: Partial<Record<string, number>>;
  budgetSpending: Partial<Record<string, number>>;
  date: Date;
  currency: CurrencyType;
};

export class Budget extends Object<BudgetAttributes> {
  constructor(attributes?: Partial<BudgetAttributes>) {
    super("Budget", attributes as BudgetAttributes);
  }

  isValid(): boolean {
    return (
      this.get("amount") > 0 && this.get("date") !== undefined && this.get("currency") !== undefined
    );
  }
}

Object.registerSubclass("Budget", Budget);

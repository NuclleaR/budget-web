import { Currency } from "@/utils/currency";
import Parse from "parse/dist/parse.min.js";
import { Category } from "./Category";
import { ParentCategory } from "./ParentCategory";

export interface SpendingAttributes {
  amount: number;
  category: Category;
  date: Date;
  currency?: Currency;
  parent?: ParentCategory;
  comment?: string;
}

export class Spending extends Parse.Object<SpendingAttributes> {
  constructor(attributes?: SpendingAttributes) {
    super("Spendings", attributes as SpendingAttributes);
  }

  isValid(): boolean {
    return this.get("amount") > 0 && this.get("category") !== undefined &&
      this.get("date") !== undefined;
  }
}

Parse.Object.registerSubclass("Spendings", Spending);

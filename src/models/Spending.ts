import { Currency } from "@/utils/currency";
import Parse from "parse/dist/parse.min.js";
import { Category } from "./Category";
import { ParentCategory } from "./ParentCategory";

export type Spending = Parse.Object<{
  amount: number;
  category: Category;
  currency: Currency;
  date: Date;
  parent: ParentCategory;
  comment?: string;
}>;

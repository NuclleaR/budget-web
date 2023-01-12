import Parse from "parse/dist/parse.min.js";
import { ParentCategory } from "./ParentCategory";

export type Category = Parse.Object<{
  color: number;
  name: string;
  deleted: boolean;
  iconCode: Record<string, number>;
  parent: ParentCategory;
}>;

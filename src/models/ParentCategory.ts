import Parse from "parse/dist/parse.min.js";

export type ParentCategory = Parse.Object<{
  name: string;
  order: number;
}>;

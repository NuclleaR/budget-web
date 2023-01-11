import Parse from "parse/dist/parse.min.js";

export type Category = Parse.Object<{
  color: number;
  name: string;
  deleted: boolean;
  iconCode: Record<string, number>;
  // parent:
}>;

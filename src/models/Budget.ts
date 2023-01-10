import Parse from "parse/dist/parse.min.js";

export type Budget = Parse.Object<{
  available: number;
}>;

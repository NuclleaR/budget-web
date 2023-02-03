import { Object } from "parse/dist/parse.min.js";

export type ParentCategoryAttributes = {
  name: string;
  order: number;
};

export class ParentCategory extends Object<ParentCategoryAttributes> {
  constructor(attributes?: ParentCategoryAttributes) {
    super("ParentCategory", attributes as ParentCategoryAttributes);
  }

  isValid(): boolean {
    return this.get("name") != null && this.get("name") !== "";
  }
}

Object.registerSubclass("ParentCategory", ParentCategory);

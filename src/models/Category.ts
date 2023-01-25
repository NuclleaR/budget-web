import { FontAwesome } from "@/components/FontAwesomeIcons";
import { Object } from "parse/dist/parse.min.js";
import { ParentCategory } from "./ParentCategory";

export type IconStyle = "Solid" | "Regular" | "Brands";

export type CategoryAttributes = {
  color: number;
  name: string;
  deleted: boolean;
  iconName: FontAwesome;
  iconFont: IconStyle;
  parent: ParentCategory;
};

export class Category extends Object<CategoryAttributes> {
  constructor(attributes?: CategoryAttributes) {
    super("Categories", attributes as CategoryAttributes);
  }

  isValid(): boolean {
    return this.get("name") != null &&
      this.get("name") !== "" &&
      this.get("parent") != null &&
      this.get("iconName") != null &&
      this.get("color") != null;
  }
}

Parse.Object.registerSubclass("Categories", Category);

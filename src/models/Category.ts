import { FontAwesome } from "@/components/FontAwesomeIcons";
import Parse from "parse/dist/parse.min.js";
import { ParentCategory } from "./ParentCategory";

export type IconStyle = "Solid" | "Regular" | "Brands";

export type Category = Parse.Object<{
  color: number;
  name: string;
  deleted: boolean;
  iconName: FontAwesome;
  iconFont: IconStyle;
  parent: ParentCategory;
}>;

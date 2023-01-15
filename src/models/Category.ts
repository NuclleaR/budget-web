import { FontAwesome } from "@/components/FontAwesomeIcons";
import Parse from "parse/dist/parse.min.js";
import { ParentCategory } from "./ParentCategory";

export type IconStyle = "Solid" | "Regular" | "Brands";

export type Category = Parse.Object<{
  color: number;
  name: string;
  deleted: boolean;
  iconCode: Record<IconStyle, FontAwesome>;
  parent: ParentCategory;
}>;

// const data = Object.entries(spending.get("category").get("iconCode")).at(0) as [
//   IconStyle,
//   FontAwesome,
// ];

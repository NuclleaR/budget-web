import { Route } from "@tanstack/react-router";
import { layoutRoute } from "..";
import { Settings } from "./Settings";

export const settingsRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/settings",
  component: Settings,
});

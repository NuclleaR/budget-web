import { Route } from "@tanstack/react-router";
import { layoutRoute } from "..";
import { Main } from "./Main";

export const mainRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Main,
});

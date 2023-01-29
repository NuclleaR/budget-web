import { Route } from "@tanstack/react-router";
import { layoutRoute } from "..";
import { Budgets } from "./Budgets";

export const budgetsRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/budgets",
  component: Budgets,
});

import { Route } from "@tanstack/react-router";
import { FC } from "react";
import { layoutRoute } from "..";

const Budgets: FC = () => {
  return <div>Budgets</div>;
};

export const budgetsRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/budgets",
  component: Budgets,
});

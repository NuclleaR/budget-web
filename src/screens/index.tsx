import { Route } from "@tanstack/react-router";
import { MainLayout } from "./MainLayout";
import { SimpleLayout } from "./SimpleLayout";
import { rootRoute } from "./__root";

export const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: MainLayout,
});

export const simpleLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "toolbarlayout",
  component: SimpleLayout,
});

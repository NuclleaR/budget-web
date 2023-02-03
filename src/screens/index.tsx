import { Route } from "@tanstack/react-router";
import { MainLayout } from "./MainLayout";
import { NavbarLayout } from "./NavbarLayout";
import { rootRoute } from "./__root";

export const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: MainLayout,
});

export const navbarLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "toolbarlayout",
  component: NavbarLayout,
});

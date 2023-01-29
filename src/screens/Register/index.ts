import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Register } from "./Register";

export const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

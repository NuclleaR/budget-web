import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Auth } from "./Auth";

export const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Auth,
});

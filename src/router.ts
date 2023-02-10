import { ReactRouter } from "@tanstack/react-router";
import { DefaultPendingComponent } from "./components/DefaultPendingComponent";
import { layoutRoute, simpleLayoutRoute } from "./screens";
import { Component404 } from "./screens/404";
import { budgetsRoute } from "./screens/Budgets";
import { mainRoute } from "./screens/Main";
import {
  personalAccountRoute,
  personalAccountsRoute,
} from "./screens/PersonalAccounts";
import { settingsRoute } from "./screens/Settings";
import { rootRoute } from "./screens/__root";

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    mainRoute,
    budgetsRoute,
    settingsRoute,
    personalAccountsRoute,
  ]),
  simpleLayoutRoute.addChildren([personalAccountRoute]),
]);

export const router = new ReactRouter({
  routeTree,
  defaultPendingComponent: DefaultPendingComponent,
  defaultErrorComponent: Component404,
  defaultComponent: Component404,
  onRouteChange: () => {
    console.log("Route changed");
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { ReactRouter } from "@tanstack/react-router";
import { DefaultPendingComponent } from "./components/DefaultPendingComponent";
import { layoutRoute } from "./screens";
import { Component404 } from "./screens/404";
import { budgetsRoute } from "./screens/Budgets";
import { mainRoute } from "./screens/Main";
import { settingsRoute } from "./screens/Settings";
import { rootRoute } from "./screens/__root";

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([mainRoute, budgetsRoute, settingsRoute]),
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

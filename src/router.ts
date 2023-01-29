import { ReactRouter } from "@tanstack/react-router";
import { DefaultPendingComponent } from "./components/DefaultPendingComponent";
import { layoutRoute } from "./screens";
import { Component404 } from "./screens/404";
import { authRoute } from "./screens/Auth/Auth";
import { budgetsRoute } from "./screens/Budgets/Budgets";
import { mainRoute } from "./screens/Main/Main";
import { registerRoute } from "./screens/Register/Register";
import { settingsRoute } from "./screens/Settings/Settings";
import { rootRoute } from "./screens/__root";

const routeTree = rootRoute.addChildren([
  authRoute,
  registerRoute,
  layoutRoute.addChildren([mainRoute, budgetsRoute, settingsRoute]),
  // dashboardRoute.addChildren([
  //   dashboardIndexRoute,
  //   invoicesRoute.addChildren([invoicesIndexRoute, invoiceRoute]),
  //   usersRoute.addChildren([usersIndexRoute, userRoute]),
  // ]),
  // expensiveRoute,
  // authenticatedRoute.addChildren([authenticatedIndexRoute]),
  // layoutRoute.addChildren([layoutRouteA, layoutRouteB]),
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

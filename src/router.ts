import { ReactRouter } from "@tanstack/react-router";
import { DefaultPendingComponent } from "./components/DefaultPendingComponent";
import { layoutRoute } from "./screens";
import { authRoute } from "./screens/Auth/Auth";
import { budgetsRoute } from "./screens/Budgets/Budgets";
import { mainRoute } from "./screens/Main/Main";
import { registerRoute } from "./screens/Register/Register";
import { rootRoute } from "./screens/__root";

const routeTree = rootRoute.addChildren([
  authRoute,
  registerRoute,
  layoutRoute.addChildren([mainRoute, budgetsRoute]),
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
  onRouteChange: () => {
    console.log("Route changed");
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { Route } from "@tanstack/react-router";
import { MainLayout } from "./MainLayout";
import { rootRoute } from "./__root";

export const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: MainLayout,
  // onLoad: async () => {
  //   return loaderDelayFn(() => {
  //     return {
  //       random: Math.random(),
  //     }
  //   })
  // },
});

import { loginRoute } from "@/screens/login/Login";
import { rootRoute } from "@/screens/root";
import { createReactRouter } from "@tanstack/react-router";
import { homeRoute } from "./screens/main/Main";

const routeConfig = rootRoute.addChildren([loginRoute, homeRoute]);

export const router = createReactRouter({ routeConfig });

// Register your router for typesafety
declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}

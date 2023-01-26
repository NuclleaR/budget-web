import { Route, useRouterStore } from "@tanstack/react-router";
import { FC } from "react";
import { rootRoute } from "../__root";

const Auth: FC = () => {
  const routerStore = useRouterStore();

  console.log("Auth", routerStore.status);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-2xl">Auth</div>
      <div className="text-sm text-gray-500">
        This is a protected route. You can only see this if you are logged in.
      </div>
    </div>
  );
};

export const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Auth,
});

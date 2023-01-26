import { Outlet, RootRoute, useRouterStore } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const rootRoute = new RootRoute({
  component: () => {
    const routerStore = useRouterStore();

    console.log("rootRoute", routerStore.status);

    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
      </>
    );
  },
});

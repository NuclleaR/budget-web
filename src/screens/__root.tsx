import { getAllData } from "@/stores";
import { useUserStore } from "@/stores/userStore";
import { Outlet, RootRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Auth } from "./Auth";
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const rootRoute = new RootRoute({
  component: () => {
    const user = useUserStore((state) => state.currentUser);

    useEffect(() => {
      if (user != null) {
        getAllData();
      }
    }, [user]);

    return (
      <>
        {user ? <Outlet /> : <Auth />}
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
      </>
    );
  },
});

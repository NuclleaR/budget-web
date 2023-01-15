import { useAuth } from "@/AuthContext";
import { router } from "@/router";
import { initializeParse } from "@/utils/parse";
import { createRouteConfig, Link, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

initializeParse(import.meta.env.VITE_PARSE_SERVER, import.meta.env.VITE_APP_ID);

export const rootRoute = createRouteConfig({
  component: () => {
    // const routerStore = useRouterStore();
    // console.log(routerStore);
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
      console.log("[useEffect] isAuthenticated", isAuthenticated);
      if (!isAuthenticated) {
        router.navigate({
          to: "/login",
          replace: true,
        });
      } else {
        router.navigate({
          to: "/home",
          replace: true,
        });
      }
    }, [isAuthenticated]);
    return (
      <>
        <div>
          <Link to="/home">Home</Link> <Link to="/login">Login</Link>
        </div>
        <button onClick={logout}>Logout</button>
        <hr />
        <Outlet />
      </>
    );
  },
});

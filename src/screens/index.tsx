import { BottomNavBar } from "@/components/BottomNavBar";
import { unicodeMap } from "@/components/FontAwesomeIcons";
import { Link, Outlet, Route } from "@tanstack/react-router";
import { FC } from "react";
import { rootRoute } from "./__root";

const AppLayout: FC = () => (
  <>
    <Outlet />
    <BottomNavBar>
      <Link className="Solid" to="/main">
        <span>{unicodeMap["wallet"]}</span>
      </Link>
      <Link className="Solid" to="/budgets">
        <span>{unicodeMap["hryvniaSign"]}</span>
      </Link>
    </BottomNavBar>
  </>
);

export const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: AppLayout,
  // onLoad: async () => {
  //   return loaderDelayFn(() => {
  //     return {
  //       random: Math.random(),
  //     }
  //   })
  // },
});

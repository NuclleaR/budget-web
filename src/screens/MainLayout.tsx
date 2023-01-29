import { BottomNavBar } from "@/components/BottomNavBar";
import { unicodeMap } from "@/components/FontAwesomeIcons";
import { t } from "@/utils/translation";
import { Link, Outlet } from "@tanstack/react-router";
import { FC } from "react";

export const MainLayout: FC = () => (
  <>
    <Outlet />
    <BottomNavBar>
      <Link className="flex flex-1 flex-col items-center" to="/">
        <span className="Solid">{unicodeMap["wallet"]}</span>
        <span>Home</span>
      </Link>
      <Link className="flex flex-1 flex-col items-center" to="/budgets">
        <span className="Solid">{unicodeMap["hryvniaSign"]}</span>
        <span>{t("budgets")}</span>
      </Link>
      <Link className="flex flex-1 flex-col items-center" to="/settings">
        <span className="Solid">{unicodeMap["gear"]}</span>
        <span>{t("settings")}</span>
      </Link>
    </BottomNavBar>
  </>
);

import { BottomNavBar } from "@/components/BottomNavBar";
import { unicodeMap } from "@/components/FontAwesomeIcons";
import { Toast } from "@/components/Toast";
import { t } from "@/utils/translation";
import { Link, Outlet } from "@tanstack/react-router";
import { FC, PropsWithChildren } from "react";

export const MainLayout: FC = () => {
  return (
    <>
      <Toast />
      <Outlet />
      <BottomNavBar>
        <Link className="flex flex-col items-center" to="/">
          <span className="Solid">{unicodeMap["wallet"]}</span>
          <Label>Home</Label>
        </Link>
        <Link className="flex flex-col items-center" to="/budgets">
          <span className="Solid">{unicodeMap["hryvniaSign"]}</span>
          <Label>{t("budgets")}</Label>
        </Link>
        <Link className="flex flex-col items-center" to="/accounts">
          <span className="Solid">{unicodeMap["peopleGroup"]}</span>
          <Label>{t("personalAccounts")}</Label>
        </Link>
        <Link className="flex flex-col items-center" to="/settings">
          <span className="Solid">{unicodeMap["gear"]}</span>
          <Label>{t("settings")}</Label>
        </Link>
      </BottomNavBar>
    </>
  );
};

const Label: FC<PropsWithChildren> = ({ children }) => {
  return <span className="w-full truncate text-center text-xs">{children}</span>;
};

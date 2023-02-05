import { BottomNavBar } from "@/components/BottomNavBar";
import { FontAwesome } from "@/components/FontAwesomeIcons";
import { Solid } from "@/components/icon";
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
          <Solid name={FontAwesome.wallet} />
          <Label>Home</Label>
        </Link>
        <Link className="flex flex-col items-center" to="/budgets">
          <Solid name={FontAwesome.hryvniaSign} />
          <Label>{t("budgets")}</Label>
        </Link>
        <Link className="flex flex-col items-center" to="/accounts">
          <Solid name={FontAwesome.peopleGroup} />
          <Label>{t("personalAccounts")}</Label>
        </Link>
        <Link className="flex flex-col items-center" to="/settings">
          <Solid name={FontAwesome.gear} />
          <Label>{t("settings")}</Label>
        </Link>
      </BottomNavBar>
    </>
  );
};

const Label: FC<PropsWithChildren> = ({ children }) => {
  return <span className="w-full truncate text-center text-xs">{children}</span>;
};

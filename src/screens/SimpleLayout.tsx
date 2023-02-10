import { Toast } from "@/components/Toast";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

export const SimpleLayout: FC = () => {
  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
};

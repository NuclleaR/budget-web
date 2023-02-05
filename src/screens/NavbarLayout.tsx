import { Navbar } from "@/components/Navbar";
import { Toast } from "@/components/Toast";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

export const NavbarLayout: FC = () => {
  return (
    <>
      <Toast />
      <Navbar />
      <Outlet />
    </>
  );
};

import { unicodeMap } from "@/components/FontAwesomeIcons";
import { Toast } from "@/components/Toast";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

export const NavbarLayout: FC = () => {
  return (
    <>
      <Toast />
      <div>
        <button
          type="button"
          onClick={() => {
            history.back();
          }}
        >
          <span className="Solid">{unicodeMap["arrowLeft"]}</span>
        </button>
      </div>
      <Outlet />
    </>
  );
};

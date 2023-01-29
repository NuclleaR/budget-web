import { router } from "@/router";
import { useUserStore } from "@/stores/userStore";
import { FC } from "react";

export const Settings: FC = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <div>
      <h1>Settings</h1>
      <button
        onClick={async () => {
          await logout();
          router.navigate({
            to: "/",
            replace: true,
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

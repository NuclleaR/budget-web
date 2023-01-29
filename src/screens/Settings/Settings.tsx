import { router } from "@/router";
import Parse from "parse/dist/parse.min.js";
import { FC } from "react";

export const Settings: FC = () => {
  return (
    <div>
      <h1>Settings</h1>
      <button
        onClick={() => {
          console.log("logout", Parse.User.current());
          Parse.User.logOut().then(() => {
            console.log(Parse.User.current());
            router.navigate({
              to: "/",
              replace: true,
            });
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

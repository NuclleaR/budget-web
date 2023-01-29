import Parse from "parse/dist/parse.min.js";
import { useEffect, useState } from "react";

const userState = { user: undefined };

function useAuth() {
  const [user] = useState(userState);

  useEffect(() => {
    const currentUser = Parse.User.current();
    userState = currentUser;
    setState(currentUser);
  }, []);

  return [user, setState];
}

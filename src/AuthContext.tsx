import Parse from "parse/dist/parse.min.js";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useRef, useState } from "react";

type Auth = {
  login: (username: string, password: string) => void;
  logout: () => void;
} & AuthState;

type AuthState = {
  isAuthenticated: boolean;
  user: Parse.User | null;
};

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useRef(Parse.User.current() ?? null);
  const [isAuthenticated, setAuth] = useState(user.current != null);

  const logout = () => {
    Parse.User.logOut();
    user.current = null;
    console.log("logout called");
    setAuth(false);
  };

  const login = async (username: string, password: string) => {
    const u = await Parse.User.logIn(username, password);
    console.log("login called", u, isAuthenticated, user.current);
    user.current = u;
    setAuth(true);
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user: user.current,
      login,
      logout,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={contextValue} children={children} />;
};

export function useAuth(): Auth {
  return useContext(AuthContext);
}

///============= Reg script

// const formData = Object.fromEntries(new FormData(e.currentTarget));

// const user = new Parse.User();
// user.set("username", formData.username);
// user.set("password", formData.password);
// console.log(formData);

// try {
//   const savedUser = await user.signUp();
//   console.log(savedUser);
//   // Hooray! Let them use the app now.
// } catch (error: any) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }

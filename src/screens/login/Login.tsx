import { useAuth } from "@/AuthContext";
import { rootRoute } from "@/screens/root";
import { FC, FormEvent, useEffect } from "react";

const Login: FC = () => {
  const { login, isAuthenticated } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    login(formData.username as string, formData.password as string);
  }

  useEffect(() => {
    console.log("[useEffect] isAuthenticated", isAuthenticated);

    // if (isAuthenticated) {
    //   router.navigate({
    //     to: "/home",
    //     replace: true,
    //   });
    // }
  }, [isAuthenticated]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col pb-8 text-lg">
          <span>Username</span>
          <input className="rounded-lg border-2 bg-inherit py-2 px-4" name="username" type="text" />
        </label>
        <label className="flex flex-col pb-8">
          <span>Password</span>
          <input
            className="rounded-lg border-2 bg-inherit py-2 px-4"
            name="password"
            type="password"
          />
        </label>
        <button className="w-full" type="submit">
          Login
        </button>
      </form>
      {/* <button type="submit">Register</button> */}
    </div>
  );
};

export const loginRoute = rootRoute.createRoute({
  path: "/login",
  component: Login,
});

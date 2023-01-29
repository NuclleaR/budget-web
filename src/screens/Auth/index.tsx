import { useState } from "react";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-green-600 to-teal-700">
      <div className="flex flex-col items-center justify-center rounded-lg bg-slate-200 p-4 text-stone-800 shadow-lg dark:bg-zinc-800 dark:text-neutral-200">
        {isLogin ? (
          <LoginForm changeState={setIsLogin} />
        ) : (
          <RegisterForm changeState={setIsLogin} />
        )}
      </div>
    </div>
  );
};

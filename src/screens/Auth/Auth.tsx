import { FormInput } from "@/components/form/FormInput";
import { t } from "@/utils/translation";
import { Link, Route, useRouterStore } from "@tanstack/react-router";
import Parse from "parse/dist/parse.min.js";
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { z, ZodError } from "zod";
import { rootRoute } from "../__root";

const schema = z.object({
  login: z.string().email(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof schema>;

const Auth: FC = () => {
  const routerStore = useRouterStore();

  const formData = useRef<LoginData>({ login: "", password: "" });
  const [isReqisterAllowed, setIfRegisterAllowed] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<string[] | undefined>();
  const [passwordValidation, setPasswordValidation] = useState<string[] | undefined>();

  useEffect(() => {
    Parse.Config.get().then((config) => {
      const allowRegister = config.get("allowRegister");
      if (typeof allowRegister === "boolean") {
        setIfRegisterAllowed(allowRegister);
      }
    });
  }, []);

  console.log("Auth", routerStore.status);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = schema.parse(formData.current);
      // TODO Add login logic
      console.log("submit", data);
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = (error as ZodError<LoginData>).format();
        if (formatted.login) {
          setEmailValidation(formatted.login._errors);
        }
        if (formatted.password) {
          setPasswordValidation(formatted.password._errors);
        }
      }
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    if (name === "login") {
      formData.current.login = value;
    } else if (name === "password") {
      formData.current.password = value;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-green-600 to-teal-700">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-10 text-2xl">{t("loginMessage")}</div>
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          <FormInput
            label={t("login")}
            className="border-b border-b-stone-800"
            type="email"
            name="login"
            errors={emailValidation}
            required
          />
          <FormInput
            label={t("pass")}
            className="border-b border-b-stone-800"
            type="password"
            name="password"
            errors={passwordValidation}
            required
          />
          <button className="mt-8 w-full rounded bg-stone-800 px-4 py-2 text-white" type="submit">
            {t("signIn")}
          </button>
        </form>
        {isReqisterAllowed && (
          <Link to="/register" replace className="mt-8 text-stone-800">
            {t("register")}
          </Link>
        )}
      </div>
    </div>
  );
};

export const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Auth,
});

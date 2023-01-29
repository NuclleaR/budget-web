import { FormInput } from "@/components/form/FormInput";
import { useUserStore } from "@/stores/userStore";
import { t } from "@/utils/translation";
import { Link } from "@tanstack/react-router";
import Parse from "parse/dist/parse.min.js";
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { z, ZodError } from "zod";

const schema = z.object({
  login: z.string(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof schema>;

export const Auth: FC = () => {
  const login = useUserStore((state) => state.login);
  const formData = useRef<LoginData>({ login: "", password: "" });
  const [isReqisterAllowed, setIfRegisterAllowed] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<string[] | undefined>();
  const [passwordValidation, setPasswordValidation] = useState<string[] | undefined>();
  const [parseError, setParseError] = useState<string | undefined>();

  useEffect(() => {
    Parse.Config.get().then((config) => {
      const allowRegister = config.get("allowRegister");
      if (typeof allowRegister === "boolean") {
        setIfRegisterAllowed(allowRegister);
      }
    });
  }, []);

  console.log("Auth");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = schema.parse(formData.current);
      console.log("login data", data);
      await login(data.login, data.password);
    } catch (error) {
      console.log("login error", error);
      if (error instanceof ZodError) {
        const formatted = (error as ZodError<LoginData>).format();
        if (formatted.login) {
          setEmailValidation(formatted.login._errors);
        }
        if (formatted.password) {
          setPasswordValidation(formatted.password._errors);
        }
      } else {
        setParseError((error as Error).message);
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
            type="text"
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
          {parseError && <div className="mt-4 text-center text-red-500">{parseError}</div>}
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

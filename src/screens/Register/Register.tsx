import { FormInput } from "@/components/form/FormInput";
import { router } from "@/router";
import { t } from "@/utils/translation";
import { Route, useNavigate } from "@tanstack/react-router";
import Parse from "parse/dist/parse.min.js";
import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { z, ZodError } from "zod";
import { authRoute } from "../Auth/Auth";
import { mainRoute } from "../Main/Main";
import { rootRoute } from "../__root";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email(),
});

type RegisterData = z.infer<typeof schema>;

const Register: FC = () => {
  const formData = useRef<RegisterData>({ username: "", password: "", email: "" });
  const [usernameValidation, setUsernameValidation] = useState<string[] | undefined>();
  const [passwordValidation, setPasswordValidation] = useState<string[] | undefined>();
  const [emailValidation, setEmailValidation] = useState<string[] | undefined>();
  const [parseError, setParseError] = useState<string | undefined>();

  useNavigate();

  const handleBack = () => {
    router.navigate({
      to: authRoute.fullPath,
      replace: true,
    });
  };

  const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      formData.current.username = value;
    } else if (name === "password") {
      formData.current.password = value;
    } else if (name === "email") {
      formData.current.email = value;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = schema.parse(formData.current);
      // TODO Add register logic
      const user = new Parse.User();
      user.set("username", data.username);
      user.set("password", data.password);
      user.set("email", data.email);
      try {
        await user.signUp();
        router.navigate({
          to: mainRoute.fullPath,
          replace: true,
        });
      } catch (error) {
        console.log("Error: " + error);
        setParseError((error as Error).message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const formatted = (error as ZodError<RegisterData>).format();
        if (formatted.username) {
          setUsernameValidation(formatted.username._errors);
        }
        if (formatted.password) {
          setPasswordValidation(formatted.password._errors);
        }
        if (formatted.email) {
          setEmailValidation(formatted.email._errors);
        }
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-green-600 to-teal-700">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-10 text-2xl">{t("register")}</h1>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        >
          <FormInput
            label={t("login")}
            className="border-b border-b-stone-800"
            type="text"
            name="username"
            required
            errors={usernameValidation}
          />
          <FormInput
            label={t("pass")}
            className="border-b border-b-stone-800"
            type="password"
            name="password"
            required
            errors={passwordValidation}
          />
          <FormInput
            label={t("email")}
            className="border-b border-b-stone-800"
            type="email"
            name="email"
            required
            errors={emailValidation}
          />
          <button className="mt-8 w-full rounded bg-stone-800 px-4 py-2 text-white" type="submit">
            {t("register")}
          </button>
          {parseError && <p className="text-red-500">{parseError}</p>}
        </form>
        <button
          className="mt-8 w-full rounded  px-4 py-2 text-stone-800"
          type="button"
          onClick={handleBack}
        >
          {t("back")}
        </button>
      </div>
    </div>
  );
};

export const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@data/auth/use-register.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInputStrength from "@components/ui/password-input-strength";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModalAction } from "@components/ui/modal/modal.context";
import storage from "@utils/storage";

type FormValues = {
  first_name: string;
  last_name:string;
  email: string;
  password: string;
};

const registerFormSchema = yup.object().shape({
  first_name: yup.string().required("error-name-required"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  password: yup.string().required("error-password-required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const { mutate, isLoading: loading } = useRegisterMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });
  const router = useRouter();
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`${path}`);
    closeModal();
  }
  const password=watch("password");
  function onSubmit({ first_name,last_name, email, password }: FormValues) {
    mutate(
      {
        first_name,
        last_name,
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (data?.token && data?.permissions?.length) {
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
            const ReactPixel=require("react-facebook-pixel").default;
            ReactPixel.trackSingle(`${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}`,'Subscribe',null);
            authorize();
            if (storage.get("redirect")) {
              router.push(storage.get("redirect"));
              storage.remove("redirect")
            } else {   router.push("/"); }

          
            closeModal();
            return;
          }
          if (!data.token) {
            setErrorMsg(t("error-credential-wrong"));
          }
        },
        onError: (error) => {
          const {
            response: { data },
          }: any = error ?? {};
          Object.keys(data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: data[field][0],
            });
          });
        },
      }
    );
  }
  return (
    <div className="py-4 my-8 px-5 sm:p-8 bg-light w-screen md:max-w-xl h-screen md:h-auto flex flex-col justify-center">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-2 sm:mt-5 mb-2 sm:mb-10">
        Enregistrer un nouveau compte
      </p>
      {errorMsg && (
        <Alert
          variant="error"
          message={t(errorMsg)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg("")}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t("text-name")}
          {...register("first_name")}
          type="text"
          variant="outline"
          className="mb-5"
          error={t(errors.first_name?.message!)}
        />
           <Input
          label={t("text-last-name")}
          {...register("last_name")}
          type="text"
          variant="outline"
          className="mb-5"
          error={t(errors.last_name?.message!)}
        />
        <Input
          label={t("text-email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-5"
          error={t(errors.email?.message!)}
        />
        <PasswordInputStrength
          label={t("text-password")}
          password={password}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-8"
        />
        <p className="text-center text-sm md:text-base leading-relaxed px-2 sm:px-0 text-body mt-4 sm:mt-5 mb-2 sm:mb-10">
          {t("registration-helper")}
          <span
            onClick={() => handleNavigate("/terms/conditions-generales-de-vente")}
            className="mx-1 underline cursor-pointer text-accent hover:no-underline"
          >
            {t("text-terms")}
          </span>
          et 
          <span
            onClick={() => handleNavigate("/terms/conditions-generales-de-vente")}
            className="ms-1 underline cursor-pointer text-accent hover:no-underline"
          >
            {t("text-policy")}
          </span>.
        </p>
        <div className="mt-8">
          <Button className="w-full h-12" loading={loading} disabled={loading}>
            {t("text-register")}
          </Button>
        </div>
      </form>
      {/* End of forgot register form */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t("text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t("text-already-account")}{" "}
        <button
          onClick={() => router.push("/login")}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
        >
          {t("text-login")}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;

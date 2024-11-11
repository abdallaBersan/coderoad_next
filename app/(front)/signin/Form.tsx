"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const Form = () => {
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="max-w-sm  mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Connexion</h1>
        {params.get("error") && (
          <div className="alert text-error">
            {params.get("error") === "CredentialsSignin"
              ? "Invalid email or password"
              : params.get("error")}
          </div>
        )}
        {params.get("success") && (
          <div className="alert text-success">{params.get("success")}</div>
        )}

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                // pattern: {
                //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                //   message: "Username is invalid",
                // },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.username?.message && (
              <div className="text-error">{errors.username.message}</div>
            )}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="my-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Se connecter
            </button>
          </div>
        </form>
        <div>
          Vous n'avez pas de compte?{" "}
          <Link className="link" href={`/register`}>
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;

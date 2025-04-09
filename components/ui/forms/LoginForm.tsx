"use client";

import { LoginFormFields } from "@/types/auth.types";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "@/services/auth.service";
import { IUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginFormFields>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await api.post("/auth/login", JSON.stringify(data));
      const {
        user: { username, _id, jobTitle, about, profilePic },
        accessToken,
      }: {
        accessToken: string;
        user: Exclude<IUser, "id"> & { _id: string };
      } = response.data.data;

      // Set access token

      authService.setAccessToken(accessToken);

      // Set user to local storage

      authService.setUser({ id: _id, username, jobTitle, about, profilePic });

      router.push("/");
      reset();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form className="max-w-[380px]" onSubmit={handleSubmit(onSubmit)}>
      <legend className="font-bold text-4xl mb-12 max-sm:text-3xl">
        Login to your account to continue
      </legend>

      <fieldset>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="w-full outline-none py-2 px-4 rounded-full border"
          {...register("username", {
            required: "This field is required",
          })}
        />
        {touchedFields.username && errors.username && (
          <p className="text-red-500 text-[0.75rem]">
            {errors.username.message}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-4">
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full outline-none py-2 px-4 rounded-full border"
          {...register("password", {
            required: "This field is required",
          })}
        />
        {touchedFields.password && errors.password && (
          <p className="text-red-500 text-[0.75rem]">
            {errors.password.message}
          </p>
        )}
      </fieldset>

      <button
        className="w-full inline-block disabled:cursor-not-allowed mt-16 border py-2 px-6 rounded-full cursor-pointer"
        disabled={false}
      >
        Continue
      </button>
    </form>
  );
}

export default LoginForm;

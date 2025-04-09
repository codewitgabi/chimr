"use client";

import getProfilePicture, {
  TProfilePicture,
} from "@/utils/profilePicture.mapping";
import { useState } from "react";
import Image from "next/image";
import { SignupFormFields } from "@/types/auth.types";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "@/services/auth.service";
import { IUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const profileImages: Array<TProfilePicture> = [
  "avatar-1",
  "avatar-2",
  "avatar-3",
  "avatar-4",
  "avatar-5",
  "avatar-6",
  "avatar-7",
];

function SignupForm() {
  const [selectedImage, setSelectedImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    // reset,
  } = useForm<SignupFormFields>();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(event.target.value);
  };

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      const response = await api.post("/auth/register", JSON.stringify(data));
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
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form
      className="max-w-[380px] mt-32 py-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <legend className="font-bold text-4xl">
        Create an account to get started
      </legend>

      <div className="flex items-center gap-4 mt-6 max-sm:flex-col max-sm:items-start">
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

        <fieldset>
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
      </div>

      <fieldset className="mt-4">
        <input
          id="jobTitle"
          type="text"
          placeholder="Job title"
          className="w-full outline-none py-2 px-4 rounded-full border"
          {...register("jobTitle", {
            required: "This field is required",
          })}
        />
        {touchedFields.jobTitle && errors.jobTitle && (
          <p className="text-red-500 text-[0.75rem]">
            {errors.jobTitle.message}
          </p>
        )}
      </fieldset>

      {/* About */}

      <textarea
        id="about"
        className="w-full inline-block mt-4 outline-none py-2 px-4 rounded-2xl border h-[150px] resize-none"
        placeholder="Tell users about yourself"
        {...register("about", {
          required: "This field is required",
        })}
      ></textarea>
      {touchedFields.about && errors.about && (
        <p className="text-red-500 text-[0.75rem]">{errors.about.message}</p>
      )}

      {/* Profile picture */}

      <p className="mt-6">Select profile picture</p>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
        {profileImages.map((image, index) => (
          <label
            key={index}
            className={`cursor-pointer ${
              selectedImage === image ? "border-4 border-blue-500" : ""
            }`}
          >
            <input
              type="radio"
              value={image}
              className="hidden"
              {...register("profilePic", {
                required: "This field is required",
                onChange: handleChange,
              })}
            />
            <div className="relative">
              <Image
                src={getProfilePicture(image)}
                alt={`Profile ${index + 1}`}
                className="rounded-full"
                height={60}
                width={60}
              />
              {selectedImage === image && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full p-1">
                  Selected
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      <button
        className="w-full inline-block disabled:cursor-not-allowed mt-16 border py-2 px-6 rounded-full cursor-pointer"
        disabled={false}
      >
        Get started
      </button>
    </form>
  );
}

export default SignupForm;

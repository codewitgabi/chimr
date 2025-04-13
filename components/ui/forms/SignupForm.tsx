"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, User, Lock, ArrowRight, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "@/components/ui/SocialLoginButton";
import { AvatarSelector } from "@/components/ui/AvatarSelectors";
import api from "@/lib/api";
import authService from "@/services/auth.service";
import { SignupFormFields } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TProfilePicture } from "@/utils/profilePicture.mapping";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    // reset,
  } = useForm<SignupFormFields>();

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      setIsLoading(true);

      // Set profile pic

      data.profilePic = selectedAvatar as TProfilePicture;

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

      toast.success("Authentication", {
        description: "Account created successfully",
      });

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;

        toast.error("Authentication error", {
          description: data?.error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              placeholder="John Doe"
              className={`pl-10 ${
                touchedFields.username && errors.username && "border-red-500"
              }`}
              {...register("username", {
                required: "This field is required",
              })}
            />
            {touchedFields.username && errors.username && (
              <p className="text-red-500 text-[0.75rem] mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              className={`pl-10 ${
                touchedFields.password && errors.password && "border-red-500"
              }`}
              placeholder="••••••••"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Minimum of 8 characters is expected",
                },
              })}
            />
            {touchedFields.password && errors.password && (
              <p className="text-red-500 text-[0.75rem] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="jobTitle"
              placeholder="Software Developer"
              {...register("jobTitle", {
                required: "This field is required",
              })}
              className={`pl-10 ${
                touchedFields.jobTitle && errors.jobTitle && "border-red-500"
              }`}
            />
            {touchedFields.jobTitle && errors.jobTitle && (
              <p className="text-red-500 text-[0.75rem] mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">Tell users about yourself</Label>
          <Textarea
            id="about"
            className={`resize-none min-h-[100px] ${
              touchedFields.about && errors.about && "border-red-500"
            }`}
            placeholder="I'm a developer who loves to chat..."
            {...register("about", {
              required: "This field is required",
            })}
          />
          {touchedFields.about && errors.about && (
            <p className="text-red-500 text-[0.75rem] mt-1">
              {errors.about.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Select profile picture</Label>
          <AvatarSelector
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-slate-800 dark:to-slate-950 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialLoginButtons />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-foreground font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

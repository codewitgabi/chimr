"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "@/components/ui/SocialLoginButton";
import api from "@/lib/api";
import authService from "@/services/auth.service";
import { LoginFormFields } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      setIsLoading(true);

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

      toast.success("Authentication", {
        description: "Login successful",
      });

      router.push("/");
      reset();
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
          <Label htmlFor="username">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              placeholder="name@example.com"
              className="pl-10"
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
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#!"
              className="text-sm text-muted-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
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

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground font-normal"
          >
            Remember me for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-slate-800 dark:to-slate-950 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Sign in
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
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-foreground font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

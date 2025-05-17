"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { User, Briefcase } from "lucide-react";
import { AvatarSelector } from "../AvatarSelectors";
import { Textarea } from "../textarea";
import { SignupFormFields } from "@/types/auth.types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "@/services/auth.service";
import { useSearchParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

function CompleteAuthProfileModal({
  open,
  data: { username, idToken, provider },
  onClose,
}: {
  open: boolean;
  data: {
    idToken: string;
    username?: string | null;
    provider?: "github" | "google" | "facebook";
  };
  onClose: () => void;
}) {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get("redirect_uri") ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    // reset,
  } = useForm<SignupFormFields>();

  const onSuccess = () => {
    onClose();

    // Redirect to return url

    router.push(redirectUri);
  };

  const onSubmit: SubmitHandler<SignupFormFields> = async (formData) => {
    try {
      setIsSubmitting(true);

      await authService.loginViaSocialAuth(
        {
          user: {
            getIdToken: async () => idToken,
          },
        } as any,
        onSuccess,
        {
          domain: provider as string,
          extras: {
            username: formData.username,
            jobTitle: formData.jobTitle,
            about: formData.about,
            profilePic: selectedAvatar,
          },
        }
      );

      //   reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;

        toast.error("Authentication error", {
          description: data?.error.message,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete profile</DialogTitle>
          <DialogDescription>
            Set up your profile to get started.
          </DialogDescription>
        </DialogHeader>

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
                  defaultValue={username ?? ""}
                  className={`pl-10 ${
                    touchedFields.username &&
                    errors.username &&
                    "border-red-500"
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
                    touchedFields.jobTitle &&
                    errors.jobTitle &&
                    "border-red-500"
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

            <DialogFooter className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="dark:text-white"
                variant="outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Continue"}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default CompleteAuthProfileModal;

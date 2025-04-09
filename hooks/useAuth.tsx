"use client";

import authService from "@/services/auth.service";
import useAppStore from "@/utils/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useAuth() {
  /**
   * Hook to update the user state and redirect to signup/login page is there is no user
   */

  const setUser = useAppStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const user = authService.getUser();

    if (!user) {
      router.push("/auth/signup");
    }

    setUser(user);
  }, [setUser, router]);
}

export default useAuth;

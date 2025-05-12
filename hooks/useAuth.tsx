"use client";

import authService from "@/services/auth.service";
import useAppStore from "@/utils/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useAuth() {
  /**
   * Hook to update the user state and redirect to signup/login page is there is no user
   */

  const { setUser } = useAppStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getUser();

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    setUser(user);
  }, [setUser, router]);
}

export default useAuth;

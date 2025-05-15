"use client";

import useAuth from "@/hooks/useAuth";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // Handle redirect to login if user is unauthenticated

  useAuth();

  return <>{children}</>;
}

export default ProtectedLayout;

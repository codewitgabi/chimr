"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { AnimatePresence, motion } from "framer-motion";
import { useMobile } from "@/hooks/useMobile";
import AuthIllustration from "@/components/ui/AuthIllustration";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  illustration: "login" | "signup";
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMobile();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col min-h-dvh md:h-auto p-6 md:p-10 lg:p-16 dark:bg-slate-900 bg-slate-50">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span className="font-bold text-lg">Chimr</span>
          </div>
          <ModeToggle />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </motion.div>
          </AnimatePresence>

          {children}
        </div>
      </div>

      {/* Illustration Section */}

      {!isMobile && (
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-slate-800 dark:to-slate-950 flex items-center justify-center p-6 md:p-10 lg:p-16">
          <AuthIllustration type={illustration} />
        </div>
      )}
    </div>
  );
}

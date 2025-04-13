"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
// import { useTheme } from "next-themes";

interface AuthIllustrationProps {
  type: "login" | "signup";
}

export default function AuthIllustration({ type }: AuthIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

  // Animation variants for the floating elements
  const floatingAnimation = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -15, 0],
      transition: {
        delay: i * 0.2,
        duration: 3 + i * 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    }),
  };

  // Elements to render based on type
  const elements =
    type === "login"
      ? [
          {
            icon: "💬",
            size: "w-16 h-16",
            position: "top-1/4 left-1/4",
            delay: 0,
          },
          {
            icon: "📱",
            size: "w-14 h-14",
            position: "bottom-1/4 right-1/4",
            delay: 1,
          },
          {
            icon: "👋",
            size: "w-12 h-12",
            position: "top-1/3 right-1/3",
            delay: 2,
          },
          {
            icon: "✉️",
            size: "w-10 h-10",
            position: "bottom-1/3 left-1/3",
            delay: 3,
          },
        ]
      : [
          {
            icon: "🚀",
            size: "w-16 h-16",
            position: "top-1/4 left-1/4",
            delay: 0,
          },
          {
            icon: "🔑",
            size: "w-14 h-14",
            position: "bottom-1/4 right-1/4",
            delay: 1,
          },
          {
            icon: "👤",
            size: "w-12 h-12",
            position: "top-1/3 right-1/3",
            delay: 2,
          },
          {
            icon: "💡",
            size: "w-10 h-10",
            position: "bottom-1/3 left-1/3",
            delay: 3,
          },
        ];

  // Create the main illustration
  const renderMainIllustration = () => {
    return (
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl md:text-8xl">
          {type === "login" ? "👋" : "🚀"}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {renderMainIllustration()}
      </div>

      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} ${element.size} flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-lg`}
          custom={index}
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
        >
          <span className="text-2xl">{element.icon}</span>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/80 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {type === "login"
          ? "Welcome back to the conversation"
          : "Join thousands of users today"}
      </motion.div>
    </div>
  );
}

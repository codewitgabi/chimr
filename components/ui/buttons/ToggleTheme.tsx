"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { LiaSun } from "react-icons/lia";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ToggleThemeSlider = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className="relative w-[80px] h-[40px] rounded-full bg-secondary flex items-center justify-between px-3 transition-colors duration-300"
    >
      {/* Sun Icon */}
      <LiaSun className="text-yellow-500 text-xl z-10" />

      {/* Moon Icon */}
      <FaMoon className="text-[#4B5563] text-sm z-10" />

      {/* Sliding knob */}

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-[4px] left-[4px] w-[32px] h-[32px] border-2 border-blue-500 rounded-full shadow-2xl"
        style={{ x: isDark ? 40 : 0 }}
      />
    </button>
  );
};

export default ToggleThemeSlider;

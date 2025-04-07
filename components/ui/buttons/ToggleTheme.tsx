"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import SunIcon from "@/assets/icons/sun.svg";
import MoonIcon from "@/assets/icons/moon.svg";
import Image from "next/image";

function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`cursor-pointer flex items-center gap-4 ${
        theme === "light" ? "bg-[#efefef]" : "bg-[#64666D]"
      } rounded-full p-2 transition-all duration-300`}
      onClick={handleClick}
    >
      <Image
        src={SunIcon}
        alt="sun-icon"
        width={20}
        height={20}
        className={`${theme === "light" ? "bg-white" : ""} rounded-full p-1`}
      />
      <Image
        src={MoonIcon}
        alt="moon-icon"
        width={20}
        height={20}
        className={`${theme === "dark" ? "bg-white" : ""} rounded-full p-1`}
      />
    </button>
  );
}

export default ToggleThemeButton;

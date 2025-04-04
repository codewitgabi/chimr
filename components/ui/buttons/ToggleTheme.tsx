"use client";

import { HiOutlineMoon } from "react-icons/hi2";
import { WiDaySunny } from "react-icons/wi";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

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
    <button className="cursor-pointer" onClick={handleClick}>
      {theme === "light" ? (
        <HiOutlineMoon className="text-2xl" />
      ) : (
        <WiDaySunny className="text-2xl" />
      )}
    </button>
  );
}

export default ToggleThemeButton;

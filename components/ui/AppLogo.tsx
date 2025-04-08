"use client";

import Image from "next/image";
import LogoLight from "@/assets/app-logo-light.svg";
import LogoDark from "@/assets/app-logo-dark.png";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function AppLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 129, height: 40 }} />;
  }

  return (
    <Image
      src={resolvedTheme === "dark" ? LogoDark : LogoLight}
      alt="app-logo"
      width={129}
      height={40}
      priority
    />
  );
}

export default AppLogo;

"use client";

import Image from "next/image";
import LogoLight from "@/assets/app-logo-light.svg";
import LogoDark from "@/assets/app-logo-dark.png";
import { useTheme } from "next-themes";

function AppLogo() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "dark" ? (
        <Image priority src={LogoDark} alt="app-logo" width={129} height={40} />
      ) : (
        <Image
          priority
          src={LogoLight}
          alt="app-logo"
          width={129}
          height={40}
        />
      )}
    </>
  );
}

export default AppLogo;

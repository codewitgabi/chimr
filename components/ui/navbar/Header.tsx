"use client";

import ToggleThemeButton from "../buttons/ToggleTheme";
import useAuth from "@/hooks/useAuth";
import useAppStore from "@/utils/store";
import ProfileMenu from "../ProfileMenu";
import { BellRing } from "lucide-react";
import MobileMenu from "../buttons/MobileMenu";
interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  useAuth();
  const { user } = useAppStore((state) => state);

  return (
    <header className="shrink-0">
      <nav className="flex items-center justify-between gap-12">
        <div className="flex items-center gap-2">
          <MobileMenu />

          <h1 className="font-semibold text-lg">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <ToggleThemeButton />

          <BellRing className="mr-2 h-4 w-4" />

          <ProfileMenu user={user} />

          <h1 className="text-sm max-[425px]:hidden">{user?.username}</h1>
        </div>
      </nav>
    </header>
  );
}

export default Header;

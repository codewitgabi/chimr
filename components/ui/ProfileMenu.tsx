"use client";

import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from "@/types/user.types";
import Image from "next/image";
import getProfilePicture, {
  TProfilePicture,
} from "@/utils/profilePicture.mapping";
import LogoutModal from "./modals/LogoutModal";

interface ProfileMenuProps {
  user: IUser | null;
}

function ProfileMenu({ user }: ProfileMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(false);
    setShowLogoutModal(true);
  };

  const handleCloseLogout = () => {
    setShowLogoutModal(false);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring rounded-full transition-all">
          <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
            {user && (
              <Image
                src={getProfilePicture(user.profilePic as TProfilePicture)}
                alt={user?.username || "user profile pic"}
              />
            )}
            <AvatarFallback>
              {getInitials((user?.username as string) || "")}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-secondary animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.jobTitle}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="cursor-pointer flex items-center"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClick}
          className="cursor-pointer text-destructive focus:text-destructive flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      <LogoutModal open={showLogoutModal} handleClose={handleCloseLogout} />
    </DropdownMenu>
  );
}

export default ProfileMenu;

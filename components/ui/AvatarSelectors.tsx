"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import getProfilePicture, {
  TProfilePicture,
} from "@/utils/profilePicture.mapping";
import Image from "next/image";

interface AvatarSelectorProps {
  selectedAvatar: string;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
}

export function AvatarSelector({
  selectedAvatar,
  setSelectedAvatar,
}: AvatarSelectorProps) {
  const [, setHoveredAvatar] = useState<number | null>(null);
  const profileImages: Array<TProfilePicture> = [
    "avatar-1",
    "avatar-2",
    "avatar-3",
    "avatar-4",
    "avatar-5",
    "avatar-6",
    "avatar-7",
  ];
  const colors = [
    "bg-green-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  const avatars = profileImages.map((avatar, index) => ({
    src: avatar,
    alt: `Avatar ${index + 1}`,
    color: colors[index],
  }));

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {avatars.map(({ src, color, alt }, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredAvatar(index)}
          onHoverEnd={() => setHoveredAvatar(null)}
          onClick={() => setSelectedAvatar(src)}
          className="relative cursor-pointer"
        >
          <Avatar
            className={cn(
              "h-12 w-12 border-2",
              selectedAvatar === src
                ? "border-primary"
                : "border-transparent hover:border-primary/50"
            )}
          >
            <AvatarFallback className={color}>{index + 1}</AvatarFallback>
            <Image src={getProfilePicture(src)} alt={alt} />
          </Avatar>

          <AnimatePresence>
            {selectedAvatar === src && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

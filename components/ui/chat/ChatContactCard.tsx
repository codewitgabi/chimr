"use client";

import { ChatContactCardProps } from "@/types/chat.types";
import useAppStore from "@/utils/store";
import Image from "next/image";

function ChatContactCard({
  userId,
  profilePic,
  username,
  jobTitle,
  lastMessageSent,
  lastMessage,
}: ChatContactCardProps) {
  const setSelectedContact = useAppStore((state) => state.setSelectContact);

  const handleClick = () => {
    setSelectedContact({
      id: userId,
      username,
      profilePic,
      jobTitle,
      about: "",
    });
  };

  return (
    <div
      className="p-4 hover:bg-hover-effect transition-all duration-300 cursor-pointer"
      role="button"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={profilePic}
            alt={`${username}-profile-pic`}
            width={40}
            height={40}
          />
          <div className="">
            <h1 className="line-clamp-1">{username}</h1>
            <span className="text-xs opacity-80 line-clamp-1">{jobTitle}</span>
          </div>
        </div>

        <span className="text-sm opacity-80">{lastMessageSent}</span>
      </div>

      {/* Message preview text */}

      <p className="mt-6 text-sm line-clamp-1">{lastMessage}</p>
    </div>
  );
}

export default ChatContactCard;

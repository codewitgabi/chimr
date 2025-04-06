"use client";

import { socket } from "@/lib/socket";
import { IChatContact } from "@/types/chat.types";
import { parseTimestamp } from "@/utils/parseTimestamp";
import useAppStore from "@/utils/store";
import Image from "next/image";

function ChatContactCard({
  contactId,
  profilePic,
  username,
  jobTitle,
  timestamp,
  lastMessage,
  unreadCount,
  about,
}: Omit<IChatContact, "isRead">) {
  const setSelectedContact = useAppStore((state) => state.setSelectContact);

  const handleClick = () => {
    setSelectedContact({
      contactId,
      username,
      profilePic,
      jobTitle,
      about,
      timestamp,
      lastMessage,
      unreadCount,
      isRead: false,
    });

    // Fetch chat history for selected contact

    socket.emit("get_chat_history", {
      contactId,
      limit: 20,
      page: 1,
    });
  };

  return (
    <div
      className="p-4 hover:bg-hover-effect transition-all duration-300 cursor-pointer"
      role="button"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
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

        {timestamp && (
          <span className="text-xs shrink-0 opacity-80">
            {parseTimestamp(timestamp)}
          </span>
        )}
      </div>

      {/* Message preview text */}

      <div className="mt-6 flex items-center gap-4 justify-between">
        <p className="text-sm line-clamp-1">
          {lastMessage ? lastMessage : "Start new conversation"}
        </p>
        {unreadCount > 0 && (
          <p className="text-xs bg-primary pt-0.5 px-1 rounded-full">
            {unreadCount}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatContactCard;

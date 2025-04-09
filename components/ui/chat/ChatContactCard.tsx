"use client";

// import { socket } from "@/lib/socket";
import { IChatContact } from "@/types/chat.types";
import { formatChatTimestamp } from "@/utils/parseTimestamp";
import useAppStore from "@/utils/store";
import Image from "next/image";
import { useState } from "react";
import MobileChatContentDrawer from "../MobileChatContentDrawer";

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
  const selectedContact = useAppStore((state) => state.selectedContact);
  const socket = useAppStore((state) => state.socket);
  const [openMobileChatContent, setOpenMobileChatContent] =
    useState<boolean>(false);
  const [localUnreadCount, setLocalUnreadCount] = useState<number>(unreadCount);

  const handleClick = () => {
    setSelectedContact({
      contactId,
      username,
      profilePic,
      jobTitle,
      about,
      timestamp,
      lastMessage,
      unreadCount: 0,
      isRead: false,
    });

    // Open mobile drawer

    setOpenMobileChatContent(true);

    // Fetch chat history for selected contact

    socket?.current?.emit("get_chat_history", {
      contactId,
      limit: 20,
      page: 1,
    });

    // Mark messages as read

    socket?.current?.emit("mark_messages_as_read", { contactId });

    // Update contact and change unreadCount to 0

    setLocalUnreadCount(0);
  };

  return (
    <>
      <div
        className={`p-4 hover:bg-hover-effect ${
          selectedContact?.contactId === contactId ? "bg-hover-effect" : ""
        } transition-all duration-300 cursor-pointer`}
        role="button"
        onClick={
          selectedContact?.contactId !== contactId ? handleClick : undefined
        }
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
              <h1 className="line-clamp-1 text-sm">{username}</h1>
              <span className="text-xs opacity-80 line-clamp-1">
                {jobTitle}
              </span>
            </div>
          </div>

          {timestamp && (
            <span className="text-[0.6rem] shrink-0 opacity-80 font-bold">
              {formatChatTimestamp(timestamp)}
            </span>
          )}
        </div>

        {/* Message preview text */}

        <div className="mt-4 flex items-center gap-4 justify-between">
          <p className="text-sm line-clamp-1">
            {lastMessage ? lastMessage : "Start new conversation"}
          </p>
          {localUnreadCount > 0 && (
            <p className="text-xs bg-primary pt-0.5 px-1 rounded-full">
              {localUnreadCount}
            </p>
          )}
        </div>
      </div>

      <MobileChatContentDrawer
        open={openMobileChatContent}
        setOpenMobileChatContent={setOpenMobileChatContent}
      />
    </>
  );
}

export default ChatContactCard;

"use client";

import { socket } from "@/lib/socket";
import { IChatHistory, IChatMessage } from "@/types/chat.types";
import useAppStore from "@/utils/store";
import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const currentUser = {
  _id: "67f126dac0b8fa775dc666dd",
  username: "Gabriel Michael Ojomakpene",
  profilePic: "avatar-1",
};

function ChatMessageInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const selectedContact = useAppStore((state) => state.selectedContact);
  const setChatHistory = useAppStore((state) => state.setChatHistory);
  const chatHistory = useAppStore((state) => state.chatHistory);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    // Only send message when there is a selected contact and message length is greater than 1

    if (message.length > 1 && selectedContact) {
      // Create temporary message object for immediate display

      const tempMessage: IChatMessage = {
        _id: `temp-${Date.now()}`,
        sender: currentUser,
        receiver: {
          _id: selectedContact.contactId,
          username: selectedContact.username,
          profilePic: selectedContact.profilePic as string,
        },
        message: message,
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      // Optimistically update UI

      const updatedChatHistory: IChatHistory = {
        ...chatHistory,
        totalCount: chatHistory.totalCount + 1,
        hasMore: chatHistory.hasMore || chatHistory.totalCount > 20,
        messages: [...chatHistory.messages, tempMessage],
      };

      setChatHistory(updatedChatHistory);

      socket.emit("send_message", {
        message,
        receiverId: selectedContact.contactId,
      });

      // Clear the input

      setMessage("");
    }
  };

  return (
    <div className="bg-primary sticky -bottom-2 left-4 w-full right-4 flex items-end rounded-2xl">
      <textarea
        ref={textareaRef}
        name="chatMessage"
        id="chatMessage"
        rows={1}
        className="resize-none max-h-[100px] rounded-lg outline-none focus:border-blue-300 p-4 inline-block mt-4 flex-1"
        value={message}
        onChange={handleChange}
      ></textarea>

      <button
        className="rounded-full bg-secondary p-3 -rotate-45 cursor-pointer"
        onClick={handleSendMessage}
      >
        <AiOutlineSend className="text-2xl" />
      </button>
    </div>
  );
}

export default ChatMessageInput;

"use client";

import { IChatHistory, IChatMessage } from "@/types/chat.types";
import useAppStore from "@/utils/store";
import updateContactPosition from "@/utils/updateContactPosition";
// import { AiOutlineSend } from "react-icons/ai";
// import { Plus } from "lucide-react";
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ChatMessageInput({ className }: { className?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const {
    selectedContact,
    setChatHistory,
    chatHistory,
    contacts,
    setContacts,
    user,
    socket,
  } = useAppStore((state) => state);

  const currentUser = {
    _id: user?.id as string,
    username: user?.username as string,
    profilePic: user?.profilePic as string,
  };

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setMessage(e.target.value);

  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto"; // reset
  //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  //   }
  // };

  const handleSendMessage = () => {
    // Only send message when there is a selected contact and message length is greater than 1

    if (message.trim().length > 1 && selectedContact) {
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

      socket?.current?.emit("send_message", {
        message,
        receiverId: selectedContact.contactId,
      });

      // Clear the input

      setMessage("");

      // Reset textarea height

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Update contact position

      updateContactPosition(
        selectedContact?.contactId as string,
        message.trim(),
        tempMessage.createdAt,
        contacts,
        setContacts
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Set the height to scrollHeight (capped by max-height in CSS)
    const newHeight = Math.min(textarea.scrollHeight, 150);
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 bg-secondary border-t border-border p-4 z-10",
        className
      )}
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="relative rounded-lg border border-input bg-primary shadow-sm transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Type a message..."}
            disabled={false}
            className="w-full resize-none px-4 py-3 pr-12 focus:outline-none focus:ring-0 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
            rows={1}
          />

          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="icon"
            className={cn(
              "absolute bottom-2 right-2 h-8 w-8 rounded-full transition-opacity",
              !message.trim() && "opacity-70"
            )}
          >
            <Send size={16} className="text-gray-500 font-bold" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatMessageInput;

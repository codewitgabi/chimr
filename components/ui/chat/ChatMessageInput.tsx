"use client";

import { socket } from "@/lib/socket";
import useAppStore from "@/utils/store";
import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

function ChatMessageInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const selectedContact = useAppStore((state) => state.selectedContact);

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

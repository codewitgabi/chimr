"use client";

import { useRef, useState } from "react";

function ChatMessageInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      name="chatMessage"
      id="chatMessage"
      rows={1}
      className="bg-primary resize-none max-h-[100px] rounded-lg sticky -bottom-2 left-4 w-full right-4 outline-none focus:border-blue-300 p-4 inline-block mt-4"
      value={message}
      onChange={handleChange}
    ></textarea>
  );
}

export default ChatMessageInput;

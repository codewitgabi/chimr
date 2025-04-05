"use client";

function ChatMessageInput() {
  return (
    <textarea
      name="chatMessage"
      id="chatMessage"
      rows={1}
      className="bg-primary resize-none rounded-lg sticky -bottom-2 left-4 w-full right-4 outline-none focus:border-blue-300 p-4 inline-block mt-4"
    ></textarea>
  );
}

export default ChatMessageInput;

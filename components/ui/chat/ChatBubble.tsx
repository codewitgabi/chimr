interface ChatBubbleProps {
  message: string;
  timestamp: string;
  type: "sender" | "receiver";
}

function ChatBubble({ message, timestamp, type }: ChatBubbleProps) {
  return (
    <div
      className={`p-4 flex gap-8 bg-primary w-max max-w-full rounded-3xl mb-1 ${
        type === "sender" ? "ml-auto rounded-tr-none" : "rounded-tl-none"
      }`}
    >
      <p className="text-sm">{message}</p>
      <span className="text-xs">{timestamp}</span>
    </div>
  );
}

export default ChatBubble;

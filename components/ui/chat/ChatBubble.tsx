import { parseTimestampToTimeString } from "@/utils/parseTimestamp";

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  type: "sender" | "receiver";
}

function ChatBubble({ message, timestamp, type }: ChatBubbleProps) {
  return (
    <div
      className={`p-3 flex gap-2 bg-primary w-fit max-w-[85%] items-end rounded-3xl mb-1 ${
        type === "sender" ? "ml-auto rounded-tr-none" : "rounded-tl-none"
      }`}
    >
      <p className="text-sm break-words text-foreground">{message}</p>
      <span className="text-xs shrink-0 whitespace-nowrap text-foreground/70">
        {parseTimestampToTimeString(timestamp)}
      </span>
    </div>
  );
}

export default ChatBubble;

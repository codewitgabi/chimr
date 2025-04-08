import { parseTimestampToTimeString } from "@/utils/parseTimestamp";

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  type: "sender" | "receiver";
}

function ChatBubble({ message, timestamp, type }: ChatBubbleProps) {
  return (
    <div
      className={`p-4 flex gap-8 bg-primary w-max max-w-full items-end rounded-3xl mb-1 max-[655px]:w-fit ${
        type === "sender" ? "ml-auto rounded-tr-none" : "rounded-tl-none"
      }`}
    >
      <p className="text-sm">{message}</p>
      <span className="text-xs shrink-0">{parseTimestampToTimeString(timestamp)}</span>
    </div>
  );
}

export default ChatBubble;

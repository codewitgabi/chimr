function ChatBubbleShimmerLoader({
  type = "sender",
}: {
  type?: "sender" | "receiver";
}) {
  return (
    <div
      className={`flex items-center gap-2 w-[85%] ${
        type === "sender" ? "ml-auto" : ""
      }`}
    >
      <div
        className={`h-[45px] w-[45px] shrink-0 rounded-full bg-primary animate-pulse ${
          type === "sender" ? "order-1" : ""
        }`}
      ></div>

      <div className="w-full space-y-1.5">
        <p
          className={`h-2 w-2/3 bg-primary animate-pulse ${
            type === "sender" ? "ml-auto" : ""
          }`}
        ></p>
        <div
          className={`py-2 flex gap-2 bg-primary w-[85%] items-end rounded-3xl mb-2 animate-pulse ${
            type === "sender" ? "ml-auto rounded-tr-none" : "rounded-tl-none"
          }`}
        ></div>
      </div>
    </div>
  );
}

function ChatBubbleStackShimmerLoader() {
  return (
    <div className="space-y-1.5">
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader />
      <ChatBubbleShimmerLoader type="receiver" />
      <ChatBubbleShimmerLoader type="receiver" />
    </div>
  );
}

export default ChatBubbleStackShimmerLoader;

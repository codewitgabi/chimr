function ChatBubbleShimmerLoader({
  type = "sender",
}: {
  type?: "sender" | "receiver";
}) {
  return (
    <div
      className={`p-6 flex gap-2 bg-primary w-[85%] items-end rounded-3xl mb-2 animate-pulse ${
        type === "sender" ? "ml-auto rounded-tr-none" : "rounded-tl-none"
      }`}
    ></div>
  );
}

function ChatBubbleStackShimmerLoader() {
  return (
    <>
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
    </>
  );
}

export default ChatBubbleStackShimmerLoader;

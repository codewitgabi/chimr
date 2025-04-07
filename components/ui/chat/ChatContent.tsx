"use client";

import useAppStore from "@/utils/store";
import Image, { StaticImageData } from "next/image";
import ChatMessageInput from "./ChatMessageInput";
import ChatBubble from "./ChatBubble";

function ChatContent() {
  const selectedContact = useAppStore((state) => state.selectedContact);
  const chatHistory = useAppStore((state) => state.chatHistory);

  return (
    <div className="flex-1 col-span-2 overflow-y-auto flex flex-col max-[655px]:hidden">
      <div className="flex items-center justify-between bg-secondary p-4 rounded-xl">
        {selectedContact ? (
          <div className="flex items-center gap-2">
            <Image
              src={selectedContact?.profilePic as string | StaticImageData}
              alt="user-profile-pic"
              width={40}
              height={40}
            />
            <div className="">
              <h1 className="">{selectedContact?.username}</h1>
              <span className="text-xs opacity-80">
                {selectedContact?.jobTitle}
              </span>
            </div>
          </div>
        ) : (
          "Loading...."
        )}

        <button className="relative" onClick={() => {}}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1393 14.5748C13.7328 14.5748 14.214 14.0936 14.214 13.5C14.214 12.9064 13.7328 12.4253 13.1393 12.4253C12.5457 12.4253 12.0645 12.9064 12.0645 13.5C12.0645 14.0936 12.5457 14.5748 13.1393 14.5748Z"
              stroke="#989BA1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.1393 7.05154C13.7328 7.05154 14.214 6.57036 14.214 5.9768C14.214 5.38323 13.7328 4.90205 13.1393 4.90205C12.5457 4.90205 12.0645 5.38323 12.0645 5.9768C12.0645 6.57036 12.5457 7.05154 13.1393 7.05154Z"
              stroke="#989BA1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.1393 22.098C13.7328 22.098 14.214 21.6168 14.214 21.0232C14.214 20.4297 13.7328 19.9485 13.1393 19.9485C12.5457 19.9485 12.0645 20.4297 12.0645 21.0232C12.0645 21.6168 12.5457 22.098 13.1393 22.098Z"
              stroke="#989BA1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Chat content */}

      <div className="mt-6 bg-secondary max-[655px]:rounded-none rounded-xl p-4 grow overflow-y-auto relative flex flex-col">
        <div className="grow overflow-y-auto">
          {chatHistory.messages.length > 0 ? (
            chatHistory.messages.map(
              ({ _id, createdAt, sender: { _id: senderId }, message }) => (
                <ChatBubble
                  key={_id}
                  message={message}
                  timestamp={createdAt}
                  type={
                    senderId === "67f126dac0b8fa775dc666dd"
                      ? "sender"
                      : "receiver"
                  }
                />
              )
            )
          ) : (
            <div className="text-center flex items-center justify-center">
              <h2 className="">Start a new conversation</h2>
            </div>
          )}
        </div>

        {/* Text input field */}

        <ChatMessageInput />
      </div>
    </div>
  );
}

export default ChatContent;

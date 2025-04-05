"use client";

import chatContacts from "@/lib/data/chat-contacts";
import ChatContactCard from "./ChatContactCard";
import useAppStore from "@/utils/store";
import { useEffect } from "react";

function ChatContactList() {
  const setSelectedContact = useAppStore((state) => state.setSelectContact);
  const selectedContact = useAppStore((state) => state.selectedContact);

  useEffect(() => {
    if (!selectedContact) {
      const { userId, username, profilePic, jobTitle } = chatContacts[0];

      setSelectedContact({
        id: userId,
        username,
        profilePic,
        jobTitle,
        about: "",
      });
    }
  });

  return (
    <div className="bg-secondary rounded-xl mt-4 overflow-y-auto grow">
      <div className="divide-y divide-primary">
        {chatContacts.map((contact) => (
          <ChatContactCard key={contact.userId} {...contact} />
        ))}
      </div>
    </div>
  );
}

export default ChatContactList;

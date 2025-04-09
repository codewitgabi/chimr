"use client";

import ChatContactCard from "./ChatContactCard";
import useAppStore from "@/utils/store";

function ChatContactList() {
  const { contacts, contactSearchQuery } = useAppStore((state) => state);
  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(contactSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-secondary rounded-xl mt-4 overflow-y-auto grow">
      <div className="divide-y divide-primary">
        {filteredContacts.map((contact) => (
          <ChatContactCard key={contact.contactId} {...contact} />
        ))}
      </div>
    </div>
  );
}

export default ChatContactList;

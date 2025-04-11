"use client";

import ContactShimmerLoader from "../shimmer-loaders/ContactShimmerLoader";
import ChatContactCard from "./ChatContactCard";
import useAppStore from "@/utils/store";

function ChatContactList() {
  const { contacts, contactSearchQuery, contactsIsLoading } = useAppStore(
    (state) => state
  );
  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(contactSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-secondary rounded-xl mt-4 overflow-y-auto grow">
      <div className="divide-y divide-primary">
        {contactsIsLoading
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
              <ContactShimmerLoader key={id} />
            ))
          : filteredContacts.map((contact) => (
              <ChatContactCard key={contact.contactId} {...contact} />
            ))}
      </div>
    </div>
  );
}

export default ChatContactList;

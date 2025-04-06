"use client";

import ChatContactCard from "./ChatContactCard";
import useAppStore from "@/utils/store";

function ChatContactList() {
  const contacts = useAppStore((state) => state.contacts);
  // const selectedContact = useAppStore((state) => state.selectedContact);

  // useEffect(() => {
  //   if (!selectedContact) {
  //     const contact = contacts[0];

  //     setSelectedContact({
  //       ...contact,
  //       isRead: false,
  //     });
  //   }
  // }, [contacts, setSelectedContact, selectedContact]);

  return (
    <div className="bg-secondary rounded-xl mt-4 overflow-y-auto grow">
      <div className="divide-y divide-primary">
        {contacts.map((contact) => (
          <ChatContactCard key={contact.contactId} {...contact} />
        ))}
      </div>
    </div>
  );
}

export default ChatContactList;

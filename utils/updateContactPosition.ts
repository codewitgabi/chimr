import { IChatContact } from "@/types/chat.types";

const updateContactPosition = (
  contactId: string,
  message: string,
  timestamp: string,
  contacts: Array<IChatContact>,
  setContacts: (contacts: Array<IChatContact>) => void
) => {
  // Find the contact we need to update
  const contactToUpdate = contacts.find(
    (contact) => contact.contactId === contactId
  );

  if (!contactToUpdate) return contacts;

  // Create updated contact with new last message
  const updatedContact = {
    ...contactToUpdate,
    lastMessage: message,
    timestamp: timestamp,
  };

  // Remove the contact from the current position
  const filteredContacts = contacts.filter(
    (contact) => contact.contactId !== contactId
  );

  setContacts([updatedContact, ...filteredContacts]);
};

export default updateContactPosition;

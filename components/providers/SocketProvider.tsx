"use client";

import useAuth from "@/hooks/useAuth";
import { socket } from "@/lib/socket";
import { IChatContact, IChatHistory, IChatMessage } from "@/types/chat.types";
import getProfilePicture, {
  TProfilePicture,
} from "@/utils/profilePicture.mapping";
import useAppStore from "@/utils/store";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

function SocketProvider({ children }: { children: ReactNode }) {
  useAuth();
  const setIsSocketConnected = useAppStore(
    (state) => state.setIsSocketConnected
  );
  const setContacts = useAppStore((state) => state.setContacts);
  const setSelectedContact = useAppStore((state) => state.setSelectContact);
  const selectedContact = useAppStore((state) => state.selectedContact);
  const setChatHistory = useAppStore((state) => state.setChatHistory);
  const contacts = useAppStore((state) => state.contacts);
  const chatHistory = useAppStore((state) => state.chatHistory);
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    function onConnect() {
      console.log("Socket connected successfully");
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      console.log("Socket disconnected");
      setIsSocketConnected(false);
    }

    function onSocketError({ error }: { error: string }) {
      console.error({ error });
      toast.error(error);
    }

    function onFetchContacts(contacts: Array<IChatContact>) {
      const parsedContacts: IChatContact[] = contacts.map((contact) => ({
        ...contact,
        profilePic: getProfilePicture(contact.profilePic as TProfilePicture),
      }));

      setContacts(parsedContacts);
      setSelectedContact(parsedContacts[0]);

      // Fetch chat history for first contact

      socket.emit("get_chat_history", {
        contactId: parsedContacts[0].contactId,
        limit: 20,
        page: 1,
      });
    }

    function onGetChatHistory(chatHistory: IChatHistory) {
      setChatHistory(chatHistory);
    }

    function onUpdateContact({
      contactId,
      timestamp,
      unreadCount,
      lastMessage,
    }: Pick<
      IChatContact,
      "contactId" | "timestamp" | "unreadCount" | "lastMessage"
    >) {
      // Get contact with contact id and update necessary data

      const newContacts = contacts.map((contact) => {
        if (contact.contactId === contactId) {
          return { ...contact, timestamp, unreadCount, lastMessage };
        }

        return contact;
      });

      setContacts(newContacts);
    }

    function onMessageSent({
      _id,
      isRead,
      createdAt,
      message,
    }: {
      _id: string;
      message: string;
      isRead: boolean;
      createdAt: string;
    }) {
      const updatedChatHistory: IChatHistory = {
        ...chatHistory,
        totalCount: chatHistory.totalCount + 1,
        hasMore: chatHistory.hasMore || chatHistory.totalCount > 20,
        messages: chatHistory.messages.map((msg) =>
          msg._id.startsWith("temp-") && msg.message === message
            ? { ...msg, _id, isRead, createdAt }
            : msg
        ),
      };

      setChatHistory(updatedChatHistory);
    }

    function onNewMessage({
      _id,
      receiver,
      message,
      isRead,
      createdAt,
      sender,
    }: {
      _id: string;
      message: string;
      isRead: boolean;
      createdAt: string;
      receiver: string;
      sender: string;
    }) {
      if (selectedContact && selectedContact.contactId === sender) {
        const newMessage: IChatMessage = {
          _id,
          sender: {
            _id: sender,
            username: selectedContact?.username,
            profilePic: selectedContact?.profilePic as string,
          },
          receiver: {
            _id: receiver,
            username: user?.username as string,
            profilePic: user?.profilePic as TProfilePicture,
          },
          message,
          isRead,
          createdAt,
        };

        const updatedChatHistory: IChatHistory = {
          ...chatHistory,
          totalCount: chatHistory.totalCount + 1,
          hasMore: chatHistory.hasMore || chatHistory.totalCount > 20,
          messages: [...chatHistory.messages, newMessage],
        };

        setChatHistory(updatedChatHistory);
      }

      // Send notification for new message

      toast("New message", {
        description: message,
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("socket_error", onSocketError);
    socket.on("fetch_contacts", onFetchContacts);
    socket.on("chat_history", onGetChatHistory);
    socket.on("update_contact", onUpdateContact);
    socket.on("message_sent", onMessageSent);
    socket.on("new_message", onNewMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("socket_error", onSocketError);
      socket.off("fetch_contacts", onFetchContacts);
      socket.off("chat_history", onGetChatHistory);
      socket.off("update_contact", onUpdateContact);
      socket.off("message_sent", onMessageSent);
      socket.off("new_message", onNewMessage);
    };
  }, [
    setIsSocketConnected,
    setContacts,
    setSelectedContact,
    setChatHistory,
    contacts,
    chatHistory,
    selectedContact,
    user,
  ]);

  return <>{children}</>;
}

export default SocketProvider;

"use client";

import useAuth from "@/hooks/useAuth";
import initializeSocket from "@/lib/socket";
import { IChatContact, IChatHistory, IChatMessage } from "@/types/chat.types";
import getProfilePicture, {
  TProfilePicture,
} from "@/utils/profilePicture.mapping";
import useAppStore from "@/utils/store";
import { ReactNode, useEffect, useRef } from "react";
import { toast } from "sonner";
import useMediaQuery from "@mui/material/useMediaQuery";
import authService from "@/services/auth.service";
import { Socket } from "socket.io-client";
import updateContactPosition from "@/utils/updateContactPosition";

function SocketProvider({ children }: { children: ReactNode }) {
  useAuth();
  const setIsSocketConnected = useAppStore(
    (state) => state.setIsSocketConnected
  );
  const {
    setContacts,
    setSelectedContact,
    setChatHistory,
    selectedContact,
    setSocket,
    contacts,
    chatHistory,
    user,
    setContactsIsLoading,
    setMessageIsLoading,
  } = useAppStore((state) => state);
  const isMobile = useMediaQuery("(max-width: 655px)");
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to socket

    const accessToken = authService.getAccessToken();
    const fcmToken = localStorage.getItem("fcmToken") ?? "";

    if (accessToken) {
      socket.current = initializeSocket(accessToken, fcmToken);
      socket.current.connect();
      setSocket(socket);
    }

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
      toast.error("Socket error", {
        description: error,
      });
    }

    function onFetchContacts(contacts: Array<IChatContact>) {
      const parsedContacts: IChatContact[] = contacts.map((contact) => ({
        ...contact,
        profilePic: getProfilePicture(contact.profilePic as TProfilePicture),
      }));

      setContacts(parsedContacts);

      setContactsIsLoading(false);

      if (!isMobile) {
        setSelectedContact(parsedContacts[0]);
      }

      // Fetch chat history for first contact

      socket.current?.emit("get_chat_history", {
        contactId: parsedContacts[0].contactId,
        limit: 20,
        page: 1,
      });
    }

    function onGetChatHistory(chatHistory: IChatHistory) {
      setChatHistory(chatHistory);

      setMessageIsLoading(false);
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

      updateContactPosition(sender, message, createdAt, contacts, setContacts);

      // Send notification for new message

      toast("New message", {
        description: message,
      });
    }

    socket.current?.on("connect", onConnect);
    socket.current?.on("disconnect", onDisconnect);
    socket.current?.on("socket_error", onSocketError);
    socket.current?.on("fetch_contacts", onFetchContacts);
    socket.current?.on("chat_history", onGetChatHistory);
    socket.current?.on("update_contact", onUpdateContact);
    socket.current?.on("message_sent", onMessageSent);
    socket.current?.on("new_message", onNewMessage);

    return () => {
      socket.current?.off("connect", onConnect);
      socket.current?.off("disconnect", onDisconnect);
      socket.current?.off("socket_error", onSocketError);
      socket.current?.off("fetch_contacts", onFetchContacts);
      socket.current?.off("chat_history", onGetChatHistory);
      socket.current?.off("update_contact", onUpdateContact);
      socket.current?.off("message_sent", onMessageSent);
      socket.current?.off("new_message", onNewMessage);
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
    isMobile,
    setSocket,
    setContactsIsLoading,
    setMessageIsLoading,
  ]);

  return <>{children}</>;
}

export default SocketProvider;

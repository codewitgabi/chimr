import { Socket } from "socket.io-client";
import { IChatContact, IChatHistory } from "./chat.types";
import { IUser } from "./user.types";
import { RefObject } from "react";

export type State = {
  navState: "open" | "closed";
  user: IUser | null;
  selectedContact: IChatContact | null;
  isSocketConnected: boolean;
  contacts: Array<IChatContact>;
  chatHistory: IChatHistory;
  socket: RefObject<Socket | null> | null;
};

export type StateAction = {
  toggleNav: () => void;
  setUser: (user: IUser | null) => void;
  setSelectContact: (contact: IChatContact | null) => void;
  setIsSocketConnected: (value: boolean) => void;
  setContacts: (contacts: Array<IChatContact>) => void;
  setChatHistory: (chatHistory: IChatHistory) => void;
  setSocket: (socket: RefObject<Socket | null>) => void;
};

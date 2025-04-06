import { IChatContact, IChatHistory } from "./chat.types";
import { IUser } from "./user.types";

export type State = {
  navState: "open" | "closed";
  user: IUser | null;
  selectedContact: IChatContact | null;
  isSocketConnected: boolean;
  contacts: Array<IChatContact>;
  chatHistory: IChatHistory | null;
};

export type StateAction = {
  toggleNav: () => void;
  setUser: (user: IUser | null) => void;
  setSelectContact: (contact: IChatContact | null) => void;
  setIsSocketConnected: (value: boolean) => void;
  setContacts: (contacts: Array<IChatContact>) => void;
  setChatHistory: (chatHistory: IChatHistory | null) => void;
};

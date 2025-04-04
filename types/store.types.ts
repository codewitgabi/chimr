import { IUser } from "./user.types";

export type State = {
  navState: "open" | "closed";
  user: IUser | null;
  selectedContact: IUser | null;
};

export type StateAction = {
  toggleNav: () => void;
  setUser: (user: IUser | null) => void;
  setSelectContact: (contact: IUser | null) => void;
};

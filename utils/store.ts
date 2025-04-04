import { StateAction, State } from "@/types/store.types";
import { create } from "zustand";

const useAppStore = create<State & StateAction>((set) => ({
  // States

  navState: "closed",
  user: null,
  selectedContact: null,

  // State actions

  toggleNav: () =>
    set((state) => ({
      navState: state.navState === "closed" ? "open" : "closed",
    })),

  setUser: (user) => {
    set({ user });
  },

  setSelectContact: (contact) => {
    set({ selectedContact: contact });
  },
}));

export default useAppStore;

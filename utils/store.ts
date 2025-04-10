import { StateAction, State } from "@/types/store.types";
import { create } from "zustand";

const initialState: State = {
  navState: "closed",
  user: null,
  selectedContact: null,
  isSocketConnected: false,
  contacts: [],
  chatHistory: {
    page: 1,
    limit: 20,
    totalCount: 0,
    hasMore: false,
    messages: [],
  },
  socket: null,
  contactSearchQuery: "",
};

const useAppStore = create<State & StateAction>((set) => ({
  // States
  ...initialState,
  // State actions

  toggleNav: () =>
    set((state) => ({
      navState: state.navState === "closed" ? "open" : "closed",
    })),

  setUser: (user) => {
    set({ user });
  },

  setSelectedContact: (contact) => {
    set({ selectedContact: contact });
  },

  setIsSocketConnected: (value) => {
    set({ isSocketConnected: value });
  },

  setContacts: (contacts) => {
    set({ contacts });
  },

  setChatHistory: (chatHistory) => {
    set({ chatHistory });
  },

  setSocket: (socket) => {
    set({ socket });
  },

  setContactSearchQuery: (contactSearchQuery) => {
    set({ contactSearchQuery });
  },

  resetState: () => {
    set({ ...initialState });
  },
}));

export default useAppStore;

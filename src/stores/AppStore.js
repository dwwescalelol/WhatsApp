import { create } from 'zustand';

// using store system to avoid property drilling

// user data
export const useStore = create((set, get) => ({
  token: null,
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,

  setToken: (token) => set({ token }),
  setUserId: (userId) => set({ userId }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setAvatar: (avatar) => set({ avatar }),

  updateUserInfo: (firstName, lastName, email) =>
    set({
      firstName,
      lastName,
      email,
    }),

  clearAll: () =>
    set({
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      token: null,
    }),

  contacts: [],

  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  removeContact: (userId) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.user_id !== userId),
    })),

  blocked: [],

  setBlocked: (blocked) => set({ blocked }),
  addBlocked: (blocked) =>
    set((state) => ({ blocked: [...state.blocked, blocked] })),
  removeBlocked: (userId) =>
    set((state) => ({
      blocked: state.blocked.filter((blocked) => blocked.user_id !== userId),
    })),

  chats: [],
  setChats: (chats) => set({ chats }),
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  removeChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.chat_id !== chatId),
    })),
}));

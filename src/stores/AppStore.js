import { create } from 'zustand';

// using store system to avoid property drilling

// user data
export const useStore = create((set, get) => ({
  token: null,
  userId: null,
  firstName: null,
  lastName: null,
  email: null,

  setToken: (token) => set({ token }),
  setUserId: (userId) => set({ userId }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),

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
}));

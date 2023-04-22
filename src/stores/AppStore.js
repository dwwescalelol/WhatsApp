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

  clearAll: () =>
    set({
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      token: null,
    }),
}));

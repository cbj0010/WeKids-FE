// stores/userTypeStore.js
import { create } from "zustand";

export const useUserTypeStore = create((set) => ({
  userType: "PARENT", // 'PARENT' or 'CHILD'
  setUserType: (type) => set({ userType: type }),
}));

export const useUserStore = create((set) => ({
  userName: '응애핑',
  setUserName: (name) => set({ userName: name }),
}));

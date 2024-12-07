// stores/userTypeStore.js
import CryptoJS from "crypto-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const secretKey = process.env.NEXT_PUBLIC_PROFILE_SECRET_KEY || "default-key";

export const useUserTypeStore = create(
  persist(
    (set) => ({
      userType: "", // 'PARENT' or 'CHILD'
      setUserType: (type) => set({ userType: type }),
      clearUserType: () => set({ userType: "" }),
    }),
    {
      name: "usertype-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  )
  
  
);

export const useUserStore = create(
  persist(
    (set) => ({
      userName: "",
      userId: null,
      setUserInfo: (name, id) => set({ userName: name, userId: id }),
      clearUserInfo: () => set({ userName: "", userId: null }), // 데이터 초기화 함수 추가
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useUserCardColorStore = create((set) => ({
  userCardColor: "",
  setCardColor: (color) => set({ userCardColor: color }),
}));

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useAccountStore = create(
  persist(
    (set) => ({
      accountInfo: {
        accountNumber: "",
        name: "",
        color: "",
      },
      accountId: "",
      setAccountInfo: (info) =>
        set((state) => ({
          accountInfo: { ...state.accountInfo, ...info },
        })),
      setAccountId: (id) => set({ accountId: id }),
      clearAccountInfo: () =>
        set({
          accountInfo: {
            accountNumber: "",
            name: "",
            color: "",
          },
        }),
      clearAccountId: () => set({ accountId: "" }),
    }),
    {
      name: "account-storage",
      storage: {
        getItem: (name) => {
          const encryptedData = sessionStorage.getItem(name);
          if (!encryptedData) return null;
          try {
            return decrypt(encryptedData);
          } catch (error) {
            console.error("Failed to decrypt data:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          const encryptedValue = encrypt(value);
          sessionStorage.setItem(name, encryptedValue);
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);

export const useSelectUserStore = create(
  persist(
    (set) => ({
      selectedaccountInfo: {
        accountNumber: "",
        name: "",
        color: "",
      },
      selectedaccountId: "",
      setSelectedAccountInfo: (info) =>
        set((state) => ({
          selectedaccountInfo: { ...state.selectedaccountInfo, ...info },
        })),
      setSelectedAccountId: (id) => set({ selectedaccountId: id }),
      clearSelectedAccountInfo: () =>
        set({
          selectedaccountInfo: {
            accountNumber: "",
            name: "",
            color: "",
          },
        }),
      clearSelectedAccountId: () => set({ selectedaccountId: "" }),
    }),
    {
      name: "selectedaccount-storage",
      storage: {
        getItem: (name) => {
          const encryptedData = sessionStorage.getItem(name);
          if (!encryptedData) return null;
          try {
            return decrypt(encryptedData);
          } catch (error) {
            console.error("Failed to decrypt data:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          const encryptedValue = encrypt(value);
          sessionStorage.setItem(name, encryptedValue);
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);

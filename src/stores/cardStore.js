import { create } from "zustand";
import CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_PROFILE_SECRET_KEY || "default-key";

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

// 복호화 함수
const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Zustand Store
export const useSensitiveDataStore = create((set, get) => ({
  childId: null,
  childName: "",
  residentRegistrationNumber: "",
  accountPassword: "",
  cardPassword: "",

  // childId 관리
  setChildId: (id) => set({ childId: id }),
  getChildId: () => get().childId,

  // 주민등록번호 관리
  setResidentRegistrationNumber: (number) =>
    set({ residentRegistrationNumber: number }),
  getResidentRegistrationNumber: () => get().residentRegistrationNumber,

  // 계좌 비밀번호 관리
  setAccountPassword: (password) => set({ accountPassword: password }),
  getAccountPassword: () => get().accountPassword,

  // 카드 비밀번호 관리
  setCardPassword: (password) => set({ cardPassword: password }),
  getCardPassword: () => get().cardPassword,

  setChildName: (childName) => set({ childName: childName }),
  getChildName: () => get().childname,

  // 암호화된 데이터 저장
  setEncryptedChildId: (id) => set({ childId: encrypt(id) }),
  setEncryptedResidentRegistrationNumber: (number) =>
    set({ residentRegistrationNumber: encrypt(number) }),
  setEncryptedAccountPassword: (password) =>
    set({ accountPassword: encrypt(password) }),
  setEncryptedCardPassword: (password) =>
    set({ cardPassword: encrypt(password) }),
  setEncryptedChildName: (name) =>
    set({ childName: encrypt(name) }),

  // 암호화된 데이터 복호화
  getDecryptedChildId: () => decrypt(get().childId),
  getDecryptedResidentRegistrationNumber: () =>
    decrypt(get().residentRegistrationNumber),
  getDecryptedAccountPassword: () => decrypt(get().accountPassword),
  getDecryptedCardPassword: () => decrypt(get().cardPassword),
  getDecryptedChildName: () => decrypt(get().childName),

  // 데이터 초기화
  clearData: () =>
    set({
      childId: null,
      residentRegistrationNumber: "",
      accountPassword: "",
      cardPassword: "",
      childName: "",
    }),
}));

export const useCardStore = create((set) => ({
  cardName: "",
  setCardName: (name) => set({ cardName: name }),
  fetchCardName: async (id) => {
    try {
      const response = await fetch(`/api/cards/${id}`); // 백엔드 API 호출
      const data = await response.json();
      set({ cardName: data.cardName });
    } catch (error) {
      console.error("Failed to fetch card name:", error);
    }
  },
}));

// 카드 디자인 관리
export const useColorStore = create((set) => ({
  color: "",
  childId: null,
  childcharacter: "",
  childcolor: "",
  design: "",
  setColor: (color) => set({ color: color }),
  setChildCharacter: (childcharacter) =>
    set({ childcharacter: childcharacter }),
  setDesign: (design) => set({ design: design }),
  setChildColor: (childcolor) => set({ childcolor: childcolor }),
  removeChildId: () => set({ childId: null }),
  removeColor: () => set({ color: "" }),
  removeChildCharacter: () => set({ childcharacter: "" }),
  removeChildColor: () => set({ childcolor: "" }),
  removeDesign: () => set({ design: "" }),

  reset: () =>
    set({
      color: "",
      childcharacter: "",
      childcolor: "",
      design: "",
    }),
}));

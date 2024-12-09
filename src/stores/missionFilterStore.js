import { create } from "zustand";

export const ChildEnum = {
  ALL: "ALL",
  CHILD1: "자녀 1",
  CHILD2: "자녀 2",
  CHILD3: "자녀 3",
};

export const CategoryEnum = {
  ALL: "전체",
  CLEAN: "집안일",
  DEVELOP: "자기계발",
  HABIT: "생활습관",
  ETC: "기타",
};

export const useMissionFilterStore = create((set) => ({
  selectedChild: "ALL",
  selectedCategory: null,
  setSelectedChild: (child) => set({ selectedChild: child }),
  setSelectedCategory: (category) => set({ selectedCategory: category }), // 객체 키와 값이 같은 이름일 때는 이렇게 축약 가능
}));

export const useMissionIDStore = create((set) => ({
  missionId: "",
  setMissionId: (id) => set({ missionId: id }),
  clearMissionId: () => set({ missionId: "" }),
}));

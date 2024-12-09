export const getCurrentDateInKoreanFormat = (period) => {
  const year = period.getFullYear();
  const month = String(period.getMonth() + 1).padStart(2, "0");
  const day = String(period.getDate()).padStart(2, "0");

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekDay = weekDays[period.getDay()];

  return `${year}년 ${month}월 ${day}일 (${weekDay})`;
};

export const missionCategories = [
  { id: "HOUSE_WORK", label: "집안일", icon: "/images/trashImg.svg" },
  { id: "LIFESTYLE_HABITS", label: "생활습관", icon: "/images/pinImg.svg" },
  { id: "SELF_DEVELOPMENT", label: "자기계발", icon: "/images/pencilImg.svg" },
  { id: "ETC", label: "기타", icon: "/images/ectImg.svg" },
];

export default missionCategories;

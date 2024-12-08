import missionCategories from "@/src/constants/mission";
import Image from "next/image";
import { useState } from "react";

export default function ButtonGroup({
  childrenData, // 외부에서 받아오는 자녀 데이터
  setTopButtonChecked,
  setBottomButtonChecked,
}) {
  const [selectedTopButtons, setSelectedTopButtons] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false); // ALL 버튼 상태
  const [selectedBottomButton, setSelectedBottomButton] = useState("");

  const topButtons = [
    { id: "all", label: "ALL" },
    ...childrenData.map((child) => ({
      id: child.childId,
      label: child.name,
    })),
  ];

  const handleTopButtonClick = (id) => {
    if (id === "all") {
      const allSelections = isAllSelected
        ? []
        : childrenData.map((child) => child.childId);
      setSelectedTopButtons(allSelections);
      setTopButtonChecked(allSelections);
      setIsAllSelected(!isAllSelected);
    } else {
      const newSelection = selectedTopButtons.includes(id)
        ? selectedTopButtons.filter((button) => button !== id)
        : [...selectedTopButtons, id];
      setSelectedTopButtons(newSelection);
      setTopButtonChecked(newSelection);
      setIsAllSelected(false);
    }
  };

  const handleBottomButtonClick = (id) => {
    if (id == selectedBottomButton) {
      setSelectedBottomButton("");
      setBottomButtonChecked("");
    } else {
      setSelectedBottomButton(id);
      setBottomButtonChecked(id);
    }
  };

  const getButtonClasses = (id, isSelected) => {
    const baseClasses =
      "flex-grow h-8 flex items-center justify-center rounded-md py-2 text-R-12 font-medium transition-all duration-200";

    if (isSelected) {
      return `${baseClasses} bg-main02 text-white`; // 선택된 버튼 스타일
    } else {
      return `${baseClasses} bg-gray01/20 text-neutral-400`; // 선택되지 않은 버튼 스타일
    }
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-R-14 mb-1 text-sub02">미션을 수행할 자녀</p>
      <div className="flex flex-row justify-between gap-3 w-full mb-2">
        {topButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleTopButtonClick(button.id)}
            className={getButtonClasses(
              button.id,
              button.id === "all"
                ? isAllSelected
                : selectedTopButtons.includes(button.id)
            )}
          >
            <span className="text-R-10 whitespace-nowrap overflow-hidden">
              {button.label}
            </span>
          </button>
        ))}
      </div>
      <p className="text-R-14 mb-1 mt-2 text-sub02">미션 카테고리</p>
      <div className="flex flex-row justify-between gap-2 w-full">
        {missionCategories.map((button) => (
          <button
            key={button.id}
            onClick={() => handleBottomButtonClick(button.id)}
            className={`${getButtonClasses(button.id, button.id === selectedBottomButton)} flex items-center gap-2`}
          >
            <Image
              src={button.icon}
              alt={button.label}
              width={10}
              height={10}
              className={
                selectedBottomButton === button.id
                  ? "invert brightness-100"
                  : "invert-50 brightness-150"
              }
            />
            <span className="text-R-10 whitespace-nowrap overflow-hidden">
              {button.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

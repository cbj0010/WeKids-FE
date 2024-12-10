"use client";
import StateBadge from "../list/StateBadge";

const ChildMissionHeader = ({ onStateChange, selectedStates }) => {
  const missionStates = ["NEW", "SUBMIT", "ACCEPT", "CANCEL", "OUTDATED"];

  const handleStateClick = (state) => {
    onStateChange(state); // 상태 추가/제거 토글
  };

  return (
    <div className="w-[314px] mx-auto mb-7">
      <div className="flex justify-between gap-1">
        {missionStates.map((state) => (
          <StateBadge
            key={state}
            state={state}
            isButton={true}
            textSize="text-R-14"
            radius="rounded-md"
            height="h-[30px]"
            px="px-3"
            isSelected={selectedStates.includes(state)} // 배열에 포함 여부 확인
            onClick={() => handleStateClick(state)} // 클릭 핸들러
          />
        ))}
      </div>
    </div>
  );
};

export default ChildMissionHeader;

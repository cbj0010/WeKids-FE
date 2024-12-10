import CategoryBadge from "../list/CategoryBadge";
import StateBadge from "../list/StateBadge";
import { NoMissionCardLayout } from "../NoMissionCardLayout";
import { NoMissionMessageBox } from "../NoMissionMessageBox";

export const ParentNoMissionCard = () => {
  const missionStates = ["NEW", "SUBMIT", "ACCEPT", "CANCEL", "OUTDATED"];

  const categories = [
    { type: "HOUSE_WORK" },
    { type: "SELF_DEVELOPMENT" },
    { type: "LIFESTYLE_HABITS" },
    { type: "ETC" },
  ];

  return (
    <NoMissionCardLayout bgColor="bg-purple01/30">
      <NoMissionMessageBox
        title={`미션을 등록하고 \n아이에게 알림을 보내보세요!`}
        description={`"미션 진행상황\n카테고리, 자녀의 필터링을 통해 쉽게 미션을\n등록하고 확인하세요!"`}
      />
      <div className="flex flex-col mt-7">
        <div className="flex justify-center gap-2 px-3">
          {missionStates.map((state) => (
            <StateBadge
              key={state}
              state={state}
              isButton={false}
              textSize="text-R-14"
              radius="rounded-md"
              height="h-[30px]"
              px="px-3"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-7">
          {categories.map(({ type }) => (
            <div
              key={type}
              className="bg-white rounded-xl py-2 px-4 flex items-center justify-center gap-2"
            >
              <CategoryBadge missionType={type} isButton={false} />
            </div>
          ))}
        </div>
      </div>
    </NoMissionCardLayout>
  );
};

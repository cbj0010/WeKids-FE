import StateBadge from "../list/StateBadge";
import { NoMissionCardLayout } from "../NoMissionCardLayout";
import { NoMissionMessageBox } from "../NoMissionMessageBox";

export const ChildNoMissionCard = () => {
  const missionStates = ["NEW", "SUBMIT", "ACCEPT", "CANCEL", "OUTDATED"];
  return (
    <NoMissionCardLayout bgColor="bg-purple01/30">
      <NoMissionMessageBox
        title={`부모님에게 미션\n 등록을 요청해보세요!`}
        description={`"미션 진행상황\n카테고리를 통해 쉽게 미션을\n확인하여 용돈을 받으세요!"`}
      />
      <div className="flex justify-center gap-2 px-3 mt-8">
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
    </NoMissionCardLayout>
  );
};

import { missionColorMap } from "@/src/constants/common";
import { formatDate } from "@/src/util/missionUtils";
import CategoryBadge from "../list/CategoryBadge";
import StateBadge from "../list/StateBadge";

export default function ChildMissionList({ missiondata, onClick }) {
  const bgColor =
    missiondata?.state && missionColorMap[missiondata.state]
      ? missionColorMap[missiondata.state].background
      : missionColorMap["NEW"].background;

  return (
    <div className="pb-1">
      <div
        className={`w-[322px] rounded-xl ${bgColor} p-5 shadow-md`}
        onClick={onClick}
      >
        <div className="flex justify-between">
          <div className="flex-1 space-y-1 ">
            <h3 className="text-R-14 text-black truncate">
              {missiondata.title}
            </h3>
            <p className="text-R-12 text-sub02 pt-2 break-words">
              {missiondata.content}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <StateBadge state={missiondata.state} />
            <CategoryBadge
              missionType={missiondata.category}
              isButton={false}
            />
          </div>
        </div>
        <p className="text-R-10 text-sub02/60 text-right mt-3">
          🍪 {formatDate(missiondata.deadline)}
        </p>
      </div>
    </div>
  );
}

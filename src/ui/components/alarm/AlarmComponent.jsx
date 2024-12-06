"use client";

import { useColorStore, useSensitiveDataStore } from "@/src/stores/cardStore";
import AlarmCard from "./AlarmCard";
import { useUpdateAlarmChecked } from "@/src/query/alarmQuery";

const AlarmComponent = ({ data }) => {
  const { mutate, isLoading: isUpdating } = useUpdateAlarmChecked();
  const { setChildId } = useSensitiveDataStore();

  const OnCheckClicker = (idx) => {
    const alarm = data[idx - 1]; // data 배열에서 해당 인덱스의 alarm 데이터 가져오기
    if (alarm.type === "CARD") {
      setChildId(alarm.targetId); // targetId를 Zustand에 저장
    }

    mutate(
      { alarmId: idx },
      {
        onSuccess: () => {
          console.log("성공!");
        },
        onError: (error) => {
          console.error("실패:", error.message);
        },
      },
    );
  };

  return (
    <>
      <div className="flex flex-col w-full h-5/6 overflow-y-auto scrollbar-hide">
        {data.map((alarm, index) => (
          <AlarmCard
            key={index}
            id={alarm.alarmId}
            type={alarm.type}
            targetId={alarm.targetId}
            targetState={alarm.targetState}
            isChecked={alarm.isChecked}
            onClick={() => OnCheckClicker(alarm.alarmId)} // index 전달
          />
        ))}
      </div>
      <div className="flex justify-center items-center h-1/6 text-R-10 text-black/40">
        받은 알림은 30일 동안 보관됩니다.
      </div>
    </>
  );
};

export default AlarmComponent;

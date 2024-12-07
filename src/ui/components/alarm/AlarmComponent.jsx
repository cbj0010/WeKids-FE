"use client";

import { useSensitiveDataStore } from "@/src/stores/cardStore";
import AlarmCard from "./AlarmCard";
import { useUpdateAlarmChecked } from "@/src/query/alarmQuery";

const AlarmComponent = ({ data }) => {
  const { mutate, isLoading: isUpdating } = useUpdateAlarmChecked();
  const { setChildId } = useSensitiveDataStore();

  const OnCheckClicker = (idx) => {
    console.log(data);
    const alarm = data[idx]; // data 배열에서 해당 인덱스의 alarm 데이터 가져오기
    console.log(alarm);
    if (alarm.type === "CARD") {
      console.log(alarm);
      setChildId(alarm.targetId); // targetId를 Zustand에 저장
    }

    mutate(
      { alarmId: data[idx].alarmId },
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
            onClick={() => OnCheckClicker(index)} // index 전달
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

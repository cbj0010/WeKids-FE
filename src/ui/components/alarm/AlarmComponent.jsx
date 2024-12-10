"use client";

import { useSensitiveDataStore } from "@/src/stores/cardStore";
import AlarmCard from "./AlarmCard";
import { useUpdateAlarmChecked } from "@/src/query/alarmQuery";
import Image from "next/image";
import { useEffect } from "react";

const AlarmComponent = ({ data }) => {
  const { mutate, isLoading: isUpdating } = useUpdateAlarmChecked();
  const { setChildId } = useSensitiveDataStore();

  useEffect(() => {
    console.log("Image Path: /icons/favicon.svg");
  }, []);

  const OnCheckClicker = (idx) => {
    const alarm = data[idx];

    if (alarm.type === "CARD") {
      setChildId(alarm.targetId); // targetId를 Zustand에 저장
    }

    mutate(
      { alarmId: alarm.alarmId },
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
        {data?.length > 0 ? (
          data.map((alarm, index) => (
            <AlarmCard
              key={index}
              id={alarm.alarmId}
              type={alarm.type}
              targetId={alarm.targetId}
              targetState={alarm.targetState}
              isChecked={alarm.isChecked}
              onClick={() => OnCheckClicker(index)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src="/icons/favicon.svg"
              alt="No Data"
              width={170}
              height={170}
              className="opacity-25 text-bg-main02"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center h-1/6 text-R-17 text-black/40">
        받은 알림은 30일 동안 보관됩니다.
      </div>
    </>
  );
};

export default AlarmComponent;

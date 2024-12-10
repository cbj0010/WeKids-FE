"use client";
import { useMutation } from "@tanstack/react-query";
import { CheckAlarmData } from "../apis/alarm";
export const useUpdateAlarmChecked = () => {
  return useMutation({
    mutationFn: ({ alarmId }) => {
      return CheckAlarmData({ alarmId });
    },
    onSuccess: (data) => {
      console.log("메모 업데이트 성공");
    },
    onError: (error) => {
      console.error("메모 업데이트 실패:", error.message);
    },
  });
};

"use client";
import { useMutation } from "@tanstack/react-query";
import { createMission, missionAccept } from "../apis/mission";

export const useCreateMission = () => {
  return useMutation({
    mutationFn: ({
      childrenId,
      title,
      content,
      deadline,
      amount,
      category,
    }) => {
      return createMission({
        childrenId,
        title,
        content,
        deadline,
        amount,
        category,
      });
    },
    onSuccess: (data) => {
      console.log("성공");
    },
  });
};

export const useAcceptMission = () => {
  return useMutation({
    mutationFn: ({ missionId, simplePassword }) => {
      return missionAccept({ missionId, simplePassword });
    },
    onSuccess: (data) => {
      console.log("성공");
    },
  });
};

"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCardName, registerPassword } from "@/src/apis/card";

// Fetch Card Name (클라이언트)
export const useFetchCardName = (id) => {
  return useQuery(
    ["cardName", id],
    () => fetchCardName(id), // 서버 API 호출 함수 사용
    {
      enabled: !!id, // id가 존재할 때만 쿼리 실행
    },
  );
};

export const useRegisterPassword = () => {
  return useMutation({
    mutationFn: ({
      cardPassword,
      residentRegistrationNumber,
      accountPassword,
      childId,
    }) => {
      return registerPassword({
        cardPassword,
        residentRegistrationNumber,
        accountPassword,
        childId,
      });
    },
    onError: (error) => {
      console.error("비밀번호 등록 실패:", error.message);
    },
  });
};

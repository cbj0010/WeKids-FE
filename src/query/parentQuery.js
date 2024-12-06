"use client";

import { useMutation } from "@tanstack/react-query";
import { patchAccount } from "@/src/apis/parents";

export const useFetchAccount = () => {
  return useMutation({
    mutationFn: ({ accountNumber }) => {
      return patchAccount({ accountNumber });
    },
    onSuccess: (data) => {
      console.log("업데이트 성공:", data);
    },
    onError: (error) => {
      console.error("업데이트 실패:", error.message);
    },
  });
};

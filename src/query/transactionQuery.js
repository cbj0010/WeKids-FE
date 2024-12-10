import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  fetchTransactions,
  fetchTransactionById,
  updateTransactionMemo,
  submitTransfer,
} from "../apis/transaction";
export const useTransactionList = ({
  accountId,
  start,
  end,
  type,
  size = 5,
  
}) => {
  console.log(start);
  console.log(end);
  return useInfiniteQuery({
    queryKey: ["transactions", accountId, start, end, type, size],
    queryFn: ({ pageParam = 0 }) => {
      return fetchTransactions({
        page: pageParam,
        start,
        end,
        accountId,
        type,
        size,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasNext ? allPages.length : undefined;
    },
  });
};

export const useTransactionDetail = (transactionId) => {
  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => fetchTransactionById(transactionId),
    enabled: !!transactionId,
  });
};

export const useUpdateTransactionMemo = () => {
  return useMutation({
    mutationFn: ({ transactionId, memo }) => {
      return updateTransactionMemo({ transactionId, memo });
    },
    onSuccess: (data) => {
      console.log("메모 업데이트 성공");
    },
    onError: (error) => {
      console.error("메모 업데이트 실패:", error.message);
    },
  });
};

export const useTransaction = () => {
  return useMutation({
    mutationFn: ({
      parentAccountNumber,
      childAccountNumber,
      amount,
      sender,
      receiver,
      simplePassword,
    }) => {
      return submitTransfer({
        parentAccountNumber,
        childAccountNumber,
        amount,
        sender,
        receiver,
        simplePassword,
      });
    },
    onSuccess: (data) => {
      console.log("성공");
    },
    onError: (error) => {
      console.error("실패:", error.message);
    },
  });
};

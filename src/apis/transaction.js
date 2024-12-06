"use server";
import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

export const submitTransfer = async ({
  parentAccountNumber,
  childAccountNumber,
  amount,
  sender,
  receiver,
  simplePassword,
}) => {
  console.log(parentAccountNumber);
  const session = await auth();
  const authorization = session?.user?.Authorization;
  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      parentAccountNumber,
      childAccountNumber,
      amount,
      sender,
      receiver,
      simplePassword,
    }),
  });

  return response.status !== 204 ? await response.json() : null;
};

export const fetchTransactions = async ({
  page,
  start,
  end,
  size = 5,
  type,
  accountId,
}) => {
  const session = await auth();
  const authorization = session?.user?.Authorization;
  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };
  const url = `${BASE_URL}/accounts/${accountId}/transactions`;

  console.log("Fetching URL:", url);

  try {
    const response = await fetch(
      `${url}?page=${page}&start=${start}&end=${end}&type=${type}&size=${size}`,
      {
        method: "GET",
        headers: headers,
      },
    );

    if (!response.ok) {
      // HTTP 상태 코드가 200-299가 아니면 에러 처리
      const errorMessage = await response.text();
      throw new Error(`Error fetching transactions: ${errorMessage}`);
    }

    const data = await response.json();
    console.log(data.transactions);

    // API 응답 구조에 맞게 반환
    return {
      transactions: data.transactions,
      hasNext: data.hasNext, // hasNext 값이 그대로 전달
      balance: data.balance,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error; // 에러를 다시 던져 React Query에서 처리
  }
};

export const fetchTransactionById = async (transactionId) => {
  const session = await auth();
  const authorization = session?.user?.Authorization;
  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };
  try {
    if (!transactionId) {
      throw new Error("Transaction ID is required");
    }

    const response = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error fetching transaction: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Fetched transaction data:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchTransactionById:", error.message);
    throw error;
  }
};

export const updateTransactionMemo = async ({ transactionId, memo }) => {
  const session = await auth();
  const authorization = session?.user?.Authorization;
  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };
  console.log("Request data:", { transactionId, memo });
  const response = await fetch(
    `${BASE_URL}/transactions/${transactionId}/memo`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ memo }), // memo 값을 JSON body로 전달
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to update memo: ${response.statusText}`);
  }

  return response.status !== 204 ? await response.json() : null;
};

"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

const session = await auth();
const authorization = session?.user?.Authorization;

export const fetchAccounts = async () => {
  const response = await fetch(`${BASE_URL}/accounts/baas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Authorization=${authorization}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json(); // JSON 형태로 반환
  console.log("API 데이터:", data);
  return data;
};

export const fetchChildAccounts = async () => {
  const response = await fetch(`${BASE_URL}/accounts/children`);

  if (!response.ok) {
    throw new Error("Failed to fetch child accounts");
  }

  // response.json() 호출은 한 번만 수행
  const data = await response.json();
  return data;
};

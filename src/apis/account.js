"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

export const fetchAccounts = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/accounts/baas`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json(); // JSON 형태로 반환
  return data;
};

export const fetchChildAccounts = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/accounts/children`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch child accounts");
  }

  // response.json() 호출은 한 번만 수행
  const data = await response.json();
  return data;
};

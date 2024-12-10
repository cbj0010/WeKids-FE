"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

export const fetchUserData = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/members`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    console.log(response.status);

    console.log(response.data);

    throw new Error("사용자 정보를 읽어올 수 없습니다.");
  }
  const data = await response.json();
  return data;
};

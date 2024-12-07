"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

export const fetchUserData = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/api/v1/members`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 읽어올 수 없습니다.");
  }

  const data = await response.json();
  return {
    name: data.name,
    phone: data.phone,
    birthday: data.birthday,
    profile: data.profile,
    email: data.email,
    type: data.type,
    createdAt: data.createdAt,
  };
};

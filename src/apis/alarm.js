"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

export const fetchAlarmData = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/alarms`, {
    method: "GET",
    headers: headers,
  });

  // 응답 상태 확인
  if (!response.ok) {
    const errorText = await response.text(); // 응답 본문 확인
    console.error("Error response:", errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const CountAlarmData = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/alarms/count`, {
    method: "GET",
    headers: headers,
  });

  // 응답 상태 확인
  if (!response.ok) {
    const errorText = await response.text(); // 응답 본문 확인
    console.error("Error response:", errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const CheckAlarmData = async ({ alarmId }) => {
  const session = await auth();
  const authorization = session?.user?.Authorization;
  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };
  const response = await fetch(`${BASE_URL}/alarms/${alarmId}/check`, {
    method: "PATCH",
    headers,
  });
  return response.status !== 204 ? await response.json() : null;
};

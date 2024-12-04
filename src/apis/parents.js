"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";

export const getParentsAccounts = async () => {
  const session = await auth();
  const authorization = session?.user?.Authorization;
  
  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };
  console.log(headers);

  const response = await fetch(`${BASE_URL}/parents`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  const data = await response.json();
  if(data){
    console.log(data.parent);
  }
  return data;
};

export const agreeAccountInquiry = async (identification) => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const residentRegistrationNumber =
    identification.slice(0, 6) + "-" + identification.slice(6);

  try {
    const response = await fetch(`${BASE_URL}/parents/agree-account-inquiry`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        residentRegistrationNumber: residentRegistrationNumber,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: "주민번호가 틀렸습니다. 다시 입력해주세요.",
      };
    }

    return {
      success: true,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "오류가 발생했습니다. 다시 시도해주세요",
    };
  }
};

"use server";

import { auth } from "@/auth";
import { BASE_URL } from "../constants/url";
import { useColorStore } from "@/src/stores/cardStore";

export const designCreate = async (data) => {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/design`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    let errorMessage = `Status Code: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (jsonError) {
      console.error("Failed to parse error response:", jsonError);
    }
    throw new Error(`Failed to post data: ${errorMessage}`);
  }
  return {};
};

export const designFetch = async (designId) => {
  const storedDesign = useColorStore.getState().design;
  if (storedDesign) {
    return storedDesign;
  }

  const session = await auth();
  const authorization = session?.user?.Authorization;

  const headers = {
    "Content-Type": "application/json",
    Cookie: `Authorization=${authorization}`,
  };

  const response = await fetch(`${BASE_URL}/design/${designId}`, {
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();
  useColorStore.getState().setDesign(data);
  return data;
};

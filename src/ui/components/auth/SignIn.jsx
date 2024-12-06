"use client";
import { useSignUpStore } from "@/src/stores/accountStore";
import { useUserTypeStore } from "@/src/stores/userStore";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn({ children }) {
  const { userType } = useUserTypeStore();
  const {
    email,
    name,
    phone,
    birthday,
    simplePassword,
    guardianName,
    guardianBirthday,
    guardianPhone,
  } = useSignUpStore();

  const data = {
    email: email,
    name: name,
    phone: phone,
    birthday: birthday,
    simplePassword: simplePassword || null,
    guardianName: guardianName || null,
    guardianBirthday: guardianBirthday || null,
    guardianPhone: guardianPhone || null,
    social: "naver",
    memberType: userType,
    redirectTo: "/",
  };

  if (userType === "CHILD") {
    data["birthday"] = "2017-03-15";
  }

  useEffect(() => {
    // 클라이언트에서만 clearStorage 실행
    if (typeof window !== "undefined") {
      useSignUpStore.persist.clearStorage();
    }
  }, []);

  return (
    <form
      action={() => {
        signIn("credentials", data);
      }}
    >
      {children}
    </form>
  );
}

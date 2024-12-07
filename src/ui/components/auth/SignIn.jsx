"use client";
import { useSignUpStore } from "@/src/stores/accountStore";
import { useUserTypeStore } from "@/src/stores/userStore";
import { signIn } from "next-auth/react";

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

  //todo: 보호자 생일이랑 전화번호 작대기 넣어서 zustand에 저장해서 줘야함 그거 되면 밑에 데이터 바꾸기
  const data = {
    email: email,
    name: name,
    phone: phone,
    birthday: birthday,
    simplePassword: simplePassword,
    guardianName: guardianName,
    guardianBirthday: guardianBirthday,
    guardianPhone: guardianPhone,
    memberType: userType,
    social: "naver",
    redirectTo: "/",
  };

   console.log(data);
  // let data = useSignUpStore.persist.clearStorage();

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
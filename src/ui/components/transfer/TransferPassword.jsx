"use client";
import { urlPath } from "@/src/constants/common";
import { useState } from "react";
import { useTransaction } from "@/src/query/transactionQuery";
import { useRouter } from "next/navigation";
import PasswordSecondTop from "../signup/PasswordSecondTop";
import PasswordSecondBottom from "../signup/PasswordSecondBottom";
export default function TransferPassword({ selectedAccount, sendUser, transferAmount }) {
  const [isInput, setIsInput] = useState(Array(6).fill(false));
  const [pwd, setPwd] = useState("");
  const [allow, setAllowed] = useState(false);
  const router = useRouter();
  const { mutate, isLoading: isUpdating } = useTransaction();

  const handleSubmit = () => {
    setAllowed(false);
    mutate(
      {
        parentAccountNumber: sendUser.accountNumber,
        childAccountNumber: selectedAccount.accountNumber,
        amount: transferAmount,
        sender: sendUser.name,
        receiver: selectedAccount.name,
        simplePassword: pwd,
      },
      {
        onSuccess: () => {
          alert("이체가 성공적으로 완료되었습니다!");
          router.push(urlPath.DONE);
        },
        onError: (error) => {
          alert("이체 실패: " + error.message);
        },
      }
    );
  };
  return (
    <>
      <PasswordSecondTop
        isInput={isInput}
        pwd={pwd}
        setIsInput={setIsInput}
        setPwd={setPwd}
        setAllowed={setAllowed}
        index={6}
        isSingleInput={true}
      />
      <PasswordSecondBottom
        pwd={pwd}
        isInput={isInput}
        allow={allow}
        setIsInput={setIsInput}
        setPwd={setPwd}
        setAllowed={setAllowed}
        isSingleInput={true}
        type={"childtransfer"}
        onConfirmClick={handleSubmit}
      />
    </>
  );
}

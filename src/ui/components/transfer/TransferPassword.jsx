"use client";
import { urlPath } from "@/src/constants/common";
import { useState } from "react";
import { useTransaction } from "@/src/query/transactionQuery";
import { useRouter } from "next/navigation";
import PasswordSecondTop from "../signup/PasswordSecondTop";
import PasswordSecondBottom from "../signup/PasswordSecondBottom";
import toast, { Toaster } from "react-hot-toast";
export default function TransferPassword({
  selectedAccount,
  sendUser,
  transferAmount,
}) {
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
          router.push(urlPath.DONE);
        },
        onError: (error) => {
          
          toast.error('비밀번호가 일치하지 않아요!')
          setIsInput((prev) => prev.map(() => false));
          setPwd("");
          
        
        },
      },
    );
  };
  return (
    <>
      <Toaster position="top-center"/>
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

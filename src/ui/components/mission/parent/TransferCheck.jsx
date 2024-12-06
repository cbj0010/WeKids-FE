"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAcceptMission } from "@/src/query/missionQuery";
import PasswordSecondBottom from "../../signup/PasswordSecondBottom";
import PasswordSecondTop from "../../signup/PasswordSecondTop";
import toast, { Toaster } from "react-hot-toast";

export default function TransferCheck({ missionId, setType }) {
  const [isInput, setIsInput] = useState(Array(6).fill(false));
  const [pwd, setPwd] = useState("");
  const [allow, setAllowed] = useState(false);
  const { mutate, isLoading: isUpdating } = useAcceptMission();

  const handleSubmit = () => {
    console.log(missionId);
    mutate(
      {
        missionId: missionId,
        simplePassword: pwd,
      },
      {
        onSuccess: () => {
          toast.success("이체가 성공적으로 완료되었습니다!");
          setType("COMPLETE");
        },
        onError: (error) => {
          toast.error("이체 실패: " + error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-[393px] bg-white overflow-auto">
      <Toaster position="top-center" reverseOrder={false} />
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
        type={"none"}
        onConfirmClick={handleSubmit}
      />
    </div>
  );
}

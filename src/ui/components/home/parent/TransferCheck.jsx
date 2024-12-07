"use client";
import PasswordTop from "@/src/ui/components/signup/PasswordTop";
import PasswordBottom from "@/src/ui/components/signup/PasswordBottom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAcceptMission } from "@/src/query/missionQuery";

export default function TransferCheck({ missionId, setType }) {
  const [isInput, setIsInput] = useState(Array(6).fill(false));
  const [pwd, setPwd] = useState("");
  const [allow, setAllowed] = useState(false);
  const { mutate, isLoading: isUpdating } = useAcceptMission();

  const handleSubmit = () => {
    mutate(
      {
        missionId: missionId,
        simplePassword: pwd,
      },
      {
        onSuccess: () => {
          alert("이체가 성공적으로 완료되었습니다!");
          setType("COMPLETE");
        },
        onError: (error) => {
          alert("이체 실패: " + error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-[393px] bg-white overflow-auto">
      <PasswordTop
        isInput={isInput}
        pwd={pwd}
        setIsInput={setIsInput}
        setPwd={setPwd}
        setAllowed={setAllowed}
        index={6}
        isSingleInput={true}
      />
      <PasswordBottom
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
    </div>
  );
}

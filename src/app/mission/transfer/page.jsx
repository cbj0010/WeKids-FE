"use client";
import { useMissionIDStore } from "@/src/stores/missionFilterStore";
import { useAccountStore } from "@/src/stores/userStore";
import TransferCheck from "@/src/ui/components/mission/parent/TransferCheck";
import TransferComplete from "@/src/ui/components/transfer/TransferComplete";
import TransferDone from "@/src/ui/components/transfer/TransferDone";
import { useState } from "react";

export default function TransferDonePage() {
  const [type, setType] = useState("CONFIRM");
  const { missionId } = useMissionIDStore();
  const [first, setFirst] = useState(0);
  const [childName, setChildName] = useState("");
  const { accountInfo } = useAccountStore();
  const [amount, setAmount] = useState(0);

  return (
    <>
      {type == "CONFIRM" ? (
        <TransferComplete
          missionId={missionId}
          type={type}
          setChildName={setChildName}
          setAmount={setAmount}
          childName={childName}
          amount={amount}
          accountNumber={accountInfo.accountNumber}
          setType={setType}
        />
      ) : type == "SEND" ? (
        <TransferCheck missionId={missionId} setType={setType} />
      ) : (
        <TransferDone
          childName={childName}
          amount={amount}
          accountNumber={accountInfo.accountNumber}
        />
      )}
    </>
  );
}

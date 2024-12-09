"use client";
import { fetchChildAccounts } from "@/src/apis/account";
import { urlPath } from "@/src/constants/common";
import { useTransactionStore } from "@/src/stores/transactionStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import KeyPad from "@/src/ui/components/atoms/KeyPad";
import Loader from "@/src/ui/components/atoms/Loader";
import TransferAmountDisplay from "@/src/ui/components/transfer/TransferAmoutDisplay";
import TransferModal from "@/src/ui/components/transfer/TransferModal";
import TransferOptions from "@/src/ui/components/transfer/TransferOptions";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import TransferPassword from "./TransferPassword";

export default function TransferDetail({ userdata }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const {
    selectedAccount,
    setSelectedAccount,
    transferAmount,
    setTransferAmount,
    clearTransferData,
  } = useTransactionStore();
  const [first, setFirst] = useState(true);
  const [transfer, setTransfer] = useState(false);

  useEffect(() => {
    if (first) {
      setTransferAmount(0);
      setFirst(false);
    }

    if (isShaking) {
      const timeout = setTimeout(() => {
        setIsShaking(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isShaking]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["accountData"], // queryKey를 객체 형태로 전달
    queryFn: fetchChildAccounts, // service에서 가져온 queryFn 지정
  });

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const modalHandler = () => setIsModalOpen(!isModalOpen);

  const handleNumberClick = (num) => {
    if (num === "⌫") {
      const newAmount = transferAmount.toString().slice(0, -1);
      setTransferAmount(newAmount === "" ? 0 : parseInt(newAmount, 10));
    } else {
      const newTotal = parseInt(transferAmount.toString() + num, 10);
      if (newTotal > userdata.parent.balance) {
        setTransferAmount(userdata.parent.balance);
        setIsShaking(true);
      } else {
        setTransferAmount(newTotal);
      }
    }
  };

  const handleSetMaxAmount = () => {
    setTransferAmount(userdata.parent.balance);
  };

  const handleAddAmount = (increment) => {
    const newTotal = transferAmount + increment;
    if (newTotal > userdata.parent.balance) {
      setTransferAmount(userdata.parent.balance);
      setIsShaking(true);
    } else {
      setTransferAmount(newTotal);
    }
  };

  if (!selectedAccount) redirect(urlPath.ACCOUNT_LIST);

  const handleUserChange = (e) => {
    const selectedName = e.target.value;
    const user = data.find((user) => user.name === selectedName); // dummyData
    if (user) {
      setSelectedAccount(user);
    }
  };

  // 0원 이하일 경우 버튼 비활성화
  const isButtonDisabled = transferAmount <= 0;

  const handleButtonClick = () => {
    if (isButtonDisabled) {
      // Todo 이거 안뜸.. 왜인지는 알겠는데 못고쳐..!
      toast.error("0원은 입력할 수 없습니다.");
    } else {
      // transferAmount가 0 이상일 경우, modal을 열거나 다른 동작 수행
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white mt-5">
      {!transfer ? (
        <>
          <TransferAmountDisplay
            selectedAccount={selectedAccount}
            transferAmount={transferAmount}
            clearTransferData={clearTransferData}
            sendUser={userdata.parent}
            childrenAccounts={userdata.children}
            isShaking={isShaking}
            handleUserChange={handleUserChange}
          />
          <div className="bottom-0 fixed">
            <TransferOptions
              handleAddAmount={handleAddAmount}
              handleSetMaxAmount={handleSetMaxAmount}
            />
            <div className="w-[393px] mt-9">
              <KeyPad
                number={handleNumberClick}
                buttonHeight="h-14"
                buttonWidth="w-[393px]"
              />
            </div>
            <CustomButton
              onClick={handleButtonClick}
              className={`${isButtonDisabled ? "bg-stone-300 cursor-not-allowed pointer-events-none" : ""}`}
            >
              다음
            </CustomButton>
          </div>
          <TransferModal
            isModalOpen={isModalOpen}
            modalHandler={modalHandler}
            selectedAccount={selectedAccount}
            transferAmount={transferAmount}
            sendUser={userdata.parent}
            setTransfer={setTransfer}
          />
        </>
      ) : (
        <TransferPassword
          selectedAccount={selectedAccount}
          transferAmount={transferAmount}
          sendUser={userdata.parent}
        />
      )}
    </div>
  );
}

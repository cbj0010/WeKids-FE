"use client";

import { characterInfoMap, urlPath } from "@/src/constants/common";
import { useTransactionStore } from "@/src/stores/transactionStore";
import { useAccountStore, useSelectUserStore, useUserCardColorStore } from "@/src/stores/userStore";
import { CopyIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const BlueCardBox = ({ selectedAccount, isParent, hasChild, userSession }) => {
  const [backgroundColorClass, setBackgroundColorClass] = useState("");
  const setCardColor = useUserCardColorStore((state) => state.setCardColor);
  const { accountInfo } = useAccountStore();
  const { setSelectedAccountId, setSelectedAccountInfo } = useSelectUserStore();
  const { setSelectedAccount } = useTransactionStore();
  useEffect(() => {
    setSelectedAccountId(selectedAccount.accountId);
    setSelectedAccount({
      id: selectedAccount.accountId,
      name: selectedAccount.name,
      accountNumber: selectedAccount.accountNumber,
    });
    setSelectedAccountInfo({
      name: selectedAccount.name,
      accountNumber: selectedAccount.accountNumber,
      color: selectedAccount.color,
    });

    if (selectedAccount) {
      const accountCharacterInfo = characterInfoMap[selectedAccount.character] || {};

      const bgClass = accountCharacterInfo.colorClass
        ? accountCharacterInfo.colorClass
        : "bg-main02";
      setCardColor(bgClass);
      setBackgroundColorClass(bgClass);
    }
  }, [selectedAccount]);

  if (!selectedAccount) return <div>계좌를 선택해주세요.</div>;

  const handleCopy = async () => {
    if (selectedAccount) {
      try {
        await navigator.clipboard.writeText(selectedAccount.accountNumber); // 계좌번호 복사
        toast.success("복사가 완료되었습니다!"); // 토스트 메시지 표시
      } catch (err) {
        toast.error("복사에 실패했습니다."); // 복사 실패 시 메시지 표시
        console.error("복사 실패:", err);
      }
    }
  };

  const clickHandler = (e) => {
    if (selectedAccount == null) {
      e.preventDefault();
    }
    if (!hasChild) {
      toast.error("아이가 없어요");
    }
  };

  const handleRouteChange = () => {
    window.location.href = urlPath.TRANSACTION_HISTORY;
  };

  return (
    <div
      className={`${backgroundColorClass} shadow-md w-[330px] h-[252px] text-black rounded-[10px] relative overflow-hidden`}
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="p-5">
        <div className="w-[180px]">
          <div className="flex items-center space-x-2 mt-3">
            <Text className="text-R-10">{selectedAccount.accountNumber}</Text>
            <CopyIcon onClick={handleCopy} className="cursor-pointer" />
          </div>
          <Text className="text-B-22 mt-9">{selectedAccount.name}</Text>
        </div>
      </div>
      <div className="absolute w-full bottom-20 text-right pr-7">
        <Text className="text-R-25">{Number(selectedAccount.balance).toLocaleString()} 원</Text>
      </div>
      <div className="absolute right-0 bottom-[75px] w-[180px] h-[180px] overflow-hidden">
        <Image
          fill
          src={characterInfoMap[selectedAccount.character].imagePath}
          alt="Mascot"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "top right",
            clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 75%)",
          }}
          loading="eager"
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="w-full h-[1px] bg-black"></div>
        <div className="flex text-black">
          <div
            onClick={handleRouteChange}
            className="flex-1 py-4 text-center text-R-20 border-black hover:bg-white/10 transition-colors"
          >
            <button>조회</button>
          </div>
          {/* 부모 세션이거나 부모가 자녀 계좌를 선택했을 때만 이체 버튼 표시 */}
          {(userSession === "parent" ||
            (isParent && selectedAccount.accountNumber !== accountInfo.accountNumber)) && (
            <Link
              href={userSession === "parent" ? urlPath.ACCOUNT_LIST : urlPath.TRANSFER}
              onClick={clickHandler}
              className="flex-1 py-4 text-center border-l border-black text-R-20 hover:bg-white/10 transition-colors"
            >
              <button>이체</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlueCardBox;

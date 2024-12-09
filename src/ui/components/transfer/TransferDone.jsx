"use client";
import { urlPath } from "@/src/constants/common";
import { useTransactionStore } from "@/src/stores/transactionStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import ShareButton from "@/src/ui/components/atoms/Sharebutton";
import { CheckIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const MESSAGES = {
  COMPLETE: {
    TITLE: (name) => `${name}님에게`,
    SUBTITLE: (amount) =>
      `${(Number(amount) || 0).toLocaleString()}원 보냈어요`,
  },
  CONFIRM: {
    TITLE: (name) => `${name}님에게`,
    SUBTITLE: (amount) =>
      `${(Number(amount) || 0).toLocaleString()}원 송금하시겠습니까?`,
  },
  BUTTONS: {
    CONFIRM: "확인",
  },
};

const TransferDone = ({
  type = "COMPLETE",
  childName,
  amount,
  accountNumber,
}) => {
  // type이 유효한지 확인하고, 유효하지 않으면 COMPLETE 사용
  const messageType = MESSAGES[type] ? type : "COMPLETE";
  const messages = MESSAGES[messageType];
  const { clearTransferData } = useTransactionStore();
  const router = useRouter();
  useEffect(() => {
    clearTransferData();
  }, []);

  const showToast = () => {
    toast("추후에 구현될 기능입니다.");
  };
  const handleRouteChange = () => {
    window.location.href = urlPath.HOME;
  };
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-[60px] h-[60px] rounded-full bg-main02 flex items-center justify-center mb-6">
          <CheckIcon className="w-[42px] h-[42px]" />
        </div>

        <div className="text-center space-y-2 mb-4">
          <p className="text-B-28 text-black/80">{messages.TITLE(childName)}</p>
          <p className="text-B-28 text-black/80">{messages.SUBTITLE(amount)}</p>
          <div className="flex items-center justify-center text-R-14 text-black/70 pt-4">
            {"우리은행 "}
            {accountNumber}
            <ChevronRightIcon
              width="16"
              height="16"
              stroke="text-neutral-300"
              strokeWidth={0.5}
            />
          </div>

          <p
            className="text-R-14 text-neutral-300 pt-2 px-4 py-2 bg-[#F5F5F5] rounded-[100px] inline-block"
            onClick={showToast}
          >
            {"메모 입력"}
          </p>
        </div>
      </div>

      <div className="px-5 pb-8">
        <div className="flex gap-2">
          <ShareButton rounded={true} />
          
            <CustomButton rounded={true} size="medium" color="main" onClick={handleRouteChange}>
              <span className="text-R-20">{MESSAGES.BUTTONS.CONFIRM}</span>
            </CustomButton>
          
        </div>
      </div>
    </main>
  );
};

export default TransferDone;

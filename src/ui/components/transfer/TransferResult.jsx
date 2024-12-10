import { urlPath } from "@/src/constants/common";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import ShareButton from "@/src/ui/components/atoms/Sharebutton";
import { CheckIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
const MESSAGES = {
  COMPLETE: {
    TITLE: (name) => `${name}님에게`,
    SUBTITLE: (amount) => `${amount}원 보냈어요`,
  },
  CONFIRM: {
    TITLE: (name) => `${name}님에게`,
    SUBTITLE: (amount) => `${amount}원 송금하시겠습니까?`,
  },
  BUTTONS: {
    CONFIRM: "확인",
  },
};

const TransferResult = ({
  transferData = {
    sendUser: "",
    amount: 0,
    accountNumber: "",
    bankName: "우리",
    memo: "",
  },
  type = "COMPLETE",
}) => {
  // type이 유효한지 확인하고, 유효하지 않으면 COMPLETE 사용
  const messageType = MESSAGES[type] ? type : "COMPLETE";
  const messages = MESSAGES[messageType];
  const router = useRouter();
  // type에 따라 다른 경로 설정
  const nextPath =
    type === "CONFIRM"
      ? urlPath.MISSION_TRANSFER_PASSWORD // 비밀번호 입력 페이지로
      : urlPath.HOME; // 완료 후 홈으로

  const showToast = () => {
    toast("추후에 추가될 기능입니다.");
  };
  
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-[60px] h-[60px] rounded-full bg-main02 flex items-center justify-center mb-6">
          <CheckIcon className="w-[42px] h-[42px]" />
        </div>

        <div className="text-center space-y-2 mb-4">
          <p className="text-B-28 text-black/80">
            {messages.TITLE(transferData.sendUser || "알 수 없는 사용자")}
          </p>
          <p className="text-B-28 text-black/80">
            {messages.SUBTITLE(transferData.amount?.toLocaleString() || 0)}
          </p>
          <div className="flex items-center justify-center text-R-14 text-neutral-300 pt-4">
            {transferData.bankName} {transferData.accountNumber}
            <ChevronRightIcon
              width="16"
              height="16"
              stroke="text-neutral-300"
              strokeWidth={0.5}
            />
          </div>
          {transferData.memo && (
            <p
              className="text-R-14 text-neutral-300 pt-2 px-4 py-2 bg-[#F5F5F5] rounded-[100px] inline-block"
              onClick={showToast}
            >
              {transferData.memo}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 pb-8">
        <div className="flex gap-2">
          <ShareButton onClick={showToast} rounded={true} />
          <Link href={urlPath.HOME}>
            <CustomButton rounded={true} size="medium" color="main">
              <span className="text-R-20">{MESSAGES.BUTTONS.CONFIRM}</span>
            </CustomButton>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TransferResult;

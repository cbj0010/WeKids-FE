import { urlPath } from "@/src/constants/common";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TransferAmountDisplay = ({
  selectedAccount,
  transferAmount,
  clearTransferData,
  childrenAccounts,
  sendUser,
  isShaking,
  handleUserChange,
}) => {
  useEffect(() => {
    if (!selectedAccount) {
      router.back();
    }
  }, [selectedAccount]);

  const router = useRouter();

  const btnHandler = (action) => {
    clearTransferData();
    setTimeout(() => {
      if (action === "back") {
        router.back();
      } else if (action === "cancel") {
        router.push(urlPath.ACCOUNT_LIST);
      }
    }, 0);
  };

  return (
    <div className="flex flex-col items-center w-full p-4 absolute h-3/5">
      <div className="flex justify-between items-center w-full mb-4">
        <Box onClick={() => btnHandler("back")}>
          <ArrowLeftIcon className="w-5 h-5 text-black/80 cursor-pointer" />
        </Box>
        <div className="text-center">
          <div>
            <select
              className="cursor-pointer text-black/80 text-R-14"
              value={selectedAccount.name}
              onChange={handleUserChange}
            >
              {childrenAccounts
                .filter((user) => user.accountNumber) // 계좌번호가 있는 사용자만 필터링
                .map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="text-R-12 text-neutral-400">
            {"우리은행"} {selectedAccount.accountNumber}
          </div>
        </div>
        <button
          className="text-R-14 text-black/80"
          onClick={() => btnHandler("cancel")}
        >
          취소
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-1/2 mt-8">
        <div
          className={`text-B-32 font-bold ${isShaking ? "text-red-600 shake-animation" : "text-black/80"}`}
        >
          {transferAmount.toLocaleString()}원
        </div>
        <div className="text-red-600 mt-2">
          {isShaking &&
            `${sendUser.balance.toLocaleString()}원 까지만 이체 가능합니다.`}
        </div>
      </div>
    </div>
  );
};

export default TransferAmountDisplay;

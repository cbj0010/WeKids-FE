"use client";
import { urlPath } from "@/src/constants/common";
import { getCurrentDateInKoreanFormat } from "@/src/constants/mission";
import { formatToLocalDate } from "@/src/constants/transaction";
import {
  useTransactionDetail,
  useUpdateTransactionMemo,
} from "@/src/query/transactionQuery";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import Loader from "@/src/ui/components/atoms/Loader";
import ShareButton from "@/src/ui/components/atoms/Sharebutton";
import Memo from "@/src/ui/components/transaction/detail/Memo";
import TransactionDetail from "@/src/ui/components/transaction/detail/TransactionDetail";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const TransactionDetailPage = ({ params }) => {
  const resolvedParams = use(params);
  const trxId = resolvedParams.trxId;
  const { data, isLoading, error } = useTransactionDetail(trxId);
  const [memo, setMemo] = useState("");
  const [createAt, setCreateAt] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setMemo(data.memo); // 서버에서 받은 메모를 상태에 반영
      const trimmed = data.createAt.substring(0, 19); // "2024-12-09T16:21:58"
      setCreateAt(trimmed.replace("T", " "));

    }
    
  }, [data]);

  const { mutate, isLoading: isUpdating } = useUpdateTransactionMemo();

  const notify = () => {
    toast.dismiss(); // 기존 토스트 모두 제거
    toast.error("추후에 구현될 기능입니다.");
  };

  const handleUpdateMemo = () => {
    if (!trxId) {
      return;
    }

    mutate(
      { transactionId: trxId, memo: memo || "" },
      {
        onSuccess: () => {
          console.log("메모 업데이트 성공!");
          router.push(`${urlPath.TRANSACTION_HISTORY}`);
        },
        onError: (error) => {
          console.error("메모 업데이트 실패:", error.message);
        },
      },
    );
  };

  if (isLoading || !data) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-between">
      <Toaster position="top-center" />
      <div className="w-full px-5 py-10">
        <div className="w-full flex items-center text-B-22 my-5">
          {data.title}
        </div>
        <Memo memo={memo} setMemo={setMemo} />
        <hr />
        <div className="w-full">
          <TransactionDetail label="거래시각" value={createAt || 0} />
          <TransactionDetail
            label="거래구분"
            value={data.type === "DEPOSIT" ? "입금" : "출금"}
          />
          <TransactionDetail label="거래금액" value={Math.abs(data?.amount)} type="money"/>
          <TransactionDetail label="거래 후 잔액" value={data?.balance} type="money"/>
        </div>
      </div>

      <div className="flex w-full">
        <ShareButton onClick={notify}/>
        <CustomButton onClick={handleUpdateMemo} isLoading={isUpdating}>
          확인
        </CustomButton>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
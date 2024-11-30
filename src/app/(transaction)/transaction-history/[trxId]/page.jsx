"use client";
import { use } from "react";
import {
  useTransactionDetail,
  useUpdateTransactionMemo,
} from "@/src/services/transaction";
import Loader from "@/src/ui/components/atoms/Loader";
import ShareButton from "@/src/ui/components/atoms/Sharebutton";
import Memo from "@/src/ui/components/transaction/detail/Memo";
import TransactionDetail from "@/src/ui/components/transaction/detail/TransactionDetail";
import { useState, useEffect } from "react";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import { useRouter } from "next/navigation";
import { urlPath } from "@/src/constants/common";

const TransactionDetailPage = ({ params }) => {
  const resolvedParams = use(params);
  const trxId = resolvedParams.trxId;
  const { data, isLoading, error } = useTransactionDetail(trxId);
  const [memo, setMemo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data?.memo && memo === "") {
      setMemo(data.memo);
    }
  }, [data]);

  const { mutate, isLoading: isUpdating } = useUpdateTransactionMemo();

  const handleUpdateMemo = () => {
    console.log("HandleUpdateMemo called");
    if (!trxId || !memo.trim()) {
      return;
    }

    mutate(
      { transactionId: trxId, memo },
      {
        onSuccess: () => {
          console.log("메모 업데이트 성공!");
          router.push(`${urlPath.TRANSACTION_HISTORY}?color=YELLOW`);
        },
        onError: (error) => {
          console.error("메모 업데이트 실패:", error.message);
        },
      },
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-between">
      <div className="w-full px-5 py-10">
        <div className="w-full flex items-center text-B-22 my-5">
          {data.title}
        </div>
        <Memo memo={memo} setMemo={setMemo} />
        <hr />
        <div className="w-full">
          <TransactionDetail label="거래시각" value={data.createdAt} />
          <TransactionDetail
            label="거래구분"
            value={data.type === "DEPOSIT" ? "입금" : "출금"}
          />
          <TransactionDetail label="거래금액" value={data.amount} />
          <TransactionDetail label="거래 후 잔액" value={data.balance} />
        </div>
      </div>

      <div className="flex w-full">
        <ShareButton />
        <CustomButton onClick={handleUpdateMemo} isLoading={isUpdating}>
          확인
        </CustomButton>
      </div>
    </div>
  );
};

export default TransactionDetailPage;

"use client";

import { fetchChildAccounts } from "@/src/apis/account";
import { urlPath } from "@/src/constants/common";
import { useTransactionStore } from "@/src/stores/transactionStore";
import Loader from "@/src/ui/components/atoms/Loader";
import TransferItem from "@/src/ui/components/atoms/TransferItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [accounts, setAccounts] = useState([]); // 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const router = useRouter();
  const { selectedAccount, setSelectedAccount, setChildrenAccounts } =
    useTransactionStore();

  // 계좌 데이터 가져오기
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await fetchChildAccounts(); // 데이터 가져오기
        setAccounts(data); // 가져온 데이터를 상태에 저장
        setChildrenAccounts(data); // 전역 상태에 저장
      } catch (error) {
        setError(error.message); // 에러 처리
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchAccounts();
  }, [setChildrenAccounts]);

  // 계좌 선택 핸들러
  const handleSelect = useCallback(
    (user, e) => {
      setSelectedAccount({
        id: user.accountId,
        name: user.name,
        accountNumber: user.accountNumber,
      });
      router.push(urlPath.TRANSFER);
    },
    [setSelectedAccount, router],
  );

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col">
      <div className="flex justify-between p-4">
        <h1 className="text-R-20 text-black/80">이체</h1>
        <Link href={urlPath.HOME}>
          <button className="text-black/70 text-R-20">닫기</button>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {accounts.map((user, idx) => (
          <TransferItem
            imgPath={`/images/${user.profile}`}
            key={user.accountId}
            name={user.name}
            account={user.accountNumber}
            bank={"우리은행"}
            isSelected={user.accountId === selectedAccount?.id}
            onClick={(e) => handleSelect(user, e)}
          />
        ))}
      </div>
    </div>
  );
}

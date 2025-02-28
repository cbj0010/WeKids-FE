import { fetchAccounts } from "@/src/apis/account";
import { urlPath } from "@/src/constants/common";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import ParentChildSelector from "../signup/ParentChildSelector";
import SelectorAccount from "../signup/SelectorAccount";
import { useState, useEffect } from "react";
import { useFetchAccount } from "@/src/query/parentQuery";
import { useRouter } from "next/navigation";

export default function AccountList() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const router = useRouter();
  const { mutate, isLoading: isUpdating } = useFetchAccount();
  const clickHandler = () => {
    if (selectedIndex !== null) {
      mutate(
        {
          accountNumber: accountNumber,
        },
        {
          onSuccess: () => {
            console.log("계좌 업데이트 성공!");
            router.push(`${urlPath.HOME}`);
          },
          onError: (error) => {
            console.error("계좌 업데이트 실패:", error.message);
          },
        },
      );
    } else {
      console.error("선택된 계좌가 없습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAccounts();
        setData(response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  const totalBalance = data.reduce((acc, item) => acc + item.balance, 0);

  const toggleAccountSelection = (index, accountNumber) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
    setAccountNumber((prev) => (prev === accountNumber ? null : accountNumber));
  };

  let accountList = [];

  data.map((account, index) => {
    accountList.push(
      <ParentChildSelector
        key={index}
        isSelected={selectedIndex == index}
        onClick={() => toggleAccountSelection(index, account.accountNumber)}
      >
        <SelectorAccount
          name={account.bankName}
          account={account.accountNumber}
          balance={account.balance}
        />
      </ParentChildSelector>,
    );
  });

  return (
    <div className="flex flex-col w-full h-full justify-around overflow-auto scrollbar-hide">
      <div className="w-full flex flex-col px-[25px] overflow-hidden h-5/6">
        <div className="text-R-28 text-black/80">내 계좌</div>
        <div className="pointer-events-none shadow-sm shadow-black/20 text-black/80 h-[48px] w-full flex text-R-20 bg-main04/20 rounded-[13px] items-center justify-between px-4 my-4">
          <span>총 {data.length} 개</span>
          <span>{totalBalance.toLocaleString()} 원</span>
        </div>
        <div className="w-full h-full overflow-y-scroll scrollbar-hide space-y-[15px] mb-5">
          {accountList}
        </div>
      </div>
      <div className="sticky bottom-0">
        <CustomButton
          color={selectedIndex !== null ? "main" : "gray"}
          onClick={clickHandler}
          disabled={selectedIndex === null}
        >
          가져오기
        </CustomButton>
      </div>
    </div>
  );
}
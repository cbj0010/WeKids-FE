"use client";
import { colorTypeMap, urlPath } from "@/src/constants/common";
import { useTransFilterStore } from "@/src/stores/transactionStore";
import {
  useAccountStore,
  useSelectUserStore,
  useUserTypeStore,
} from "@/src/stores/userStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import { ArrowLeftIcon, GearIcon } from "@radix-ui/react-icons";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function TopBar({ }) {
  const { balance } = useTransFilterStore();
  const { selectedaccountInfo } = useSelectUserStore();
  const {accountInfo} = useAccountStore();

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("클립보드에 복사되었습니다!"))
      .catch((err) => console.error("복사 실패:", err));
  };
  const notify = () => {
    toast.dismiss(); // 기존 토스트 모두 제거
    toast.error("추후에 구현될 기능입니다.", {
      id: "unique-toast", // 고유 ID 부여
      duration: 2000,
      position: "bottom-center",
    });
  };

  const handleSettingsClick = () => {
    alert("설정 버튼 클릭됨");
  };

  return (
    <Flex
      align="center"
      justify="between"
      direction="column"
      className={`${colorTypeMap[selectedaccountInfo.color]?.colorClass || "default-bg"} h-[40vh]`}
    >
      <Flex
        align="center"
        justify="between"
        direction="row"
        className="w-full pt-8 pl-3 pr-3"
      >
        <Link href={urlPath.HOME}>
          <ArrowLeftIcon className="w-5 h-5 text-black/80" />
        </Link>
        <h1 className="text-black/80">{selectedaccountInfo.name}의 통장</h1>
        <Box onClick={handleSettingsClick}>
          <GearIcon className="w-5 h-5 text-black/80" />
        </Box>
      </Flex>
      <Flex direction="column" align="center">
        <p
          className="text-R-14 underline text-black/40 text cursor-pointer"
          onClick={() => copyToClipboard(selectedaccountInfo.accountNumber)}
          title="클릭하여 복사"
        >
          {selectedaccountInfo.accountNumber}
        </p>
        <h2 className="text-black/80 text-B-32 mt-4">
          {Number(balance).toLocaleString()}원
        </h2>
      </Flex>
      <Flex justify="between" direction="row" className="gap-3 m-8 mt-4">
        {selectedaccountInfo.accountNumber == accountInfo.accountNumber && (
          <>
            <Link href={urlPath.TRANSFER}>
              <CustomButton
                className="text-R-14"
                size="small"
                color="black10"
                rounded={true}
              >
                용돈주기
              </CustomButton>
            </Link>
            <CustomButton
              className="text-R-14"
              size="small"
              color="black10"
              rounded={true}
              onClick={notify}
            >
              가져오기
            </CustomButton>
            <Toaster position="bottom-center" />
          </>
        )}
      </Flex>
    </Flex>
  );
}

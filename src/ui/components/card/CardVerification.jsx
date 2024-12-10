"use client";

import { urlPath } from "@/src/constants/common";
import { useAccountStore } from "@/src/stores/userStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import ChildInputForm from "@/src/ui/components/signup/ChildInputForm";
import Bottom from "@/src/ui/components/signup/SignUpFooter";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CardVerification() {
  const { accountInfo } = useAccountStore();
  const [topChecked, setTopChecked] = useState(false);
  const [bottomChecked, setBottomChecked] = useState(false);

  const notify = () => {
    toast("빈칸을 채워주세요!");
  };

  const clickHandler = (e) => {
    if (!topChecked || !bottomChecked) {
      e.preventDefault();
      notify();
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-1 flex-col overflow-y-auto scrollbar-hide">
        <ChildInputForm
          setAllChecked={setTopChecked}
          parentName={accountInfo.name}
        />
        <div className="mt-12 mb-1 text-R-20 text-black/80">
          <div className="px-10 mb-4">
            아이의 계좌를 만들기 위해 <br />{" "}
            {accountInfo ? accountInfo.name : ""}님의 동의가 필요해요
          </div>
          <div className="flex flex-col items-center">
            <Bottom setAllChecked={setBottomChecked} />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-10 py-5 gap-6">
        <Link href={urlPath.PARENT_CARD_CHECK}>
          <CustomButton
            rounded="true"
            className={`w-full ${
              topChecked && bottomChecked
                ? "bg-main02"
                : "bg-stone-300 hover:bg-stone-300"
            }`}
            onClick={clickHandler}
          >
            다음
          </CustomButton>
        </Link>
        <Link href={urlPath.HOME}>
          <CustomButton
            rounded="true"
            className="w-full bg-stone-300 hover:bg-stone-300"
          >
            닫기
          </CustomButton>
        </Link>
      </div>
    </>
  );
}

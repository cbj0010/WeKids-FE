"use client";

import { urlPath } from "@/src/constants/common";
import { useUserTypeStore } from "@/src/stores/userStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import Bottom from "@/src/ui/components/signup/SignUpFooter";
import Top from "@/src/ui/components/signup/SignUpHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegForm({ data }) {
  const [topChecked, setTopChecked] = useState(false);
  const [bottomChecked, setBottomChecked] = useState(false);
  const router = useRouter();

  const notify = () => {
    toast("빈칸을 채워주세요!");
  };

  return (
    <div className="flex flex-col w-full h-full bg-white py-[36px]">
      <Toaster position="top-center" />
      <div className="text-R-20 text-black/80 mb-5 px-[34px]">
        개인정보 입력
      </div>
      <div className="flex flex-col items-center gap-5 w-full h-full px-[30px] overflow-y-auto scrollbar-hide">
        <Top setAllChecked={setTopChecked} data={data} />
        <Bottom setAllChecked={setBottomChecked} />
      </div>

      <div className="px-10 py-5">
        <CustomButton
          rounded="true"
          className={`w-full border border-black/80 ${
            topChecked && bottomChecked
              ? "bg-main01"
              : "bg-stone-300 hover:bg-stone-300"
          }`}
          onClick={() => {
            if (topChecked && bottomChecked) {
              const userType = useUserTypeStore.getState().userType;
              if (userType === "PARENT") {
                router.push(urlPath.SELECT_PARENT_PASSWORD);
              } else if (userType === "CHILD") {
                router.push(urlPath.SELECT_CHILD_APPLY);
              }
            } else {
              notify();
            }
          }}
        >
          다음
        </CustomButton>
      </div>
    </div>
  );
}

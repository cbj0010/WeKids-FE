"use client";

import Image from "next/image";
import { useEffect } from "react";
import CustomButton from "../ui/components/atoms/CustomButton";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-5">
      <h2 className="text-black/70 text-B-22">USER ERROR</h2>
      <p className="text-R-15 text-black/70">
        원활한 사용을 위해 페이지를 새로 고침 해주세요!
      </p>
      <Image
        src="/images/weebeGropImg.svg"
        width={240}
        height={83}
        alt="error characters"
        className="mb-10 mt-5 pb-14"
      />
      <CustomButton
        size="mediumLarge"
        onClick={reset}
        rounded={true}
        className="bg-blue02 text-white"
      >
        새로 고침
      </CustomButton>
      {/* <CustomButton size="medium" onClick={() => reset()}>
        새로 고침
      </CustomButton> */}
    </div>
  );
}

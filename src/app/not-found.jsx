"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { urlPath } from "../constants/common";
import CustomButton from "../ui/components/atoms/CustomButton";

export default function NotFound() {
  const router = useRouter();

  const handleRefresh = () => {
    router.push(urlPath.HOME);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-5">
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-B-22 mb-2">404 ERROR</h2>
        <p className="text-R-14 text-sub02 mb-8">
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
          onClick={handleRefresh}
          rounded={true}
          className="bg-blue02 text-white"
        >
          새로 고침
        </CustomButton>
      </div>
    </div>
  );
}

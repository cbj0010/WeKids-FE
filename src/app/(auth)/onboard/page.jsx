import Image from "next/image";
import NaverLoginImg from "@/public/images/naverLoginImg.png";
import KakaoLoginImg from "@/public/images/kakaoLoginImg.png";
import FaviconImg from "@/public/images/favicon.svg";
import LogoImg from "@/public/images/logoImg.svg";
import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const OnBoardPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <div className="flex flex-col space-y-16">
        <FaviconImg />
        <LogoImg
          style={{
            transform: "scale(2)",
            transformOrigin: "center",
          }}
        />
      </div>

      <div className="flex flex-col space-y-6">
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}oauth2/authorization/naver`}>
          <Image src={NaverLoginImg} alt="회원가입" width={342} height={55} />
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}oauth2/authorization/naver`}>
          <Image src={KakaoLoginImg} alt="회원가입" width={342} height={55} />
        </Link>
      </div>
    </div>
  );
};

export default OnBoardPage;

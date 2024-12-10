import { fetchUserData } from "@/src/apis/members";
import { characterInfoMap } from "@/src/constants/common";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import { SignOut } from "@/src/ui/components/auth/SignOut";
import Image from "next/image";

export default async function MyPage() {
  const userData = await fetchUserData();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="text-center items-center justify-center flex flex-col">
          <div className="w-[93px] h-[93px] bg-gray-200 flex rounded-full overflow-hidden mb-4">
            {userData?.profile ? (
              <Image
                src={characterInfoMap[userData.profile]}
                alt="프로필 이미지"
                width={93}
                height={93}
                className="object-cover"
              />
            ) : (
              <Image
                src={characterInfoMap[userData.profile]}
                alt="기본 프로필"
                width={93}
                height={93}
                className="object-cover"
              />
            )}
          </div>
          <div className="text-B-16">{userData?.name}</div>
          <div className="text-gray-500 text-sm mt-1">{userData?.email}</div>
        </div>

        <div className="mt-6 w-full max-w-[320px]">
          <CustomButton
            size="mediumLarge"
            rounded={true}
            className="w-full bg-gray-100 text-black"
          >
            송금 비밀번호 변경하기
          </CustomButton>
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="flex flex-col items-center gap-4 pb-12">
        <SignOut>
          <CustomButton size="mediumLarge" rounded={true}>
            로그아웃
          </CustomButton>
        </SignOut>
        <button className="text-gray-400 text-sm underline">회원탈퇴</button>
      </div>
    </div>
  );
}

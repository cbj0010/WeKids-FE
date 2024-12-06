import Header from "@/src/ui/layout/Header";
import { SignOut } from "@/src/ui/components/auth/SignOut";
import CustomButton from "@/src/ui/components/atoms/CustomButton";

export default function Page() {
  const userData = {
    name: "안찬웅",
    email: "1stevering@naver.com",
    // profile: "/images/profile.png",
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Header />
      </div>

      <div className="flex flex-col items-center mt-4">
        {userData && (
          <div className="flex flex-col items-center mb-8">
            <div className="text-B-16 mt-2">{userData.name}</div>
            <div className="text-gray-500">{userData.email}</div>
          </div>
        )}
      </div>

      <div className="flex-grow"></div>

      <div className="flex flex-col items-center mt-4">
        <div className="w-[343px] h-[77px] flex-shrink-0 rounded-[25px] bg-white shadow-md flex items-center justify-center">
          <div className="ml-4 text-B-16">송금 비밀번호 변경하기</div>
        </div>
      </div>

      <div className="flex-grow"></div>
      <div className="flex flex-col justify-center items-center pb-10">
        <SignOut>
          <CustomButton size="mediumLarge" rounded={true}>
            로그아웃
          </CustomButton>
        </SignOut>
        <button className="text-gray-400 underline">탈퇴하기</button>
      </div>
    </div>
  );
}

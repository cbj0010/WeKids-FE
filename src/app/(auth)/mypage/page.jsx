import Header from "@/src/ui/layout/Header";
import Rectangle from "@/src/ui/components/atoms/Rectangle";
import { SignOut } from "@/src/ui/components/auth/SignOut";
import CustomButton from "@/src/ui/components/atoms/CustomButton";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Header />
      </div>

      <div className="flex flex-col items-center mt-4">
        <Rectangle className="w-[343px] h-[77px] flex-shrink-0">
          <div className="ml-4 text-B-16">송금 비밀번호 변경하기</div>
        </Rectangle>
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

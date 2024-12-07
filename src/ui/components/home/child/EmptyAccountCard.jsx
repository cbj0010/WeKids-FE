"use client";
import { urlPath } from "@/src/constants/common";
import { useUserStore } from "@/src/stores/userStore";
import { useRouter } from "next/navigation";
import { AccountCardLayout } from "../AccountCardLayout";
import { MessageBox } from "../MessageBox";


export const EmptyAccountCard = ({ name }) => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const router = useRouter();
  const handleClick = () => {
    setUserInfo(name, name);
    router.push(urlPath.CHILD_CARD);
  };

  return (
    <div className="flex flex-col items-center">
      <AccountCardLayout title={name + " 자녀님 위키즈 카드가 없네요!"}>
        <div onClick={handleClick}>
          <MessageBox
            subtitle={`위키즈 체크카드\n발급하러 가기`}
            description="우리 아이의 경제공부, 위키즈 체크카드로 해결!"
            imgUrl="/images/noCardIconImg.svg"
          />
        </div>
      </AccountCardLayout>
    </div>
  );
};

export default EmptyAccountCard;

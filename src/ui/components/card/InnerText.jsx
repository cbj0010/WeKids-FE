import { urlPath } from "@/src/constants/common";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import Link from "next/link";

export default function InnerText({ isChild = true, name1, name2 }) {
  return (
    <div className="flex flex-col w-full">
      <div className="h-3/4 pl-3">
        <div className="flex h-1/3 items-center">
          <span className="text-R-20">카드 발급 안내</span>
        </div>
        <div className="flex flex-col gap-6 pt-4">
          <p>
            <span className="text-main04">{name1}</span> 고객님 <br />
          </p>
          {isChild ? (
            <p>
              보호자 {name2}님께 <br /> 요청이 완료되었습니다.
            </p>
          ) : (
            <p>
              자녀 {name2}님께 <br /> 카드 발급요청이 왔습니다.
            </p>
          )}
        </div>
      </div>
      <div className="p-3">
        <Link href={isChild ? urlPath.CHILD_CARD_COMPLETE : urlPath.PARENT_CARD_ALARM}>
          <CustomButton
            rounded={true}
            size={"mediumLarge"}
            className="max-w-full"
          >
            카드 디자인 보기
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { urlPath } from "@/src/constants/common";
import { useColorStore } from "@/src/stores/cardStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import CardDisplay from "@/src/ui/components/card/CardDisplay";
import Link from "next/link";
const DesignChracterColor = {
  color: "PINK1",
  character: "HEARTSPRING",
};

export default function DeliveryComponent() {
  const { childcharacter, childcolor } = useColorStore();

  return (
    <div className="flex flex-col items-center min-h-screen bg-sub02">
      <div className="flex-1 flex items-center">
        <CardDisplay
          selectedCharacter={childcharacter || DesignChracterColor.character}
          selectedColor={childcolor || DesignChracterColor.color}
          message={`카드 및 계좌 발급이 \n완료 되었습니다`}
        />
      </div>

      <div className="w-full px-4 mb-8">
        <Link href={urlPath.PARENT_CARD_DELIVERY}>
          <CustomButton
            size="large"
            rounded={true}
            className="w-full bg-blue01"
          >
            배송지 등록하러가기
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}

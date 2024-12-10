"use client";

import React from "react";
import { urlPath } from "@/src/constants/common";
import CardDisplay from "@/src/ui/components/card/CardDisplay";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import Link from "next/link";
import { useColorStore } from "@/src/stores/cardStore";
const DesignChracterColor = {
  color: "PINK1",
  character: "HEARTSPRING",
};

export default function DeliveryComponent() {
  const { childcharacter, childcolor } = useColorStore();

  return (
    <>
      <div className="flex-grow flex items-center justify-center">
        <CardDisplay
          selectedCharacter={
            childcharacter ? childcharacter : DesignChracterColor.character
          }
          selectedColor={childcolor ? childcolor : DesignChracterColor.color}
          buttonText="뒷면보기"
          message="카드 발급을 완료했습니다!"
        />
      </div>
      <Link href={urlPath.PARENT_CARD_DELIVERY}>
        <div>
          <CustomButton size={"large"} rounded={false}>
            배송지 등록하러가기
          </CustomButton>
        </div>
      </Link>
    </>
  );
}

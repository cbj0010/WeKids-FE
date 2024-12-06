"use client";

import { designFetch } from "@/src/apis/design";
import { useColorStore, useSensitiveDataStore } from "@/src/stores/cardStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParentCardCharacter from "../card-select/ParentCardCharacter";

export default function ChoiceParentDesign({
  title,
  subText,
  buttonText,
  linkUrl,
  character = "HEARTSPRING",
  color = "PINK2",
  onClick,
}) {
  const [design, setDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChildCharacter, setChildColor } = useColorStore();
  const { childId } = useSensitiveDataStore();

  useEffect(() => {
    console.log("childId 값 확인:", childId);

    const fetchDesign = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        console.log("디자인 데이터 가져오는 중...");

        // API 호출
        const data = await designFetch({ designId: childId });
        console.log("가져온 데이터:", data);

        // 상태 업데이트
        setDesign(data);
        if (setChildCharacter && setChildColor) {
          console.log("캐릭터 및 색상 설정 중...");
          setChildCharacter(data?.character || character);
          setChildColor(data?.color || color);
        }
      } catch (error) {
        console.error("디자인 데이터를 가져오는 중 에러 발생:", error.message);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    if (childId) {
      fetchDesign();
    } else {
      console.warn("childId가 유효하지 않음!");
    }
  }, [childId]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-R-28 text-white">{title}</div>
      <div className="w-[196px] h-[312px]">
        <ParentCardCharacter
          selectedCharacter={design?.character || character}
          selectedColor={design?.color || color}
        />
      </div>
      <div className="text-white">{subText}</div>
      <Link href={linkUrl}>
        <CustomButton
          size="mediumLarge"
          rounded={true}
          className="bg-main02 text-R-20"
          onClick={onClick}
          disabled={isLoading} // 로딩 중 버튼 비활성화
        >
          {isLoading ? "로딩 중..." : buttonText}
        </CustomButton>
      </Link>
    </div>
  );
}

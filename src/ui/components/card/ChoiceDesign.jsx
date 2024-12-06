"use client";

import { designFetch } from "@/src/apis/design";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import CardCharacter from "@/src/ui/components/card-select/CardCharacter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useColorStore, useSensitiveDataStore } from "@/src/stores/cardStore";

export default function ChoiceDesign({
  title,
  subText,
  buttonText,
  linkUrl,
  character = "HEARTSPRING",
  color = "PINK2",
  memberId,
  onClick,
}) {
  const [design, setDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChildCharacter, setChildColor } = useColorStore();
  const { childId } = useSensitiveDataStore();

  useEffect(() => {
    console.log(childId);
    const fetchDesign = async () => {
      try {
        const session = await auth(); // 세션에서 사용자 정보를 가져옴
        const memberId = session?.user?.id; // 사용자 ID를 가져옴

        if (!memberId) {
          throw new Error("Member ID not found");
        }

        console.log("Fetching design...");

        const data = await designFetch({ member: memberId });
        console.log(data);
        setDesign(data); // zustand에 저장
        if (setChildCharacter && setChildColor) {
          setChildCharacter(data?.character || character);
          setChildColor(data?.color || color);
        }
      } catch (error) {
        console.error("Error fetching design:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (memberId) {
      fetchDesign();
    }
  }, [memberId]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-R-28 text-white">{title}</div>
      <div className="w-[196px] h-[312px]">
        <CardCharacter
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
        >
          {buttonText}
        </CustomButton>
      </Link>
    </div>
  );
}

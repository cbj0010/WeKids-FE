"use client";

import { urlPath } from "@/src/constants/common";
import CardDesignLayout from "@/src/ui/components/card/CardDesignLayout";
import ChoiceDesign from "@/src/ui/components/card/ChoiceDesign";
import { useColorStore } from "@/src/stores/cardStore";
import { designCreate } from "@/src/apis/design";

const Page = () => {
  const { childcharacter, childcolor } = useColorStore();

  const handleRequestApproval = async () => {
    try {
      const data = {
        character: childcharacter,
        color: childcolor,
      };
      await designCreate(data);
    } catch (error) {
      console.error("Failed to create design:", error);
    }
  };

  return (
    <CardDesignLayout backUrl={urlPath.HOME}>
      <ChoiceDesign
        title="내가 선택한 디자인"
        subText="승인 대기중이에요."
        buttonText="동의 요청하기"
        linkUrl={urlPath.HOME}
        character={childcharacter}
        color={childcolor}
        onClick={handleRequestApproval}
      />
    </CardDesignLayout>
  );
};

export default Page;

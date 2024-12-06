import { urlPath } from "@/src/constants/common";
import CardDesignLayout from "@/src/ui/components/card/CardDesignLayout";
import ChoiceParentDesign from "@/src/ui/components/card/ChoiceParentDesign";

const Page = () => {
  return (
    <CardDesignLayout backUrl={urlPath.ALARM}>
      <ChoiceParentDesign
        title="자녀가 선택한 디자인"
        subText="이대로 진행할까요?"
        buttonText="확인"
        linkUrl={urlPath.PARENT_CARD_VERIFICATION}
      />
    </CardDesignLayout>
  );
};

export default Page;

import { urlPath } from "@/src/constants/common";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import CardConfirmItem from "@/src/ui/components/card/CardConfirmItem";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col bg-white overflow-hidden h-screen max-w-[393px]">
      <div className="flex flex-col p-10 h-full">
        <div className="flex flex-col gap-6 h-5/6 justify-center items-center">
          <CardConfirmItem />
        </div>
        <div className="flex h-1/6 w-full items-end pb-1">
        <Link href={urlPath.PARENT_CARD_PASSWORD}>
            <CustomButton size="mediumLarge" rounded={true}>
              확인
            </CustomButton>
        </Link>
        </div>
      </div>
    </div>
  );
}

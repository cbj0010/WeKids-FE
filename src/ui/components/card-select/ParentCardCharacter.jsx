import { characterInfoMap, colorTypeMap } from "@/src/constants/common";
import { useSensitiveDataStore } from "@/src/stores/cardStore";
import { convertToPingName } from "@/src/util/userUtil";
import Image from "next/image";

const ParentCardCharacter = ({ selectedCharacter, selectedColor }) => {
  const colorClass = colorTypeMap[selectedColor]?.colorClass || "bg-pinkHachu";
  const imagePath =
    characterInfoMap[selectedCharacter]?.imagePath ||
    "/images/hachupingImg.svg";
  const { childName } = useSensitiveDataStore();

  return (
    <div
      className={`relative w-[196px] h-[312px] flex-shrink-0 rounded-[14px] border border-black ${colorClass} shadow-2xl flex flex-col items-center justify-center`}
    >
      <Image
        src="/images/logoImg.svg"
        alt="Wekids Logo"
        width={42}
        height={20}
        className="absolute top-2 left-2"
      />
      <Image
        src="/images/CardChip.svg"
        alt="Card Chip"
        width={31}
        height={24}
        className="absolute top-8 right-1/4 transform -translate-x-1/2 flex-shrink-0"
        style={{ width: "auto", height: "auto" }}
      />
      <Image
        src={imagePath}
        alt="character name"
        width={192}
        height={191}
        priority
        className="w-[192px] h-[191px] flex-shrink-0 mt-10"
      />
      <p className="text-R-20 mt-5 text-black/40">
        {convertToPingName(childName)}
      </p>
    </div>
  );
};

export default ParentCardCharacter;

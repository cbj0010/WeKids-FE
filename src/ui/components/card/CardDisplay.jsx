import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import ParentCardCharacter from "../card-select/ParentCardCharacter";

const CardDisplay = ({
  selectedCharacter,
  selectedColor,
  buttonText,
  message,
}) => {
  return (
    <div
      className={
        "w-[313px] h-[513px] flex-shrink-0 rounded-[40px] border-2 border-black/40 flex flex-col bg-main02 items-center justify-center"
      }
    >
      <ParentCardCharacter
        selectedCharacter={selectedCharacter}
        selectedColor={selectedColor}
      />
      <button className="flex items-center mt-4 w-[79px] h-[26px] flex-shrink-0 rounded-[10px] bg-stone-300 text-R-10 text-black pl-1">
        <ReloadIcon className="mr-2 transform rotate-180 scale-x-[-1]" />
        {buttonText}
      </button>
      <p className="mt-4 text-white text-R-20">{message}</p>
    </div>
  );
};

export default CardDisplay;

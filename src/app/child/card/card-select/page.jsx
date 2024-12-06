"use client";

import { characterInfoMap, colorTypeMap } from "@/src/constants/common";
import { useColorStore } from "@/src/stores/cardStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import CardCharacter from "@/src/ui/components/card-select/CardCharacter";
import CardIssueModal from "@/src/ui/components/card-select/CardIssueModal";
import CharacterButton from "@/src/ui/components/card-select/CharacterButton";
import ColorButton from "@/src/ui/components/card-select/ColorButton";
import { useState } from "react";

export default function CardDesignSelector() {
  const {
    childcharacter: selectedCharacter,
    childcolor: selectedColor,
    setChildCharacter: setSelectedCharacter,
    setChildColor: setSelectedColor,
  } = useColorStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center mt-10 overflow-hidden">
      <div className="flex flex-col items-center">
        <h2 className="flex text-R-20 mb-4 ml-11 w-full">카드 디자인 선택</h2>
        <div className="w-[331px] h-[935px] flex-shrink-0 rounded-[10px] border border-black bg-white p-4">
          <div className="flex flex-col items-center mt-4">
            <CardCharacter
              selectedCharacter={selectedCharacter}
              selectedColor={selectedColor}
            />
          </div>
          <div className="text-center mb-12 mt-10">
            <h3 className="R-20 mb-3">배경색</h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-5 justify-items-center">
                {Object.keys(colorTypeMap).map((color) => {
                  return (
                    <ColorButton
                      key={color}
                      colorClass={colorTypeMap[color].colorClass}
                      isSelected={selectedColor === color}
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="R-20 mb-4">카드 캐릭터</h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-5">
                {Object.keys(characterInfoMap).map((character) => (
                  <CharacterButton
                    key={character}
                    character={character}
                    imagePath={characterInfoMap[character].imagePath}
                    className="w-12 h-12 cursor-pointer"
                    onClick={() => setSelectedCharacter(character)}
                    isSelected={selectedCharacter === character}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-col flex mt-10 mb-4">
        <CustomButton size="large" onClick={handleConfirm}>
          확인
        </CustomButton>
        <CardIssueModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

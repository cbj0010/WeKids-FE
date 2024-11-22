"use client";

import React, { useState } from 'react';
import { characterInfoMap } from '@/src/constants/common';
import CustomButton from '@/src/ui/Components/atoms/CustomButton';
import CardCharacter from '@/src/ui/Components/card-select/CardCharacter';
import ColorButton from '@/src/ui/Components/card-select/ColorButton';
import CharacterButton from '@/src/ui/Components/card-select/CharacterButton';
import CardIssueModal from '@/src/ui/Components/card-select/CardIssueModal';

const CardDesignSelector = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('HEARTSPRING');
  const [selectedColor, setSelectedColor] = useState('bg-pinkHachu');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleColorClick = (colorClass) => {
    setSelectedColor(colorClass);
  }; 
  
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center">
        <h2 className="text-lg mb-4 text-left w-full">카드 디자인 선택</h2>
        <div className="w-[331px] h-[855.21px] flex-shrink-0 rounded-[10px] border border-black bg-white p-4">
          <div className="flex flex-col items-center mt-4">
            <CardCharacter selectedCharacter={selectedCharacter} selectedColor={selectedColor} />
          </div>
          



        </div>

      
      </div>
    </div>
  );
}

export default CardDesignSelector;
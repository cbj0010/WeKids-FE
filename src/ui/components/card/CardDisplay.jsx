import ParentCardCharacter from "../card-select/ParentCardCharacter";

const CardDisplay = ({ selectedCharacter, selectedColor, message }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="whitespace-pre-line text-R-28 text-white items-center justify-center mb-8">
        {message}
      </p>
      <ParentCardCharacter
        selectedCharacter={selectedCharacter}
        selectedColor={selectedColor}
      />
    </div>
  );
};

export default CardDisplay;

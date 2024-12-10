import Profile from "@/src/ui/components/atoms/Profile";

const CharacterButton = ({
  character,
  imagePath,
  onClick,
  className,
  isSelected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-20 
        cursor-pointer 
        overflow-hidden 
        rounded-full 
        transition-all duration-200 ease-in-out
        hover:scale-110
        active:scale-95
        ${isSelected ? "ring-1 ring-black/40 ring-offset-2" : ""}
        ${className}
      `}
    >
      <Profile
        profile={imagePath}
        className="w-full h-full object-cover transform scale-150 translate-x-[+10%] translate-y-[+20%]"
      />
    </button>
  );
};

export default CharacterButton;

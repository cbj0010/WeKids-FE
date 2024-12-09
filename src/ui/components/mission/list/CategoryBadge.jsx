import Image from "next/image";
const CategoryBadge = ({
  missionType,
  isButton = false,
  onClick,
  selected = false,
  textSize = "text-R-10",
  radius = "rounded-lg",
  height = "h-[18px]",
  px = "px-2",
}) => {
  const getStateInfo = (missionType) => {
    const stateInfo = {
      HOUSE_WORK: {
        icon: "/images/trashImg.svg",
        text: "집안일",
      },
      SELF_DEVELOPMENT: {
        icon: "/images/pencilImg.svg",
        text: "자기계발",
      },
      LIFESTYLE_HABITS: {
        icon: "/images/pinImg.svg",
        text: "생활습관",
      },
      ETC: {
        icon: "/images/ectImg.svg",
        text: "기타",
      },
    };
    return stateInfo[missionType] || stateInfo.NEW;
  };

  const stateInfo = getStateInfo(missionType);
  const Component = isButton ? "button" : "div";

  return (
    <Component
      onClick={isButton ? onClick : undefined}
      className={`flex items-center ${height} ${px} ${radius} ${
        isButton
          ? selected
            ? "bg-main02 text-white"
            : "bg-gray01/10 text-sub02"
          : "bg-white text-sub02"
      } ${isButton ? "cursor-pointer hover:opacity-90" : ""}`}
    >
      <Image
        src={stateInfo.icon}
        alt={`${missionType} icon`}
        width={14}
        height={14}
        className="mr-1"
      />
      <span className={textSize}>{stateInfo.text}</span>
    </Component>
  );
};

export default CategoryBadge;

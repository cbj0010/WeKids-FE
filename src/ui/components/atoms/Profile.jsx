import Image from "next/image";

const PROFILE_DEFAULT = {
  width: "w-[60px]",
  height: "h-[60px]",
  bgColor: "bg-white",
  borderColor: "border-2 border-gray-200",
  imagePath: "/images/chachapingImg.svg",
  radius: "rounded-full",
};

const Profile = ({
  width = PROFILE_DEFAULT.width,
  height = PROFILE_DEFAULT.height,
  bgColor = PROFILE_DEFAULT.bgColor,
  borderColor = PROFILE_DEFAULT.borderColor,
  profile = PROFILE_DEFAULT.imagePath,
  radius = PROFILE_DEFAULT.radius,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`
          ${width}
          ${height}
          ${bgColor}
          ${borderColor}
          ${radius}
          rounded-full
          overflow-hidden
          relative
          ${className}
        `}
    >
      <Image
        src={profile}
        alt="profile image"
        className="object-cover"
        width={60}
        height={60}
      />
    </div>
  );
};

export default Profile;

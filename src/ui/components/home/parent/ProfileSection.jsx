import { characterInfoMap } from "@/src/constants/common";

const { default: Profile } = require("../../atoms/Profile");

export default function ProfileSection({
  children,
  selectedAccount,
  onSelectAccount,
}) {
  return (
    <div className="flex space-x-3 mb-6 ml-1 mt-4">
      {children.map((child) => (
        <div
          key={child.id}
          className="relative cursor-pointer"
          onClick={() => onSelectAccount(child)}
        >
          <Profile
            accountInfo={child}
            imagePath={characterInfoMap[child.designType].imagePath}
            className="w-10 h-10 relative z-10 ring-1 ring-black/60"
          />
          {selectedAccount?.id !== child.id && (
            <div
              className="absolute inset-0 bg-black/50 rounded-full pointer-events-none"
              style={{ zIndex: 20 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

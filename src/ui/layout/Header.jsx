import { CountAlarmData } from "@/src/apis/alarm";
import { urlPath } from "@/src/constants/common";
import { BellIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const data = await CountAlarmData();
  const notificationCount = 0; // 알림 개수를 상태로 관리하거나 props로 받을 수 있습니다

  return (
    <header className="flex justify-between items-center pr-7 pl-6">
      <Link href={urlPath.HOME}>
        <Image
          width={20}
          height={26}
          src="/images/logoImg.svg"
          alt="Logo"
          className="w-fit h-fit mr-5 mt-5"
        />
      </Link>
      <div className="flex space-x-3 items-baseline mt-10">
        {/* 알람 아이콘과 배지 */}
        <div className="relative">
          <Link href={urlPath.ALARM}>
            <BellIcon className="h-5 w-5 cursor-pointer" />
          </Link>
          {data.count > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {data.count}
            </div>
          )}
        </div>
        {/* 프로필 아이콘 */}
        <PersonIcon className="h-5 w-5 mr-4 cursor-pointer" />
      </div>
    </header>
  );
}

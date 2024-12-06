"use client";
import {
  ChevronRightIcon,
  EnvelopeClosedIcon,
  CheckIcon,
  FileIcon,
  CardStackIcon,
} from "@radix-ui/react-icons";
import { cardData, missionData } from "@/src/constants/assign";
import Image from "next/image";
import Link from "next/link";
import { urlPath } from "@/src/constants/common";
import { useEffect, useState } from "react";

const EMOTICON = {
  MISSION: FileIcon,
  CARD: CardStackIcon,
};

const AlarmCard = ({
  index,
  type,
  missionName = "설거지 ",
  targetId,
  targetState,
  isChecked,
  className,
  onClick,
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (type === "MISSION") {
      setData(missionData[targetState] || missionData.NEW); // 기본값: NEW
    } else if (type === "CARD") {
      setData(cardData[targetState] || cardData.CREATED); // 기본값: NONE
    }
  }, [type, targetState]);
  if (!data) return null;
  const SelectedIcon = EMOTICON[data.emoticon];

  return (
    <Link href={type == "MISSION" ? urlPath.MISSION : urlPath.ALARM_CARD}>
      <div
        onClick={onClick}
        className={`flex flex-row w-full h-[149px] ${isChecked ? "bg-white" : "bg-main03"} px-6 pt-6 pb-5 gap-5 ${className}`}
      >
        <div className="flex items-start">
          {SelectedIcon && SelectedIcon != "" ? (
            <SelectedIcon className="w-[23px] h-[23px]" />
          ) : (
            <Image
              src="/images/notificationImg.svg"
              width={23}
              height={23}
              alt="공지 이모티콘"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 w-3/4">
          <div className="text-B-18 h-2/5 text-black">{data.title}</div>
          <div className="text-R-14 h-2/5 text-black/60">
            {data
              .description()
              .split("<br/>")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
        </div>
        <div className="flex w-1/4 items-center justify-end">
          <ChevronRightIcon className="w-[43px] h-[43px] cursor-pointer" />
        </div>
      </div>
    </Link>
  );
};

export default AlarmCard;

import { urlPath } from "@/src/constants/common";
import Image from "next/image";
import Link from "next/link";

export const ButtonMessageBox = ({ subtitle, description }) => {
  const [firstPart, secondPart] = subtitle.split("\n");
  return (
    <div className="bg-white rounded-lg px-6 pb-4">
      <div className="flex items-center justify-between">
        <p className="text-B-18 text-left pt-4">
          <span className="text-sub02">{firstPart}</span>
          <br />
          <span className="text-main02 whitespace-nowrap">{secondPart}</span>
        </p>

        <Image
          src="/icons/favicon.svg"
          alt="WeKids"
          width={70}
          height={40}
          className="ml-auto pt-5"
        />
      </div>
      <p className="text-L-10 text-sub02">{description}</p>
      <div className="justify-center flex ">
        <Link href={urlPath.HOME}>
          <button className="bg-main02 rounded-[11px] mt-4 text-white w-[155px] h-[25px] text-center text-R-16">
            확인
          </button>
        </Link>
      </div>
    </div>
  );
};

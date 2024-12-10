import Image from "next/image";

export default function MissionCardLayout({
  title,
  subtitle,
  description,
  imagePath,
  bgcolor,
}) {
  const [firstPart, secondPart] = description.split("\n");

  return (
    <div className="flex flex-col items-center w-full">
      <div className={`w-[330px] ${bgcolor} rounded-xl px-6 pt-5 pb-5 shadow-md`}>
        <p className="text-sub02 text-R-14 text-center mb-2">{title}</p>
        <div className="bg-white rounded-[10px] p-5">
          {/* <div className="text-L-10 text-right"> */}
          <p className="text-sub02 text-L-10 text-right block mb-4">
            {subtitle}
          </p>
          <div className="flex">
            <div className="flex-1 mt-4">
              <Image
                src={imagePath}
                alt="Mission"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-B-18 text-right">
                <span className="text-sub02">{firstPart}</span>
                <br />
                <span className="text-main02">{secondPart}</span>
              </p>
              <div className="flex justify-end pr-2">
                <Image
                  src="/icons/favicon.svg"
                  alt="WeKids"
                  width={65}
                  height={42}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

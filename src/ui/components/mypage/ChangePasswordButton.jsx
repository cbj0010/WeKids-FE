import Image from "next/image";

export default function ChangePasswordButton() {
  return (
    <div className="w-[343px] h-[77px] flex-shrink-0 rounded-[25px] bg-white shadow-md flex items-center justify-center">
      <Image
        src="/images/wooriBankImg.svg"
        alt="Woori Bank"
        width={30}
        height={30}
        className="mr-2"
      />
      <div className="ml-4 text-B-16">송금 비밀번호 변경하기</div>
    </div>
  );
}

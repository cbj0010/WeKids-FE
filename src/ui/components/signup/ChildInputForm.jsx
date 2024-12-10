import { useSensitiveDataStore } from "@/src/stores/cardStore";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import InputTextBox from "@/src/ui/components/atoms/InputTextBox";
import LimitedInputBox from "@/src/ui/components/signup/LimitedInputBox";
import { FileTextIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../atoms/Loader";
import Modal from "../atoms/Modal";

export default function ChildInputForm({ setAllChecked, parentName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [residentfront, setResidentfront] = useState("");
  const [residentback, setResidentback] = useState("");
  const { setResidentRegistrationNumber, getResidentRegistrationNumber } =
    useSensitiveDataStore();

  useEffect(() => {
    if (residentfront.length === 6 && residentback.length === 7) {
      setResidentRegistrationNumber(`${residentfront}-${residentback}`);
    }
    setAllChecked(
      name !== "" && residentfront.length == 6 && residentback.length == 7,
    );
  }, [name, residentfront, residentback, setResidentRegistrationNumber]);

  const handleFrontChange = (value) => {
    setResidentfront(value.slice(0, 6));
  };

  const handleBackChange = (value) => {
    setResidentback(value.slice(0, 7));
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col px-10 w-max-full pt-12 gap-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-start text-R-20 text-black/80">
          특정 금융정보법에 따라
          <br /> 아이의 기본 정보가 필요해요
        </div>
        <div>
          <InputTextBox placeholder={"이름"} value={name} onChange={setName} />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-max-full">
        <div className="flex flex-row items-start text-R-20 text-black/80">
          자녀의 주민등록번호
        </div>
        <div className="flex flex-row w-full gap-2">
          <LimitedInputBox
            placeholder={"주민등록번호"}
            value={residentfront}
            text={residentfront}
            onChange={handleFrontChange}
            security={false}
            className="w-full shadow-3xl"
            maxLength={6}
          />
          <div className="flex flex-col justify-center">-</div>
          <LimitedInputBox
            placeholder={""}
            value={residentback}
            text={residentback}
            onChange={handleBackChange}
            security={true}
            className="w-full"
          />
        </div>
        <div className="flex flex-col mt-3 gap-3">
          <div className="text-R-14 text-neutral-400">
            {parentName}님이 아이의
            <br /> 법정대리인이 맞는지 확인하기 위해{" "}
          </div>
          <div className="text-R-20 text-black/80">
            가족관계증명서와 <br /> 기본증명서를 발급할게요{" "}
          </div>
          <div>
            <FileTextIcon className="w-20 h-20" />
          </div>
          <CustomButton
            onClick={openModal}
            rounded="true"
            className="w-full mt-3"
          >
            발급하기
          </CustomButton>
          <Modal
            isOpen={isModalOpen}
            width="w-[393px]"
            bottom="bottom-[220px]"
            modalHandler={() => setIsModalOpen(false)}
            border={""}
            deletebutton={false}
          >
            <div className="flex flex-col gap-4 items-center justify-center p-10">
              <div className="flex text-R-20 text-black/80">
                아이를 확인중이에요.
              </div>
              <div className="text-R-14 text-black/80">
                5초정도의 시간이 소요될 수 있어요.
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <Loader size="medium" />
                <Image
                  src="/images/hachupingImg.svg"
                  width={200}
                  height={200}
                  alt="발급 티니핑"
                  className="pt-3 animate-bounce"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

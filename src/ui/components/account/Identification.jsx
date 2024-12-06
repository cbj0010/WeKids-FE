import { agreeAccountInquiry } from "@/src/apis/parents";
import { validationMessages } from "@/src/constants/assign";
import { showToast } from "@/src/constants/toast";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import IdentificationBox from "@/src/ui/components/signup/IdentificationBox";
import SignUpFooter from "@/src/ui/components/signup/SignUpFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Identification({ setIsChecked }) {
  const [assignCheck, setAssignChecked] = useState(false);
  const [identificationCheck, setIdentificationCheck] = useState(false);
  const [errorCode, setErrorCode] = useState([true, true, true]);
  const [identification, setIdentification] = useState("".padStart(13, " "));

  const notify = () => {
    if (!errorCode[0]) {
      showToast.error(validationMessages[1]);
    }
    if (!errorCode[1]) {
      showToast.error(validationMessages[2]);
    }
    if (!errorCode[2]) {
      showToast.error(validationMessages[3]);
    }
    if (!assignCheck) {
      showToast.error(validationMessages[4]);
    }
  };

  const handleCheck = async () => {
    try {
      const residentRegistrationNumber =
        identification.slice(0, 6) + "-" + identification.slice(6);

      const response = await agreeAccountInquiry(residentRegistrationNumber);
      console.log("Response:", response);

      if (response.status === 401) {
        showToast.error("주민번호가 틀렸습니다. 다시 입력해주세요!");
        return;
      }

      if (response.status === 204) {
        setIsChecked(true);
      } else {
        showToast.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-between py-[20px] scrollbar-hide">
      <Toaster position="top-center" />
      <div className="flex flex-col items-center px-[40px]">
        <p className="text-R-20 mb-[40px]">
          계좌를 불러오기 위해서는 <br />
          주민등록 번호가 필요해요!
        </p>
        <div className="w-full space-y-[40px] mb-[40px]">
          <IdentificationBox
            setChecked={setIdentificationCheck}
            setErrorCode={setErrorCode}
            identification={identification}
            setIdentification={setIdentification}
          />
          <SignUpFooter setAllChecked={setAssignChecked} />
        </div>
      </div>

      <CustomButton
        onClick={() => {
          if (!(assignCheck && identificationCheck)) {
            notify();
          } else {
            handleCheck();
          }
        }}
        color={assignCheck && identificationCheck ? "main" : "gray"}
      >
        확인
      </CustomButton>
    </div>
  );
}

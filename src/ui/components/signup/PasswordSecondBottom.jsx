import { urlPath } from "@/src/constants/common";
import CustomButton from "@/src/ui/components/atoms/CustomButton";
import KeyPad from "@/src/ui/components/atoms/KeyPad";

export default function PasswordSecondBottom({
  pwd,
  isInput,
  allow,
  setIsInput,
  setPwd,
  setAllowed,
  type,
  isSingleInput = false,
  onConfirmClick,
}) {
  const inputHandler = (num) => {
    const updateInput = [...isInput];
    if (num === "⌫") {
      // 뒤로 가기 처리
      const index = pwd.length - 1;
      if (index >= 0) {
        updateInput[index] = false;
        setPwd(pwd.slice(0, -1));
        setIsInput(updateInput);
        setAllowed(false);
      }
    } else if (num !== "" && pwd.length < (isSingleInput ? 6 : 12)) {
      // 새로운 입력 처리
      updateInput[pwd.length] = true;
      setPwd(pwd + num);
      setIsInput(updateInput);
      if (isSingleInput && pwd.length === 5) {
        setAllowed(true);
      } else if (!isSingleInput && pwd.length === 11) {
        const firstPwd = pwd.slice(0, 6);
        const secondPwd = pwd.slice(6, 12);
        if (firstPwd === secondPwd) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      }
    }
  };

  const handleClick = (e) => {
    if (onConfirmClick) {
      onConfirmClick(e);
    } else if (!allow) {
      e.preventDefault();
    }
  };

  const getRedirectPath = () => {
    switch (type) {
      case "transfer":
        return urlPath.MISSION_TRANSFER_DONE;
      case "childtransfer":
        return urlPath.DONE;
      default:
        return urlPath.SELECT_PARENT_PASSWORD_CONFIRM;
    }
  };

  return (
    <>
      <div className="flex flex-col h-1/5 p-10">
        <CustomButton
          onClick={handleClick}
          rounded="true"
          className={`mt-auto w-full ${
            allow
              ? "bg-main02"
              : "bg-stone-300 hover:bg-stone-300 pointer-events-none"
          }`}
        >
          확인
        </CustomButton>
      </div>
      <div className="flex flex-col mt-auto w-[393px]">
        <KeyPad isDoubleButton={false} number={inputHandler} />
      </div>
    </>
  );
}

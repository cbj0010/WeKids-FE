import { useEffect, useState } from "react";
import { useSensitiveDataStore } from "@/src/stores/cardStore";
export default function PasswordTop({
  isInput,
  pwd,
  setIsInput,
  setPwd,
  setAllowed,
  index = 6,
  title = "간편 비밀번호를",
  type = "간편 비밀번호",
}) {
  const [check, setChecked] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const { setAccountPassword, getAccountPassword } = useSensitiveDataStore();
  useEffect(() => {
    if (isShaking) {
      const timeout = setTimeout(() => {
        setIsShaking(false);
        setIsInput((prev) => prev.map(() => false));
        setChecked(0);
        setPwd("");
        setAllowed(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isShaking]);

  useEffect(() => {
    if (isInput[index - 1] === true && check === 0) {
      const timeout = setTimeout(() => {
        setChecked(1);
        setIsInput((prev) => prev.map(() => false));
      }, 1000);
    } else if (isInput[index - 1] === true && check === 1) {
      const firstValue = pwd.slice(0, index);
      const secondValue = pwd.slice(index, index * 2);
      if (firstValue === secondValue) {
        // 비밀번호가 일치하면 처리
        setAllowed(true);
        setAccountPassword(firstValue);
        console.log(getAccountPassword());
      } else {
        // 비밀번호가 일치하지 않으면 흔들림 애니메이션 처리
        setIsShaking(true);
      }
    }
  }, [isInput[index - 1]]);

  return (
    <div className="flex flex-col h-3/5 p-10 w-full">
      <div className="flex flex-col justify-center h-3/5">
        {check ? (
          <p className="text-B-20">
            {type} <br /> 다시 입력해 주세요.
          </p>
        ) : (
          <p className="text-B-20">
            {title} <br />
            {type === "송금" ? "입력해주세요." : "등록해 주세요."}
          </p>
        )}
        {isShaking ? (
          <p className=" text-red-600 shake-animation">
            비밀번호가 일치하지 않아요.
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row gap-[21px] justify-center h-1/5">
        {isInput.map((input, index) => (
          <div
            key={index}
            className={`rounded-full w-[31px] h-[31px] ${
              input
                ? index % 2 === 0
                  ? "bg-main01"
                  : "bg-sub01"
                : "bg-white border-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

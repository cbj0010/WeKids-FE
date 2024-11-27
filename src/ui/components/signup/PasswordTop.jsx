import { useEffect, useState } from "react";
export default function PasswordTop({
  isInput,
  pwd,
  setIsInput,
  setPwd,
  setAllowed,
}) {
  const [check, setChecked] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

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
    if (isInput[5] === true && check === 0) {
      const timeout = setTimeout(() => {
        setChecked(1);
        setIsInput((prev) => prev.map(() => false));
      }, 1000);
    } else if (isInput[5] === true && check === 1) {
      const firstValue = pwd.slice(0, 6);
      const secondValue = pwd.slice(6, 12);
      firstValue == secondValue ? setAllowed(true) : setIsShaking(true);
    }
  }, [isInput[5]]);

  return (
    <div className="flex flex-col h-3/5 p-10 w-full">
      <div className="flex flex-col justify-center h-3/5">
        {check ? (
          <p className="text-B-20">
            간편 비밀번호를 <br /> 다시 입력해 주세요.
          </p>
        ) : (
          <p className="text-B-20">
            간편 비밀번호를 <br /> 등록해 주세요.
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

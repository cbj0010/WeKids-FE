import CustomButton from "@/src/ui/components/atoms/CustomButton";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const CardAddress = ({ address, postcode, setAddress, setPostcode }) => {
  const [isExistCode, setExistCode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Daum API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  const searchPostCodeHandler = () => {
    if (!isLoaded || !window.daum) {
      console.error("Daum API is not loaded yet");
      return;
    }

    const width = Math.round(window.innerWidth * 0.5);
    const height = Math.round(window.innerHeight * 0.5);

    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostcode(data.zonecode);
        setAddress(data.address); // 주소와 우편번호 업데이트
        setExistCode(true);
      },
    }).open({
      popupTitle: "Wekids 우편번호 검색",
      left: window.screen.width / 2 - width / 2,
      top: window.screen.height / 2 - height / 2,
    });
  };

  return (
    <div className="flex flex-col h-[130px]">
      <div className="mb-3">배송지를 입력해 주세요.</div>
      <CustomButton
        onClick={searchPostCodeHandler}
        size={"mediumLarge"}
        rounded={true}
        className="bg-white text-black/80 border border-1 border-black/80 hover:bg-white"
      >
        <div className="flex flex-col text-black/80 text-R-14">
          {isExistCode ? (
            address
          ) : (
            <div className="flex flex-col items-center gap-1">
              <PlusIcon className="w-[20px] h-[20px]" />
              <span className="text-R-12 text-black/80">주소찾기</span>
            </div>
          )}
        </div>
      </CustomButton>
    </div>
  );
};

export default CardAddress;

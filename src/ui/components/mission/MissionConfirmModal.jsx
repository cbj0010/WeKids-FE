"use client";
import CustomButton from "../atoms/CustomButton";

const MissionConfirmModal = ({ setParentOpen, setOpen, text, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // 상위 컴포넌트에서 처리할 로직 실행
    }
    setParentOpen(false); // 부모 컴포넌트 모달 상태 닫기
    setOpen(false); // 현재 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[360px] h-[210px] rounded-lg shadow-lg p-8 pt-12 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-12">
          <p className="text-R-14 text-black/80 whitespace-pre-line">{text}</p>
          <div className="w-full h-[40px]">
            <CustomButton
              size="mediumLarge"
              onClick={handleConfirm}
              className="w-full"
              rounded={true}
            >
              확인
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionConfirmModal;

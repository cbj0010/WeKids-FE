import MissionCardLayout from "./mission/MissionCardLayout";

const FinancialCard = () => {
  return (
    <div className="flex flex-col items-center">
      <MissionCardLayout
        title="Wekids를 통해 용돈을 받는 또 하나의 방법!"
        subtitle="아티클 읽고 금융 지식 Up, 경제 지식 Up"
        description={`금융 소식\n한눈에 보기!`}
        imagePath="/images/AnalyzeIllustImg.svg"
        bgcolor="bg-[#FEE500]/30"
      />
    </div>
  );
};

export default FinancialCard;

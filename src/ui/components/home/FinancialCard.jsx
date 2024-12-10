import MissionCardLayout from "./mission/MissionCardLayout";

const FinancialCard = () => {
  return (
    <div className="flex flex-col items-center">
      <MissionCardLayout
        title="오늘의 금융지식, Wekids에서 확인!"
        subtitle="아티클 읽고 금융 지식 Up, 경제 지식 Up"
        description={`금융 소식\n한눈에 보기!`}
        imagePath="/images/AnalyzeIllustImg.svg"
        bgcolor="bg-[#FEE500]/30"
      />
    </div>
  );
};

export default FinancialCard;

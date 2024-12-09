import MissionCardLayout from "./MissionCardLayout";

export default function ChildMissionCard() {
  return (
    <MissionCardLayout
      title="용돈을 받는 또 하나의 방법!"
      subtitle="부모님이 만든 미션을 완료하고 용돈을 얻어 봐요."
      description={`미션 수행하고\n용돈 받기!`}
      imagePath="/images/todoIllustrationImg.svg"
      bgcolor="bg-purple01/30"
    />
  );
}

import MissionCardLayout from "./MissionCardLayout";

export default function ParentMissionCard() {
  return (
    <MissionCardLayout
      title="용돈을 주는 또 하나의 방법!"
      subtitle="미션을 등록하고 자녀에게 용돈을 지급해봐요!"
      description={`미션 등록하고\n용돈주기!`}
      imagePath="/images/todoIllustrationImg.svg"
      bgcolor="bg-purple01/30"
    />
  );
}

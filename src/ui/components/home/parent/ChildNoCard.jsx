import { AccountCardLayout } from "../AccountCardLayout";
import { MessageBox } from "../MessageBox";

const ChildNoCard = ({ name }) => {
  return (
    <div className="flex flex-col items-center">
      <AccountCardLayout title={`${name}자녀님의 카드가 없네요!`}>
        <MessageBox
          subtitle={`위키즈 카드\n발급 요청하기`}
          description="자녀에게 카드를 먼저 발급해달라고 요청하세요!"
          imgUrl="/images/weebeGropImg.svg"
        />
      </AccountCardLayout>
    </div>
  );
};

export default ChildNoCard;

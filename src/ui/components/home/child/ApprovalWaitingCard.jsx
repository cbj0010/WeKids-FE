"use client";

import { AccountCardLayout } from "../AccountCardLayout";
import { ButtonMessageBox } from "../ButtonMessageBox";
import { MessageBox } from "../MessageBox";

export const ApprovalWaitingCard = ({ name }) => {
  return (
    <div className="flex flex-col items-center">
      <AccountCardLayout title={name + " 자녀님 위키즈 카드가 없네요!"}>
        <ButtonMessageBox
          subtitle={`위키즈 카드\n발급 대기 중 입니다!`}
          description="부모님에게 카드를 발급해달라고 요청하세요!"
        />
      </AccountCardLayout>
    </div>
  );
};

export default ApprovalWaitingCard;

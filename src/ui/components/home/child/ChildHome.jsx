import { getChildAccounts } from "@/src/apis/child";
import BlueCardBox from "../BlueCardBox";
import ApprovalWaitingCard from "./ApprovalWaitingCard";
import EmptyAccountCard from "./EmptyAccountCard";

export default async function ChildHome() {
  const data = await getChildAccounts();
  // const data = await childAccountData;
  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.cardState === "NONE") {
    return <EmptyAccountCard name={data.name} />;
  }
  if (data.cardState === "READY") {
    return <ApprovalWaitingCard name={data.name} />;
  }

  return <BlueCardBox selectedAccount={data} isParent={false} />;
}

import { urlPath } from "@/src/constants/common";
import TransferComplete from "@/src/ui/components/transfer/TransferComplete";
import Link from "next/link";

export default async function TransferDonePage() {

  const transferData = {
    sendUser: "xx",
    amount: "xx",
    accountNumber: "1234567890123",
    bankName: "우리",
    memo: "메모입력..",
  };

  return (
    <Link href={urlPath.MISSION_TRANSFER_PASSWORD}>
      <TransferComplete
        transferData={transferData}
        type="CONFIRM"
      />
    </Link>
  );
}
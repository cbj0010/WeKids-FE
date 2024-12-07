import { fetchAccounts } from "@/src/apis/account";
import ParentChildSelector from "@/src/ui/components/signup/ParentChildSelector";
import SelectorAccount from "@/src/ui/components/signup/SelectorAccount";

export default async function AccountItem({ selectedIndex, setSelectedIndex }) {
  const data = await fetchAccounts();

  const toggleAccountSelection = (index) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  const totalBalance = data.reduce((acc, item) => acc + item.balance, 0);
  const itemCount = data.length;

  return (
    <div className="flex flex-col h-[696px] overflow-hidden">
      <div className="flex flex-col gap-5 mx-7">
        <div className="flex pt-5">
          <span className="flex flex-col text-R-28 text-black/80">내 계좌</span>
        </div>
        <div className="flex">
          <div className="pointer-events-none text-black/80 h-10 w-full flex text-R-20 bg-stone-300 hover:bg-neutral-400 rounded-[11px] items-center justify-between px-4 my-4">
            <span className="text-left">총 {itemCount} 개</span>
            <span className="text-right">
              {totalBalance.toLocaleString()} 원
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-full overflow-y-auto mx-7">
        {data.map((account, index) => (
          <ParentChildSelector
            key={index}
            isSelected={selectedIndex == index}
            className="my-2"
            onClick={() => toggleAccountSelection(index)}
          >
            <SelectorAccount
              name={account.bankName}
              account={account.accountNumber}
              balance={account.balance}
            />
          </ParentChildSelector>
        ))}
      </div>
    </div>
  );
}

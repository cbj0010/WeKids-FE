"use client";
import { getParentsAccounts } from "@/src/apis/parents";
import { useColorStore, useSensitiveDataStore } from "@/src/stores/cardStore";
import { useAccountStore } from "@/src/stores/userStore";
import CardRequestReview from "@/src/ui/components/card/CardRequestReview";
import InnerText from "@/src/ui/components/card/InnerText";
import { useEffect, useState } from "react";

export default function CardReview() {
  const { accountInfo } = useAccountStore();
  const { childName, setChildName, childId } = useSensitiveDataStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParentsAccount = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const data = await getParentsAccounts();
        if (data) {
          const child = data.children.find((c) => c.childId === childId);
          setChildName(child.name);
        }
      } catch (err) {
        setError(err.message); // 에러 처리
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    getParentsAccount();
  }, []); // 의존성 배열이 빈 경우 컴포넌트 마운트 시 한 번 실행

  return (
    <CardRequestReview>
      <InnerText
        name1={accountInfo ? accountInfo.name : ""}
        name2={childName ? childName : ""}
        isChild={false}
      />
    </CardRequestReview>
  );
}

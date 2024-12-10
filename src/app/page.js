import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { urlPath } from "../constants/common";
import ChildHome from "../ui/components/home/child/ChildHome";
import FinancialCard from "../ui/components/home/FinancialCard";
import ChildMissionCard from "../ui/components/home/mission/ChildMissionCard";
import ParentMissionCard from "../ui/components/home/mission/ParentMissionCard";
import ParentHome from "../ui/components/home/parent/ParentHome";
import Header from "../ui/layout/Header";
import "./globals.css";

export default async function Home() {
  const session = await auth();
  const authorization = session?.user?.Authorization;

  if (!authorization) redirect("/onboard");
  const memberType = session.user.role;

  return (
    <div className="flex flex-col w-full h-full space-y-6">
      <Header />
      <div className="flex justify-center">
        {memberType === "ROLE_PARENT" ? (
          <ParentHome authorization={authorization} />
        ) : (
          <ChildHome authorization={authorization} />
        )}
      </div>
      <Link href={urlPath.MISSION}>
        <div className="flex justify-center cursor-pointer">
          {memberType === "ROLE_PARENT" ? (
            <ParentMissionCard />
          ) : (
            <ChildMissionCard />
          )}
        </div>
      </Link>
      <Link href={urlPath.FINANCIAL}>
        <FinancialCard />
      </Link>
    </div>
  );
}

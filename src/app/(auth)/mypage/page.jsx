import MyPage from "@/src/ui/components/account/MyPage";
import Header from "@/src/ui/layout/Header";

export default function Page() {
  
  return (
    <div className="flex flex-col h-screen">
      
      <Header />
      <MyPage />
      
    </div>
  );
}

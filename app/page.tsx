import Header from "@/components/ui/navbar/Header";
import Sidebar from "@/components/ui/navbar/Sidebar";
import ChatSection from "@/components/sections/ChatSection";

function Page() {
  return (
    <div className="flex h-dvh w-full">
      <Sidebar />

      <div className="flex-1 h-dvh overflow-hidden p-4 flex flex-col">
        <Header title="Chat" />

        <ChatSection />
      </div>
    </div>
  );
}

export default Page;

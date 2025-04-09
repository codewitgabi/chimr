import Header from "@/components/ui/navbar/Header";
import Sidebar from "@/components/ui/navbar/Sidebar";
import ChatSection from "@/components/sections/ChatSection";
import SocketProvider from "@/components/providers/SocketProvider";

function Page() {
  return (
    <SocketProvider>
      <div className="flex h-dvh w-full">
        <Sidebar />

        <div className="flex-1 h-dvh overflow-hidden p-4 flex flex-col">
          <Header title="Chat" />

          <ChatSection />
        </div>
      </div>
    </SocketProvider>
  );
}

export default Page;

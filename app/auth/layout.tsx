import Image from "next/image";
import ChatBanner from "@/assets/chat-banner.jpg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6 h-dvh w-full overflow-hidden ">
      <div className="w-2/3 h-full overflow-y-auto flex justify-center items-center">
        {children}
      </div>

      <div className="h-full">
        <Image
          src={ChatBanner}
          alt="chat-banner"
          className="h-full w-full object-fill"
        />
      </div>
    </div>
  );
}

export default Layout;

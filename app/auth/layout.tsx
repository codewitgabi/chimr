import Image from "next/image";
import ChatBanner from "@/assets/chat-banner.jpg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <div className="w-2/3 min-h-full overflow-y-auto flex justify-center items-center px-4 max-[1245px]:w-full">
        {children}
      </div>

      <div className="h-full">
        <Image
          src={ChatBanner}
          alt="chat-banner"
          className="h-full w-full object-fill max-[970px]:hidden"
        />
      </div>
    </div>
  );
}

export default Layout;

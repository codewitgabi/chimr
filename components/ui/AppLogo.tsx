import Image from "next/image";

function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={"/apple-touch-icon.png"}
        alt="app-logo"
        width={40}
        height={40}
        priority
      />

      <span className="text-[#209CEE] font-bold">Chimr</span>
    </div>
  );
}

export default AppLogo;

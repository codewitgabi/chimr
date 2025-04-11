import Image from "next/image";

function PreLoader() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <Image
        src={"/apple-touch-icon.png"}
        alt="loading-image-of-app-icon"
        height={40}
        width={40}
      />
    </div>
  );
}

export default PreLoader;

"use client";

import useAppStore from "@/utils/store";
import Image, { StaticImageData } from "next/image";

function ContactProfileDetailPopover() {
  const selectedContact = useAppStore((state) => state.selectedContact);

  return (
    <div className="absolute top-6 right-2 border border-white h-[calc(100dvh-50px)] w-[300px] overflow-y-auto bg-secondary rounded-2xl p-4 z-20 min-[1200px]:hidden">
      {selectedContact ? (
        <div className="">
          <Image
            src={selectedContact?.profilePic as string | StaticImageData}
            alt={`${selectedContact?.username}-profile-pic`}
            width={100}
            height={100}
            className="mx-auto"
          />

          <div className="mt-4 space-y-0.5">
            <h2 className="font-medium opacity-85">
              {selectedContact?.username}
            </h2>
            <p className="opacity-60 text-xs">{selectedContact?.jobTitle}</p>
          </div>

          <p className="text-xs mt-6">{selectedContact?.about}</p>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default ContactProfileDetailPopover;

"use client";

import useAppStore from "@/utils/store";
import Image, { StaticImageData } from "next/image";

function ContactProfileDetail() {
  const selectedContact = useAppStore((state) => state.selectedContact);

  return (
    <div className="flex-1 overflow-y-auto w-full bg-secondary rounded-xl text-center p-4 max-[1200px]:hidden">
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

          <p className="text-sm mt-6">{selectedContact?.about}</p>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default ContactProfileDetail;
